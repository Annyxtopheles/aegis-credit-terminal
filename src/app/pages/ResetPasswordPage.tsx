import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Radar, Eye, EyeOff, Loader2, Check, X, ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

interface PasswordRule {
  id: string;
  label: string;
  test: (p: string) => boolean;
}

const passwordRules: PasswordRule[] = [
  { id: 'length', label: 'At least 12 characters', test: p => p.length >= 12 },
  { id: 'upper', label: 'One uppercase letter', test: p => /[A-Z]/.test(p) },
  { id: 'number', label: 'One number', test: p => /[0-9]/.test(p) },
  { id: 'special', label: 'One special character', test: p => /[!@#$%^&*]/.test(p) },
];

export default function ResetPasswordPage() {
  const { theme } = useTheme();
  const tc = colors[theme];
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showP, setShowP] = useState(false);
  const [showC, setShowC] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getStrength = (p: string) => {
    const passed = passwordRules.filter(r => r.test(p)).length;
    if (passed <= 1) return { level: 'weak', label: 'Weak', color: tc.alertRed, width: '25%' };
    if (passed <= 2) return { level: 'medium', label: 'Medium', color: tc.alertAmber, width: '50%' };
    if (passed <= 3) return { level: 'medium', label: 'Good', color: tc.alertAmber, width: '75%' };
    return { level: 'strong', label: 'Strong', color: tc.alertGreen, width: '100%' };
  };

  const strength = getStrength(password);
  const confirmError = confirm && confirm !== password ? 'Security keys do not match' : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError('Security keys do not match'); return; }
    if (!passwordRules.every(r => r.test(password))) { setError('Security key does not meet cryptographic requirements'); return; }
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsLoading(false);
    navigate('/login?reset=success');
  };

  const inputStyle = (err?: string) => ({
    backgroundColor: tc.bgTertiary,
    border: `1px solid ${err ? tc.alertRed : tc.borderPrimary}`,
    color: tc.textPrimary,
    borderRadius: '8px',
    height: '44px',
    padding: '0 44px 0 14px',
    fontSize: '13px',
    outline: 'none',
    width: '100%',
  });

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
        <div className="flex items-center gap-2.5 mb-8">
          <div
            className="w-8 h-8 flex items-center justify-center rounded border"
            style={{
              backgroundColor: `${tc.accentPrimary}25`,
              borderColor: `${tc.accentPrimary}60`
            }}
          >
            <Radar className="w-4 h-4" style={{ color: tc.accentPrimary }} />
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

        <div className="flex justify-center mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center border"
            style={{
              backgroundColor: `${tc.accentPrimary}20`,
              borderColor: `${tc.accentPrimary}50`
            }}
          >
            <Radar className="w-8 h-8" style={{ color: tc.accentPrimary }} />
          </div>
        </div>

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
            Provision New Security Key
          </h1>
          <p style={{ fontSize: '14px', color: tc.textSecondary }}>
            Set a new cryptographic credential for Flight Control access
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              New Security Key
            </label>
            <div className="relative">
              <input
                type={showP ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                style={inputStyle()}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowP(!showP)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-200"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {showP ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {password && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span style={{ fontSize: '11px', color: tc.textSecondary }}>Entropy</span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: strength.color }}>{strength.label}</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: tc.borderSubtle }}>
                  <div className="h-full rounded-full transition-all duration-300" style={{ width: strength.width, backgroundColor: strength.color }} />
                </div>
              </div>
            )}

            <div className="mt-3 space-y-1.5">
              {passwordRules.map(rule => {
                const met = rule.test(password);
                return (
                  <div key={rule.id} className="flex items-center gap-2">
                    {met ? <Check className="w-3.5 h-3.5" style={{ color: tc.alertGreen }} /> : <X className="w-3.5 h-3.5" style={{ color: tc.textTertiary }} />}
                    <span style={{ fontSize: '11px', color: met ? tc.alertGreen : tc.textTertiary }}>{rule.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

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
              Confirm Security Key
            </label>
            <div className="relative">
              <input
                type={showC ? 'text' : 'password'}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                style={inputStyle(confirmError)}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowC(!showC)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-200"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {showC ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {confirmError && <p style={{ color: tc.alertRed, fontSize: '11px', marginTop: '4px' }}>{confirmError}</p>}
          </div>

          {error && (
            <p style={{ color: tc.alertRed, fontSize: '12px' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-lg font-mono font-bold text-[13px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
            style={{
              backgroundColor: tc.accentPrimary,
              color: tc.bgPrimary,
              border: 'none',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" />Updating Key...</> : 'Commit Security Key'}
          </button>
        </form>

        <button
          onClick={() => navigate('/login')}
          className="flex items-center justify-center gap-2 mt-6 transition-colors hover:underline font-mono"
          style={{
            background: 'none',
            border: 'none',
            color: tc.textSecondary,
            cursor: 'pointer',
            fontSize: '13px',
            padding: 0,
            width: '100%'
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Flight Control Sign In
        </button>
      </div>
    </div>
  );
}
