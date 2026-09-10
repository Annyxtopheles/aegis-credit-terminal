import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export function ThreatBanner() {
  const { theme } = useTheme();
  const tc = colors[theme];
  const isDark = theme === 'dark';

  return (
    <div
      className="h-8 flex items-center justify-between px-3 md:px-4 border rounded-sm transition-colors duration-200 overflow-hidden"
      style={{
        backgroundColor: isDark ? '#161113' : '#FEE2E2',
        borderColor: isDark ? 'rgba(229, 72, 77, 0.35)' : '#FCA5A5'
      }}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <span
          className="w-2.5 h-2.5 rounded-full animate-pulse flex-shrink-0"
          style={{ backgroundColor: isDark ? '#E5484D' : '#B91C1C' }}
        />
        <span
          className="uppercase tracking-[0.08em] font-mono text-[10px] md:text-[11px] font-bold truncate"
          style={{ color: isDark ? '#E5484D' : '#991B1B' }}
        >
          DIRECTIVE:{' '}
          <span
            className="hidden sm:inline font-semibold"
            style={{ color: isDark ? '#EDEDED' : '#7F1D1D' }}
          >
            CRITICAL TO MAINTAIN STAKEHOLDER SUPPORT AMID DIVESTITURE PLAN
          </span>
          <span
            className="sm:hidden font-semibold"
            style={{ color: isDark ? '#EDEDED' : '#7F1D1D' }}
          >
            MAINTAIN STAKEHOLDER SUPPORT
          </span>
        </span>
      </div>
      <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
        <span
          className="font-mono text-[9px] uppercase tracking-wider font-semibold"
          style={{ color: isDark ? '#8E939D' : '#7F1D1D' }}
        >
          STATUS: ACTIVE COVENANT BREACH (2)
        </span>
      </div>
    </div>
  );
}
