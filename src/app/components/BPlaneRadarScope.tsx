import { useState, useEffect } from 'react';
import { Crosshair, Flame, CheckCircle2 } from 'lucide-react';
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

  const missDistDisplay = burnArmed ? '1,850 m' : '142 m';
  const pcDisplay = burnArmed ? '1.2e-7' : '4.8e-4';
  const statusColor = burnArmed ? '#4ADE80' : '#F87171';

  return (
    <div
      className="p-6 rounded-2xl flex flex-col justify-between transition-colors duration-300 h-full"
      style={{
        backgroundColor: tc.bgSecondary,
        border: `1px solid ${tc.borderPrimary}`
      }}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b" style={{ borderColor: tc.borderPrimary }}>
          <div className="flex items-center gap-2.5">
            <Crosshair className="w-4 h-4" style={{ color: tc.accentPrimary }} />
            <div>
              <h3 className="text-[15px] font-semibold tracking-tight" style={{ color: tc.textPrimary }}>
                B-Plane Covariance Radar
              </h3>
              <p className="text-[11px]" style={{ color: tc.textSecondary }}>
                VANGUARD-04 vs COSMOS-2251 DEB
              </p>
            </div>
          </div>
          <span
            className="px-2.5 py-1 rounded-lg text-xs font-semibold"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.14)',
              color: '#F87171'
            }}
          >
            {formatCountdown(tcaSeconds)}
          </span>
        </div>

        {/* SVG Polar Radar Scope */}
        <div
          className="relative w-full aspect-square max-w-[290px] mx-auto my-3 rounded-full flex items-center justify-center overflow-hidden"
          style={{
            backgroundColor: theme === 'dark' ? '#141518' : '#F4F5F7',
            border: `1px solid ${tc.borderPrimary}`,
            boxShadow: `inset 0 0 36px ${theme === 'dark' ? 'rgba(129, 140, 248, 0.12)' : 'rgba(99, 102, 241, 0.08)'}`
          }}
        >
          <svg viewBox="0 0 320 320" className="w-full h-full">
            <defs>
              <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#818CF8" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#818CF8" stopOpacity="0.0" />
              </radialGradient>
            </defs>

            {/* Background Glow */}
            <circle cx="160" cy="160" r="150" fill="url(#radarGlow)" />

            {/* Concentric Range Rings (500m, 1km, 2km) */}
            <circle cx="160" cy="160" r="45" fill="none" stroke={theme === 'dark' ? '#2A2C32' : '#E5E7EB'} strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="160" cy="160" r="95" fill="none" stroke={theme === 'dark' ? '#2A2C32' : '#E5E7EB'} strokeWidth="1" />
            <circle cx="160" cy="160" r="142" fill="none" stroke={theme === 'dark' ? '#2A2C32' : '#E5E7EB'} strokeWidth="1" />

            {/* Red Hard-Body Screening Zone */}
            <circle
              cx="160"
              cy="160"
              r="34"
              fill="rgba(239, 68, 68, 0.06)"
              stroke="rgba(239, 68, 68, 0.35)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />

            {/* Crosshair Axes */}
            <line x1="160" y1="10" x2="160" y2="310" stroke={theme === 'dark' ? '#2A2C32' : '#E5E7EB'} strokeWidth="1" />
            <line x1="10" y1="160" x2="310" y2="160" stroke={theme === 'dark' ? '#2A2C32' : '#E5E7EB'} strokeWidth="1" />

            {/* Axis Labels */}
            <text x="165" y="24" fill={tc.textTertiary} fontSize="8" fontFamily="Inter, sans-serif">+RADIAL</text>
            <text x="238" y="155" fill={tc.textTertiary} fontSize="8" fontFamily="Inter, sans-serif">+CROSS</text>

            {/* Rotating Radar Sweep Line */}
            <g transform={`rotate(${sweepAngle} 160 160)`}>
              <line
                x1="160"
                y1="160"
                x2="160"
                y2="18"
                stroke="#818CF8"
                strokeWidth="1.5"
                strokeOpacity="0.6"
              />
            </g>

            {/* Unmitigated Debris Vector */}
            <line
              x1="45"
              y1="255"
              x2="285"
              y2="80"
              stroke="rgba(239, 68, 68, 0.45)"
              strokeWidth="1.2"
              strokeDasharray="4 3"
            />

            {/* Mitigated Post-Burn Vector */}
            {burnArmed && (
              <line
                x1="45"
                y1="195"
                x2="260"
                y2="25"
                stroke="#818CF8"
                strokeWidth="1.5"
              />
            )}

            {/* Vanguard Satellite Position */}
            <circle cx="160" cy="160" r="5" fill="#4ADE80" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="170" y="164" fill="#4ADE80" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">
              VGD-04
            </text>

            {/* Debris Target Node */}
            <circle cx={burnArmed ? 148 : 188} cy={burnArmed ? 92 : 158} r="4.5" fill={statusColor} stroke="#FFFFFF" strokeWidth="1" />
            <text
              x={(burnArmed ? 148 : 188) + 8}
              y={(burnArmed ? 92 : 158) + 3}
              fill={statusColor}
              fontSize="8"
              fontWeight="bold"
              fontFamily="Inter, sans-serif"
            >
              COSMOS-2251
            </text>
          </svg>
        </div>

        {/* 4 Clean Readout Boxes */}
        <div className="grid grid-cols-2 gap-2.5 mt-4">
          <div className="p-3 rounded-xl" style={{ backgroundColor: tc.bgTertiary }}>
            <div className="text-[11px]" style={{ color: tc.textSecondary }}>Projected Miss</div>
            <div className="text-sm font-bold mt-0.5" style={{ color: statusColor }}>
              {missDistDisplay}
            </div>
            <div className="text-[10px]" style={{ color: tc.textTertiary }}>
              {burnArmed ? 'Post-CAM' : 'Unmitigated'}
            </div>
          </div>
          <div className="p-3 rounded-xl" style={{ backgroundColor: tc.bgTertiary }}>
            <div className="text-[11px]" style={{ color: tc.textSecondary }}>Collision Prob (Pc)</div>
            <div className="text-sm font-bold mt-0.5" style={{ color: statusColor }}>
              {pcDisplay}
            </div>
            <div className="text-[10px]" style={{ color: tc.textTertiary }}>
              {burnArmed ? 'Nominal Safe' : 'Critical Breach'}
            </div>
          </div>
          <div className="p-3 rounded-xl" style={{ backgroundColor: tc.bgTertiary }}>
            <div className="text-[11px]" style={{ color: tc.textSecondary }}>Rel. Velocity</div>
            <div className="text-sm font-bold mt-0.5" style={{ color: tc.textPrimary }}>
              14.28 km/s
            </div>
            <div className="text-[10px]" style={{ color: tc.textTertiary }}>Hypervelocity</div>
          </div>
          <div className="p-3 rounded-xl" style={{ backgroundColor: tc.bgTertiary }}>
            <div className="text-[11px]" style={{ color: tc.textSecondary }}>B-Plane Angle (θ)</div>
            <div className="text-sm font-bold mt-0.5" style={{ color: '#FBBF24' }}>
              118.4°
            </div>
            <div className="text-[10px]" style={{ color: tc.textTertiary }}>+0.85 m/s ΔV</div>
          </div>
        </div>
      </div>

      {/* Burn Simulation Action */}
      <div className="mt-5 pt-4 border-t" style={{ borderColor: tc.borderPrimary }}>
        <button
          onClick={() => setBurnArmed(!burnArmed)}
          className="w-full py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          style={{
            backgroundColor: burnArmed ? 'rgba(74, 222, 128, 0.16)' : 'rgba(248, 113, 113, 0.16)',
            color: burnArmed ? '#4ADE80' : '#F87171',
            border: `1px solid ${burnArmed ? 'rgba(74, 222, 128, 0.3)' : 'rgba(248, 113, 113, 0.3)'}`
          }}
        >
          {burnArmed ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>CAM Burn Armed (+0.85 m/s) • Click to Disarm</span>
            </>
          ) : (
            <>
              <Flame className="w-4 h-4" />
              <span>Unmitigated Trajectory • Click to Arm Burn</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
