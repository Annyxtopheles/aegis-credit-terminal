import { SectorNews } from '../components/SectorNews';
import { EquityPricingChart } from '../components/EquityPricingChart';
import { MarketTrendsPanel } from '../components/MarketTrendsPanel';
import { ThreatBanner } from '../components/ThreatBanner';
import { MetricsCommandBar } from '../components/MetricsCommandBar';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export default function SectorNewsPage() {
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
      <div className="px-3 md:px-5 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-6">
            <SectorNews />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <EquityPricingChart />
            <MarketTrendsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
