import { useState } from 'react';
import { Search, Filter, TrendingDown, TrendingUp, Star, Bell, Eye, ChevronDown, AlertTriangle } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';
import { useNavigate } from 'react-router';

const PORTFOLIO_STATS = [
  { label: 'Total Exposure', value: '$2.4B', sub: 'Across 18 positions', icon: TrendingDown, color: '#06B6D4' },
  { label: 'Covenant Violations', value: '3', sub: 'Require immediate attention', icon: AlertTriangle, color: '#DC2626' },
  { label: 'Avg Debt Price', value: '$94.20', sub: '-0.8% vs last week', icon: TrendingDown, color: '#F59E0B' },
  { label: 'Upcoming Maturities', value: '7', sub: 'Within next 90 days', icon: Bell, color: '#F59E0B' },
];

function sparkData(base: number, len = 10) {
  const d = [];
  let v = base;
  for (let i = 0; i < len; i++) {
    v += (Math.random() - 0.48) * 2;
    d.push({ v: Math.max(70, Math.min(105, v)) });
  }
  return d;
}

const COMPANIES = [
  { ticker: 'APX', name: 'Apex Brands Group', sector: 'Consumer Goods', threat: 'Elevated', debtPrice: 95.40, leverage: 7.52, daysToMaturity: 511, exposure: '$340M', change: -2.3, spark: sparkData(97) },
  { ticker: 'CHEF', name: 'Chefs\' Warehouse', sector: 'Consumer Goods', threat: 'Moderate', debtPrice: 98.75, leverage: 4.21, daysToMaturity: 412, exposure: '$210M', change: 0.4, spark: sparkData(99) },
  { ticker: 'SFM', name: 'Sprouts Farmers', sector: 'Retail', threat: 'Low', debtPrice: 101.20, leverage: 2.80, daysToMaturity: 891, exposure: '$185M', change: 0.9, spark: sparkData(100) },
  { ticker: 'PRGO', name: 'Perrigo Co.', sector: 'Healthcare', threat: 'Moderate', debtPrice: 96.50, leverage: 5.44, daysToMaturity: 334, exposure: '$280M', change: -1.1, spark: sparkData(98) },
  { ticker: 'HZN', name: 'Horizon Global', sector: 'Industrial', threat: 'Elevated', debtPrice: 88.30, leverage: 8.92, daysToMaturity: 156, exposure: '$120M', change: -3.7, spark: sparkData(91) },
  { ticker: 'ELF', name: 'e.l.f. Beauty', sector: 'Consumer Goods', threat: 'Low', debtPrice: 102.40, leverage: 1.92, daysToMaturity: 1203, exposure: '$95M', change: 1.2, spark: sparkData(101) },
  { ticker: 'NVST', name: 'Envista Holdings', sector: 'Healthcare', threat: 'Moderate', debtPrice: 97.10, leverage: 3.67, daysToMaturity: 523, exposure: '$160M', change: -0.6, spark: sparkData(97) },
  { ticker: 'MATX', name: 'Matson Inc.', sector: 'Transportation', threat: 'Low', debtPrice: 100.80, leverage: 2.14, daysToMaturity: 789, exposure: '$145M', change: 0.3, spark: sparkData(100) },
  { ticker: 'MGPI', name: 'MGP Ingredients', sector: 'Consumer Goods', threat: 'Elevated', debtPrice: 93.20, leverage: 6.88, daysToMaturity: 198, exposure: '$200M', change: -1.8, spark: sparkData(94) },
  { ticker: 'ARCO', name: 'Arcos Dorados', sector: 'Restaurant', threat: 'Moderate', debtPrice: 99.40, leverage: 4.55, daysToMaturity: 445, exposure: '$175M', change: 0.7, spark: sparkData(99) },
  { ticker: 'JACK', name: 'Jack in the Box', sector: 'Restaurant', threat: 'Elevated', debtPrice: 91.80, leverage: 7.23, daysToMaturity: 312, exposure: '$230M', change: -2.1, spark: sparkData(93) },
  { ticker: 'TDC', name: 'Teradata Corp', sector: 'Technology', threat: 'Low', debtPrice: 103.10, leverage: 1.55, daysToMaturity: 1567, exposure: '$110M', change: 1.5, spark: sparkData(102) },
];

const threatConfig: Record<string, { bg: string; text: string; border: string }> = {
  High: { bg: '#DC262620', text: '#DC2626', border: '#DC262640' },
  Elevated: { bg: '#F59E0B20', text: '#F59E0B', border: '#F59E0B40' },
  Moderate: { bg: '#0891B220', text: '#0891B2', border: '#0891B240' },
  Low: { bg: '#10B98120', text: '#10B981', border: '#10B98140' },
};

export default function PortfolioManagerPage() {
  const { theme } = useTheme();
  const tc = colors[theme];
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterThreat, setFilterThreat] = useState('All');
  const [sortBy, setSortBy] = useState('Threat Level');

  const filtered = COMPANIES
    .filter(c => {
      const q = search.toLowerCase();
      return (c.name.toLowerCase().includes(q) || c.ticker.toLowerCase().includes(q)) &&
        (filterThreat === 'All' || c.threat === filterThreat);
    })
    .sort((a, b) => {
      if (sortBy === 'Debt Price Change') return a.change - b.change;
      if (sortBy === 'Alphabetical') return a.name.localeCompare(b.name);
      // Threat Level
      const order: Record<string, number> = { High: 0, Elevated: 1, Moderate: 2, Low: 3 };
      return (order[a.threat] || 2) - (order[b.threat] || 2);
    });

  return (
    <div>
      {/* Summary Stats */}
      <div className="px-3 md:px-6 pt-4 pb-2">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {PORTFOLIO_STATS.map((stat, i) => (
            <div key={i} className="p-4 rounded-lg" style={{
              backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}`
            }}>
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                <span style={{ fontSize: '11px', color: tc.textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: tc.textPrimary, fontFamily: 'JetBrains Mono, monospace' }}>{stat.value}</div>
              <div style={{ fontSize: '11px', color: tc.textSecondary, marginTop: '2px' }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-40">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: tc.textSecondary }} />
            <input
              type="text"
              placeholder="Search company or ticker..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', height: '38px', paddingLeft: '36px', paddingRight: '12px',
                backgroundColor: theme === 'dark' ? '#1A2332' : '#FFFFFF',
                border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                color: tc.textPrimary, fontSize: '13px', outline: 'none'
              }}
            />
          </div>

          {/* Threat Filter */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-4 h-4" style={{ color: tc.textSecondary }} />
            {['All', 'Elevated', 'Moderate', 'Low'].map(t => (
              <button
                key={t}
                onClick={() => setFilterThreat(t)}
                className="px-3 py-1.5 rounded text-xs transition-colors"
                style={{
                  backgroundColor: filterThreat === t ? '#0891B2' : (theme === 'dark' ? '#1A2332' : '#F3F4F6'),
                  color: filterThreat === t ? '#FFFFFF' : tc.textSecondary,
                  border: `1px solid ${filterThreat === t ? '#0891B2' : tc.borderPrimary}`,
                  cursor: 'pointer'
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none pr-8"
              style={{
                height: '38px', padding: '0 32px 0 12px',
                backgroundColor: theme === 'dark' ? '#1A2332' : '#FFFFFF',
                border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                color: tc.textSecondary, fontSize: '13px', outline: 'none', cursor: 'pointer'
              }}
            >
              {['Threat Level', 'Debt Price Change', 'Alphabetical'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: tc.textSecondary }} />
          </div>

          <span style={{ fontSize: '12px', color: tc.textSecondary, marginLeft: 'auto' }}>
            {filtered.length} of {COMPANIES.length} companies
          </span>
        </div>

        {/* Company Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 pb-6">
          {filtered.map(co => {
            const tConf = threatConfig[co.threat] || threatConfig.Moderate;
            const isNeg = co.change < 0;
            return (
              <div
                key={co.ticker}
                className="rounded-lg p-4 transition-all cursor-pointer group"
                style={{
                  backgroundColor: tc.bgSecondary,
                  border: `1px solid ${tc.borderPrimary}`
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#0891B250'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = tc.borderPrimary; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: tc.textPrimary }}>{co.name}</div>
                    <div style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: tc.accentPrimary }}>{co.ticker}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-xs" style={{
                    backgroundColor: tConf.bg, color: tConf.text, border: `1px solid ${tConf.border}`
                  }}>
                    {co.threat}
                  </span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { label: 'Debt Price', value: `$${co.debtPrice.toFixed(2)}`, color: isNeg ? '#DC2626' : '#10B981' },
                    { label: 'Net Debt/EBITDA', value: `${co.leverage}x`, color: co.leverage > 7 ? '#DC2626' : co.leverage > 5 ? '#F59E0B' : '#10B981' },
                    { label: 'Maturity', value: `${co.daysToMaturity}d`, color: co.daysToMaturity < 200 ? '#F59E0B' : tc.textSecondary },
                  ].map(m => (
                    <div key={m.label}>
                      <div style={{ fontSize: '10px', color: tc.textTertiary, marginBottom: '1px' }}>{m.label}</div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: m.color, fontFamily: 'JetBrains Mono, monospace' }}>{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Sparkline */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 h-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={co.spark}>
                        <Line type="monotone" dataKey="v" dot={false} strokeWidth={1.5}
                          stroke={isNeg ? '#DC2626' : '#10B981'} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center gap-1" style={{ color: isNeg ? '#DC2626' : '#10B981' }}>
                    {isNeg ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                    <span style={{ fontSize: '11px', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>
                      {isNeg ? '' : '+'}{co.change}%
                    </span>
                  </div>
                </div>

                {/* Exposure & Actions */}
                <div className="flex items-center justify-between pt-2.5 border-t" style={{ borderColor: tc.borderPrimary }}>
                  <span style={{ fontSize: '11px', color: tc.textSecondary }}>Exposure: <span style={{ fontWeight: 600, color: tc.textPrimary }}>{co.exposure}</span></span>
                  <div className="flex gap-1.5">
                    <button
                      className="p-1.5 rounded transition-colors"
                      title="View Dashboard"
                      onClick={() => navigate('/dashboard')}
                      style={{ color: tc.textSecondary }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0891B220'; e.currentTarget.style.color = '#0891B2'; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = tc.textSecondary; }}
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      className="p-1.5 rounded transition-colors"
                      title="Add Note"
                      style={{ color: tc.textSecondary }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F59E0B20'; e.currentTarget.style.color = '#F59E0B'; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = tc.textSecondary; }}
                    >
                      <Star className="w-3.5 h-3.5" />
                    </button>
                    <button
                      className="p-1.5 rounded transition-colors"
                      title="Set Alert"
                      style={{ color: tc.textSecondary }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#DC262615'; e.currentTarget.style.color = '#DC2626'; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = tc.textSecondary; }}
                    >
                      <Bell className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}