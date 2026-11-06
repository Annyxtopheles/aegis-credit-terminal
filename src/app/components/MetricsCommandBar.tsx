import { useState, useEffect } from 'react';
import { AlertCircle, Radio, Search, Terminal, ShieldAlert, Satellite, Zap, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTelemetry } from '../context/TelemetryContext';
import { colors } from '../theme/colors';
import { useNavigate } from 'react-router';

const TELEMETRY_COMMANDS = [
  { id: 'overview', label: 'Orbital Telemetry & Conjunction Overview', cmd: 'GOTO // OVERVIEW', path: '/dashboard' },
  { id: 'radar', label: 'B-Plane Radar Scope & Covariance Ellipsoids', cmd: 'GOTO // RADAR', path: '/dashboard/radar' },
  { id: 'ephemeris', label: 'Constellation Ephemeris & Thruster Delta-V Ledger', cmd: 'GOTO // EPHEMERIS', path: '/dashboard/capital-structure' },
  { id: 'compliance', label: 'FCC/ESA De-Orbit & Safety Compliance Matrix', cmd: 'GOTO // SAFETY-SLA', path: '/dashboard/covenant-compliance' },
  { id: 'maneuvers', label: 'Flight Dynamics Directives & Burn Windows', cmd: 'GOTO // MANEUVERS', path: '/dashboard/priorities-events' },
  { id: 'weather', label: 'Space Weather & Solar Flux Advisories', cmd: 'GOTO // SPACE-WX', path: '/dashboard/sector-news' },
];

export function MetricsCommandBar() {
  const { theme } = useTheme();
  const { streamMode, toggleStreamMode, isLive, solarFluxFormatted, pulseKey } = useTelemetry();
  const tc = colors[theme];
  const navigate = useNavigate();
  const [utcTime, setUtcTime] = useState(() => new Date().toISOString().slice(11, 19) + ' UTC');
  const [showPalette, setShowPalette] = useState(false);
  const [query, setQuery] = useState('');

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
        setShowPalette(prev => !prev);
      } else if (e.key === 'Escape') {
        setShowPalette(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredCommands = TELEMETRY_COMMANDS.filter(
    c => c.label.toLowerCase().includes(query.toLowerCase()) || c.cmd.toLowerCase().includes(query.toLowerCase())
  );

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
      {showPalette && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowPalette(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150 transition-colors"
            style={{
              backgroundColor: tc.bgSecondary,
              border: `1px solid ${tc.borderPrimary}`
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center px-4 py-3 border-b transition-colors" style={{ borderColor: tc.borderPrimary }}>
              <Search className="w-4 h-4 mr-3 text-indigo-400" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Enter telemetry command or jump to page..."
                className="w-full bg-transparent text-xs outline-none"
                style={{ color: tc.textPrimary }}
              />
              <button
                onClick={() => setShowPalette(false)}
                className="transition-colors p-1 cursor-pointer"
                style={{ color: tc.textSecondary }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-72 overflow-y-auto p-2 space-y-1">
              {filteredCommands.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.path);
                    setShowPalette(false);
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-colors cursor-pointer"
                  style={{
                    color: tc.textPrimary
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = tc.bgTertiary)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span className="text-xs font-medium">{item.label}</span>
                  <span className="text-[10px] text-indigo-400 font-mono">
                    {item.cmd}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
