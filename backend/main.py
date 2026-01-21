import os
import secrets
import time
from datetime import datetime, timedelta, timezone
from fastapi import FastAPI, Depends, Form, HTTPException, status, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import inspect, text, func
from database import engine, get_db
from sqlalchemy.orm.attributes import flag_modified
from typing import List, Optional
from pydantic import BaseModel, Field
import models, database
from starlette.responses import JSONResponse
from pydantic import EmailStr
from dotenv import load_dotenv
import resend
import base64

load_dotenv()

# Initialize Resend
resend.api_key = os.getenv("RESEND_API_KEY")
VITE_API_URL = os.getenv("VITE_API_URL")
phone = os.getenv("CONTACT_PHONE_NUMBER")
# Create the tables in Neon if they don't exist
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Arpit's Portfolio Backend")

# --- CORS CONFIGURATION ---
# Allows your React app (running on localhost:5173) to talk to this API
# --- FIXED CORS CONFIGURATION ---
origins = [
    "http://localhost:5173",
    'https://arpitkumar.dev',
    "https://data-science-portfolio-website-fina.vercel.app",   # Removed trailing slash
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, # Use the list variable we defined above
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    # Adding this helps with some browser-specific issues
    expose_headers=["*"],
)

# --- Pydantic Schemas for JSON Validation ---
class StatusUpdate(BaseModel):
    status: str = Field(..., pattern="^(new|contacted|qualified|converted|lost)$")

# These classes define what the JSON body should look like
class PriorityRequest(BaseModel):
    priority: str

class ScoreRequest(BaseModel):
    quality_score: float


class NotesUpdate(BaseModel):
    internal_notes: str

class TagUpdate(BaseModel):
    tags: List[str]

class BulkStatusUpdate(BaseModel):
    lead_ids: List[int]
    status: str


# --- ADMIN AUTH: token management ---
# Simple server-side token store for admin sessions (in-memory, short-lived)
ACTIVE_ADMIN_TOKENS = {}  # token -> expiry (unix epoch seconds)

def _is_valid_admin(admin_key: str = None, admin_token: str = None):
    now = int(time.time())
    if admin_key and admin_key == os.getenv("ADMIN_SECRET_KEY"):
        return True
    if admin_token and ACTIVE_ADMIN_TOKENS.get(admin_token, 0) > now:
        return True
    return False

@app.post("/admin/login")
async def admin_login(password: str = Form(...)):
    # Validate password against server-side secret
    if password != os.getenv("ADMIN_SECRET_KEY"):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = secrets.token_urlsafe(32)
    expiry = int(time.time()) + 3600  # 1 hour
    ACTIVE_ADMIN_TOKENS[token] = expiry
    return {"is_admin": True, "admin_token": token, "expires_in": expiry - int(time.time())}

@app.post("/admin/logout")
async def admin_logout(admin_token: str = None):
    if admin_token and admin_token in ACTIVE_ADMIN_TOKENS:
        ACTIVE_ADMIN_TOKENS.pop(admin_token, None)
    return {"status": "logged_out"}

@app.get("/admin/validate")
async def validate_admin(admin_token: str = None, admin_key: str = None):
    if _is_valid_admin(admin_key=admin_key, admin_token=admin_token):
        return {"is_admin": True}
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")

# --- ROUTES ---
@app.get("/")
async def root():
    return {"status": "System Operational", "version": "4.0.0"}

@app.get("/hello")
async def hello():
    return {"message": "Hello from Arpit's Portfolio Backend!"}

# 1. Endpoint to RECEIVE leads from Contact.tsx
@app.post("/submit-contact")
async def submit_contact(
    background_tasks: BackgroundTasks,
    name: str = Form(...),
    email: EmailStr = Form(...),
    subject: str = Form(...),
    message: str = Form(...),
    company: str = Form(None),
    formType: str = Form("contacts"),
    role: str = Form(None),
    db: Session = Depends(get_db)
):
    # 1. Persist Lead to PostgreSQL Database
    try:
        new_lead = models.ContactLead(
            name=name,
            email=email,
            subject=subject,
            message=message,
            company=company,
            form_type=formType,
            role=role
        )
        db.add(new_lead)
        db.commit()
        db.refresh(new_lead)
    except Exception as e:
        db.rollback()
        print(f"Database Logging Error: {e}")

    # 2. Construct the "Deal-Maker" Response Template
    frontend_url = os.getenv("FRONTEND_URL", "https://arpitkumar.dev")
    phone = os.getenv("PHONE_NUMBER", "91XXXXXXXXXX") # In international format without '+'
    calendly_link = os.getenv("CALENDLY_LINK", "https://calendly.com/kumararpit17773/30min")
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body {{ margin: 0; padding: 0; background-color: #f8fafc; }}
            .container {{ font-family: 'Inter', sans-serif; max-width: 600px; margin: 20px auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }}
            .header {{ background-color: #0f172a; padding: 40px; color: #ffffff; text-align: left; }}
            .body {{ padding: 40px; color: #334155; }}
            .sys-badge {{ background: rgba(37, 99, 235, 0.1); color: #2563eb; padding: 4px 10px; border-radius: 4px; font-family: monospace; font-size: 10px; font-weight: bold; text-transform: uppercase; margin-bottom: 20px; display: inline-block; }}
            .intro-text {{ font-size: 16px; line-height: 1.6; margin-bottom: 30px; border-left: 4px solid #2563eb; padding-left: 20px; }}
            .section-header {{ font-size: 11px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; }}
            
            /* Message Recap */
            .message-box {{ background-color: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; margin: 25px 0; font-style: italic; font-size: 13px; color: #64748b; }}
            
            /* Action Buttons */
            .btn-primary {{ display: block; background-color: #2563eb; color: #ffffff !important; text-decoration: none; padding: 18px; border-radius: 12px; text-align: center; font-weight: 700; font-size: 15px; margin-bottom: 12px; }}
            .btn-group {{ display: table; width: 100%; border-spacing: 10px 0; }}
            .btn-secondary {{ display: table-cell; background-color: #ffffff; color: #0f172a !important; text-decoration: none; padding: 14px 0; border-radius: 10px; text-align: center; font-weight: 700; font-size: 13px; border: 1px solid #e2e8f0; width: 50%; }}

            .schematic {{ font-family: monospace; font-size: 10px; color: #94a3b8; text-align: center; padding: 30px; background: #f8fafc; line-height: 1.4; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div style="font-family: monospace; font-size: 11px; color: #60a5fa; margin-bottom: 10px;">INQUIRY_PARSED // SESSION: {datetime.now().strftime('%H%M%S')}</div>
                <h1 style="margin: 0; font-size: 22px; font-weight: 800;">Contact: Arpit Kumar</h1>
            </div>
            
            <div class="body">
                <div class="sys-badge">Priority Communication Enabled</div>
                <div class="intro-text">
                    Hello <b>{name}</b>,<br>
                    Thank you for reaching out via my Research portfolio Terminal regarding <b>{subject}</b>. I have successfully received your message and am reviewing the details. 
                </div>

                <div class="section-header">Original Inquiry Summary</div>
                <div class="message-box">
                    "{message[:150]}{'...' if len(message) > 150 else ''}"
                </div>

                <p style="font-size: 14px; margin-bottom: 25px;">
                    To expedite our discussion, please use the <b>Action Hub</b> below to schedule a technical sync or connect with me directly.
                </p>

                <div class="section-header">Technical Sync Hub</div>
                <a href="{calendly_link}" class="btn-primary">🗓️ Schedule a 15-30 Min Sync</a>
                
                <div class="btn-group">
                    <a href="https://wa.me/{phone}" class="btn-secondary">💬 Direct WhatsApp</a>
                    <a href="{frontend_url}/projects" class="btn-secondary">📂 Research Portfolio</a>
                </div>
            </div>

            <div class="schematic">
                ------------------------------------------<br>
                AI_RESEARCHER // IIT_KHARAGPUR_SCHOLAR<br>
                © {datetime.now().year} ARPITKUMAR.DEV
            </div>
        </div>
    </body>
    </html>
    """

    # 3. Define Background Sending Task
    def send_acknowledgment():
        try:
            resend.Emails.send({
                "from": "Arpit Kumar (IIT Kharagpur) <contact@arpitkumar.dev>",
                "to": [email],
                "subject": f"Re: {subject} | Arpit Kumar",
                "html": html_content
            })
        except Exception as e:
            print(f"Resend Acknowledgment Error: {e}")

    # 4. Initiate Dispatch and Return Response
    background_tasks.add_task(send_acknowledgment)

    return {"status": "success", "id": new_lead.id, "message": "Inquiry logged and acknowledgment dispatched."}

# 2. Endpoint to RECEIVE leads from CV.tsx

@app.post("/api/v1/request-cv")
async def handle_cv_request(
    background_tasks: BackgroundTasks,
    name: str = Form(...),
    email: EmailStr = Form(...),
    company: str = Form(...),
    subject: str = Form(...),
    message: str = Form(...),
    role: str = Form(None),
    db: Session = Depends(get_db)
):
    # 1. Save Lead to PostgreSQL (Keep your existing logic)
    try:
        new_lead = models.ContactLead(
            name=name,
            email=email,
            subject=subject,
            message=message,
            company=company,
            form_type="CV_DISPATCH_SYSTEM",
            role=role,
        )
        db.add(new_lead)
        db.commit()
    except Exception as e:
        print(f"Database Error: {e}")

    # 2. Prepare Attachment (Resend requires Base64 for local files)
    cv_path = os.path.join(os.getcwd(), "assets", "AK_CV.pdf")
    if not os.path.exists(cv_path):
        raise HTTPException(status_code=500, detail="CV file not found on server.")

    with open(cv_path, "rb") as f:
        cv_content = base64.b64encode(f.read()).decode()

    # 3. Enhanced HTML Template
    frontend_url = os.getenv("VITE_API_URL")
    phone = os.getenv("CONTACT_PHONE_NUMBER")
    
    from datetime import datetime

    # Environment Variables
    frontend_url = os.getenv("VITE_API_URL", "https://arpitkumar.dev")
    phone = os.getenv("PHONE_NUMBER") 

    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body {{ margin: 0; padding: 0; background-color: #f1f5f9; }}
            .container {{ font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 20px auto; border-radius: 20px; overflow: hidden; background-color: #ffffff; box-shadow: 0 20px 50px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }}
            
            /* Neural Header */
            .header {{ background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 45px 35px; color: #ffffff; position: relative; }}
            .log-tag {{ font-family: 'JetBrains Mono', 'Courier New', monospace; font-size: 11px; color: #3b82f6; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; opacity: 0.9; }}
            .title {{ font-size: 28px; font-weight: 900; letter-spacing: -1px; margin: 0; line-height: 1; }}
            
            .body {{ padding: 40px; color: #334155; }}
            
            /* Execution Context */
            .context-box {{ border-left: 4px solid #2563eb; padding: 2px 0 2px 20px; margin-bottom: 35px; }}
            .greeting {{ font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 8px; }}
            .meta-desc {{ font-size: 14px; color: #64748b; line-height: 1.6; }}

            /* Technical Specification Matrix */
            .spec-header {{ font-size: 11px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 2.5px; margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; }}
            .spec-item {{ margin-bottom: 25px; }}
            .spec-label {{ font-weight: 800; color: #2563eb; font-size: 13px; font-family: monospace; display: block; margin-bottom: 4px; }}
            .spec-value {{ font-size: 14px; font-weight: 600; color: #1e293b; margin: 0; }}
            .spec-detail {{ font-size: 13px; color: #64748b; margin-top: 4px; line-height: 1.5; }}

            /* Performance Dashboard */
            .dashboard {{ background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 25px; margin: 35px 0; }}
            .metric-row {{ margin-bottom: 18px; }}
            .metric-info {{ display: flex; justify-content: space-between; font-size: 11px; font-weight: 800; color: #475569; text-transform: uppercase; margin-bottom: 8px; }}
            .progress-bg {{ height: 8px; background: #e2e8f0; border-radius: 10px; overflow: hidden; }}
            .progress-fill {{ height: 100%; background: linear-gradient(90deg, #2563eb 0%, #60a5fa 100%); border-radius: 10px; }}

            /* CTA: The Action Layer */
            .btn-primary {{ display: block; background-color: #0f172a; color: #ffffff !important; text-decoration: none; padding: 20px; border-radius: 14px; text-align: center; font-weight: 800; font-size: 15px; margin-bottom: 12px; box-shadow: 0 10px 20px rgba(15, 23, 42, 0.15); }}
            .btn-secondary {{ display: inline-block; width: 48%; background-color: #ffffff; color: #0f172a !important; text-decoration: none; padding: 14px 0; border-radius: 12px; text-align: center; font-weight: 700; font-size: 13px; border: 1px solid #e2e8f0; }}
            
            .schematic {{ font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #cbd5e1; text-align: center; padding: 30px; background: #0f172a; line-height: 1.6; margin-top: 20px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="log-tag">Handshake: Successful // ID: {datetime.now().strftime('%Y%j%H%M')}</div>
                <h1 class="title">AI Researcher Dossier</h1>
            </div>
            
            <div class="body">
                <div class="context-box">
                    <div class="greeting">System Ready, {name}.</div>
                    <div class="meta-desc">
                        Receiving request from <b>{company}</b> regarding <b>{subject.replace('CV Request: ', '')}</b>. 
                        Authorized for transmission of Technical CV and research artifacts.
                    </div>
                </div>

                <div class="spec-header">Candidate Specification</div>
                
                <div class="spec-item">
                    <span class="spec-label">&lt;foundation_rigor&gt;</span>
                    <p class="spec-value">IIT Kharagpur | Integrated Dual Degree</p>
                    <p class="spec-detail">8.46 CGPA. Specialized in mathematical derivation of backprop, custom loss functions, and non-linear optimization.</p>
                </div>

                <div class="spec-item">
                    <span class="spec-label">&lt;generative_expertise&gt;</span>
                    <p class="spec-value">LLM Fine-tuning & Agentic RAG</p>
                    <p class="spec-detail">Experience in transformer pruning, JAX-based training, and orchestrating low-latency inference pipelines for GenAI products.</p>
                </div>

                <div class="spec-item">
                    <span class="spec-label">&lt;production_ml&gt;</span>
                    <p class="spec-value">Architecting at Scale (MLOps)</p>
                    <p class="spec-detail">Bridging research and production using Docker, Kubernetes, and FastAPI to handle high-concurrency data streams.</p>
                </div>

                <div class="dashboard">
                    <div style="font-size: 12px; font-weight: 900; color: #0f172a; margin-bottom: 20px; letter-spacing: 1px;">CORE COMPETENCY INDEX</div>
                    
                    <div class="metric-row">
                        <div class="metric-info"><span>Deep Learning (PyTorch/JAX)</span> <span>96%</span></div>
                        <div class="progress-bg"><div class="progress-fill" style="width: 96%;"></div></div>
                    </div>
                    
                    <div class="metric-row">
                        <div class="metric-info"><span>GenAI & LLM Ops</span> <span>92%</span></div>
                        <div class="progress-bg"><div class="progress-fill" style="width: 92%;"></div></div>
                    </div>
                    
                    <div class="metric-row">
                        <div class="metric-info"><span>NLP (Transformers/BERT)</span> <span>94%</span></div>
                        <div class="progress-bg"><div class="progress-fill" style="width: 94%;"></div></div>
                    </div>
                </div>

                <div class="spec-header">Initialize Collaboration</div>
                <a href="https://calendly.com/kumararpit17773/30min" class="btn-primary">Schedule Technical Interview &rarr;</a>
                
                <div style="width: 100%;">
                    <a href="{frontend_url}/projects" class="btn-secondary">Explore Research</a>
                    <a href="https://wa.me/{phone}" class="btn-secondary" style="float: right;">Direct Secure Chat</a>
                </div>
            </div>

            <div class="schematic">
                // DATA_SCIENCE_LOG_TERMINAL<br>
                [STATUS: READY_FOR_INFERENCE]<br>
                [LATENCY: OPTIMIZED]<br>
                ------------------------------------<br>
                NLP // COMPUTER_VISION // MLOPS<br>
                © {datetime.now().year} ARPIT_KUMAR_IIT_KGP
            </div>
        </div>
    </body>
    </html>
    """
    # 4. Define background task for sending
    def send_resend_email():
        try:
            resend.Emails.send({
                "from": "Arpit Kumar (IIT Kharagpur) <contact@arpitkumar.dev>",
                "to": [email],
                "subject": f"Technical CV - Arpit Kumar | IIT Kharagpur | AI Research & Development | For {company}",
                "html": html_content,
                "attachments": [
                    {
                        "filename": "Arpit_Kumar_CV.pdf",
                        "content": cv_content,
                    }
                ]
            })
        except Exception as e:
            print(f"Resend Error: {e}")

    # 5. Execute
    background_tasks.add_task(send_resend_email)

    return {"status": "success", "detail": "Dispatch sequence initiated via Resend API"}

# 2. Endpoint for ADMIN to fetch all leads
@app.get("/admin/leads")
async def get_admin_leads(
    admin_key: str = None,
    admin_token: str = None,
    db: Session = Depends(get_db)
):
    # Security Check
    if not _is_valid_admin(admin_key=admin_key, admin_token=admin_token):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Admin Credentials"
        )

    # Fetch leads sorted by newest first
    leads = db.query(models.ContactLead).order_by(models.ContactLead.timestamp.desc()).all()
    # Convert to JSON-serializable dicts with all enhanced fields
    def _serialize(l):
        return {
            "id": l.id,
            "name": l.name,
            "email": l.email,
            "subject": l.subject,
            "company": l.company,
            "message": l.message,
            "timestamp": l.timestamp.isoformat() if l.timestamp else None,
            "flagged": bool(getattr(l, 'flagged', False)),
            "status": getattr(l, 'status', 'new'),
            "priority": getattr(l, 'priority', 'medium'),
            "quality_score": float(getattr(l, 'quality_score', 0.0)),
            "internal_notes": getattr(l, 'internal_notes', ''),
            "last_contacted": l.last_contacted.isoformat() if l.last_contacted else None,
            "follow_up_date": l.follow_up_date.isoformat() if l.follow_up_date else None,
            "contact_history": getattr(l, 'contact_history', []),
            "tags": getattr(l, 'tags', []),
            "source": getattr(l, 'source', 'contact_form')
        }
    return [_serialize(l) for l in leads]

# 3. Endpoint to DELETE a lead (for the 'Purge' button in your UI)
@app.delete("/admin/leads/{lead_id}")
async def delete_lead(
    lead_id: int, 
    admin_key: str = None, 
    admin_token: str = None, 
    db: Session = Depends(get_db)
):
    if not _is_valid_admin(admin_key=admin_key, admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    lead = db.query(models.ContactLead).filter(models.ContactLead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    db.delete(lead)
    db.commit()
    return {"status": "Lead deleted"}

# 4. Endpoint to flag important a lead
@app.post("/admin/leads/{lead_id}/flag")
async def flag_lead(
    lead_id: int, 
    admin_key: str = None, 
    admin_token: str = None, 
    db: Session = Depends(get_db)
):
    if not _is_valid_admin(admin_key=admin_key, admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    lead = db.query(models.ContactLead).filter(models.ContactLead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    lead.flagged = True
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return {"status": "Lead flagged", "lead": {
        "id": lead.id,
        "flagged": lead.flagged
    }}

# 4b. Endpoint to unflag a lead
@app.post("/admin/leads/{lead_id}/unflag")
async def unflag_lead(
    lead_id: int,
    admin_key: str = None,
    admin_token: str = None,
    db: Session = Depends(get_db)
):
    if not _is_valid_admin(admin_key=admin_key, admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    lead = db.query(models.ContactLead).filter(models.ContactLead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    lead.flagged = False
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return {"status": "Lead unflagged", "lead": {
        "id": lead.id,
        "flagged": lead.flagged
    }}

# 6. Endpoint to search leads by keyword
@app.get("/admin/leads/search")
async def search_leads(
    query: str,
    admin_key: str = None,
    admin_token: str = None,
    db: Session = Depends(get_db)
):
    if not _is_valid_admin(admin_key=admin_key, admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    # Search across multiple fields
    leads = db.query(models.ContactLead).filter(
        (models.ContactLead.name.contains(query)) |
        (models.ContactLead.email.contains(query)) |
        (models.ContactLead.subject.contains(query)) |
        (models.ContactLead.message.contains(query)) |
        (models.ContactLead.internal_notes.contains(query))
    ).all()

    def _serialize(l):
        return {
            "id": l.id,
            "name": l.name,
            "email": l.email,
            "subject": l.subject,
            "company": l.company,
            "message": l.message,
            "timestamp": l.timestamp.isoformat() if l.timestamp else None,
            "flagged": bool(getattr(l, 'flagged', False)),
            "status": getattr(l, 'status', 'new'),
            "priority": getattr(l, 'priority', 'medium'),
            "quality_score": float(getattr(l, 'quality_score', 0.0)),
            "internal_notes": getattr(l, 'internal_notes', ''),
            "last_contacted": l.last_contacted.isoformat() if l.last_contacted else None,
            "follow_up_date": l.follow_up_date.isoformat() if l.follow_up_date else None,
            "contact_history": getattr(l, 'contact_history', []),
            "tags": getattr(l, 'tags', []),
            "source": getattr(l, 'source', 'contact_form')
        }
    return [_serialize(l) for l in leads]

# 7. Endpoint to filter leads by date range
@app.get("/admin/leads/filter")
async def filter_leads(
    start_date: str,
    end_date: str,
    admin_key: str = None,
    admin_token: str = None,
    db: Session = Depends(get_db)
):
    if not _is_valid_admin(admin_key=admin_key, admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    leads = db.query(models.ContactLead).filter(
        models.ContactLead.timestamp >= start_date,
        models.ContactLead.timestamp <= end_date
    ).all()

    def _serialize(l):
        return {
            "id": l.id,
            "name": l.name,
            "email": l.email,
            "subject": l.subject,
            "company": l.company,
            "message": l.message,
            "timestamp": l.timestamp.isoformat() if l.timestamp else None,
            "flagged": bool(getattr(l, 'flagged', False)),
            "status": getattr(l, 'status', 'new'),
            "priority": getattr(l, 'priority', 'medium'),
            "quality_score": float(getattr(l, 'quality_score', 0.0)),
            "internal_notes": getattr(l, 'internal_notes', ''),
            "last_contacted": l.last_contacted.isoformat() if l.last_contacted else None,
            "follow_up_date": l.follow_up_date.isoformat() if l.follow_up_date else None,
            "contact_history": getattr(l, 'contact_history', []),
            "tags": getattr(l, 'tags', []),
            "source": getattr(l, 'source', 'contact_form')
        }
    return [_serialize(l) for l in leads]

# 8. Endpoint to get lead statistics
@app.get("/admin/leads/stats")
async def lead_statistics(
    admin_key: str = None,
    admin_token: str = None,
    db: Session = Depends(get_db)
):
    if not _is_valid_admin(admin_key=admin_key, admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    total_leads = db.query(models.ContactLead).count()

    # Status distribution
    status_counts = {}
    for status in ['new', 'contacted', 'qualified', 'converted', 'lost']:
        count = db.query(models.ContactLead).filter(models.ContactLead.status == status).count()
        status_counts[status] = count

    # Calculate conversion rate (converted / total leads)
    converted_count = status_counts.get('converted', 0)
    conversion_rate = (converted_count / total_leads) * 100 if total_leads > 0 else 0

    # Average quality score
    avg_quality_score = db.query(models.ContactLead).filter(
        models.ContactLead.quality_score.isnot(None)
    ).with_entities(func.avg(models.ContactLead.quality_score)).scalar()
    avg_quality_score = float(avg_quality_score) if avg_quality_score else 0.0

    # Leads in last 30 days
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    leads_last_30_days = db.query(models.ContactLead).filter(
        models.ContactLead.timestamp >= thirty_days_ago
    ).count()

    return {
        "total_leads": total_leads,
        "status_distribution": status_counts,
        "conversion_rate": conversion_rate,
        "avg_quality_score": avg_quality_score,
        "leads_last_30_days": leads_last_30_days
    }

# --- Refactored Endpoints ---

# 9. Update lead status
@app.put("/admin/leads/{lead_id}/status")
async def update_lead_status(
    lead_id: int,
    data: StatusUpdate, # Automatically validates JSON body
    admin_token: Optional[str] = None,
    db: Session = Depends(database.get_db)
):
    if not _is_valid_admin(admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    lead = db.query(models.ContactLead).filter(models.ContactLead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    lead.status = data.status
    lead.last_contacted = datetime.now(timezone.utc)
    db.commit()
    return {"message": "Status updated", "id": lead_id, "status": lead.status}

@app.put("/admin/leads/{lead_id}/priority")
async def update_lead_priority(
    lead_id: int,
    data: PriorityRequest,
    admin_token: Optional[str] = None,
    admin_key: Optional[str] = None,
    db: Session = Depends(database.get_db)
):
    if not _is_valid_admin(admin_key=admin_key, admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    lead = db.query(models.ContactLead).filter(models.ContactLead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    # Important: use data.priority to get the value from the JSON body
    val = data.priority.lower()
    if val not in ['low', 'medium', 'high']:
        raise HTTPException(status_code=400, detail="Invalid priority value")

    lead.priority = val
    db.commit()
    return {"status": "success", "priority": lead.priority}




# 11. Update quality score
@app.put("/admin/leads/{lead_id}/quality-score")
async def update_quality_score(
    lead_id: int,
    data: ScoreRequest,  # This tells FastAPI to look for {"quality_score": 0.5} in JSON
    admin_token: Optional[str] = None,
    admin_key: Optional[str] = None,
    db: Session = Depends(database.get_db)
):
    if not _is_valid_admin(admin_key=admin_key, admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    lead = db.query(models.ContactLead).filter(models.ContactLead.id == lead_id).first()
    if not (0.0 <= data.quality_score <= 1.0):
        raise HTTPException(status_code=400, detail="Score must be between 0 and 1")

    lead.quality_score = data.quality_score
    db.commit()
    return {"status": "success", "quality_score": lead.quality_score}

# 12. Update internal notes
@app.put("/admin/leads/{lead_id}/notes")
async def update_internal_notes(
    lead_id: int,
    data: NotesUpdate,
    admin_token: Optional[str] = None,
    db: Session = Depends(database.get_db)
):
    if not _is_valid_admin(admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    lead = db.query(models.ContactLead).filter(models.ContactLead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    lead.internal_notes = data.internal_notes
    db.commit()
    return {"status": "Notes updated", "notes": lead.internal_notes}

# 15. Update lead tags
@app.put("/admin/leads/{lead_id}/tags")
async def update_lead_tags(
    lead_id: int,
    data: TagUpdate,
    admin_token: Optional[str] = None,
    db: Session = Depends(database.get_db)
):
    if not _is_valid_admin(admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    lead = db.query(models.ContactLead).filter(models.ContactLead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    lead.tags = data.tags
    # CRITICAL: Tell SQLAlchemy the list was modified
    flag_modified(lead, "tags") 
    
    db.commit()
    return {"status": "Tags updated", "tags": lead.tags}

# 16. Bulk update lead status
@app.put("/admin/leads/bulk/status")
async def bulk_update_status(
    data: BulkStatusUpdate,
    admin_token: Optional[str] = None,
    db: Session = Depends(database.get_db)
):
    if not _is_valid_admin(admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    if data.status not in ['new', 'contacted', 'qualified', 'converted', 'lost']:
        raise HTTPException(status_code=400, detail="Invalid status")

    updated_count = db.query(models.ContactLead).filter(
        models.ContactLead.id.in_(data.lead_ids)
    ).update({
        "status": data.status,
        "last_contacted": datetime.now(timezone.utc)
    }, synchronize_session=False)

    db.commit()
    return {"status": f"Updated {updated_count} leads"}
# 17. Bulk delete leads
@app.delete("/admin/leads/bulk")
async def bulk_delete_leads(
    lead_ids: str = Form(...),  # JSON string of array
    admin_key: str = None,
    admin_token: str = None,
    db: Session = Depends(get_db)
):
    import json

    if not _is_valid_admin(admin_key=admin_key, admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    try:
        ids_list = json.loads(lead_ids)
        if not isinstance(ids_list, list):
            raise ValueError("Lead IDs must be a list")
    except (json.JSONDecodeError, ValueError):
        raise HTTPException(status_code=400, detail="Invalid lead IDs format")

    # Delete all leads
    deleted_count = db.query(models.ContactLead).filter(
        models.ContactLead.id.in_(ids_list)
    ).delete()

    db.commit()
    return {"status": f"Deleted {deleted_count} leads", "deleted_count": deleted_count}

# 18. Export leads to CSV
@app.get("/admin/leads/export/csv")
async def export_leads_csv(
    admin_key: str = None,
    admin_token: str = None,
    db: Session = Depends(get_db)
):
    from fastapi.responses import StreamingResponse
    import csv
    import io

    if not _is_valid_admin(admin_key=admin_key, admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    leads = db.query(models.ContactLead).order_by(models.ContactLead.timestamp.desc()).all()

    # Create CSV content
    output = io.StringIO()
    writer = csv.writer(output)

    # Write header
    writer.writerow([
        'ID', 'Name', 'Email', 'Subject','Company', 'Message', 'Timestamp', 'Flagged',
        'Status', 'Priority', 'Quality Score', 'Internal Notes', 'Last Contacted',
        'Follow-up Date', 'Tags', 'Source'
    ])

    # Write data
    for lead in leads:
        writer.writerow([
            lead.id,
            lead.name,
            lead.email,
            lead.subject,
            lead.company,
            lead.message,
            lead.timestamp.isoformat() if lead.timestamp else '',
            lead.flagged,
            getattr(lead, 'status', 'new'),
            getattr(lead, 'priority', 'medium'),
            float(getattr(lead, 'quality_score', 0.0)),
            getattr(lead, 'internal_notes', ''),
            lead.last_contacted.isoformat() if lead.last_contacted else '',
            lead.follow_up_date.isoformat() if lead.follow_up_date else '',
            ','.join(getattr(lead, 'tags', [])),
            getattr(lead, 'source', 'contact_form')
        ])

    output.seek(0)

    def generate():
        yield output.getvalue()

    return StreamingResponse(
        generate(),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=leads_export.csv"}
    )

# 19. Get leads by status and priority filters
@app.get("/admin/leads/filtered")
async def get_filtered_leads(
    status: str = None,
    priority: str = None,
    min_score: float = None,
    admin_key: str = None,
    admin_token: str = None,
    db: Session = Depends(get_db)
):
    if not _is_valid_admin(admin_key=admin_key, admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    query = db.query(models.ContactLead)

    if status:
        query = query.filter(models.ContactLead.status == status)
    if priority:
        query = query.filter(models.ContactLead.priority == priority)
    if min_score is not None:
        query = query.filter(models.ContactLead.quality_score >= min_score)

    leads = query.order_by(models.ContactLead.timestamp.desc()).all()

    def _serialize(l):
        return {
            "id": l.id,
            "name": l.name,
            "email": l.email,
            "subject": l.subject,
            "company": l.company,
            "message": l.message,
            "timestamp": l.timestamp.isoformat() if l.timestamp else None,
            "flagged": bool(getattr(l, 'flagged', False)),
            "status": getattr(l, 'status', 'new'),
            "priority": getattr(l, 'priority', 'medium'),
            "quality_score": float(getattr(l, 'quality_score', 0.0)),
            "internal_notes": getattr(l, 'internal_notes', ''),
            "last_contacted": l.last_contacted.isoformat() if l.last_contacted else None,
            "follow_up_date": l.follow_up_date.isoformat() if l.follow_up_date else None,
            "contact_history": getattr(l, 'contact_history', []),
            "tags": getattr(l, 'tags', []),
            "source": getattr(l, 'source', 'contact_form')
        }
    return [_serialize(l) for l in leads]
