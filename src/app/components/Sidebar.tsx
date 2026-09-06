import { useState, useRef, useEffect } from 'react';
import { Building2, Users, BarChart3, Settings, PanelLeftClose, PanelLeft, LogOut, MoreVertical, LayoutDashboard, Activity, MessageSquare, Briefcase, ChevronRight, FileText, TrendingUp, Shield, Image, ListTodo, Newspaper, LineChart, Upload, Sun, Moon, Bell, ChevronDown, User, Search, Clock } from 'lucide-react';
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
      { id: 'onboarding', label: 'Onboarding', icon: Building2, path: '/admin?tab=onboarding' },
      { id: 'users', label: 'Users', icon: Users, path: '/admin?tab=users' },
      { id: 'commentary', label: 'Commentary', icon: MessageSquare, path: '/admin?tab=commentary' },
      { id: 'images', label: 'Image Uploads', icon: Image, path: '/admin?tab=images' },
      { id: 'priorities', label: 'Priorities & Events', icon: ListTodo, path: '/admin?tab=priorities' },
      { id: 'sector-news', label: 'Sector News & Commentary', icon: Newspaper, path: '/admin?tab=sector-news' },
      { id: 'market-trends', label: 'Market Trends', icon: TrendingUp, path: '/admin?tab=market-trends' },
    ];
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
        backgroundColor: theme === 'dark' ? '#1A2332' : '#FFFFFF',
        borderRight: `1px solid ${tc.borderPrimary}`,
        color: tc.textPrimary
      }}
    >
      <div className="flex flex-col h-full">
        {/* Logo and Toggle */}
        <div className="p-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${tc.borderPrimary}` }}>
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center rounded" style={{ backgroundColor: '#FF6B35' }}>
                <span style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 700 }}>AEGIS</span>
              </div>
              <div style={{ fontSize: '10px', lineHeight: '1.3', color: tc.textPrimary, fontWeight: 600 }}>
                WHEN<br />YOU MEAN<br />BUSINESS
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="w-10 h-10 flex items-center justify-center mx-auto rounded" style={{ backgroundColor: '#FF6B35' }}>
              <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 700 }}>AEGIS</span>
            </div>
          )}
          {!isCollapsed && (
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded transition-colors"
              style={{ color: tc.textSecondary }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#0F1A2A' : '#F3F4F6'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Expand button when collapsed */}
        {isCollapsed && (
          <div className="px-4 py-3">
            <button
              onClick={toggleSidebar}
              className="w-full p-2 rounded transition-colors flex items-center justify-center"
              style={{ color: tc.textSecondary }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#0F1A2A' : '#F3F4F6'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              aria-label="Expand sidebar"
            >
              <PanelLeft className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Role Badge */}
        {!isCollapsed && user && (
          <div className="px-4 pb-3 pt-2">
            <div className="flex items-center gap-2">
              <Briefcase className="w-3 h-3" style={{ color: tc.textTertiary }} />
              <span style={{ fontSize: '11px', color: tc.textTertiary, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {user.role === 'super_admin' ? 'Super Administrator' :
                  user.role === 'company_admin' ? 'Company Admin' : 'User'}
              </span>
            </div>
          </div>
        )}

        {/* Navigation */}
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
                    backgroundColor: active ? (theme === 'dark' ? 'rgba(6,182,212,0.12)' : '#EFF6FF') : 'transparent',
                    color: active ? tc.accentPrimary : tc.textSecondary,
                    borderLeft: active && !isCollapsed ? `2px solid ${tc.accentPrimary}` : '2px solid transparent',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.backgroundColor = theme === 'dark' ? '#0F1A2A' : '#F9FAFB'; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  {item.hasSubmenu && !isCollapsed && (
                    <ChevronRight
                      className="w-3.5 h-3.5 transition-transform flex-shrink-0"
                      style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)', opacity: 0.6 }}
                    />
                  )}
                  <Icon className="w-4.5 h-4.5 flex-shrink-0" style={{ width: '18px', height: '18px' }} />
                  {!isCollapsed && (
                    <>
                      <span style={{ fontSize: '13px', fontWeight: active ? 600 : 500, flex: 1, textAlign: 'left' }}>
                        {item.label}
                      </span>
                      {item.badge !== undefined && (
                        <span
                          className="rounded-full flex items-center justify-center"
                          style={{
                            minWidth: '18px', height: '18px', padding: '0 5px',
                            backgroundColor: `${item.badgeColor}25`,
                            border: `1px solid ${item.badgeColor}50`,
                            color: item.badgeColor, fontSize: '10px', fontWeight: 700
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>

                {/* Submenu */}
                {item.hasSubmenu && expanded && !isCollapsed && item.submenu && (
                  <div className="ml-8">
                    {item.submenu.map(sub => (
                      <button
                        key={sub.id}
                        onClick={() => setActiveItem(sub.id)}
                        className="w-full px-4 py-2 text-left transition-colors"
                        style={{
                          backgroundColor: activeItem === sub.id ? (theme === 'dark' ? 'rgba(6,182,212,0.1)' : '#EFF6FF') : 'transparent',
                          color: activeItem === sub.id ? tc.accentPrimary : tc.textSecondary,
                          fontSize: '12px'
                        }}
                        onMouseEnter={e => { if (activeItem !== sub.id) e.currentTarget.style.backgroundColor = theme === 'dark' ? '#0F1A2A' : '#F9FAFB'; }}
                        onMouseLeave={e => { if (activeItem !== sub.id) e.currentTarget.style.backgroundColor = 'transparent'; }}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>


        {/* Settings at bottom */}
        <div style={{ borderTop: `1px solid ${tc.borderPrimary}` }} className="relative">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`w-full px-4 py-3.5 flex items-center gap-3 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
            style={{ color: tc.textSecondary }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#0F1A2A' : '#F9FAFB'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Settings className="w-4.5 h-4.5" style={{ width: '18px', height: '18px' }} />
            {!isCollapsed && (
              <>
                <span style={{ fontSize: '13px', fontWeight: 500 }}>Settings</span>
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
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#0F1A2A' : '#F9FAFB'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Settings className="w-3.5 h-3.5" style={{ color: tc.textSecondary }} />
                  <span style={{ fontSize: '12px', color: tc.textPrimary }}>Account Settings</span>
                </button>

                <button
                  className="w-full px-3 py-2 text-left rounded transition-colors flex items-center gap-2"
                  onClick={handleLogout}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#DC262615'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <LogOut className="w-3.5 h-3.5" style={{ color: '#DC2626' }} />
                  <span style={{ fontSize: '12px', color: '#DC2626' }}>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
