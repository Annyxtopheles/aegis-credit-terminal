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
  Radar
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
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
  code: string;
  label: string;
  icon: any;
  path?: string;
}

function getNavItems(role?: string, viewMode?: 'admin' | 'preview'): NavItem[] {
  if (role === 'super_admin' && viewMode === 'admin') {
    return [
      { id: 'onboarding', code: 'FDO-01', label: 'Shell Provision', icon: Orbit, path: '/admin?tab=onboarding' },
      { id: 'users', code: 'FDO-02', label: 'Crew Roster', icon: Users, path: '/admin?tab=users' },
      { id: 'commentary', code: 'FDO-03', label: 'Telemetry Log', icon: MessageSquare, path: '/admin?tab=commentary' },
      { id: 'data-upload', code: 'FDO-04', label: 'TLE / CDM Ingest', icon: Upload, path: '/admin?tab=data-upload' },
      { id: 'images', code: 'FDO-05', label: 'B-Plane Plots', icon: Image, path: '/admin?tab=images' },
      { id: 'priorities', code: 'FDO-06', label: 'Directives', icon: ListTodo, path: '/admin?tab=priorities' },
      { id: 'sector-news', code: 'FDO-07', label: 'SWPC Bulletins', icon: Newspaper, path: '/admin?tab=sector-news' },
      { id: 'market-trends', code: 'FDO-08', label: 'CAM Protocols', icon: TrendingUp, path: '/admin?tab=market-trends' },
    ];
  }

  const baseItems: NavItem[] = [
    { id: 'overview', code: 'SYS-01', label: 'B-Plane Radar', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'capital-structure', code: 'SYS-02', label: 'Ephemeris Matrix', icon: BarChart3, path: '/dashboard/capital-structure' },
    { id: 'covenant-compliance', code: 'SYS-03', label: 'De-Orbit SLA', icon: Shield, path: '/dashboard/covenant-compliance' },
    { id: 'performance-analysis', code: 'SYS-04', label: 'Burn Queue', icon: Activity, path: '/dashboard/priorities-events' },
    { id: 'sector-news', code: 'SYS-05', label: 'Space Weather', icon: Newspaper, path: '/dashboard/sector-news' },
  ];

  if (role === 'super_admin' || role === 'company_admin') {
    baseItems.push({ id: 'user-management', code: 'SYS-06', label: 'Crew Access', icon: Users, path: '/dashboard/user-management' });
  }

  return baseItems;
}

export function NewSidebar() {
  const { theme, toggleTheme } = useTheme();
  const tc = colors[theme];
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isPreviewMode = location.pathname.startsWith('/dashboard');
  const viewMode: 'admin' | 'preview' = isPreviewMode ? 'preview' : 'admin';

  const [showSettings, setShowSettings] = useState(false);
  const [showCompanySearch, setShowCompanySearch] = useState(false);
  const [companySearch, setCompanySearch] = useState('');
  const [selectedShell, setSelectedShell] = useState(RECENT_SHELLS[0]);

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
    <header
      className="sticky top-0 z-40 w-full transition-colors duration-300"
      style={{
        backgroundColor: tc.bgSecondary,
        borderBottom: `1px solid ${tc.borderPrimary}`,
        color: tc.textPrimary
      }}
    >
      <div className="max-w-[1920px] mx-auto px-3 md:px-5 h-14 flex items-center justify-between gap-3">
        {/* Left: Brand Identity + Orbital Shell Selector */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2.5 cursor-pointer flex-shrink-0"
          >
            <div
              className="w-8 h-8 flex items-center justify-center rounded-sm"
              style={{
                backgroundColor: 'rgba(6, 182, 212, 0.14)',
                border: '1px solid rgba(6, 182, 212, 0.45)'
              }}
            >
              <Radar className="w-4 h-4" style={{ color: '#06B6D4' }} />
            </div>
            <div className="leading-none">
              <div className="font-mono font-bold tracking-[0.12em] text-xs md:text-sm" style={{ color: tc.textPrimary }}>
                KESSLER
              </div>
              <div className="font-mono text-[9px] tracking-[0.16em] uppercase" style={{ color: '#06B6D4' }}>
                SSA FLIGHT DECK
              </div>
            </div>
          </div>

          <div className="h-5 w-px hidden sm:block" style={{ backgroundColor: tc.borderPrimary }} />

          {/* Orbital Shell Selector */}
          <div className="relative hidden sm:block" ref={companyRef}>
            <button
              onClick={() => setShowCompanySearch(!showCompanySearch)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-sm transition-colors cursor-pointer font-mono"
              style={{
                backgroundColor: tc.bgTertiary,
                border: `1px solid ${tc.borderPrimary}`
              }}
            >
              <Orbit className="w-3.5 h-3.5" style={{ color: '#06B6D4' }} />
              <span className="text-[11px] font-semibold" style={{ color: tc.textPrimary }}>
                {selectedShell.ticker}
              </span>
              <span className="text-[10px] hidden xl:inline" style={{ color: tc.textSecondary }}>
                // {selectedShell.name}
              </span>
              <ChevronDown className="w-3 h-3" style={{ color: tc.textSecondary }} />
            </button>

            {showCompanySearch && (
              <div
                className="absolute left-0 top-full mt-1.5 w-72 rounded-sm shadow-2xl z-50"
                style={{
                  backgroundColor: tc.bgSecondary,
                  border: `1px solid ${tc.borderPrimary}`
                }}
              >
                <div className="p-2.5 border-b" style={{ borderColor: tc.borderPrimary }}>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: tc.textSecondary }} />
                    <input
                      type="text"
                      placeholder="Filter orbital shells..."
                      value={companySearch}
                      onChange={e => setCompanySearch(e.target.value)}
                      autoFocus
                      className="w-full h-8 pl-8 pr-2 text-xs font-mono rounded-sm outline-none"
                      style={{
                        backgroundColor: tc.bgPrimary,
                        border: `1px solid ${tc.borderPrimary}`,
                        color: tc.textPrimary
                      }}
                    />
                  </div>
                </div>
                <div className="p-1.5">
                  <p className="font-mono text-[9px] uppercase tracking-widest px-2 py-1" style={{ color: tc.textTertiary }}>
                    Active Constellation Shells
                  </p>
                  {RECENT_SHELLS.filter(s =>
                    s.name.toLowerCase().includes(companySearch.toLowerCase()) ||
                    s.ticker.toLowerCase().includes(companySearch.toLowerCase())
                  ).map(shell => (
                    <button
                      key={shell.ticker}
                      className="w-full flex items-center justify-between px-2.5 py-2 rounded-sm transition-colors text-left font-mono cursor-pointer"
                      style={{ color: tc.textPrimary }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = tc.bgTertiary)}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                      onClick={() => {
                        setSelectedShell(shell);
                        setShowCompanySearch(false);
                      }}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Clock className="w-3 h-3 flex-shrink-0" style={{ color: '#06B6D4' }} />
                        <span className="text-xs truncate">{shell.name}</span>
                      </div>
                      <span className="text-[10px] font-bold ml-2" style={{ color: '#06B6D4' }}>{shell.ticker}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Horizontal Tactical Mode Switcher */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = item.id === activeItem;

            return (
              <button
                key={item.id}
                onClick={() => item.path && navigate(item.path)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm transition-all cursor-pointer whitespace-nowrap font-mono"
                style={{
                  backgroundColor: active
                    ? theme === 'dark'
                      ? 'rgba(6, 182, 212, 0.16)'
                      : '#E0F2FE'
                    : 'transparent',
                  color: active ? '#06B6D4' : tc.textSecondary,
                  border: active
                    ? '1px solid rgba(6, 182, 212, 0.45)'
                    : '1px solid transparent'
                }}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="text-[10px] opacity-65 hidden 2xl:inline">[{item.code}]</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Admin/Telemetry Toggle, Theme Switch, Operator Badge */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {user?.role === 'super_admin' && (
            <div
              className="hidden md:flex items-center p-0.5 rounded-sm"
              style={{ backgroundColor: tc.bgTertiary, border: `1px solid ${tc.borderPrimary}` }}
            >
              <button
                onClick={() => handleViewToggle('admin')}
                className="flex items-center gap-1 px-2 py-1 rounded-sm font-mono text-[10px] font-bold uppercase cursor-pointer transition-all"
                style={{
                  backgroundColor: viewMode === 'admin' ? '#06B6D4' : 'transparent',
                  color: viewMode === 'admin' ? '#06080D' : tc.textSecondary
                }}
              >
                <Radar className="w-3 h-3" />
                <span>FDO Ops</span>
              </button>
              <button
                onClick={() => handleViewToggle('preview')}
                className="flex items-center gap-1 px-2 py-1 rounded-sm font-mono text-[10px] font-bold uppercase cursor-pointer transition-all"
                style={{
                  backgroundColor: viewMode === 'preview' ? '#06B6D4' : 'transparent',
                  color: viewMode === 'preview' ? '#06080D' : tc.textSecondary
                }}
              >
                <Eye className="w-3 h-3" />
                <span>Flight Deck</span>
              </button>
            </div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Daylight Console' : 'Switch to Deep-Space Mode'}
            aria-label="Toggle theme"
            className="w-8 h-8 flex items-center justify-center rounded-sm transition-colors cursor-pointer"
            style={{
              backgroundColor: tc.bgTertiary,
              border: `1px solid ${tc.borderPrimary}`,
              color: tc.textSecondary
            }}
          >
            {theme === 'dark' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>

          {/* Operator Profile Dropdown */}
          {user && (
            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center gap-2 px-2.5 py-1 rounded-sm transition-colors cursor-pointer"
                style={{
                  backgroundColor: tc.bgTertiary,
                  border: `1px solid ${tc.borderPrimary}`,
                  color: tc.textPrimary
                }}
              >
                <div
                  className="w-6 h-6 rounded-sm flex items-center justify-center font-mono text-[10px] font-bold"
                  style={{ backgroundColor: '#06B6D4', color: '#06080D' }}
                >
                  {user.initials}
                </div>
                <div className="hidden lg:block text-left leading-tight">
                  <div className="font-mono text-[11px] font-bold truncate max-w-[110px]">{user.name}</div>
                  <div className="font-mono text-[9px] tracking-wider" style={{ color: '#06B6D4' }}>
                    {getRoleLabel(user.role)}
                  </div>
                </div>
                <ChevronDown className="w-3 h-3" style={{ color: tc.textSecondary }} />
              </button>

              {showSettings && (
                <div
                  className="absolute right-0 top-full mt-1.5 w-60 rounded-sm shadow-2xl z-50 overflow-hidden"
                  style={{
                    backgroundColor: tc.bgSecondary,
                    border: `1px solid ${tc.borderPrimary}`
                  }}
                >
                  <div className="px-4 py-3 border-b" style={{ borderColor: tc.borderPrimary }}>
                    <div className="font-mono text-xs font-bold" style={{ color: tc.textPrimary }}>{user.name}</div>
                    <div className="font-mono text-[11px]" style={{ color: tc.textSecondary }}>{user.email}</div>
                    <div
                      className="mt-1.5 inline-flex px-2 py-0.5 rounded-sm font-mono text-[10px] font-bold"
                      style={{
                        backgroundColor: 'rgba(6, 182, 212, 0.15)',
                        color: '#06B6D4',
                        border: '1px solid rgba(6, 182, 212, 0.35)'
                      }}
                    >
                      {getRoleLabel(user.role)}
                    </div>
                  </div>

                  <button
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-colors font-mono text-xs cursor-pointer"
                    style={{ color: tc.textPrimary }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = tc.hoverBg)}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                    onClick={() => {
                      navigate('/settings');
                      setShowSettings(false);
                    }}
                  >
                    <Settings className="w-3.5 h-3.5" style={{ color: '#06B6D4' }} />
                    <span>Console Preferences</span>
                  </button>

                  <div className="border-t" style={{ borderColor: tc.borderPrimary }}>
                    <button
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-colors font-mono text-xs cursor-pointer"
                      style={{ color: '#EF4444' }}
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
      </div>
    </header>
  );
}
