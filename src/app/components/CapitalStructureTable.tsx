import { useState } from 'react';
import { Download, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { colors, orbitalStatusBadges } from '../theme/colors';

export function CapitalStructureTable() {
  const { theme } = useTheme();
  const themeColors = colors[theme];
  const badges = orbitalStatusBadges[theme];
  const [downloaded, setDownloaded] = useState(false);

  const data = [
    {
      svId: 'VANGUARD-01 [58211]',
      cosparId: '2024-018A',
      inclination: '97.54°',
      eccentricity: '0.00014',
      meanMotion: '15.08 rev/d',
      status: 'NOMINAL',
      propellantPct: '88.4%',
      nextBurnWindow: '2026-11-04 04:12Z (+0.18 m/s)',
      deltaVBudget: '142.6 m/s'
    },
    {
      svId: 'VANGUARD-04 [58214]',
      cosparId: '2024-018D',
      inclination: '97.56°',
      eccentricity: '0.00048',
      meanMotion: '15.11 rev/d',
      status: 'CAM ARMED',
      propellantPct: '41.2%',
      nextBurnWindow: '2026-10-30 16:14Z (+0.42 m/s)',
      deltaVBudget: '54.8 m/s'
    },
    {
      svId: 'VANGUARD-09 [58219]',
      cosparId: '2024-018J',
      inclination: '97.53°',
      eccentricity: '0.00019',
      meanMotion: '15.09 rev/d',
      status: 'DRAG COMP',
      propellantPct: '64.8%',
      nextBurnWindow: '2026-10-31 21:40Z (+0.25 m/s)',
      deltaVBudget: '98.2 m/s'
    },
    {
      svId: 'VANGUARD-12 [58222]',
      cosparId: '2024-018M',
      inclination: '97.55°',
      eccentricity: '0.00012',
      meanMotion: '15.08 rev/d',
      status: 'NOMINAL',
      propellantPct: '91.0%',
      nextBurnWindow: '2026-11-08 11:05Z (+0.12 m/s)',
      deltaVBudget: '151.4 m/s'
    },
    {
      svId: 'VANGUARD-18 [58228]',
      cosparId: '2024-018T',
      inclination: '97.52°',
      eccentricity: '0.00031',
      meanMotion: '15.10 rev/d',
      status: 'DRAG COMP',
      propellantPct: '59.5%',
      nextBurnWindow: '2026-11-01 09:22Z (+0.31 m/s)',
      deltaVBudget: '84.0 m/s'
    },
    {
      svId: 'SHELL-1 MEAN FLEET (48 SVs)',
      cosparId: '2024-018*',
      inclination: '97.54°',
      eccentricity: '0.00021',
      meanMotion: '15.09 rev/d',
      status: 'SYNC LOCKED',
      propellantPct: '74.2%',
      nextBurnWindow: 'AUTO STATION-KEEPING',
      deltaVBudget: '116.4 m/s'
    }
  ];

  const getStatusBadgeStyle = (status: string) => {
    if (status === 'CAM ARMED') return badges.critical;
    if (status === 'DRAG COMP') return badges.warning;
    if (status === 'NOMINAL') return badges.nominal;
    return badges.maneuver;
  };

  const getPropellantColor = (pctStr: string) => {
    const value = parseFloat(pctStr);
    if (value < 45) return themeColors.alertRed;
    if (value < 65) return themeColors.alertAmber;
    return themeColors.alertGreen;
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
      `"${r.propellantPct}"`,
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
      className="transition-colors duration-300 rounded-sm"
      style={{
        backgroundColor: themeColors.tableBg,
        border: `1px solid ${themeColors.borderPrimary}`
      }}
    >
      <div className="px-4 md:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ borderBottom: `1px solid ${themeColors.borderPrimary}` }}>
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: themeColors.textPrimary, letterSpacing: '0.05em' }} className="md:text-base uppercase">
            CONSTELLATION EPHEMERIS & THRUSTER DELTA-V LEDGER
          </h3>
          <span className="font-mono" style={{ fontSize: '11px', color: themeColors.textSecondary }}>
            TLE EPOCH 2026-303.59182044 // HALL-EFFECT XENON PROPULSION TELEMETRY
          </span>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors text-xs font-mono font-semibold cursor-pointer self-start sm:self-auto"
          style={{
            backgroundColor: `${themeColors.accentPrimary}20`,
            color: themeColors.accentPrimary,
            border: `1px solid ${themeColors.accentPrimary}50`
          }}
          title="Export Ephemeris TLE Ledger to CSV"
        >
          {downloaded ? <><Check className="w-3.5 h-3.5" /> EXPORTED TLE</> : <><Download className="w-3.5 h-3.5" /> EXPORT TLE CSV</>}
        </button>
      </div>

      <div className="overflow-x-auto -mx-4 md:mx-0">
        <table className="w-full min-w-[900px]">
          <thead style={{ backgroundColor: themeColors.tableHeaderBg }}>
            <tr>
              <th className="px-3.5 py-3 text-left uppercase font-mono" style={{ fontSize: '11px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.08em' }}>Spacecraft [NORAD ID]</th>
              <th className="px-3.5 py-3 text-center uppercase font-mono" style={{ fontSize: '11px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.08em' }}>COSPAR ID</th>
              <th className="px-3.5 py-3 text-right uppercase font-mono" style={{ fontSize: '11px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.08em' }}>Inclination</th>
              <th className="px-3.5 py-3 text-right uppercase font-mono" style={{ fontSize: '11px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.08em' }}>Eccentricity</th>
              <th className="px-3.5 py-3 text-right uppercase font-mono" style={{ fontSize: '11px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.08em' }}>Mean Motion</th>
              <th className="px-3.5 py-3 text-center uppercase font-mono" style={{ fontSize: '11px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.08em' }}>Mode Status</th>
              <th className="px-3.5 py-3 text-right uppercase font-mono" style={{ fontSize: '11px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.08em' }}>Xenon Fuel %</th>
              <th className="px-3.5 py-3 text-right uppercase font-mono" style={{ fontSize: '11px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.08em' }}>Next Burn Window</th>
              <th className="px-3.5 py-3 text-right uppercase font-mono" style={{ fontSize: '11px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.08em' }}>Rem. ΔV</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              const isTotal = row.svId.startsWith('SHELL-1');
              const badgeStyle = getStatusBadgeStyle(row.status);

              return (
                <tr
                  key={index}
                  className="transition-colors"
                  style={{
                    backgroundColor: index % 2 === 0 ? themeColors.tableBg : themeColors.bgZebra,
                    borderBottom: `1px solid ${themeColors.borderSubtle}`,
                    borderTop: isTotal ? `2px solid ${themeColors.accentPrimary}` : undefined,
                    fontWeight: isTotal ? 700 : 400
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = themeColors.hoverBg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = index % 2 === 0 ? themeColors.tableBg : themeColors.bgZebra;
                  }}
                >
                  <td className="px-3.5 py-3 font-mono" style={{ fontSize: '13px', color: themeColors.textPrimary }}>{row.svId}</td>
                  <td className="px-3.5 py-3 text-center font-mono" style={{ fontSize: '13px', color: themeColors.textSecondary }}>{row.cosparId}</td>
                  <td className="px-3.5 py-3 text-right font-mono" style={{ fontSize: '13px', color: themeColors.textPrimary }}>{row.inclination}</td>
                  <td className="px-3.5 py-3 text-right font-mono" style={{ fontSize: '13px', color: themeColors.textPrimary }}>{row.eccentricity}</td>
                  <td className="px-3.5 py-3 text-right font-mono" style={{ fontSize: '13px', color: themeColors.textPrimary }}>{row.meanMotion}</td>
                  <td className="px-3.5 py-3 text-center">
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: badgeStyle.text,
                        backgroundColor: badgeStyle.bg,
                        border: `1px solid ${badgeStyle.border}`,
                        fontFamily: 'JetBrains Mono, monospace',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        display: 'inline-block'
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3.5 py-3 text-right font-mono" style={{ fontSize: '13px', fontWeight: 600, color: getPropellantColor(row.propellantPct) }}>{row.propellantPct}</td>
                  <td className="px-3.5 py-3 text-right font-mono" style={{ fontSize: '12px', color: themeColors.textSecondary }}>{row.nextBurnWindow}</td>
                  <td className="px-3.5 py-3 text-right font-mono" style={{ fontSize: '13px', color: themeColors.accentPrimary, fontWeight: 600 }}>{row.deltaVBudget}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
