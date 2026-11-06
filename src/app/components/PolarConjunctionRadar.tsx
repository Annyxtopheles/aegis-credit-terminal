import { useState, useId } from 'react';
import { Radar, ShieldAlert, Crosshair, Zap, Compass, Info, Radio, AlertTriangle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export interface PolarSatellite {
  id: string;
  name: string;
  noradId: number;
  plane: string;
  shellKm: number;
  angleDeg: number;
  status: 'Nominal' | 'Conjunction Watch' | 'Station-Keeping';
  tleLine1: string;
  tleLine2: string;
  inclinationDeg: number;
  velocityKmS: number;
  periodMin: number;
  raanDeg: number;
  argPerigeeDeg: number;
}

export const RADAR_SATELLITES: PolarSatellite[] = [
  {
    id: 'VGD-001',
    name: 'Vanguard-01 (Alpha)',
    noradId: 58211,
    plane: 'Plane A (53°)',
    shellKm: 550,
    angleDeg: 15,
    status: 'Nominal',
    tleLine1: '1 58211U 24012A   26310.42891621  .00014280  00000-0  58412-3 0  9994',
    tleLine2: '2 58211  53.0042  142.8512 0004218  84.1284 276.1420 15.14829140 41284',
    inclinationDeg: 53.0,
    velocityKmS: 7.58,
    periodMin: 95.6,
    raanDeg: 142.85,
    argPerigeeDeg: 84.12
  },
  {
    id: 'VGD-002',
    name: 'Vanguard-02 (Beta)',
    noradId: 58212,
    plane: 'Plane B (53°)',
    shellKm: 550,
    angleDeg: 45,
    status: 'Nominal',
    tleLine1: '1 58212U 24012B   26310.43128419  .00013910  00000-0  56214-3 0  9991',
    tleLine2: '2 58212  53.0018  172.9421 0003891  92.4812 267.8194 15.14829820 41258',
    inclinationDeg: 53.0,
    velocityKmS: 7.58,
    periodMin: 95.6,
    raanDeg: 172.94,
    argPerigeeDeg: 92.48
  },
  {
    id: 'VGD-003',
    name: 'Vanguard-03 (Gamma)',
    noradId: 58213,
    plane: 'Plane A (53°)',
    shellKm: 550,
    angleDeg: 75,
    status: 'Nominal',
    tleLine1: '1 58213U 24012C   26310.42981240  .00014020  00000-0  57182-3 0  9993',
    tleLine2: '2 58213  53.0034  142.9104 0004120  86.5120 273.7190 15.14829310 41272',
    inclinationDeg: 53.0,
    velocityKmS: 7.58,
    periodMin: 95.6,
    raanDeg: 142.91,
    argPerigeeDeg: 86.51
  },
  {
    id: 'VGD-004',
    name: 'Vanguard-04 (Delta)',
    noradId: 58214,
    plane: 'Plane A (53°)',
    shellKm: 548,
    angleDeg: 105,
    status: 'Conjunction Watch',
    tleLine1: '1 58214U 24012D   26310.43429184  .00015940  00000-0  62419-3 0  9998',
    tleLine2: '2 58214  53.0051  143.1294 0004521  79.4218 280.8912 15.14918240 41299',
    inclinationDeg: 53.0,
    velocityKmS: 7.59,
    periodMin: 95.5,
    raanDeg: 143.13,
    argPerigeeDeg: 79.42
  },
  {
    id: 'VGD-005',
    name: 'Vanguard-05 (Epsilon)',
    noradId: 58215,
    plane: 'Plane A (53°)',
    shellKm: 550,
    angleDeg: 135,
    status: 'Nominal',
    tleLine1: '1 58215U 24012E   26310.42781920  .00013850  00000-0  55928-3 0  9992',
    tleLine2: '2 58215  53.0029  142.7910 0003980  88.1924 272.0184 15.14828990 41249',
    inclinationDeg: 53.0,
    velocityKmS: 7.58,
    periodMin: 95.6,
    raanDeg: 142.79,
    argPerigeeDeg: 88.19
  },
  {
    id: 'VGD-006',
    name: 'Vanguard-06 (Zeta)',
    noradId: 58216,
    plane: 'Plane B (53°)',
    shellKm: 550,
    angleDeg: 165,
    status: 'Nominal',
    tleLine1: '1 58216U 24012F   26310.43091842  .00014110  00000-0  57819-3 0  9995',
    tleLine2: '2 58216  53.0021  173.0184 0004012  91.2410 268.9912 15.14829540 41264',
    inclinationDeg: 53.0,
    velocityKmS: 7.58,
    periodMin: 95.6,
    raanDeg: 173.02,
    argPerigeeDeg: 91.24
  },
  {
    id: 'VGD-007',
    name: 'Vanguard-07 (Eta)',
    noradId: 58217,
    plane: 'Plane A (53°)',
    shellKm: 550,
    angleDeg: 195,
    status: 'Nominal',
    tleLine1: '1 58217U 24012G   26310.42918274  .00013990  00000-0  56810-3 0  9990',
    tleLine2: '2 58217  53.0038  142.8841 0004098  85.7419 274.5180 15.14829200 41270',
    inclinationDeg: 53.0,
    velocityKmS: 7.58,
    periodMin: 95.6,
    raanDeg: 142.88,
    argPerigeeDeg: 85.74
  },
  {
    id: 'VGD-008',
    name: 'Vanguard-08 (Theta)',
    noradId: 58218,
    plane: 'Plane B (53°)',
    shellKm: 550,
    angleDeg: 225,
    status: 'Station-Keeping',
    tleLine1: '1 58218U 24012H   26310.43281940  .00014720  00000-0  59810-3 0  9997',
    tleLine2: '2 58218  53.0049  173.1492 0004381  89.8410 270.4190 15.14830120 41288',
    inclinationDeg: 53.0,
    velocityKmS: 7.58,
    periodMin: 95.6,
    raanDeg: 173.15,
    argPerigeeDeg: 89.84
  },
  {
    id: 'VGD-009',
    name: 'Vanguard-09 (Iota)',
    noradId: 58219,
    plane: 'Plane C (45°)',
    shellKm: 400,
    angleDeg: 255,
    status: 'Nominal',
    tleLine1: '1 58219U 24012J   26310.42619482  .00021480  00000-0  84129-3 0  9993',
    tleLine2: '2 58219  45.0019  210.4812 0003180  74.2184 286.1920 15.54128410 41240',
    inclinationDeg: 45.0,
    velocityKmS: 7.67,
    periodMin: 92.5,
    raanDeg: 210.48,
    argPerigeeDeg: 74.22
  },
  {
    id: 'VGD-010',
    name: 'Vanguard-10 (Kappa)',
    noradId: 58220,
    plane: 'Plane B (53°)',
    shellKm: 550,
    angleDeg: 285,
    status: 'Nominal',
    tleLine1: '1 58220U 24012K   26310.43018429  .00014080  00000-0  57419-3 0  9994',
    tleLine2: '2 58220  53.0024  172.9840 0003998  90.7180 269.4120 15.14829480 41261',
    inclinationDeg: 53.0,
    velocityKmS: 7.58,
    periodMin: 95.6,
    raanDeg: 172.98,
    argPerigeeDeg: 90.72
  },
  {
    id: 'VGD-012',
    name: 'Vanguard-12 (Mu)',
    noradId: 58222,
    plane: 'Plane A (53°)',
    shellKm: 550,
    angleDeg: 315,
    status: 'Nominal',
    tleLine1: '1 58222U 24012M   26310.42941820  .00013960  00000-0  56942-3 0  9991',
    tleLine2: '2 58222  53.0031  142.8612 0004054  85.9184 274.2180 15.14829240 41268',
    inclinationDeg: 53.0,
    velocityKmS: 7.58,
    periodMin: 95.6,
    raanDeg: 142.86,
    argPerigeeDeg: 85.92
  },
  {
    id: 'VGD-018',
    name: 'Vanguard-18 (Sigma)',
    noradId: 58228,
    plane: 'SSO Core (98°)',
    shellKm: 700,
    angleDeg: 345,
    status: 'Nominal',
    tleLine1: '1 58228U 24012S   26310.41948210  .00008410  00000-0  34129-3 0  9996',
    tleLine2: '2 58228  98.1924  304.1824 0001940 112.4180 247.8190 14.58219410 41219',
    inclinationDeg: 98.2,
    velocityKmS: 7.51,
    periodMin: 98.8,
    raanDeg: 304.18,
    argPerigeeDeg: 112.42
  }
];

export const DEBRIS_TARGET = {
  id: 'DEB-34427',
  name: 'COSMOS-2251 DEB [34427]',
  noradId: 34427,
  shellKm: 548,
  angleDeg: 116,
  status: 'Conjunction Watch',
  missDistanceM: 1850,
  collisionPc: '4.82e-4',
  tcaCountdown: 'T-01:42:19',
  relativeVelocity: '14.28 km/s (Hyperbolic)',
  tleLine1: '1 34427U 93036KV  26310.44128912  .00049182  00000-0  18491-2 0  9998',
  tleLine2: '2 34427  74.0418  214.3019 0031842 108.4510 252.1940 15.15829140 38412'
};

interface PolarConjunctionRadarProps {
  hoveredSatId: string | null;
  onHoverSat: (id: string | null) => void;
  selectedSatId?: string | null;
  onSelectSat?: (id: string) => void;
}

export function PolarConjunctionRadar({
  hoveredSatId,
  onHoverSat,
  selectedSatId,
  onSelectSat
}: PolarConjunctionRadarProps) {
  const { theme } = useTheme();
  const tc = colors[theme];
  const gradientId = useId();

  const [activeShellFilter, setActiveShellFilter] = useState<'ALL' | '400' | '550' | '700'>('ALL');
  const [showSweep, setShowSweep] = useState(true);

  // Radar geometry
  const size = 420;
  const center = size / 2;

  // Concentric shell radiuses
  const r400 = 70;   // 400km VLEO
  const r550 = 130;  // 550km LEO Primary
  const r700 = 185;  // 700km SSO

  const getShellRadius = (shellKm: number) => {
    if (shellKm <= 450) return r400;
    if (shellKm <= 600) return r550;
    return r700;
  };

  const activeSat = RADAR_SATELLITES.find(s => s.id === (hoveredSatId || selectedSatId)) ||
    (hoveredSatId === DEBRIS_TARGET.id ? null : RADAR_SATELLITES[3]); // default to VGD-004

  const isDebrisHovered = hoveredSatId === DEBRIS_TARGET.id || selectedSatId === DEBRIS_TARGET.id;

  return (
    <div
      className="rounded-2xl p-6 transition-colors"
      style={{
        backgroundColor: tc.bgSecondary,
        border: `1px solid ${tc.borderPrimary}`
      }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 pb-4 border-b" style={{ borderColor: tc.borderPrimary }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Radar className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[15px] font-semibold tracking-tight" style={{ color: tc.textPrimary }}>
                Polar Orbit Conjunction Radar // 18th SDS Covariance Plane
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wide">
                Live 2D Polar
              </span>
            </div>
            <p className="text-xs mt-0.5" style={{ color: tc.textSecondary }}>
              Orbital shells (400 km, 550 km, 700 km) • 12 Active Spacecraft & Tracked Debris Vector
            </p>
          </div>
        </div>

        {/* Shell Filter Pills */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {(['ALL', '400', '550', '700'] as const).map(f => {
            const isSelected = activeShellFilter === f;
            const label = f === 'ALL' ? 'All Shells' : `${f} km`;
            return (
              <button
                key={f}
                onClick={() => setActiveShellFilter(f)}
                className="px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                style={{
                  backgroundColor: isSelected ? tc.bgTertiary : 'transparent',
                  border: `1px solid ${isSelected ? tc.accentPrimary : tc.borderPrimary}`,
                  color: isSelected ? tc.textPrimary : tc.textSecondary
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-center">
        {/* Left Radar SVG Scope */}
        <div className="xl:col-span-7 flex justify-center relative select-none">
          <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
            <svg
              viewBox={`0 0 ${size} ${size}`}
              className="w-full h-full"
              style={{ filter: theme === 'dark' ? 'drop-shadow(0 0 16px rgba(34, 211, 238, 0.05))' : 'none' }}
            >
              <defs>
                {/* Sweep sector gradient */}
                <radialGradient id={`radarGrad-${gradientId}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.25" />
                  <stop offset="60%" stopColor="#06B6D4" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
                </radialGradient>

                {/* Satellite glow */}
                <filter id={`cyanGlow-${gradientId}`} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id={`redGlow-${gradientId}`} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" />
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background circular field */}
              <circle
                cx={center}
                cy={center}
                r={r700 + 15}
                fill={theme === 'dark' ? '#141518' : '#F8F9FA'}
                stroke={tc.borderPrimary}
                strokeWidth="1"
              />

              {/* Polar Crosshairs */}
              <line
                x1={center}
                y1={center - r700 - 15}
                x2={center}
                y2={center + r700 + 15}
                stroke={tc.borderPrimary}
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <line
                x1={center - r700 - 15}
                y1={center}
                x2={center + r700 + 15}
                y2={center}
                stroke={tc.borderPrimary}
                strokeWidth="1"
                strokeDasharray="4 4"
              />

              {/* Angle Tick Annotations */}
              <text x={center} y={center - r700 - 2} textAnchor="middle" fill={tc.textTertiary} fontSize="9" fontWeight="600">000° N</text>
              <text x={center + r700 + 8} y={center + 3} textAnchor="start" fill={tc.textTertiary} fontSize="9" fontWeight="600">090° E</text>
              <text x={center} y={center + r700 + 10} textAnchor="middle" fill={tc.textTertiary} fontSize="9" fontWeight="600">180° S</text>
              <text x={center - r700 - 8} y={center + 3} textAnchor="end" fill={tc.textTertiary} fontSize="9" fontWeight="600">270° W</text>

              {/* Concentric Shell 1: 400km (VLEO) */}
              <circle
                cx={center}
                cy={center}
                r={r400}
                fill="none"
                stroke={activeShellFilter === '400' || activeShellFilter === 'ALL' ? (theme === 'dark' ? 'rgba(56, 189, 248, 0.4)' : 'rgba(56, 189, 248, 0.6)') : tc.borderPrimary}
                strokeWidth={activeShellFilter === '400' ? 2 : 1.2}
                strokeDasharray={activeShellFilter === '400' ? 'none' : '3 3'}
              />
              <text x={center + r400 - 4} y={center - 6} fill={tc.textTertiary} fontSize="8" fontWeight="600" textAnchor="end">
                400 km
              </text>

              {/* Concentric Shell 2: 550km (Vanguard Shell-1 Primary) */}
              <circle
                cx={center}
                cy={center}
                r={r550}
                fill="none"
                stroke={activeShellFilter === '550' || activeShellFilter === 'ALL' ? (theme === 'dark' ? 'rgba(99, 102, 241, 0.5)' : 'rgba(99, 102, 241, 0.7)') : tc.borderPrimary}
                strokeWidth={activeShellFilter === '550' ? 2 : 1.5}
              />
              <text x={center + r550 - 4} y={center - 6} fill={theme === 'dark' ? '#818CF8' : '#6366F1'} fontSize="8" fontWeight="700" textAnchor="end">
                550 km (Primary Shell-1)
              </text>

              {/* Concentric Shell 3: 700km (SSO Relay) */}
              <circle
                cx={center}
                cy={center}
                r={r700}
                fill="none"
                stroke={activeShellFilter === '700' || activeShellFilter === 'ALL' ? (theme === 'dark' ? 'rgba(168, 85, 247, 0.4)' : 'rgba(168, 85, 247, 0.6)') : tc.borderPrimary}
                strokeWidth={activeShellFilter === '700' ? 2 : 1.2}
                strokeDasharray={activeShellFilter === '700' ? 'none' : '4 4'}
              />
              <text x={center + r700 - 6} y={center - 6} fill={tc.textTertiary} fontSize="8" fontWeight="600" textAnchor="end">
                700 km (SSO)
              </text>

              {/* Sweeping Radial Sweep Line */}
              {showSweep && (
                <g className="origin-center animate-[spin_6s_linear_infinite]" style={{ transformOrigin: `${center}px ${center}px` }}>
                  {/* Sweep beam slice */}
                  <path
                    d={`M ${center} ${center} L ${center + r700 + 10} ${center} A ${r700 + 10} ${r700 + 10} 0 0 0 ${center + (r700 + 10) * Math.cos(-Math.PI / 6)} ${center + (r700 + 10) * Math.sin(-Math.PI / 6)} Z`}
                    fill={`url(#radarGrad-${gradientId})`}
                  />
                  {/* Leading edge line */}
                  <line
                    x1={center}
                    y1={center}
                    x2={center + r700 + 12}
                    y2={center}
                    stroke="#22D3EE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                </g>
              )}

              {/* Earth Center Reticle */}
              <circle cx={center} cy={center} r={16} fill={theme === 'dark' ? '#1E293B' : '#E2E8F0'} stroke={tc.borderPrimary} strokeWidth="1" />
              <circle cx={center} cy={center} r={4} fill="#6366F1" />
              <text x={center} y={center + 26} textAnchor="middle" fill={tc.textTertiary} fontSize="7" fontWeight="600">
                NADIR 0°
              </text>

              {/* Debris Vector (COSMOS-2251 DEB [34427]) */}
              {(() => {
                const angleRad = (DEBRIS_TARGET.angleDeg * Math.PI) / 180;
                const debX = center + (r550 - 4) * Math.cos(angleRad);
                const debY = center + (r550 - 4) * Math.sin(angleRad);
                const isHovered = isDebrisHovered;

                // Debris Approach Vector Line (intersecting Vanguard-04 orbit)
                const approachStartX = debX + 45 * Math.cos(angleRad - 0.4);
                const approachStartY = debY + 45 * Math.sin(angleRad - 0.4);

                return (
                  <g
                    key={DEBRIS_TARGET.id}
                    className="cursor-pointer transition-transform"
                    onMouseEnter={() => onHoverSat(DEBRIS_TARGET.id)}
                    onMouseLeave={() => onHoverSat(null)}
                    onClick={() => onSelectSat && onSelectSat(DEBRIS_TARGET.id)}
                  >
                    {/* Trajectory vector approach line */}
                    <line
                      x1={approachStartX}
                      y1={approachStartY}
                      x2={debX}
                      y2={debY}
                      stroke="#EF4444"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                      opacity="0.75"
                    />

                    {/* Ping Waves */}
                    <circle cx={debX} cy={debY} r={14} fill="none" stroke="#EF4444" strokeWidth="1" opacity="0.6" className="animate-ping" style={{ transformOrigin: `${debX}px ${debY}px` }} />
                    <circle cx={debX} cy={debY} r={isHovered ? 12 : 8} fill="rgba(239, 68, 68, 0.2)" stroke="#EF4444" strokeWidth="1.5" />
                    <circle cx={debX} cy={debY} r={isHovered ? 5 : 3.5} fill="#EF4444" filter={`url(#redGlow-${gradientId})`} />

                    {/* Label */}
                    <rect
                      x={debX + 8}
                      y={debY - 14}
                      width="88"
                      height="16"
                      rx="4"
                      fill={theme === 'dark' ? '#1E1215' : '#FEF2F2'}
                      stroke="rgba(239, 68, 68, 0.4)"
                      strokeWidth="1"
                    />
                    <text x={debX + 12} y={debY - 3} fill="#EF4444" fontSize="8" fontWeight="700">
                      DEB [34427] Pc: 4.8e-4
                    </text>
                  </g>
                );
              })()}

              {/* 12 Constellation Satellites */}
              {RADAR_SATELLITES.map(sat => {
                const angleRad = (sat.angleDeg * Math.PI) / 180;
                const r = getShellRadius(sat.shellKm);
                const x = center + r * Math.cos(angleRad);
                const y = center + r * Math.sin(angleRad);

                const isHovered = hoveredSatId === sat.id;
                const isSelected = selectedSatId === sat.id;
                const isHighlighted = isHovered || isSelected;

                // Color by status
                const isWatch = sat.status === 'Conjunction Watch';
                const isStation = sat.status === 'Station-Keeping';
                const blipFill = isWatch ? '#F59E0B' : isStation ? '#818CF8' : '#22D3EE';
                const blipHalo = isWatch ? 'rgba(245, 158, 11, 0.3)' : isStation ? 'rgba(129, 140, 248, 0.3)' : 'rgba(34, 211, 238, 0.25)';

                return (
                  <g
                    key={sat.id}
                    className="cursor-pointer"
                    onMouseEnter={() => onHoverSat(sat.id)}
                    onMouseLeave={() => onHoverSat(null)}
                    onClick={() => onSelectSat && onSelectSat(sat.id)}
                  >
                    {/* Highlight Target Reticle when hovered/selected */}
                    {isHighlighted && (
                      <g className="animate-spin" style={{ transformOrigin: `${x}px ${y}px`, animationDuration: '8s' }}>
                        <circle cx={x} cy={y} r={14} fill="none" stroke={blipFill} strokeWidth="1.5" strokeDasharray="4 2" />
                        <line x1={x - 18} y1={y} x2={x - 12} y2={y} stroke={blipFill} strokeWidth="1.5" />
                        <line x1={x + 12} y1={y} x2={x + 18} y2={y} stroke={blipFill} strokeWidth="1.5" />
                        <line x1={x} y1={y - 18} x2={x} y2={y - 12} stroke={blipFill} strokeWidth="1.5" />
                        <line x1={x} y1={y + 12} x2={x} y2={y + 18} stroke={blipFill} strokeWidth="1.5" />
                      </g>
                    )}

                    {/* Blip halo ring */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isHighlighted ? 9 : 6}
                      fill={blipHalo}
                      className="transition-all duration-200"
                    />

                    {/* Center blip */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isHighlighted ? 4.5 : 3}
                      fill={blipFill}
                      filter={`url(#cyanGlow-${gradientId})`}
                      className="transition-all duration-200"
                    />

                    {/* Callsign Micro Tag */}
                    <text
                      x={x + 8}
                      y={y + 3}
                      fill={isHighlighted ? tc.textPrimary : tc.textSecondary}
                      fontSize={isHighlighted ? '9' : '7.5'}
                      fontWeight={isHighlighted ? '700' : '500'}
                      style={{
                        paintOrder: 'stroke',
                        stroke: theme === 'dark' ? '#16171A' : '#FFFFFF',
                        strokeWidth: '2px'
                      }}
                    >
                      {sat.id}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right TLE Telemetry Inspector HUD */}
        <div className="xl:col-span-5 flex flex-col justify-between space-y-4">
          <div
            className="rounded-xl p-4 transition-colors"
            style={{
              backgroundColor: tc.bgTertiary,
              border: `1px solid ${tc.borderPrimary}`
            }}
          >
            {isDebrisHovered ? (
              // DEBRIS INSPECTION HUD
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                    <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">
                      CONJUNCTION TARGET ACQUIRED
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono">
                    NORAD 34427
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-rose-400">
                    {DEBRIS_TARGET.name}
                  </h4>
                  <p className="text-[11px] mt-0.5" style={{ color: tc.textSecondary }}>
                    In-Track Crossing Vector vs VANGUARD-04 [58214]
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  <div className="p-2.5 rounded-lg" style={{ backgroundColor: tc.bgSecondary }}>
                    <div className="text-[10px]" style={{ color: tc.textSecondary }}>Collision Pc</div>
                    <div className="text-sm font-bold text-rose-400 font-mono">{DEBRIS_TARGET.collisionPc}</div>
                  </div>
                  <div className="p-2.5 rounded-lg" style={{ backgroundColor: tc.bgSecondary }}>
                    <div className="text-[10px]" style={{ color: tc.textSecondary }}>TCA Countdown</div>
                    <div className="text-sm font-bold text-amber-400 font-mono">{DEBRIS_TARGET.tcaCountdown}</div>
                  </div>
                  <div className="p-2.5 rounded-lg" style={{ backgroundColor: tc.bgSecondary }}>
                    <div className="text-[10px]" style={{ color: tc.textSecondary }}>Post-CAM Miss Dist</div>
                    <div className="text-xs font-bold" style={{ color: tc.textPrimary }}>{DEBRIS_TARGET.missDistanceM.toLocaleString()} m</div>
                  </div>
                  <div className="p-2.5 rounded-lg" style={{ backgroundColor: tc.bgSecondary }}>
                    <div className="text-[10px]" style={{ color: tc.textSecondary }}>Relative Velocity</div>
                    <div className="text-xs font-bold" style={{ color: tc.textPrimary }}>{DEBRIS_TARGET.relativeVelocity}</div>
                  </div>
                </div>

                {/* TLE Raw Box */}
                <div className="pt-2 border-t" style={{ borderColor: tc.borderPrimary }}>
                  <div className="text-[10px] font-mono text-zinc-400 mb-1">CCSDS 18th SDS TLE Vector:</div>
                  <pre
                    className="p-2 rounded-lg text-[9.5px] font-mono leading-relaxed overflow-x-auto select-all"
                    style={{
                      backgroundColor: theme === 'dark' ? '#111214' : '#F1F3F5',
                      color: theme === 'dark' ? '#F43F5E' : '#BE123C'
                    }}
                  >
                    {DEBRIS_TARGET.tleLine1}
                    {'\n'}
                    {DEBRIS_TARGET.tleLine2}
                  </pre>
                </div>
              </div>
            ) : activeSat ? (
              // SATELLITE TLE INSPECTION HUD
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor:
                          activeSat.status === 'Conjunction Watch'
                            ? '#F59E0B'
                            : activeSat.status === 'Station-Keeping'
                            ? '#818CF8'
                            : '#22D3EE'
                      }}
                    />
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: tc.textPrimary }}>
                      {activeSat.id} // {activeSat.name}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-md border font-medium ${
                      activeSat.status === 'Conjunction Watch'
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        : activeSat.status === 'Station-Keeping'
                        ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}
                  >
                    {activeSat.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: tc.bgSecondary }}>
                    <div className="text-[10px]" style={{ color: tc.textSecondary }}>NORAD ID</div>
                    <div className="text-xs font-mono font-bold" style={{ color: tc.textPrimary }}>{activeSat.noradId}</div>
                  </div>
                  <div className="p-2 rounded-lg" style={{ backgroundColor: tc.bgSecondary }}>
                    <div className="text-[10px]" style={{ color: tc.textSecondary }}>Orbital Plane</div>
                    <div className="text-xs font-bold truncate" style={{ color: tc.textPrimary }}>{activeSat.plane}</div>
                  </div>
                  <div className="p-2 rounded-lg" style={{ backgroundColor: tc.bgSecondary }}>
                    <div className="text-[10px]" style={{ color: tc.textSecondary }}>Semi-Major Axis (Alt)</div>
                    <div className="text-xs font-mono font-bold" style={{ color: tc.textPrimary }}>{activeSat.shellKm}.00 km</div>
                  </div>
                  <div className="p-2 rounded-lg" style={{ backgroundColor: tc.bgSecondary }}>
                    <div className="text-[10px]" style={{ color: tc.textSecondary }}>Velocity / Period</div>
                    <div className="text-xs font-mono font-bold" style={{ color: tc.textPrimary }}>{activeSat.velocityKmS} km/s ({activeSat.periodMin}m)</div>
                  </div>
                </div>

                {/* TLE Ephemeris Lines */}
                <div className="pt-2 border-t" style={{ borderColor: tc.borderPrimary }}>
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1">
                    <span>Live 2-Line Ephemeris (TLE):</span>
                    <span className="text-cyan-400">EPOCH J2000.0</span>
                  </div>
                  <pre
                    className="p-2 rounded-lg text-[9px] font-mono leading-relaxed overflow-x-auto select-all"
                    style={{
                      backgroundColor: theme === 'dark' ? '#111214' : '#F1F3F5',
                      color: theme === 'dark' ? '#22D3EE' : '#0284C7'
                    }}
                  >
                    {activeSat.tleLine1}
                    {'\n'}
                    {activeSat.tleLine2}
                  </pre>
                </div>
              </div>
            ) : null}
          </div>

          {/* Quick Guidance Footer */}
          <div className="flex items-center justify-between text-xs px-2" style={{ color: tc.textSecondary }}>
            <span className="flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
              Hover blip or row to sync telemetry lock
            </span>
            <button
              onClick={() => setShowSweep(s => !s)}
              className="text-[11px] underline cursor-pointer"
              style={{ color: tc.textTertiary }}
            >
              {showSweep ? 'Pause Sweep' : 'Resume Sweep'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
