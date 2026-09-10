import { useState } from 'react';
import { Building2, Users, Upload, MessageSquare, Image, ListTodo, Newspaper, TrendingUp, Settings, Edit2, Trash2, X, Mail, Copy, Check, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { useLocation, useNavigate } from 'react-router';

export default function AdminDashboardPage() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const tc = colors[theme];
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const tabParam = params.get('tab') || 'onboarding';
  const validTabs = ['onboarding', 'users', 'data-upload', 'commentary', 'images', 'priorities', 'sector-news', 'market-trends'];
  const activeTab = validTabs.includes(tabParam) ? tabParam : 'onboarding';

  return (
    <div className="p-3 md:p-6">
      {/* Header - Super Admin only */}
      {user?.role === 'super_admin' && (
        <div className="mb-6">
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: tc.textPrimary, marginBottom: '4px' }}>
            Admin Console
          </h1>
          <p style={{ fontSize: '14px', color: tc.textSecondary }}>
            Aegis Credit Terminal Platform Management
          </p>
        </div>
      )}

      {/* Tab Content */}
      <div className="transition-colors duration-300">
        {activeTab === 'onboarding' && <CompanyOnboardingTab />}
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

function CompanyOnboardingTab() {
  const { theme } = useTheme();
  const tc = colors[theme];
  const [form, setForm] = useState({ name: '', description: '', email: '' });

  return (
    <div className="max-w-2xl">
      <div className="p-6 rounded-lg" style={{ backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}` }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: tc.textPrimary, marginBottom: '16px' }}>
          Add New Company
        </h2>
        <div className="space-y-4">
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
              Company Name *
            </label>
            <input
              type="text"
              placeholder="e.g., Apex Brands Group Inc."
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              style={{
                width: '100%', height: '44px', padding: '0 12px',
                backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
                border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                color: tc.textPrimary, fontSize: '14px', outline: 'none'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
              Description
            </label>
            <textarea
              placeholder="Brief description of the company"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              rows={4}
              style={{
                width: '100%', padding: '12px',
                backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
                border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                color: tc.textPrimary, fontSize: '14px', outline: 'none', resize: 'vertical'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
              Primary Contact Email *
            </label>
            <input
              type="email"
              placeholder="cfo@company.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              style={{
                width: '100%', height: '44px', padding: '0 12px',
                backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
                border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                color: tc.textPrimary, fontSize: '14px', outline: 'none'
              }}
            />
          </div>
          <button
            className="px-6 py-2.5 rounded-lg transition-all"
            style={{
              backgroundColor: '#0891B2', color: '#FFFFFF', border: 'none',
              fontSize: '14px', fontWeight: 600, cursor: 'pointer'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0E7490'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0891B2'}
          >
            Create Company
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
  const [inviteForm, setInviteForm] = useState({ name: '', email: '', role: 'normal_user' as 'company_admin' | 'normal_user', company: 'apexbrands' });
  const [copied, setCopied] = useState(false);

  const [users, setUsers] = useState([
    { id: '1', name: 'James Miller', email: 'james.miller@apexbrands.com', role: 'company_admin', company: 'Apex Brands Group', status: 'active', lastActive: '2 hours ago' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah.j@apexbrands.com', role: 'normal_user', company: 'Apex Brands Group', status: 'active', lastActive: '5 hours ago' },
    { id: '3', name: 'Michael Chen', email: 'mchen@chefs.com', role: 'company_admin', company: 'Chefs\' Warehouse', status: 'active', lastActive: '1 day ago' },
    { id: '4', name: 'Emily Davis', email: 'emily.davis@apexbrands.com', role: 'normal_user', company: 'Apex Brands Group', status: 'pending', lastActive: undefined },
    { id: '5', name: 'Robert Lee', email: 'rlee@horizon.com', role: 'normal_user', company: 'Horizon Global', status: 'active', lastActive: '3 hours ago' },
  ]);

  const getRoleLabel = (role: string) => {
    return role === 'company_admin' ? 'Company Admin' : 'User';
  };

  const getRoleBadgeColor = (role: string) => {
    return role === 'company_admin' ? '#0891B2' : '#06B6D4';
  };

  const handleInvite = () => {
    if (!inviteForm.name.trim() || !inviteForm.email.trim()) return;
    const companyNames: Record<string, string> = {
      apexbrands: 'Apex Brands Group',
      chefs: "Chefs' Warehouse",
      horizon: 'Horizon Global'
    };
    const newUser = {
      id: Date.now().toString(),
      name: inviteForm.name.trim(),
      email: inviteForm.email.trim(),
      role: inviteForm.role,
      company: companyNames[inviteForm.company] || 'Apex Brands Group',
      status: 'pending',
      lastActive: undefined
    };
    setUsers(prev => [...prev, newUser]);
    setShowInviteModal(false);
    setInviteForm({ name: '', email: '', role: 'normal_user', company: 'apexbrands' });
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

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: tc.textPrimary }}>
          Manage Users
        </h2>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
          style={{
            backgroundColor: '#0891B2', color: '#FFFFFF', border: 'none',
            fontSize: '14px', fontWeight: 600, cursor: 'pointer'
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0E7490'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0891B2'}
        >
          Invite User
        </button>
      </div>

      <div className="rounded-lg overflow-hidden" style={{ backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}` }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${tc.borderPrimary}` }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: tc.textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                User
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: tc.textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Company
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
                <td style={{ padding: '16px', fontSize: '13px', color: tc.textPrimary }}>
                  {user.company}
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
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: tc.borderPrimary }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 600, color: tc.textPrimary }}>Invite User</h2>
                <p style={{ fontSize: '13px', color: tc.textSecondary }}>Send an invitation to join a company</p>
              </div>
            </div>

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
                    width: '100%', height: '44px', padding: '0 12px',
                    backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
                    border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                    color: tc.textPrimary, fontSize: '14px', outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="john.smith@company.com"
                  value={inviteForm.email}
                  onChange={e => setInviteForm({ ...inviteForm, email: e.target.value })}
                  style={{
                    width: '100%', height: '44px', padding: '0 12px',
                    backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
                    border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                    color: tc.textPrimary, fontSize: '14px', outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
                  Company *
                </label>
                <select
                  value={inviteForm.company}
                  onChange={e => setInviteForm({ ...inviteForm, company: e.target.value })}
                  style={{
                    width: '100%', height: '44px', padding: '0 12px',
                    backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
                    border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                    color: tc.textPrimary, fontSize: '14px', outline: 'none', cursor: 'pointer'
                  }}
                >
                  <option value="apexbrands">Apex Brands Group</option>
                  <option value="chefs">Chefs' Warehouse</option>
                  <option value="horizon">Horizon Global</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
                  Role *
                </label>
                <select
                  value={inviteForm.role}
                  onChange={e => setInviteForm({ ...inviteForm, role: e.target.value as 'company_admin' | 'normal_user' })}
                  style={{
                    width: '100%', height: '44px', padding: '0 12px',
                    backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
                    border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                    color: tc.textPrimary, fontSize: '14px', outline: 'none', cursor: 'pointer'
                  }}
                >
                  <option value="normal_user">User</option>
                  <option value="company_admin">Company Admin</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t" style={{ borderColor: tc.borderPrimary }}>
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2.5 rounded-lg transition-all"
                style={{
                  backgroundColor: 'transparent', color: tc.textSecondary,
                  border: `1px solid ${tc.borderPrimary}`,
                  fontSize: '14px', fontWeight: 600, cursor: 'pointer'
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
                  backgroundColor: '#0891B2', color: '#FFFFFF', border: 'none',
                  fontSize: '14px', fontWeight: 600, cursor: 'pointer'
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
                  <p style={{ fontSize: '13px', color: tc.textSecondary }}>Modify user details and permissions</p>
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
                    width: '100%', height: '44px', padding: '0 12px',
                    backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
                    border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                    color: tc.textPrimary, fontSize: '14px', outline: 'none'
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
                    width: '100%', height: '44px', padding: '0 12px',
                    backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
                    border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                    color: tc.textPrimary, fontSize: '14px', outline: 'none'
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
                    width: '100%', height: '44px', padding: '0 12px',
                    backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
                    border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                    color: tc.textPrimary, fontSize: '14px', outline: 'none', cursor: 'pointer'
                  }}
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: tc.textPrimary, marginBottom: '6px' }}>
                  Role *
                </label>
                <select
                  value={editingUser.role}
                  onChange={e => setEditingUser({ ...editingUser, role: e.target.value as 'company_admin' | 'normal_user' })}
                  style={{
                    width: '100%', height: '44px', padding: '0 12px',
                    backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
                    border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                    color: tc.textPrimary, fontSize: '14px', outline: 'none', cursor: 'pointer'
                  }}
                >
                  <option value="normal_user">User</option>
                  <option value="company_admin">Company Admin</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t" style={{ borderColor: tc.borderPrimary }}>
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2.5 rounded-lg transition-all"
                style={{
                  backgroundColor: 'transparent', color: tc.textSecondary,
                  border: `1px solid ${tc.borderPrimary}`,
                  fontSize: '14px', fontWeight: 600, cursor: 'pointer'
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
                  backgroundColor: '#0891B2', color: '#FFFFFF', border: 'none',
                  fontSize: '14px', fontWeight: 600, cursor: 'pointer'
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

function DataUploadTab() {
  const { theme } = useTheme();
  const tc = colors[theme];

  return (
    <div className="max-w-2xl">
      <div className="p-8 rounded-lg text-center" style={{ backgroundColor: tc.bgSecondary, border: `2px dashed ${tc.borderPrimary}` }}>
        <Upload className="w-12 h-12 mx-auto mb-4" style={{ color: tc.textTertiary }} />
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: tc.textPrimary, marginBottom: '8px' }}>
          Import Data
        </h2>
        <p style={{ fontSize: '14px', color: tc.textSecondary, marginBottom: '16px' }}>
          Upload a single data file. ETL processing happens automatically behind the scenes.
        </p>
        <button
          className="px-6 py-2.5 rounded-lg transition-all"
          style={{
            backgroundColor: '#0891B2', color: '#FFFFFF', border: 'none',
            fontSize: '14px', fontWeight: 600, cursor: 'pointer'
          }}
        >
          Select File to Upload
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
      id: 'debt-pricing',
      label: 'Debt Pricing',
      status: 'published',
      updated: '2h ago',
      editor: 'Alex Torres',
      subsections: 1
    },
    {
      id: 'capital-structure',
      label: 'Capital Structure',
      status: 'published',
      updated: '1d ago',
      editor: 'Alex Torres',
      subsections: 1
    },
    {
      id: 'covenant-compliance',
      label: 'Covenant Compliance',
      status: 'draft',
      updated: '3d ago',
      editor: 'Alex Torres',
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
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: tc.textSecondary, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Commentary Sections
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
                  backgroundColor: isExpanded ? (theme === 'dark' ? '#0F1A2A' : '#F0F9FF') : tc.bgSecondary,
                  border: isExpanded ? `1px solid ${tc.accentPrimary}` : `1px solid ${tc.borderPrimary}`,
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  if (!isExpanded) {
                    e.currentTarget.style.backgroundColor = theme === 'dark' ? '#1A2332' : '#F9FAFB';
                  }
                }}
                onMouseLeave={e => {
                  if (!isExpanded) {
                    e.currentTarget.style.backgroundColor = tc.bgSecondary;
                  }
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span style={{ fontSize: '14px', fontWeight: 600, color: tc.textPrimary }}>
                        {section.label}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded text-xs"
                        style={{
                          backgroundColor: section.status === 'published' ? '#10B98120' : '#F59E0B20',
                          color: section.status === 'published' ? '#10B981' : '#F59E0B',
                          border: `1px solid ${section.status === 'published' ? '#10B98140' : '#F59E0B40'}`,
                          fontSize: '11px',
                          fontWeight: 600
                        }}
                      >
                        {section.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: tc.textSecondary }}>
                      Updated {section.updated} · {section.editor}
                    </div>
                    {section.subsections > 1 && (
                      <div style={{ fontSize: '11px', color: tc.accentPrimary, marginTop: '4px' }}>
                        {section.subsections} commentaries
                      </div>
                    )}
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
                  {section.subsections > 1 && (
                    <div className="flex gap-2 mb-4">
                      {[1, 2].map(num => (
                        <button
                          key={num}
                          onClick={() => setSelectedSubSection(num)}
                          className="px-3 py-1.5 rounded transition-all"
                          style={{
                            backgroundColor: selectedSubSection === num ? tc.accentPrimary : 'transparent',
                            color: selectedSubSection === num ? '#FFFFFF' : tc.textSecondary,
                            border: `1px solid ${selectedSubSection === num ? tc.accentPrimary : tc.borderPrimary}`,
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          Commentary {num}
                        </button>
                      ))}
                    </div>
                  )}
                  <textarea
                    placeholder="Enter Aegis commentary..."
                    value={commentaries[getCommentaryKey(section.id, section.subsections > 1 ? selectedSubSection : undefined)] || ''}
                    onChange={e => setCommentaries({
                      ...commentaries,
                      [getCommentaryKey(section.id, section.subsections > 1 ? selectedSubSection : undefined)]: e.target.value
                    })}
                    rows={12}
                    style={{
                      width: '100%', padding: '12px',
                      backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
                      border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                      color: tc.textPrimary, fontSize: '14px', outline: 'none', resize: 'vertical'
                    }}
                  />
                  <div className="flex gap-3 mt-4">
                    <button
                      className="px-6 py-2.5 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#0891B2', color: '#FFFFFF', border: 'none',
                        fontSize: '14px', fontWeight: 600, cursor: 'pointer'
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0E7490'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0891B2'}
                    >
                      Publish
                    </button>
                    <button
                      className="px-6 py-2.5 rounded-lg transition-all"
                      style={{
                        backgroundColor: 'transparent', color: tc.textSecondary,
                        border: `1px solid ${tc.borderPrimary}`,
                        fontSize: '14px', fontWeight: 600, cursor: 'pointer'
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#0F1A2A' : '#F3F4F6'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      Save Draft
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
      <h2 style={{ fontSize: '18px', fontWeight: 600, color: tc.textPrimary, marginBottom: '16px' }}>
        Chart Uploads (4 Slots)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          'Debt/EBITDA Waterfall',
          'Revenue & YoY Growth',
          'Net Sales by Segment',
          'EBITDA % by Segment'
        ].map((label, i) => (
          <div
            key={i}
            className="aspect-video rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer hover:opacity-80 transition-opacity"
            style={{
              backgroundColor: theme === 'dark' ? '#0F1A2A' : '#F9FAFB',
              border: `2px dashed ${tc.borderPrimary}`
            }}
          >
            <Image className="w-8 h-8 mb-3" style={{ color: tc.textTertiary }} />
            <p style={{ fontSize: '14px', fontWeight: 600, color: tc.textPrimary, marginBottom: '4px' }}>
              {label}
            </p>
            <p style={{ fontSize: '12px', color: tc.textSecondary }}>Click to upload chart</p>
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
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: tc.textPrimary, marginBottom: '12px' }}>
          Top Priorities
        </h3>
        <textarea
          placeholder="Enter priorities (one per line)..."
          rows={6}
          style={{
            width: '100%', padding: '12px', marginBottom: '24px',
            backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
            border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
            color: tc.textPrimary, fontSize: '14px', outline: 'none', resize: 'vertical'
          }}
        />
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: tc.textPrimary, marginBottom: '12px' }}>
          Key Events
        </h3>
        <textarea
          placeholder="Enter key events (one per line)..."
          rows={6}
          style={{
            width: '100%', padding: '12px',
            backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
            border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
            color: tc.textPrimary, fontSize: '14px', outline: 'none', resize: 'vertical'
          }}
        />
        <button
          className="mt-4 px-6 py-2.5 rounded-lg transition-all"
          style={{
            backgroundColor: '#0891B2', color: '#FFFFFF', border: 'none',
            fontSize: '14px', fontWeight: 600, cursor: 'pointer'
          }}
        >
          Save Changes
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
      id: 'regulatory',
      label: 'Regulatory',
      status: 'published',
      updated: '4h ago',
      editor: 'Alex Torres',
    },
    {
      id: 'geopolitical',
      label: 'Geopolitical',
      status: 'published',
      updated: '1d ago',
      editor: 'Alex Torres',
    },
    {
      id: 'policy',
      label: 'Policy',
      status: 'published',
      updated: '2d ago',
      editor: 'Alex Torres',
    },
  ];

  const handleSubsectionClick = (subsectionId: string) => {
    setExpandedSubsection(expandedSubsection === subsectionId ? null : subsectionId);
  };

  return (
    <div className="max-w-4xl">
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: tc.textSecondary, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Sector News Subsections
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
                  backgroundColor: isExpanded ? (theme === 'dark' ? '#0F1A2A' : '#F0F9FF') : tc.bgSecondary,
                  border: isExpanded ? `1px solid ${tc.accentPrimary}` : `1px solid ${tc.borderPrimary}`,
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  if (!isExpanded) {
                    e.currentTarget.style.backgroundColor = theme === 'dark' ? '#1A2332' : '#F9FAFB';
                  }
                }}
                onMouseLeave={e => {
                  if (!isExpanded) {
                    e.currentTarget.style.backgroundColor = tc.bgSecondary;
                  }
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span style={{ fontSize: '14px', fontWeight: 600, color: tc.textPrimary }}>
                        {subsection.label}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded text-xs"
                        style={{
                          backgroundColor: subsection.status === 'published' ? '#10B98120' : '#F59E0B20',
                          color: subsection.status === 'published' ? '#10B981' : '#F59E0B',
                          border: `1px solid ${subsection.status === 'published' ? '#10B98140' : '#F59E0B40'}`,
                          fontSize: '11px',
                          fontWeight: 600
                        }}
                      >
                        {subsection.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: tc.textSecondary }}>
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
                    placeholder="Enter sector news content..."
                    value={newsContents[subsection.id] || ''}
                    onChange={e => setNewsContents({
                      ...newsContents,
                      [subsection.id]: e.target.value
                    })}
                    rows={12}
                    style={{
                      width: '100%', padding: '12px',
                      backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
                      border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                      color: tc.textPrimary, fontSize: '14px', outline: 'none', resize: 'vertical'
                    }}
                  />
                  <div className="flex gap-3 mt-4">
                    <button
                      className="px-6 py-2.5 rounded-lg transition-all"
                      style={{
                        backgroundColor: '#0891B2', color: '#FFFFFF', border: 'none',
                        fontSize: '14px', fontWeight: 600, cursor: 'pointer'
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0E7490'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0891B2'}
                    >
                      Publish
                    </button>
                    <button
                      className="px-6 py-2.5 rounded-lg transition-all"
                      style={{
                        backgroundColor: 'transparent', color: tc.textSecondary,
                        border: `1px solid ${tc.borderPrimary}`,
                        fontSize: '14px', fontWeight: 600, cursor: 'pointer'
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#0F1A2A' : '#F3F4F6'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      Save Draft
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
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: tc.textPrimary, marginBottom: '12px' }}>
          Market Trends Content
        </h3>
        <textarea
          placeholder="Enter market trends content..."
          rows={12}
          style={{
            width: '100%', padding: '12px',
            backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
            border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
            color: tc.textPrimary, fontSize: '14px', outline: 'none', resize: 'vertical'
          }}
        />
        <button
          className="mt-4 px-6 py-2.5 rounded-lg transition-all"
          style={{
            backgroundColor: '#0891B2', color: '#FFFFFF', border: 'none',
            fontSize: '14px', fontWeight: 600, cursor: 'pointer'
          }}
        >
          Publish
        </button>
      </div>
    </div>
  );
}
