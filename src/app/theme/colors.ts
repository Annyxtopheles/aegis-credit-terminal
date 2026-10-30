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
    textSecondary: '#9CA3AF',   // Soft Muted Slate
    textTertiary: '#6B7280',    // Subtle Label Grey
    borderPrimary: '#2A2C32',   // Clean Card Border
    borderSubtle: '#23252A',    // Subtle Divider
    gridLine: '#2A2C32',        // Chart Grid Hairline
    accentPrimary: '#818CF8',   // Modern Indigo / Violet Accent
    alertRed: '#F87171',        // Soft Coral Red
    alertAmber: '#FBBF24',      // Soft Amber
    alertGreen: '#4ADE80',      // Soft Emerald Green
    chartCyan: '#818CF8',       // Primary Indigo Chart Trace
    chartAmber: '#3B82F6',      // Secondary Blue Chart Trace
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
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    borderPrimary: '#E5E7EB',
    borderSubtle: '#F3F4F6',
    gridLine: '#E5E7EB',
    accentPrimary: '#6366F1',
    alertRed: '#EF4444',
    alertAmber: '#F59E0B',
    alertGreen: '#10B981',
    chartCyan: '#6366F1',
    chartAmber: '#3B82F6',
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
