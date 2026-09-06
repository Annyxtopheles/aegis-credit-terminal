import { ThreatBanner } from '../components/ThreatBanner';
import { MetricsCommandBar } from '../components/MetricsCommandBar';
import { DebtPricingChart } from '../components/DebtPricingChart';
import { AegisCommentary } from '../components/ICRCommentary';
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
              "Debt price dropped sharply after Verdant Harvest's sale announcement to Nortera Foods (Oct 27, 2025), its Sr Secured Note due 9/15/27 hitting a 3-month low of $0.9526 on Nov 4, down from $0.9778 on announcement day. The volume of debt traded in the 7 days following the trade was ~179% higher than the 7 days preceding the trade."
            ]}
          />
          <LargestHoldersTable />
        </div>
      </div>
    </div>
  );
}
