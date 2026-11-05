import { Radio, Satellite, Clock, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export function KeyEvents() {
  const { theme } = useTheme();
  const tc = colors[theme];

  const events = [
    {
      id: 1,
      title: 'TCA Red Conjunction Window',
      target: 'VANGUARD-04 vs. COSMOS-2251 DEB',
      epoch: 'T-01:42:19 UTC',
      detail: 'Miss Distance: 142m // Collision Prob: 4.82e-4',
      status: 'Critical Alert',
      statusColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      icon: Satellite
    },
    {
      id: 2,
      title: 'Svalbard S-Band Ground Pass (AOS)',
      target: 'Command Uplink & Ephemeris Refresh',
      epoch: '16:40:00 UTC',
      detail: 'Ka-Band Lock // Elevation: 64.2° // Duration: 8m 42s',
      status: 'AOS Locked',
      statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      icon: Radio
    },
    {
      id: 3,
      title: 'Plane-B Momentum Desaturation Burn',
      target: 'Vanguard SSO Shell-2 Fleet',
      epoch: 'Nov 06, 04:15 UTC',
      detail: 'Reaction wheel spin-down via magnetorquers & cold gas',
      status: 'Scheduled',
      statusColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      icon: Clock
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
            Upcoming Burn & Pass Windows
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Epoch timelines for mission critical ground telemetry and orbital adjustments
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          3 Pending Events
        </span>
      </div>

      <div className="space-y-3">
        {events.map((evt) => {
          const Icon = evt.icon;
          return (
            <div
              key={evt.id}
              className="p-4 rounded-xl flex items-start justify-between gap-4 transition-all duration-200 hover:border-zinc-700/60"
              style={{
                backgroundColor: tc.bgTertiary,
                border: `1px solid ${tc.borderPrimary}`
              }}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#282A2F] flex items-center justify-center shrink-0 border border-zinc-700/50 text-indigo-400">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-zinc-100 tracking-tight">
                      {evt.title}
                    </h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${evt.statusColor}`}>
                      {evt.status}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-zinc-300 mt-0.5">
                    {evt.target}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1 ">
                    {evt.detail}
                  </div>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <span className="text-xs font-bold text-zinc-200 bg-[#282A2F] px-2.5 py-1 rounded-lg border border-zinc-700/50">
                  {evt.epoch}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
