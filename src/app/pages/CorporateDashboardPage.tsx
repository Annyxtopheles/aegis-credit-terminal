import { Building2, Calendar, Download, MessageSquare, BarChart3 } from 'lucide-react';
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

function RequestMeetingModal({ onClose }: { onClose: () => void }) {
  const { theme } = useTheme();
  const tc = colors[theme];
  const [form, setForm] = useState({ subject: '', date: '', message: '' });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
      <div className="w-full max-w-md mx-4 rounded-xl p-6" style={{ backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}` }}>
        <div className="flex items-center justify-between mb-4">
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: tc.textPrimary }}>Request Meeting with Aegis</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: tc.textSecondary, cursor: 'pointer', fontSize: '18px' }}>×</button>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Subject', key: 'subject', placeholder: 'e.g. Q3 Debt Refinancing Discussion' },
            { label: 'Preferred Date', key: 'date', type: 'date' },
          ].map(f => (
            <div key={f.key}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: tc.textPrimary, marginBottom: '5px' }}>{f.label}</label>
              <input
                type={f.type || 'text'}
                placeholder={f.placeholder}
                value={(form as any)[f.key]}
                onChange={e => setForm(fm => ({ ...fm, [f.key]: e.target.value }))}
                style={{
                  width: '100%', height: '42px', padding: '0 12px',
                  backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
                  border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                  color: tc.textPrimary, fontSize: '13px', outline: 'none'
                }}
              />
            </div>
          ))}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: tc.textPrimary, marginBottom: '5px' }}>Message</label>
            <textarea
              rows={3}
              placeholder="Describe your meeting objectives..."
              value={form.message}
              onChange={e => setForm(fm => ({ ...fm, message: e.target.value }))}
              style={{
                width: '100%', padding: '10px 12px',
                backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
                border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                color: tc.textPrimary, fontSize: '13px', outline: 'none', resize: 'none'
              }}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              className="flex-1 transition-colors rounded-lg"
              style={{ height: '42px', backgroundColor: '#0891B2', color: '#FFFFFF', border: 'none', cursor: 'pointer', fontWeight: 600 }}
              onClick={onClose}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0E7490'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0891B2'}
            >
              Send Request
            </button>
            <button
              className="flex-1 transition-colors rounded-lg"
              style={{ height: '42px', backgroundColor: 'transparent', color: tc.textSecondary, border: `1px solid ${tc.borderPrimary}`, cursor: 'pointer' }}
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
      {showMeetingModal && <RequestMeetingModal onClose={() => setShowMeetingModal(false)} />}

      {/* Diagonal Watermark */}
      <div className="fixed inset-0 pointer-events-none z-[5] flex items-center justify-center" style={{ top: '56px' }}>
        <div style={{
          fontSize: '36px', fontWeight: 700, color: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)',
          transform: 'rotate(-25deg)', userSelect: 'none', whiteSpace: 'nowrap', letterSpacing: '0.1em'
        }}>
          Apex Brands Group IR Portal View
        </div>
      </div>

      {/* Corporate IR Banner (replaces Threat Banner) */}
      <div className="px-3 md:px-6 pt-4">
        <div className="rounded-lg p-4 flex items-center justify-between flex-wrap gap-3"
          style={{ background: 'linear-gradient(135deg, #0E7490 0%, #0891B2 50%, #06B6D4 100%)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF' }}>Apex Brands Group Investor Relations Dashboard</h1>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>Company-Side Portal • Public Data Only • Read-Only Access</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowMeetingModal(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '13px' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            >
              <MessageSquare className="w-4 h-4" />
              Request Meeting
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '13px' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            >
              <Download className="w-4 h-4" />
              IR Presentation
            </button>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="px-3 md:px-6 pt-3">
        <div className="p-3 rounded-lg flex items-center gap-2" style={{ backgroundColor: '#F59E0B15', border: '1px solid #F59E0B30' }}>
          <BarChart3 className="w-4 h-4 flex-shrink-0" style={{ color: '#F59E0B' }} />
          <p style={{ fontSize: '12px', color: tc.textSecondary }}>
            <strong style={{ color: tc.textPrimary }}>Corporate View:</strong> You are seeing public market data only. Aegis proprietary analysis, competitive intelligence, and internal commentary are not visible in this portal.
          </p>
        </div>
      </div>

      <div className="px-3 md:px-6 py-4 space-y-6 max-w-[1920px] mx-auto">
        {/* Metrics — shows only public metrics */}
        <MetricsCommandBar />

        {/* Debt Pricing Chart */}
        <DebtPricingChart />

        {/* Equity Pricing Chart */}
        <EquityPricingChart />

        {/* Capital Structure — basic info */}
        <CapitalStructureTable />

        {/* Covenant Compliance — public disclosures only */}
        <CovenantCompliance />

        {/* Largest Holders — 13F data only */}
        <LargestHoldersTable />

        {/* Sector News — news mentions only */}
        <SectorNews />

        {/* Peer Comparison Teaser */}
        <div className="rounded-lg p-6" style={{ backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}` }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: tc.textPrimary }}>Peer Comparison</h3>
              <p style={{ fontSize: '13px', color: tc.textSecondary, marginTop: '2px' }}>See how your metrics compare to sector averages (anonymized)</p>
            </div>
            <Calendar className="w-5 h-5" style={{ color: tc.textSecondary }} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Net Debt/EBITDA vs Peers', your: '7.52x', avg: '5.14x', worse: true },
              { label: 'Debt Price vs Peers', your: '$95.40', avg: '$98.20', worse: true },
              { label: 'Covenant Headroom vs Peers', your: '6.9%', avg: '18.4%', worse: true },
            ].map(m => (
              <div key={m.label} className="p-3 rounded-lg" style={{ backgroundColor: theme === 'dark' ? '#0F1A2A' : '#F9FAFB', border: `1px solid ${tc.borderPrimary}` }}>
                <p style={{ fontSize: '11px', color: tc.textSecondary, marginBottom: '8px' }}>{m.label}</p>
                <div className="flex items-center gap-3">
                  <div>
                    <div style={{ fontSize: '10px', color: tc.textTertiary }}>Apex Brands Group</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: m.worse ? '#DC2626' : '#10B981', fontFamily: 'JetBrains Mono, monospace' }}>{m.your}</div>
                  </div>
                  <div style={{ color: tc.textTertiary, fontSize: '12px' }}>vs</div>
                  <div>
                    <div style={{ fontSize: '10px', color: tc.textTertiary }}>Sector Avg</div>
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
