-- ============================================================================
-- Lead Intelligence & Command Strategy - Database Migration
-- Neon PostgreSQL
-- Safe to run: All dummy data will be preserved/migrated
-- ============================================================================

-- Step 1: Create ENUM types (if they don't exist)
-- ============================================================================

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


-- Step 2: Add new columns to contact_leads table (non-destructive)
-- ============================================================================

-- Add lead_type column
ALTER TABLE contact_leads
ADD COLUMN IF NOT EXISTS lead_type lead_type DEFAULT 'contact' NOT NULL;

-- Add status column (new lifecycle system)
ALTER TABLE contact_leads
ADD COLUMN IF NOT EXISTS status lead_status DEFAULT 'unread' NOT NULL;

-- Add priority column
ALTER TABLE contact_leads
ADD COLUMN IF NOT EXISTS priority priority_level DEFAULT 'medium' NOT NULL;

-- Add metadata JSONB column (for "Honey Trap" data: IP, browser info, etc.)
ALTER TABLE contact_leads
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}' NOT NULL;

-- Add audit timestamps
ALTER TABLE contact_leads
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;

ALTER TABLE contact_leads
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;


-- Step 3: Create indexes for performance
-- ============================================================================

-- Index on created_at for velocity analytics (lead velocity queries)
CREATE INDEX IF NOT EXISTS idx_contact_leads_created_at 
ON contact_leads(created_at DESC);

-- Index on status for filtering
CREATE INDEX IF NOT EXISTS idx_contact_leads_status 
ON contact_leads(status);

-- Index on email for quick lookups
CREATE INDEX IF NOT EXISTS idx_contact_leads_email 
ON contact_leads(email);

-- Index on priority for high-priority alerts
CREATE INDEX IF NOT EXISTS idx_contact_leads_priority 
ON contact_leads(priority);

-- Index on role for conversion efficiency analytics
CREATE INDEX IF NOT EXISTS idx_contact_leads_role 
ON contact_leads(role);

-- Index on updated_at for change tracking
CREATE INDEX IF NOT EXISTS idx_contact_leads_updated_at 
ON contact_leads(updated_at DESC);


-- Step 4: Add trigger to auto-update updated_at timestamp
-- ============================================================================

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


-- Step 5: Migrate existing data (if any)
-- ============================================================================

-- Map old status values to new lifecycle
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

-- Set created_at from timestamp if not already set
UPDATE contact_leads
SET created_at = timestamp
WHERE created_at IS NULL AND timestamp IS NOT NULL;

-- Set updated_at to created_at if not already set
UPDATE contact_leads
SET updated_at = created_at
WHERE updated_at IS NULL;


-- Step 6: Add comments for documentation
-- ============================================================================

COMMENT ON TABLE contact_leads IS 'Unified lead table for Contact, CV Request, and Collaboration inquiries. Single source of truth for all entry types.';

COMMENT ON COLUMN contact_leads.lead_type IS 'Type discriminator: contact, cv_request, collaboration';

COMMENT ON COLUMN contact_leads.status IS 'Lead lifecycle state: unread → processing → contacted → archived';

COMMENT ON COLUMN contact_leads.priority IS 'Lead priority: low, medium, high, urgent';

COMMENT ON COLUMN contact_leads.metadata IS 'Flexible JSONB storage for browser info, IP address, user agent, referrer, location data';

COMMENT ON COLUMN contact_leads.created_at IS 'Timestamp when lead was created (for velocity analytics)';

COMMENT ON COLUMN contact_leads.updated_at IS 'Timestamp of last update (auto-maintained by trigger)';

COMMENT ON COLUMN contact_leads.role IS 'User role selected (recruiter, student, etc.) - used for conversion efficiency metric';


-- Step 7: Verify schema
-- ============================================================================

-- Show final table structure
-- SELECT column_name, data_type, is_nullable, column_default 
-- FROM information_schema.columns 
-- WHERE table_name = 'contact_leads' 
-- ORDER BY ordinal_position;

-- Show indexes
-- SELECT indexname FROM pg_indexes WHERE tablename = 'contact_leads';

COMMIT;

-- ============================================================================
-- Migration complete! 
-- All lead records now have:
-- ✅ New lifecycle status (unread/processing/contacted/archived)
-- ✅ Lead type discriminator (contact/cv_request/collaboration)
-- ✅ Priority levels (low/medium/high/urgent)
-- ✅ Metadata JSONB for browser/IP/referrer data
-- ✅ Audit timestamps (created_at, updated_at)
-- ✅ Performance indexes for analytics queries
-- ============================================================================
