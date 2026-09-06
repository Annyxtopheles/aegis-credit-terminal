import { CovenantCompliance } from '../components/CovenantCompliance';
import { AegisCommentary } from '../components/AegisCommentary';
import { ThreatBanner } from '../components/ThreatBanner';
import { MetricsCommandBar } from '../components/MetricsCommandBar';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';
import chart1 from '../../imports/Acrobat_HfYP2qr7JM.png';
import chart2 from '../../imports/Acrobat_zSCb2MAnh3.png';
import chart3 from '../../imports/Acrobat_ofuwlBXWt1.png';
import chart4 from '../../imports/Acrobat_GigJLNKNda.png';

export default function CovenantCompliancePage() {
  const { theme } = useTheme();
  const tc = colors[theme];

  const charts = [
    { src: chart1, alt: 'Debt/EBITDA Waterfall' },
    { src: chart2, alt: 'Revenue & YoY Growth' },
    { src: chart3, alt: 'Net Sales by Segment' },
    { src: chart4, alt: 'EBITDA % by Segment' }
  ];

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
        {/* Row 1: Covenant Compliance + Aegis Intelligence Commentary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <CovenantCompliance />
          <AegisCommentary
            content={[
              "Company in violation of Net Debt/EBITDA covenant",
              "Compliance with Interest Coverage Covenant dependent on definition of Adjusted EBITDA."
            ]}
          />
        </div>

        {/* Row 2: 4 Charts + Aegis Intelligence Commentary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div className="grid grid-cols-2 gap-4">
            {charts.map((chart, i) => (
              <div
                key={i}
                className="rounded overflow-hidden"
                style={{
                  backgroundColor: tc.bgSecondary,
                  border: `1px solid ${tc.borderPrimary}`
                }}
              >
                <img
                  src={chart.src}
                  alt={chart.alt}
                  className="w-full h-full object-contain"
                  style={{ display: 'block' }}
                />
              </div>
            ))}
          </div>
          <AegisCommentary
            content={[
              "Company has seen largely flat cash flow since 2022. If the Company had not sold existing divisions, then they would have a negative cash balance currently",
              "The key driver behind the decline in cash is a slowdown in sales.",
              "Since Q1'23, the Company has seen negative sequential quarterly sales growth on a Y/o/Y% basis. Overall, sales have dropped from $2.2B in FY222 to $1.9B in FY2024.",
              "Apex Brands Group has issues with its frozen & vegetables division and is pursuing a strategic review that could result in its sale.",
              "Since FY2022, the frozen & vegetables division has seen a reduction in revenue from $526M to $386M, dropping from 38% of total net revenue to 31%.",
              "Notably EBITDA has dropped from $46M to $10M in the same time span.",
              "The Company has mentioned higher raw material costs and lower volumes, in addition to the divestiture of the Verdant Harvest shelf stable product line as drivers for the decline in performance."
            ]}
          />
        </div>
      </div>
    </div>
  );
}
