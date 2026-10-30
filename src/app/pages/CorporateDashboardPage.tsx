import { Orbit, Calendar, Download, MessageSquare, Radar } from 'lucide-react';
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}>
      <div className="w-full max-w-md mx-4 rounded-xl p-6" style={{ backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}` }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-mono" style={{ fontSize: '16px', fontWeight: 700, color: tc.textPrimary }}>Request Conjunction Coordination Burn</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: tc.textSecondary, cursor: 'pointer', fontSize: '18px' }}>×</button>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Target Conjunction Designator', key: 'subject', placeholder: 'e.g. COSMOS-2251 DEB vs VANGUARD-04' },
            { label: 'Proposed Burn Epoch (UTC)', key: 'date', type: 'date' },
          ].map(f => (
            <div key={f.key}>
              <label className="font-mono" style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: tc.textPrimary, marginBottom: '5px' }}>{f.label}</label>
              <input
                type={f.type || 'text'}
                placeholder={f.placeholder}
                value={(form as any)[f.key]}
                onChange={e => setForm(fm => ({ ...fm, [f.key]: e.target.value }))}
                style={{
                  width: '100%', height: '42px', padding: '0 12px',
                  backgroundColor: theme === 'dark' ? tc.bgPrimary : '#FFFFFF',
                  border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                  color: tc.textPrimary, fontSize: '13px', outline: 'none'
                }}
              />
            </div>
          ))}
          <div>
            <label className="font-mono" style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: tc.textPrimary, marginBottom: '5px' }}>Delta-V Vector & Ephemeris Notes</label>
            <textarea
              rows={3}
              placeholder="Specify prograde/retrograde m/s vector and post-burn radial miss target..."
              value={form.message}
              onChange={e => setForm(fm => ({ ...fm, message: e.target.value }))}
              style={{
                width: '100%', padding: '10px 12px',
                backgroundColor: theme === 'dark' ? tc.bgPrimary : '#FFFFFF',
                border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                color: tc.textPrimary, fontSize: '13px', outline: 'none', resize: 'none'
              }}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              className="flex-1 transition-colors rounded-lg font-mono"
              style={{ height: '42px', backgroundColor: tc.accentPrimary, color: tc.bgPrimary, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '13px' }}
              onClick={onClose}
            >
              Transmit Directive
            </button>
            <button
              className="flex-1 transition-colors rounded-lg font-mono"
              style={{ height: '42px', backgroundColor: 'transparent', color: tc.textSecondary, border: `1px solid ${tc.borderPrimary}`, cursor: 'pointer', fontSize: '13px' }}
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
    <div>
      {showMeetingModal && <RequestCoordinationModal onClose={() => setShowMeetingModal(false)} />}

      <div className="px-3 md:px-6 pt-4">
        <div className="rounded-lg p-4 flex items-center justify-between flex-wrap gap-3"
          style={{ background: 'linear-gradient(135deg, #B45309 0%, #D97706 50%, #F59E0B 100%)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
              <Orbit className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-mono" style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF' }}>Vanguard LEO Shell-1 External Operator Telemetry Portal</h1>
              <p className="font-mono" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)' }}>ITU / FCC Ephemeris Coordination • Read-Only CCSDS CDM Feed</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowMeetingModal(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors font-mono"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '12px' }}
            >
              <MessageSquare className="w-4 h-4" />
              Coordinate Maneuver
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors font-mono"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '12px' }}
            >
              <Download className="w-4 h-4" />
              Export Shell Ephemeris
            </button>
          </div>
        </div>
      </div>

      <div className="px-3 md:px-6 pt-3">
        <div className="p-3 rounded-lg flex items-center gap-2" style={{ backgroundColor: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)' }}>
          <Radar className="w-4 h-4 flex-shrink-0" style={{ color: tc.accentPrimary }} />
          <p style={{ fontSize: '12px', color: tc.textSecondary }}>
            <strong style={{ color: tc.textPrimary }} className="font-mono">External Coordination Feed:</strong> Displaying public 18th SDS TLE vectors and ITU/FCC compliance disclosures.
          </p>
        </div>
      </div>

      <div className="px-3 md:px-6 py-4 space-y-6 max-w-[1920px] mx-auto">
        <MetricsCommandBar />
        <DebtPricingChart />
        <EquityPricingChart />
        <CapitalStructureTable />
        <CovenantCompliance />
        <LargestHoldersTable />
        <SectorNews />

        <div className="rounded-lg p-6" style={{ backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}` }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-mono" style={{ fontSize: '15px', fontWeight: 700, color: tc.textPrimary }}>Cross-Constellation Shell Comparison</h3>
              <p style={{ fontSize: '13px', color: tc.textSecondary, marginTop: '2px' }}>Benchmarking Vanguard LEO Shell-1 against 550 km peer constellations</p>
            </div>
            <Calendar className="w-5 h-5" style={{ color: tc.textSecondary }} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Mean CAM Response SLA', your: '102 min', avg: '180 min', worse: false },
              { label: 'Mean Xenon Reserve', your: '84.2%', avg: '76.5%', worse: false },
              { label: 'Active Red Conjunctions', your: '1 SV', avg: '2.4 SV', worse: true },
            ].map(m => (
              <div key={m.label} className="p-3 rounded-lg" style={{ backgroundColor: theme === 'dark' ? tc.bgPrimary : '#F9FAFB', border: `1px solid ${tc.borderPrimary}` }}>
                <p className="font-mono" style={{ fontSize: '11px', color: tc.textSecondary, marginBottom: '8px' }}>{m.label}</p>
                <div className="flex items-center gap-3">
                  <div>
                    <div style={{ fontSize: '10px', color: tc.textTertiary }}>Vanguard Shell-1</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: m.worse ? '#EF4444' : tc.accentPrimary, fontFamily: 'JetBrains Mono, monospace' }}>{m.your}</div>
                  </div>
                  <div style={{ color: tc.textTertiary, fontSize: '12px' }}>vs</div>
                  <div>
                    <div style={{ fontSize: '10px', color: tc.textTertiary }}>LEO Peer Avg</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: tc.textSecondary, fontFamily: 'JetBrains Mono, monospace' }}>{m.avg}</div>
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
