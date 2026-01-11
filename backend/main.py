import os
import secrets
import time
from datetime import datetime, timedelta
from fastapi import FastAPI, Depends, Form, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import inspect, text
from typing import List

import models
from database import engine, get_db

# Create the tables in Neon if they don't exist
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Arpit's Portfolio Backend")

# --- CORS CONFIGURATION ---
# Allows your React app (running on localhost:5173) to talk to this API
origins = [
    "http://localhost:5173",          # Local development
    "https://data-science-portfolio-website-fina.vercel.app/", # Your Vercel URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["https://portfolio-backend-dk8c.onrender.com"],  # For production, replace with your Vercel URL
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

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
    return {"is_admin": True, "admin_token": token, "expires_in": 3600}

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
    formType: str = Form("contacts"),
    db: Session = Depends(get_db)
):
    try:
        new_lead = models.ContactLead(
            name=name,
            email=email,
            subject=subject,
            message=message,
            form_type=formType
        )
        db.add(new_lead)
        db.commit()
        db.refresh(new_lead)
        return {"status": "success", "id": new_lead.id}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

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
    # Convert to JSON-serializable dicts
    def _serialize(l):
        return {
            "id": l.id,
            "name": l.name,
            "email": l.email,
            "subject": l.subject,
            "message": l.message,
            "timestamp": l.timestamp.isoformat() if l.timestamp else None,
            "flagged": bool(getattr(l, 'flagged', False))
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
    
    leads = db.query(models.ContactLead).filter(models.ContactLead.message.contains(query)).all()
    def _serialize(l):
        return {
            "id": l.id,
            "name": l.name,
            "email": l.email,
            "subject": l.subject,
            "message": l.message,
            "timestamp": l.timestamp.isoformat() if l.timestamp else None,
            "flagged": bool(getattr(l, 'flagged', False))
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
            "message": l.message,
            "timestamp": l.timestamp.isoformat() if l.timestamp else None,
            "flagged": bool(getattr(l, 'flagged', False))
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
    total_flagged_leads = db.query(models.ContactLead).filter(models.ContactLead.flagged == True).count()
    total_unflagged_leads = db.query(models.ContactLead).filter(models.ContactLead.flagged == False).count()
    
    # Add more stats as needed
    
    return {
        "total_leads": total_leads,
        "total_flagged_leads": total_flagged_leads,
        "total_unflagged_leads": total_unflagged_leads,
        # Add more stats as needed
    }