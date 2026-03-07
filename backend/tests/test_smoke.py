"""
Smoke tests — verify the app boots and core endpoints respond.
Run with: pytest (from the backend/ directory)
"""


def test_health_root(client):
    """GET /api/ returns 200 with operational status."""
    response = client.get("/api/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "System Operational"
    assert "version" in data


def test_health_hello(client):
    """GET /api/hello returns 200 with greeting."""
    response = client.get("/api/hello")
    assert response.status_code == 200
    assert "message" in response.json()


def test_login_rejects_bad_password(client):
    """POST /api/admin/login with wrong password returns 401."""
    response = client.post("/api/admin/login", data={"password": "wrong"})
    assert response.status_code == 401


def test_protected_endpoint_requires_auth(client):
    """GET /api/admin/me without token returns 401."""
    response = client.get("/api/admin/me")
    assert response.status_code == 401
