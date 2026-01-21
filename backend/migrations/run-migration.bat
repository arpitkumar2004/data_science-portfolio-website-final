@echo off
REM Database Migration Script for Lead Intelligence Stack (Windows)
REM Usage: run-migration.bat

setlocal enabledelayedexpansion

echo ==========================================
echo Lead Intelligence Schema Migration
echo ==========================================
echo.

REM Check if psql is available
where psql >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: psql not found. Please install PostgreSQL client tools.
    echo Download from: https://www.postgresql.org/download/
    exit /b 1
)

REM Get database URL from environment or ask user
if "!DATABASE_URL!"=="" (
    echo Warning: DATABASE_URL not set in environment.
    echo For Neon: Use SQL Editor in console.neon.tech instead
    echo.
    echo Or set DATABASE_URL and run:
    echo set DATABASE_URL=postgresql://user:password@host/dbname
    echo run-migration.bat
    exit /b 1
)

echo Using database from: DATABASE_URL
echo.

REM Check connection
echo Checking database connection...
psql "!DATABASE_URL!" -c "SELECT 1;" >nul 2>&1
if errorlevel 1 (
    echo Error: Failed to connect to database
    exit /b 1
)
echo Connected successfully
echo.

REM Run migration
echo Running migration...
psql "!DATABASE_URL!" -f backend\migrations\001_lead_intelligence_schema.sql

if errorlevel 1 (
    echo.
    echo Error: Migration failed
    exit /b 1
)

echo.
echo Migration completed successfully!
echo.
echo Verifying schema...
psql "!DATABASE_URL!" << EOF

SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'contact_leads' 
AND column_name IN ('lead_type', 'status', 'priority', 'metadata', 'created_at', 'updated_at')
ORDER BY ordinal_position;

EOF

echo.
echo ==========================================
echo Migration verification complete!
echo ==========================================
echo.
