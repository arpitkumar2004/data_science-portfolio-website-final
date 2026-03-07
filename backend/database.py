from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from dotenv import load_dotenv

# Ensure .env files are loaded before any config import
_here = Path(__file__).resolve().parent
_root = _here.parent
load_dotenv(dotenv_path=_here / ".env")
load_dotenv(dotenv_path=_root / ".env")

# Single source of truth for DATABASE_URL (validated in config.py)
from config import SQLALCHEMY_DATABASE_URL  # noqa: E402

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True,
    pool_recycle=3600,
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency to get DB session in routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()