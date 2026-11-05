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
        <h1 className="text-xl font-bold text-zinc-100 tracking-tight">Console Preferences & Operator Profile</h1>
        <p className="text-xs text-zinc-400 mt-1">Configure your Flight Dynamics callsign, orbital shell assignment, and cryptographic credentials</p>
      </div>

      <div className="flex gap-6 flex-col md:flex-row items-start">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-60 shrink-0">
          <div className="p-2 rounded-2xl bg-[#1F2024] border border-[#2A2C32] space-y-1">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#282A2F] text-indigo-400 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-zinc-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Box */}
        <div className="flex-1 w-full rounded-2xl bg-[#1F2024] border border-[#2A2C32] p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-semibold text-zinc-100">Flight Dynamics Operator Record</h2>
                <p className="text-xs text-zinc-400 mt-0.5">CCSDS verified flight operator telemetry credentials</p>
              </div>

              {/* Avatar Bar */}
              <div className="flex items-center gap-4 pb-6 border-b border-[#2A2C32]">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-lg font-bold text-indigo-400">
                  {user?.initials || 'AT'}
                </div>
                <div>
                  <button className="px-3.5 py-1.5 rounded-xl bg-[#282A2F] hover:bg-zinc-700 text-xs font-semibold text-zinc-200 border border-zinc-700/50 transition-colors">
                    Update Operator Badge
                  </button>
                  <p className="text-[11px] text-zinc-500 mt-1">Operator ID: KESSLER-FDO-8821</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Operator Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                    className="w-full h-10 px-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Flight Dynamics Role</label>
                  <input
                    type="text"
                    value={profile.jobTitle}
                    onChange={e => setProfile(p => ({ ...p, jobTitle: e.target.value }))}
                    className="w-full h-10 px-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Secure Duty Comms</label>
                  <input
                    type="text"
                    placeholder="+1 (555) 019-2834"
                    value={profile.phone}
                    onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                    className="w-full h-10 px-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Constellation Authority</label>
                  <input
                    type="text"
                    value={profile.company}
                    onChange={e => setProfile(p => ({ ...p, company: e.target.value }))}
                    className="w-full h-10 px-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Callsign / Email</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full h-10 px-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-400 text-xs cursor-not-allowed opacity-60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Clearance Tier</label>
                  <input
                    type="text"
                    value={user?.role === 'super_admin' ? 'Kessler Flight Director' : user?.role === 'company_admin' ? 'Constellation Lead' : 'Orbital Analyst'}
                    disabled
                    className="w-full h-10 px-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-400 text-xs cursor-not-allowed opacity-60"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-semibold tracking-tight transition-colors"
                >
                  {isSaving ? <><Loader2 className="w-4 h-4 animate-spin" /> Syncing Telemetry...</>
                    : saved ? <><Check className="w-4 h-4 text-emerald-600" /> Changes Saved</>
                    : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-semibold text-zinc-100">Cryptographic Key Rotation</h2>
                <p className="text-xs text-zinc-400 mt-0.5">Rotate uplink authentication keys and mission console password</p>
              </div>

              <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Current Security Key</label>
                  <div className="relative">
                    <input
                      type={showCurrentPw ? 'text' : 'password'}
                      value={currentPw}
                      onChange={e => setCurrentPw(e.target.value)}
                      placeholder="Enter current key"
                      className="w-full h-10 pl-3.5 pr-10 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPw(!showCurrentPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                    >
                      {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">New Security Key</label>
                  <div className="relative">
                    <input
                      type={showNewPw ? 'text' : 'password'}
                      value={newPw}
                      onChange={e => setNewPw(e.target.value)}
                      placeholder="At least 8 characters"
                      className="w-full h-10 pl-3.5 pr-10 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPw(!showNewPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                    >
                      {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {pwError && (
                  <p className="text-xs text-rose-400">{pwError}</p>
                )}

                {pwSuccess && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <Check className="w-4 h-4" /> Security key rotated successfully!
                  </div>
                )}

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-semibold tracking-tight transition-colors"
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
