import { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Satellite,
  AlertCircle,
  Terminal,
  ArrowRight,
  Radio,
  ShieldAlert,
  Zap,
  CheckCircle2,
  Compass,
  Download,
  Moon,
  Sun,
  Activity
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTelemetry } from '../context/TelemetryContext';
import { colors } from '../theme/colors';
import { useNavigate } from 'react-router';

interface CommandItem {
  id: string;
  category: 'SATELLITE' | 'ALERT' | 'COMMAND' | 'NAVIGATION';
  title: string;
  subtitle: string;
  badge: string;
  badgeVariant: 'cyan' | 'red' | 'amber' | 'emerald' | 'indigo' | 'zinc';
  icon: any;
  noradId?: number;
  action: () => void;
  keywords: string[];
}

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPaletteModal({ isOpen, onClose }: CommandPaletteModalProps) {
  const { theme, toggleTheme } = useTheme();
  const { toggleStreamMode, streamMode, isLive } = useTelemetry();
  const tc = colors[theme];
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<'ALL' | 'SATELLITE' | 'ALERT' | 'COMMAND' | 'NAVIGATION'>('ALL');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const commands: CommandItem[] = [
    // SATELLITES & DEBRIS
    {
      id: 'sat-vgd-004',
      category: 'ALERT',
      title: 'VANGUARD-04 (Delta) [NORAD 58214]',
      subtitle: 'Conjunction Watch vs COSMOS-2251 // TCA T-01:42:19 // Pc: 4.82e-4',
      badge: 'RED CONJUNCTION',
      badgeVariant: 'red',
      icon: AlertCircle,
      noradId: 58214,
      keywords: ['58214', 'vgd-004', 'delta', 'conjunction', 'watch', 'critical', 'red', 'collision'],
      action: () => {
        onClose();
        navigate('/dashboard/radar');
      }
    },
    {
      id: 'sat-deb-34427',
      category: 'ALERT',
      title: 'COSMOS-2251 DEB [NORAD 34427]',
      subtitle: 'Tracked Debris Fragment // 18th SDS Conjunction Track // Miss 1,850m',
      badge: 'DEBRIS VECTOR',
      badgeVariant: 'red',
      icon: ShieldAlert,
      noradId: 34427,
      keywords: ['34427', 'cosmos', 'cosmos-2251', 'deb', 'debris', 'fragment', 'red', 'collision'],
      action: () => {
        onClose();
        navigate('/dashboard/radar');
      }
    },
    {
      id: 'sat-vgd-008',
      category: 'ALERT',
      title: 'VANGUARD-08 (Theta) [NORAD 58218]',
      subtitle: 'Station-Keeping Burn Armed // Plane B (53°) // ΔV +0.85 m/s',
      badge: 'MANEUVER ARMED',
      badgeVariant: 'amber',
      icon: Zap,
      noradId: 58218,
      keywords: ['58218', 'vgd-008', 'theta', 'station-keeping', 'burn', 'maneuver', 'armed', 'yellow'],
      action: () => {
        onClose();
        navigate('/dashboard/priorities-events');
      }
    },
    {
      id: 'sat-vgd-001',
      category: 'SATELLITE',
      title: 'VANGUARD-01 (Alpha) [NORAD 58211]',
      subtitle: 'Plane A (53°) // 550 km // 100% Station-Locked // Nominal',
      badge: 'NOMINAL',
      badgeVariant: 'cyan',
      icon: Satellite,
      noradId: 58211,
      keywords: ['58211', 'vgd-001', 'alpha', 'plane a', 'nominal', 'satellite'],
      action: () => {
        onClose();
        navigate('/dashboard');
      }
    },
    {
      id: 'sat-vgd-002',
      category: 'SATELLITE',
      title: 'VANGUARD-02 (Beta) [NORAD 58212]',
      subtitle: 'Plane B (53°) // 550 km // Optical ISL Mesh Locked',
      badge: 'NOMINAL',
      badgeVariant: 'cyan',
      icon: Satellite,
      noradId: 58212,
      keywords: ['58212', 'vgd-002', 'beta', 'plane b', 'nominal', 'satellite'],
      action: () => {
        onClose();
        navigate('/dashboard');
      }
    },
    {
      id: 'sat-vgd-012',
      category: 'SATELLITE',
      title: 'VANGUARD-12 (Mu) [NORAD 58222]',
      subtitle: 'Plane A (53°) // 550 km // Svalbard S-Band Acquired',
      badge: 'NOMINAL',
      badgeVariant: 'cyan',
      icon: Satellite,
      noradId: 58222,
      keywords: ['58222', 'vgd-012', 'mu', 'plane a', 'nominal', 'satellite'],
      action: () => {
        onClose();
        navigate('/dashboard');
      }
    },
    {
      id: 'sat-vgd-018',
      category: 'SATELLITE',
      title: 'VANGUARD-18 (Sigma) [NORAD 58228]',
      subtitle: 'SSO Core (98°) // 700 km // Polar Sun-Sync Relay',
      badge: 'NOMINAL',
      badgeVariant: 'cyan',
      icon: Satellite,
      noradId: 58228,
      keywords: ['58228', 'vgd-018', 'sigma', 'sso', 'sun-sync', 'polar', 'nominal', 'satellite'],
      action: () => {
        onClose();
        navigate('/dashboard');
      }
    },

    // COMMANDS & DIRECTIVES
    {
      id: 'cmd-stream-toggle',
      category: 'COMMAND',
      title: isLive ? 'SWITCH TO SIMULATED STREAM' : 'SWITCH TO LIVE TELEMETRY STREAM',
      subtitle: isLive ? 'Current: Live jitter pulse active (±15m, ±0.2dB)' : 'Current: Static baseline telemetry mode',
      badge: isLive ? 'STREAM: LIVE' : 'STREAM: STATIC',
      badgeVariant: isLive ? 'emerald' : 'zinc',
      icon: Activity,
      keywords: ['live', 'simulated', 'stream', 'pulse', 'jitter', 'telemetry', 'realtime'],
      action: () => {
        toggleStreamMode();
        onClose();
      }
    },
    {
      id: 'cmd-theme-toggle',
      category: 'COMMAND',
      title: theme === 'dark' ? 'TOGGLE LIGHT MODE PALETTE' : 'TOGGLE DARK GRAPHITE MODE',
      subtitle: 'Switch console color system between Tempo Dark and High-Contrast Light',
      badge: 'THEME',
      badgeVariant: 'indigo',
      icon: theme === 'dark' ? Sun : Moon,
      keywords: ['theme', 'dark', 'light', 'mode', 'color', 'contrast'],
      action: () => {
        toggleTheme();
        onClose();
      }
    },
    {
      id: 'cmd-cam-sim',
      category: 'COMMAND',
      title: 'EXEC // CAM AUTONOMOUS SIMULATION',
      subtitle: 'Simulate Hall-effect burn trajectory: ΔV +0.85 m/s on VGD-04',
      badge: 'EXEC DIRECTIVE',
      badgeVariant: 'indigo',
      icon: Terminal,
      keywords: ['exec', 'cam', 'simulation', 'burn', 'trajectory', 'maneuver', 'delta-v'],
      action: () => {
        onClose();
        navigate('/dashboard/radar');
      }
    },
    {
      id: 'cmd-tle-ingest',
      category: 'COMMAND',
      title: 'PULL // 18TH SDS CDM BATCH UPDATE',
      subtitle: 'Ingest latest CCSDS Conjunction Data Messages for all 48 satellites',
      badge: 'DATA SYNC',
      badgeVariant: 'cyan',
      icon: Radio,
      keywords: ['pull', 'ingest', 'tle', 'cdm', 'ephemeris', '18th sds', 'sync'],
      action: () => {
        onClose();
        navigate('/dashboard/capital-structure');
      }
    },

    // NAVIGATION PAGES
    {
      id: 'nav-radar',
      category: 'NAVIGATION',
      title: 'B-Plane Radar Scope & Covariance Ellipsoids',
      subtitle: 'Jump to 2D/3D encounter geometry and closest approach miss vectors',
      badge: 'PAGE',
      badgeVariant: 'zinc',
      icon: Compass,
      keywords: ['radar', 'b-plane', 'covariance', 'ellipsoid', 'scope', 'encounter'],
      action: () => {
        onClose();
        navigate('/dashboard/radar');
      }
    },
    {
      id: 'nav-ephemeris',
      category: 'NAVIGATION',
      title: 'Constellation Ephemeris & Thruster Ledger',
      subtitle: 'Jump to orbital state vectors, apogee/perigee, and propellant reserves',
      badge: 'PAGE',
      badgeVariant: 'zinc',
      icon: Satellite,
      keywords: ['ephemeris', 'ledger', 'propellant', 'xenon', 'delta-v', 'capital-structure'],
      action: () => {
        onClose();
        navigate('/dashboard/capital-structure');
      }
    },
    {
      id: 'nav-safety',
      category: 'NAVIGATION',
      title: 'FCC / ESA De-Orbit & Safety Compliance Matrix',
      subtitle: 'Jump to regulatory 5-year de-orbit margin and link threshold monitors',
      badge: 'PAGE',
      badgeVariant: 'zinc',
      icon: CheckCircle2,
      keywords: ['safety', 'sla', 'compliance', 'fcc', 'esa', 'deorbit', 'margin'],
      action: () => {
        onClose();
        navigate('/dashboard/covenant-compliance');
      }
    },
    {
      id: 'nav-weather',
      category: 'NAVIGATION',
      title: 'Space Weather & Solar Flux Bulletins',
      subtitle: 'Jump to NOAA SWPC Kp index and F10.7 thermospheric drag monitors',
      badge: 'PAGE',
      badgeVariant: 'zinc',
      icon: Zap,
      keywords: ['weather', 'solar', 'flux', 'f10.7', 'geomagnetic', 'kp', 'sun', 'sector-news'],
      action: () => {
        onClose();
        navigate('/dashboard/sector-news');
      }
    },
    {
      id: 'nav-crew',
      category: 'NAVIGATION',
      title: 'Flight Crew Roster & Console Permissions',
      subtitle: 'Jump to orbital analyst clearances, cryptographic keys, and audit log',
      badge: 'PAGE',
      badgeVariant: 'zinc',
      icon: Terminal,
      keywords: ['crew', 'users', 'access', 'fdo', 'analyst', 'user-management', 'settings'],
      action: () => {
        onClose();
        navigate('/dashboard/user-management');
      }
    }
  ];

  const filtered = commands.filter(cmd => {
    // Category tab filter
    if (filterCategory !== 'ALL' && cmd.category !== filterCategory) return false;

    // Search query
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();

    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle.toLowerCase().includes(q) ||
      cmd.badge.toLowerCase().includes(q) ||
      cmd.keywords.some(k => k.toLowerCase().includes(q)) ||
      (cmd.noradId && cmd.noradId.toString().includes(q))
    );
  });

  // Handle keyboard navigation inside the palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1 < filtered.length ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 >= 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const getBadgeStyle = (variant: CommandItem['badgeVariant']) => {
    switch (variant) {
      case 'red':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'amber':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'cyan':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'emerald':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'indigo':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
      default:
        return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:px-6 animate-in fade-in duration-150"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-200"
        style={{
          backgroundColor: tc.bgSecondary,
          border: `1px solid ${tc.borderPrimary}`,
          maxHeight: '80vh'
        }}
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Terminal Header Prompt */}
        <div
          className="flex items-center justify-between px-4 py-2 text-[10px] uppercase font-mono tracking-wider border-b"
          style={{
            backgroundColor: tc.bgTertiary,
            borderColor: tc.borderPrimary,
            color: tc.textSecondary
          }}
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>KESSLER ORBITAL COMMAND PALETTE // 18TH SDS TLE INTERCEPTOR</span>
          </div>
          <span className="hidden sm:inline text-zinc-500">SHORTCUT: ⌘K or /</span>
        </div>

        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b" style={{ borderColor: tc.borderPrimary }}>
          <Search className="w-4 h-4 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type NORAD ID (e.g. 58214), callsign (VGD-04), alert status (red), or command..."
            className="flex-1 bg-transparent text-sm outline-none font-medium placeholder-zinc-500"
            style={{ color: tc.textPrimary }}
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded text-zinc-400 hover:text-zinc-200 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd
            className="px-2 py-0.5 rounded text-[10px] font-mono border"
            style={{
              backgroundColor: tc.bgTertiary,
              borderColor: tc.borderPrimary,
              color: tc.textTertiary
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Quick Filter Category Tabs */}
        <div
          className="flex items-center gap-1.5 px-4 py-2 border-b overflow-x-auto text-xs"
          style={{ borderColor: tc.borderPrimary, backgroundColor: theme === 'dark' ? '#18191D' : '#F9FAFB' }}
        >
          {(['ALL', 'ALERT', 'SATELLITE', 'COMMAND', 'NAVIGATION'] as const).map(tab => {
            const isSelected = filterCategory === tab;
            const labelMap = {
              ALL: 'All Telemetry',
              ALERT: 'Conjunction Alerts',
              SATELLITE: 'Satellites & NORAD',
              COMMAND: 'Executive Directives',
              NAVIGATION: 'Console Pages'
            };
            return (
              <button
                key={tab}
                onClick={() => {
                  setFilterCategory(tab);
                  setSelectedIndex(0);
                }}
                className="px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer shrink-0"
                style={{
                  backgroundColor: isSelected ? tc.bgTertiary : 'transparent',
                  border: `1px solid ${isSelected ? tc.accentPrimary : 'transparent'}`,
                  color: isSelected ? tc.textPrimary : tc.textSecondary
                }}
              >
                {labelMap[tab]}
              </button>
            );
          })}
        </div>

        {/* Command Item List */}
        <div ref={listRef} className="p-2 overflow-y-auto space-y-1 flex-1 max-h-[380px]">
          {filtered.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Search className="w-8 h-8 text-zinc-500 mx-auto" />
              <div className="text-xs font-semibold" style={{ color: tc.textPrimary }}>
                No orbital telemetry matches "{query}"
              </div>
              <p className="text-[11px]" style={{ color: tc.textSecondary }}>
                Try searching by NORAD catalog number (e.g. 58214, 34427), callsign (VGD-04), or 'red'.
              </p>
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className="w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer relative"
                  style={{
                    backgroundColor: isSelected ? tc.bgTertiary : 'transparent',
                    border: `1px solid ${isSelected ? tc.accentPrimary : 'transparent'}`
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1 mr-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: isSelected ? `${tc.accentPrimary}20` : tc.bgSecondary,
                        color: isSelected ? tc.accentPrimary : tc.textSecondary,
                        border: `1px solid ${tc.borderPrimary}`
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold truncate" style={{ color: tc.textPrimary }}>
                          {item.title}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium border shrink-0 ${getBadgeStyle(item.badgeVariant)}`}>
                          {item.badge}
                        </span>
                      </div>
                      <div className="text-[11px] truncate mt-0.5" style={{ color: tc.textSecondary }}>
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-3.5 h-3.5 shrink-0 transition-opacity ${
                      isSelected ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ color: tc.accentPrimary }}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hints */}
        <div
          className="flex items-center justify-between px-4 py-2.5 border-t text-[11px]"
          style={{
            backgroundColor: tc.bgTertiary,
            borderColor: tc.borderPrimary,
            color: tc.textSecondary
          }}
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[9px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[9px]">↓</kbd>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[9px]">↵</kbd>
              <span>to select</span>
            </span>
          </div>
          <span className="text-zinc-500 font-mono">{filtered.length} telemetry entries</span>
        </div>
      </div>
    </div>
  );
}
