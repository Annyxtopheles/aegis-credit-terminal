import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Cell, LabelList } from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

const debtEbitdaData = [
  { id: 1, label: 'Q1 2024', value: 6.8 },
  { id: 2, label: 'Q2 2024', value: 7.0 },
  { id: 3, label: 'Q3 2024', value: 7.3 },
  { id: 4, label: 'Q4 2024', value: 7.4 },
  { id: 5, label: 'Q1 2025', value: 7.5 },
  { id: 6, label: 'Q2 2025', value: 7.52 },
  { id: 7, label: 'Q3 2025', value: 7.51 },
  { id: 8, label: 'Q4 2025', value: 7.53 },
];

const revenueData = [
  { id: 1, quarter: 'Q1 24', revenue: 485, growth: -2.3 },
  { id: 2, quarter: 'Q2 24', revenue: 520, growth: 1.5 },
  { id: 3, quarter: 'Q3 24', revenue: 495, growth: -0.8 },
  { id: 4, quarter: 'Q4 24', revenue: 510, growth: 2.1 },
  { id: 5, quarter: 'Q1 25', revenue: 478, growth: -1.4 },
  { id: 6, quarter: 'Q2 25', revenue: 505, growth: -2.9 },
  { id: 7, quarter: 'Q3 25', revenue: 492, growth: -0.6 },
  { id: 8, quarter: 'Q4 25', revenue: 498, growth: -2.4 },
];

const segmentSalesData = [
  { id: 1, segment: 'Frozen & Vegetables', value: 285 },
  { id: 2, segment: 'Meals & Specialty', value: 125 },
  { id: 3, segment: 'Spices & Seasonings', value: 95 }
];

const ebitdaMarginData = [
  { id: 1, segment: 'Frozen & Vegetables', margin: 18.5 },
  { id: 2, segment: 'Meals & Specialty', margin: 22.3 },
  { id: 3, segment: 'Spices & Seasonings', margin: 28.7 }
];

export function FinancialPerformanceGrid() {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <div
        className="p-4 md:p-6 transition-colors duration-300"
        style={{
          backgroundColor: themeColors.bgSecondary,
          border: `1px solid ${themeColors.borderPrimary}`,
          minHeight: '240px'
        }}
      >
        <h4 style={{ fontSize: '14px', fontWeight: 600, color: themeColors.textPrimary, marginBottom: '12px' }} className="md:text-lg md:mb-4">
          NET DEBT / EBITDA TREND
        </h4>
        <ResponsiveContainer width="100%" height={200} className="md:h-56">
          <BarChart data={debtEbitdaData}>
            <CartesianGrid strokeDasharray="0" stroke={themeColors.gridLine} opacity={theme === 'dark' ? 0.15 : 0.4} vertical={false} />
            <XAxis
              dataKey="label"
              stroke={themeColors.textSecondary}
              style={{ fontSize: '11px', fontWeight: 600 }}
              angle={-15}
              textAnchor="end"
              height={50}
            />
            <YAxis
              stroke={themeColors.textSecondary}
              style={{ fontSize: '11px', fontWeight: 600 }}
              domain={[0, 8]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1A2332' : '#FFFFFF',
                border: theme === 'dark' ? '1px solid #2A3441' : '2px solid #0891B2',
                color: themeColors.textPrimary,
                boxShadow: theme === 'light' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
              }}
            />
            <Bar dataKey="value" name="Net Debt/EBITDA" radius={[4, 4, 0, 0]}>
              {debtEbitdaData.map((entry) => (
                <Cell key={`debt-ebitda-${entry.id}`} fill={entry.value > 7.0 ? themeColors.alertRed : themeColors.chartCyan} />
              ))}
              <LabelList dataKey="value" position="top" style={{ fill: themeColors.textPrimary, fontSize: '10px' }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div
        className="p-4 md:p-6 transition-colors duration-300"
        style={{
          backgroundColor: themeColors.bgSecondary,
          border: `1px solid ${themeColors.borderPrimary}`,
          minHeight: '240px'
        }}
      >
        <h4 style={{ fontSize: '14px', fontWeight: 600, color: themeColors.textPrimary, marginBottom: '12px' }} className="md:text-lg md:mb-4">
          REVENUE & YoY GROWTH
        </h4>
        <ResponsiveContainer width="100%" height={200} className="md:h-56">
          <ComposedChart data={revenueData}>
            <CartesianGrid strokeDasharray="0" stroke={themeColors.gridLine} opacity={theme === 'dark' ? 0.15 : 0.4} vertical={false} />
            <XAxis
              dataKey="quarter"
              stroke={themeColors.textSecondary}
              style={{ fontSize: '11px', fontWeight: 600 }}
            />
            <YAxis
              yAxisId="left"
              stroke={themeColors.textSecondary}
              style={{ fontSize: '11px', fontWeight: 600 }}
              label={{ value: 'Revenue ($M)', angle: -90, position: 'insideLeft', style: { fill: themeColors.textSecondary, fontSize: '11px', fontWeight: 600 } }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke={themeColors.textSecondary}
              style={{ fontSize: '11px', fontWeight: 600 }}
              label={{ value: 'Growth %', angle: 90, position: 'insideRight', style: { fill: themeColors.textSecondary, fontSize: '11px', fontWeight: 600 } }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1A2332' : '#FFFFFF',
                border: theme === 'dark' ? '1px solid #2A3441' : '2px solid #0891B2',
                color: themeColors.textPrimary,
                boxShadow: theme === 'light' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
              }}
            />
            <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill={themeColors.chartCyan} radius={[4, 4, 0, 0]}>
              <LabelList dataKey="revenue" position="top" style={{ fill: themeColors.textPrimary, fontSize: '10px' }} />
            </Bar>
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="growth"
              name="YoY Growth %"
              stroke={themeColors.chartAmber}
              strokeWidth={2}
              dot={{ fill: themeColors.chartAmber, r: 3 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div
        className="p-4 md:p-6 transition-colors duration-300"
        style={{
          backgroundColor: themeColors.bgSecondary,
          border: `1px solid ${themeColors.borderPrimary}`,
          minHeight: '240px'
        }}
      >
        <h4 style={{ fontSize: '14px', fontWeight: 600, color: themeColors.textPrimary, marginBottom: '12px' }} className="md:text-lg md:mb-4">
          NET SALES BY SEGMENT ($M)
        </h4>
        <ResponsiveContainer width="100%" height={200} className="md:h-56">
          <BarChart data={segmentSalesData} layout="vertical">
            <CartesianGrid strokeDasharray="0" stroke={themeColors.gridLine} opacity={theme === 'dark' ? 0.15 : 0.4} horizontal={false} />
            <XAxis type="number" stroke={themeColors.textSecondary} style={{ fontSize: '11px', fontWeight: 600 }} />
            <YAxis
              type="category"
              dataKey="segment"
              stroke={themeColors.textSecondary}
              style={{ fontSize: '11px', fontWeight: 600 }}
              width={150}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1A2332' : '#FFFFFF',
                border: theme === 'dark' ? '1px solid #2A3441' : '2px solid #0891B2',
                color: themeColors.textPrimary,
                boxShadow: theme === 'light' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
              }}
            />
            <Bar dataKey="value" name="Sales ($M)" fill={themeColors.chartGreen} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div
        className="p-4 md:p-6 transition-colors duration-300"
        style={{
          backgroundColor: themeColors.bgSecondary,
          border: `1px solid ${themeColors.borderPrimary}`,
          minHeight: '240px'
        }}
      >
        <h4 style={{ fontSize: '14px', fontWeight: 600, color: themeColors.textPrimary, marginBottom: '12px' }} className="md:text-lg md:mb-4">
          EBITDA MARGIN % BY SEGMENT
        </h4>
        <ResponsiveContainer width="100%" height={200} className="md:h-56">
          <BarChart data={ebitdaMarginData} layout="vertical">
            <CartesianGrid strokeDasharray="0" stroke={themeColors.gridLine} opacity={theme === 'dark' ? 0.15 : 0.4} horizontal={false} />
            <XAxis type="number" stroke={themeColors.textSecondary} style={{ fontSize: '11px', fontWeight: 600 }} />
            <YAxis
              type="category"
              dataKey="segment"
              stroke={themeColors.textSecondary}
              style={{ fontSize: '11px', fontWeight: 600 }}
              width={150}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1A2332' : '#FFFFFF',
                border: theme === 'dark' ? '1px solid #2A3441' : '2px solid #0891B2',
                color: themeColors.textPrimary,
                boxShadow: theme === 'light' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
              }}
            />
            <Bar dataKey="margin" name="EBITDA Margin %" fill={themeColors.chartAmber} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}