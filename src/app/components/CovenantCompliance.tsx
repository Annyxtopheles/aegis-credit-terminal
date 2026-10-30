import { ShieldAlert } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export function CovenantCompliance() {
  const { theme } = useTheme();
  const tc = colors[theme];

  const gauges = [
    {
      id: 'deorbit',
      title: '5-YR DE-ORBIT XENON RESERVE',
      spacecraft: 'VANGUARD-04 [58214]',
      actual: '4.12 kg',
      threshold: '4.50 kg SLA',
      pct: 68,
      status: 'SLA BREACH',
      color: tc.alertRed
    },
    {
      id: 'cam',
      title: 'CAM THRUSTER READINESS',
      spacecraft: 'HALL-EFFECT BUS-A',
      actual: 'T-102 min',
      threshold: 'T-180 min SLA',
      pct: 82,
      status: 'ARMED // WARN',
      color: tc.alertAmber
    },
    {
      id: 'isl',
      title: 'OPTICAL / Ka-BAND LINK MARGIN',
      spacecraft: 'SHELL-1 MESH',
      actual: '+9.8 dB',
      threshold: '+6.0 dB MIN',
      pct: 94,
      status: 'NOMINAL LOCK',
      color: tc.accentPrimary
    }
  ];

  const burnVectors = [
    { axis: 'ΔV RADIAL (Vr)', val: '+0.04 m/s', tol: '±0.01 m/s', status: 'NOMINAL' },
    { axis: 'ΔV IN-TRACK (Vt)', val: '+0.85 m/s', tol: '±0.02 m/s', status: 'PRIMARY BURN' },
    { axis: 'ΔV CROSS-TRACK (Vn)', val: '-0.02 m/s', tol: '±0.01 m/s', status: 'NOMINAL' },
  ];

  return (
    <div
      className="p-4 md:p-5 transition-colors duration-300"
      style={{
        backgroundColor: tc.bgSecondary,
        border: `1px solid ${tc.borderPrimary}`
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b" style={{ borderColor: tc.borderPrimary }}>
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4" style={{ color: tc.alertRed }} />
          <h3 className="font-mono text-xs md:text-sm font-bold tracking-wider uppercase" style={{ color: tc.textPrimary }}>
            FCC / ESA DE-ORBIT & CAM TELEMETRY GAUGES
          </h3>
        </div>
        <span
          className="px-2 py-0.5 rounded-sm font-mono text-[10px] font-bold uppercase"
          style={{
            backgroundColor: `${tc.alertRed}20`,
            color: tc.alertRed,
            border: `1px solid ${tc.alertRed}50`
          }}
        >
          1 RESERVE DEFICIT
        </span>
      </div>

      {/* 3 Circular Radial SVG Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {gauges.map(g => {
          const radius = 34;
          const circumference = 2 * Math.PI * radius;
          const dashOffset = circumference - (g.pct / 100) * circumference;

          return (
            <div
              key={g.id}
              className="p-3 rounded-sm flex flex-col items-center text-center font-mono"
              style={{
                backgroundColor: tc.bgTertiary,
                border: `1px solid ${tc.borderPrimary}`
              }}
            >
              <div className="relative w-20 h-20 flex items-center justify-center mb-2">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 84 84">
                  <circle
                    cx="42"
                    cy="42"
                    r={radius}
                    fill="none"
                    stroke={theme === 'dark' ? '#1A2636' : '#E2E8F0'}
                    strokeWidth="6"
                  />
                  <circle
                    cx="42"
                    cy="42"
                    r={radius}
                    fill="none"
                    stroke={g.color}
                    strokeWidth="6"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xs font-bold" style={{ color: g.color }}>{g.actual}</span>
                  <span className="text-[8px]" style={{ color: tc.textTertiary }}>{g.pct}%</span>
                </div>
              </div>

              <div className="text-[10px] font-bold tracking-wider uppercase" style={{ color: tc.textPrimary }}>
                {g.title}
              </div>
              <div className="text-[9px] mt-0.5" style={{ color: tc.textSecondary }}>
                REQ: {g.threshold}
              </div>
              <span
                className="mt-1.5 px-1.5 py-0.5 rounded-sm text-[9px] font-bold"
                style={{
                  backgroundColor: `${g.color}20`,
                  color: g.color
                }}
              >
                {g.status}
              </span>
            </div>
          );
        })}
      </div>

      {/* 3-Axis Thruster Burn Vector Matrix */}
      <div className="pt-3 border-t font-mono" style={{ borderColor: tc.borderPrimary }}>
        <div className="text-[10px] uppercase tracking-wider font-bold mb-2" style={{ color: tc.textSecondary }}>
          UPLOADED 3-AXIS HALL-EFFECT CAM VECTOR (VANGUARD-04 // EPOCH 16:40 UTC)
        </div>
        <div className="grid grid-cols-3 gap-2">
          {burnVectors.map(v => (
            <div
              key={v.axis}
              className="p-2 rounded-sm"
              style={{
                backgroundColor: tc.bgPrimary,
                border: `1px solid ${tc.borderPrimary}`
              }}
            >
              <div className="text-[9px]" style={{ color: tc.textSecondary }}>{v.axis}</div>
              <div className="text-xs font-bold mt-0.5" style={{ color: tc.accentPrimary }}>{v.val}</div>
              <div className="text-[8px] mt-0.5" style={{ color: tc.textTertiary }}>TOL: {v.tol}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
