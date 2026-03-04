"""
Pydantic schemas for Project CRUD operations.
Mirrors the frontend Project interface from projectsData.tsx.
"""
from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional
from enum import Enum


class ProjectCategory(str, Enum):
    DATA_SCIENCE = "data-science"
    WEB_APP = "web-app"
    SYSTEM_DESIGN = "system-design"
    CHEMICAL_RESEARCH = "chemical-research"


class ProjectCreate(BaseModel):
    """Schema for creating a new project (all required + optional fields)."""
    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=1, max_length=1000)
    longDescription: str = Field(..., min_length=1)
    image: str = Field(..., description="Image URL or path")
    tags: List[str] = Field(default_factory=list)
    objectives: List[str] = Field(default_factory=list)
    technologies: List[str] = Field(default_factory=list)
    type: str = Field(..., min_length=1, max_length=100)
    category: ProjectCategory
    methods: List[str] = Field(default_factory=list)
    results: List[str] = Field(default_factory=list)
    role: str = Field(..., min_length=1, max_length=100)
    duration: str = Field(..., min_length=1, max_length=100)

    # Optional fields
    tldr: Optional[str] = None
    keyImpactMetrics: Optional[List[str]] = None
    ProblemStatement: Optional[str] = None
    LiteratureReview: Optional[str] = None
    coreStack: Optional[List[str]] = None
    tools: Optional[List[str]] = None
    implementation: Optional[List[str]] = None
    discussion: Optional[List[str]] = None
    conclusion: Optional[List[str]] = None
    limitations: Optional[List[str]] = None
    futureWork: Optional[List[str]] = None
    references: Optional[List[str]] = None
    acknowledgements: Optional[List[str]] = None
    codeSnippet: Optional[str] = None
    githubLink: Optional[str] = None
    articleLink: Optional[str] = None
    liveDemoLink: Optional[str] = None
    company: Optional[str] = None
    challenges: Optional[List[str]] = None
    solutions: Optional[List[str]] = None
    galleryImages: Optional[List[str]] = None
    similarProjectIds: Optional[List[int]] = None
    standings: Optional[str] = None


class ProjectUpdate(BaseModel):
    """Schema for updating a project (all fields optional)."""
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, min_length=1, max_length=1000)
    longDescription: Optional[str] = None
    image: Optional[str] = None
    tags: Optional[List[str]] = None
    objectives: Optional[List[str]] = None
    technologies: Optional[List[str]] = None
    type: Optional[str] = None
    category: Optional[ProjectCategory] = None
    methods: Optional[List[str]] = None
    results: Optional[List[str]] = None
    role: Optional[str] = None
    duration: Optional[str] = None
    tldr: Optional[str] = None
    keyImpactMetrics: Optional[List[str]] = None
    ProblemStatement: Optional[str] = None
    LiteratureReview: Optional[str] = None
    coreStack: Optional[List[str]] = None
    tools: Optional[List[str]] = None
    implementation: Optional[List[str]] = None
    discussion: Optional[List[str]] = None
    conclusion: Optional[List[str]] = None
    limitations: Optional[List[str]] = None
    futureWork: Optional[List[str]] = None
    references: Optional[List[str]] = None
    acknowledgements: Optional[List[str]] = None
    codeSnippet: Optional[str] = None
    githubLink: Optional[str] = None
    articleLink: Optional[str] = None
    liveDemoLink: Optional[str] = None
    company: Optional[str] = None
    challenges: Optional[List[str]] = None
    solutions: Optional[List[str]] = None
    galleryImages: Optional[List[str]] = None
    similarProjectIds: Optional[List[int]] = None
    standings: Optional[str] = None


class ProjectResponse(BaseModel):
    """Schema for project response."""
    id: int
    title: str
    description: str
    longDescription: str
    image: str
    tags: List[str]
    objectives: List[str]
    technologies: List[str]
    type: str
    category: str
    methods: List[str]
    results: List[str]
    role: str
    duration: str
    tldr: Optional[str] = None
    keyImpactMetrics: Optional[List[str]] = None
    ProblemStatement: Optional[str] = None
    LiteratureReview: Optional[str] = None
    coreStack: Optional[List[str]] = None
    tools: Optional[List[str]] = None
    implementation: Optional[List[str]] = None
    discussion: Optional[List[str]] = None
    conclusion: Optional[List[str]] = None
    limitations: Optional[List[str]] = None
    futureWork: Optional[List[str]] = None
    references: Optional[List[str]] = None
    acknowledgements: Optional[List[str]] = None
    codeSnippet: Optional[str] = None
    githubLink: Optional[str] = None
    articleLink: Optional[str] = None
    liveDemoLink: Optional[str] = None
    company: Optional[str] = None
    challenges: Optional[List[str]] = None
    solutions: Optional[List[str]] = None
    galleryImages: Optional[List[str]] = None
    similarProjectIds: Optional[List[int]] = None
    standings: Optional[str] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
