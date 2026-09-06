# Aegis Credit Terminal

> **Institutional Debt Surveillance & Covenant Monitoring Engine**

Aegis Credit Terminal is an institutional-grade FinTech surveillance workstation engineered for credit investors, distressed debt analysts, and hedge fund risk committees. The platform bridges the gap between raw unstructured data terminals and corporate investor relations by synthesizing real-time secondary bond pricing, capital structure seniority stacks, Schedule 13G holder concentration dynamics, and automated covenant compliance tracking into a single unified analytical workstation.

---

## 🎯 Platform Architecture & Key Capabilities

1. **Capital Structure Surveillance**
   - Full visibility across the institutional debt stack ($2.275B monitored across Tranche A/B term loans, senior secured notes, and senior unsecured notes).
   - Real-time pricing, yield-to-worst (YTW), spreads, coupon benchmarks, and upcoming maturity walls (2027–2030).

2. **Covenant Compliance Engine**
   - Automated covenant breach detection with interactive sensitivity modeling.
   - Divestiture proceeds waterfall simulation (tracking liquidity release from non-core asset sales like the Verdant Harvest transaction).
   - Dynamic consolidated leverage ratio (5.75x covenant ceiling vs. 6.42x actual) and interest coverage ratio tracking.

3. **Institutional Holder Concentration & 13G Analytics**
   - Active tracking of Schedule 13G institutional filings and secondary block accumulation.
   - Analysis of concentrated debt ownership (e.g., Prudential 26.02%, Capital Advisors 12.08%, BlackRock 9.73%) and holdout risk under restructuring scenarios.

4. **Curated Analyst Intelligence (Aegis Commentary)**
   - Embedded analyst commentary synthesized directly beside data tables and charts, providing situational context on lender group negotiations and forbearance discussions.

5. **Multi-Role RBAC Console**
   - Granular authentication for **Institutional Analysts**, **Company Treasury/CFO Admins**, and **Aegis Super Admins**.
   - Admin operations console with 8 management modules: company onboarding, user provisioning, commentary CMS, model chart uploads, audit logging, and surveillance configurations.

---

## 💻 Tech Stack

- **Framework:** React 18 with TypeScript
- **Bundler / Tooling:** Vite 6
- **Styling:** Tailwind CSS (Neutral Monochromatic Institutional Theme)
- **Component Primitives:** Radix UI / Shadcn
- **Visualizations:** Recharts & SVG financial chart engines
- **Icons:** Lucide React

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Installation

```bash
# Clone repository
git clone https://github.com/Annyxtopheles/aegis-credit-terminal.git
cd aegis-credit-terminal

# Install dependencies
npm install

# Start development server
npm run dev
```

The terminal will launch locally at `http://localhost:5174/` (or `http://localhost:5173/`).

### One-Click Demo Access
The login screen includes 1-click authentication shortcuts for institutional roles:
- **Analyst (User):** `analyst@firm.com` / `Password123!`
- **Company Admin:** `cfo@apexbrands.com` / `Password123!`
- **Aegis Admin (Super Admin):** `admin@aegisterminal.com` / `Password123!` (2FA pre-filled: `123456`)

---

## 📄 Case Study
A comprehensive deep-dive into the product design decisions, financial domain research, cognitive density UX, and design system is documented in [`PORTFOLIO_CASE_STUDY.md`](./PORTFOLIO_CASE_STUDY.md).
