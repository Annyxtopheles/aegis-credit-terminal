Create a high-density, precision-focused financial surveillance dashboard for institutional credit investors and distressed debt analysts. The aesthetic is "Financial Intelligence Modernism"—think Bloomberg Terminal meets Stripe meets Financial Times. This is a professional tool for analysts managing millions in debt positions who need instant threat assessment, granular data access, and actionable intelligence.

Visual DNA
Palette:
Background Foundation: Deep Navy (#0A1628) for primary canvas, Slate (#1A2332) for elevated cards
Text Hierarchy: Snow White (#FFFFFF) for primary data, Steel Gray (#8B96A5) for labels/metadata, Ice Blue (#A8C5DA) for interactive elements
Alert System:
Critical Red (#DC2626) for elevated threats and covenant violations
Amber (#F59E0B) for warnings and commentary highlights
Emerald (#10B981) for positive metrics/compliance
Accent: Electric Cyan (#06B6D4) for interactive states, data points, and links
Chart Colors: Debt Pricing (Cyan #06B6D4), Volume (Amber #F59E0B), Equity (Emerald #10B981)
Typography:
Headings/Metrics: Inter or Aeonik at 700-800 weight—engineered clarity for financial figures
Body/Labels: Inter or IBM Plex Sans at 400-500 weight—maximum legibility at small sizes
Tabular Data: JetBrains Mono or IBM Plex Mono for numbers requiring alignment
Scale: 12px metadata, 14px body/labels, 16-20px section headers, 24-32px key metrics, 14-16px tables
Grid & Spacing:
8px base unit for all spacing (margins, padding, gaps)
12-column responsive grid with 24px gutters
Card-based architecture: Each major section lives in a bordered container with 16-24px internal padding
Intentional density: Embrace information richness while maintaining clear visual separation
Atmosphere:
Urgent but controlled: High-stakes financial intelligence delivered with surgical precision
Terminal-grade confidence: Design must radiate reliability
Zero decoration: Every pixel serves a function. No gradients, minimal shadows (1-2px elevation on cards only), no ornament
Instant hierarchy: Critical information (threat level, upcoming maturity, debt price) must be absorbed in <3 seconds
The Dashboard Components
1. Global Header
Height: 56px, Background: Pure Black (#000000)
Left: Shield icon + "Aegis SURVEILLANCE DASHBOARD" in 12px uppercase, Steel Gray
Center: Aegis logo (24px height)
Right: "Apex Brands Group, Inc. • TICKER: APX" (18px Semi-Bold company name, 16px monospace ticker)
Fixed position, 1px bottom border in #1A2332
2. Threat Banner
Height: 48px, Background: Critical Red (#DC2626) for ELEVATED status
Typography: 14px Semi-Bold, White, centered, uppercase
Warning triangle icon (20px) left of text
Content: "CRITICAL TO MAINTAIN STAKEHOLDER SUPPORT AMID DIVESTITURE PLAN"
Conditional colors: Red (ELEVATED), Amber (MODERATE), Green (LOW)
3. Metrics Command Bar
4-column equal-width grid, Height: 96px
Each cell: Background #1A2332, 1px border in #2A3441, 16px padding
Structure per cell:
Label: 10px uppercase, Steel Gray, 300 tracking
Primary value: 28-32px Bold for numbers, 18px Medium for dates
Secondary text: 12px Regular, Steel Gray
Cells:
Threat Level (with icon + colored text)
Upcoming Tranche Size: "$550.00m (Sr Note)"
Upcoming Tranche Maturity: "9/15/2027"
Net Debt/EBITDA: "7.52x" (Red if >7.0x)
Debt Price: "$0.9771" (Red if <0.95)
4. Debt Pricing Chart (30 Day)
Container: Full-width card, Background #1A2332, 1px border, 24px padding
Header: "DEBT PRICING CHART (30 DAY)" in 16px Semi-Bold
Height: 320px minimum
Chart: Combination—Line (Cyan) + Volume bars (Amber) overlay
Axes: Left Y (Debt Price $95-$100), Right Y (Volume 0-5M), X (Dates at 45°)
Grid: Horizontal lines only, #2A3441 at 20% opacity
Hover: Crosshair with data tooltip in floating card
5. Aegis Commentary Panels
Container: Background Amber (#F59E0B) at 8% opacity, 2px left border in full Amber, 20px padding
Header: "Aegis COMMENTARY" in 14px Bold, Amber
Body: 14px Regular, Line-height 1.6, White text, bulleted list
Bullet style: Custom bullet (•) in Amber, 8px left indent
Key entities (company names, dates, percentages) in Semi-Bold
Content example: "Debt price dropped sharply after Verdant Harvest's sale announcement to Meridian Foods (Oct 27, 2025), its Sr Secured Note due 9/15/27 hitting a 3-month low..."
6. Capital Structure Table
Container: Background #1A2332, 1px border, table fills edge-to-edge
Header: 14px Semi-Bold, White, with "Data as of March 29, 2025" right-aligned in 12px Steel Gray
Table header row: Background #0F1A2A, 12px Bold uppercase Steel Gray, 12px padding
Columns: Instrument, Maturity Date, % EV, EBITDA Mult., Revenue Mult., Rating, Coupon, Call Provision, YTM
Data rows: 48px height, 14px Regular White text, JetBrains Mono for numbers, 16px padding
Borders: 1px #2A3441 between rows
Zebra striping: Subtle alternate rows #141F30
Color indicators: EBITDA Mult Red if >6x, Rating badges (color-coded by grade), YTM color-coded
Hover row: Background #1F2937, 200ms transition
7. Covenant Compliance Module
Container: Background #1A2332, 1px Red border if violations present, 20px padding
Header: "COVENANT COMPLIANCE – Q3'25" in 14px Bold
Covenant rows with:
Label: 14px Medium White
Value: 16px Bold JetBrains Mono, format "7.2 / 4.0x" (actual/threshold)
Progress bar: 40% width, 8px height, fills based on ratio (Red if >100%, Amber 90-100%, Cyan <90%)
Status icon: ❌ Red or ✅ Green, 20px
Examples: "Net Debt / EBITDA", "Interest Coverage Ratio"
Embedded commentary panel below if violations detected
8. Financial Performance Grid (2x2)
Four charts in grid layout (stacked on mobile)
Charts: Debt/EBITDA Waterfall, Revenue & YoY Growth, Net Sales by Segment, EBITDA % by Segment
Each chart: Min-height 280px, Background #1A2332, 1px border, 20px padding
Chart titles: 14px Semi-Bold White
Use combination charts (bars + lines), stacked bars, waterfalls as appropriate
Color palette consistent across all visualizations
9. Largest Holders Table
Same styling as Capital Structure Table
Header: "LARGEST HOLDERS"
Columns: Holder name, then percentage holdings per instrument ($550M Sr Note 2027, $550M Sr Secd Note 2028, etc.)
Holder names: Left-aligned White with entity type icons (🏛️ Institutional, 📊 Hedge Fund)
Percentages: Right-aligned JetBrains Mono, Cyan if >20%, White 10-20%, Steel Gray 5-10%
Click holder name: Opens profile modal
10. Top Priorities & Key Events
Two-column layout on desktop (60/40 split), stacked on mobile
Both sections: Background #1A2332, 1px border, 20px padding
Top Priorities:
Bulleted list with Cyan bullets
14px Regular White text, line-height 1.7
Content: Action items like "Continue to focus on execution and communication of restructuring plan"
Key Events:
Same styling but emphasis on dates
Dates in JetBrains Mono, Cyan color
Content: "Next Earning Date", "Lender Call Date", "$550m Senior Unsecured Note due Sep. 15, 2027"
11. Sector News & Commentary
Full-width card, Background #1A2332, 1px border, 24px padding
Header: "SECTOR NEWS & COMMENTARY" in 16px Bold White
Category headers: 12px Bold uppercase Cyan ("REGULATORY", "SECTOR / REGION TRENDS", "GEOPOLITICAL", "POLICY")
News items:
Source: 13px Semi-Bold Steel Gray + ":"
Headline: 14px Regular Ice Blue, underline on hover
Line-height 1.6, 12px gap between items
All headlines clickable links, open in new tab
Hover: Color shifts to full Cyan, 150ms transition
12. Market Trends Panel
Container: Background #1A2332, 3px left border in Cyan, 24px padding
Header: "MARKET TRENDS" in 14px Bold Cyan (not white—differentiate from commentary)
Intro paragraph: 14px Regular White, line-height 1.7
Bullets: Cyan •, 14px Regular, 24px left indent, line-height 1.8
Content: Market intelligence like "Law firm Weil Gotshal recently pioneered a new debt reduction transaction..."
Emphasis: Key legal terms in Semi-Bold
13. Equity Pricing Chart (30 Day)
Same structure as Debt Pricing Chart
Line color: Emerald (#10B981)
Volume bars: Amber (consistent)
Y-axis: $2-$6 range
Can be placed adjacent to Market Trends panel in two-column layout
Responsive Behavior
Desktop (1440px+): Full 12-column grid, side-by-side layouts, optimal chart widths

Tablet (768-1439px): Metrics bar stays 4-column, charts stack, tables horizontal scroll with sticky first column

Mobile (<768px):

Metrics bar becomes 2x2 grid
All charts full-width, stacked, min-height 240px
Tables transform to cards (each row = card with label-value pairs)
Commentary full-width with collapsible sections
Interactions
Hover States: Links shift to Cyan + underline (150ms), table rows lift background to #1F2937 (200ms), chart crosshair + tooltip

Data Updates: Live price changes flash Cyan for 800ms

Loading: Skeleton screens with pulsing gray shapes (400ms cycle)

Focus: 2px Cyan outline with 4px offset for keyboard navigation

Transitions: 250ms fade between views, 200ms ease for most interactions

Deliver clean, component-based code prioritizing whitespace as functional element, terminal-grade data density, and instant visual hierarchy for high-stakes financial decisions.

