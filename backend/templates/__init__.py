"""
Email Templates Package.

Provides dedicated, self-contained HTML email templates for every
mailing case in the system.  Each sub-module exposes a single
`render(...)` function that returns a complete HTML string.

Templates
---------
- contact_acknowledgment : Auto-reply when a visitor submits the contact form.
- cv_request             : Response to a CV/resume download request.
- recruiter_login        : Dashboard access link for recruiters.
- admin_notification     : New-lead alert sent to the portfolio owner.

Usage
-----
    from templates import contact_acknowledgment
    html = contact_acknowledgment.render(name=..., subject=..., ...)
"""

from templates import (
    contact_acknowledgment,
    cv_request,
    recruiter_login,
    admin_notification,
)

__all__ = [
    "contact_acknowledgment",
    "cv_request",
    "recruiter_login",
    "admin_notification",
]
