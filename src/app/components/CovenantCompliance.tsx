import { XCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export function CovenantCompliance() {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  const complianceMetrics = [
    {
      label: '5-Yr De-Orbit Reserve Fuel (VGD-04)',
      actual: 4.12,
      threshold: 4.5,
      unit: ' kg',
      status: 'VIOLATED' as const,
      violated: true,
      percentage: (4.12 / 4.5) * 100
    },
    {
      label: 'CAM Execution Readiness SLA (Pc > 1e-4)',
      actual: 102,
      threshold: 180,
      unit: ' min',
      status: 'WARNING' as const,
      violated: true,
      percentage: (102 / 180) * 100
    },
    {
      label: 'Ka-Band / Optical ISL Link Margin',
      actual: 9.8,
      threshold: 6.0,
      unit: ' dB',
      status: 'NOMINAL' as const,
      violated: false,
      percentage: 100
    }
  ];

  const hasViolations = complianceMetrics.some(c => c.violated);

  return (
    <div
      className="p-4 md:p-6 transition-colors duration-300"
      style={{
        backgroundColor: themeColors.bgSecondary,
        border: hasViolations ? `1px solid ${themeColors.alertRed}` : `1px solid ${themeColors.borderPrimary}`
      }}
    >
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: themeColors.textPrimary }} className="md:text-base font-mono tracking-wide">
          ORBITAL SAFETY & FCC/ESA DE-ORBIT COMPLIANCE MATRIX
        </h3>
        <span
          className="px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.14)',
            color: themeColors.alertRed,
            border: `1px solid rgba(239, 68, 68, 0.35)`
          }}
        >
          2 SLA BREACHES
        </span>
      </div>

      <div className="space-y-5">
        {complianceMetrics.map((metric, index) => {
          const barColor =
            metric.status === 'VIOLATED'
              ? themeColors.alertRed
              : metric.status === 'WARNING'
                ? themeColors.alertAmber
                : themeColors.accentPrimary;

          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {metric.status === 'VIOLATED' ? (
                    <XCircle className="w-5 h-5" style={{ color: themeColors.alertRed }} />
                  ) : metric.status === 'WARNING' ? (
                    <AlertTriangle className="w-5 h-5" style={{ color: themeColors.alertAmber }} />
                  ) : (
                    <CheckCircle className="w-5 h-5" style={{ color: themeColors.accentPrimary }} />
                  )}
                  <span style={{ fontSize: '14px', fontWeight: 500, color: themeColors.textPrimary }}>
                    {metric.label}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    fontFamily: 'JetBrains Mono, monospace',
                    color:
                      metric.status === 'VIOLATED'
                        ? themeColors.alertRed
                        : metric.status === 'WARNING'
                          ? themeColors.alertAmber
                          : themeColors.accentPrimary
                  }}
                >
                  {metric.actual} / {metric.threshold}
                  {metric.unit}
                </span>
              </div>

              <div className="w-full h-7 md:h-8 rounded-sm relative overflow-hidden" style={{ backgroundColor: themeColors.borderPrimary }}>
                <div
                  className="h-7 md:h-8 rounded-sm transition-all relative"
                  style={{
                    width: `${Math.min(metric.percentage, 100)}%`,
                    backgroundColor: barColor,
                    opacity: theme === 'light' ? 0.9 : 0.85
                  }}
                >
                  <span
                    className="absolute left-2.5 md:left-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      fontFamily: 'JetBrains Mono, monospace',
                      color: '#FFFFFF',
                      textShadow: '0 1px 2px rgba(0,0,0,0.45)'
                    }}
                  >
                    {metric.status} // {metric.actual} / {metric.threshold}
                    {metric.unit}
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
