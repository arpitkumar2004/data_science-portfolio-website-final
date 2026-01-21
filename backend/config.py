import os
from dotenv import load_dotenv

load_dotenv()

# Database Configuration
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

# API Configuration
VITE_API_URL = os.getenv("VITE_API_URL", "https://arpitkumar.dev")
FRONTEND_URL = os.getenv("FRONTEND_URL", "https://arpitkumar.dev")

# Admin Authentication
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

# CORS Configuration
CORS_ORIGINS = [
    "http://localhost:5173",
    "https://arpitkumar.dev",
    "https://data-science-portfolio-website-fina.vercel.app",
]

# App Configuration
APP_TITLE = "Arpit's Portfolio Backend"
APP_VERSION = "4.0.0"
