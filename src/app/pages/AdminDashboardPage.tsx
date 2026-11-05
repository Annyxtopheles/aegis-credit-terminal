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
        <h1 className="text-xl font-bold text-zinc-100 tracking-tight">
          KESSLER FDO Command Console
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Orbital Shell Provisioning, TLE/CDM Ephemeris Ingest & Crew Clearance Management
        </p>
      </div>

      {/* Modern Horizontal Tab Navigation */}
      <div className="p-1.5 rounded-2xl bg-[#1F2024] border border-[#2A2C32] flex items-center gap-1 overflow-x-auto no-scrollbar">
        {ADMIN_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white text-zinc-950 font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab View */}
      <div className="transition-all duration-200">
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
  const [form, setForm] = useState({ name: '', description: '', email: '' });
  const [saved, setSaved] = useState(false);

  const handleCreate = () => {
    if (!form.name.trim()) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    setForm({ name: '', description: '', email: '' });
  };

  return (
    <div className="max-w-3xl rounded-2xl bg-[#1F2024] border border-[#2A2C32] p-6 space-y-5">
      <div>
        <h2 className="text-base font-semibold text-zinc-100 tracking-tight">
          Provision New Orbital Shell
        </h2>
        <p className="text-xs text-zinc-400 mt-0.5">
          Configure a constellation regime, altitude parameters, and target inclination
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5">
            Constellation Shell Designator *
          </label>
          <input
            type="text"
            placeholder="e.g. Vanguard Polar Shell-3 (810 km // 86.4°)"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full h-10 px-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5">
            Orbital Regime & Ephemeris Parameters
          </label>
          <textarea
            placeholder="Target apogee/perigee km, inclination °, RAAN spacing, Hall-effect Xenon reserve SLA..."
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="w-full p-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs placeholder-zinc-500 focus:outline-none focus:border-indigo-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5">
            Lead Flight Director Callsign *
          </label>
          <input
            type="email"
            placeholder="fdo-lead@vanguard.space"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full h-10 px-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="pt-2">
          <button
            onClick={handleCreate}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-colors"
          >
            {saved ? 'Orbital Shell Provisioned ✓' : 'Initialize Orbital Shell'}
          </button>
        </div>
      </div>
    </div>
  );
}

function UserManagementTab() {
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
    <div className="rounded-2xl bg-[#1F2024] border border-[#2A2C32] overflow-hidden space-y-4">
      <div className="p-5 border-b border-[#2A2C32] flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-zinc-100 tracking-tight">
            Flight Dynamics Crew & Clearance Roster
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Manage operators across all active constellation shells
          </p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 h-9 px-4 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-semibold tracking-tight transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Authorize Crew Member
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#2A2C32] text-zinc-400 font-medium">
              <th className="py-3 px-5">Operator</th>
              <th className="py-3 px-5">Assigned Shell</th>
              <th className="py-3 px-5">Clearance Tier</th>
              <th className="py-3 px-5">Status</th>
              <th className="py-3 px-5">Last Telemetry Sync</th>
              <th className="py-3 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2C32]">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-zinc-800/20 transition-colors">
                <td className="py-3.5 px-5">
                  <div className="font-semibold text-zinc-100">{u.name}</div>
                  <div className="text-[11px] text-zinc-400">{u.email}</div>
                </td>
                <td className="py-3.5 px-5 text-zinc-300 font-medium">
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
                <td className="py-3.5 px-5 text-zinc-400 text-[11px]">
                  {u.lastActive || '—'}
                </td>
                <td className="py-3.5 px-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setEditingUser({ ...u })}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-zinc-800/40 transition-colors"
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
          <div className="w-full max-w-md rounded-2xl bg-[#1F2024] border border-[#2A2C32] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A2C32]">
              <h3 className="text-base font-semibold text-zinc-100">Authorize Flight Crew</h3>
              <button onClick={() => setShowInviteModal(false)} className="text-zinc-400 hover:text-zinc-100">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Operator Name</label>
                <input
                  type="text"
                  placeholder="e.g. Lt. John Smith"
                  value={inviteForm.name}
                  onChange={e => setInviteForm({ ...inviteForm, name: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Operator Callsign</label>
                <input
                  type="email"
                  placeholder="j.smith@vanguard.space"
                  value={inviteForm.email}
                  onChange={e => setInviteForm({ ...inviteForm, email: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Orbital Shell</label>
                <select
                  value={inviteForm.company}
                  onChange={e => setInviteForm({ ...inviteForm, company: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="vgd-s1">Vanguard LEO Shell-1</option>
                  <option value="vgd-s2">Vanguard SSO Shell-2</option>
                  <option value="vgd-vleo">Vanguard VLEO Recon</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Clearance Tier</label>
                <select
                  value={inviteForm.role}
                  onChange={e => setInviteForm({ ...inviteForm, role: e.target.value as any })}
                  className="w-full h-10 px-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="normal_user">Orbital Analyst</option>
                  <option value="company_admin">Constellation Lead</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-[#2A2C32]">
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-200"
              >
                Cancel
              </button>
              <button
                onClick={handleInvite}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200"
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

function DataUploadTab() {
  return (
    <div className="max-w-2xl rounded-2xl bg-[#1F2024] border border-[#2A2C32] p-8 text-center space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
        <Upload className="w-6 h-6" />
      </div>
      <div>
        <h2 className="text-base font-semibold text-zinc-100 tracking-tight">
          Ingest Two-Line Element (TLE) & CCSDS CDM Batch
        </h2>
        <p className="text-xs text-zinc-400 mt-1 max-w-md mx-auto">
          Upload 18th SDS Spacetrack <code className="text-indigo-400">.tle</code>, <code className="text-indigo-400">.omm</code>, or <code className="text-indigo-400">.cdm</code> covariance files. SGP4 propagation runs automatically.
        </p>
      </div>
      <button className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-colors">
        Select TLE / CDM File
      </button>
    </div>
  );
}

function CommentaryEditorTab() {
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
          <div key={section.id} className="rounded-2xl bg-[#1F2024] border border-[#2A2C32] overflow-hidden">
            <button
              onClick={() => setExpandedSection(isExpanded ? null : section.id)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-zinc-800/20 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-zinc-100">{section.label}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${section.status === 'published' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20'}`}>
                    {section.status === 'published' ? 'Live' : 'Draft'}
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400 mt-0.5">Updated {section.updated}</div>
              </div>
              <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
            {isExpanded && (
              <div className="p-4 border-t border-[#2A2C32] space-y-3 bg-[#16171A]">
                <textarea
                  rows={6}
                  placeholder="Enter Flight Dynamics telemetry log entry..."
                  value={commentaries[section.id] || ''}
                  onChange={e => setCommentaries({ ...commentaries, [section.id]: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-[#1F2024] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500 resize-none"
                />
                <button className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-colors">
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

function ImageUploadsTab() {
  const slots = [
    { label: 'B-Plane Conjunction Ellipsoid Contour', desc: 'Conjunction covariance geometry plot' },
    { label: 'Xenon Hall-Effect Propellant Depletion Curve', desc: 'Thruster propellant lifetime ledger' },
    { label: 'S-Band / Optical ISL Link Margin Waterfall', desc: 'Cross-link attenuation curve' },
    { label: 'Thermospheric Drag F10.7 Correlation Plot', desc: 'Solar flux vs altitude decay matrix' }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-semibold text-zinc-100">
          Radar Covariance & B-Plane Plot Uploads
        </h2>
        <p className="text-xs text-zinc-400 mt-0.5">Click any slot to upload radar plots (SVG or PNG)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {slots.map((s, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-[#1F2024] border border-dashed border-[#2A2C32] hover:border-indigo-500/50 p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#282A2F] group-hover:bg-indigo-500/10 text-zinc-400 group-hover:text-indigo-400 flex items-center justify-center mb-3 transition-colors">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold text-zinc-100">{s.label}</div>
            <div className="text-[11px] text-zinc-400 mt-1">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrioritiesEventsTab() {
  return (
    <div className="max-w-3xl rounded-2xl bg-[#1F2024] border border-[#2A2C32] p-6 space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-zinc-100 mb-1.5">Flight Director Directives</h3>
        <textarea
          rows={5}
          placeholder="Enter active CAM directives and orbital trim orders (one per line)..."
          className="w-full p-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500 resize-none"
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-zinc-100 mb-1.5">Upcoming Ground Station AOS & Thruster Burn Windows</h3>
        <textarea
          rows={5}
          placeholder="Enter scheduled AOS passes and maneuver epochs (one per line)..."
          className="w-full p-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500 resize-none"
        />
      </div>

      <button className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-colors">
        Commit Flight Plan
      </button>
    </div>
  );
}

function SectorNewsEditorTab() {
  const [expanded, setExpanded] = useState<string | null>('solar-weather');
  const subsections = [
    { id: 'solar-weather', label: 'NOAA SWPC Solar & Geomagnetic Advisories' },
    { id: 'catalog-bulletins', label: '18th SDS & LeoLabs Conjunction Bulletins' },
    { id: 'fcc-esa-policy', label: 'FCC / ESA Orbital Sustainability Directives' }
  ];

  return (
    <div className="max-w-4xl space-y-3">
      {subsections.map(sub => (
        <div key={sub.id} className="rounded-2xl bg-[#1F2024] border border-[#2A2C32] overflow-hidden">
          <button
            onClick={() => setExpanded(expanded === sub.id ? null : sub.id)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-zinc-800/20"
          >
            <span className="text-sm font-semibold text-zinc-100">{sub.label}</span>
            <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${expanded === sub.id ? 'rotate-180' : ''}`} />
          </button>
          {expanded === sub.id && (
            <div className="p-4 border-t border-[#2A2C32] space-y-3 bg-[#16171A]">
              <textarea
                rows={5}
                placeholder="Enter space weather bulletin..."
                className="w-full p-3.5 rounded-xl bg-[#1F2024] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500 resize-none"
              />
              <button className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-colors">
                Publish Bulletin
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function MarketTrendsEditorTab() {
  return (
    <div className="max-w-3xl rounded-2xl bg-[#1F2024] border border-[#2A2C32] p-6 space-y-4">
      <div>
        <h3 className="text-base font-semibold text-zinc-100">
          Autonomous CAM & Covariance Protocol Specification
        </h3>
        <p className="text-xs text-zinc-400 mt-0.5">
          Enter updated differential drag and Hall-effect collision avoidance maneuver thresholds
        </p>
      </div>

      <textarea
        rows={8}
        placeholder="Enter updated differential drag and Hall-effect collision avoidance maneuver thresholds..."
        className="w-full p-3.5 rounded-xl bg-[#16171A] border border-[#2A2C32] text-zinc-100 text-xs focus:outline-none focus:border-indigo-500 resize-none"
      />

      <button className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-colors">
        Update CAM Protocol
      </button>
    </div>
  );
}
