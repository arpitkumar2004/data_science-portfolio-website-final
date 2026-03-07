"""
CV / Resume Request Email Template.

Sent when a recruiter or hiring manager requests Arpit's CV.
The CV is attached by email_service; this template provides a formal
cover note with a concise professional summary.

Required fields:
    name         – Recipient's name
    company      – Company name
    subject      – Original subject line
    frontend_url – Portfolio base URL
    phone        – WhatsApp-compatible phone number
    calendly_link – Link to schedule a call
"""

import html as _html

from templates.base import wrap


def render(
    name: str,
    company: str,
    subject: str,
    frontend_url: str,
    phone: str,
    calendly_link: str = "https://calendly.com/kumararpit17773/30min",
) -> str:
    """Return the full HTML email for a CV request response."""

    # Sanitize all user-supplied values to prevent HTML/XSS injection
    name = _html.escape(name)
    company = _html.escape(company)
    subject = _html.escape(subject)

    clean_subject = subject.replace("CV Request: ", "")

    # Inline styles for email client compatibility
    _tbl = "width:100%;border-collapse:collapse;margin:12px 0;font-size:13px;"
    _td_l = "font-weight:600;color:#4a4a4a;white-space:nowrap;width:130px;padding:7px 16px 7px 0;border-bottom:1px solid #ebebeb;vertical-align:top;"
    _td_v = "color:#1a1a1a;padding:7px 0;border-bottom:1px solid #ebebeb;vertical-align:top;"
    _lbl = "font-size:11px;font-weight:700;color:#7a7a7a;text-transform:uppercase;letter-spacing:1.2px;margin:28px 0 10px;padding-bottom:6px;border-bottom:1px solid #d4d4d4;"

    body = f"""
            <p class="greeting" style="margin:0 0 18px;font-size:14px;">Dear {name},</p>

            <p style="margin:0 0 14px;font-size:14px;line-height:1.7;">
                Thank you for your interest on behalf of <strong>{company}</strong>
                regarding <strong>{clean_subject}</strong>. Please find my
                curriculum vitae attached to this email (PDF) for your review.
            </p>

            <p class="section-label" style="{_lbl}">Professional Summary</p>
            <table class="info-table" style="{_tbl}">
                <tr><td style="{_td_l}">Education</td><td style="{_td_v}">IIT Kharagpur &mdash; B.Tech + M.Tech Integrated Dual Degree (7.86 CGPA), Graduating May 2027</td></tr>
                <tr><td style="{_td_l}">Specialisation</td><td style="{_td_v}">Deep Learning, NLP, LLMs, Computer Vision, Generative AI</td></tr>
                <tr><td style="{_td_l}">Core Stack</td><td style="{_td_v}">PyTorch, JAX, Transformers (BERT, CLIP), XGBoost, LightGBM</td></tr>
                <tr><td style="{_td_l}">Engineering</td><td style="{_td_v}">FastAPI, Docker, Kubernetes, AWS / GCP, CI/CD, PostgreSQL</td></tr>
                <tr><td style="{_td_l}">Leadership</td><td style="{_td_v}">Technical Advisor, DevSoc IIT KGP &mdash; mentored 30+ developers</td></tr>
            </table>

            <p class="section-label" style="{_lbl}">Selected Achievements</p>
            <table class="info-table" style="{_tbl}">
                <tr><td style="{_td_l}">Top 0.5 %</td><td style="{_td_v}">Amazon ML Challenge 2025 &mdash; 42nd / 8,690 teams</td></tr>
                <tr><td style="{_td_l}">1st Place</td><td style="{_td_v}">Healthcare Risk Scorecard &mdash; GC Data Analytics Competition</td></tr>
                <tr><td style="{_td_l}">6 Wins</td><td style="{_td_v}">ML competitions across Healthcare, Fintech &amp; Time-Series</td></tr>
            </table>

            <p class="section-label" style="{_lbl}">Availability</p>
            <table class="info-table" style="{_tbl}">
                <tr><td style="{_td_l}">Available From</td><td style="{_td_v}">Summer 2026 (flexible)</td></tr>
                <tr><td style="{_td_l}">Notice Period</td><td style="{_td_v}">None &mdash; available for immediate start</td></tr>
                <tr><td style="{_td_l}">Work Mode</td><td style="{_td_v}">Open to remote, hybrid, or on-site</td></tr>
            </table>

            <hr class="divider" style="border:none;border-top:1px solid #d4d4d4;margin:24px 0;">

            <p style="margin:0 0 14px;font-size:14px;line-height:1.7;">
                I would welcome the opportunity to discuss how my experience aligns with
                your requirements. Please feel free to schedule a call at your convenience.
            </p>

            <a href="{calendly_link}" class="cta-btn" style="display:inline-block;background-color:#1a1a2e;color:#ffffff;text-decoration:none;padding:10px 28px;font-size:13px;font-weight:600;letter-spacing:0.4px;text-transform:uppercase;margin-top:10px;">Schedule a Call</a>

            <div class="secondary-links" style="margin-top:14px;font-size:13px;color:#4a4a4a;">
                You may also reach me via
                <a href="https://wa.me/{phone}" style="color:#1a1a2e;text-decoration:underline;">WhatsApp</a> or review my
                <a href="{frontend_url}/projects" style="color:#1a1a2e;text-decoration:underline;">project portfolio</a>.
            </div>
    """

    return wrap(
        body,
        header_title="Arpit Kumar",
        header_subtitle=f"CV ENCLOSED &mdash; REQUESTED BY {company.upper()}",
        frontend_url=frontend_url,
        subject_preview=f"CV attached as requested for {company}.",
        auto_reply_footer=True,
    )
