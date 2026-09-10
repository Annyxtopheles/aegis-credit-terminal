import { AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export function MetricsCommandBar() {
  const { theme } = useTheme();
  const themeColors = colors[theme];
  const metrics = [
    {
      label: 'THREAT LEVEL',
      value: 'ELEVATED',
      secondary: '',
      color: themeColors.alertRed,
      icon: true
    },
    {
      label: 'UPCOMING TRANCHE SIZE',
      value: '$550.00m',
      secondary: '(Sr Note)',
      color: '#FFFFFF'
    },
    {
      label: 'UPCOMING TRANCHE MATURITY',
      value: '9/15/2027',
      secondary: '',
      color: '#FFFFFF'
    },
    {
      label: 'NET DEBT/EBITDA',
      value: '7.52x',
      secondary: '',
      color: themeColors.alertRed
    },
    {
      label: 'DEBT PRICE',
      value: '$97.71',
      secondary: '',
      color: themeColors.alertRed
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="p-2 transition-colors duration-300"
          style={{
            backgroundColor: themeColors.bgSecondary,
            border: `1px solid ${themeColors.borderPrimary}`
          }}
        >
          <div
            className="uppercase tracking-wider mb-1"
            style={{
              fontSize: '10px',
              color: themeColors.textSecondary,
              fontWeight: 300,
              letterSpacing: '0.05em'
            }}
          >
            {metric.label}
          </div>
          <div className="flex items-center gap-1.5">
            {metric.icon && <AlertCircle className="w-4 h-4" style={{ color: metric.color }} />}
            <div
              style={{
                fontSize: metric.label === 'UPCOMING TRANCHE MATURITY' ? '20px' : '20px',
                fontWeight: 700,
                color: metric.color === '#FFFFFF' ? themeColors.textPrimary : metric.color,
                fontFamily: metric.label === 'DEBT PRICE' || metric.label === 'NET DEBT/EBITDA' ? 'JetBrains Mono, monospace' : 'inherit',
                lineHeight: '1.2'
              }}
            >
              {metric.value}
            </div>
          </div>
          {metric.secondary && (
            <div style={{ fontSize: '10px', color: themeColors.textSecondary, marginTop: '2px' }}>
              {metric.secondary}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}