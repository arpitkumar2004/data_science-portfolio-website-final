-- ============================================================================
-- Projects Table - Database Migration
-- Neon PostgreSQL
-- Migration: 004_create_projects_table.sql
-- 
-- Creates the `projects` table for portfolio project management via admin panel.
-- Matches the schema from schemas/project.py and projectsData.tsx interface.
-- Safe to run multiple times (all operations use IF NOT EXISTS).
-- ============================================================================

BEGIN;

-- Step 1: Create ENUM type for project category
-- ============================================================================

DO $$ BEGIN
    CREATE TYPE project_category AS ENUM (
        'data-science',
        'web-app',
        'system-design',
        'chemical-research'
    );
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;


-- Step 2: Create the projects table
-- ============================================================================

CREATE TABLE IF NOT EXISTS projects (
    -- Primary key
    id              SERIAL PRIMARY KEY,

    -- ===== Core Required Fields =====
    title           VARCHAR(200)        NOT NULL,
    description     VARCHAR(1000)       NOT NULL,
    long_description TEXT               NOT NULL,
    image           TEXT                NOT NULL,          -- URL or path
    type            VARCHAR(100)        NOT NULL,          -- e.g. Competition, Research, Development
    category        project_category    NOT NULL DEFAULT 'data-science',
    role            VARCHAR(100)        NOT NULL,          -- e.g. Lead Developer
    duration        VARCHAR(100)        NOT NULL,          -- e.g. Jan 2024 - Mar 2024

    -- ===== Array/List Fields (stored as JSONB) =====
    tags            JSONB               NOT NULL DEFAULT '[]'::jsonb,
    objectives      JSONB               NOT NULL DEFAULT '[]'::jsonb,
    technologies    JSONB               NOT NULL DEFAULT '[]'::jsonb,
    methods         JSONB               NOT NULL DEFAULT '[]'::jsonb,
    results         JSONB               NOT NULL DEFAULT '[]'::jsonb,

    -- ===== Optional Text Fields =====
    tldr                TEXT            DEFAULT NULL,
    problem_statement   TEXT            DEFAULT NULL,
    literature_review   TEXT            DEFAULT NULL,
    code_snippet        TEXT            DEFAULT NULL,
    standings           TEXT            DEFAULT NULL,
    company             VARCHAR(200)    DEFAULT NULL,

    -- ===== Optional Link Fields =====
    github_link         TEXT            DEFAULT NULL,
    article_link        TEXT            DEFAULT NULL,
    live_demo_link      TEXT            DEFAULT NULL,

    -- ===== Optional Array Fields (stored as JSONB) =====
    key_impact_metrics  JSONB           DEFAULT NULL,      -- string[]
    core_stack          JSONB           DEFAULT NULL,      -- string[]
    tools               JSONB           DEFAULT NULL,      -- string[]
    implementation      JSONB           DEFAULT NULL,      -- string[]
    discussion          JSONB           DEFAULT NULL,      -- string[]
    conclusion          JSONB           DEFAULT NULL,      -- string[]
    limitations         JSONB           DEFAULT NULL,      -- string[]
    future_work         JSONB           DEFAULT NULL,      -- string[]
    "references"        JSONB           DEFAULT NULL,      -- string[] (quoted: reserved word)
    acknowledgements    JSONB           DEFAULT NULL,      -- string[]
    challenges          JSONB           DEFAULT NULL,      -- string[]
    solutions           JSONB           DEFAULT NULL,      -- string[]
    gallery_images      JSONB           DEFAULT NULL,      -- string[]
    similar_project_ids JSONB           DEFAULT NULL,      -- int[]

    -- ===== Audit Timestamps =====
    created_at      TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- Step 3: Create indexes for performance
-- ============================================================================

-- Category filter (most common filter on the admin panel)
CREATE INDEX IF NOT EXISTS idx_projects_category
ON projects(category);

-- Title search (for text search / ordering)
CREATE INDEX IF NOT EXISTS idx_projects_title
ON projects(title);

-- Created at for ordering by newest/oldest
CREATE INDEX IF NOT EXISTS idx_projects_created_at
ON projects(created_at DESC);

-- GIN index on tags for fast JSONB array containment queries
-- e.g. WHERE tags @> '["Python"]'
CREATE INDEX IF NOT EXISTS idx_projects_tags
ON projects USING GIN (tags);

-- GIN index on technologies for filtering
CREATE INDEX IF NOT EXISTS idx_projects_technologies
ON projects USING GIN (technologies);


-- Step 4: Auto-update trigger for updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION update_projects_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_projects_updated_at ON projects;

CREATE TRIGGER trigger_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION update_projects_updated_at();


-- Step 5: Add table/column comments for documentation
-- ============================================================================

COMMENT ON TABLE projects IS 'Portfolio projects managed via admin panel. Supports full CRUD with category filtering, search, and rich metadata.';

COMMENT ON COLUMN projects.id IS 'Auto-increment primary key';
COMMENT ON COLUMN projects.title IS 'Project title (max 200 chars)';
COMMENT ON COLUMN projects.description IS 'Short description shown on project cards (max 1000 chars)';
COMMENT ON COLUMN projects.long_description IS 'Full detailed description for project detail view';
COMMENT ON COLUMN projects.image IS 'Cover image URL or local path';
COMMENT ON COLUMN projects.type IS 'Project type: Competition, Research, Development, etc.';
COMMENT ON COLUMN projects.category IS 'Project category ENUM: data-science, web-app, system-design, chemical-research';
COMMENT ON COLUMN projects.role IS 'Your role in the project: Lead Developer, Data Scientist, etc.';
COMMENT ON COLUMN projects.duration IS 'Human-readable duration: e.g. Jan 2024 - Mar 2024';
COMMENT ON COLUMN projects.tags IS 'JSONB array of tag strings for filtering and display';
COMMENT ON COLUMN projects.objectives IS 'JSONB array of project objectives';
COMMENT ON COLUMN projects.technologies IS 'JSONB array of technologies used';
COMMENT ON COLUMN projects.methods IS 'JSONB array of methods/approaches used';
COMMENT ON COLUMN projects.results IS 'JSONB array of project results/outcomes';
COMMENT ON COLUMN projects.tldr IS 'One-liner summary of the project';
COMMENT ON COLUMN projects.problem_statement IS 'Problem the project addresses';
COMMENT ON COLUMN projects.github_link IS 'GitHub repository URL';
COMMENT ON COLUMN projects.article_link IS 'Published article/blog URL';
COMMENT ON COLUMN projects.live_demo_link IS 'Live demo/deployment URL';
COMMENT ON COLUMN projects.key_impact_metrics IS 'JSONB array of key impact metrics';
COMMENT ON COLUMN projects.core_stack IS 'JSONB array of core stack technologies';
COMMENT ON COLUMN projects.tools IS 'JSONB array of tools used';
COMMENT ON COLUMN projects.implementation IS 'JSONB array of implementation steps';
COMMENT ON COLUMN projects.challenges IS 'JSONB array of challenges faced';
COMMENT ON COLUMN projects.solutions IS 'JSONB array of solutions applied';
COMMENT ON COLUMN projects.gallery_images IS 'JSONB array of additional image URLs';
COMMENT ON COLUMN projects.similar_project_ids IS 'JSONB array of related project IDs';
COMMENT ON COLUMN projects.created_at IS 'Timestamp when project was created';
COMMENT ON COLUMN projects.updated_at IS 'Timestamp of last update (auto-maintained by trigger)';


-- Step 6: Verify (uncomment to inspect after running)
-- ============================================================================

-- SELECT column_name, data_type, is_nullable, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'projects'
-- ORDER BY ordinal_position;

-- SELECT indexname FROM pg_indexes WHERE tablename = 'projects';

COMMIT;

-- ============================================================================
-- Migration complete!
-- The `projects` table now has:
--   ✅ All required fields (title, description, image, category, role, etc.)
--   ✅ Optional rich-content fields (tldr, problem_statement, code_snippet, etc.)
--   ✅ JSONB arrays for tags, technologies, objectives, methods, results, etc.
--   ✅ Link fields (github, article, live demo)
--   ✅ Audit timestamps with auto-update trigger
--   ✅ Performance indexes (category, title, created_at, GIN on tags & technologies)
--   ✅ Column-level documentation
--
-- NOTE on column naming:
--   Database uses snake_case (e.g. long_description, github_link).
--   The service layer maps these to camelCase (e.g. longDescription, githubLink)
--   for the frontend API. See services/project_service.py for the mapping.
-- ============================================================================
