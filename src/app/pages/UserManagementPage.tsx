import { useState } from 'react';
import { Plus, Mail, Trash2, Edit2, X, Copy, Check, Users, ShieldCheck, UserCheck, Clock, Search } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');
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
    navigator.clipboard?.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const kpis = [
    {
      label: 'Authorized Flight Crew',
      value: `${users.length} Active`,
      subtext: 'Console clearance assigned',
      icon: Users,
      badge: 'Roster'
    },
    {
      label: 'Constellation Leads',
      value: `${users.filter(u => u.role === 'company_admin').length} Commander`,
      subtext: 'Full burn execution clearance',
      icon: ShieldCheck,
      badge: 'Level 1'
    },
    {
      label: 'Active Console Sessions',
      value: `${users.filter(u => u.status === 'active').length} Online`,
      subtext: 'Telemetry streaming live',
      icon: UserCheck,
      badge: 'Synchronized'
    },
    {
      label: 'Pending Clearances',
      value: `${users.filter(u => u.status === 'pending').length} Operator`,
      subtext: 'Awaiting cryptographic signature',
      icon: Clock,
      badge: 'Pending'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl flex flex-col justify-between transition-all duration-200"
              style={{
                backgroundColor: tc.bgSecondary,
                border: `1px solid ${tc.borderPrimary}`
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: tc.textSecondary }}>{kpi.label}</span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border border-indigo-500/20 text-indigo-400 bg-indigo-500/10">
                  {kpi.badge}
                </span>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-bold tracking-tight" style={{ color: tc.textPrimary }}>
                  {kpi.value}
                </div>
                <div className="text-xs mt-1 flex items-center gap-1.5" style={{ color: tc.textSecondary }}>
                  <Icon className="w-3.5 h-3.5" />
                  <span>{kpi.subtext}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Table Card */}
      <div
        className="rounded-2xl overflow-hidden border transition-colors duration-300"
        style={{
          backgroundColor: tc.bgSecondary,
          borderColor: tc.borderPrimary
        }}
      >
        {/* Table Controls */}
        <div className="p-5 border-b flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: tc.borderPrimary }}>
          <div>
            <h2 className="text-[16px] font-semibold tracking-tight" style={{ color: tc.textPrimary }}>
              Flight Dynamics Crew Roster
            </h2>
            <p className="text-xs mt-0.5" style={{ color: tc.textSecondary }}>
              Authorized orbital analysts and flight directors for Vanguard LEO Shell-1
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: tc.textTertiary }} />
              <input
                type="text"
                placeholder="Search operator..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-xl text-xs focus:outline-none transition-colors"
                style={{
                  backgroundColor: tc.bgTertiary,
                  color: tc.textPrimary,
                  border: `1px solid ${tc.borderPrimary}`
                }}
              />
            </div>
            <button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center gap-2 h-9 px-4 rounded-xl text-xs font-semibold tracking-tight transition-colors shrink-0 cursor-pointer"
              style={{
                backgroundColor: theme === 'dark' ? '#FFFFFF' : '#18181B',
                color: theme === 'dark' ? '#18181B' : '#FFFFFF'
              }}
            >
              <Plus className="w-4 h-4" />
              Authorize Operator
            </button>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b font-medium" style={{ borderColor: tc.borderPrimary, color: tc.textSecondary }}>
                <th className="py-3.5 px-5">Operator</th>
                <th className="py-3.5 px-5">Clearance Tier</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5">Last Telemetry Sync</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: tc.borderPrimary }}>
              {filteredUsers.map((user) => {
                const initials = user.name
                  .split(' ')
                  .map(p => p[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <tr key={user.id} className="transition-colors" style={{ backgroundColor: 'transparent' }}>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-semibold text-xs shrink-0">
                          {initials}
                        </div>
                        <div>
                          <div className="text-sm font-semibold" style={{ color: tc.textPrimary }}>{user.name}</div>
                          <div className="text-[11px] mt-0.5" style={{ color: tc.textSecondary }}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {user.role === 'company_admin' ? 'Constellation Lead' : 'Orbital Analyst'}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                          user.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}
                      >
                        {user.status === 'active' ? 'Nominal' : 'Pending Signature'}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-[11px]" style={{ color: tc.textSecondary }}>
                      {user.lastActive || '—'}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingUser({ ...user })}
                          className="p-1.5 rounded-lg transition-colors cursor-pointer"
                          style={{ color: tc.textTertiary }}
                          title="Edit operator"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1.5 rounded-lg transition-colors cursor-pointer hover:text-rose-500"
                          style={{ color: tc.textTertiary }}
                          title="Revoke clearance"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Authorize Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className="w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200"
            style={{
              backgroundColor: tc.bgSecondary,
              border: `1px solid ${tc.borderPrimary}`
            }}
          >
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: tc.borderPrimary }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold" style={{ color: tc.textPrimary }}>Authorize Operator</h3>
                  <p className="text-xs" style={{ color: tc.textSecondary }}>Provision console access for Vanguard LEO Shell-1</p>
                </div>
              </div>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-1 cursor-pointer transition-colors"
                style={{ color: tc.textTertiary }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              className="p-4 rounded-xl flex items-center justify-between gap-3"
              style={{
                backgroundColor: tc.bgTertiary,
                border: `1px solid ${tc.borderPrimary}`
              }}
            >
              <div>
                <p className="text-xs font-semibold" style={{ color: tc.textPrimary }}>Encrypted Clearance Link</p>
                <p className="text-[11px]" style={{ color: tc.textSecondary }}>Share via authenticated FDO channel</p>
              </div>
              <button
                onClick={handleCopyInviteLink}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                style={{
                  backgroundColor: tc.bgSecondary,
                  border: `1px solid ${tc.borderPrimary}`,
                  color: tc.textPrimary
                }}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: tc.textSecondary }}>Operator Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Lt. John Smith"
                  value={inviteForm.name}
                  onChange={e => setInviteForm({ ...inviteForm, name: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-xl text-xs focus:outline-none transition-colors"
                  style={{
                    backgroundColor: tc.bgTertiary,
                    border: `1px solid ${tc.borderPrimary}`,
                    color: tc.textPrimary
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: tc.textSecondary }}>Operator Callsign</label>
                <input
                  type="email"
                  placeholder="j.smith@vanguard.space"
                  value={inviteForm.email}
                  onChange={e => setInviteForm({ ...inviteForm, email: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-xl text-xs focus:outline-none transition-colors"
                  style={{
                    backgroundColor: tc.bgTertiary,
                    border: `1px solid ${tc.borderPrimary}`,
                    color: tc.textPrimary
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: tc.textSecondary }}>Clearance Tier</label>
                <select
                  value={inviteForm.role}
                  onChange={e => setInviteForm({ ...inviteForm, role: e.target.value as any })}
                  className="w-full h-10 px-3.5 rounded-xl text-xs focus:outline-none cursor-pointer transition-colors"
                  style={{
                    backgroundColor: tc.bgTertiary,
                    border: `1px solid ${tc.borderPrimary}`,
                    color: tc.textPrimary
                  }}
                >
                  <option value="normal_user">Orbital Analyst (Telemetry Read-Only)</option>
                  <option value="company_admin">Constellation Lead (Thruster Fire Clearance)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t" style={{ borderColor: tc.borderPrimary }}>
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer"
                style={{ color: tc.textSecondary }}
              >
                Cancel
              </button>
              <button
                onClick={handleInvite}
                className="px-4 py-2 rounded-xl text-xs font-semibold tracking-tight transition-colors cursor-pointer"
                style={{
                  backgroundColor: theme === 'dark' ? '#FFFFFF' : '#18181B',
                  color: theme === 'dark' ? '#18181B' : '#FFFFFF'
                }}
              >
                Issue Clearance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Operator Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className="w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-5"
            style={{
              backgroundColor: tc.bgSecondary,
              border: `1px solid ${tc.borderPrimary}`
            }}
          >
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: tc.borderPrimary }}>
              <div>
                <h3 className="text-base font-semibold" style={{ color: tc.textPrimary }}>Edit Operator</h3>
                <p className="text-xs" style={{ color: tc.textSecondary }}>Update operator status & clearance</p>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="p-1 cursor-pointer transition-colors"
                style={{ color: tc.textTertiary }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: tc.textSecondary }}>Operator Name</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={e => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-xl text-xs focus:outline-none transition-colors"
                  style={{
                    backgroundColor: tc.bgTertiary,
                    border: `1px solid ${tc.borderPrimary}`,
                    color: tc.textPrimary
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: tc.textSecondary }}>Operator Callsign</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-xl text-xs focus:outline-none transition-colors"
                  style={{
                    backgroundColor: tc.bgTertiary,
                    border: `1px solid ${tc.borderPrimary}`,
                    color: tc.textPrimary
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: tc.textSecondary }}>Status</label>
                <select
                  value={editingUser.status}
                  onChange={e => setEditingUser({ ...editingUser, status: e.target.value as any })}
                  className="w-full h-10 px-3.5 rounded-xl text-xs focus:outline-none cursor-pointer transition-colors"
                  style={{
                    backgroundColor: tc.bgTertiary,
                    border: `1px solid ${tc.borderPrimary}`,
                    color: tc.textPrimary
                  }}
                >
                  <option value="active">Nominal (Active)</option>
                  <option value="pending">Pending Clearance</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t" style={{ borderColor: tc.borderPrimary }}>
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer"
                style={{ color: tc.textSecondary }}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                className="px-4 py-2 rounded-xl text-xs font-semibold tracking-tight transition-colors cursor-pointer"
                style={{
                  backgroundColor: theme === 'dark' ? '#FFFFFF' : '#18181B',
                  color: theme === 'dark' ? '#18181B' : '#FFFFFF'
                }}
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
