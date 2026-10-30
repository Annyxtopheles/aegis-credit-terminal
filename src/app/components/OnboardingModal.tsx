import { useState } from 'react';
import { Search, Star, Bell, Check, ChevronRight, Radar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

const SUGGESTED_SHELLS = [
  { ticker: 'VGD-S1', name: 'Vanguard LEO Shell-1 (550 km)', sector: '53.0° Inclination // 48 SV', threat: 'Critical', added: true },
  { ticker: 'VGD-S2', name: 'Vanguard Sun-Sync Shell-2 (720 km)', sector: '98.2° SSO // 24 SV', threat: 'Elevated', added: false },
  { ticker: 'VGD-VLEO', name: 'Vanguard VLEO Recon Shell (380 km)', sector: '45.0° Inclination // 12 SV', threat: 'Moderate', added: false },
  { ticker: 'IRID-NEXT', name: 'Iridium NEXT Cross-Shell (780 km)', sector: '86.4° Polar // External', threat: 'Low', added: false },
  { ticker: 'SENT-6B', name: 'Copernicus Sentinel Corridor', sector: '66.0° Altimetry // External', threat: 'Moderate', added: false },
];

const threatColors: Record<string, string> = {
  Critical: '#EF4444', Elevated: '#F97316', Moderate: '#F59E0B', Low: '#10B981'
};

const ALERT_OPTIONS = [
  { id: 'conjunction_pc', label: 'Red Conjunction Threshold', desc: 'Collision probability Pc > 1.0e-4 within 72h TCA' },
  { id: 'deorbit_fuel', label: 'FCC De-Orbit Fuel Reserve SLA', desc: 'Xenon reserve drops below 4.50 kg per SV' },
  { id: 'solar_storm', label: 'NOAA Geomagnetic Storm Watch', desc: 'Kp Index >= 5.0 or F10.7 > 175 SFU' },
];

export function OnboardingModal() {
  const { user, dismissOnboarding } = useAuth();
  const { theme } = useTheme();
  const tc = colors[theme];
  const [step, setStep] = useState(0);
  const [shells, setShells] = useState(SUGGESTED_SHELLS);
  const [search, setSearch] = useState('');
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>(['conjunction_pc']);
  const [selectedShell, setSelectedShell] = useState('VGD-S1');

  if (!user?.isNewUser) return null;

  const addedShells = shells.filter(c => c.added);

  const toggleShell = (ticker: string) => {
    setShells(cs => cs.map(c => c.ticker === ticker ? { ...c, added: !c.added } : c));
  };

  const toggleAlert = (id: string) => {
    setSelectedAlerts(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const filtered = shells.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.ticker.toLowerCase().includes(search.toLowerCase())
  );

  const steps = ['Mission Brief', 'Orbital Shells', 'CDM Triggers', 'Telemetry Lock'];

  const stepContent = [
    // Step 0: Welcome
    <div key="0" className="text-center">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(245, 158, 11, 0.14)', border: '1px solid rgba(245, 158, 11, 0.35)' }}>
          <Radar className="w-10 h-10" style={{ color: '#F59E0B' }} />
        </div>
      </div>
      <h2 style={{ fontSize: '24px', fontWeight: 700, color: tc.textPrimary, marginBottom: '12px' }} className="font-mono">
        Welcome to KESSLER Orbital SSA
      </h2>
      <p style={{ fontSize: '14px', color: tc.textSecondary, lineHeight: 1.7, marginBottom: '24px' }}>
        Real-time Space Situational Awareness, 18th SDS Conjunction Data Message (CDM) screening, and autonomous Hall-Effect collision avoidance command for LEO constellations.
      </p>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: '48/48', sub: 'Active SV Nodes', color: '#F59E0B' },
          { label: '27,400+', sub: 'Tracked Objects', color: '#10B981' },
          { label: '<180ms', sub: 'OISL Relay Latency', color: '#FB923C' },
        ].map(s => (
          <div key={s.label} className="rounded-lg p-3" style={{ backgroundColor: `${s.color}15`, border: `1px solid ${s.color}30` }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: s.color, fontFamily: 'JetBrains Mono, monospace' }}>{s.label}</div>
            <div style={{ fontSize: '11px', color: tc.textSecondary }} className="font-mono">{s.sub}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: '13px', color: tc.textSecondary }} className="font-mono">Configure your Flight Director console in 2 steps</p>
    </div>,

    // Step 1: Watchlist
    <div key="1">
      <h2 style={{ fontSize: '20px', fontWeight: 700, color: tc.textPrimary, marginBottom: '4px' }} className="font-mono">
        Assign Orbital Shells to Console
      </h2>
      <p style={{ fontSize: '13px', color: tc.textSecondary, marginBottom: '16px' }}>
        Select LEO orbital planes for continuous covariance screening
      </p>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: tc.textSecondary }} />
        <input
          type="text"
          placeholder="Search orbital shells or NORAD designators..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', height: '42px', paddingLeft: '36px', paddingRight: '12px',
            backgroundColor: theme === 'dark' ? tc.bgPrimary : '#FFFFFF',
            border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
            color: tc.textPrimary, fontSize: '13px', outline: 'none'
          }}
        />
      </div>
      <div className="space-y-2 max-h-56 overflow-y-auto">
        {filtered.map(co => (
          <div
            key={co.ticker}
            className="flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer"
            style={{ backgroundColor: co.added ? 'rgba(245, 158, 11, 0.10)' : (theme === 'dark' ? tc.bgPrimary : '#F9FAFB'), border: `1px solid ${co.added ? 'rgba(245, 158, 11, 0.4)' : tc.borderPrimary}` }}
            onClick={() => toggleShell(co.ticker)}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-8 rounded flex items-center justify-center" style={{ backgroundColor: 'rgba(245, 158, 11, 0.16)' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: tc.accentPrimary, fontFamily: 'JetBrains Mono, monospace' }}>{co.ticker}</span>
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: tc.textPrimary }}>{co.name}</div>
                <div style={{ fontSize: '11px', color: tc.textSecondary }} className="font-mono">{co.sector}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs font-mono" style={{ backgroundColor: `${threatColors[co.threat]}20`, color: threatColors[co.threat], fontSize: '11px' }}>
                {co.threat}
              </span>
              {co.added
                ? <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: tc.accentPrimary }}><Check className="w-3.5 h-3.5 text-white" /></div>
                : <div className="w-6 h-6 rounded-full border flex items-center justify-center" style={{ borderColor: tc.borderPrimary }}><Star className="w-3 h-3" style={{ color: tc.textTertiary }} /></div>
              }
            </div>
          </div>
        ))}
      </div>
      {addedShells.length > 0 && (
        <p style={{ fontSize: '12px', color: tc.accentPrimary, marginTop: '10px' }} className="font-mono">
          {addedShells.length} orbital {addedShells.length === 1 ? 'shell' : 'shells'} locked to telemetry feed
        </p>
      )}
    </div>,

    // Step 2: Alerts
    <div key="2">
      <h2 style={{ fontSize: '20px', fontWeight: 700, color: tc.textPrimary, marginBottom: '4px' }} className="font-mono">
        Configure Automated CDM Triggers
      </h2>
      <p style={{ fontSize: '13px', color: tc.textSecondary, marginBottom: '16px' }}>
        Arm real-time conjunction and thermospheric drag alarms
      </p>

      <div className="mb-4">
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: tc.textPrimary, marginBottom: '6px' }} className="font-mono uppercase">
          Primary Constellation Shell
        </label>
        <select
          value={selectedShell}
          onChange={e => setSelectedShell(e.target.value)}
          style={{
            width: '100%', height: '42px', padding: '0 12px',
            backgroundColor: theme === 'dark' ? tc.bgPrimary : '#FFFFFF',
            border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
            color: tc.textPrimary, fontSize: '13px', outline: 'none', cursor: 'pointer'
          }}
        >
          {SUGGESTED_SHELLS.map(c => (
            <option key={c.ticker} value={c.ticker}>{c.name} [{c.ticker}]</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        {ALERT_OPTIONS.map(alert => (
          <div
            key={alert.id}
            className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors"
            style={{
              backgroundColor: selectedAlerts.includes(alert.id) ? 'rgba(245, 158, 11, 0.12)' : (theme === 'dark' ? tc.bgPrimary : '#F9FAFB'),
              border: `1px solid ${selectedAlerts.includes(alert.id) ? 'rgba(245, 158, 11, 0.4)' : tc.borderPrimary}`
            }}
            onClick={() => toggleAlert(alert.id)}
          >
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4" style={{ color: selectedAlerts.includes(alert.id) ? tc.accentPrimary : tc.textSecondary }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: tc.textPrimary }}>{alert.label}</div>
                <div style={{ fontSize: '12px', color: tc.textSecondary }} className="font-mono">{alert.desc}</div>
              </div>
            </div>
            <div className="w-5 h-5 rounded flex items-center justify-center" style={{
              backgroundColor: selectedAlerts.includes(alert.id) ? tc.accentPrimary : 'transparent',
              border: `1.5px solid ${selectedAlerts.includes(alert.id) ? tc.accentPrimary : tc.borderPrimary}`
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
      <h2 style={{ fontSize: '24px', fontWeight: 700, color: tc.textPrimary, marginBottom: '12px' }} className="font-mono">
        Telemetry Lock Established
      </h2>
      <div className="space-y-2 mb-6">
        <div className="flex items-center justify-center gap-2">
          <Star className="w-4 h-4" style={{ color: '#F59E0B' }} />
          <span style={{ fontSize: '14px', color: tc.textSecondary }}>
            <strong style={{ color: tc.textPrimary }}>{addedShells.length}</strong> orbital shells synced to radar feed
          </span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Bell className="w-4 h-4" style={{ color: tc.accentPrimary }} />
          <span style={{ fontSize: '14px', color: tc.textSecondary }}>
            <strong style={{ color: tc.textPrimary }}>{selectedAlerts.length}</strong> automated CDM triggers armed
          </span>
        </div>
      </div>
      <p style={{ fontSize: '13px', color: tc.textSecondary, lineHeight: 1.6 }} className="font-mono">
        Your KESSLER Flight Dynamics command console is live and streaming ephemeris telemetry.
      </p>
    </div>,
  ];

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}>
      <div className="relative w-full max-w-lg mx-4 rounded-xl shadow-2xl overflow-hidden" style={{
        backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}`
      }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-0">
          <div className="flex items-center gap-2">
            <div className="px-2 py-0.5 flex items-center justify-center rounded bg-amber-500/20 border border-amber-500/40">
              <span className="font-mono" style={{ color: tc.accentPrimary, fontSize: '10px', fontWeight: 700 }}>KESSLER</span>
            </div>
            <span className="font-mono" style={{ fontSize: '11px', color: tc.textSecondary, letterSpacing: '0.06em' }}>FDO CONSOLE INITIALIZATION</span>
          </div>
          <button
            onClick={() => { if (step > 0) setStep(3); else dismissOnboarding(); }}
            style={{ background: 'none', border: 'none', color: tc.textSecondary, cursor: 'pointer', fontSize: '12px' }}
            className="font-mono"
          >
            Skip Briefing
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
                backgroundColor: i === step ? tc.accentPrimary : i < step ? `${tc.accentPrimary}60` : tc.borderPrimary
              }}
            />
          ))}
        </div>

        {/* Step Label */}
        <div className="px-6 pt-2 pb-0">
          <span className="font-mono" style={{ fontSize: '11px', color: tc.textSecondary, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Phase {step + 1} of {steps.length} — {steps[step]}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">{stepContent[step]}</div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 pb-6">
          <button
            onClick={() => step > 0 ? setStep(s => s - 1) : dismissOnboarding()}
            style={{ background: 'none', border: 'none', color: tc.textSecondary, cursor: 'pointer', fontSize: '13px' }}
            className="font-mono"
          >
            {step > 0 ? '← Previous' : 'Defer initialization'}
          </button>
          <button
            onClick={() => step < 3 ? setStep(s => s + 1) : dismissOnboarding()}
            className="flex items-center gap-2 transition-all font-mono"
            style={{
              height: '40px', padding: '0 20px', backgroundColor: tc.accentPrimary, color: tc.bgPrimary,
              border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 700, cursor: 'pointer'
            }}
          >
            {step === 3 ? 'Launch Console' : step === 2 && selectedAlerts.length === 0 ? 'Skip Triggers' : 'Proceed'}
            {step < 3 && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
