import { useState } from 'react';
import { Users, Plus, Mail, Trash2, Edit2, X, Copy, Check } from 'lucide-react';
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
  { id: '1', name: 'James Miller', email: 'james.miller@apexbrands.com', role: 'company_admin', status: 'active', lastActive: '2 hours ago' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.j@apexbrands.com', role: 'normal_user', status: 'active', lastActive: '5 hours ago' },
  { id: '3', name: 'Michael Chen', email: 'mchen@apexbrands.com', role: 'normal_user', status: 'active', lastActive: '1 day ago' },
  { id: '4', name: 'Emily Davis', email: 'emily.davis@apexbrands.com', role: 'normal_user', status: 'pending', lastActive: undefined },
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

  // For company_admin, role is strictly locked to normal_user per platform policy
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
    const inviteLink = `https://aegisterminal.com/invite?token=${Math.random().toString(36).substring(2, 15)}`;

    // Fallback copy method for environments where Clipboard API is blocked
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
    return role === 'company_admin' ? 'Company Admin' : 'User';
  };

  const getRoleBadgeColor = (role: string) => {
    return role === 'company_admin' ? '#0891B2' : '#06B6D4';
  };

  return (
    <div className="p-3 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: tc.textPrimary, marginBottom: '8px' }}>
            User Management
          </h1>
          <p style={{ fontSize: '14px', color: tc.textSecondary }}>
            Manage users and permissions for your company
          </p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all"
          style={{
            backgroundColor: '#0891B2',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0E7490'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0891B2'}
        >
          <Plus className="w-4 h-4" />
          Invite User
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
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: tc.textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                User
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: tc.textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Role
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: tc.textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Status
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: tc.textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Last Active
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: 600, color: tc.textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
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
                onMouseEnter={e => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#0F1A2A' : '#F9FAFB'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td style={{ padding: '16px' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: tc.textPrimary }}>{user.name}</div>
                    <div style={{ fontSize: '13px', color: tc.textSecondary }}>{user.email}</div>
                  </div>
                </td>
                <td style={{ padding: '16px' }}>
                  <span
                    className="inline-flex px-2.5 py-1 rounded-full"
                    style={{
                      fontSize: '12px',
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
                    className="inline-flex px-2.5 py-1 rounded-full"
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      backgroundColor: user.status === 'active' ? '#10B98120' : '#F59E0B20',
                      color: user.status === 'active' ? '#10B981' : '#F59E0B',
                      border: `1px solid ${user.status === 'active' ? '#10B98140' : '#F59E0B40'}`
                    }}
                  >
                    {user.status === 'active' ? 'Active' : 'Pending'}
                  </span>
                </td>
                <td style={{ padding: '16px', fontSize: '13px', color: tc.textSecondary }}>
                  {user.lastActive || '—'}
                </td>
                <td style={{ padding: '16px' }}>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setEditingUser({ ...user })}
                      className="p-2 rounded transition-colors"
                      style={{ color: tc.textSecondary }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = theme === 'dark' ? '#1A2332' : '#E5E7EB';
                        e.currentTarget.style.color = tc.accentPrimary;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = tc.textSecondary;
                      }}
                      title="Edit user"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-2 rounded transition-colors"
                      style={{ color: tc.textSecondary }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = '#DC262620';
                        e.currentTarget.style.color = '#DC2626';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = tc.textSecondary;
                      }}
                      title="Remove user"
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

      {/* Invite User Modal */}
      {showInviteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
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
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: tc.borderPrimary }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0891B220' }}>
                  <Mail className="w-5 h-5" style={{ color: '#0891B2' }} />
                </div>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: 600, color: tc.textPrimary }}>Invite User</h2>
                  <p style={{ fontSize: '13px', color: tc.textSecondary }}>Send an invitation to join your company</p>
                </div>
              </div>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-1 rounded transition-colors"
                style={{ color: tc.textSecondary }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#0F1A2A' : '#F3F4F6'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Copy Invite Link */}
              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: theme === 'dark' ? '#0F1A2A' : '#F0F9FF',
                  border: `1px solid ${tc.accentPrimary}40`
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p style={{ fontSize: '13px', fontWeight: 600, color: tc.textPrimary, marginBottom: '4px' }}>
                      Invitation Link
                    </p>
                    <p style={{ fontSize: '12px', color: tc.textSecondary }}>
                      Copy and share this link with the user
                    </p>
                  </div>
                  <button
                    onClick={handleCopyInviteLink}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
                    style={{
                      backgroundColor: copied ? '#10B981' : tc.accentPrimary,
                      color: '#FFFFFF',
                      border: 'none',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                    onMouseEnter={e => {
                      if (!copied) e.currentTarget.style.backgroundColor = '#0E7490';
                    }}
                    onMouseLeave={e => {
                      if (!copied) e.currentTarget.style.backgroundColor = tc.accentPrimary;
                    }}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Link
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., John Smith"
                  value={inviteForm.name}
                  onChange={e => setInviteForm({ ...inviteForm, name: e.target.value })}
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 12px',
                    backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
                    border: `1px solid ${tc.borderPrimary}`,
                    borderRadius: '8px',
                    color: tc.textPrimary,
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="john.smith@apexbrands.com"
                  value={inviteForm.email}
                  onChange={e => setInviteForm({ ...inviteForm, email: e.target.value })}
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 12px',
                    backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
                    border: `1px solid ${tc.borderPrimary}`,
                    borderRadius: '8px',
                    color: tc.textPrimary,
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
                  Role *
                </label>
                {isSuperAdmin ? (
                  <select
                    value={inviteForm.role}
                    onChange={e => setInviteForm({ ...inviteForm, role: e.target.value as 'company_admin' | 'normal_user' })}
                    style={{
                      width: '100%',
                      height: '44px',
                      padding: '0 12px',
                      backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
                      border: `1px solid ${tc.borderPrimary}`,
                      borderRadius: '8px',
                      color: tc.textPrimary,
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="normal_user">User (Analyst)</option>
                    <option value="company_admin">Company Admin</option>
                  </select>
                ) : (
                  <div>
                    <input
                      type="text"
                      disabled
                      value="User (Analyst)"
                      style={{
                        width: '100%',
                        height: '44px',
                        padding: '0 12px',
                        backgroundColor: theme === 'dark' ? '#0B111E' : '#F3F4F6',
                        border: `1px solid ${tc.borderPrimary}`,
                        borderRadius: '8px',
                        color: tc.textSecondary,
                        fontSize: '14px',
                        outline: 'none',
                        cursor: 'not-allowed'
                      }}
                    />
                    <p style={{ fontSize: '11px', color: tc.textSecondary, marginTop: '4px' }}>
                      Company Admins can invite team members with Analyst / User access.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t" style={{ borderColor: tc.borderPrimary }}>
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2.5 rounded-lg transition-all"
                style={{
                  backgroundColor: 'transparent',
                  color: tc.textSecondary,
                  border: `1px solid ${tc.borderPrimary}`,
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#0F1A2A' : '#F3F4F6'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Cancel
              </button>
              <button
                onClick={handleInvite}
                className="px-4 py-2.5 rounded-lg transition-all"
                style={{
                  backgroundColor: '#0891B2',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0E7490'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0891B2'}
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
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
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: tc.borderPrimary }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0891B220' }}>
                  <Edit2 className="w-5 h-5" style={{ color: '#0891B2' }} />
                </div>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: 600, color: tc.textPrimary }}>Edit User</h2>
                  <p style={{ fontSize: '13px', color: tc.textSecondary }}>Modify user information</p>
                </div>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="p-1 rounded transition-colors"
                style={{ color: tc.textSecondary }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#0F1A2A' : '#F3F4F6'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={e => setEditingUser({ ...editingUser, name: e.target.value })}
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 12px',
                    backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
                    border: `1px solid ${tc.borderPrimary}`,
                    borderRadius: '8px',
                    color: tc.textPrimary,
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 12px',
                    backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
                    border: `1px solid ${tc.borderPrimary}`,
                    borderRadius: '8px',
                    color: tc.textPrimary,
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
                  Status
                </label>
                <select
                  value={editingUser.status}
                  onChange={e => setEditingUser({ ...editingUser, status: e.target.value as 'active' | 'pending' })}
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 12px',
                    backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
                    border: `1px solid ${tc.borderPrimary}`,
                    borderRadius: '8px',
                    color: tc.textPrimary,
                    fontSize: '14px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              {isSuperAdmin && (
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
                    Role *
                  </label>
                  <select
                    value={editingUser.role}
                    onChange={e => setEditingUser({ ...editingUser, role: e.target.value as 'company_admin' | 'normal_user' })}
                    style={{
                      width: '100%',
                      height: '44px',
                      padding: '0 12px',
                      backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
                      border: `1px solid ${tc.borderPrimary}`,
                      borderRadius: '8px',
                      color: tc.textPrimary,
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="normal_user">User</option>
                    <option value="company_admin">Company Admin</option>
                  </select>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t" style={{ borderColor: tc.borderPrimary }}>
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2.5 rounded-lg transition-all"
                style={{
                  backgroundColor: 'transparent',
                  color: tc.textSecondary,
                  border: `1px solid ${tc.borderPrimary}`,
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#0F1A2A' : '#F3F4F6'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                className="px-4 py-2.5 rounded-lg transition-all"
                style={{
                  backgroundColor: '#0891B2',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0E7490'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0891B2'}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
