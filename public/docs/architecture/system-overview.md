# System Overview

## Components

1) **Portfolio Frontend (Vite + React)**
   - Public-facing site
   - Consumes backend API for contact and CV requests

2) **Admin Panel (Vite + React)**
   - Lead management UI
   - Uses admin JWT auth to access protected endpoints

3) **Backend API (FastAPI + SQLAlchemy)**
   - Handles public form submissions
   - Stores leads in database
   - Sends emails via Resend
   - Provides admin endpoints for lead management

## High-Level Data Flow

1) Visitor submits **Contact** or **CV Request** form
2) Backend validates and stores lead
3) Backend triggers email workflow asynchronously
4) Admin logs in and manages leads through protected endpoints

## Security Notes

- Admin endpoints require JWT auth
- Public endpoints are rate-limited
- CORS allowlist controls allowed frontend origins
