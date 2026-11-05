import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Radar, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const tc = colors[theme];
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validate = () => {
    if (!email) { setEmailError('Operator email is required'); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailError('Invalid email format'); return false; }
    setEmailError(''); return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsLoading(false);
    setSuccess(true);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 transition-colors duration-200"
      style={{ backgroundColor: tc.bgPrimary }}
    >
      <div
        className="w-full max-w-md p-8 rounded-2xl shadow-2xl space-y-6 transition-colors duration-200"
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

        <div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
            <Radar className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight" style={{ color: tc.textPrimary }}>
            Reset Cryptographic Key
          </h1>
          <p className="text-xs mt-1" style={{ color: tc.textSecondary }}>
            Enter your mission callsign to receive a secure recovery token
          </p>
        </div>

        {success ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <p className="text-xs font-semibold" style={{ color: tc.textPrimary }}>Recovery Token Dispatched</p>
            <p className="text-[11px]" style={{ color: tc.textSecondary }}>
              Check your secure uplink email for token verification instructions.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="mt-3 w-full h-9 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
              style={{
                backgroundColor: theme === 'dark' ? '#FFFFFF' : '#18181B',
                color: theme === 'dark' ? '#18181B' : '#FFFFFF'
              }}
            >
              Return to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: tc.textSecondary }}>
                Operator Callsign
              </label>
              <input
                type="email"
                placeholder="analyst@firm.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl text-xs focus:outline-none transition-colors"
                style={{
                  backgroundColor: tc.bgTertiary,
                  border: `1px solid ${tc.borderPrimary}`,
                  color: tc.textPrimary
                }}
              />
              {emailError && <p className="text-xs text-rose-500 mt-1">{emailError}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 rounded-xl font-semibold text-xs tracking-tight transition-colors flex items-center justify-center gap-2 cursor-pointer"
              style={{
                backgroundColor: theme === 'dark' ? '#FFFFFF' : '#18181B',
                color: theme === 'dark' ? '#18181B' : '#FFFFFF'
              }}
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Dispatch Recovery Token'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
