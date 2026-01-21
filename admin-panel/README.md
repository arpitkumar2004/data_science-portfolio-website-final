# Admin Panel - Lead Management Pro

Separate frontend module for administrative control of the lead management system.

## 🎯 Architecture

This admin panel is a **completely separate frontend application** from the main portfolio website, providing:

- **Security**: Admin code is not bundled with the public website
- **Performance**: Smaller bundle sizes for both applications
- **Flexibility**: Independent tech stack and customization
- **Deployment**: Can be hosted on a separate subdomain
- **Maintenance**: Update admin features without affecting the public site

## 🛠️ Tech Stack

- **React 18** + TypeScript
- **Vite** (Build tool)
- **SWR 2.2.5** (Data fetching with 30s auto-refresh)
- **Framer Motion** (Animations)
- **Tailwind CSS** (Styling)
- **Lucide React** (Icons)

## 📁 Project Structure

```
admin-panel/
├── src/
│   ├── components/
│   │   ├── AdminDashboard.tsx   # Main dashboard interface
│   │   ├── LoginPage.tsx         # Authentication page
│   │   └── ToastProvider.tsx     # Toast notifications
│   ├── services/
│   │   └── adminAPI.ts           # API client with JWT auth
│   ├── hooks/
│   │   ├── useAdminData.ts       # SWR hooks for data fetching
│   │   └── useToast.ts           # Toast notification hook
│   ├── App.tsx                   # Root component with auth routing
│   ├── main.tsx                  # React entry point
│   └── index.css                 # Global styles
├── vite.config.ts                # Vite configuration (port 5174)
├── tailwind.config.js            # Tailwind configuration
├── .env                          # Environment variables
└── package.json                  # Dependencies & scripts
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Backend API running on `http://localhost:8000`

### Installation

```bash
cd admin-panel
npm install
```

### Development

```bash
npm run dev
```

The admin panel will be available at **http://localhost:5174**

### Build for Production

```bash
npm run build
```

Build output will be in `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🔐 Authentication

The admin panel uses **JWT (JSON Web Token)** authentication:

1. Login page validates credentials against backend API
2. JWT token is stored in localStorage
3. All API requests include the token in Authorization header
4. Rate limiting: 10 failed login attempts → 3 hour lockout

## 🔌 API Configuration

The admin panel connects to the backend API via:

- **Development**: Vite proxy (`/api` → `http://localhost:8000`)
- **Production**: Environment variable `VITE_API_URL`

### Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8000/api
```

For production:

```env
VITE_API_URL=https://your-backend-api.com/api
```

## 📊 Features

### Dashboard
- **Real-time Stats**: Total leads, pending, high priority, conversion rate
- **KPI Cards**: Visual indicators with trend data
- **Auto-refresh**: SWR automatically refreshes data every 30 seconds

### Lead Management
- **Dual View Modes**: Table view or Grid view
- **Advanced Filters**: Status, priority, role, search
- **Sorting**: Newest, oldest, priority
- **Bulk Operations**: Multi-select and delete

### Lead Details
- **Detail Drawer**: Full lead information in side panel
- **Quick Actions**: Update status, priority, send email
- **Metadata**: Custom JSON metadata support

### Analytics
- **Status Distribution**: Visual breakdown of lead statuses
- **Role Analysis**: Leads by requested role
- **Priority Insights**: High, medium, low priority counts

### Export
- **CSV Export**: Download all leads as CSV file
- **Filtered Export**: Export currently filtered leads

## 🌐 Deployment

### Option 1: Same Domain (Subdirectory)

Deploy to `yourdomain.com/admin`

```bash
npm run build
# Upload dist/ contents to /admin directory on your server
```

Configure web server (e.g., Nginx):

```nginx
location /admin {
    alias /var/www/yourdomain.com/admin;
    try_files $uri $uri/ /admin/index.html;
}
```

### Option 2: Subdomain (Recommended)

Deploy to `admin.yourdomain.com`

```bash
npm run build
# Upload dist/ contents to admin subdomain
```

Configure DNS:
- Add A record: `admin.yourdomain.com` → Your server IP

Configure web server (e.g., Nginx):

```nginx
server {
    listen 80;
    server_name admin.yourdomain.com;
    root /var/www/admin.yourdomain.com;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Proxy API requests to backend
    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Option 3: Separate Server

Deploy admin panel and backend on different servers:

1. Build admin panel with production API URL:
   ```env
   VITE_API_URL=https://api.yourdomain.com
   ```

2. Deploy to admin server

3. Configure CORS on backend to allow admin domain

## 🔒 Security Considerations

1. **Never expose admin panel publicly** without authentication
2. **Use HTTPS** in production
3. **Implement IP whitelisting** (optional but recommended)
4. **Enable rate limiting** on backend
5. **Regular security audits** and dependency updates
6. **Strong admin passwords** (enforced by backend)

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build and preview production build
npm run build
npm run preview
```

Test checklist:
- [ ] Login with valid credentials
- [ ] Rate limiting works (10 failed attempts)
- [ ] Dashboard loads all data
- [ ] Filters and search work
- [ ] Lead detail drawer opens
- [ ] Status/priority updates work
- [ ] Bulk delete works
- [ ] CSV export works
- [ ] Auto-refresh every 30s
- [ ] Logout clears session

## 📦 Scripts

```json
{
  "dev": "vite --port 5174",           // Start dev server
  "build": "tsc -b && vite build",    // Build for production
  "preview": "vite preview",          // Preview production build
  "lint": "eslint ."                  // Lint code
}
```

## 🔄 Data Flow

```
User Action → AdminDashboard → adminAPI (JWT token) → Backend API → Database
                    ↓
                 SWR Hook
                    ↓
            Auto-revalidate every 30s
```

## 🐛 Troubleshooting

### Admin panel won't connect to backend

1. Check backend is running: `http://localhost:8000/api/health`
2. Verify `.env` file has correct `VITE_API_URL`
3. Check browser console for CORS errors
4. Ensure backend allows admin panel origin

### Login fails

1. Verify backend `/api/admin/login` endpoint is accessible
2. Check if admin password is correct
3. Look for rate limiting lockout (wait 3 hours)
4. Check browser console for errors

### Data not loading

1. Check if JWT token is valid (inspect localStorage)
2. Verify backend API is returning data
3. Check SWR errors in console
4. Try manual refresh with refresh button

## 📝 Maintenance

### Update Dependencies

```bash
npm update
npm audit fix
```

### Add New Features

1. Create new components in `src/components/`
2. Add API methods to `src/services/adminAPI.ts`
3. Create custom hooks in `src/hooks/` if needed
4. Update AdminDashboard to include new features

## 📞 Support

For backend API documentation, see `backend/README.md`

For main portfolio website, see root `README.md`

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**License**: Private
