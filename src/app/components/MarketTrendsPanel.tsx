import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export function MarketTrendsPanel() {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  const protocols = [
    'Automated Differential Drag Control: Pitching solar arrays to +42° high-drag profile during perigee transits enables propellantless in-track phasing adjustments before resorting to Hall-effect Xenon burns.',
    'Multi-Sensor Covariance Fusion: Combining 18th SDS UHF radar tracks with commercial S-band phased-array observations shrinks 3σ in-track position ellipsoids from ±950m to ±180m at T-12 hours.',
    'Optical Inter-Satellite Link (OISL) Relay: Autonomous cross-link handoffs route Emergency Conjunction Data Messages (CDMs) across Plane A and Plane B in <180ms without waiting for Svalbard or Punta Arenas ground station AOS.'
  ];

  return (
    <div
      className="p-5 md:p-6 rounded-2xl transition-colors duration-300"
      style={{
        backgroundColor: themeColors.bgSecondary,
        border: `1px solid ${themeColors.borderPrimary}`,
        borderLeft: `3px solid ${themeColors.accentPrimary}`,
      }}
    >
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: themeColors.accentPrimary, marginBottom: '12px' }} className="md:text-base md:mb-4 font-mono tracking-wide">
        AUTONOMOUS CAM & COVARIANCE PROTOCOLS
      </h3>

      <p style={{ fontSize: '13px', lineHeight: '1.6', color: themeColors.textPrimary, marginBottom: '12px' }} className="md:text-sm md:leading-relaxed md:mb-4">
        Vanguard Flight Dynamics implements three-stage autonomous conjunction mitigation across the 550 km LEO shell:
      </p>

      <ul className="space-y-3 md:space-y-4">
        {protocols.map((protocol, index) => (
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
            <span className="md:text-sm md:leading-relaxed">{protocol}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
