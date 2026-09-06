import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Loader2, Shield } from 'lucide-react';
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
      setError(result.error || 'Invalid code');
      setDigits(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      return;
    }
    const stored = sessionStorage.getItem('icr-user');
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
            Verify Your Identity
          </h1>
          <p style={{ fontSize: '15px', color: tc.textSecondary }}>
            Enter the 6-digit code from your authenticator app
          </p>
          {pendingEmail && (
            <p style={{ fontSize: '13px', color: tc.textTertiary, marginTop: '6px' }}>
              Signing in as <span style={{ color: tc.textPrimary, fontWeight: 600 }}>{pendingEmail}</span>
            </p>
          )}
          <div
            className="mt-3 p-1.5 px-3 rounded-lg inline-block"
            style={{ backgroundColor: 'rgba(48, 164, 108, 0.12)', border: '1px solid rgba(48, 164, 108, 0.3)' }}
          >
            <span style={{ fontSize: '12px', color: '#30A46C', fontWeight: 500 }}>
              Demo: code is pre-filled as 123456
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Inputs */}
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
                  border: `1px solid ${error ? '#E5484D' : digit ? tc.textPrimary : tc.borderPrimary}`,
                  borderRadius: '8px',
                  color: tc.textPrimary,
                  fontSize: '22px',
                  fontWeight: 700,
                  fontFamily: 'JetBrains Mono, monospace',
                  outline: 'none',
                }}
                onFocus={e => {
                  if (!error) e.currentTarget.style.borderColor = tc.textPrimary;
                  e.currentTarget.style.boxShadow = '0 0 0 2px rgba(255,255,255,0.1)';
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = digit ? tc.textPrimary : error ? '#E5484D' : tc.borderPrimary;
                  e.currentTarget.style.boxShadow = 'none';
                }}
                aria-label={`Digit ${i + 1}`}
              />
            ))}
          </div>

          {error && (
            <p style={{ textAlign: 'center', color: '#E5484D', fontSize: '13px' }}>{error}</p>
          )}

          {/* Alternative Methods */}
          <div className="flex flex-col gap-2 items-center">
            <button
              type="button"
              className="transition-colors hover:underline"
              style={{ background: 'none', border: 'none', color: tc.textSecondary, fontSize: '13px', cursor: 'pointer' }}
            >
              Didn't receive code? Send via SMS
            </button>
            <button
              type="button"
              className="transition-colors hover:underline"
              style={{ background: 'none', border: 'none', color: tc.textSecondary, fontSize: '13px', cursor: 'pointer' }}
            >
              Use backup code
            </button>
          </div>

          {/* Trust Device */}
          <div className="flex items-center justify-center gap-2">
            <input
              type="checkbox"
              id="trust"
              checked={trustDevice}
              onChange={e => setTrustDevice(e.target.checked)}
              style={{ accentColor: tc.textPrimary, width: '16px', height: '16px', cursor: 'pointer' }}
            />
            <label htmlFor="trust" style={{ fontSize: '13px', color: tc.textSecondary, cursor: 'pointer' }}>
              Trust this device for 30 days
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading || digits.some(d => !d)}
            className="w-full h-12 rounded-lg font-bold text-[13px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
            style={{
              backgroundColor: theme === 'dark' ? '#EDEDED' : '#111318',
              color: theme === 'dark' ? '#0B0C0E' : '#FFFFFF',
              border: 'none',
              cursor: (isLoading || digits.some(d => !d)) ? 'not-allowed' : 'pointer',
              opacity: digits.some(d => !d) ? 0.6 : 1
            }}
          >
            {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" />Verifying...</> : 'Verify & Continue'}
          </button>
        </form>

        <button
          onClick={() => navigate('/login')}
          className="flex items-center justify-center gap-2 mt-6 transition-colors hover:underline"
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
          Back to Sign In
        </button>
      </div>
    </div>
  );
}
