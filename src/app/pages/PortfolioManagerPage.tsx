import { useState } from 'react';
import { Search, Filter, TrendingDown, TrendingUp, Star, Bell, Eye, ChevronDown, AlertTriangle, Orbit } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';
import { useNavigate } from 'react-router';

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

export default function PortfolioManagerPage() {
  const { theme } = useTheme();
  const tc = colors[theme];
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterThreat, setFilterThreat] = useState('All');
  const [sortBy, setSortBy] = useState('Conjunction Risk');

  const constellationStats = [
    { label: 'Active Spacecraft', value: '48 / 48', sub: 'Across 3 orbital planes', icon: Orbit, badge: 'Operational' },
    { label: 'Red Conjunctions', value: '1 Active', sub: 'VGD-04 // TCA T-01:42:19', icon: AlertTriangle, badge: 'High Risk' },
    { label: 'Mean Shell Altitude', value: '548.4 km', sub: '-0.42 km thermospheric decay', icon: TrendingDown, badge: 'Decay' },
    { label: 'Scheduled CAM Burns', value: '3 Armed', sub: 'Next 24h UTC window', icon: Bell, badge: 'Queued' },
  ];

  const threatBadgeClasses: Record<string, string> = {
    High: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    Elevated: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Moderate: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    Low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  };

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
    <div className="space-y-6">
      {/* Top 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {constellationStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#1F2024] border border-[#2A2C32] flex flex-col justify-between hover:border-zinc-700/60 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-400">{stat.label}</span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border border-indigo-500/20 text-indigo-400 bg-indigo-500/10">
                  {stat.badge}
                </span>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-bold font-mono text-zinc-100 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{stat.sub}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search spacecraft NORAD ID or callsign..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-xl text-xs bg-[#16171A] text-zinc-100 border border-[#2A2C32] placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {['All', 'High', 'Elevated', 'Moderate', 'Low'].map(t => (
            <button
              key={t}
              onClick={() => setFilterThreat(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                filterThreat === t
                  ? 'bg-white text-zinc-950 font-semibold'
                  : 'bg-[#1F2024] text-zinc-400 border border-[#2A2C32] hover:text-zinc-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="h-9 pl-3 pr-8 rounded-xl bg-[#1F2024] border border-[#2A2C32] text-xs text-zinc-300 focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer"
          >
            {['Conjunction Risk', 'Altitude Decay', 'Designator'].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
        </div>

        <span className="text-xs text-zinc-400 ml-auto">
          {filtered.length} of {SPACECRAFT_NODES.length} telemetry nodes
        </span>
      </div>

      {/* Spacecraft Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(co => {
          const badgeClass = threatBadgeClasses[co.threat] || threatBadgeClasses.Moderate;
          const isNeg = co.change < 0;

          return (
            <div
              key={co.ticker}
              className="rounded-2xl p-5 bg-[#1F2024] border border-[#2A2C32] hover:border-zinc-700/60 transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-100">{co.name}</h3>
                  <div className="text-[11px] font-mono text-zinc-400 mt-0.5">{co.sector}</div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${badgeClass}`}>
                  {co.threat}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl bg-[#16171A] border border-[#2A2C32]">
                  <div className="text-[10px] text-zinc-400">Mean Alt</div>
                  <div className="text-xs font-bold font-mono text-zinc-100 mt-0.5">{co.altitudeKm.toFixed(2)} km</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#16171A] border border-[#2A2C32]">
                  <div className="text-[10px] text-zinc-400">Xenon</div>
                  <div className={`text-xs font-bold font-mono mt-0.5 ${co.propellantPct < 75 ? 'text-rose-400' : 'text-emerald-400'}`}>{co.propellantPct}%</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#16171A] border border-[#2A2C32]">
                  <div className="text-[10px] text-zinc-400">Next AOS</div>
                  <div className="text-xs font-bold font-mono text-zinc-300 mt-0.5">T-{co.nextPassMin}m</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-9">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={co.spark}>
                      <Line type="monotone" dataKey="v" dot={false} strokeWidth={2} stroke={isNeg ? '#F59E0B' : '#818CF8'} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center gap-1 text-xs font-mono font-semibold" style={{ color: isNeg ? '#F59E0B' : '#818CF8' }}>
                  {isNeg ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
                  <span>{isNeg ? '' : '+'}{co.change} km</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#2A2C32] text-xs">
                <span className="text-zinc-400 font-mono text-[11px]">Rem. ΔV: <span className="text-zinc-100 font-semibold">{co.deltaV}</span></span>
                <div className="flex items-center gap-1">
                  <button
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40 transition-colors"
                    title="Open Telemetry Console"
                    onClick={() => navigate('/dashboard')}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40 transition-colors"
                    title="Pin Spacecraft"
                  >
                    <Star className="w-4 h-4" />
                  </button>
                  <button
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40 transition-colors"
                    title="Configure CDM Trigger"
                  >
                    <Bell className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
