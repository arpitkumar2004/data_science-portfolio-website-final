from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
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