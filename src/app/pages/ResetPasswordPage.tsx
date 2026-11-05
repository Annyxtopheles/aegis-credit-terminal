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
    if (passed <= 1) return { level: 'weak', label: 'Weak', color: '#F43F5E', width: '25%' };
    if (passed <= 2) return { level: 'medium', label: 'Medium', color: '#F59E0B', width: '50%' };
    if (passed <= 3) return { level: 'medium', label: 'Good', color: '#F59E0B', width: '75%' };
    return { level: 'strong', label: 'Strong', color: '#10B981', width: '100%' };
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#16171A]">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[#1F2024] border border-[#2A2C32] shadow-2xl space-y-6">
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </button>

        <div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
            <Radar className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-zinc-100 tracking-tight">
            Create New Security Key
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Establish new cryptographic credentials for mission control
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">New Security Key</label>
            <div className="relative">
              <input
                type={showP ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Min 12 characters"
                className="w-full h-10 pl-3.5 pr-10 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowP(!showP)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
              >
                {showP ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {password && (
              <div className="mt-2 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-400">Entropy Strength</span>
                  <span style={{ color: strength.color }} className="font-semibold">{strength.label}</span>
                </div>
                <div className="h-1 rounded-full bg-[#16171A] overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: strength.width, backgroundColor: strength.color }} />
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Confirm Key</label>
            <div className="relative">
              <input
                type={showC ? 'text' : 'password'}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="Re-enter security key"
                className="w-full h-10 pl-3.5 pr-10 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowC(!showC)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
              >
                {showC ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {confirmError && <p className="text-xs text-rose-400 mt-1">{confirmError}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2 mt-4"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Set New Security Key'}
          </button>
        </form>
      </div>
    </div>
  );
}
