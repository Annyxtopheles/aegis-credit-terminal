import { useState } from 'react';
import {
  TrendingUp,
  LayoutGrid,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Search,
  Calendar,
  Compass,
  Clock,
  Filter,
  FileDown,
  ChevronDown,
  Satellite,
  Radar,
  Zap,
  ShieldAlert,
  User,
  Mail
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot
} from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';
import { useNavigate } from 'react-router';

const TELEMETRY_FLOW_DATA: Record<string, { date: string; altitude: number; delta: string }[]> = {
  '30d': [
    { date: '18 Oct, 2026', altitude: 542100, delta: '+0.04%' },
    { date: '21 Oct, 2026', altitude: 543400, delta: '+0.08%' },
    { date: '24 Oct, 2026', altitude: 542900, delta: '+0.06%' },
    { date: '27 Oct, 2026', altitude: 544800, delta: '+0.12%' },
    { date: '30 Oct, 2026', altitude: 545900, delta: '+0.15%' },
    { date: '2 Nov, 2026', altitude: 546400, delta: '+0.18%' },
    { date: '5 Nov, 2026', altitude: 545100, delta: '+0.11%' },
    { date: '8 Nov, 2026', altitude: 548120, delta: '+0.24%' },
    { date: '11 Nov, 2026', altitude: 547600, delta: '+0.21%' },
    { date: '14 Nov, 2026', altitude: 547900, delta: '+0.22%' },
    { date: '18 Nov, 2026', altitude: 549850, delta: '+0.38%' },
  ],
  '3m': [
    { date: 'Aug, 2026', altitude: 541200, delta: '+0.02%' },
    { date: 'Sep, 2026', altitude: 544600, delta: '+0.14%' },
    { date: 'Oct, 2026', altitude: 547300, delta: '+0.26%' },
    { date: 'Nov, 2026', altitude: 549850, delta: '+0.42%' },
  ],
  '1y': [
    { date: 'Jan, 2026', altitude: 539500, delta: '+0.01%' },
    { date: 'Mar, 2026', altitude: 542800, delta: '+0.11%' },
    { date: 'May, 2026', altitude: 545200, delta: '+0.19%' },
    { date: 'Jul, 2026', altitude: 546900, delta: '+0.25%' },
    { date: 'Sep, 2026', altitude: 548120, delta: '+0.31%' },
    { date: 'Nov, 2026', altitude: 549850, delta: '+0.48%' },
  ],
};

const HIGHLIGHTS = [
  {
    title: 'New Orbital Record Achieved!',
    desc: 'November achieved the highest station-keeping precision since launch at 548,420 m.'
  },
  {
    title: 'Zero Unplanned Conjunctions',
    desc: 'All 18th SDS red-threshold CDM alerts were resolved >4.5 hours prior to TCA.'
  },
  {
    title: 'Xenon Propellant Efficiency',
    desc: 'Hall-effect prograde trim burns consumed 14% less Xenon mass than Q3 baseline.'
  },
];

const BREAKDOWN_ITEMS = [
  { label: 'Active Payloads', count: '1,240', color: '#6366F1', pct: 52 },
  { label: 'Rocket Bodies', count: '354', color: '#3B82F6', pct: 15 },
  { label: 'Debris Fragments', count: '553', color: '#8B5CF6', pct: 24 },
  { label: 'Mission Hardware', count: '204', color: '#A855F7', pct: 9 },
];

interface SpaceVehicleRow {
  id: string;
  name: string;
  telemetryLink: string;
  status: 'Nominal' | 'Conjunction Watch' | 'Standby';
  epochDate: string;
  plane: 'Plane A (53°)' | 'Plane B (53°)' | 'SSO Core (98°)';
  avatarBg: string;
}

const SPACE_VEHICLES: SpaceVehicleRow[] = [
  {
    id: '58201',
    name: 'Vanguard-01 (Alpha)',
    telemetryLink: 'vgd01.sband@kessler.space',
    status: 'Conjunction Watch',
    epochDate: '2026-01-15',
    plane: 'Plane A (53°)',
    avatarBg: '#3B82F6'
  },
  {
    id: '58202',
    name: 'Vanguard-02 (Beta)',
    telemetryLink: 'vgd02.sband@kessler.space',
    status: 'Nominal',
    epochDate: '2026-02-19',
    plane: 'Plane B (53°)',
    avatarBg: '#EC4899'
  },
  {
    id: '58203',
    name: 'Vanguard-03 (Gamma)',
    telemetryLink: 'vgd03.sband@kessler.space',
    status: 'Conjunction Watch',
    epochDate: '2026-03-12',
    plane: 'SSO Core (98°)',
    avatarBg: '#F59E0B'
  },
  {
    id: '58204',
    name: 'Vanguard-04 (Delta)',
    telemetryLink: 'vgd04.sband@kessler.space',
    status: 'Nominal',
    epochDate: '2026-11-02',
    plane: 'SSO Core (98°)',
    avatarBg: '#10B981'
  },
  {
    id: '58205',
    name: 'Vanguard-05 (Epsilon)',
    telemetryLink: 'vgd05.sband@kessler.space',
    status: 'Standby',
    epochDate: '2026-03-08',
    plane: 'Plane B (53°)',
    avatarBg: '#6366F1'
  },
  {
    id: '58206',
    name: 'Vanguard-06 (Zeta)',
    telemetryLink: 'vgd06.sband@kessler.space',
    status: 'Nominal',
    epochDate: '2025-12-19',
    plane: 'Plane A (53°)',
    avatarBg: '#8B5CF6'
  },
];

function CustomAreaTooltip({ active, payload }: any) {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0].payload;
  return (
    <div
      className="rounded-xl px-3.5 py-2.5 shadow-xl"
      style={{
        backgroundColor: '#282A2F',
        border: '1px solid #383B44'
      }}
    >
      <div className="text-[11px] text-zinc-400 mb-1">{item.date}</div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-white font-mono">
          {item.altitude.toLocaleString()} m
        </span>
        <span className="text-[11px] font-semibold" style={{ color: '#4ADE80' }}>
          {item.delta}
        </span>
      </div>
    </div>
  );
}

export default function OverviewPage() {
  const { theme } = useTheme();
  const tc = colors[theme];
  const navigate = useNavigate();

  const [range, setRange] = useState<'30d' | '3m' | '1y'>('30d');
  const [slideIdx, setSlideIdx] = useState(0);
  const [tableSearch, setTableSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const chartData = TELEMETRY_FLOW_DATA[range];

  const kpis = [
    {
      label: 'Mean Shell Altitude',
      value: range === '30d' ? '548.42 km' : range === '3m' ? '547.90 km' : '546.15 km',
      delta: '+0.38%(+2.1 km)',
      positive: true,
      icon: Satellite
    },
    {
      label: 'Tracked LEO Objects',
      value: range === '30d' ? '27,412' : range === '3m' ? '26,890' : '25,140',
      delta: '+12%(1,456)',
      positive: true,
      icon: Radar
    },
    {
      label: 'Station-Keeping Burns',
      value: range === '30d' ? '1605' : range === '3m' ? '4,812' : '18,420',
      delta: '+20%(201)',
      positive: true,
      icon: Zap
    },
    {
      label: 'Conjunction Alert Rate',
      value: range === '30d' ? '3.2%' : range === '3m' ? '3.5%' : '4.1%',
      delta: '-8%(0.4%)',
      positive: false,
      icon: ShieldAlert
    },
  ];

  const filteredVehicles = SPACE_VEHICLES.filter(sv => {
    const matchesQuery =
      sv.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
      sv.id.includes(tableSearch) ||
      sv.telemetryLink.toLowerCase().includes(tableSearch.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || sv.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const toggleRow = (id: string) => {
    setSelectedRows(prev => (prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]));
  };

  const toggleAllRows = () => {
    if (selectedRows.length === filteredVehicles.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredVehicles.map(v => v.id));
    }
  };

  const getStatusStyle = (status: SpaceVehicleRow['status']) => {
    if (status === 'Nominal') {
      return { bg: 'rgba(34, 197, 94, 0.16)', text: '#4ADE80' };
    }
    if (status === 'Conjunction Watch') {
      return { bg: 'rgba(239, 68, 68, 0.16)', text: '#F87171' };
    }
    return { bg: '#D4D4D8', text: '#18181B' };
  };

  const getPlaneStyle = (plane: SpaceVehicleRow['plane']) => {
    if (plane === 'Plane A (53°)') {
      return { bg: 'rgba(59, 130, 246, 0.18)', text: '#60A5FA' };
    }
    if (plane === 'Plane B (53°)') {
      return { bg: 'rgba(14, 165, 233, 0.18)', text: '#38BDF8' };
    }
    return { bg: 'rgba(168, 85, 247, 0.18)', text: '#C084FC' };
  };

  return (
    <div className="space-y-5">
      {/* Sub-header Toolbar: Segmented Time Pills + Export & Crisp White New CTA */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          className="inline-flex items-center p-1 rounded-xl"
          style={{
            backgroundColor: tc.bgSecondary,
            border: `1px solid ${tc.borderPrimary}`
          }}
        >
          {[
            { id: '30d', label: '30 Days' },
            { id: '3m', label: '3 Months' },
            { id: '1y', label: '1 years' },
          ].map(t => {
            const active = range === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setRange(t.id as '30d' | '3m' | '1y')}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer"
                style={{
                  backgroundColor: active ? tc.bgTertiary : 'transparent',
                  color: active ? tc.textPrimary : tc.textSecondary
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2.5">
          <button
            className="h-9 px-3.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
            style={{
              backgroundColor: tc.bgSecondary,
              border: `1px solid ${tc.borderPrimary}`,
              color: tc.textPrimary
            }}
          >
            <FileDown className="w-3.5 h-3.5" style={{ color: tc.textSecondary }} />
            <span>Export</span>
          </button>

          {/* High-Contrast White CTA Button (Exact Tempo Reference) */}
          <button
            onClick={() => navigate('/dashboard/priorities-events')}
            className="h-9 px-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-opacity hover:opacity-90 cursor-pointer"
            style={{
              backgroundColor: theme === 'dark' ? '#F4F4F5' : '#111827',
              color: theme === 'dark' ? '#111214' : '#FFFFFF'
            }}
          >
            <span>New</span>
            <span
              className="h-3.5 w-[1px]"
              style={{ backgroundColor: theme === 'dark' ? '#D4D4D8' : '#374151' }}
            />
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Row 1: 4 Clean KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map(kpi => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="rounded-2xl p-5 transition-colors"
              style={{
                backgroundColor: tc.bgSecondary,
                border: `1px solid ${tc.borderPrimary}`
              }}
            >
              <div className="mb-3">
                <Icon className="w-4 h-4" style={{ color: tc.textSecondary }} />
              </div>
              <div className="text-xs font-medium mb-1" style={{ color: tc.textSecondary }}>
                {kpi.label}
              </div>
              <div
                className="text-[22px] font-bold tracking-tight mb-2"
                style={{ color: tc.textPrimary }}
              >
                {kpi.value}
              </div>
              <div className="text-[11.5px] flex items-center gap-1.5">
                <span
                  className="font-semibold"
                  style={{ color: kpi.positive ? '#4ADE80' : '#F87171' }}
                >
                  {kpi.delta}
                </span>
                <span style={{ color: tc.textTertiary }}>•</span>
                <span style={{ color: tc.textTertiary }}>Last 30 Days</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 2: 2-Column Bento Split (Left 8 Cols Flow Chart + Right 4 Cols Ring Breakdown) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
        {/* Left: Orbital Telemetry Flow Card */}
        <div
          className="xl:col-span-8 rounded-2xl p-6 flex flex-col justify-between"
          style={{
            backgroundColor: tc.bgSecondary,
            border: `1px solid ${tc.borderPrimary}`
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" style={{ color: tc.textSecondary }} />
              <h2 className="text-[15px] font-semibold" style={{ color: tc.textPrimary }}>
                Orbital Altitude Flow
              </h2>
            </div>
            <button
              className="p-1 rounded-lg transition-colors cursor-pointer"
              style={{ color: tc.textSecondary }}
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end flex-1">
            {/* Left Summary + Highlight Carousel Box */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div className="mb-5">
                <div
                  className="text-[30px] font-bold tracking-tight leading-tight mb-1"
                  style={{ color: tc.textPrimary }}
                >
                  548,420 m
                </div>
                <div className="text-xs mb-2" style={{ color: tc.textSecondary }}>
                  Mean Constellation Apogee
                </div>
                <div className="text-xs flex items-center gap-1.5">
                  <span className="font-semibold" style={{ color: '#4ADE80' }}>
                    +0.38%(+2,040 m)
                  </span>
                  <span style={{ color: tc.textTertiary }}>•</span>
                  <span style={{ color: tc.textTertiary }}>Last 30 Days</span>
                </div>
              </div>

              {/* Inner Callout Box (Tempo Reference) */}
              <div
                className="rounded-2xl p-4"
                style={{
                  backgroundColor: tc.bgTertiary,
                  border: `1px solid ${tc.borderPrimary}`
                }}
              >
                <div className="text-[13px] font-semibold mb-1.5" style={{ color: tc.textPrimary }}>
                  {HIGHLIGHTS[slideIdx].title}
                </div>
                <p className="text-xs leading-relaxed mb-4" style={{ color: tc.textSecondary }}>
                  {HIGHLIGHTS[slideIdx].desc}
                </p>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() =>
                      setSlideIdx(s => (s - 1 + HIGHLIGHTS.length) % HIGHLIGHTS.length)
                    }
                    className="p-1 rounded cursor-pointer"
                    style={{ color: tc.textSecondary }}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center gap-2 flex-1 max-w-[140px] mx-3">
                    {HIGHLIGHTS.map((_, i) => (
                      <div
                        key={i}
                        className="h-1 flex-1 rounded-full transition-colors"
                        style={{
                          backgroundColor:
                            i === slideIdx ? tc.textPrimary : 'rgba(255,255,255,0.16)'
                        }}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setSlideIdx(s => (s + 1) % HIGHLIGHTS.length)}
                    className="p-1 rounded cursor-pointer"
                    style={{ color: tc.textSecondary }}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Smooth Purple/Indigo Area Chart */}
            <div className="lg:col-span-7 h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 20, right: 12, left: -12, bottom: 0 }}>
                  <defs>
                    <linearGradient id="indigoFlowGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#818CF8" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="#818CF8" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke={theme === 'dark' ? '#2A2C32' : '#E5E7EB'}
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: tc.textTertiary, fontSize: 11 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    domain={[539000, 551000]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: tc.textTertiary, fontSize: 11 }}
                    tickFormatter={val => `${Math.round(val / 1000)}k m`}
                  />
                  <Tooltip
                    content={<CustomAreaTooltip />}
                    cursor={{ stroke: '#6366F1', strokeDasharray: '3 3', strokeWidth: 1 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="altitude"
                    stroke="#818CF8"
                    strokeWidth={2}
                    fill="url(#indigoFlowGradient)"
                    activeDot={{
                      r: 5,
                      fill: '#818CF8',
                      stroke: '#FFFFFF',
                      strokeWidth: 2
                    }}
                  />
                  {range === '30d' && (
                    <ReferenceDot
                      x="8 Nov, 2026"
                      y={548120}
                      r={4}
                      fill="#818CF8"
                      stroke="#FFFFFF"
                      strokeWidth={2}
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right: Tracked Object Breakdown Card (Donut Ring + Legend + More Details CTA) */}
        <div
          className="xl:col-span-4 rounded-2xl p-6 flex flex-col justify-between"
          style={{
            backgroundColor: tc.bgSecondary,
            border: `1px solid ${tc.borderPrimary}`
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4" style={{ color: tc.textSecondary }} />
              <h2 className="text-[15px] font-semibold" style={{ color: tc.textPrimary }}>
                Tracked Object Breakdown
              </h2>
            </div>
            <button
              className="p-1 rounded-lg transition-colors cursor-pointer"
              style={{ color: tc.textSecondary }}
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Center Donut Ring + Legend */}
          <div className="flex items-center justify-between gap-5 my-6">
            {/* Multi-Segment SVG Donut Ring */}
            <div className="relative w-[136px] h-[136px] flex-shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                {/* Subtle inner decorative ring */}
                <circle
                  cx="60"
                  cy="60"
                  r="40"
                  fill="none"
                  stroke={theme === 'dark' ? '#2A2C32' : '#E5E7EB'}
                  strokeWidth="1"
                />
                {/* Background Track */}
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  fill="none"
                  stroke={theme === 'dark' ? '#282A2F' : '#ECEEF2'}
                  strokeWidth="8"
                />
                {/* Segment 1: Active Payloads (52%) */}
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  fill="none"
                  stroke="#6366F1"
                  strokeWidth="8"
                  strokeDasharray="150 301.6"
                  strokeDashoffset="0"
                  strokeLinecap="round"
                />
                {/* Segment 2: Debris Fragments (24%) */}
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="8"
                  strokeDasharray="68 301.6"
                  strokeDashoffset="-158"
                  strokeLinecap="round"
                />
                {/* Segment 3: Rocket Bodies (15%) */}
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="8"
                  strokeDasharray="40 301.6"
                  strokeDashoffset="-234"
                  strokeLinecap="round"
                />
                {/* Segment 4: Mission Hardware (9%) */}
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  fill="none"
                  stroke="#A855F7"
                  strokeWidth="8"
                  strokeDasharray="20 301.6"
                  strokeDashoffset="-280"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[21px] font-bold leading-none" style={{ color: tc.textPrimary }}>
                  2351
                </span>
                <span className="text-[11px] mt-1" style={{ color: tc.textSecondary }}>
                  Total Objects
                </span>
              </div>
            </div>

            {/* Right Legend List */}
            <div className="flex-1 space-y-3.5">
              {BREAKDOWN_ITEMS.map(item => (
                <div key={item.label} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-1 h-3.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span style={{ color: tc.textSecondary }}>{item.label}</span>
                  </div>
                  <span className="font-semibold" style={{ color: tc.textPrimary }}>
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate('/dashboard/capital-structure')}
            className="w-full h-10 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            style={{
              backgroundColor: tc.bgTertiary,
              color: tc.textPrimary
            }}
          >
            <span>More details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Row 3: Clean Space Vehicle Registry Table Card (Matches 42,243 Active Subscribers) */}
      <div
        className="rounded-2xl p-6"
        style={{
          backgroundColor: tc.bgSecondary,
          border: `1px solid ${tc.borderPrimary}`
        }}
      >
        <h2 className="text-[16px] font-semibold mb-4" style={{ color: tc.textPrimary }}>
          48 Active Space Vehicles
        </h2>

        {/* Table Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div
              className="h-9 px-3 rounded-xl flex items-center gap-2"
              style={{
                backgroundColor: tc.bgTertiary,
                border: `1px solid ${tc.borderPrimary}`,
                minWidth: '230px'
              }}
            >
              <Search className="w-3.5 h-3.5" style={{ color: tc.textTertiary }} />
              <input
                type="text"
                value={tableSearch}
                onChange={e => setTableSearch(e.target.value)}
                placeholder="Search for a satellite"
                className="bg-transparent text-xs outline-none flex-1"
                style={{ color: tc.textPrimary }}
              />
              <kbd
                className="px-1.5 py-0.5 rounded text-[10px] font-mono"
                style={{ color: tc.textTertiary }}
              >
                ⌘K
              </kbd>
            </div>

            {/* Epoch Date Filter Pill */}
            <button
              className="h-9 px-3 rounded-xl text-xs font-medium flex items-center gap-2 cursor-pointer"
              style={{
                backgroundColor: tc.bgTertiary,
                border: `1px solid ${tc.borderPrimary}`,
                color: tc.textSecondary
              }}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Epoch Date</span>
            </button>

            {/* Orbital Plane Filter Pill */}
            <button
              className="h-9 px-3 rounded-xl text-xs font-medium flex items-center gap-2 cursor-pointer"
              style={{
                backgroundColor: tc.bgTertiary,
                border: `1px solid ${tc.borderPrimary}`,
                color: tc.textSecondary
              }}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Orbital Plane</span>
            </button>

            {/* Status Filter Pill */}
            <button
              onClick={() =>
                setStatusFilter(prev =>
                  prev === 'ALL'
                    ? 'Nominal'
                    : prev === 'Nominal'
                    ? 'Conjunction Watch'
                    : 'ALL'
                )
              }
              className="h-9 px-3 rounded-xl text-xs font-medium flex items-center gap-2 cursor-pointer"
              style={{
                backgroundColor: tc.bgTertiary,
                border: `1px solid ${tc.borderPrimary}`,
                color: statusFilter === 'ALL' ? tc.textSecondary : tc.textPrimary
              }}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{statusFilter === 'ALL' ? 'Status' : statusFilter}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setStatusFilter('ALL')}
              className="h-9 px-3.5 rounded-xl text-xs font-medium flex items-center gap-2 cursor-pointer"
              style={{
                backgroundColor: tc.bgTertiary,
                border: `1px solid ${tc.borderPrimary}`,
                color: tc.textPrimary
              }}
            >
              <Filter className="w-3.5 h-3.5" style={{ color: tc.textSecondary }} />
              <span>Filter</span>
            </button>
            <button
              className="h-9 px-3.5 rounded-xl text-xs font-medium flex items-center gap-2 cursor-pointer"
              style={{
                backgroundColor: tc.bgTertiary,
                border: `1px solid ${tc.borderPrimary}`,
                color: tc.textPrimary
              }}
            >
              <FileDown className="w-3.5 h-3.5" style={{ color: tc.textSecondary }} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Clean Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className="border-b text-xs"
                style={{
                  borderColor: tc.borderPrimary,
                  color: tc.textSecondary
                }}
              >
                <th className="py-3 px-3 font-medium w-36">
                  <label className="inline-flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        filteredVehicles.length > 0 &&
                        selectedRows.length === filteredVehicles.length
                      }
                      onChange={toggleAllRows}
                      className="rounded border-zinc-600 bg-transparent accent-indigo-500 cursor-pointer"
                    />
                    <span>NORAD ID</span>
                  </label>
                </th>
                <th className="py-3 px-3 font-medium">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" style={{ color: tc.textTertiary }} />
                    <span>Satellite Node</span>
                  </div>
                </th>
                <th className="py-3 px-3 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" style={{ color: tc.textTertiary }} />
                    <span>Telemetry Downlink</span>
                  </div>
                </th>
                <th className="py-3 px-3 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" style={{ color: tc.textTertiary }} />
                    <span>Status</span>
                  </div>
                </th>
                <th className="py-3 px-3 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" style={{ color: tc.textTertiary }} />
                    <span>Epoch Date</span>
                  </div>
                </th>
                <th className="py-3 px-3 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" style={{ color: tc.textTertiary }} />
                    <span>Orbital Plane</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((sv, idx) => {
                const statusBadge = getStatusStyle(sv.status);
                const planeBadge = getPlaneStyle(sv.plane);
                const checked = selectedRows.includes(sv.id);

                return (
                  <tr
                    key={sv.id}
                    className="transition-colors text-xs"
                    style={{
                      borderBottom:
                        idx < filteredVehicles.length - 1
                          ? `1px solid ${tc.borderSubtle}`
                          : 'none',
                      backgroundColor: checked ? 'rgba(99, 102, 241, 0.06)' : 'transparent'
                    }}
                  >
                    <td className="py-3.5 px-3 font-mono" style={{ color: tc.textSecondary }}>
                      <label className="inline-flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleRow(sv.id)}
                          className="rounded border-zinc-600 bg-transparent accent-indigo-500 cursor-pointer"
                        />
                        <span>{sv.id}</span>
                      </label>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                          style={{ backgroundColor: sv.avatarBg }}
                        >
                          {sv.name.slice(9, 11)}
                        </div>
                        <span className="font-medium" style={{ color: tc.textPrimary }}>
                          {sv.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3" style={{ color: tc.textSecondary }}>
                      {sv.telemetryLink}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium"
                        style={{
                          backgroundColor: statusBadge.bg,
                          color: statusBadge.text
                        }}
                      >
                        {sv.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono" style={{ color: tc.textSecondary }}>
                      {sv.epochDate}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium"
                        style={{
                          backgroundColor: planeBadge.bg,
                          color: planeBadge.text
                        }}
                      >
                        {sv.plane}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
