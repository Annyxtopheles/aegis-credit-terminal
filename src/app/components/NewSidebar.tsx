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
  ChevronRight,
  Radar,
  Terminal,
  ChevronsUpDown,
  PanelLeftClose,
  PanelLeft,
  Satellite
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useSidebar } from '../context/SidebarContext';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { useNavigate, useLocation } from 'react-router';

const ORBITAL_SHELLS = [
  { ticker: 'VGD-S1', name: 'Vanguard LEO Shell-1', details: '550 km // 53.0° Shell • 48/48 SV', propellant: 84 },
  { ticker: 'VGD-S2', name: 'Vanguard SSO Shell-2', details: '720 km // 98.2° SSO • 24/24 SV', propellant: 91 },
  { ticker: 'VGD-VLEO', name: 'Vanguard VLEO Recon', details: '380 km // 45.0° Shell • 12/12 SV', propellant: 76 },
];

interface NavItem {
  id: string;
  label: string;
  icon: any;
  path: string;
}

function getNavItems(role?: string, viewMode?: 'admin' | 'preview'): NavItem[] {
  if (role === 'super_admin' && viewMode === 'admin') {
    return [
      { id: 'onboarding', label: 'Shell Provision', icon: Orbit, path: '/admin?tab=onboarding' },
      { id: 'users', label: 'Flight Crew Roster', icon: Users, path: '/admin?tab=users' },
      { id: 'commentary', label: 'Telemetry Log', icon: MessageSquare, path: '/admin?tab=commentary' },
      { id: 'data-upload', label: 'TLE / CDM Ingest', icon: Upload, path: '/admin?tab=data-upload' },
      { id: 'images', label: 'B-Plane Plots', icon: Image, path: '/admin?tab=images' },
      { id: 'priorities', label: 'Flight Directives', icon: ListTodo, path: '/admin?tab=priorities' },
      { id: 'sector-news', label: 'SWPC Weather Feeds', icon: Newspaper, path: '/admin?tab=sector-news' },
      { id: 'market-trends', label: 'CAM Protocols', icon: TrendingUp, path: '/admin?tab=market-trends' },
    ];
  }

  const baseItems: NavItem[] = [
    { id: 'overview', label: 'B-Plane Radar & Overview', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'capital-structure', label: 'Constellation Ephemeris', icon: BarChart3, path: '/dashboard/capital-structure' },
    { id: 'covenant-compliance', label: 'Orbital Safety & SLA', icon: Shield, path: '/dashboard/covenant-compliance' },
    { id: 'performance-analysis', label: 'Maneuver Burn Queue', icon: Activity, path: '/dashboard/priorities-events' },
    { id: 'sector-news', label: 'Space Weather Bulletins', icon: Newspaper, path: '/dashboard/sector-news' },
  ];

  if (role === 'super_admin' || role === 'company_admin') {
    baseItems.push({ id: 'user-management', label: 'Flight Crew Access', icon: Users, path: '/dashboard/user-management' });
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

  const [mainMenuOpen, setMainMenuOpen] = useState(true);
  const [generalMenuOpen, setGeneralMenuOpen] = useState(true);
  const [showShellMenu, setShowShellMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [selectedShell, setSelectedShell] = useState(ORBITAL_SHELLS[0]);

  const shellRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (shellRef.current && !shellRef.current.contains(e.target as Node)) setShowShellMenu(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setShowUserMenu(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

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
  const navItems = getNavItems(user?.role, viewMode);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarBg = theme === 'dark' ? '#121316' : '#FFFFFF';
  const sidebarBorder = theme === 'dark' ? '#22242A' : '#E5E7EB';

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 z-40 transition-all duration-300 flex flex-col justify-between select-none"
      style={{
        width: isCollapsed ? '72px' : '256px',
        backgroundColor: sidebarBg,
        borderRight: `1px solid ${sidebarBorder}`,
        color: tc.textPrimary
      }}
    >
      {/* Top Section: KESSLER Brand + Navigation */}
      <div className="flex flex-col flex-1 min-h-0 overflow-y-auto px-4 pt-5 pb-3">
        {/* KESSLER Brand Header */}
        <div className="flex items-center justify-between mb-6 px-1">
          {!isCollapsed ? (
            <div
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: 'rgba(129, 140, 248, 0.14)',
                  border: '1px solid rgba(129, 140, 248, 0.32)'
                }}
              >
                <Radar className="w-4 h-4" style={{ color: tc.accentPrimary }} />
              </div>
              <div className="leading-tight">
                <div className="text-[16px] font-bold tracking-wider" style={{ color: tc.textPrimary }}>
                  KESSLER
                </div>
                <div className="text-[10px] font-medium tracking-wide" style={{ color: tc.textSecondary }}>
                  Orbital SSA Terminal
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={() => navigate('/dashboard')}
              className="w-9 h-9 mx-auto flex items-center justify-center rounded-xl cursor-pointer"
              style={{
                backgroundColor: 'rgba(129, 140, 248, 0.14)',
                border: '1px solid rgba(129, 140, 248, 0.32)'
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
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${isCollapsed ? 'hidden' : 'block'}`}
            style={{ color: tc.textTertiary }}
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {isCollapsed && (
          <button
            onClick={toggleSidebar}
            title="Expand sidebar"
            className="mx-auto mb-4 p-2 rounded-lg transition-colors cursor-pointer"
            style={{ color: tc.textSecondary }}
          >
            <PanelLeft className="w-4 h-4" />
          </button>
        )}

        {/* Telemetry Modules Group */}
        <div className="mb-6">
          {!isCollapsed && (
            <button
              onClick={() => setMainMenuOpen(!mainMenuOpen)}
              className="flex items-center gap-1.5 px-2 mb-2 text-xs font-medium cursor-pointer"
              style={{ color: tc.textTertiary }}
            >
              <span>{viewMode === 'admin' ? 'FDO Command Console' : 'Flight Deck'}</span>
              <ChevronDown
                className="w-3.5 h-3.5 transition-transform"
                style={{ transform: mainMenuOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}
              />
            </button>
          )}

          {mainMenuOpen && (
            <nav className="space-y-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const active = activeItem === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    title={isCollapsed ? item.label : undefined}
                    className={`relative w-full flex items-center ${
                      isCollapsed ? 'justify-center px-0' : 'px-3'
                    } py-2.5 rounded-xl transition-all text-left cursor-pointer group`}
                    style={{
                      backgroundColor: active
                        ? theme === 'dark'
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(99, 102, 241, 0.08)'
                        : 'transparent',
                      color: active ? tc.textPrimary : tc.textSecondary
                    }}
                  >
                    {active && (
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-r-full"
                        style={{ backgroundColor: tc.accentPrimary }}
                      />
                    )}
                    <Icon
                      className="w-[18px] h-[18px] flex-shrink-0 transition-colors"
                      style={{ color: active ? tc.accentPrimary : tc.textSecondary }}
                    />
                    {!isCollapsed && (
                      <span
                        className="ml-3 text-[13.5px] truncate"
                        style={{ fontWeight: active ? 600 : 500 }}
                      >
                        {item.label}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          )}
        </div>

        {/* Console Controls Group */}
        <div>
          {!isCollapsed && (
            <button
              onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
              className="flex items-center gap-1.5 px-2 mb-2 text-xs font-medium cursor-pointer"
              style={{ color: tc.textTertiary }}
            >
              <span>Console</span>
              <ChevronDown
                className="w-3.5 h-3.5 transition-transform"
                style={{ transform: generalMenuOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}
              />
            </button>
          )}

          {generalMenuOpen && (
            <div className="space-y-1">
              {user?.role === 'super_admin' && (
                <button
                  onClick={() =>
                    navigate(viewMode === 'admin' ? '/dashboard' : '/admin?tab=onboarding')
                  }
                  title={isCollapsed ? 'Switch Mode' : undefined}
                  className={`relative w-full flex items-center ${
                    isCollapsed ? 'justify-center px-0' : 'px-3'
                  } py-2.5 rounded-xl transition-colors text-left cursor-pointer`}
                  style={{
                    color: location.pathname.startsWith('/admin')
                      ? tc.textPrimary
                      : tc.textSecondary
                  }}
                >
                  <Terminal className="w-[18px] h-[18px] flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="ml-3 text-[13.5px] font-medium truncate">
                      {viewMode === 'admin' ? 'Return to Flight Deck' : 'FDO Command Console'}
                    </span>
                  )}
                </button>
              )}

              <button
                onClick={() => navigate('/settings')}
                title={isCollapsed ? 'Settings' : undefined}
                className={`relative w-full flex items-center ${
                  isCollapsed ? 'justify-center px-0' : 'px-3'
                } py-2.5 rounded-xl transition-colors text-left cursor-pointer`}
                style={{
                  color: location.pathname === '/settings' ? tc.textPrimary : tc.textSecondary
                }}
              >
                {location.pathname === '/settings' && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-r-full"
                    style={{ backgroundColor: tc.accentPrimary }}
                  />
                )}
                <Settings className="w-[18px] h-[18px] flex-shrink-0" />
                {!isCollapsed && (
                  <span className="ml-3 text-[13.5px] font-medium truncate">Settings</span>
                )}
              </button>

              <button
                onClick={toggleTheme}
                title={isCollapsed ? 'Toggle Theme' : undefined}
                className={`w-full flex items-center ${
                  isCollapsed ? 'justify-center px-0' : 'px-3'
                } py-2.5 rounded-xl transition-colors text-left cursor-pointer`}
                style={{ color: tc.textSecondary }}
              >
                {theme === 'dark' ? (
                  <Sun className="w-[18px] h-[18px] flex-shrink-0" />
                ) : (
                  <Moon className="w-[18px] h-[18px] flex-shrink-0" />
                )}
                {!isCollapsed && (
                  <span className="ml-3 text-[13.5px] font-medium truncate">
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section: Active Orbital Shell Card + User Profile Pill */}
      <div className="px-4 pb-4 space-y-3">
        {!isCollapsed && (
          <div className="relative" ref={shellRef}>
            <div
              className="rounded-2xl p-4 relative overflow-hidden"
              style={{
                backgroundColor: theme === 'dark' ? '#1A1B1F' : '#F4F5F7',
                border: `1px solid ${tc.borderPrimary}`
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Satellite className="w-4 h-4" style={{ color: tc.accentPrimary }} />
                  <span className="text-[11px] font-mono font-bold" style={{ color: tc.accentPrimary }}>
                    {selectedShell.ticker}
                  </span>
                </div>
                <span className="text-[10px] font-mono" style={{ color: tc.alertGreen }}>
                  {selectedShell.propellant}% Xe
                </span>
              </div>

              <div className="text-[13px] font-bold mb-2" style={{ color: tc.textPrimary }}>
                {selectedShell.name}
              </div>

              {/* Xenon Propellant Reserve Bar */}
              <div
                className="w-full h-1.5 rounded-full overflow-hidden mb-2"
                style={{ backgroundColor: theme === 'dark' ? '#2A2C32' : '#E5E7EB' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${selectedShell.propellant}%`,
                    backgroundColor: tc.accentPrimary
                  }}
                />
              </div>

              <p className="text-[11px] font-mono leading-relaxed mb-2.5" style={{ color: tc.textSecondary }}>
                {selectedShell.details}
              </p>

              <button
                onClick={() => setShowShellMenu(!showShellMenu)}
                className="inline-flex items-center gap-1 text-xs font-semibold cursor-pointer transition-opacity hover:opacity-80"
                style={{ color: tc.textPrimary }}
              >
                <span>Switch orbital shell</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {showShellMenu && (
              <div
                className="absolute bottom-full left-0 right-0 mb-2 rounded-2xl p-1.5 shadow-2xl z-50"
                style={{
                  backgroundColor: tc.bgSecondary,
                  border: `1px solid ${tc.borderPrimary}`
                }}
              >
                {ORBITAL_SHELLS.map(shell => (
                  <button
                    key={shell.ticker}
                    onClick={() => {
                      setSelectedShell(shell);
                      setShowShellMenu(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors cursor-pointer"
                    style={{
                      backgroundColor:
                        selectedShell.ticker === shell.ticker ? tc.bgTertiary : 'transparent'
                    }}
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-semibold truncate" style={{ color: tc.textPrimary }}>
                        {shell.name}
                      </div>
                      <div className="text-[10px] font-mono" style={{ color: tc.textSecondary }}>
                        {shell.details}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* User Profile Pill */}
        {user && (
          <div className="relative" ref={userRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`w-full flex items-center ${
                isCollapsed ? 'justify-center p-2' : 'justify-between p-2.5'
              } rounded-2xl transition-colors cursor-pointer`}
              style={{
                backgroundColor: theme === 'dark' ? '#1A1B1F' : '#F4F5F7',
                border: `1px solid ${tc.borderPrimary}`
              }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                  style={{
                    backgroundColor: tc.accentPrimary,
                    color: '#FFFFFF'
                  }}
                >
                  {user.initials}
                </div>
                {!isCollapsed && (
                  <div className="min-w-0 text-left">
                    <div className="text-xs font-semibold truncate" style={{ color: tc.textPrimary }}>
                      {user.name}
                    </div>
                    <div className="text-[11px] truncate" style={{ color: tc.textSecondary }}>
                      {user.email}
                    </div>
                  </div>
                )}
              </div>
              {!isCollapsed && (
                <ChevronsUpDown className="w-3.5 h-3.5 flex-shrink-0" style={{ color: tc.textSecondary }} />
              )}
            </button>

            {showUserMenu && (
              <div
                className="absolute bottom-full left-0 right-0 mb-2 rounded-2xl p-1.5 shadow-2xl z-50"
                style={{
                  backgroundColor: tc.bgSecondary,
                  border: `1px solid ${tc.borderPrimary}`
                }}
              >
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/settings');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition-colors"
                  style={{ color: tc.textPrimary }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = tc.bgTertiary)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <Settings className="w-3.5 h-3.5" style={{ color: tc.textSecondary }} />
                  <span>Console Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition-colors"
                  style={{ color: tc.alertRed }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = tc.bgTertiary)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
