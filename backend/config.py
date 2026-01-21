import os
from typing import List
from dotenv import load_dotenv

load_dotenv()


def _require_env(name: str) -> str:
    """Fetch an env var and fail fast in production if missing."""
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"Environment variable '{name}' is required")
    return value


# Database Configuration (fail fast if not set)
SQLALCHEMY_DATABASE_URL = _require_env("DATABASE_URL")

# API Configuration
VITE_API_URL = os.getenv("VITE_API_URL", "https://arpitkumar.dev")
FRONTEND_URL = os.getenv("FRONTEND_URL", VITE_API_URL)

# JWT Configuration (fail fast to avoid insecure defaults)
JWT_SECRET_KEY = _require_env("JWT_SECRET_KEY")
JWT_ALGORITHM = "HS256"
JWT_ACCESS_TOKEN_EXPIRE_MINUTES = 60  # 1 hour

# Admin Authentication (Legacy - for backward compatibility)
ADMIN_SECRET_KEY = _require_env("ADMIN_SECRET_KEY")
ADMIN_TOKEN_EXPIRY_SECONDS = 3600  # 1 hour

# Email Configuration (required for contact/CV flows)
RESEND_API_KEY = _require_env("RESEND_API_KEY")
EMAIL_FROM = "Arpit Kumar (IIT Kharagpur) <contact@arpitkumar.dev>"

# Contact Information
CONTACT_PHONE_NUMBER = os.getenv("CONTACT_PHONE_NUMBER")
PHONE_NUMBER = os.getenv("PHONE_NUMBER", "91XXXXXXXXXX")

# External Links
CALENDLY_LINK = os.getenv("CALENDLY_LINK", "https://calendly.com/kumararpit17773/30min")

# Rate Limiting
RATE_LIMIT_PUBLIC = "10/minute"  # Public endpoints
RATE_LIMIT_ADMIN = "100/minute"  # Admin endpoints

# CORS Configuration
_default_cors: List[str] = [
    "http://localhost:5173",      # Main portfolio
    "http://localhost:5174",      # Admin panel
    "https://arpitkumar.dev",
    "https://data-science-portfolio-website-final.vercel.app",
]
CORS_ORIGINS = os.getenv("CORS_ORIGINS")
if CORS_ORIGINS:
    CORS_ORIGINS = [origin.strip() for origin in CORS_ORIGINS.split(",") if origin.strip()]
else:
    CORS_ORIGINS = _default_cors

# App Configuration
APP_TITLE = "Arpit's Portfolio Backend"
APP_VERSION = "5.0.0"
