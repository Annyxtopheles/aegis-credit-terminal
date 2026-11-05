import { Orbit, Calendar, Download, MessageSquare, Radar, Radio } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';
import { MetricsCommandBar } from '../components/MetricsCommandBar';
import { DebtPricingChart } from '../components/DebtPricingChart';
import { EquityPricingChart } from '../components/EquityPricingChart';
import { CapitalStructureTable } from '../components/CapitalStructureTable';
import { CovenantCompliance } from '../components/CovenantCompliance';
import { LargestHoldersTable } from '../components/LargestHoldersTable';
import { SectorNews } from '../components/SectorNews';

function RequestCoordinationModal({ onClose }: { onClose: () => void }) {
  const { theme } = useTheme();
  const tc = colors[theme];
  const [form, setForm] = useState({ subject: '', date: '', message: '' });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200 transition-colors"
        style={{
          backgroundColor: tc.bgSecondary,
          border: `1px solid ${tc.borderPrimary}`
        }}
      >
        <div className="flex items-center justify-between pb-3 border-b transition-colors" style={{ borderColor: tc.borderPrimary }}>
          <h3 className="text-base font-semibold tracking-tight" style={{ color: tc.textPrimary }}>Request Conjunction Coordination</h3>
          <button onClick={onClose} className="transition-colors cursor-pointer text-lg leading-none" style={{ color: tc.textSecondary }}>×</button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: tc.textSecondary }}>Target Conjunction Designator</label>
            <input
              type="text"
              placeholder="e.g. COSMOS-2251 DEB vs VANGUARD-04"
              value={form.subject}
              onChange={e => setForm(fm => ({ ...fm, subject: e.target.value }))}
              className="w-full h-10 px-3.5 rounded-xl text-xs focus:outline-none transition-colors"
              style={{
                backgroundColor: tc.bgTertiary,
                border: `1px solid ${tc.borderPrimary}`,
                color: tc.textPrimary
              }}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: tc.textSecondary }}>Proposed Burn Epoch (UTC)</label>
            <input
              type="date"
              value={form.date}
              onChange={e => setForm(fm => ({ ...fm, date: e.target.value }))}
              className="w-full h-10 px-3.5 rounded-xl text-xs focus:outline-none transition-colors"
              style={{
                backgroundColor: tc.bgTertiary,
                border: `1px solid ${tc.borderPrimary}`,
                color: tc.textPrimary
              }}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: tc.textSecondary }}>Delta-V Vector & Ephemeris Notes</label>
            <textarea
              rows={3}
              placeholder="Specify prograde/retrograde m/s vector and post-burn radial miss target..."
              value={form.message}
              onChange={e => setForm(fm => ({ ...fm, message: e.target.value }))}
              className="w-full p-3 rounded-xl text-xs focus:outline-none resize-none transition-colors"
              style={{
                backgroundColor: tc.bgTertiary,
                border: `1px solid ${tc.borderPrimary}`,
                color: tc.textPrimary
              }}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              className="flex-1 h-10 rounded-xl font-semibold text-xs tracking-tight transition-colors cursor-pointer"
              style={{
                backgroundColor: theme === 'dark' ? '#FFFFFF' : '#18181B',
                color: theme === 'dark' ? '#18181B' : '#FFFFFF'
              }}
              onClick={onClose}
            >
              Transmit Directive
            </button>
            <button
              className="flex-1 h-10 rounded-xl font-medium text-xs transition-colors cursor-pointer"
              style={{
                backgroundColor: tc.bgTertiary,
                border: `1px solid ${tc.borderPrimary}`,
                color: tc.textSecondary
              }}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CorporateDashboardPage() {
  const { theme } = useTheme();
  const tc = colors[theme];
  const [showMeetingModal, setShowMeetingModal] = useState(false);

  return (
    <div className="space-y-6">
      {showMeetingModal && <RequestCoordinationModal onClose={() => setShowMeetingModal(false)} />}

      {/* Clean Tempo Executive Header Banner */}
      <div
        className="rounded-2xl p-6 flex items-center justify-between flex-wrap gap-4 transition-colors"
        style={{
          backgroundColor: tc.bgSecondary,
          border: `1px solid ${tc.borderPrimary}`
        }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Orbit className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight" style={{ color: tc.textPrimary }}>
                Vanguard LEO Shell-1 Operator Portal
              </h1>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                Live Feed
              </span>
            </div>
            <p className="text-xs mt-1" style={{ color: tc.textSecondary }}>
              ITU / FCC Ephemeris Coordination • Read-Only CCSDS CDM Conjunction Data Stream
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowMeetingModal(true)}
            className="flex items-center gap-2 h-9 px-4 rounded-xl text-xs font-semibold tracking-tight transition-colors cursor-pointer"
            style={{
              backgroundColor: theme === 'dark' ? '#FFFFFF' : '#18181B',
              color: theme === 'dark' ? '#18181B' : '#FFFFFF'
            }}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Coordinate Maneuver
          </button>
          <button
            className="flex items-center gap-2 h-9 px-4 rounded-xl text-xs font-medium transition-colors cursor-pointer"
            style={{
              backgroundColor: tc.bgTertiary,
              border: `1px solid ${tc.borderPrimary}`,
              color: tc.textSecondary
            }}
          >
            <Download className="w-3.5 h-3.5" />
            Export Ephemeris
          </button>
        </div>
      </div>

      {/* Notice Banner */}
      <div
        className="p-4 rounded-2xl flex items-center gap-3 transition-colors"
        style={{
          backgroundColor: tc.bgSecondary,
          border: `1px solid ${tc.borderPrimary}`
        }}
      >
        <Radar className="w-5 h-5 text-indigo-400 shrink-0" />
        <p className="text-xs" style={{ color: tc.textSecondary }}>
          <span className="font-semibold" style={{ color: tc.textPrimary }}>External Coordination Feed:</span> Displaying public 18th SDS TLE vectors and ITU/FCC compliance disclosures for cross-constellation conjunction mitigation.
        </p>
      </div>

      {/* Components Stack */}
      <div className="space-y-6">
        <MetricsCommandBar />
        <DebtPricingChart />
        <EquityPricingChart />
        <CapitalStructureTable />
        <CovenantCompliance />
        <LargestHoldersTable />
        <SectorNews />

        {/* Cross-Constellation Comparison */}
        <div
          className="rounded-2xl p-6 transition-colors"
          style={{
            backgroundColor: tc.bgSecondary,
            border: `1px solid ${tc.borderPrimary}`
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold tracking-tight" style={{ color: tc.textPrimary }}>Cross-Constellation Shell Benchmark</h3>
              <p className="text-xs mt-0.5" style={{ color: tc.textSecondary }}>Benchmarking Vanguard LEO Shell-1 against 550 km peer constellations</p>
            </div>
            <Calendar className="w-4 h-4" style={{ color: tc.textTertiary }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Mean CAM Response SLA', your: '102 min', avg: '180 min', better: true },
              { label: 'Mean Xenon Reserve', your: '84.2%', avg: '76.5%', better: true },
              { label: 'Active Red Conjunctions', your: '1 SV', avg: '2.4 SV', better: false },
            ].map(m => (
              <div
                key={m.label}
                className="p-4 rounded-xl transition-colors"
                style={{
                  backgroundColor: tc.bgTertiary,
                  border: `1px solid ${tc.borderPrimary}`
                }}
              >
                <p className="text-xs font-medium mb-2" style={{ color: tc.textSecondary }}>{m.label}</p>
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-[10px]" style={{ color: tc.textTertiary }}>Vanguard Shell-1</div>
                    <div className={`text-base font-bold mt-0.5 tabular-nums ${m.better ? 'text-indigo-400' : 'text-rose-400'}`}>{m.your}</div>
                  </div>
                  <div className="text-xs" style={{ color: tc.textTertiary }}>vs</div>
                  <div>
                    <div className="text-[10px]" style={{ color: tc.textTertiary }}>LEO Peer Avg</div>
                    <div className="text-base font-bold mt-0.5 tabular-nums" style={{ color: tc.textSecondary }}>{m.avg}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
