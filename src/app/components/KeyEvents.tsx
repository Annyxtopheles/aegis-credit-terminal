import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export function KeyEvents() {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  const events = [
    'Next Earning Date',
    'Lender Call Date',
    '$550m Senior Unsecured Note due Sep. 15, 2027 ($550m Outstanding)'
  ];

  return (
    <div
      className="p-4 md:p-6 transition-colors duration-300"
      style={{
        backgroundColor: themeColors.bgSecondary,
        border: `1px solid ${themeColors.borderPrimary}`
      }}
    >
      <h3
        className="mb-4 md:mb-6"
        style={{
          fontSize: '16px',
          fontWeight: 700,
          color: themeColors.textPrimary,
          letterSpacing: '0.02em'
        }}
      >
        KEY EVENTS
      </h3>

      <ul className="space-y-3 md:space-y-4">
        {events.map((event, index) => (
          <li
            key={index}
            className="flex gap-3"
            style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: themeColors.textPrimary
            }}
          >
            <span style={{ color: themeColors.textPrimary, flexShrink: 0 }}>•</span>
            <span className="md:text-base">{event}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
