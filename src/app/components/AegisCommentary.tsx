import { Terminal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { colors, statusTones } from '../theme/colors';

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
  const tones = statusTones[theme];

  const logMeta = [
    {
      ts: '14:28:04 UTC',
      tag: 'Critical Conjunction',
      tone: tones.rose,
      sub: 'B-Plane Ephemeris'
    },
    {
      ts: '14:24:51 UTC',
      tag: 'Solar Storm Watch',
      tone: tones.amber,
      sub: 'Atmospheric Drag'
    },
    {
      ts: '14:19:12 UTC',
      tag: 'Propellant Ledger',
      tone: tones.indigo,
      sub: 'Xenon Reserve'
    },
    {
      ts: '14:11:39 UTC',
      tag: 'Ground Pass Sync',
      tone: tones.emerald,
      sub: 'Svalbard AOS'
    },
  ];

  return (
    <div
      className="p-6 rounded-2xl transition-colors duration-300 flex flex-col justify-between"
      style={{
        backgroundColor: tc.bgSecondary,
        border: `1px solid ${tc.borderPrimary}`
      }}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b" style={{ borderColor: tc.borderPrimary }}>
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{
              backgroundColor: tc.bgTertiary,
              color: tc.accentPrimary,
              border: `1px solid ${tc.borderPrimary}`
            }}
          >
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-tight" style={{ color: tc.textPrimary }}>
              Autonomous Telemetry Event Stream
            </h4>
            <p className="text-[11px]" style={{ color: tc.textSecondary }}>
              Live orbital events dispatched from flight computer
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-medium" style={{ color: tc.alertGreen }}>
            Live Stream
          </span>
        </div>
      </div>

      {/* Console Rows */}
      <div className="space-y-3">
        {content.map((item, index) => {
          const meta = logMeta[index % logMeta.length];
          return (
            <div
              key={index}
              className="p-4 rounded-xl transition-all duration-200"
              style={{
                backgroundColor: tc.bgTertiary,
                border: `1px solid ${tc.borderPrimary}`
              }}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium border"
                    style={{
                      backgroundColor: meta.tone.bg,
                      color: meta.tone.text,
                      borderColor: meta.tone.border
                    }}
                  >
                    {meta.tag}
                  </span>
                  <span className="text-[11px] tabular-nums" style={{ color: tc.textSecondary }}>
                    {meta.ts}
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-wider" style={{ color: tc.textTertiary }}>
                  {meta.sub}
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: tc.textPrimary }}>
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
