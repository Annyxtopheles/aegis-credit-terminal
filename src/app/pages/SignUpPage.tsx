import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff, Loader2, Check, X, Radar } from 'lucide-react';
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

  const getStrength = (p: string) => {
    const n = passwordRules.filter(r => r.test(p)).length;
    if (n <= 1) return { label: 'Weak', color: tc.alertRed, w: '25%' };
    if (n <= 2) return { label: 'Medium', color: tc.alertAmber, w: '50%' };
    if (n <= 3) return { label: 'Good', color: tc.alertAmber, w: '75%' };
    return { label: 'Strong', color: tc.alertGreen, w: '100%' };
  };

  const [form, setForm] = useState({ name: '', email: 'operator@vanguard.space', password: '', confirm: '', jobTitle: '', phone: '' });
  const [showP, setShowP] = useState(false);
  const [showC, setShowC] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const strength = getStrength(form.password);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Operator full name is required';
    if (!form.password) errs.password = 'Security key is required';
    else if (!passwordRules.every(r => r.test(form.password))) errs.password = 'Security key does not meet requirements';
    if (form.password !== form.confirm) errs.confirm = 'Security keys do not match';
    if (!agreed) errs.agreed = 'You must agree to the Orbital Telemetry Security Protocol';
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

  const inputStyle = (err?: string) => ({
    backgroundColor: tc.bgTertiary,
    border: `1px solid ${err ? tc.alertRed : tc.borderPrimary}`,
    color: tc.textPrimary,
    borderRadius: '8px',
    height: '44px',
    padding: '0 14px',
    fontSize: '13px',
    outline: 'none',
    width: '100%',
  });

  const Field = ({ label, id, type = 'text', value, onChange, error, disabled, placeholder, children }: any) => (
    <div>
      <label
        htmlFor={id}
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
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          style={{ ...inputStyle(error), paddingRight: children ? '44px' : '14px' }}
        />
        {children}
      </div>
      {error && <p style={{ color: '#EF4444', fontSize: '11px', marginTop: '4px' }}>{error}</p>}
    </div>
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-8"
      style={{ backgroundColor: tc.bgPrimary }}
    >
      <div
        className="w-full max-w-[480px] p-6 sm:p-8 rounded-xl shadow-2xl transition-all mx-auto max-h-[90vh] overflow-y-auto"
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

        <div
          className="mb-6 p-3 rounded-lg text-center"
          style={{ backgroundColor: tc.bgTertiary, border: `1px solid ${tc.borderSubtle}` }}
        >
          <p className="font-mono" style={{ fontSize: '12px', color: tc.textSecondary }}>
            Constellation Clearance: <strong style={{ color: tc.accentPrimary }}>Vanguard LEO Shell-1 (550 km)</strong> Flight Dynamics Pool
          </p>
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
            Operator Console Clearance
          </h1>
          <p style={{ fontSize: '14px', color: tc.textSecondary }}>
            Register your Flight Dynamics operator credentials
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field
            label="Operator Full Name"
            id="name"
            value={form.name}
            onChange={(e: any) => setForm(f => ({ ...f, name: e.target.value }))}
            error={errors.name}
            placeholder="Sarah Chen"
          />

          <Field
            label="Assigned Callsign / Email"
            id="email"
            value={form.email}
            onChange={() => {}}
            disabled={true}
            placeholder="operator@vanguard.space"
          />

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
              Create Security Key
            </label>
            <div className="relative">
              <input
                type={showP ? 'text' : 'password'}
                value={form.password}
                onChange={e => { setForm(f => ({ ...f, password: e.target.value })); if (errors.password) setErrors(ev => ({ ...ev, password: '' })); }}
                style={{ ...inputStyle(errors.password), paddingRight: '44px' }}
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
            {form.password && (
              <div className="mt-2">
                <div className="flex justify-between mb-1">
                  <span style={{ fontSize: '11px', color: tc.textSecondary }}>Entropy</span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: strength.color }}>{strength.label}</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ backgroundColor: tc.borderSubtle }}>
                  <div className="h-full rounded-full transition-all" style={{ width: strength.w, backgroundColor: strength.color }} />
                </div>
                <div className="mt-2 grid grid-cols-2 gap-1">
                  {passwordRules.map(r => {
                    const met = r.test(form.password);
                    return (
                      <div key={r.id} className="flex items-center gap-1.5">
                        {met ? <Check className="w-3 h-3" style={{ color: tc.alertGreen }} /> : <X className="w-3 h-3" style={{ color: tc.textTertiary }} />}
                        <span style={{ fontSize: '11px', color: met ? tc.alertGreen : tc.textTertiary }}>{r.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {errors.password && <p style={{ color: tc.alertRed, fontSize: '11px', marginTop: '4px' }}>{errors.password}</p>}
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
                value={form.confirm}
                onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                style={{ ...inputStyle(errors.confirm), paddingRight: '44px' }}
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
            {errors.confirm && <p style={{ color: tc.alertRed, fontSize: '11px', marginTop: '4px' }}>{errors.confirm}</p>}
          </div>

          <Field
            label="Flight Dynamics Role (Optional)"
            id="jobTitle"
            value={form.jobTitle}
            onChange={(e: any) => setForm(f => ({ ...f, jobTitle: e.target.value }))}
            placeholder="e.g. Orbital Conjunction Analyst"
          />

          <Field
            label="Secure Duty Comms (Optional, for 2FA)"
            id="phone"
            value={form.phone}
            onChange={(e: any) => setForm(f => ({ ...f, phone: e.target.value }))}
            placeholder="+1 (555) 019-2834"
          />

          <div>
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                style={{ accentColor: tc.accentPrimary, marginTop: '2px', width: '15px', height: '15px', cursor: 'pointer' }}
              />
              <label htmlFor="terms" style={{ fontSize: '13px', color: tc.textSecondary, cursor: 'pointer', lineHeight: 1.4 }}>
                I acknowledge CCSDS Conjunction Data Message (CDM) handling protocols and orbital security directives
              </label>
            </div>
            {errors.agreed && <p style={{ color: tc.alertRed, fontSize: '11px', marginTop: '4px' }}>{errors.agreed}</p>}
          </div>

          {errors.global && <p style={{ color: tc.alertRed, fontSize: '12px' }}>{errors.global}</p>}

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
            {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" />Provisioning Console...</> : 'Activate Flight Dynamics Console'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: tc.textSecondary }}>
          Already hold active clearance?{' '}
          <span
            style={{ color: tc.accentPrimary, cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}
            onClick={() => navigate('/login')}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
