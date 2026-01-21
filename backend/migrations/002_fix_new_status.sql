-- ============================================================================
-- Fix 'new' status values - Convert to 'unread'
-- ============================================================================
-- This migration fixes any rows that have status = 'new' which is not in the enum
-- Run this before starting the application

-- First, check if there are any 'new' status values
-- SELECT COUNT(*) FROM contact_leads WHERE status::text = 'new';

-- Temporarily alter the enum to include 'new' if needed
DO $$ 
BEGIN
    -- Try to add 'new' to the enum if it doesn't exist
    BEGIN
        ALTER TYPE lead_status ADD VALUE IF NOT EXISTS 'new';
    EXCEPTION
        WHEN duplicate_object THEN null;
    END;
END $$;

-- Update all 'new' status values to 'unread'
UPDATE contact_leads
SET status = 'unread'::lead_status
WHERE status::text = 'new';

-- Log the result
DO $$
DECLARE
    updated_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO updated_count 
    FROM contact_leads 
    WHERE status::text = 'new';
    
    RAISE NOTICE 'Fixed % rows with status="new"', updated_count;
END $$;

COMMIT;

-- ============================================================================
-- Migration complete!
-- All 'new' status values have been converted to 'unread'
-- ============================================================================
