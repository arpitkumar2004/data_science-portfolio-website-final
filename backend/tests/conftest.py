"""
Shared test fixtures and early patching.
This file runs before any test module is imported.
"""
import os
from unittest.mock import MagicMock
import pytest

# 1. Set dummy env vars before anything imports config.py
os.environ.setdefault("DATABASE_URL", "sqlite:///./test.db")
os.environ.setdefault("JWT_SECRET_KEY", "test-secret-key-not-for-production")
os.environ.setdefault("ADMIN_SECRET_KEY", "test-admin-key")
os.environ.setdefault("RESEND_API_KEY", "re_test_fake_key")

# 2. Patch create_all before main.py is imported (models use JSONB = PostgreSQL only)
import sqlalchemy.sql.schema as _schema
_original_create_all = _schema.MetaData.create_all
_schema.MetaData.create_all = MagicMock()

from fastapi.testclient import TestClient
from main import app


@pytest.fixture
def client():
    """FastAPI test client."""
    return TestClient(app)


@pytest.fixture(scope="session")
def admin_token():
    """Get a valid JWT token by logging in once for the entire test session."""
    c = TestClient(app)
    resp = c.post("/api/admin/login", data={"password": os.environ["ADMIN_SECRET_KEY"]})
    return resp.json()["access_token"]


@pytest.fixture
def auth_header(admin_token):
    """Authorization header dict for admin endpoints."""
    return {"Authorization": f"Bearer {admin_token}"}
