# Admin Dashboard Guide

## What You Can Do

- View all leads in a unified list
- Search and filter leads
- Update status, priority, and quality score
- Add internal notes and tags
- Flag or unflag important leads
- Export leads (CSV or JSON)
- Bulk update status or delete leads

## Data Sources

All admin data is served by the backend API under **/api/admin/**.
The dashboard communicates with these endpoints using the JWT access token.

## Common Workflows

1) **Review new leads**
   - Open the dashboard and sort by created date.

2) **Prioritize and tag**
   - Update priority and add tags to categorize leads.

3) **Follow up**
   - Add internal notes and update lead status.

4) **Export**
   - Use the export endpoint to download a CSV for external analysis.
