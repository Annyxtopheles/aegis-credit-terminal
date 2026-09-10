import { useState, useRef, useEffect } from 'react';
import { Building2, Users, BarChart3, Settings, PanelLeftClose, PanelLeft, LogOut, LayoutDashboard, Activity, MessageSquare, ListTodo, Newspaper, TrendingUp, Shield, Image, Upload, Sun, Moon, ChevronDown, Search, Clock, LayoutGrid, Eye } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useSidebar } from '../context/SidebarContext';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { useNavigate, useLocation } from 'react-router';

const RECENT_COMPANIES = [
  { ticker: 'APX', name: 'Apex Brands Group' },
  { ticker: 'CHEF', name: 'Chefs\' Warehouse' },
  { ticker: 'SFM', name: 'Sprouts Farmers' },
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
        { id: 'onboarding', label: 'Onboarding', icon: Building2, path: '/admin?tab=onboarding' },
        { id: 'users', label: 'Users', icon: Users, path: '/admin?tab=users' },
        { id: 'commentary', label: 'Commentary', icon: MessageSquare, path: '/admin?tab=commentary' },
        { id: 'data-upload', label: 'Data Upload', icon: Upload, path: '/admin?tab=data-upload' },
        { id: 'images', label: 'Charts Upload', icon: Image, path: '/admin?tab=images' },
        { id: 'priorities', label: 'Priorities & Events', icon: ListTodo, path: '/admin?tab=priorities' },
        { id: 'sector-news', label: 'Sector News & Commentary', icon: Newspaper, path: '/admin?tab=sector-news' },
        { id: 'market-trends', label: 'Market Trends', icon: TrendingUp, path: '/admin?tab=market-trends' },
      ];
    } else {
      return [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
        { id: 'capital-structure', label: 'Capital Structure', icon: BarChart3, path: '/dashboard/capital-structure' },
        { id: 'covenant-compliance', label: 'Covenant Compliance', icon: Shield, path: '/dashboard/covenant-compliance' },
        { id: 'performance-analysis', label: 'Priorities & Events', icon: Activity, path: '/dashboard/priorities-events' },
        { id: 'sector-news', label: 'Sector News', icon: Newspaper, path: '/dashboard/sector-news' },
        { id: 'user-management', label: 'User Management', icon: Users, path: '/dashboard/user-management' },
      ];
    }
  }

  if (role === 'company_admin') {
    return [
      { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
      { id: 'capital-structure', label: 'Capital Structure', icon: BarChart3, path: '/dashboard/capital-structure' },
      { id: 'covenant-compliance', label: 'Covenant Compliance', icon: Shield, path: '/dashboard/covenant-compliance' },
      { id: 'performance-analysis', label: 'Priorities & Events', icon: Activity, path: '/dashboard/priorities-events' },
      { id: 'sector-news', label: 'Sector News', icon: Newspaper, path: '/dashboard/sector-news' },
      { id: 'user-management', label: 'User Management', icon: Users, path: '/dashboard/user-management' },
    ];
  }

  // Default: normal_user
  return [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'capital-structure', label: 'Capital Structure', icon: BarChart3, path: '/dashboard/capital-structure' },
    { id: 'covenant-compliance', label: 'Covenant Compliance', icon: Shield, path: '/dashboard/covenant-compliance' },
    { id: 'performance-analysis', label: 'Priorities & Events', icon: Activity, path: '/dashboard/priorities-events' },
    { id: 'sector-news', label: 'Sector News', icon: Newspaper, path: '/dashboard/sector-news' },
  ];
}

export function NewSidebar() {
  const { theme, toggleTheme } = useTheme();
  const tc = colors[theme];
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // For Super Admin: preview mode when path starts with /dashboard, admin mode when path starts with /admin
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
    return role === 'super_admin' ? 'Aegis Administrator' : role === 'company_admin' ? 'Company Admin' : 'User';
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
        <div className="p-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${tc.borderPrimary}` }}>
          {!isCollapsed && (
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 flex items-center justify-center rounded transition-colors"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(6, 182, 212, 0.15)' : '#E0F2FE',
                  border: theme === 'dark' ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid #BAE6FD'
                }}
              >
                <Shield className="w-5 h-5" style={{ color: theme === 'dark' ? '#06B6D4' : '#0E7490' }} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.06em', color: tc.textPrimary, lineHeight: 1.2 }}>
                  AEGIS
                </div>
                <div
                  style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: theme === 'dark' ? '#06B6D4' : '#0E7490',
                    textTransform: 'uppercase'
                  }}
                >
                  Credit Terminal
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

        {/* Aegis Admin View Toggle */}
        {user?.role === 'super_admin' && !isCollapsed && (
          <div className="px-3 py-3" style={{ borderBottom: `1px solid ${tc.borderPrimary}` }}>
            <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: tc.bgTertiary }}>
              <button
                onClick={() => handleViewToggle('admin')}
                className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded transition-all whitespace-nowrap"
                style={{
                  backgroundColor: viewMode === 'admin' ? (theme === 'dark' ? '#1A2332' : '#FFFFFF') : 'transparent',
                  color: viewMode === 'admin' ? tc.accentPrimary : tc.textSecondary,
                  fontSize: '12px',
                  fontWeight: 600,
                  border: viewMode === 'admin' ? `1px solid ${tc.borderPrimary}` : '1px solid transparent'
                }}
              >
                <Shield className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Admin</span>
              </button>
              <button
                onClick={() => handleViewToggle('preview')}
                className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded transition-all whitespace-nowrap"
                style={{
                  backgroundColor: viewMode === 'preview' ? (theme === 'dark' ? '#1A2332' : '#FFFFFF') : 'transparent',
                  color: viewMode === 'preview' ? tc.accentPrimary : tc.textSecondary,
                  fontSize: '12px',
                  fontWeight: 600,
                  border: viewMode === 'preview' ? `1px solid ${tc.borderPrimary}` : '1px solid transparent'
                }}
              >
                <Eye className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Preview</span>
              </button>
            </div>
          </div>
        )}

        {/* Company Selector - Super Admin Only */}
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
              <Building2 className="w-3.5 h-3.5" style={{ color: tc.textSecondary }} />
              <span style={{ fontSize: '13px', fontWeight: 600, color: tc.textPrimary, flex: 1, textAlign: 'left' }}>Apex Brands Group</span>
              <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: tc.accentPrimary }}>APX</span>
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
                      placeholder="Search companies..."
                      value={companySearch}
                      onChange={e => setCompanySearch(e.target.value)}
                      autoFocus
                      style={{
                        width: '100%',
                        height: '36px',
                        paddingLeft: '32px',
                        paddingRight: '10px',
                        backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
                        border: `1px solid ${tc.borderPrimary}`,
                        borderRadius: '6px',
                        color: tc.textPrimary,
                        fontSize: '13px',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
                <div className="p-2 max-h-48 overflow-y-auto">
                  <p style={{ fontSize: '11px', color: tc.textSecondary, padding: '4px 8px 6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Recently Viewed
                  </p>
                  {RECENT_COMPANIES.map(co => (
                    <button
                      key={co.ticker}
                      className="w-full flex items-center gap-3 px-2 py-2 rounded-md transition-colors text-left"
                      style={{ color: tc.textPrimary }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = tc.bgTertiary}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                      onClick={() => setShowCompanySearch(false)}
                    >
                      <Clock className="w-3.5 h-3.5" style={{ color: tc.textSecondary }} />
                      <span style={{ fontSize: '13px' }}>{co.name}</span>
                      <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: tc.accentPrimary, marginLeft: 'auto' }}>{co.ticker}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Company Display - Non-Admin */}
        {(user?.role === 'company_admin' || user?.role === 'normal_user') && !isCollapsed && (
          <div className="px-3 py-3" style={{ borderBottom: `1px solid ${tc.borderPrimary}` }}>
            <div className="flex items-center gap-2 px-3 py-2 rounded-md" style={{
              backgroundColor: tc.bgTertiary,
              border: `1px solid ${tc.borderPrimary}`
            }}>
              <Building2 className="w-3.5 h-3.5" style={{ color: tc.textSecondary }} />
              <span style={{ fontSize: '13px', fontWeight: 600, color: tc.textPrimary }}>Apex Brands Group</span>
              <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: tc.accentPrimary }}>APX</span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = isActive(item);

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`w-full px-4 py-2.5 flex items-center gap-3 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
                style={{
                  backgroundColor: active ? (theme === 'dark' ? '#1E222A' : '#F1F3F6') : 'transparent',
                  color: active ? (theme === 'dark' ? '#EDEDED' : '#111318') : tc.textSecondary,
                  borderLeft: active && !isCollapsed ? (theme === 'dark' ? '2px solid #EDEDED' : '2px solid #111318') : '2px solid transparent',
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
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div style={{ borderTop: `1px solid ${tc.borderPrimary}` }}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            onMouseEnter={() => setIsThemeHovered(true)}
            onMouseLeave={() => setIsThemeHovered(false)}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
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
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </span>
            )}
          </button>

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
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: getRoleBadgeColor(user.role), color: '#FFFFFF', fontSize: '12px', fontWeight: 700 }}
                >
                  {user.initials}
                </div>
                {!isCollapsed && (
                  <>
                    <div className="flex-1 text-left min-w-0">
                      <div className="truncate" style={{ fontSize: '13px', fontWeight: 600, lineHeight: 1.2 }}>{user.name}</div>
                      <div className="truncate" style={{ fontSize: '11px', color: tc.textSecondary, lineHeight: 1.2 }}>{getRoleLabel(user.role)}</div>
                    </div>
                    <ChevronDown className="w-3 h-3 flex-shrink-0" style={{ color: tc.textSecondary }} />
                  </>
                )}
              </button>

              {showSettings && (
                <div
                  className="absolute left-full bottom-0 ml-2 w-56 rounded-lg shadow-xl z-50 overflow-hidden"
                  style={{
                    backgroundColor: tc.bgSecondary,
                    border: `1px solid ${tc.borderPrimary}`
                  }}
                >
                  <div className="px-4 py-3 border-b" style={{ borderColor: tc.borderPrimary }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: tc.textPrimary }}>{user.name}</div>
                    <div style={{ fontSize: '12px', color: tc.textSecondary }}>{user.email}</div>
                    <div className="mt-1.5 inline-flex px-2 py-0.5 rounded text-xs" style={{
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
                    <span style={{ fontSize: '13px' }}>Account Settings</span>
                  </button>

                  <div className="border-t" style={{ borderColor: tc.borderPrimary }}>
                    <button
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                      style={{ color: '#DC2626' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#DC262615'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4" />
                      <span style={{ fontSize: '13px' }}>Sign Out</span>
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
