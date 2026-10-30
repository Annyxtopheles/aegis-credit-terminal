import { TopPriorities } from '../components/TopPriorities';
import { KeyEvents } from '../components/KeyEvents';
import { ThreatBanner } from '../components/ThreatBanner';
import { MetricsCommandBar } from '../components/MetricsCommandBar';
import { BPlaneRadarScope } from '../components/BPlaneRadarScope';
import { MarketTrendsPanel } from '../components/MarketTrendsPanel';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export default function PerformanceAnalysisPage() {
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

      {/* 3-Column Tactical Maneuver & Burn Queue Layout */}
      <div className="px-3 md:px-5 py-4">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
          <div className="xl:col-span-4">
            <BPlaneRadarScope />
          </div>
          <div className="xl:col-span-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TopPriorities />
              <KeyEvents />
            </div>
            <MarketTrendsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
