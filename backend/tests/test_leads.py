"""
Leads endpoint tests — public contact submission + all admin CRUD/analytics.
Uses unittest.mock to patch DB and email services so no real DB is needed.
"""
from unittest.mock import patch, MagicMock
from datetime import datetime, timezone


# ── Helpers ──

def _fake_lead(**overrides):
    """Return a mock ContactLead model object."""
    now = datetime.now(timezone.utc)
    defaults = dict(
        id=1, name="Test User", email="test@example.com",
        subject="Hello", message="Test message", company="TestCo",
        role="user", lead_type="contact", form_type="contacts",
        status="unread", priority="medium", quality_score=0.5,
        internal_notes="", flagged=False,
        tags=["test"], source="contact_form", metadata_json={},
        created_at=now, updated_at=now, timestamp=now,
        last_contacted=None, follow_up_date=None, contact_history=[],
    )
    defaults.update(overrides)
    lead = MagicMock()
    for k, v in defaults.items():
        setattr(lead, k, v)
    return lead


def _serialized_lead(**overrides):
    """Return a dict that matches serialize_contact_lead output."""
    defaults = dict(
        id=1, name="Test User", email="test@example.com",
        subject="Hello", message="Test message", company="TestCo",
        role="user", lead_type="contact",
        status="unread", priority="medium", quality_score=0.5,
        internal_notes="", flagged=False,
        tags=["test"], source="contact_form", metadata={},
        created_at=datetime.now(timezone.utc).isoformat(),
        updated_at=datetime.now(timezone.utc).isoformat(),
        timestamp=datetime.now(timezone.utc).isoformat(),
        last_contacted=None, follow_up_date=None, contact_history=[],
    )
    defaults.update(overrides)
    return defaults


# ═══════════════ PUBLIC ENDPOINTS ═══════════════


class TestSubmitContact:
    """POST /api/submit-contact"""

    @patch("routes.leads.send_admin_notification")
    @patch("routes.leads.send_contact_acknowledgment")
    @patch("routes.leads._validate_contact_payload")
    @patch("routes.leads.create_contact_lead")
    def test_success(self, mock_create, mock_validate, mock_ack, mock_notify, client):
        mock_create.return_value = _fake_lead(id=42)
        resp = client.post("/api/submit-contact", data={
            "name": "Jane", "email": "jane@test.com",
            "subject": "Hi", "message": "Hello there",
        })
        assert resp.status_code == 200
        data = resp.json()
        assert data["status"] == "success"
        assert data["id"] == 42

    @patch("routes.leads.send_admin_notification")
    @patch("routes.leads.send_recruiter_login_email")
    @patch("routes.leads.create_contact_lead")
    def test_recruiter_role(self, mock_create, mock_recruiter, mock_notify, client):
        mock_create.return_value = _fake_lead(id=7)
        resp = client.post("/api/submit-contact", data={
            "name": "Bob", "email": "bob@corp.com",
            "subject": "Hiring", "message": "Looking for talent",
            "role": "recruiter", "company": "BigCorp",
        })
        assert resp.status_code == 200

    def test_missing_required_fields(self, client):
        resp = client.post("/api/submit-contact", data={"name": "Only Name"})
        assert resp.status_code == 422

    def test_invalid_email(self, client):
        resp = client.post("/api/submit-contact", data={
            "name": "Test", "email": "not-an-email",
            "subject": "Hi", "message": "msg",
        })
        assert resp.status_code == 400


class TestRequestCV:
    """POST /api/v1/request-cv"""

    @patch("routes.leads.send_admin_notification")
    @patch("routes.leads.send_cv_request_email")
    @patch("routes.leads.create_contact_lead")
    def test_success(self, mock_create, mock_cv, mock_notify, client):
        mock_create.return_value = _fake_lead(id=10)
        resp = client.post("/api/v1/request-cv", data={
            "name": "Alice", "email": "alice@corp.com",
            "company": "TechInc", "subject": "CV Request",
            "message": "Please send CV",
        })
        assert resp.status_code == 200
        assert resp.json()["status"] == "success"

    def test_missing_company(self, client):
        resp = client.post("/api/v1/request-cv", data={
            "name": "Alice", "email": "alice@corp.com",
            "subject": "CV", "message": "Please",
        })
        assert resp.status_code == 422


# ═══════════════ ADMIN — AUTH GUARD ═══════════════


class TestAdminAuthGuard:
    """Verify all admin endpoints reject unauthenticated requests."""

    ADMIN_URLS = [
        ("GET", "/api/admin/leads"),
        ("GET", "/api/admin/leads/stats"),
        ("GET", "/api/admin/leads/search?q=test"),
        ("GET", "/api/admin/leads/filtered"),
        ("GET", "/api/admin/leads/filter?start_date=2024-01-01&end_date=2024-12-31"),
        ("GET", "/api/admin/leads/export"),
        ("GET", "/api/admin/leads/1"),
        ("GET", "/api/admin/analytics/timeline"),
        ("GET", "/api/admin/analytics/sources"),
        ("GET", "/api/admin/analytics/response-time"),
        ("DELETE", "/api/admin/leads/1"),
        ("POST", "/api/admin/leads/1/flag"),
        ("POST", "/api/admin/leads/1/unflag"),
        ("PATCH", "/api/admin/leads/1/status"),
        ("PATCH", "/api/admin/leads/1/priority"),
        ("PATCH", "/api/admin/leads/1/quality-score"),
        ("PATCH", "/api/admin/leads/1/notes"),
        ("PATCH", "/api/admin/leads/1/tags"),
        ("PATCH", "/api/admin/leads/bulk-status"),
        ("DELETE", "/api/admin/leads/bulk-delete"),
    ]

    def test_all_endpoints_reject_no_token(self, client):
        for method, url in self.ADMIN_URLS:
            resp = getattr(client, method.lower())(url)
            assert resp.status_code == 401, f"{method} {url} should return 401, got {resp.status_code}"


# ═══════════════ ADMIN — LIST & GET ═══════════════


class TestAdminLeadsList:
    """GET /api/admin/leads"""

    @patch("routes.leads.get_all_leads")
    def test_list_no_pagination(self, mock_get, client, auth_header):
        mock_get.return_value = [_serialized_lead()]
        resp = client.get("/api/admin/leads", headers=auth_header)
        assert resp.status_code == 200
        assert isinstance(resp.json(), list)

    @patch("routes.leads.get_all_leads")
    def test_list_with_pagination(self, mock_get, client, auth_header):
        mock_get.return_value = [_serialized_lead()]
        mock_db = MagicMock()
        mock_db.query.return_value.count.return_value = 1
        import database
        from main import app
        app.dependency_overrides[database.get_db] = lambda: mock_db
        try:
            resp = client.get("/api/admin/leads?page=1&per_page=10", headers=auth_header)
            assert resp.status_code == 200
            data = resp.json()
            assert data["total"] == 1
            assert data["page"] == 1
        finally:
            app.dependency_overrides.pop(database.get_db, None)


class TestAdminLeadGet:
    """GET /api/admin/leads/{lead_id}"""

    @patch("routes.leads.serialize_contact_lead")
    @patch("routes.leads.get_lead_by_id")
    def test_found(self, mock_get, mock_ser, client, auth_header):
        mock_get.return_value = _fake_lead(id=5)
        mock_ser.return_value = _serialized_lead(id=5)
        resp = client.get("/api/admin/leads/5", headers=auth_header)
        assert resp.status_code == 200
        assert resp.json()["id"] == 5

    @patch("routes.leads.get_lead_by_id")
    def test_not_found(self, mock_get, client, auth_header):
        mock_get.return_value = None
        resp = client.get("/api/admin/leads/999", headers=auth_header)
        assert resp.status_code == 404


# ═══════════════ ADMIN — DELETE ═══════════════


class TestAdminLeadDelete:
    """DELETE /api/admin/leads/{lead_id}"""

    @patch("routes.leads.delete_lead")
    def test_delete_success(self, mock_del, client, auth_header):
        mock_del.return_value = True
        resp = client.delete("/api/admin/leads/1", headers=auth_header)
        assert resp.status_code == 200

    @patch("routes.leads.delete_lead")
    def test_delete_not_found(self, mock_del, client, auth_header):
        mock_del.return_value = False
        resp = client.delete("/api/admin/leads/999", headers=auth_header)
        assert resp.status_code == 404


# ═══════════════ ADMIN — FLAG / UNFLAG ═══════════════


class TestAdminLeadFlag:
    """POST /api/admin/leads/{id}/flag & /unflag"""

    @patch("routes.leads.flag_lead")
    def test_flag_success(self, mock_flag, client, auth_header):
        lead = _fake_lead(flagged=True)
        mock_flag.return_value = lead
        resp = client.post("/api/admin/leads/1/flag", headers=auth_header)
        assert resp.status_code == 200
        assert resp.json()["status"] == "Lead flagged"

    @patch("routes.leads.flag_lead")
    def test_flag_not_found(self, mock_flag, client, auth_header):
        mock_flag.return_value = None
        resp = client.post("/api/admin/leads/999/flag", headers=auth_header)
        assert resp.status_code == 404

    @patch("routes.leads.unflag_lead")
    def test_unflag_success(self, mock_unflag, client, auth_header):
        lead = _fake_lead(flagged=False)
        mock_unflag.return_value = lead
        resp = client.post("/api/admin/leads/1/unflag", headers=auth_header)
        assert resp.status_code == 200
        assert resp.json()["status"] == "Lead unflagged"

    @patch("routes.leads.unflag_lead")
    def test_unflag_not_found(self, mock_unflag, client, auth_header):
        mock_unflag.return_value = None
        resp = client.post("/api/admin/leads/999/unflag", headers=auth_header)
        assert resp.status_code == 404


# ═══════════════ ADMIN — STATUS / PRIORITY / SCORE / NOTES / TAGS ═══════════════


class TestAdminLeadStatus:
    """PATCH /api/admin/leads/{id}/status"""

    @patch("routes.leads.serialize_contact_lead")
    @patch("routes.leads.update_lead_status")
    def test_update_status(self, mock_update, mock_ser, client, auth_header):
        mock_update.return_value = _fake_lead(status="contacted")
        mock_ser.return_value = _serialized_lead(status="contacted")
        resp = client.patch(
            "/api/admin/leads/1/status",
            json={"status": "contacted"},
            headers=auth_header,
        )
        assert resp.status_code == 200

    @patch("routes.leads.update_lead_status")
    def test_update_status_not_found(self, mock_update, client, auth_header):
        mock_update.return_value = None
        resp = client.patch(
            "/api/admin/leads/999/status",
            json={"status": "contacted"},
            headers=auth_header,
        )
        assert resp.status_code == 404

    def test_invalid_status_value(self, client, auth_header):
        resp = client.patch(
            "/api/admin/leads/1/status",
            json={"status": "invalid_value"},
            headers=auth_header,
        )
        assert resp.status_code == 422


class TestAdminLeadPriority:
    """PATCH /api/admin/leads/{id}/priority"""

    @patch("routes.leads.serialize_contact_lead")
    @patch("routes.leads.update_lead_priority")
    def test_update_priority(self, mock_update, mock_ser, client, auth_header):
        mock_update.return_value = _fake_lead(priority="high")
        mock_ser.return_value = _serialized_lead(priority="high")
        resp = client.patch(
            "/api/admin/leads/1/priority",
            json={"priority": "high"},
            headers=auth_header,
        )
        assert resp.status_code == 200

    def test_invalid_priority_value(self, client, auth_header):
        resp = client.patch(
            "/api/admin/leads/1/priority",
            json={"priority": "super-urgent"},
            headers=auth_header,
        )
        assert resp.status_code == 422


class TestAdminLeadQualityScore:
    """PATCH /api/admin/leads/{id}/quality-score"""

    @patch("routes.leads.serialize_contact_lead")
    @patch("routes.leads.update_lead_quality_score")
    def test_valid_score(self, mock_update, mock_ser, client, auth_header):
        mock_update.return_value = _fake_lead(quality_score=0.85)
        mock_ser.return_value = _serialized_lead(quality_score=0.85)
        resp = client.patch(
            "/api/admin/leads/1/quality-score",
            json={"quality_score": 0.85},
            headers=auth_header,
        )
        assert resp.status_code == 200

    @patch("routes.leads.update_lead_quality_score")
    def test_score_out_of_range(self, mock_update, client, auth_header):
        resp = client.patch(
            "/api/admin/leads/1/quality-score",
            json={"quality_score": 1.5},
            headers=auth_header,
        )
        assert resp.status_code == 400

    @patch("routes.leads.update_lead_quality_score")
    def test_negative_score(self, mock_update, client, auth_header):
        resp = client.patch(
            "/api/admin/leads/1/quality-score",
            json={"quality_score": -0.1},
            headers=auth_header,
        )
        assert resp.status_code == 400


class TestAdminLeadNotes:
    """PATCH /api/admin/leads/{id}/notes"""

    @patch("routes.leads.serialize_contact_lead")
    @patch("routes.leads.update_lead_notes")
    def test_update_notes(self, mock_update, mock_ser, client, auth_header):
        mock_update.return_value = _fake_lead(internal_notes="Follow up Monday")
        mock_ser.return_value = _serialized_lead(internal_notes="Follow up Monday")
        resp = client.patch(
            "/api/admin/leads/1/notes",
            json={"internal_notes": "Follow up Monday"},
            headers=auth_header,
        )
        assert resp.status_code == 200

    @patch("routes.leads.update_lead_notes")
    def test_notes_not_found(self, mock_update, client, auth_header):
        mock_update.return_value = None
        resp = client.patch(
            "/api/admin/leads/999/notes",
            json={"internal_notes": "note"},
            headers=auth_header,
        )
        assert resp.status_code == 404


class TestAdminLeadTags:
    """PATCH /api/admin/leads/{id}/tags"""

    @patch("routes.leads.serialize_contact_lead")
    @patch("routes.leads.update_lead_tags")
    def test_update_tags(self, mock_update, mock_ser, client, auth_header):
        mock_update.return_value = _fake_lead(tags=["vip", "recruiter"])
        mock_ser.return_value = _serialized_lead(tags=["vip", "recruiter"])
        resp = client.patch(
            "/api/admin/leads/1/tags",
            json={"tags": ["vip", "recruiter"]},
            headers=auth_header,
        )
        assert resp.status_code == 200

    @patch("routes.leads.update_lead_tags")
    def test_tags_not_found(self, mock_update, client, auth_header):
        mock_update.return_value = None
        resp = client.patch(
            "/api/admin/leads/999/tags",
            json={"tags": ["test"]},
            headers=auth_header,
        )
        assert resp.status_code == 404


# ═══════════════ ADMIN — BULK OPERATIONS ═══════════════


class TestAdminBulkStatus:
    """PATCH /api/admin/leads/bulk-status"""

    @patch("routes.leads.bulk_update_status")
    def test_bulk_status_update(self, mock_bulk, client, auth_header):
        mock_bulk.return_value = 3
        resp = client.patch(
            "/api/admin/leads/bulk-status",
            json={"lead_ids": [1, 2, 3], "status": "contacted"},
            headers=auth_header,
        )
        assert resp.status_code == 200
        assert "Updated" in resp.json()["status"]

    def test_invalid_bulk_status(self, client, auth_header):
        resp = client.patch(
            "/api/admin/leads/bulk-status",
            json={"lead_ids": [1], "status": "invalid"},
            headers=auth_header,
        )
        assert resp.status_code == 422


class TestAdminBulkDelete:
    """DELETE /api/admin/leads/bulk-delete"""

    @patch("routes.leads.bulk_delete_leads")
    def test_bulk_delete(self, mock_bulk, client, auth_header):
        mock_bulk.return_value = 2
        resp = client.request(
            "DELETE",
            "/api/admin/leads/bulk-delete",
            json={"lead_ids": [1, 2]},
            headers=auth_header,
        )
        assert resp.status_code == 200
        assert resp.json()["deleted_count"] == 2

    def test_bulk_delete_invalid_body(self, client, auth_header):
        resp = client.request(
            "DELETE",
            "/api/admin/leads/bulk-delete",
            json={"lead_ids": "not-a-list"},
            headers=auth_header,
        )
        assert resp.status_code == 400


# ═══════════════ ADMIN — SEARCH & FILTER ═══════════════


class TestAdminSearch:
    """GET /api/admin/leads/search"""

    @patch("routes.leads.search_leads")
    def test_search(self, mock_search, client, auth_header):
        mock_search.return_value = [_serialized_lead()]
        resp = client.get("/api/admin/leads/search?q=test", headers=auth_header)
        assert resp.status_code == 200
        assert isinstance(resp.json(), list)

    def test_search_missing_query(self, client, auth_header):
        resp = client.get("/api/admin/leads/search", headers=auth_header)
        assert resp.status_code == 422


class TestAdminFilter:
    """GET /api/admin/leads/filter"""

    @patch("routes.leads.filter_leads_by_date")
    def test_filter_by_date(self, mock_filter, client, auth_header):
        mock_filter.return_value = [_serialized_lead()]
        resp = client.get(
            "/api/admin/leads/filter?start_date=2024-01-01&end_date=2024-12-31",
            headers=auth_header,
        )
        assert resp.status_code == 200

    def test_filter_missing_dates(self, client, auth_header):
        resp = client.get("/api/admin/leads/filter", headers=auth_header)
        assert resp.status_code == 422


class TestAdminFiltered:
    """GET /api/admin/leads/filtered"""

    @patch("routes.leads.get_filtered_leads")
    def test_filtered_with_params(self, mock_filtered, client, auth_header):
        mock_filtered.return_value = [_serialized_lead(status="unread")]
        resp = client.get(
            "/api/admin/leads/filtered?status=unread&priority=high&min_score=0.5",
            headers=auth_header,
        )
        assert resp.status_code == 200

    @patch("routes.leads.get_filtered_leads")
    def test_filtered_no_params(self, mock_filtered, client, auth_header):
        mock_filtered.return_value = []
        resp = client.get("/api/admin/leads/filtered", headers=auth_header)
        assert resp.status_code == 200


# ═══════════════ ADMIN — ANALYTICS ═══════════════


class TestAdminStats:
    """GET /api/admin/leads/stats"""

    @patch("routes.leads.get_lead_statistics")
    def test_stats(self, mock_stats, client, auth_header):
        mock_stats.return_value = {
            "total_leads": 10,
            "status_distribution": {"unread": 5, "processing": 2, "contacted": 2, "archived": 1},
            "conversion_rate": 20.0,
            "avg_quality_score": 0.65,
            "leads_last_30_days": 8,
        }
        resp = client.get("/api/admin/leads/stats", headers=auth_header)
        assert resp.status_code == 200
        assert resp.json()["total_leads"] == 10


class TestAdminTimeline:
    """GET /api/admin/analytics/timeline"""

    @patch("services.lead_service.get_leads_timeline")
    def test_timeline(self, mock_timeline, client, auth_header):
        mock_timeline.return_value = [{"date": "2024-01-01", "count": 3}]
        resp = client.get("/api/admin/analytics/timeline", headers=auth_header)
        assert resp.status_code == 200

    @patch("services.lead_service.get_leads_timeline")
    def test_timeline_custom_period(self, mock_timeline, client, auth_header):
        mock_timeline.return_value = []
        resp = client.get("/api/admin/analytics/timeline?period=7d", headers=auth_header)
        assert resp.status_code == 200


class TestAdminSources:
    """GET /api/admin/analytics/sources"""

    @patch("services.lead_service.get_source_breakdown")
    def test_sources(self, mock_sources, client, auth_header):
        mock_sources.return_value = [{"source": "contact_form", "count": 5}]
        resp = client.get("/api/admin/analytics/sources", headers=auth_header)
        assert resp.status_code == 200


class TestAdminResponseTime:
    """GET /api/admin/analytics/response-time"""

    @patch("services.lead_service.get_response_time_stats")
    def test_response_time(self, mock_rt, client, auth_header):
        mock_rt.return_value = {"avg_hours": 2.5, "responded_count": 3, "total_count": 10, "response_rate": 30.0}
        resp = client.get("/api/admin/analytics/response-time", headers=auth_header)
        assert resp.status_code == 200


# ═══════════════ ADMIN — EXPORT ═══════════════


class TestAdminExport:
    """GET /api/admin/leads/export"""

    @patch("routes.leads.get_all_leads")
    def test_export_csv(self, mock_leads, client, auth_header):
        mock_leads.return_value = [_serialized_lead()]
        resp = client.get("/api/admin/leads/export?format=csv", headers=auth_header)
        assert resp.status_code == 200
        assert "text/csv" in resp.headers.get("content-type", "")
        assert "leads_export.csv" in resp.headers.get("content-disposition", "")

    @patch("routes.leads.get_all_leads")
    def test_export_json(self, mock_leads, client, auth_header):
        mock_leads.return_value = [_serialized_lead()]
        resp = client.get("/api/admin/leads/export?format=json", headers=auth_header)
        assert resp.status_code == 200
        assert "application/json" in resp.headers.get("content-type", "")

    @patch("routes.leads.get_all_leads")
    def test_export_default_is_csv(self, mock_leads, client, auth_header):
        mock_leads.return_value = []
        resp = client.get("/api/admin/leads/export", headers=auth_header)
        assert resp.status_code == 200
        assert "text/csv" in resp.headers.get("content-type", "")
