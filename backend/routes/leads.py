"""Lead management endpoints"""
from fastapi import APIRouter, Depends, Form, HTTPException, status, BackgroundTasks
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from typing import Optional
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
from services.lead_service import (
    create_contact_lead, get_all_leads, get_lead_by_id, delete_lead,
    update_lead_status, update_lead_priority, update_lead_quality_score,
    update_lead_notes, update_lead_tags, flag_lead, unflag_lead,
    search_leads, filter_leads_by_date, get_filtered_leads,
    bulk_update_status, bulk_delete_leads, get_lead_statistics
)
from services.email_service import send_contact_acknowledgment, send_cv_request_email
from utils.serializers import serialize_contact_lead

router = APIRouter(prefix="/api", tags=["leads"])


# ============= PUBLIC ENDPOINTS =============

@router.post("/submit-contact")
async def submit_contact(
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
    Saves lead to database and sends acknowledgment email asynchronously.
    """
    try:
        # Persist lead to database
        new_lead = create_contact_lead(
            db=db,
            name=name,
            email=email,
            subject=subject,
            message=message,
            company=company,
            form_type=formType,
            role=role
        )
    except Exception as e:
        print(f"Database Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to save contact")

    # Send acknowledgment email asynchronously
    background_tasks.add_task(
        send_contact_acknowledgment,
        name=name,
        email=email,
        subject=subject,
        message=message
    )

    return {
        "status": "success",
        "id": new_lead.id,
        "message": "Inquiry logged and acknowledgment dispatched."
    }


@router.post("/v1/request-cv")
async def handle_cv_request(
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
    """
    try:
        # Save lead to database
        new_lead = create_contact_lead(
            db=db,
            name=name,
            email=email,
            subject=subject,
            message=message,
            company=company,
            form_type="CV_DISPATCH_SYSTEM",
            role=role
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
        subject=subject
    )

    return {"status": "success", "detail": "Dispatch sequence initiated via Resend API"}


# ============= ADMIN ENDPOINTS =============

@router.get("/admin/leads")
async def get_admin_leads(
    admin_key: str = None,
    admin_token: str = None,
    db: Session = Depends(database.get_db)
):
    """Get all leads (admin only)"""
    if not validate_admin(admin_key=admin_key, admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Invalid Admin Credentials")

    return get_all_leads(db)


@router.delete("/admin/leads/{lead_id}")
async def delete_lead_endpoint(
    lead_id: int,
    admin_key: str = None,
    admin_token: str = None,
    db: Session = Depends(database.get_db)
):
    """Delete a specific lead (admin only)"""
    if not validate_admin(admin_key=admin_key, admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    if not delete_lead(db, lead_id):
        raise HTTPException(status_code=404, detail="Lead not found")

    return {"status": "Lead deleted"}


@router.post("/admin/leads/{lead_id}/flag")
async def flag_lead_endpoint(
    lead_id: int,
    admin_key: str = None,
    admin_token: str = None,
    db: Session = Depends(database.get_db)
):
    """Flag a lead as important (admin only)"""
    if not validate_admin(admin_key=admin_key, admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    lead = flag_lead(db, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    return {"status": "Lead flagged", "lead": {"id": lead.id, "flagged": lead.flagged}}


@router.post("/admin/leads/{lead_id}/unflag")
async def unflag_lead_endpoint(
    lead_id: int,
    admin_key: str = None,
    admin_token: str = None,
    db: Session = Depends(database.get_db)
):
    """Unflag a lead (admin only)"""
    if not validate_admin(admin_key=admin_key, admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    lead = unflag_lead(db, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    return {"status": "Lead unflagged", "lead": {"id": lead.id, "flagged": lead.flagged}}


@router.get("/admin/leads/search")
async def search_leads_endpoint(
    query: str,
    admin_key: str = None,
    admin_token: str = None,
    db: Session = Depends(database.get_db)
):
    """Search leads by keyword (admin only)"""
    if not validate_admin(admin_key=admin_key, admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    return search_leads(db, query)


@router.get("/admin/leads/filter")
async def filter_leads_endpoint(
    start_date: str,
    end_date: str,
    admin_key: str = None,
    admin_token: str = None,
    db: Session = Depends(database.get_db)
):
    """Filter leads by date range (admin only)"""
    if not validate_admin(admin_key=admin_key, admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    return filter_leads_by_date(db, start_date, end_date)


@router.get("/admin/leads/stats")
async def lead_statistics_endpoint(
    admin_key: str = None,
    admin_token: str = None,
    db: Session = Depends(database.get_db)
):
    """Get lead statistics (admin only)"""
    if not validate_admin(admin_key=admin_key, admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    return get_lead_statistics(db)


@router.put("/admin/leads/{lead_id}/status")
async def update_status_endpoint(
    lead_id: int,
    data: StatusUpdate,
    admin_token: Optional[str] = None,
    db: Session = Depends(database.get_db)
):
    """Update lead status (admin only)"""
    if not validate_admin(admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    lead = update_lead_status(db, lead_id, data.status)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    return {"message": "Status updated", "id": lead_id, "status": lead.status}


@router.put("/admin/leads/{lead_id}/priority")
async def update_priority_endpoint(
    lead_id: int,
    data: PriorityRequest,
    admin_token: Optional[str] = None,
    admin_key: Optional[str] = None,
    db: Session = Depends(database.get_db)
):
    """Update lead priority (admin only)"""
    if not validate_admin(admin_key=admin_key, admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    val = data.priority.lower()
    if val not in ['low', 'medium', 'high']:
        raise HTTPException(status_code=400, detail="Invalid priority value")

    lead = update_lead_priority(db, lead_id, val)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    return {"status": "success", "priority": lead.priority}


@router.put("/admin/leads/{lead_id}/quality-score")
async def update_quality_score_endpoint(
    lead_id: int,
    data: ScoreRequest,
    admin_token: Optional[str] = None,
    admin_key: Optional[str] = None,
    db: Session = Depends(database.get_db)
):
    """Update lead quality score (admin only)"""
    if not validate_admin(admin_key=admin_key, admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    if not (0.0 <= data.quality_score <= 1.0):
        raise HTTPException(status_code=400, detail="Score must be between 0 and 1")

    lead = update_lead_quality_score(db, lead_id, data.quality_score)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    return {"status": "success", "quality_score": lead.quality_score}


@router.put("/admin/leads/{lead_id}/notes")
async def update_notes_endpoint(
    lead_id: int,
    data: NotesUpdate,
    admin_token: Optional[str] = None,
    db: Session = Depends(database.get_db)
):
    """Update lead internal notes (admin only)"""
    if not validate_admin(admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    lead = update_lead_notes(db, lead_id, data.internal_notes)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    return {"status": "Notes updated", "notes": lead.internal_notes}


@router.put("/admin/leads/{lead_id}/tags")
async def update_tags_endpoint(
    lead_id: int,
    data: TagUpdate,
    admin_token: Optional[str] = None,
    db: Session = Depends(database.get_db)
):
    """Update lead tags (admin only)"""
    if not validate_admin(admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    lead = update_lead_tags(db, lead_id, data.tags)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    return {"status": "Tags updated", "tags": lead.tags}


@router.put("/admin/leads/bulk/status")
async def bulk_update_status_endpoint(
    data: BulkStatusUpdate,
    admin_token: Optional[str] = None,
    db: Session = Depends(database.get_db)
):
    """Update status for multiple leads (admin only)"""
    if not validate_admin(admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    if data.status not in ['new', 'contacted', 'qualified', 'converted', 'lost']:
        raise HTTPException(status_code=400, detail="Invalid status")

    updated_count = bulk_update_status(db, data.lead_ids, data.status)
    return {"status": f"Updated {updated_count} leads"}


@router.delete("/admin/leads/bulk")
async def bulk_delete_leads_endpoint(
    lead_ids: str = Form(...),
    admin_key: str = None,
    admin_token: str = None,
    db: Session = Depends(database.get_db)
):
    """Delete multiple leads (admin only)"""
    if not validate_admin(admin_key=admin_key, admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    try:
        ids_list = json.loads(lead_ids)
        if not isinstance(ids_list, list):
            raise ValueError("Lead IDs must be a list")
    except (json.JSONDecodeError, ValueError):
        raise HTTPException(status_code=400, detail="Invalid lead IDs format")

    deleted_count = bulk_delete_leads(db, ids_list)
    return {"status": f"Deleted {deleted_count} leads", "deleted_count": deleted_count}


@router.get("/admin/leads/export/csv")
async def export_leads_csv(
    admin_key: str = None,
    admin_token: str = None,
    db: Session = Depends(database.get_db)
):
    """Export all leads to CSV (admin only)"""
    if not validate_admin(admin_key=admin_key, admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    leads = get_all_leads(db)

    # Create CSV content
    output = io.StringIO()
    writer = csv.writer(output)

    # Write header
    writer.writerow([
        'ID', 'Name', 'Email', 'Subject', 'Company', 'Message', 'Timestamp', 'Flagged',
        'Status', 'Priority', 'Quality Score', 'Internal Notes', 'Last Contacted',
        'Follow-up Date', 'Tags', 'Source'
    ])

    # Write data
    for lead in leads:
        writer.writerow([
            lead['id'],
            lead['name'],
            lead['email'],
            lead['subject'],
            lead['company'],
            lead['message'],
            lead['timestamp'] or '',
            lead['flagged'],
            lead['status'],
            lead['priority'],
            lead['quality_score'],
            lead['internal_notes'],
            lead['last_contacted'] or '',
            lead['follow_up_date'] or '',
            ','.join(lead['tags']),
            lead['source']
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
async def get_filtered_leads_endpoint(
    status: str = None,
    priority: str = None,
    min_score: float = None,
    admin_key: str = None,
    admin_token: str = None,
    db: Session = Depends(database.get_db)
):
    """Get leads with optional filters (admin only)"""
    if not validate_admin(admin_key=admin_key, admin_token=admin_token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    return get_filtered_leads(db, status=status, priority=priority, min_score=min_score)
