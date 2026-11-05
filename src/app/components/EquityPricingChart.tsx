import { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar, Line } from 'recharts';
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

function CustomChartTooltip({ active, payload }: any) {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0].payload;
  return (
    <div
      className="rounded-xl px-3.5 py-2.5 shadow-2xl"
      style={{
        backgroundColor: '#282A2F',
        border: '1px solid #383B44'
      }}
    >
      <div className="text-[11px] text-zinc-400 mb-1 font-mono">{item.date}</div>
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-4 text-xs font-mono">
          <span className="text-zinc-400">Radial Miss:</span>
          <span className="font-bold text-white">{item.missDist.toFixed(2)} km</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-xs font-mono">
          <span className="text-indigo-300">3σ Covariance:</span>
          <span className="font-bold text-indigo-400">±{item.covariance} m</span>
        </div>
      </div>
    </div>
  );
}

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
      className="p-6 transition-colors duration-300 rounded-2xl flex flex-col justify-between"
      style={{
        backgroundColor: tc.bgSecondary,
        border: `1px solid ${tc.borderPrimary}`
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div>
          <h3 className="text-[16px] font-semibold tracking-tight" style={{ color: tc.textPrimary }}>
            Conjunction Miss-Distance & Covariance Envelope
          </h3>
          <p className="text-xs mt-0.5" style={{ color: tc.textSecondary }}>
            Radial/in-track miss distance (km) vs. 3σ dispersion ellipsoid (m) • Event CDM-88412
          </p>
        </div>

        <div
          className="inline-flex items-center p-1 rounded-xl self-start sm:self-auto"
          style={{ backgroundColor: tc.bgTertiary, border: `1px solid ${tc.borderPrimary}` }}
        >
          {[
            { id: '7D', label: 'TCA ± 6h' },
            { id: '14D', label: 'TCA ± 16h' },
            { id: '30D', label: 'Full CDM' }
          ].map(r => (
            <button
              key={r.id}
              onClick={() => setRange(r.id as any)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer"
              style={{
                backgroundColor: range === r.id ? tc.bgSecondary : 'transparent',
                color: range === r.id ? tc.textPrimary : tc.textSecondary
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={filteredData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme === 'dark' ? '#2A2C32' : '#E5E7EB'}
              vertical={false}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: tc.textTertiary, fontSize: 11 }}
            />
            <YAxis
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fill: tc.textTertiary, fontSize: 11 }}
              domain={[0, 3.5]}
              tickFormatter={v => `${v.toFixed(1)}k`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: tc.textTertiary, fontSize: 11 }}
              domain={[0, 500]}
              tickFormatter={v => `${v}m`}
            />
            <Tooltip content={<CustomChartTooltip />} />
            <Bar
              yAxisId="right"
              dataKey="covariance"
              name="3σ Covariance"
              fill={theme === 'dark' ? 'rgba(129, 140, 248, 0.16)' : 'rgba(99, 102, 241, 0.18)'}
              radius={[4, 4, 0, 0]}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="missDist"
              name="Miss Distance"
              stroke="#818CF8"
              strokeWidth={2}
              dot={{ r: 3, fill: '#818CF8' }}
              activeDot={{ r: 5, fill: '#818CF8', stroke: '#FFFFFF', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
