# Leads API

Base path: **/api**

## Public Endpoints

| Method | Path | Description |
|---|---|---|
| POST | /submit-contact | Submit a contact inquiry. |
| POST | /v1/request-cv | Submit a CV request. |

**Common Form Fields**

- `name`, `email`, `subject`, `message`
- Optional: `company`, `role`

## Admin Endpoints (JWT Required)

| Method | Path | Description |
|---|---|---|
| GET | /admin/leads | Get all leads. |
| GET | /admin/leads/stats | Lead statistics. |
| GET | /admin/leads/search?q=... | Search leads. |
| GET | /admin/leads/filter?start_date=...&end_date=... | Filter by date range. |
| GET | /admin/leads/filtered?status=...&priority=...&min_score=... | Filter by status/priority/score. |
| GET | /admin/leads/export?format=csv|json | Export leads. |
| GET | /admin/leads/{id} | Get a lead by ID. |
| DELETE | /admin/leads/{id} | Delete a lead by ID. |
| POST | /admin/leads/{id}/flag | Flag a lead. |
| POST | /admin/leads/{id}/unflag | Unflag a lead. |
| PATCH | /admin/leads/{id}/status | Update lead status. |
| PATCH | /admin/leads/{id}/priority | Update lead priority. |
| PATCH | /admin/leads/{id}/quality-score | Update lead quality score (0–1). |
| PATCH | /admin/leads/{id}/notes | Update internal notes. |
| PATCH | /admin/leads/{id}/tags | Update tags array. |
| PATCH | /admin/leads/bulk-status | Bulk update status. |
| DELETE | /admin/leads/bulk-delete | Bulk delete leads. |

## Notes

- Admin endpoints require `Authorization: Bearer <access_token>`.
- Public endpoints are rate-limited to reduce spam.
