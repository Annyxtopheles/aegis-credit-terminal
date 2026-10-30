import { useState } from 'react';
import { Orbit, Users, BarChart3, Settings, PanelLeftClose, PanelLeft, LogOut, MoreVertical, LayoutDashboard, Activity, MessageSquare, Briefcase, ChevronRight, TrendingUp, Shield, Image, ListTodo, Newspaper, Radar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useSidebar } from '../context/SidebarContext';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { useNavigate, useLocation } from 'react-router';

interface NavItem {
  id: string;
  label: string;
  icon: any;
  path?: string;
  hasSubmenu?: boolean;
  submenu?: { id: string; label: string; path?: string }[];
  badge?: number;
  badgeColor?: string;
}

function getNavItems(role?: string): NavItem[] {
  if (role === 'super_admin') {
    return [
      { id: 'onboarding', label: 'Shell Provisioning', icon: Orbit, path: '/admin?tab=onboarding' },
      { id: 'users', label: 'Flight Crew & Access', icon: Users, path: '/admin?tab=users' },
      { id: 'commentary', label: 'FDO Telemetry Log', icon: MessageSquare, path: '/admin?tab=commentary' },
      { id: 'images', label: 'Radar Plots Upload', icon: Image, path: '/admin?tab=images' },
      { id: 'priorities', label: 'Directives & Passes', icon: ListTodo, path: '/admin?tab=priorities' },
      { id: 'sector-news', label: 'Space Weather Bulletins', icon: Newspaper, path: '/admin?tab=sector-news' },
      { id: 'market-trends', label: 'CAM Protocols', icon: TrendingUp, path: '/admin?tab=market-trends' },
    ];
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

  return [
    { id: 'overview', label: 'Telemetry Overview', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'capital-structure', label: 'Constellation Ephemeris', icon: BarChart3, path: '/dashboard/capital-structure' },
    { id: 'covenant-compliance', label: 'Orbital Safety & SLA', icon: Shield, path: '/dashboard/covenant-compliance' },
    { id: 'performance-analysis', label: 'Maneuvers & Passes', icon: Activity, path: '/dashboard/priorities-events' },
    { id: 'sector-news', label: 'Space Weather & Advisories', icon: Newspaper, path: '/dashboard/sector-news' },
  ];
}

export function Sidebar() {
  const { theme } = useTheme();
  const tc = colors[theme];
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [activeItem, setActiveItem] = useState(() => {
    if (location.pathname.includes('/admin')) {
      const params = new URLSearchParams(location.search);
      return params.get('tab') || 'onboarding';
    }
    if (location.pathname.includes('/capital-structure')) return 'capital-structure';
    if (location.pathname.includes('/covenant-compliance')) return 'covenant-compliance';
    if (location.pathname.includes('/priorities-events')) return 'performance-analysis';
    if (location.pathname.includes('/sector-news')) return 'sector-news';
    if (location.pathname.includes('/user-management')) return 'user-management';
    return 'overview';
  });

  const navItems = getNavItems(user?.role);

  const toggleMenu = (id: string) => {
    setExpandedMenus(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  };

  const handleNavClick = (item: NavItem) => {
    if (item.hasSubmenu) { toggleMenu(item.id); return; }
    setActiveItem(item.id);
    if (item.path) navigate(item.path);
  };

  const handleLogout = () => { logout(); navigate('/login'); };

  const isActive = (item: NavItem) => activeItem === item.id || (item.path && location.pathname === item.path);

  return (
    <aside
      className="fixed left-0 top-14 bottom-0 transition-all duration-300 z-40"
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
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center rounded" style={{ backgroundColor: 'rgba(245, 158, 11, 0.16)', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
                <Radar className="w-5 h-5" style={{ color: tc.accentPrimary }} />
              </div>
              <div className="font-mono" style={{ fontSize: '11px', lineHeight: '1.3', color: tc.textPrimary, fontWeight: 700 }}>
                KESSLER<br />ORBITAL SSA
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="w-10 h-10 flex items-center justify-center mx-auto rounded" style={{ backgroundColor: 'rgba(245, 158, 11, 0.16)' }}>
              <Radar className="w-5 h-5" style={{ color: tc.accentPrimary }} />
            </div>
          )}
          {!isCollapsed && (
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded transition-colors"
              style={{ color: tc.textSecondary }}
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose className="w-5 h-5" />
            </button>
          )}
        </div>

        {isCollapsed && (
          <div className="px-4 py-3">
            <button
              onClick={toggleSidebar}
              className="w-full p-2 rounded transition-colors flex items-center justify-center"
              style={{ color: tc.textSecondary }}
              aria-label="Expand sidebar"
            >
              <PanelLeft className="w-5 h-5" />
            </button>
          </div>
        )}

        {!isCollapsed && user && (
          <div className="px-4 pb-3 pt-2">
            <div className="flex items-center gap-2">
              <Briefcase className="w-3 h-3" style={{ color: tc.textTertiary }} />
              <span className="font-mono" style={{ fontSize: '11px', color: tc.textTertiary, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {user.role === 'super_admin' ? 'Flight Dynamics Director' :
                  user.role === 'company_admin' ? 'Constellation Lead' : 'Orbital Analyst'}
              </span>
            </div>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto py-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const expanded = expandedMenus.includes(item.id);
            const active = isActive(item);

            return (
              <div key={item.id}>
                <button
                  onClick={() => handleNavClick(item)}
                  className={`w-full px-4 py-2.5 flex items-center gap-3 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
                  style={{
                    backgroundColor: active ? (theme === 'dark' ? 'rgba(245,158,11,0.12)' : '#FEF3C7') : 'transparent',
                    color: active ? tc.accentPrimary : tc.textSecondary,
                    borderLeft: active && !isCollapsed ? `2px solid ${tc.accentPrimary}` : '2px solid transparent',
                  }}
                >
                  {item.hasSubmenu && !isCollapsed && (
                    <ChevronRight
                      className="w-3.5 h-3.5 transition-transform flex-shrink-0"
                      style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)', opacity: 0.6 }}
                    />
                  )}
                  <Icon className="w-4.5 h-4.5 flex-shrink-0" style={{ width: '18px', height: '18px' }} />
                  {!isCollapsed && (
                    <span style={{ fontSize: '13px', fontWeight: active ? 600 : 500, flex: 1, textAlign: 'left' }}>
                      {item.label}
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </nav>

        <div style={{ borderTop: `1px solid ${tc.borderPrimary}` }} className="relative">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`w-full px-4 py-3.5 flex items-center gap-3 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
            style={{ color: tc.textSecondary }}
          >
            <Settings className="w-4.5 h-4.5" style={{ width: '18px', height: '18px' }} />
            {!isCollapsed && (
              <>
                <span style={{ fontSize: '13px', fontWeight: 500 }}>Console Settings</span>
                <MoreVertical className="w-4 h-4 ml-auto" />
              </>
            )}
          </button>

          {showSettings && !isCollapsed && (
            <div
              className="absolute bottom-full left-3 right-3 mb-2 rounded-lg shadow-xl overflow-hidden"
              style={{ backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}` }}
            >
              <div className="p-2">
                <button
                  className="w-full px-3 py-2 text-left rounded transition-colors flex items-center gap-2"
                  onClick={() => navigate('/settings')}
                >
                  <Settings className="w-3.5 h-3.5" style={{ color: tc.textSecondary }} />
                  <span style={{ fontSize: '12px', color: tc.textPrimary }}>Console Preferences</span>
                </button>

                <button
                  className="w-full px-3 py-2 text-left rounded transition-colors flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="w-3.5 h-3.5" style={{ color: '#EF4444' }} />
                  <span style={{ fontSize: '12px', color: '#EF4444' }}>Terminate Session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
