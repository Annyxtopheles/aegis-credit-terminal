export const colors = {
  dark: {
    bgPrimary: '#030508',       // Deep-space cosmic vacuum
    bgSecondary: '#080D16',     // Aerospace carbon console chassis
    bgTertiary: '#0F1726',      // Elevated telemetry instrument bay
    bgZebra: '#05080E',         // Alternating SGP4 ephemeris vector stripe
    textPrimary: '#F8FAFC',     // High-visibility optical telemetry white
    textSecondary: '#8B9BB4',   // Ionized starlight cool slate
    textTertiary: '#50637F',    // Deep-space coordinate marker
    borderPrimary: '#16233B',   // Laser-machined HUD hairline border
    borderSubtle: '#0D1728',    // Micro-grid radar divider
    accentPrimary: '#00F0FF',   // Hyper-luminescent ion pulse cyan
    alertRed: '#FF2A5F',        // Optical conjunction crimson (Pc > 1e-4)
    alertAmber: '#FFB020',      // Solar radiation & drag phosphor gold
    alertGreen: '#00E676',      // Radar vector nominal emerald
    chartCyan: '#00F0FF',       // Primary apogee orbital trace
    chartAmber: '#FFB020',      // Geomagnetic solar flux drag envelope
    chartGreen: '#00E676',      // Nominal station-keeping orbit
    gridLine: '#16233B',        // Radar scope polar grid
    hoverBg: '#121D30',         // Telemetry console hover
    tableBg: '#060B12',         // Ephemeris ledger base
    tableHeaderBg: '#0B1320'    // Ephemeris header base
  },
  light: {
    bgPrimary: '#F1F4F9',       // Clean aerodynamic flight-deck grey
    bgSecondary: '#FFFFFF',     // Crisp instrument card surface
    bgTertiary: '#E4EAF2',      // Elevated telemetry container
    bgZebra: '#F8FAFC',         // Alternating ledger stripe
    textPrimary: '#0A0F1D',     // Deep space carbon black (high contrast)
    textSecondary: '#3E4D65',   // Aerospace slate
    textTertiary: '#64748B',    // Muted flight metadata
    borderPrimary: '#C5D2E0',   // Defined technical bezel
    borderSubtle: '#E2E8F0',    // Micro-divider
    accentPrimary: '#007799',   // Deep ion cobalt (high contrast against white)
    alertRed: '#D61F48',        // High-contrast collision hazard crimson
    alertAmber: '#C97A00',      // High-contrast solar drag warning
    alertGreen: '#059669',      // Deep nominal orbital status emerald
    chartCyan: '#007799',       // High-contrast flight telemetry trace
    chartAmber: '#C97A00',      // High-contrast drag envelope
    chartGreen: '#059669',      // High-contrast nominal trace
    gridLine: '#C5D2E0',        // Daytime grid line
    hoverBg: '#E6EDF6',         // Daytime hover
    tableBg: '#FFFFFF',         // Daytime ledger surface
    tableHeaderBg: '#F1F4F9'    // Daytime header surface
  }
} as const;

export const orbitalStatusBadges = {
  dark: {
    nominal: { bg: 'rgba(0, 230, 118, 0.12)', text: '#00E676', border: 'rgba(0, 230, 118, 0.35)' },
    warning: { bg: 'rgba(255, 176, 32, 0.12)', text: '#FFB020', border: 'rgba(255, 176, 32, 0.35)' },
    critical: { bg: 'rgba(255, 42, 95, 0.15)', text: '#FF2A5F', border: 'rgba(255, 42, 95, 0.4)' },
    maneuver: { bg: 'rgba(0, 240, 255, 0.12)', text: '#00F0FF', border: 'rgba(0, 240, 255, 0.35)' }
  },
  light: {
    nominal: { bg: '#ECFDF5', text: '#047857', border: '#A7F3D0' },
    warning: { bg: '#FFFBEB', text: '#B45309', border: '#FDE68A' },
    critical: { bg: '#FEF2F2', text: '#B91C1C', border: '#FECACA' },
    maneuver: { bg: '#F0F9FF', text: '#0284C7', border: '#BAE6FD' }
  }
} as const;

// Backward-compatible alias for existing components
export const ratingBadges = {
  dark: {
    investmentGrade: orbitalStatusBadges.dark.nominal,
    highYield: orbitalStatusBadges.dark.warning,
    distressed: orbitalStatusBadges.dark.critical,
    notRated: orbitalStatusBadges.dark.maneuver
  },
  light: {
    investmentGrade: orbitalStatusBadges.light.nominal,
    highYield: orbitalStatusBadges.light.warning,
    distressed: orbitalStatusBadges.light.critical,
    notRated: orbitalStatusBadges.light.maneuver
  }
} as const;
