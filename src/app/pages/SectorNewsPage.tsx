import { Sun, Activity, Shield, Flame } from 'lucide-react';
import { SectorNews } from '../components/SectorNews';
import { AegisCommentary } from '../components/AegisCommentary';
import { EquityPricingChart } from '../components/EquityPricingChart';

export default function SectorNewsPage() {
  const kpis = [
    {
      label: 'Solar Radio Flux (F10.7)',
      value: '184.2 SFU',
      subtext: '+18.4% thermospheric drag',
      icon: Sun,
      variant: 'amber',
      badge: 'Elevated'
    },
    {
      label: 'Geomagnetic Storm Index',
      value: 'Kp 5.3 (G1)',
      subtext: 'Minor storm watch in effect',
      icon: Activity,
      variant: 'amber',
      badge: 'G1 Minor'
    },
    {
      label: '18th SDS Active CDMs',
      value: '14 Tracked',
      subtext: '1 critical pass / 13 nominal',
      icon: Shield,
      variant: 'rose',
      badge: '1 Alert'
    },
    {
      label: 'Proton Flux Index (>10 MeV)',
      value: '0.42 pfu',
      subtext: 'Normal star-tracker envelope',
      icon: Flame,
      variant: 'emerald',
      badge: 'Nominal'
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
              : kpi.variant === 'amber'
              ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
              : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';

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

      {/* Main Grid: Sector News Bulletins + Telemetry Feed & Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-7">
          <SectorNews />
        </div>

        <div className="xl:col-span-5 space-y-6">
          <AegisCommentary />
          <EquityPricingChart />
        </div>
      </div>
    </div>
  );
}
