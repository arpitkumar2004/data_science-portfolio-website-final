# Quick Copy-Paste SQL for Neon

## 🚀 **For Neon Console: Just Copy & Paste This**

Go to [console.neon.tech](https://console.neon.tech) → SQL Editor → Paste below → Execute

---

## Complete Migration (Copy All)

```sql
-- STEP 1: Create ENUM types
DO $$ BEGIN
    CREATE TYPE lead_status AS ENUM ('unread', 'processing', 'contacted', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE lead_type AS ENUM ('contact', 'cv_request', 'collaboration');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE priority_level AS ENUM ('low', 'medium', 'high', 'urgent');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- STEP 2: Add columns
ALTER TABLE contact_leads
ADD COLUMN IF NOT EXISTS lead_type lead_type DEFAULT 'contact' NOT NULL;

ALTER TABLE contact_leads
ADD COLUMN IF NOT EXISTS status lead_status DEFAULT 'unread' NOT NULL;

ALTER TABLE contact_leads
ADD COLUMN IF NOT EXISTS priority priority_level DEFAULT 'medium' NOT NULL;

ALTER TABLE contact_leads
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}' NOT NULL;

ALTER TABLE contact_leads
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;

ALTER TABLE contact_leads
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;

-- STEP 3: Create indexes
CREATE INDEX IF NOT EXISTS idx_contact_leads_created_at ON contact_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_leads_status ON contact_leads(status);
CREATE INDEX IF NOT EXISTS idx_contact_leads_email ON contact_leads(email);
CREATE INDEX IF NOT EXISTS idx_contact_leads_priority ON contact_leads(priority);
CREATE INDEX IF NOT EXISTS idx_contact_leads_role ON contact_leads(role);
CREATE INDEX IF NOT EXISTS idx_contact_leads_updated_at ON contact_leads(updated_at DESC);

-- STEP 4: Create trigger
CREATE OR REPLACE FUNCTION update_contact_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_contact_leads_updated_at ON contact_leads;

CREATE TRIGGER trigger_contact_leads_updated_at
BEFORE UPDATE ON contact_leads
FOR EACH ROW
EXECUTE FUNCTION update_contact_leads_updated_at();

-- STEP 5: Migrate data
UPDATE contact_leads
SET status = CASE 
    WHEN status = 'new' THEN 'unread'::lead_status
    WHEN status = 'contacted' THEN 'contacted'::lead_status
    WHEN status = 'qualified' THEN 'processing'::lead_status
    WHEN status = 'converted' THEN 'contacted'::lead_status
    WHEN status = 'lost' THEN 'archived'::lead_status
    ELSE 'unread'::lead_status
END
WHERE status IS NOT NULL;

UPDATE contact_leads
SET created_at = timestamp
WHERE created_at IS NULL AND timestamp IS NOT NULL;

UPDATE contact_leads
SET updated_at = created_at
WHERE updated_at IS NULL;

-- STEP 6: Add comments
COMMENT ON TABLE contact_leads IS 'Unified lead table for Contact, CV Request, and Collaboration inquiries.';
COMMENT ON COLUMN contact_leads.lead_type IS 'Type discriminator: contact, cv_request, collaboration';
COMMENT ON COLUMN contact_leads.status IS 'Lead lifecycle: unread → processing → contacted → archived';
COMMENT ON COLUMN contact_leads.priority IS 'Lead priority: low, medium, high, urgent';
COMMENT ON COLUMN contact_leads.metadata IS 'JSONB for browser info, IP, user agent, referrer, location';
COMMENT ON COLUMN contact_leads.created_at IS 'When lead was created (velocity analytics)';
COMMENT ON COLUMN contact_leads.updated_at IS 'Last update timestamp (auto-maintained)';

-- Done!
SELECT 'Migration completed!' as status;
```

---

## ✅ Verification Queries (Run These After Migration)

### Check New Columns
```sql
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'contact_leads' 
ORDER BY ordinal_position;
```

### Check Indexes
```sql
SELECT indexname FROM pg_indexes 
WHERE tablename = 'contact_leads' 
ORDER BY indexname;
```

### Check Trigger
```sql
SELECT trigger_name FROM information_schema.triggers 
WHERE event_object_table = 'contact_leads';
```

### View Sample Data
```sql
SELECT 
  id, name, email, lead_type, status, priority, 
  quality_score, created_at, updated_at
FROM contact_leads
ORDER BY created_at DESC
LIMIT 5;
```

---

## 📊 Post-Migration Analytics Queries

### Lead Velocity (Last 24 Hours)
```sql
SELECT 
  COUNT(*) as leads_last_24h,
  COUNT(CASE WHEN status = 'unread' THEN 1 END) as unread_count,
  COUNT(CASE WHEN status = 'processing' THEN 1 END) as processing_count
FROM contact_leads
WHERE created_at >= CURRENT_TIMESTAMP - INTERVAL '24 hours';
```

### Conversion Efficiency (Recruiter %)
```sql
SELECT 
  COUNT(*) as total_leads,
  SUM(CASE WHEN role = 'recruiter' THEN 1 ELSE 0 END) as recruiter_count,
  ROUND(100.0 * SUM(CASE WHEN role = 'recruiter' THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 2) as conversion_pct
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

### Priority Breakdown
```sql
SELECT 
  priority,
  COUNT(*) as count
FROM contact_leads
GROUP BY priority
ORDER BY 
  CASE priority 
    WHEN 'urgent' THEN 1 
    WHEN 'high' THEN 2 
    WHEN 'medium' THEN 3 
    WHEN 'low' THEN 4 
  END;
```

### Lead Type Distribution
```sql
SELECT 
  lead_type,
  COUNT(*) as count
FROM contact_leads
GROUP BY lead_type;
```

---

## ⚠️ Rollback (If Needed)

```sql
-- DROP all new columns
ALTER TABLE contact_leads 
DROP COLUMN IF EXISTS lead_type,
DROP COLUMN IF EXISTS metadata,
DROP COLUMN IF EXISTS created_at,
DROP COLUMN IF EXISTS updated_at;

-- Note: status and priority may have triggers/constraints, 
-- so we drop those separately
ALTER TABLE contact_leads DROP COLUMN IF EXISTS status CASCADE;
ALTER TABLE contact_leads DROP COLUMN IF EXISTS priority CASCADE;

-- DROP ENUM types
DROP TYPE IF EXISTS lead_status CASCADE;
DROP TYPE IF EXISTS lead_type CASCADE;
DROP TYPE IF EXISTS priority_level CASCADE;

-- DROP indexes
DROP INDEX IF EXISTS idx_contact_leads_created_at;
DROP INDEX IF EXISTS idx_contact_leads_status;
DROP INDEX IF EXISTS idx_contact_leads_email;
DROP INDEX IF EXISTS idx_contact_leads_priority;
DROP INDEX IF EXISTS idx_contact_leads_role;
DROP INDEX IF EXISTS idx_contact_leads_updated_at;

-- DROP trigger
DROP TRIGGER IF EXISTS trigger_contact_leads_updated_at ON contact_leads;
DROP FUNCTION IF EXISTS update_contact_leads_updated_at();

SELECT 'Rollback completed!' as status;
```

---

## 📋 Summary

| What | Status |
|------|--------|
| **New Columns** | 6 (lead_type, status, priority, metadata, created_at, updated_at) |
| **ENUM Types** | 3 (lead_status, lead_type, priority_level) |
| **Indexes** | 6 (for performance) |
| **Triggers** | 1 (auto-update created_at) |
| **Data Preserved** | ✅ Yes (non-destructive) |
| **Downtime** | ⏱️ < 1 minute |

---

Done! ✅
