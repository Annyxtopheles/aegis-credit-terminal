# Aegis Credit Terminal — Institutional Debt & Covenant Surveillance

> **Project Pitch Line:**  
> *"A Bloomberg-grade credit surveillance workstation engineered for an institutional debt advisory practice — synthesizing capital structures, real-time covenant breach telemetry, Schedule 13G holder concentrations, and analyst commentary into an accessible, high-density command center."*

---

> ### 🏛️ Project Provenance & Portfolio Disclosure
> **Commercial Client Engagement Note:**  
> This platform was designed and built as a bespoke commercial engagement for a specialized Wall Street credit intelligence advisory firm. The system was developed to monitor corporate borrowers navigating high-leverage and distressed debt scenarios.  
> 
> *In compliance with non-disclosure agreements (NDA), all subject corporate entities, specific lender syndicate details, and identifying proprietary advisory trademarks have been anonymized/pseudonymized (presented here as **Aegis Credit Terminal** monitoring **Apex Brands Group**).*  
> 
> **Client Outcome:** The client leadership and advisory committee enthusiastically approved and praised the final delivery, highlighting its **exceptional accessibility, navigational clarity, and immediate comprehension** — transforming what previously took analysts hours of manual cross-referencing into a unified, high-confidence visual interface.

---

## 1. The Real Business Problem (Why Was It Commissioned?)

In institutional credit markets, distressed debt analysis is plagued by severe **information fragmentation**:

1. **The Disconnected Data Stack**:
   - Bond prices and secondary trade yields reside in raw Bloomberg/Refinitiv terminals (dense, expensive, and lacking editorial context).
   - Seniority, lien priorities, and indentures are buried in 200-page SEC 10-K and 8-K filings.
   - Institutional ownership changes are hidden in intermittent Schedule 13D/13G filings.
   - Covenant compliance formulas and breach remedies live in confidential credit agreement exhibits and internal Excel models.

2. **The Analyst Cognitive Bottleneck**:
   - When a borrower enters financial distress, credit analysts and risk committees cannot afford to cross-reference six disconnected spreadsheets and terminal screens.
   - Advisory teams needed a way to present complex debt mechanics to clients, lenders, and portfolio managers without overwhelming them with chaotic data dumps.

3. **The Core Brief to the Designer**:
   - The advisory firm commissioned a unified, interactive surveillance dashboard that could serve two distinct stakeholders:
     - **Institutional Investors / Lenders**: Who need immediate clarity on where they sit in the capital structure, whether covenants are violated, and who holds blocking positions in their tranche.
     - **In-House Credit Analysts & Advisors (Super Admins)**: Who need a live CMS to publish qualitative situational commentary, upload updated sensitivity charts, and manage client access.

---

## 2. Why Did the Client Love It? (Key Success Drivers)

When reviewing the completed platform, the client leadership noted four specific reasons for its success:

1. **"Instant Situational Comprehension"**:
   - Instead of hiding critical alerts in nested tabs, a top-level **Telemetry Directive Bar** immediately surfaces whether the borrower is in covenant violation, the upcoming maturity wall date ($550M due 2027), and the current consolidated leverage ratio (7.52x vs. 7.0x ceiling).
2. **"Accessible High-Density Data (Zero Cognitive Fatigue)"**:
   - The interface achieves an institutional information density comparable to tier-1 trading desks, but structures it with scannable visual anchors, generous spacing hierarchy, and monospaced figures (`JetBrains Mono`) that eliminate reading errors.
3. **"Human-in-the-Loop Analyst Synthesis"**:
   - Pure data alone does not explain *why* a bond traded off 8 points. The platform seamlessly pairs quantitative tables with amber-highlighted **Aegis Intelligence Commentary** notes, explaining lender sentiment, waiver discussions, and divestiture timelines.
4. **"Architectural Monochromatic Elegance"**:
   - Moving away from generic "AI-slop cyber-blue" into a refined, neutral monochromatic slate/charcoal palette (`#0B0C0E` canvas, elevated `#1C2028` cards, crisp `#EDEDED` platinum typography, with selective amber and crimson telemetry signals) gave the product an authentic, high-end institutional authority.

---

## 3. UI Architecture: "What Is Actually Happening in the Dashboard?"

When walking a recruiter, executive, or client through the interface, here is the functional breakdown of each module:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [TELEMETRY BAR] CRITICAL TO MAINTAIN STAKEHOLDER SUPPORT AMID DIVESTITURE             │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Threat Level: ELEVATED │ Upcoming Maturity: $550M Sr Note (9/15/27) │ Net Debt: 7.52x  │
├───────────────────────┬────────────────────────────────────────────────────────────────┤
│ NAVIGATION            │ 1. REAL-TIME DEBT PRICING VS. VOLUME                           │
│ • Overview            │    Dual-axis chart tracking secondary bond market bids vs.     │
│ • Capital Structure   │    institutional trading volume anomalies.                     │
│ • Covenant Health     ├────────────────────────────────────────────────────────────────┤
│ • Priorities & Events │ 2. FULL $2.275B CAPITAL STRUCTURE STACK                        │
│ • Sector News         │    Interactive seniority breakdown (Term Loan A, Term Loan B,  │
│ • Admin Operations    │    Sr Secured Notes, Sr Unsecured Notes) with ratings & coupon.│
│                       ├────────────────────────────────────────────────────────────────┤
│                       │ 3. SCHEDULE 13G INSTITUTIONAL HOLDER TRACKER                   │
│                       │    Detects concentrated ownership & holdout risk               │
│                       │    (Prudential 26.02%, Capital Advisors 12.08%, BlackRock).    │
│                       ├────────────────────────────────────────────────────────────────┤
│                       │ 4. COVENANT BREACH & DIVESTITURE WATERFALL GAUGES              │
│                       │    Dynamic leverage ratio (7.52x vs 7.00x) and coverage        │
│                       │    modeling the impact of the Verdant Harvest asset sale.      │
└───────────────────────┴────────────────────────────────────────────────────────────────┘
```

### A. Telemetry Directive Banner (Global Persistent Header)
- **What it does**: A high-priority warning bar that sits atop every dashboard page.
- **Why it matters**: In distress scenarios, executive teams cannot miss the bottom line. It communicates the current threat level (`ELEVATED`), the next maturity hurdle, and management's core operational objective.

### B. Capital Structure Table ($2.275B Debt Stack)
- **What it does**: Displays all five tranches of corporate debt in exact seniority order:
  1. Revolving Credit Facility ($225M)
  2. Term Loan A & B ($950M)
  3. Senior Secured Notes ($550M, 8.00% coupon, due 9/15/2027)
  4. Senior Unsecured Notes ($550M, 5.25% coupon, due 2029)
- **Interactive Details**: Shows trading price ($84.25 vs. $100 par), yield-to-worst (YTW: 14.85%), and rating badges (B3 / B- with distressed and high-yield visual styling).

### C. Covenant Compliance & Divestiture Sensitivity
- **What it does**: Visualizes the borrower's two active covenant breaches:
  - **Consolidated Leverage Ratio**: Currently at **7.52x** (Covenant Ceiling: **7.00x** — *Active Breach*).
  - **Interest Coverage Ratio**: Currently at **1.89x** (Minimum Threshold: **2.25x** — *Active Breach*).
- **The Divestiture Waterfall**: Models how the net proceeds from selling the non-core brand (**Verdant Harvest**) will de-lever the company back toward covenant safety.

### D. Schedule 13G Institutional Holder Concentration
- **What it does**: Tracks which major funds hold large positions in each debt tranche.
- **Strategic Purpose**: In a debt restructuring, if a single creditor holds over 33.4% of a tranche, they possess a **blocking position** under Chapter 11 plan voting. The dashboard highlights that Prudential owns 26.02% of the Senior Unsecured Notes, alerting advisors to concentrated holdout risk.

### E. Curated Analyst Commentary Panels
- **What it does**: High-contrast amber-accented intelligence cards written by in-house credit analysts.
- **Why it matters**: Connects the numbers to human reality: reports that lender groups have granted temporary forbearance through Q2, but are demanding asset sale progress by Q3.

### F. Multi-Role Admin Console (`/admin`)
- **What it does**: An 8-tab operations workstation for advisory admins:
  - **Company Onboarding**: Register new corporate issuers.
  - **User Provisioning**: Issue time-stamped invite tokens across RBAC tiers.
  - **Commentary CMS**: Draft and publish situational bullet notes.
  - **Chart Upload Engine**: Upload sensitivity graphics generated from PDF/Excel models.
  - **Audit Logs & Security**: SOC 2 compliance tracking and session monitoring.

---

## 4. Visual Engineering: The Institutional Monochromatic Language

To eliminate the "AI-slop / template" aesthetic of earlier prototypes, the entire interface was engineered with architectural precision:

| Design Token | Color Value | Strategic Purpose |
| :--- | :--- | :--- |
| **Canvas Background** | `#0B0C0E` | Deep neutral obsidian black with zero blue or purple tint, minimizing eye strain during extended analysis. |
| **Card Surface** | `#1C2028` | Elevated dark graphite surface ("a little less dark"), creating clear architectural separation from the canvas. |
| **Containers & Inputs** | `#252A36` | High-definition internal containers for inputs, search bars, and demo account switchers. |
| **Architectural Borders** | `#2E3544` | Crisp 1px hairline dividers that provide structural geometry without visual clutter. |
| **Primary Typography** | `#EDEDED` | Crisp platinum white with high legibility across small tabular typography. |
| **Secondary Typography** | `#9AA0AC` | Neutral cool grey for units, dates, and column headers. |
| **Alert Crimson** | `#E5484D` | Reserved exclusively for active covenant breaches and distressed rating indicators. |
| **Signal Amber** | `#E5A93C` | Reserved for human analyst commentary and threshold warnings. |
| **Signal Emerald** | `#30A46C` | Reserved for compliant covenants, investment-grade ratings, and verified 2FA states. |

---

## 5. How to Present This on Your Portfolio Website

Use this framework when featuring Aegis on Behance, ReadCV, Webflow, or Notion:

### Project Title:
**Aegis Credit Terminal — Institutional Debt Surveillance & Covenant Monitoring Platform**

### Role & Scope:
- **Role**: Lead Product Designer & Design Technologist
- **Engagement**: Bespoke Institutional Client Project (Anonymized under NDA)
- **Scope**: Product Discovery, Financial Domain Research, Design System, UX/UI Architecture, High-Fidelity Functional React Prototype
- **Tools**: Figma, React 18, TypeScript, Tailwind CSS, Recharts, Radix UI, Vite

### The Problem:
> *"Institutional credit investors and financial restructuring advisors monitor billions in distressed debt using fragmented spreadsheets, 200-page SEC filings, and disconnected terminals. When a corporate borrower breaches covenants, stakeholders lose critical days synthesizing data across incompatible tools."*

### The Solution:
> *"Designed and developed Aegis Credit Terminal: a unified, high-density financial workstation that synthesizes the complete capital structure, live covenant violation telemetry, Schedule 13G holder concentrations, and analyst commentary into an accessible, institutional-grade command center."*

### Key Results & Client Praise:
- **Immediate Comprehension**: Client stakeholders praised the platform for condensing hours of cross-referencing into a 30-second glanceable dashboard.
- **Cognitive Clarity**: Retained Bloomberg-level information density while eliminating visual clutter through a refined monochromatic design system.
- **Production-Ready Prototype**: Built in functional React/TypeScript with live 1-click RBAC switching, enabling stakeholders to interact with real debt mechanics on their own devices.

---

## 6. How to Talk About It in an Interview

### Q: "Tell me about this project — was this a concept or real work?"
> *"This was a real commercial engagement commissioned by an institutional credit advisory practice. The client needed a dedicated surveillance workstation to track corporate borrowers in distressed and high-leverage situations. Because the underlying subject company was navigating active covenant violations and a major asset divestiture, all company names, bond tranches, and client branding are presented under an NDA-compliant pseudonym. The client leadership loved the final system because it took complex indenture math and presented it with unprecedented visual clarity and accessibility."*

### Q: "How did you manage the extreme information density without overwhelming users?"
> *"In FinTech, stripping away data is often a failure mode — institutional analysts actually need density to make high-stakes decisions. The secret is visual hierarchy and purposeful color discipline. We established a strict monochromatic palette: `#0B0C0E` canvas, elevated `#1C2028` cards, and crisp platinum typography. Color is never used for decorative flair; it is strictly functional. Red is reserved solely for covenant breaches, amber for human analyst commentary, and green for compliant benchmarks. By combining scannable telemetry bars with monospaced tabular data, users can digest millions in debt tranches without cognitive fatigue."*

### Q: "What was your approach to the Admin and CMS side of the platform?"
> *"Many design prototypes only show the consumer view. In reality, this was a two-sided platform: institutional investors viewing the data, and in-house advisory analysts curating it. I designed an 8-tab operations console where analysts can onboard new corporate issuers, issue time-stamped 2FA invite links, write live commentary notes, and upload updated sensitivity models. Having the interactive 1-click demo switcher directly in the prototype allowed stakeholders to test both the client experience and the internal analyst workflow seamlessly."*
