import { useState } from 'react';
import { Download, Check, Radar, Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export function LargestHoldersTable() {
  const { theme } = useTheme();
  const themeColors = colors[theme];
  const [downloaded, setDownloaded] = useState(false);
  const [search, setSearch] = useState('');

  const trackedObjects = [
    {
      designator: 'COSMOS-2251 DEB [34427]',
      origin: '2009 Iridium-Cosmos Collision',
      rcs: 0.48,
      relVel: 14.28,
      missDistKm: 0.142,
      pc: '4.8e-4',
      station: 'Eglin AN/FPS-85 (UHF)',
      severity: 'critical'
    },
    {
      designator: 'SL-16 R/B FRAG [41802]',
      origin: 'Zenit-2 Stage-2 Breakup',
      rcs: 1.85,
      relVel: 11.64,
      missDistKm: 0.610,
      pc: '7.2e-5',
      station: 'Kwajalein Space Fence (S-Band)',
      severity: 'warning'
    },
    {
      designator: 'FENGYUN-1C DEB [31094]',
      origin: '2007 Kinetic ASAT Test',
      rcs: 0.19,
      relVel: 13.91,
      missDistKm: 1.840,
      pc: '1.1e-5',
      station: 'Fylingdales SSPARS',
      severity: 'nominal'
    },
    {
      designator: 'CZ-6A R/B DEB [54291]',
      origin: '2022 Upper Stage Fragmentation',
      rcs: 0.34,
      relVel: 12.15,
      missDistKm: 2.490,
      pc: '4.3e-6',
      station: 'LeoLabs Kiwi Radar (NZ)',
      severity: 'nominal'
    }
  ];

  const filtered = trackedObjects.filter(o =>
    o.designator.toLowerCase().includes(search.toLowerCase()) ||
    o.origin.toLowerCase().includes(search.toLowerCase()) ||
    o.station.toLowerCase().includes(search.toLowerCase())
  );

  const handleExportCSV = () => {
    const headers = ['Object Designator', 'Origin Event', 'RCS (m2)', 'Rel Velocity (km/s)', 'Miss Distance (km)', 'Collision Prob (Pc)', 'Tracking Station'];
    const rows = trackedObjects.map(o => [
      `"${o.designator}"`,
      `"${o.origin}"`,
      `"${o.rcs} m2"`,
      `"${o.relVel} km/s"`,
      `"${o.missDistKm} km"`,
      `"${o.pc}"`,
      `"${o.station}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `kessler_tracked_debris_registry_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const getSeverityBadge = (severity: string) => {
    if (severity === 'critical') return { bg: 'rgba(239, 68, 68, 0.16)', text: '#F87171' };
    if (severity === 'warning') return { bg: 'rgba(245, 158, 11, 0.16)', text: '#FBBF24' };
    return { bg: 'rgba(74, 222, 128, 0.16)', text: '#4ADE80' };
  };

  return (
    <div
      className="transition-colors duration-300 rounded-2xl p-6"
      style={{
        backgroundColor: themeColors.bgSecondary,
        border: `1px solid ${themeColors.borderPrimary}`
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <div>
          <h3 className="text-[17px] font-semibold tracking-tight" style={{ color: themeColors.textPrimary }}>
            Tracked Debris Cloud & High-Interest Object Registry
          </h3>
          <p className="text-xs mt-1" style={{ color: themeColors.textSecondary }}>
            18th SDS Spacetrack catalog screening volume (50 km radial corridor)
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div
            className="h-9 px-3 rounded-xl flex items-center gap-2"
            style={{
              backgroundColor: themeColors.bgTertiary,
              border: `1px solid ${themeColors.borderPrimary}`,
              minWidth: '220px'
            }}
          >
            <Search className="w-3.5 h-3.5" style={{ color: themeColors.textTertiary }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search debris object..."
              className="bg-transparent text-xs outline-none flex-1"
              style={{ color: themeColors.textPrimary }}
            />
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 h-9 px-3.5 rounded-xl transition-colors text-xs font-medium cursor-pointer"
            style={{
              backgroundColor: themeColors.bgTertiary,
              color: themeColors.textPrimary,
              border: `1px solid ${themeColors.borderPrimary}`
            }}
          >
            {downloaded ? <><Check className="w-3.5 h-3.5 text-emerald-400" /> Exported</> : <><Download className="w-3.5 h-3.5" style={{ color: themeColors.textSecondary }} /> Export CDM</>}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr
              className="border-b text-xs"
              style={{
                borderColor: themeColors.borderPrimary,
                color: themeColors.textSecondary
              }}
            >
              <th className="py-3 px-3 font-medium">Object Designator</th>
              <th className="py-3 px-3 font-medium">Origin Event</th>
              <th className="py-3 px-3 font-medium text-right">RCS (m²)</th>
              <th className="py-3 px-3 font-medium text-right">Rel. Velocity</th>
              <th className="py-3 px-3 font-medium text-right">Miss Distance</th>
              <th className="py-3 px-3 font-medium text-center">Collision Risk (Pc)</th>
              <th className="py-3 px-3 font-medium">Tracking Sensor</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((obj, index) => {
              const badge = getSeverityBadge(obj.severity);
              return (
                <tr
                  key={index}
                  className="transition-colors text-xs"
                  style={{
                    borderBottom: `1px solid ${themeColors.borderSubtle}`
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = themeColors.hoverBg;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2.5">
                      <Radar className="w-4 h-4 flex-shrink-0" style={{ color: badge.text }} />
                      <span className="font-semibold" style={{ color: themeColors.textPrimary }}>
                        {obj.designator}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3" style={{ color: themeColors.textSecondary }}>
                    {obj.origin}
                  </td>
                  <td className="py-3.5 px-3 text-right " style={{ color: themeColors.textPrimary }}>
                    {obj.rcs.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-3 text-right " style={{ color: themeColors.textPrimary }}>
                    {obj.relVel.toFixed(2)} km/s
                  </td>
                  <td className="py-3.5 px-3 text-right font-semibold" style={{ color: badge.text }}>
                    {obj.missDistKm.toFixed(3)} km
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold"
                      style={{
                        backgroundColor: badge.bg,
                        color: badge.text
                      }}
                    >
                      {obj.pc}
                    </span>
                  </td>
                  <td className="py-3.5 px-3" style={{ color: themeColors.textSecondary }}>
                    {obj.station}
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
