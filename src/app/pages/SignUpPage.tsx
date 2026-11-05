import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff, Loader2, Check, Radar, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

const passwordRules = [
  { id: 'length', label: 'At least 12 characters', test: (p: string) => p.length >= 12 },
  { id: 'upper', label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { id: 'number', label: 'One number', test: (p: string) => /[0-9]/.test(p) },
  { id: 'special', label: 'One special character', test: (p: string) => /[!@#$%^&*]/.test(p) },
];

export default function SignUpPage() {
  const { signup, isLoading } = useAuth();
  const { theme } = useTheme();
  const tc = colors[theme];
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: 'operator@vanguard.space', password: '', confirm: '', jobTitle: '', phone: '' });
  const [showP, setShowP] = useState(false);
  const [showC, setShowC] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Operator full name is required';
    if (!form.password) errs.password = 'Security key is required';
    else if (!passwordRules.every(r => r.test(form.password))) errs.password = 'Security key does not meet requirements';
    if (form.password !== form.confirm) errs.confirm = 'Security keys do not match';
    if (!agreed) errs.agreed = 'You must accept the Orbital Telemetry Protocol';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const result = await signup({ name: form.name, email: form.email, password: form.password, jobTitle: form.jobTitle, phone: form.phone });
    if (result.success) navigate('/dashboard');
    else setErrors({ global: result.error || 'Registration failed' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-[#16171A]">
      <div className="w-full max-w-lg rounded-2xl bg-[#1F2024] border border-[#2A2C32] p-8 shadow-2xl space-y-6">
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </button>

        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
            <Radar className="w-3.5 h-3.5" />
            <span>Flight Deck Provisioning</span>
          </div>
          <h1 className="text-xl font-bold text-zinc-100 tracking-tight">
            Register Operator Account
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Request telemetry clearance and console assignment
          </p>
        </div>

        {errors.global && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400">
            {errors.global}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">Operator Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Lt. John Smith"
                className="w-full h-10 px-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500"
              />
              {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">Callsign / Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full h-10 px-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">Security Key</label>
              <div className="relative">
                <input
                  type={showP ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="Min 12 chars"
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
              {errors.password && <p className="text-xs text-rose-400 mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">Confirm Key</label>
              <div className="relative">
                <input
                  type={showC ? 'text' : 'password'}
                  value={form.confirm}
                  onChange={e => setForm({ ...form, confirm: e.target.value })}
                  placeholder="Confirm key"
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
              {errors.confirm && <p className="text-xs text-rose-400 mt-1">{errors.confirm}</p>}
            </div>
          </div>

          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-zinc-400">
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="mt-0.5 rounded bg-[#16171A] border-[#2A2C32] text-indigo-600 focus:ring-0"
              />
              <span>I acknowledge the Orbital Telemetry Protocol and certify compliance with FCC/ESA de-orbit directives.</span>
            </label>
            {errors.agreed && <p className="text-xs text-rose-400 mt-1">{errors.agreed}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2 mt-4"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Provision Operator Console'}
          </button>
        </form>
      </div>
    </div>
  );
}
