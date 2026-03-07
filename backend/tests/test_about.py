"""
About endpoint tests — GET /api/about (public, cached).
"""
import json
from unittest.mock import patch


class TestAboutEndpoint:
    """GET /api/about"""

    @patch("routes.about._load_about_data")
    def test_returns_about_data(self, mock_load, client):
        mock_load.return_value = {"name": "Arpit Kumar", "bio": "Engineer"}
        resp = client.get("/api/about")
        assert resp.status_code == 200
        data = resp.json()
        assert data["name"] == "Arpit Kumar"

    @patch("routes.about._load_about_data")
    def test_cache_control_header(self, mock_load, client):
        mock_load.return_value = {"name": "Arpit"}
        resp = client.get("/api/about")
        assert "max-age=3600" in resp.headers.get("cache-control", "")

    @patch("routes.about._load_about_data", side_effect=FileNotFoundError)
    def test_file_not_found_returns_404(self, mock_load, client):
        resp = client.get("/api/about")
        assert resp.status_code == 404
        assert "not found" in resp.json()["error"].lower()

    @patch("routes.about._load_about_data", side_effect=json.JSONDecodeError("", "", 0))
    def test_invalid_json_returns_500(self, mock_load, client):
        resp = client.get("/api/about")
        assert resp.status_code == 500
        assert "format" in resp.json()["error"].lower()


class TestHealthEndpoints:
    """GET /api/ and GET /api/hello"""

    def test_root(self, client):
        resp = client.get("/api/")
        assert resp.status_code == 200
        assert resp.json()["status"] == "System Operational"

    def test_hello(self, client):
        resp = client.get("/api/hello")
        assert resp.status_code == 200
        assert "Hello" in resp.json()["message"]
