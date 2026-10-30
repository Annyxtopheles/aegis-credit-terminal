export const colors = {
  dark: {
    bgPrimary: '#06080D',       // Deep-space obsidian
    bgSecondary: '#0D131C',     // Radar slate panel surface
    bgTertiary: '#131C29',      // Elevated telemetry container / inputs
    bgZebra: '#090E15',         // Alternating telemetry row
    textPrimary: '#F1F5F9',     // Crisp orbital white
    textSecondary: '#94A3B8',   // Radar cool slate
    textTertiary: '#64748B',    // Muted telemetry label
    borderPrimary: '#1A2636',   // Hairline grid borders
    borderSubtle: '#111924',    // Subtle radar grid divider
    accentPrimary: '#06B6D4',   // Radar cyan for nominal telemetry
    alertRed: '#EF4444',        // Crimson critical collision probability (Pc > 1e-4)
    alertAmber: '#F59E0B',      // Phosphor amber conjunction warning
    alertGreen: '#10B981',      // Nominal orbital status emerald
    chartCyan: '#06B6D4',       // Radar cyan primary trace
    chartAmber: '#F59E0B',      // Phosphor amber drag / covariance
    chartGreen: '#10B981',      // Nominal altitude envelope
    gridLine: '#1A2636',        // Hairline radar grid
    hoverBg: '#131D2B',         // Slate hover state
    tableBg: '#0A0F17',         // Ephemeris ledger surface
    tableHeaderBg: '#101824'    // Ephemeris header surface
  },
  light: {
    bgPrimary: '#F1F5F9',
    bgSecondary: '#FFFFFF',
    bgTertiary: '#E2E8F0',
    bgZebra: '#F8FAFC',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textTertiary: '#64748B',
    borderPrimary: '#CBD5E1',
    borderSubtle: '#E2E8F0',
    accentPrimary: '#0891B2',
    alertRed: '#DC2626',
    alertAmber: '#D97706',
    alertGreen: '#059669',
    chartCyan: '#0891B2',
    chartAmber: '#D97706',
    chartGreen: '#059669',
    gridLine: '#CBD5E1',
    hoverBg: '#E2E8F0',
    tableBg: '#FFFFFF',
    tableHeaderBg: '#F1F5F9'
  }
} as const;

export const ratingBadges = {
  dark: {
    investmentGrade: { bg: 'rgba(16, 185, 129, 0.14)', text: '#10B981', border: 'rgba(16, 185, 129, 0.35)' },
    highYield: { bg: 'rgba(245, 158, 11, 0.14)', text: '#F59E0B', border: 'rgba(245, 158, 11, 0.35)' },
    distressed: { bg: 'rgba(239, 68, 68, 0.16)', text: '#EF4444', border: 'rgba(239, 68, 68, 0.4)' },
    notRated: { bg: 'rgba(6, 182, 212, 0.14)', text: '#06B6D4', border: 'rgba(6, 182, 212, 0.35)' }
  },
  light: {
    investmentGrade: { bg: '#ECFDF5', text: '#047857', border: '#A7F3D0' },
    highYield: { bg: '#FFFBEB', text: '#B45309', border: '#FDE68A' },
    distressed: { bg: '#FEF2F2', text: '#B91C1C', border: '#FECACA' },
    notRated: { bg: '#ECFEFF', text: '#0E7490', border: '#A5F3FC' }
  }
} as const;
