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

    clean_subject = subject.replace("CV Request: ", "")

    body = f"""
            <p class="greeting">Dear {name},</p>

            <p>
                Thank you for your interest on behalf of <strong>{company}</strong>
                regarding <strong>{clean_subject}</strong>. Please find my
                curriculum vitae attached to this email for your review.
            </p>

            <p class="section-label">Professional Summary</p>
            <table class="info-table">
                <tr><td>Education</td><td>IIT Kharagpur &mdash; Integrated Dual Degree (7.86 CGPA)</td></tr>
                <tr><td>Specialisation</td><td>Deep Learning, NLP, LLMs, Computer Vision, Generative AI</td></tr>
                <tr><td>Core Stack</td><td>PyTorch, JAX, Transformers (BERT, CLIP), XGBoost, LightGBM</td></tr>
                <tr><td>Engineering</td><td>FastAPI, Docker, Kubernetes, AWS / GCP, CI/CD, PostgreSQL</td></tr>
                <tr><td>Leadership</td><td>Technical Advisor, DevSoc IIT KGP &mdash; mentored 30+ developers</td></tr>
            </table>

            <p class="section-label">Selected Achievements</p>
            <table class="info-table">
                <tr><td>Top 0.5 %</td><td>Amazon ML Challenge 2025 &mdash; 42nd / 8,690 teams</td></tr>
                <tr><td>1st Place</td><td>Healthcare Risk Scorecard &mdash; GC Data Analytics Competition</td></tr>
                <tr><td>6 Wins</td><td>ML competitions across Healthcare, Fintech &amp; Time-Series</td></tr>
            </table>

            <hr class="divider">

            <p>
                I would welcome the opportunity to discuss how my experience aligns with
                your requirements. Please feel free to schedule a call at your convenience.
            </p>

            <a href="{calendly_link}" class="cta-btn">Schedule a Call</a>

            <div class="secondary-links">
                You may also reach me via
                <a href="https://wa.me/{phone}">WhatsApp</a> or review my
                <a href="{frontend_url}/projects">project portfolio</a>.
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
