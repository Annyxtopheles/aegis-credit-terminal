import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff, Loader2, AlertCircle, Radar } from 'lucide-react';
import { useAuth, getDashboardPath } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

const DEMO_CREDENTIALS = [
  { email: 'analyst@firm.com', label: 'Orbital Analyst' },
  { email: 'cfo@apexbrands.com', label: 'Constellation Lead' },
  { email: 'admin@aegisterminal.com', label: 'Kessler FDO Director' },
];

export default function LoginPage() {
  const { login, isLoading, loginAttempts } = useAuth();
  const { theme } = useTheme();
  const tc = colors[theme];
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (val: string) => {
    if (!val) { setEmailError('Operator email is required'); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { setEmailError('Please enter a valid mission control email'); return false; }
    setEmailError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!validateEmail(email)) return;
    if (!password) { setError('Security key / password is required'); return; }

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
      className="min-h-screen flex items-center justify-center p-4 sm:p-8"
      style={{ backgroundColor: tc.bgPrimary }}
    >
      <div
        className="w-full max-w-[440px] p-6 sm:p-8 rounded-xl shadow-2xl transition-all mx-auto"
        style={{
          backgroundColor: tc.bgSecondary,
          border: `1px solid ${tc.borderPrimary}`
        }}
      >
        {/* Top Brand Bar */}
        <div className="flex items-center gap-2.5 mb-8">
          <div
            className="w-8 h-8 flex items-center justify-center rounded border"
            style={{
              backgroundColor: 'rgba(6, 182, 212, 0.14)',
              borderColor: 'rgba(6, 182, 212, 0.4)'
            }}
          >
            <Radar className="w-4 h-4" style={{ color: '#06B6D4' }} />
          </div>
          <span
            className="font-mono"
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: tc.textPrimary,
              letterSpacing: '0.08em'
            }}
          >
            KESSLER // ORBITAL SSA TERMINAL
          </span>
        </div>

        {/* Hero Centered Radar Badge */}
        <div className="flex justify-center mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center border"
            style={{
              backgroundColor: 'rgba(6, 182, 212, 0.1)',
              borderColor: 'rgba(6, 182, 212, 0.35)'
            }}
          >
            <Radar className="w-8 h-8" style={{ color: '#06B6D4' }} />
          </div>
        </div>

        {/* Centered Heading */}
        <div className="mb-7 text-center">
          <h1
            className="font-mono"
            style={{
              fontSize: '26px',
              fontWeight: 700,
              color: tc.textPrimary,
              marginBottom: '8px',
              letterSpacing: '-0.02em'
            }}
          >
            Flight Control Sign In
          </h1>
          <p style={{ fontSize: '14px', color: tc.textSecondary }}>
            Authenticate with Vanguard LEO telemetry credentials
          </p>
        </div>

        {/* 1-Click Demo Accounts Quick Switcher */}
        <div
          className="mb-6 p-2.5 rounded-lg text-center"
          style={{
            backgroundColor: tc.bgTertiary,
            border: `1px solid ${tc.borderSubtle}`
          }}
        >
          <p
            className="font-mono"
            style={{
              fontSize: '10px',
              color: tc.textTertiary,
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 600
            }}
          >
            1-Click Mission Crew Demo (Key: Password123!)
          </p>
          <div className="flex justify-center flex-wrap gap-1.5">
            {DEMO_CREDENTIALS.map(d => (
              <button
                key={d.email}
                type="button"
                onClick={() => fillDemo(d.email)}
                className="px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-all hover:opacity-90 active:scale-95"
                style={{
                  backgroundColor: email === d.email ? '#06B6D4' : 'transparent',
                  border: `1px solid ${email === d.email ? '#06B6D4' : tc.borderPrimary}`,
                  color: email === d.email ? '#06080D' : tc.textSecondary,
                  cursor: 'pointer'
                }}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {loginAttempts >= 5 && (
          <div
            className="mb-4 p-3 rounded-lg flex items-center gap-2"
            style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#EF4444' }} />
            <span style={{ fontSize: '12px', color: '#EF4444' }}>Too many attempts. Telemetry console locked for 15 minutes.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              className="font-mono"
              style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: 600,
                color: tc.textPrimary,
                marginBottom: '6px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}
            >
              Operator Callsign / Email
            </label>
            <input
              type="text"
              value={email}
              onChange={e => { setEmail(e.target.value); if (emailError) validateEmail(e.target.value); }}
              onBlur={e => validateEmail(e.target.value)}
              placeholder="analyst@firm.com"
              className="w-full h-11 px-3.5 text-[13px] rounded-lg outline-none transition-colors font-mono"
              style={{
                backgroundColor: tc.bgTertiary,
                border: `1px solid ${emailError ? '#EF4444' : tc.borderPrimary}`,
                color: tc.textPrimary
              }}
              disabled={isLoading}
            />
            {emailError && (
              <p style={{ color: '#EF4444', fontSize: '11px', marginTop: '4px' }}>{emailError}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                className="font-mono"
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: tc.textPrimary,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}
              >
                Security Key
              </label>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="hover:underline font-mono"
                style={{ fontSize: '11px', color: tc.textSecondary, background: 'none', border: 'none', cursor: 'pointer' }}
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
                className="w-full h-11 px-3.5 pr-10 text-[13px] rounded-lg outline-none transition-colors font-mono"
                style={{
                  backgroundColor: tc.bgTertiary,
                  border: `1px solid ${error ? '#EF4444' : tc.borderPrimary}`,
                  color: tc.textPrimary
                }}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-200"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-[12px]" style={{ color: tc.textSecondary }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded"
                style={{ accentColor: '#06B6D4' }}
              />
              Maintain ground-link session on this terminal
            </label>
          </div>

          {error && (
            <div
              className="p-2.5 rounded-lg flex items-center gap-2"
              style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#EF4444' }} />
              <span style={{ fontSize: '12px', color: '#EF4444' }}>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || loginAttempts >= 5}
            className="w-full h-12 rounded-lg font-mono font-bold text-[13px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
            style={{
              backgroundColor: '#06B6D4',
              color: '#06080D',
              border: 'none',
              cursor: (isLoading || loginAttempts >= 5) ? 'not-allowed' : 'pointer',
              opacity: loginAttempts >= 5 ? 0.5 : 1
            }}
          >
            {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" />Establishing Uplink...</> : 'Initialize Telemetry Session'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px" style={{ backgroundColor: tc.borderSubtle }} />
          <span className="font-mono" style={{ fontSize: '10px', color: tc.textTertiary, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Or authenticate via
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: tc.borderSubtle }} />
        </div>

        {/* SSO */}
        <button
          type="button"
          className="w-full h-10 rounded-lg flex items-center justify-center gap-2 text-[12px] font-mono font-medium transition-all hover:opacity-90"
          style={{
            backgroundColor: tc.bgTertiary,
            border: `1px solid ${tc.borderPrimary}`,
            color: tc.textSecondary,
            cursor: 'pointer'
          }}
        >
          Space-Track / DoD PKI CAC Federation
        </button>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p style={{ fontSize: '12px', color: tc.textSecondary }}>
            New Flight Dynamics operator?{' '}
            <span
              style={{ color: '#06B6D4', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => navigate('/signup')}
            >
              Request Console Clearance
            </span>
          </p>
          <div className="flex items-center justify-center gap-3 mt-3 text-[11px] font-mono" style={{ color: tc.textTertiary }}>
            <span>CCSDS CDM v2.0</span>
            <span>•</span>
            <span>256-bit NSA Suite-B TLS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
