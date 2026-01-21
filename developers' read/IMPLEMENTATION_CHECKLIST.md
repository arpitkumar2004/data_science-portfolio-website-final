# Implementation Checklist - Lead Intelligence Stack

## ✅ Phase 1: Database Migration (SQL)

- [ ] **Open Neon Console**: [console.neon.tech](https://console.neon.tech)
- [ ] **Navigate to SQL Editor**
- [ ] **Copy migration SQL from [NEON_QUICKSTART.md](./NEON_QUICKSTART.md)**
- [ ] **Paste into SQL Editor**
- [ ] **Click Execute**
- [ ] **Verify with test queries** (see NEON_QUICKSTART.md)

**Files involved:**
- `backend/migrations/001_lead_intelligence_schema.sql` - Full migration
- `NEON_QUICKSTART.md` - Copy-paste ready SQL
- `MIGRATION_GUIDE.md` - Step-by-step instructions

---

## ✅ Phase 2: Backend Setup

### Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

**New packages added:**
- `python-jose[cryptography]` - JWT tokens
- `passlib[bcrypt]` - Password hashing
- `slowapi` - Rate limiting

### Environment Variables
Create `.env.development` and `.env.production`:

```env
# Database
DATABASE_URL=postgresql://user:password@host/dbname

# JWT
JWT_SECRET_KEY=your-secret-key-change-in-production

# Legacy (backward compatibility)
ADMIN_SECRET_KEY=your-admin-secret

# API
VITE_API_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_PUBLIC=10/minute
RATE_LIMIT_ADMIN=100/minute

# Email & External
RESEND_API_KEY=your-api-key
CONTACT_PHONE_NUMBER=+91XXXXXXXXXX
CALENDLY_LINK=https://calendly.com/yourlink
```

### Files Modified
- `backend/models.py` - Added Enums, metadata, audit timestamps
- `backend/config.py` - JWT & rate limit config
- `backend/main.py` - Added SlowAPI middleware
- `backend/services/auth_service_v2.py` - JWT auth with RBAC (NEW)
- `backend/routes/auth.py` - Added JWT endpoints, backward compat
- `backend/routes/leads.py` - Added rate limits, JWT deps, optimized queries
- `backend/services/lead_service.py` - New velocity/conversion metrics
- `backend/schemas/lead.py` - Updated with new enum patterns
- `backend/utils/serializers.py` - New audit fields in responses
- `backend/requirements.txt` - New dependencies

### Test Backend
```bash
# Start server
uvicorn backend.main:app --reload

# Test JWT login
curl -X POST http://localhost:8000/admin/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "password=YOUR_ADMIN_SECRET"

# Response:
# {"access_token": "eyJ...", "token_type": "bearer", "expires_in": 3600}

# Test admin endpoint with JWT
curl http://localhost:8000/admin/leads \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Test public endpoint with rate limiting (should pass first 10 times)
for i in {1..15}; do
  curl -X POST http://localhost:8000/api/submit-contact \
    -F "name=Test" -F "email=test@test.com" \
    -F "subject=Test" -F "message=Test"
  echo "Request $i"
done
# Should get 429 Too Many Requests after 10 requests
```

---

## ✅ Phase 3: Frontend Setup

### Install Dependencies
```bash
npm install
# Should add: swr@^2.2.5
```

### Files Modified
- `package.json` - Added SWR
- `src/services/adminAPI.ts` - Centralized API client (NEW)
- `src/hooks/useAdminData.ts` - SWR hooks with auto-revalidation (NEW)
- `src/components/AdminDashboard.tsx` - Refactored to use SWR & new API

### Update Environment
`.env.development` / `.env.production`:

```env
VITE_API_URL=http://localhost:8000  # dev
# or
VITE_API_URL=https://api.yourdomain.com  # prod
```

### Test Frontend Admin Panel
```bash
npm run dev
# Visit http://localhost:5173/admin

# Login:
# - Enter password (ADMIN_SECRET_KEY)
# - Receive JWT token → auto-stored in sessionStorage

# Test features:
# 1. View all leads
# 2. Edit status/priority/notes/score (should update instantly via SWR)
# 3. Flag/unflag leads
# 4. Bulk delete
# 5. Search/filter
# 6. Export CSV/JSON
# 7. KPI cards (Lead Velocity 24h, Conversion Efficiency %)
```

---

## ✅ Phase 4: Integration Testing

### Test Public Endpoints (Rate Limited)
```bash
# Contact Form Submission
curl -X POST http://localhost:8000/api/submit-contact \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "subject=Interested in collaboration" \
  -F "message=Let's discuss opportunities" \
  -F "company=Acme Corp" \
  -F "formType=contacts" \
  -F "role=recruiter"

# Verify metadata captured
# SELECT metadata FROM contact_leads WHERE email='john@example.com';
# Should see: {"ip_address": "...", "user_agent": "...", ...}
```

### Test CV Request
```bash
curl -X POST http://localhost:8000/api/v1/request-cv \
  -F "name=Jane Smith" \
  -F "email=jane@company.com" \
  -F "company=Tech Inc" \
  -F "subject=CV Request" \
  -F "message=Please send your CV" \
  -F "role=recruiter"

# Check database
# SELECT lead_type, status FROM contact_leads WHERE email='jane@company.com';
# Should see: lead_type='cv_request', status='unread'
```

### Test Admin Panel CRUD
```bash
# Get all leads (with JWT)
curl http://localhost:8000/admin/leads \
  -H "Authorization: Bearer <token>"

# Update lead status
curl -X PATCH http://localhost:8000/admin/leads/1/status \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"status": "processing"}'

# Update priority
curl -X PATCH http://localhost:8000/admin/leads/1/priority \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"priority": "high"}'

# Get stats (with KPIs)
curl http://localhost:8000/admin/leads/stats \
  -H "Authorization: Bearer <token>"

# Response should include:
# {
#   "total_leads": 10,
#   "status_distribution": {"unread": 5, "processing": 2, ...},
#   "leads_last_24h": 3,
#   "leads_last_7d": 7,
#   "conversion_rate": 40.0,
#   "avg_quality_score": 0.75,
#   "high_priority_count": 2,
#   "role_distribution": {"recruiter": 4, "other": 6}
# }
```

### Test Rate Limiting
```bash
# Send 15 requests rapidly
for i in {1..15}; do
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:8000/api/submit-contact \
    -F "name=Test" \
    -F "email=test@test.com" \
    -F "subject=Test" \
    -F "message=Test")
  echo "Request $i: HTTP $HTTP_CODE"
done

# First 10: 200 OK
# 11+: 429 Too Many Requests
```

### Test SWR Auto-Revalidation
```bash
# 1. Open Admin Dashboard in browser
# 2. Submit a new lead via contact form (another tab or API call)
# 3. Admin dashboard should auto-refresh within 30 seconds
# 4. Edit a lead's status in admin panel
# 5. Switch tabs and back → UI should reflect the change (SWR cache)
# 6. Network tab: Should see revalidation requests every 30s even with no visible interaction
```

---

## ✅ Phase 5: Deployment

### Backend (Render)
- [ ] Push code to GitHub
- [ ] Connect Render → GitHub repo
- [ ] Set environment variables on Render
- [ ] Deploy

### Frontend (Vercel)
- [ ] Push code to GitHub
- [ ] Connect Vercel → GitHub repo
- [ ] Set `VITE_API_URL` to production backend
- [ ] Deploy

### Database (Neon)
- [ ] Ensure migration is applied
- [ ] Verify indexes exist
- [ ] Test from production backend

---

## ✅ Verification Checklist

### Database
- [ ] `lead_type` enum exists with (contact, cv_request, collaboration)
- [ ] `status` enum exists with (unread, processing, contacted, archived)
- [ ] `priority` enum exists with (low, medium, high, urgent)
- [ ] `metadata` JSONB column stores IP/user-agent
- [ ] `created_at` / `updated_at` timestamps populated
- [ ] All 6 indexes created
- [ ] Trigger auto-updates `updated_at`

### Backend
- [ ] JWT auth endpoint `/admin/login` works
- [ ] Admin endpoints require `Authorization: Bearer` header
- [ ] Rate limiting returns 429 after limit exceeded
- [ ] Lead creation captures metadata
- [ ] Stats endpoint returns velocity & conversion metrics
- [ ] PATCH endpoints (status/priority/notes/score) work
- [ ] Bulk operations work
- [ ] Export returns CSV & JSON
- [ ] Search & filter work

### Frontend
- [ ] Admin panel loads with JWT
- [ ] Status filter shows (Unread, Processing, Contacted, Archived)
- [ ] Priority filter shows (Low, Medium, High, Urgent)
- [ ] KPI cards show Lead Velocity & Conversion Efficiency
- [ ] Status/priority selects update instantly (optimistic)
- [ ] Flag/unflag works
- [ ] Notes textarea saves on blur
- [ ] Quality score input updates on change
- [ ] Bulk delete works
- [ ] SWR auto-revalidates every 30s
- [ ] Switching browser tabs and back preserves state

---

## 🔄 Rollback Plan

If anything breaks:

```bash
# 1. Backend rollback: Revert code
git revert <commit>

# 2. Database rollback: Run rollback SQL (see NEON_QUICKSTART.md)
# 3. Frontend rollback: Revert code
git revert <commit>

# All changes are reversible!
```

---

## 📞 Support

- **Database issues**: Check [NEON_QUICKSTART.md](./NEON_QUICKSTART.md)
- **Migration questions**: See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
- **API docs**: Check docstrings in route files
- **Backend errors**: Check `uvicorn` logs
- **Frontend errors**: Check browser console

---

## 🎯 Success Criteria

✅ **You're done when:**
1. Database has all new columns & enums
2. Backend starts without errors
3. Admin can login with JWT
4. Admin dashboard loads and auto-updates
5. Public endpoints capture metadata
6. Rate limiting works
7. Stats show real KPIs
8. All CRUD operations work
9. SWR auto-refreshes
10. Exports produce valid files

---

**Total implementation time: ~2-3 hours**
- Database migration: 5 min
- Backend setup & testing: 45 min
- Frontend setup & testing: 45 min
- Integration testing: 30 min

Good luck! 🚀
