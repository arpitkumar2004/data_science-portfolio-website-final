"""
Admin / Owner Notification Email Template.

Sent to the portfolio owner (Arpit) whenever a new lead is created
so that new inquiries are never missed.

Required fields:
    lead_type    – "Contact" or "CV Request"
    name         – Submitter's name
    email        – Submitter's email
    subject      – Subject of the inquiry
    message      – Message body (truncated)
    company      – Company name (may be None)
    role         – Role / position (may be None)
    metadata     – Dict with ip_address, user_agent, referer, etc.
    admin_url    – URL to the admin leads panel
"""

from datetime import datetime, timezone
from templates.base import wrap


def render(
    lead_type: str,
    name: str,
    email: str,
    subject: str,
    message: str,
    company: str | None = None,
    role: str | None = None,
    metadata: dict | None = None,
    admin_url: str = "https://admin.arpitkumar.dev/",
    frontend_url: str = "https://arpitkumar.dev",
) -> str:
    """Return the full HTML email for an admin new-lead notification."""

    metadata = metadata or {}
    trimmed = message[:400] + ("..." if len(message) > 400 else "")
    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    company_row = (
        f'<tr><td>Company</td><td>{company}</td></tr>' if company else ""
    )
    role_row = (
        f'<tr><td>Role</td><td>{role}</td></tr>' if role else ""
    )
    ip_row = (
        f'<tr><td>IP Address</td><td>{metadata.get("ip_address", "N/A")}</td></tr>'
    )
    ua_row = (
        f'<tr><td>User Agent</td><td style="word-break:break-all;">{metadata.get("user_agent", "N/A")}</td></tr>'
    )

    body = f"""
            <p class="greeting">New {lead_type} Lead &mdash; Action Required</p>

            <p class="section-label">Lead Details</p>
            <table class="info-table">
                <tr><td>Name</td><td><strong>{name}</strong></td></tr>
                <tr><td>Email</td><td><a href="mailto:{email}">{email}</a></td></tr>
                <tr><td>Subject</td><td>{subject}</td></tr>
                {company_row}
                {role_row}
                <tr><td>Received</td><td>{timestamp}</td></tr>
                <tr><td>Type</td><td>{lead_type}</td></tr>
            </table>

            <p class="section-label">Message</p>
            <div class="quote">{trimmed}</div>

            <p class="section-label">Request Metadata</p>
            <table class="info-table">
                {ip_row}
                {ua_row}
                <tr><td>Referer</td><td>{metadata.get("referer", "N/A")}</td></tr>
            </table>

            <a href="{admin_url}" class="cta-btn">View in Admin Panel</a>
    """

    return wrap(
        body,
        header_title=f"Lead Notification: {lead_type}",
        header_subtitle=f"{name.upper()} &mdash; {email}",
        frontend_url=frontend_url,
        subject_preview=f"New {lead_type} lead from {name} ({email})",
        auto_reply_footer=False,
    )
