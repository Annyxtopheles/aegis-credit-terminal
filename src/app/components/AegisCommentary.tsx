import { Terminal, Radio } from 'lucide-react';
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
  const tc = colors[theme];

  const logMeta = [
    { ts: '14:28:04.19Z', tag: 'CRIT // CDM-34427', color: tc.alertRed, sub: 'SGP4-BPLANE' },
    { ts: '14:24:51.82Z', tag: 'WARN // SWPC-G2', color: tc.alertAmber, sub: 'THERMO-DRAG' },
    { ts: '14:19:12.05Z', tag: 'INFO // XENON-SLA', color: tc.accentPrimary, sub: 'PROP-LEDGER' },
    { ts: '14:11:39.44Z', tag: 'SYNC // SVAL-02', color: tc.alertGreen, sub: 'OISL-RELAY' },
  ];

  return (
    <div
      className="transition-colors duration-300 rounded-sm overflow-hidden flex flex-col"
      style={{
        backgroundColor: tc.bgSecondary,
        border: `1px solid ${tc.borderPrimary}`
      }}
    >
      {/* Terminal Window Title Bar */}
      <div
        className="px-4 py-2.5 flex items-center justify-between border-b"
        style={{
          backgroundColor: tc.bgTertiary,
          borderColor: tc.borderPrimary
        }}
      >
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5" style={{ color: tc.accentPrimary }} />
          <h4 className="font-mono text-xs font-bold tracking-wider uppercase" style={{ color: tc.textPrimary }}>
            FDO AUTONOMOUS TELEMETRY EVENT STREAM // /dev/ttyS0-KESSLER
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <Radio className="w-3 h-3 animate-pulse" style={{ color: tc.alertGreen }} />
          <span className="font-mono text-[10px] font-bold" style={{ color: tc.alertGreen }}>
            STREAMING
          </span>
        </div>
      </div>

      {/* Monospace Timestamped Console Rows */}
      <div className="p-3 md:p-4 space-y-2.5 font-mono">
        {content.map((item, index) => {
          const meta = logMeta[index % logMeta.length];
          return (
            <div
              key={index}
              className="p-2.5 rounded-sm transition-colors"
              style={{
                backgroundColor: tc.bgPrimary,
                border: `1px solid ${tc.borderPrimary}`,
                borderLeft: `3px solid ${meta.color}`
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px]" style={{ color: tc.textTertiary }}>
                    [{meta.ts}]
                  </span>
                  <span
                    className="px-1.5 py-0.2 rounded-sm text-[9px] font-bold"
                    style={{
                      backgroundColor: `${meta.color}20`,
                      color: meta.color
                    }}
                  >
                    {meta.tag}
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-wider" style={{ color: tc.textTertiary }}>
                  SUBSYS: {meta.sub}
                </span>
              </div>
              <p
                style={{
                  fontSize: '12px',
                  lineHeight: '1.55',
                  color: tc.textPrimary
                }}
              >
                {item}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AegisCommentary;
