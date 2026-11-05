import { Clock, ShieldAlert, Crosshair, Zap } from 'lucide-react';
import { BPlaneRadarScope } from '../components/BPlaneRadarScope';
import { EquityPricingChart } from '../components/EquityPricingChart';
import { LargestHoldersTable } from '../components/LargestHoldersTable';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export default function RadarScopePage() {
  const { theme } = useTheme();
  const tc = colors[theme];

  const radarStats = [
    { label: 'Time of Closest Approach', value: 'T-01:42:19', delta: 'Epoch 16:14 UTC', icon: Clock, color: '#F87171' },
    { label: 'Projected Miss Distance', value: '1,850 m', delta: 'Nominal Post-CAM (142m Raw)', icon: Crosshair, color: '#4ADE80' },
    { label: 'Collision Probability (Pc)', value: '1.2e-7', delta: 'Mitigated Below 1.0e-4 SLA', icon: ShieldAlert, color: '#4ADE80' },
    { label: 'Required Delta-V Vector', value: '+0.85 m/s', delta: 'Prograde Hall-Effect Fire', icon: Zap, color: tc.accentPrimary },
  ];

  return (
    <div className="space-y-6 pt-1">
      {/* 4 Clean Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {radarStats.map(stat => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl p-5 transition-colors"
              style={{
                backgroundColor: tc.bgSecondary,
                border: `1px solid ${tc.borderPrimary}`
              }}
            >
              <div className="mb-3">
                <Icon className="w-4 h-4" style={{ color: stat.color }} />
              </div>
              <div className="text-xs font-medium mb-1" style={{ color: tc.textSecondary }}>
                {stat.label}
              </div>
              <div className="text-[22px] font-bold font-mono tracking-tight mb-2" style={{ color: tc.textPrimary }}>
                {stat.value}
              </div>
              <div className="text-[11.5px] font-medium" style={{ color: tc.textTertiary }}>
                {stat.delta}
              </div>
            </div>
          );
        })}
      </div>

      {/* 2-Column Polar Radar & Covariance Dispersion Split */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        <div className="xl:col-span-5">
          <BPlaneRadarScope />
        </div>
        <div className="xl:col-span-7 flex flex-col justify-between gap-5">
          <EquityPricingChart />
          <div
            className="rounded-2xl p-5"
            style={{
              backgroundColor: tc.bgSecondary,
              border: `1px solid ${tc.borderPrimary}`
            }}
          >
            <h4 className="text-sm font-semibold mb-2" style={{ color: tc.textPrimary }}>
              Autonomous Collision Avoidance Maneuver (CAM) Protocol
            </h4>
            <p className="text-xs leading-relaxed" style={{ color: tc.textSecondary }}>
              Hall-effect thrusters fire a prograde vector burn (+0.85 m/s ΔV) at T-102 minutes prior to TCA. This raises apogee by +1.85 km, shifting the predicted B-plane miss distance from 142m (critical) to 1,850m (safe volume).
            </p>
          </div>
        </div>
      </div>

      {/* Screened Objects in Proximity */}
      <LargestHoldersTable />
    </div>
  );
}
