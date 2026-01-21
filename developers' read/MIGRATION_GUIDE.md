# Database Migration Guide - Lead Intelligence Stack

## Quick Start (Neon PostgreSQL)

### Step 1: Access Neon Console
1. Go to [console.neon.tech](https://console.neon.tech)
2. Select your project
3. Open **SQL Editor**

### Step 2: Run Migration SQL
1. Copy all SQL from `backend/migrations/001_lead_intelligence_schema.sql`
2. Paste into the Neon SQL Editor
3. Click **Execute** button
4. Wait for completion (should take < 5 seconds)

### Step 3: Verify Schema Changes
Run this query to confirm all columns exist:

```sql
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'contact_leads' 
ORDER BY ordinal_position;
```

Expected new columns:
- `lead_type` (enum: contact, cv_request, collaboration)
- `status` (enum: unread, processing, contacted, archived)
- `priority` (enum: low, medium, high, urgent)
- `metadata` (jsonb)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Step 4: Verify Indexes
Run this to confirm indexes were created:

```sql
SELECT indexname FROM pg_indexes 
WHERE tablename = 'contact_leads' 
ORDER BY indexname;
```

Expected indexes:
- idx_contact_leads_created_at
- idx_contact_leads_status
- idx_contact_leads_email
- idx_contact_leads_priority
- idx_contact_leads_role
- idx_contact_leads_updated_at

### Step 5: Test Trigger
Run this to confirm the auto-update trigger works:

```sql
-- Check if trigger exists
SELECT trigger_name FROM information_schema.triggers 
WHERE trigger_schema = 'public' 
AND event_object_table = 'contact_leads';
```

Should return: `trigger_contact_leads_updated_at`

---

## What the Migration Does

### 1️⃣ Creates ENUM Types
```sql
lead_status → 'unread', 'processing', 'contacted', 'archived'
lead_type → 'contact', 'cv_request', 'collaboration'
priority_level → 'low', 'medium', 'high', 'urgent'
```

### 2️⃣ Adds New Columns (Non-Destructive)
```
✅ lead_type       → Discriminator for entry type
✅ status          → New lifecycle (unread → processing → contacted → archived)
✅ priority        → Lead importance (low/medium/high/urgent)
✅ metadata        → JSONB for IP, browser, referrer, location
✅ created_at      → When lead was created
✅ updated_at      → Last modification (auto-maintained)
```

### 3️⃣ Creates Performance Indexes
```
✅ created_at (DESC) → For velocity analytics (last 24h, 7d)
✅ status            → For status-based filtering
✅ email             → For deduplication & lookups
✅ priority          → For high-priority alerts
✅ role              → For conversion efficiency (recruiter vs others)
✅ updated_at (DESC) → For change tracking
```

### 4️⃣ Auto-Update Trigger
- `updated_at` is automatically set to `CURRENT_TIMESTAMP` whenever a record is updated
- No manual updates needed

### 5️⃣ Migrates Existing Data
- Old status values mapped to new lifecycle:
  - `new` → `unread`
  - `contacted` → `contacted` (unchanged)
  - `qualified` → `processing`
  - `converted` → `contacted` (marketing→contacted)
  - `lost` → `archived`

---

## Rollback (If Needed)

If you need to rollback, run:

```sql
-- Drop new columns
ALTER TABLE contact_leads DROP COLUMN IF EXISTS lead_type;
ALTER TABLE contact_leads DROP COLUMN IF EXISTS status CASCADE;
ALTER TABLE contact_leads DROP COLUMN IF EXISTS priority CASCADE;
ALTER TABLE contact_leads DROP COLUMN IF EXISTS metadata;
ALTER TABLE contact_leads DROP COLUMN IF EXISTS created_at;
ALTER TABLE contact_leads DROP COLUMN IF EXISTS updated_at CASCADE;

-- Drop ENUM types
DROP TYPE IF EXISTS lead_status CASCADE;
DROP TYPE IF EXISTS lead_type CASCADE;
DROP TYPE IF EXISTS priority_level CASCADE;

-- Drop indexes
DROP INDEX IF EXISTS idx_contact_leads_created_at;
DROP INDEX IF EXISTS idx_contact_leads_status;
DROP INDEX IF EXISTS idx_contact_leads_email;
DROP INDEX IF EXISTS idx_contact_leads_priority;
DROP INDEX IF EXISTS idx_contact_leads_role;
DROP INDEX IF EXISTS idx_contact_leads_updated_at;

-- Drop trigger
DROP TRIGGER IF EXISTS trigger_contact_leads_updated_at ON contact_leads;
DROP FUNCTION IF EXISTS update_contact_leads_updated_at();
```

---

## Test Queries

### View All Leads with New Fields
```sql
SELECT 
  id, name, email, lead_type, status, priority, 
  quality_score, created_at, updated_at
FROM contact_leads
ORDER BY created_at DESC
LIMIT 10;
```

### Lead Velocity (Last 24 Hours)
```sql
SELECT COUNT(*) as leads_last_24h
FROM contact_leads
WHERE created_at >= CURRENT_TIMESTAMP - INTERVAL '24 hours';
```

### Conversion Efficiency (Recruiter %)
```sql
SELECT 
  COUNT(*) as total_leads,
  SUM(CASE WHEN role = 'recruiter' THEN 1 ELSE 0 END) as recruiter_count,
  ROUND(100.0 * SUM(CASE WHEN role = 'recruiter' THEN 1 ELSE 0 END) / COUNT(*), 2) as conversion_efficiency_pct
FROM contact_leads;
```

### Status Distribution
```sql
SELECT 
  status,
  COUNT(*) as count,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 2) as percentage
FROM contact_leads
GROUP BY status
ORDER BY count DESC;
```

### Metadata Sample (First Lead with Metadata)
```sql
SELECT id, name, metadata
FROM contact_leads
WHERE metadata IS NOT NULL AND metadata != '{}'::jsonb
LIMIT 1;
```

---

## Frontend/Backend Setup (Post-Migration)

Once migration is complete:

1. **Backend Services** use new fields:
   - `adminAPI.getStats()` → Returns lead velocity, conversion efficiency
   - Lead creation → Captures metadata (IP, user-agent, referrer)

2. **Admin Dashboard** displays:
   - Lead Velocity (24h): `leads_last_24h` from stats
   - Conversion Efficiency: `conversion_rate` (recruiter %)
   - Status filters: Unread → Processing → Contacted → Archived

3. **Indexes** speed up:
   - Analytics queries (velocity, conversion)
   - Status filtering (admin panel)
   - Email deduplication (prevent duplicates)

---

## Notes

- ✅ **Non-destructive**: All existing data preserved
- ✅ **Backward compatible**: Old `timestamp` column kept
- ✅ **Idempotent**: Safe to run multiple times (IF NOT EXISTS checks)
- ✅ **Performance**: Indexes created for all filtering/analytics queries
- ✅ **Audit trail**: `updated_at` auto-maintained by trigger
- ✅ **Flexibility**: Metadata JSONB allows future extensibility
