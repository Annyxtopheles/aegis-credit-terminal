import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';
import { AegisCommentary } from '../components/ICRCommentary';
import { CapitalStructureTable } from '../components/CapitalStructureTable';
import { ThreatBanner } from '../components/ThreatBanner';
import { MetricsCommandBar } from '../components/MetricsCommandBar';

export default function CapitalStructurePage() {
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
        <AegisCommentary
          content={[
            "The Capital Group (via Capital World Investors, Capital Research and Management Co., & Capital International Inc.) increased its debt holding position in the Sr Secured Note due 9/15/28 by ~234.4% between Q2 and Q4'25. Between the three subsidiaries, total Q4'25 holdings of the instrument amount to ~$192.054M.",
            "Prudential Financial Inc.'s \"PGIM High Yield Fund\" increased its position from $20.550M to $26.375M (28.34%) between Q2 and Q4'25.",
            "PIMCO significantly reduced its holdings from Q3'24 to Q2'25 (−72.1%). In Q3, they bought back in, increasing their holdings from $8.534M to $17.175M (101.3%)"
          ]}
        />
        <CapitalStructureTable />
      </div>
    </div>
  );
}
