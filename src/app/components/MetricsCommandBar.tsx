import { useState, useEffect } from 'react';
import { AlertCircle, Radio, Search, Terminal, ShieldAlert, Satellite, Zap, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
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
      value: '184.2 SFU',
      secondary: 'Elevated thermospheric drag',
      badge: '+18.4% Drag',
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
      value: '48 / 48 SV',
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
                className="p-4 transition-all duration-200 rounded-2xl bg-[#1F2024] border border-[#2A2C32] hover:border-zinc-700/60 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-zinc-400 truncate">{metric.label}</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${metric.badgeClass}`}>
                    {metric.badge}
                  </span>
                </div>
                <div>
                  <div className="text-lg font-bold text-zinc-100">
                    {metric.value}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5 truncate">
                    {metric.secondary}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cmd+K Telemetry Command Bar */}
        <div
          onClick={() => setShowPalette(true)}
          className="h-10 px-4 rounded-xl flex items-center justify-between cursor-pointer transition-colors bg-[#1F2024] border border-[#2A2C32] hover:border-zinc-700/60"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Terminal className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="text-xs text-zinc-400 truncate">
              Command line // Search NORAD ID, COSPAR designator, or execute CAM simulation...
            </span>
          </div>
          <kbd className="px-2 py-0.5 text-[10px] rounded-lg bg-[#16171A] text-zinc-400 border border-[#2A2C32]">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Command Palette Modal */}
      {showPalette && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowPalette(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-[#1F2024] border border-[#2A2C32] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center px-4 py-3 border-b border-[#2A2C32]">
              <Search className="w-4 h-4 mr-3 text-indigo-400" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Enter telemetry command or jump to page..."
                className="w-full bg-transparent text-xs text-zinc-100 placeholder-zinc-500 outline-none"
              />
              <button
                onClick={() => setShowPalette(false)}
                className="text-zinc-400 hover:text-zinc-200 p-1"
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
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-colors hover:bg-zinc-800/40"
                >
                  <span className="text-xs font-medium text-zinc-200">{item.label}</span>
                  <span className="text-[10px] text-indigo-400">
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
