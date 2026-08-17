
from pydantic import BaseModel, ConfigDict, EmailStr, Field


class StatusUpdate(BaseModel):
    status: str = Field(..., pattern="^(unread|processing|contacted|archived)$")


class PriorityRequest(BaseModel):
    priority: str = Field(..., pattern="^(low|medium|high|urgent)$")


class ScoreRequest(BaseModel):
    quality_score: float


class NotesUpdate(BaseModel):
    internal_notes: str


class TagUpdate(BaseModel):
    tags: list[str]


class BulkStatusUpdate(BaseModel):
    lead_ids: list[int]
    status: str = Field(..., pattern="^(unread|processing|contacted|archived)$")


class ContactLeadCreate(BaseModel):
    """Schema for creating a new contact lead"""
    name: str
    email: EmailStr
    subject: str
    message: str
    company: str | None = None
    form_type: str = "contacts"
    role: str | None = None
    lead_type: str | None = "contact"
    metadata: dict | None = None


class CVRequestCreate(BaseModel):
    """Schema for CV request form"""
    name: str
    email: EmailStr
    company: str
    subject: str
    message: str
    role: str | None = None
    metadata: dict | None = None


class ContactLeadResponse(BaseModel):
    """Schema for serialized contact lead response"""
    id: int
    name: str
    email: str
    subject: str
    company: str
    message: str
    lead_type: str | None
    created_at: str | None
    updated_at: str | None
    flagged: bool
    status: str
    priority: str
    quality_score: float
    internal_notes: str
    last_contacted: str | None
    follow_up_date: str | None
    contact_history: list
    tags: list[str]
    source: str
    metadata: dict | None

    model_config = ConfigDict(from_attributes=True)


class LeadStatistics(BaseModel):
    """Schema for lead statistics"""
    total_leads: int
    status_distribution: dict
    conversion_rate: float
    avg_quality_score: float
    leads_last_30_days: int
