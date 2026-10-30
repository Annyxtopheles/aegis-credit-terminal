import { useState } from 'react';
import { Search, Filter, TrendingDown, TrendingUp, Star, Bell, Eye, ChevronDown, AlertTriangle, Orbit } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';
import { useNavigate } from 'react-router';

const CONSTELLATION_STATS = [
  { label: 'Active Spacecraft', value: '48 / 48', sub: 'Across 3 orbital planes', icon: Orbit, color: '#06B6D4' },
  { label: 'Red Conjunctions (Pc > 1e-4)', value: '1', sub: 'VGD-04 // TCA T-01:42:19', icon: AlertTriangle, color: '#EF4444' },
  { label: 'Mean Shell Altitude', value: '548.4 km', sub: '-0.42 km vs 7d epoch', icon: TrendingDown, color: '#F59E0B' },
  { label: 'Scheduled CAM Burns', value: '3', sub: 'Next 24h UTC window', icon: Bell, color: '#06B6D4' },
];

function sparkData(base: number, len = 10) {
  const d = [];
  let v = base;
  for (let i = 0; i < len; i++) {
    v += (Math.random() - 0.48) * 0.5;
    d.push({ v: Math.max(540, Math.min(555, v)) });
  }
  return d;
}

const SPACECRAFT_NODES = [
  { ticker: 'VGD-04', name: 'VANGUARD-04 [58214]', sector: 'Plane A // 53.0°', threat: 'High', altitudeKm: 547.82, propellantPct: 71.4, nextPassMin: 102, deltaV: '64.2 m/s', change: -0.42, spark: sparkData(548) },
  { ticker: 'VGD-08', name: 'VANGUARD-08 [58218]', sector: 'Plane B // 53.0°', threat: 'Elevated', altitudeKm: 548.10, propellantPct: 82.1, nextPassMin: 145, deltaV: '78.5 m/s', change: -0.28, spark: sparkData(548.5) },
  { ticker: 'VGD-01', name: 'VANGUARD-01 [58211]', sector: 'Plane A // 53.0°', threat: 'Low', altitudeKm: 549.95, propellantPct: 91.8, nextPassMin: 42, deltaV: '94.0 m/s', change: 0.05, spark: sparkData(550) },
  { ticker: 'VGD-12', name: 'VANGUARD-12 [58222]', sector: 'Plane B // 53.0°', threat: 'Elevated', altitudeKm: 548.34, propellantPct: 79.6, nextPassMin: 88, deltaV: '74.1 m/s', change: -0.19, spark: sparkData(548.4) },
  { ticker: 'VGD-19', name: 'VANGUARD-19 [58229]', sector: 'Plane C // 53.0°', threat: 'Moderate', altitudeKm: 549.12, propellantPct: 86.4, nextPassMin: 64, deltaV: '85.2 m/s', change: -0.08, spark: sparkData(549.1) },
  { ticker: 'VGD-23', name: 'VANGUARD-23 [58233]', sector: 'Plane C // 53.0°', threat: 'Low', altitudeKm: 550.02, propellantPct: 93.2, nextPassMin: 118, deltaV: '96.8 m/s', change: 0.12, spark: sparkData(550) },
];

const threatConfig: Record<string, { bg: string; text: string; border: string }> = {
  High: { bg: '#EF444420', text: '#EF4444', border: '#EF444440' },
  Elevated: { bg: '#F59E0B20', text: '#F59E0B', border: '#F59E0B40' },
  Moderate: { bg: '#06B6D420', text: '#06B6D4', border: '#06B6D440' },
  Low: { bg: '#10B98120', text: '#10B981', border: '#10B98140' },
};

export default function PortfolioManagerPage() {
  const { theme } = useTheme();
  const tc = colors[theme];
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterThreat, setFilterThreat] = useState('All');
  const [sortBy, setSortBy] = useState('Conjunction Risk');

  const filtered = SPACECRAFT_NODES
    .filter(c => {
      const q = search.toLowerCase();
      return (c.name.toLowerCase().includes(q) || c.ticker.toLowerCase().includes(q)) &&
        (filterThreat === 'All' || c.threat === filterThreat);
    })
    .sort((a, b) => {
      if (sortBy === 'Altitude Decay') return a.change - b.change;
      if (sortBy === 'Designator') return a.name.localeCompare(b.name);
      const order: Record<string, number> = { High: 0, Elevated: 1, Moderate: 2, Low: 3 };
      return (order[a.threat] || 2) - (order[b.threat] || 2);
    });

  return (
    <div>
      <div className="px-3 md:px-6 pt-4 pb-2">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {CONSTELLATION_STATS.map((stat, i) => (
            <div key={i} className="p-4 rounded-lg" style={{
              backgroundColor: tc.bgSecondary, border: `1px solid ${tc.borderPrimary}`
            }}>
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                <span className="font-mono" style={{ fontSize: '11px', color: tc.textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</span>
              </div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: tc.textPrimary, fontFamily: 'JetBrains Mono, monospace' }}>{stat.value}</div>
              <div className="font-mono" style={{ fontSize: '11px', color: tc.textSecondary, marginTop: '2px' }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-40">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: tc.textSecondary }} />
            <input
              type="text"
              placeholder="Search spacecraft NORAD ID or callsign..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', height: '38px', paddingLeft: '36px', paddingRight: '12px',
                backgroundColor: theme === 'dark' ? '#06080D' : '#FFFFFF',
                border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                color: tc.textPrimary, fontSize: '13px', outline: 'none'
              }}
            />
          </div>

          <div className="flex items-center gap-1.5">
            <Filter className="w-4 h-4" style={{ color: tc.textSecondary }} />
            {['All', 'High', 'Elevated', 'Moderate', 'Low'].map(t => (
              <button
                key={t}
                onClick={() => setFilterThreat(t)}
                className="px-3 py-1.5 rounded text-xs transition-colors font-mono"
                style={{
                  backgroundColor: filterThreat === t ? '#06B6D4' : (theme === 'dark' ? '#0D131C' : '#F3F4F6'),
                  color: filterThreat === t ? '#06080D' : tc.textSecondary,
                  border: `1px solid ${filterThreat === t ? '#06B6D4' : tc.borderPrimary}`,
                  cursor: 'pointer',
                  fontWeight: filterThreat === t ? 700 : 500
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none pr-8 font-mono"
              style={{
                height: '38px', padding: '0 32px 0 12px',
                backgroundColor: theme === 'dark' ? '#0D131C' : '#FFFFFF',
                border: `1px solid ${tc.borderPrimary}`, borderRadius: '8px',
                color: tc.textSecondary, fontSize: '12px', outline: 'none', cursor: 'pointer'
              }}
            >
              {['Conjunction Risk', 'Altitude Decay', 'Designator'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: tc.textSecondary }} />
          </div>

          <span className="font-mono" style={{ fontSize: '12px', color: tc.textSecondary, marginLeft: 'auto' }}>
            {filtered.length} of {SPACECRAFT_NODES.length} telemetry nodes
          </span>
        </div>

        {/* Spacecraft Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 pb-6">
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
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-mono" style={{ fontSize: '14px', fontWeight: 700, color: tc.textPrimary }}>{co.name}</div>
                    <div style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: tc.accentPrimary }}>{co.sector}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-xs font-mono" style={{
                    backgroundColor: tConf.bg, color: tConf.text, border: `1px solid ${tConf.border}`
                  }}>
                    {co.threat}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { label: 'Mean Alt', value: `${co.altitudeKm.toFixed(2)} km`, color: isNeg ? '#F59E0B' : '#06B6D4' },
                    { label: 'Xenon Reserve', value: `${co.propellantPct}%`, color: co.propellantPct < 75 ? '#EF4444' : '#10B981' },
                    { label: 'Next AOS', value: `T-${co.nextPassMin}m`, color: tc.textSecondary },
                  ].map(m => (
                    <div key={m.label}>
                      <div className="font-mono" style={{ fontSize: '10px', color: tc.textTertiary, marginBottom: '1px' }}>{m.label}</div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: m.color, fontFamily: 'JetBrains Mono, monospace' }}>{m.value}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 h-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={co.spark}>
                        <Line type="monotone" dataKey="v" dot={false} strokeWidth={1.5}
                          stroke={isNeg ? '#F59E0B' : '#06B6D4'} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center gap-1" style={{ color: isNeg ? '#F59E0B' : '#06B6D4' }}>
                    {isNeg ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                    <span style={{ fontSize: '11px', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>
                      {isNeg ? '' : '+'}{co.change} km
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2.5 border-t" style={{ borderColor: tc.borderPrimary }}>
                  <span className="font-mono" style={{ fontSize: '11px', color: tc.textSecondary }}>Rem. ΔV: <span style={{ fontWeight: 600, color: tc.textPrimary }}>{co.deltaV}</span></span>
                  <div className="flex gap-1.5">
                    <button
                      className="p-1.5 rounded transition-colors"
                      title="Open Telemetry Console"
                      onClick={() => navigate('/dashboard')}
                      style={{ color: tc.textSecondary }}
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      className="p-1.5 rounded transition-colors"
                      title="Pin Spacecraft"
                      style={{ color: tc.textSecondary }}
                    >
                      <Star className="w-3.5 h-3.5" />
                    </button>
                    <button
                      className="p-1.5 rounded transition-colors"
                      title="Configure CDM Trigger"
                      style={{ color: tc.textSecondary }}
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
