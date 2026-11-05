import { useState } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Edit2,
  Trash2,
  X,
  Copy,
  Check,
  ChevronDown,
  Orbit,
  Users,
  Terminal,
  FileUp,
  Flame,
  Radio,
  Sliders,
  Plus
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { useLocation, useNavigate } from 'react-router';

const ADMIN_TABS = [
  { id: 'onboarding', label: 'Shell Provision', icon: Orbit },
  { id: 'users', label: 'Crew Roster', icon: Users },
  { id: 'data-upload', label: 'TLE Ingest', icon: FileUp },
  { id: 'commentary', label: 'Telemetry Log', icon: Terminal },
  { id: 'images', label: 'Plot Uploads', icon: ImageIcon },
  { id: 'priorities', label: 'Directives', icon: Flame },
  { id: 'sector-news', label: 'Weather Feeds', icon: Radio },
  { id: 'market-trends', label: 'Protocols', icon: Sliders },
];

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

  const handleTabChange = (tabId: string) => {
    navigate(`/admin?tab=${tabId}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight" style={{ color: tc.textPrimary }}>
          KESSLER FDO Command Console
        </h1>
        <p className="text-xs mt-1" style={{ color: tc.textSecondary }}>
          Orbital Shell Provisioning, TLE/CDM Ephemeris Ingest & Crew Clearance Management
        </p>
      </div>

      {/* Modern Horizontal Tab Navigation */}
      <div
        className="p-1.5 rounded-2xl flex items-center gap-1 overflow-x-auto no-scrollbar"
        style={{
          backgroundColor: tc.bgSecondary,
          border: `1px solid ${tc.borderPrimary}`
        }}
      >
        {ADMIN_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer"
              style={{
                backgroundColor: isActive ? (theme === 'dark' ? '#FFFFFF' : '#18181B') : 'transparent',
                color: isActive ? (theme === 'dark' ? '#18181B' : '#FFFFFF') : tc.textSecondary,
                fontWeight: isActive ? 600 : 500
              }}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab View */}
      <div className="transition-all duration-200">
        {activeTab === 'onboarding' && <ShellProvisioningTab tc={tc} theme={theme} />}
        {activeTab === 'users' && <UserManagementTab tc={tc} theme={theme} />}
        {activeTab === 'commentary' && <CommentaryEditorTab tc={tc} theme={theme} />}
        {activeTab === 'data-upload' && <DataUploadTab tc={tc} theme={theme} />}
        {activeTab === 'images' && <ImageUploadsTab tc={tc} theme={theme} />}
        {activeTab === 'priorities' && <PrioritiesEventsTab tc={tc} theme={theme} />}
        {activeTab === 'sector-news' && <SectorNewsEditorTab tc={tc} theme={theme} />}
        {activeTab === 'market-trends' && <MarketTrendsEditorTab tc={tc} theme={theme} />}
      </div>
    </div>
  );
}

function ShellProvisioningTab({ tc, theme }: { tc: any; theme: string }) {
  const [form, setForm] = useState({ name: '', description: '', email: '' });
  const [saved, setSaved] = useState(false);

  const handleCreate = () => {
    if (!form.name.trim()) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    setForm({ name: '', description: '', email: '' });
  };

  return (
    <div
      className="max-w-3xl rounded-2xl p-6 space-y-5"
      style={{
        backgroundColor: tc.bgSecondary,
        border: `1px solid ${tc.borderPrimary}`
      }}
    >
      <div>
        <h2 className="text-base font-semibold tracking-tight" style={{ color: tc.textPrimary }}>
          Provision New Orbital Shell
        </h2>
        <p className="text-xs mt-0.5" style={{ color: tc.textSecondary }}>
          Configure a constellation regime, altitude parameters, and target inclination
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: tc.textSecondary }}>
            Constellation Shell Designator *
          </label>
          <input
            type="text"
            placeholder="e.g. Vanguard Polar Shell-3 (810 km // 86.4°)"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
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
            Orbital Regime & Ephemeris Parameters
          </label>
          <textarea
            placeholder="Target apogee/perigee km, inclination °, RAAN spacing, Hall-effect Xenon reserve SLA..."
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="w-full p-3.5 rounded-xl text-xs focus:outline-none resize-none transition-colors"
            style={{
              backgroundColor: tc.bgTertiary,
              border: `1px solid ${tc.borderPrimary}`,
              color: tc.textPrimary
            }}
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: tc.textSecondary }}>
            Lead Flight Director Callsign *
          </label>
          <input
            type="email"
            placeholder="fdo-lead@vanguard.space"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full h-10 px-3.5 rounded-xl text-xs focus:outline-none transition-colors"
            style={{
              backgroundColor: tc.bgTertiary,
              border: `1px solid ${tc.borderPrimary}`,
              color: tc.textPrimary
            }}
          />
        </div>

        <div className="pt-2">
          <button
            onClick={handleCreate}
            className="px-5 py-2.5 rounded-xl font-semibold text-xs tracking-tight transition-colors cursor-pointer"
            style={{
              backgroundColor: theme === 'dark' ? '#FFFFFF' : '#18181B',
              color: theme === 'dark' ? '#18181B' : '#FFFFFF'
            }}
          >
            {saved ? 'Orbital Shell Provisioned ✓' : 'Initialize Orbital Shell'}
          </button>
        </div>
      </div>
    </div>
  );
}

function UserManagementTab({ tc, theme }: { tc: any; theme: string }) {
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

  return (
    <div
      className="rounded-2xl overflow-hidden space-y-4"
      style={{
        backgroundColor: tc.bgSecondary,
        border: `1px solid ${tc.borderPrimary}`
      }}
    >
      <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: tc.borderPrimary }}>
        <div>
          <h2 className="text-base font-semibold tracking-tight" style={{ color: tc.textPrimary }}>
            Flight Dynamics Crew & Clearance Roster
          </h2>
          <p className="text-xs mt-0.5" style={{ color: tc.textSecondary }}>
            Manage operators across all active constellation shells
          </p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 h-9 px-4 rounded-xl text-xs font-semibold tracking-tight transition-colors cursor-pointer"
          style={{
            backgroundColor: theme === 'dark' ? '#FFFFFF' : '#18181B',
            color: theme === 'dark' ? '#18181B' : '#FFFFFF'
          }}
        >
          <Plus className="w-3.5 h-3.5" />
          Authorize Crew Member
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b font-medium" style={{ borderColor: tc.borderPrimary, color: tc.textSecondary }}>
              <th className="py-3 px-5">Operator</th>
              <th className="py-3 px-5">Assigned Shell</th>
              <th className="py-3 px-5">Clearance Tier</th>
              <th className="py-3 px-5">Status</th>
              <th className="py-3 px-5">Last Telemetry Sync</th>
              <th className="py-3 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: tc.borderPrimary }}>
            {users.map((u) => (
              <tr key={u.id} className="transition-colors">
                <td className="py-3.5 px-5">
                  <div className="font-semibold" style={{ color: tc.textPrimary }}>{u.name}</div>
                  <div className="text-[11px]" style={{ color: tc.textSecondary }}>{u.email}</div>
                </td>
                <td className="py-3.5 px-5 font-medium" style={{ color: tc.textPrimary }}>
                  {u.company}
                </td>
                <td className="py-3.5 px-5">
                  <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {u.role === 'company_admin' ? 'Constellation Lead' : 'Orbital Analyst'}
                  </span>
                </td>
                <td className="py-3.5 px-5">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                      u.status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}
                  >
                    {u.status === 'active' ? 'Nominal' : 'Pending'}
                  </span>
                </td>
                <td className="py-3.5 px-5 text-[11px]" style={{ color: tc.textSecondary }}>
                  {u.lastActive || '—'}
                </td>
                <td className="py-3.5 px-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setEditingUser({ ...u })}
                      className="p-1.5 rounded-lg transition-colors cursor-pointer"
                      style={{ color: tc.textTertiary }}
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="p-1.5 rounded-lg transition-colors cursor-pointer hover:text-rose-500"
                      style={{ color: tc.textTertiary }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className="w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4"
            style={{
              backgroundColor: tc.bgSecondary,
              border: `1px solid ${tc.borderPrimary}`
            }}
          >
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: tc.borderPrimary }}>
              <h3 className="text-base font-semibold" style={{ color: tc.textPrimary }}>Authorize Flight Crew</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="cursor-pointer transition-colors"
                style={{ color: tc.textTertiary }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: tc.textSecondary }}>Operator Name</label>
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
                <label className="block text-xs font-medium mb-1" style={{ color: tc.textSecondary }}>Operator Callsign</label>
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
                <label className="block text-xs font-medium mb-1" style={{ color: tc.textSecondary }}>Orbital Shell</label>
                <select
                  value={inviteForm.company}
                  onChange={e => setInviteForm({ ...inviteForm, company: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-xl text-xs focus:outline-none cursor-pointer transition-colors"
                  style={{
                    backgroundColor: tc.bgTertiary,
                    border: `1px solid ${tc.borderPrimary}`,
                    color: tc.textPrimary
                  }}
                >
                  <option value="vgd-s1">Vanguard LEO Shell-1</option>
                  <option value="vgd-s2">Vanguard SSO Shell-2</option>
                  <option value="vgd-vleo">Vanguard VLEO Recon</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: tc.textSecondary }}>Clearance Tier</label>
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
                  <option value="normal_user">Orbital Analyst</option>
                  <option value="company_admin">Constellation Lead</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t" style={{ borderColor: tc.borderPrimary }}>
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
    </div>
  );
}

function DataUploadTab({ tc, theme }: { tc: any; theme: string }) {
  return (
    <div
      className="max-w-2xl rounded-2xl p-8 text-center space-y-4"
      style={{
        backgroundColor: tc.bgSecondary,
        border: `1px solid ${tc.borderPrimary}`
      }}
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto"
        style={{
          backgroundColor: `${tc.accentPrimary}15`,
          border: `1px solid ${tc.accentPrimary}35`,
          color: tc.accentPrimary
        }}
      >
        <Upload className="w-6 h-6" />
      </div>
      <div>
        <h2 className="text-base font-semibold tracking-tight" style={{ color: tc.textPrimary }}>
          Ingest Two-Line Element (TLE) & CCSDS CDM Batch
        </h2>
        <p className="text-xs mt-1 max-w-md mx-auto" style={{ color: tc.textSecondary }}>
          Upload 18th SDS Spacetrack <code style={{ color: tc.accentPrimary }}>.tle</code>, <code style={{ color: tc.accentPrimary }}>.omm</code>, or <code style={{ color: tc.accentPrimary }}>.cdm</code> covariance files. SGP4 propagation runs automatically.
        </p>
      </div>
      <button
        className="px-5 py-2.5 rounded-xl font-semibold text-xs tracking-tight transition-colors cursor-pointer"
        style={{
          backgroundColor: theme === 'dark' ? '#FFFFFF' : '#18181B',
          color: theme === 'dark' ? '#18181B' : '#FFFFFF'
        }}
      >
        Select TLE / CDM File
      </button>
    </div>
  );
}

function CommentaryEditorTab({ tc, theme }: { tc: any; theme: string }) {
  const [expandedSection, setExpandedSection] = useState<string | null>('altitude-decay');
  const [commentaries, setCommentaries] = useState<Record<string, string>>({});

  const sections = [
    { id: 'altitude-decay', label: 'Orbital Altitude & Thermospheric Drag Log', status: 'published', updated: '18m ago' },
    { id: 'constellation-ephemeris', label: 'Constellation Ephemeris & Thruster ΔV Notes', status: 'published', updated: '1h ago' },
    { id: 'deorbit-compliance', label: 'FCC / ESA De-Orbit Reserve SLA Bulletins', status: 'draft', updated: '3h ago' },
  ];

  return (
    <div className="max-w-4xl space-y-3">
      {sections.map(section => {
        const isExpanded = expandedSection === section.id;
        return (
          <div
            key={section.id}
            className="rounded-2xl overflow-hidden transition-colors"
            style={{
              backgroundColor: tc.bgSecondary,
              border: `1px solid ${tc.borderPrimary}`
            }}
          >
            <button
              onClick={() => setExpandedSection(isExpanded ? null : section.id)}
              className="w-full p-4 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold" style={{ color: tc.textPrimary }}>{section.label}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${section.status === 'published' ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' : 'text-amber-500 bg-amber-500/10 border-amber-500/20'}`}>
                    {section.status === 'published' ? 'Live' : 'Draft'}
                  </span>
                </div>
                <div className="text-[11px] mt-0.5" style={{ color: tc.textSecondary }}>Updated {section.updated}</div>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                style={{ color: tc.textTertiary }}
              />
            </button>
            {isExpanded && (
              <div
                className="p-4 border-t space-y-3"
                style={{
                  backgroundColor: tc.bgTertiary,
                  borderColor: tc.borderPrimary
                }}
              >
                <textarea
                  rows={6}
                  placeholder="Enter Flight Dynamics telemetry log entry..."
                  value={commentaries[section.id] || ''}
                  onChange={e => setCommentaries({ ...commentaries, [section.id]: e.target.value })}
                  className="w-full p-3.5 rounded-xl text-xs focus:outline-none resize-none transition-colors"
                  style={{
                    backgroundColor: tc.bgSecondary,
                    border: `1px solid ${tc.borderPrimary}`,
                    color: tc.textPrimary
                  }}
                />
                <button
                  className="px-4 py-2 rounded-xl font-semibold text-xs tracking-tight transition-colors cursor-pointer"
                  style={{
                    backgroundColor: theme === 'dark' ? '#FFFFFF' : '#18181B',
                    color: theme === 'dark' ? '#18181B' : '#FFFFFF'
                  }}
                >
                  Broadcast to Console
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ImageUploadsTab({ tc, theme }: { tc: any; theme: string }) {
  const slots = [
    { label: 'B-Plane Conjunction Ellipsoid Contour', desc: 'Conjunction covariance geometry plot' },
    { label: 'Xenon Hall-Effect Propellant Depletion Curve', desc: 'Thruster propellant lifetime ledger' },
    { label: 'S-Band / Optical ISL Link Margin Waterfall', desc: 'Cross-link attenuation curve' },
    { label: 'Thermospheric Drag F10.7 Correlation Plot', desc: 'Solar flux vs altitude decay matrix' }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-semibold" style={{ color: tc.textPrimary }}>
          Radar Covariance & B-Plane Plot Uploads
        </h2>
        <p className="text-xs mt-0.5" style={{ color: tc.textSecondary }}>Click any slot to upload radar plots (SVG or PNG)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {slots.map((s, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-dashed p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 group"
            style={{
              backgroundColor: tc.bgSecondary,
              borderColor: tc.borderPrimary
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors"
              style={{
                backgroundColor: tc.bgTertiary,
                color: tc.textTertiary
              }}
            >
              <ImageIcon className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold" style={{ color: tc.textPrimary }}>{s.label}</div>
            <div className="text-[11px] mt-1" style={{ color: tc.textSecondary }}>{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrioritiesEventsTab({ tc, theme }: { tc: any; theme: string }) {
  return (
    <div
      className="max-w-3xl rounded-2xl p-6 space-y-5"
      style={{
        backgroundColor: tc.bgSecondary,
        border: `1px solid ${tc.borderPrimary}`
      }}
    >
      <div>
        <h3 className="text-sm font-semibold mb-1.5" style={{ color: tc.textPrimary }}>Flight Director Directives</h3>
        <textarea
          rows={5}
          placeholder="Enter active CAM directives and orbital trim orders (one per line)..."
          className="w-full p-3.5 rounded-xl text-xs focus:outline-none resize-none transition-colors"
          style={{
            backgroundColor: tc.bgTertiary,
            border: `1px solid ${tc.borderPrimary}`,
            color: tc.textPrimary
          }}
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-1.5" style={{ color: tc.textPrimary }}>Upcoming Ground Station AOS & Thruster Burn Windows</h3>
        <textarea
          rows={5}
          placeholder="Enter scheduled AOS passes and maneuver epochs (one per line)..."
          className="w-full p-3.5 rounded-xl text-xs focus:outline-none resize-none transition-colors"
          style={{
            backgroundColor: tc.bgTertiary,
            border: `1px solid ${tc.borderPrimary}`,
            color: tc.textPrimary
          }}
        />
      </div>

      <button
        className="px-5 py-2.5 rounded-xl font-semibold text-xs tracking-tight transition-colors cursor-pointer"
        style={{
          backgroundColor: theme === 'dark' ? '#FFFFFF' : '#18181B',
          color: theme === 'dark' ? '#18181B' : '#FFFFFF'
        }}
      >
        Commit Flight Plan
      </button>
    </div>
  );
}

function SectorNewsEditorTab({ tc, theme }: { tc: any; theme: string }) {
  const [expanded, setExpanded] = useState<string | null>('solar-weather');
  const subsections = [
    { id: 'solar-weather', label: 'NOAA SWPC Solar & Geomagnetic Advisories' },
    { id: 'catalog-bulletins', label: '18th SDS & LeoLabs Conjunction Bulletins' },
    { id: 'fcc-esa-policy', label: 'FCC / ESA Orbital Sustainability Directives' }
  ];

  return (
    <div className="max-w-4xl space-y-3">
      {subsections.map(sub => (
        <div
          key={sub.id}
          className="rounded-2xl overflow-hidden transition-colors"
          style={{
            backgroundColor: tc.bgSecondary,
            border: `1px solid ${tc.borderPrimary}`
          }}
        >
          <button
            onClick={() => setExpanded(expanded === sub.id ? null : sub.id)}
            className="w-full p-4 flex items-center justify-between text-left cursor-pointer transition-colors"
          >
            <span className="text-sm font-semibold" style={{ color: tc.textPrimary }}>{sub.label}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${expanded === sub.id ? 'rotate-180' : ''}`}
              style={{ color: tc.textTertiary }}
            />
          </button>
          {expanded === sub.id && (
            <div
              className="p-4 border-t space-y-3"
              style={{
                backgroundColor: tc.bgTertiary,
                borderColor: tc.borderPrimary
              }}
            >
              <textarea
                rows={5}
                placeholder="Enter space weather bulletin..."
                className="w-full p-3.5 rounded-xl text-xs focus:outline-none resize-none transition-colors"
                style={{
                  backgroundColor: tc.bgSecondary,
                  border: `1px solid ${tc.borderPrimary}`,
                  color: tc.textPrimary
                }}
              />
              <button
                className="px-4 py-2 rounded-xl font-semibold text-xs tracking-tight transition-colors cursor-pointer"
                style={{
                  backgroundColor: theme === 'dark' ? '#FFFFFF' : '#18181B',
                  color: theme === 'dark' ? '#18181B' : '#FFFFFF'
                }}
              >
                Publish Bulletin
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function MarketTrendsEditorTab({ tc, theme }: { tc: any; theme: string }) {
  return (
    <div
      className="max-w-3xl rounded-2xl p-6 space-y-4"
      style={{
        backgroundColor: tc.bgSecondary,
        border: `1px solid ${tc.borderPrimary}`
      }}
    >
      <div>
        <h3 className="text-base font-semibold" style={{ color: tc.textPrimary }}>
          Autonomous CAM & Covariance Protocol Specification
        </h3>
        <p className="text-xs mt-0.5" style={{ color: tc.textSecondary }}>
          Enter updated differential drag and Hall-effect collision avoidance maneuver thresholds
        </p>
      </div>

      <textarea
        rows={8}
        placeholder="Enter updated differential drag and Hall-effect collision avoidance maneuver thresholds..."
        className="w-full p-3.5 rounded-xl text-xs focus:outline-none resize-none transition-colors"
        style={{
          backgroundColor: tc.bgTertiary,
          border: `1px solid ${tc.borderPrimary}`,
          color: tc.textPrimary
        }}
      />

      <button
        className="px-5 py-2.5 rounded-xl font-semibold text-xs tracking-tight transition-colors cursor-pointer"
        style={{
          backgroundColor: theme === 'dark' ? '#FFFFFF' : '#18181B',
          color: theme === 'dark' ? '#18181B' : '#FFFFFF'
        }}
      >
        Update CAM Protocol
      </button>
    </div>
  );
}
