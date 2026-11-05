import { useState, useEffect, useCallback } from 'react';
import { Clock, X, ShieldAlert } from 'lucide-react';
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

  if (!showWarning) return null;

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="w-full max-w-sm rounded-2xl p-6 shadow-2xl space-y-5 text-center animate-in fade-in zoom-in duration-200 transition-colors"
        style={{
          backgroundColor: tc.bgSecondary,
          border: `1px solid ${tc.borderPrimary}`
        }}
      >
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto">
          <Clock className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-base font-semibold tracking-tight" style={{ color: tc.textPrimary }}>
            Console Session Inactivity
          </h3>
          <p className="text-xs mt-1" style={{ color: tc.textSecondary }}>
            Telemetry link will disconnect automatically to protect encryption tokens
          </p>
        </div>

        <div
          className="p-3.5 rounded-xl transition-colors"
          style={{
            backgroundColor: tc.bgTertiary,
            border: `1px solid ${tc.borderPrimary}`
          }}
        >
          <div className="text-xs mb-0.5" style={{ color: tc.textSecondary }}>Disconnecting in</div>
          <div className="text-2xl font-bold text-amber-500 tabular-nums">{timeStr}</div>
        </div>

        <div className="flex gap-3 pt-1">
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="flex-1 h-10 rounded-xl font-medium text-xs transition-colors cursor-pointer"
            style={{
              backgroundColor: tc.bgTertiary,
              border: `1px solid ${tc.borderPrimary}`,
              color: tc.textSecondary
            }}
          >
            Log Out Now
          </button>
          <button
            onClick={resetTimers}
            className="flex-1 h-10 rounded-xl font-semibold text-xs tracking-tight transition-colors cursor-pointer"
            style={{
              backgroundColor: theme === 'dark' ? '#FFFFFF' : '#18181B',
              color: theme === 'dark' ? '#18181B' : '#FFFFFF'
            }}
          >
            Extend Session
          </button>
        </div>
      </div>
    </div>
  );
}
