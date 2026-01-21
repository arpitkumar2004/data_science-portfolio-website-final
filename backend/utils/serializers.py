"""Serialization utilities for database models to JSON-compatible dicts"""


def serialize_contact_lead(lead):
    """
    Convert ContactLead database model to JSON-serializable dictionary.
    Eliminates code duplication across multiple endpoints.
    """
    return {
        "id": lead.id,
        "name": lead.name,
        "email": lead.email,
        "subject": lead.subject,
        "company": lead.company,
        "message": lead.message,
        "timestamp": lead.timestamp.isoformat() if lead.timestamp else None,
        "flagged": bool(getattr(lead, "flagged", False)),
        "status": getattr(lead, "status", "new"),
        "priority": getattr(lead, "priority", "medium"),
        "quality_score": float(getattr(lead, "quality_score", 0.0)),
        "internal_notes": getattr(lead, "internal_notes", ""),
        "last_contacted": lead.last_contacted.isoformat() if lead.last_contacted else None,
        "follow_up_date": lead.follow_up_date.isoformat() if lead.follow_up_date else None,
        "contact_history": getattr(lead, "contact_history", []),
        "tags": getattr(lead, "tags", []),
        "source": getattr(lead, "source", "contact_form")
    }
