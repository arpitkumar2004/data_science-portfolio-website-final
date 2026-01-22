# API Configuration Standard

## ✅ Unified Standard

**RULE:** `VITE_API_URL` must NEVER include the `/api` suffix.

### Environment Variables

```bash
# ✅ CORRECT
VITE_API_URL=http://localhost:8000
VITE_API_URL=https://your-backend.com

# ❌ WRONG
VITE_API_URL=http://localhost:8000/api
VITE_API_URL=https://your-backend.com/api
```

## Backend Routes Structure

All FastAPI routes are prefixed with `/api` in their router definitions:

```python
# backend/routes/leads.py
router = APIRouter(prefix="/api", tags=["leads"])

@router.post("/submit-contact")  # Accessible at /api/submit-contact
@router.post("/v1/request-cv")   # Accessible at /api/v1/request-cv

# backend/routes/auth.py
router = APIRouter(prefix="/api/admin", tags=["auth"])

@router.post("/login")   # Accessible at /api/admin/login
@router.get("/me")       # Accessible at /api/admin/me
```

## Frontend API Configuration

### Main Site (Portfolio)

Location: `src/config/api.ts`

```typescript
import { API_BASE_URL, buildApiUrl, API_ENDPOINTS } from './config/api';

// Usage
const response = await fetch(buildApiUrl(API_ENDPOINTS.SUBMIT_CONTACT), {
  method: 'POST',
  body: formData
});

// Full URL: http://localhost:8000/api/submit-contact
```

### Admin Panel

Location: `admin-panel/src/config/api.ts`

```typescript
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

// Usage in adminAPI service
const url = `${this.baseURL}/api/admin/leads`;

// Full URL: http://localhost:8000/api/admin/leads
```

## Complete Endpoint Map

### Public Endpoints

| Endpoint | Method | URL Pattern | Purpose |
|----------|--------|-------------|---------|
| Health Check | GET | `/api/hello` | Server status |
| Submit Contact | POST | `/api/submit-contact` | Contact form |
| Request CV | POST | `/api/v1/request-cv` | CV request form |

### Admin Authentication

| Endpoint | Method | URL Pattern | Purpose |
|----------|--------|-------------|---------|
| Login | POST | `/api/admin/login` | Admin login |
| Logout | POST | `/api/admin/logout` | Admin logout |
| Validate Token | GET | `/api/admin/validate` | Check token validity |
| Get Profile | GET | `/api/admin/me` | Admin profile |

### Admin Lead Management

| Endpoint | Method | URL Pattern | Purpose |
|----------|--------|-------------|---------|
| Get All Leads | GET | `/api/admin/leads` | List all leads |
| Get Lead | GET | `/api/admin/leads/{id}` | Single lead details |
| Get Stats | GET | `/api/admin/leads/stats` | Dashboard analytics |
| Search Leads | GET | `/api/admin/leads/search?q={query}` | Search by keyword |
| Filter Leads | GET | `/api/admin/leads/filter` | Advanced filtering |
| Export Leads | GET | `/api/admin/leads/export?format={csv\|json}` | Export data |
| Update Status | PATCH | `/api/admin/leads/{id}/status` | Change lead status |
| Update Priority | PATCH | `/api/admin/leads/{id}/priority` | Change priority |
| Update Quality Score | PATCH | `/api/admin/leads/{id}/quality-score` | Update score |
| Update Notes | PATCH | `/api/admin/leads/{id}/notes` | Add/edit notes |
| Update Tags | PATCH | `/api/admin/leads/{id}/tags` | Manage tags |
| Flag Lead | POST | `/api/admin/leads/{id}/flag` | Mark as flagged |
| Unflag Lead | POST | `/api/admin/leads/{id}/unflag` | Remove flag |
| Delete Lead | DELETE | `/api/admin/leads/{id}` | Remove lead |
| Bulk Update Status | PATCH | `/api/admin/leads/bulk-status` | Update multiple |
| Bulk Delete | DELETE | `/api/admin/leads/bulk-delete` | Delete multiple |

## Migration Checklist

When deploying to production:

### 1. Update Environment Variables

**Main Site (.env)**
```bash
VITE_API_URL=https://your-backend-domain.com
```

**Admin Panel (admin-panel/.env)**
```bash
VITE_API_URL=https://your-backend-domain.com
```

### 2. Verify Build

```bash
# Main site
npm run build
# Check console for: "📡 API Configuration: { baseUrl: 'https://...' }"

# Admin panel
cd admin-panel && npm run build
# Check console for: "📡 Admin Panel API Configuration: { baseUrl: 'https://...' }"
```

### 3. Test Endpoints

```bash
# Health check
curl https://your-backend-domain.com/api/hello

# Contact form submission (requires form data)
curl -X POST https://your-backend-domain.com/api/submit-contact \
  -F "name=Test" \
  -F "email=test@example.com" \
  -F "subject=Test" \
  -F "message=Test"
```

## Debugging

### Check Current Configuration

Open browser console on any page:

**Main Site:**
```
📡 API Configuration: {
  baseUrl: 'http://localhost:8000',
  environment: 'development',
  healthCheck: 'http://localhost:8000/api/hello'
}
```

**Admin Panel:**
```
📡 Admin Panel API Configuration: {
  baseUrl: 'http://localhost:8000',
  environment: 'development',
  loginEndpoint: 'http://localhost:8000/api/admin/login'
}
Admin API initialized with base URL: http://localhost:8000
```

### Common Issues

**404 Not Found - `/api/api/...`**
- ❌ Problem: `VITE_API_URL` includes `/api` suffix
- ✅ Solution: Remove `/api` from `.env` file

**404 Not Found - `/admin/leads`** (missing `/api`)
- ❌ Problem: Endpoint path doesn't include `/api` prefix
- ✅ Solution: Update endpoint to `/api/admin/leads`

**CORS Error**
- ❌ Problem: Backend CORS config doesn't include frontend origin
- ✅ Solution: Update `CORS_ORIGINS` in `backend/config.py`

## Files Changed

### Main Site
- ✅ `src/config/api.ts` (NEW - centralized config)
- ✅ `src/App.tsx`
- ✅ `src/pages/Contact.tsx`
- ✅ `src/pages/RequestCV.tsx`
- ✅ `src/components/RoleGateway.tsx`
- ✅ `.env`
- ✅ `.env.example`

### Admin Panel
- ✅ `admin-panel/src/config/api.ts` (NEW - centralized config)
- ✅ `admin-panel/src/services/adminAPI.ts`
- ✅ `admin-panel/.env`
- ✅ `admin-panel/.env.example`

### Backend
- ⚠️ No changes required (routes already use `/api` prefix)

## Testing Checklist

- [ ] Main site health check works (`/api/hello`)
- [ ] Contact form submits successfully
- [ ] CV request form submits successfully
- [ ] Admin login redirects to admin panel
- [ ] Admin panel login works
- [ ] Admin panel displays leads list
- [ ] Admin panel analytics dashboard loads
- [ ] All CRUD operations work (create, read, update, delete leads)
- [ ] Export functionality works
- [ ] Search and filter work
- [ ] No console errors about 404 or CORS

## Success Criteria

✅ All API calls use consistent base URL (without `/api`)
✅ All endpoints explicitly include `/api` prefix in paths
✅ Zero 404 errors related to double `/api/api/` paths
✅ Centralized configuration makes future changes easier
✅ Clear debugging information in console logs
✅ Comprehensive endpoint documentation available
