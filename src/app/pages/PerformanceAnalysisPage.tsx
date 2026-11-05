import { Flame, Compass, ShieldCheck, Activity } from 'lucide-react';
import { TopPriorities } from '../components/TopPriorities';
import { KeyEvents } from '../components/KeyEvents';
import { MarketTrendsPanel } from '../components/MarketTrendsPanel';

export default function PerformanceAnalysisPage() {
  const kpis = [
    {
      label: 'Queued Maneuvers',
      value: '3 Burns Active',
      subtext: 'Next: VGD-04 at 16:40 UTC',
      icon: Flame,
      variant: 'rose',
      badge: 'Action Required'
    },
    {
      label: 'Total ΔV Allocated',
      value: '+3.42 m/s',
      subtext: 'Hall-effect bus reserve: 94.2%',
      icon: Compass,
      variant: 'indigo',
      badge: 'Sufficient'
    },
    {
      label: 'CAM Autopilot Status',
      value: 'Armed & Nominal',
      subtext: 'Threshold: Pc > 1.0e-4 trigger',
      icon: ShieldCheck,
      variant: 'emerald',
      badge: 'Protected'
    },
    {
      label: 'Fleet ISL Sync Latency',
      value: '142 ms',
      subtext: 'Optical cross-link mesh locked',
      icon: Activity,
      variant: 'cyan',
      badge: 'Real-Time'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          const badgeClass =
            kpi.variant === 'rose'
              ? 'text-rose-400 bg-rose-500/10 border-rose-500/20'
              : kpi.variant === 'indigo'
              ? 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
              : kpi.variant === 'emerald'
              ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
              : 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';

          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#1F2024] border border-[#2A2C32] flex flex-col justify-between hover:border-zinc-700/60 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-400">{kpi.label}</span>
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${badgeClass}`}>
                  {kpi.badge}
                </span>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-bold text-zinc-100 tracking-tight">
                  {kpi.value}
                </div>
                <div className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
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
