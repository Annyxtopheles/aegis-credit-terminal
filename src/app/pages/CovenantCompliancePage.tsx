import { ShieldAlert, Zap, Radio, AlertTriangle } from 'lucide-react';
import { CovenantCompliance } from '../components/CovenantCompliance';
import { AegisCommentary } from '../components/AegisCommentary';
import { FinancialPerformanceGrid } from '../components/FinancialPerformanceGrid';

export default function CovenantCompliancePage() {
  const kpis = [
    {
      label: 'FCC 5-Yr De-Orbit Margin',
      value: '4.12 kg',
      subtext: '0.38 kg below 4.50 kg floor',
      icon: ShieldAlert,
      variant: 'danger',
      badge: 'Deficit Alert'
    },
    {
      label: 'CAM Thruster Readiness',
      value: 'T-102 Minutes',
      subtext: 'Hall-Effect bus armed',
      icon: Zap,
      variant: 'warning',
      badge: 'Readiness SLA'
    },
    {
      label: 'Optical ISL Link Margin',
      value: '+9.8 dB',
      subtext: 'Above +6.0 dB floor',
      icon: Radio,
      variant: 'success',
      badge: 'Mesh Locked'
    },
    {
      label: 'Max Conjunction Risk',
      value: '4.82e-4',
      subtext: 'VGD-04 vs COSMOS-2251',
      icon: AlertTriangle,
      variant: 'danger',
      badge: 'TCA 01:42:19'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          const badgeClass =
            kpi.variant === 'danger'
              ? 'text-rose-400 bg-rose-500/10 border-rose-500/20'
              : kpi.variant === 'warning'
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

      {/* Main SLA Gauges & Live Commentary */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-8">
          <CovenantCompliance />
        </div>
        <div className="xl:col-span-4">
          <AegisCommentary
            content={[
              "VANGUARD-04 currently violates FCC 5-year post-mission disposal propellant margin threshold (actual reserve 4.12 kg vs 4.50 kg minimum de-orbit allocation).",
              "Transponder S-band link margin degradation observed during solar proton flux event; automated gain control compensating within nominal ITU interference envelope.",
              "18th Space Defense Squadron CDM 2026-11-05.02 indicates high radial miss uncertainty (±38m 1-sigma); CAM burn vector execution recommended at epoch 16:40 UTC."
            ]}
          />
        </div>
      </div>

      {/* Multi-Chart Analytics Grid */}
      <div>
        <FinancialPerformanceGrid />
      </div>
    </div>
  );
}
