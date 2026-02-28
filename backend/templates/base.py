"""
Base email template — Corporate / Professional design system.

All email templates inherit from the `wrap` function which provides:
- Clean, minimal HTML boilerplate optimised for corporate email clients
- Formal design tokens (neutral palette, serif-accented headings, no rounded/flashy elements)
- Thin top accent line instead of a coloured banner
- Professional signature block with title and contact line
- Understated footer

Usage:
    from templates.base import wrap
    html = wrap(body_html, subject_preview="Preview text")
"""

from datetime import datetime

# ── Design Tokens (Corporate / Neutral) ───────────────────────
ACCENT_COLOR = "#1a1a2e"          # Deep navy — headings, accent line
LINK_COLOR = "#1a1a2e"            # Links match accent for cohesion
TEXT_PRIMARY = "#1a1a1a"          # Near-black body text
TEXT_SECONDARY = "#4a4a4a"        # Secondary / labels
TEXT_MUTED = "#7a7a7a"            # Footer, captions
BG_BODY = "#f7f7f7"              # Light warm grey backdrop
BG_CARD = "#ffffff"
BG_SECTION = "#f9f9fb"           # Subtle section backgrounds
BORDER_COLOR = "#d4d4d4"         # Table / divider borders
FONT_STACK = (
    "'Georgia', 'Times New Roman', Times, serif"
)
FONT_STACK_SANS = (
    "'Helvetica Neue', Helvetica, Arial, sans-serif"
)

# keep public for template-level imports
BRAND_COLOR = ACCENT_COLOR

# ── Reusable CSS block ────────────────────────────────────────
SHARED_STYLES = f"""
    body {{
        margin: 0;
        padding: 0;
        background-color: {BG_BODY};
        font-family: {FONT_STACK_SANS};
        color: {TEXT_PRIMARY};
        font-size: 14px;
        line-height: 1.7;
        -webkit-text-size-adjust: 100%;
    }}
    .wrapper {{
        max-width: 620px;
        margin: 32px auto;
        background: {BG_CARD};
        border: 1px solid {BORDER_COLOR};
    }}
    .accent-bar {{
        height: 4px;
        background: {ACCENT_COLOR};
    }}
    .header {{
        padding: 28px 36px 20px;
        border-bottom: 1px solid {BORDER_COLOR};
    }}
    .header h2 {{
        margin: 0;
        font-family: {FONT_STACK};
        font-size: 20px;
        font-weight: 400;
        color: {ACCENT_COLOR};
        letter-spacing: 0.2px;
    }}
    .header p {{
        margin: 4px 0 0;
        font-size: 12px;
        color: {TEXT_MUTED};
        text-transform: uppercase;
        letter-spacing: 1px;
    }}
    .body {{
        padding: 28px 36px;
    }}
    .greeting {{
        margin: 0 0 18px;
        font-size: 14px;
    }}
    p {{
        margin: 0 0 14px;
        font-size: 14px;
        line-height: 1.7;
    }}
    .section-label {{
        font-size: 11px;
        font-weight: 700;
        color: {TEXT_MUTED};
        text-transform: uppercase;
        letter-spacing: 1.2px;
        margin: 28px 0 10px;
        padding-bottom: 6px;
        border-bottom: 1px solid {BORDER_COLOR};
    }}
    .quote {{
        background: {BG_SECTION};
        border-left: 2px solid {ACCENT_COLOR};
        padding: 12px 16px;
        margin: 14px 0;
        font-size: 13px;
        color: {TEXT_SECONDARY};
    }}
    .info-table {{
        width: 100%;
        border-collapse: collapse;
        margin: 12px 0;
        font-size: 13px;
    }}
    .info-table td {{
        padding: 7px 0;
        border-bottom: 1px solid #ebebeb;
        vertical-align: top;
    }}
    .info-table td:first-child {{
        font-weight: 600;
        color: {TEXT_SECONDARY};
        white-space: nowrap;
        width: 130px;
        padding-right: 16px;
    }}
    .info-table td:last-child {{
        color: {TEXT_PRIMARY};
    }}
    .cta-btn {{
        display: inline-block;
        background-color: {ACCENT_COLOR};
        color: #ffffff !important;
        text-decoration: none;
        padding: 10px 28px;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.4px;
        text-transform: uppercase;
        margin-top: 10px;
    }}
    .cta-btn-outline {{
        display: inline-block;
        border: 1px solid {ACCENT_COLOR};
        color: {ACCENT_COLOR} !important;
        text-decoration: none;
        padding: 9px 26px;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.4px;
        text-transform: uppercase;
        margin-top: 10px;
        margin-left: 8px;
    }}
    .secondary-links {{
        margin-top: 14px;
        font-size: 13px;
        color: {TEXT_SECONDARY};
    }}
    .secondary-links a {{
        color: {LINK_COLOR};
        text-decoration: underline;
    }}
    .divider {{
        border: none;
        border-top: 1px solid {BORDER_COLOR};
        margin: 24px 0;
    }}
    .signature {{
        margin-top: 28px;
        padding-top: 18px;
        border-top: 1px solid {BORDER_COLOR};
        font-size: 13px;
        color: {TEXT_SECONDARY};
        line-height: 1.6;
    }}
    .signature strong {{
        color: {TEXT_PRIMARY};
        font-size: 14px;
    }}
    .signature a {{
        color: {LINK_COLOR};
        text-decoration: none;
    }}
    .footer {{
        padding: 16px 36px;
        background: {BG_SECTION};
        border-top: 1px solid {BORDER_COLOR};
        font-size: 11px;
        color: {TEXT_MUTED};
        line-height: 1.6;
        text-align: center;
    }}
    a {{
        color: {LINK_COLOR};
    }}
"""


def _signature_block(frontend_url: str) -> str:
    """Formal email signature with title and contact line."""
    return f"""
    <div class="signature">
        <strong>Arpit Kumar</strong><br>
        Applied AI Researcher · IIT Kharagpur<br>
        <a href="{frontend_url}">{frontend_url}</a> &nbsp;|&nbsp;
        <a href="https://linkedin.com/in/arpit-kumar-shivam">LinkedIn</a> &nbsp;|&nbsp;
        <a href="https://github.com/arpitkumar2004">GitHub</a>
    </div>
    """


def _footer(auto_reply: bool = True) -> str:
    """Minimal corporate footer."""
    year = datetime.now().year
    reply_msg = (
        "This is an automated message. You may reply directly to this email."
        if auto_reply
        else "This is an automated system notification."
    )
    return f"""
    <div class="footer">
        {reply_msg}<br>
        &copy; {year} Arpit Kumar &middot; All rights reserved.
    </div>
    """


def wrap(
    body_html: str,
    *,
    header_title: str = "Arpit Kumar",
    header_subtitle: str = "APPLIED AI RESEARCHER · IIT KHARAGPUR",
    frontend_url: str = "https://arpitkumar.dev",
    subject_preview: str = "",
    extra_css: str = "",
    auto_reply_footer: bool = True,
) -> str:
    """
    Wrap email body content in the corporate template shell.

    Args:
        body_html:        The inner email content (goes inside .body div).
        header_title:     Title shown in the header area.
        header_subtitle:  Subtitle — rendered in uppercase small caps.
        frontend_url:     Portfolio URL used in signature.
        subject_preview:  Hidden preview text for email clients.
        extra_css:        Any additional CSS rules for this template.
        auto_reply_footer: Whether footer says "you can reply" or just "automated".

    Returns:
        Complete HTML email string.
    """
    preview = (
        f'<span style="display:none;max-height:0;overflow:hidden;">{subject_preview}</span>'
        if subject_preview
        else ""
    )
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{header_title}</title>
    <style>
{SHARED_STYLES}
{extra_css}
    </style>
</head>
<body>
    {preview}
    <div class="wrapper">
        <div class="accent-bar"></div>
        <div class="header">
            <h2>{header_title}</h2>
            <p>{header_subtitle}</p>
        </div>
        <div class="body">
{body_html}
{_signature_block(frontend_url)}
        </div>
{_footer(auto_reply_footer)}
    </div>
</body>
</html>"""
