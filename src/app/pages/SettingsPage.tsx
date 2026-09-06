import { useState } from 'react';
import { User, Shield, Eye, EyeOff, Check, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Shield },
];

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const tc = colors[theme];
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);

  const [profile, setProfile] = useState({
    name: user?.name || '', jobTitle: user?.jobTitle || '', phone: '',
    company: user?.firm || ''
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputStyle = {
    width: '100%', height: '44px', padding: '0 12px',
    backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
    border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
    color: tc.textPrimary, fontSize: '14px', outline: 'none'
  };

  const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 500, color: tc.textPrimary, marginBottom: '5px' };

  return (
    <div className="px-3 md:px-6 py-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 style={{ fontSize: '20px', fontWeight: 700, color: tc.textPrimary }}>Account Settings</h1>
        <p style={{ fontSize: '13px', color: tc.textSecondary }}>Manage your profile, security, and preferences</p>
      </div>

      <div className="flex gap-6 flex-col md:flex-row">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-48 flex-shrink-0">
          <div className="rounded-lg overflow-hidden" style={{ backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}` }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b"
                style={{
                  borderColor: tc.borderPrimary,
                  backgroundColor: activeTab === tab.id ? (theme === 'dark' ? 'rgba(6,182,212,0.12)' : '#EFF6FF') : 'transparent',
                  color: activeTab === tab.id ? tc.accentPrimary : tc.textSecondary,
                  borderLeft: activeTab === tab.id ? `2px solid ${tc.accentPrimary}` : '2px solid transparent'
                }}
                onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.backgroundColor = theme === 'dark' ? '#0F1A2A' : '#F9FAFB'; }}
                onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <tab.icon className="w-4 h-4" />
                <span style={{ fontSize: '13px', fontWeight: activeTab === tab.id ? 600 : 400 }}>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 rounded-lg" style={{ backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}` }}>

          {/* ---- PROFILE ---- */}
          {activeTab === 'profile' && (
            <div className="p-6">
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: tc.textPrimary, marginBottom: '20px' }}>Profile Information</h2>

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b" style={{ borderColor: tc.borderPrimary }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold"
                  style={{ backgroundColor: '#0891B2', color: '#FFFFFF' }}>
                  {user?.initials}
                </div>
                <div>
                  <button className="px-3 py-1.5 rounded text-sm transition-colors"
                    style={{ backgroundColor: '#0891B220', color: '#0891B2', border: '1px solid #0891B240', cursor: 'pointer' }}>
                    Upload Photo
                  </button>
                  <p style={{ fontSize: '12px', color: tc.textSecondary, marginTop: '4px' }}>JPG, GIF or PNG. Max 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Full Name', key: 'name' },
                  { label: 'Job Title', key: 'jobTitle' },
                  { label: 'Phone Number', key: 'phone' },
                  { label: 'Company / Organization', key: 'company' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={labelStyle}>{f.label}</label>
                    <input
                      type="text"
                      value={(profile as any)[f.key]}
                      onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))}
                      style={inputStyle}
                      onFocus={e => { e.currentTarget.style.borderColor = '#0891B2'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(8,145,178,0.15)'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = tc.borderPrimary; e.currentTarget.style.boxShadow = 'none'; }}
                    />
                  </div>
                ))}
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input type="email" value={user?.email || ''} disabled style={{ ...inputStyle, opacity: 0.6, cursor: 'not-allowed' }} />
                  <p style={{ fontSize: '11px', color: tc.textSecondary, marginTop: '3px' }}>Contact support to change email</p>
                </div>
                <div>
                  <label style={labelStyle}>Role</label>
                  <input type="text" value={user?.role?.replace('_', ' ') || ''} disabled style={{ ...inputStyle, opacity: 0.6, cursor: 'not-allowed', textTransform: 'capitalize' }} />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg transition-colors"
                  style={{ backgroundColor: '#0891B2', color: '#FFFFFF', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                  onMouseEnter={e => { if (!isSaving) e.currentTarget.style.backgroundColor = '#0E7490'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#0891B2'; }}
                >
                  {isSaving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</>
                    : saved ? <><Check className="w-4 h-4" />Saved!</> : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {/* ---- SECURITY ---- */}
          {activeTab === 'security' && (
            <div className="p-6 space-y-6">
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: tc.textPrimary }}>Security Settings</h2>

              {/* Change Password */}
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: tc.textPrimary, marginBottom: '12px' }}>Change Password</h3>
                <div className="space-y-3 max-w-sm">
                  {[
                    { label: 'Current Password', show: showCurrentPw, setShow: setShowCurrentPw },
                    { label: 'New Password', show: showNewPw, setShow: setShowNewPw },
                  ].map(f => (
                    <div key={f.label}>
                      <label style={labelStyle}>{f.label}</label>
                      <div className="relative">
                        <input type={f.show ? 'text' : 'password'} style={{ ...inputStyle, paddingRight: '40px' }}
                          onFocus={e => { e.currentTarget.style.borderColor = '#0891B2'; }}
                          onBlur={e => { e.currentTarget.style.borderColor = tc.borderPrimary; }} />
                        <button type="button" onClick={() => f.setShow(!f.show)} className="absolute right-3 top-1/2 -translate-y-1/2"
                          style={{ background: 'none', border: 'none', color: tc.textSecondary, cursor: 'pointer' }}>
                          {f.show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  ))}
                  <button className="px-4 py-2 rounded-lg transition-colors text-sm"
                    style={{ backgroundColor: '#0891B2', color: '#FFFFFF', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0E7490'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0891B2'}>
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
