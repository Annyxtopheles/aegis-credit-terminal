import { ReactNode, useState, useEffect } from 'react';
import { LayoutGrid, Search, Plus, Share2, X, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useSidebar } from '../context/SidebarContext';
import { colors } from '../theme/colors';
import { NewSidebar } from './NewSidebar';
import { SessionTimeoutModal } from './SessionTimeoutModal';
import { useLocation, useNavigate } from 'react-router';

interface DashboardLayoutProps {
  children: ReactNode;
}

const QUICK_COMMANDS = [
  { id: 'overview', label: 'Dashboard Overview', desc: 'Orbital altitude flow, tracked object breakdown & active space vehicles', path: '/dashboard' },
  { id: 'ephemeris', label: 'Ephemeris & Thruster Ledger', desc: 'NORAD / COSPAR telemetry, propellant reserves & burn windows', path: '/dashboard/capital-structure' },
  { id: 'safety', label: 'Orbital Safety & SLA Matrix', desc: 'FCC 5-year de-orbit reserve & conjunction screening compliance', path: '/dashboard/covenant-compliance' },
  { id: 'maneuvers', label: 'Maneuver Burn Queue', desc: 'Scheduled Hall-effect thruster burns & ground station AOS passes', path: '/dashboard/priorities-events' },
  { id: 'weather', label: 'Space Weather Advisories', desc: 'NOAA SWPC geomagnetic storming & solar flux bulletins', path: '/dashboard/sector-news' },
  { id: 'crew', label: 'Crew Access & Permissions', desc: 'Manage flight dynamics operators and shell clearance', path: '/dashboard/user-management' },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { theme } = useTheme();
  const { isCollapsed } = useSidebar();
  const tc = colors[theme];
  const location = useLocation();
  const navigate = useNavigate();

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const sidebarWidth = isCollapsed ? '72px' : '248px';

  const getPageTitle = () => {
    if (location.pathname.startsWith('/admin')) return 'FDO Command';
    if (location.pathname.includes('/capital-structure')) return 'Ephemeris Ledger';
    if (location.pathname.includes('/covenant-compliance')) return 'Orbital Safety';
    if (location.pathname.includes('/priorities-events')) return 'Maneuver Queue';
    if (location.pathname.includes('/sector-news')) return 'Space Weather';
    if (location.pathname.includes('/user-management')) return 'Crew Access';
    if (location.pathname === '/settings') return 'Settings';
    return 'Dashboard';
  };

  const filteredCommands = QUICK_COMMANDS.filter(
    c =>
      c.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.desc.toLowerCase().includes(searchQuery.toLowerCase())
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
        {/* Clean Top Header Bar (Tempo Style) */}
        <header className="px-6 lg:px-8 pt-5 pb-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <LayoutGrid className="w-[18px] h-[18px]" style={{ color: tc.textSecondary }} />
            <h1 className="text-[16px] font-semibold tracking-tight" style={{ color: tc.textPrimary }}>
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Anything Pill */}
            <button
              onClick={() => setShowSearchModal(true)}
              className="hidden sm:flex items-center justify-between gap-8 h-9 px-3.5 rounded-xl text-xs transition-colors cursor-pointer"
              style={{
                backgroundColor: tc.bgSecondary,
                border: `1px solid ${tc.borderPrimary}`,
                color: tc.textSecondary,
                minWidth: '230px'
              }}
            >
              <span className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5" style={{ color: tc.textTertiary }} />
                <span>Search Anything...</span>
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

            {/* Add + Button */}
            <button
              onClick={() => navigate('/dashboard/priorities-events')}
              className="h-9 px-3.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              style={{
                backgroundColor: tc.bgSecondary,
                border: `1px solid ${tc.borderPrimary}`,
                color: tc.textPrimary
              }}
            >
              <span>Add</span>
              <Plus className="w-3.5 h-3.5" style={{ color: tc.textSecondary }} />
            </button>

            {/* Invite Button */}
            <button
              onClick={() => navigate('/dashboard/user-management')}
              className="h-9 px-3.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              style={{
                backgroundColor: tc.bgSecondary,
                border: `1px solid ${tc.borderPrimary}`,
                color: tc.textPrimary
              }}
            >
              <Share2 className="w-3.5 h-3.5" style={{ color: tc.textSecondary }} />
              <span>Invite</span>
            </button>
          </div>
        </header>

        <main className="flex-1 w-full max-w-[1680px] mx-auto px-6 lg:px-8 pb-10">
          {children}
        </main>
      </div>

      {/* Cmd+K Search Modal */}
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
                placeholder="Search orbital modules, NORAD IDs, or views..."
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
                    <div className="text-[11px]" style={{ color: tc.textSecondary }}>
                      {cmd.desc}
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
