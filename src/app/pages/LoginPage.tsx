import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff, Loader2, AlertCircle, Radar, Terminal, Radio, ShieldCheck, Activity } from 'lucide-react';
import { useAuth, getDashboardPath } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

const DEMO_CREDENTIALS = [
  { email: 'analyst@firm.com', code: 'OP-01', label: 'Orbital Analyst', sub: 'Read-Only Telemetry' },
  { email: 'cfo@apexbrands.com', code: 'OP-02', label: 'Constellation Lead', sub: 'Shell-1 Command' },
  { email: 'admin@aegisterminal.com', code: 'OP-03', label: 'Kessler FDO Director', sub: 'Full CAM + 2FA' },
];

export default function LoginPage() {
  const { login, isLoading, loginAttempts } = useAuth();
  const { theme } = useTheme();
  const tc = colors[theme];
  const navigate = useNavigate();

  const [email, setEmail] = useState('analyst@firm.com');
  const [password, setPassword] = useState('Password123!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [utcClock, setUtcClock] = useState(() => new Date().toISOString().slice(11, 19) + ' UTC');

  useEffect(() => {
    const t = setInterval(() => {
      setUtcClock(new Date().toISOString().slice(11, 19) + ' UTC');
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const validateEmail = (val: string) => {
    if (!val) { setEmailError('Operator callsign/email is required'); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { setEmailError('Please enter a valid mission control email'); return false; }
    setEmailError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!validateEmail(email)) return;
    if (!password) { setError('Security key is required'); return; }

    const result = await login(email, password);
    if (!result.success) { setError(result.error || 'Authentication failed'); return; }
    if (result.requires2FA) { navigate('/2fa'); return; }

    const stored = sessionStorage.getItem('kessler-user') || sessionStorage.getItem('aegis-user');
    if (stored) {
      const u = JSON.parse(stored);
      navigate(getDashboardPath(u.role));
    } else {
      navigate('/dashboard');
    }
  };

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('Password123!');
    setError('');
    setEmailError('');
  };

  return (
    <div
      className="min-h-screen grid grid-cols-1 lg:grid-cols-12"
      style={{
        backgroundColor: tc.bgPrimary,
        color: tc.textPrimary
      }}
    >
      {/* Left 7 Columns: Live Astrodynamics & Orbital Ground-Track Visualizer */}
      <div
        className="hidden lg:flex lg:col-span-7 flex-col justify-between p-8 xl:p-12 relative overflow-hidden border-r"
        style={{
          backgroundColor: '#05070B',
          borderColor: tc.borderPrimary,
          backgroundImage: 'radial-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      >
        {/* Top Telemetry Bar */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 flex items-center justify-center rounded-sm"
              style={{
                backgroundColor: 'rgba(6, 182, 212, 0.14)',
                border: '1px solid rgba(6, 182, 212, 0.45)'
              }}
            >
              <Radar className="w-5 h-5" style={{ color: '#06B6D4' }} />
            </div>
            <div>
              <div className="font-mono text-sm font-bold tracking-[0.14em] text-white">
                KESSLER // VANGUARD ORBITAL SSA
              </div>
              <div className="font-mono text-[10px] tracking-[0.18em] text-[#06B6D4]">
                18TH SDS SPACESURV & CONJUNCTION COMMAND TERMINAL
              </div>
            </div>
          </div>

          <div
            className="px-3 py-1 rounded-sm font-mono text-xs flex items-center gap-2"
            style={{
              backgroundColor: 'rgba(13, 19, 28, 0.9)',
              border: '1px solid #1A2636',
              color: '#06B6D4'
            }}
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>{utcClock}</span>
          </div>
        </div>

        {/* Center SVG Orbital Ground-Track & B-Plane Schematic */}
        <div className="my-auto py-8 z-10">
          <div
            className="rounded-sm p-5 relative overflow-hidden"
            style={{
              backgroundColor: 'rgba(13, 19, 28, 0.82)',
              border: '1px solid #1A2636'
            }}
          >
            <div className="flex items-center justify-between mb-3 font-mono text-[10px] text-[#94A3B8]">
              <span>GROUND-TRACK MERCATOR PROJECTION // SHELL-1 (53.0° INCLINATION)</span>
              <span className="text-[#EF4444] font-bold">ACTIVE CONJUNCTION: VGD-04 vs COSMOS-2251 DEB</span>
            </div>

            <svg viewBox="0 0 680 280" className="w-full h-auto rounded-sm" style={{ backgroundColor: '#04060A', border: '1px solid #1A2636' }}>
              {/* Graticule Grid Lines */}
              {[70, 140, 210].map(y => (
                <line key={y} x1="0" y1={y} x2="680" y2={y} stroke="#131D2B" strokeWidth="1" strokeDasharray="3 3" />
              ))}
              {[113, 226, 340, 453, 566].map(x => (
                <line key={x} x1={x} y1="0" x2={x} y2="280" stroke="#131D2B" strokeWidth="1" strokeDasharray="3 3" />
              ))}
              {/* Equator */}
              <line x1="0" y1="140" x2="680" y2="140" stroke="#1E293B" strokeWidth="1.2" />

              {/* Orbital Sine Wave 1: Vanguard Plane A (53 deg) */}
              <path
                d="M 0 140 C 85 20, 170 20, 255 140 C 340 260, 425 260, 510 140 C 595 20, 650 40, 680 90"
                fill="none"
                stroke="#06B6D4"
                strokeWidth="2"
              />

              {/* Orbital Sine Wave 2: Vanguard Plane B */}
              <path
                d="M 0 210 C 85 90, 170 20, 255 95 C 340 215, 425 260, 510 185 C 595 75, 650 30, 680 55"
                fill="none"
                stroke="rgba(6, 182, 212, 0.35)"
                strokeWidth="1.2"
                strokeDasharray="5 4"
              />

              {/* Retrograde/High-Inclination Debris Orbit: COSMOS-2251 DEB */}
              <path
                d="M 0 40 C 110 110, 210 250, 340 165 C 470 80, 560 15, 680 120"
                fill="none"
                stroke="#EF4444"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />

              {/* Ground Station Footprints */}
              <circle cx="365" cy="48" r="18" fill="rgba(16, 185, 129, 0.08)" stroke="#10B981" strokeWidth="0.8" strokeDasharray="2 2" />
              <circle cx="365" cy="48" r="3" fill="#10B981" />
              <text x="374" y="51" fill="#10B981" fontSize="8" fontFamily="JetBrains Mono">SVALBARD AOS</text>

              <circle cx="545" cy="155" r="20" fill="rgba(6, 182, 212, 0.08)" stroke="#06B6D4" strokeWidth="0.8" strokeDasharray="2 2" />
              <circle cx="545" cy="155" r="3" fill="#06B6D4" />
              <text x="554" y="158" fill="#06B6D4" fontSize="8" fontFamily="JetBrains Mono">KWAJALEIN FENCE</text>

              {/* Conjunction Intercept Node */}
              <circle cx="272" cy="161" r="14" fill="rgba(239, 68, 68, 0.18)" stroke="#EF4444" strokeWidth="1.5" />
              <circle cx="272" cy="161" r="4" fill="#EF4444" />
              <text x="292" y="158" fill="#EF4444" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">
                TCA INTERCEPT // Pc: 4.8e-4
              </text>
              <text x="292" y="170" fill="#E2E8F0" fontSize="8" fontFamily="JetBrains Mono">
                VGD-04 [58214] // MISS: 142m
              </text>

              {/* Nominal Spacecraft Nodes */}
              <circle cx="128" cy="52" r="3.5" fill="#06B6D4" />
              <text x="136" y="55" fill="#06B6D4" fontSize="8" fontFamily="JetBrains Mono">VGD-01</text>

              <circle cx="485" cy="168" r="3.5" fill="#06B6D4" />
              <text x="493" y="171" fill="#06B6D4" fontSize="8" fontFamily="JetBrains Mono">VGD-08</text>
            </svg>

            {/* Bottom Telemetry Readout Strip inside Left Pane */}
            <div className="grid grid-cols-4 gap-3 mt-4 font-mono">
              {[
                { label: 'ACTIVE SV NODES', val: '48 / 48 LOCKED', color: '#10B981' },
                { label: 'PEAK CONJUNCTION Pc', val: '4.82e-4 (RED)', color: '#EF4444' },
                { label: 'SOLAR FLUX F10.7', val: '184.2 SFU', color: '#F59E0B' },
                { label: 'OISL MESH LATENCY', val: '142 ms', color: '#06B6D4' },
              ].map(s => (
                <div key={s.label} className="p-2.5 rounded-sm" style={{ backgroundColor: '#06080D', border: '1px solid #1A2636' }}>
                  <div className="text-[9px] text-[#64748B]">{s.label}</div>
                  <div className="text-xs font-bold mt-0.5" style={{ color: s.color }}>{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Technical Spec */}
        <div className="flex items-center justify-between font-mono text-[11px] text-[#64748B] z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#06B6D4]" />
            <span>CCSDS 508.0-B-1 CDM COMPLIANT // SGP4 EPHEMERIS ENGINE</span>
          </div>
          <span>VANGUARD FLIGHT DYNAMICS DIVISION</span>
        </div>
      </div>

      {/* Right 5 Columns: Operator Authentication Console */}
      <div
        className="lg:col-span-5 flex flex-col justify-center p-6 sm:p-10 xl:p-14"
        style={{ backgroundColor: tc.bgSecondary }}
      >
        <div className="w-full max-w-[420px] mx-auto">
          {/* Mobile Brand Header */}
          <div className="flex lg:hidden items-center gap-2.5 mb-6">
            <div
              className="w-8 h-8 flex items-center justify-center rounded-sm"
              style={{
                backgroundColor: 'rgba(6, 182, 212, 0.14)',
                border: '1px solid rgba(6, 182, 212, 0.4)'
              }}
            >
              <Radar className="w-4 h-4" style={{ color: '#06B6D4' }} />
            </div>
            <span className="font-mono text-xs font-bold tracking-widest" style={{ color: tc.textPrimary }}>
              KESSLER // ORBITAL SSA TERMINAL
            </span>
          </div>

          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm font-mono text-[10px] font-bold uppercase mb-2"
              style={{ backgroundColor: 'rgba(6, 182, 212, 0.14)', color: '#06B6D4', border: '1px solid rgba(6, 182, 212, 0.35)' }}>
              <Terminal className="w-3 h-3" />
              <span>FDO GROUND LINK AUTHENTICATION</span>
            </div>
            <h1 className="font-mono text-2xl font-bold tracking-tight" style={{ color: tc.textPrimary }}>
              Initialize Flight Deck Session
            </h1>
            <p className="text-xs font-mono mt-1" style={{ color: tc.textSecondary }}>
              Select a mission crew preset or enter operator credentials
            </p>
          </div>

          {/* 3-Row Tactical Crew Preset Selector */}
          <div className="mb-6">
            <div className="font-mono text-[10px] uppercase tracking-wider font-bold mb-2" style={{ color: tc.textSecondary }}>
              1-CLICK MISSION CREW CLEARANCE PRESETS (KEY: Password123!)
            </div>
            <div className="space-y-1.5">
              {DEMO_CREDENTIALS.map(d => {
                const selected = email === d.email;
                return (
                  <button
                    key={d.email}
                    type="button"
                    onClick={() => fillDemo(d.email)}
                    className="w-full p-2.5 rounded-sm flex items-center justify-between text-left font-mono transition-all cursor-pointer"
                    style={{
                      backgroundColor: selected ? 'rgba(6, 182, 212, 0.14)' : tc.bgTertiary,
                      border: `1px solid ${selected ? '#06B6D4' : tc.borderPrimary}`,
                      color: tc.textPrimary
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="px-1.5 py-0.5 rounded-sm text-[10px] font-bold"
                        style={{
                          backgroundColor: selected ? '#06B6D4' : tc.bgSecondary,
                          color: selected ? '#06080D' : '#06B6D4'
                        }}
                      >
                        {d.code}
                      </span>
                      <div>
                        <div className="text-xs font-bold">{d.label}</div>
                        <div className="text-[10px]" style={{ color: tc.textSecondary }}>{d.email}</div>
                      </div>
                    </div>
                    <span className="text-[10px]" style={{ color: selected ? '#06B6D4' : tc.textTertiary }}>
                      {d.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {loginAttempts >= 5 && (
            <div
              className="mb-4 p-3 rounded-sm flex items-center gap-2"
              style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#EF4444' }} />
              <span className="font-mono text-xs" style={{ color: '#EF4444' }}>
                Lockout active: 5 failed attempts. Wait 15 minutes.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="font-mono block text-[10px] font-bold uppercase tracking-wider mb-1.5"
                style={{ color: tc.textPrimary }}
              >
                Operator Callsign / Email
              </label>
              <input
                type="text"
                value={email}
                onChange={e => { setEmail(e.target.value); if (emailError) validateEmail(e.target.value); }}
                onBlur={e => validateEmail(e.target.value)}
                placeholder="analyst@firm.com"
                className="w-full h-10 px-3 text-xs rounded-sm outline-none transition-colors font-mono"
                style={{
                  backgroundColor: tc.bgPrimary,
                  border: `1px solid ${emailError ? '#EF4444' : tc.borderPrimary}`,
                  color: tc.textPrimary
                }}
                disabled={isLoading}
              />
              {emailError && (
                <p className="font-mono text-[11px] mt-1" style={{ color: '#EF4444' }}>{emailError}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  className="font-mono text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: tc.textPrimary }}
                >
                  Cryptographic Security Key
                </label>
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="hover:underline font-mono text-[11px] cursor-pointer"
                  style={{ color: '#06B6D4', background: 'none', border: 'none' }}
                >
                  Reset key?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-10 px-3 pr-10 text-xs rounded-sm outline-none transition-colors font-mono"
                  style={{
                    backgroundColor: tc.bgPrimary,
                    border: `1px solid ${error ? '#EF4444' : tc.borderPrimary}`,
                    color: tc.textPrimary
                  }}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-200 cursor-pointer"
                  style={{ background: 'none', border: 'none' }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none font-mono text-xs" style={{ color: tc.textSecondary }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded-sm"
                  style={{ accentColor: '#06B6D4' }}
                />
                Persist ground-station telemetry lock
              </label>
            </div>

            {error && (
              <div
                className="p-2.5 rounded-sm flex items-center gap-2"
                style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#EF4444' }} />
                <span className="font-mono text-xs" style={{ color: '#EF4444' }}>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || loginAttempts >= 5}
              className="w-full h-11 rounded-sm font-mono font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
              style={{
                backgroundColor: '#06B6D4',
                color: '#06080D',
                border: 'none',
                opacity: loginAttempts >= 5 ? 0.5 : 1
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>SYNCHRONIZING EPHEMERIS...</span>
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4" />
                  <span>LAUNCH TELEMETRY FLIGHT DECK</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t flex items-center justify-between font-mono text-xs" style={{ borderColor: tc.borderPrimary }}>
            <span style={{ color: tc.textSecondary }}>New Flight Dynamics operator?</span>
            <span
              style={{ color: '#06B6D4', fontWeight: 700, cursor: 'pointer' }}
              onClick={() => navigate('/signup')}
              className="hover:underline"
            >
              Request Clearance →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
