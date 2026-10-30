import { useState, useEffect } from 'react';
import { AlertCircle, Radio, Search, Terminal, ShieldAlert, Satellite, Zap, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';
import { useNavigate } from 'react-router';

const TELEMETRY_COMMANDS = [
  { id: 'overview', label: 'Orbital Telemetry & Conjunction Overview', cmd: 'GOTO // OVERVIEW', path: '/dashboard' },
  { id: 'ephemeris', label: 'Constellation Ephemeris & Thruster Delta-V Ledger', cmd: 'GOTO // EPHEMERIS', path: '/dashboard/capital-structure' },
  { id: 'compliance', label: 'FCC/ESA De-Orbit & Safety Compliance Matrix', cmd: 'GOTO // SAFETY-SLA', path: '/dashboard/covenant-compliance' },
  { id: 'maneuvers', label: 'Flight Dynamics Directives & Burn Windows', cmd: 'GOTO // MANEUVERS', path: '/dashboard/priorities-events' },
  { id: 'weather', label: 'Space Weather & Solar Flux Advisories', cmd: 'GOTO // SPACE-WX', path: '/dashboard/sector-news' },
  { id: 'tle', label: 'Fetch Latest NORAD Two-Line Element (TLE) Set', cmd: 'EXEC // SYNC-TLE --NORAD-58214', path: '/dashboard/capital-structure' },
  { id: 'cam', label: 'Simulate Prograde Collision Avoidance Burn (+0.42 m/s)', cmd: 'SIM // CAM-VANGUARD-04', path: '/dashboard/priorities-events' },
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
      label: 'MISSION CLOCK (UTC)',
      value: utcTime,
      secondary: 'EPOCH J2000.0 // SYNC NOMINAL',
      color: tc.accentPrimary,
      icon: Radio
    },
    {
      label: 'CONJUNCTION RISK (Pc)',
      value: '4.82e-4',
      secondary: 'RED THRESHOLD (> 1.0e-4)',
      color: tc.alertRed,
      icon: AlertCircle
    },
    {
      label: 'SOLAR FLUX (F10.7)',
      value: '184.2 SFU',
      secondary: 'THERMOSPHERIC DRAG: ELEVATED',
      color: tc.alertAmber,
      icon: Zap
    },
    {
      label: 'GEOMAGNETIC Kp INDEX',
      value: 'Kp 5.3 (G1)',
      secondary: 'MINOR STORM // HIGH-LATITUDE',
      color: tc.alertAmber,
      icon: ShieldAlert
    },
    {
      label: 'ACTIVE CONSTELLATION',
      value: '48 / 48',
      secondary: 'PLANE A-D // S-BAND LOCKED',
      color: tc.alertGreen,
      icon: Satellite
    }
  ];

  return (
    <>
      <div className="space-y-2">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="p-2.5 transition-colors duration-300 rounded-sm"
                style={{
                  backgroundColor: tc.bgSecondary,
                  border: `1px solid ${tc.borderPrimary}`
                }}
              >
                <div
                  className="uppercase tracking-wider mb-1 flex items-center justify-between"
                  style={{
                    fontSize: '10px',
                    color: tc.textSecondary,
                    fontWeight: 600,
                    letterSpacing: '0.06em'
                  }}
                >
                  <span>{metric.label}</span>
                  <Icon className="w-3.5 h-3.5" style={{ color: metric.color }} />
                </div>
                <div className="flex items-center gap-1.5">
                  <div
                    className="font-mono"
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: metric.color,
                      lineHeight: '1.2'
                    }}
                  >
                    {metric.value}
                  </div>
                </div>
                {metric.secondary && (
                  <div className="font-mono truncate" style={{ fontSize: '9px', color: tc.textTertiary, marginTop: '3px' }}>
                    {metric.secondary}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Cmd+K Telemetry Command Bar */}
        <div
          onClick={() => setShowPalette(true)}
          className="h-8 px-3 rounded-sm flex items-center justify-between cursor-pointer transition-colors"
          style={{
            backgroundColor: tc.bgSecondary,
            border: `1px solid ${tc.borderPrimary}`
          }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <Terminal className="w-3.5 h-3.5 flex-shrink-0" style={{ color: tc.accentPrimary }} />
            <span className="font-mono text-[11px] truncate" style={{ color: tc.textSecondary }}>
              TELEMETRY COMMAND LINE // Search NORAD ID, COSPAR designator, or execute CAM simulation...
            </span>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <kbd
              className="px-1.5 py-0.5 text-[10px] font-mono rounded"
              style={{
                backgroundColor: tc.bgTertiary,
                color: tc.accentPrimary,
                border: `1px solid ${tc.borderPrimary}`
              }}
            >
              Ctrl+K
            </kbd>
          </div>
        </div>
      </div>

      {/* Command Palette Modal */}
      {showPalette && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
          style={{ backgroundColor: 'rgba(6, 8, 13, 0.78)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowPalette(false)}
        >
          <div
            className="w-full max-w-xl rounded-md shadow-2xl overflow-hidden"
            style={{ backgroundColor: tc.bgSecondary, border: `1px solid ${tc.accentPrimary}` }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center px-3.5 py-2.5 border-b" style={{ borderColor: tc.borderPrimary }}>
              <Search className="w-4 h-4 mr-2.5" style={{ color: tc.accentPrimary }} />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Enter telemetry command, NORAD ID (e.g., 58214), or subsystem..."
                className="w-full bg-transparent font-mono text-xs outline-none"
                style={{ color: tc.textPrimary }}
              />
              <button
                onClick={() => setShowPalette(false)}
                className="p-1 rounded cursor-pointer"
                style={{ color: tc.textSecondary }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-72 overflow-y-auto p-1.5 space-y-1">
              {filteredCommands.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.path);
                    setShowPalette(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded text-left transition-colors cursor-pointer"
                  style={{ color: tc.textPrimary }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = tc.hoverBg)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span className="text-xs font-medium">{item.label}</span>
                  <span className="font-mono text-[10px]" style={{ color: tc.accentPrimary }}>
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
