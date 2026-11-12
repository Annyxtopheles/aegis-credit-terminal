export const colors = {
  dark: {
    bgPrimary: '#16171A',       // Clean Matte Dark Canvas (Tempo reference)
    bgSecondary: '#1F2024',     // Smooth Charcoal Card Surface
    bgTertiary: '#282A2F',      // Elevated Pill / Control Surface
    bgZebra: '#1B1C20',         // Subtle Table Row Surface
    tableBg: '#1F2024',         // Table Surface
    tableHeaderBg: '#25272C',   // Table Header Surface
    hoverBg: '#282A2F',         // Row Hover Surface
    textPrimary: '#F4F4F5',     // Crisp White
    textSecondary: '#A1A1AA',   // High-Legibility Muted Slate
    textTertiary: '#8E95A2',    // Readable Label Grey
    borderPrimary: '#2A2C32',   // Clean Card Border
    borderSubtle: '#23252A',    // Subtle Divider
    gridLine: '#2A2C32',        // Chart Grid Hairline
    accentPrimary: '#818CF8',   // Modern Indigo / Violet Accent
    alertRed: '#F87171',        // Soft Coral Red
    alertAmber: '#FBBF24',      // Soft Amber
    alertGreen: '#4ADE80',      // Soft Emerald Green
    chartCyan: '#6A75A1',       // Muted Steel Indigo Chart Fill
    chartSlate: '#63718E',      // Muted Slate Blue Chart Fill
    chartTeal: '#527D78',       // Muted Sage Teal Chart Fill
    chartPlum: '#786588',       // Muted Mauve Plum Chart Fill
    chartAmber: '#B08A54',      // Muted Warm Ochre Chart Trace
    chartDanger: '#B8656A',     // Muted Dusty Crimson Chart Fill
    chartSuccess: '#568572',    // Muted Eucalyptus Sage Chart Fill
  },
  light: {
    bgPrimary: '#F4F5F7',
    bgSecondary: '#FFFFFF',
    bgTertiary: '#ECEEF2',
    bgZebra: '#F9FAFB',
    tableBg: '#FFFFFF',
    tableHeaderBg: '#F4F5F7',
    hoverBg: '#F3F4F6',
    textPrimary: '#111827',
    textSecondary: '#4B5563',
    textTertiary: '#6B7280',
    borderPrimary: '#E5E7EB',
    borderSubtle: '#F3F4F6',
    gridLine: '#E5E7EB',
    accentPrimary: '#4F46E5',
    alertRed: '#DC2626',
    alertAmber: '#B45309',
    alertGreen: '#15803D',
    chartCyan: '#5C668C',       // Muted Steel Indigo Chart Fill
    chartSlate: '#55657E',      // Muted Slate Blue Chart Fill
    chartTeal: '#4A6D7C',       // Muted Cadet Teal Chart Fill
    chartPlum: '#6D5B7B',       // Muted Dusty Plum Chart Fill
    chartAmber: '#947244',      // Muted Warm Ochre Chart Trace
    chartDanger: '#A8585D',     // Muted Terracotta Rose Chart Fill
    chartSuccess: '#4E7A67',    // Muted Sage Green Chart Fill
  }
} as const;

export const statusTones = {
  dark: {
    rose: { bg: 'rgba(244, 63, 94, 0.12)', text: '#FB7185', border: 'rgba(244, 63, 94, 0.25)' },
    amber: { bg: 'rgba(245, 158, 11, 0.12)', text: '#FBBF24', border: 'rgba(245, 158, 11, 0.25)' },
    emerald: { bg: 'rgba(16, 185, 129, 0.12)', text: '#34D399', border: 'rgba(16, 185, 129, 0.25)' },
    indigo: { bg: 'rgba(99, 102, 241, 0.14)', text: '#818CF8', border: 'rgba(99, 102, 241, 0.28)' },
    cyan: { bg: 'rgba(6, 182, 212, 0.12)', text: '#22D3EE', border: 'rgba(6, 182, 212, 0.26)' },
    neutral: { bg: '#282A2F', text: '#D4D4D8', border: '#3F3F46' },
  },
  light: {
    rose: { bg: '#FEF2F2', text: '#B91C1C', border: '#FECACA' },
    amber: { bg: '#FFFBEB', text: '#B45309', border: '#FDE68A' },
    emerald: { bg: '#ECFDF5', text: '#047857', border: '#A7F3D0' },
    indigo: { bg: '#EEF2FF', text: '#4338CA', border: '#C7D2FE' },
    cyan: { bg: '#ECFEFF', text: '#0E7490', border: '#A5F3FC' },
    neutral: { bg: '#E5E7EB', text: '#374151', border: '#D1D5DB' },
  }
} as const;

export const orbitalStatusBadges = {
  dark: {
    nominal: { bg: 'rgba(34, 197, 94, 0.16)', text: '#4ADE80', border: 'rgba(34, 197, 94, 0.25)' },
    maneuver: { bg: 'rgba(99, 102, 241, 0.18)', text: '#818CF8', border: 'rgba(99, 102, 241, 0.28)' },
    warning: { bg: 'rgba(245, 158, 11, 0.16)', text: '#FBBF24', border: 'rgba(245, 158, 11, 0.25)' },
    critical: { bg: 'rgba(239, 68, 68, 0.16)', text: '#F87171', border: 'rgba(239, 68, 68, 0.25)' },
  },
  light: {
    nominal: { bg: '#DCFCE7', text: '#15803D', border: '#BBF7D0' },
    maneuver: { bg: '#E0E7FF', text: '#4338CA', border: '#C7D2FE' },
    warning: { bg: '#FEF3C7', text: '#B45309', border: '#FDE68A' },
    critical: { bg: '#FEE2E2', text: '#B91C1C', border: '#FECACA' },
  }
} as const;

export const ratingBadges = orbitalStatusBadges;
