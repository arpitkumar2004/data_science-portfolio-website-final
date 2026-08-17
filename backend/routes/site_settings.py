"""Site settings, feature flags, maintainability & content management router."""
import json
import os
from datetime import datetime, timezone
from typing import Dict, Any, List

from fastapi import APIRouter, Depends, HTTPException, Body, status
from fastapi.responses import JSONResponse, StreamingResponse
from sqlalchemy.orm import Session

import database
import models
from services.auth_service_v2 import require_admin

router = APIRouter(prefix="/api/admin/site-settings", tags=["site-settings"])

# Default Feature Flags & Site Settings
DEFAULT_SETTINGS = {
    "maintenance_mode": False,
    "open_to_work": True,
    "recruiter_gateway_enabled": True,
    "contact_form_enabled": True,
    "active_resume_url": "/resume.pdf",
    "contact_email": "arpitkumar17773@gmail.com",
    "meta_title": "Arpit Kumar — ML Engineer & AI Researcher",
    "meta_description": "Portfolio of Arpit Kumar — ML Engineer & AI Researcher at IIT Kharagpur."
}

ABOUT_FILE_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "about.json")


def _get_setting_db(db: Session, key: str) -> Any:
    record = db.query(models.SiteSettingModel).filter(models.SiteSettingModel.key == key).first()
    if record:
        return record.value
    return DEFAULT_SETTINGS.get(key)


def _set_setting_db(db: Session, key: str, value: Any, description: str = ""):
    record = db.query(models.SiteSettingModel).filter(models.SiteSettingModel.key == key).first()
    if not record:
        record = models.SiteSettingModel(key=key, value=value, description=description)
        db.add(record)
    else:
        record.value = value
        if description:
            record.description = description
    db.commit()
    db.refresh(record)
    return record


@router.get("")
async def get_site_settings(
    db: Session = Depends(database.get_db),
    admin: dict = Depends(require_admin)
) -> Dict[str, Any]:
    """Retrieve all website configuration settings and feature flags."""
    settings = {}
    for key, default_val in DEFAULT_SETTINGS.items():
        settings[key] = _get_setting_db(db, key)
    return {"settings": settings}


@router.patch("")
async def update_site_settings(
    updates: Dict[str, Any] = Body(...),
    db: Session = Depends(database.get_db),
    admin: dict = Depends(require_admin)
) -> Dict[str, Any]:
    """Update specific website feature flags or site configuration settings."""
    updated = {}
    for key, value in updates.items():
        _set_setting_db(db, key, value)
        updated[key] = value
    return {"status": "success", "updated": updated}


# Public endpoint for site settings (maintenance mode, open to work status, etc.)
public_settings_router = APIRouter(prefix="/api/site-settings", tags=["public-settings"])


@public_settings_router.get("/public")
async def get_public_site_settings(db: Session = Depends(database.get_db)):
    """Public endpoint for frontend to read maintenance mode & feature flags."""
    return {
        "maintenance_mode": _get_setting_db(db, "maintenance_mode") or False,
        "open_to_work": _get_setting_db(db, "open_to_work") if _get_setting_db(db, "open_to_work") is not None else True,
        "recruiter_gateway_enabled": _get_setting_db(db, "recruiter_gateway_enabled") if _get_setting_db(db, "recruiter_gateway_enabled") is not None else True,
        "contact_form_enabled": _get_setting_db(db, "contact_form_enabled") if _get_setting_db(db, "contact_form_enabled") is not None else True,
        "active_resume_url": _get_setting_db(db, "active_resume_url") or "/resume.pdf"
    }


# ================= Content Management Endpoints =================

@router.get("/content/about")
async def get_about_content(admin: dict = Depends(require_admin)):
    """Read the current about.json structure for live editing."""
    if not os.path.exists(ABOUT_FILE_PATH):
        raise HTTPException(status_code=404, detail="about.json file not found")
    with open(ABOUT_FILE_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data


@router.put("/content/about")
async def update_about_content(
    content: Dict[str, Any] = Body(...),
    admin: dict = Depends(require_admin)
):
    """Save updated about.json profile content."""
    try:
        with open(ABOUT_FILE_PATH, "w", encoding="utf-8") as f:
            json.dump(content, f, indent=2, ensure_ascii=False)
        return {"status": "success", "message": "About section content saved successfully"}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to update about.json: {str(exc)}")


# ================= Database Backup & Export Endpoint =================

@router.post("/backup")
async def create_database_backup(
    db: Session = Depends(database.get_db),
    admin: dict = Depends(require_admin)
):
    """Generate a full JSON dump of projects, leads, and site settings."""
    projects = db.query(models.ProjectModel).all()
    leads = db.query(models.ContactLead).all()
    settings = db.query(models.SiteSettingModel).all()

    project_list = []
    for p in projects:
        project_list.append({
            "id": p.id,
            "title": p.title,
            "category": p.category,
            "type": p.type,
            "description": p.description,
            "long_description": p.long_description,
            "tags": p.tags,
            "technologies": p.technologies,
            "created_at": p.created_at.isoformat() if p.created_at else None
        })

    lead_list = []
    for l in leads:
        lead_list.append({
            "id": l.id,
            "name": l.name,
            "email": l.email,
            "subject": l.subject,
            "message": l.message,
            "status": l.status.value if hasattr(l.status, 'value') else l.status,
            "priority": l.priority.value if hasattr(l.priority, 'value') else l.priority,
            "created_at": l.created_at.isoformat() if l.created_at else None
        })

    backup_data = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "projects_count": len(project_list),
        "leads_count": len(lead_list),
        "projects": project_list,
        "leads": lead_list,
        "settings": {s.key: s.value for s in settings}
    }

    dump_str = json.dumps(backup_data, indent=2)
    return StreamingResponse(
        iter([dump_str]),
        media_type="application/json",
        headers={"Content-Disposition": f"attachment; filename=portfolio_backup_{int(datetime.now().timestamp())}.json"}
    )
