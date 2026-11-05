import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Radar, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
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
            Reset Cryptographic Key
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Enter your mission callsign to receive a secure recovery token
          </p>
        </div>

        {success ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="text-xs font-semibold text-zinc-100">Recovery Token Dispatched</p>
            <p className="text-[11px] text-zinc-400">
              Check your secure uplink email for token verification instructions.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="mt-3 w-full h-9 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-colors"
            >
              Return to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Operator Callsign / Email
              </label>
              <input
                type="email"
                placeholder="analyst@firm.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
              />
              {emailError && <p className="text-xs text-rose-400 mt-1">{emailError}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Dispatch Recovery Token'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
