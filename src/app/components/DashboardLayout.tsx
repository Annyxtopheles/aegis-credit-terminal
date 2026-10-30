import { ReactNode, useState, useEffect } from 'react';
import { Radio, ShieldCheck, Activity, Wifi } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useSidebar } from '../context/SidebarContext';
import { colors } from '../theme/colors';
import { NewSidebar } from './NewSidebar';
import { SessionTimeoutModal } from './SessionTimeoutModal';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { theme } = useTheme();
  const { isCollapsed } = useSidebar();
  const tc = colors[theme];
  const [packetCount, setPacketCount] = useState(142);

  useEffect(() => {
    const interval = setInterval(() => {
      setPacketCount(136 + Math.floor(Math.random() * 18));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const sidebarWidth = isCollapsed ? '72px' : '260px';

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: tc.bgPrimary,
        backgroundImage:
          theme === 'dark'
            ? 'radial-gradient(rgba(245, 158, 11, 0.08) 1px, transparent 1px)'
            : 'radial-gradient(rgba(217, 119, 6, 0.08) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}
    >
      {/* Sleek Left Navigation Sidebar */}
      <NewSidebar />

      {/* Main Viewport Offset by Sidebar Width */}
      <div
        className="transition-all duration-300 flex flex-col min-h-screen"
        style={{ marginLeft: sidebarWidth }}
      >
        <main className="flex-1 w-full max-w-[1920px] mx-auto pb-10">
          {children}
        </main>

        {/* Persistent Bottom Ground-Station Telemetry Dock */}
        <footer
          className="fixed bottom-0 right-0 h-7 z-30 px-3 md:px-5 flex items-center justify-between font-mono text-[10px] transition-all duration-300"
          style={{
            left: sidebarWidth,
            backgroundColor: tc.bgSecondary,
            borderTop: `1px solid ${tc.borderPrimary}`,
            color: tc.textSecondary
          }}
        >
          <div className="flex items-center gap-4 overflow-hidden">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: tc.alertGreen }} />
              <span className="font-bold" style={{ color: tc.textPrimary }}>SVALBARD SVAL-02:</span>
              <span style={{ color: tc.alertGreen }}>AOS LOCKED (Ka-Band 32.4 GHz)</span>
            </div>
            <span style={{ color: tc.borderPrimary }}>|</span>
            <div className="hidden sm:flex items-center gap-1.5 whitespace-nowrap">
              <Radio className="w-3 h-3" style={{ color: tc.accentPrimary }} />
              <span className="font-bold" style={{ color: tc.textPrimary }}>KWAJALEIN:</span>
              <span style={{ color: tc.accentPrimary }}>S-BAND TRACKING [27,412 OBJ]</span>
            </div>
            <span className="hidden md:inline" style={{ color: tc.borderPrimary }}>|</span>
            <div className="hidden md:flex items-center gap-1.5 whitespace-nowrap">
              <Wifi className="w-3 h-3" style={{ color: tc.alertAmber }} />
              <span className="font-bold" style={{ color: tc.textPrimary }}>PUNTA ARENAS:</span>
              <span style={{ color: tc.alertAmber }}>LOS T-00:14:22</span>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="hidden lg:flex items-center gap-1.5">
              <Activity className="w-3 h-3" style={{ color: tc.accentPrimary }} />
              <span>STREAM:</span>
              <span className="font-bold" style={{ color: tc.accentPrimary }}>{packetCount} pkt/s</span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" style={{ color: tc.alertGreen }} />
              <span className="uppercase">CCSDS CDM v2.0 // SGP4</span>
            </div>
          </div>
        </footer>
      </div>

      <SessionTimeoutModal />
    </div>
  );
}
