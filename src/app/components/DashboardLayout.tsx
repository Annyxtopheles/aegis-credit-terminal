import { ReactNode } from 'react';
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

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: tc.bgPrimary }}>
      <NewSidebar />
      <div
        style={{ marginLeft: isCollapsed ? '80px' : '280px' }}
        className="transition-all duration-300 min-h-screen"
      >
        {children}
      </div>
      <SessionTimeoutModal />
    </div>
  );
}
