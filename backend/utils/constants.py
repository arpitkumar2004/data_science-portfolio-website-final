"""
Constants and email templates.

DEPRECATED: The template functions below are kept for backward compatibility.
New code should import from the `templates` package directly:
    from templates import contact_acknowledgment, cv_request, recruiter_login, admin_notification
"""
from datetime import datetime


# ── Backward-compatible wrappers ─────────────────────────────
# These delegate to the new dedicated template modules so existing
# imports (e.g. in tests or third-party integrations) keep working.

def get_contact_acknowledgment_email(
    name: str, subject: str, message: str,
    calendly_link: str, frontend_url: str, phone: str,
) -> str:
    """Generate HTML email for contact form acknowledgment.  *Delegates to templates.contact_acknowledgment*."""
    from templates import contact_acknowledgment
    return contact_acknowledgment.render(
        name=name, subject=subject, message=message,
        calendly_link=calendly_link, frontend_url=frontend_url, phone=phone,
    )


def get_cv_request_email(
    name: str, company: str, subject_line: str,
    frontend_url: str, phone: str,
) -> str:
    """Generate HTML email for CV request.  *Delegates to templates.cv_request*."""
    from templates import cv_request
    return cv_request.render(
        name=name, company=company, subject=subject_line,
        frontend_url=frontend_url, phone=phone,
    )


def get_recruiter_login_email(name: str, login_link: str, company: str = None, phone: str = "911234567890") -> str:
    """Generate HTML email for recruiter login.  *Delegates to templates.recruiter_login*."""
    from templates import recruiter_login
    return recruiter_login.render(name=name, login_link=login_link, company=company, phone=phone)