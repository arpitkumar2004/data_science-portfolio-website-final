# Admin Auth API

Base path: **/api/admin**

## Endpoints

| Method | Path | Description |
|---|---|---|
| POST | /login | Authenticate admin and return JWT access token. |
| POST | /login/legacy | Legacy login (returns admin_token). |
| POST | /logout | Revoke legacy token. |
| GET | /validate | Validate legacy admin credentials. |
| GET | /me | Return current admin info (JWT required). |

## POST /login

**Form Data**

- `password` (string, required)

**Response (example)**

```json
{
  "access_token": "<jwt>",
  "token_type": "bearer"
}
```

## GET /me

**Headers**

```
Authorization: Bearer <access_token>
```

**Response (example)**

```json
{
  "user": "admin",
  "role": "admin",
  "auth_type": "jwt"
}
```
