import { useState } from 'react';
import { User, Shield, Eye, EyeOff, Check, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

const TABS = [
  { id: 'profile', label: 'Operator Profile', icon: User },
  { id: 'security', label: 'Cryptographic Keys', icon: Shield },
];

export default function SettingsPage() {
  const { user, setUser } = useAuth();
  const { theme } = useTheme();
  const tc = colors[theme];
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState(false);

  const [profile, setProfile] = useState({
    name: user?.name || '', jobTitle: user?.jobTitle || '', phone: '',
    company: user?.firm || ''
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 600));
    setIsSaving(false);

    if (user) {
      const nameParts = profile.name.trim().split(' ');
      const initials = nameParts.length >= 2
        ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
        : profile.name.slice(0, 2).toUpperCase() || user.initials;

      setUser({
        ...user,
        name: profile.name.trim() || user.name,
        jobTitle: profile.jobTitle.trim() || user.jobTitle,
        firm: profile.company.trim() || user.firm,
        initials
      });
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setPwError('');
    if (!currentPw) {
      setPwError('Current security key is required');
      return;
    }
    if (newPw.length < 8) {
      setPwError('New security key must be at least 8 characters');
      return;
    }
    setPwSuccess(true);
    setCurrentPw('');
    setNewPw('');
    setTimeout(() => setPwSuccess(false), 3000);
  };

  const inputStyle = {
    width: '100%', height: '44px', padding: '0 12px',
    backgroundColor: theme === 'dark' ? tc.bgPrimary : '#FFFFFF',
    border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
    color: tc.textPrimary, fontSize: '14px', outline: 'none'
  };

  const labelStyle = { display: 'block', fontSize: '12px', fontWeight: 600, color: tc.textPrimary, marginBottom: '5px', fontFamily: 'JetBrains Mono, monospace' };

  return (
    <div className="px-3 md:px-6 py-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="font-mono" style={{ fontSize: '20px', fontWeight: 700, color: tc.textPrimary }}>Console Preferences & Operator Profile</h1>
        <p style={{ fontSize: '13px', color: tc.textSecondary }}>Configure your Flight Dynamics callsign, orbital shell assignment, and cryptographic credentials</p>
      </div>

      <div className="flex gap-6 flex-col md:flex-row">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-52 flex-shrink-0">
          <div className="rounded-lg overflow-hidden" style={{ backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}` }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b font-mono"
                style={{
                  borderColor: tc.borderPrimary,
                  backgroundColor: activeTab === tab.id ? `${tc.accentPrimary}20` : 'transparent',
                  color: activeTab === tab.id ? tc.accentPrimary : tc.textSecondary,
                  borderLeft: activeTab === tab.id ? `2px solid ${tc.accentPrimary}` : '2px solid transparent'
                }}
              >
                <tab.icon className="w-4 h-4" />
                <span style={{ fontSize: '12px', fontWeight: activeTab === tab.id ? 600 : 400 }}>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 rounded-lg" style={{ backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}` }}>
          {activeTab === 'profile' && (
            <div className="p-6">
              <h2 className="font-mono" style={{ fontSize: '16px', fontWeight: 700, color: tc.textPrimary, marginBottom: '20px' }}>Flight Dynamics Operator Record</h2>

              <div className="flex items-center gap-4 mb-6 pb-6 border-b" style={{ borderColor: tc.borderPrimary }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold font-mono"
                  style={{ backgroundColor: tc.accentPrimary, color: tc.bgPrimary }}>
                  {user?.initials}
                </div>
                <div>
                  <button className="px-3 py-1.5 rounded text-xs font-mono font-semibold transition-colors"
                    style={{ backgroundColor: `${tc.accentPrimary}20`, color: tc.accentPrimary, border: `1px solid ${tc.accentPrimary}50`, cursor: 'pointer' }}>
                    Update Operator Badge
                  </button>
                  <p style={{ fontSize: '12px', color: tc.textSecondary, marginTop: '4px' }}>CCSDS Operator ID Verified</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'OPERATOR FULL NAME', key: 'name' },
                  { label: 'FLIGHT DYNAMICS ROLE', key: 'jobTitle' },
                  { label: 'SECURE DUTY COMMS', key: 'phone' },
                  { label: 'CONSTELLATION AUTHORITY', key: 'company' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={labelStyle}>{f.label}</label>
                    <input
                      type="text"
                      value={(profile as any)[f.key]}
                      onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>
                ))}
                <div>
                  <label style={labelStyle}>CALLSIGN / EMAIL</label>
                  <input type="email" value={user?.email || ''} disabled style={{ ...inputStyle, opacity: 0.6, cursor: 'not-allowed' }} />
                </div>
                <div>
                  <label style={labelStyle}>CLEARANCE TIER</label>
                  <input
                    type="text"
                    value={user?.role === 'super_admin' ? 'Kessler Flight Director' : user?.role === 'company_admin' ? 'Constellation Lead' : 'Orbital Analyst'}
                    disabled
                    style={{ ...inputStyle, opacity: 0.6, cursor: 'not-allowed' }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg transition-colors font-mono text-xs font-bold"
                  style={{ backgroundColor: tc.accentPrimary, color: tc.bgPrimary, border: 'none', cursor: 'pointer' }}
                >
                  {isSaving ? <><Loader2 className="w-4 h-4 animate-spin" />Syncing...</>
                    : saved ? <><Check className="w-4 h-4" />Telemetry Profile Synced</> : 'Commit Profile Changes'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="p-6 space-y-6">
              <h2 className="font-mono" style={{ fontSize: '16px', fontWeight: 700, color: tc.textPrimary }}>Cryptographic Key Rotation</h2>

              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: tc.textPrimary, marginBottom: '12px' }}>Rotate Operator Security Key</h3>
                <form onSubmit={handlePasswordUpdate} className="space-y-3 max-w-sm">
                  <div>
                    <label style={labelStyle}>CURRENT SECURITY KEY</label>
                    <div className="relative">
                      <input
                        type={showCurrentPw ? 'text' : 'password'}
                        value={currentPw}
                        onChange={e => setCurrentPw(e.target.value)}
                        placeholder="Enter current key"
                        style={{ ...inputStyle, paddingRight: '40px' }}
                      />
                      <button type="button" onClick={() => setShowCurrentPw(!showCurrentPw)} className="absolute right-3 top-1/2 -translate-y-1/2"
                        style={{ background: 'none', border: 'none', color: tc.textSecondary, cursor: 'pointer' }}>
                        {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>NEW SECURITY KEY</label>
                    <div className="relative">
                      <input
                        type={showNewPw ? 'text' : 'password'}
                        value={newPw}
                        onChange={e => setNewPw(e.target.value)}
                        placeholder="At least 8 characters"
                        style={{ ...inputStyle, paddingRight: '40px' }}
                      />
                      <button type="button" onClick={() => setShowNewPw(!showNewPw)} className="absolute right-3 top-1/2 -translate-y-1/2"
                        style={{ background: 'none', border: 'none', color: tc.textSecondary, cursor: 'pointer' }}>
                        {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {pwError && (
                    <div style={{ fontSize: '12px', color: tc.alertRed, marginTop: '4px' }}>
                      {pwError}
                    </div>
                  )}

                  {pwSuccess && (
                    <div className="flex items-center gap-1.5 font-mono" style={{ fontSize: '12px', color: tc.alertGreen, marginTop: '4px' }}>
                      <Check className="w-3.5 h-3.5" /> Security key rotated!
                    </div>
                  )}

                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-lg transition-colors text-xs font-mono font-bold cursor-pointer"
                    style={{ backgroundColor: tc.accentPrimary, color: tc.bgPrimary, border: 'none' }}
                  >
                    Rotate Security Key
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
