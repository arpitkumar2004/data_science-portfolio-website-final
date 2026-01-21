"""Authentication endpoints with JWT support"""
from fastapi import APIRouter, Form, HTTPException, status, Depends
from services.auth_service import validate_admin, create_admin_token, revoke_admin_token
from services.auth_service_v2 import authenticate_admin, require_admin
from config import ADMIN_SECRET_KEY

router = APIRouter(prefix="/api/admin", tags=["auth"])


@router.post("/login")
async def admin_login(password: str = Form(...)):
    """
    Authenticate admin user with password.
    Returns JWT token for stateless authentication.
    Use Authorization: Bearer <access_token> header for subsequent requests.
    """
    token_data = authenticate_admin(password)
    return token_data


@router.post("/login/legacy")
async def admin_login_legacy(password: str = Form(...)):
    """
    Legacy authentication endpoint (backward compatibility).
    Returns admin_token for query parameter authentication.
    Prefer using /login endpoint with JWT.
    """
    if password != ADMIN_SECRET_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    token_info = create_admin_token()
    return token_info


@router.post("/logout")
async def admin_logout(admin_token: str = None):
    """Logout admin user by revoking legacy token"""
    revoke_admin_token(admin_token)
    return {"status": "logged_out", "message": "Legacy token revoked"}


@router.get("/validate")
async def validate_admin_token(admin_token: str = None, admin_key: str = None):
    """
    Validate legacy admin credentials.
    For JWT validation, endpoints automatically verify via Depends(require_admin).
    """
    if validate_admin(admin_key=admin_key, admin_token=admin_token):
        return {"is_admin": True, "auth_type": "legacy"}
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired token"
    )


@router.get("/me")
async def get_current_admin_info(admin: dict = Depends(require_admin)):
    """
    Get current authenticated admin information.
    Requires JWT authentication via Authorization header.
    """
    return {
        "user": admin.get("sub"),
        "role": admin.get("role"),
        "auth_type": "jwt"
    }
