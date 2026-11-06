import { ReactNode, useState, useEffect } from 'react';
import { LayoutGrid, Search, Radio, Plus, Share2, X, ArrowRight, Activity } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useSidebar } from '../context/SidebarContext';
import { useTelemetry } from '../context/TelemetryContext';
import { colors } from '../theme/colors';
import { NewSidebar } from './NewSidebar';
import { SessionTimeoutModal } from './SessionTimeoutModal';
import { CommandPaletteModal } from './CommandPaletteModal';
import { useLocation, useNavigate } from 'react-router';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { theme } = useTheme();
  const { isCollapsed } = useSidebar();
  const { streamMode, toggleStreamMode, isLive } = useTelemetry();
  const tc = colors[theme];
  const location = useLocation();
  const navigate = useNavigate();

  const [utcTime, setUtcTime] = useState(() => new Date().toISOString().slice(11, 19) + ' UTC');
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setUtcTime(new Date().toISOString().slice(11, 19) + ' UTC');
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName);
      if (((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') || (e.key === '/' && !isInput)) {
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
    if (location.pathname === '/dashboard/radar') return 'B-Plane Radar Scope';
    if (location.pathname.includes('/capital-structure')) return 'Constellation Ephemeris';
    if (location.pathname.includes('/covenant-compliance')) return 'Orbital Safety & SLA';
    if (location.pathname.includes('/priorities-events')) return 'Maneuver Burn Queue';
    if (location.pathname.includes('/sector-news')) return 'Space Weather Bulletins';
    if (location.pathname.includes('/user-management')) return 'Flight Crew Access';
    if (location.pathname === '/settings') return 'Settings';
    return 'Dashboard';
  };

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
        {/* Clean Top Header Bar (Exact Tempo Style) */}
        <header className="px-6 lg:px-8 pt-5 pb-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <LayoutGrid className="w-[18px] h-[18px]" style={{ color: tc.textSecondary }} />
            <h1 className="text-[17px] font-semibold tracking-tight" style={{ color: tc.textPrimary }}>
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Live / Simulated Telemetry Stream Toggle */}
            <button
              onClick={toggleStreamMode}
              className="flex items-center gap-2 h-9 px-3 rounded-xl text-xs transition-all cursor-pointer font-medium"
              style={{
                backgroundColor: isLive
                  ? (theme === 'dark' ? 'rgba(74, 222, 128, 0.08)' : 'rgba(22, 163, 74, 0.08)')
                  : tc.bgSecondary,
                border: `1px solid ${isLive ? (theme === 'dark' ? 'rgba(74, 222, 128, 0.25)' : 'rgba(22, 163, 74, 0.25)') : tc.borderPrimary}`,
                color: isLive ? (theme === 'dark' ? '#4ADE80' : '#16A34A') : tc.textSecondary
              }}
              title={isLive ? 'Telemetry Pulse Active (Click to switch to Simulated)' : 'Simulated Telemetry Mode (Click to switch to Live)'}
            >
              <span className="relative flex h-2 w-2">
                {isLive && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isLive ? 'bg-emerald-500' : 'bg-zinc-400'}`} />
              </span>
              <span className="text-[11px] font-semibold tracking-wider uppercase">
                {streamMode === 'LIVE' ? 'LIVE STREAM' : 'SIMULATED'}
              </span>
            </button>

            {/* Live UTC Mission Clock */}
            <div
              className="hidden md:flex items-center gap-2 h-9 px-3 rounded-xl text-xs tabular-nums"
              style={{
                backgroundColor: tc.bgSecondary,
                border: `1px solid ${tc.borderPrimary}`,
                color: tc.textSecondary
              }}
            >
              <Radio className="w-3 h-3 animate-pulse" style={{ color: tc.alertGreen }} />
              <span className="font-semibold" style={{ color: tc.textPrimary }}>{utcTime}</span>
            </div>

            {/* Search Anything Pill */}
            <button
              onClick={() => setShowSearchModal(true)}
              className="hidden sm:flex items-center justify-between gap-8 h-9 px-3.5 rounded-xl text-xs transition-colors cursor-pointer"
              style={{
                backgroundColor: tc.bgSecondary,
                border: `1px solid ${tc.borderPrimary}`,
                color: tc.textSecondary,
                minWidth: '220px'
              }}
            >
              <span className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5" style={{ color: tc.textTertiary }} />
                <span>Search Anything...</span>
              </span>
              <div className="flex items-center gap-1">
                <kbd
                  className="px-1.5 py-0.5 rounded text-[10px]"
                  style={{
                    backgroundColor: tc.bgTertiary,
                    color: tc.textTertiary
                  }}
                >
                  ⌘K
                </kbd>
                <kbd
                  className="px-1.5 py-0.5 rounded text-[10px]"
                  style={{
                    backgroundColor: tc.bgTertiary,
                    color: tc.textTertiary
                  }}
                >
                  /
                </kbd>
              </div>
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

      {/* Military/Aerospace Command Palette Modal (Cmd+K or /) */}
      <CommandPaletteModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
      />

      <SessionTimeoutModal />
    </div>
  );
}
