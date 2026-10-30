import { useState, useEffect } from 'react';
import { Crosshair, Flame, ShieldAlert, CheckCircle2, RotateCcw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export function BPlaneRadarScope() {
  const { theme } = useTheme();
  const tc = colors[theme];
  const [burnArmed, setBurnArmed] = useState(true);
  const [sweepAngle, setSweepAngle] = useState(0);
  const [tcaSeconds, setTcaSeconds] = useState(6139); // 01:42:19

  useEffect(() => {
    const timer = setInterval(() => {
      setTcaSeconds(prev => (prev > 0 ? prev - 1 : 6139));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const anim = setInterval(() => {
      setSweepAngle(prev => (prev + 6) % 360);
    }, 60);
    return () => clearInterval(anim);
  }, []);

  const formatCountdown = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600).toString().padStart(2, '0');
    const mins = Math.floor((totalSec % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSec % 60).toString().padStart(2, '0');
    return `T-${hrs}:${mins}:${secs}`;
  };

  // When CAM burn is armed, the predicted conjunction point shifts outward from 142m (red) to 1,850m (cyan nominal)
  const targetX = burnArmed ? 148 : 188;
  const targetY = burnArmed ? 92 : 158;
  const missDistDisplay = burnArmed ? '1,850 m (POST-CAM)' : '142 m (UNMITIGATED)';
  const pcDisplay = burnArmed ? '1.2e-7 (NOMINAL)' : '4.8e-4 (CRITICAL)';
  const statusColor = burnArmed ? '#06B6D4' : '#EF4444';

  return (
    <div
      className="p-4 flex flex-col justify-between transition-colors duration-300 h-full"
      style={{
        backgroundColor: tc.bgSecondary,
        border: `1px solid ${burnArmed ? tc.borderPrimary : '#EF4444'}`
      }}
    >
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between pb-3 mb-3 border-b" style={{ borderColor: tc.borderPrimary }}>
          <div className="flex items-center gap-2">
            <Crosshair className="w-4 h-4" style={{ color: statusColor }} />
            <h3 className="font-mono text-xs md:text-sm font-bold tracking-wider uppercase" style={{ color: tc.textPrimary }}>
              B-PLANE COVARIANCE RADAR // VGD-04
            </h3>
          </div>
          <span
            className="px-2 py-0.5 rounded-sm font-mono text-[10px] font-bold uppercase"
            style={{
              backgroundColor: `${statusColor}20`,
              color: statusColor,
              border: `1px solid ${statusColor}50`
            }}
          >
            {formatCountdown(tcaSeconds)}
          </span>
        </div>

        {/* SVG Polar Radar Scope */}
        <div
          className="relative w-full aspect-square max-w-[310px] mx-auto my-2 rounded-full flex items-center justify-center overflow-hidden"
          style={{
            backgroundColor: theme === 'dark' ? '#04070B' : '#0F172A',
            border: `1px solid ${tc.borderPrimary}`,
            boxShadow: 'inset 0 0 36px rgba(6, 182, 212, 0.08)'
          }}
        >
          <svg viewBox="0 0 320 320" className="w-full h-full">
            <defs>
              <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
              </radialGradient>
            </defs>

            {/* Background Glow */}
            <circle cx="160" cy="160" r="150" fill="url(#radarGlow)" />

            {/* Concentric Range Rings (500m, 1km, 2km) */}
            <circle cx="160" cy="160" r="45" fill="none" stroke="#1A2636" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="160" cy="160" r="95" fill="none" stroke="#1A2636" strokeWidth="1" />
            <circle cx="160" cy="160" r="142" fill="none" stroke="#1A2636" strokeWidth="1" />

            {/* Red Hard-Body Screening Threshold Zone */}
            <circle
              cx="160"
              cy="160"
              r="34"
              fill="rgba(239, 68, 68, 0.08)"
              stroke="rgba(239, 68, 68, 0.45)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />

            {/* Crosshair Axes (Radial vs Cross-Track) */}
            <line x1="160" y1="10" x2="160" y2="310" stroke="#1A2636" strokeWidth="1" />
            <line x1="10" y1="160" x2="310" y2="160" stroke="#1A2636" strokeWidth="1" />
            <line x1="54" y1="54" x2="266" y2="266" stroke="#1A2636" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="266" y1="54" x2="54" y2="266" stroke="#1A2636" strokeWidth="0.5" strokeDasharray="4 4" />

            {/* Axis Labels */}
            <text x="165" y="24" fill="#64748B" fontSize="8" fontFamily="JetBrains Mono">+RADIAL (km)</text>
            <text x="235" y="155" fill="#64748B" fontSize="8" fontFamily="JetBrains Mono">+CROSS-TRACK</text>
            <text x="164" y="112" fill="#475569" fontSize="7" fontFamily="JetBrains Mono">0.5km</text>
            <text x="164" y="62" fill="#475569" fontSize="7" fontFamily="JetBrains Mono">1.5km</text>

            {/* Rotating Radar Sweep Line */}
            <g transform={`rotate(${sweepAngle} 160 160)`}>
              <line
                x1="160"
                y1="160"
                x2="160"
                y2="18"
                stroke="#06B6D4"
                strokeWidth="1.5"
                strokeOpacity="0.55"
              />
            </g>

            {/* Unmitigated Debris Vector Path */}
            <line
              x1="45"
              y1="255"
              x2="285"
              y2="80"
              stroke="rgba(239, 68, 68, 0.45)"
              strokeWidth="1.2"
              strokeDasharray="4 3"
            />

            {/* Mitigated Post-Burn Vector Path (when armed) */}
            {burnArmed && (
              <line
                x1="45"
                y1="195"
                x2="260"
                y2="25"
                stroke="#06B6D4"
                strokeWidth="1.5"
              />
            )}

            {/* 3-Sigma Covariance Dispersion Ellipse around Conjunction Point */}
            <ellipse
              cx={targetX}
              cy={targetY}
              rx={burnArmed ? 32 : 26}
              ry={burnArmed ? 14 : 12}
              transform={`rotate(-28 ${targetX} ${targetY})`}
              fill={burnArmed ? 'rgba(6, 182, 212, 0.14)' : 'rgba(239, 68, 68, 0.22)'}
              stroke={statusColor}
              strokeWidth="1.5"
            />

            {/* Primary Asset at Origin: VANGUARD-04 */}
            <circle cx="160" cy="160" r="4.5" fill="#10B981" />
            <circle cx="160" cy="160" r="9" fill="none" stroke="#10B981" strokeWidth="1" />
            <text x="172" y="173" fill="#10B981" fontSize="8" fontWeight="bold" fontFamily="JetBrains Mono">
              VGD-04 [ORIGIN]
            </text>

            {/* Secondary Object: COSMOS-2251 DEB */}
            <circle cx={targetX} cy={targetY} r="4" fill={statusColor} />
            <text
              x={targetX - 38}
              y={targetY - 16}
              fill={statusColor}
              fontSize="8"
              fontWeight="bold"
              fontFamily="JetBrains Mono"
            >
              COSMOS-2251 DEB
            </text>
          </svg>
        </div>

        {/* B-Plane Telemetry Readout Cells */}
        <div className="grid grid-cols-2 gap-2 mt-3 font-mono">
          <div className="p-2 rounded-sm" style={{ backgroundColor: tc.bgTertiary, border: `1px solid ${tc.borderPrimary}` }}>
            <div className="text-[9px] uppercase" style={{ color: tc.textSecondary }}>PROJECTED MISS DIST</div>
            <div className="text-xs font-bold mt-0.5" style={{ color: statusColor }}>{missDistDisplay}</div>
          </div>
          <div className="p-2 rounded-sm" style={{ backgroundColor: tc.bgTertiary, border: `1px solid ${tc.borderPrimary}` }}>
            <div className="text-[9px] uppercase" style={{ color: tc.textSecondary }}>COLLISION PROB (Pc)</div>
            <div className="text-xs font-bold mt-0.5" style={{ color: statusColor }}>{pcDisplay}</div>
          </div>
          <div className="p-2 rounded-sm" style={{ backgroundColor: tc.bgTertiary, border: `1px solid ${tc.borderPrimary}` }}>
            <div className="text-[9px] uppercase" style={{ color: tc.textSecondary }}>REL. VELOCITY</div>
            <div className="text-xs font-bold mt-0.5" style={{ color: tc.textPrimary }}>14.28 km/s (Hyper)</div>
          </div>
          <div className="p-2 rounded-sm" style={{ backgroundColor: tc.bgTertiary, border: `1px solid ${tc.borderPrimary}` }}>
            <div className="text-[9px] uppercase" style={{ color: tc.textSecondary }}>B-PLANE THETA (θ)</div>
            <div className="text-xs font-bold mt-0.5" style={{ color: '#F59E0B' }}>118.4° // +0.85 m/s</div>
          </div>
        </div>
      </div>

      {/* Interactive CAM Burn Simulation Toggle */}
      <div className="mt-4 pt-3 border-t" style={{ borderColor: tc.borderPrimary }}>
        <div className="flex items-center justify-between mb-2 font-mono text-[10px]">
          <span style={{ color: tc.textSecondary }}>THRUSTER VECTOR SIMULATION:</span>
          <span style={{ color: burnArmed ? '#10B981' : '#EF4444', fontWeight: 700 }}>
            {burnArmed ? 'PROGRADE CAM ARMED' : 'BALLISTIC / NO BURN'}
          </span>
        </div>
        <button
          onClick={() => setBurnArmed(!burnArmed)}
          className="w-full py-2.5 px-3 rounded-sm font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
          style={{
            backgroundColor: burnArmed ? 'rgba(6, 182, 212, 0.16)' : 'rgba(239, 68, 68, 0.18)',
            color: burnArmed ? '#06B6D4' : '#EF4444',
            border: `1px solid ${burnArmed ? '#06B6D4' : '#EF4444'}`
          }}
        >
          {burnArmed ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>CAM Burn Armed (+0.85 m/s) — Click to Disarm</span>
            </>
          ) : (
            <>
              <Flame className="w-4 h-4" />
              <span>Warning: Unmitigated Trajectory — Arm CAM Burn</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
