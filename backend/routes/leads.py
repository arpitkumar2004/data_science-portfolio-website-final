"""Lead management endpoints with rate limiting and JWT auth"""
from fastapi import APIRouter, Depends, Form, HTTPException, status, BackgroundTasks, Request, Body
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from typing import Optional
from slowapi import Limiter
from slowapi.util import get_remote_address
from starlette.concurrency import run_in_threadpool
from email_validator import validate_email, EmailNotValidError
import json
import csv
import io

import database
import models
from schemas.lead import (
    StatusUpdate, PriorityRequest, ScoreRequest, NotesUpdate, TagUpdate,
    BulkStatusUpdate
)
from services.auth_service import validate_admin
from services.auth_service_v2 import require_admin
from services.lead_service import (
    create_contact_lead, get_all_leads, get_lead_by_id, delete_lead,
    update_lead_status, update_lead_priority, update_lead_quality_score,
    update_lead_notes, update_lead_tags, flag_lead, unflag_lead,
    search_leads, filter_leads_by_date, get_filtered_leads,
    bulk_update_status, bulk_delete_leads, get_lead_statistics
)
from services.email_service import (
    send_contact_acknowledgment,
    send_cv_request_email,
    send_recruiter_login_email,
    send_admin_notification,
)
from utils.serializers import serialize_contact_lead
from config import RATE_LIMIT_PUBLIC, RATE_LIMIT_ADMIN, ADMIN_EMAIL, VITE_API_URL

router = APIRouter(prefix="/api", tags=["leads"])
limiter = Limiter(key_func=get_remote_address)


def _validate_contact_payload(name: str, email: str, subject: str, message: str) -> None:
    """Basic validation to prevent malformed or abusive submissions."""
    try:
        validate_email(email)
    except EmailNotValidError as exc:  # pragma: no cover - runtime validation
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))

    if len(subject) > 300:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Subject too long (max 300 chars)")
    if len(message) > 5000:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Message too long (max 5000 chars)")
    if len(name) > 200:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Name too long (max 200 chars)")


# ============= PUBLIC ENDPOINTS =============

@router.post("/submit-contact")
@limiter.limit(RATE_LIMIT_PUBLIC)
async def submit_contact(
    request: Request,
    background_tasks: BackgroundTasks,
    name: str = Form(...),
    email: str = Form(...),
    subject: str = Form(...),
    message: str = Form(...),
    company: str = Form(None),
    formType: str = Form("contacts"),
    role: str = Form(None),
    db: Session = Depends(database.get_db)
):
    """
    Submit a contact form inquiry.
    Saves lead to database with metadata and sends acknowledgment email asynchronously.
    Rate limited to prevent spam.
    """
    _validate_contact_payload(name=name, email=email, subject=subject, message=message)

    try:
        # Capture "Honey Trap" metadata
        metadata = {
            "ip_address": request.client.host,
            "user_agent": request.headers.get("user-agent", ""),
            "referer": request.headers.get("referer", ""),
            "origin": request.headers.get("origin", ""),
        }
        
        # Persist lead to database
        new_lead = await run_in_threadpool(
            create_contact_lead,
            db,
            name,
            email,
            subject,
            message,
            company,
            formType,
            role,
            metadata,
            models.LeadType.CONTACT,
        )
    except Exception as e:
        print(f"Database Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to save contact")

    # ── Dispatch the right email based on role ──
    is_recruiter = role and role.strip().lower() == "recruiter"

    if is_recruiter:
        # Recruiter verification → high-conversion welcome email with CV
        login_link = f"{VITE_API_URL}/recruiter-dashboard"
        background_tasks.add_task(
            send_recruiter_login_email,
            name=name,
            email=email,
            login_link=login_link,
            company=company,
        )
        lead_type = "Recruiter Login"
    else:
        # Regular visitor → standard contact acknowledgment
        background_tasks.add_task(
            send_contact_acknowledgment,
            name=name,
            email=email,
            subject=subject,
            message=message,
        )
        lead_type = "Contact"

    # ── Always notify admin about the new lead ──
    if ADMIN_EMAIL:
        background_tasks.add_task(
            send_admin_notification,
            admin_email=ADMIN_EMAIL,
            lead_type=lead_type,
            name=name,
            email=email,
            subject=subject,
            message=message,
            company=company,
            role=role,
            metadata=metadata,
        )

    return {
        "status": "success",
        "id": new_lead.id,
        "message": "Inquiry logged and acknowledgment dispatched."
    }


@router.post("/v1/request-cv")
@limiter.limit(RATE_LIMIT_PUBLIC)
async def handle_cv_request(
    request: Request,
    background_tasks: BackgroundTasks,
    name: str = Form(...),
    email: str = Form(...),
    company: str = Form(...),
    subject: str = Form(...),
    message: str = Form(...),
    role: str = Form(None),
    db: Session = Depends(database.get_db)
):
    """
    Submit a CV request.
    Saves lead to database and sends CV with email asynchronously.
    Rate limited to prevent abuse.
    """
    _validate_contact_payload(name=name, email=email, subject=subject, message=message)

    try:
        # Capture metadata
        metadata = {
            "ip_address": request.client.host,
            "user_agent": request.headers.get("user-agent", ""),
            "referer": request.headers.get("referer", ""),
        }
        
        # Save lead to database
        new_lead = await run_in_threadpool(
            create_contact_lead,
            db,
            name,
            email,
            subject,
            message,
            company,
            "CV_DISPATCH_SYSTEM",
            role,
            metadata,
            models.LeadType.CV_REQUEST,
        )
    except Exception as e:
        print(f"Database Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to save CV request")

    # Send CV email asynchronously
    background_tasks.add_task(
        send_cv_request_email,
        name=name,
        email=email,
        company=company,
        subject=subject,
    )

    # Notify admin about the CV request
    if ADMIN_EMAIL:
        background_tasks.add_task(
            send_admin_notification,
            admin_email=ADMIN_EMAIL,
            lead_type="CV Request",
            name=name,
            email=email,
            subject=subject,
            message=message,
            company=company,
            role=role,
            metadata=metadata,
        )

    return {"status": "success", "detail": "Dispatch sequence initiated via Resend API"}


    # ============= ADMIN ENDPOINTS =============

@router.get("/admin/leads")
@limiter.limit(RATE_LIMIT_ADMIN)
async def get_admin_leads(
    request: Request,
    admin: dict = Depends(require_admin),
    db: Session = Depends(database.get_db)
):
    """Get all leads (admin only)"""
    return get_all_leads(db)



@router.get("/admin/leads/stats")
@limiter.limit(RATE_LIMIT_ADMIN)
async def lead_statistics_endpoint(
    request: Request,
    admin: dict = Depends(require_admin),
    db: Session = Depends(database.get_db)
):
    return get_lead_statistics(db)


@router.get("/admin/leads/search")
@limiter.limit(RATE_LIMIT_ADMIN)
async def search_leads_endpoint(
    request: Request,
    q: str,
    admin: dict = Depends(require_admin),
    db: Session = Depends(database.get_db)
):
    return search_leads(db, q)


@router.get("/admin/leads/filter")
@limiter.limit(RATE_LIMIT_ADMIN)
async def filter_leads_endpoint(
    request: Request,
    start_date: str,
    end_date: str,
    admin: dict = Depends(require_admin),
    db: Session = Depends(database.get_db)
):
    return filter_leads_by_date(db, start_date, end_date)



@router.get("/admin/leads/export")
@limiter.limit(RATE_LIMIT_ADMIN)
async def export_leads(
    request: Request,
    format: str = "csv",
    admin: dict = Depends(require_admin),
    db: Session = Depends(database.get_db)
):
    leads = get_all_leads(db)

    if format == "json":
        output = json.dumps(leads)
        return StreamingResponse(iter([output]), media_type="application/json")

    # Default CSV
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow([
        'ID', 'Name', 'Email', 'Subject', 'Company', 'Message', 'Created At', 'Updated At', 'Flagged',
        'Status', 'Priority', 'Quality Score', 'Internal Notes', 'Last Contacted',
        'Follow-up Date', 'Tags', 'Source', 'Lead Type'
    ])

    # Write data
    for lead in leads:
        writer.writerow([
            lead.get('id'),
            lead.get('name'),
            lead.get('email'),
            lead.get('subject'),
            lead.get('company'),
            lead.get('message'),
            lead.get('created_at') or lead.get('timestamp') or '',
            lead.get('updated_at') or '',
            lead.get('flagged'),
            lead.get('status'),
            lead.get('priority'),
            lead.get('quality_score'),
            lead.get('internal_notes'),
            lead.get('last_contacted') or '',
            lead.get('follow_up_date') or '',
            ','.join(lead.get('tags', [])),
            lead.get('source'),
            lead.get('lead_type'),
        ])

    output.seek(0)

    def generate():
        yield output.getvalue()

    return StreamingResponse(
        generate(),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=leads_export.csv"}
    )


@router.get("/admin/leads/filtered")
@limiter.limit(RATE_LIMIT_ADMIN)
async def get_filtered_leads_endpoint(
    request: Request,
    status: str = None,
    priority: str = None,
    min_score: float = None,
    admin: dict = Depends(require_admin),
    db: Session = Depends(database.get_db)
):
    """Get leads with optional filters (admin only)"""
    return get_filtered_leads(db, status=status, priority=priority, min_score=min_score)


@router.get("/admin/leads/{lead_id}")
@limiter.limit(RATE_LIMIT_ADMIN)
async def get_lead_endpoint(
    request: Request,
    lead_id: int,
    admin: dict = Depends(require_admin),
    db: Session = Depends(database.get_db)
):
    lead = get_lead_by_id(db, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return serialize_contact_lead(lead)


@router.delete("/admin/leads/{lead_id}")
@limiter.limit(RATE_LIMIT_ADMIN)
async def delete_lead_endpoint(
    request: Request,
    lead_id: int,
    admin: dict = Depends(require_admin),
    db: Session = Depends(database.get_db)
):
    if not delete_lead(db, lead_id):
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"status": "Lead deleted"}


@router.post("/admin/leads/{lead_id}/flag")
@limiter.limit(RATE_LIMIT_ADMIN)
async def flag_lead_endpoint(
    request: Request,
    lead_id: int,
    admin: dict = Depends(require_admin),
    db: Session = Depends(database.get_db)
):
    lead = flag_lead(db, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"status": "Lead flagged", "lead": {"id": lead.id, "flagged": lead.flagged}}


@router.post("/admin/leads/{lead_id}/unflag")
@limiter.limit(RATE_LIMIT_ADMIN)
async def unflag_lead_endpoint(
    request: Request,
    lead_id: int,
    admin: dict = Depends(require_admin),
    db: Session = Depends(database.get_db)
):
    lead = unflag_lead(db, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"status": "Lead unflagged", "lead": {"id": lead.id, "flagged": lead.flagged}}


@router.patch("/admin/leads/{lead_id}/status")
@limiter.limit(RATE_LIMIT_ADMIN)
async def update_status_endpoint(
    request: Request,
    lead_id: int,
    data: StatusUpdate,
    admin: dict = Depends(require_admin),
    db: Session = Depends(database.get_db)
):
    lead = update_lead_status(db, lead_id, data.status)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return serialize_contact_lead(lead)


@router.patch("/admin/leads/{lead_id}/priority")
@limiter.limit(RATE_LIMIT_ADMIN)
async def update_priority_endpoint(
    request: Request,
    lead_id: int,
    data: PriorityRequest,
    admin: dict = Depends(require_admin),
    db: Session = Depends(database.get_db)
):
    val = data.priority.lower()
    lead = update_lead_priority(db, lead_id, val)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return serialize_contact_lead(lead)


@router.patch("/admin/leads/{lead_id}/quality-score")
@limiter.limit(RATE_LIMIT_ADMIN)
async def update_quality_score_endpoint(
    request: Request,
    lead_id: int,
    data: ScoreRequest,
    admin: dict = Depends(require_admin),
    db: Session = Depends(database.get_db)
):
    if not (0.0 <= data.quality_score <= 1.0):
        raise HTTPException(status_code=400, detail="Score must be between 0 and 1")
    lead = update_lead_quality_score(db, lead_id, data.quality_score)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return serialize_contact_lead(lead)


@router.patch("/admin/leads/{lead_id}/notes")
@limiter.limit(RATE_LIMIT_ADMIN)
async def update_notes_endpoint(
    request: Request,
    lead_id: int,
    data: NotesUpdate,
    admin: dict = Depends(require_admin),
    db: Session = Depends(database.get_db)
):
    lead = update_lead_notes(db, lead_id, data.internal_notes)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return serialize_contact_lead(lead)


@router.patch("/admin/leads/{lead_id}/tags")
@limiter.limit(RATE_LIMIT_ADMIN)
async def update_tags_endpoint(
    request: Request,
    lead_id: int,
    data: TagUpdate,
    admin: dict = Depends(require_admin),
    db: Session = Depends(database.get_db)
):
    lead = update_lead_tags(db, lead_id, data.tags)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return serialize_contact_lead(lead)


@router.patch("/admin/leads/bulk-status")
@limiter.limit(RATE_LIMIT_ADMIN)
async def bulk_update_status_endpoint(
    request: Request,
    data: BulkStatusUpdate,
    admin: dict = Depends(require_admin),
    db: Session = Depends(database.get_db)
):
    updated_count = bulk_update_status(db, data.lead_ids, data.status)
    return {"status": f"Updated {updated_count} leads"}


@router.delete("/admin/leads/bulk-delete")
@limiter.limit(RATE_LIMIT_ADMIN)
async def bulk_delete_leads_endpoint(
    request: Request,
    data: dict = Body(...),
    admin: dict = Depends(require_admin),
    db: Session = Depends(database.get_db)
):
    ids_list = data.get("lead_ids") if isinstance(data, dict) else None
    if not isinstance(ids_list, list):
        raise HTTPException(status_code=400, detail="lead_ids must be a list")
    deleted_count = bulk_delete_leads(db, ids_list)
    return {"status": f"Deleted {deleted_count} leads", "deleted_count": deleted_count}


