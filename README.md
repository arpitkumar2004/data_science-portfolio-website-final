# Data Science Portfolio Website

A full-stack portfolio website built to showcase data science projects, skills, and experience. Features a modern React frontend, a robust FastAPI backend with authentication, and a dedicated admin panel for managing portfolio content and leads.

## 🎯 Overview

This is a complete portfolio solution with:
- **Public-facing website**: Display projects, achievements, and professional information
- **Admin dashboard**: Manage portfolio content, track leads, and handle inquiries (authentication required)
- **Backend API**: RESTful API with JWT authentication, rate limiting, and lead management
- **Database**: PostgreSQL with migration support

## ✨ Features

### Frontend (Public Website)
- 📱 **Responsive Design**: Optimized for all devices with modern UI/UX
- ✨ **Smooth Animations**: Framer Motion and GSAP for engaging interactions
- 📂 **Featured Projects**: Detailed project showcases with descriptions and links
- 👤 **About & Skills**: Professional profile with achievements and technical skills
- 📧 **Contact Forms**: Email integration for inquiries and CV requests
- 🎨 **Dynamic Content**: Real-time data fetching from backend API
- ♿ **Accessibility**: Semantic HTML and inclusive design practices

### Admin Panel
- 🔐 **JWT Authentication**: Secure login with rate limiting
- 📊 **Lead Management Dashboard**: Track and manage contact inquiries
- 📝 **Lead Categorization**: Support for contact, CV requests, and collaboration inquiries
- 🏷️ **Status Tracking**: Monitor lead lifecycle (unread → processing → contacted → archived)
- 🎯 **Priority Levels**: Categorize leads by urgency (low, medium, high, urgent)
- 📈 **Analytics**: View metrics and statistics on leads
- 🔧 **Content Management**: Manage portfolio items and settings

### Backend API
- ⚡ **FastAPI Framework**: High-performance async Python API
- 🛡️ **Authentication**: JWT-based authentication with secure password hashing
- 🚦 **Rate Limiting**: Prevent abuse with request throttling
- 📊 **Lead Management**: API endpoints for CRUD operations on leads
- 🗄️ **Database**: SQLAlchemy ORM with PostgreSQL
- ✉️ **Email Integration**: Send notifications and responses
- 📋 **Data Validation**: Pydantic schemas for robust validation

## 🏗️ Project Architecture

```
data_science-portfolio-website-final/
├── src/                          # Main frontend application
│   ├── components/              # Reusable React components
│   ├── pages/                   # Page-level components
│   ├── services/                # API client services
│   ├── hooks/                   # Custom React hooks
│   └── data/                    # Static data and assets
│
├── admin-panel/                 # Separate admin interface
│   ├── src/
│   │   ├── components/          # Admin-specific components
│   │   ├── services/            # Admin API client
│   │   ├── hooks/               # Admin custom hooks
│   │   └── App.tsx              # Admin app entry point
│   └── vite.config.ts          # Admin dev server config (port 5174)
│
├── backend/                     # FastAPI backend
│   ├── routes/                  # API route definitions
│   │   ├── auth.py             # Authentication endpoints
│   │   ├── leads.py            # Lead management endpoints
│   │   └── health.py           # Health check endpoints
│   ├── services/               # Business logic
│   ├── schemas/                # Request/response schemas
│   ├── models.py               # Database models
│   ├── database.py             # Database configuration
│   ├── main.py                 # FastAPI app initialization
│   ├── migrations/             # Database migration scripts
│   └── requirements.txt        # Python dependencies
│
└── package.json               # Root dependencies
```

## 💻 Technologies

### Frontend Stack
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **GSAP** - Advanced animations
- **React Router** - Client-side routing
- **SWR** - Data fetching and caching
- **Lucide Icons** - Icon library
- **React Hook Form** - Form state management

### Backend Stack
- **FastAPI** - Modern async Python web framework
- **SQLAlchemy** - ORM for database operations
- **PostgreSQL** - Relational database
- **Pydantic** - Data validation
- **python-jose** - JWT token handling
- **Passlib** - Password hashing
- **Resend** - Email service
- **SlowAPI** - Rate limiting

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **PostCSS** - CSS processing

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.9+
- **PostgreSQL** database (local or cloud-hosted)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/arpitkumar2004/data_science-portfolio-website-final.git
   cd data_science-portfolio-website-final
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   
   # Create virtual environment
   # Windows (PowerShell):
   py -m venv venv; .\venv\Scripts\Activate.ps1
   # macOS/Linux:
   python3 -m venv venv && source venv/bin/activate
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Configure environment variables
   # Create backend/.env with database URL and API keys
   
   # Run migrations
   cd migrations
   # Windows:
   .\run-migration.bat
   # macOS/Linux:
   ./run-migration.sh
   cd ..
   
   # Start backend server
   uvicorn main:app --reload --port 8000
   ```

3. **Setup Frontend**:
   ```bash
   # From root directory
   npm install
   npm run dev
   ```
   The website will be available at `http://localhost:5173`

4. **Setup Admin Panel** (optional):
   ```bash
   cd admin-panel
   npm install
   npm run dev
   ```
   The admin panel will be available at `http://localhost:5174`

## 📖 Usage

### Public Website
- Navigate to `http://localhost:5173`
- Browse projects, skills, and about information
- Use contact forms to send inquiries
- Request CV downloads

### Admin Dashboard
- Navigate to `http://localhost:5174`
- Log in with admin credentials
- View and manage incoming leads
- Update portfolio information
- Monitor website analytics

### API Documentation
- Access Swagger UI at `http://localhost:8000/docs`
- Interactive API exploration and testing

## 🔐 Authentication & Security

- JWT tokens for admin authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration for frontend-backend communication
- Environment-based configuration for sensitive data

## 📝 Configuration

### Environment Variables

Create a `.env` file in the `backend/` directory:
```
DATABASE_URL=postgresql://user:password@localhost/portfolio_db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
RESEND_API_KEY=your-resend-api-key
ADMIN_EMAIL=admin@example.com
```

### Database Setup

Run migrations to set up the database schema:
```bash
cd backend/migrations
./run-migration.sh  # On Windows: run-migration.bat
```

## 🛠️ Development

### Available Scripts

**Frontend**:
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

**Admin Panel**:
```bash
cd admin-panel
npm run dev      # Start admin dev server
npm run build    # Build admin for production
```

**Backend**:
```bash
cd backend
uvicorn main:app --reload --port 8000  # Development
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app  # Production
```

## 📦 Project Structure Details

### Lead Management
- **Models**: `backend/models.py` - ContactLead with status and priority
- **Services**: `backend/services/lead_service.py` - Lead business logic
- **Routes**: `backend/routes/leads.py` - Lead API endpoints
- **Schemas**: `backend/schemas/lead.py` - Request/response validation

### Authentication
- **Service**: `backend/services/auth_service_v2.py` - JWT and password handling
- **Routes**: `backend/routes/auth.py` - Login and token endpoints

## 🌐 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
npm run build
# Deploy the dist/ folder
```

### Admin Panel Deployment
```bash
cd admin-panel
npm run build
# Deploy the dist/ folder to separate domain
```

### Backend Deployment (Heroku/Railway/Render)
```bash
# Ensure requirements.txt is up to date
# Deploy using platform's CLI or connect GitHub repository
```

## 📚 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh JWT token

### Leads
- `GET /leads` - Fetch all leads
- `POST /leads` - Create new lead
- `GET /leads/{id}` - Get lead details
- `PUT /leads/{id}` - Update lead
- `DELETE /leads/{id}` - Delete lead

### Health
- `GET /health` - API health check

## 🐛 Troubleshooting

### CORS Issues
Ensure backend `CORS_ORIGINS` in `config.py` includes your frontend URLs.

### Database Connection
Check `DATABASE_URL` environment variable and PostgreSQL server status.

### Admin Login Issues
Verify JWT secret key and token expiration settings in backend configuration.

## 📄 Documentation

 - [Admin Panel Separation](admin-panel/ADMIN_PANEL_SEPARATION.md) - Architecture and separation details
- [Migration Guide](developers'%20read/MIGRATION_GUIDE.md) - Database migration instructions
- [Architecture](developers'%20read/ARCHITECTURE.md) - System architecture overview
- [Implementation Checklist](developers'%20read/IMPLEMENTATION_CHECKLIST.md) - Feature checklist

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please ensure your code follows the project's linting standards and includes appropriate tests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the project maintainer.

---

**Built with ❤️ by Arpit Kumar**
