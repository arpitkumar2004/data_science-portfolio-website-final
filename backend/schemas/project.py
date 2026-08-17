"""
Pydantic schemas for Project CRUD operations.
Mirrors the frontend Project interface from projectsData.tsx.
"""
from enum import Enum

from pydantic import BaseModel, Field


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
    tags: list[str] = Field(default_factory=list)
    objectives: list[str] = Field(default_factory=list)
    technologies: list[str] = Field(default_factory=list)
    type: str = Field(..., min_length=1, max_length=100)
    category: ProjectCategory
    methods: list[str] = Field(default_factory=list)
    results: list[str] = Field(default_factory=list)
    role: str = Field(..., min_length=1, max_length=100)
    duration: str = Field(..., min_length=1, max_length=100)

    # Optional fields
    tldr: str | None = None
    keyImpactMetrics: list[str] | None = None
    ProblemStatement: str | None = None
    LiteratureReview: str | None = None
    coreStack: list[str] | None = None
    tools: list[str] | None = None
    implementation: list[str] | None = None
    discussion: list[str] | None = None
    conclusion: list[str] | None = None
    limitations: list[str] | None = None
    futureWork: list[str] | None = None
    references: list[str] | None = None
    acknowledgements: list[str] | None = None
    codeSnippet: str | None = None
    githubLink: str | None = None
    articleLink: str | None = None
    liveDemoLink: str | None = None
    company: str | None = None
    challenges: list[str] | None = None
    solutions: list[str] | None = None
    galleryImages: list[str] | None = None
    similarProjectIds: list[int] | None = None
    standings: str | None = None


class ProjectUpdate(BaseModel):
    """Schema for updating a project (all fields optional)."""
    title: str | None = Field(None, min_length=1, max_length=200)
    description: str | None = Field(None, min_length=1, max_length=1000)
    longDescription: str | None = None
    image: str | None = None
    tags: list[str] | None = None
    objectives: list[str] | None = None
    technologies: list[str] | None = None
    type: str | None = None
    category: ProjectCategory | None = None
    methods: list[str] | None = None
    results: list[str] | None = None
    role: str | None = None
    duration: str | None = None
    tldr: str | None = None
    keyImpactMetrics: list[str] | None = None
    ProblemStatement: str | None = None
    LiteratureReview: str | None = None
    coreStack: list[str] | None = None
    tools: list[str] | None = None
    implementation: list[str] | None = None
    discussion: list[str] | None = None
    conclusion: list[str] | None = None
    limitations: list[str] | None = None
    futureWork: list[str] | None = None
    references: list[str] | None = None
    acknowledgements: list[str] | None = None
    codeSnippet: str | None = None
    githubLink: str | None = None
    articleLink: str | None = None
    liveDemoLink: str | None = None
    company: str | None = None
    challenges: list[str] | None = None
    solutions: list[str] | None = None
    galleryImages: list[str] | None = None
    similarProjectIds: list[int] | None = None
    standings: str | None = None


class ProjectResponse(BaseModel):
    """Schema for project response."""
    id: int
    title: str
    description: str
    longDescription: str
    image: str
    tags: list[str]
    objectives: list[str]
    technologies: list[str]
    type: str
    category: str
    methods: list[str]
    results: list[str]
    role: str
    duration: str
    tldr: str | None = None
    keyImpactMetrics: list[str] | None = None
    ProblemStatement: str | None = None
    LiteratureReview: str | None = None
    coreStack: list[str] | None = None
    tools: list[str] | None = None
    implementation: list[str] | None = None
    discussion: list[str] | None = None
    conclusion: list[str] | None = None
    limitations: list[str] | None = None
    futureWork: list[str] | None = None
    references: list[str] | None = None
    acknowledgements: list[str] | None = None
    codeSnippet: str | None = None
    githubLink: str | None = None
    articleLink: str | None = None
    liveDemoLink: str | None = None
    company: str | None = None
    challenges: list[str] | None = None
    solutions: list[str] | None = None
    galleryImages: list[str] | None = None
    similarProjectIds: list[int] | None = None
    standings: str | None = None
    created_at: str | None = None
    updated_at: str | None = None
