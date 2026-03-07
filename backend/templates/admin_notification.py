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

import html as _html
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

    # Sanitize all user-supplied values to prevent HTML/XSS injection
    name = _html.escape(name)
    email = _html.escape(email)
    subject = _html.escape(subject)
    message = _html.escape(message)
    company = _html.escape(company) if company else company
    role = _html.escape(role) if role else role

    metadata = metadata or {}
    trimmed = message[:400] + ("..." if len(message) > 400 else "")
    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    # Escape metadata values (user-controlled HTTP headers)
    ip_addr = _html.escape(str(metadata.get("ip_address", "N/A")))
    user_agent = _html.escape(str(metadata.get("user_agent", "N/A")))
    referer = _html.escape(str(metadata.get("referer", "N/A")))

    # Inline styles for email client compatibility
    _tbl = "width:100%;border-collapse:collapse;margin:12px 0;font-size:13px;"
    _td_l = "font-weight:600;color:#4a4a4a;white-space:nowrap;width:130px;padding:7px 16px 7px 0;border-bottom:1px solid #ebebeb;vertical-align:top;"
    _td_v = "color:#1a1a1a;padding:7px 0;border-bottom:1px solid #ebebeb;vertical-align:top;"
    _lbl = "font-size:11px;font-weight:700;color:#7a7a7a;text-transform:uppercase;letter-spacing:1.2px;margin:28px 0 10px;padding-bottom:6px;border-bottom:1px solid #d4d4d4;"

    company_row = (
        f'<tr><td style="{_td_l}">Company</td><td style="{_td_v}">{company}</td></tr>' if company else ""
    )
    role_row = (
        f'<tr><td style="{_td_l}">Role</td><td style="{_td_v}">{role}</td></tr>' if role else ""
    )

    body = f"""
            <p class="greeting" style="margin:0 0 18px;font-size:14px;">Hi Arpit,</p>

            <p style="margin:0 0 14px;font-size:14px;line-height:1.7;">
                A new <strong>{lead_type}</strong> lead has been submitted through your
                portfolio website and requires your attention.
            </p>

            <p class="section-label" style="{_lbl}">Lead Details</p>
            <table class="info-table" style="{_tbl}">
                <tr><td style="{_td_l}">Name</td><td style="{_td_v}"><strong>{name}</strong></td></tr>
                <tr><td style="{_td_l}">Email</td><td style="{_td_v}"><a href="mailto:{email}" style="color:#1a1a2e;">{email}</a></td></tr>
                <tr><td style="{_td_l}">Subject</td><td style="{_td_v}">{subject}</td></tr>
                {company_row}
                {role_row}
                <tr><td style="{_td_l}">Lead Type</td><td style="{_td_v}">{lead_type}</td></tr>
                <tr><td style="{_td_l}">Received At</td><td style="{_td_v}">{timestamp}</td></tr>
            </table>

            <p class="section-label" style="{_lbl}">Message Preview</p>
            <div class="quote" style="background:#f9f9fb;border-left:2px solid #1a1a2e;padding:12px 16px;margin:14px 0;font-size:13px;color:#4a4a4a;">{trimmed}</div>

            <p class="section-label" style="{_lbl}">Request Metadata</p>
            <table class="info-table" style="{_tbl}">
                <tr><td style="{_td_l}">IP Address</td><td style="{_td_v}">{ip_addr}</td></tr>
                <tr><td style="{_td_l}">User Agent</td><td style="{_td_v};word-break:break-all;">{user_agent}</td></tr>
                <tr><td style="{_td_l}">Referer</td><td style="{_td_v}">{referer}</td></tr>
            </table>

            <p style="margin:18px 0 0;font-size:13px;color:#4a4a4a;line-height:1.7;">
                Please review this lead and respond within 24 hours to maintain a
                positive candidate experience.
            </p>

            <div style="margin-top:16px;">
                <a href="{admin_url}" class="cta-btn" style="display:inline-block;background-color:#1a1a2e;color:#ffffff;text-decoration:none;padding:10px 28px;font-size:13px;font-weight:600;letter-spacing:0.4px;text-transform:uppercase;">View in Admin Panel</a>
                <a href="mailto:{email}" class="cta-btn-outline" style="display:inline-block;border:1px solid #1a1a2e;color:#1a1a2e;text-decoration:none;padding:9px 26px;font-size:13px;font-weight:600;letter-spacing:0.4px;text-transform:uppercase;margin-left:8px;">Reply to Lead</a>
            </div>
    """

    return wrap(
        body,
        header_title=f"New {lead_type} Lead",
        header_subtitle=f"FROM {name.upper()} &mdash; {email}",
        frontend_url=frontend_url,
        subject_preview=f"New {lead_type} lead from {name} ({email}) — {subject}",
        auto_reply_footer=False,
        show_signature=False,
    )
