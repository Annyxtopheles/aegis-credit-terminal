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
    <div key="0" className="text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
        <Radar className="w-8 h-8" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-zinc-100 tracking-tight">
          Welcome to KESSLER Orbital SSA
        </h2>
        <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto leading-relaxed">
          Real-time Space Situational Awareness, 18th SDS Conjunction Data Message (CDM) screening, and autonomous Hall-Effect collision avoidance.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-2">
        <div className="p-3 rounded-xl bg-[#16171A] border border-[#2A2C32]">
          <div className="text-base font-bold font-mono text-zinc-100">48 / 48</div>
          <div className="text-[10px] text-zinc-400 mt-0.5">Active SV Nodes</div>
        </div>
        <div className="p-3 rounded-xl bg-[#16171A] border border-[#2A2C32]">
          <div className="text-base font-bold font-mono text-emerald-400">27,400+</div>
          <div className="text-[10px] text-zinc-400 mt-0.5">Tracked Objects</div>
        </div>
        <div className="p-3 rounded-xl bg-[#16171A] border border-[#2A2C32]">
          <div className="text-base font-bold font-mono text-indigo-400">&lt;180ms</div>
          <div className="text-[10px] text-zinc-400 mt-0.5">OISL Mesh Sync</div>
        </div>
      </div>
    </div>,

    // Step 1: Watchlist
    <div key="1" className="space-y-4">
      <div>
        <h2 className="text-base font-semibold text-zinc-100 tracking-tight">
          Assign Orbital Shells to Console
        </h2>
        <p className="text-xs text-zinc-400 mt-0.5">
          Select LEO orbital planes for continuous covariance screening
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        <input
          type="text"
          placeholder="Search orbital shells..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full h-10 pl-9 pr-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="space-y-2 max-h-56 overflow-y-auto">
        {filtered.map(co => (
          <div
            key={co.ticker}
            className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
              co.added
                ? 'bg-[#282A2F] border border-indigo-500/40'
                : 'bg-[#16171A] border border-[#2A2C32] hover:border-zinc-700/60'
            }`}
            onClick={() => toggleShell(co.ticker)}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#1F2024] flex items-center justify-center font-mono text-[10px] font-bold text-indigo-400 border border-zinc-700/50">
                {co.ticker}
              </span>
              <div>
                <div className="text-xs font-semibold text-zinc-100">{co.name}</div>
                <div className="text-[11px] text-zinc-400">{co.sector}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                co.threat === 'Critical' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                co.threat === 'Elevated' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              }`}>
                {co.threat}
              </span>
              <div className={`w-5 h-5 rounded-lg flex items-center justify-center ${co.added ? 'bg-indigo-500 text-white' : 'border border-zinc-700'}`}>
                {co.added && <Check className="w-3 h-3" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>,

    // Step 2: Alerts
    <div key="2" className="space-y-4">
      <div>
        <h2 className="text-base font-semibold text-zinc-100 tracking-tight">
          Configure Automated CDM Triggers
        </h2>
        <p className="text-xs text-zinc-400 mt-0.5">
          Arm real-time conjunction and thermospheric drag alarms
        </p>
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-300 mb-1.5">Primary Constellation Shell</label>
        <select
          value={selectedShell}
          onChange={e => setSelectedShell(e.target.value)}
          className="w-full h-10 px-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          {SUGGESTED_SHELLS.map(c => (
            <option key={c.ticker} value={c.ticker}>{c.name} [{c.ticker}]</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        {ALERT_OPTIONS.map(alert => {
          const isSelected = selectedAlerts.includes(alert.id);
          return (
            <div
              key={alert.id}
              className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[#282A2F] border border-indigo-500/40'
                  : 'bg-[#16171A] border border-[#2A2C32] hover:border-zinc-700/60'
              }`}
              onClick={() => toggleAlert(alert.id)}
            >
              <div className="flex items-center gap-3">
                <Bell className={`w-4 h-4 ${isSelected ? 'text-indigo-400' : 'text-zinc-500'}`} />
                <div>
                  <div className="text-xs font-semibold text-zinc-100">{alert.label}</div>
                  <div className="text-[11px] text-zinc-400">{alert.desc}</div>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-lg flex items-center justify-center ${isSelected ? 'bg-indigo-500 text-white' : 'border border-zinc-700'}`}>
                {isSelected && <Check className="w-3 h-3" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>,

    // Step 3: Ready
    <div key="3" className="text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
        <Check className="w-8 h-8" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-zinc-100 tracking-tight">
          Telemetry Lock Established
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          Your orbital flight deck is configured and ready for live operations
        </p>
      </div>

      <div className="p-4 rounded-xl bg-[#16171A] border border-[#2A2C32] text-left space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-zinc-400">Synced Shells:</span>
          <span className="font-semibold text-zinc-200">{addedShells.length} Orbital Shells</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zinc-400">Armed Alarms:</span>
          <span className="font-semibold text-zinc-200">{selectedAlerts.length} Threshold Triggers</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zinc-400">Primary Focus:</span>
          <span className="font-mono text-indigo-400 font-semibold">{selectedShell}</span>
        </div>
      </div>
    </div>
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-[#1F2024] border border-[#2A2C32] p-6 shadow-2xl space-y-6">
        {/* Stepper Dots */}
        <div className="flex items-center justify-between border-b border-[#2A2C32] pb-4">
          <div className="flex items-center gap-1.5">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === step ? 'w-6 bg-indigo-500' : i < step ? 'w-2 bg-indigo-500/50' : 'w-2 bg-zinc-700'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-zinc-400 font-medium">
            Step {step + 1} of {steps.length}
          </span>
        </div>

        {/* Content */}
        {stepContent[step]}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-[#2A2C32]">
          {step > 0 ? (
            <button
              onClick={() => setStep(s => s - 1)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Back
            </button>
          ) : <div />}

          <button
            onClick={() => {
              if (step < steps.length - 1) setStep(s => s + 1);
              else dismissOnboarding();
            }}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-colors"
          >
            <span>{step === steps.length - 1 ? 'Launch Flight Console' : 'Continue'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
