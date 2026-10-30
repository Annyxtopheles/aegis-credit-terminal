import { CovenantCompliance } from '../components/CovenantCompliance';
import { AegisCommentary } from '../components/AegisCommentary';
import { ThreatBanner } from '../components/ThreatBanner';
import { MetricsCommandBar } from '../components/MetricsCommandBar';
import { FinancialPerformanceGrid } from '../components/FinancialPerformanceGrid';
import { BPlaneRadarScope } from '../components/BPlaneRadarScope';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export default function CovenantCompliancePage() {
  const { theme } = useTheme();
  const tc = colors[theme];

  return (
    <div>
      {/* Sticky Telemetry Directive Strip */}
      <div
        className="sticky top-0 z-20 px-3 md:px-5 py-2 space-y-2 border-b"
        style={{ backgroundColor: tc.bgPrimary, borderColor: tc.borderPrimary }}
      >
        <ThreatBanner />
        <MetricsCommandBar />
      </div>

      {/* Scrollable Content */}
      <div className="px-3 md:px-5 py-4 space-y-4">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
          <div className="xl:col-span-4">
            <BPlaneRadarScope />
          </div>
          <div className="xl:col-span-8 space-y-4">
            <CovenantCompliance />
            <AegisCommentary
              content={[
                "VANGUARD-04 currently violates FCC 5-year post-mission disposal propellant margin threshold (actual reserve 4.12 kg vs 4.50 kg minimum de-orbit allocation).",
                "Transponder S-band link margin degradation observed during solar proton flux event; automated gain control compensating within nominal ITU interference envelope."
              ]}
            />
          </div>
        </div>

        <FinancialPerformanceGrid />
      </div>
    </div>
  );
}
