"""
Recruiter Welcome & Dashboard Access Email Template.

This is the highest-conversion touchpoint in the pipeline. The recruiter
has demonstrated clear intent by verifying with a corporate email.  The
email must read like a polished, professional cover letter:

  - Formal tone, zero flashiness
  - CV attached (handled by email_service)
  - Structured professional summary (education, skills, achievements)
  - Availability and logistics laid out clearly
  - Single primary CTA: Schedule Interview
  - Secondary: Dashboard access link
  - All contact channels

Required fields:
    name          – Recruiter's name
    company       – Company / organisation (may be None)
    login_link    – One-time or session-based dashboard URL
    calendly_link – Link to schedule a call
    frontend_url  – Portfolio base URL
    phone         – WhatsApp-compatible phone number
"""

import html as _html

from templates.base import wrap
from config import CONTACT_PHONE_NUMBER


def render(
    name: str,
    login_link: str,
    frontend_url: str = "https://arpitkumar.dev",
    phone: str = CONTACT_PHONE_NUMBER,
    calendly_link: str = "https://calendly.com/kumararpit17773/30min",
    company: str | None = None,
) -> str:
    """Return a formal, corporate-grade HTML welcome email for a recruiter."""

    # Sanitize all user-supplied values to prevent HTML/XSS injection
    name = _html.escape(name)
    company = _html.escape(company) if company else company

    company_line = f" at <strong>{company}</strong>" if company else ""

    # Inline styles for email client compatibility
    _tbl = "width:100%;border-collapse:collapse;margin:12px 0;font-size:13px;"
    _td_l = "font-weight:600;color:#4a4a4a;white-space:nowrap;width:130px;padding:7px 16px 7px 0;border-bottom:1px solid #ebebeb;vertical-align:top;"
    _td_v = "color:#1a1a1a;padding:7px 0;border-bottom:1px solid #ebebeb;vertical-align:top;"
    _lbl = "font-size:11px;font-weight:700;color:#7a7a7a;text-transform:uppercase;letter-spacing:1.2px;margin:28px 0 10px;padding-bottom:6px;border-bottom:1px solid #d4d4d4;"
    _link = "color:#1a1a2e;text-decoration:none;"

    body = f"""
            <p class="greeting" style="margin:0 0 18px;font-size:14px;">Dear {name},</p>

            <p style="margin:0 0 14px;font-size:14px;line-height:1.7;">
                Thank you for taking the time to review my profile{company_line}. I appreciate
                your interest and would like to ensure you have all the information you need
                to evaluate my candidacy.
            </p>
            <p style="margin:0 0 14px;font-size:14px;line-height:1.7;">
                Please find my <strong>curriculum vitae attached</strong> to this email. In addition,
                I have prepared a private Recruiter Dashboard containing detailed project case
                studies, research publications, and technical demonstrations. You may access it
                using the link provided at the end of this email.
            </p>

            <!-- ─── Availability ─── -->
            <p class="section-label" style="{_lbl}">Availability &amp; Logistics</p>
            <table class="info-table" style="{_tbl}">
                <tr><td style="{_td_l}">Start Date</td><td style="{_td_v}">May 1, 2026 (flexible &plusmn; 1 week)</td></tr>
                <tr><td style="{_td_l}">Duration</td><td style="{_td_v}">10&ndash;12 weeks (Summer 2026) &middot; Open to full-time conversion</td></tr>
                <tr><td style="{_td_l}">Notice Period</td><td style="{_td_v}">None &mdash; available for immediate start</td></tr>
                <tr><td style="{_td_l}">Work Mode</td><td style="{_td_v}">Open to remote, hybrid, or on-site</td></tr>
                <tr><td style="{_td_l}">Relocation</td><td style="{_td_v}">Willing to relocate globally</td></tr>
                <tr><td style="{_td_l}">Time Zones</td><td style="{_td_v}">Flexible &mdash; can align with US or European business hours</td></tr>
                <tr><td style="{_td_l}">Languages</td><td style="{_td_v}">English (professional fluency) &middot; Hindi (native)</td></tr>
            </table>

            <!-- ─── Professional Summary ─── -->
            <p class="section-label" style="{_lbl}">Professional Summary</p>
            <table class="info-table" style="{_tbl}">
                <tr><td style="{_td_l}">Education</td><td style="{_td_v}">IIT Kharagpur &mdash; B.Tech + M.Tech Integrated Dual Degree (7.86 CGPA), Graduating May 2027</td></tr>
                <tr><td style="{_td_l}">Specialisation</td><td style="{_td_v}">Deep Learning &middot; Natural Language Processing &middot; Computer Vision &middot; Generative AI</td></tr>
                <tr><td style="{_td_l}">Frameworks</td><td style="{_td_v}">PyTorch, JAX, Transformers (BERT, CLIP), XGBoost, LightGBM, CatBoost</td></tr>
                <tr><td style="{_td_l}">Infrastructure</td><td style="{_td_v}">FastAPI, Docker, Kubernetes, AWS / GCP, CI/CD, PostgreSQL, Redis</td></tr>
                <tr><td style="{_td_l}">Leadership</td><td style="{_td_v}">Technical Advisor, DevSoc IIT KGP &mdash; mentored 30+ developers</td></tr>
            </table>

            <!-- ─── Achievements ─── -->
            <p class="section-label" style="{_lbl}">Selected Achievements</p>
            <table class="info-table" style="{_tbl}">
                <tr><td style="{_td_l}">Top 0.5 %</td><td style="{_td_v}">Amazon ML Challenge 2025 &mdash; 42nd of 8,690 teams (Multimodal Price Prediction)</td></tr>
                <tr><td style="{_td_l}">1st Place</td><td style="{_td_v}">Healthcare Risk Scorecard &mdash; GC Data Analytics Competition (82.89 % accuracy)</td></tr>
                <tr><td style="{_td_l}">3&times; Faster</td><td style="{_td_v}">Production NLP training pipeline optimisation</td></tr>
                <tr><td style="{_td_l}">6 Wins</td><td style="{_td_v}">ML competitions across Healthcare, Fintech &amp; Time-Series domains</td></tr>
                <tr><td style="{_td_l}">Codeforces</td><td style="{_td_v}">Expert rating (Top 7 %) &mdash; strong algorithmic foundation</td></tr>
            </table>

            <!-- ─── Core Competencies ─── -->
            <p class="section-label" style="{_lbl}">Core Competencies</p>
            <p style="font-size:13px;color:#4a4a4a;margin:0 0 14px;line-height:1.8;">
                PyTorch &nbsp;&middot;&nbsp; JAX &nbsp;&middot;&nbsp; Transformers &nbsp;&middot;&nbsp;
                LLM Fine-tuning &nbsp;&middot;&nbsp; Retrieval-Augmented Generation &nbsp;&middot;&nbsp;
                NLP &nbsp;&middot;&nbsp; Computer Vision &nbsp;&middot;&nbsp;
                XGBoost &nbsp;&middot;&nbsp; FastAPI &nbsp;&middot;&nbsp; Docker &nbsp;&middot;&nbsp;
                Kubernetes &nbsp;&middot;&nbsp; AWS / GCP &nbsp;&middot;&nbsp;
                PostgreSQL &nbsp;&middot;&nbsp; React &nbsp;&middot;&nbsp; TypeScript &nbsp;&middot;&nbsp; CI/CD
            </p>

            <!-- ─── Value Proposition ─── -->
            <p class="section-label" style="{_lbl}">Why Consider My Candidacy</p>
            <table class="info-table" style="{_tbl}">
                <tr><td style="{_td_l}">Production-Ready</td><td style="{_td_v}">End-to-end delivery from research prototyping through containerised deployment</td></tr>
                <tr><td style="{_td_l}">Day-One Impact</td><td style="{_td_v}">Demonstrated through 6 competition wins and real-world production systems</td></tr>
                <tr><td style="{_td_l}">Research Depth</td><td style="{_td_v}">Published researcher with experience in novel ML methodologies</td></tr>
                <tr><td style="{_td_l}">Team Contribution</td><td style="{_td_v}">Proven leadership and mentorship of 30+ engineers at IIT Kharagpur</td></tr>
            </table>

            <hr class="divider" style="border:none;border-top:1px solid #d4d4d4;margin:24px 0;">

            <!-- ─── CTAs ─── -->
            <p style="margin:0 0 14px;font-size:14px;line-height:1.7;">
                I would welcome the opportunity to discuss how my background and skills can
                contribute to your team's objectives. Please do not hesitate to reach out at
                your convenience.
            </p>

            <div style="margin-top:14px;">
                <a href="{calendly_link}" class="cta-btn" style="display:inline-block;background-color:#1a1a2e;color:#ffffff;text-decoration:none;padding:10px 28px;font-size:13px;font-weight:600;letter-spacing:0.4px;text-transform:uppercase;margin-top:10px;">Schedule an Interview</a>
                <a href="{login_link}" class="cta-btn-outline" style="display:inline-block;border:1px solid #1a1a2e;color:#1a1a2e;text-decoration:none;padding:9px 26px;font-size:13px;font-weight:600;letter-spacing:0.4px;text-transform:uppercase;margin-top:10px;margin-left:8px;">Access Recruiter Dashboard</a>
            </div>

            <!-- ─── Contact ─── -->
            <p class="section-label" style="{_lbl};margin-top:28px;">Contact Information</p>
            <table class="info-table" style="{_tbl}">
                <tr><td style="{_td_l}">Email</td><td style="{_td_v}"><a href="mailto:kumararpit17773@gmail.com" style="{_link}">kumararpit17773@gmail.com</a></td></tr>
                <tr><td style="{_td_l}">Phone</td><td style="{_td_v}"><a href="https://wa.me/{phone}" style="{_link}">{phone}</a></td></tr>
                <tr><td style="{_td_l}">Portfolio</td><td style="{_td_v}"><a href="{frontend_url}" style="{_link}">{frontend_url}</a></td></tr>
                <tr><td style="{_td_l}">LinkedIn</td><td style="{_td_v}"><a href="https://linkedin.com/in/arpit-kumar-shivam" style="{_link}">linkedin.com/in/arpit-kumar-shivam</a></td></tr>
                <tr><td style="{_td_l}">GitHub</td><td style="{_td_v}"><a href="https://github.com/arpitkumar2004" style="{_link}">github.com/arpitkumar2004</a></td></tr>
            </table>

            <p style="margin-top:20px;font-size:13px;color:#7a7a7a;">
                Thank you for your time and consideration. I look forward to the possibility
                of contributing to your organisation.
            </p>
    """

    company_subtitle = f" &mdash; {company.upper()}" if company else ""
    return wrap(
        body,
        header_title="Arpit Kumar",
        header_subtitle=f"CV &amp; PROFILE DOSSIER{company_subtitle}",
        frontend_url=frontend_url,
        subject_preview=f"Dear {name}, please find my CV and professional profile enclosed.",
        auto_reply_footer=True,
    )
