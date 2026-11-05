import { CheckCircle2, AlertCircle, Clock, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export function TopPriorities() {
  const { theme } = useTheme();
  const tc = colors[theme];

  const priorities = [
    {
      id: '01',
      title: 'Automated Hall-Effect CAM Burn (+0.85 m/s)',
      description: 'Execute prograde thruster pulse on VANGUARD-04 prior to COSMOS-2251 DEB TCA epoch.',
      priority: 'Urgent',
      priorityColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      time: 'T-01:42:19'
    },
    {
      id: '02',
      title: 'Re-Allocate Plane B Station-Keeping Budget',
      description: 'Adjust nominal altitude trim cycles to preserve the 5-year FCC de-orbit reserve floor (≥4.50 kg).',
      priority: 'High',
      priorityColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      time: 'Next Orbit'
    },
    {
      id: '03',
      title: 'Cross-Calibrate LeoLabs Radar Tracks',
      description: 'Fuse commercial S-band phased-array observations with onboard GNSS ephemeris to shrink 3σ covariance.',
      priority: 'Routine',
      priorityColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      time: 'Continuous'
    },
    {
      id: '04',
      title: 'Differential Drag Phasing Across Plane A',
      description: 'Pitch solar arrays to high-drag configuration during NOAA G2 geomagnetic thermospheric expansion.',
      priority: 'Active',
      priorityColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
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
          <h3 className="text-[16px] font-semibold tracking-tight text-zinc-100">
            Flight Director Directives
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Operational queue prioritized by time-to-closest-approach and safety margins
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          4 Queued Actions
        </span>
      </div>

      <div className="space-y-3">
        {priorities.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl flex items-start justify-between gap-4 transition-all duration-200 hover:border-zinc-700/60"
            style={{
              backgroundColor: tc.bgTertiary,
              border: `1px solid ${tc.borderPrimary}`
            }}
          >
            <div className="flex items-start gap-3.5">
              <span className="w-7 h-7 rounded-lg bg-[#282A2F] text-zinc-300 text-xs font-semibold flex items-center justify-center shrink-0 border border-zinc-700/50">
                {item.id}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-zinc-100 tracking-tight">
                    {item.title}
                  </h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${item.priorityColor}`}>
                    {item.priority}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <span className="text-[11px] text-zinc-400 flex items-center gap-1 justify-end">
                <Clock className="w-3 h-3 text-zinc-500" />
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
