import { useState, useRef, useEffect } from 'react';
import { Orbit, Users, BarChart3, Settings, PanelLeftClose, PanelLeft, LogOut, LayoutDashboard, Activity, MessageSquare, ListTodo, Newspaper, TrendingUp, Shield, Image, Upload, Sun, Moon, ChevronDown, Search, Clock, Eye, Radar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useSidebar } from '../context/SidebarContext';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { useNavigate, useLocation } from 'react-router';

const RECENT_SHELLS = [
  { ticker: 'VGD-S1', name: 'Vanguard LEO Shell-1 (550km)' },
  { ticker: 'VGD-S2', name: 'Vanguard Sun-Sync Shell-2 (720km)' },
  { ticker: 'VGD-VLEO', name: 'Vanguard VLEO Recon Shell (380km)' },
];

interface NavItem {
  id: string;
  label: string;
  icon: any;
  path?: string;
}

function getNavItems(role?: string, viewMode?: 'admin' | 'preview'): NavItem[] {
  if (role === 'super_admin') {
    if (viewMode === 'admin') {
      return [
        { id: 'onboarding', label: 'Shell Provisioning', icon: Orbit, path: '/admin?tab=onboarding' },
        { id: 'users', label: 'Flight Crew & Access', icon: Users, path: '/admin?tab=users' },
        { id: 'commentary', label: 'FDO Telemetry Log', icon: MessageSquare, path: '/admin?tab=commentary' },
        { id: 'data-upload', label: 'TLE / CDM Ingest', icon: Upload, path: '/admin?tab=data-upload' },
        { id: 'images', label: 'Radar Plots Upload', icon: Image, path: '/admin?tab=images' },
        { id: 'priorities', label: 'Directives & Passes', icon: ListTodo, path: '/admin?tab=priorities' },
        { id: 'sector-news', label: 'Space Weather Bulletins', icon: Newspaper, path: '/admin?tab=sector-news' },
        { id: 'market-trends', label: 'CAM Protocols', icon: TrendingUp, path: '/admin?tab=market-trends' },
      ];
    } else {
      return [
        { id: 'overview', label: 'Telemetry Overview', icon: LayoutDashboard, path: '/dashboard' },
        { id: 'capital-structure', label: 'Constellation Ephemeris', icon: BarChart3, path: '/dashboard/capital-structure' },
        { id: 'covenant-compliance', label: 'Orbital Safety & SLA', icon: Shield, path: '/dashboard/covenant-compliance' },
        { id: 'performance-analysis', label: 'Maneuvers & Passes', icon: Activity, path: '/dashboard/priorities-events' },
        { id: 'sector-news', label: 'Space Weather & Advisories', icon: Newspaper, path: '/dashboard/sector-news' },
        { id: 'user-management', label: 'Flight Crew Access', icon: Users, path: '/dashboard/user-management' },
      ];
    }
  }

  if (role === 'company_admin') {
    return [
      { id: 'overview', label: 'Telemetry Overview', icon: LayoutDashboard, path: '/dashboard' },
      { id: 'capital-structure', label: 'Constellation Ephemeris', icon: BarChart3, path: '/dashboard/capital-structure' },
      { id: 'covenant-compliance', label: 'Orbital Safety & SLA', icon: Shield, path: '/dashboard/covenant-compliance' },
      { id: 'performance-analysis', label: 'Maneuvers & Passes', icon: Activity, path: '/dashboard/priorities-events' },
      { id: 'sector-news', label: 'Space Weather & Advisories', icon: Newspaper, path: '/dashboard/sector-news' },
      { id: 'user-management', label: 'Flight Crew Access', icon: Users, path: '/dashboard/user-management' },
    ];
  }

  // Default: normal_user
  return [
    { id: 'overview', label: 'Telemetry Overview', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'capital-structure', label: 'Constellation Ephemeris', icon: BarChart3, path: '/dashboard/capital-structure' },
    { id: 'covenant-compliance', label: 'Orbital Safety & SLA', icon: Shield, path: '/dashboard/covenant-compliance' },
    { id: 'performance-analysis', label: 'Maneuvers & Passes', icon: Activity, path: '/dashboard/priorities-events' },
    { id: 'sector-news', label: 'Space Weather & Advisories', icon: Newspaper, path: '/dashboard/sector-news' },
  ];
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
  const [showCompanySearch, setShowCompanySearch] = useState(false);
  const [companySearch, setCompanySearch] = useState('');
  const [isThemeHovered, setIsThemeHovered] = useState(false);

  const companyRef = useRef<HTMLDivElement>(null);
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
      if (companyRef.current && !companyRef.current.contains(e.target as Node)) setShowCompanySearch(false);
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) setShowSettings(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const navItems = getNavItems(user?.role, viewMode);

  const handleNavClick = (item: NavItem) => {
    if (item.path) navigate(item.path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (item: NavItem) => {
    if (item.id === activeItem) return true;
    if (item.path && !item.path.includes('?')) {
      return location.pathname === item.path;
    }
    return false;
  };

  const getRoleLabel = (role?: string) => {
    return role === 'super_admin' ? 'Kessler Flight Director' : role === 'company_admin' ? 'Constellation Lead' : 'Orbital Analyst';
  };

  const getRoleBadgeColor = (role?: string) => {
    return role === 'super_admin' ? '#06B6D4' : role === 'company_admin' ? '#0891B2' : '#38BDF8';
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
      className="fixed left-0 top-0 bottom-0 transition-all duration-300 z-40"
      style={{
        width: isCollapsed ? '80px' : '280px',
        backgroundColor: tc.bgSecondary,
        borderRight: `1px solid ${tc.borderPrimary}`,
        color: tc.textPrimary
      }}
    >
      <div className="flex flex-col h-full">
        {/* Logo and Toggle */}
        <div className="p-4 flex items-center justify-between overflow-hidden" style={{ borderBottom: `1px solid ${tc.borderPrimary}` }}>
          {!isCollapsed && (
            <div className="flex items-center gap-2.5 min-w-0 flex-shrink-0 whitespace-nowrap">
              <div
                className="w-9 h-9 flex items-center justify-center rounded transition-colors flex-shrink-0"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(6, 182, 212, 0.15)' : '#E0F2FE',
                  border: theme === 'dark' ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid #BAE6FD'
                }}
              >
                <Radar className="w-5 h-5" style={{ color: theme === 'dark' ? '#06B6D4' : '#0E7490' }} />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-mono" style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.08em', color: tc.textPrimary, lineHeight: 1.2 }}>
                  KESSLER
                </div>
                <div
                  className="whitespace-nowrap font-mono"
                  style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: theme === 'dark' ? '#06B6D4' : '#0E7490',
                    textTransform: 'uppercase'
                  }}
                >
                  Orbital SSA Terminal
                </div>
              </div>
            </div>
          )}
          {isCollapsed ? (
            <div className="flex flex-col items-center gap-2 w-full">
              <button
                onClick={toggleSidebar}
                title="Expand sidebar"
                aria-label="Expand sidebar"
                className="w-10 h-10 flex items-center justify-center rounded-lg transition-colors cursor-pointer group"
                style={{
                  backgroundColor: 'transparent',
                  color: tc.textSecondary
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = tc.bgTertiary;
                  e.currentTarget.style.color = tc.accentPrimary;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = tc.textSecondary;
                }}
              >
                <PanelLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          ) : (
            <button
              onClick={toggleSidebar}
              title="Collapse sidebar"
              aria-label="Collapse sidebar"
              className="p-1.5 rounded transition-colors cursor-pointer"
              style={{ color: tc.textSecondary }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = tc.bgTertiary}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <PanelLeftClose className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Kessler Admin View Toggle */}
        {user?.role === 'super_admin' && !isCollapsed && (
          <div className="px-3 py-3" style={{ borderBottom: `1px solid ${tc.borderPrimary}` }}>
            <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: tc.bgTertiary }}>
              <button
                onClick={() => handleViewToggle('admin')}
                className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded transition-all whitespace-nowrap font-mono"
                style={{
                  backgroundColor: viewMode === 'admin' ? (theme === 'dark' ? '#06080D' : '#FFFFFF') : 'transparent',
                  color: viewMode === 'admin' ? tc.accentPrimary : tc.textSecondary,
                  fontSize: '11px',
                  fontWeight: 600,
                  border: viewMode === 'admin' ? `1px solid ${tc.borderPrimary}` : '1px solid transparent'
                }}
              >
                <Radar className="w-3.5 h-3.5 flex-shrink-0" />
                <span>FDO Console</span>
              </button>
              <button
                onClick={() => handleViewToggle('preview')}
                className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded transition-all whitespace-nowrap font-mono"
                style={{
                  backgroundColor: viewMode === 'preview' ? (theme === 'dark' ? '#06080D' : '#FFFFFF') : 'transparent',
                  color: viewMode === 'preview' ? tc.accentPrimary : tc.textSecondary,
                  fontSize: '11px',
                  fontWeight: 600,
                  border: viewMode === 'preview' ? `1px solid ${tc.borderPrimary}` : '1px solid transparent'
                }}
              >
                <Eye className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Live Telemetry</span>
              </button>
            </div>
          </div>
        )}

        {/* Orbital Shell Selector - Super Admin Only */}
        {user?.role === 'super_admin' && !isCollapsed && (
          <div className="px-3 py-3 relative" style={{ borderBottom: `1px solid ${tc.borderPrimary}` }} ref={companyRef}>
            <button
              onClick={() => setShowCompanySearch(!showCompanySearch)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-md transition-colors"
              style={{
                backgroundColor: tc.bgTertiary,
                border: `1px solid ${tc.borderPrimary}`
              }}
            >
              <Orbit className="w-3.5 h-3.5" style={{ color: tc.accentPrimary }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: tc.textPrimary, flex: 1, textAlign: 'left' }} className="truncate">
                Vanguard LEO Shell-1
              </span>
              <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: tc.accentPrimary }}>VGD-S1</span>
              <ChevronDown className="w-3 h-3" style={{ color: tc.textSecondary }} />
            </button>

            {showCompanySearch && (
              <div
                className="absolute left-3 right-3 top-full mt-1 rounded-lg shadow-xl z-50"
                style={{
                  backgroundColor: tc.bgSecondary,
                  border: `1px solid ${tc.borderPrimary}`
                }}
              >
                <div className="p-3 border-b" style={{ borderColor: tc.borderPrimary }}>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: tc.textSecondary }} />
                    <input
                      type="text"
                      placeholder="Filter orbital shells..."
                      value={companySearch}
                      onChange={e => setCompanySearch(e.target.value)}
                      autoFocus
                      style={{
                        width: '100%',
                        height: '36px',
                        paddingLeft: '32px',
                        paddingRight: '10px',
                        backgroundColor: theme === 'dark' ? '#06080D' : '#FFFFFF',
                        border: `1px solid ${tc.borderPrimary}`,
                        borderRadius: '6px',
                        color: tc.textPrimary,
                        fontSize: '12px',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
                <div className="p-2 max-h-48 overflow-y-auto">
                  <p style={{ fontSize: '10px', color: tc.textSecondary, padding: '4px 8px 6px', textTransform: 'uppercase', letterSpacing: '0.08em' }} className="font-mono">
                    Active Orbital Shells
                  </p>
                  {RECENT_SHELLS.map(shell => (
                    <button
                      key={shell.ticker}
                      className="w-full flex items-center gap-2 px-2 py-2 rounded-md transition-colors text-left"
                      style={{ color: tc.textPrimary }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = tc.bgTertiary}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                      onClick={() => setShowCompanySearch(false)}
                    >
                      <Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: tc.textSecondary }} />
                      <span style={{ fontSize: '12px' }} className="truncate">{shell.name}</span>
                      <span style={{ fontSize: '10px', fontFamily: 'JetBrains Mono, monospace', color: tc.accentPrimary, marginLeft: 'auto' }}>{shell.ticker}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Orbital Shell Display - Non-Admin */}
        {(user?.role === 'company_admin' || user?.role === 'normal_user') && !isCollapsed && (
          <div className="px-3 py-3" style={{ borderBottom: `1px solid ${tc.borderPrimary}` }}>
            <div className="flex items-center gap-2 px-3 py-2 rounded-md" style={{
              backgroundColor: tc.bgTertiary,
              border: `1px solid ${tc.borderPrimary}`
            }}>
              <Orbit className="w-3.5 h-3.5" style={{ color: tc.accentPrimary }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: tc.textPrimary }} className="truncate flex-1">Vanguard LEO Shell-1</span>
              <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: tc.accentPrimary }}>VGD-S1</span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = isActive(item);

            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => handleNavClick(item)}
                  title={isCollapsed ? item.label : undefined}
                  aria-label={item.label}
                  className={`w-full px-4 py-2.5 flex items-center gap-3 transition-colors cursor-pointer ${isCollapsed ? 'justify-center' : ''}`}
                  style={{
                    backgroundColor: active ? (theme === 'dark' ? 'rgba(6, 182, 212, 0.12)' : '#E0F2FE') : 'transparent',
                    color: active ? tc.accentPrimary : tc.textSecondary,
                    borderLeft: active && !isCollapsed ? `2px solid ${tc.accentPrimary}` : '2px solid transparent',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.backgroundColor = tc.hoverBg; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <Icon className="w-4.5 h-4.5 flex-shrink-0" style={{ width: '18px', height: '18px' }} />
                  {!isCollapsed && (
                    <span style={{ fontSize: '13px', fontWeight: active ? 600 : 500, flex: 1, textAlign: 'left' }}>
                      {item.label}
                    </span>
                  )}
                </button>

                {/* Micro tooltip when collapsed */}
                {isCollapsed && (
                  <div
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 z-50 shadow-lg"
                    style={{
                      backgroundColor: theme === 'dark' ? '#131C2A' : '#0F172A',
                      color: '#FFFFFF',
                      border: theme === 'dark' ? '1px solid #1A2636' : '1px solid #1E293B'
                    }}
                  >
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div style={{ borderTop: `1px solid ${tc.borderPrimary}` }}>
          {/* Theme Toggle */}
          <div className="relative group">
            <button
              onClick={toggleTheme}
              onMouseEnter={() => setIsThemeHovered(true)}
              onMouseLeave={() => setIsThemeHovered(false)}
              title={isCollapsed ? (theme === 'dark' ? 'Switch to Daylight Console' : 'Switch to Deep-Space Mode') : undefined}
              aria-label="Toggle theme"
              className={`w-full py-3 flex items-center transition-colors duration-150 cursor-pointer ${isCollapsed ? 'justify-center px-0' : 'px-4 gap-3'}`}
              style={{
                backgroundColor: isThemeHovered ? tc.hoverBg : 'transparent',
                color: isThemeHovered ? tc.textPrimary : tc.textSecondary
              }}
            >
              {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              {!isCollapsed && (
                <span style={{ fontSize: '13px', fontWeight: 500 }}>
                  {theme === 'dark' ? 'Deep-Space Radar' : 'Daylight Console'}
                </span>
              )}
            </button>
            {isCollapsed && (
              <div
                className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 z-50 shadow-lg"
                style={{
                  backgroundColor: theme === 'dark' ? '#131C2A' : '#0F172A',
                  color: '#FFFFFF',
                  border: theme === 'dark' ? '1px solid #1A2636' : '1px solid #1E293B'
                }}
              >
                {theme === 'dark' ? 'Switch to Daylight Console' : 'Switch to Deep-Space Mode'}
              </div>
            )}
          </div>

          {/* User Profile & Settings */}
          {user && (
            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => setShowSettings(!showSettings)}
                title={user.name}
                aria-label="User settings"
                className={`w-full py-3 flex items-center transition-colors cursor-pointer ${isCollapsed ? 'justify-center px-0' : 'px-4 gap-3'}`}
                style={{ color: tc.textPrimary }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = tc.hoverBg}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-mono"
                  style={{ backgroundColor: getRoleBadgeColor(user.role), color: '#FFFFFF', fontSize: '12px', fontWeight: 700 }}
                >
                  {user.initials}
                </div>
                {!isCollapsed && (
                  <>
                    <div className="flex-1 text-left min-w-0">
                      <div className="truncate" style={{ fontSize: '13px', fontWeight: 600, lineHeight: 1.2 }}>{user.name}</div>
                      <div className="truncate font-mono" style={{ fontSize: '10px', color: tc.textSecondary, lineHeight: 1.2 }}>{getRoleLabel(user.role)}</div>
                    </div>
                    <ChevronDown className="w-3 h-3 flex-shrink-0" style={{ color: tc.textSecondary }} />
                  </>
                )}
              </button>

              {showSettings && (
                <div
                  className={`absolute ${isCollapsed ? 'left-full bottom-2 ml-2' : 'left-2 right-2 bottom-full mb-2'} w-56 rounded-lg shadow-2xl z-50 overflow-hidden`}
                  style={{
                    backgroundColor: tc.bgSecondary,
                    border: `1px solid ${tc.borderPrimary}`
                  }}
                >
                  <div className="px-4 py-3 border-b" style={{ borderColor: tc.borderPrimary }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: tc.textPrimary }}>{user.name}</div>
                    <div style={{ fontSize: '12px', color: tc.textSecondary }} className="font-mono">{user.email}</div>
                    <div className="mt-1.5 inline-flex px-2 py-0.5 rounded text-xs font-mono" style={{
                      backgroundColor: `${getRoleBadgeColor(user.role)}20`,
                      color: getRoleBadgeColor(user.role),
                      border: `1px solid ${getRoleBadgeColor(user.role)}40`
                    }}>
                      {getRoleLabel(user.role)}
                    </div>
                  </div>

                  <button
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                    style={{ color: tc.textPrimary }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = tc.hoverBg}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    onClick={() => { navigate('/settings'); setShowSettings(false); }}
                  >
                    <Settings className="w-4 h-4" style={{ color: tc.textSecondary }} />
                    <span style={{ fontSize: '13px' }}>Console Preferences</span>
                  </button>

                  <div className="border-t" style={{ borderColor: tc.borderPrimary }}>
                    <button
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                      style={{ color: '#EF4444' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#EF444415'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4" />
                      <span style={{ fontSize: '13px' }}>Terminate Session</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
