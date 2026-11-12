import { Flame, Compass, ShieldCheck, Activity } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { colors, statusTones } from '../theme/colors';
import { TopPriorities } from '../components/TopPriorities';
import { KeyEvents } from '../components/KeyEvents';
import { MarketTrendsPanel } from '../components/MarketTrendsPanel';

export default function PerformanceAnalysisPage() {
  const { theme } = useTheme();
  const tc = colors[theme];
  const tones = statusTones[theme];

  const kpis = [
    {
      label: 'Queued Maneuvers',
      value: '3 Burns Active',
      subtext: 'Next: VGD-04 at 16:40 UTC',
      icon: Flame,
      tone: tones.rose,
      badge: 'Action Required'
    },
    {
      label: 'Total ΔV Allocated',
      value: '+3.42 m/s',
      subtext: 'Hall-effect bus reserve: 94.2%',
      icon: Compass,
      tone: tones.indigo,
      badge: 'Sufficient'
    },
    {
      label: 'CAM Autopilot Status',
      value: 'Armed & Nominal',
      subtext: 'Threshold: Pc > 1.0e-4 trigger',
      icon: ShieldCheck,
      tone: tones.emerald,
      badge: 'Protected'
    },
    {
      label: 'Fleet ISL Sync Latency',
      value: '142 ms',
      subtext: 'Optical cross-link mesh locked',
      icon: Activity,
      tone: tones.cyan,
      badge: 'Real-Time'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;

          return (
            <div
              key={idx}
              className="p-5 rounded-2xl flex flex-col justify-between transition-all duration-200"
              style={{
                backgroundColor: tc.bgSecondary,
                border: `1px solid ${tc.borderPrimary}`
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: tc.textSecondary }}>{kpi.label}</span>
                <span
                  className="text-[11px] font-medium px-2 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: kpi.tone.bg,
                    color: kpi.tone.text,
                    borderColor: kpi.tone.border
                  }}
                >
                  {kpi.badge}
                </span>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-bold tracking-tight tabular-nums" style={{ color: tc.textPrimary }}>
                  {kpi.value}
                </div>
                <div className="text-xs mt-1 flex items-center gap-1.5" style={{ color: tc.textSecondary }}>
                  <Icon className="w-3.5 h-3.5" />
                  <span>{kpi.subtext}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Directives and Upcoming Events Split */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
        <TopPriorities />
        <KeyEvents />
      </div>

      {/* Autonomous Protocols Card */}
      <MarketTrendsPanel />
    </div>
  );
}
