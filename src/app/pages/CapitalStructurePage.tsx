import { AegisCommentary } from '../components/AegisCommentary';
import { CapitalStructureTable } from '../components/CapitalStructureTable';
import { EquityPricingChart } from '../components/EquityPricingChart';

export default function CapitalStructurePage() {
  return (
    <div className="space-y-5 pt-1">
      <CapitalStructureTable />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
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
