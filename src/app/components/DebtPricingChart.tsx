import { useState } from 'react';
import { Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Legend } from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

const rawData = [
  { id: 1, date: '24-Oct', altitude: 541.82, solarFlux: 142 },
  { id: 2, date: '26-Oct', altitude: 541.76, solarFlux: 148 },
  { id: 3, date: '28-Oct', altitude: 541.61, solarFlux: 176 },
  { id: 4, date: '30-Oct', altitude: 541.40, solarFlux: 192 },
  { id: 5, date: '1-Nov', altitude: 540.92, solarFlux: 228 },
  { id: 6, date: '3-Nov', altitude: 540.48, solarFlux: 210 },
  { id: 7, date: '5-Nov', altitude: 540.12, solarFlux: 198 },
  { id: 8, date: '7-Nov', altitude: 541.55, solarFlux: 185 }, // Prograde orbit-raising burn executed
  { id: 9, date: '9-Nov', altitude: 541.90, solarFlux: 152 },
  { id: 10, date: '11-Nov', altitude: 541.84, solarFlux: 164 },
  { id: 11, date: '13-Nov', altitude: 541.78, solarFlux: 149 },
  { id: 12, date: '15-Nov', altitude: 541.70, solarFlux: 155 },
  { id: 13, date: '17-Nov', altitude: 541.64, solarFlux: 160 },
  { id: 14, date: '19-Nov', altitude: 541.58, solarFlux: 144 },
  { id: 15, date: '21-Nov', altitude: 541.49, solarFlux: 172 },
  { id: 16, date: '23-Nov', altitude: 541.38, solarFlux: 184 }
];

export function DebtPricingChart() {
  const { theme } = useTheme();
  const tc = colors[theme];
  const [range, setRange] = useState<'7D' | '14D' | '30D'>('30D');

  const filteredData = range === '7D'
    ? rawData.slice(-5)
    : range === '14D'
      ? rawData.slice(-10)
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
            ORBITAL ALTITUDE DECAY & THERMOSPHERIC DRAG ({range === '30D' ? '30 DAY' : range === '14D' ? '14 DAY' : '7 DAY'})
          </h3>
          <p className="font-mono text-[11px] mt-0.5" style={{ color: tc.textSecondary }}>
            MEAN SEMI-MAJOR AXIS ALTITUDE (KM) vs. F10.7 SOLAR RADIO FLUX (SFU) // VANGUARD-04 [NORAD 58214]
          </p>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-md self-start sm:self-auto" style={{ backgroundColor: tc.bgTertiary, border: `1px solid ${tc.borderPrimary}` }}>
          {(['7D', '14D', '30D'] as const).map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className="px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all cursor-pointer"
              style={{
                backgroundColor: range === r ? tc.bgSecondary : 'transparent',
                color: range === r ? tc.accentPrimary : tc.textSecondary
              }}
            >
              {r}
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
            domain={[539.5, 542.5]}
            tickFormatter={(v) => `${v.toFixed(1)}`}
            label={{ value: 'Altitude (km)', angle: -90, position: 'insideLeft', style: { fill: tc.textSecondary, fontWeight: 600, fontSize: '11px' } }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke={tc.textSecondary}
            style={{ fontSize: '11px', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}
            domain={[100, 260]}
            tickFormatter={(v) => `${v} SFU`}
            label={{ value: 'Solar Flux (F10.7)', angle: 90, position: 'right', dx: 20, style: { fill: tc.textSecondary, fontWeight: 600, fontSize: '11px' } }}
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
              name === 'Solar Flux (F10.7)' ? `${value} SFU` : `${Number(value).toFixed(2)} km`,
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
            dataKey="solarFlux"
            name="Solar Flux (F10.7)"
            fill={theme === 'dark' ? 'rgba(245, 158, 11, 0.25)' : 'rgba(217, 119, 6, 0.25)'}
            stroke={tc.alertAmber}
            strokeWidth={1}
            isAnimationActive={false}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="altitude"
            name="Mean Altitude (km)"
            stroke={tc.accentPrimary}
            strokeWidth={2.5}
            dot={{ r: 3, fill: tc.accentPrimary, stroke: tc.bgSecondary, strokeWidth: 1 }}
            activeDot={{ r: 6, fill: tc.accentPrimary }}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
