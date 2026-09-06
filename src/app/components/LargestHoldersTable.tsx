import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export function LargestHoldersTable() {
  const { theme } = useTheme();
  const themeColors = colors[theme];

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

  return (
    <div
      className="transition-colors duration-300"
      style={{
        backgroundColor: themeColors.tableBg,
        border: `1px solid ${themeColors.borderPrimary}`
      }}
    >
      <div className="px-4 md:px-6 py-4 md:py-6" style={{ borderBottom: `1px solid ${themeColors.borderPrimary}` }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: themeColors.textPrimary }} className="md:text-base">
          LARGEST HOLDERS
        </h3>
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
