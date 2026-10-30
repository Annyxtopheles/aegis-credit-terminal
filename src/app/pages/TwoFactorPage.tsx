import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Loader2, Radar } from 'lucide-react';
import { useAuth, getDashboardPath } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export default function TwoFactorPage() {
  const { verify2FA, isLoading, pendingEmail } = useAuth();
  const { theme } = useTheme();
  const tc = colors[theme];
  const navigate = useNavigate();
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [trustDevice, setTrustDevice] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!pendingEmail) navigate('/login');
    else inputRefs.current[0]?.focus();
  }, [pendingEmail, navigate]);

  // Demo hint
  useEffect(() => {
    setTimeout(() => setDigits(['1', '2', '3', '4', '5', '6']), 500);
  }, []);

  const handleDigitChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...digits];
    newDigits[index] = cleaned;
    setDigits(newDigits);
    setError('');
    if (cleaned && index < 5) inputRefs.current[index + 1]?.focus();
    if (newDigits.every(d => d !== '')) handleVerify(newDigits.join(''));
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) inputRefs.current[index - 1]?.focus();
    if (e.key === 'ArrowRight' && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setDigits(pasted.split(''));
      handleVerify(pasted);
    }
  };

  const handleVerify = async (code: string) => {
    const result = await verify2FA(code);
    if (!result.success) {
      setError(result.error || 'Invalid token');
      setDigits(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      return;
    }
    const stored = sessionStorage.getItem('kessler-user') || sessionStorage.getItem('aegis-user');
    if (stored) {
      const u = JSON.parse(stored);
      navigate(getDashboardPath(u.role));
    } else {
      navigate('/dashboard');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join('');
    if (code.length < 6) { setError('Please enter all 6 digits'); return; }
    handleVerify(code);
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
            Flight Director 2FA Token
          </h1>
          <p style={{ fontSize: '14px', color: tc.textSecondary }}>
            Enter your 6-digit hardware YubiKey / TOTP mission token
          </p>
          {pendingEmail && (
            <p className="font-mono" style={{ fontSize: '12px', color: tc.textTertiary, marginTop: '6px' }}>
              Operator: <span style={{ color: tc.accentPrimary, fontWeight: 600 }}>{pendingEmail}</span>
            </p>
          )}
          <div
            className="mt-3 p-1.5 px-3 rounded-lg inline-block"
            style={{ backgroundColor: `${tc.accentPrimary}20`, border: `1px solid ${tc.accentPrimary}50` }}
          >
            <span className="font-mono" style={{ fontSize: '12px', color: tc.accentPrimary, fontWeight: 500 }}>
              Simulation Mode: Token auto-filled as 123456
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2.5" onPaste={handlePaste}>
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={el => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleDigitChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                className="text-center transition-all"
                style={{
                  width: '52px',
                  height: '54px',
                  backgroundColor: tc.bgTertiary,
                  border: `1px solid ${error ? tc.alertRed : digit ? tc.accentPrimary : tc.borderPrimary}`,
                  borderRadius: '8px',
                  color: tc.textPrimary,
                  fontSize: '22px',
                  fontWeight: 700,
                  fontFamily: 'JetBrains Mono, monospace',
                  outline: 'none',
                }}
                aria-label={`Digit ${i + 1}`}
              />
            ))}
          </div>

          {error && (
            <p style={{ textAlign: 'center', color: tc.alertRed, fontSize: '13px' }}>{error}</p>
          )}

          <div className="flex items-center justify-center gap-2">
            <input
              type="checkbox"
              id="trust"
              checked={trustDevice}
              onChange={e => setTrustDevice(e.target.checked)}
              style={{ accentColor: tc.accentPrimary, width: '16px', height: '16px', cursor: 'pointer' }}
            />
            <label htmlFor="trust" style={{ fontSize: '13px', color: tc.textSecondary, cursor: 'pointer' }}>
              Authorize this ground station terminal for 30 days
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading || digits.some(d => !d)}
            className="w-full h-12 rounded-lg font-mono font-bold text-[13px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
            style={{
              backgroundColor: tc.accentPrimary,
              color: tc.bgPrimary,
              border: 'none',
              cursor: (isLoading || digits.some(d => !d)) ? 'not-allowed' : 'pointer',
              opacity: digits.some(d => !d) ? 0.6 : 1
            }}
          >
            {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" />Verifying Token...</> : 'Verify & Open Command Console'}
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
