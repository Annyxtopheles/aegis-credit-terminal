import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

interface AegisCommentaryProps {
  content?: string[];
}

const DEFAULT_CONTENT = [
  "VANGUARD-04 [NORAD 58214] remains under active Red-Threshold Conjunction Watch against COSMOS-2251 DEB [34427] with Time of Closest Approach (TCA) at T-01:42:19 UTC. Automated Hall-Effect prograde ΔV burn (+0.85 m/s) is armed and uploaded to the onboard flight computer.",
  "Elevated thermospheric heating from NOAA G2 geomagnetic activity (F10.7 = 184 SFU, Kp = 5.3) has increased atmospheric drag across Orbital Plane B by +18.4%, requiring an unscheduled station-keeping altitude boost on VGD-08 and VGD-12 during the 16:40 UTC Svalbard ground pass.",
  "Constellation-wide Xenon propellant reserves average 84.2% across all 48 active SV nodes, with only VGD-04 dipping slightly below the 5-year FCC de-orbit reserve threshold (4.12 kg vs 4.50 kg SLA) following three consecutive debris avoidance maneuvers in Q3-Q4."
];

export function AegisCommentary({ content = DEFAULT_CONTENT }: AegisCommentaryProps) {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  return (
    <div
      className="p-4 md:p-5 transition-colors duration-300 rounded-sm"
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(6, 182, 212, 0.06)' : 'rgba(8, 145, 178, 0.05)',
        border: `1px solid ${theme === 'dark' ? 'rgba(6, 182, 212, 0.22)' : 'rgba(8, 145, 178, 0.2)'}`,
        borderLeft: '3px solid #06B6D4'
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', color: '#06B6D4' }} className="md:text-sm uppercase font-mono">
          KESSLER FLIGHT DYNAMICS AUTOMATED TELEMETRY LOG
        </h4>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(6, 182, 212, 0.14)', color: '#06B6D4' }}>
          FDO-AUTOGEN // LIVE
        </span>
      </div>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} className="md:gap-3.5">
        {content.map((item, index) => (
          <li
            key={index}
            className="flex gap-2 md:gap-3"
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: themeColors.textPrimary
            }}
          >
            <span style={{ color: '#06B6D4', flexShrink: 0, fontFamily: 'JetBrains Mono, monospace' }}>[{index + 1}]</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AegisCommentary;
