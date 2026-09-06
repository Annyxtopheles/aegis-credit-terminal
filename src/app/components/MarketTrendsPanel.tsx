import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export function MarketTrendsPanel() {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  const trends = [
    'Out-of-court debt exchange offer contractually linked to a pre-arranged U.K. Restructuring Plan that activates if participation falls below threshold, enabling surgical capital restructuring without full chapter 11.',
    'If sufficient holders tender, the exchange completes out-of-court; if not, the company activates the U.K. plan, obtains court sanction, and uses chapter 15 recognition to bind remaining U.S. creditors.',
    'Preserves equity and listing while targeting only problematic debt (in Fossil\'s case retail bonds), leveraging U.K. flexibility on releases and cross-class cram-down for U.S.-law instruments.'
  ];

  return (
    <div
      className="p-4 md:p-6 transition-colors duration-300"
      style={{
        backgroundColor: themeColors.bgSecondary,
        border: `1px solid ${themeColors.borderPrimary}`,
        borderLeft: `3px solid ${themeColors.accentPrimary}`,
      }}
    >
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: themeColors.accentPrimary, marginBottom: '12px' }} className="md:text-base md:mb-4">
        MARKET TRENDS
      </h3>

      <p style={{ fontSize: '13px', lineHeight: '1.6', color: themeColors.textPrimary, marginBottom: '12px' }} className="md:text-sm md:leading-relaxed md:mb-4">
        Law firm Weil Gotshal recently pioneered a new debt reduction transaction for Fossil Group that left equity stakes unimpaired.
      </p>

      <ul className="space-y-3 md:space-y-4">
        {trends.map((trend, index) => (
          <li
            key={index}
            className="flex gap-2 md:gap-3"
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: themeColors.textPrimary
            }}
          >
            <span style={{ color: themeColors.accentPrimary, flexShrink: 0 }}>•</span>
            <span className="md:text-sm md:leading-relaxed">{trend}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}