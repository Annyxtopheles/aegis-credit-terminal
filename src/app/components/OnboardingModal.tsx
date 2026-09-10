import { useState } from 'react';
import { Search, Star, Bell, Check, X, ChevronRight, BarChart2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

const SUGGESTED_COMPANIES = [
  { ticker: 'APX', name: 'Apex Brands Group', sector: 'Consumer Goods', threat: 'Elevated', added: false },
  { ticker: 'CHEF', name: 'Chefs\' Warehouse', sector: 'Consumer Goods', threat: 'Moderate', added: false },
  { ticker: 'NRTX', name: 'Nortera Foods', sector: 'Consumer Goods', threat: 'High', added: false },
  { ticker: 'SFM', name: 'Sprouts Farmers', sector: 'Retail', threat: 'Low', added: false },
  { ticker: 'PRGO', name: 'Perrigo Co.', sector: 'Healthcare', threat: 'Moderate', added: false },
  { ticker: 'HZN', name: 'Horizon Global', sector: 'Industrial', threat: 'Elevated', added: false },
];

const threatColors: Record<string, string> = {
  High: '#DC2626', Elevated: '#F59E0B', Moderate: '#0891B2', Low: '#10B981'
};

const ALERT_OPTIONS = [
  { id: 'debt_price', label: 'Debt Price Change', desc: '> 5% in any direction' },
  { id: 'covenant', label: 'Covenant Violation', desc: 'Any breach detected' },
  { id: 'holder', label: 'Holder Position Change', desc: '> 10% movement' },
];

export function OnboardingModal() {
  const { user, dismissOnboarding } = useAuth();
  const { theme } = useTheme();
  const tc = colors[theme];
  const [step, setStep] = useState(0);
  const [companies, setCompanies] = useState(SUGGESTED_COMPANIES);
  const [search, setSearch] = useState('');
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);
  const [selectedCompany, setSelectedCompany] = useState('APX');

  if (!user?.isNewUser) return null;

  const addedCompanies = companies.filter(c => c.added);

  const toggleCompany = (ticker: string) => {
    setCompanies(cs => cs.map(c => c.ticker === ticker ? { ...c, added: !c.added } : c));
  };

  const toggleAlert = (id: string) => {
    setSelectedAlerts(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const filtered = companies.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.ticker.toLowerCase().includes(search.toLowerCase())
  );

  const steps = ['Welcome', 'Watchlist', 'Alerts', 'Ready'];

  const stepContent = [
    // Step 0: Welcome
    <div key="0" className="text-center">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0891B220' }}>
          <BarChart2 className="w-10 h-10" style={{ color: '#0891B2' }} />
        </div>
      </div>
      <h2 style={{ fontSize: '26px', fontWeight: 700, color: tc.textPrimary, marginBottom: '12px' }}>
        Welcome to Aegis Credit Terminal
      </h2>
      <p style={{ fontSize: '15px', color: tc.textSecondary, lineHeight: 1.7, marginBottom: '24px' }}>
        Track distressed debt, monitor covenants, and analyze holder behavior across 500+ companies in real time.
      </p>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: '$2.1T', sub: 'Debt Tracked', color: '#06B6D4' },
          { label: '500+', sub: 'Companies', color: '#10B981' },
          { label: '40+', sub: 'Institutions', color: '#F59E0B' },
        ].map(s => (
          <div key={s.label} className="rounded-lg p-3" style={{ backgroundColor: `${s.color}15`, border: `1px solid ${s.color}30` }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: s.color, fontFamily: 'JetBrains Mono, monospace' }}>{s.label}</div>
            <div style={{ fontSize: '12px', color: tc.textSecondary }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: '14px', color: tc.textSecondary }}>Let's get you set up in just 2 more steps</p>
    </div>,

    // Step 1: Watchlist
    <div key="1">
      <h2 style={{ fontSize: '22px', fontWeight: 700, color: tc.textPrimary, marginBottom: '4px' }}>
        Add Companies to Your Watchlist
      </h2>
      <p style={{ fontSize: '14px', color: tc.textSecondary, marginBottom: '16px' }}>
        Select companies you want to monitor closely
      </p>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: tc.textSecondary }} />
        <input
          type="text"
          placeholder="Search 500+ companies..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', height: '42px', paddingLeft: '36px', paddingRight: '12px',
            backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
            border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
            color: tc.textPrimary, fontSize: '14px', outline: 'none'
          }}
        />
      </div>
      <div className="space-y-2 max-h-56 overflow-y-auto">
        {filtered.map(co => (
          <div
            key={co.ticker}
            className="flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer"
            style={{ backgroundColor: co.added ? '#0891B210' : (theme === 'dark' ? '#0F1A2A' : '#F9FAFB'), border: `1px solid ${co.added ? '#0891B240' : tc.borderPrimary}` }}
            onClick={() => toggleCompany(co.ticker)}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: '#0891B220' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#0891B2', fontFamily: 'JetBrains Mono, monospace' }}>{co.ticker.slice(0, 3)}</span>
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: tc.textPrimary }}>{co.name}</div>
                <div style={{ fontSize: '11px', color: tc.textSecondary }}>{co.sector}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: `${threatColors[co.threat]}20`, color: threatColors[co.threat], fontSize: '11px' }}>
                {co.threat}
              </span>
              {co.added
                ? <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0891B2' }}><Check className="w-3.5 h-3.5 text-white" /></div>
                : <div className="w-6 h-6 rounded-full border flex items-center justify-center" style={{ borderColor: tc.borderPrimary }}><Star className="w-3 h-3" style={{ color: tc.textTertiary }} /></div>
              }
            </div>
          </div>
        ))}
      </div>
      {addedCompanies.length > 0 && (
        <p style={{ fontSize: '13px', color: '#0891B2', marginTop: '10px' }}>
          {addedCompanies.length} {addedCompanies.length === 1 ? 'company' : 'companies'} added to watchlist
        </p>
      )}
    </div>,

    // Step 2: Alerts
    <div key="2">
      <h2 style={{ fontSize: '22px', fontWeight: 700, color: tc.textPrimary, marginBottom: '4px' }}>
        Set Your First Alert
      </h2>
      <p style={{ fontSize: '14px', color: tc.textSecondary, marginBottom: '16px' }}>
        Get notified when key metrics change
      </p>

      <div className="mb-4">
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
          Select Company
        </label>
        <select
          value={selectedCompany}
          onChange={e => setSelectedCompany(e.target.value)}
          style={{
            width: '100%', height: '42px', padding: '0 12px',
            backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
            border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
            color: tc.textPrimary, fontSize: '14px', outline: 'none', cursor: 'pointer'
          }}
        >
          {SUGGESTED_COMPANIES.map(c => (
            <option key={c.ticker} value={c.ticker}>{c.name} ({c.ticker})</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        {ALERT_OPTIONS.map(alert => (
          <div
            key={alert.id}
            className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors"
            style={{
              backgroundColor: selectedAlerts.includes(alert.id) ? '#0891B215' : (theme === 'dark' ? '#0F1A2A' : '#F9FAFB'),
              border: `1px solid ${selectedAlerts.includes(alert.id) ? '#0891B240' : tc.borderPrimary}`
            }}
            onClick={() => toggleAlert(alert.id)}
          >
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4" style={{ color: selectedAlerts.includes(alert.id) ? '#0891B2' : tc.textSecondary }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: tc.textPrimary }}>{alert.label}</div>
                <div style={{ fontSize: '12px', color: tc.textSecondary }}>{alert.desc}</div>
              </div>
            </div>
            <div className="w-5 h-5 rounded flex items-center justify-center" style={{
              backgroundColor: selectedAlerts.includes(alert.id) ? '#0891B2' : 'transparent',
              border: `1.5px solid ${selectedAlerts.includes(alert.id) ? '#0891B2' : tc.borderPrimary}`
            }}>
              {selectedAlerts.includes(alert.id) && <Check className="w-3 h-3 text-white" />}
            </div>
          </div>
        ))}
      </div>
    </div>,

    // Step 3: Ready
    <div key="3" className="text-center">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#10B98120' }}>
          <Check className="w-10 h-10" style={{ color: '#10B981' }} />
        </div>
      </div>
      <h2 style={{ fontSize: '26px', fontWeight: 700, color: tc.textPrimary, marginBottom: '12px' }}>
        You're All Set!
      </h2>
      <div className="space-y-2 mb-6">
        <div className="flex items-center justify-center gap-2">
          <Star className="w-4 h-4" style={{ color: '#F59E0B' }} />
          <span style={{ fontSize: '14px', color: tc.textSecondary }}>
            <strong style={{ color: tc.textPrimary }}>{addedCompanies.length}</strong> companies in your watchlist
          </span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Bell className="w-4 h-4" style={{ color: '#0891B2' }} />
          <span style={{ fontSize: '14px', color: tc.textSecondary }}>
            <strong style={{ color: tc.textPrimary }}>{selectedAlerts.length}</strong> alerts configured
          </span>
        </div>
      </div>
      <p style={{ fontSize: '14px', color: tc.textSecondary, lineHeight: 1.6 }}>
        Your dashboard is ready. You'll receive notifications for the metrics you're tracking.
      </p>
    </div>,
  ];

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
      <div className="relative w-full max-w-lg mx-4 rounded-xl shadow-2xl overflow-hidden" style={{
        backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}`
      }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-0">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center rounded bg-[#06B6D4]/20 border border-[#06B6D4]/40">
              <span style={{ color: '#06B6D4', fontSize: '9px', fontWeight: 700 }}>AEGIS</span>
            </div>
            <span style={{ fontSize: '12px', color: tc.textSecondary, letterSpacing: '0.05em' }}>ACCOUNT SETUP</span>
          </div>
          <button
            onClick={() => { if (step > 0) setStep(3); else dismissOnboarding(); }}
            style={{ background: 'none', border: 'none', color: tc.textSecondary, cursor: 'pointer', fontSize: '13px' }}
          >
            Skip Setup
          </button>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 pt-4">
          {steps.map((_, i) => (
            <div
              key={i}
              className="transition-all rounded-full"
              style={{
                width: i === step ? '20px' : '8px',
                height: '8px',
                backgroundColor: i === step ? '#0891B2' : i < step ? '#0891B260' : tc.borderPrimary
              }}
            />
          ))}
        </div>

        {/* Step Label */}
        <div className="px-6 pt-2 pb-0">
          <span style={{ fontSize: '11px', color: tc.textSecondary, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Step {step + 1} of {steps.length} — {steps[step]}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">{stepContent[step]}</div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 pb-6">
          <button
            onClick={() => step > 0 ? setStep(s => s - 1) : dismissOnboarding()}
            style={{ background: 'none', border: 'none', color: tc.textSecondary, cursor: 'pointer', fontSize: '14px' }}
          >
            {step > 0 ? '← Back' : "I'll do this later"}
          </button>
          <button
            onClick={() => step < 3 ? setStep(s => s + 1) : dismissOnboarding()}
            className="flex items-center gap-2 transition-all"
            style={{
              height: '40px', padding: '0 20px', backgroundColor: '#0891B2', color: '#FFFFFF',
              border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0E7490'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0891B2'}
          >
            {step === 3 ? 'Go to Dashboard' : step === 2 && selectedAlerts.length === 0 ? 'Skip for now' : "Let's go"}
            {step < 3 && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
