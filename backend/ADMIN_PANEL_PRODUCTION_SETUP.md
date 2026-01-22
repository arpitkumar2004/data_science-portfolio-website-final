# Backend Production Setup for Admin Panel

## Overview

The admin panel requires specific backend configuration to function in production. This guide ensures your backend .env is correctly set up for both the main portfolio website and the admin panel.

## Critical Configuration: CORS_ORIGINS

### What is CORS_ORIGINS?

CORS (Cross-Origin Resource Sharing) is a security mechanism that controls which domains can access your backend API. Since the admin panel is a separate web application, you must explicitly allow it to communicate with your backend.

### Why This Matters

Without the admin panel domain in `CORS_ORIGINS`:
- ❌ Admin panel login will fail with CORS error: `Access to XMLHttpRequest has been blocked by CORS policy`
- ❌ Leads dashboard won't load
- ❌ All API calls from admin panel will be rejected by the browser

### Production CORS Configuration

Update your **backend .env** to include BOTH your main portfolio AND admin panel domains:

```bash
# Development (local):
CORS_ORIGINS=http://localhost:5173,http://localhost:5174

# Production Examples:

# Single domain (if admin is on subdomain):
CORS_ORIGINS=https://yourdomain.com,https://admin.yourdomain.com

# Multiple deployment platforms:
CORS_ORIGINS=https://portfolio.vercel.app,https://admin-panel.vercel.app,https://yourdomain.com,https://admin.yourdomain.com

# With API subdomain (if applicable):
CORS_ORIGINS=https://yourdomain.com,https://admin.yourdomain.com,https://api.yourdomain.com
```

### How Backend Handles CORS

Your backend in [config.py](config.py) loads CORS_ORIGINS:

```python
CORS_ORIGINS = os.getenv('CORS_ORIGINS', 'http://localhost:5173,http://localhost:5174').split(',')
```

This list is passed to FastAPI's CORSMiddleware, allowing requests from only these origins.

## Complete Backend Production .env Checklist

```bash
# ============================================
# 1. DATABASE
# ============================================
# Get your Neon or Supabase PostgreSQL URL
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require

# ============================================
# 2. AUTHENTICATION & SECURITY
# ============================================
# Admin login password
# For production, change from default 'arpit@2006'
ADMIN_SECRET_KEY=your-production-admin-password-generate-secure-random

# JWT signing key for token generation
# Generate: openssl rand -hex 32
JWT_SECRET_KEY=your-production-jwt-secret-generate-secure-random

# ============================================
# 3. EMAIL SERVICE
# ============================================
# Resend API key (for email notifications)
RESEND_API_KEY=re_your_actual_resend_api_key

# Email sender (must be verified in Resend)
EMAIL_FROM=Your Name <contact@yourdomain.com>

# ============================================
# 4. CONTACT INFORMATION
# ============================================
CONTACT_PHONE_NUMBER=+1234567890
CALENDLY_LINK=https://calendly.com/your-username/30min

# ============================================
# 5. CORS - FOR ADMIN PANEL INTEGRATION
# ============================================
# CRITICAL: Include both main portfolio AND admin panel domains
CORS_ORIGINS=https://yourdomain.com,https://admin.yourdomain.com
```

## Deployment Scenarios

### Scenario 1: Both on Vercel

**Main Portfolio:** `https://portfolio.vercel.app`  
**Admin Panel:** `https://admin-panel.vercel.app`

```bash
CORS_ORIGINS=https://portfolio.vercel.app,https://admin-panel.vercel.app
```

### Scenario 2: Main on Vercel, Admin on Netlify

**Main Portfolio:** `https://portfolio.vercel.app`  
**Admin Panel:** `https://admin-panel.netlify.app`

```bash
CORS_ORIGINS=https://portfolio.vercel.app,https://admin-panel.netlify.app
```

### Scenario 3: Custom Domain with Subdomains

**Main Portfolio:** `https://arpitkumar.com`  
**Admin Panel:** `https://admin.arpitkumar.com`  
**API:** Railway at `https://api.railway.app/...` (accessed by both)

```bash
CORS_ORIGINS=https://arpitkumar.com,https://admin.arpitkumar.com
```

### Scenario 4: Multiple Deployment Methods

**Production:** Main on custom domain + admin on subdomain  
**Staging:** Both on Vercel  
**Development:** localhost

```bash
CORS_ORIGINS=https://arpitkumar.com,https://admin.arpitkumar.com,https://portfolio.vercel.app,https://admin-panel.vercel.app,http://localhost:5173,http://localhost:5174
```

## Common CORS Errors and Fixes

### Error: "Access to XMLHttpRequest blocked by CORS policy"

**Cause:** Admin panel domain not in CORS_ORIGINS

**Fix:** Add your admin domain to `CORS_ORIGINS` in backend .env:
```bash
# Old (only main portfolio):
CORS_ORIGINS=https://yourdomain.com

# New (including admin panel):
CORS_ORIGINS=https://yourdomain.com,https://admin.yourdomain.com
```

Then restart your backend.

### Error: "Admin panel loads but API calls fail"

**Cause:** Domain syntax error or extra spaces in CORS_ORIGINS

**Fix:** Ensure proper comma-separated format with NO spaces:
```bash
# ✅ Correct:
CORS_ORIGINS=https://yourdomain.com,https://admin.yourdomain.com

# ❌ Incorrect (spaces cause parsing issues):
CORS_ORIGINS=https://yourdomain.com, https://admin.yourdomain.com
```

### Error: "Login works but admin can't fetch leads"

**Cause:** Only login domain is whitelisted, other operations fail

**Fix:** Ensure CORS_ORIGINS includes all domains making requests. Check browser console for the Origin header being sent.

## Testing CORS Setup

### 1. Local Testing

Start both frontend apps and backend:

```bash
# Terminal 1: Backend
cd backend
python main.py

# Terminal 2: Main site
cd ..
npm run dev

# Terminal 3: Admin panel
cd admin-panel
npm run dev
```

Admin panel should:
- Load login form at `http://localhost:5174`
- Login successfully with password `arpit@2006` (or your custom ADMIN_SECRET_KEY)
- Load leads dashboard without CORS errors

### 2. Production Testing

After deploying backend with new CORS_ORIGINS:

1. **Visit admin panel:** `https://admin.yourdomain.com`
2. **Open browser DevTools → Network tab**
3. **Try logging in**
4. **Check Response Headers:**
   - Should see: `Access-Control-Allow-Origin: https://admin.yourdomain.com` ✅
   - If missing: CORS is failing ❌

### 3. Curl Test

```bash
# Test if backend accepts requests from admin panel domain
curl -X OPTIONS http://localhost:8000/api/admin/me \
  -H "Origin: http://localhost:5174" \
  -H "Access-Control-Request-Method: POST" \
  -v

# Look for: "Access-Control-Allow-Origin: http://localhost:5174"
```

## Backend Environment Variables - Reference

| Variable | Required | Purpose | Example |
|----------|----------|---------|---------|
| `DATABASE_URL` | ✅ | PostgreSQL connection | `postgresql://user:pass@host/db` |
| `ADMIN_SECRET_KEY` | ✅ | Admin password | `your-secure-password` |
| `JWT_SECRET_KEY` | ✅ | JWT signing key | `your-jwt-secret` |
| `RESEND_API_KEY` | ✅ | Email service API | `re_xxxxx` |
| `EMAIL_FROM` | ✅ | Email sender address | `Arpit <contact@domain.com>` |
| `CORS_ORIGINS` | ✅ | **For Admin Panel** | `https://domain.com,https://admin.domain.com` |
| `CONTACT_PHONE_NUMBER` | ❌ | Phone in emails | `+1234567890` |
| `CALENDLY_LINK` | ❌ | Meeting link | `https://calendly.com/user` |
| `RATE_LIMIT_PUBLIC` | ❌ | Rate limit | `10/minute` |
| `RATE_LIMIT_ADMIN` | ❌ | Admin rate limit | `100/minute` |

## Admin Panel API Endpoints (All Require CORS)

These endpoints are called by the admin panel and must pass CORS check:

```
POST   /api/admin/login          → Login with password (FormData)
GET    /api/admin/me             → Verify token validity
GET    /api/admin/leads          → Fetch all leads
PUT    /api/admin/leads/{id}     → Update lead status/details
GET    /api/admin/leads/{id}     → Get specific lead
DELETE /api/admin/leads/{id}     → Delete lead
POST   /api/admin/leads          → Create new lead (if applicable)
```

All these endpoints:
1. ✅ Require valid JWT token in `Authorization: Bearer <token>` header
2. ✅ Must pass CORS origin check against `CORS_ORIGINS`
3. ✅ Are protected by rate limiting (default: 100/minute for admin)

## Deployment Checklist

Before deploying your backend:

- [ ] Database URL set to production PostgreSQL (Neon, Supabase, etc.)
- [ ] `ADMIN_SECRET_KEY` changed from default `arpit@2006`
- [ ] `JWT_SECRET_KEY` generated via `openssl rand -hex 32`
- [ ] `RESEND_API_KEY` set to valid API key from Resend
- [ ] `EMAIL_FROM` set to verified sender address in Resend
- [ ] **`CORS_ORIGINS` includes your admin panel domain** ⚠️
- [ ] Backend deployed and running
- [ ] Admin panel domain deployed and running
- [ ] Main portfolio domain deployed and running
- [ ] Test admin login from production admin domain
- [ ] Test leads API calls work from admin dashboard
- [ ] Check backend logs for any CORS errors

## Troubleshooting

### Admin panel not loading forms

1. Check backend CORS_ORIGINS:
   ```bash
   echo $CORS_ORIGINS  # Should include your admin domain
   ```

2. Check backend is running:
   ```bash
   curl http://localhost:8000/api/health
   ```

3. Check browser console for CORS error message

4. Update CORS_ORIGINS and restart backend

### Login fails silently

1. Verify `ADMIN_SECRET_KEY` is set in backend .env
2. Check backend logs for authentication errors
3. Ensure admin panel is sending FormData (not JSON)
4. Try logging in with password: `arpit@2006` if using defaults

### API calls work but leads don't load

1. Token is valid but endpoints fail
2. Check `JWT_SECRET_KEY` matches between deployments
3. Verify database connection: `DATABASE_URL` is correct
4. Check backend logs for SQL errors

## Additional Resources

- [CORS MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [FastAPI CORS Documentation](https://fastapi.tiangolo.com/tutorial/cors/)
- [JWT Authentication Guide](https://tools.ietf.org/html/rfc7519)

## Quick Reference

**TL;DR for Production:**

1. Update `backend/.env` with production values
2. **Add admin panel domain to `CORS_ORIGINS`:**
   ```bash
   CORS_ORIGINS=https://yourdomain.com,https://admin.yourdomain.com
   ```
3. Restart backend
4. Test admin panel login
5. Verify leads dashboard loads without CORS errors

---

**Created:** January 22, 2026  
**Related Files:** 
- [backend/.env.example](backend/.env.example)
- [admin-panel/ADMIN_PANEL_ENV_SETUP.md](../admin-panel/ADMIN_PANEL_ENV_SETUP.md)
- [ADMIN_PANEL_SEPARATION.md](../admin-panel/ADMIN_PANEL_SEPARATION.md)
