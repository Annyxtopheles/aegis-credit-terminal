export const colors = {
  dark: {
    bgPrimary: '#0B0C0E',       // True neutral deep obsidian (no blue cast)
    bgSecondary: '#1C2028',     // Card / panel neutral surface (elevated, a little less dark)
    bgTertiary: '#252A36',      // Elevated container / inputs / header
    bgZebra: '#14171E',         // Alternating row
    textPrimary: '#EDEDED',     // Crisp platinum white
    textSecondary: '#9AA0AC',   // Neutral cool grey
    textTertiary: '#636976',    // Muted slate
    borderPrimary: '#2E3544',   // Subtle architectural neutral border
    borderSubtle: '#222733',    // Hairline divider
    accentPrimary: '#EDEDED',   // Monochromatic active state
    alertRed: '#E5484D',        // Crisp crimson breach indicator
    alertAmber: '#E5A93C',      // Warm amber threshold
    alertGreen: '#30A46C',      // Balanced emerald
    chartCyan: '#EDEDED',       // Crisp platinum for primary chart line
    chartAmber: '#E5A93C',      // Amber volume
    chartGreen: '#30A46C',      // Green stock
    gridLine: '#1E222A',        // Subtle grid
    hoverBg: '#181B22',         // Neutral hover
    tableBg: '#13151A',         // Table surface
    tableHeaderBg: '#181B22'    // Table header
  },
  light: {
    bgPrimary: '#F6F7F9',
    bgSecondary: '#FFFFFF',
    bgTertiary: '#EEF0F3',
    bgZebra: '#F9FAFB',
    textPrimary: '#111318',
    textSecondary: '#525866',
    textTertiary: '#868C98',
    borderPrimary: '#E1E4EA',
    borderSubtle: '#ECEEF2',
    accentPrimary: '#111318',
    alertRed: '#B91C1C',
    alertAmber: '#D97706',
    alertGreen: '#16A34A',
    chartCyan: '#111318',
    chartAmber: '#D97706',
    chartGreen: '#16A34A',
    gridLine: '#E1E4EA',
    hoverBg: '#F0F2F5',
    tableBg: '#FFFFFF',
    tableHeaderBg: '#EEF0F3'
  }
} as const;

export const ratingBadges = {
  dark: {
    investmentGrade: { bg: 'rgba(48, 164, 108, 0.15)', text: '#30A46C', border: 'rgba(48, 164, 108, 0.3)' },
    highYield: { bg: 'rgba(229, 169, 60, 0.15)', text: '#E5A93C', border: 'rgba(229, 169, 60, 0.3)' },
    distressed: { bg: 'rgba(229, 72, 77, 0.15)', text: '#E5484D', border: 'rgba(229, 72, 77, 0.35)' },
    notRated: { bg: 'rgba(142, 147, 157, 0.15)', text: '#8E939D', border: 'rgba(142, 147, 157, 0.25)' }
  },
  light: {
    investmentGrade: { bg: '#E8F7EE', text: '#15803D', border: '#B8E6CB' },
    highYield: { bg: '#FEF7E6', text: '#B45309', border: '#FCE2A6' },
    distressed: { bg: '#FDECEF', text: '#B91C1C', border: '#F8B4BD' },
    notRated: { bg: '#F0F2F5', text: '#525866', border: '#D0D5DD' }
  }
} as const;
