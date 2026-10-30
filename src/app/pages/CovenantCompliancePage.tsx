import { CovenantCompliance } from '../components/CovenantCompliance';
import { AegisCommentary } from '../components/AegisCommentary';
import { FinancialPerformanceGrid } from '../components/FinancialPerformanceGrid';
import { BPlaneRadarScope } from '../components/BPlaneRadarScope';

export default function CovenantCompliancePage() {
  return (
    <div className="space-y-5 pt-1">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
        <div className="xl:col-span-4">
          <BPlaneRadarScope />
        </div>
        <div className="xl:col-span-8 space-y-4">
          <CovenantCompliance />
          <AegisCommentary
            content={[
              "VANGUARD-04 currently violates FCC 5-year post-mission disposal propellant margin threshold (actual reserve 4.12 kg vs 4.50 kg minimum de-orbit allocation).",
              "Transponder S-band link margin degradation observed during solar proton flux event; automated gain control compensating within nominal ITU interference envelope."
            ]}
          />
        </div>
      </div>

      <FinancialPerformanceGrid />
    </div>
  );
}
