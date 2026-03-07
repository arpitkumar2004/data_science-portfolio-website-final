"""
Contact Form Acknowledgment Email Template.

Sent automatically when a visitor submits the contact form.
Confirms receipt, includes a copy of the original message, and
provides next-step options in a professional, understated format.

Required fields:
    name         – Visitor's name
    email        – Visitor's email (for confirmation back to sender)
    subject      – Subject of the inquiry
    message      – Original message body (truncated at 300 chars)
    calendly_link – Link to schedule a call
    frontend_url  – Portfolio base URL
    phone         – WhatsApp-compatible phone number
"""

import html as _html
from datetime import datetime, timezone

from templates.base import wrap


def render(
    name: str,
    subject: str,
    message: str,
    calendly_link: str,
    frontend_url: str,
    phone: str,
    email: str = "",
) -> str:
    """Return the full HTML email for a contact acknowledgment."""

    # Sanitize all user-supplied values to prevent HTML/XSS injection
    name = _html.escape(name)
    subject = _html.escape(subject)
    message = _html.escape(message)
    email = _html.escape(email) if email else ""

    trimmed_message = message[:300] + ("..." if len(message) > 300 else "")
    received_at = datetime.now(timezone.utc).strftime("%B %d, %Y at %H:%M UTC")

    # Inline styles for email client compatibility
    _tbl = "width:100%;border-collapse:collapse;margin:12px 0;font-size:13px;"
    _td_l = "font-weight:600;color:#4a4a4a;white-space:nowrap;width:130px;padding:7px 16px 7px 0;border-bottom:1px solid #ebebeb;vertical-align:top;"
    _td_v = "color:#1a1a1a;padding:7px 0;border-bottom:1px solid #ebebeb;vertical-align:top;"
    _lbl = "font-size:11px;font-weight:700;color:#7a7a7a;text-transform:uppercase;letter-spacing:1.2px;margin:28px 0 10px;padding-bottom:6px;border-bottom:1px solid #d4d4d4;"

    # Email confirmation row (if email provided)
    email_row = (
        f'<tr><td style="{_td_l}">Sent To</td><td style="{_td_v}">{email}</td></tr>'
        if email else ""
    )

    body = f"""
            <p class="greeting" style="margin:0 0 18px;font-size:14px;">Dear {name},</p>

            <p style="margin:0 0 14px;font-size:14px;line-height:1.7;">
                Thank you for reaching out. I have received your inquiry regarding
                <strong>{subject}</strong> and will review it at the earliest opportunity.
            </p>

            <p class="section-label" style="{_lbl}">Inquiry Summary</p>
            <table class="info-table" style="{_tbl}">
                <tr><td style="{_td_l}">Subject</td><td style="{_td_v}">{subject}</td></tr>
                {email_row}
                <tr><td style="{_td_l}">Received</td><td style="{_td_v}">{received_at}</td></tr>
                <tr><td style="{_td_l}">Status</td><td style="{_td_v}">Received &amp; under review</td></tr>
                <tr><td style="{_td_l}">Expected Response</td><td style="{_td_v}">Within 24 hours</td></tr>
            </table>

            <p class="section-label" style="{_lbl}">Your Message</p>
            <div class="quote" style="background:#f9f9fb;border-left:2px solid #1a1a2e;padding:12px 16px;margin:14px 0;font-size:13px;color:#4a4a4a;">{trimmed_message}</div>

            <p class="section-label" style="{_lbl}">Next Steps</p>
            <p style="margin:0 0 14px;font-size:14px;line-height:1.7;">
                I will review your message and respond personally. Should you wish to
                discuss this matter sooner, I am happy to arrange a brief call at a
                time convenient to you.
            </p>

            <a href="{calendly_link}" class="cta-btn" style="display:inline-block;background-color:#1a1a2e;color:#ffffff;text-decoration:none;padding:10px 28px;font-size:13px;font-weight:600;letter-spacing:0.4px;text-transform:uppercase;margin-top:10px;">Schedule a Call</a>

            <div class="secondary-links" style="margin-top:14px;font-size:13px;color:#4a4a4a;">
                Alternatively, you may reach me via
                <a href="https://wa.me/{phone}" style="color:#1a1a2e;text-decoration:underline;">WhatsApp</a> or review my
                <a href="{frontend_url}/projects" style="color:#1a1a2e;text-decoration:underline;">project portfolio</a>.
            </div>
    """

    return wrap(
        body,
        header_title="Arpit Kumar",
        header_subtitle="INQUIRY ACKNOWLEDGMENT",
        frontend_url=frontend_url,
        subject_preview=f"Re: {subject} — Your message has been received.",
        auto_reply_footer=True,
    )
