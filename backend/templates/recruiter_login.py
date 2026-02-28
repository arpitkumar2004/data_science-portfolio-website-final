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

from templates.base import wrap, ACCENT_COLOR
from config import CALENDLY_LINK, FRONTEND_URL, PHONE_NUMBER, CONTACT_PHONE_NUMBER


def render(
    name: str,
    login_link: str,
    frontend_url: str = "https://arpitkumar.dev",
    phone: str = CONTACT_PHONE_NUMBER,
    calendly_link: str = "https://calendly.com/kumararpit17773/30min",
    company: str | None = None,
) -> str:
    """Return a formal, corporate-grade HTML welcome email for a recruiter."""

    company_line = f" at <strong>{company}</strong>" if company else ""

    body = f"""
            <p class="greeting">Dear {name},</p>

            <p>
                Thank you for taking the time to review my profile{company_line}. I appreciate
                your interest and would like to ensure you have all the information you need
                to evaluate my candidacy.
            </p>
            <p>
                Please find my <strong>curriculum vitae attached</strong> to this email. In addition,
                I have prepared a private Recruiter Dashboard containing detailed project case
                studies, research publications, and technical demonstrations. You may access it
                using the link provided at the end of this email.
            </p>

            <!-- ─── Availability ─── -->
            <p class="section-label">Availability &amp; Logistics</p>
            <table class="info-table">
                <tr><td>Start Date</td><td>May 1, 2026 (flexible &plusmn; 1 week)</td></tr>
                <tr><td>Duration</td><td>10&ndash;12 weeks (Summer 2026) &middot; Open to full-time conversion</td></tr>
                <tr><td>Notice Period</td><td>None &mdash; available for immediate start</td></tr>
                <tr><td>Work Mode</td><td>Open to remote, hybrid, or on-site</td></tr>
                <tr><td>Relocation</td><td>Willing to relocate globally</td></tr>
                <tr><td>Time Zones</td><td>Flexible &mdash; can align with US or European business hours</td></tr>
                <tr><td>Languages</td><td>English (professional fluency) &middot; Hindi (native)</td></tr>
            </table>

            <!-- ─── Professional Summary ─── -->
            <p class="section-label">Professional Summary</p>
            <table class="info-table">
                <tr><td>Education</td><td>IIT Kharagpur &mdash; Integrated Dual Degree (7.86 CGPA), Merit Scholar</td></tr>
                <tr><td>Specialisation</td><td>Deep Learning &middot; Natural Language Processing &middot; Computer Vision &middot; Generative AI</td></tr>
                <tr><td>Frameworks</td><td>PyTorch, JAX, Transformers (BERT, CLIP), XGBoost, LightGBM, CatBoost</td></tr>
                <tr><td>Infrastructure</td><td>FastAPI, Docker, Kubernetes, AWS / GCP, CI/CD, PostgreSQL, Redis</td></tr>
                <tr><td>Leadership</td><td>Technical Advisor, DevSoc IIT KGP &mdash; mentored 30+ developers</td></tr>
            </table>

            <!-- ─── Achievements ─── -->
            <p class="section-label">Selected Achievements</p>
            <table class="info-table">
                <tr><td>Top 0.5 %</td><td>Amazon ML Challenge 2025 &mdash; 42nd of 8,690 teams (Multimodal Price Prediction)</td></tr>
                <tr><td>1st Place</td><td>Healthcare Risk Scorecard &mdash; GC Data Analytics Competition (82.89 % accuracy)</td></tr>
                <tr><td>3&times; Faster</td><td>Production NLP training pipeline optimisation</td></tr>
                <tr><td>6 Wins</td><td>ML competitions across Healthcare, Fintech &amp; Time-Series domains</td></tr>
                <tr><td>Codeforces</td><td>Expert rating (Top 7 %) &mdash; strong algorithmic foundation</td></tr>
            </table>

            <!-- ─── Core Competencies ─── -->
            <p class="section-label">Core Competencies</p>
            <p style="font-size:13px; color:#4a4a4a; margin:0 0 14px; line-height:1.8;">
                PyTorch &nbsp;&middot;&nbsp; JAX &nbsp;&middot;&nbsp; Transformers &nbsp;&middot;&nbsp;
                LLM Fine-tuning &nbsp;&middot;&nbsp; Retrieval-Augmented Generation &nbsp;&middot;&nbsp;
                NLP &nbsp;&middot;&nbsp; Computer Vision &nbsp;&middot;&nbsp;
                XGBoost &nbsp;&middot;&nbsp; FastAPI &nbsp;&middot;&nbsp; Docker &nbsp;&middot;&nbsp;
                Kubernetes &nbsp;&middot;&nbsp; AWS / GCP &nbsp;&middot;&nbsp;
                PostgreSQL &nbsp;&middot;&nbsp; React &nbsp;&middot;&nbsp; TypeScript &nbsp;&middot;&nbsp; CI/CD
            </p>

            <!-- ─── Value Proposition ─── -->
            <p class="section-label">Why Consider My Candidacy</p>
            <table class="info-table">
                <tr><td>Production-Ready</td><td>End-to-end delivery from research prototyping through containerised deployment</td></tr>
                <tr><td>Day-One Impact</td><td>Demonstrated through 6 competition wins and real-world production systems</td></tr>
                <tr><td>Research Depth</td><td>Published researcher with experience in novel ML methodologies</td></tr>
                <tr><td>Team Contribution</td><td>Proven leadership and mentorship of 30+ engineers at IIT Kharagpur</td></tr>
            </table>

            <hr class="divider">

            <!-- ─── CTAs ─── -->
            <p>
                I would welcome the opportunity to discuss how my background and skills can
                contribute to your team's objectives. Please do not hesitate to reach out at
                your convenience.
            </p>

            <div style="margin-top:14px;">
                <a href="{calendly_link}" class="cta-btn">Schedule an Interview</a>
                <a href="{login_link}" class="cta-btn-outline">Access Recruiter Dashboard</a>
            </div>

            <!-- ─── Contact ─── -->
            <p class="section-label" style="margin-top:28px;">Contact Information</p>
            <table class="info-table">
                <tr><td>Email</td><td><a href="mailto:kumararpit17773@gmail.com">kumararpit17773@gmail.com</a></td></tr>
                <tr><td>Phone</td><td><a href="https://wa.me/{phone}">{phone}</a></td></tr>
                <tr><td>Portfolio</td><td><a href="{frontend_url}">{frontend_url}</a></td></tr>
                <tr><td>LinkedIn</td><td><a href="https://linkedin.com/in/arpitkumar17773">linkedin.com/in/arpitkumar17773</a></td></tr>
                <tr><td>GitHub</td><td><a href="https://github.com/arpitkumar17773">github.com/arpitkumar17773</a></td></tr>
            </table>

            <p style="margin-top:20px; font-size:13px; color:#7a7a7a;">
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
