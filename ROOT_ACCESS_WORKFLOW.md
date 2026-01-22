# Root Access Workflow - Admin Panel Access via Domain

## 🔐 Complete Authentication Flow

### Development (localhost)

```
Portfolio Website (localhost:5173)
         ↓
User clicks "Admin" role
         ↓
RoleGateway shows password form
         ↓
Password validated via /api/admin/login
         ↓
JWT token stored in sessionStorage
         ↓
Redirect to Admin Panel (localhost:5174)
         ↓
Admin Panel validates token
         ↓
Full admin dashboard access
```

### Production (Custom Domains)

```
Portfolio Website (https://arpitkumar.dev)
         ↓
User clicks "Admin" role
         ↓
RoleGateway shows password form
         ↓
Password validated via backend API
         ↓
JWT token stored in sessionStorage
         ↓
Redirect to Admin Panel (https://admin.arpitkumar.dev)
         ↓
Admin Panel validates token
         ↓
Full admin dashboard access
```

## 📋 Domain Configuration Options

### Option 1: Subdomain (Recommended)

**Main Site:** `https://arpitkumar.dev`  
**Admin Panel:** `https://admin.arpitkumar.dev`  
**Backend API:** `https://api.arpitkumar.dev`

**Environment Variables:**

```bash
# Main Site (.env)
VITE_API_URL=https://api.arpitkumar.dev
VITE_ADMIN_PANEL_URL=https://admin.arpitkumar.dev

# Admin Panel (.env)
VITE_API_URL=https://api.arpitkumar.dev

# Backend (.env)
CORS_ORIGINS=https://arpitkumar.dev,https://admin.arpitkumar.dev
FRONTEND_URL=https://arpitkumar.dev
ADMIN_PANEL_URL=https://admin.arpitkumar.dev
```

### Option 2: Same Domain with Path

**Main Site:** `https://arpitkumar.dev`  
**Admin Panel:** `https://arpitkumar.dev/admin-panel`  
**Backend API:** `https://arpitkumar.dev/api`

**Environment Variables:**

```bash
# Main Site (.env)
VITE_API_URL=https://arpitkumar.dev
# VITE_ADMIN_PANEL_URL not needed (uses same-origin /admin-panel/)

# Admin Panel (.env)
VITE_API_URL=https://arpitkumar.dev

# Backend (.env)
CORS_ORIGINS=https://arpitkumar.dev
FRONTEND_URL=https://arpitkumar.dev
```

### Option 3: Different Domains

**Main Site:** `https://arpitkumar.dev`  
**Admin Panel:** `https://admin-dashboard.example.dev`  
**Backend API:** `https://backend.example.dev`

**Environment Variables:**

```bash
# Main Site (.env)
VITE_API_URL=https://backend.example.dev
VITE_ADMIN_PANEL_URL=https://admin-dashboard.example.dev

# Admin Panel (.env)
VITE_API_URL=https://backend.example.dev

# Backend (.env)
CORS_ORIGINS=https://arpitkumar.dev,https://admin-dashboard.example.dev
FRONTEND_URL=https://arpitkumar.dev
ADMIN_PANEL_URL=https://admin-dashboard.example.dev
```

## 🚀 Deployment Steps

### Step 1: Deploy Backend (FastAPI)

**Recommended Platforms:**
- Render.dev (free tier available)
- Railway.app
- Fly.io
- Heroku
- Your own VPS

**Backend Environment Variables:**
```bash
DATABASE_URL=postgresql://...
ADMIN_PASSWORD=your_secure_password_here
JWT_SECRET_KEY=your_jwt_secret_key
RESEND_API_KEY=your_resend_api_key
CORS_ORIGINS=https://yourdomain.dev,https://admin.yourdomain.dev
```

**Example Backend URL:**
```
https://portfolio-backend-xyz.onrender.dev
```

### Step 2: Deploy Main Portfolio Site

**Recommended Platforms:**
- Vercel (recommended for React/Vite)
- Netlify
- Cloudflare Pages
- GitHub Pages

**Build Configuration:**
```bash
Build Command: npm run build
Output Directory: dist
Environment Variables:
  VITE_API_URL=https://portfolio-backend-xyz.onrender.dev
  VITE_ADMIN_PANEL_URL=https://admin.yourdomain.dev
```

**Custom Domain Setup:**
1. Add domain in platform settings
2. Update DNS records:
   - Type: A or CNAME
   - Name: @ (or subdomain)
   - Value: (provided by platform)

### Step 3: Deploy Admin Panel

**Recommended Platforms:**
- Vercel (separate project)
- Netlify
- Cloudflare Pages

**Build Configuration:**
```bash
Build Command: cd admin-panel && npm install && npm run build
Output Directory: admin-panel/dist
Root Directory: admin-panel
Environment Variables:
  VITE_API_URL=https://portfolio-backend-xyz.onrender.dev
```

**Custom Domain Setup (Subdomain):**
1. Add subdomain in platform settings
2. Update DNS records:
   - Type: CNAME
   - Name: admin
   - Value: (provided by platform)

### Step 4: Configure DNS

**For Subdomain Approach:**

```
# Main domain
Type: A or CNAME
Name: @
Value: (Vercel/Netlify IP or CNAME)

# Admin subdomain
Type: CNAME
Name: admin
Value: (Vercel/Netlify CNAME for admin panel)

# API subdomain (optional)
Type: CNAME
Name: api
Value: (Backend platform CNAME)
```

**For Path-Based Approach:**

Deploy admin-panel to same domain with routing:
```
https://yourdomain.dev → Main site
https://yourdomain.dev/admin-panel → Admin panel
https://yourdomain.dev/api → Backend
```

This requires reverse proxy configuration (nginx/Cloudflare Workers/Vercel rewrites).

## 🔑 Admin Access Flow (Production)

### User Journey

1. **Visit Portfolio**
   ```
   https://arpitkumar.dev
   ```

2. **Select Admin Role**
   - Click on role selector button
   - Choose "Admin" option
   - Password prompt appears

3. **Enter Admin Password**
   - Password validated against backend
   - JWT token generated and stored
   - Token includes expiration (default: 7 days)

4. **Automatic Redirect**
   ```
   RoleGateway detects Admin role
   → Redirects to: https://admin.arpitkumar.dev
   → Admin panel validates token
   → Dashboard loads with full access
   ```

5. **Admin Panel Features**
   - View all leads (contact forms, CV requests)
   - Lead management (status, priority, notes)
   - Analytics dashboard
   - Export data (CSV/JSON)
   - Search and filter
   - Bulk operations

### Direct Admin Access

Users can also directly visit:
```
https://arpitkumar.dev/#/admin
```
This redirects to admin panel URL configured in `VITE_ADMIN_PANEL_URL`.

## 🔒 Security Features

### JWT Authentication
- Secure token-based authentication
- 7-day expiration (configurable)
- Stored in sessionStorage (cleared on browser close)
- Also stored in localStorage (persistent across sessions)

### Rate Limiting
- Backend enforces rate limits on login attempts
- Frontend blocks after 10 failed attempts
- IP-based blocking for 3 hours after too many failures

### Token Validation
- Admin panel validates token on load
- Expired tokens trigger re-login
- Invalid tokens automatically log out

### CORS Protection
- Backend only accepts requests from configured origins
- Prevents unauthorized cross-origin requests

## 📝 Environment Variables Reference

### Main Portfolio Site

```bash
# .env
VITE_API_URL=https://your-backend.dev
VITE_ADMIN_PANEL_URL=https://admin.your-domain.dev
```

**Where to set in Vercel:**
1. Go to Project Settings
2. Navigate to Environment Variables
3. Add variables for Production, Preview, Development

### Admin Panel

```bash
# admin-panel/.env
VITE_API_URL=https://your-backend.dev
```

### Backend

```bash
# backend/.env
DATABASE_URL=postgresql://user:pass@host:5432/dbname
ADMIN_PASSWORD=your_secure_admin_password
JWT_SECRET_KEY=your_jwt_secret_key_min_32_chars
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
RESEND_API_KEY=re_xxxxxxxxxxxxx
CORS_ORIGINS=https://your-domain.dev,https://admin.your-domain.dev
FRONTEND_URL=https://your-domain.dev
ADMIN_PANEL_URL=https://admin.your-domain.dev
```

## 🧪 Testing the Workflow

### Local Testing

1. **Start Backend**
   ```bash
   cd backend
   uvicorn main:app --reload
   # Running on http://localhost:8000
   ```

2. **Start Main Site**
   ```bash
   npm run dev
   # Running on http://localhost:5173
   ```

3. **Start Admin Panel**
   ```bash
   cd admin-panel
   npm run dev
   # Running on http://localhost:5174
   ```

4. **Test Flow**
   - Visit http://localhost:5173
   - Click role selector
   - Choose "Admin"
   - Enter password
   - Should redirect to http://localhost:5174
   - Admin dashboard loads

### Production Testing

1. **Test Main Site**
   ```bash
   curl https://your-domain.dev
   # Should return HTML
   ```

2. **Test Backend API**
   ```bash
   curl https://your-backend.dev/api/hello
   # Should return: {"status":"healthy",...}
   ```

3. **Test Admin Login**
   - Visit https://your-domain.dev
   - Select Admin role
   - Enter password
   - Verify redirect to admin panel
   - Check browser console for API calls

4. **Test Admin Panel**
   ```bash
   curl https://admin.your-domain.dev
   # Should return admin panel HTML
   ```

## 🐛 Troubleshooting

### Redirect Not Working

**Problem:** Admin login doesn't redirect to admin panel

**Solutions:**
1. Check `VITE_ADMIN_PANEL_URL` is set correctly
2. Verify admin panel is deployed and accessible
3. Check browser console for redirect URL
4. Ensure no popup blockers interfering

### CORS Errors

**Problem:** API requests blocked by CORS

**Solutions:**
1. Add frontend domain to `CORS_ORIGINS` in backend
2. Verify backend `.env` has correct origins
3. Restart backend after changing CORS settings
4. Check browser console for exact error

### Token Not Persisting

**Problem:** User logged out after page refresh

**Solutions:**
1. Check localStorage has `adminToken`
2. Verify token validation endpoint works
3. Check token hasn't expired (7 days default)
4. Ensure sessionStorage not being cleared

### 404 Errors

**Problem:** API endpoints returning 404

**Solutions:**
1. Verify `VITE_API_URL` doesn't include `/api` suffix
2. Check backend routes are registered correctly
3. Confirm backend is running and accessible
4. Test endpoint directly with curl

## 📦 Complete Deployment Checklist

- [ ] Backend deployed with correct environment variables
- [ ] Database connected and migrations run
- [ ] Backend health check endpoint accessible
- [ ] Main site deployed with production URLs
- [ ] Admin panel deployed separately
- [ ] DNS records configured correctly
- [ ] SSL certificates active (HTTPS working)
- [ ] CORS origins include all frontend domains
- [ ] Admin password is secure and set
- [ ] JWT secret key is secure and set
- [ ] Resend API key configured for emails
- [ ] Test admin login flow end-to-end
- [ ] Test lead submission from contact form
- [ ] Test CV request submission
- [ ] Test admin panel CRUD operations
- [ ] Monitor backend logs for errors
- [ ] Set up monitoring/alerts (optional)

## 🎯 Production URLs Example

**Recommended Structure:**
```
Main Site:      https://arpitkumar.dev
Admin Panel:    https://admin.arpitkumar.dev
Backend API:    https://api.arpitkumar.dev

Admin Access:   https://arpitkumar.dev → Click Admin → Login → Redirect to admin.arpitkumar.dev
Direct Access:  https://arpitkumar.dev/#/admin → Auto-redirect to admin.arpitkumar.dev
```

This setup provides:
- ✅ Clean separation of concerns
- ✅ Easy to manage separately
- ✅ Better security (admin on separate subdomain)
- ✅ Professional appearance
- ✅ Easy to scale independently
