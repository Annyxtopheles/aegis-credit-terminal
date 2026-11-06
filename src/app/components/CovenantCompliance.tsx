import { ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTelemetry } from '../context/TelemetryContext';
import { colors } from '../theme/colors';

export function CovenantCompliance() {
  const { theme } = useTheme();
  const { signalMarginFormatted } = useTelemetry();
  const tc = colors[theme];

  const gauges = [
    {
      id: 'deorbit',
      title: '5-Yr De-Orbit Xenon Reserve',
      spacecraft: 'VANGUARD-04 [58214]',
      actual: '4.12 kg',
      threshold: '4.50 kg SLA Floor',
      pct: 68,
      status: 'SLA Breach',
      type: 'danger'
    },
    {
      id: 'cam',
      title: 'CAM Thruster Readiness',
      spacecraft: 'Hall-Effect Bus-A',
      actual: 'T-102 Minutes',
      threshold: 'T-180 Minutes SLA',
      pct: 82,
      status: 'Armed // Active',
      type: 'warning'
    },
    {
      id: 'isl',
      title: 'Optical / Ka-Band Link Margin',
      spacecraft: 'Shell-1 Mesh Ring',
      actual: signalMarginFormatted,
      threshold: '+6.0 dB Minimum',
      pct: 94,
      status: 'Nominal Lock',
      type: 'success'
    }
  ];

  const burnVectors = [
    { axis: 'ΔV Radial (Vr)', val: '+0.04 m/s', tol: '±0.01 m/s', status: 'Nominal', badge: 'bg-emerald-500/10 text-emerald-400' },
    { axis: 'ΔV In-Track (Vt)', val: '+0.85 m/s', tol: '±0.02 m/s', status: 'Primary CAM', badge: 'bg-indigo-500/10 text-indigo-400' },
    { axis: 'ΔV Cross-Track (Vn)', val: '-0.02 m/s', tol: '±0.01 m/s', status: 'Nominal', badge: 'bg-emerald-500/10 text-emerald-400' },
  ];

  return (
    <div
      className="p-6 rounded-2xl transition-colors duration-300"
      style={{
        backgroundColor: tc.bgSecondary,
        border: `1px solid ${tc.borderPrimary}`
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b" style={{ borderColor: tc.borderPrimary }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[16px] font-semibold tracking-tight text-zinc-100">
              FCC & ESA De-Orbit & CAM Telemetry SLA
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Automated compliance monitoring against 18th SDS orbital safety envelopes
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
          1 Reserve Deficit Detected
        </span>
      </div>

      {/* 3 Circular Radial SVG Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {gauges.map(g => {
          const radius = 38;
          const circumference = 2 * Math.PI * radius;
          const dashOffset = circumference - (g.pct / 100) * circumference;

          const strokeColor =
            g.type === 'danger' ? '#F43F5E' : g.type === 'warning' ? '#F59E0B' : '#10B981';
          const badgeClass =
            g.type === 'danger'
              ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
              : g.type === 'warning'
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';

          return (
            <div
              key={g.id}
              className="p-4 rounded-xl flex flex-col items-center text-center transition-all duration-200"
              style={{
                backgroundColor: tc.bgTertiary,
                border: `1px solid ${tc.borderPrimary}`
              }}
            >
              <div className="relative w-24 h-24 flex items-center justify-center mb-3">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 92 92">
                  <circle
                    cx="46"
                    cy="46"
                    r={radius}
                    fill="none"
                    stroke={theme === 'dark' ? '#2A2C32' : '#E2E8F0'}
                    strokeWidth="6"
                  />
                  <circle
                    cx="46"
                    cy="46"
                    r={radius}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth="6"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm font-bold text-zinc-100">{g.actual}</span>
                  <span className="text-[10px] text-zinc-400 mt-0.5">{g.pct}%</span>
                </div>
              </div>

              <div className="text-xs font-semibold text-zinc-100 tracking-tight">
                {g.title}
              </div>
              <div className="text-[11px] text-zinc-400 mt-0.5">
                {g.spacecraft}
              </div>
              <div className="text-[10px] text-zinc-500 mt-1 ">
                Req: {g.threshold}
              </div>
              <span
                className={`mt-2.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${badgeClass}`}
              >
                {g.status}
              </span>
            </div>
          );
        })}
      </div>

      {/* 3-Axis Thruster Burn Vector Matrix */}
      <div className="pt-4 border-t" style={{ borderColor: tc.borderPrimary }}>
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
            Uploaded 3-Axis Hall-Effect CAM Vector (VANGUARD-04 // Epoch 16:40 UTC)
          </div>
          <span className="text-[11px] text-indigo-400">Ready for Execution</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {burnVectors.map(v => (
            <div
              key={v.axis}
              className="p-3.5 rounded-xl transition-colors duration-200"
              style={{
                backgroundColor: tc.bgPrimary,
                border: `1px solid ${tc.borderPrimary}`
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400 font-medium">{v.axis}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${v.badge}`}>
                  {v.status}
                </span>
              </div>
              <div className="text-base font-bold text-zinc-100 mt-2">{v.val}</div>
              <div className="text-[11px] text-zinc-500 mt-1">Tolerance: {v.tol}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
