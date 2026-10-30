import { ThreatBanner } from './ThreatBanner';
import { MetricsCommandBar } from './MetricsCommandBar';
import { DebtPricingChart } from './DebtPricingChart';
import { AegisCommentary } from './AegisCommentary';
import { CapitalStructureTable } from './CapitalStructureTable';
import { CovenantCompliance } from './CovenantCompliance';
import { FinancialPerformanceGrid } from './FinancialPerformanceGrid';
import { LargestHoldersTable } from './LargestHoldersTable';
import { TopPrioritiesKeyEvents } from './TopPrioritiesKeyEvents';
import { SectorNews } from './SectorNews';
import { MarketTrendsPanel } from './MarketTrendsPanel';
import { EquityPricingChart } from './EquityPricingChart';

export function AppContent() {
  const KESSLER_TELEMETRY_LOG = [
    "VANGUARD-04 [NORAD 58214] remains under active Red-Threshold Conjunction Watch against COSMOS-2251 DEB [34427] with Time of Closest Approach (TCA) at T-01:42:19 UTC; automated Hall-Effect prograde ΔV burn (+0.85 m/s) armed.",
    "Thermospheric scale-height expansion driven by NOAA G2 geomagnetic activity (F10.7 = 184 SFU, Kp = 5.3) has elevated atmospheric drag across Plane B by +18.4%; differential drag pitch profile engaged on VGD-08 and VGD-12.",
    "Flight Dynamics Director has scheduled high-priority Ka-band ephemeris uplink via Svalbard Ground Station (SVAL-02) at 16:40 UTC to verify post-burn radial miss distance (>1.85 km target).",
    "18th Space Defense Squadron and LeoLabs S-band radar networks confirm zero secondary conjunctions across the remaining 47 Vanguard Shell-1 spacecraft through the next 72-hour screening epoch."
  ];

  return (
    <div>
      <ThreatBanner />

      <div className="px-3 md:px-6 py-4 md:py-6 space-y-6 md:space-y-8 max-w-[1920px] mx-auto">
        <MetricsCommandBar />
        <DebtPricingChart />
        <AegisCommentary content={KESSLER_TELEMETRY_LOG} />
        <CapitalStructureTable />
        <CovenantCompliance />
        <FinancialPerformanceGrid />
        <LargestHoldersTable />
        <TopPrioritiesKeyEvents />
        <SectorNews />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MarketTrendsPanel />
          <EquityPricingChart />
        </div>
      </div>
    </div>
  );
}
