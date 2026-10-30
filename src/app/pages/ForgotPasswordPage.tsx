import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Radar, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export default function ForgotPasswordPage() {
  const { theme } = useTheme();
  const tc = colors[theme];
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

        {!success ? (
          <>
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
                Reset Security Key
              </h1>
              <p style={{ fontSize: '14px', color: tc.textSecondary }}>
                Enter your Flight Dynamics operator email to receive a cryptographic key reset link
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                  Operator Email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={e => { setEmail(e.target.value); if (emailError) setEmailError(''); }}
                  onBlur={validate}
                  placeholder="analyst@firm.com"
                  className="w-full h-11 px-3.5 text-[13px] rounded-lg outline-none transition-colors font-mono"
                  style={{
                    backgroundColor: tc.bgTertiary,
                    border: `1px solid ${emailError ? tc.alertRed : tc.borderPrimary}`,
                    color: tc.textPrimary
                  }}
                  disabled={isLoading}
                  aria-describedby={emailError ? 'email-err' : undefined}
                />
                {emailError && <p id="email-err" style={{ color: tc.alertRed, fontSize: '11px', marginTop: '4px' }}>{emailError}</p>}
              </div>

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
                {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" />Transmitting Reset Token...</> : 'Send Key Recovery Token'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${tc.alertGreen}20`, border: `1px solid ${tc.alertGreen}50` }}
              >
                <CheckCircle2 className="w-8 h-8" style={{ color: tc.alertGreen }} />
              </div>
            </div>
            <h2 className="font-mono" style={{ fontSize: '22px', fontWeight: 700, color: tc.textPrimary, marginBottom: '8px' }}>
              Recovery Token Dispatched
            </h2>
            <p style={{ fontSize: '14px', color: tc.textSecondary, marginBottom: '6px' }}>
              Cryptographic key recovery instructions transmitted to:
            </p>
            <p className="font-mono" style={{ fontSize: '14px', fontWeight: 600, color: tc.accentPrimary, marginBottom: '24px' }}>
              {email}
            </p>
            <p style={{ fontSize: '13px', color: tc.textTertiary }}>
              Didn't receive it? Check secure relay or{' '}
              <span style={{ color: tc.textPrimary, cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setSuccess(false)}>
                try another callsign
              </span>
            </p>
          </div>
        )}

        <button
          onClick={() => navigate('/login')}
          className="flex items-center justify-center gap-2 mt-7 transition-colors hover:underline font-mono"
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
