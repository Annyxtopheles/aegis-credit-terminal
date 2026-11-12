import { Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { colors, statusTones } from '../theme/colors';

export function TopPriorities() {
  const { theme } = useTheme();
  const tc = colors[theme];
  const tones = statusTones[theme];

  const priorities = [
    {
      id: '01',
      title: 'Automated Hall-Effect CAM Burn (+0.85 m/s)',
      description: 'Execute prograde thruster pulse on VANGUARD-04 prior to COSMOS-2251 DEB TCA epoch.',
      priority: 'Urgent',
      tone: tones.rose,
      time: 'T-01:42:19'
    },
    {
      id: '02',
      title: 'Re-Allocate Plane B Station-Keeping Budget',
      description: 'Adjust nominal altitude trim cycles to preserve the 5-year FCC de-orbit reserve floor (≥4.50 kg).',
      priority: 'High',
      tone: tones.amber,
      time: 'Next Orbit'
    },
    {
      id: '03',
      title: 'Cross-Calibrate LeoLabs Radar Tracks',
      description: 'Fuse commercial S-band phased-array observations with onboard GNSS ephemeris to shrink 3σ covariance.',
      priority: 'Routine',
      tone: tones.indigo,
      time: 'Continuous'
    },
    {
      id: '04',
      title: 'Differential Drag Phasing Across Plane A',
      description: 'Pitch solar arrays to high-drag configuration during NOAA G2 geomagnetic thermospheric expansion.',
      priority: 'Active',
      tone: tones.emerald,
      time: 'Window Open'
    }
  ];

  return (
    <div
      className="p-6 rounded-2xl transition-colors duration-300"
      style={{
        backgroundColor: tc.bgSecondary,
        border: `1px solid ${tc.borderPrimary}`
      }}
    >
      <div className="flex items-center justify-between pb-4 mb-5 border-b" style={{ borderColor: tc.borderPrimary }}>
        <div>
          <h3 className="text-[16px] font-semibold tracking-tight" style={{ color: tc.textPrimary }}>
            Flight Director Directives
          </h3>
          <p className="text-xs mt-0.5" style={{ color: tc.textSecondary }}>
            Operational queue prioritized by time-to-closest-approach and safety margins
          </p>
        </div>
        <span
          className="px-2.5 py-1 rounded-full text-xs font-medium border shrink-0"
          style={{
            backgroundColor: tones.indigo.bg,
            color: tones.indigo.text,
            borderColor: tones.indigo.border
          }}
        >
          4 Queued Actions
        </span>
      </div>

      <div className="space-y-3">
        {priorities.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl flex items-start justify-between gap-4 transition-all duration-200"
            style={{
              backgroundColor: tc.bgTertiary,
              border: `1px solid ${tc.borderPrimary}`
            }}
          >
            <div className="flex items-start gap-3.5">
              <span
                className="w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center shrink-0 tabular-nums"
                style={{
                  backgroundColor: tc.bgSecondary,
                  color: tc.textPrimary,
                  border: `1px solid ${tc.borderPrimary}`
                }}
              >
                {item.id}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-semibold tracking-tight" style={{ color: tc.textPrimary }}>
                    {item.title}
                  </h4>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium border"
                    style={{
                      backgroundColor: item.tone.bg,
                      color: item.tone.text,
                      borderColor: item.tone.border
                    }}
                  >
                    {item.priority}
                  </span>
                </div>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: tc.textSecondary }}>
                  {item.description}
                </p>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <span className="text-[11px] flex items-center gap-1 justify-end tabular-nums" style={{ color: tc.textSecondary }}>
                <Clock className="w-3 h-3" style={{ color: tc.textTertiary }} />
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
