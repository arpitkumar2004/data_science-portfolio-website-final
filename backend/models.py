from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, Float, JSON
from database import Base
import datetime

class ContactLead(Base):
    __tablename__ = "contact_leads"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    form_type = Column(String, default="contacts")
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    flagged = Column(Boolean, default=False)
    role = Column(String, default="user")

    # Enhanced fields for advanced admin dashboard
    status = Column(String, default="new")  # new, contacted, qualified, converted, lost
    priority = Column(String, default="medium")  # low, medium, high
    quality_score = Column(Float, default=0.0)  # 0.0 to 1.0
    internal_notes = Column(Text, default="")
    last_contacted = Column(DateTime, nullable=True)
    follow_up_date = Column(DateTime, nullable=True)
    contact_history = Column(JSON, default=list)  # List of contact events with timestamps
    tags = Column(JSON, default=list)  # List of tags for categorization
    source = Column(String, default="contact_form")  # contact_form, linkedin, referral, etc.
