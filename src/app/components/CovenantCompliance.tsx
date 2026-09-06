import { XCircle, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export function CovenantCompliance() {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  const covenants = [
    {
      label: 'Net Debt / EBITDA',
      actual: 7.52,
      threshold: 7.0,
      unit: 'x',
      violated: true
    },
    {
      label: 'Interest Coverage Ratio',
      actual: 1.89,
      threshold: 2.0,
      unit: 'x',
      violated: true
    }
  ];

  const hasViolations = covenants.some(c => c.violated);

  return (
    <div
      className="p-4 md:p-6 transition-colors duration-300"
      style={{
        backgroundColor: themeColors.bgSecondary,
        border: hasViolations ? `1px solid ${themeColors.alertRed}` : `1px solid ${themeColors.borderPrimary}`
      }}
    >
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: themeColors.textPrimary, marginBottom: '16px' }} className="md:text-base md:mb-6">
          COVENANT COMPLIANCE – Q4'25
        </h3>

        <div className="space-y-5">
          {covenants.map((covenant, index) => {
            const percentage = (covenant.actual / covenant.threshold) * 100;
            // For violated covenants → red. For compliant but close (< 115%) → amber. Otherwise green.
            const barColor = covenant.violated
              ? themeColors.alertRed
              : percentage < 115
                ? themeColors.alertAmber
                : themeColors.alertGreen;

            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {covenant.violated ? (
                      <XCircle className="w-5 h-5" style={{ color: themeColors.alertRed }} />
                    ) : (
                      <CheckCircle className="w-5 h-5" style={{ color: themeColors.alertGreen }} />
                    )}
                    <span style={{ fontSize: '14px', fontWeight: 500, color: themeColors.textPrimary }}>
                      {covenant.label}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      fontFamily: 'JetBrains Mono, monospace',
                      color: covenant.violated ? themeColors.alertRed : themeColors.textPrimary
                    }}
                  >
                    {covenant.actual.toFixed(1)} / {covenant.threshold.toFixed(1)}{covenant.unit}
                  </span>
                </div>

                <div className="w-full h-7 md:h-8 rounded-full relative" style={{ backgroundColor: themeColors.borderPrimary }}>
                  <div
                    className="h-7 md:h-8 rounded-full transition-all relative"
                    style={{
                      width: `${Math.min(percentage, 100)}%`,
                      backgroundColor: barColor,
                      opacity: theme === 'light' ? 0.9 : 1
                    }}
                  >
                    <span
                      className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2"
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        fontFamily: 'JetBrains Mono, monospace',
                        color: '#FFFFFF',
                        textShadow: theme === 'light' ? '0 1px 2px rgba(0,0,0,0.2)' : 'none'
                      }}
                    >
                      {covenant.actual.toFixed(1)} / {covenant.threshold.toFixed(1)}{covenant.unit}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
    </div>
  );
}