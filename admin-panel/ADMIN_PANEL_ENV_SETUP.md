# Admin Panel Environment Variables Guide

## 📋 Required Environment Variables

The admin-panel only requires **ONE** environment variable:

```bash
VITE_API_URL=http://localhost:8000
```

## 🔧 Complete Configuration

### Development Setup

**File:** `admin-panel/.env`

```bash
# Backend API Base URL (WITHOUT /api suffix - routes will add it)
# Development:
VITE_API_URL=http://localhost:8000

# The admin panel will use these endpoints:
# - Login: http://localhost:8000/api/admin/login
# - Dashboard: http://localhost:8000/api/admin/leads
# - Stats: http://localhost:8000/api/admin/leads/stats
```

### Production Setup

**For Vercel/Netlify/Other Platforms:**

```bash
# Production Backend URL
VITE_API_URL=https://your-backend-domain.com

# Examples:
VITE_API_URL=https://portfolio-backend-xyz.onrender.com
VITE_API_URL=https://api.arpitkumar.com
VITE_API_URL=https://your-domain.com
```

## 🚀 How to Set Environment Variables

### Local Development

1. **Create or edit `admin-panel/.env`:**
   ```bash
   cd admin-panel
   echo "VITE_API_URL=http://localhost:8000" > .env
   ```

2. **Run dev server:**
   ```bash
   npm run dev
   # Server will start on http://localhost:5174
   ```

### Production Deployment (Vercel)

1. Go to project settings in Vercel
2. Navigate to **Environment Variables**
3. Add new variable:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-backend-domain.com`
   - **Environments:** Select appropriate (Production, Preview, Development)

4. Deploy:
   ```bash
   npm run build
   # Or push to git - Vercel auto-deploys
   ```

### Production Deployment (Netlify)

1. Go to **Site settings** → **Build & deploy**
2. Navigate to **Environment**
3. Add new variable:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-backend-domain.com`

4. Redeploy site

### Production Deployment (Other Platforms)

Set environment variables according to platform documentation:

- **Railway:** Project settings → Variables
- **Fly.io:** `fly.toml` or `fly secrets set`
- **AWS Amplify:** App settings → Environment variables
- **GitHub Pages:** No backend needed (static)

## 📝 Complete Reference Table

| Variable | Purpose | Example | Required |
|----------|---------|---------|----------|
| `VITE_API_URL` | Backend API base URL (without `/api` suffix) | `http://localhost:8000` | ✅ Yes |

## 🔄 How it's Used

The environment variable is used to construct API endpoints:

```typescript
// From admin-panel/src/config/api.ts
const API_BASE_URL = 'http://localhost:8000'; // from VITE_API_URL

// API calls are constructed as:
buildApiUrl(API_ENDPOINTS.ADMIN_LOGIN)
// Result: http://localhost:8000/api/admin/login

buildApiUrl(API_ENDPOINTS.ADMIN_LEADS)
// Result: http://localhost:8000/api/admin/leads

buildApiUrl(API_ENDPOINTS.ADMIN_LEADS_STATS)
// Result: http://localhost:8000/api/admin/leads/stats
```

## ✅ Verification Checklist

After setting environment variables:

- [ ] `.env` file exists in `admin-panel/` directory
- [ ] `VITE_API_URL` is set to correct backend URL
- [ ] No `/api` suffix in `VITE_API_URL` (will be added automatically)
- [ ] URL is accessible from your browser
- [ ] Backend is running and healthy
- [ ] CORS is configured on backend for admin panel domain

## 🧪 Testing Your Configuration

### Local Test

```bash
# 1. Start backend
cd backend
uvicorn main:app --reload

# 2. Start admin panel
cd admin-panel
npm run dev

# 3. Open http://localhost:5174
# 4. Open browser console (F12)
# 5. Look for: "📡 Admin Panel API Configuration:"
#    Should show: baseUrl: 'http://localhost:8000'
```

### Production Test

```bash
# After deploying admin panel:
# 1. Visit deployed URL (e.g., admin.yourdomain.com)
# 2. Open browser console (F12)
# 3. Check for: "📡 Admin Panel API Configuration:"
# 4. Verify baseUrl matches your backend URL
# 5. Try logging in with admin password
```

## 🐛 Troubleshooting

### Getting 404 errors on login

**Problem:** `POST /api/api/admin/login 404`

**Solution:** Check that `VITE_API_URL` does NOT end with `/api`:
```bash
❌ VITE_API_URL=http://localhost:8000/api
✅ VITE_API_URL=http://localhost:8000
```

### CORS errors

**Problem:** `Access to XMLHttpRequest ... blocked by CORS`

**Solution:** Ensure backend CORS config includes admin panel domain:

In `backend/.env`:
```bash
CORS_ORIGINS=https://admin.yourdomain.com,https://yourdomain.com
```

Or in `backend/config.py`:
```python
CORS_ORIGINS = [
    "http://localhost:5174",  # dev admin panel
    "https://admin.yourdomain.com",  # prod admin panel
    "http://localhost:5173",  # dev main site
    "https://yourdomain.com",  # prod main site
]
```

### Token validation failing

**Problem:** Can login but immediately logged out

**Solution:** Verify token is stored correctly:
```javascript
// In browser console:
localStorage.getItem('admin_token')  // Should have JWT token
sessionStorage.getItem('admin_token')  // Should have JWT token
```

### Environment variable not being picked up

**Problem:** Still seeing `http://localhost:8000` despite setting different value

**Solution:** 
1. Delete `.env` file and recreate it
2. Restart dev server: `npm run dev`
3. For production, redeploy: `npm run build && git push`

## 📦 Full .env Template

```bash
# ============================================
# ADMIN PANEL ENVIRONMENT VARIABLES
# ============================================
# Copy this to admin-panel/.env and update values

# Backend API Base URL
# Format: https://your-domain.com (NO /api suffix)
# Development: http://localhost:8000
# Production: https://your-backend-domain.com
VITE_API_URL=http://localhost:8000
```

## 🎯 Summary

For admin-panel, you only need to set:

```bash
VITE_API_URL=<your-backend-base-url>
```

Everything else is handled automatically by the frontend!

**Deployment by Platform:**

| Platform | Setup Method |
|----------|--------------|
| Local Dev | Create `.env` file |
| Vercel | Project settings → Environment Variables |
| Netlify | Site settings → Build & deploy → Environment |
| Railway | Project settings → Variables |
| Fly.io | `fly secrets set VITE_API_URL=...` |
| Docker | Pass as build arg: `docker build --build-arg VITE_API_URL=...` |
