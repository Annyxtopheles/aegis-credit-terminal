import { useState, useRef, useEffect } from 'react';
import { Radar, Sun, Moon, Bell, ChevronDown, Settings, LogOut, Search, Clock, Satellite } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { useNavigate } from 'react-router';

const NOTIFICATIONS = [
  { id: '1', type: 'alert', text: 'RED CONJUNCTION: COSMOS-2251 DEB [34427] vs VANGUARD-04 (Pc: 4.82e-4)', time: '4m ago', unread: true },
  { id: '2', type: 'price', text: 'F10.7 Solar Flux spiked +14.2 SFU; thermospheric drag model updated', time: '18m ago', unread: true },
  { id: '3', type: 'holder', text: 'Svalbard S-Band Ground Station acquired VANGUARD-12 telemetry lock', time: '42m ago', unread: true },
  { id: '4', type: 'system', text: 'Automated TLE batch ephemeris propagation completed (48/48 SVs)', time: '2h ago', unread: false },
  { id: '5', type: 'alert', text: 'FCC De-Orbit Reserve alert: VANGUARD-04 xenon margin at 4.12 kg', time: '6h ago', unread: false },
];

const RECENT_CONSTELLATIONS = [
  { ticker: 'VGD-LEO', name: 'Vanguard LEO Shell-1 (540km)' },
  { ticker: 'PLR-SSO', name: 'Polaris Sun-Sync Relay (720km)' },
  { ticker: 'AEX-VLEO', name: 'Aether VLEO Recon (380km)' },
];

export function GlobalHeader() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const tc = colors[theme];
  const navigate = useNavigate();

  const notifTypeColor: Record<string, string> = {
    alert: tc.alertRed, price: tc.alertAmber, holder: tc.accentPrimary, system: tc.alertGreen
  };

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCompanySearch, setShowCompanySearch] = useState(false);
  const [companySearch, setCompanySearch] = useState('');
  const [isThemeHovered, setIsThemeHovered] = useState(false);
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
      super_admin: 'Flight Dynamics Director',
      company_admin: 'Constellation Lead',
      normal_user: 'Orbital Analyst'
    };
    return role ? map[role] || role : '';
  };

  const getRoleBadgeColor = (role?: string) => {
    const map: Record<string, string> = {
      super_admin: tc.accentPrimary,
      company_admin: tc.alertAmber,
      normal_user: tc.alertGreen
    };
    return role ? map[role] || '#8B96A5' : '#8B96A5';
  };

  const headerBg = tc.bgSecondary;
  const headerBorder = `1px solid ${tc.borderPrimary}`;

  return (
    <header
      className="h-14 px-3 md:px-6 flex items-center justify-between fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      style={{ backgroundColor: headerBg, borderBottom: headerBorder }}
    >
      {/* Left: Logo + Constellation Selector */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 flex items-center justify-center rounded"
            style={{
              backgroundColor: `${tc.accentPrimary}25`,
              border: `1px solid ${tc.accentPrimary}`
            }}
          >
            <Radar className="w-4 h-4" style={{ color: tc.accentPrimary }} />
          </div>
          <span
            className="uppercase tracking-wider font-bold"
            style={{ fontSize: '15px', color: tc.textPrimary }}
          >
            KESSLER
          </span>
        </div>

        {/* Constellation Selector Dropdown */}
        {isAuthenticated && user?.role === 'super_admin' && (
          <div className="relative" ref={companyRef}>
            <button
              onClick={() => setShowCompanySearch(!showCompanySearch)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors"
              style={{
                backgroundColor: tc.bgSecondary,
                border: `1px solid ${tc.borderPrimary}`,
                color: tc.textPrimary,
                cursor: 'pointer'
              }}
            >
              <Satellite className="w-3.5 h-3.5" style={{ color: tc.accentPrimary }} />
              <span style={{ fontSize: '13px', fontWeight: 600 }}>Vanguard LEO Shell-1</span>
              <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: tc.accentPrimary }}>VGD-LEO</span>
              <ChevronDown className="w-3.5 h-3.5" style={{ color: tc.textSecondary }} />
            </button>

            {showCompanySearch && (
              <div
                className="absolute left-0 top-full mt-1 w-72 rounded-lg shadow-xl z-50"
                style={{ backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}` }}
              >
                <div className="p-3 border-b" style={{ borderColor: tc.borderPrimary }}>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: tc.textSecondary }} />
                    <input
                      type="text"
                      placeholder="Search orbital shells..."
                      value={companySearch}
                      onChange={e => setCompanySearch(e.target.value)}
                      autoFocus
                      style={{
                        width: '100%', height: '36px', paddingLeft: '32px', paddingRight: '10px',
                        backgroundColor: tc.bgTertiary,
                        border: `1px solid ${tc.borderPrimary}`, borderRadius: '6px',
                        color: tc.textPrimary, fontSize: '13px', outline: 'none'
                      }}
                    />
                  </div>
                </div>
                <div className="p-2">
                  <p style={{ fontSize: '11px', color: tc.textSecondary, padding: '4px 8px 6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Active Orbital Shells
                  </p>
                  {RECENT_CONSTELLATIONS.map(co => (
                    <button
                      key={co.ticker}
                      className="w-full flex items-center gap-3 px-2 py-2 rounded-md transition-colors text-left"
                      style={{ color: tc.textPrimary }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = tc.hoverBg}
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

        {/* Constellation Display - Non-Super Admin */}
        {isAuthenticated && (user?.role === 'company_admin' || user?.role === 'normal_user') && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md" style={{
            backgroundColor: tc.bgSecondary,
            border: `1px solid ${tc.borderPrimary}`,
            color: tc.textPrimary
          }}>
            <Satellite className="w-3.5 h-3.5" style={{ color: tc.accentPrimary }} />
            <span style={{ fontSize: '13px', fontWeight: 600 }}>Vanguard LEO Shell-1</span>
            <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: tc.accentPrimary }}>VGD-LEO</span>
          </div>
        )}
      </div>

      {/* Right: Theme, Notifications, User */}
      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={toggleTheme}
          onMouseEnter={() => setIsThemeHovered(true)}
          onMouseLeave={() => setIsThemeHovered(false)}
          className="w-8 h-8 flex items-center justify-center rounded transition-colors duration-150 cursor-pointer"
          style={{
            backgroundColor: isThemeHovered ? tc.hoverBg : 'transparent',
            color: isThemeHovered ? tc.accentPrimary : tc.textSecondary
          }}
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
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = tc.hoverBg; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              aria-label="Telemetry Alerts"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: tc.alertRed, fontSize: '10px', fontWeight: 700, color: '#FFFFFF' }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-1 w-80 rounded-lg shadow-xl z-50 overflow-hidden" style={{
                backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}`
              }}>
                <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: tc.borderPrimary }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: tc.textPrimary }}>Orbital Alerts</span>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} style={{ fontSize: '12px', color: tc.accentPrimary, background: 'none', border: 'none', cursor: 'pointer' }}>
                      Acknowledge all
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      className="px-4 py-3 border-b transition-colors cursor-pointer"
                      style={{
                        borderColor: tc.borderPrimary,
                        backgroundColor: n.unread ? (theme === 'dark' ? 'rgba(6,182,212,0.06)' : '#F0F9FF') : 'transparent'
                      }}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: notifTypeColor[n.type] }} />
                        <div className="flex-1 min-w-0">
                          <p style={{ fontSize: '12px', color: tc.textPrimary, lineHeight: 1.4 }}>{n.text}</p>
                          <span className="font-mono" style={{ fontSize: '10px', color: tc.textSecondary }}>{n.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* User Menu */}
        {isAuthenticated && user && (
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
              className="flex items-center gap-2 px-2 py-1 rounded transition-colors cursor-pointer"
              style={{ color: tc.textPrimary }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ backgroundColor: getRoleBadgeColor(user.role), color: '#FFFFFF', fontSize: '11px', fontWeight: 700 }}
              >
                {user.initials}
              </div>
              <span className="hidden md:inline text-xs font-semibold">{user.name}</span>
              <ChevronDown className="w-3.5 h-3.5" style={{ color: tc.textSecondary }} />
            </button>

            {showUserMenu && (
              <div
                className="absolute right-0 top-full mt-1 w-56 rounded-lg shadow-xl z-50 overflow-hidden"
                style={{ backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}` }}
              >
                <div className="px-4 py-3 border-b" style={{ borderColor: tc.borderPrimary }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: tc.textPrimary }}>{user.name}</div>
                  <div style={{ fontSize: '11px', color: tc.textSecondary }}>{user.email}</div>
                  <div className="mt-1.5 inline-flex px-2 py-0.5 rounded text-[10px] font-mono uppercase" style={{
                    backgroundColor: `${getRoleBadgeColor(user.role)}20`,
                    color: getRoleBadgeColor(user.role),
                    border: `1px solid ${getRoleBadgeColor(user.role)}40`
                  }}>
                    {getRoleLabel(user.role)}
                  </div>
                </div>
                <button
                  onClick={() => { setShowUserMenu(false); navigate('/settings'); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs transition-colors"
                  style={{ color: tc.textPrimary }}
                >
                  <Settings className="w-4 h-4" style={{ color: tc.textSecondary }} />
                  Console Preferences
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs border-t transition-colors"
                  style={{ color: tc.alertRed, borderColor: tc.borderPrimary }}
                >
                  <LogOut className="w-4 h-4" />
                  Terminate Session
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
