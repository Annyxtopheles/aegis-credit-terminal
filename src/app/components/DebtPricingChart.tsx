import { useState } from 'react';
import { Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';
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
  { id: 8, date: '7-Nov', altitude: 541.55, solarFlux: 185 },
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
      className="p-6 transition-colors duration-300 rounded-2xl flex flex-col justify-between"
      style={{
        backgroundColor: tc.bgSecondary,
        border: `1px solid ${tc.borderPrimary}`
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h3 className="text-[15px] font-semibold tracking-tight" style={{ color: tc.textPrimary }}>
            Orbital Altitude Decay & Thermospheric Drag
          </h3>
          <p className="text-xs mt-0.5" style={{ color: tc.textSecondary }}>
            Mean semi-major axis altitude vs. F10.7 solar radio flux // VANGUARD-04
          </p>
        </div>

        {/* Clean Segmented Range Switcher */}
        <div
          className="flex items-center gap-1 p-1 rounded-xl self-start sm:self-auto transition-colors"
          style={{
            backgroundColor: tc.bgTertiary,
            border: `1px solid ${tc.borderPrimary}`
          }}
        >
          {(['7D', '14D', '30D'] as const).map(r => {
            const isSelected = range === r;
            return (
              <button
                key={r}
                onClick={() => setRange(r)}
                className="px-3 py-1 rounded-lg text-xs transition-all cursor-pointer font-medium"
                style={{
                  backgroundColor: isSelected ? tc.bgSecondary : 'transparent',
                  color: isSelected ? tc.textPrimary : tc.textSecondary,
                  boxShadow: isSelected ? '0 1px 2px rgba(0,0,0,0.06)' : 'none'
                }}
              >
                {r}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={tc.borderPrimary} vertical={false} />
            <XAxis
              dataKey="date"
              stroke={tc.textTertiary}
              style={{ fontSize: '11px', fontFamily: 'inherit' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="left"
              stroke={tc.textTertiary}
              style={{ fontSize: '11px' }}
              domain={[539.5, 542.5]}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v.toFixed(1)} km`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke={tc.textTertiary}
              style={{ fontSize: '11px' }}
              domain={[100, 260]}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v} SFU`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: tc.bgSecondary,
                borderColor: tc.borderPrimary,
                borderRadius: '12px',
                color: tc.textPrimary,
                fontSize: '12px',
                boxShadow: theme === 'dark' ? '0 8px 24px rgba(0,0,0,0.4)' : '0 8px 24px rgba(0,0,0,0.1)'
              }}
              formatter={(value: any, name: any) => [
                name === 'Solar Flux' ? `${value} SFU` : `${Number(value).toFixed(2)} km`,
                name
              ]}
            />
            <Bar
              yAxisId="right"
              dataKey="solarFlux"
              name="Solar Flux"
              fill="#F59E0B"
              fillOpacity={0.25}
              radius={[4, 4, 0, 0]}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="altitude"
              name="Altitude"
              stroke="#818CF8"
              strokeWidth={2.5}
              dot={{ r: 3, fill: '#818CF8' }}
              activeDot={{ r: 5, fill: '#818CF8' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div
        className="flex items-center justify-end gap-4 pt-3 border-t text-xs transition-colors"
        style={{ borderColor: tc.borderPrimary }}
      >
        <span className="flex items-center gap-1.5" style={{ color: tc.textSecondary }}>
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" /> Mean Altitude (km)
        </span>
        <span className="flex items-center gap-1.5" style={{ color: tc.textSecondary }}>
          <span className="w-2.5 h-2.5 rounded-sm bg-amber-400/50" /> F10.7 Solar Flux (SFU)
        </span>
      </div>
    </div>
  );
}
