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
      {/* Sticky Header Section */}
      <div
        className="sticky top-0 z-30 p-2 space-y-2"
        style={{ backgroundColor: tc.bgPrimary }}
      >
        <ThreatBanner />
        <MetricsCommandBar />
      </div>

      {/* Scrollable Content */}
      <div className="p-3 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <SectorNews />

          <div className="space-y-4 md:space-y-6">
            <EquityPricingChart />
            <MarketTrendsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
