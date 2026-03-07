"""
Project endpoint tests — public list + admin CRUD.
Uses unittest.mock to patch the project service layer.
"""
from unittest.mock import patch


# ── Helpers ──

def _sample_project(**overrides):
    """Return a dict matching ProjectResponse shape."""
    defaults = dict(
        id=1, title="ML Pipeline", description="A machine learning pipeline",
        longDescription="Detailed description here", image="/img/ml.png",
        tags=["python", "ml"], objectives=["Build pipeline"],
        technologies=["Python", "Scikit-learn"], type="Data Science",
        category="data-science", methods=["supervised"], results=["95% accuracy"],
        role="Lead Developer", duration="3 months",
        tldr=None, keyImpactMetrics=None, ProblemStatement=None,
        LiteratureReview=None, coreStack=None, tools=None,
        implementation=None, discussion=None, conclusion=None,
        limitations=None, futureWork=None, references=None,
        acknowledgements=None, codeSnippet=None, githubLink=None,
        articleLink=None, liveDemoLink=None, company=None,
        challenges=None, solutions=None, galleryImages=None,
        similarProjectIds=None, standings=None,
        created_at="2024-01-01T00:00:00", updated_at="2024-01-01T00:00:00",
    )
    defaults.update(overrides)
    return defaults


def _create_payload(**overrides):
    """Minimal valid project creation payload."""
    defaults = dict(
        title="New Project", description="A new project",
        longDescription="Long description of the project",
        image="/img/new.png", type="Web App", category="web-app",
        role="Developer", duration="2 months",
    )
    defaults.update(overrides)
    return defaults


# ═══════════════ PUBLIC ENDPOINTS ═══════════════


class TestPublicProjects:
    """GET /api/projects (public list)"""

    @patch("routes.projects._get_cached_projects")
    def test_list_all(self, mock_cache, client):
        mock_cache.return_value = [_sample_project()]
        resp = client.get("/api/projects")
        assert resp.status_code == 200
        data = resp.json()
        assert isinstance(data, list)
        assert len(data) == 1
        assert data[0]["title"] == "ML Pipeline"

    @patch("routes.projects._get_cached_projects")
    def test_cache_control_header(self, mock_cache, client):
        mock_cache.return_value = []
        resp = client.get("/api/projects")
        assert "max-age=300" in resp.headers.get("cache-control", "")

    @patch("routes.projects.get_project_by_id")
    def test_get_single(self, mock_get, client):
        mock_get.return_value = _sample_project(id=5)
        resp = client.get("/api/projects/5")
        assert resp.status_code == 200

    @patch("routes.projects.get_project_by_id")
    def test_get_single_not_found(self, mock_get, client):
        mock_get.return_value = None
        resp = client.get("/api/projects/999")
        assert resp.status_code == 404


class TestPublicProjectVersion:
    """GET /api/projects/version"""

    @patch("routes.projects.get_version_info")
    def test_version_info(self, mock_ver, client):
        mock_ver.return_value = {"count": 5, "last_updated": "2024-06-01T00:00:00"}
        resp = client.get("/api/projects/version")
        assert resp.status_code == 200
        assert resp.json()["count"] == 5

    @patch("routes.projects.get_version_info")
    def test_version_cache_header(self, mock_ver, client):
        mock_ver.return_value = {"count": 0, "last_updated": None}
        resp = client.get("/api/projects/version")
        assert "max-age=60" in resp.headers.get("cache-control", "")


class TestLegacyPublicProjects:
    """GET /api/admin/projects/public (backward compat)"""

    @patch("routes.projects.get_all_projects")
    def test_legacy_public(self, mock_get, client):
        mock_get.return_value = [_sample_project()]
        resp = client.get("/api/admin/projects/public")
        assert resp.status_code == 200


# ═══════════════ ADMIN — AUTH GUARD ═══════════════


class TestProjectAdminAuthGuard:
    """Verify all admin project endpoints reject unauthenticated requests."""

    def test_list_requires_auth(self, client):
        resp = client.get("/api/admin/projects")
        assert resp.status_code == 401

    def test_get_requires_auth(self, client):
        resp = client.get("/api/admin/projects/1")
        assert resp.status_code == 401

    def test_create_requires_auth(self, client):
        resp = client.post("/api/admin/projects", json=_create_payload())
        assert resp.status_code == 401

    def test_update_requires_auth(self, client):
        resp = client.patch("/api/admin/projects/1", json={"title": "X"})
        assert resp.status_code == 401

    def test_delete_requires_auth(self, client):
        resp = client.delete("/api/admin/projects/1")
        assert resp.status_code == 401


# ═══════════════ ADMIN — LIST & GET ═══════════════


class TestAdminProjectsList:
    """GET /api/admin/projects"""

    @patch("routes.projects.get_all_projects")
    def test_list(self, mock_get, client, auth_header):
        mock_get.return_value = [_sample_project()]
        resp = client.get("/api/admin/projects", headers=auth_header)
        assert resp.status_code == 200
        assert isinstance(resp.json(), list)


class TestAdminProjectGet:
    """GET /api/admin/projects/{id}"""

    @patch("routes.projects.get_project_by_id")
    def test_found(self, mock_get, client, auth_header):
        mock_get.return_value = _sample_project(id=3)
        resp = client.get("/api/admin/projects/3", headers=auth_header)
        assert resp.status_code == 200

    @patch("routes.projects.get_project_by_id")
    def test_not_found(self, mock_get, client, auth_header):
        mock_get.return_value = None
        resp = client.get("/api/admin/projects/999", headers=auth_header)
        assert resp.status_code == 404


# ═══════════════ ADMIN — CREATE ═══════════════


class TestAdminProjectCreate:
    """POST /api/admin/projects"""

    @patch("routes.projects._invalidate_projects_cache")
    @patch("routes.projects.create_project")
    def test_create_success(self, mock_create, mock_inval, client, auth_header):
        mock_create.return_value = _sample_project(id=10, title="New Project")
        resp = client.post(
            "/api/admin/projects",
            json=_create_payload(),
            headers=auth_header,
        )
        assert resp.status_code == 201
        mock_inval.assert_called_once()

    def test_create_missing_required_fields(self, client, auth_header):
        resp = client.post(
            "/api/admin/projects",
            json={"title": "Only Title"},
            headers=auth_header,
        )
        assert resp.status_code == 422

    def test_create_invalid_category(self, client, auth_header):
        resp = client.post(
            "/api/admin/projects",
            json=_create_payload(category="invalid-category"),
            headers=auth_header,
        )
        assert resp.status_code == 422

    @patch("routes.projects._invalidate_projects_cache")
    @patch("routes.projects.create_project")
    def test_create_with_optional_fields(self, mock_create, mock_inval, client, auth_header):
        payload = _create_payload(
            tags=["python"], technologies=["FastAPI"],
            githubLink="https://github.com/test/project",
            challenges=["Scaling"], solutions=["Load balancer"],
        )
        mock_create.return_value = _sample_project(**payload, id=11)
        resp = client.post("/api/admin/projects", json=payload, headers=auth_header)
        assert resp.status_code == 201


# ═══════════════ ADMIN — UPDATE ═══════════════


class TestAdminProjectUpdate:
    """PATCH /api/admin/projects/{id}"""

    @patch("routes.projects._invalidate_projects_cache")
    @patch("routes.projects.update_project")
    def test_update_title(self, mock_update, mock_inval, client, auth_header):
        mock_update.return_value = _sample_project(title="Updated Title")
        resp = client.patch(
            "/api/admin/projects/1",
            json={"title": "Updated Title"},
            headers=auth_header,
        )
        assert resp.status_code == 200

    @patch("routes.projects.update_project")
    def test_update_not_found(self, mock_update, client, auth_header):
        mock_update.return_value = None
        resp = client.patch(
            "/api/admin/projects/999",
            json={"title": "X"},
            headers=auth_header,
        )
        assert resp.status_code == 404

    @patch("routes.projects._invalidate_projects_cache")
    @patch("routes.projects.update_project")
    def test_update_category(self, mock_update, mock_inval, client, auth_header):
        mock_update.return_value = _sample_project(category="web-app")
        resp = client.patch(
            "/api/admin/projects/1",
            json={"category": "web-app"},
            headers=auth_header,
        )
        assert resp.status_code == 200


# ═══════════════ ADMIN — DELETE ═══════════════


class TestAdminProjectDelete:
    """DELETE /api/admin/projects/{id}"""

    @patch("routes.projects._invalidate_projects_cache")
    @patch("routes.projects.delete_project")
    def test_delete_success(self, mock_del, mock_inval, client, auth_header):
        mock_del.return_value = True
        resp = client.delete("/api/admin/projects/1", headers=auth_header)
        assert resp.status_code == 204
        mock_inval.assert_called_once()

    @patch("routes.projects.delete_project")
    def test_delete_not_found(self, mock_del, client, auth_header):
        mock_del.return_value = False
        resp = client.delete("/api/admin/projects/999", headers=auth_header)
        assert resp.status_code == 404
