# Deployment

## Backend (FastAPI)

1) Set required environment variables:
   - DATABASE_URL
   - JWT_SECRET_KEY
   - ADMIN_SECRET_KEY
   - RESEND_API_KEY
2) Configure CORS via CORS_ORIGINS if deploying separate domains.
3) Run with a production server (e.g., uvicorn behind a process manager).

Example CORS (comma-separated):

```env
CORS_ORIGINS=https://your-portfolio-domain.com,https://admin.your-domain.com
```

## Portfolio Frontend

1) Set VITE_API_URL to your backend base URL (no /api suffix).
2) Build:

```bash
npm run build
```

3) Deploy the dist/ folder to your hosting provider.

## Admin Panel

1) Set VITE_API_URL to the same backend base URL.
2) Build:

```bash
cd admin-panel
npm run build
```

3) Deploy the admin panel dist/ folder to its hosting provider.

## Health Check

Use the backend health endpoint to verify deployment:

- GET /api/hello
