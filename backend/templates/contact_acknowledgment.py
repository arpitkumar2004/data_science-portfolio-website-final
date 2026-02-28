"""
Contact Form Acknowledgment Email Template.

Sent automatically when a visitor submits the contact form.
Confirms receipt, includes a copy of the original message, and
provides next-step options in a professional, understated format.

Required fields:
    name         – Visitor's name
    subject      – Subject of the inquiry
    message      – Original message body (truncated at 300 chars)
    calendly_link – Link to schedule a call
    frontend_url  – Portfolio base URL
    phone         – WhatsApp-compatible phone number
"""

from templates.base import wrap


def render(
    name: str,
    subject: str,
    message: str,
    calendly_link: str,
    frontend_url: str,
    phone: str,
) -> str:
    """Return the full HTML email for a contact acknowledgment."""

    trimmed_message = message[:300] + ("..." if len(message) > 300 else "")

    body = f"""
            <p class="greeting">Dear {name},</p>

            <p>
                Thank you for reaching out. I have received your inquiry regarding
                <strong>{subject}</strong> and will review it at the earliest opportunity.
            </p>

            <p class="section-label">Your Message</p>
            <div class="quote">{trimmed_message}</div>

            <table class="info-table">
                <tr><td>Subject</td><td>{subject}</td></tr>
                <tr><td>Status</td><td>Received &amp; under review</td></tr>
                <tr><td>Expected Response</td><td>Within 24 hours</td></tr>
            </table>

            <p>
                Should you wish to discuss this matter sooner, I am happy to arrange a
                brief call at a time convenient to you.
            </p>

            <a href="{calendly_link}" class="cta-btn">Schedule a Call</a>

            <div class="secondary-links">
                Alternatively, you may reach me via
                <a href="https://wa.me/{phone}">WhatsApp</a> or review my
                <a href="{frontend_url}/projects">project portfolio</a>.
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
