import { useState } from 'react';
import { Download, Check, Radar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export function LargestHoldersTable() {
  const { theme } = useTheme();
  const themeColors = colors[theme];
  const [downloaded, setDownloaded] = useState(false);

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

  return (
    <div
      className="transition-colors duration-300 rounded-2xl overflow-hidden"
      style={{
        backgroundColor: themeColors.tableBg,
        border: `1px solid ${themeColors.borderPrimary}`
      }}
    >
      <div className="px-5 md:px-6 py-4 md:py-5 flex items-center justify-between" style={{ borderBottom: `1px solid ${themeColors.borderPrimary}` }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: themeColors.textPrimary }}>
            Tracked Debris Cloud & High-Interest Object Registry
          </h3>
          <p className="text-xs mt-0.5 font-mono" style={{ color: themeColors.textSecondary }}>
            18TH SDS CATALOG // LEO SHELL-1 SCREENING VOLUME (50 KM RADIAL)
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-colors text-xs font-semibold cursor-pointer"
          style={{
            backgroundColor: themeColors.bgTertiary,
            color: themeColors.textPrimary,
            border: `1px solid ${themeColors.borderPrimary}`
          }}
          title="Export debris registry to CSV"
        >
          {downloaded ? <><Check className="w-3.5 h-3.5" /> Exported CDM</> : <><Download className="w-3.5 h-3.5" /> Export CDM CSV</>}
        </button>
      </div>

      <div className="overflow-x-auto -mx-4 md:mx-0">
        <table className="w-full min-w-[720px]">
          <thead style={{ backgroundColor: themeColors.tableHeaderBg }}>
            <tr>
              <th className="px-3.5 py-3 text-left uppercase font-mono" style={{ fontSize: '11px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.08em' }}>Object Designator</th>
              <th className="px-3.5 py-3 text-left uppercase font-mono" style={{ fontSize: '11px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.08em' }}>Origin Event</th>
              <th className="px-3.5 py-3 text-right uppercase font-mono" style={{ fontSize: '11px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.08em' }}>RCS (m²)</th>
              <th className="px-3.5 py-3 text-right uppercase font-mono" style={{ fontSize: '11px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.08em' }}>Rel. Vel (km/s)</th>
              <th className="px-3.5 py-3 text-right uppercase font-mono" style={{ fontSize: '11px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.08em' }}>Collision Pc</th>
              <th className="px-3.5 py-3 text-left uppercase font-mono" style={{ fontSize: '11px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.08em' }}>Tracking Sensor</th>
            </tr>
          </thead>
          <tbody>
            {trackedObjects.map((obj, index) => (
              <tr
                key={index}
                className="transition-colors duration-200 cursor-pointer"
                style={{
                  backgroundColor: index % 2 === 0 ? themeColors.tableBg : themeColors.bgZebra,
                  borderBottom: `1px solid ${themeColors.borderSubtle}`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = themeColors.hoverBg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = index % 2 === 0 ? themeColors.tableBg : themeColors.bgZebra;
                }}
              >
                <td className="px-3.5 py-3">
                  <div className="flex items-center gap-2">
                    <Radar
                      className="w-4 h-4 flex-shrink-0"
                      style={{
                        color:
                          obj.severity === 'critical'
                            ? themeColors.alertRed
                            : obj.severity === 'warning'
                              ? themeColors.alertAmber
                              : themeColors.accentPrimary
                      }}
                    />
                    <span className="font-mono font-semibold" style={{ fontSize: '13px', color: themeColors.textPrimary }}>
                      {obj.designator}
                    </span>
                  </div>
                </td>
                <td className="px-3.5 py-3" style={{ fontSize: '13px', color: themeColors.textSecondary }}>
                  {obj.origin}
                </td>
                <td className="px-3.5 py-3 text-right font-mono" style={{ fontSize: '13px', color: themeColors.textPrimary }}>
                  {obj.rcs.toFixed(2)} m²
                </td>
                <td className="px-3.5 py-3 text-right font-mono" style={{ fontSize: '13px', color: themeColors.textPrimary }}>
                  {obj.relVel.toFixed(2)} km/s
                </td>
                <td
                  className="px-3.5 py-3 text-right font-mono font-bold"
                  style={{
                    fontSize: '13px',
                    color:
                      obj.severity === 'critical'
                        ? themeColors.alertRed
                        : obj.severity === 'warning'
                          ? themeColors.alertAmber
                          : themeColors.accentPrimary
                  }}
                >
                  {obj.pc}
                </td>
                <td className="px-3.5 py-3 font-mono" style={{ fontSize: '12px', color: themeColors.textSecondary }}>
                  {obj.station}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
