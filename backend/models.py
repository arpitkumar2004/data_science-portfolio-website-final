from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, Float, JSON, Enum
from sqlalchemy.dialects.postgresql import JSONB
from database import Base
from datetime import datetime, timezone
import enum


def _utcnow():
    """Timezone-aware UTC now (replaces deprecated datetime.utcnow)."""
    return datetime.now(timezone.utc)


# ============= Project Category Enum =============

class ProjectCategoryEnum(str, enum.Enum):
    DATA_SCIENCE = "data-science"
    WEB_APP = "web-app"
    SYSTEM_DESIGN = "system-design"
    CHEMICAL_RESEARCH = "chemical-research"


# ============= Project Model =============

class ProjectModel(Base):
    """SQLAlchemy model for the `projects` table (Neon PostgreSQL)."""
    __tablename__ = "projects"

    # Primary key
    id = Column(Integer, primary_key=True, index=True)

    # Core required fields
    title = Column(String(200), nullable=False)
    description = Column(String(1000), nullable=False)
    long_description = Column(Text, nullable=False)
    image = Column(Text, nullable=False)
    type = Column(String(100), nullable=False)
    category = Column(
        Enum(ProjectCategoryEnum,
             values_callable=lambda x: [e.value for e in x],
             name="project_category",
             create_type=False),
        nullable=False,
        default=ProjectCategoryEnum.DATA_SCIENCE.value,
    )
    role = Column(String(100), nullable=False)
    duration = Column(String(100), nullable=False)

    # Required JSONB arrays
    tags = Column(JSONB, nullable=False, default=[])
    objectives = Column(JSONB, nullable=False, default=[])
    technologies = Column(JSONB, nullable=False, default=[])
    methods = Column(JSONB, nullable=False, default=[])
    results = Column(JSONB, nullable=False, default=[])

    # Optional text fields
    tldr = Column(Text, nullable=True)
    problem_statement = Column(Text, nullable=True)
    literature_review = Column(Text, nullable=True)
    code_snippet = Column(Text, nullable=True)
    standings = Column(Text, nullable=True)
    company = Column(String(200), nullable=True)

    # Optional link fields
    github_link = Column(Text, nullable=True)
    article_link = Column(Text, nullable=True)
    live_demo_link = Column(Text, nullable=True)

    # Optional JSONB arrays
    key_impact_metrics = Column(JSONB, nullable=True)
    core_stack = Column(JSONB, nullable=True)
    tools = Column(JSONB, nullable=True)
    implementation = Column(JSONB, nullable=True)
    discussion = Column(JSONB, nullable=True)
    conclusion = Column(JSONB, nullable=True)
    limitations = Column(JSONB, nullable=True)
    future_work = Column(JSONB, nullable=True)
    # "references" is a reserved word in PG; column name is quoted in the migration
    references = Column("references", JSONB, nullable=True)
    acknowledgements = Column(JSONB, nullable=True)
    challenges = Column(JSONB, nullable=True)
    solutions = Column(JSONB, nullable=True)
    gallery_images = Column(JSONB, nullable=True)
    similar_project_ids = Column(JSONB, nullable=True)

    # Audit timestamps
    created_at = Column(DateTime, default=_utcnow, nullable=False)
    updated_at = Column(DateTime, default=_utcnow,
                        onupdate=_utcnow, nullable=False)


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
    created_at = Column(DateTime, default=_utcnow, nullable=False, index=True)
    updated_at = Column(DateTime, default=_utcnow, onupdate=_utcnow, nullable=False)
    
    # Follow-up Management
    last_contacted = Column(DateTime, nullable=True)
    follow_up_date = Column(DateTime, nullable=True)
    contact_history = Column(JSON, default=list)  # List of contact events with timestamps
    
    # Source Attribution
    source = Column(String, default="contact_form")  # contact_form, linkedin, referral, etc.
    
    # Deprecated field for backward compatibility
    timestamp = Column(DateTime, default=_utcnow)
