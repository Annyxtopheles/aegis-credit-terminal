import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff, Loader2, Check, X, Shield, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

const passwordRules = [
  { id: 'length', label: 'At least 12 characters', test: (p: string) => p.length >= 12 },
  { id: 'upper', label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { id: 'number', label: 'One number', test: (p: string) => /[0-9]/.test(p) },
  { id: 'special', label: 'One special character', test: (p: string) => /[!@#$%^&*]/.test(p) },
];

function getStrength(p: string) {
  const n = passwordRules.filter(r => r.test(p)).length;
  if (n <= 1) return { label: 'Weak', color: '#E5484D', w: '25%' };
  if (n <= 2) return { label: 'Medium', color: '#E5A93C', w: '50%' };
  if (n <= 3) return { label: 'Good', color: '#E5A93C', w: '75%' };
  return { label: 'Strong', color: '#30A46C', w: '100%' };
}

export default function SignUpPage() {
  const { signup, isLoading } = useAuth();
  const { theme } = useTheme();
  const tc = colors[theme];
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: 'invited@firm.com', password: '', confirm: '', jobTitle: '', phone: '' });
  const [showP, setShowP] = useState(false);
  const [showC, setShowC] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const strength = getStrength(form.password);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.password) errs.password = 'Password is required';
    else if (!passwordRules.every(r => r.test(form.password))) errs.password = 'Password does not meet requirements';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    if (!agreed) errs.agreed = 'You must agree to the Terms of Service';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const result = await signup({ name: form.name, email: form.email, password: form.password, jobTitle: form.jobTitle, phone: form.phone });
    if (result.success) navigate('/dashboard');
    else setErrors({ global: result.error || 'Signup failed' });
  };

  const inputStyle = (err?: string) => ({
    backgroundColor: tc.bgTertiary,
    border: `1px solid ${err ? '#E5484D' : tc.borderPrimary}`,
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
      {error && <p style={{ color: '#E5484D', fontSize: '11px', marginTop: '4px' }}>{error}</p>}
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

        {/* Invite notice */}
        <div
          className="mb-6 p-3 rounded-lg text-center"
          style={{ backgroundColor: tc.bgTertiary, border: `1px solid ${tc.borderSubtle}` }}
        >
          <p style={{ fontSize: '12px', color: tc.textSecondary }}>
            Workspace invitation: <strong style={{ color: tc.textPrimary }}>Apex Brands Group</strong> surveillance pool
          </p>
        </div>

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
            Create Your Account
          </h1>
          <p style={{ fontSize: '15px', color: tc.textSecondary }}>
            Complete your profile to access institutional models
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field
            label="Full Name"
            id="name"
            value={form.name}
            onChange={(e: any) => setForm(f => ({ ...f, name: e.target.value }))}
            error={errors.name}
            placeholder="Sarah Chen"
          />

          <Field
            label="Institutional Email"
            id="email"
            value={form.email}
            onChange={() => {}}
            disabled={true}
            placeholder="invited@firm.com"
          />

          {/* Password */}
          <div>
            <label
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
              Create Password
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
                  <span style={{ fontSize: '11px', color: tc.textSecondary }}>Strength</span>
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
                        {met ? <Check className="w-3 h-3" style={{ color: '#30A46C' }} /> : <X className="w-3 h-3" style={{ color: tc.textTertiary }} />}
                        <span style={{ fontSize: '11px', color: met ? '#30A46C' : tc.textTertiary }}>{r.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {errors.password && <p style={{ color: '#E5484D', fontSize: '11px', marginTop: '4px' }}>{errors.password}</p>}
          </div>

          {/* Confirm */}
          <div>
            <label
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
              Confirm Password
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
            {errors.confirm && <p style={{ color: '#E5484D', fontSize: '11px', marginTop: '4px' }}>{errors.confirm}</p>}
          </div>

          <Field
            label="Job Title (Optional)"
            id="jobTitle"
            value={form.jobTitle}
            onChange={(e: any) => setForm(f => ({ ...f, jobTitle: e.target.value }))}
            placeholder="e.g. Senior Credit Analyst"
          />

          <Field
            label="Phone Number (Optional, for 2FA)"
            id="phone"
            value={form.phone}
            onChange={(e: any) => setForm(f => ({ ...f, phone: e.target.value }))}
            placeholder="+1 (555) 000-0000"
          />

          {/* Terms */}
          <div>
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                style={{ accentColor: tc.textPrimary, marginTop: '2px', width: '15px', height: '15px', cursor: 'pointer' }}
              />
              <label htmlFor="terms" style={{ fontSize: '13px', color: tc.textSecondary, cursor: 'pointer', lineHeight: 1.4 }}>
                I agree to the Institutional Terms of Service and Privacy Policy
              </label>
            </div>
            {errors.agreed && <p style={{ color: '#E5484D', fontSize: '11px', marginTop: '4px' }}>{errors.agreed}</p>}
          </div>

          {errors.global && <p style={{ color: '#E5484D', fontSize: '12px' }}>{errors.global}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-lg font-bold text-[13px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
            style={{
              backgroundColor: theme === 'dark' ? '#EDEDED' : '#111318',
              color: theme === 'dark' ? '#0B0C0E' : '#FFFFFF',
              border: 'none',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" />Creating Account...</> : 'Complete Institutional Registration'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: tc.textSecondary }}>
          Already have an account?{' '}
          <span
            style={{ color: tc.textPrimary, cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}
            onClick={() => navigate('/login')}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
