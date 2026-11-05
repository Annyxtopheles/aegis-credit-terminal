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
              className="p-5 rounded-2xl bg-[#1F2024] border border-[#2A2C32] flex flex-col justify-between hover:border-zinc-700/60 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-400">{kpi.label}</span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border border-indigo-500/20 text-indigo-400 bg-indigo-500/10">
                  {kpi.badge}
                </span>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-bold font-mono text-zinc-100 tracking-tight">
                  {kpi.value}
                </div>
                <div className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
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
            <h2 className="text-[16px] font-semibold text-zinc-100 tracking-tight">
              Flight Dynamics Crew Roster
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Authorized orbital analysts and flight directors for Vanguard LEO Shell-1
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search operator..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-xl text-xs bg-[#16171A] text-zinc-100 border border-[#2A2C32] placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center gap-2 h-9 px-4 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-semibold tracking-tight transition-colors shrink-0"
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
              <tr className="border-b text-zinc-400 font-medium" style={{ borderColor: tc.borderPrimary }}>
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
                  <tr key={user.id} className="hover:bg-zinc-800/20 transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-semibold text-xs shrink-0">
                          {initials}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-zinc-100">{user.name}</div>
                          <div className="text-zinc-400 font-mono text-[11px] mt-0.5">{user.email}</div>
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
                    <td className="py-4 px-5 font-mono text-zinc-400 text-[11px]">
                      {user.lastActive || '—'}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingUser({ ...user })}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40 transition-colors"
                          title="Edit operator"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-zinc-800/40 transition-colors"
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
          <div className="w-full max-w-md rounded-2xl bg-[#1F2024] border border-[#2A2C32] p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A2C32]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-zinc-100">Authorize Operator</h3>
                  <p className="text-xs text-zinc-400">Provision console access for Vanguard LEO Shell-1</p>
                </div>
              </div>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-zinc-400 hover:text-zinc-100 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#16171A] border border-[#2A2C32] flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-zinc-200">Encrypted Clearance Link</p>
                <p className="text-[11px] text-zinc-400">Share via authenticated FDO channel</p>
              </div>
              <button
                onClick={handleCopyInviteLink}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#282A2F] hover:bg-zinc-700 text-xs font-medium text-zinc-200 border border-zinc-700/50 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Operator Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Lt. John Smith"
                  value={inviteForm.name}
                  onChange={e => setInviteForm({ ...inviteForm, name: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Callsign / Email</label>
                <input
                  type="email"
                  placeholder="j.smith@vanguard.space"
                  value={inviteForm.email}
                  onChange={e => setInviteForm({ ...inviteForm, email: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Clearance Tier</label>
                <select
                  value={inviteForm.role}
                  onChange={e => setInviteForm({ ...inviteForm, role: e.target.value as any })}
                  className="w-full h-10 px-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="normal_user">Orbital Analyst (Telemetry Read-Only)</option>
                  <option value="company_admin">Constellation Lead (Thruster Fire Clearance)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#2A2C32]">
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleInvite}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-colors"
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
          <div className="w-full max-w-md rounded-2xl bg-[#1F2024] border border-[#2A2C32] p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A2C32]">
              <div>
                <h3 className="text-base font-semibold text-zinc-100">Edit Operator</h3>
                <p className="text-xs text-zinc-400">Update operator status & clearance</p>
              </div>
              <button onClick={() => setEditingUser(null)} className="text-zinc-400 hover:text-zinc-100 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Operator Name</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={e => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Status</label>
                <select
                  value={editingUser.status}
                  onChange={e => setEditingUser({ ...editingUser, status: e.target.value as any })}
                  className="w-full h-10 px-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="active">Nominal (Active)</option>
                  <option value="pending">Pending Clearance</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#2A2C32]">
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-colors"
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
