# Usage Guide

## Public Portfolio

- **Home / Projects / About / Contact** are accessible from the main navigation.
- **Contact Form** submits to the backend and stores a lead.
- **Request CV** sends a CV request and triggers an email flow.

## Documentation

- Visit **/docs** to browse the in-app documentation.
- Each item in the sidebar is a markdown file under public/docs.

## Admin Access

There are two admin experiences:

1) **Inline Admin Route:**
   - Route: **/admin** inside the portfolio app.
   - Requires valid admin auth (JWT).

2) **Dedicated Admin Panel App:**
   - Separate frontend in admin-panel.
   - Uses the same backend admin APIs.

For login details and security flow, see Admin Panel → **Admin Access**.
