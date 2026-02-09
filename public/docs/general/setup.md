# Quick Start (Local Setup)

## Prerequisites

- Node.js 18+ and npm
- Python 3.10+
- A database URL (PostgreSQL recommended)

## 1) Backend Setup

From the backend folder:

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
```

Create a backend .env file (backend/.env):

```env
DATABASE_URL=postgresql+psycopg2://USER:PASSWORD@HOST:PORT/DBNAME
JWT_SECRET_KEY=your_jwt_secret
ADMIN_SECRET_KEY=your_admin_password
RESEND_API_KEY=your_resend_key

# Optional
VITE_API_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173
CORS_ORIGINS=http://localhost:5173,http://localhost:5174
CONTACT_PHONE_NUMBER=+91XXXXXXXXXX
PHONE_NUMBER=91XXXXXXXXXX
CALENDLY_LINK=https://calendly.com/your-link
```

Run the API server:

```bash
uvicorn main:app --reload
```

## 2) Portfolio Frontend

From the project root:

```bash
npm install
npm run dev
```

Create a root .env file if needed:

```env
VITE_API_URL=http://localhost:8000
```

## 3) Admin Panel

From the admin panel folder:

```bash
cd admin-panel
npm install
npm run dev
```

Optional admin panel .env:

```env
VITE_API_URL=http://localhost:8000
```

## Ports

- Portfolio: http://localhost:5173
- Admin Panel: http://localhost:5174
- Backend API: http://localhost:8000
