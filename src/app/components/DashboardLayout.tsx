import { ReactNode, useState, useEffect } from 'react';
import { Orbit, Search, Radio, Upload, Activity, X, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useSidebar } from '../context/SidebarContext';
import { colors } from '../theme/colors';
import { NewSidebar } from './NewSidebar';
import { SessionTimeoutModal } from './SessionTimeoutModal';
import { useLocation, useNavigate } from 'react-router';

interface DashboardLayoutProps {
  children: ReactNode;
}

const TELEMETRY_COMMANDS = [
  { id: 'overview', label: 'B-Plane Radar & Telemetry Overview', cmd: 'GOTO // RADAR-OVERVIEW', path: '/dashboard' },
  { id: 'ephemeris', label: 'Constellation Ephemeris & Thruster ΔV Ledger', cmd: 'GOTO // EPHEMERIS', path: '/dashboard/capital-structure' },
  { id: 'safety', label: 'FCC / ESA De-Orbit & Orbital Safety SLA', cmd: 'GOTO // SAFETY-SLA', path: '/dashboard/covenant-compliance' },
  { id: 'maneuvers', label: 'Maneuver Burn Queue & Ground Station Passes', cmd: 'GOTO // CAM-QUEUE', path: '/dashboard/priorities-events' },
  { id: 'weather', label: 'NOAA SWPC Space Weather & Solar Flux Bulletins', cmd: 'GOTO // SPACE-WX', path: '/dashboard/sector-news' },
  { id: 'crew', label: 'Flight Dynamics Crew & Console Clearance', cmd: 'GOTO // CREW-ROSTER', path: '/dashboard/user-management' },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { theme } = useTheme();
  const { isCollapsed } = useSidebar();
  const tc = colors[theme];
  const location = useLocation();
  const navigate = useNavigate();

  const [utcTime, setUtcTime] = useState(() => new Date().toISOString().slice(11, 19) + ' UTC');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setUtcTime(new Date().toISOString().slice(11, 19) + ' UTC');
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowSearchModal(prev => !prev);
      } else if (e.key === 'Escape') {
        setShowSearchModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const sidebarWidth = isCollapsed ? '72px' : '256px';

  const getPageTitle = () => {
    if (location.pathname.startsWith('/admin')) return 'FDO Command Console';
    if (location.pathname.includes('/capital-structure')) return 'Constellation Ephemeris & Thruster ΔV';
    if (location.pathname.includes('/covenant-compliance')) return 'Orbital Safety & FCC De-Orbit SLA';
    if (location.pathname.includes('/priorities-events')) return 'Maneuver Burn Queue & AOS Passes';
    if (location.pathname.includes('/sector-news')) return 'Space Weather & Solar Flux Advisories';
    if (location.pathname.includes('/user-management')) return 'Flight Crew Access';
    if (location.pathname === '/settings') return 'Console Settings';
    return 'Orbital Surveillance & B-Plane Telemetry';
  };

  const filteredCommands = TELEMETRY_COMMANDS.filter(
    c =>
      c.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.cmd.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: tc.bgPrimary, color: tc.textPrimary }}
    >
      {/* Left Navigation Sidebar */}
      <NewSidebar />

      {/* Main Content Area */}
      <div
        className="transition-all duration-300 flex flex-col min-h-screen"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* Clean Top Header Bar */}
        <header className="px-6 lg:px-8 pt-5 pb-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Orbit className="w-[18px] h-[18px]" style={{ color: tc.accentPrimary }} />
            <h1 className="text-[16px] font-semibold tracking-tight" style={{ color: tc.textPrimary }}>
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Live UTC Mission Clock Pill */}
            <div
              className="hidden md:flex items-center gap-2 h-9 px-3.5 rounded-xl text-xs font-mono"
              style={{
                backgroundColor: tc.bgSecondary,
                border: `1px solid ${tc.borderPrimary}`,
                color: tc.textPrimary
              }}
            >
              <Radio className="w-3.5 h-3.5 animate-pulse" style={{ color: tc.alertGreen }} />
              <span>{utcTime}</span>
            </div>

            {/* Search Telemetry / NORAD ID Pill */}
            <button
              onClick={() => setShowSearchModal(true)}
              className="hidden sm:flex items-center justify-between gap-6 h-9 px-3.5 rounded-xl text-xs transition-colors cursor-pointer"
              style={{
                backgroundColor: tc.bgSecondary,
                border: `1px solid ${tc.borderPrimary}`,
                color: tc.textSecondary,
                minWidth: '240px'
              }}
            >
              <span className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5" style={{ color: tc.textTertiary }} />
                <span>Search NORAD ID or telemetry...</span>
              </span>
              <kbd
                className="px-1.5 py-0.5 rounded text-[10px] font-mono"
                style={{
                  backgroundColor: tc.bgTertiary,
                  color: tc.textTertiary
                }}
              >
                ⌘K
              </kbd>
            </button>

            <div
              className="hidden sm:block h-4 w-[1px]"
              style={{ backgroundColor: tc.borderPrimary }}
            />

            {/* CAM Burn Queue Button */}
            <button
              onClick={() => navigate('/dashboard/priorities-events')}
              className="h-9 px-3.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              style={{
                backgroundColor: tc.bgSecondary,
                border: `1px solid ${tc.borderPrimary}`,
                color: tc.textPrimary
              }}
            >
              <Activity className="w-3.5 h-3.5" style={{ color: tc.accentPrimary }} />
              <span>CAM Queue</span>
            </button>

            {/* Ingest TLE / CDM Button */}
            <button
              onClick={() => navigate('/admin?tab=data-upload')}
              className="h-9 px-3.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              style={{
                backgroundColor: tc.bgSecondary,
                border: `1px solid ${tc.borderPrimary}`,
                color: tc.textPrimary
              }}
            >
              <Upload className="w-3.5 h-3.5" style={{ color: tc.textSecondary }} />
              <span>TLE Ingest</span>
            </button>
          </div>
        </header>

        <main className="flex-1 w-full max-w-[1680px] mx-auto px-6 lg:px-8 pb-10">
          {children}
        </main>
      </div>

      {/* Cmd+K Telemetry Command Modal */}
      {showSearchModal && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowSearchModal(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
            style={{
              backgroundColor: tc.bgSecondary,
              border: `1px solid ${tc.borderPrimary}`
            }}
            onClick={e => e.stopPropagation()}
          >
            <div
              className="flex items-center gap-3 px-4 py-3.5 border-b"
              style={{ borderColor: tc.borderPrimary }}
            >
              <Search className="w-4 h-4" style={{ color: tc.textSecondary }} />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search NORAD ID (e.g. 58214), COSPAR, or telemetry module..."
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: tc.textPrimary }}
              />
              <button
                onClick={() => setShowSearchModal(false)}
                className="p-1 rounded-lg cursor-pointer"
                style={{ color: tc.textSecondary }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 max-h-72 overflow-y-auto space-y-1">
              {filteredCommands.map(cmd => (
                <button
                  key={cmd.id}
                  onClick={() => {
                    setShowSearchModal(false);
                    navigate(cmd.path);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer"
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = tc.bgTertiary)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div>
                    <div className="text-xs font-semibold" style={{ color: tc.textPrimary }}>
                      {cmd.label}
                    </div>
                    <div className="text-[11px] font-mono" style={{ color: tc.accentPrimary }}>
                      {cmd.cmd}
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5" style={{ color: tc.textTertiary }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <SessionTimeoutModal />
    </div>
  );
}
