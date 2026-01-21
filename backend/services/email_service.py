"""Email service for sending contact acknowledgments and CV requests"""
import os
import base64
from pathlib import Path
import resend
from config import EMAIL_FROM, RESEND_API_KEY, VITE_API_URL, CALENDLY_LINK, CONTACT_PHONE_NUMBER
from utils.constants import get_contact_acknowledgment_email, get_cv_request_email

# Initialize Resend API (config enforces presence of API key)
resend.api_key = RESEND_API_KEY


def send_contact_acknowledgment(name: str, email: str, subject: str, message: str, calendly_link: str = None, frontend_url: str = None, phone: str = None):
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

        html_content = get_contact_acknowledgment_email(name, subject, message, calendly_link, frontend_url, phone)
        
        resend.Emails.send({
            "from": EMAIL_FROM,
            "to": [email],
            "subject": f"Re: {subject} | Arpit Kumar",
            "html": html_content
        })
        print(f"Contact acknowledgment email sent to {email}")
        return True
    except Exception as e:
        print(f"Error sending contact acknowledgment: {e}")
        return False


def send_cv_request_email(name: str, email: str, company: str, subject: str, cv_path: str = None, frontend_url: str = None, phone: str = None):
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
        # Set defaults
        if cv_path is None:
            # Resolve relative to project root to avoid cwd issues in production
            cv_path = Path(__file__).resolve().parent.parent / "assets" / "Arpit_Kumar_CV.pdf"
        
        frontend_url = frontend_url or VITE_API_URL
        phone = phone or CONTACT_PHONE_NUMBER

        # Verify CV file exists
        if not Path(cv_path).exists():
            print(f"CV file not found at {cv_path}")
            return False

        # Read and encode CV file
        with open(cv_path, "rb") as f:
            cv_content = base64.b64encode(f.read()).decode()

        # Generate HTML content
        html_content = get_cv_request_email(name, company, subject, frontend_url, phone)

        # Send email with attachment
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
            ]
        })
        print(f"CV request email sent to {email} from {company}")
        return True
    except Exception as e:
        print(f"Error sending CV request email: {e}")
        return False
