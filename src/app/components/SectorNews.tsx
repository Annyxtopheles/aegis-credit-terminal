import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export function SectorNews() {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  const newsCategories = [
    {
      category: 'NOAA SWPC // SOLAR & GEOMAGNETIC ADVISORIES',
      items: [
        { source: 'NOAA SWPC Alert', headline: 'G2 Moderate Geomagnetic Storm Watch issued following Earth-directed M4.8 Halo CME arrival' },
        { source: 'SIDC Royal Observatory', headline: '10.7cm Solar Radio Flux surges to 184 SFU; LEO thermospheric scale height expanding across 500–600 km shells' }
      ]
    },
    {
      category: '18TH SPACE DEFENSE SQUADRON // CATALOG BULLETINS',
      items: [
        { source: '18th SDS Spacetrack', headline: 'High-Interest Conjunction Bulletin: COSMOS-2251 fragment cluster crossing 53.0° inclination shell at 02:14 UTC' },
        { source: 'LeoLabs Radar Net', headline: 'Kwajalein & Kiwi S-Band radars confirm 14 newly cataloged sub-10cm debris fragments from SL-16 R/B breakup' },
        { source: 'EUSST Operations', headline: 'Automated CDM Covariance refinement reduces radial uncertainty on NORAD 34427 by 38%' }
      ]
    },
    {
      category: 'SPACECRAFT PAYLOAD & BUS ANOMALIES',
      items: [
        { source: 'FDO Telemetry Note', headline: 'Star-tracker B blinding transient mitigated on VANGUARD-19 during South Atlantic Anomaly (SAA) transit' }
      ]
    },
    {
      category: 'FCC & ESA ORBITAL SUSTAINABILITY POLICY',
      items: [
        { source: 'FCC Space Bureau', headline: 'Enforcement of 5-year post-mission de-orbit disposal rule tightened for non-geostationary LEO constellations' },
        { source: 'ESA Zero Debris Charter', headline: 'Mandatory collision avoidance maneuver threshold standardized at Pc > 1.0e-4 across European ground networks' },
        { source: 'ITU Radiocommunication', headline: 'Ka-band inter-satellite optical/RF coordination protocols updated for high-density 550 km orbital shells' }
      ]
    }
  ];

  return (
    <div
      className="p-5 md:p-6 rounded-2xl transition-colors duration-300"
      style={{
        backgroundColor: themeColors.bgSecondary,
        border: `1px solid ${themeColors.borderPrimary}`
      }}
    >
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: themeColors.textPrimary, marginBottom: '16px' }} className="md:text-base md:mb-6 font-mono tracking-wide">
        SPACE WEATHER ADVISORIES & ORBITAL BULLETINS
      </h3>

      <div className="space-y-4 md:space-y-6">
        {newsCategories.map((category, catIndex) => (
          <div key={catIndex}>
            <h4
              className="uppercase mb-2 md:mb-3 font-mono"
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: themeColors.accentPrimary,
                letterSpacing: '0.06em'
              }}
            >
              {category.category}
            </h4>
            <div className="space-y-1.5 md:space-y-2">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} style={{ lineHeight: '1.5' }} className="md:leading-relaxed">
                  <span style={{ fontSize: '12px', fontWeight: 600, color: themeColors.textSecondary }} className="md:text-sm font-mono">
                    [{item.source}]
                  </span>{' '}
                  <a
                    href="#telemetry-bulletin"
                    onClick={(e) => e.preventDefault()}
                    className="transition-colors"
                    style={{
                      fontSize: '13px',
                      color: themeColors.accentPrimary,
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = themeColors.accentPrimary;
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = themeColors.accentPrimary;
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    {item.headline}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
