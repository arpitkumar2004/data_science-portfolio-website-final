# Troubleshooting

## Backend not responding

- Confirm the API is running at the expected base URL.
- Check that VITE_API_URL is set correctly (no /api suffix).
- Verify /api/hello returns a response.

## CORS errors in browser

- Add your frontend domains to CORS_ORIGINS.
- Restart the backend after editing .env.

## Admin login fails

- Ensure ADMIN_SECRET_KEY is set in backend .env.
- Confirm the admin panel is pointing at the correct backend.
- Check for 401 responses on /api/admin/login.

## Contact/CV email not sending

- Ensure RESEND_API_KEY is set and valid.
- Confirm EMAIL_FROM domain is configured in your email provider.

## Rate limit errors (429)

- Public endpoints are rate-limited to prevent spam.
- Admin endpoints are rate-limited to protect the dashboard.
- Wait and retry, or adjust rate limit settings in backend/config.py.
