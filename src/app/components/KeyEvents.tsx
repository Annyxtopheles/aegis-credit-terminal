import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export function KeyEvents() {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  const events = [
    'TCA Red Conjunction Window: VANGUARD-04 vs. COSMOS-2251 DEB (T-01:42:19 UTC)',
    'Svalbard S-Band Ground Station AOS Pass — Command Uplink & Ephemeris Refresh (16:40 UTC)',
    'Scheduled Plane-B Inclination Trim & Momentum Wheel Desaturation Burn (Nov 02, 04:15 UTC)'
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
        className="mb-4 md:mb-6 font-mono"
        style={{
          fontSize: '15px',
          fontWeight: 700,
          color: themeColors.textPrimary,
          letterSpacing: '0.04em'
        }}
      >
        UPCOMING ORBITAL BURN & PASS WINDOWS
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
            <span style={{ color: themeColors.accentPrimary, flexShrink: 0, fontFamily: 'JetBrains Mono, monospace' }}>•</span>
            <span className="md:text-sm">{event}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
