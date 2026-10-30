import { useState, useRef, useEffect } from 'react';
import {
  Orbit,
  Users,
  BarChart3,
  Settings,
  LogOut,
  LayoutDashboard,
  Activity,
  MessageSquare,
  ListTodo,
  Newspaper,
  TrendingUp,
  Shield,
  Image,
  Upload,
  Sun,
  Moon,
  ChevronDown,
  Search,
  Clock,
  Eye,
  Radar,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useSidebar } from '../context/SidebarContext';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { useNavigate, useLocation } from 'react-router';

const RECENT_SHELLS = [
  { ticker: 'VGD-S1', name: 'Vanguard LEO Shell-1', details: '550 km // 53.0° Shell' },
  { ticker: 'VGD-S2', name: 'Vanguard SSO Shell-2', details: '720 km // 98.2° SSO' },
  { ticker: 'VGD-VLEO', name: 'Vanguard VLEO Recon', details: '380 km // 45.0° Shell' },
];

interface NavItem {
  id: string;
  code: string;
  label: string;
  icon: any;
  path?: string;
}

function getNavItems(role?: string, viewMode?: 'admin' | 'preview'): NavItem[] {
  if (role === 'super_admin' && viewMode === 'admin') {
    return [
      { id: 'onboarding', code: 'FDO-01', label: 'Shell Provision', icon: Orbit, path: '/admin?tab=onboarding' },
      { id: 'users', code: 'FDO-02', label: 'Flight Crew Roster', icon: Users, path: '/admin?tab=users' },
      { id: 'commentary', code: 'FDO-03', label: 'Telemetry Log', icon: MessageSquare, path: '/admin?tab=commentary' },
      { id: 'data-upload', code: 'FDO-04', label: 'TLE / CDM Ingest', icon: Upload, path: '/admin?tab=data-upload' },
      { id: 'images', code: 'FDO-05', label: 'B-Plane Plot Upload', icon: Image, path: '/admin?tab=images' },
      { id: 'priorities', code: 'FDO-06', label: 'Flight Directives', icon: ListTodo, path: '/admin?tab=priorities' },
      { id: 'sector-news', code: 'FDO-07', label: 'SWPC Weather Feeds', icon: Newspaper, path: '/admin?tab=sector-news' },
      { id: 'market-trends', code: 'FDO-08', label: 'CAM Protocols', icon: TrendingUp, path: '/admin?tab=market-trends' },
    ];
  }

  const baseItems: NavItem[] = [
    { id: 'overview', code: 'SYS-01', label: 'B-Plane Radar Scope', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'capital-structure', code: 'SYS-02', label: 'Constellation Ephemeris', icon: BarChart3, path: '/dashboard/capital-structure' },
    { id: 'covenant-compliance', code: 'SYS-03', label: 'Orbital Safety & SLA', icon: Shield, path: '/dashboard/covenant-compliance' },
    { id: 'performance-analysis', code: 'SYS-04', label: 'Maneuver Burn Queue', icon: Activity, path: '/dashboard/priorities-events' },
    { id: 'sector-news', code: 'SYS-05', label: 'Space Weather Bulletins', icon: Newspaper, path: '/dashboard/sector-news' },
  ];

  if (role === 'super_admin' || role === 'company_admin') {
    baseItems.push({ id: 'user-management', code: 'SYS-06', label: 'Flight Crew Access', icon: Users, path: '/dashboard/user-management' });
  }

  return baseItems;
}

export function NewSidebar() {
  const { theme, toggleTheme } = useTheme();
  const tc = colors[theme];
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isPreviewMode = location.pathname.startsWith('/dashboard');
  const viewMode: 'admin' | 'preview' = isPreviewMode ? 'preview' : 'admin';

  const [showSettings, setShowSettings] = useState(false);
  const [showShellDropdown, setShowShellDropdown] = useState(false);
  const [shellSearch, setShellSearch] = useState('');
  const [selectedShell, setSelectedShell] = useState(RECENT_SHELLS[0]);

  const shellRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  const getActiveItem = () => {
    if (location.pathname.startsWith('/admin')) {
      const params = new URLSearchParams(location.search);
      return params.get('tab') || 'onboarding';
    }
    if (location.pathname.includes('/capital-structure')) return 'capital-structure';
    if (location.pathname.includes('/covenant-compliance')) return 'covenant-compliance';
    if (location.pathname.includes('/priorities-events')) return 'performance-analysis';
    if (location.pathname.includes('/sector-news')) return 'sector-news';
    if (location.pathname.includes('/user-management')) return 'user-management';
    if (location.pathname === '/dashboard') return 'overview';
    return '';
  };

  const activeItem = getActiveItem();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (shellRef.current && !shellRef.current.contains(e.target as Node)) setShowShellDropdown(false);
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) setShowSettings(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const navItems = getNavItems(user?.role, viewMode);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleLabel = (role?: string) => {
    return role === 'super_admin' ? 'FDO DIRECTOR' : role === 'company_admin' ? 'SHELL LEAD' : 'ORBITAL ANALYST';
  };

  const handleViewToggle = (mode: 'admin' | 'preview') => {
    if (mode === 'admin') {
      navigate('/admin?tab=onboarding');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 z-40 transition-all duration-300 flex flex-col justify-between"
      style={{
        width: isCollapsed ? '72px' : '260px',
        backgroundColor: tc.bgSecondary,
        borderRight: `1px solid ${tc.borderPrimary}`,
        color: tc.textPrimary
      }}
    >
      {/* Top Header & Brand */}
      <div className="flex flex-col flex-1 min-h-0">
        <div
          className="h-14 px-4 flex items-center justify-between border-b flex-shrink-0"
          style={{ borderColor: tc.borderPrimary }}
        >
          {!isCollapsed && (
            <div
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2.5 cursor-pointer min-w-0"
            >
              <div
                className="w-8 h-8 flex items-center justify-center rounded-sm flex-shrink-0"
                style={{
                  backgroundColor: `${tc.accentPrimary}25`,
                  border: `1px solid ${tc.accentPrimary}60`
                }}
              >
                <Radar className="w-4 h-4" style={{ color: tc.accentPrimary }} />
              </div>
              <div className="leading-tight truncate">
                <div className="font-bold tracking-widest text-sm" style={{ color: tc.textPrimary }}>
                  KESSLER
                </div>
                <div className="text-[10px] tracking-wider uppercase font-semibold" style={{ color: tc.accentPrimary }}>
                  Orbital SSA Terminal
                </div>
              </div>
            </div>
          )}

          {isCollapsed && (
            <div
              onClick={() => navigate('/dashboard')}
              className="w-9 h-9 mx-auto flex items-center justify-center rounded-sm cursor-pointer"
              style={{
                backgroundColor: `${tc.accentPrimary}25`,
                border: `1px solid ${tc.accentPrimary}60`
              }}
              title="KESSLER Orbital SSA"
            >
              <Radar className="w-4 h-4" style={{ color: tc.accentPrimary }} />
            </div>
          )}

          <button
            onClick={toggleSidebar}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label="Toggle sidebar"
            className={`p-1.5 rounded-sm transition-colors cursor-pointer ${isCollapsed ? 'hidden' : 'block'}`}
            style={{ color: tc.textSecondary }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = tc.bgTertiary)}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* Collapsed expand button */}
        {isCollapsed && (
          <div className="p-2 flex justify-center border-b" style={{ borderColor: tc.borderPrimary }}>
            <button
              onClick={toggleSidebar}
              title="Expand sidebar"
              aria-label="Expand sidebar"
              className="p-2 rounded-sm transition-colors cursor-pointer"
              style={{ color: tc.textSecondary }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = tc.bgTertiary)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <PanelLeft className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Clean, Non-Cramped Orbital Shell Selector */}
        {!isCollapsed && (
          <div className="p-3 border-b relative" style={{ borderColor: tc.borderPrimary }} ref={shellRef}>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 px-0.5">
              Target Constellation Shell
            </div>
            <button
              onClick={() => setShowShellDropdown(!showShellDropdown)}
              className="w-full flex items-center justify-between p-2.5 rounded-md transition-colors text-left cursor-pointer"
              style={{
                backgroundColor: tc.bgTertiary,
                border: `1px solid ${tc.borderPrimary}`
              }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-bold flex-shrink-0"
                  style={{
                    backgroundColor: `${tc.accentPrimary}25`,
                    color: tc.accentPrimary,
                    border: `1px solid ${tc.accentPrimary}60`
                  }}
                >
                  {selectedShell.ticker}
                </span>
                <div className="min-w-0 truncate">
                  <div className="text-xs font-semibold truncate" style={{ color: tc.textPrimary }}>
                    {selectedShell.name}
                  </div>
                  <div className="text-[10px] font-mono truncate" style={{ color: tc.textSecondary }}>
                    {selectedShell.details}
                  </div>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 ml-1.5" />
            </button>

            {showShellDropdown && (
              <div
                className="absolute left-3 right-3 top-full mt-1 rounded-md shadow-2xl z-50 overflow-hidden"
                style={{
                  backgroundColor: tc.bgSecondary,
                  border: `1px solid ${tc.borderPrimary}`
                }}
              >
                <div className="p-2 border-b" style={{ borderColor: tc.borderPrimary }}>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: tc.textSecondary }} />
                    <input
                      type="text"
                      placeholder="Search shell..."
                      value={shellSearch}
                      onChange={e => setShellSearch(e.target.value)}
                      autoFocus
                      className="w-full h-7 pl-8 pr-2 text-xs rounded outline-none"
                      style={{
                        backgroundColor: tc.bgPrimary,
                        border: `1px solid ${tc.borderPrimary}`,
                        color: tc.textPrimary
                      }}
                    />
                  </div>
                </div>
                <div className="p-1 max-h-48 overflow-y-auto">
                  {RECENT_SHELLS.filter(s =>
                    s.name.toLowerCase().includes(shellSearch.toLowerCase()) ||
                    s.ticker.toLowerCase().includes(shellSearch.toLowerCase())
                  ).map(shell => (
                    <button
                      key={shell.ticker}
                      className="w-full flex items-center justify-between p-2 rounded transition-colors text-left cursor-pointer"
                      style={{ color: tc.textPrimary }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = tc.bgTertiary)}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                      onClick={() => {
                        setSelectedShell(shell);
                        setShowShellDropdown(false);
                      }}
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-semibold">{shell.name}</div>
                        <div className="text-[10px] font-mono opacity-70">{shell.details}</div>
                      </div>
                      <span className="text-[10px] font-mono font-bold ml-2" style={{ color: tc.accentPrimary }}>{shell.ticker}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* FDO Mode Toggle (Super Admin) */}
        {user?.role === 'super_admin' && !isCollapsed && (
          <div className="p-3 border-b" style={{ borderColor: tc.borderPrimary }}>
            <div className="flex gap-1 p-1 rounded-md" style={{ backgroundColor: tc.bgTertiary }}>
              <button
                onClick={() => handleViewToggle('admin')}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded text-xs font-bold transition-all cursor-pointer"
                style={{
                  backgroundColor: viewMode === 'admin' ? tc.accentPrimary : 'transparent',
                  color: viewMode === 'admin' ? tc.bgPrimary : tc.textSecondary
                }}
              >
                <Radar className="w-3.5 h-3.5" />
                <span>FDO Ops</span>
              </button>
              <button
                onClick={() => handleViewToggle('preview')}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded text-xs font-bold transition-all cursor-pointer"
                style={{
                  backgroundColor: viewMode === 'preview' ? tc.accentPrimary : 'transparent',
                  color: viewMode === 'preview' ? tc.bgPrimary : tc.textSecondary
                }}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Flight Deck</span>
              </button>
            </div>
          </div>
        )}

        {/* Vertical Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = item.id === activeItem;

            return (
              <button
                key={item.id}
                onClick={() => item.path && navigate(item.path)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all cursor-pointer text-left ${
                  isCollapsed ? 'justify-center' : ''
                }`}
                style={{
                  backgroundColor: active
                    ? theme === 'dark'
                      ? 'rgba(0, 240, 255, 0.14)'
                      : 'rgba(0, 119, 153, 0.12)'
                    : 'transparent',
                  color: active ? tc.accentPrimary : tc.textSecondary,
                  borderLeft: active && !isCollapsed ? `3px solid ${tc.accentPrimary}` : '3px solid transparent'
                }}
                onMouseEnter={e => {
                  if (!active) e.currentTarget.style.backgroundColor = tc.hoverBg;
                }}
                onMouseLeave={e => {
                  if (!active) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0 flex items-center justify-between">
                    <span className="text-xs font-semibold truncate">{item.label}</span>
                    <span className="text-[10px] font-mono opacity-50 ml-1.5">{item.code}</span>
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Controls: Theme Switch & Operator Profile */}
      <div className="border-t p-2 space-y-1 flex-shrink-0" style={{ borderColor: tc.borderPrimary }}>
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Daylight Console' : 'Switch to Deep-Space Mode'}
          aria-label="Toggle theme"
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors cursor-pointer text-left ${
            isCollapsed ? 'justify-center' : ''
          }`}
          style={{ color: tc.textSecondary }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = tc.bgTertiary)}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          {theme === 'dark' ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
          {!isCollapsed && (
            <span className="text-xs font-medium">
              {theme === 'dark' ? 'Deep-Space Radar' : 'Daylight Console'}
            </span>
          )}
        </button>

        {user && (
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`w-full flex items-center gap-2.5 p-2 rounded-md transition-colors cursor-pointer text-left ${
                isCollapsed ? 'justify-center' : ''
              }`}
              style={{
                backgroundColor: tc.bgTertiary,
                border: `1px solid ${tc.borderPrimary}`,
                color: tc.textPrimary
              }}
            >
              <div
                className="w-7 h-7 rounded-sm flex items-center justify-center font-mono text-[11px] font-bold flex-shrink-0"
                style={{ backgroundColor: tc.accentPrimary, color: tc.bgPrimary }}
              >
                {user.initials}
              </div>
              {!isCollapsed && (
                <>
                  <div className="flex-1 min-w-0 leading-tight">
                    <div className="text-xs font-bold truncate">{user.name}</div>
                    <div className="text-[10px] font-mono font-semibold truncate" style={{ color: tc.accentPrimary }}>
                      {getRoleLabel(user.role)}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
                </>
              )}
            </button>

            {showSettings && (
              <div
                className={`absolute ${
                  isCollapsed ? 'left-full bottom-0 ml-2' : 'left-0 right-0 bottom-full mb-2'
                } w-56 rounded-md shadow-2xl z-50 overflow-hidden`}
                style={{
                  backgroundColor: tc.bgSecondary,
                  border: `1px solid ${tc.borderPrimary}`
                }}
              >
                <div className="px-3.5 py-2.5 border-b" style={{ borderColor: tc.borderPrimary }}>
                  <div className="text-xs font-bold" style={{ color: tc.textPrimary }}>{user.name}</div>
                  <div className="text-[11px] font-mono opacity-60 truncate">{user.email}</div>
                  <div
                    className="mt-1 inline-flex px-1.5 py-0.5 rounded text-[9px] font-mono font-bold"
                    style={{
                      backgroundColor: `${tc.accentPrimary}25`,
                      color: tc.accentPrimary
                    }}
                  >
                    {getRoleLabel(user.role)}
                  </div>
                </div>

                <button
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left transition-colors text-xs cursor-pointer"
                  style={{ color: tc.textPrimary }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = tc.hoverBg)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  onClick={() => {
                    navigate('/settings');
                    setShowSettings(false);
                  }}
                >
                  <Settings className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Console Preferences</span>
                </button>

                <div className="border-t" style={{ borderColor: tc.borderPrimary }}>
                  <button
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left transition-colors text-xs cursor-pointer text-red-400"
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                    onClick={handleLogout}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Terminate Ground Link</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
