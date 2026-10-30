import { useState } from 'react';
import { Plus, Mail, Trash2, Edit2, X, Copy, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'company_admin' | 'normal_user';
  status: 'active' | 'pending';
  lastActive?: string;
}

const MOCK_USERS: User[] = [
  { id: '1', name: 'Cmdr. James Miller', email: 'j.miller@vanguard.space', role: 'company_admin', status: 'active', lastActive: '14m ago' },
  { id: '2', name: 'Sarah Chen', email: 's.chen@vanguard.space', role: 'normal_user', status: 'active', lastActive: '38m ago' },
  { id: '3', name: 'Michael Ross', email: 'm.ross@vanguard.space', role: 'normal_user', status: 'active', lastActive: '2h ago' },
  { id: '4', name: 'Elena Rostova', email: 'e.rostova@vanguard.space', role: 'normal_user', status: 'pending', lastActive: undefined },
];

export default function UserManagementPage() {
  const { theme } = useTheme();
  const { user: currentUser } = useAuth();
  const tc = colors[theme];
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [inviteForm, setInviteForm] = useState({ name: '', email: '', role: 'normal_user' as 'company_admin' | 'normal_user' });
  const [copied, setCopied] = useState(false);

  const isSuperAdmin = currentUser?.role === 'super_admin';

  const handleInvite = () => {
    if (!inviteForm.name.trim() || !inviteForm.email.trim()) return;
    const newUser: User = {
      id: Date.now().toString(),
      name: inviteForm.name.trim(),
      email: inviteForm.email.trim(),
      role: isSuperAdmin ? inviteForm.role : 'normal_user',
      status: 'pending',
      lastActive: undefined
    };
    setUsers(prev => [...prev, newUser]);
    setShowInviteModal(false);
    setInviteForm({ name: '', email: '', role: 'normal_user' });
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

  const getRoleLabel = (role: string) => {
    return role === 'company_admin' ? 'Constellation Lead' : 'Orbital Analyst';
  };

  const getRoleBadgeColor = (role: string) => {
    return role === 'company_admin' ? '#0891B2' : '#06B6D4';
  };

  return (
    <div className="p-3 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-mono" style={{ fontSize: '24px', fontWeight: 700, color: tc.textPrimary, marginBottom: '6px' }}>
            Flight Crew & Console Clearance
          </h1>
          <p style={{ fontSize: '14px', color: tc.textSecondary }}>
            Manage orbital analysts and telemetry permissions for Vanguard LEO Shell-1
          </p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all font-mono"
          style={{
            backgroundColor: tc.accentPrimary,
            color: tc.bgPrimary,
            border: 'none',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <Plus className="w-4 h-4" />
          Authorize Operator
        </button>
      </div>

      {/* Users Table */}
      <div
        className="rounded-lg overflow-hidden"
        style={{
          backgroundColor: tc.bgSecondary,
          border: `1px solid ${tc.borderPrimary}`
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${tc.borderPrimary}` }}>
              <th className="font-mono" style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: tc.textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Operator
              </th>
              <th className="font-mono" style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: tc.textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Clearance Level
              </th>
              <th className="font-mono" style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: tc.textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Status
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
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#06B6D420' }}>
                  <Mail className="w-5 h-5" style={{ color: '#06B6D4' }} />
                </div>
                <div>
                  <h2 className="font-mono" style={{ fontSize: '18px', fontWeight: 600, color: tc.textPrimary }}>Authorize Operator</h2>
                  <p style={{ fontSize: '13px', color: tc.textSecondary }}>Provision console access for Vanguard LEO Shell-1</p>
                </div>
              </div>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-1 rounded transition-colors"
                style={{ color: tc.textSecondary }}
              >
                <X className="w-5 h-5" />
              </button>
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
                      Encrypted Clearance Link
                    </p>
                    <p style={{ fontSize: '12px', color: tc.textSecondary }}>
                      Share via authenticated FDO channel
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
                  Operator Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Lt. John Smith"
                  value={inviteForm.name}
                  onChange={e => setInviteForm({ ...inviteForm, name: e.target.value })}
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 12px',
                    backgroundColor: theme === 'dark' ? tc.bgPrimary : '#FFFFFF',
                    border: `1px solid ${tc.borderPrimary}`,
                    borderRadius: '8px',
                    color: tc.textPrimary,
                    fontSize: '14px',
                    outline: 'none'
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
                    width: '100%',
                    height: '44px',
                    padding: '0 12px',
                    backgroundColor: theme === 'dark' ? tc.bgPrimary : '#FFFFFF',
                    border: `1px solid ${tc.borderPrimary}`,
                    borderRadius: '8px',
                    color: tc.textPrimary,
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
                  Clearance Role *
                </label>
                {isSuperAdmin ? (
                  <select
                    value={inviteForm.role}
                    onChange={e => setInviteForm({ ...inviteForm, role: e.target.value as 'company_admin' | 'normal_user' })}
                    style={{
                      width: '100%',
                      height: '44px',
                      padding: '0 12px',
                      backgroundColor: theme === 'dark' ? tc.bgPrimary : '#FFFFFF',
                      border: `1px solid ${tc.borderPrimary}`,
                      borderRadius: '8px',
                      color: tc.textPrimary,
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="normal_user">Orbital Analyst</option>
                    <option value="company_admin">Constellation Lead</option>
                  </select>
                ) : (
                  <div>
                    <input
                      type="text"
                      disabled
                      value="Orbital Analyst"
                      style={{
                        width: '100%',
                        height: '44px',
                        padding: '0 12px',
                        backgroundColor: theme === 'dark' ? '#06080D' : '#F3F4F6',
                        border: `1px solid ${tc.borderPrimary}`,
                        borderRadius: '8px',
                        color: tc.textSecondary,
                        fontSize: '14px',
                        outline: 'none',
                        cursor: 'not-allowed'
                      }}
                    />
                    <p style={{ fontSize: '11px', color: tc.textSecondary, marginTop: '4px' }}>
                      Constellation Leads can provision Orbital Analyst clearance.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t" style={{ borderColor: tc.borderPrimary }}>
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2.5 rounded-lg transition-all font-mono"
                style={{
                  backgroundColor: 'transparent',
                  color: tc.textSecondary,
                  border: `1px solid ${tc.borderPrimary}`,
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleInvite}
                className="px-4 py-2.5 rounded-lg transition-all font-mono"
                style={{
                  backgroundColor: '#06B6D4',
                  color: '#06080D',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
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
                <h2 className="font-mono" style={{ fontSize: '18px', fontWeight: 600, color: tc.textPrimary }}>Edit Operator</h2>
                <p style={{ fontSize: '13px', color: tc.textSecondary }}>Update callsign and telemetry status</p>
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
                    width: '100%',
                    height: '44px',
                    padding: '0 12px',
                    backgroundColor: theme === 'dark' ? tc.bgPrimary : '#FFFFFF',
                    border: `1px solid ${tc.borderPrimary}`,
                    borderRadius: '8px',
                    color: tc.textPrimary,
                    fontSize: '14px',
                    outline: 'none'
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
                    width: '100%',
                    height: '44px',
                    padding: '0 12px',
                    backgroundColor: theme === 'dark' ? tc.bgPrimary : '#FFFFFF',
                    border: `1px solid ${tc.borderPrimary}`,
                    borderRadius: '8px',
                    color: tc.textPrimary,
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
                  Status
                </label>
                <select
                  value={editingUser.status}
                  onChange={e => setEditingUser({ ...editingUser, status: e.target.value as 'active' | 'pending' })}
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 12px',
                    backgroundColor: theme === 'dark' ? tc.bgPrimary : '#FFFFFF',
                    border: `1px solid ${tc.borderPrimary}`,
                    borderRadius: '8px',
                    color: tc.textPrimary,
                    fontSize: '14px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="active">NOMINAL</option>
                  <option value="pending">PENDING</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t" style={{ borderColor: tc.borderPrimary }}>
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2.5 rounded-lg transition-all font-mono"
                style={{
                  backgroundColor: 'transparent',
                  color: tc.textSecondary,
                  border: `1px solid ${tc.borderPrimary}`,
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                className="px-4 py-2.5 rounded-lg transition-all font-mono"
                style={{
                  backgroundColor: '#06B6D4',
                  color: '#06080D',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
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
