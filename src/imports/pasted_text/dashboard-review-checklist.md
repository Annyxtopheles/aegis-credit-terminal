Review the entire dashboard design and ensure all requirements are met. Check each item below and complete anything missing:

LAYOUT VERIFICATION
Multi-page structure:

✓ Confirm each section is a separate page (Overview, Capital Structure, Covenant Compliance, Performance Analysis, Sector News)
✓ Left sidebar navigation present with only these 5 pages listed
✓ Sticky header appears on every page
✓ No Alerts, Watchlist, Reports, IPOs, or other out-of-scope items in navigation
PAGE 1: OVERVIEW - CHECKLIST
Metrics bar:

✓ 5 cards: Threat Level, Upcoming Tranche Size, Maturity Date, Net Debt/EBITDA, Debt Price
✓ No percentage change indicators (no "+2.3%") - just plain numbers
✓ Color coding: Red for violations (Debt/EBITDA >7x, Debt Price <0.95)
Debt Pricing Chart:

✓ Chart shows BOTH: Volume bars (amber) AND Debt price line (cyan with circle data points)
✓ Dual Y-axis: Left for price, Right for volume
✓ Chart title: "DEBT PRICING CHART (30 DAY)"
Below chart - 50/50 layout:

✓ Left column: Aegis Commentary panel (amber tint, left border)
✓ Right column: Largest Holders table with columns for holder names and percentage holdings
✓ Table has entity icons (🏛️ 📊) and color-coded percentages
PAGE 2: CAPITAL STRUCTURE - CHECKLIST
Content order from top to bottom:

✓ Aegis Commentary panel (full-width)
✓ Capital Structure table with columns: Instrument, Maturity Date, % EV, EBITDA Mult, Revenue Mult, Rating, Coupon, Call Provision, YTM
✓ Rating badges are colored pills (green/amber/red based on rating)
✓ Color coding on EBITDA Mult (red if >6x) and YTM (red if >7%)
✓ Four chart image placeholders in 2x2 grid labeled: "Debt/EBITDA Waterfall", "Revenue & YoY Growth", "Net Sales by Segment", "EBITDA % by Segment"
✓ Aegis Commentary panel below charts (full-width)
PAGE 3: COVENANT COMPLIANCE - CHECKLIST
Covenant rows:

✓ Exactly 2 rows only: "Net Debt / EBITDA" and "Interest Coverage Ratio"
✓ No "Fixed Charge Coverage" row
✓ Each row shows: Label, Value (actual/threshold format like "7.2 / 4.0x"), Progress bar, Status icon (✅ or ❌)
✓ Progress bars color-coded: Red if over threshold, Amber if close, Cyan if compliant
✓ Container has red border if any violations present
Below covenants:

✓ Aegis Commentary panel (full-width)
PAGE 4: PERFORMANCE ANALYSIS - CHECKLIST
✓ Four image placeholder boxes in 2x2 grid
✓ Each placeholder labeled with chart name
✓ Placeholders show "Upload Chart Image" or similar placeholder text
✓ Aegis Commentary panel below grid (full-width)
PAGE 5: SECTOR NEWS & MARKET TRENDS - CHECKLIST
Layout:

✓ Two-column layout: Sector News (left 60%), Chart + Market Trends (right 40%)
Sector News & Commentary (left):

✓ Section headers: REGULATORY, GEOPOLITICAL, POLICY (12px bold uppercase cyan)
✓ News items format: Source name (steel gray) + Headline (ice blue/cyan)
✓ Multiple news items under each category
Right column:

✓ Equity Pricing Chart at top showing BOTH: Volume bars (amber) AND Stock price line (emerald with circle data points)
✓ Chart title: "EQUITY PRICING CHART (30 DAY)"
✓ Market Trends panel below chart with cyan left border and "MARKET TRENDS" header in cyan
PAGE 6: TOP PRIORITIES & KEY EVENTS - CHECKLIST
✓ Two sections stacked vertically (NOT side-by-side)
✓ Top Priorities section: Bulleted list with cyan bullets
✓ Key Events section: List of events with NO dates or times shown - just event descriptions
✓ Both sections full-width cards
LOGIN PAGE - CHECKLIST
✓ Split-screen layout (form left, visual right)
✓ Email and password inputs
✓ "Forgot password?" link
✓ Remember me checkbox
✓ "Sign In" primary button
✓ Single SSO option: "Continue with Microsoft" button only
✓ No Google or Okta login buttons
✓ Footer: "Don't have an account? Contact Sales"
SUPER ADMIN PANEL - CHECKLIST
Left navigation includes ONLY:

✓ Company Onboarding
✓ User Management
✓ Data Upload
✓ Commentary Editor
✓ Image Uploads
✓ Top Priorities & Events
✓ Sector News Editor
✓ Market Trends Editor
Does NOT include:

✓ Platform Overview (removed)
✓ Usage Analytics (removed)
✓ Alert Management (removed)
✓ Billing (removed)
✓ Audit Logs (removed)
Company Onboarding page:

✓ Form with fields: Company Name, Company Description, Primary Email Address
✓ "Onboard Company" button
User Management page:

✓ Company selector dropdown at top
✓ Users table showing: Name, Email, Role, Status, Last Login, Actions
✓ "Invite New User" button
✓ Invite modal with: Email, Role dropdown (Super Admin/Company Admin/Normal User), Company dropdown
Data Upload page:

✓ Single upload area with "Import Data" button or drag-and-drop zone
✓ Text: "Upload Excel/CSV file to populate all dashboard data"
✓ No multiple section-specific upload buttons
Commentary Editor page:

✓ Company dropdown at top (shows one company at a time, NOT a list of all companies)
✓ Left sub-navigation with sections: Debt Pricing Commentary, Capital Structure Commentary, Covenant Compliance Commentary, Performance Analysis Commentary
✓ Click section → Text editor appears in right panel
✓ Save button for each section
Image Uploads page:

✓ Four upload slots in 2x2 grid
✓ Labeled: Debt/EBITDA Waterfall, Revenue & YoY Growth, Net Sales by Segment, EBITDA % by Segment
✓ Upload button for each slot
Top Priorities & Events Editor:

✓ Two text areas stacked vertically
✓ Top Priorities textarea with Save button
✓ Key Events textarea with Save button
Sector News Editor:

✓ Subsections or tabs: Regulatory, Geopolitical, Policy
✓ Add news item functionality for each subsection
✓ Form fields: Source name, Headline, Link URL
✓ List of existing news items with Edit/Delete options
Market Trends Editor:

✓ Rich text editor or large textarea
✓ Save button
COMPANY ADMIN PANEL - CHECKLIST
✓ Left navigation shows only: View Dashboard, User Management
✓ User Management scoped to their company only
✓ Can invite only Normal Users (not Company Admins or Super Admins)
✓ Dashboard view is read-only (cannot edit commentary or upload data)
✓ Optional: Subtle watermark "Company Portal View" at 5% opacity
NORMAL USER VIEW - CHECKLIST
✓ Access to all 5 dashboard pages (Overview, Capital Structure, Covenant Compliance, Performance Analysis, Sector News)
✓ Read-only view (no edit capabilities)
✓ No admin panel access
✓ User menu shows only: My Profile, Settings, Sign Out
VISUAL CONSISTENCY - CHECKLIST
✓ Dark mode and light mode toggle present in header
✓ Color palette consistent across all pages (Cyan accents, Red/Amber/Green alerts, proper backgrounds)
✓ Typography consistent: Inter for UI, JetBrains Mono for numbers
✓ All cards have consistent padding (20-24px), borders (1px), and border-radius
✓ Spacing follows 8px grid system
✓ All interactive elements have hover states (color shift, 200ms transition)
MISSING ELEMENTS CHECK
If ANY of the following are missing, add them now:

❗ Largest Holders table on Overview page (right column, 50% width)
❗ Debt price LINE on Debt Pricing Chart (cyan with dots, overlaid on volume bars)
❗ Stock price LINE on Equity Pricing Chart (emerald with dots, overlaid on volume bars)
❗ Company Onboarding form in Super Admin panel
❗ Single "Import Data" upload interface in Super Admin panel
❗ Commentary Editor showing one company at a time (not a list)
❗ Fixed Charge Coverage row removed from Covenant Compliance (should be only 2 rows)
❗ Removed features: Alerts, Watchlist, Reports, IPOs, Platform Overview, Usage Analytics, Alert Management, Billing, Audit Logs
FINAL ACTIONS
Review every checkbox above
Add or fix any missing/incorrect elements
Ensure all layouts match the PDF exactly (no custom additions)
Verify all 3 user roles have appropriate access levels
Confirm navigation flows correctly between pages
Check that all removed features are completely gone from the design
Complete any missing items and confirm the design is ready for client review.

