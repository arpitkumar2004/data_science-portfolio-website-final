"""Authentication endpoints with JWT support and rate limiting."""
import hmac

from fastapi import APIRouter, Form, Header, HTTPException, Request, status, Depends
from typing import Optional
from slowapi import Limiter
from slowapi.util import get_remote_address

from services.auth_service import validate_admin, create_admin_token, revoke_admin_token
from services.auth_service_v2 import authenticate_admin, require_admin
from config import ADMIN_SECRET_KEY, RATE_LIMIT_PUBLIC

router = APIRouter(prefix="/api/admin", tags=["auth"])
limiter = Limiter(key_func=get_remote_address)

# Auth-specific stricter rate limit to prevent brute-force
_AUTH_RATE_LIMIT = "5/minute"


@router.post("/login")
@limiter.limit(_AUTH_RATE_LIMIT)
async def admin_login(request: Request, password: str = Form(...)):
    """
    Authenticate admin user with password.
    Returns JWT token for stateless authentication.
    Use Authorization: Bearer <access_token> header for subsequent requests.
    """
    token_data = authenticate_admin(password)
    return token_data


@router.post("/login/legacy")
@limiter.limit(_AUTH_RATE_LIMIT)
async def admin_login_legacy(request: Request, password: str = Form(...)):
    """
    Legacy authentication endpoint (backward compatibility).
    Returns admin_token for query parameter authentication.
    Prefer using /login endpoint with JWT.
    """
    # Constant-time comparison to prevent timing attacks
    if not hmac.compare_digest(password.encode("utf-8"), ADMIN_SECRET_KEY.encode("utf-8")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    token_info = create_admin_token()
    return token_info


@router.post("/logout")
@limiter.limit(RATE_LIMIT_PUBLIC)
async def admin_logout(
    request: Request,
    authorization: Optional[str] = Header(None),
):
    """
    Logout admin user by revoking legacy token.
    Token must be sent via Authorization header: Bearer <token>
    """
    admin_token = None
    if authorization:
        parts = authorization.split()
        if len(parts) == 2:
            admin_token = parts[1]
    revoke_admin_token(admin_token)
    return {"status": "logged_out", "message": "Legacy token revoked"}


@router.get("/validate")
@limiter.limit(_AUTH_RATE_LIMIT)
async def validate_admin_token(
    request: Request,
    authorization: Optional[str] = Header(None),
):
    """
    Validate legacy admin credentials.
    Send credentials via Authorization header (Bearer <token> or Key <admin_key>).
    For JWT validation, endpoints automatically verify via Depends(require_admin).
    """
    admin_key = None
    admin_token = None

    if authorization:
        parts = authorization.split(None, 1)
        scheme = parts[0].lower() if parts else ""
        value = parts[1] if len(parts) == 2 else None
        if scheme == "bearer" and value:
            admin_token = value
        elif scheme == "key" and value:
            admin_key = value

    if validate_admin(admin_key=admin_key, admin_token=admin_token):
        return {"is_admin": True, "auth_type": "legacy"}
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired token"
    )


@router.get("/me")
async def get_current_admin_info(request: Request, admin: dict = Depends(require_admin)):
    """
    Get current authenticated admin information.
    Requires JWT authentication via Authorization header.
    """
    return {
        "user": admin.get("sub"),
        "role": admin.get("role"),
        "auth_type": "jwt"
    }
