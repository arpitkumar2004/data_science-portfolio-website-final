# API Quick Reference Card

## 📍 Standard Configuration

```bash
# .env (Main Site & Admin Panel)
VITE_API_URL=http://localhost:8000  # NO /api suffix!
```

## 🎯 Usage Pattern

### Main Site
```typescript
import { buildApiUrl, API_ENDPOINTS } from './config/api';

// ✅ Always use buildApiUrl() helper
fetch(buildApiUrl(API_ENDPOINTS.SUBMIT_CONTACT), { ... })
// → http://localhost:8000/api/submit-contact
```

### Admin Panel
```typescript
// adminAPI service handles URL construction
adminAPI.getLeads()
// → http://localhost:8000/api/admin/leads
```

## 🔗 Endpoint Patterns

| Type | Pattern | Example |
|------|---------|---------|
| Public | `/api/{endpoint}` | `/api/submit-contact` |
| Admin Auth | `/api/admin/{endpoint}` | `/api/admin/login` |
| Admin Leads | `/api/admin/leads/{action}` | `/api/admin/leads/stats` |
| Admin Lead By ID | `/api/admin/leads/{id}/{action}` | `/api/admin/leads/123/status` |

## ✅ Correct vs ❌ Wrong

### Environment Variable
```bash
✅ VITE_API_URL=http://localhost:8000
❌ VITE_API_URL=http://localhost:8000/api
```

### Frontend Code
```typescript
✅ `${API_BASE_URL}/api/submit-contact`
❌ `${API_BASE_URL}/submit-contact`

✅ buildApiUrl(API_ENDPOINTS.SUBMIT_CONTACT)
❌ `${API_BASE_URL}${API_ENDPOINTS.SUBMIT_CONTACT}`  // redundant /api
```

### Result URLs
```
✅ http://localhost:8000/api/submit-contact
❌ http://localhost:8000/api/api/submit-contact  (double /api)
❌ http://localhost:8000/submit-contact  (missing /api)
```

## 🚀 Quick Test

```bash
# Test health endpoint
curl http://localhost:8000/api/hello

# Expected: {"status": "healthy", ...}
# If 404: Check backend is running and routes are registered
```

## 📱 Console Debug Output

**On page load, you should see:**
```
📡 API Configuration: {
  baseUrl: 'http://localhost:8000',
  environment: 'development',
  healthCheck: 'http://localhost:8000/api/hello'
}
```

**If you see `/api/api/` in URLs:**
- Check `.env` file - remove `/api` suffix from `VITE_API_URL`
- Restart dev server after changing `.env`

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| 404 on `/api/api/...` | Remove `/api` from `VITE_API_URL` in `.env` |
| 404 on `/submit-contact` | Endpoint missing `/api` prefix |
| CORS error | Update `backend/config.py` CORS_ORIGINS |
| Env changes not working | Restart dev server (`npm run dev`) |

## 📦 Files to Check

**Main Site:**
- `.env` → Base URL config
- `src/config/api.ts` → Centralized endpoints
- `src/App.tsx` → Health check
- `src/pages/Contact.tsx` → Contact form
- `src/pages/RequestCV.tsx` → CV request
- `src/components/RoleGateway.tsx` → Admin auth

**Admin Panel:**
- `admin-panel/.env` → Base URL config
- `admin-panel/src/config/api.ts` → Centralized endpoints
- `admin-panel/src/services/adminAPI.ts` → API client

**Backend:**
- `backend/routes/leads.py` → prefix="/api"
- `backend/routes/auth.py` → prefix="/api/admin"
- `backend/routes/health.py` → prefix="/api"
