"""
Email service for sending templated emails via Resend.

Supported mailing cases
-----------------------
1. Contact Acknowledgment  – auto-reply to contact-form submissions
2. CV Request              – CV delivery with attachment
3. Recruiter Login         – dashboard access link
4. Admin Notification      – new-lead alert to portfolio owner
"""

import base64
from pathlib import Path

import resend

from config import (
    EMAIL_FROM,
    RESEND_API_KEY,
    VITE_API_URL,
    CALENDLY_LINK,
    CONTACT_PHONE_NUMBER,
)
from templates import contact_acknowledgment, cv_request, recruiter_login, admin_notification

# Initialize Resend API (config enforces presence of API key)
resend.api_key = RESEND_API_KEY


# ──────────────────────────────────────────────
# 1. Contact Form Acknowledgment
# ──────────────────────────────────────────────

def send_contact_acknowledgment(
    name: str,
    email: str,
    subject: str,
    message: str,
    calendly_link: str = None,
    frontend_url: str = None,
    phone: str = None,
):
    """
    Send acknowledgment email to contact form submitter.

    Args:
        name: Recipient's name
        email: Recipient's email address
        subject: Original inquiry subject
        message: Original inquiry message
        calendly_link: Optional Calendly link
        frontend_url: Optional frontend URL
        phone: Optional phone number for WhatsApp
    """
    try:
        calendly_link = calendly_link or CALENDLY_LINK
        frontend_url = frontend_url or VITE_API_URL
        phone = phone or CONTACT_PHONE_NUMBER

        html_content = contact_acknowledgment.render(
            name=name,
            subject=subject,
            message=message,
            calendly_link=calendly_link,
            frontend_url=frontend_url,
            phone=phone,
        )

        resend.Emails.send({
            "from": EMAIL_FROM,
            "to": [email],
            "subject": f"Re: {subject} | Arpit Kumar",
            "html": html_content,
        })
        print(f"[email] Contact acknowledgment sent → {email}")
        return True
    except Exception as e:
        print(f"[email] Error sending contact acknowledgment: {e}")
        return False


# ──────────────────────────────────────────────
# 2. CV / Resume Request
# ──────────────────────────────────────────────

def send_cv_request_email(
    name: str,
    email: str,
    company: str,
    subject: str,
    cv_path: str = None,
    frontend_url: str = None,
    phone: str = None,
):
    """
    Send CV and detailed profile information to CV requester.

    Args:
        name: Recipient's name
        email: Recipient's email address
        company: Company name
        subject: Original subject line
        cv_path: Optional path to CV file (default: assets/Arpit_Kumar_CV.pdf)
        frontend_url: Optional frontend URL
        phone: Optional phone number for WhatsApp
    """
    try:
        if cv_path is None:
            cv_path = Path(__file__).resolve().parent.parent / "assets" / "Arpit_Kumar_CV.pdf"

        frontend_url = frontend_url or VITE_API_URL
        phone = phone or CONTACT_PHONE_NUMBER

        if not Path(cv_path).exists():
            print(f"[email] CV file not found at {cv_path}")
            return False

        with open(cv_path, "rb") as f:
            cv_content = base64.b64encode(f.read()).decode()

        html_content = cv_request.render(
            name=name,
            company=company,
            subject=subject,
            frontend_url=frontend_url,
            phone=phone,
            calendly_link=CALENDLY_LINK,
        )

        resend.Emails.send({
            "from": EMAIL_FROM,
            "to": [email],
            "subject": f"Technical CV - Arpit Kumar | IIT Kharagpur | AI Research & Development | For {company}",
            "html": html_content,
            "attachments": [
                {
                    "filename": "Arpit_Kumar_CV.pdf",
                    "content": cv_content,
                }
            ],
        })
        print(f"[email] CV request sent → {email} (company: {company})")
        return True
    except Exception as e:
        print(f"[email] Error sending CV request: {e}")
        return False


# ──────────────────────────────────────────────
# 3. Recruiter Welcome & Dashboard Login
# ──────────────────────────────────────────────

def send_recruiter_login_email(
    name: str,
    email: str,
    login_link: str,
    company: str = None,
    frontend_url: str = None,
    phone: str = None,
    cv_path: str = None,
):
    """
    Send the high-conversion recruiter welcome email with CV attachment.

    This is the prime conversion touchpoint — the recruiter has already
    expressed interest by requesting access.  The email attaches the CV,
    presents a compelling candidate snapshot, availability, and a clear
    CTA to schedule an interview.

    Args:
        name: Recruiter's name
        email: Recruiter's email address
        login_link: One-time or session-based login URL for the dashboard
        company: Company / organisation name (optional, personalises the email)
        frontend_url: Optional frontend URL
        phone: Optional WhatsApp-compatible phone number
        cv_path: Optional path to CV file (default: assets/Arpit_Kumar_CV.pdf)
    """
    try:
        frontend_url = frontend_url or VITE_API_URL
        phone = phone or CONTACT_PHONE_NUMBER
        calendly_link = CALENDLY_LINK

        # ── Prepare CV attachment ──
        if cv_path is None:
            cv_path = Path(__file__).resolve().parent.parent / "assets" / "Arpit_Kumar_CV.pdf"

        attachments = []
        if Path(cv_path).exists():
            with open(cv_path, "rb") as f:
                cv_content = base64.b64encode(f.read()).decode()
            attachments.append({
                "filename": "Arpit_Kumar_CV.pdf",
                "content": cv_content,
            })
        else:
            print(f"[email] Warning: CV file not found at {cv_path} — sending without attachment")

        # ── Render template ──
        html_content = recruiter_login.render(
            name=name,
            login_link=login_link,
            frontend_url=frontend_url,
            phone=phone,
            calendly_link=calendly_link,
            company=company,
        )

        # ── Personalised subject line ──
        company_tag = f" | {company}" if company else ""
        subject_line = (
            f"Arpit Kumar — IIT Kharagpur | AI Researcher | CV & Dashboard Access{company_tag}"
        )

        payload = {
            "from": EMAIL_FROM,
            "to": [email],
            "subject": subject_line,
            "html": html_content,
        }
        if attachments:
            payload["attachments"] = attachments

        resend.Emails.send(payload)
        print(f"[email] Recruiter welcome sent → {email} (company: {company or 'N/A'})")
        return True
    except Exception as e:
        print(f"[email] Error sending recruiter welcome: {e}")
        return False


# ──────────────────────────────────────────────
# 4. Admin New-Lead Notification
# ──────────────────────────────────────────────

def send_admin_notification(
    admin_email: str,
    lead_type: str,
    name: str,
    email: str,
    subject: str,
    message: str,
    company: str = None,
    role: str = None,
    metadata: dict = None,
    admin_url: str = None,
    frontend_url: str = None,
):
    """
    Notify the admin/owner about a new lead.

    Args:
        admin_email: Email address of the portfolio owner
        lead_type: "Contact" or "CV Request"
        name: Submitter's name
        email: Submitter's email
        subject: Subject of the inquiry
        message: Message body
        company: Company name (optional)
        role: Role / position (optional)
        metadata: Request metadata dict (optional)
        admin_url: URL to admin panel (optional)
        frontend_url: Portfolio base URL (optional)
    """
    try:
        frontend_url = frontend_url or VITE_API_URL

        html_content = admin_notification.render(
            lead_type=lead_type,
            name=name,
            email=email,
            subject=subject,
            message=message,
            company=company,
            role=role,
            metadata=metadata,
            admin_url=admin_url or f"{frontend_url}/admin",
            frontend_url=frontend_url,
        )

        resend.Emails.send({
            "from": EMAIL_FROM,
            "to": [admin_email],
            "subject": f"[New Lead] {lead_type}: {name} — {subject}",
            "html": html_content,
        })
        print(f"[email] Admin notification sent → {admin_email} (lead: {name})")
        return True
    except Exception as e:
        print(f"[email] Error sending admin notification: {e}")
        return False
