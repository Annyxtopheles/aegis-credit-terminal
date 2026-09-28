import { useState } from 'react';
import { Download, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export function LargestHoldersTable() {
  const { theme } = useTheme();
  const themeColors = colors[theme];
  const [downloaded, setDownloaded] = useState(false);

  const holders = [
    {
      name: 'Prudential Financial',
      type: 'institutional',
      icon: '🏛️',
      note2027: 26.02,
      note2028: 5.92,
      termLoan: null
    },
    {
      name: 'Capital Advisors',
      type: 'institutional',
      icon: '🏛️',
      note2027: 12.08,
      note2028: 7.62,
      termLoan: null
    },
    {
      name: 'BlackRock',
      type: 'institutional',
      icon: '🏛️',
      note2027: 9.73,
      note2028: 5.57,
      termLoan: null
    }
  ];

  const getPercentageColor = (pct: number | null) => {
    if (pct === null) return themeColors.textSecondary;
    if (pct > 20) return themeColors.accentPrimary;
    if (pct >= 10) return themeColors.textPrimary;
    return themeColors.textSecondary;
  };

  const handleExportCSV = () => {
    const headers = ['Holder', 'Type', '2027 Note (%)', '2028 Note (%)', 'Term Loan'];
    const rows = holders.map(h => [
      `"${h.name}"`,
      `"${h.type}"`,
      `"${h.note2027 !== null ? h.note2027 + '%' : '-'}"`,
      `"${h.note2028 !== null ? h.note2028 + '%' : '-'}"`,
      `"${h.termLoan !== null ? h.termLoan : '-'}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `apex_brands_largest_holders_${new Date().toISOString().slice(0, 10)}.csv`);
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
      <div className="px-4 md:px-6 py-4 md:py-6 flex items-center justify-between" style={{ borderBottom: `1px solid ${themeColors.borderPrimary}` }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: themeColors.textPrimary }} className="md:text-base">
          LARGEST HOLDERS
        </h3>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors text-xs font-semibold cursor-pointer"
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
        <table className="w-full min-w-[600px]">
          <thead style={{ backgroundColor: themeColors.tableHeaderBg }}>
            <tr>
              <th className="px-3.5 py-3 text-left uppercase" style={{ fontSize: '12px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.1em' }}>Holder</th>
              <th className="px-3.5 py-3 text-right uppercase" style={{ fontSize: '12px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.1em' }}>$550M Sr Note 2027</th>
              <th className="px-3.5 py-3 text-right uppercase" style={{ fontSize: '12px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.1em' }}>$550M Sr Secd Note 2028</th>
              <th className="px-3.5 py-3 text-right uppercase" style={{ fontSize: '12px', fontWeight: 700, color: themeColors.textSecondary, letterSpacing: '0.1em' }}>$450M Term Loan B 2029</th>
            </tr>
          </thead>
          <tbody>
            {holders.map((holder, index) => (
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
                    <span style={{ fontSize: '16px' }}>{holder.icon}</span>
                    <span style={{ fontSize: '14px', color: themeColors.textPrimary }}>{holder.name}</span>
                  </div>
                </td>
                <td
                  className="px-3.5 py-3 text-right"
                  style={{
                    fontSize: '14px',
                    fontFamily: 'JetBrains Mono, monospace',
                    color: getPercentageColor(holder.note2027),
                    fontWeight: holder.note2027 && holder.note2027 > 20 ? 700 : holder.note2027 && holder.note2027 >= 10 ? 600 : 400
                  }}
                >
                  {holder.note2027 !== null ? `${holder.note2027.toFixed(2)}%` : '...'}
                </td>
                <td
                  className="px-3.5 py-3 text-right"
                  style={{
                    fontSize: '14px',
                    fontFamily: 'JetBrains Mono, monospace',
                    color: getPercentageColor(holder.note2028),
                    fontWeight: holder.note2028 && holder.note2028 > 20 ? 700 : holder.note2028 && holder.note2028 >= 10 ? 600 : 400
                  }}
                >
                  {holder.note2028 !== null ? `${holder.note2028.toFixed(2)}%` : '...'}
                </td>
                <td
                  className="px-3.5 py-3 text-right"
                  style={{
                    fontSize: '14px',
                    fontFamily: 'JetBrains Mono, monospace',
                    color: getPercentageColor(holder.termLoan),
                    fontWeight: holder.termLoan && holder.termLoan > 20 ? 700 : holder.termLoan && holder.termLoan >= 10 ? 600 : 400
                  }}
                >
                  {holder.termLoan !== null ? `${holder.termLoan.toFixed(2)}%` : '...'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
