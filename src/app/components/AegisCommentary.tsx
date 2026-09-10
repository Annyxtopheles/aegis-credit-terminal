import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

interface AegisCommentaryProps {
  content?: string[];
}

const DEFAULT_CONTENT = [
  "Apex Brands Group continues to navigate elevated leverage as it executes on its divestiture strategy, with the pending Verdant Harvest sale expected to significantly reduce debt.",
  "The company has secured covenant waivers through Q2'26, providing near-term breathing room as management works to close the transaction.",
  "Lender sentiment remains cautiously supportive given the strategic rationale of the sale and management's track record, though ongoing monitoring of covenant compliance and operational performance is critical.",
];

export function AegisCommentary({ content = DEFAULT_CONTENT }: AegisCommentaryProps) {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  return (
    <div
      className="p-4 md:p-5 transition-colors duration-300 rounded-sm"
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(6, 182, 212, 0.06)' : 'rgba(8, 145, 178, 0.05)',
        border: `1px solid ${theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(8, 145, 178, 0.2)'}`,
        borderLeft: '3px solid #06B6D4'
      }}
    >
      <h4 style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', color: '#06B6D4', marginBottom: '12px' }} className="md:text-sm uppercase font-mono">
        AEGIS INTELLIGENCE COMMENTARY
      </h4>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} className="md:gap-3.5">
        {content.map((item, index) => (
          <li
            key={index}
            className="flex gap-2 md:gap-3"
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: themeColors.textPrimary
            }}
          >
            <span style={{ color: '#06B6D4', flexShrink: 0 }}>•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AegisCommentary;
