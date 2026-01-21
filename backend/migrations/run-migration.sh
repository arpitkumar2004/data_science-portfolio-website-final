#!/bin/bash
# Database Migration Script for Lead Intelligence Stack
# Usage: bash run-migration.sh

set -e

echo "=========================================="
echo "Lead Intelligence Schema Migration"
echo "=========================================="
echo ""

# Check if PostgreSQL client tools are available
if ! command -v psql &> /dev/null; then
    echo "❌ Error: psql not found. Please install PostgreSQL client tools."
    echo "   On macOS: brew install postgresql"
    echo "   On Windows: Download from https://www.postgresql.org/download/"
    echo "   On Linux: sudo apt-get install postgresql-client"
    exit 1
fi

# Get database URL from environment or ask user
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  DATABASE_URL not set in environment."
    echo "   For Neon: Use SQL Editor in console.neon.tech instead"
    echo ""
    echo "   Or set DATABASE_URL and run:"
    echo "   export DATABASE_URL='postgresql://user:password@host/dbname'"
    echo "   bash run-migration.sh"
    exit 1
fi

echo "📍 Using database from: DATABASE_URL"
echo ""

# Check connection
echo "🔍 Checking database connection..."
psql "$DATABASE_URL" -c "SELECT 1;" > /dev/null 2>&1 || {
    echo "❌ Failed to connect to database"
    exit 1
}
echo "✅ Connected successfully"
echo ""

# Run migration
echo "🚀 Running migration..."
psql "$DATABASE_URL" -f backend/migrations/001_lead_intelligence_schema.sql

echo ""
echo "✅ Migration completed successfully!"
echo ""
echo "📊 Verifying schema..."
psql "$DATABASE_URL" << EOF

-- Check new columns
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'contact_leads' 
AND column_name IN ('lead_type', 'status', 'priority', 'metadata', 'created_at', 'updated_at')
ORDER BY ordinal_position;

EOF

echo ""
echo "=========================================="
echo "Migration verification complete!"
echo "=========================================="
