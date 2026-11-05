import { Satellite, Zap, Compass, ShieldCheck } from 'lucide-react';
import { AegisCommentary } from '../components/AegisCommentary';
import { CapitalStructureTable } from '../components/CapitalStructureTable';
import { EquityPricingChart } from '../components/EquityPricingChart';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export default function CapitalStructurePage() {
  const { theme } = useTheme();
  const tc = colors[theme];

  const summaryStats = [
    { label: 'Active Constellation', value: '48 / 48 Satellites', delta: '100% Locked Ephemeris', icon: Satellite, color: tc.alertGreen },
    { label: 'Mean Xenon Reserve', value: '84.2%', delta: '+14% Above FCC 5-Yr SLA', icon: Zap, color: tc.accentPrimary },
    { label: 'Fleet Mean Motion', value: '15.09 rev/d', delta: '550 km Circular Orbit', icon: Compass, color: tc.textPrimary },
    { label: 'Max Propellant Delta-V', value: '151.4 m/s', delta: 'VGD-12 Primary Reserve', icon: ShieldCheck, color: tc.alertGreen },
  ];

  return (
    <div className="space-y-6 pt-1">
      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {summaryStats.map(stat => {
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
              <div className="text-[22px] font-bold tracking-tight mb-2" style={{ color: tc.textPrimary }}>
                {stat.value}
              </div>
              <div className="text-[11.5px] font-medium" style={{ color: tc.textTertiary }}>
                {stat.delta}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Ephemeris Ledger Table */}
      <CapitalStructureTable />

      {/* Covariance Dispersion & Commentary Split */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        <div className="xl:col-span-7">
          <EquityPricingChart />
        </div>
        <div className="xl:col-span-5">
          <AegisCommentary
            content={[
              "VANGUARD-04 [NORAD 58214] has expended 1.92 kg of Xenon propellant across three debris avoidance maneuvers in Q3-Q4, reducing remaining ΔV capacity to 64.2 m/s (71.4% tank reserve).",
              "VANGUARD-08 [NORAD 58218] is scheduled for a prograde perigee-raising station-keeping burn (+0.32 m/s ΔV) at 19:15 UTC to offset thermospheric drag decay across Plane B.",
              "All Plane A and Plane C spacecraft maintain >84% Xenon propellant reserves with nominal 15.06 rev/day mean motion and <0.0002 eccentricity."
            ]}
          />
        </div>
      </div>
    </div>
  );
}
