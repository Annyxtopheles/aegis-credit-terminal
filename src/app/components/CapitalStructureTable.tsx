import { useState } from 'react';
import { Download, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { colors, ratingBadges } from '../theme/colors';

export function CapitalStructureTable() {
  const { theme } = useTheme();
  const themeColors = colors[theme];
  const badges = ratingBadges[theme];
  const [downloaded, setDownloaded] = useState(false);

  const data = [
    {
      instrument: '$550M Sr Notes',
      maturity: '9-15-2027',
      evPercent: '86.80%',
      ebitdaMult: '7.77x',
      revMult: '1.10x',
      rating: 'Caa2 / CCC',
      coupon: '5.250',
      callProvision: '3-1-2022 at 103.938%',
      ytm: '6.53%'
    },
    {
      instrument: '$550M Sr Secd Notes',
      maturity: '9-15-2028',
      evPercent: '23.53%',
      ebitdaMult: '2.11x',
      revMult: '0.30x',
      rating: 'B2 / B+',
      coupon: '8.000',
      callProvision: '9-15-2026 at 100.000%',
      ytm: '8.41%'
    },
    {
      instrument: '$250M Sr Secd Notes',
      maturity: '9-15-2028',
      evPercent: '34.23%',
      ebitdaMult: '3.06x',
      revMult: '0.43x',
      rating: 'B2 / B+',
      coupon: '8.000',
      callProvision: '9-15-2025 at 104.000%',
      ytm: '8.41%'
    },
    {
      instrument: '$475M Revolving Credit',
      maturity: '12-16-2028',
      evPercent: '44.07%',
      ebitdaMult: '3.94x',
      revMult: '0.56x',
      rating: '—',
      coupon: '—',
      callProvision: '—',
      ytm: '—'
    },
    {
      instrument: '$450M Term Loan B',
      maturity: '10-10-2029',
      evPercent: '63.27',
      ebitdaMult: '5.66x',
      revMult: '0.80x',
      rating: '—',
      coupon: '—',
      callProvision: '8-12-2024 at 101.000%',
      ytm: '—'
    },
    {
      instrument: 'Total Debt',
      maturity: '',
      evPercent: '85.56%',
      ebitdaMult: '7.77x',
      revMult: '1.1x',
      rating: '',
      coupon: '',
      callProvision: '',
      ytm: ''
    }
  ];

  const getRatingBadgeStyle = (rating: string) => {
    if (rating === 'NR' || rating === '—' || rating === '') {
      return badges.notRated;
    }
    if (rating.includes('CCC') || rating.includes('Caa')) {
      return badges.distressed;
    }
    if (rating.includes('B')) {
      return badges.highYield;
    }
    return badges.investmentGrade;
  };

  const getYTMColor = (ytm: string) => {
    if (ytm === '-') return themeColors.textPrimary;
    const value = parseFloat(ytm);
    if (value > 7) return themeColors.alertRed;
    if (value >= 5) return theme === 'dark' ? '#F59E0B' : '#D97706';
    return themeColors.textPrimary;
  };

  const getEBITDAColor = (mult: string) => {
    if (mult === '-') return themeColors.textPrimary;
    const value = parseFloat(mult);
    if (value > 6) return themeColors.alertRed;
    if (value >= 4) return theme === 'dark' ? '#F59E0B' : '#D97706';
    return themeColors.textPrimary;
  };

  const handleExportCSV = () => {
    const headers = ['Instrument', 'Maturity Date', '% EV', 'EBITDA Mult.', 'Revenue Mult.', 'Rating', 'Coupon', 'Call Provision', 'YTM'];
    const rows = data.map(r => [
      `"${r.instrument}"`,
      `"${r.maturity}"`,
      `"${r.evPercent}"`,
      `"${r.ebitdaMult}"`,
      `"${r.revMult}"`,
      `"${r.rating}"`,
      `"${r.coupon}"`,
      `"${r.callProvision}"`,
      `"${r.ytm}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `apex_brands_capital_structure_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div
      className="transition-colors duration-300"
      style={{
        backgroundColor: themeColors.tableBg,
        border: `1px solid ${themeColors.borderPrimary}`
      }}
    >
      <div className="px-4 md:px-6 py-4 md:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ borderBottom: `1px solid ${themeColors.borderPrimary}` }}>
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: themeColors.textPrimary }} className="md:text-base">
            CAPITAL STRUCTURE
          </h3>
          <span style={{ fontSize: '11px', color: themeColors.textSecondary }} className="md:text-xs">
            Data as of March 29, 2025
          </span>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors text-xs font-semibold cursor-pointer self-start sm:self-auto"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(6,182,212,0.12)' : '#EFF6FF',
            color: theme === 'dark' ? '#06B6D4' : '#0284C7',
            border: theme === 'dark' ? '1px solid rgba(6,182,212,0.3)' : '1px solid #BAE6FD'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(6,182,212,0.22)' : '#E0F2FE';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(6,182,212,0.12)' : '#EFF6FF';
          }}
          title="Export table data to CSV"
        >
          {downloaded ? <><Check className="w-3.5 h-3.5" /> Exported</> : <><Download className="w-3.5 h-3.5" /> Export CSV</>}
        </button>
      </div>

      <div className="overflow-x-auto -mx-4 md:mx-0">
        <table className="w-full min-w-[800px]">
          <thead style={{ backgroundColor: themeColors.tableHeaderBg }}>
            <tr>
              <th className="px-3.5 py-3 text-left uppercase" style={{ fontSize: '12px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.1em' }}>Instrument</th>
              <th className="px-3.5 py-3 text-center uppercase" style={{ fontSize: '12px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.1em' }}>Maturity Date</th>
              <th className="px-3.5 py-3 text-right uppercase" style={{ fontSize: '12px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.1em' }}>% EV</th>
              <th className="px-3.5 py-3 text-right uppercase" style={{ fontSize: '12px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.1em' }}>EBITDA Mult.</th>
              <th className="px-3.5 py-3 text-right uppercase" style={{ fontSize: '12px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.1em' }}>Revenue Mult.</th>
              <th className="px-3.5 py-3 text-center uppercase" style={{ fontSize: '12px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.1em' }}>Rating</th>
              <th className="px-3.5 py-3 text-right uppercase" style={{ fontSize: '12px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.1em' }}>Coupon</th>
              <th className="px-3.5 py-3 text-right uppercase" style={{ fontSize: '12px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.1em' }}>Call Provision</th>
              <th className="px-3.5 py-3 text-right uppercase" style={{ fontSize: '12px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.1em' }}>YTM</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              const ratingStyle = getRatingBadgeStyle(row.rating);
              return (
                <tr
                  key={index}
                  className="transition-colors duration-200"
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
                  <td className="px-3.5 py-3" style={{ fontSize: '14px', color: themeColors.textPrimary }}>{row.instrument}</td>
                  <td className="px-3.5 py-3 text-center" style={{ fontSize: '14px', color: themeColors.textPrimary, fontFamily: 'JetBrains Mono, monospace' }}>{row.maturity}</td>
                  <td className="px-3.5 py-3 text-right" style={{ fontSize: '14px', color: themeColors.textPrimary, fontFamily: 'JetBrains Mono, monospace' }}>{row.evPercent}</td>
                  <td className="px-3.5 py-3 text-right" style={{ fontSize: '14px', color: getEBITDAColor(row.ebitdaMult), fontFamily: 'JetBrains Mono, monospace' }}>{row.ebitdaMult}</td>
                  <td className="px-3.5 py-3 text-right" style={{ fontSize: '14px', color: themeColors.textPrimary, fontFamily: 'JetBrains Mono, monospace' }}>{row.revMult}</td>
                  <td className="px-3.5 py-3 text-center">
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: ratingStyle.text,
                        backgroundColor: ratingStyle.bg,
                        border: theme === 'light' && 'border' in ratingStyle ? `1px solid ${ratingStyle.border}` : 'none',
                        fontFamily: 'JetBrains Mono, monospace',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        display: 'inline-block'
                      }}
                    >
                      {row.rating}
                    </span>
                  </td>
                  <td className="px-3.5 py-3 text-right" style={{ fontSize: '14px', color: themeColors.textPrimary, fontFamily: 'JetBrains Mono, monospace' }}>{row.coupon}</td>
                  <td className="px-3.5 py-3 text-right" style={{ fontSize: '14px', color: themeColors.textPrimary, fontFamily: 'JetBrains Mono, monospace' }}>{row.callProvision}</td>
                  <td className="px-3.5 py-3 text-right" style={{ fontSize: '14px', color: getYTMColor(row.ytm), fontFamily: 'JetBrains Mono, monospace' }}>{row.ytm}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}