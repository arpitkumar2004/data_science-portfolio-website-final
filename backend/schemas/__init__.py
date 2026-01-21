from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime


class StatusUpdate(BaseModel):
    status: str = Field(..., pattern="^(new|contacted|qualified|converted|lost)$")


class PriorityRequest(BaseModel):
    priority: str


class ScoreRequest(BaseModel):
    quality_score: float


class NotesUpdate(BaseModel):
    internal_notes: str


class TagUpdate(BaseModel):
    tags: List[str]


class BulkStatusUpdate(BaseModel):
    lead_ids: List[int]
    status: str


class ContactLeadCreate(BaseModel):
    """Schema for creating a new contact lead"""
    name: str
    email: EmailStr
    subject: str
    message: str
    company: Optional[str] = None
    form_type: str = "contacts"
    role: Optional[str] = None


class CVRequestCreate(BaseModel):
    """Schema for CV request form"""
    name: str
    email: EmailStr
    company: str
    subject: str
    message: str
    role: Optional[str] = None


class ContactLeadResponse(BaseModel):
    """Schema for serialized contact lead response"""
    id: int
    name: str
    email: str
    subject: str
    company: str
    message: str
    timestamp: Optional[str]
    flagged: bool
    status: str
    priority: str
    quality_score: float
    internal_notes: str
    last_contacted: Optional[str]
    follow_up_date: Optional[str]
    contact_history: List
    tags: List[str]
    source: str

    class Config:
        from_attributes = True


class LeadStatistics(BaseModel):
    """Schema for lead statistics"""
    total_leads: int
    status_distribution: dict
    conversion_rate: float
    avg_quality_score: float
    leads_last_30_days: int
