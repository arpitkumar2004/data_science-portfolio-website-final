import os
from dotenv import load_dotenv

load_dotenv()

# Database Configuration
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

# API Configuration
VITE_API_URL = os.getenv("VITE_API_URL", "https://arpitkumar.dev")
FRONTEND_URL = os.getenv("FRONTEND_URL", "https://arpitkumar.dev")

# JWT Configuration
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", os.getenv("ADMIN_SECRET_KEY", "your-secret-key-change-in-production"))
JWT_ALGORITHM = "HS256"
JWT_ACCESS_TOKEN_EXPIRE_MINUTES = 60  # 1 hour

# Admin Authentication (Legacy - for backward compatibility)
ADMIN_SECRET_KEY = os.getenv("ADMIN_SECRET_KEY")
ADMIN_TOKEN_EXPIRY_SECONDS = 3600  # 1 hour

# Email Configuration
RESEND_API_KEY = os.getenv("RESEND_API_KEY")
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
CORS_ORIGINS = [
    "http://localhost:5173",      # Main portfolio
    "http://localhost:5174",      # Admin panel
    "https://arpitkumar.dev",
    "https://data-science-portfolio-website-fina.vercel.app",
]

# App Configuration
APP_TITLE = "Arpit's Portfolio Backend"
APP_VERSION = "5.0.0"
