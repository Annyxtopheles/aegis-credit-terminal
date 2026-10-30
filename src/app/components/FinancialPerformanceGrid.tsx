import { BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Cell, LabelList } from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

const conjunctionFluxData = [
  { id: 1, label: 'ORBIT 4102', value: 1.2 },
  { id: 2, label: 'ORBIT 4104', value: 1.8 },
  { id: 3, label: 'ORBIT 4106', value: 2.4 },
  { id: 4, label: 'ORBIT 4108', value: 3.1 },
  { id: 5, label: 'ORBIT 4110', value: 3.9 },
  { id: 6, label: 'ORBIT 4112', value: 4.4 },
  { id: 7, label: 'ORBIT 4114', value: 4.6 },
  { id: 8, label: 'ORBIT 4116', value: 4.82 },
];

const propellantBurnData = [
  { id: 1, epoch: 'W-07', xenonKg: 4.82, deltaV: 1.2 },
  { id: 2, epoch: 'W-06', xenonKg: 4.74, deltaV: 2.4 },
  { id: 3, epoch: 'W-05', xenonKg: 4.65, deltaV: 1.8 },
  { id: 4, epoch: 'W-04', xenonKg: 4.52, deltaV: 3.5 },
  { id: 5, epoch: 'W-03', xenonKg: 4.41, deltaV: 2.9 },
  { id: 6, epoch: 'W-02', xenonKg: 4.29, deltaV: 3.1 },
  { id: 7, epoch: 'W-01', xenonKg: 4.19, deltaV: 2.2 },
  { id: 8, epoch: 'CURR', xenonKg: 4.12, deltaV: 4.2 },
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      {/* Chart 1: Peak Collision Probability Trend */}
      <div
        className="p-5 md:p-6 transition-colors duration-300 rounded-2xl"
        style={{
          backgroundColor: tc.bgSecondary,
          border: `1px solid ${tc.borderPrimary}`,
          minHeight: '240px'
        }}
      >
        <h4 style={{ fontSize: '13px', fontWeight: 700, color: tc.textPrimary, marginBottom: '4px', letterSpacing: '0.05em' }} className="uppercase">
          COLLISION PROBABILITY (Pc × 10⁻⁴) // ORBIT PASSES
        </h4>
        <p className="font-mono text-[11px] mb-4" style={{ color: tc.textSecondary }}>
          RED THRESHOLD: 4.0 × 10⁻⁴ // COSMOS-2251 FRAGMENT CLOUD
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={conjunctionFluxData}>
            <CartesianGrid strokeDasharray="2 2" stroke={tc.gridLine} opacity={0.5} vertical={false} />
            <XAxis
              dataKey="label"
              stroke={tc.textSecondary}
              style={{ fontSize: '10px', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}
              angle={-15}
              textAnchor="end"
              height={45}
            />
            <YAxis
              stroke={tc.textSecondary}
              style={{ fontSize: '11px', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}
              domain={[0, 6]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: tc.bgSecondary,
                border: `1px solid ${tc.accentPrimary}`,
                color: tc.textPrimary,
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '12px'
              }}
              formatter={(v: any) => [`${v}e-4`, 'Peak Pc']}
            />
            <Bar dataKey="value" name="Peak Pc (×10⁻⁴)" radius={[3, 3, 0, 0]}>
              {conjunctionFluxData.map((entry) => (
                <Cell key={`pc-${entry.id}`} fill={entry.value >= 4.0 ? tc.alertRed : tc.chartCyan} />
              ))}
              <LabelList dataKey="value" position="top" style={{ fill: tc.textPrimary, fontSize: '10px', fontFamily: 'JetBrains Mono, monospace' }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 2: Xenon Propellant Depletion & Burn Delta-V */}
      <div
        className="p-5 md:p-6 transition-colors duration-300 rounded-2xl"
        style={{
          backgroundColor: tc.bgSecondary,
          border: `1px solid ${tc.borderPrimary}`,
          minHeight: '240px'
        }}
      >
        <h4 style={{ fontSize: '13px', fontWeight: 700, color: tc.textPrimary, marginBottom: '4px', letterSpacing: '0.05em' }} className="uppercase">
          XENON PROPELLANT RESERVE (KG) & CAM DELTA-V (M/S)
        </h4>
        <p className="font-mono text-[11px] mb-4" style={{ color: tc.textSecondary }}>
          VANGUARD-04 HALL THRUSTER TELEMETRY // FCC 4.50 KG FLOOR
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={propellantBurnData}>
            <CartesianGrid strokeDasharray="2 2" stroke={tc.gridLine} opacity={0.5} vertical={false} />
            <XAxis
              dataKey="epoch"
              stroke={tc.textSecondary}
              style={{ fontSize: '10px', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}
            />
            <YAxis
              yAxisId="left"
              stroke={tc.textSecondary}
              style={{ fontSize: '11px', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}
              domain={[3.5, 5.2]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke={tc.textSecondary}
              style={{ fontSize: '11px', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}
              domain={[0, 6]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: tc.bgSecondary,
                border: `1px solid ${tc.accentPrimary}`,
                color: tc.textPrimary,
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '12px'
              }}
            />
            <Bar yAxisId="left" dataKey="xenonKg" name="Xenon Mass (kg)" fill={tc.chartCyan} radius={[3, 3, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="deltaV" name="Weekly ΔV (m/s)" stroke={tc.alertAmber} strokeWidth={2} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 3: Active SVs by Orbital Plane */}
      <div
        className="p-5 md:p-6 transition-colors duration-300 rounded-2xl"
        style={{
          backgroundColor: tc.bgSecondary,
          border: `1px solid ${tc.borderPrimary}`,
          minHeight: '220px'
        }}
      >
        <h4 style={{ fontSize: '13px', fontWeight: 700, color: tc.textPrimary, marginBottom: '12px', letterSpacing: '0.05em' }} className="uppercase">
          SPACECRAFT DISTRIBUTION BY ORBITAL PLANE
        </h4>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={shellDistributionData} layout="vertical" margin={{ left: 20, right: 30 }}>
            <CartesianGrid strokeDasharray="2 2" stroke={tc.gridLine} opacity={0.5} horizontal={false} />
            <XAxis type="number" stroke={tc.textSecondary} style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace' }} domain={[0, 20]} />
            <YAxis type="category" dataKey="segment" stroke={tc.textSecondary} style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace' }} width={140} />
            <Tooltip
              contentStyle={{
                backgroundColor: tc.bgSecondary,
                border: `1px solid ${tc.accentPrimary}`,
                color: tc.textPrimary,
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="value" name="Active SVs" fill={tc.accentPrimary} radius={[0, 4, 4, 0]}>
              <LabelList dataKey="value" position="right" style={{ fill: tc.textPrimary, fontSize: '11px', fontFamily: 'JetBrains Mono, monospace' }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 4: Transponder & Optical Link Margin */}
      <div
        className="p-5 md:p-6 transition-colors duration-300 rounded-2xl"
        style={{
          backgroundColor: tc.bgSecondary,
          border: `1px solid ${tc.borderPrimary}`,
          minHeight: '220px'
        }}
      >
        <h4 style={{ fontSize: '13px', fontWeight: 700, color: tc.textPrimary, marginBottom: '12px', letterSpacing: '0.05em' }} className="uppercase">
          TELEMETRY & OPTICAL ISL LINK MARGIN (dB)
        </h4>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={linkMarginByPlaneData} layout="vertical" margin={{ left: 20, right: 30 }}>
            <CartesianGrid strokeDasharray="2 2" stroke={tc.gridLine} opacity={0.5} horizontal={false} />
            <XAxis type="number" stroke={tc.textSecondary} style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace' }} domain={[0, 26]} />
            <YAxis type="category" dataKey="segment" stroke={tc.textSecondary} style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace' }} width={155} />
            <Tooltip
              contentStyle={{
                backgroundColor: tc.bgSecondary,
                border: `1px solid ${tc.accentPrimary}`,
                color: tc.textPrimary,
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '12px'
              }}
              formatter={(v: any) => [`${v} dB`, 'Link Margin']}
            />
            <Bar dataKey="margin" name="Link Margin (dB)" fill={tc.alertGreen} radius={[0, 4, 4, 0]}>
              <LabelList dataKey="margin" position="right" formatter={(v: any) => `${v} dB`} style={{ fill: tc.textPrimary, fontSize: '11px', fontFamily: 'JetBrains Mono, monospace' }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
