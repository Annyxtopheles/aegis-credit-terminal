import { ThreatBanner } from '../components/ThreatBanner';
import { MetricsCommandBar } from '../components/MetricsCommandBar';
import { DebtPricingChart } from '../components/DebtPricingChart';
import { AegisCommentary } from '../components/AegisCommentary';
import { LargestHoldersTable } from '../components/LargestHoldersTable';
import { BPlaneRadarScope } from '../components/BPlaneRadarScope';
import { CovenantCompliance } from '../components/CovenantCompliance';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export default function OverviewPage() {
  const { theme } = useTheme();
  const tc = colors[theme];

  return (
    <div>
      {/* Sticky Telemetry Directive Strip */}
      <div
        className="sticky top-0 z-20 px-3 md:px-5 py-2 space-y-2 border-b"
        style={{
          backgroundColor: tc.bgPrimary,
          borderColor: tc.borderPrimary
        }}
      >
        <ThreatBanner />
        <MetricsCommandBar />
      </div>

      {/* Asymmetric Mission Control Bento Grid */}
      <div className="px-3 md:px-5 py-4 space-y-4">
        {/* Top Row: Left B-Plane Polar Radar + Right Altitude/Drag Telemetry */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
          <div className="xl:col-span-4">
            <BPlaneRadarScope />
          </div>
          <div className="xl:col-span-8 flex flex-col justify-between gap-4">
            <DebtPricingChart />
            <CovenantCompliance />
          </div>
        </div>

        {/* Bottom Row: Debris Registry + Streaming Log */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
          <div className="xl:col-span-7">
            <LargestHoldersTable />
          </div>
          <div className="xl:col-span-5">
            <AegisCommentary
              content={[
                "VANGUARD-04 [NORAD 58214] entered Red-Threshold Conjunction Watch against COSMOS-2251 DEB [34427] following the 06:00 UTC 18th SDS Spacetrack CDM update. Radial miss distance is projected at 142m (Pc = 4.8e-4) at T-01:42:19 UTC.",
                "Automated prograde Hall-effect thruster burn (+0.85 m/s ΔV) is armed on VGD-04 to raise apogee by +1.85 km and expand post-burn B-plane miss distance to 1,850m.",
                "Thermospheric scale-height expansion from NOAA G2 geomagnetic storming (F10.7 = 184 SFU) has increased atmospheric drag across Plane B by +18.4% over the trailing 72-hour epoch."
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
