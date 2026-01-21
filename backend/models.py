from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, Float, JSON, Enum
from database import Base
import datetime
import enum

# Status Enum for Lead Lifecycle
class LeadStatus(str, enum.Enum):
    UNREAD = "unread"
    PROCESSING = "processing"
    CONTACTED = "contacted"
    ARCHIVED = "archived"

# Lead Type Discriminator
class LeadType(str, enum.Enum):
    CONTACT = "contact"
    CV_REQUEST = "cv_request"
    COLLABORATION = "collaboration"

# Priority Levels
class Priority(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"

class ContactLead(Base):
    __tablename__ = "contact_leads"

    # Core Identity
    id = Column(Integer, primary_key=True, index=True)
    
    # Lead Classification
    lead_type = Column(Enum(LeadType, values_callable=lambda x: [e.value for e in x]), default=LeadType.CONTACT.value, nullable=False)
    
    # Contact Information
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, index=True)
    company = Column(String, default="")
    
    # Inquiry Details
    subject = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    
    # Lifecycle Management
    status = Column(Enum(LeadStatus, values_callable=lambda x: [e.value for e in x]), default=LeadStatus.UNREAD.value, nullable=False, index=True)
    priority = Column(Enum(Priority, values_callable=lambda x: [e.value for e in x]), default=Priority.MEDIUM.value, nullable=False)
    
    # "Honey Trap" Metadata - JSONB for flexible storage
    metadata_json = Column("metadata", JSON, default=dict)  # Stores: browser_info, ip_location, user_agent, referrer, etc.
    
    # Legacy/Compatibility Fields
    form_type = Column(String, default="contacts")
    role = Column(String, default="user")  # User role selected (recruiter, student, etc.)
    flagged = Column(Boolean, default=False)
    
    # Quality & Scoring
    quality_score = Column(Float, default=0.0)  # 0.0 to 1.0
    
    # Admin Management
    internal_notes = Column(Text, default="")
    tags = Column(JSON, default=list)  # Categorization tags
    
    # Auditability - CRITICAL timestamps
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False, index=True)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow, nullable=False)
    
    # Follow-up Management
    last_contacted = Column(DateTime, nullable=True)
    follow_up_date = Column(DateTime, nullable=True)
    contact_history = Column(JSON, default=list)  # List of contact events with timestamps
    
    # Source Attribution
    source = Column(String, default="contact_form")  # contact_form, linkedin, referral, etc.
    
    # Deprecated field for backward compatibility
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
