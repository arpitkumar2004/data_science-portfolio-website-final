# Project Overview

This web app is a full-stack portfolio platform with an integrated lead pipeline.
It includes:

- **Public Portfolio Site** (this Vite + React app)
- **Admin Panel** (separate Vite + React app for lead management)
- **Backend API** (FastAPI + SQLAlchemy for contacts, CV requests, and admin operations)

## Key Features

- Modern, animated portfolio pages (projects, about, contact, CV request)
- Contact and CV request forms with rate limiting and email delivery
- Admin authentication (JWT) and lead management dashboard
- In-app documentation viewer under **/docs**

## Tech Stack

- **Frontend (Portfolio):** React 18, TypeScript, Vite, Tailwind CSS
- **Admin Panel:** React 18, TypeScript, Vite, Tailwind CSS
- **Backend:** FastAPI, SQLAlchemy, PostgreSQL (or any DATABASE_URL-compatible DB)

## Where to View Docs

Open the app and navigate to **/docs**. The sidebar contains all documentation sections.
