
# Data Science Portfolio Web App

A full-stack portfolio platform with an integrated lead pipeline, admin dashboard, and in-app documentation.

## Highlights

- Modern public portfolio site (React + Vite + Tailwind)
- Contact and CV request flows (FastAPI + SQLAlchemy)
- Admin panel for lead management (JWT-secured)
- Built-in documentation accessible at **/docs**

## Project Structure

- **src/**: main portfolio frontend
- **admin-panel/**: dedicated admin frontend
- **backend/**: FastAPI backend (APIs, auth, lead services)
- **public/docs/**: in-app documentation content

## Quick Start (Local)

### 1) Backend

Set required environment variables (example .env):

```
DATABASE_URL=postgresql://user:pass@localhost:5432/portfolio
JWT_SECRET_KEY=your_jwt_secret
ADMIN_SECRET_KEY=your_admin_password
RESEND_API_KEY=your_resend_api_key
VITE_API_URL=http://localhost:8000
```

Install and run:

```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 2) Portfolio Frontend

```
npm install
npm run dev
```

### 3) Admin Panel

```
cd admin-panel
npm install
npm run dev
```

## Documentation

Open the app and visit **/docs** to view the in-app documentation. The content lives under **public/docs/**.

## API Overview

- Health: `GET /api/hello`
- Contact: `POST /api/submit-contact`
- CV Request: `POST /api/v1/request-cv`
- Admin Auth: `POST /api/admin/login`
- Lead Admin: `GET /api/admin/leads`

Full details are in the in-app docs at **/docs**.

## Scripts

### Root (Portfolio)

- `npm run dev` — start portfolio frontend
- `npm run build` — build portfolio frontend
- `npm run preview` — preview build

### Admin Panel

- `npm run dev` — start admin panel
- `npm run build` — build admin panel
- `npm run preview` — preview build

## Notes

- Set **VITE_API_URL** in both frontends to the backend base URL (without `/api`).
- Configure **CORS_ORIGINS** if hosting frontends on different domains.

## License

All rights reserved.
