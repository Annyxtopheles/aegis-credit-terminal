import { useState, useEffect, useCallback } from 'react';
import { Clock, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';
import { useNavigate } from 'react-router';

const IDLE_TIMEOUT = 30 * 60 * 1000; // 30 min
const WARN_BEFORE = 2 * 60 * 1000;   // warn 2 min before

export function SessionTimeoutModal() {
  const { isAuthenticated, logout } = useAuth();
  const { theme } = useTheme();
  const tc = colors[theme];
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(120);
  const [warningTimer, setWarningTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [idleTimer, setIdleTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const resetTimers = useCallback(() => {
    if (warningTimer) clearTimeout(warningTimer);
    if (idleTimer) clearTimeout(idleTimer);
    setShowWarning(false);
    setCountdown(120);

    if (!isAuthenticated) return;

    const wt = setTimeout(() => setShowWarning(true), IDLE_TIMEOUT - WARN_BEFORE);
    const it = setTimeout(() => {
      logout();
      navigate('/login');
    }, IDLE_TIMEOUT);

    setWarningTimer(wt);
    setIdleTimer(it);
  }, [isAuthenticated, logout, navigate]); // eslint-disable-line

  useEffect(() => {
    if (!isAuthenticated) return;
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    const handler = () => resetTimers();
    events.forEach(e => window.addEventListener(e, handler, { passive: true }));
    resetTimers();
    return () => {
      events.forEach(e => window.removeEventListener(e, handler));
      if (warningTimer) clearTimeout(warningTimer);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [isAuthenticated]); // eslint-disable-line

  // Countdown
  useEffect(() => {
    if (!showWarning) return;
    setCountdown(120);
    const interval = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(interval); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showWarning]);

  const handleStayLoggedIn = () => {
    resetTimers();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  if (!showWarning || !isAuthenticated) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
      <div className="relative w-full max-w-md mx-4 rounded-xl p-8 shadow-2xl" style={{
        backgroundColor: tc.bgSecondary,
        border: `1px solid ${tc.borderPrimary}`
      }}>
        <button
          onClick={handleStayLoggedIn}
          className="absolute top-4 right-4"
          style={{ background: 'none', border: 'none', color: tc.textSecondary, cursor: 'pointer' }}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F59E0B20' }}>
            <Clock className="w-8 h-8" style={{ color: '#F59E0B' }} />
          </div>
        </div>

        <h2 style={{ textAlign: 'center', fontSize: '22px', fontWeight: 700, color: tc.textPrimary, marginBottom: '8px' }}>
          Session Expiring Soon
        </h2>
        <p style={{ textAlign: 'center', fontSize: '14px', color: tc.textSecondary, marginBottom: '24px', lineHeight: 1.6 }}>
          For your security, you'll be logged out after 30 minutes of inactivity.
        </p>

        {/* Countdown */}
        <div className="flex justify-center mb-6">
          <div className="px-6 py-3 rounded-lg" style={{ backgroundColor: '#F59E0B20', border: '1px solid #F59E0B40' }}>
            <span style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', color: '#F59E0B' }}>
              {formatTime(countdown)}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleStayLoggedIn}
            className="flex-1 transition-all"
            style={{
              height: '48px', backgroundColor: '#0891B2', color: '#FFFFFF',
              border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0E7490'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0891B2'}
          >
            Stay Logged In
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 transition-all"
            style={{
              height: '48px', backgroundColor: 'transparent', color: tc.textSecondary,
              border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px', fontSize: '15px', fontWeight: 500, cursor: 'pointer'
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = theme === 'dark' ? '#0F1A2A' : '#F9FAFB'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
