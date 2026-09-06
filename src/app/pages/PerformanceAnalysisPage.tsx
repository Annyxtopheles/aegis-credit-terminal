import { TopPriorities } from '../components/TopPriorities';
import { KeyEvents } from '../components/KeyEvents';
import { ThreatBanner } from '../components/ThreatBanner';
import { MetricsCommandBar } from '../components/MetricsCommandBar';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export default function PerformanceAnalysisPage() {
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
        <TopPriorities />
        <KeyEvents />
      </div>
    </div>
  );
}
