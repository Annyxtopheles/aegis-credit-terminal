import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export function TopPrioritiesKeyEvents() {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  const priorities = [
    'Continue to focus on execution and communication of restructuring plan',
    'Monitor lender sentiment and maintain regular stakeholder engagement',
    'Track Verdant Harvest divestiture timeline and negotiate favorable sale terms',
    'Assess covenant waiver conditions and ensure compliance with enhanced reporting',
    'Evaluate additional portfolio optimization opportunities to reduce leverage',
    'Maintain operational efficiency while managing cost reduction initiatives'
  ];

  const events = [
    'Next Earnings Date',
    'Lender Call',
    '$550M Senior Secured Note Due',
    '$550M Senior Unsecured Note Due',
    'Covenant Waiver Expiration (Extended)',
    'Verdant Harvest Divestiture Expected Close'
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div
        className="p-4 md:p-6 transition-colors duration-300"
        style={{
          backgroundColor: themeColors.bgSecondary,
          border: `1px solid ${themeColors.borderPrimary}`
        }}
      >
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: themeColors.textPrimary, marginBottom: '12px' }} className="md:text-base md:mb-4">
          TOP PRIORITIES
        </h3>
        <ul className="space-y-2 md:space-y-3">
          {priorities.map((priority, index) => (
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
              <span className="md:text-sm md:leading-relaxed">{priority}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="p-4 md:p-6 transition-colors duration-300"
        style={{
          backgroundColor: themeColors.bgSecondary,
          border: `1px solid ${themeColors.borderPrimary}`
        }}
      >
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: themeColors.textPrimary, marginBottom: '12px' }} className="md:text-base md:mb-4">
          KEY EVENTS
        </h3>
        <ul className="space-y-2 md:space-y-3">
          {events.map((event, index) => (
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
              <span className="md:text-sm md:leading-relaxed">{event}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}