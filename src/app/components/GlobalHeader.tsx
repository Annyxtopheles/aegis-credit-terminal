import { useState, useRef, useEffect } from 'react';
import { Shield, Sun, Moon, Bell, ChevronDown, Settings, LogOut, Search, Clock, Building2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { useNavigate } from 'react-router';

const NOTIFICATIONS = [
  { id: '1', type: 'alert', text: 'APX covenant ratio approaching threshold (7.4x vs 7.0x limit)', time: '5m ago', unread: true },
  { id: '2', type: 'price', text: 'APX Sr Secured Note dropped 2.3% to $95.40', time: '12m ago', unread: true },
  { id: '3', type: 'holder', text: 'BlackRock increased position in APX by 8.2%', time: '1h ago', unread: true },
  { id: '4', type: 'system', text: 'Weekly portfolio summary is ready for download', time: '3h ago', unread: false },
  { id: '5', type: 'alert', text: 'CHEF maturity alert: 180 days remaining on 2025 notes', time: '1d ago', unread: false },
];

const RECENT_COMPANIES = [
  { ticker: 'APX', name: 'Apex Brands Group' },
  { ticker: 'CHEF', name: 'Chefs\' Warehouse' },
  { ticker: 'SFM', name: 'Sprouts Farmers' },
];

const notifTypeColor: Record<string, string> = {
  alert: '#DC2626', price: '#F59E0B', holder: '#06B6D4', system: '#10B981'
};

export function GlobalHeader() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const tc = colors[theme];
  const navigate = useNavigate();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCompanySearch, setShowCompanySearch] = useState(false);
  const [companySearch, setCompanySearch] = useState('');
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setShowUserMenu(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifications(false);
      if (companyRef.current && !companyRef.current.contains(e.target as Node)) setShowCompanySearch(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    setShowUserMenu(false);
    logout();
    navigate('/login');
  };

  const markAllRead = () => setNotifications(ns => ns.map(n => ({ ...n, unread: false })));

  const getRoleLabel = (role?: string) => {
    const map: Record<string, string> = {
      super_admin: 'Super Administrator',
      company_admin: 'Company Admin',
      normal_user: 'User'
    };
    return role ? map[role] || role : '';
  };

  const getRoleBadgeColor = (role?: string) => {
    const map: Record<string, string> = {
      super_admin: '#FF6B35',
      company_admin: '#F59E0B',
      normal_user: '#06B6D4'
    };
    return role ? map[role] || '#8B96A5' : '#8B96A5';
  };

  const headerBg = theme === 'dark' ? '#000000' : '#FFFFFF';
  const headerBorder = theme === 'dark' ? '1px solid #1A2332' : '2px solid #E5E7EB';

  return (
    <header
      className="h-14 px-3 md:px-6 flex items-center justify-between fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      style={{ backgroundColor: headerBg, borderBottom: headerBorder }}
    >
      {/* Left: Logo + Company Selector */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 flex items-center justify-center rounded" style={{ backgroundColor: '#FF6B35' }}>
            <span style={{ color: '#FFFFFF', fontSize: '10px', fontWeight: 700 }}>AEGIS</span>
          </div>
          <Shield className="w-4 h-4 hidden md:block" style={{ color: tc.textSecondary }} />
          <span className="uppercase tracking-wide hidden md:inline" style={{ fontSize: '11px', color: tc.textSecondary }}>
            Aegis SURVEILLANCE
          </span>
        </div>

        {/* Company Selector - Super Admin only can change */}
        {isAuthenticated && user?.role === 'super_admin' && (
          <div className="relative" ref={companyRef}>
            <button
              onClick={() => setShowCompanySearch(!showCompanySearch)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors"
              style={{
                backgroundColor: theme === 'dark' ? '#1A2332' : '#F3F4F6',
                border: `1px solid ${tc.borderPrimary}`,
                color: tc.textPrimary
              }}
            >
              <Building2 className="w-3.5 h-3.5" style={{ color: tc.textSecondary }} />
              <span style={{ fontSize: '13px', fontWeight: 600 }}>Apex Brands Group</span>
              <span style={{ fontSize: '12px', fontFamily: 'JetBrains Mono, monospace', color: tc.accentPrimary }}>APX</span>
              <ChevronDown className="w-3 h-3" style={{ color: tc.textSecondary }} />
            </button>

            {showCompanySearch && (
              <div className="absolute top-full left-0 mt-1 w-72 rounded-lg shadow-xl z-50" style={{
                backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}`
              }}>
                <div className="p-3 border-b" style={{ borderColor: tc.borderPrimary }}>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: tc.textSecondary }} />
                    <input
                      type="text"
                      placeholder="Search 500+ companies..."
                      value={companySearch}
                      onChange={e => setCompanySearch(e.target.value)}
                      autoFocus
                      style={{
                        width: '100%', height: '36px', paddingLeft: '32px', paddingRight: '10px',
                        backgroundColor: theme === 'dark' ? '#0F1A2A' : '#FFFFFF',
                        border: `1px solid ${tc.borderPrimary}`, borderRadius: '6px',
                        color: tc.textPrimary, fontSize: '13px', outline: 'none'
                      }}
                    />
                  </div>
                </div>
                <div className="p-2">
                  <p style={{ fontSize: '11px', color: tc.textSecondary, padding: '4px 8px 6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Recently Viewed
                  </p>
                  {RECENT_COMPANIES.map(co => (
                    <button
                      key={co.ticker}
                      className="w-full flex items-center gap-3 px-2 py-2 rounded-md transition-colors text-left"
                      style={{ color: tc.textPrimary }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#0F1A2A' : '#F3F4F6'}
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

        {/* Company Display - Company Admin and Normal User (no dropdown) */}
        {isAuthenticated && (user?.role === 'company_admin' || user?.role === 'normal_user') && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md" style={{
            backgroundColor: theme === 'dark' ? '#1A2332' : '#F3F4F6',
            border: `1px solid ${tc.borderPrimary}`,
            color: tc.textPrimary
          }}>
            <Building2 className="w-3.5 h-3.5" style={{ color: tc.textSecondary }} />
            <span style={{ fontSize: '13px', fontWeight: 600 }}>Apex Brands Group</span>
            <span style={{ fontSize: '12px', fontFamily: 'JetBrains Mono, monospace', color: tc.accentPrimary }}>APX</span>
          </div>
        )}

      </div>

      {/* Right: Theme, Notifications, User */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-8 h-8 flex items-center justify-center rounded transition-colors duration-200"
          style={{ color: tc.textSecondary }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = theme === 'dark' ? '#1F2937' : '#F3F4F6'; e.currentTarget.style.color = tc.accentPrimary; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = tc.textSecondary; }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        {/* Notifications */}
        {isAuthenticated && (
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
              className="relative w-8 h-8 flex items-center justify-center rounded transition-colors"
              style={{ color: tc.textSecondary }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = theme === 'dark' ? '#1F2937' : '#F3F4F6'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#DC2626', fontSize: '10px', fontWeight: 700, color: '#FFFFFF' }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-1 w-80 rounded-lg shadow-xl z-50 overflow-hidden" style={{
                backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}`
              }}>
                <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: tc.borderPrimary }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: tc.textPrimary }}>Notifications</span>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} style={{ fontSize: '12px', color: '#0891B2', background: 'none', border: 'none', cursor: 'pointer' }}>
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      className="flex gap-3 px-4 py-3 transition-colors cursor-pointer border-b"
                      style={{
                        backgroundColor: n.unread ? (theme === 'dark' ? '#0F1A2A' : '#F0F9FF') : 'transparent',
                        borderColor: tc.borderPrimary
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#1A2332' : '#F9FAFB'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = n.unread ? (theme === 'dark' ? '#0F1A2A' : '#F0F9FF') : 'transparent'}
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full mt-1" style={{ backgroundColor: notifTypeColor[n.type] || '#8B96A5', opacity: n.unread ? 1 : 0.4 }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p style={{ fontSize: '12px', color: tc.textPrimary, lineHeight: 1.5 }}>{n.text}</p>
                        <p style={{ fontSize: '11px', color: tc.textSecondary, marginTop: '2px' }}>{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Subject company label (when not logged in) */}
        {!isAuthenticated && (
          <div className="flex items-center gap-1">
            <span style={{ fontSize: '14px', fontWeight: 600, color: tc.textPrimary }}>Apex Brands Group</span>
            <span className="hidden sm:inline" style={{ fontSize: '14px', fontFamily: 'JetBrains Mono, monospace', color: tc.accentPrimary }}>• APX</span>
          </div>
        )}

        {/* User Avatar Menu */}
        {isAuthenticated && user && (
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
              className="flex items-center gap-2 rounded-lg px-2 py-1 transition-colors"
              style={{ color: tc.textPrimary }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#1A2332' : '#F3F4F6'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              aria-label="User menu"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: getRoleBadgeColor(user.role), color: '#FFFFFF', fontSize: '12px', fontWeight: 700 }}
              >
                {user.initials}
              </div>
              <div className="hidden md:block text-left">
                <div style={{ fontSize: '13px', fontWeight: 600, lineHeight: 1.2 }}>{user.name}</div>
                <div style={{ fontSize: '11px', color: tc.textSecondary, lineHeight: 1.2 }}>{getRoleLabel(user.role)}</div>
              </div>
              <ChevronDown className="w-3 h-3 hidden md:block" style={{ color: tc.textSecondary }} />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-full mt-1 w-56 rounded-lg shadow-xl z-50 overflow-hidden" style={{
                backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}`
              }}>
                {/* User Info */}
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

                {/* Menu Items */}
                <button
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                  style={{ color: tc.textPrimary }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#0F1A2A' : '#F9FAFB'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  onClick={() => { navigate('/settings'); setShowUserMenu(false); }}
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
    </header>
  );
}
