import { BPlaneRadarScope } from '../components/BPlaneRadarScope';
import { EquityPricingChart } from '../components/EquityPricingChart';
import { ThreatBanner } from '../components/ThreatBanner';
import { LargestHoldersTable } from '../components/LargestHoldersTable';

export default function RadarScopePage() {
  return (
    <div className="space-y-5 pt-1">
      {/* Active Conjunction Alert Banner */}
      <ThreatBanner />

      {/* 2-Column Polar Radar & Covariance Dispersion Split */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        <div className="xl:col-span-5">
          <BPlaneRadarScope />
        </div>
        <div className="xl:col-span-7 flex flex-col justify-between gap-5">
          <EquityPricingChart />
          <div className="rounded-2xl p-5 bg-[#1F2024] border border-[#2A2C32]">
            <h4 className="text-sm font-semibold text-zinc-200 mb-2">
              Autonomous Collision Avoidance Maneuver (CAM) Guidance
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              When armed, the Hall-effect thrusters fire a prograde vector burn (+0.85 m/s ΔV) at T-102 minutes prior to TCA. This alters semi-major axis by +1.85 km, shifting B-plane miss distance from 142m (critical) to 1,850m (nominal screening volume).
            </p>
          </div>
        </div>
      </div>

      {/* Screened Objects in Proximity */}
      <LargestHoldersTable />
    </div>
  );
}
