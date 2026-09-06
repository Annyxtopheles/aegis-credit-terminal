import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Legend } from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

const data = [
  { id: 1, date: '24-Oct', price: 97.40, volume: 950000 },
  { id: 2, date: '26-Oct', price: 97.52, volume: 450000 },
  { id: 3, date: '28-Oct', price: 97.78, volume: 2200000 },
  { id: 4, date: '30-Oct', price: 97.35, volume: 2500000 },
  { id: 5, date: '1-Nov', price: 96.82, volume: 5000000 },
  { id: 6, date: '3-Nov', price: 95.84, volume: 2400000 },
  { id: 7, date: '5-Nov', price: 95.26, volume: 2800000 },
  { id: 8, date: '7-Nov', price: 97.62, volume: 3300000 },
  { id: 9, date: '9-Nov', price: 98.15, volume: 800000 },
  { id: 10, date: '11-Nov', price: 98.45, volume: 2600000 },
  { id: 11, date: '13-Nov', price: 98.22, volume: 650000 },
  { id: 12, date: '15-Nov', price: 97.98, volume: 720000 },
  { id: 13, date: '17-Nov', price: 98.38, volume: 880000 },
  { id: 14, date: '19-Nov', price: 98.12, volume: 380000 },
  { id: 15, date: '21-Nov', price: 97.85, volume: 950000 },
  { id: 16, date: '23-Nov', price: 97.71, volume: 520000 }
];

export function DebtPricingChart() {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  return (
    <div
      className="p-4 md:p-6 transition-colors duration-300"
      style={{
        backgroundColor: themeColors.bgSecondary,
        border: `1px solid ${themeColors.borderPrimary}`
      }}
    >
      <h3 style={{ fontSize: '16px', fontWeight: 600, color: themeColors.textPrimary, marginBottom: '16px' }} className="md:text-lg md:mb-6">
        DEBT PRICING CHART (30 DAY)
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data} margin={{ top: 5, right: 70, left: 0, bottom: 5 }}>
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
            domain={[95, 100]}
            label={{ value: 'Debt Price ($)', angle: -90, position: 'insideLeft', style: { fill: themeColors.textSecondary, fontWeight: 600 } }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke={themeColors.textSecondary}
            style={{ fontSize: '12px', fontWeight: 600 }}
            domain={[0, 5000000]}
            label={{ value: 'Volume', angle: 90, position: 'right', dx: 20, style: { fill: themeColors.textSecondary, fontWeight: 600 } }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: tc.bgSecondary,
              border: `1px solid ${tc.borderPrimary}`,
              borderRadius: '4px',
              color: themeColors.textPrimary,
              boxShadow: theme === 'light' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
            }}
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
            fill="#F59E0B"
            opacity={0.85}
            isAnimationActive={false}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="price"
            name="Debt Pricing"
            stroke="#EDEDED"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: "#06B6D4" }}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
