import { SectorNews } from '../components/SectorNews';
import { EquityPricingChart } from '../components/EquityPricingChart';
import { MarketTrendsPanel } from '../components/MarketTrendsPanel';

export default function SectorNewsPage() {
  return (
    <div className="pt-1">
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
  );
}
