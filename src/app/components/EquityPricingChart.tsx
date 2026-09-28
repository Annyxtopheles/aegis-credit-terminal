import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar, Legend } from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

const rawData = [
  { id: 1, date: '24-Oct', price: 4.82, volume: 820000 },
  { id: 2, date: '26-Oct', price: 4.88, volume: 650000 },
  { id: 3, date: '28-Oct', price: 4.95, volume: 1100000 },
  { id: 4, date: '30-Oct', price: 4.78, volume: 1350000 },
  { id: 5, date: '1-Nov', price: 4.65, volume: 2200000 },
  { id: 6, date: '3-Nov', price: 4.52, volume: 1800000 },
  { id: 7, date: '5-Nov', price: 4.42, volume: 1950000 },
  { id: 8, date: '7-Nov', price: 4.68, volume: 2100000 },
  { id: 9, date: '9-Nov', price: 4.85, volume: 980000 },
  { id: 10, date: '11-Nov', price: 4.92, volume: 1650000 },
  { id: 11, date: '13-Nov', price: 4.88, volume: 720000 },
  { id: 12, date: '15-Nov', price: 4.75, volume: 850000 },
  { id: 13, date: '17-Nov', price: 4.82, volume: 920000 },
  { id: 14, date: '19-Nov', price: 4.78, volume: 580000 },
  { id: 15, date: '21-Nov', price: 4.72, volume: 780000 },
  { id: 16, date: '23-Nov', price: 4.68, volume: 650000 }
];

export function EquityPricingChart() {
  const { theme } = useTheme();
  const tc = colors[theme];
  const themeColors = tc;
  const [range, setRange] = useState<'7D' | '14D' | '30D'>('30D');

  const filteredData = range === '7D' 
    ? rawData.slice(-5) 
    : range === '14D' 
      ? rawData.slice(-10) 
      : rawData;

  const formatVolume = (val: number) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(0)}k`;
    return val.toString();
  };

  return (
    <div
      className="p-4 md:p-6 transition-colors duration-300"
      style={{
        backgroundColor: themeColors.bgSecondary,
        border: `1px solid ${themeColors.borderPrimary}`
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6">
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: themeColors.textPrimary }} className="md:text-lg">
          EQUITY PRICING CHART ({range === '30D' ? '30 DAY' : range === '14D' ? '14 DAY' : '7 DAY'})
        </h3>
        <div className="flex items-center gap-1 p-1 rounded-md self-start sm:self-auto" style={{ backgroundColor: tc.bgTertiary, border: `1px solid ${tc.borderPrimary}` }}>
          {(['7D', '14D', '30D'] as const).map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className="px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer"
              style={{
                backgroundColor: range === r ? (theme === 'dark' ? '#1A2332' : '#FFFFFF') : 'transparent',
                color: range === r ? tc.accentPrimary : tc.textSecondary,
                boxShadow: range === r && theme === 'light' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none'
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
            strokeDasharray="0"
            stroke={themeColors.gridLine}
            opacity={theme === 'dark' ? 0.15 : 0.4}
            vertical={false}
          />
          <XAxis
            dataKey="date"
            stroke={themeColors.textSecondary}
            style={{ fontSize: '12px', fontWeight: 600 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis
            yAxisId="left"
            stroke={themeColors.textSecondary}
            style={{ fontSize: '12px', fontWeight: 600 }}
            domain={[2, 6]}
            label={{ value: 'Stock Price ($)', angle: -90, position: 'insideLeft', style: { fill: themeColors.textSecondary, fontWeight: 600 } }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke={themeColors.textSecondary}
            style={{ fontSize: '12px', fontWeight: 600 }}
            domain={[0, 3000000]}
            tickFormatter={formatVolume}
            label={{ value: 'Volume', angle: 90, position: 'right', dx: 20, style: { fill: themeColors.textSecondary, fontWeight: 600 } }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: tc.bgSecondary,
              border: `1px solid ${tc.borderPrimary}`,
              borderRadius: '6px',
              color: themeColors.textPrimary,
              boxShadow: theme === 'light' ? '0 4px 12px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.4)',
              fontSize: '12px'
            }}
            formatter={(value: any, name: any) => [
              name === 'Volume' ? formatVolume(Number(value)) : `$${Number(value).toFixed(2)}`,
              name
            ]}
          />
          <Legend
            verticalAlign="bottom"
            align="right"
            iconType="rect"
            wrapperStyle={{ paddingTop: '10px', fontSize: '12px', fontWeight: 600 }}
          />
          <Bar
            yAxisId="right"
            dataKey="volume"
            name="Volume"
            fill={theme === 'dark' ? 'rgba(6, 182, 212, 0.28)' : 'rgba(8, 145, 178, 0.25)'}
            stroke={theme === 'dark' ? 'rgba(6, 182, 212, 0.55)' : 'rgba(8, 145, 178, 0.45)'}
            strokeWidth={1}
            isAnimationActive={false}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="price"
            name="$APX"
            stroke="#10B981"
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#10B981', stroke: themeColors.bgSecondary, strokeWidth: 1 }}
            activeDot={{ r: 6, fill: "#10B981" }}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
