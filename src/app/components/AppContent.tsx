import { ReactNode } from 'react';
import { Lock, TrendingUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { ThreatBanner } from './ThreatBanner';
import { MetricsCommandBar } from './MetricsCommandBar';
import { DebtPricingChart } from './DebtPricingChart';
import { AegisCommentary } from './AegisCommentary';
import { CapitalStructureTable } from './CapitalStructureTable';
import { CovenantCompliance } from './CovenantCompliance';
import { FinancialPerformanceGrid } from './FinancialPerformanceGrid';
import { LargestHoldersTable } from './LargestHoldersTable';
import { TopPrioritiesKeyEvents } from './TopPrioritiesKeyEvents';
import { SectorNews } from './SectorNews';
import { MarketTrendsPanel } from './MarketTrendsPanel';
import { EquityPricingChart } from './EquityPricingChart';

function LockedOverlay({ title, message }: { title: string; message: string }) {
  const { theme } = useTheme();
  const tc = colors[theme];
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-lg"
      style={{
        backdropFilter: 'blur(6px)',
        backgroundColor: theme === 'dark' ? 'rgba(10,22,40,0.85)' : 'rgba(255,255,255,0.85)',
        border: `1px solid ${tc.borderPrimary}`
      }}>
      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
        style={{ backgroundColor: '#0891B220', border: '1px solid #0891B240' }}>
        <Lock className="w-6 h-6" style={{ color: '#0891B2' }} />
      </div>
      <p style={{ fontSize: '14px', fontWeight: 600, color: tc.textPrimary, marginBottom: '4px', textAlign: 'center' }}>{title}</p>
      <p style={{ fontSize: '12px', color: tc.textSecondary, textAlign: 'center', maxWidth: '220px', lineHeight: 1.5 }}>{message}</p>
      <button
        className="mt-3 px-4 py-1.5 rounded transition-colors"
        style={{ backgroundColor: '#0891B2', color: '#FFFFFF', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0E7490'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0891B2'}
      >
        View Plans
      </button>
    </div>
  );
}

function TrialBanner() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const tc = colors[theme];
  const viewed = user?.trialCompaniesViewed || 0;
  const limit = user?.trialCompaniesLimit || 3;
  const pct = (viewed / limit) * 100;

  return (
    <div className="mx-3 md:mx-6 mt-3 p-3 rounded-lg flex items-center gap-4 flex-wrap"
      style={{ backgroundColor: '#0891B215', border: '1px solid #0891B240' }}>
      <TrendingUp className="w-4 h-4 flex-shrink-0" style={{ color: '#0891B2' }} />
      <div className="flex-1 min-w-0">
        <p style={{ fontSize: '13px', color: tc.textPrimary }}>
          You've viewed <strong>{viewed}</strong> of <strong>{limit}</strong> companies this month.
          <span style={{ color: '#0891B2' }}> Upgrade for unlimited access.</span>
        </p>
        <div className="mt-1.5 h-1.5 rounded-full max-w-xs" style={{ backgroundColor: tc.borderPrimary }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: '#0891B2' }} />
        </div>
      </div>
      <button
        className="px-4 py-1.5 rounded text-sm transition-colors flex-shrink-0"
        style={{ backgroundColor: '#0891B2', color: '#FFFFFF', border: 'none', cursor: 'pointer', fontWeight: 600 }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0E7490'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0891B2'}
      >
        Unlock Full Access
      </button>
    </div>
  );
}

function TrialWatermark() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[5] flex items-center justify-center" style={{ top: '56px' }}>
      <div style={{
        fontSize: '48px', fontWeight: 700, color: 'rgba(8,145,178,0.06)',
        transform: 'rotate(-30deg)', userSelect: 'none', whiteSpace: 'nowrap',
        letterSpacing: '0.1em'
      }}>
        Aegis TRIAL MODE
      </div>
    </div>
  );
}

function Section({ children, locked, lockTitle, lockMsg }: { children: ReactNode; locked?: boolean; lockTitle?: string; lockMsg?: string }) {
  if (locked) {
    return (
      <div className="relative">
        <div style={{ filter: 'blur(4px)', pointerEvents: 'none', userSelect: 'none' }}>{children}</div>
        <LockedOverlay title={lockTitle || 'Premium Feature'} message={lockMsg || 'Upgrade to access this feature'} />
      </div>
    );
  }
  return <>{children}</>;
}

export function AppContent() {
  const { user } = useAuth();
  const isTrial = user?.role === 'trial';

  const Aegis_COMMENTARY = [
    "Debt price dropped sharply following Verdant Harvest sale announcement to Nortera Foods (Oct 27, 2025); Sr Secured Note 9/15/27 trading at $95.40 today — a fresh 8-month low, down 2.3% intraday on elevated volume.",
    "Company is pursuing strategic divestitures to reduce Net Debt/EBITDA from current 7.52x to below 7.0x covenant threshold; Q4'25 results still show unchanged leverage at 7.52x.",
    "Management emphasized on Q4 earnings call that stakeholder support is critical during restructuring process; lender call scheduled for today (Apr 22).",
    "Rating agencies have placed company on negative watch pending successful completion of divestiture plan; Verdant Harvest close expected Q2 2026."
  ];

  return (
    <div>
      {isTrial && <TrialWatermark />}
      <ThreatBanner />
      {isTrial && <TrialBanner />}

      <div className="px-3 md:px-6 py-4 md:py-6 space-y-6 md:space-y-8 max-w-[1920px] mx-auto">
        <MetricsCommandBar />
        <DebtPricingChart />

        <Section
          locked={isTrial}
          lockTitle="Upgrade to Aegis Pro"
          lockMsg="Unlock full analyst commentary and proprietary insights"
        >
          <AegisCommentary content={AEGIS_COMMENTARY} />
        </Section>

        <CapitalStructureTable />
        <CovenantCompliance />
        <FinancialPerformanceGrid />

        <Section
          locked={isTrial}
          lockTitle="Holder Intelligence Locked"
          lockMsg="See top 3 holders — upgrade to view all positions and trading activity"
        >
          <LargestHoldersTable />
        </Section>

        <Section
          locked={isTrial}
          lockTitle="Top Priorities Locked"
          lockMsg="Access strategic priorities and key events with a paid subscription"
        >
          <TopPrioritiesKeyEvents />
        </Section>

        <SectorNews />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Section
            locked={isTrial}
            lockTitle="Market Intelligence Locked"
            lockMsg="Competitive market trends require a Pro subscription"
          >
            <MarketTrendsPanel />
          </Section>
          <EquityPricingChart />
        </div>
      </div>
    </div>
  );
}