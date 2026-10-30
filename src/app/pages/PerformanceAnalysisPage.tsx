import { TopPriorities } from '../components/TopPriorities';
import { KeyEvents } from '../components/KeyEvents';
import { BPlaneRadarScope } from '../components/BPlaneRadarScope';
import { MarketTrendsPanel } from '../components/MarketTrendsPanel';

export default function PerformanceAnalysisPage() {
  return (
    <div className="space-y-5 pt-1">
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
  );
}
