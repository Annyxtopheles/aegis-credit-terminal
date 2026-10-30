import { useState } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar, Legend } from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

const rawData = [
  { id: 1, date: 'T-36h', missDist: 1.82, covariance: 420 },
  { id: 2, date: 'T-32h', missDist: 1.64, covariance: 390 },
  { id: 3, date: 'T-28h', missDist: 1.35, covariance: 365 },
  { id: 4, date: 'T-24h', missDist: 0.98, covariance: 340 },
  { id: 5, date: 'T-20h', missDist: 0.72, covariance: 310 },
  { id: 6, date: 'T-16h', missDist: 0.48, covariance: 280 },
  { id: 7, date: 'T-12h', missDist: 0.29, covariance: 245 },
  { id: 8, date: 'T-08h', missDist: 0.19, covariance: 210 },
  { id: 9, date: 'T-06h', missDist: 0.16, covariance: 185 },
  { id: 10, date: 'T-04h', missDist: 0.15, covariance: 162 },
  { id: 11, date: 'T-02h', missDist: 0.14, covariance: 142 },
  { id: 12, date: 'TCA', missDist: 0.14, covariance: 138 },
  { id: 13, date: 'T+02h', missDist: 0.65, covariance: 175 },
  { id: 14, date: 'T+04h', missDist: 1.42, covariance: 220 },
  { id: 15, date: 'T+08h', missDist: 2.38, covariance: 290 },
  { id: 16, date: 'T+12h', missDist: 3.15, covariance: 350 }
];

export function EquityPricingChart() {
  const { theme } = useTheme();
  const tc = colors[theme];
  const [range, setRange] = useState<'7D' | '14D' | '30D'>('30D');

  const filteredData = range === '7D'
    ? rawData.slice(6, 13)
    : range === '14D'
      ? rawData.slice(3, 15)
      : rawData;

  return (
    <div
      className="p-4 md:p-6 transition-colors duration-300 rounded-sm"
      style={{
        backgroundColor: tc.bgSecondary,
        border: `1px solid ${tc.borderPrimary}`
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6">
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: tc.textPrimary, letterSpacing: '0.04em' }} className="uppercase">
            CONJUNCTION MISS-DISTANCE & COVARIANCE ENVELOPE
          </h3>
          <p className="font-mono text-[11px] mt-0.5" style={{ color: tc.textSecondary }}>
            RADIAL/IN-TRACK MISS DISTANCE (KM) vs. 3σ ELLIPSOID DISPERSION (M) // EVENT CDM-88412
          </p>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-md self-start sm:self-auto" style={{ backgroundColor: tc.bgTertiary, border: `1px solid ${tc.borderPrimary}` }}>
          {(['7D', '14D', '30D'] as const).map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className="px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all cursor-pointer"
              style={{
                backgroundColor: range === r ? (theme === 'dark' ? '#0D131C' : '#FFFFFF') : 'transparent',
                color: range === r ? tc.accentPrimary : tc.textSecondary
              }}
            >
              {r === '7D' ? 'TCA±6H' : r === '14D' ? 'TCA±16H' : 'FULL CDM'}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={filteredData} margin={{ top: 5, right: 70, left: 0, bottom: 5 }}>
          <CartesianGrid
            strokeDasharray="2 2"
            stroke={tc.gridLine}
            opacity={theme === 'dark' ? 0.6 : 0.5}
            vertical={false}
          />
          <XAxis
            dataKey="date"
            stroke={tc.textSecondary}
            style={{ fontSize: '11px', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis
            yAxisId="left"
            stroke={tc.textSecondary}
            style={{ fontSize: '11px', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}
            domain={[0, 3.5]}
            tickFormatter={(v) => `${v.toFixed(1)}km`}
            label={{ value: 'Miss Dist (km)', angle: -90, position: 'insideLeft', style: { fill: tc.textSecondary, fontWeight: 600, fontSize: '11px' } }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke={tc.textSecondary}
            style={{ fontSize: '11px', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}
            domain={[0, 500]}
            tickFormatter={(v) => `${v}m`}
            label={{ value: 'In-Track σ (m)', angle: 90, position: 'right', dx: 20, style: { fill: tc.textSecondary, fontWeight: 600, fontSize: '11px' } }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: tc.bgSecondary,
              border: `1px solid ${tc.accentPrimary}`,
              borderRadius: '4px',
              color: tc.textPrimary,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '12px'
            }}
            formatter={(value: any, name: any) => [
              name === '3σ Covariance (m)' ? `±${value} m` : `${Number(value).toFixed(2)} km`,
              name
            ]}
          />
          <Legend
            verticalAlign="bottom"
            align="right"
            iconType="rect"
            wrapperStyle={{ paddingTop: '10px', fontSize: '11px', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}
          />
          <Bar
            yAxisId="right"
            dataKey="covariance"
            name="3σ Covariance (m)"
            fill={theme === 'dark' ? 'rgba(6, 182, 212, 0.22)' : 'rgba(8, 145, 178, 0.22)'}
            stroke={tc.accentPrimary}
            strokeWidth={1}
            isAnimationActive={false}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="missDist"
            name="Miss Distance (km)"
            stroke={tc.alertRed}
            strokeWidth={2.5}
            dot={{ r: 3, fill: tc.alertRed, stroke: tc.bgSecondary, strokeWidth: 1 }}
            activeDot={{ r: 6, fill: tc.alertRed }}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
