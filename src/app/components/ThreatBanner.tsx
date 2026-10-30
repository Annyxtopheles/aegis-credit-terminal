import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export function ThreatBanner() {
  const { theme } = useTheme();
  const tc = colors[theme];

  return (
    <div
      className="h-11 flex items-center justify-between px-4 border rounded-2xl transition-colors duration-200 overflow-hidden"
      style={{
        backgroundColor: `${tc.alertRed}14`,
        borderColor: `${tc.alertRed}40`
      }}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <span
          className="w-2.5 h-2.5 rounded-full animate-pulse flex-shrink-0"
          style={{ backgroundColor: tc.alertRed }}
        />
        <span
          className="tracking-wide font-mono text-[11px] font-bold truncate"
          style={{ color: tc.alertRed }}
        >
          CONJUNCTION ALERT:{' '}
          <span
            className="hidden sm:inline font-semibold"
            style={{ color: tc.textPrimary }}
          >
            COSMOS-2251 DEB [34427] vs. VANGUARD-04 [58214] // TCA: T-01:42:19 // MISS DIST: 142m // Pc: 4.8e-4
          </span>
          <span
            className="sm:hidden font-semibold"
            style={{ color: tc.textPrimary }}
          >
            COSMOS-2251 DEB vs VANGUARD-04 // Pc: 4.8e-4
          </span>
        </span>
      </div>
      <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
        <span
          className="px-2.5 py-1 rounded-lg font-mono text-[10px] uppercase tracking-wider font-bold"
          style={{
            backgroundColor: `${tc.alertAmber}20`,
            color: tc.alertAmber,
            border: `1px solid ${tc.alertAmber}45`
          }}
        >
          CAM BURN ARMED (+0.85 m/s)
        </span>
        <span
          className="font-mono text-[11px] font-medium"
          style={{ color: tc.textSecondary }}
        >
          550 KM LEO SHELL-1
        </span>
      </div>
    </div>
  );
}
