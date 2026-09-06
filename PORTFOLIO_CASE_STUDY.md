# Aegis Credit Terminal — Institutional Debt & Covenant Surveillance

> **B2B FinTech / Enterprise SaaS Case Study**  
> **Role:** Lead Product Designer & Design Technologist  
> **Platform:** Desktop Web Application (Terminal-Grade Credit Intelligence)  
> **Tech Stack:** React 18, TypeScript, Tailwind CSS v4, Recharts, React Router v7, Radix UI primitives  

---

## 1. Executive Summary

**Aegis Credit Terminal** is a high-density, real-time credit surveillance platform engineered for institutional bondholders, credit hedge funds, and corporate treasury teams. It unifies complex debt stack tracking, live covenant health gauges, institutional holder movements (Schedule 13G), and analyst commentary into a single Bloomberg Terminal–grade command center.

The platform monitors **Apex Brands Group, Inc. (NYSE: APX)**, a consumer packaged goods company navigating **two active debt covenant violations**, an ongoing brand divestiture (**Verdant Harvest**), and a critical near-term debt maturity ($550M Senior Notes due September 2027).

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ [TELEMETRY DIRECTIVE] CRITICAL TO MAINTAIN STAKEHOLDER SUPPORT AMID DIVESTITURE  │
├──────────────────────────────────────────────────────────────────────────────────┤
│ Threat: ELEVATED │ Upcoming: $550M Sr Note (9/15/27) │ Net Debt/EBITDA: 7.52x    │
├───────────────┬──────────────────────────────────────────────────────────────────┤
│ SURVEILLANCE  │ • Debt Pricing vs Volume Chart (Recharts ComposedChart)          │
│ • Overview    │ • Capital Structure: $2.275B Debt Stack across 5 Tranches        │
│ • Capital     │ • Covenant Gauges: Leverage (7.52x / 7.0x) & Coverage (1.89x)    │
│ • Covenants   │ • Institutional Holder Concentration (Prudential, BlackRock)     │
│ • Priorities  │ • Embedded Analyst Commentary ("Human-in-the-Loop" Sticky Notes) │
│ • Sector News │ • Categorized Macro Intelligence Feed (FDA, Tariffs, Policy)     │
│ • Admin CMS   │ • 8-Tab Analyst CMS for Live Content & User RBAC Provisioning    │
└───────────────┴──────────────────────────────────────────────────────────────────┘
```

---

## 2. Design System & Distinguishing Features

To distinguish this portfolio showcase from earlier commercial iterations, the visual language was reimagined into a **Neutral Monochromatic Institutional Palette**:

### A. True Neutral Monochromatic Palette (Zero Blue Cast)
* **Canvas (`#0B0C0E`):** Pure neutral obsidian black that eliminates generic "cyber-blue" tinting.
* **Surfaces & Cards (`#13151A`):** Architectural charcoal panels with subtle hairline borders (`#222630`).
* **Elevated Containers & Inputs (`#181B22`):** Crisp, contrast-rich containers for form elements and telemetry data.
* **Monochrome Typography (`#EDEDED` / `#8E939D`):** High-contrast platinum headers and neutral cool-grey secondary labels.

### B. Centered, Architectural Authentication Experience
* Eliminated the generic marketing side panel and unnecessary empty space.
* Replaced with a **centered, high-end institutional terminal authentication card** featuring 1-click demo credential switching, SOC 2 certification notices, and clear security hygiene.

### C. Telemetry Directive Banner
* Replaced the blunt solid red banner with a **sleek telemetry surveillance bar** (`bg-[#161113] border-[#E5484D]/35`) featuring an active pulsing signal dot and real-time covenant breach status.

### D. Refined Financial Signal Badges
* Credit rating and status badges utilize subtle translucent fills with crisp borders (`rgba(229,72,77,0.15)` for Distressed, `rgba(229,169,60,0.15)` for High-Yield) rather than opaque saturated blocks, matching institutional tier-1 terminals.
