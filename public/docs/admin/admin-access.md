# Admin Access

## Authentication Flow (JWT)

- Admins authenticate via **POST /api/admin/login** with a password.
- The backend returns an **access_token** (JWT).
- Subsequent admin requests must include:

```
Authorization: Bearer <access_token>
```

## Legacy Auth (Backward Compatibility)

- **POST /api/admin/login/legacy** returns a legacy token.
- **GET /api/admin/validate** can validate legacy credentials.

Use JWT endpoints for all new integrations.

## Admin Panel Login Behavior

The dedicated admin panel UI includes a lockout guard:

- Up to 10 failed login attempts.
- Locks for 3 hours after 10 failures.

This is a UI-side guard and does not replace backend protections (rate limiting, JWT verification).
