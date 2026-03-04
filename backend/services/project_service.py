"""
Project Service with Repository Pattern.

Architecture:
  - ProjectRepository (ABC) defines the interface
  - JSONProjectRepository reads/writes a JSON file
  - DatabaseProjectRepository uses SQLAlchemy + PostgreSQL (active)

The active repository is set via the `project_repo` singleton at the bottom.
"""
import json
import logging
import threading
from abc import ABC, abstractmethod
from datetime import datetime, timezone
from pathlib import Path
from typing import List, Optional

from database import SessionLocal
from models import ProjectModel

logger = logging.getLogger(__name__)


# ============= Abstract Repository =============

class ProjectRepository(ABC):
    """
    Abstract base for project storage.
    Swap implementations to switch from JSON → Database.
    """

    @abstractmethod
    def get_all(self) -> List[dict]:
        """Return all projects."""
        ...

    @abstractmethod
    def get_by_id(self, project_id: int) -> Optional[dict]:
        """Return a single project or None."""
        ...

    @abstractmethod
    def create(self, project_data: dict) -> dict:
        """Create a project, assign an ID, return it."""
        ...

    @abstractmethod
    def update(self, project_id: int, updates: dict) -> Optional[dict]:
        """Update a project's fields. Return updated project or None."""
        ...

    @abstractmethod
    def delete(self, project_id: int) -> bool:
        """Delete a project. Return True if found and deleted."""
        ...


# ============= JSON File Implementation =============

class JSONProjectRepository(ProjectRepository):
    """
    Thread-safe JSON-file backed repository.
    Reads/writes to backend/data/projects.json.
    """

    def __init__(self, file_path: Optional[str] = None):
        if file_path is None:
            file_path = str(Path(__file__).resolve().parent.parent / "data" / "projects.json")
        self._file_path = Path(file_path)
        self._lock = threading.Lock()
        self._ensure_file()

    def _ensure_file(self):
        """Create the data file and directory if they don't exist."""
        self._file_path.parent.mkdir(parents=True, exist_ok=True)
        if not self._file_path.exists():
            self._file_path.write_text("[]", encoding="utf-8")

    def _read(self) -> List[dict]:
        """Read all projects from disk."""
        try:
            content = self._file_path.read_text(encoding="utf-8").strip()
            if not content:
                return []
            return json.loads(content)
        except (json.JSONDecodeError, FileNotFoundError):
            return []

    def _write(self, projects: List[dict]):
        """Write all projects to disk."""
        self._file_path.write_text(
            json.dumps(projects, indent=2, ensure_ascii=False),
            encoding="utf-8",
        )

    def _next_id(self, projects: List[dict]) -> int:
        """Generate the next auto-increment ID."""
        if not projects:
            return 1
        return max(p.get("id", 0) for p in projects) + 1

    # --- Public API ---

    def get_all(self) -> List[dict]:
        with self._lock:
            return self._read()

    def get_by_id(self, project_id: int) -> Optional[dict]:
        with self._lock:
            projects = self._read()
            return next((p for p in projects if p["id"] == project_id), None)

    def create(self, project_data: dict) -> dict:
        now = datetime.now(timezone.utc).isoformat()
        with self._lock:
            projects = self._read()
            project_data["id"] = self._next_id(projects)
            project_data["created_at"] = now
            project_data["updated_at"] = now
            projects.append(project_data)
            self._write(projects)
        return project_data

    def update(self, project_id: int, updates: dict) -> Optional[dict]:
        now = datetime.now(timezone.utc).isoformat()
        with self._lock:
            projects = self._read()
            for i, p in enumerate(projects):
                if p["id"] == project_id:
                    # Only update provided (non-None) fields
                    for key, value in updates.items():
                        if value is not None:
                            projects[i][key] = value
                    projects[i]["updated_at"] = now
                    self._write(projects)
                    return projects[i]
        return None

    def delete(self, project_id: int) -> bool:
        with self._lock:
            projects = self._read()
            original_len = len(projects)
            projects = [p for p in projects if p["id"] != project_id]
            if len(projects) < original_len:
                self._write(projects)
                return True
        return False


# ============= Database Implementation =============

# snake_case DB column → camelCase API key
_DB_TO_API = {
    "id":                 "id",
    "title":              "title",
    "description":        "description",
    "long_description":   "longDescription",
    "image":              "image",
    "type":               "type",
    "category":           "category",
    "role":               "role",
    "duration":           "duration",
    "tags":               "tags",
    "objectives":         "objectives",
    "technologies":       "technologies",
    "methods":            "methods",
    "results":            "results",
    "tldr":               "tldr",
    "key_impact_metrics": "keyImpactMetrics",
    "problem_statement":  "ProblemStatement",
    "literature_review":  "LiteratureReview",
    "code_snippet":       "codeSnippet",
    "standings":          "standings",
    "company":            "company",
    "github_link":        "githubLink",
    "article_link":       "articleLink",
    "live_demo_link":     "liveDemoLink",
    "core_stack":         "coreStack",
    "tools":              "tools",
    "implementation":     "implementation",
    "discussion":         "discussion",
    "conclusion":         "conclusion",
    "limitations":        "limitations",
    "future_work":        "futureWork",
    "references":         "references",
    "acknowledgements":   "acknowledgements",
    "challenges":         "challenges",
    "solutions":          "solutions",
    "gallery_images":     "galleryImages",
    "similar_project_ids":"similarProjectIds",
    "created_at":         "created_at",
    "updated_at":         "updated_at",
}

# camelCase API key → snake_case DB column (reverse mapping)
_API_TO_DB = {v: k for k, v in _DB_TO_API.items()}


def _model_to_dict(row: ProjectModel) -> dict:
    """Convert a SQLAlchemy model instance → camelCase dict for the API."""
    result = {}
    for db_col, api_key in _DB_TO_API.items():
        value = getattr(row, db_col, None)
        if value is None:
            continue
        # Convert enum to string
        if hasattr(value, "value"):
            value = value.value
        # Convert datetime to ISO string
        if isinstance(value, datetime):
            value = value.isoformat()
        result[api_key] = value
    return result


def _dict_to_model_kwargs(data: dict) -> dict:
    """Convert a camelCase API dict → snake_case kwargs for the ORM model."""
    kwargs = {}
    for api_key, value in data.items():
        db_col = _API_TO_DB.get(api_key)
        if db_col is None or db_col in ("id", "created_at", "updated_at"):
            continue  # skip auto-managed fields
        if value is not None:
            kwargs[db_col] = value
    return kwargs


class DatabaseProjectRepository(ProjectRepository):
    """
    PostgreSQL-backed repository using SQLAlchemy ORM.
    Reads from / writes to the `projects` table in Neon.
    Uses context-managed sessions for proper resource cleanup.
    """

    @staticmethod
    def _session():
        """Return a context-managed database session."""
        from contextlib import contextmanager

        @contextmanager
        def _ctx():
            db = SessionLocal()
            try:
                yield db
            finally:
                db.close()
        return _ctx()

    def get_all(self) -> List[dict]:
        with self._session() as db:
            rows = db.query(ProjectModel).order_by(ProjectModel.id).all()
            return [_model_to_dict(r) for r in rows]

    def get_by_id(self, project_id: int) -> Optional[dict]:
        with self._session() as db:
            row = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
            return _model_to_dict(row) if row else None

    def create(self, project_data: dict) -> dict:
        with self._session() as db:
            try:
                kwargs = _dict_to_model_kwargs(project_data)
                project = ProjectModel(**kwargs)
                db.add(project)
                db.commit()
                db.refresh(project)
                return _model_to_dict(project)
            except Exception:
                db.rollback()
                raise

    def update(self, project_id: int, updates: dict) -> Optional[dict]:
        with self._session() as db:
            try:
                row = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
                if not row:
                    return None
                kwargs = _dict_to_model_kwargs(updates)
                for col, value in kwargs.items():
                    setattr(row, col, value)
                row.updated_at = datetime.now(timezone.utc)
                db.commit()
                db.refresh(row)
                return _model_to_dict(row)
            except Exception:
                db.rollback()
                raise

    def delete(self, project_id: int) -> bool:
        with self._session() as db:
            try:
                row = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
                if not row:
                    return False
                db.delete(row)
                db.commit()
                return True
            except Exception:
                db.rollback()
                raise


# ============= Singleton Instance =============
# Active: DatabaseProjectRepository (PostgreSQL via Neon)
# Fallback: JSONProjectRepository (for local dev without DB)

project_repo: ProjectRepository = DatabaseProjectRepository()


# ============= Service Functions (used by routes) =============

def get_all_projects() -> List[dict]:
    """Get all projects."""
    return project_repo.get_all()


def get_project_by_id(project_id: int) -> Optional[dict]:
    """Get a single project by ID."""
    return project_repo.get_by_id(project_id)


def create_project(project_data: dict) -> dict:
    """Create a new project."""
    return project_repo.create(project_data)


def update_project(project_id: int, updates: dict) -> Optional[dict]:
    """Update an existing project."""
    return project_repo.update(project_id, updates)


def delete_project(project_id: int) -> bool:
    """Delete a project by ID."""
    return project_repo.delete(project_id)
