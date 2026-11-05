import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff, Loader2, AlertCircle, Radar } from 'lucide-react';
import { useAuth, getDashboardPath } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

const DEMO_CREDENTIALS = [
  { email: 'analyst@firm.com', code: 'OP-01', label: 'Orbital Analyst', sub: 'Read-Only Telemetry' },
  { email: 'cfo@apexbrands.com', code: 'OP-02', label: 'Constellation Lead', sub: 'Shell-1 Command' },
  { email: 'director@kessler.space', code: 'OP-03', label: 'Kessler FDO Director', sub: 'Full CAM + 2FA' },
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
    const timer = setInterval(() => {
      setUtcClock(new Date().toISOString().slice(11, 19) + ' UTC');
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const validateEmail = (val: string) => {
    if (!val) { setEmailError('Operator callsign is required'); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { setEmailError('Please enter a valid mission control callsign'); return false; }
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
      {/* Left 7 Columns: Live Astrodynamics Visualizer */}
      <div
        className="hidden lg:flex lg:col-span-7 flex-col justify-between p-10 xl:p-14 relative overflow-hidden border-r"
        style={{
          backgroundColor: '#16171A',
          borderColor: tc.borderPrimary,
        }}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Radar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold tracking-wider text-zinc-100 uppercase">
                KESSLER // ORBITAL SSA
              </div>
              <div className="text-[11px] text-zinc-400">
                18th SDS Autonomous Conjunction Screening
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1F2024] border border-[#2A2C32] text-xs text-zinc-300 tabular-nums">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="tabular-nums tracking-wide">{utcClock}</span>
          </div>
        </div>

        {/* Center Astrodynamics Radar Scope Preview */}
        <div className="my-auto py-8 z-10 space-y-6">
          <div className="relative w-80 h-80 mx-auto rounded-full border border-indigo-500/20 bg-[#1F2024]/40 flex items-center justify-center">
            {/* Range Rings */}
            <div className="absolute inset-8 rounded-full border border-indigo-500/15" />
            <div className="absolute inset-20 rounded-full border border-indigo-500/20" />
            <div className="absolute inset-32 rounded-full border border-indigo-500/25" />
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-indigo-500/20" />
            <div className="absolute inset-y-0 left-1/2 w-[1px] bg-indigo-500/20" />

            {/* Sweep Arm */}
            <div
              className="absolute inset-0 rounded-full animate-spin"
              style={{
                background: 'conic-gradient(from 0deg, rgba(99, 102, 241, 0.25) 0deg, transparent 60deg, transparent 360deg)',
                animationDuration: '6s',
                animationTimingFunction: 'linear'
              }}
            />

            {/* Target Blip */}
            <div className="absolute top-24 right-28 flex flex-col items-center">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping absolute" />
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 relative" />
              <span className="text-[9px] text-rose-300 mt-1">COSMOS-2251</span>
            </div>

            {/* Protected SV Blip */}
            <div className="absolute center flex flex-col items-center">
              <span className="w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20" />
              <span className="text-[9px] text-emerald-300 mt-1 font-semibold">VGD-04</span>
            </div>
          </div>

          <div className="text-center max-w-md mx-auto space-y-2">
            <h2 className="text-xl font-bold text-zinc-100 tracking-tight">
              Autonomous Fleet Collision Avoidance
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Continuous 72-hour covariance propagation against 27,400+ orbital debris objects, automated Hall-effect thruster sequencing, and regulatory de-orbit compliance.
            </p>
          </div>
        </div>

        {/* Bottom Telemetry Cards */}
        <div className="grid grid-cols-3 gap-3 z-10">
          <div className="p-3.5 rounded-xl bg-[#1F2024] border border-[#2A2C32]">
            <div className="text-[10px] text-zinc-400 uppercase font-medium">Active Constellation</div>
            <div className="text-base font-bold text-zinc-100 mt-1 tabular-nums">48 / 48 Satellites</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">100% Station-Locked</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#1F2024] border border-[#2A2C32]">
            <div className="text-[10px] text-zinc-400 uppercase font-medium">Debris Screening</div>
            <div className="text-base font-bold text-zinc-100 mt-1 tabular-nums">27,412 Objects</div>
            <div className="text-[10px] text-zinc-400 mt-0.5">18th SDS Spacetrack</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#1F2024] border border-[#2A2C32]">
            <div className="text-[10px] text-zinc-400 uppercase font-medium">CAM Reaction SLA</div>
            <div className="text-base font-bold text-zinc-100 mt-1 tabular-nums">T-102 Minutes</div>
            <div className="text-[10px] text-indigo-400 mt-0.5">Autopilot Armed</div>
          </div>
        </div>
      </div>

      {/* Right 5 Columns: Clean Tempo Sign-In Console */}
      <div className="lg:col-span-5 flex flex-col justify-center p-8 sm:p-12 xl:p-16">
        <div className="max-w-md w-full mx-auto space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
              Flight Deck Sign In
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Select a crew role preset or authenticate with your callsign
            </p>
          </div>

          {/* Crew Preset Selector */}
          <div className="space-y-2">
            {DEMO_CREDENTIALS.map(d => {
              const isSelected = email === d.email;
              return (
                <button
                  key={d.email}
                  type="button"
                  onClick={() => fillDemo(d.email)}
                  className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all ${
                    isSelected
                      ? 'bg-[#282A2F] border border-indigo-500/40 text-zinc-100'
                      : 'bg-[#1F2024] border border-[#2A2C32] hover:border-zinc-700/60 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`px-2.5 h-7 rounded-lg flex items-center justify-center text-xs font-semibold shrink-0 whitespace-nowrap tabular-nums ${
                      isSelected ? 'bg-indigo-500/20 text-indigo-400' : 'bg-[#16171A] text-zinc-400'
                    }`}>
                      {d.code}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-zinc-100 truncate">{d.label}</div>
                      <div className="text-[11px] text-zinc-400 truncate">{d.email}</div>
                    </div>
                  </div>
                  <span className="text-[11px] text-zinc-400 shrink-0 ml-2">
                    {d.sub}
                  </span>
                </button>
              );
            })}
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2.5 text-xs text-rose-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Operator Callsign
              </label>
              <input
                type="text"
                value={email}
                onChange={e => { setEmail(e.target.value); if (emailError) validateEmail(e.target.value); }}
                onBlur={e => validateEmail(e.target.value)}
                placeholder="analyst@firm.com"
                className="w-full h-10 px-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                disabled={isLoading}
              />
              {emailError && (
                <p className="text-xs text-rose-400 mt-1">{emailError}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-zinc-300">
                  Security Key
                </label>
                <a
                  href="/forgot-password"
                  onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Forgot Key?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter security key"
                  className="w-full h-10 pl-3.5 pr-10 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="rounded bg-[#16171A] border-[#2A2C32] text-indigo-600 focus:ring-0"
                />
                <span>Keep session active</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Enter Flight Console'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
