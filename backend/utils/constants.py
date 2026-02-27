"""Constants and email templates"""
from datetime import datetime

# Email template for contact form acknowledgment
def get_contact_acknowledgment_email(name: str, subject: str, message: str, calendly_link: str, frontend_url: str, phone: str):
    """Generate HTML email for contact form acknowledgment"""
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {{ margin: 0; padding: 20px; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; font-size: 15px; line-height: 1.6; }}
            .email {{ max-width: 600px; margin: 0 auto; }}
            .greeting {{ margin-bottom: 16px; }}
            .quote {{ background: #f5f5f5; border-left: 3px solid #cccccc; padding: 12px 16px; margin: 16px 0; font-size: 14px; color: #555555; }}
            .cta-btn {{ display: inline-block; background-color: #2563eb; color: #ffffff !important; text-decoration: none; padding: 10px 24px; border-radius: 4px; font-size: 14px; font-weight: 500; margin-top: 8px; }}
            .signature {{ margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e5e5; font-size: 14px; color: #555555; line-height: 1.5; }}
            .signature strong {{ color: #222222; }}
            .signature a {{ color: #2563eb; text-decoration: none; }}
            .auto-notice {{ margin-top: 28px; padding: 12px 16px; background: #f9f9f9; border-radius: 4px; font-size: 12px; color: #888888; line-height: 1.5; }}
        </style>
    </head>
    <body>
        <div class="email">
            <p class="greeting">Hi {name},</p>

            <p>Thank you for reaching out regarding <b>{subject}</b>. I've received your message and will review it shortly.</p>

            <p>Here's a copy of what you sent:</p>
            <div class="quote">
                {message[:250]}{'...' if len(message) > 250 else ''}
            </div>

            <p>If you'd like to connect sooner, feel free to book a time that works for you:</p>
            <a href="{calendly_link}" class="cta-btn">Schedule a Call</a>

            <p style="margin-top: 16px; font-size: 14px;">You can also reach me on <a href="https://wa.me/{phone}" style="color: #2563eb; text-decoration: none;">WhatsApp</a> or browse my <a href="{frontend_url}/projects" style="color: #2563eb; text-decoration: none;">portfolio</a>.</p>

            <div class="signature">
                <strong>Arpit Kumar</strong><br>
                AI Researcher &middot; IIT Kharagpur<br>
                <a href="{frontend_url}">{frontend_url}</a>
            </div>

            <div class="auto-notice">
                This is an automated confirmation. You can reply directly to this email and it will reach me.
            </div>
        </div>
    </body>
    </html>
    """


# Email template for CV request
def get_cv_request_email(name: str, company: str, subject_line: str, frontend_url: str, phone: str):
    """Generate HTML email for CV request"""
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {{ margin: 0; padding: 20px; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; font-size: 15px; line-height: 1.6; }}
            .email {{ max-width: 600px; margin: 0 auto; }}
            .greeting {{ margin-bottom: 16px; }}
            .summary {{ margin: 20px 0; font-size: 14px; line-height: 1.6; color: #333333; }}
            .summary ul {{ margin: 8px 0; padding-left: 20px; }}
            .summary li {{ margin-bottom: 4px; }}
            .cta-btn {{ display: inline-block; background-color: #2563eb; color: #ffffff !important; text-decoration: none; padding: 10px 24px; border-radius: 4px; font-size: 14px; font-weight: 500; margin-top: 8px; }}
            .signature {{ margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e5e5; font-size: 14px; color: #555555; line-height: 1.5; }}
            .signature strong {{ color: #222222; }}
            .signature a {{ color: #2563eb; text-decoration: none; }}
            .auto-notice {{ margin-top: 28px; padding: 12px 16px; background: #f9f9f9; border-radius: 4px; font-size: 12px; color: #888888; line-height: 1.5; }}
        </style>
    </head>
    <body>
        <div class="email">
            <p class="greeting">Hi {name},</p>

            <p>Thank you for your interest from <b>{company}</b> regarding <b>{subject_line.replace('CV Request: ', '')}</b>. Please find my CV attached with this email.</p>

            <div class="summary">
                <p style="margin: 0 0 8px; font-weight: 600;">A brief overview:</p>
                <ul>
                    <li><b>Education:</b> IIT Kharagpur &mdash; Integrated Dual Degree, 8.46 CGPA</li>
                    <li><b>Core Skills:</b> Deep Learning (PyTorch/JAX), LLM Fine-tuning, Agentic RAG, NLP</li>
                    <li><b>Engineering:</b> MLOps, Docker, FastAPI, Production ML Systems</li>
                </ul>
            </div>

            <p>I'd be happy to discuss how my experience aligns with your requirements. Feel free to schedule a call at your convenience:</p>
            <a href="https://calendly.com/kumararpit17773/30min" class="cta-btn">Schedule a Call</a>

            <p style="margin-top: 16px; font-size: 14px;">You can also reach me on <a href="https://wa.me/{phone}" style="color: #2563eb; text-decoration: none;">WhatsApp</a> or browse my <a href="{frontend_url}/projects" style="color: #2563eb; text-decoration: none;">portfolio</a>.</p>

            <div class="signature">
                <strong>Arpit Kumar</strong><br>
                AI Researcher &middot; IIT Kharagpur<br>
                <a href="{frontend_url}">{frontend_url}</a>
            </div>

            <div class="auto-notice">
                This is an automated email. You can reply directly to this email and it will reach me.
            </div>
        </div>
    </body>
    </html>
    """
