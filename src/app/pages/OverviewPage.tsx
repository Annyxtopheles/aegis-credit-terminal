import { ThreatBanner } from '../components/ThreatBanner';
import { MetricsCommandBar } from '../components/MetricsCommandBar';
import { DebtPricingChart } from '../components/DebtPricingChart';
import { AegisCommentary } from '../components/AegisCommentary';
import { LargestHoldersTable } from '../components/LargestHoldersTable';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export default function OverviewPage() {
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
        <DebtPricingChart />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <AegisCommentary
            content={[
              "VANGUARD-04 [NORAD 58214] entered Red-Threshold Conjunction Watch against COSMOS-2251 DEB [34427] following the 06:00 UTC 18th SDS Spacetrack CDM update. Radial miss distance is projected at 142m (Pc = 4.8e-4) at T-01:42:19 UTC. An automated prograde Hall-effect thruster burn (+0.85 m/s ΔV) is armed to raise apogee by +1.85 km.",
              "Thermospheric scale-height expansion from NOAA G2 geomagnetic storming (F10.7 = 184 SFU) has increased atmospheric drag across Plane B by +18.4% over the trailing 72-hour epoch."
            ]}
          />
          <LargestHoldersTable />
        </div>
      </div>
    </div>
  );
}
