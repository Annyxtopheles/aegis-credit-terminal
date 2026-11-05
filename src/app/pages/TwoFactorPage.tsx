import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Loader2, ShieldCheck, KeyRound } from 'lucide-react';
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

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 transition-colors duration-200"
      style={{ backgroundColor: tc.bgPrimary }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8 shadow-2xl space-y-6 transition-colors duration-200"
        style={{
          backgroundColor: tc.bgSecondary,
          border: `1px solid ${tc.borderPrimary}`
        }}
      >
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-1.5 text-xs transition-colors cursor-pointer"
          style={{ color: tc.textSecondary }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight" style={{ color: tc.textPrimary }}>
            Two-Factor Authentication
          </h1>
          <p className="text-xs" style={{ color: tc.textSecondary }}>
            Enter the 6-digit authentication token dispatched to your security device
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-500 text-center font-medium">
            {error}
          </div>
        )}

        <div className="flex justify-center gap-2.5" onPaste={handlePaste}>
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={el => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleDigitChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              className="w-11 h-13 text-center text-lg font-bold rounded-xl focus:outline-none transition-colors"
              style={{
                backgroundColor: tc.bgTertiary,
                border: `1px solid ${tc.borderPrimary}`,
                color: tc.textPrimary
              }}
            />
          ))}
        </div>

        <div className="flex items-center justify-between text-xs pt-1" style={{ color: tc.textSecondary }}>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={trustDevice}
              onChange={e => setTrustDevice(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-0 cursor-pointer"
              style={{
                backgroundColor: tc.bgTertiary,
                borderColor: tc.borderPrimary
              }}
            />
            <span>Trust this console for 30 days</span>
          </label>
        </div>

        <button
          onClick={() => handleVerify(digits.join(''))}
          disabled={isLoading || digits.some(d => !d)}
          className="w-full h-10 rounded-xl font-semibold text-xs tracking-tight transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          style={{
            backgroundColor: theme === 'dark' ? '#FFFFFF' : '#18181B',
            color: theme === 'dark' ? '#18181B' : '#FFFFFF'
          }}
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify Token'}
        </button>
      </div>
    </div>
  );
}
