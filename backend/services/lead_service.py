"""Lead management service for database operations"""
from datetime import datetime, timedelta, timezone
from sqlalchemy.orm import Session
from sqlalchemy import func
import models
from utils.serializers import serialize_contact_lead


def create_contact_lead(db: Session, name: str, email: str, subject: str, message: str, 
                       company: str = None, form_type: str = "contacts", role: str = None) -> models.ContactLead:
    """
    Create and persist a new contact lead to database.
    
    Args:
        db: Database session
        name: Lead name
        email: Lead email
        subject: Inquiry subject
        message: Inquiry message
        company: Company name
        form_type: Type of form submission
        role: User role
    
    Returns:
        Created ContactLead model instance
    """
    new_lead = models.ContactLead(
        name=name,
        email=email,
        subject=subject,
        message=message,
        company=company,
        form_type=form_type,
        role=role
    )
    db.add(new_lead)
    db.commit()
    db.refresh(new_lead)
    return new_lead


def get_all_leads(db: Session, skip: int = 0, limit: int = None) -> list:
    """
    Fetch all leads sorted by newest first.
    
    Args:
        db: Database session
        skip: Number of records to skip
        limit: Maximum records to return
    
    Returns:
        List of serialized lead dictionaries
    """
    query = db.query(models.ContactLead).order_by(models.ContactLead.timestamp.desc())
    
    if skip > 0:
        query = query.offset(skip)
    if limit:
        query = query.limit(limit)
    
    leads = query.all()
    return [serialize_contact_lead(lead) for lead in leads]


def get_lead_by_id(db: Session, lead_id: int) -> models.ContactLead:
    """Get a single lead by ID"""
    return db.query(models.ContactLead).filter(models.ContactLead.id == lead_id).first()


def delete_lead(db: Session, lead_id: int) -> bool:
    """
    Delete a lead by ID.
    
    Returns:
        True if deleted successfully, False if not found
    """
    lead = get_lead_by_id(db, lead_id)
    if not lead:
        return False
    
    db.delete(lead)
    db.commit()
    return True


def update_lead_status(db: Session, lead_id: int, status: str) -> models.ContactLead:
    """Update lead status and set last_contacted timestamp"""
    lead = get_lead_by_id(db, lead_id)
    if lead:
        lead.status = status
        lead.last_contacted = datetime.now(timezone.utc)
        db.commit()
        db.refresh(lead)
    return lead


def update_lead_priority(db: Session, lead_id: int, priority: str) -> models.ContactLead:
    """Update lead priority"""
    lead = get_lead_by_id(db, lead_id)
    if lead:
        lead.priority = priority.lower()
        db.commit()
        db.refresh(lead)
    return lead


def update_lead_quality_score(db: Session, lead_id: int, score: float) -> models.ContactLead:
    """Update lead quality score"""
    lead = get_lead_by_id(db, lead_id)
    if lead and 0.0 <= score <= 1.0:
        lead.quality_score = score
        db.commit()
        db.refresh(lead)
    return lead


def update_lead_notes(db: Session, lead_id: int, notes: str) -> models.ContactLead:
    """Update internal notes for a lead"""
    lead = get_lead_by_id(db, lead_id)
    if lead:
        lead.internal_notes = notes
        db.commit()
        db.refresh(lead)
    return lead


def update_lead_tags(db: Session, lead_id: int, tags: list) -> models.ContactLead:
    """Update tags for a lead"""
    from sqlalchemy.orm.attributes import flag_modified
    
    lead = get_lead_by_id(db, lead_id)
    if lead:
        lead.tags = tags
        flag_modified(lead, "tags")  # Notify SQLAlchemy of JSON field modification
        db.commit()
        db.refresh(lead)
    return lead


def flag_lead(db: Session, lead_id: int) -> models.ContactLead:
    """Flag a lead as important"""
    lead = get_lead_by_id(db, lead_id)
    if lead:
        lead.flagged = True
        db.commit()
        db.refresh(lead)
    return lead


def unflag_lead(db: Session, lead_id: int) -> models.ContactLead:
    """Unflag a lead"""
    lead = get_lead_by_id(db, lead_id)
    if lead:
        lead.flagged = False
        db.commit()
        db.refresh(lead)
    return lead


def search_leads(db: Session, query: str) -> list:
    """
    Search leads across multiple fields.
    
    Args:
        db: Database session
        query: Search query string
    
    Returns:
        List of matching leads
    """
    leads = db.query(models.ContactLead).filter(
        (models.ContactLead.name.contains(query)) |
        (models.ContactLead.email.contains(query)) |
        (models.ContactLead.subject.contains(query)) |
        (models.ContactLead.message.contains(query)) |
        (models.ContactLead.internal_notes.contains(query))
    ).all()
    
    return [serialize_contact_lead(lead) for lead in leads]


def filter_leads_by_date(db: Session, start_date: str, end_date: str) -> list:
    """
    Filter leads by date range.
    
    Args:
        db: Database session
        start_date: Start date string (ISO format)
        end_date: End date string (ISO format)
    
    Returns:
        List of leads in date range
    """
    leads = db.query(models.ContactLead).filter(
        models.ContactLead.timestamp >= start_date,
        models.ContactLead.timestamp <= end_date
    ).all()
    
    return [serialize_contact_lead(lead) for lead in leads]


def get_filtered_leads(db: Session, status: str = None, priority: str = None, min_score: float = None) -> list:
    """
    Get leads with optional filters.
    
    Args:
        db: Database session
        status: Filter by status
        priority: Filter by priority
        min_score: Filter by minimum quality score
    
    Returns:
        List of filtered leads
    """
    query = db.query(models.ContactLead)
    
    if status:
        query = query.filter(models.ContactLead.status == status)
    if priority:
        query = query.filter(models.ContactLead.priority == priority)
    if min_score is not None:
        query = query.filter(models.ContactLead.quality_score >= min_score)
    
    leads = query.order_by(models.ContactLead.timestamp.desc()).all()
    return [serialize_contact_lead(lead) for lead in leads]


def bulk_update_status(db: Session, lead_ids: list, status: str) -> int:
    """
    Update status for multiple leads.
    
    Args:
        db: Database session
        lead_ids: List of lead IDs
        status: New status value
    
    Returns:
        Number of updated leads
    """
    updated_count = db.query(models.ContactLead).filter(
        models.ContactLead.id.in_(lead_ids)
    ).update({
        models.ContactLead.status: status,
        models.ContactLead.last_contacted: datetime.now(timezone.utc)
    }, synchronize_session=False)
    
    db.commit()
    return updated_count


def bulk_delete_leads(db: Session, lead_ids: list) -> int:
    """
    Delete multiple leads.
    
    Args:
        db: Database session
        lead_ids: List of lead IDs to delete
    
    Returns:
        Number of deleted leads
    """
    deleted_count = db.query(models.ContactLead).filter(
        models.ContactLead.id.in_(lead_ids)
    ).delete()
    
    db.commit()
    return deleted_count


def get_lead_statistics(db: Session) -> dict:
    """
    Calculate lead statistics including conversion rate and quality metrics.
    
    Args:
        db: Database session
    
    Returns:
        Dictionary with statistics
    """
    total_leads = db.query(models.ContactLead).count()
    
    # Status distribution
    status_counts = {}
    for status in ['new', 'contacted', 'qualified', 'converted', 'lost']:
        count = db.query(models.ContactLead).filter(models.ContactLead.status == status).count()
        status_counts[status] = count
    
    # Conversion rate
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
