import { useState } from 'react';
import { User, Shield, Eye, EyeOff, Check, Loader2, KeyRound, Bell } from 'lucide-react';
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
    name: user?.name || '',
    jobTitle: user?.jobTitle || '',
    phone: '',
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

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-xl font-bold tracking-tight" style={{ color: tc.textPrimary }}>
          Console Preferences & Operator Profile
        </h1>
        <p className="text-xs mt-1" style={{ color: tc.textSecondary }}>
          Configure your Flight Dynamics callsign, orbital shell assignment, and cryptographic credentials
        </p>
      </div>

      <div className="flex gap-6 flex-col md:flex-row items-start">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-60 shrink-0">
          <div
            className="p-2 rounded-2xl space-y-1"
            style={{
              backgroundColor: tc.bgSecondary,
              border: `1px solid ${tc.borderPrimary}`
            }}
          >
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all"
                  style={{
                    backgroundColor: isActive ? tc.bgTertiary : 'transparent',
                    color: isActive ? tc.accentPrimary : tc.textSecondary,
                    fontWeight: isActive ? 600 : 500
                  }}
                >
                  <Icon className="w-4 h-4 shrink-0" style={{ color: isActive ? tc.accentPrimary : tc.textTertiary }} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Box */}
        <div
          className="flex-1 w-full rounded-2xl p-6"
          style={{
            backgroundColor: tc.bgSecondary,
            border: `1px solid ${tc.borderPrimary}`
          }}
        >
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-semibold" style={{ color: tc.textPrimary }}>
                  Flight Dynamics Operator Record
                </h2>
                <p className="text-xs mt-0.5" style={{ color: tc.textSecondary }}>
                  CCSDS verified flight operator telemetry credentials
                </p>
              </div>

              {/* Avatar Bar */}
              <div
                className="flex items-center gap-4 pb-6 border-b"
                style={{ borderColor: tc.borderPrimary }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-bold"
                  style={{
                    backgroundColor: `${tc.accentPrimary}15`,
                    border: `1px solid ${tc.accentPrimary}35`,
                    color: tc.accentPrimary
                  }}
                >
                  {user?.initials || 'AT'}
                </div>
                <div>
                  <button
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    style={{
                      backgroundColor: tc.bgTertiary,
                      border: `1px solid ${tc.borderPrimary}`,
                      color: tc.textPrimary
                    }}
                  >
                    Update Operator Badge
                  </button>
                  <p className="text-[11px] mt-1" style={{ color: tc.textTertiary }}>
                    Operator ID: KESSLER-FDO-8821
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: tc.textSecondary }}>
                    Operator Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                    className="w-full h-10 px-3.5 rounded-xl text-xs focus:outline-none transition-colors"
                    style={{
                      backgroundColor: tc.bgTertiary,
                      border: `1px solid ${tc.borderPrimary}`,
                      color: tc.textPrimary
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: tc.textSecondary }}>
                    Flight Dynamics Role
                  </label>
                  <input
                    type="text"
                    value={profile.jobTitle}
                    onChange={e => setProfile(p => ({ ...p, jobTitle: e.target.value }))}
                    className="w-full h-10 px-3.5 rounded-xl text-xs focus:outline-none transition-colors"
                    style={{
                      backgroundColor: tc.bgTertiary,
                      border: `1px solid ${tc.borderPrimary}`,
                      color: tc.textPrimary
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: tc.textSecondary }}>
                    Secure Duty Comms
                  </label>
                  <input
                    type="text"
                    placeholder="+1 (555) 019-2834"
                    value={profile.phone}
                    onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                    className="w-full h-10 px-3.5 rounded-xl text-xs focus:outline-none transition-colors"
                    style={{
                      backgroundColor: tc.bgTertiary,
                      border: `1px solid ${tc.borderPrimary}`,
                      color: tc.textPrimary
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: tc.textSecondary }}>
                    Constellation Authority
                  </label>
                  <input
                    type="text"
                    value={profile.company}
                    onChange={e => setProfile(p => ({ ...p, company: e.target.value }))}
                    className="w-full h-10 px-3.5 rounded-xl text-xs focus:outline-none transition-colors"
                    style={{
                      backgroundColor: tc.bgTertiary,
                      border: `1px solid ${tc.borderPrimary}`,
                      color: tc.textPrimary
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: tc.textSecondary }}>
                    Operator Callsign
                  </label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full h-10 px-3.5 rounded-xl text-xs cursor-not-allowed opacity-60"
                    style={{
                      backgroundColor: tc.bgTertiary,
                      border: `1px solid ${tc.borderPrimary}`,
                      color: tc.textSecondary
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: tc.textSecondary }}>
                    Clearance Tier
                  </label>
                  <input
                    type="text"
                    value={user?.role === 'super_admin' ? 'Kessler Flight Director' : user?.role === 'company_admin' ? 'Constellation Lead' : 'Orbital Analyst'}
                    disabled
                    className="w-full h-10 px-3.5 rounded-xl text-xs cursor-not-allowed opacity-60"
                    style={{
                      backgroundColor: tc.bgTertiary,
                      border: `1px solid ${tc.borderPrimary}`,
                      color: tc.textSecondary
                    }}
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-tight transition-colors cursor-pointer"
                  style={{
                    backgroundColor: theme === 'dark' ? '#FFFFFF' : '#18181B',
                    color: theme === 'dark' ? '#18181B' : '#FFFFFF'
                  }}
                >
                  {isSaving ? <><Loader2 className="w-4 h-4 animate-spin" /> Syncing Telemetry...</>
                    : saved ? <><Check className="w-4 h-4 text-emerald-500" /> Changes Saved</>
                    : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-semibold" style={{ color: tc.textPrimary }}>
                  Cryptographic Key Rotation
                </h2>
                <p className="text-xs mt-0.5" style={{ color: tc.textSecondary }}>
                  Rotate uplink authentication keys and mission console password
                </p>
              </div>

              <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: tc.textSecondary }}>
                    Current Security Key
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPw ? 'text' : 'password'}
                      value={currentPw}
                      onChange={e => setCurrentPw(e.target.value)}
                      placeholder="Enter current key"
                      className="w-full h-10 pl-3.5 pr-10 rounded-xl text-xs focus:outline-none transition-colors"
                      style={{
                        backgroundColor: tc.bgTertiary,
                        border: `1px solid ${tc.borderPrimary}`,
                        color: tc.textPrimary
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPw(!showCurrentPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: tc.textTertiary }}
                    >
                      {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: tc.textSecondary }}>
                    New Security Key
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPw ? 'text' : 'password'}
                      value={newPw}
                      onChange={e => setNewPw(e.target.value)}
                      placeholder="At least 8 characters"
                      className="w-full h-10 pl-3.5 pr-10 rounded-xl text-xs focus:outline-none transition-colors"
                      style={{
                        backgroundColor: tc.bgTertiary,
                        border: `1px solid ${tc.borderPrimary}`,
                        color: tc.textPrimary
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPw(!showNewPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: tc.textTertiary }}
                    >
                      {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {pwError && (
                  <p className="text-xs text-rose-500">{pwError}</p>
                )}

                {pwSuccess && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-500">
                    <Check className="w-4 h-4" /> Security key rotated successfully!
                  </div>
                )}

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold tracking-tight transition-colors cursor-pointer"
                  style={{
                    backgroundColor: theme === 'dark' ? '#FFFFFF' : '#18181B',
                    color: theme === 'dark' ? '#18181B' : '#FFFFFF'
                  }}
                >
                  Rotate Security Key
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
