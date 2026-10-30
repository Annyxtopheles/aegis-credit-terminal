import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export function TopPriorities() {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  const priorities = [
    'Execute automated prograde Hall-effect CAM burn (+0.85 m/s) on VANGUARD-04 prior to COSMOS-2251 DEB TCA',
    'Re-allocate Plane B station-keeping propellant budget to preserve 5-year FCC de-orbit reserve threshold (≥4.50 kg)',
    'Cross-calibrate LeoLabs S-Band radar tracks against onboard GNSS ephemeris to shrink 3σ covariance ellipsoids',
    'Perform differential drag phasing across Plane A nodes during NOAA G2 geomagnetic thermospheric expansion',
    'Run autonomous star-tracker blinding recovery drill for South Atlantic Anomaly (SAA) high-proton flux transits'
  ];

  return (
    <div
      className="p-5 md:p-6 rounded-2xl transition-colors duration-300"
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
        FLIGHT DIRECTOR DIRECTIVES
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
            <span style={{ color: themeColors.accentPrimary, flexShrink: 0, fontFamily: 'JetBrains Mono, monospace' }}>•</span>
            <span className="md:text-sm">{priority}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
