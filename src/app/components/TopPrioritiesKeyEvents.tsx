import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export function TopPrioritiesKeyEvents() {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  const priorities = [
    'Execute automated prograde Hall-effect CAM burn (+0.85 m/s) on VANGUARD-04 prior to COSMOS-2251 DEB TCA',
    'Maintain continuous 18th SDS & LeoLabs CDM covariance screening across all 48 Shell-1 spacecraft',
    'Re-balance Xenon propellant allocation on Plane B to restore 5-year FCC de-orbit margin above 4.50 kg',
    'Validate Optical Inter-Satellite Link (OISL) autonomous telemetry relay latency (<180ms across Planes A–C)',
    'Execute high-drag solar array feathering protocol (+42° pitch) on VGD-12 for propellantless phasing',
    'Calibrate star-tracker B blinding protection masks ahead of South Atlantic Anomaly (SAA) orbital transits'
  ];

  const events = [
    'T-01:42:19 UTC // VANGUARD-04 vs. COSMOS-2251 DEB Red Conjunction TCA',
    '16:40 UTC // Svalbard Ground Station (SVAL-02) Ka-Band Telemetry & Ephemeris Uplink',
    '19:15 UTC // VANGUARD-08 Prograde Perigee Raising Burn (+0.32 m/s ΔV)',
    '22:05 UTC // Punta Arenas Ground Station (PAR-01) Optical Calibration Pass',
    'Nov 02, 04:15 UTC // Shell-1 Plane-B Autonomous Station-Keeping Cycle',
    'Nov 05, 00:00 UTC // Quarterly FCC / ESA Orbital Debris Mitigation SLA Audit Filing'
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
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: themeColors.textPrimary, marginBottom: '12px' }} className="md:text-base md:mb-4 font-mono tracking-wide">
          FLIGHT DIRECTOR DIRECTIVES
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
              <span style={{ color: themeColors.accentPrimary, flexShrink: 0, fontFamily: 'JetBrains Mono, monospace' }}>•</span>
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
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: themeColors.textPrimary, marginBottom: '12px' }} className="md:text-base md:mb-4 font-mono tracking-wide">
          UPCOMING ORBITAL BURN & PASS WINDOWS
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
              <span style={{ color: themeColors.accentPrimary, flexShrink: 0, fontFamily: 'JetBrains Mono, monospace' }}>•</span>
              <span className="md:text-sm md:leading-relaxed font-mono">{event}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
