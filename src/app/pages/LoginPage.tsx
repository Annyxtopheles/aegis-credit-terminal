import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff, Loader2, AlertCircle, Shield } from 'lucide-react';
import { useAuth, getDashboardPath } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

const DEMO_CREDENTIALS = [
  { email: 'analyst@firm.com', label: 'User' },
  { email: 'cfo@apexbrands.com', label: 'Company Admin' },
  { email: 'admin@aegisterminal.com', label: 'Aegis Admin' },
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
    if (!val) { setEmailError('Email is required'); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { setEmailError('Please enter a valid email'); return false; }
    setEmailError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!validateEmail(email)) return;
    if (!password) { setError('Password is required'); return; }

    const result = await login(email, password);
    if (!result.success) { setError(result.error || 'Login failed'); return; }
    if (result.requires2FA) { navigate('/2fa'); return; }

    const stored = sessionStorage.getItem('icr-user');
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
              backgroundColor: tc.bgTertiary,
              borderColor: tc.borderPrimary
            }}
          >
            <Shield className="w-4 h-4" style={{ color: tc.textPrimary }} />
          </div>
          <span
            style={{
              fontSize: '15px',
              fontWeight: 700,
              color: tc.textPrimary,
              letterSpacing: '0.06em'
            }}
          >
            AEGIS CREDIT TERMINAL
          </span>
        </div>

        {/* Hero Centered Shield Badge */}
        <div className="flex justify-center mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center border"
            style={{
              backgroundColor: tc.bgTertiary,
              borderColor: tc.borderPrimary
            }}
          >
            <Shield className="w-8 h-8" style={{ color: tc.textPrimary }} />
          </div>
        </div>

        {/* Centered Heading */}
        <div className="mb-7 text-center">
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: tc.textPrimary,
              marginBottom: '8px',
              letterSpacing: '-0.02em'
            }}
          >
            Terminal Sign In
          </h1>
          <p style={{ fontSize: '15px', color: tc.textSecondary }}>
            Authenticate with institutional credentials
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
            style={{
              fontSize: '10px',
              color: tc.textTertiary,
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 600
            }}
          >
            1-Click Demo Accounts (Pass: Password123!)
          </p>
          <div className="flex justify-center flex-wrap gap-1.5">
            {DEMO_CREDENTIALS.map(d => (
              <button
                key={d.email}
                type="button"
                onClick={() => fillDemo(d.email)}
                className="px-2.5 py-1 rounded text-[11px] font-medium transition-all hover:opacity-90 active:scale-95"
                style={{
                  backgroundColor: email === d.email ? (theme === 'dark' ? '#EDEDED' : '#111318') : 'transparent',
                  border: `1px solid ${email === d.email ? tc.textPrimary : tc.borderPrimary}`,
                  color: email === d.email ? (theme === 'dark' ? '#0B0C0E' : '#FFFFFF') : tc.textSecondary,
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
            style={{ backgroundColor: 'rgba(229, 72, 77, 0.1)', border: '1px solid rgba(229, 72, 77, 0.3)' }}
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#E5484D' }} />
            <span style={{ fontSize: '12px', color: '#E5484D' }}>Too many attempts. Locked for 15 minutes.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
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
              Institutional Email
            </label>
            <input
              type="text"
              value={email}
              onChange={e => { setEmail(e.target.value); if (emailError) validateEmail(e.target.value); }}
              onBlur={e => validateEmail(e.target.value)}
              placeholder="analyst@firm.com"
              className="w-full h-11 px-3.5 text-[13px] rounded-lg outline-none transition-colors"
              style={{
                backgroundColor: tc.bgTertiary,
                border: `1px solid ${emailError ? '#E5484D' : tc.borderPrimary}`,
                color: tc.textPrimary
              }}
              disabled={isLoading}
            />
            {emailError && (
              <p style={{ color: '#E5484D', fontSize: '11px', marginTop: '4px' }}>{emailError}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: tc.textPrimary,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="hover:underline"
                style={{ fontSize: '11px', color: tc.textSecondary, background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-11 px-3.5 pr-10 text-[13px] rounded-lg outline-none transition-colors"
                style={{
                  backgroundColor: tc.bgTertiary,
                  border: `1px solid ${error ? '#E5484D' : tc.borderPrimary}`,
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
                style={{ accentColor: tc.textPrimary }}
              />
              Remember this device
            </label>
          </div>

          {error && (
            <div
              className="p-2.5 rounded-lg flex items-center gap-2"
              style={{ backgroundColor: 'rgba(229, 72, 77, 0.1)', border: '1px solid rgba(229, 72, 77, 0.3)' }}
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#E5484D' }} />
              <span style={{ fontSize: '12px', color: '#E5484D' }}>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || loginAttempts >= 5}
            className="w-full h-12 rounded-lg font-bold text-[13px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
            style={{
              backgroundColor: theme === 'dark' ? '#EDEDED' : '#111318',
              color: theme === 'dark' ? '#0B0C0E' : '#FFFFFF',
              border: 'none',
              cursor: (isLoading || loginAttempts >= 5) ? 'not-allowed' : 'pointer',
              opacity: loginAttempts >= 5 ? 0.5 : 1
            }}
          >
            {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" />Authenticating...</> : 'Sign In to Terminal'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px" style={{ backgroundColor: tc.borderSubtle }} />
          <span style={{ fontSize: '10px', color: tc.textTertiary, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Or continue with
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: tc.borderSubtle }} />
        </div>

        {/* SSO */}
        <button
          type="button"
          className="w-full h-10 rounded-lg flex items-center justify-center gap-2 text-[12px] font-medium transition-all hover:opacity-90"
          style={{
            backgroundColor: tc.bgTertiary,
            border: `1px solid ${tc.borderPrimary}`,
            color: tc.textSecondary,
            cursor: 'pointer'
          }}
        >
          Institutional SSO (Azure AD / Okta)
        </button>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p style={{ fontSize: '12px', color: tc.textSecondary }}>
            Need institutional access?{' '}
            <span
              style={{ color: tc.textPrimary, fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => navigate('/signup')}
            >
              Request Access
            </span>
          </p>
          <div className="flex items-center justify-center gap-3 mt-3 text-[11px]" style={{ color: tc.textTertiary }}>
            <span>SOC 2 Type II Certified</span>
            <span>•</span>
            <span>256-bit TLS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
