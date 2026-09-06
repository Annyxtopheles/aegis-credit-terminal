Design a complete authentication and role-based dashboard system for the ICR Surveillance Platform. This is an enterprise B2B SaaS product serving institutional investors, credit analysts, and corporate treasury teams. The system requires secure login, role-based access control, and customized dashboard views based on user permissions and use cases.

---

USER ROLES & ACCESS LEVELS:

1. ANALYST (Buy-Side Investor)
- Full access to all debt surveillance dashboards
- Can view all companies in their portfolio
- Export capabilities: Charts, tables, PDF reports
- Can create custom watchlists and alerts
- Can add private annotations and notes
- Access to: Real-time pricing, holder data, ICR commentary, covenant tracking

2. SENIOR ANALYST / PORTFOLIO MANAGER
- Everything Analyst has, PLUS:
- Multi-company portfolio overview dashboard
- Team collaboration features (shared notes, alerts)
- Advanced scenario modeling tools
- Access to historical data (5+ years)
- Priority support and custom research requests
- Can invite team members (up to seat limit)

3. CORPORATE USER (Company-Side: CFO, Treasurer, IR)
- Limited to viewing their own company's dashboard only
- See how market perceives their debt (pricing, holder movements)
- Cannot see: ICR internal commentary, competitive intelligence, other companies
- Can see: Public holder data, debt pricing, covenant status, news mentions
- Read-only access (no exports of sensitive ICR analysis)
- Custom "Company Portal" view with investor relations focus

4. CREDIT RESEARCH ASSOCIATE (Sell-Side)
- Similar to Analyst but sector-focused
- Access limited to specific sectors (e.g., Consumer Goods, Industrial)
- Can view multiple clients' companies for comp analysis
- Cannot export raw holder data (licensing restrictions)
- Can create client-facing presentation exports (sanitized data)

5. ADMIN (Internal ICR Staff)
- Full system access to all companies and data
- User management (invite, remove, change permissions)
- Usage analytics dashboard (who's viewing what, engagement metrics)
- Can edit ICR commentary and flag critical alerts
- Billing and subscription management
- Audit logs for compliance

6. READ-ONLY / TRIAL USER
- Limited to 3 company views per month
- Cannot export data
- Cannot set custom alerts
- See truncated commentary ("Upgrade to see full analysis")
- Watermarked charts
- 14-day access expiration

---

AUTHENTICATION PAGES:

1. LOGIN PAGE

Visual Design:
- Split-screen layout (50/50 on desktop)
- Left side: Login form
- Right side: Full-bleed image or abstract financial visualization (dark, sophisticated)

Left Panel (Login Form):
- ICR logo: Top-left, 32px height
- Heading: "Welcome Back" in 32px Bold, Charcoal (light mode) / White (dark mode)
- Subheading: "Sign in to access your surveillance dashboard" in 16px Regular, Slate

Form Fields:
- Email input:
  - Label: "Email Address" in 14px Medium
  - Placeholder: "analyst@firm.com"
  - Height: 48px, 16px padding, 1px border, 8px border-radius
  - Border color: Light Border (#E5E7EB) default, Deep Cyan on focus
  - Error state: Red border + "Invalid email format" text below
- Password input:
  - Label: "Password" in 14px Medium
  - Show/hide toggle icon (eye icon, right side)
  - Same styling as email
  - "Forgot password?" link in 14px, Deep Cyan, right-aligned below field

Remember Me Checkbox:
- 16px checkbox with "Remember me for 30 days" label
- Positioned left-aligned below password

Primary CTA Button:
- Text: "Sign In"
- Style: Full-width, 48px height, Deep Cyan (#0891B2) background, White text, 16px Semi-Bold
- Hover: Darker Cyan (#0E7490), subtle lift effect (2px translate-y)
- Loading state: Spinner replaces text, button disabled

Divider:
- "Or continue with" text centered with horizontal lines on each side

SSO Options (if applicable):
- Three buttons in row: "Google", "Microsoft", "Okta"
- Style: 48px height, white background, 1px border, icon + text
- Equal width, 8px gap between

Footer Links:
- "Don't have an account? Contact Sales" in 14px
- "Contact Sales" is Deep Cyan link
- Privacy Policy | Terms of Service (small links, 12px, Medium Gray)

Right Panel (Brand/Visual):
- Dark gradient background (#0A1628 to #1A2332)
- Overlay text: 
  - "Track $2.1T in distressed debt across 500+ companies"
  - "Real-time covenant monitoring and holder intelligence"
  - "Trusted by 40+ institutional investors"
- Small stat cards with key platform metrics (animated counter effect)

Mobile/Tablet:
- Single column, form on top
- Right panel becomes slim header banner (120px height) with logo + tagline
- Form takes full width with 24px side margins


2. FORGOT PASSWORD PAGE

Layout:
- Same split-screen design as login
- Left panel content changes:

Heading: "Reset Your Password"
Subheading: "Enter your email and we'll send you a reset link"

Form:
- Email input (same styling as login)
- Primary button: "Send Reset Link"
- Success state: "Check your email for reset instructions" message with green checkmark icon
- Back to login link: "← Back to Sign In" in Deep Cyan

Right panel: Same as login


3. SET NEW PASSWORD PAGE (from email link)

Heading: "Create New Password"
Subheading: "Choose a strong password for your account"

Form Fields:
- New Password input
  - Password strength meter below (weak/medium/strong visual bar)
  - Requirements checklist:
    - ✓ At least 12 characters
    - ✓ One uppercase letter
    - ✓ One number
    - ✓ One special character
- Confirm Password input
  - Error if doesn't match: "Passwords do not match"

Primary button: "Reset Password"
Success: Redirect to login with "Password reset successful" toast notification


4. TWO-FACTOR AUTHENTICATION (2FA) PAGE

Triggered after successful email/password entry if 2FA enabled

Heading: "Verify Your Identity"
Subheading: "Enter the 6-digit code from your authenticator app"

Form:
- 6 individual input boxes (one digit each)
  - Auto-focus on first box, auto-advance on entry
  - Style: 56px x 56px boxes, centered, 8px gap between
  - Large font (24px Bold Mono) for digits
  - Deep Cyan border on active box

Alternative methods:
- "Didn't receive code? Send via SMS" link
- "Use backup code" link

Primary button: "Verify & Continue"

Trust this device checkbox:
- "Trust this device for 30 days"


5. SIGN UP PAGE (New User Registration)

Only accessible if user has received invite link from Admin

Heading: "Create Your Account"
Subheading: "You've been invited to join [Firm Name]'s ICR workspace"

Form Fields:
- Full Name input
- Email (pre-filled from invite, disabled)
- Create Password input (with strength meter)
- Confirm Password input
- Job Title input (optional)
- Phone Number input (for 2FA, optional)

Terms Agreement:
- Checkbox: "I agree to the Terms of Service and Privacy Policy"
- Links open in modal overlay

Primary button: "Create Account"
Success: Redirect to onboarding flow


6. EXPIRED SESSION / TIMEOUT PAGE

Full-screen modal overlay on dashboard:
- Icon: ⏰ Clock or 🔒 Lock icon (48px)
- Heading: "Session Expired"
- Message: "For your security, you've been logged out after 30 minutes of inactivity."
- Primary button: "Log Back In" (redirects to login, preserves last viewed page)
- Secondary button: "Learn about security" (link to help article)

---

ROLE-BASED DASHBOARD VIEWS:

1. ANALYST DASHBOARD (Default View)

Layout: Full access as designed in previous prompts
- Global header with navigation
- Threat banner (if applicable)
- Metrics command bar
- All charts, tables, commentary visible
- No restrictions

Additional UI Elements:
- Top-right user menu:
  - Profile photo/initials avatar
  - Dropdown: My Profile, Settings, Watchlists, Export History, Sign Out
- Left sidebar navigation (collapsible):
  - 📊 Portfolio Overview
  - 🔍 Company Search
  - ⭐ Watchlist (12) - with count badge
  - 🔔 Alerts (3) - with red notification badge
  - 📁 Saved Reports
  - 👥 Team (if Portfolio Manager)


2. PORTFOLIO MANAGER - MULTI-COMPANY VIEW

New Dashboard: Portfolio Overview (landing page)

Grid Layout:
- Shows 12-20 companies in card grid
- Each company card (compact):
  - Company name + ticker
  - Threat level badge (Elevated/Moderate/Low)
  - Key metrics in small text: Debt Price, Net Debt/EBITDA, Days to Maturity
  - Sparkline chart (30-day debt pricing trend, 80px wide)
  - Quick action buttons: View Full Dashboard, Add Note, Set Alert

Filters/Sort:
- Top bar: Filter by Threat Level, Sector, Maturity Date
- Sort: Threat Level (default), Debt Price Change, Alphabetical
- Search: Company name or ticker

Summary Stats Card (top):
- Total portfolio exposure: $2.4B
- Companies in violation: 3
- Avg debt price: $0.92
- Upcoming maturities (next 90 days): 7

Click any company card → Drills into single-company detailed dashboard


3. CORPORATE USER (Company-Side) - RESTRICTED VIEW

Custom "Investor Relations Portal" Layout:

Top Banner (replaces threat banner):
- Background: Deep Cyan gradient
- Text: "B&G Foods Investor Relations Dashboard"
- Icon: 🏢 Building icon
- No threat level exposed (sensitive)

Visible Sections:
✅ Metrics bar: Debt Price, Upcoming Maturity, Net Debt/EBITDA (public info)
✅ Debt Pricing Chart (30-day)
✅ Equity Pricing Chart
✅ Capital Structure Table (basic info only: instruments, maturities, coupons)
✅ Largest Holders Table (shows public 13F data only, no ICR proprietary holder intelligence)
✅ Covenant Compliance (if disclosed publicly)
✅ Sector News & Commentary (only news mentions, not ICR internal analysis)

Hidden/Removed Sections:
❌ ICR Commentary panels (proprietary analysis)
❌ Market Trends (competitive intelligence)
❌ Top Priorities (internal ICR strategy)
❌ Holder trading patterns and engagement ratings (proprietary)
❌ Export functions (watermarked view only)

Watermark:
- Subtle "B&G Foods IR Portal View" text at 5% opacity diagonally across background

Special Features for Corporate Users:
- "Request Meeting" button in header → Opens contact form to ICR team
- "Download IR Presentation" button → Generates sanitized PDF
- "Peer Comparison" view → See how their metrics compare to sector averages (anonymized)


4. TRIAL / READ-ONLY USER - LIMITED ACCESS

Dashboard Modifications:

Blur/Lock Overlays:
- Commentary panels: Blurred with overlay
  - Lock icon 🔒
  - Text: "Upgrade to ICR Pro to unlock full analyst commentary"
  - "View Plans" button
- Holder distribution charts: First 3 holders visible, rest blurred
- Export buttons: Disabled with tooltip "Available in paid plans"

Company Access Counter:
- Top banner: "You've viewed 2 of 3 companies this month. Upgrade for unlimited access."
- Progress bar showing 2/3

Watermarks:
- "ICR Trial Mode" text at 10% opacity on all charts

Upgrade CTAs:
- Persistent banner at top: "Unlock full access to 500+ companies. Start your subscription today." + CTA button
- Modal on 3rd company view: "Trial limit reached. Subscribe to continue."


5. ADMIN DASHBOARD

Special Admin-Only View:

Left Sidebar Navigation:
- 🏠 Platform Overview
- 👥 User Management
- 🏢 Organization Settings
- 📊 Usage Analytics
- 💬 Commentary Editor
- 🔔 Alert Management
- 💰 Billing & Subscriptions
- 📋 Audit Logs

User Management Page:
- Table of all users:
  - Columns: Name, Email, Role, Status (Active/Inactive), Last Login, Actions
  - Actions: Edit Role, Suspend, Delete, View Activity
- "Invite New User" button (top-right)
  - Modal: Email input, Role dropdown, Seat allocation, Expiration date

Invite Modal:
- Email address input
- Role dropdown: Analyst | Senior Analyst | Corporate | Admin
- Access scope: "All companies" or "Select specific companies" (multi-select)
- Expiration: Dropdown (No expiration, 30 days, 90 days, Custom date)
- Send button

Usage Analytics Dashboard:
- Top stats: Total users, Active users (7-day), Avg session duration, Total companies tracked
- Charts:
  - Daily active users (line chart, 30 days)
  - Most viewed companies (bar chart)
  - Feature usage (exports, alerts set, annotations made)
  - User engagement by role (table)

Commentary Editor:
- List of all companies
- Click company → Opens commentary panel editor
  - Rich text editor for adding/editing ICR commentary bullets
  - Publish button with timestamp
  - Version history

Audit Logs:
- Searchable table:
  - Timestamp, User, Action (Login, Export, Edit, Delete), IP Address, Details
  - Filters: Date range, User, Action type
  - Export to CSV for compliance

---

NAVIGATION & USER MENU:

Global Header (All Logged-In Users):

Left Side:
- ICR logo (clickable, returns to home/portfolio view)
- Company selector dropdown (if in single-company view)
  - Search companies: "Type to search 500+ companies..."
  - Recently viewed (max 5)
  - Watchlist shortcut

Center (optional):
- Main navigation tabs (if Portfolio Manager):
  - Portfolio | Watchlist | Alerts | Research

Right Side:
- Theme toggle (sun/moon icon)
- Notifications bell icon 🔔 with badge count
  - Dropdown: List of recent alerts and system notifications
- User avatar (initials or photo, 36px circle)
  - Dropdown menu:
    - [Name] • [Role] (gray text)
    - Divider
    - 👤 My Profile
    - ⚙️ Settings
    - 📁 Export History
    - 💳 Billing (if Admin)
    - 📚 Help & Support
    - 🚪 Sign Out

Settings Page (accessible from user menu):

Tabs: Profile | Security | Notifications | Preferences

Profile Tab:
- Profile photo upload
- Name, Email (non-editable), Job Title, Phone
- Company/Organization name
- Save changes button

Security Tab:
- Change password button
- Two-factor authentication toggle (on/off with setup flow)
- Active sessions list (device, location, last active) with "Sign out" option
- API keys (for programmatic access, if applicable)

Notifications Tab:
- Email preferences:
  - □ Daily digest of watchlist updates
  - □ Immediate alerts for covenant violations
  - □ Weekly portfolio summary
  - □ Product updates and new features
- Push notifications toggle (browser)
- Alert thresholds: Debt price change >X%, Holder position change >Y%

Preferences Tab:
- Default view: Portfolio Overview or Last Viewed Company
- Default theme: Light | Dark | Auto (system preference)
- Date format: MM/DD/YYYY or DD/MM/YYYY
- Number format: US (1,000.00) or EU (1.000,00)
- Timezone: Auto-detect or manual selection

---

ONBOARDING FLOW (First-Time Users):

After successful account creation, guide new users:

Welcome Modal (full-screen overlay):
- Step 1: "Welcome to ICR Surveillance"
  - Brief explainer: "Track distressed debt, monitor covenants, and analyze holder behavior."
  - "Let's get you set up" CTA

- Step 2: "Add Companies to Your Watchlist"
  - Search bar: "Search 500+ companies..."
  - Suggested companies based on role/sector
  - "Add to Watchlist" buttons
  - Skip option: "I'll do this later"

- Step 3: "Set Your First Alert"
  - Quick alert setup: Select company, metric (Debt Price, Covenant), threshold
  - "Create Alert" or "Skip for now"

- Step 4: "You're All Set!"
  - Summary: X companies in watchlist, Y alerts configured
  - CTA: "Go to Dashboard"
  - Optional: "Take a Product Tour" (interactive walkthrough)

Progress Indicator:
- 4 dots at bottom, current step highlighted in Deep Cyan
- "Skip Setup" link in top-right

---

EMPTY STATES:

Portfolio View (No Companies):
- Icon: 📊 large centered icon
- Heading: "Your portfolio is empty"
- Message: "Add companies to start tracking debt positions and covenant compliance."
- Primary CTA: "Search Companies"

Watchlist (Empty):
- Icon: ⭐
- Heading: "No companies in your watchlist"
- Message: "Star companies you want to monitor closely."
- Link: "Browse all companies"

Alerts (None Set):
- Icon: 🔔
- Heading: "No active alerts"
- Message: "Set alerts to get notified when key metrics change."
- Primary CTA: "Create Alert"

---

RESPONSIVE BEHAVIOR:

Mobile (< 768px):
- Login: Full-screen form, no split-screen
- Dashboard: Hamburger menu for navigation
- User avatar menu: Bottom navigation bar (Home, Watchlist, Alerts, Profile)
- Tables: Card-based view
- Charts: Full-width, stacked

Tablet (768-1024px):
- Login: Maintain split-screen
- Dashboard: Collapsible sidebar
- Portfolio grid: 2 columns instead of 4

---

LOADING & ERROR STATES:

Initial Dashboard Load:
- Skeleton screens for all components (pulsing gray shapes)
- Load order: Header → Metrics → Charts → Tables
- Progress bar at top (thin line, Deep Cyan)

Failed Data Load:
- Chart area shows: "Unable to load data" with retry button
- Toast notification: "Connection lost. Retrying..." (auto-dismiss)

Session Timeout Warning:
- Modal appears 2 minutes before timeout
- "You'll be logged out in 2:00 due to inactivity"
- Countdown timer
- "Stay Logged In" button (extends session)

---

SECURITY FEATURES:

Login Attempt Limits:
- After 5 failed attempts: "Too many attempts. Try again in 15 minutes."
- Option: "Reset password" or "Contact support"

IP Allowlisting (Enterprise):
- Admin can restrict access to specific IP ranges
- Blocked user sees: "Access denied from this location. Contact your administrator."

Session Management:
- Max 3 concurrent sessions per user
- Attempting 4th login: "Max sessions reached. Sign out from another device or continue here."
- Shows active sessions with "Sign out" buttons

Password Requirements:
- Minimum 12 characters
- 1 uppercase, 1 lowercase, 1 number, 1 special character
- Cannot reuse last 5 passwords
- Expires every 90 days (configurable)

---

EXPORT PERMISSIONS:

By Role:
- Analyst: Full exports (PDF, Excel, PNG)
- Corporate User: Watermarked PDF only
- Trial User: No exports (shows "Upgrade" message)

Export Modal:
- Appears when user clicks export button
- Options: Format (PDF/Excel/PNG), Date range, Include commentary (checkbox)
- Watermark toggle (Admin only can remove)
- "Export" button generates file

Export History Page:
- Table: Filename, Date, Format, Company, Download link
- Auto-delete after 30 days
- "Delete All" option

---

VISUAL CONSISTENCY ACROSS ALL PAGES:

Color System (Both Themes):
- Use same design tokens from main dashboard
- All buttons, inputs, cards follow established patterns
- Maintain 8px spacing grid everywhere

Typography:
- Same Inter + JetBrains Mono font stack
- Consistent heading hierarchy (32px, 24px, 20px, 16px, 14px)
- Form labels always 14px Medium

Component Reuse:
- Buttons: Primary (Deep Cyan fill), Secondary (outline), Tertiary (text-only)
- All 48px height, 8px border-radius
- Inputs: 48px height, 16px padding, 8px border-radius
- Consistent hover/focus states across all interactive elements

---

ACCESSIBILITY (All Pages):

- Keyboard navigation: Tab through all interactive elements
- Focus indicators: 2px Deep Cyan outline on all focusable elements
- ARIA labels on icons and icon-only buttons
- Form validation: Clear error messages, linked to inputs via aria-describedby
- Screen reader announcements for dynamic content (loading states, errors)
- Color never sole indicator (always pair with icon/text)
- Minimum touch target: 44x44px on mobile

---

Deliver a complete multi-user authentication system with role-based dashboards that maintain the terminal-grade financial intelligence aesthetic while providing appropriate access controls and user experiences tailored to each persona's needs.


