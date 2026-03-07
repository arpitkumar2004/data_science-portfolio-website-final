"""
Auth endpoint tests — login, token validation, /me.
"""
import os


def test_login_success(client):
    """POST /api/admin/login with correct password returns JWT."""
    resp = client.post(
        "/api/admin/login",
        data={"password": os.environ["ADMIN_SECRET_KEY"]},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["expires_in"] == 3600


def test_login_wrong_password(client):
    """POST /api/admin/login with bad password returns 401."""
    resp = client.post("/api/admin/login", data={"password": "bad"})
    assert resp.status_code == 401


def test_login_missing_password(client):
    """POST /api/admin/login with no body returns 422."""
    resp = client.post("/api/admin/login")
    assert resp.status_code == 422


def test_me_with_valid_token(client, auth_header):
    """GET /api/admin/me with valid JWT returns admin info."""
    resp = client.get("/api/admin/me", headers=auth_header)
    assert resp.status_code == 200
    data = resp.json()
    assert data["user"] == "admin"
    assert data["role"] == "admin"
    assert data["auth_type"] == "jwt"


def test_me_without_token(client):
    """GET /api/admin/me without token returns 401."""
    resp = client.get("/api/admin/me")
    assert resp.status_code == 401


def test_me_with_invalid_token(client):
    """GET /api/admin/me with garbage token returns 401."""
    resp = client.get(
        "/api/admin/me",
        headers={"Authorization": "Bearer not-a-valid-token"},
    )
    assert resp.status_code == 401


def test_me_with_expired_format_token(client):
    """GET /api/admin/me with malformed auth header returns 401."""
    resp = client.get(
        "/api/admin/me",
        headers={"Authorization": "InvalidScheme abc123"},
    )
    assert resp.status_code == 401
