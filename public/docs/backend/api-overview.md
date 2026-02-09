# API Overview

## Base URL

The backend base URL is configured by **VITE_API_URL** in the frontends.
Do **not** include `/api` in the base URL.

Example:

- Base URL: `http://localhost:8000`
- Health check: `GET /api/hello`

## Authentication

- Public endpoints: no auth required.
- Admin endpoints: require **JWT** via the Authorization header.

## Rate Limiting

- Public endpoints: 10 requests/minute
- Admin endpoints: 100 requests/minute

These values are defined in backend/config.py and enforced by SlowAPI.
