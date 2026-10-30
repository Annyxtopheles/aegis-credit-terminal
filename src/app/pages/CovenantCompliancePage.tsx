import { CovenantCompliance } from '../components/CovenantCompliance';
import { AegisCommentary } from '../components/AegisCommentary';
import { ThreatBanner } from '../components/ThreatBanner';
import { MetricsCommandBar } from '../components/MetricsCommandBar';
import { FinancialPerformanceGrid } from '../components/FinancialPerformanceGrid';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export default function CovenantCompliancePage() {
  const { theme } = useTheme();
  const tc = colors[theme];

  return (
    <div>
      {/* Sticky Header Section */}
      <div
        className="sticky top-0 z-30 p-2 space-y-2"
        style={{ backgroundColor: tc.bgPrimary }}
      >
        <ThreatBanner />
        <MetricsCommandBar />
      </div>

      {/* Scrollable Content */}
      <div className="p-3 md:p-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <CovenantCompliance />
          <AegisCommentary
            content={[
              "VANGUARD-04 currently violates FCC 5-year post-mission disposal propellant margin threshold (actual reserve 4.12 kg vs 4.50 kg minimum de-orbit allocation).",
              "Transponder S-band link margin degradation observed during solar proton flux event; automated gain control compensating within nominal ITU interference envelope."
            ]}
          />
        </div>

        <FinancialPerformanceGrid />
      </div>
    </div>
  );
}
