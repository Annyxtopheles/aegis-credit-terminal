# Apex Brands Group Aegis Credit Terminal — Comprehensive Product Brief

## Product Identity & Vision

**Product name:** Aegis (Investor/Credit Relations) Surveillance Dashboard
**Primary subject company:** Apex Brands Group, Inc. (NYSE: APX) — a U.S. packaged food company currently in financial distress with two active covenant violations, an ongoing divestiture of its Verdant Harvest brand assets, and near-term debt maturities beginning September 2027.

**Core purpose:** A high-density, real-time financial intelligence SaaS platform that gives institutional credit investors, portfolio managers, and Investor Relations professionals a Bloomberg Terminal–style command center for monitoring a single company's debt posture, covenant health, capital structure, holder movements, and macro sector risk — all in one unified view.

**Market category:** B2B FinTech / Credit Surveillance SaaS. Positioned between a Bloomberg Terminal (raw data, no curation) and a traditional IR portal (marketing-first, investor-last). Aegis fills the gap with curated, editable intelligence at an institutional quality level.

**Emotional design goal:** Confidence under pressure. The interface should feel like sitting at a trading desk at 6am — precise, alert, no waste. Every pixel earns its place. The dashboard should communicate gravity without being panicky, and analytical rigor without being cold.

---

## Visual Language & Aesthetic

### Theme: Bloomberg Terminal Dark
- **Primary background:** deep navy `#0A0E1A` (near-black blue)
- **Secondary surfaces:** `#0F1629` (panels, cards)
- **Tertiary / elevated surfaces:** `#141D35` (table rows, inner containers)
- **Zebra rows:** `#0D1526`
- **Borders:** `#1E2D4A` (primary), `#162038` (subtle)
- **Accent / brand cyan:** `#06B6D4` — used for active nav states, chart lines, left-border highlights, interactive elements
- **Brand orange:** `#FF6B35` — Aegis logo accent color
- **Alert red:** `#EF4444`
- **Alert amber:** `#F59E0B`
- **Alert green:** `#10B981`
- **Text hierarchy:** `#E2E8F0` (primary) → `#94A3B8` (secondary) → `#475569` (tertiary/muted)

### Light theme counterparts
- Background: `#F8FAFC`, surfaces `#FFFFFF` / `#F1F5F9`
- Accent: `#0891B2`, borders `#E2E8F0`

### Typography
- **Body / UI:** Inter (Google Fonts) — clean, neutral, professional
- **Numeric data / tickers / OTP / terminal values:** JetBrains Mono — monospaced precision for financial figures, prevents digit-width jitter in live data contexts
- **Scale:** tight line heights, small base sizes (11–13px for data-dense tables), 14–16px for readable body, 18–24px for section headers

### Design psychology
The dark navy palette is a deliberate choice from Bloomberg/Reuters terminal culture: it reduces eye fatigue during long sessions, creates contrast that makes color-coded alerts (red/amber/green) pop without aggression, and signals "institutional grade" to the target user who already lives in terminal UIs. Cyan as accent reads as "live data" rather than "website blue." The consistent amber-left-border on commentary panels creates a visual metaphor of a sticky note or analyst annotation — human intelligence layered on top of raw data.

---

## Architecture Overview

### Tech Stack
- **React 18** with TypeScript
- **React Router v7** (`createBrowserRouter`) for client-side routing
- **Recharts** for all interactive charts (ComposedChart, BarChart, LineChart)
- **Tailwind CSS v4** for utility classes (with `@theme inline` token mapping)
- **shadcn/ui** component library (Radix UI primitives) — installed but used primarily for standard form controls; custom components use inline style props with the `colors.ts` token system
- **CSS custom properties** in `theme.css` for shadcn compatibility
- **Google Fonts** (Inter + JetBrains Mono) via `fonts.css`
- **No backend** — all data is hardcoded; auth is mock with `sessionStorage`

### State Management
- React Context only: `AuthContext`, `SidebarContext`, `ThemeContext`
- No Redux, Zustand, or external state libraries
- Session persisted in `sessionStorage` under key `'aegis-user'`
- Theme persisted in `localStorage` under key `'dashboard-theme'`

### Styling Architecture (dual system)
1. **Custom `colors.ts` token object** (`src/app/theme/colors.ts`): used by all custom dashboard components via inline `style={{ color: colors[theme].textPrimary }}` pattern. Exports `colors.dark` and `colors.light` objects with ~20 semantic tokens each, plus `ratingBadges` for credit rating badge variants.
2. **CSS custom properties** (`src/styles/theme.css`): shadcn/ui token contract (`--background`, `--foreground`, `--border`, etc.), mapped to Tailwind via `@theme inline`. Preserved for library compatibility.

---

## Authentication System

### Roles (3-tier RBAC)

| Role key | Display name | Access |
|---|---|---|
| `super_admin` | Aegis Admin | Full access to all dashboard pages + Admin Console with all tabs + company switcher + Preview/Dashboard toggle |
| `company_admin` | Company Admin | All 5 dashboard pages + User Management page |
| `normal_user` | User | Read-only access to all 5 dashboard pages |

### Mock credentials
- `admin@aegisterminal.com` / `password123` → `super_admin`, 2FA enabled (code `123456`)
- `admin@bgfoods.com` / `password123` → `company_admin` (Apex Brands Group)
- `user@bgfoods.com` / `password123` → `normal_user`
- `pm@hedgefund.com` / `password123` → `normal_user`
- `cfo@bgfoods.com` / `password123` → `normal_user`

### Auth features
- 5-attempt lockout (UI-level only)
- Session timeout at 30 minutes idle, warning at 28 minutes (countdown modal with "Stay Logged In" / "Log Out" actions)
- 2FA: 6-digit OTP entry page with individual digit boxes, paste support, auto-submit on last digit; pre-filled after 500ms for demo convenience
- Invite-based signup flow (pre-filled email disabled, password strength meter with 4 requirements: 12+ chars, uppercase, number, special char)
- Forgot password / reset password flows (simulated with delays)
- Auth pages: two-column layout — left form panel, right `AuthRightPanel` with animated stat counters ($2.1T debt tracked, 500+ companies, 40+ institutions, 127 covenant violations), floating sparkline SVGs, SOC 2 disclaimer

---

## Layout System

### Global Layout: `DashboardLayout`
- **Left sidebar** (fixed): `NewSidebar.tsx` — 280px expanded, 80px icon-only collapsed
- **Main content area**: shifts right via `marginLeft` to avoid sidebar overlap; scrollable

### `NewSidebar.tsx` — Feature-rich left navigation
The sidebar is the primary navigation and control center:

1. **Header**: Aegis logo (orange "Aegis" text + subtitle) + collapse toggle arrow button
2. **Aegis Admin only — Mode toggle**: "Dashboard" / "Preview" toggle switch. In Dashboard mode, the super_admin sees the Admin Console nav. In Preview mode, they see the same nav as a normal user (for QA / previewing the client experience)
3. **Aegis Admin only — Company selector**: dropdown with search field; 3 companies available: Apex Brands Group (APX), Chef Solutions (CHEF), Sprouts Farmers Market (SFM). Selecting a company simulates switching the data context (visual only currently)
4. **Navigation items**: role-contextual (see Role table above). Active nav item has a left cyan border `3px solid #06B6D4` and slightly lighter background. Icons from `lucide-react`
5. **Bottom section**:
   - Theme toggle button (Sun/Moon icon, cycles dark/light)
   - User profile area: avatar circle (initials), name, role badge, popover on click with "Account Settings" link and "Sign Out" button

### Admin Console navigation items (super_admin, Dashboard mode)
All route to `/admin?tab=<tabname>`:
- Onboarding (Building icon)
- Users (Users icon)
- Commentary (FileText icon)
- Data Upload (Upload icon)
- Charts Upload (Image icon)
- Priorities & Events (Target icon)
- Sector News & Commentary (Newspaper icon)
- Market Trends (TrendingUp icon)

### Dashboard navigation items (all roles viewing dashboard)
All route to `/dashboard/*`:
- Overview (LayoutDashboard icon)
- Capital Structure (Building2 icon)
- Covenant Compliance (Shield icon)
- Priorities & Events (Target icon)
- Sector News (Newspaper icon)
- [Company Admin only] User Management (Users icon)

---

## Dashboard Pages (Client-Facing)

All dashboard pages share a sticky compound header:

### `ThreatBanner`
A 32px fixed red (`#EF4444`) bar spanning full width. Text in white, all-caps, bold:
> "CRITICAL TO MAINTAIN STAKEHOLDER SUPPORT AMID DIVESTITURE PLAN"

This is the first thing a user sees on every dashboard page. It communicates urgency and establishes the current operational context for Apex Brands Group. It is static/hardcoded but is designed to be CMS-editable by Aegis Admins.

### `MetricsCommandBar`
A 5-cell horizontal bar below the ThreatBanner. Bloomberg-style KPI ticker:

| Cell | Label | Value | Color |
|---|---|---|---|
| 1 | Threat Level | ELEVATED | Red badge |
| 2 | Upcoming Tranche Size | $550.00m Sr Note | Amber |
| 3 | Upcoming Tranche Maturity | 9/15/2027 | White |
| 4 | Net Debt/EBITDA | 7.52x | Red (above threshold) |
| 5 | Debt Price | $97.71 | Red (price pressure) |

The color-coding follows financial convention: red = stress/violation, amber = warning/approaching threshold, white/cyan = normal. JetBrains Mono font for all numeric values.

---

### Page 1: Overview (`/dashboard`)
**Purpose:** Executive summary of debt posture and holder activity.

**Components:**
1. `DebtPricingChart` — Full-width Recharts `ComposedChart`. Primary line: senior note debt price in cyan (`$95.26`–`$98.45`), 16 trading days Oct 24 – Nov 23. Secondary: volume bars in amber. Dual Y-axes (price left, volume right). No animation. Dark grid lines.
2. `AegisCommentary` (right column) — Amber left-border panel titled "Aegis Commentary". Bulleted analysis of largest holder movement data, specifically: Prudential 26.02% of $550M Sr Notes (filed SCH 13G), Capital Advisors 12.08%, BlackRock 9.73%. Notes that "concentrated ownership could create pressure during distress scenarios."
3. `LargestHoldersTable` — Three-column table showing top 3 holders across two debt tranches ($550M Sr Notes / $550M Sr Secured Notes) and Term Loan B. Prudential's 26.02% highlighted in cyan as above-threshold concentration.

---

### Page 2: Capital Structure (`/dashboard/capital-structure`)
**Purpose:** Full debt stack with pricing, ratings, and maturity profile.

**Components:**
1. `AegisCommentary` — Details holder movements: Prudential filed 13G for Sr Unsecured Notes on 2/3/23; Capital Advisors 13G for Sr Secured Notes on 1/27/23; BlackRock on 1/23/23. Commentary warns about concentrated ownership risk in distress scenarios.
2. `CapitalStructureTable` — 6-row table with complete debt stack:

| Instrument | Rating | Maturity | Coupon | YTM |
|---|---|---|---|---|
| $550M Sr Notes | Caa2/CCC (distressed, red badge) | 9/15/2027 | 5.25% | 8.90% |
| $550M Sr Secd Notes | B2/B+ (high yield, amber badge) | 9/15/2028 | 8.00% | 8.45% |
| $250M Sr Secd Notes | B2/B+ | 9/15/2028 | 8.00% | 8.20% |
| $475M Revolving Credit | B2/B+ | 12/16/2028 | SOFR+250 | — |
| $450M Term Loan B | B2/B+ | 10/10/2029 | SOFR+300 | — |
| Total Debt | — | — | — | — |

Additional columns: % EV, EBITDA Multiple, Revenue Multiple, Call Provision. Color thresholds: EBITDA multiples >7.0x = red, ≥5.0x = amber. Rating badges: `Caa2/CCC` = `distressed` (red), `B2/B+` = `highYield` (amber).

---

### Page 3: Covenant Compliance (`/dashboard/covenant-compliance`)
**Purpose:** Current covenant status and supporting financial performance charts.

**Components:**
1. `CovenantCompliance` — Card with red border (violation state). Two progress bars:
   - Net Debt/EBITDA: 7.52x actual vs 7.0x threshold → **VIOLATED** (red progress bar, 107% of limit)
   - Interest Coverage Ratio: 1.89x actual vs 2.0x threshold → **VIOLATED** (red progress bar, 94.5% of limit)
   Both shown as gauges with the threshold marked. Card header shows "2 Active Violations" badge.

2. `AegisCommentary` (paired) — Detailed analysis of the divestiture plan: Verdant Harvest brand divestiture announced to reduce leverage; covenant waiver discussions with lender group; restructuring plan execution timeline.

3. Four PNG chart images (imported from PDFs) arranged in a 2×2 grid — these are actual financial charts from Apex Brands Group financial reports. Charts cover: debt/EBITDA trend, revenue performance, segment breakdown, EBITDA margins.

4. Second `AegisCommentary` below charts — additional analyst notes.

---

### Page 4: Priorities & Events (`/dashboard/priorities-events`)
**Purpose:** Action items and upcoming calendar of critical events.

**Components:**
1. `TopPriorities` — Bulleted list of 5 strategic priorities:
   - Restructuring plan execution with creditor group
   - Covenant compliance communication to lender group
   - Monitoring debt trading activity and identifying concentrated sellers
   - Scenario planning for potential covenant cure options
   - Crisis simulation / lender call preparation

2. `KeyEvents` — Bulleted list of 3 upcoming events:
   - Next Earnings Date
   - Next Lender Call Date
   - $550M Sr Unsecured Note due September 15, 2027

(The combined `TopPrioritiesKeyEvents` component exists separately with 6+6 items and is used in the Admin editor preview context.)

---

### Page 5: Sector News (`/dashboard/sector-news`)
**Purpose:** Macro context — regulatory, geopolitical, and policy news affecting the company's credit environment.

**Components:**
1. `SectorNews` — Two-column news feed with 4 category sections:
   - **Regulatory**: food labeling, PFAS rules, FDA nutrition labeling updates
   - **Sector/Region Trends**: private label growth, supply chain disruption, consumer spending shift
   - **Geopolitical**: tariff impacts on food imports, agricultural commodity volatility
   - **Policy**: USDA policy changes, farm bill updates, nutrition assistance program changes
   Sources cited: The Guardian, Food Dive, 9Fin, Debtwire, CNBC, NYT, The Hill, USA Today. All links are `href="#"` (placeholders).

2. `EquityPricingChart` — Recharts ComposedChart. APX equity price (green line, `$4.42`–`$4.95`, 16 data points). Volume bars amber. Dual Y-axes. Ticker watermark `$APX`.

3. `MarketTrendsPanel` — Cyan left-border panel. 3 bullet points about macro credit market conditions, specifically referencing Fossil Group's debt exchange / UK Restructuring Plan transaction pioneered by Weil Gotshal as a comparable restructuring mechanism. Signals Aegis's market intelligence function beyond the subject company.

---

## Admin Console (Aegis Admin Only, `/admin`)

The Admin Console is the content management and operations layer for Aegis Admins. It is a tab-based interface driven by URL query param `?tab=<name>`.

### Tab: Company Onboarding (`?tab=onboarding`)
Form to onboard a new client company: Company Name, Description, Contact Email. Submit button (visual only). List of existing companies (table stub). Purpose: Aegis staff use this to add new companies to the platform.

### Tab: User Management (`?tab=users`)
Full user table with columns: Name, Role, Company, Status (Active/Pending), Last Active, Actions (Edit/Delete). 5 mock users shown. "Invite User" button opens a modal with: pre-generated invite link (copyable), Name, Email, Role selector (User/Company Admin), Company. Purpose: Aegis staff manage who has access to which company's dashboard.

### Tab: Commentary Editor (`?tab=commentary`)
Accordion-style CMS for the `AegisCommentary` content that appears on each dashboard page. Three accordion sections:
- **Debt Pricing Commentary** (shown on Overview page)
- **Capital Structure Commentary** (shown on Capital Structure page)
- **Covenant Compliance Commentary** (shown on Covenant Compliance page, with 2 sub-sections)
Each section has a textarea (draft mode) and a "Publish" button (visual only). Purpose: Aegis analysts write and update the commentary bullets that clients see.

### Tab: Data Upload (`?tab=data-upload`)
File upload zone (dashed border drag-drop area). Purpose: Upload structured data files (CSV/Excel) to populate charts and tables (not yet wired to actual data pipeline).

### Tab: Charts Upload (`?tab=charts-upload`)
4 labeled chart upload slots (dashed boxes):
- Debt/EBITDA Trend Chart
- Revenue Performance Chart
- Net Sales by Segment Chart
- EBITDA Margin by Segment Chart
Each slot accepts image upload. These correspond to the 4 PNG images shown on the Covenant Compliance page. Purpose: Aegis staff upload chart images exported from financial models/PDFs.

### Tab: Priorities & Events (`?tab=priorities`)
Two textarea editors:
- Top Priorities (multiline, publishes to `TopPriorities` component)
- Key Events (multiline, publishes to `KeyEvents` component)
Publish buttons. Purpose: Analysts update the priority and event lists without code changes.

### Tab: Sector News Editor (`?tab=sector-news`)
Accordion-style CMS with 3 sections:
- Regulatory
- Geopolitical
- Policy
Each section has a textarea for adding/editing news items. Purpose: Analysts curate the news feed shown to clients.

### Tab: Market Trends Editor (`?tab=market-trends`)
Single textarea for editing the `MarketTrendsPanel` content. Purpose: Analysts update the macro market commentary.

---

## Settings Page (`/settings`)

Two tabs:

### Profile tab
Fields: Full Name, Job Title, Phone, Company (all editable). Email (disabled — tied to auth identity). Role (disabled — read-only display). Avatar upload stub. Save button with loading spinner animation.

### Security tab
Change Password form: Current Password, New Password, Confirm New Password — each with show/hide toggle. Submit with validation.

**Notifications removed:** Previously had a Notifications tab. Removed entirely. No notification system exists in the current build.

---

## Unrouted Pages (Built but Not Active)

### `CorporateDashboardPage` — IR Portal View
A separate view mode intended for company IR teams (not credit investors). Features a diagonal "Apex Brands Group IR Portal View" watermark. Blue gradient header banner with "Request Meeting" and "IR Presentation" CTA buttons. An info banner: "Corporate View: public data only." Shows a subset of dashboard components in a friendlier layout. Has a `RequestMeetingModal` sub-component. **Not currently routed** — exists for future product expansion.

### `PortfolioManagerPage` — Multi-Company Portfolio View
A portfolio-level view for institutional investors tracking exposure across multiple companies simultaneously. Shows:
- Summary stats: Total Exposure $2.4B, 3 Covenant Violations, Avg Debt Price $94.20, 7 Upcoming Maturities
- Filter bar: text search, Threat Level filter (All/Elevated/Moderate/Low), sort options
- Grid of 12 company cards: APX, CHEF, SFM, PRGO, HZN, ELF, NVST, MATX, MGPI, ARCO, JACK, TDC
- Each card: ticker, threat badge (color-coded), Debt Price (with change), Net Debt/EBITDA, days to maturity, sparkline mini-chart, exposure amount, View/Star/Alert actions
**Not currently routed** — represents the scale-up vision where Aegis tracks 12+ companies simultaneously.

---

## Onboarding Flow

`OnboardingModal` renders for new users (`user.isNewUser === true`). 4-step wizard:
1. **Welcome** — platform stats ($2.1T debt tracked, 500+ companies, 40+ institutions, 127 covenant violations)
2. **Watchlist** — toggle on/off 6 suggested companies: APX, CHEF, NRTX, SFM, PRGO, HZN
3. **Alerts** — per selected company, choose alert types: Debt Price Change, Covenant Violation, Holder Position Change
4. **Ready** — confirmation, launch dashboard
Has "Skip Setup" link and progress dots. Purpose: Onboard new institutional users quickly with a personalized company watchlist.

---

## Session Timeout

`SessionTimeoutModal` monitors activity events: mousedown, mousemove, keydown, scroll, touchstart. After 28 minutes of inactivity, modal appears with countdown timer (JetBrains Mono). User can "Stay Logged In" (resets all timers) or "Log Out." Hard logout at 30 minutes.

---

## Data Content: Apex Brands Group Financial Context

All financial data is real (sourced from Apex Brands Group SEC filings and analyst reports):

**Debt stack:** $2.275B total debt. Sr Notes (Caa2/CCC, 8.90% YTM — distressed) due Sep 2027 are the critical near-term maturity. Sr Secured Notes (B2/B+) due Sep 2028. Revolver ($475M) and Term Loan B ($450M) mature 2028/2029.

**Covenants:** Two violations:
- Net Debt/EBITDA: 7.52x vs 7.0x covenant (7.4% over limit)
- Interest Coverage Ratio: 1.89x vs 2.0x covenant (5.5% below requirement)

**Equity:** APX stock trading ~$4.42–$4.95 (penny-stock territory for a former mid-cap food company, reflecting market's distress pricing)

**Debt price:** Sr Notes trading at ~$97.71 (below par but not yet severely distressed — market pricing in restructuring risk but not imminent default)

**Divestiture:** Verdant Harvest brand divestiture announced as primary lever to reduce leverage toward covenant compliance

**Key holders:** Prudential (26.02% of Sr Notes), Capital Advisors (12.08%), BlackRock (9.73%) — concentrated ownership noted as both a risk (coordinated pressure in distress) and opportunity (fewer parties to negotiate with in restructuring)

---

## Product Vision Summary

Aegis is building a two-sided SaaS platform:
- **Supply side:** Aegis analysts act as editors — they load company data, write commentary, upload charts, manage clients
- **Demand side:** Institutional credit investors and company IR/finance teams consume the curated intelligence dashboards

The core value proposition: instead of an investor needing to synthesize Bloomberg data + SEC filings + news + 13G filings + covenant documents themselves, Aegis pre-digests everything into a single high-density view with analyst commentary layered in.

The Apex Brands Group dashboard is the first (and currently only) live company implementation, used both as the product and as a sales demonstration for prospective institutional clients.

The unrouted pages (`PortfolioManagerPage`, `CorporateDashboardPage`) show the roadmap: Aegis wants to serve both the buy side (portfolio managers tracking many names) and the company itself (IR teams managing investor relationships). The current product is purely buy-side (credit investor monitoring).

---

## File Structure

```
src/
├── app/
│   ├── App.tsx                          # Root: ThemeProvider → AuthProvider → RouterProvider
│   ├── routes.tsx                       # React Router v7 browser router config
│   ├── context/
│   │   ├── AuthContext.tsx              # Auth state, roles, mock users, session
│   │   ├── SidebarContext.tsx           # Sidebar collapse state
│   │   └── ThemeContext.tsx             # Dark/light toggle, localStorage persist
│   ├── theme/
│   │   └── colors.ts                   # Custom design token objects (dark + light)
│   ├── components/
│   │   ├── DashboardLayout.tsx          # Main shell: NewSidebar + content area + timeout modal
│   │   ├── NewSidebar.tsx              # PRIMARY sidebar (role-aware nav, company selector, theme toggle)
│   │   ├── Sidebar.tsx                 # Legacy sidebar (unused)
│   │   ├── GlobalHeader.tsx            # Legacy top header (unused)
│   │   ├── ThreatBanner.tsx            # Red alert bar
│   │   ├── MetricsCommandBar.tsx       # 5-cell KPI bar
│   │   ├── AegisCommentary.tsx           # Amber commentary panel
│   │   ├── DebtPricingChart.tsx        # Debt price + volume chart
│   │   ├── EquityPricingChart.tsx      # APX equity chart
│   │   ├── CapitalStructureTable.tsx   # Full debt stack table
│   │   ├── CovenantCompliance.tsx      # Covenant gauge cards
│   │   ├── FinancialPerformanceGrid.tsx # 2x2 Recharts grid
│   │   ├── LargestHoldersTable.tsx     # Holder concentration table
│   │   ├── TopPriorities.tsx           # Priority bullets
│   │   ├── KeyEvents.tsx               # Event bullets
│   │   ├── TopPrioritiesKeyEvents.tsx  # Combined priorities+events
│   │   ├── SectorNews.tsx              # News feed by category
│   │   ├── MarketTrendsPanel.tsx       # Macro market commentary
│   │   ├── SessionTimeoutModal.tsx     # 30min idle logout
│   │   ├── OnboardingModal.tsx         # 4-step new user wizard
│   │   ├── ProtectedRoute.tsx          # Auth guard
│   │   ├── PublicRoute.tsx             # Redirect if authed
│   │   ├── AppContent.tsx              # Legacy all-in-one (unused)
│   │   ├── auth/
│   │   │   └── AuthRightPanel.tsx      # Right panel for auth pages
│   │   ├── figma/
│   │   │   └── ImageWithFallback.tsx   # Image with SVG fallback
│   │   └── ui/                         # Full shadcn/ui component library
│   └── pages/
│       ├── LoginPage.tsx               # Email+password, demo quick-fill, 2FA redirect
│       ├── SignUpPage.tsx              # Invite-based registration
│       ├── ForgotPasswordPage.tsx      # Email → simulated send
│       ├── ResetPasswordPage.tsx       # New password + strength meter
│       ├── TwoFactorPage.tsx           # 6-digit OTP entry
│       ├── OverviewPage.tsx            # Dashboard home
│       ├── CapitalStructurePage.tsx    # Debt stack
│       ├── CovenantCompliancePage.tsx  # Covenant health
│       ├── PerformanceAnalysisPage.tsx # Priorities & events
│       ├── SectorNewsPage.tsx          # News + market trends
│       ├── AdminDashboardPage.tsx      # Aegis Admin console (8 tabs)
│       ├── UserManagementPage.tsx      # Company Admin user table
│       ├── SettingsPage.tsx            # Profile + Security
│       ├── CorporateDashboardPage.tsx  # [UNROUTED] IR portal view
│       └── PortfolioManagerPage.tsx    # [UNROUTED] Multi-company portfolio
├── styles/
│   ├── index.css                       # Imports fonts + tailwind + theme
│   ├── fonts.css                       # Google Fonts (Inter, JetBrains Mono)
│   ├── tailwind.css                    # Tailwind v4 import
│   ├── theme.css                       # shadcn/ui CSS custom properties
│   └── globals.css                     # Empty
└── imports/
    ├── Acrobat_*.png                   # Chart images from PDFs (used in Covenant page)
    ├── Figma_*.png                     # Design reference images
    └── pasted_text/                    # Reference docs and specs
```
