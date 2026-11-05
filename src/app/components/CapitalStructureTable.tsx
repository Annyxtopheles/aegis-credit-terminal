import { useState } from 'react';
import { Download, Check, Search, Filter, Satellite, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { colors, orbitalStatusBadges } from '../theme/colors';

export function CapitalStructureTable() {
  const { theme } = useTheme();
  const themeColors = colors[theme];
  const badges = orbitalStatusBadges[theme];
  const [downloaded, setDownloaded] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const data = [
    {
      svId: 'VANGUARD-01 [58211]',
      name: 'Vanguard-01 (Alpha)',
      cosparId: '2024-018A',
      inclination: '97.54°',
      eccentricity: '0.00014',
      meanMotion: '15.08 rev/d',
      status: 'NOMINAL',
      propellantPct: 88.4,
      nextBurnWindow: '2026-11-04 04:12Z (+0.18 m/s)',
      deltaVBudget: '142.6 m/s'
    },
    {
      svId: 'VANGUARD-04 [58214]',
      name: 'Vanguard-04 (Delta)',
      cosparId: '2024-018D',
      inclination: '97.56°',
      eccentricity: '0.00048',
      meanMotion: '15.11 rev/d',
      status: 'CAM ARMED',
      propellantPct: 41.2,
      nextBurnWindow: '2026-10-30 16:14Z (+0.42 m/s)',
      deltaVBudget: '54.8 m/s'
    },
    {
      svId: 'VANGUARD-09 [58219]',
      name: 'Vanguard-09 (Iota)',
      cosparId: '2024-018J',
      inclination: '97.53°',
      eccentricity: '0.00019',
      meanMotion: '15.09 rev/d',
      status: 'DRAG COMP',
      propellantPct: 64.8,
      nextBurnWindow: '2026-10-31 21:40Z (+0.25 m/s)',
      deltaVBudget: '98.2 m/s'
    },
    {
      svId: 'VANGUARD-12 [58222]',
      name: 'Vanguard-12 (Mu)',
      cosparId: '2024-018M',
      inclination: '97.55°',
      eccentricity: '0.00012',
      meanMotion: '15.08 rev/d',
      status: 'NOMINAL',
      propellantPct: 91.0,
      nextBurnWindow: '2026-11-08 11:05Z (+0.12 m/s)',
      deltaVBudget: '151.4 m/s'
    },
    {
      svId: 'VANGUARD-18 [58228]',
      name: 'Vanguard-18 (Sigma)',
      cosparId: '2024-018T',
      inclination: '97.52°',
      eccentricity: '0.00031',
      meanMotion: '15.10 rev/d',
      status: 'DRAG COMP',
      propellantPct: 59.5,
      nextBurnWindow: '2026-11-01 09:22Z (+0.31 m/s)',
      deltaVBudget: '84.0 m/s'
    },
    {
      svId: 'SHELL-1 MEAN FLEET (48 SVs)',
      name: 'Constellation Fleet Baseline',
      cosparId: '2024-018*',
      inclination: '97.54°',
      eccentricity: '0.00021',
      meanMotion: '15.09 rev/d',
      status: 'SYNC LOCKED',
      propellantPct: 74.2,
      nextBurnWindow: 'Auto Station-Keeping Window',
      deltaVBudget: '116.4 m/s'
    }
  ];

  const filteredData = data.filter(r => {
    const matchesSearch =
      r.svId.toLowerCase().includes(search.toLowerCase()) ||
      r.cosparId.toLowerCase().includes(search.toLowerCase()) ||
      r.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeStyle = (status: string) => {
    if (status === 'CAM ARMED') return badges.critical;
    if (status === 'DRAG COMP') return badges.warning;
    if (status === 'NOMINAL') return badges.nominal;
    return badges.maneuver;
  };

  const handleExportCSV = () => {
    const headers = ['SV Designator [NORAD]', 'COSPAR ID', 'Inclination', 'Eccentricity', 'Mean Motion', 'Telemetry Status', 'Xenon Propellant %', 'Next Burn Window (UTC)', 'Remaining Delta-V'];
    const rows = data.map(r => [
      `"${r.svId}"`,
      `"${r.cosparId}"`,
      `"${r.inclination}"`,
      `"${r.eccentricity}"`,
      `"${r.meanMotion}"`,
      `"${r.status}"`,
      `"${r.propellantPct}%"`,
      `"${r.nextBurnWindow}"`,
      `"${r.deltaVBudget}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `vanguard_constellation_ephemeris_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div
      className="transition-colors duration-300 rounded-2xl overflow-hidden p-6"
      style={{
        backgroundColor: themeColors.bgSecondary,
        border: `1px solid ${themeColors.borderPrimary}`
      }}
    >
      {/* Table Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <div>
          <h2 className="text-[17px] font-semibold tracking-tight" style={{ color: themeColors.textPrimary }}>
            Constellation Ephemeris & Thruster ΔV Ledger
          </h2>
          <p className="text-xs mt-1" style={{ color: themeColors.textSecondary }}>
            TLE Epoch 2026-303.59182044 • SGP4 orbital propagation & Hall-effect Xenon reserve metrics
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl transition-colors text-xs font-medium cursor-pointer self-start sm:self-auto"
          style={{
            backgroundColor: themeColors.bgTertiary,
            color: themeColors.textPrimary,
            border: `1px solid ${themeColors.borderPrimary}`
          }}
        >
          {downloaded ? <><Check className="w-3.5 h-3.5 text-emerald-400" /> Exported TLE</> : <><Download className="w-3.5 h-3.5" style={{ color: themeColors.textSecondary }} /> Export TLE CSV</>}
        </button>
      </div>

      {/* Toolbar: Search & Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <div
            className="h-9 px-3 rounded-xl flex items-center gap-2"
            style={{
              backgroundColor: themeColors.bgTertiary,
              border: `1px solid ${themeColors.borderPrimary}`,
              minWidth: '240px'
            }}
          >
            <Search className="w-3.5 h-3.5" style={{ color: themeColors.textTertiary }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search satellite or COSPAR ID..."
              className="bg-transparent text-xs outline-none flex-1"
              style={{ color: themeColors.textPrimary }}
            />
            <kbd className="px-1.5 py-0.5 rounded text-[10px] text-zinc-500">⌘K</kbd>
          </div>

          <button
            onClick={() => setStatusFilter(prev => prev === 'ALL' ? 'NOMINAL' : prev === 'NOMINAL' ? 'CAM ARMED' : prev === 'CAM ARMED' ? 'DRAG COMP' : 'ALL')}
            className="h-9 px-3 rounded-xl text-xs font-medium flex items-center gap-2 cursor-pointer transition-colors"
            style={{
              backgroundColor: themeColors.bgTertiary,
              border: `1px solid ${themeColors.borderPrimary}`,
              color: statusFilter === 'ALL' ? themeColors.textSecondary : themeColors.textPrimary
            }}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>{statusFilter === 'ALL' ? 'Filter Status' : statusFilter}</span>
          </button>
        </div>

        <div className="text-xs" style={{ color: themeColors.textSecondary }}>
          Showing <span className="font-semibold text-zinc-200">{filteredData.length}</span> of {data.length} records
        </div>
      </div>

      {/* Modern Table */}
      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-left border-collapse min-w-[880px]">
          <thead>
            <tr
              className="border-b text-xs"
              style={{
                borderColor: themeColors.borderPrimary,
                color: themeColors.textSecondary
              }}
            >
              <th className="py-3 px-3 font-medium">Spacecraft [NORAD]</th>
              <th className="py-3 px-3 font-medium text-center">COSPAR ID</th>
              <th className="py-3 px-3 font-medium text-right">Inclination</th>
              <th className="py-3 px-3 font-medium text-right">Eccentricity</th>
              <th className="py-3 px-3 font-medium text-right">Mean Motion</th>
              <th className="py-3 px-3 font-medium text-center">Telemetry Mode</th>
              <th className="py-3 px-3 font-medium text-right">Xenon Fuel %</th>
              <th className="py-3 px-3 font-medium text-right">Next Burn Window</th>
              <th className="py-3 px-3 font-medium text-right">Rem. ΔV</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => {
              const isTotal = row.svId.startsWith('SHELL-1');
              const badgeStyle = getStatusBadgeStyle(row.status);

              return (
                <tr
                  key={index}
                  className="transition-colors text-xs"
                  style={{
                    borderBottom: `1px solid ${themeColors.borderSubtle}`,
                    fontWeight: isTotal ? 600 : 400
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = themeColors.hoverBg;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <Satellite className="w-3.5 h-3.5 flex-shrink-0" style={{ color: themeColors.accentPrimary }} />
                      <div>
                        <div className="font-medium" style={{ color: themeColors.textPrimary }}>{row.name}</div>
                        <div className="text-[11px] " style={{ color: themeColors.textSecondary }}>{row.svId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-center " style={{ color: themeColors.textSecondary }}>
                    {row.cosparId}
                  </td>
                  <td className="py-3.5 px-3 text-right " style={{ color: themeColors.textPrimary }}>
                    {row.inclination}
                  </td>
                  <td className="py-3.5 px-3 text-right " style={{ color: themeColors.textPrimary }}>
                    {row.eccentricity}
                  </td>
                  <td className="py-3.5 px-3 text-right " style={{ color: themeColors.textPrimary }}>
                    {row.meanMotion}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium"
                      style={{
                        backgroundColor: badgeStyle.bg,
                        color: badgeStyle.text
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <div className="inline-flex items-center gap-2 justify-end">
                      <div
                        className="w-16 h-1.5 rounded-full overflow-hidden"
                        style={{ backgroundColor: theme === 'dark' ? '#2A2C32' : '#E5E7EB' }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${row.propellantPct}%`,
                            backgroundColor: row.propellantPct < 45 ? '#F87171' : row.propellantPct < 65 ? '#FBBF24' : '#4ADE80'
                          }}
                        />
                      </div>
                      <span className="font-semibold" style={{ color: row.propellantPct < 45 ? '#F87171' : themeColors.textPrimary }}>
                        {row.propellantPct}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-right " style={{ color: themeColors.textSecondary }}>
                    {row.nextBurnWindow}
                  </td>
                  <td className="py-3.5 px-3 text-right font-semibold" style={{ color: themeColors.accentPrimary }}>
                    {row.deltaVBudget}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
