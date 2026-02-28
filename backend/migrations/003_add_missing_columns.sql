-- ============================================================================
-- Migration 003: Add missing columns for admin panel features
-- Neon PostgreSQL
-- Safe to run: uses ADD COLUMN IF NOT EXISTS (idempotent)
-- ============================================================================

-- Quality & Scoring
ALTER TABLE contact_leads
ADD COLUMN IF NOT EXISTS quality_score FLOAT DEFAULT 0.0;

-- Admin Management
ALTER TABLE contact_leads
ADD COLUMN IF NOT EXISTS internal_notes TEXT DEFAULT '';

-- Tags (JSONB array for categorization)
ALTER TABLE contact_leads
ADD COLUMN IF NOT EXISTS tags JSONB DEFAULT '[]';

-- Follow-up Management
ALTER TABLE contact_leads
ADD COLUMN IF NOT EXISTS last_contacted TIMESTAMP NULL;

ALTER TABLE contact_leads
ADD COLUMN IF NOT EXISTS follow_up_date TIMESTAMP NULL;

-- Contact History (JSONB array of contact events)
ALTER TABLE contact_leads
ADD COLUMN IF NOT EXISTS contact_history JSONB DEFAULT '[]';

-- Source Attribution
ALTER TABLE contact_leads
ADD COLUMN IF NOT EXISTS source VARCHAR DEFAULT 'contact_form';


-- ============================================================================
-- Indexes for new columns
-- ============================================================================

-- Index on source for analytics grouping
CREATE INDEX IF NOT EXISTS idx_contact_leads_source
ON contact_leads(source);

-- Index on quality_score for filtered queries
CREATE INDEX IF NOT EXISTS idx_contact_leads_quality_score
ON contact_leads(quality_score);

-- Index on last_contacted for response time analytics
CREATE INDEX IF NOT EXISTS idx_contact_leads_last_contacted
ON contact_leads(last_contacted)
WHERE last_contacted IS NOT NULL;


-- ============================================================================
-- Backfill: set source from form_type for existing rows
-- ============================================================================

UPDATE contact_leads
SET source = CASE
    WHEN form_type = 'CV_DISPATCH_SYSTEM' THEN 'cv_request'
    WHEN form_type = 'contacts' THEN 'contact_form'
    ELSE COALESCE(form_type, 'contact_form')
END
WHERE source IS NULL OR source = 'contact_form';


-- ============================================================================
-- Documentation
-- ============================================================================

COMMENT ON COLUMN contact_leads.quality_score IS 'Lead quality score 0.0 to 1.0, used for filtering and analytics';
COMMENT ON COLUMN contact_leads.internal_notes IS 'Admin-only notes for lead management';
COMMENT ON COLUMN contact_leads.tags IS 'JSONB array of categorization tags';
COMMENT ON COLUMN contact_leads.last_contacted IS 'Timestamp of last admin contact, used for response time metrics';
COMMENT ON COLUMN contact_leads.follow_up_date IS 'Scheduled follow-up date';
COMMENT ON COLUMN contact_leads.contact_history IS 'JSONB array of contact events with timestamps';
COMMENT ON COLUMN contact_leads.source IS 'Lead source attribution: contact_form, cv_request, linkedin, referral, etc.';

COMMIT;

-- ============================================================================
-- Migration complete!
-- Added columns:
-- ✅ quality_score (FLOAT) - Lead scoring
-- ✅ internal_notes (TEXT) - Admin notes
-- ✅ tags (JSONB) - Categorization
-- ✅ last_contacted (TIMESTAMP) - Response tracking
-- ✅ follow_up_date (TIMESTAMP) - Follow-up scheduling
-- ✅ contact_history (JSONB) - Contact event log
-- ✅ source (VARCHAR) - Source attribution
-- ✅ Indexes on source, quality_score, last_contacted
-- ✅ Backfilled source from form_type for existing rows
-- ============================================================================
