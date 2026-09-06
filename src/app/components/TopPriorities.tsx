import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export function TopPriorities() {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  const priorities = [
    'Continue to focus on execution and communication of restructuring plan',
    'Regain compliance with covenants / update surrounding comms planning',
    'Analyze debt trading activity and update threat matrix',
    'Scenario planning / sensitivity analysis around potential divestitures',
    'Crisis simulation around supply chain and foreign currency shocks'
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
        TOP PRIORITIES
      </h3>

      <ul className="space-y-3 md:space-y-4">
        {priorities.map((priority, index) => (
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
            <span className="md:text-base">{priority}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
