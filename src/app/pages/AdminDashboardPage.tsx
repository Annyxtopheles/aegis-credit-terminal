import { useState } from 'react';
import { Upload, Image, Edit2, Trash2, X, Copy, Check, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { useLocation } from 'react-router';

export default function AdminDashboardPage() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const tc = colors[theme];
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const tabParam = params.get('tab') || 'onboarding';
  const validTabs = ['onboarding', 'users', 'data-upload', 'commentary', 'images', 'priorities', 'sector-news', 'market-trends'];
  const activeTab = validTabs.includes(tabParam) ? tabParam : 'onboarding';

  return (
    <div className="p-3 md:p-6">
      {user?.role === 'super_admin' && (
        <div className="mb-6">
          <h1 className="font-mono" style={{ fontSize: '26px', fontWeight: 700, color: tc.textPrimary, marginBottom: '4px' }}>
            KESSLER FDO Command Console
          </h1>
          <p className="font-mono" style={{ fontSize: '13px', color: tc.textSecondary }}>
            Orbital Shell Provisioning, TLE/CDM Ephemeris Ingest & Crew Clearance Management
          </p>
        </div>
      )}

      <div className="transition-colors duration-300">
        {activeTab === 'onboarding' && <ShellProvisioningTab />}
        {activeTab === 'users' && <UserManagementTab />}
        {activeTab === 'commentary' && <CommentaryEditorTab />}
        {activeTab === 'data-upload' && <DataUploadTab />}
        {activeTab === 'images' && <ImageUploadsTab />}
        {activeTab === 'priorities' && <PrioritiesEventsTab />}
        {activeTab === 'sector-news' && <SectorNewsEditorTab />}
        {activeTab === 'market-trends' && <MarketTrendsEditorTab />}
      </div>
    </div>
  );
}

function ShellProvisioningTab() {
  const { theme } = useTheme();
  const tc = colors[theme];
  const [form, setForm] = useState({ name: '', description: '', email: '' });
  const [saved, setSaved] = useState(false);

  const handleCreate = () => {
    if (!form.name.trim()) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    setForm({ name: '', description: '', email: '' });
  };

  return (
    <div className="max-w-2xl">
      <div className="p-6 rounded-lg" style={{ backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}` }}>
        <h2 className="font-mono" style={{ fontSize: '18px', fontWeight: 600, color: tc.textPrimary, marginBottom: '16px' }}>
          Provision New Orbital Shell
        </h2>
        <div className="space-y-4">
          <div>
            <label className="font-mono" style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
              Constellation Shell Designator *
            </label>
            <input
              type="text"
              placeholder="e.g., Vanguard Polar Shell-3 (810 km // 86.4°)"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              style={{
                width: '100%', height: '44px', padding: '0 12px',
                backgroundColor: theme === 'dark' ? '#06080D' : '#FFFFFF',
                border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                color: tc.textPrimary, fontSize: '14px', outline: 'none'
              }}
            />
          </div>
          <div>
            <label className="font-mono" style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
              Orbital Regime & Ephemeris Parameters
            </label>
            <textarea
              placeholder="Target apogee/perigee km, inclination °, RAAN spacing, Hall-effect Xenon reserve SLA..."
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              rows={4}
              style={{
                width: '100%', padding: '12px',
                backgroundColor: theme === 'dark' ? '#06080D' : '#FFFFFF',
                border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                color: tc.textPrimary, fontSize: '14px', outline: 'none', resize: 'vertical'
              }}
            />
          </div>
          <div>
            <label className="font-mono" style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
              Lead Flight Director Callsign / Email *
            </label>
            <input
              type="email"
              placeholder="fdo-lead@vanguard.space"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              style={{
                width: '100%', height: '44px', padding: '0 12px',
                backgroundColor: theme === 'dark' ? '#06080D' : '#FFFFFF',
                border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                color: tc.textPrimary, fontSize: '14px', outline: 'none'
              }}
            />
          </div>
          <button
            onClick={handleCreate}
            className="px-6 py-2.5 rounded-lg transition-all font-mono"
            style={{
              backgroundColor: saved ? '#10B981' : '#06B6D4', color: '#06080D', border: 'none',
              fontSize: '13px', fontWeight: 700, cursor: 'pointer'
            }}
          >
            {saved ? 'Orbital Shell Provisioned ✓' : 'Initialize Orbital Shell'}
          </button>
        </div>
      </div>
    </div>
  );
}

function UserManagementTab() {
  const { theme } = useTheme();
  const tc = colors[theme];
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [inviteForm, setInviteForm] = useState({ name: '', email: '', role: 'normal_user' as 'company_admin' | 'normal_user', company: 'vgd-s1' });
  const [copied, setCopied] = useState(false);

  const [users, setUsers] = useState([
    { id: '1', name: 'Cmdr. James Miller', email: 'j.miller@vanguard.space', role: 'company_admin', company: 'Vanguard LEO Shell-1', status: 'active', lastActive: '14m ago' },
    { id: '2', name: 'Sarah Chen', email: 's.chen@vanguard.space', role: 'normal_user', company: 'Vanguard LEO Shell-1', status: 'active', lastActive: '38m ago' },
    { id: '3', name: 'Dr. Marcus Vance', email: 'm.vance@vanguard.space', role: 'company_admin', company: 'Vanguard SSO Shell-2', status: 'active', lastActive: '2h ago' },
    { id: '4', name: 'Elena Rostova', email: 'e.rostova@vanguard.space', role: 'normal_user', company: 'Vanguard LEO Shell-1', status: 'pending', lastActive: undefined },
    { id: '5', name: 'Capt. David Park', email: 'd.park@vanguard.space', role: 'normal_user', company: 'Vanguard VLEO Recon', status: 'active', lastActive: '1h ago' },
  ]);

  const getRoleLabel = (role: string) => {
    return role === 'company_admin' ? 'Constellation Lead' : 'Orbital Analyst';
  };

  const getRoleBadgeColor = (role: string) => {
    return role === 'company_admin' ? '#0891B2' : '#06B6D4';
  };

  const handleInvite = () => {
    if (!inviteForm.name.trim() || !inviteForm.email.trim()) return;
    const shellNames: Record<string, string> = {
      'vgd-s1': 'Vanguard LEO Shell-1',
      'vgd-s2': 'Vanguard SSO Shell-2',
      'vgd-vleo': 'Vanguard VLEO Recon'
    };
    const newUser = {
      id: Date.now().toString(),
      name: inviteForm.name.trim(),
      email: inviteForm.email.trim(),
      role: inviteForm.role,
      company: shellNames[inviteForm.company] || 'Vanguard LEO Shell-1',
      status: 'pending',
      lastActive: undefined
    };
    setUsers(prev => [...prev, newUser]);
    setShowInviteModal(false);
    setInviteForm({ name: '', email: '', role: 'normal_user', company: 'vgd-s1' });
    setCopied(false);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const handleUpdateUser = () => {
    if (!editingUser) return;
    setUsers(prev => prev.map(u => u.id === editingUser.id ? editingUser : u));
    setEditingUser(null);
  };

  const handleCopyInviteLink = () => {
    const inviteLink = `https://kessler-ssa.space/invite?token=${Math.random().toString(36).substring(2, 15)}`;
    const textarea = document.createElement('textarea');
    textarea.value = inviteLink;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    } finally {
      document.body.removeChild(textarea);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-mono" style={{ fontSize: '18px', fontWeight: 600, color: tc.textPrimary }}>
          Flight Dynamics Crew & Clearance Roster
        </h2>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-mono"
          style={{
            backgroundColor: '#06B6D4', color: '#06080D', border: 'none',
            fontSize: '13px', fontWeight: 700, cursor: 'pointer'
          }}
        >
          Authorize Crew Member
        </button>
      </div>

      <div className="rounded-lg overflow-hidden" style={{ backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}` }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${tc.borderPrimary}` }}>
              <th className="font-mono" style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: tc.textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Operator
              </th>
              <th className="font-mono" style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: tc.textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Assigned Shell
              </th>
              <th className="font-mono" style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: tc.textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Clearance Level
              </th>
              <th className="font-mono" style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: tc.textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Link Status
              </th>
              <th className="font-mono" style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: tc.textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Last Telemetry Sync
              </th>
              <th className="font-mono" style={{ padding: '12px 16px', textAlign: 'right', fontSize: '11px', fontWeight: 600, color: tc.textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="transition-colors"
                style={{
                  borderBottom: index < users.length - 1 ? `1px solid ${tc.borderPrimary}` : 'none'
                }}
              >
                <td style={{ padding: '16px' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: tc.textPrimary }}>{user.name}</div>
                    <div className="font-mono" style={{ fontSize: '12px', color: tc.textSecondary }}>{user.email}</div>
                  </div>
                </td>
                <td className="font-mono" style={{ padding: '16px', fontSize: '13px', color: tc.textPrimary }}>
                  {user.company}
                </td>
                <td style={{ padding: '16px' }}>
                  <span
                    className="inline-flex px-2.5 py-1 rounded-full font-mono"
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      backgroundColor: `${getRoleBadgeColor(user.role)}20`,
                      color: getRoleBadgeColor(user.role),
                      border: `1px solid ${getRoleBadgeColor(user.role)}40`
                    }}
                  >
                    {getRoleLabel(user.role)}
                  </span>
                </td>
                <td style={{ padding: '16px' }}>
                  <span
                    className="inline-flex px-2.5 py-1 rounded-full font-mono"
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      backgroundColor: user.status === 'active' ? '#10B98120' : '#F59E0B20',
                      color: user.status === 'active' ? '#10B981' : '#F59E0B',
                      border: `1px solid ${user.status === 'active' ? '#10B98140' : '#F59E0B40'}`
                    }}
                  >
                    {user.status === 'active' ? 'NOMINAL' : 'PENDING'}
                  </span>
                </td>
                <td className="font-mono" style={{ padding: '16px', fontSize: '12px', color: tc.textSecondary }}>
                  {user.lastActive || '—'}
                </td>
                <td style={{ padding: '16px' }}>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setEditingUser({ ...user })}
                      className="p-2 rounded transition-colors"
                      style={{ color: tc.textSecondary }}
                      title="Edit operator"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-2 rounded transition-colors"
                      style={{ color: tc.textSecondary }}
                      title="Revoke clearance"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}
          onClick={() => setShowInviteModal(false)}
        >
          <div
            className="rounded-lg shadow-xl max-w-md w-full mx-4"
            style={{
              backgroundColor: tc.bgSecondary,
              border: `1px solid ${tc.borderPrimary}`
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: tc.borderPrimary }}>
              <div>
                <h2 className="font-mono" style={{ fontSize: '18px', fontWeight: 600, color: tc.textPrimary }}>Authorize Flight Crew</h2>
                <p style={{ fontSize: '13px', color: tc.textSecondary }}>Issue console clearance for an orbital shell</p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: theme === 'dark' ? '#06080D' : '#F0F9FF',
                  border: `1px solid ${tc.accentPrimary}40`
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-mono" style={{ fontSize: '13px', fontWeight: 600, color: tc.textPrimary, marginBottom: '4px' }}>
                      Encrypted Clearance Token Link
                    </p>
                    <p style={{ fontSize: '12px', color: tc.textSecondary }}>
                      Transmit via secure FDO channel
                    </p>
                  </div>
                  <button
                    onClick={handleCopyInviteLink}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-mono"
                    style={{
                      backgroundColor: copied ? '#10B981' : tc.accentPrimary,
                      color: '#06080D',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy Link</>}
                  </button>
                </div>
              </div>

              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
                  Operator Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Lt. John Smith"
                  value={inviteForm.name}
                  onChange={e => setInviteForm({ ...inviteForm, name: e.target.value })}
                  style={{
                    width: '100%', height: '44px', padding: '0 12px',
                    backgroundColor: theme === 'dark' ? '#06080D' : '#FFFFFF',
                    border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                    color: tc.textPrimary, fontSize: '14px', outline: 'none'
                  }}
                />
              </div>

              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
                  Callsign / Email *
                </label>
                <input
                  type="email"
                  placeholder="j.smith@vanguard.space"
                  value={inviteForm.email}
                  onChange={e => setInviteForm({ ...inviteForm, email: e.target.value })}
                  style={{
                    width: '100%', height: '44px', padding: '0 12px',
                    backgroundColor: theme === 'dark' ? '#06080D' : '#FFFFFF',
                    border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                    color: tc.textPrimary, fontSize: '14px', outline: 'none'
                  }}
                />
              </div>

              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
                  Orbital Shell *
                </label>
                <select
                  value={inviteForm.company}
                  onChange={e => setInviteForm({ ...inviteForm, company: e.target.value })}
                  style={{
                    width: '100%', height: '44px', padding: '0 12px',
                    backgroundColor: theme === 'dark' ? '#06080D' : '#FFFFFF',
                    border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                    color: tc.textPrimary, fontSize: '14px', outline: 'none', cursor: 'pointer'
                  }}
                >
                  <option value="vgd-s1">Vanguard LEO Shell-1</option>
                  <option value="vgd-s2">Vanguard SSO Shell-2</option>
                  <option value="vgd-vleo">Vanguard VLEO Recon</option>
                </select>
              </div>

              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
                  Clearance Level *
                </label>
                <select
                  value={inviteForm.role}
                  onChange={e => setInviteForm({ ...inviteForm, role: e.target.value as 'company_admin' | 'normal_user' })}
                  style={{
                    width: '100%', height: '44px', padding: '0 12px',
                    backgroundColor: theme === 'dark' ? '#06080D' : '#FFFFFF',
                    border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                    color: tc.textPrimary, fontSize: '14px', outline: 'none', cursor: 'pointer'
                  }}
                >
                  <option value="normal_user">Orbital Analyst</option>
                  <option value="company_admin">Constellation Lead</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t" style={{ borderColor: tc.borderPrimary }}>
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2.5 rounded-lg transition-all font-mono"
                style={{
                  backgroundColor: 'transparent', color: tc.textSecondary,
                  border: `1px solid ${tc.borderPrimary}`,
                  fontSize: '13px', fontWeight: 600, cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleInvite}
                className="px-4 py-2.5 rounded-lg transition-all font-mono"
                style={{
                  backgroundColor: '#06B6D4', color: '#06080D', border: 'none',
                  fontSize: '13px', fontWeight: 700, cursor: 'pointer'
                }}
              >
                Issue Clearance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}
          onClick={() => setEditingUser(null)}
        >
          <div
            className="rounded-lg shadow-xl max-w-md w-full mx-4"
            style={{
              backgroundColor: tc.bgSecondary,
              border: `1px solid ${tc.borderPrimary}`
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: tc.borderPrimary }}>
              <div>
                <h2 className="font-mono" style={{ fontSize: '18px', fontWeight: 600, color: tc.textPrimary }}>Modify Operator Clearance</h2>
                <p style={{ fontSize: '13px', color: tc.textSecondary }}>Update callsign and shell permissions</p>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="p-1 rounded transition-colors"
                style={{ color: tc.textSecondary }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
                  Operator Name *
                </label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={e => setEditingUser({ ...editingUser, name: e.target.value })}
                  style={{
                    width: '100%', height: '44px', padding: '0 12px',
                    backgroundColor: theme === 'dark' ? '#06080D' : '#FFFFFF',
                    border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                    color: tc.textPrimary, fontSize: '14px', outline: 'none'
                  }}
                />
              </div>

              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
                  Callsign / Email *
                </label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
                  style={{
                    width: '100%', height: '44px', padding: '0 12px',
                    backgroundColor: theme === 'dark' ? '#06080D' : '#FFFFFF',
                    border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                    color: tc.textPrimary, fontSize: '14px', outline: 'none'
                  }}
                />
              </div>

              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
                  Clearance Role *
                </label>
                <select
                  value={editingUser.role}
                  onChange={e => setEditingUser({ ...editingUser, role: e.target.value as 'company_admin' | 'normal_user' })}
                  style={{
                    width: '100%', height: '44px', padding: '0 12px',
                    backgroundColor: theme === 'dark' ? '#06080D' : '#FFFFFF',
                    border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                    color: tc.textPrimary, fontSize: '14px', outline: 'none', cursor: 'pointer'
                  }}
                >
                  <option value="normal_user">Orbital Analyst</option>
                  <option value="company_admin">Constellation Lead</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t" style={{ borderColor: tc.borderPrimary }}>
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2.5 rounded-lg transition-all font-mono"
                style={{
                  backgroundColor: 'transparent', color: tc.textSecondary,
                  border: `1px solid ${tc.borderPrimary}`,
                  fontSize: '13px', fontWeight: 600, cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                className="px-4 py-2.5 rounded-lg transition-all font-mono"
                style={{
                  backgroundColor: '#06B6D4', color: '#06080D', border: 'none',
                  fontSize: '13px', fontWeight: 700, cursor: 'pointer'
                }}
              >
                Commit Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DataUploadTab() {
  const { theme } = useTheme();
  const tc = colors[theme];

  return (
    <div className="max-w-2xl">
      <div className="p-8 rounded-lg text-center" style={{ backgroundColor: tc.bgSecondary, border: `2px dashed ${tc.borderPrimary}` }}>
        <Upload className="w-12 h-12 mx-auto mb-4" style={{ color: '#06B6D4' }} />
        <h2 className="font-mono" style={{ fontSize: '18px', fontWeight: 600, color: tc.textPrimary, marginBottom: '8px' }}>
          Ingest Two-Line Element (TLE) & CCSDS CDM Batch
        </h2>
        <p style={{ fontSize: '14px', color: tc.textSecondary, marginBottom: '16px' }}>
          Upload 18th SDS Spacetrack `.tle`, `.omm`, or `.cdm` covariance files. SGP4 propagation and conjunction screening execute automatically on ingest.
        </p>
        <button
          className="px-6 py-2.5 rounded-lg transition-all font-mono"
          style={{
            backgroundColor: '#06B6D4', color: '#06080D', border: 'none',
            fontSize: '13px', fontWeight: 700, cursor: 'pointer'
          }}
        >
          Select TLE / CDM File
        </button>
      </div>
    </div>
  );
}

function CommentaryEditorTab() {
  const { theme } = useTheme();
  const tc = colors[theme];
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedSubSection, setSelectedSubSection] = useState<number>(1);
  const [commentaries, setCommentaries] = useState<Record<string, string>>({});

  const sections = [
    {
      id: 'altitude-decay',
      label: 'Orbital Altitude & Thermospheric Drag Log',
      status: 'published',
      updated: '18m ago',
      editor: 'Dr. Alex Torres',
      subsections: 1
    },
    {
      id: 'constellation-ephemeris',
      label: 'Constellation Ephemeris & Thruster ΔV Notes',
      status: 'published',
      updated: '1h ago',
      editor: 'Dr. Alex Torres',
      subsections: 1
    },
    {
      id: 'deorbit-compliance',
      label: 'FCC / ESA De-Orbit Reserve SLA Bulletins',
      status: 'draft',
      updated: '3h ago',
      editor: 'Dr. Alex Torres',
      subsections: 2
    },
  ];

  const handleSectionClick = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
    setSelectedSubSection(1);
  };

  const getCommentaryKey = (sectionId: string, subIndex?: number) => {
    return subIndex ? `${sectionId}-${subIndex}` : sectionId;
  };

  return (
    <div className="max-w-4xl">
      <h3 className="font-mono" style={{ fontSize: '13px', fontWeight: 600, color: tc.textSecondary, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Flight Dynamics Automated Telemetry Logs
      </h3>
      <div className="space-y-2">
        {sections.map(section => {
          const isExpanded = expandedSection === section.id;

          return (
            <div key={section.id}>
              <button
                onClick={() => handleSectionClick(section.id)}
                className="w-full text-left p-4 rounded-lg transition-all"
                style={{
                  backgroundColor: isExpanded ? (theme === 'dark' ? '#06080D' : '#F0F9FF') : tc.bgSecondary,
                  border: isExpanded ? `1px solid ${tc.accentPrimary}` : `1px solid ${tc.borderPrimary}`,
                  cursor: 'pointer'
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono" style={{ fontSize: '14px', fontWeight: 600, color: tc.textPrimary }}>
                        {section.label}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded text-xs font-mono"
                        style={{
                          backgroundColor: section.status === 'published' ? '#10B98120' : '#F59E0B20',
                          color: section.status === 'published' ? '#10B981' : '#F59E0B',
                          border: `1px solid ${section.status === 'published' ? '#10B98140' : '#F59E0B40'}`,
                          fontSize: '11px',
                          fontWeight: 600
                        }}
                      >
                        {section.status === 'published' ? 'LIVE' : 'STAGED'}
                      </span>
                    </div>
                    <div className="font-mono" style={{ fontSize: '12px', color: tc.textSecondary }}>
                      Updated {section.updated} · {section.editor}
                    </div>
                  </div>
                  <ChevronDown
                    className="w-5 h-5 transition-transform"
                    style={{
                      color: tc.textSecondary,
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  />
                </div>
              </button>

              {isExpanded && (
                <div className="mt-2 p-4 rounded-lg" style={{ backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}` }}>
                  <textarea
                    placeholder="Enter Flight Dynamics telemetry log entry..."
                    value={commentaries[getCommentaryKey(section.id, section.subsections > 1 ? selectedSubSection : undefined)] || ''}
                    onChange={e => setCommentaries({
                      ...commentaries,
                      [getCommentaryKey(section.id, section.subsections > 1 ? selectedSubSection : undefined)]: e.target.value
                    })}
                    rows={8}
                    style={{
                      width: '100%', padding: '12px',
                      backgroundColor: theme === 'dark' ? '#06080D' : '#FFFFFF',
                      border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                      color: tc.textPrimary, fontSize: '14px', outline: 'none', resize: 'vertical'
                    }}
                  />
                  <div className="flex gap-3 mt-4">
                    <button
                      className="px-6 py-2.5 rounded-lg transition-all font-mono"
                      style={{
                        backgroundColor: '#06B6D4', color: '#06080D', border: 'none',
                        fontSize: '13px', fontWeight: 700, cursor: 'pointer'
                      }}
                    >
                      Broadcast to Console
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ImageUploadsTab() {
  const { theme } = useTheme();
  const tc = colors[theme];

  return (
    <div>
      <h2 className="font-mono" style={{ fontSize: '18px', fontWeight: 600, color: tc.textPrimary, marginBottom: '16px' }}>
        Radar Covariance & B-Plane Plot Uploads (4 Slots)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          'B-Plane Conjunction Ellipsoid Contour',
          'Xenon Hall-Effect Propellant Depletion Curve',
          'S-Band / Optical ISL Link Margin Waterfall',
          'Thermospheric Drag F10.7 Correlation Plot'
        ].map((label, i) => (
          <div
            key={i}
            className="aspect-video rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer hover:opacity-80 transition-opacity"
            style={{
              backgroundColor: theme === 'dark' ? '#06080D' : '#F9FAFB',
              border: `2px dashed ${tc.borderPrimary}`
            }}
          >
            <Image className="w-8 h-8 mb-3" style={{ color: '#06B6D4' }} />
            <p className="font-mono" style={{ fontSize: '13px', fontWeight: 600, color: tc.textPrimary, marginBottom: '4px', textAlign: 'center' }}>
              {label}
            </p>
            <p style={{ fontSize: '12px', color: tc.textSecondary }}>Click to upload radar plot SVG/PNG</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrioritiesEventsTab() {
  const { theme } = useTheme();
  const tc = colors[theme];

  return (
    <div className="max-w-3xl">
      <div className="p-6 rounded-lg" style={{ backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}` }}>
        <h3 className="font-mono" style={{ fontSize: '16px', fontWeight: 600, color: tc.textPrimary, marginBottom: '12px' }}>
          Flight Director Directives
        </h3>
        <textarea
          placeholder="Enter active CAM directives and orbital trim orders (one per line)..."
          rows={6}
          style={{
            width: '100%', padding: '12px', marginBottom: '24px',
            backgroundColor: theme === 'dark' ? '#06080D' : '#FFFFFF',
            border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
            color: tc.textPrimary, fontSize: '14px', outline: 'none', resize: 'vertical'
          }}
        />
        <h3 className="font-mono" style={{ fontSize: '16px', fontWeight: 600, color: tc.textPrimary, marginBottom: '12px' }}>
          Upcoming Ground Station AOS & Thruster Burn Windows
        </h3>
        <textarea
          placeholder="Enter scheduled AOS passes and maneuver epochs (one per line)..."
          rows={6}
          style={{
            width: '100%', padding: '12px',
            backgroundColor: theme === 'dark' ? '#06080D' : '#FFFFFF',
            border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
            color: tc.textPrimary, fontSize: '14px', outline: 'none', resize: 'vertical'
          }}
        />
        <button
          className="mt-4 px-6 py-2.5 rounded-lg transition-all font-mono"
          style={{
            backgroundColor: '#06B6D4', color: '#06080D', border: 'none',
            fontSize: '13px', fontWeight: 700, cursor: 'pointer'
          }}
        >
          Commit Flight Plan
        </button>
      </div>
    </div>
  );
}

function SectorNewsEditorTab() {
  const { theme } = useTheme();
  const tc = colors[theme];
  const [expandedSubsection, setExpandedSubsection] = useState<string | null>(null);
  const [newsContents, setNewsContents] = useState<Record<string, string>>({});

  const subsections = [
    {
      id: 'solar-weather',
      label: 'NOAA SWPC Solar & Geomagnetic Advisories',
      status: 'published',
      updated: '12m ago',
      editor: 'Dr. Alex Torres',
    },
    {
      id: 'catalog-bulletins',
      label: '18th SDS & LeoLabs Conjunction Bulletins',
      status: 'published',
      updated: '1h ago',
      editor: 'Dr. Alex Torres',
    },
    {
      id: 'fcc-esa-policy',
      label: 'FCC / ESA Orbital Sustainability Directives',
      status: 'published',
      updated: '1d ago',
      editor: 'Dr. Alex Torres',
    },
  ];

  const handleSubsectionClick = (subsectionId: string) => {
    setExpandedSubsection(expandedSubsection === subsectionId ? null : subsectionId);
  };

  return (
    <div className="max-w-4xl">
      <h3 className="font-mono" style={{ fontSize: '13px', fontWeight: 600, color: tc.textSecondary, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Space Weather & Orbital Bulletin Feeds
      </h3>
      <div className="space-y-2">
        {subsections.map(subsection => {
          const isExpanded = expandedSubsection === subsection.id;

          return (
            <div key={subsection.id}>
              <button
                onClick={() => handleSubsectionClick(subsection.id)}
                className="w-full text-left p-4 rounded-lg transition-all"
                style={{
                  backgroundColor: isExpanded ? (theme === 'dark' ? '#06080D' : '#F0F9FF') : tc.bgSecondary,
                  border: isExpanded ? `1px solid ${tc.accentPrimary}` : `1px solid ${tc.borderPrimary}`,
                  cursor: 'pointer'
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono" style={{ fontSize: '14px', fontWeight: 600, color: tc.textPrimary }}>
                        {subsection.label}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded text-xs font-mono"
                        style={{
                          backgroundColor: '#10B98120',
                          color: '#10B981',
                          border: '1px solid #10B98140',
                          fontSize: '11px',
                          fontWeight: 600
                        }}
                      >
                        ACTIVE FEED
                      </span>
                    </div>
                    <div className="font-mono" style={{ fontSize: '12px', color: tc.textSecondary }}>
                      Updated {subsection.updated} · {subsection.editor}
                    </div>
                  </div>
                  <ChevronDown
                    className="w-5 h-5 transition-transform"
                    style={{
                      color: tc.textSecondary,
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  />
                </div>
              </button>

              {isExpanded && (
                <div className="mt-2 p-4 rounded-lg" style={{ backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}` }}>
                  <textarea
                    placeholder="Enter space weather advisory or 18th SDS bulletin..."
                    value={newsContents[subsection.id] || ''}
                    onChange={e => setNewsContents({
                      ...newsContents,
                      [subsection.id]: e.target.value
                    })}
                    rows={8}
                    style={{
                      width: '100%', padding: '12px',
                      backgroundColor: theme === 'dark' ? '#06080D' : '#FFFFFF',
                      border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                      color: tc.textPrimary, fontSize: '14px', outline: 'none', resize: 'vertical'
                    }}
                  />
                  <div className="flex gap-3 mt-4">
                    <button
                      className="px-6 py-2.5 rounded-lg transition-all font-mono"
                      style={{
                        backgroundColor: '#06B6D4', color: '#06080D', border: 'none',
                        fontSize: '13px', fontWeight: 700, cursor: 'pointer'
                      }}
                    >
                      Publish Bulletin
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MarketTrendsEditorTab() {
  const { theme } = useTheme();
  const tc = colors[theme];

  return (
    <div className="max-w-3xl">
      <div className="p-6 rounded-lg" style={{ backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}` }}>
        <h3 className="font-mono" style={{ fontSize: '16px', fontWeight: 600, color: tc.textPrimary, marginBottom: '12px' }}>
          Autonomous CAM & Covariance Protocol Specification
        </h3>
        <textarea
          placeholder="Enter updated differential drag and Hall-effect collision avoidance maneuver thresholds..."
          rows={10}
          style={{
            width: '100%', padding: '12px',
            backgroundColor: theme === 'dark' ? '#06080D' : '#FFFFFF',
            border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
            color: tc.textPrimary, fontSize: '14px', outline: 'none', resize: 'vertical'
          }}
        />
        <button
          className="mt-4 px-6 py-2.5 rounded-lg transition-all font-mono"
          style={{
            backgroundColor: '#06B6D4', color: '#06080D', border: 'none',
            fontSize: '13px', fontWeight: 700, cursor: 'pointer'
          }}
        >
          Update CAM Protocol
        </button>
      </div>
    </div>
  );
}
