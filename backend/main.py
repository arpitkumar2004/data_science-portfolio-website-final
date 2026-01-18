import os
import secrets
import time
from datetime import datetime, timedelta, timezone
from fastapi import FastAPI, Depends, Form, HTTPException, status, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import inspect, text, func
from typing import List
from database import engine, get_db
from sqlalchemy.orm.attributes import flag_modified
from typing import List, Optional
from pydantic import BaseModel, Field
import models, database
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from starlette.responses import JSONResponse
from pydantic import EmailStr
from dotenv import load_dotenv

load_dotenv()

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
    "https://arpitkumar-arpitkumar2004s-projects.vercel.app", # Removed trailing slash
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
# --- EMAIL CONFIGURATION ---
conf = ConnectionConfig(
    MAIL_USERNAME = os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD"),
    MAIL_FROM = os.getenv("MAIL_FROM"),
    MAIL_PORT = int(os.getenv("MAIL_PORT")),
    MAIL_SERVER = os.getenv("MAIL_SERVER"),
    MAIL_FROM_NAME = os.getenv("MAIL_FROM_NAME"),
    MAIL_STARTTLS = True,
    MAIL_SSL_TLS = False,
    USE_CREDENTIALS = True,
    VALIDATE_CERTS = True
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
    name: str = Form(...),
    email: str = Form(...),
    subject: str = Form(...),
    message: str = Form(...),
    company: str = Form(None),
    formType: str = Form("contacts"),
    role: str = Form(None),
    db: Session = Depends(get_db)
):
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
        return {"status": "success", "id": new_lead.id}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

# --- API ENDPOINT: CV REQUEST & DISPATCH ---

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
    # 1. Save Lead to PostgreSQL Database
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
        # We continue even if DB fails to ensure the user gets the CV

    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body {{ margin: 0; padding: 0; background-color: #f4f7fa; }}
            .container {{ font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }}
            
            /* Technical Header */
            .header {{ background-color: #0f172a; padding: 30px; color: #ffffff; border-bottom: 4px solid #2563eb; }}
            .sys-log {{ font-family: 'Courier New', monospace; font-size: 10px; color: #60a5fa; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; }}
            .title {{ font-size: 24px; font-weight: 800; letter-spacing: -0.5px; margin: 0; }}
            
            /* Content Area */
            .body {{ padding: 35px; color: #334155; }}
            .intro {{ font-size: 16px; margin-bottom: 25px; border-left: 3px solid #2563eb; padding-left: 15px; }}
            .highlight {{ color: #2563eb; font-weight: 700; }}
            
            /* Why Hire Me - Matrix */
            .matrix-title {{ font-size: 12px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 15px; }}
            .value-item {{ margin-bottom: 15px; }}
            .value-label {{ font-weight: 700; color: #0f172a; font-size: 14px; display: block; }}
            .value-desc {{ font-size: 13px; color: #64748b; margin: 2px 0 0 0; }}

            /* Skill Dashboard Simulation */
            .dashboard {{ background-color: #f8fafc; border-radius: 12px; padding: 20px; margin: 25px 0; border: 1px solid #e2e8f0; }}
            .stat-bar {{ height: 6px; background: #e2e8f0; border-radius: 3px; margin: 8px 0 15px 0; overflow: hidden; }}
            .stat-fill {{ height: 100%; background: #2563eb; border-radius: 3px; }}

            /* CTA Buttons */
            .cta-hub {{ margin-top: 30px; }}
            .btn-main {{ display: block; background-color: #2563eb; color: #ffffff !important; text-decoration: none; padding: 16px; border-radius: 8px; text-align: center; font-weight: 700; font-size: 15px; margin-bottom: 10px; }}
            .btn-outline {{ display: inline-block; width: 48%; background-color: #ffffff; color: #0f172a !important; text-decoration: none; padding: 12px 0; border-radius: 8px; text-align: center; font-weight: 700; font-size: 13px; border: 1px solid #e2e8f0; }}
            
            .footer-graphic {{ background: #0f172a; padding: 20px; text-align: center; }}
            .schematic {{ font-family: 'Courier New', monospace; font-size: 9px; color: #334155; line-height: 1.2; text-align: center; padding: 20px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 class="title">Technical Dossier(CV): Arpit Kumar</h1>
            </div>
            
            <div class="body">
                <div class="intro">
                    Hello <b>{name}</b>,<br>
                    Acknowledging your inquiry regarding <b>{subject.replace('CV Request: ', '')}</b> for <b>{company}</b>. 
                    Please find my technical credentials attached.
                </div>

                <div class="matrix-title">Capabilities Portfolio</div>
                
                <div class="value-item">
                    <span class="value-label">01. Mathematical Rigor (IIT Kharagpur)</span>
                    <p class="value-desc">Integrated Dual Degree candidate with a 8.46 CGPA. I build ML architectures from first-principles math, not just high-level wrappers.</p>
                </div>

                <div class="value-item">
                    <span class="value-label">02. Engineering at Scale</span>
                    <p class="value-desc">Expertise in deploying MLOps pipelines (Docker, FastAPI, Kubernetes) that bridge the gap between research code and production environments.</p>
                </div>

                <div class="value-item">
                    <span class="value-label">03. Domain Breadth</span>
                    <p class="value-desc">Proven impact across Deep Learning, Machine Learning, Full Stack Applications and Chemical Process Optimization.</p>
                </div>

                <div class="dashboard">
                    <div style="font-size: 11px; font-weight: bold; color: #64748b;">CORE STACK PROFICIENCY</div>
                    <div style="font-size: 12px; margin-top: 10px;">Deep Learning (PyTorch/JAX)</div>
                    <div class="stat-bar"><div class="stat-fill" style="width: 95%;"></div></div>
                    <div style="font-size: 12px;">Machine Learning</div>
                    <div class="stat-bar"><div class="stat-fill" style="width: 88%;"></div></div>
                    <div style="font-size: 12px;">MLOps & Backend</div>
                    <div class="stat-bar"><div class="stat-fill" style="width: 92%;"></div></div>
                </div>

                <div class="matrix-title">Recruiter Action Hub</div>
                <div class="cta-hub">
                    <a href="https://calendly.com/kumararpit17773/30min" class="btn-main">Schedule Technical Interview &rarr;</a>
                    <div style="width: 100%;">
                        <a href="{VITE_API_URL}" class="btn-outline">Browse Research</a>
                        <a href="https://wa.me/{phone}" class="btn-outline" style="float: right;">Direct Chat</a>
                    </div>
                </div>
            </div>

            <div class="schematic">
                _______________________________________________________
                <br>
                <br>
                 SYSTEM_ENCRYPTION: AES-256 <br>
                 ORIGIN: ARPIT_KUMAR_SECURE_TERMINAL <br>
                _______________________________________________________
                <br>
                <br>
                AI_RESEARCHER // DATA_SCIENTIST // FULL_STACK_DEVELOPER
                <br>
                ________________________________________________________<br>
            </div>

            <div class="footer-graphic">
                <div style="color: #64748b; font-size: 10px; font-family: monospace;">
                    © {datetime.now().year} ARPIT KUMAR // ALL RIGHTS RESERVED // CONFIDENTIAL CV DISPATCH SYSTEM
                </div>
            </div>
        </div>
    </body>
    </html>
    """

    # 3. Handle Attachment Path
    # Ensure AK_CV.pdf is inside a folder named 'assets' in your backend directory
    cv_path = os.path.join(os.getcwd(), "assets", "AK_CV.pdf")
    
    if not os.path.exists(cv_path):
        raise HTTPException(status_code=500, detail="CV File not found on server. Contact admin.")

    # 4. Create Email Message
    email_message = MessageSchema(
        subject=f"Technical CV - Arpit Kumar | {company}",
        recipients=[email],
        body=html,
        subtype=MessageType.html,
        attachments=[cv_path]
    )

    # 5. Send Email in Background (So the user doesn't wait for SMTP to finish)
    fm = FastMail(conf)
    background_tasks.add_task(fm.send_message, email_message)

    return {"status": "success", "detail": "Dispatch sequence initiated"}

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
