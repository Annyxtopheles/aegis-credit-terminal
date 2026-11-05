import { BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Cell } from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

const conjunctionFluxData = [
  { id: 1, label: 'Pass 4102', value: 1.2 },
  { id: 2, label: 'Pass 4104', value: 1.8 },
  { id: 3, label: 'Pass 4106', value: 2.4 },
  { id: 4, label: 'Pass 4108', value: 3.1 },
  { id: 5, label: 'Pass 4110', value: 3.9 },
  { id: 6, label: 'Pass 4112', value: 4.4 },
  { id: 7, label: 'Pass 4114', value: 4.6 },
  { id: 8, label: 'Pass 4116', value: 4.82 },
];

const propellantBurnData = [
  { id: 1, epoch: 'W-07', xenonKg: 4.82, deltaV: 1.2 },
  { id: 2, epoch: 'W-06', xenonKg: 4.74, deltaV: 2.4 },
  { id: 3, epoch: 'W-05', xenonKg: 4.65, deltaV: 1.8 },
  { id: 4, epoch: 'W-04', xenonKg: 4.52, deltaV: 3.5 },
  { id: 5, epoch: 'W-03', xenonKg: 4.41, deltaV: 2.9 },
  { id: 6, epoch: 'W-02', xenonKg: 4.29, deltaV: 3.1 },
  { id: 7, epoch: 'W-01', xenonKg: 4.19, deltaV: 2.2 },
  { id: 8, epoch: 'Current', xenonKg: 4.12, deltaV: 4.2 },
];

const shellDistributionData = [
  { id: 1, segment: 'Plane A (540km SSO)', value: 16 },
  { id: 2, segment: 'Plane B (540km SSO)', value: 16 },
  { id: 3, segment: 'Plane C (525km Phasing)', value: 16 }
];

const linkMarginByPlaneData = [
  { id: 1, segment: 'Plane A (Svalbard S-Band)', margin: 14.2 },
  { id: 2, segment: 'Plane B (Punta Arenas X-Band)', margin: 16.8 },
  { id: 3, segment: 'Plane C (Optical ISL Mesh)', margin: 22.4 }
];

export function FinancialPerformanceGrid() {
  const { theme } = useTheme();
  const tc = colors[theme];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Chart 1: Collision Probability Trend */}
      <div
        className="p-6 transition-colors duration-300 rounded-2xl flex flex-col justify-between"
        style={{
          backgroundColor: tc.bgSecondary,
          border: `1px solid ${tc.borderPrimary}`,
          minHeight: '290px'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-[15px] font-semibold text-zinc-100 tracking-tight">
              Collision Probability Trend (Pc × 10⁻⁴)
            </h4>
            <p className="text-xs text-zinc-400 mt-0.5">
              Target threshold 4.0e-4 // COSMOS-2251 debris fragment passes
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
            Critical Pass 4116
          </span>
        </div>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={conjunctionFluxData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={tc.borderPrimary} vertical={false} />
              <XAxis
                dataKey="label"
                stroke="#71717A"
                style={{ fontSize: '11px', fontFamily: 'inherit' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#71717A"
                style={{ fontSize: '11px' }}
                domain={[0, 6]}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: tc.bgSecondary,
                  borderColor: tc.borderPrimary,
                  borderRadius: '12px',
                  color: tc.textPrimary,
                  fontSize: '12px',
                  boxShadow: theme === 'dark' ? '0 8px 24px rgba(0,0,0,0.4)' : '0 8px 24px rgba(0,0,0,0.08)'
                }}
                formatter={(v: any) => [`${v} × 10⁻⁴`, 'Peak Pc']}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {conjunctionFluxData.map((entry) => (
                  <Cell
                    key={`pc-${entry.id}`}
                    fill={entry.value >= 4.0 ? '#F43F5E' : '#818CF8'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Xenon Propellant Depletion & Burn Delta-V */}
      <div
        className="p-6 transition-colors duration-300 rounded-2xl flex flex-col justify-between"
        style={{
          backgroundColor: tc.bgSecondary,
          border: `1px solid ${tc.borderPrimary}`,
          minHeight: '290px'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-[15px] font-semibold text-zinc-100 tracking-tight">
              Xenon Propellant & CAM ΔV Expenditure
            </h4>
            <p className="text-xs text-zinc-400 mt-0.5">
              Weekly mass burn rate vs. cumulative avoidance delta-v
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500" /> Mass (kg)
            </span>
            <span className="flex items-center gap-1.5 text-zinc-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> ΔV (m/s)
            </span>
          </div>
        </div>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={propellantBurnData} margin={{ top: 10, right: -10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={tc.borderPrimary} vertical={false} />
              <XAxis
                dataKey="epoch"
                stroke="#71717A"
                style={{ fontSize: '11px', fontFamily: 'inherit' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="left"
                stroke="#71717A"
                style={{ fontSize: '11px' }}
                domain={[3.5, 5.2]}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#71717A"
                style={{ fontSize: '11px' }}
                domain={[0, 6]}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: tc.bgSecondary,
                  borderColor: tc.borderPrimary,
                  borderRadius: '12px',
                  color: tc.textPrimary,
                  fontSize: '12px',
                  boxShadow: theme === 'dark' ? '0 8px 24px rgba(0,0,0,0.4)' : '0 8px 24px rgba(0,0,0,0.08)'
                }}
              />
              <Bar yAxisId="left" dataKey="xenonKg" name="Xenon Mass (kg)" fill="#818CF8" radius={[6, 6, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="deltaV" name="Weekly ΔV (m/s)" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 3, fill: '#F59E0B' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 3: Active SVs by Orbital Plane */}
      <div
        className="p-6 transition-colors duration-300 rounded-2xl flex flex-col justify-between"
        style={{
          backgroundColor: tc.bgSecondary,
          border: `1px solid ${tc.borderPrimary}`,
          minHeight: '260px'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-[15px] font-semibold text-zinc-100 tracking-tight">
              Constellation Distribution by Orbital Plane
            </h4>
            <p className="text-xs text-zinc-400 mt-0.5">
              Target nominal density: 16 vehicles per sun-synchronous ring
            </p>
          </div>
          <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            48 / 48 Active
          </span>
        </div>
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={shellDistributionData} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={tc.borderPrimary} horizontal={false} />
              <XAxis type="number" stroke={tc.textTertiary} style={{ fontSize: '11px' }} domain={[0, 20]} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="segment" stroke={tc.textSecondary} style={{ fontSize: '12px' }} width={160} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: tc.bgSecondary,
                  borderColor: tc.borderPrimary,
                  borderRadius: '12px',
                  color: tc.textPrimary,
                  fontSize: '12px',
                  boxShadow: theme === 'dark' ? '0 8px 24px rgba(0,0,0,0.4)' : '0 8px 24px rgba(0,0,0,0.08)'
                }}
              />
              <Bar dataKey="value" name="Active SVs" fill="#6366F1" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 4: Transponder & Optical Link Margin */}
      <div
        className="p-6 transition-colors duration-300 rounded-2xl flex flex-col justify-between"
        style={{
          backgroundColor: tc.bgSecondary,
          border: `1px solid ${tc.borderPrimary}`,
          minHeight: '260px'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-[15px] font-semibold tracking-tight" style={{ color: tc.textPrimary }}>
              Ground & Optical Cross-Link Margin (dB)
            </h4>
            <p className="text-xs mt-0.5" style={{ color: tc.textSecondary }}>
              Minimum operating threshold +6.0 dB above thermal noise floor
            </p>
          </div>
          <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
            S-Band & Optical Locked
          </span>
        </div>
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={linkMarginByPlaneData} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={tc.borderPrimary} horizontal={false} />
              <XAxis type="number" stroke={tc.textTertiary} style={{ fontSize: '11px' }} domain={[0, 26]} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="segment" stroke={tc.textSecondary} style={{ fontSize: '12px' }} width={160} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: tc.bgSecondary,
                  borderColor: tc.borderPrimary,
                  borderRadius: '12px',
                  color: tc.textPrimary,
                  fontSize: '12px',
                  boxShadow: theme === 'dark' ? '0 8px 24px rgba(0,0,0,0.4)' : '0 8px 24px rgba(0,0,0,0.08)'
                }}
                formatter={(v: any) => [`${v} dB`, 'Link Margin']}
              />
              <Bar dataKey="margin" name="Link Margin (dB)" fill="#10B981" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
