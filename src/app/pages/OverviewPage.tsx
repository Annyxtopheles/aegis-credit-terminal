import { AlertCircle, Zap, ShieldAlert, Satellite, Radio } from 'lucide-react';
import { ThreatBanner } from '../components/ThreatBanner';
import { DebtPricingChart } from '../components/DebtPricingChart';
import { AegisCommentary } from '../components/AegisCommentary';
import { LargestHoldersTable } from '../components/LargestHoldersTable';
import { BPlaneRadarScope } from '../components/BPlaneRadarScope';
import { CovenantCompliance } from '../components/CovenantCompliance';
import { CapitalStructureTable } from '../components/CapitalStructureTable';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export default function OverviewPage() {
  const { theme } = useTheme();
  const tc = colors[theme];

  const telemetryKpis = [
    {
      label: 'Conjunction Risk (Pc)',
      value: '4.82e-4',
      delta: 'Red Threshold (> 1.0e-4)',
      sub: 'COSMOS-2251 DEB vs VGD-04',
      color: tc.alertRed,
      icon: AlertCircle
    },
    {
      label: 'Solar Radio Flux (F10.7)',
      value: '184.2 SFU',
      delta: '+18.4% Atmospheric Drag',
      sub: 'Thermospheric Expansion',
      color: tc.alertAmber,
      icon: Zap
    },
    {
      label: 'Geomagnetic Kp Index',
      value: 'Kp 5.3 (G1)',
      delta: 'NOAA Minor Storm Watch',
      sub: 'High-Latitude Plane B',
      color: tc.alertAmber,
      icon: ShieldAlert
    },
    {
      label: 'Active Constellation',
      value: '48 / 48 SV',
      delta: '84.2% Mean Xenon Reserve',
      sub: 'Plane A–D • S-Band Locked',
      color: tc.alertGreen,
      icon: Satellite
    },
    {
      label: 'Optical ISL Mesh Latency',
      value: '142 ms',
      delta: '99.98% Cross-Link Lock',
      sub: 'Svalbard & Kwajalein AOS',
      color: tc.accentPrimary,
      icon: Radio
    }
  ];

  return (
    <div className="space-y-5 pt-1">
      {/* Live Conjunction Alert Ribbon */}
      <ThreatBanner />

      {/* Row 1: 5 Clean KESSLER Orbital Telemetry KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {telemetryKpis.map(kpi => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="rounded-2xl p-5 transition-colors"
              style={{
                backgroundColor: tc.bgSecondary,
                border: `1px solid ${tc.borderPrimary}`
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium" style={{ color: tc.textSecondary }}>
                  {kpi.label}
                </span>
                <Icon className="w-4 h-4" style={{ color: kpi.color }} />
              </div>
              <div
                className="text-[22px] font-bold font-mono tracking-tight mb-2"
                style={{ color: tc.textPrimary }}
              >
                {kpi.value}
              </div>
              <div className="text-[11px] flex flex-col gap-0.5">
                <span className="font-semibold font-mono" style={{ color: kpi.color }}>
                  {kpi.delta}
                </span>
                <span style={{ color: tc.textTertiary }}>{kpi.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 2: Left B-Plane Covariance Radar Scope + Right Orbital Altitude Decay & FCC/ESA De-Orbit Gauges */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
        <div className="xl:col-span-4">
          <BPlaneRadarScope />
        </div>
        <div className="xl:col-span-8 flex flex-col justify-between gap-4">
          <DebtPricingChart />
          <CovenantCompliance />
        </div>
      </div>

      {/* Row 3: Tracked Debris Cloud Registry + Autonomous FDO Telemetry Event Stream */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
        <div className="xl:col-span-7">
          <LargestHoldersTable />
        </div>
        <div className="xl:col-span-5">
          <AegisCommentary
            content={[
              "VANGUARD-04 [NORAD 58214] entered Red-Threshold Conjunction Watch against COSMOS-2251 DEB [34427] following the 06:00 UTC 18th SDS Spacetrack CDM update. Radial miss distance is projected at 142m (Pc = 4.8e-4) at T-01:42:19 UTC.",
              "Automated prograde Hall-effect thruster burn (+0.85 m/s ΔV) is armed on VGD-04 to raise apogee by +1.85 km and expand post-burn B-plane miss distance to 1,850m.",
              "Thermospheric scale-height expansion from NOAA G2 geomagnetic storming (F10.7 = 184 SFU) has increased atmospheric drag across Plane B by +18.4% over the trailing 72-hour epoch."
            ]}
          />
        </div>
      </div>

      {/* Row 4: Full Constellation Ephemeris & Thruster Delta-V Ledger */}
      <CapitalStructureTable />
    </div>
  );
}
