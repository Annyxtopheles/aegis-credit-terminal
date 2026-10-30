export const colors = {
  dark: {
    bgPrimary: '#0A0B0E',       // Matte Aerospace Stealth Carbon
    bgSecondary: '#111318',     // Radar Console Chassis
    bgTertiary: '#191C24',      // Elevated Telemetry Instrument Bay
    bgZebra: '#0E1015',         // Alternating SGP4 Ephemeris Row
    textPrimary: '#F8FAFC',     // High-Visibility Signal White
    textSecondary: '#9CA3AF',   // Tactical Neutral Slate
    textTertiary: '#6B7280',    // Muted Coordinate Marker
    borderPrimary: '#262936',   // Machined Stealth Bezel
    borderSubtle: '#1C1F2B',    // Micro-Grid Radar Divider
    accentPrimary: '#F59E0B',   // Tactical Phosphor Amber / Solar Gold
    alertRed: '#EF4444',        // Optical Conjunction Crimson (Pc > 1e-4)
    alertAmber: '#F97316',      // Solar Flare Orange Warning
    alertGreen: '#10B981',      // Nominal Vector Emerald
    chartCyan: '#F59E0B',       // Primary Apogee Orbital Trace (Phosphor Amber)
    chartAmber: '#FB923C',      // Geomagnetic Solar Flux Drag Envelope
    chartGreen: '#10B981',      // Nominal Station-Keeping Orbit
    gridLine: '#262936',        // Radar Scope Polar Grid
    hoverBg: '#1E212B',         // Telemetry Console Hover
    tableBg: '#0E1015',         // Ephemeris Ledger Base
    tableHeaderBg: '#161821'    // Ephemeris Header Base
  },
  light: {
    bgPrimary: '#F4F4F6',       // Warm Tactical Daylight Gray
    bgSecondary: '#FFFFFF',     // Crisp Instrument Card Surface
    bgTertiary: '#EAECEF',      // Elevated Telemetry Container
    bgZebra: '#F9FAFB',         // Alternating Ledger Stripe
    textPrimary: '#111318',     // Deep Carbon Black (High Contrast)
    textSecondary: '#4B5563',   // Tactical Slate
    textTertiary: '#6B7280',    // Muted Flight Metadata
    borderPrimary: '#D1D5DB',   // Defined Technical Bezel
    borderSubtle: '#E5E7EB',    // Micro-Divider
    accentPrimary: '#D97706',   // Deep Tactical Amber (High Contrast on White)
    alertRed: '#DC2626',        // High-Contrast Collision Hazard Crimson
    alertAmber: '#EA580C',      // High-Contrast Solar Drag Orange
    alertGreen: '#059669',      // Deep Nominal Orbital Status Emerald
    chartCyan: '#D97706',       // High-Contrast Flight Telemetry Trace
    chartAmber: '#EA580C',      // High-Contrast Drag Envelope
    chartGreen: '#059669',      // High-Contrast Nominal Trace
    gridLine: '#D1D5DB',        // Daytime Grid Line
    hoverBg: '#E5E7EB',         // Daytime Hover
    tableBg: '#FFFFFF',         // Daytime Ledger Surface
    tableHeaderBg: '#F4F4F6'    // Daytime Header Surface
  }
} as const;

export const orbitalStatusBadges = {
  dark: {
    nominal: { bg: 'rgba(16, 185, 129, 0.14)', text: '#10B981', border: 'rgba(16, 185, 129, 0.35)' },
    warning: { bg: 'rgba(249, 115, 22, 0.14)', text: '#F97316', border: 'rgba(249, 115, 22, 0.35)' },
    critical: { bg: 'rgba(239, 68, 68, 0.16)', text: '#EF4444', border: 'rgba(239, 68, 68, 0.4)' },
    maneuver: { bg: 'rgba(245, 158, 11, 0.14)', text: '#F59E0B', border: 'rgba(245, 158, 11, 0.35)' }
  },
  light: {
    nominal: { bg: '#ECFDF5', text: '#047857', border: '#A7F3D0' },
    warning: { bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA' },
    critical: { bg: '#FEF2F2', text: '#B91C1C', border: '#FECACA' },
    maneuver: { bg: '#FFFBEB', text: '#B45309', border: '#FDE68A' }
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
