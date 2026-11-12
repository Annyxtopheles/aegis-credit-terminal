import { Radio, Satellite, Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { colors, statusTones } from '../theme/colors';

export function KeyEvents() {
  const { theme } = useTheme();
  const tc = colors[theme];
  const tones = statusTones[theme];

  const events = [
    {
      id: 1,
      title: 'TCA Red Conjunction Window',
      target: 'VANGUARD-04 vs. COSMOS-2251 DEB',
      epoch: 'T-01:42:19 UTC',
      detail: 'Miss Distance: 142m // Collision Prob: 4.82e-4',
      status: 'Critical Alert',
      tone: tones.rose,
      icon: Satellite
    },
    {
      id: 2,
      title: 'Svalbard S-Band Ground Pass (AOS)',
      target: 'Command Uplink & Ephemeris Refresh',
      epoch: '16:40:00 UTC',
      detail: 'Ka-Band Lock // Elevation: 64.2° // Duration: 8m 42s',
      status: 'AOS Locked',
      tone: tones.emerald,
      icon: Radio
    },
    {
      id: 3,
      title: 'Plane-B Momentum Desaturation Burn',
      target: 'Vanguard SSO Shell-2 Fleet',
      epoch: 'Nov 06, 04:15 UTC',
      detail: 'Reaction wheel spin-down via magnetorquers & cold gas',
      status: 'Scheduled',
      tone: tones.indigo,
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
          <h3 className="text-[16px] font-semibold tracking-tight" style={{ color: tc.textPrimary }}>
            Upcoming Burn & Pass Windows
          </h3>
          <p className="text-xs mt-0.5" style={{ color: tc.textSecondary }}>
            Epoch timelines for mission critical ground telemetry and orbital adjustments
          </p>
        </div>
        <span
          className="px-2.5 py-1 rounded-full text-xs font-medium border shrink-0"
          style={{
            backgroundColor: tones.emerald.bg,
            color: tones.emerald.text,
            borderColor: tones.emerald.border
          }}
        >
          3 Pending Events
        </span>
      </div>

      <div className="space-y-3">
        {events.map((evt) => {
          const Icon = evt.icon;
          return (
            <div
              key={evt.id}
              className="p-4 rounded-xl flex items-start justify-between gap-4 transition-all duration-200"
              style={{
                backgroundColor: tc.bgTertiary,
                border: `1px solid ${tc.borderPrimary}`
              }}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: tc.bgSecondary,
                    border: `1px solid ${tc.borderPrimary}`,
                    color: tc.accentPrimary
                  }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-semibold tracking-tight" style={{ color: tc.textPrimary }}>
                      {evt.title}
                    </h4>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium border"
                      style={{
                        backgroundColor: evt.tone.bg,
                        color: evt.tone.text,
                        borderColor: evt.tone.border
                      }}
                    >
                      {evt.status}
                    </span>
                  </div>
                  <div className="text-xs font-medium mt-0.5" style={{ color: tc.textPrimary }}>
                    {evt.target}
                  </div>
                  <div className="text-[11px] mt-1" style={{ color: tc.textSecondary }}>
                    {evt.detail}
                  </div>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <span
                  className="inline-block text-xs font-bold px-2.5 py-1 rounded-lg tabular-nums"
                  style={{
                    backgroundColor: tc.bgSecondary,
                    color: tc.textPrimary,
                    border: `1px solid ${tc.borderPrimary}`
                  }}
                >
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
