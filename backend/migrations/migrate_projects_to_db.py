"""
One-time migration script: projectsData.tsx → PostgreSQL `projects` table.

Usage (from the backend/ directory, with venv activated):
    python migrations/migrate_projects_to_db.py

What it does:
  1. Uses Node.js to evaluate the TSX array and output clean JSON
  2. Maps camelCase keys → snake_case columns
  3. Inserts each project into the `projects` table
  4. Prints a summary

Prerequisites:
  - The `projects` table must already exist (run 004_create_projects_table.sql first)
  - DATABASE_URL must be set in .env
  - Node.js must be available on PATH
"""

import json
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

# Allow importing from backend/
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from database import SessionLocal
from sqlalchemy import text


# ============= Configuration =============

# Path to the TSX file containing project data
TSX_FILE = Path(__file__).resolve().parent.parent.parent / "src" / "data" / "projectsData.tsx"

# camelCase (TSX) → snake_case (DB) mapping
FIELD_MAP = {
    "id":                 None,              # Skip — DB auto-generates
    "title":              "title",
    "description":        "description",
    "longDescription":    "long_description",
    "image":              "image",
    "type":               "type",
    "category":           "category",
    "role":               "role",
    "duration":           "duration",
    "tags":               "tags",
    "objectives":         "objectives",
    "technologies":       "technologies",
    "methods":            "methods",
    "results":            "results",
    "tldr":               "tldr",
    "keyImpactMetrics":   "key_impact_metrics",
    "ProblemStatement":   "problem_statement",
    "LiteratureReview":   "literature_review",
    "codeSnippet":        "code_snippet",
    "standings":          "standings",
    "company":            "company",
    "githubLink":         "github_link",
    "articleLink":        "article_link",
    "liveDemoLink":       "live_demo_link",
    "coreStack":          "core_stack",
    "tools":              "tools",
    "implementation":     "implementation",
    "discussion":         "discussion",
    "conclusion":         "conclusion",
    "limitations":        "limitations",
    "futureWork":         "future_work",
    "references":         "references",
    "acknowledgements":   "acknowledgements",
    "challenges":         "challenges",
    "solutions":          "solutions",
    "galleryImages":      "gallery_images",
    "similarProjectIds":  "similar_project_ids",
}


# ============= Step 1: Extract projects using Node.js =============

def extract_projects_from_tsx(tsx_path: Path) -> list:
    """
    Use Node.js to natively parse the JS object array from the TSX file.
    This is far more reliable than regex-based JS→JSON conversion.
    """
    content = tsx_path.read_text(encoding="utf-8")

    # Find the array literal
    match = re.search(
        r"export\s+const\s+projects\s*:\s*Project\[\]\s*=\s*\[",
        content,
    )
    if not match:
        raise ValueError("Could not find `export const projects: Project[] = [` in TSX file")

    start = match.end() - 1  # include opening [
    depth = 0
    end = start
    for i in range(start, len(content)):
        if content[i] == "[":
            depth += 1
        elif content[i] == "]":
            depth -= 1
            if depth == 0:
                end = i + 1
                break

    array_text = content[start:end]

    # Write a small Node.js script that evaluates the array and prints JSON
    node_script = f"""
// Stub out local image imports
const portfolioimg = "LOCAL_IMAGE:myDataSciencePortfolio.png";
const cheaimg = "LOCAL_IMAGE:ChemicalEngineeringAssociation.png";

const data = {array_text};
console.log(JSON.stringify(data, null, 0));
"""

    # Write to temp file and execute with Node
    with tempfile.NamedTemporaryFile(mode="w", suffix=".js", delete=False, encoding="utf-8") as f:
        f.write(node_script)
        temp_path = f.name

    try:
        result = subprocess.run(
            ["node", temp_path],
            capture_output=True,
            text=True,
            timeout=15,
        )
        if result.returncode != 0:
            print(f"Node.js error:\n{result.stderr}")
            raise RuntimeError("Node.js failed to parse the TSX array")

        projects = json.loads(result.stdout)
    finally:
        os.unlink(temp_path)

    return projects


# ============= Step 2: Map to DB columns =============

def map_project_to_db_row(project: dict) -> dict:
    """Convert a camelCase project dict to a snake_case DB row dict."""
    row = {}
    for tsx_key, db_col in FIELD_MAP.items():
        if db_col is None:
            continue  # skip (e.g., id)
        value = project.get(tsx_key)
        if value is not None:
            # JSONB columns: arrays need to be JSON strings for the INSERT
            if isinstance(value, (list, dict)):
                row[db_col] = json.dumps(value, ensure_ascii=False)
            else:
                row[db_col] = value
    return row


# ============= Step 3: Insert into DB =============

def insert_projects(rows: list[dict]) -> int:
    """Insert project rows into the `projects` table. Returns count inserted."""
    db = SessionLocal()
    inserted = 0
    try:
        for row in rows:
            columns = ", ".join(f'"{k}"' for k in row.keys())
            placeholders = ", ".join(f":{k}" for k in row.keys())
            sql = text(f'INSERT INTO projects ({columns}) VALUES ({placeholders})')
            db.execute(sql, row)
            inserted += 1
        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()
    return inserted


# ============= Main =============

def main():
    print("=" * 60)
    print("Project Data Migration: projectsData.tsx → PostgreSQL")
    print("=" * 60)

    # Step 1: Extract from TSX
    print(f"\n[1/4] Reading TSX file: {TSX_FILE}")
    if not TSX_FILE.exists():
        print(f"  ERROR: File not found: {TSX_FILE}")
        sys.exit(1)

    projects = extract_projects_from_tsx(TSX_FILE)
    print(f"  Found {len(projects)} projects in TSX file")

    if not projects:
        print("  No projects to migrate. Exiting.")
        sys.exit(0)

    # Step 2: Map to DB format
    print("\n[2/4] Mapping camelCase → snake_case columns...")
    rows = [map_project_to_db_row(p) for p in projects]
    print(f"  Mapped {len(rows)} projects")

    # Preview first project
    print(f"\n  Preview (first project):")
    for k, v in rows[0].items():
        display = str(v)[:80] + "..." if len(str(v)) > 80 else str(v)
        print(f"    {k}: {display}")

    # Step 3: Check existing data
    print("\n[3/4] Checking database...")
    db = SessionLocal()
    result = db.execute(text("SELECT COUNT(*) FROM projects"))
    existing_count = result.scalar()
    db.close()
    print(f"  Existing projects in DB: {existing_count}")

    if existing_count > 0:
        answer = input(f"\n  ⚠️  Table already has {existing_count} rows. Continue inserting? (y/N): ").strip().lower()
        if answer != "y":
            print("  Aborted.")
            sys.exit(0)

    # Step 4: Insert
    print(f"\n[4/4] Inserting {len(rows)} projects into database...")
    count = insert_projects(rows)
    print(f"  ✅ Successfully inserted {count} projects!")

    # Verify
    db = SessionLocal()
    result = db.execute(text("SELECT id, title FROM projects ORDER BY id"))
    print("\n  Final state:")
    for row in result:
        print(f"    #{row[0]}: {row[1]}")
    db.close()

    print("\n" + "=" * 60)
    print("Migration complete!")
    print("=" * 60)
    print("\nNext steps:")
    print("  1. Verify data in the admin panel or directly in Neon console")
    print("  2. Check that LOCAL_IMAGE_PLACEHOLDER entries are updated")
    print("     with actual hosted image URLs")
    print("  3. When ready, swap JSONProjectRepository → DatabaseProjectRepository")
    print("     in backend/services/project_service.py")


if __name__ == "__main__":
    main()
