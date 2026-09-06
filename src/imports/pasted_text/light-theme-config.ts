Add a complete light mode theme that can be toggled alongside the existing dark mode. Both themes should maintain the same visual hierarchy, information density, and professional financial aesthetic.

---

LIGHT MODE COLOR SYSTEM:

BACKGROUNDS & SURFACES:
- Primary background: Pure White (#FFFFFF)
- Card/elevated surfaces: Light Gray (#F9FAFB)
- Subtle elevated elements: Warm Gray (#F3F4F6)
- Table header background: Cool Gray (#E5E7EB)
- Alternate table rows (zebra): Ultra-light Gray (#FAFBFC)

TEXT HIERARCHY:
- Primary text (headings, data): Charcoal (#111827)
- Secondary text (labels, metadata): Slate (#4B5563)
- Tertiary text (captions, timestamps): Medium Gray (#6B7280)
- Interactive elements (links, buttons): Deep Cyan (#0891B2)

BORDERS & DIVIDERS:
- Card borders: Light Border (#E5E7EB)
- Table cell borders: Subtle Border (#F0F1F3)
- Section dividers: Medium Border (#D1D5DB)

ALERT SYSTEM (maintain high contrast):
- Critical Red: #DC2626 (same as dark mode - works on white)
- Amber Warning: #F59E0B (same - works on white)
- Success Green: #059669 (slightly deeper for better contrast on white)
- Info Cyan: #0891B2 (deeper than dark mode's #06B6D4)

CHART COLORS (optimized for light backgrounds):
- Debt Pricing Line: Deep Cyan (#0891B2) - more saturated for white background
- Volume Bars: Warm Amber (#F59E0B) at 90% opacity
- Equity Line: Deep Emerald (#059669)
- Grid lines: #E5E7EB at 40% opacity (more visible on white)

ACCENT COLORS:
- Primary accent (interactive states): Deep Cyan (#0891B2)
- Hover states: Light Cyan background (#CFFAFE) with Deep Cyan text
- Active/selected states: Cyan (#06B6D4) background at 15% opacity

---

COMPONENT-SPECIFIC LIGHT MODE STYLES:

GLOBAL HEADER:
- Background: Pure White (#FFFFFF)
- Bottom border: 2px solid Light Border (#E5E7EB)
- Logo & text: Charcoal (#111827)
- Company name: Charcoal, ticker in Deep Cyan (#0891B2)

THREAT BANNER (unchanged):
- Background: Critical Red (#DC2626) - same as dark mode
- Text: White (#FFFFFF)
- Warning icon: White
- Amber variant: #F59E0B background, Charcoal text (#111827)
- Green variant: #059669 background, White text

METRICS COMMAND BAR:
- Card background: Light Gray (#F9FAFB)
- Card borders: 1px solid Light Border (#E5E7EB)
- Labels: Slate (#4B5563), 10px uppercase
- Values: Charcoal (#111827), 28-32px Bold
- Secondary text: Medium Gray (#6B7280)
- Color logic:
  - Threat Level icon/text: Critical Red (#DC2626)
  - Net Debt/EBITDA: Red if >7x, Amber if 5-7x, Charcoal if <5x
  - Debt Price: Red if <0.95, Amber 0.95-0.98, Deep Green (#059669) if >1.00

CHARTS:
- Container background: White (#FFFFFF)
- Card background: Light Gray (#F9FAFB) with 1px border
- Title: 18px Semi-Bold Charcoal (#111827)
- Axis labels: 12px Semi-Bold Slate (#4B5563)
- Grid lines: #E5E7EB at 40% opacity
- Tooltip: White background, 2px Deep Cyan border, Charcoal text, subtle shadow (0 2px 8px rgba(0,0,0,0.1))
- Legend: Charcoal text

DEBT/EQUITY PRICING CHARTS:
- Line: Deep Cyan (#0891B2) at 2px stroke width
- Volume bars: Warm Amber (#F59E0B) at 85% opacity
- Data points: Deep Cyan circles with white center
- Hover highlight: Deep Cyan at full opacity

Aegis COMMENTARY PANEL:
- Background: Amber (#F59E0B) at 6% opacity (lighter than dark mode's 8%)
- Left border: 3px solid Amber (#F59E0B)
- Header: "Aegis COMMENTARY" in 14px Bold Amber (#F59E0B)
- Body text: Charcoal (#111827), 14px Regular
- Bullets: Amber (#F59E0B) at full opacity
- Emphasis (company names, dates): Charcoal Semi-Bold (#111827)

CAPITAL STRUCTURE TABLE:
- Container: White (#FFFFFF) background with 1px Light Border
- Header row: Cool Gray (#E5E7EB) background
- Header text: 12px Bold uppercase Slate (#4B5563)
- Data rows: Alternating White / Ultra-light Gray (#FAFBFC)
- Text: Charcoal (#111827) for labels, Slate (#374151) for numbers
- Borders: 1px Subtle Border (#F0F1F3) between cells
- Hover state: Light Cyan (#F0F9FF) background

Rating Badges (light mode):
- Investment Grade (BBB- and above): 
  - Background: Light Green (#D1FAE5)
  - Text: Deep Green (#065F46)
  - Border: 1px solid Medium Green (#6EE7B7)
- High Yield (BB+ to B-):
  - Background: Light Amber (#FEF3C7)
  - Text: Deep Amber (#92400E)
  - Border: 1px solid Medium Amber (#FCD34D)
- Distressed (CCC and below):
  - Background: Light Red (#FEE2E2)
  - Text: Deep Red (#991B1B)
  - Border: 1px solid Medium Red (#FCA5A5)

YTM/EBITDA Mult Color Coding:
- Red (high risk): Deep Red (#DC2626)
- Amber (moderate): Deep Amber (#D97706)
- Green (favorable): Deep Green (#059669)
- Neutral: Charcoal (#111827)

COVENANT COMPLIANCE MODULE:
- Container: Light Gray (#F9FAFB) background
- Border: 1px solid Light Border, changes to 2px Red (#DC2626) if violations
- Header: Charcoal (#111827)
- Covenant labels: Charcoal (#111827)
- Values: Slate (#374151) in JetBrains Mono
- Progress bars:
  - Track (empty): Light Border (#E5E7EB) background
  - Fill colors same as dark mode (Red/Amber/Cyan) but at 90% opacity for softer look
  - Labels inside bar: White text with subtle shadow for readability
- Status icons: Same (❌ Red, ✅ Green)

FINANCIAL PERFORMANCE CHARTS:
- Waterfall bars: 
  - Positive: Deep Green (#059669)
  - Negative: Deep Red (#DC2626)
  - Starting/ending: Charcoal (#374151)
- Stacked bars: Use Deep Emerald, Deep Amber, Deep Cyan at 85% opacity
- Line charts: Multiple lines in distinct saturated colors (ensure 4.5:1 contrast minimum)

LARGEST HOLDERS TABLE:
- Same structure as Capital Structure table
- Percentage color coding:
  - >20%: Deep Cyan (#0891B2) Bold
  - 10-20%: Charcoal (#111827) Semi-Bold
  - 5-10%: Slate (#4B5563) Regular
  - <5%: Medium Gray (#6B7280) Regular

TOP PRIORITIES & KEY EVENTS:
- Card background: Light Gray (#F9FAFB)
- Borders: 1px Light Border (#E5E7EB)
- Bullets: Deep Cyan (#0891B2) for priorities
- Text: Charcoal (#111827)
- Dates/amounts: Deep Cyan (#0891B2) in JetBrains Mono

SECTOR NEWS & COMMENTARY:
- Card background: White (#FFFFFF) with Light Gray border
- Category headers: 12px Bold uppercase Deep Cyan (#0891B2)
- Source names: Slate (#4B5563), 13px Semi-Bold
- Headlines: Deep Cyan (#0891B2), 14px Regular
- Hover: Deeper Cyan (#0E7490), underline appears

MARKET TRENDS PANEL:
- Background: Light Gray (#F9FAFB)
- Left border: 3px solid Deep Cyan (#0891B2)
- Header: 16px Bold Deep Cyan (#0891B2)
- Body text: Charcoal (#111827)
- Bullets: Deep Cyan (#0891B2)
- Emphasis: Charcoal Semi-Bold

---

THEME TOGGLE IMPLEMENTATION:

TOGGLE CONTROL:
- Location: Global header, right side (before company name/ticker)
- Style: Icon-only button, 32x32px touch target
- Icons: 
  - Dark mode active: ☀️ Sun icon (indicates "switch to light")
  - Light mode active: 🌙 Moon icon (indicates "switch to dark")
- Icon color: 
  - Dark mode: Steel Gray (#8B96A5), hover to Cyan
  - Light mode: Slate (#4B5563), hover to Deep Cyan
- Background on hover:
  - Dark mode: #1F2937
  - Light mode: #F3F4F6
- Transition: 200ms ease for color changes

TRANSITION BEHAVIOR:
- When toggling themes: 300ms ease transition for all background and text colors
- Charts: Fade out (150ms) → swap colors → fade in (150ms) for smoother visual change
- No transition on borders (instant change to prevent visual artifacts)
- Persist user preference in localStorage

CSS VARIABLE STRUCTURE:
Use CSS custom properties for easy switching:

/* Dark Mode (default) */
--bg-primary: #0A1628;
--bg-secondary: #1A2332;
--text-primary: #FFFFFF;
--text-secondary: #8B96A5;
--border-color: #2A3441;
--accent-color: #06B6D4;
--alert-red: #DC2626;
--alert-amber: #F59E0B;
--alert-green: #10B981;

/* Light Mode */
[data-theme="light"] {
  --bg-primary: #FFFFFF;
  --bg-secondary: #F9FAFB;
  --text-primary: #111827;
  --text-secondary: #4B5563;
  --border-color: #E5E7EB;
  --accent-color: #0891B2;
  --alert-red: #DC2626;
  --alert-amber: #F59E0B;
  --alert-green: #059669;
}

---

ACCESSIBILITY REQUIREMENTS:

CONTRAST RATIOS (WCAG AA minimum 4.5:1 for text):
Light mode text on backgrounds:
- Charcoal (#111827) on White (#FFFFFF): 17.2:1 ✓
- Slate (#4B5563) on White (#FFFFFF): 8.6:1 ✓
- Deep Cyan (#0891B2) on White (#FFFFFF): 4.8:1 ✓
- Deep Cyan on Light Gray (#F9FAFB): 4.6:1 ✓

Alert colors work in both modes:
- Red (#DC2626) readable on white and dark backgrounds
- Amber (#F59E0B) readable on white and dark backgrounds
- Green: #10B981 (dark mode), #059669 (light mode) for better contrast

FOCUS INDICATORS:
- Dark mode: 2px Cyan (#06B6D4) outline, 4px offset
- Light mode: 2px Deep Cyan (#0891B2) outline, 4px offset
- Both modes: Never remove focus styles

---

TESTING CHECKLIST:
- Verify all text meets 4.5:1 contrast minimum in both modes
- Ensure chart data points remain distinguishable in both themes
- Check that table zebra striping is visible but subtle in light mode
- Confirm rating badges are readable in both themes
- Test toggle transition feels smooth (not jarring)
- Validate that critical alerts (red banner) maintain urgency in light mode
- Ensure covenant violation indicators are equally prominent in both modes

---

DEFAULT BEHAVIOR:
- On first load: Detect system preference using `prefers-color-scheme` media query
- If user has previously toggled: Use saved preference from localStorage
- Respect user choice across sessions

Deliver a complete dual-theme system where both modes feel equally professional, maintain identical information hierarchy, and serve the high-stakes financial intelligence use case with terminal-grade precision.
