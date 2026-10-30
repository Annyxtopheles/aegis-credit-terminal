# KESSLER // Vanguard Orbital SSA Terminal

> **Real-Time Space Situational Awareness (SSA) & Orbital Debris Conjunction Command Terminal**

**KESSLER** is a high-density astrodynamics and orbital telemetry command workstation engineered for Low-Earth Orbit (LEO) satellite constellation flight directors, conjunction screening officers, and Flight Dynamics Operations (FDO) teams. It synthesizes 18th Space Defense Squadron (SDS) Conjunction Data Messages (CDMs), SGP4 orbital altitude decay profiles, Hall-effect Xenon thruster delta-V ledgers, and FCC/ESA de-orbit compliance SLAs into a unified deep-space radar interface.

---

## 🛰️ Core Telemetry Capabilities

1. **Conjunction Alert Ribbon & B-Plane Covariance Screening**
   - Live ticker tracking Red-Threshold LEO debris approaches (e.g., `COSMOS-2251 DEB [34427] vs. VANGUARD-04 [58214] // TCA: T-01:42:19 // MISS DIST: 142m // Pc: 4.8e-4`).
   - Interactive **Conjunction Miss-Distance & Covariance Envelope** charts modeling radial/in-track/cross-track $3\sigma$ dispersion ellipsoids across approach epochs.

2. **Orbital Altitude Decay & Thermospheric Drag Profiling**
   - Dual-axis telemetry plotting mean shell altitude (km) against 10.7cm Solar Radio Flux ($F_{10.7}$ SFU) and geomagnetic $K_p$ indices to quantify thermospheric scale-height expansion during solar storms.

3. **Constellation Ephemeris & Thruster Delta-V Ledger**
   - Complete NORAD / COSPAR spacecraft registry across Orbital Planes A, B, and C ($53.0^\circ$ inclination shell).
   - Tracks real-time inclination, eccentricity, mean motion (rev/day), Hall-effect Xenon propellant tank reserves (%), remaining $\Delta V$ budgets (m/s), and one-click TLE CSV export.

4. **Orbital Safety & FCC / ESA De-Orbit Compliance Matrix**
   - Automated SLA tracking for the FCC 5-year post-mission disposal fuel reserve threshold ($4.12\text{ kg}$ vs. $4.50\text{ kg}$ minimum requirement), Collision Avoidance Maneuver (CAM) readiness windows, and Ka-band / Optical Inter-Satellite Link (OISL) margin (dB).

5. **Tracked Debris Cloud & High-Interest Object Registry**
   - Catalog of high-risk fragmentation debris (`COSMOS-2251 DEB`, `SL-16 R/B FRAG`, `FENGYUN-1C DEB`, `CZ-6A R/B DEB`) with Radar Cross Section ($\text{m}^2$), relative velocity ($\text{km/s}$), collision probability ($P_c$), and tracking radar station attribution (Eglin AN/FPS-85, Kwajalein Space Fence, Fylingdales SSPARS, LeoLabs Kiwi Radar).

6. **Multi-Role Flight Control RBAC Console**
   - **Orbital Analyst (`normal_user`)**, **Constellation Lead (`company_admin`)**, and **Kessler Flight Dynamics Director (`super_admin`)** roles.
   - Dedicated FDO Command Console (`/admin`) for orbital shell provisioning, TLE/CDM batch ingest, radar plot uploads, and crew clearance management.

---

## 💻 Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tooling:** Vite 6
- **Design System:** Tailwind CSS v4 + Custom Deep-Space Radar Theme (`#06080D` Obsidian Canvas, `#0D131C` Radar Slate, `#1A2636` Hairline Grid, `#06B6D4` Nominal Cyan, `#F59E0B` Phosphor Amber, `#EF4444` Critical Crimson)
- **Typography:** `Space Grotesk` / `Inter` (Headers) + `JetBrains Mono` (TLE Vectors, Apogee/Perigee Readouts, UTC Clocks)
- **Visualizations:** Recharts & Custom SVG Telemetry Gauges

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start local telemetry server
npm run dev

# Build production bundle
npm run build
```

### 1-Click Mission Crew Demo Access
The Flight Control Sign-In screen (`/login`) includes 1-click authentication presets (Security Key: `Password123!`):
- **Orbital Analyst:** `analyst@firm.com` (or `fdo@vanguard.space`)
- **Constellation Lead:** `cfo@apexbrands.com` (or `lead@vanguard.space`)
- **Kessler FDO Director:** `admin@aegisterminal.com` (or `director@kessler.space` — 2FA Token pre-filled as `123456`)
