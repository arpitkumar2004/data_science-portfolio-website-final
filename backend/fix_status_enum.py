"""
Quick fix script to update 'new' status values to 'unread'
Run this script to fix the enum mismatch error
"""
import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    print("❌ ERROR: DATABASE_URL not found in .env file")
    exit(1)

print(f"🔌 Connecting to database...")

try:
    engine = create_engine(DATABASE_URL)
    
    with engine.connect() as conn:
        # First, check how many rows have 'new' status
        result = conn.execute(text("""
            SELECT COUNT(*) as count 
            FROM contact_leads 
            WHERE status::text = 'new'
        """))
        count = result.fetchone()[0]
        
        print(f"📊 Found {count} leads with status='new'")
        
        if count > 0:
            # Temporarily add 'new' to enum if needed
            print("🔧 Temporarily adding 'new' to enum...")
            try:
                conn.execute(text("""
                    ALTER TYPE lead_status ADD VALUE IF NOT EXISTS 'new'
                """))
                conn.commit()
            except Exception as e:
                print(f"⚠️  Note: {e}")
            
            # Update all 'new' to 'unread'
            print(f"🔄 Updating {count} leads from 'new' to 'unread'...")
            conn.execute(text("""
                UPDATE contact_leads
                SET status = 'unread'::lead_status
                WHERE status::text = 'new'
            """))
            conn.commit()
            
            # Verify the fix
            result = conn.execute(text("""
                SELECT COUNT(*) as count 
                FROM contact_leads 
                WHERE status::text = 'new'
            """))
            remaining = result.fetchone()[0]
            
            if remaining == 0:
                print(f"✅ Successfully fixed all {count} leads!")
                print("✅ All status values are now valid enum values")
            else:
                print(f"⚠️  Warning: {remaining} leads still have 'new' status")
        else:
            print("✅ No leads with 'new' status found. Database is clean!")
            
except Exception as e:
    print(f"❌ ERROR: {e}")
    print("\nPlease check your DATABASE_URL and ensure the database is accessible")
    exit(1)

print("\n✨ Fix complete! You can now start your application.")
