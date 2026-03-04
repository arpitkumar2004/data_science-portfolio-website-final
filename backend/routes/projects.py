"""
Project management endpoints with JWT auth.
Admin-only CRUD operations + public read endpoint for portfolio frontend.
"""
import logging
import time

from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.responses import JSONResponse
from typing import List
from slowapi import Limiter
from slowapi.util import get_remote_address

from schemas.project import ProjectCreate, ProjectUpdate, ProjectResponse
from services.auth_service_v2 import require_admin
from services.project_service import (
    get_all_projects,
    get_project_by_id,
    create_project,
    update_project,
    delete_project,
)
from config import RATE_LIMIT_ADMIN, RATE_LIMIT_PUBLIC

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/admin/projects", tags=["projects"])
limiter = Limiter(key_func=get_remote_address)

# ── Simple TTL cache for public project list ──
_projects_cache: dict = {"data": None, "expires": 0}
_CACHE_TTL = 300  # 5 minutes


def _get_cached_projects() -> List[dict]:
    """Return cached projects or refresh from DB."""
    now = time.time()
    if _projects_cache["data"] is not None and now < _projects_cache["expires"]:
        return _projects_cache["data"]
    data = get_all_projects()
    _projects_cache["data"] = data
    _projects_cache["expires"] = now + _CACHE_TTL
    return data


def _invalidate_projects_cache() -> None:
    """Clear the project cache (called after create/update/delete)."""
    _projects_cache["data"] = None
    _projects_cache["expires"] = 0


# ============= Separate Public Router (no /admin prefix) =============

public_router = APIRouter(prefix="/api/projects", tags=["projects-public"])


@public_router.get(
    "",
    response_model=List[ProjectResponse],
    summary="Get all projects (public)",
)
@limiter.limit(RATE_LIMIT_PUBLIC)
async def list_projects_public_clean(request: Request):
    """
    Public endpoint at /api/projects — returns all projects for the 
    portfolio frontend. No authentication required.
    Responses are cached for 5 minutes and include Cache-Control header.
    """
    data = _get_cached_projects()
    response = JSONResponse(content=data)
    response.headers["Cache-Control"] = "public, max-age=300"
    return response


@public_router.get(
    "/{project_id}",
    response_model=ProjectResponse,
    summary="Get a single project (public)",
)
@limiter.limit(RATE_LIMIT_PUBLIC)
async def get_project_public(request: Request, project_id: int):
    """Public endpoint to get a single project by ID."""
    project = get_project_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with id {project_id} not found",
        )
    return project


# ============= Legacy Public (under admin prefix, kept for compatibility) =============

@router.get(
    "/public",
    response_model=List[ProjectResponse],
    summary="Get all projects (public)",
)
async def list_projects_public(request: Request):
    """
    Public endpoint — returns all projects for the portfolio frontend.
    No authentication required.
    """
    return get_all_projects()


# ============= Admin Endpoints =============

@router.get(
    "",
    response_model=List[ProjectResponse],
    summary="List all projects (admin)",
)
@limiter.limit(RATE_LIMIT_ADMIN)
async def list_projects(request: Request, admin: dict = Depends(require_admin)):
    """Get all projects for admin management."""
    return get_all_projects()


@router.get(
    "/{project_id}",
    response_model=ProjectResponse,
    summary="Get a single project",
)
@limiter.limit(RATE_LIMIT_ADMIN)
async def get_project(request: Request, project_id: int, admin: dict = Depends(require_admin)):
    """Get a single project by ID."""
    project = get_project_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with id {project_id} not found",
        )
    return project


@router.post(
    "",
    response_model=ProjectResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new project",
)
@limiter.limit(RATE_LIMIT_ADMIN)
async def create_new_project(
    request: Request,
    project: ProjectCreate,
    admin: dict = Depends(require_admin),
):
    """Create a new portfolio project."""
    project_data = project.model_dump()
    # Convert enum to string for JSON storage
    if "category" in project_data and hasattr(project_data["category"], "value"):
        project_data["category"] = project_data["category"].value
    created = create_project(project_data)
    _invalidate_projects_cache()
    return created


@router.patch(
    "/{project_id}",
    response_model=ProjectResponse,
    summary="Update a project",
)
@limiter.limit(RATE_LIMIT_ADMIN)
async def update_existing_project(
    request: Request,
    project_id: int,
    updates: ProjectUpdate,
    admin: dict = Depends(require_admin),
):
    """Update an existing project. Only provided fields are changed."""
    update_data = updates.model_dump(exclude_unset=True)
    # Convert enum to string for JSON storage
    if "category" in update_data and hasattr(update_data["category"], "value"):
        update_data["category"] = update_data["category"].value
    updated = update_project(project_id, update_data)
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with id {project_id} not found",
        )
    _invalidate_projects_cache()
    return updated


@router.delete(
    "/{project_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a project",
)
@limiter.limit(RATE_LIMIT_ADMIN)
async def delete_existing_project(
    request: Request,
    project_id: int,
    admin: dict = Depends(require_admin),
):
    """Permanently delete a project."""
    deleted = delete_project(project_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with id {project_id} not found",
        )
    _invalidate_projects_cache()
    return None
