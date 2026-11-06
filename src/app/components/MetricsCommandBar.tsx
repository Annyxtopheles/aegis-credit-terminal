import { useState, useEffect } from 'react';
import { AlertCircle, Radio, Search, Terminal, ShieldAlert, Satellite, Zap, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTelemetry } from '../context/TelemetryContext';
import { colors } from '../theme/colors';
import { useNavigate } from 'react-router';
import { CommandPaletteModal } from './CommandPaletteModal';

export function MetricsCommandBar() {
  const { theme } = useTheme();
  const { streamMode, toggleStreamMode, isLive, solarFluxFormatted, pulseKey } = useTelemetry();
  const tc = colors[theme];
  const navigate = useNavigate();
  const [utcTime, setUtcTime] = useState(() => new Date().toISOString().slice(11, 19) + ' UTC');
  const [showPalette, setShowPalette] = useState(false);

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
        setShowPalette(prev => !prev);
      } else if (e.key === 'Escape') {
        setShowPalette(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const metrics = [
    {
      label: 'Mission Clock (UTC)',
      value: utcTime,
      secondary: 'Epoch J2000.0 sync',
      badge: 'Synchronized',
      badgeClass: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      icon: Radio
    },
    {
      label: 'Conjunction Risk (Pc)',
      value: '4.82e-4',
      secondary: 'Red threshold (> 1.0e-4)',
      badge: 'Critical Alert',
      badgeClass: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      icon: AlertCircle
    },
    {
      label: 'Solar Radio Flux',
      value: solarFluxFormatted,
      secondary: isLive ? 'Live SWPC telemetry feed' : 'Elevated thermospheric drag',
      badge: isLive ? 'Live Drag Pulse' : '+18.4% Drag',
      badgeClass: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      icon: Zap
    },
    {
      label: 'Geomagnetic Kp',
      value: 'Kp 5.3 (G1)',
      secondary: 'Minor storm watch',
      badge: 'NOAA SWPC',
      badgeClass: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      icon: ShieldAlert
    },
    {
      label: 'Active Fleet',
      value: '48 / 48 Satellites',
      secondary: 'S-band & optical locked',
      badge: 'Nominal',
      badgeClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      icon: Satellite
    }
  ];

  return (
    <>
      <div className="space-y-3">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="p-4 transition-all duration-200 rounded-2xl flex flex-col justify-between"
                style={{
                  backgroundColor: tc.bgSecondary,
                  border: `1px solid ${tc.borderPrimary}`
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium truncate" style={{ color: tc.textSecondary }}>{metric.label}</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${metric.badgeClass}`}>
                    {metric.badge}
                  </span>
                </div>
                <div>
                  <div className="text-lg font-bold tabular-nums" style={{ color: tc.textPrimary }}>
                    {metric.value}
                  </div>
                  <div className="text-[11px] mt-0.5 truncate" style={{ color: tc.textSecondary }}>
                    {metric.secondary}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cmd+K Telemetry Command Bar & Stream Toggle */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => setShowPalette(true)}
            className="flex-1 h-10 px-4 rounded-xl flex items-center justify-between cursor-pointer transition-colors"
            style={{
              backgroundColor: tc.bgSecondary,
              border: `1px solid ${tc.borderPrimary}`
            }}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Terminal className="w-4 h-4 text-indigo-400 shrink-0" />
              <span className="text-xs truncate" style={{ color: tc.textSecondary }}>
                Command line // Search NORAD ID, COSPAR designator, or execute CAM simulation...
              </span>
            </div>
            <kbd
              className="px-2 py-0.5 text-[10px] rounded-lg transition-colors font-semibold"
              style={{
                backgroundColor: tc.bgTertiary,
                border: `1px solid ${tc.borderPrimary}`,
                color: tc.textSecondary
              }}
            >
              ⌘K
            </kbd>
          </div>

          <button
            onClick={toggleStreamMode}
            className="h-10 px-3.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer font-medium shrink-0"
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
              {streamMode === 'LIVE' ? 'LIVE PULSE' : 'SIMULATED'}
            </span>
          </button>
        </div>
      </div>

      {/* Command Palette Modal */}
      <CommandPaletteModal isOpen={showPalette} onClose={() => setShowPalette(false)} />
    </>
  );
}
