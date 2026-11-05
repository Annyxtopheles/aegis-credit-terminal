import { Radio, ExternalLink, Sun, Shield, AlertTriangle, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export function SectorNews() {
  const { theme } = useTheme();
  const tc = colors[theme];

  const newsCategories = [
    {
      category: 'NOAA SWPC // Solar & Geomagnetic Advisories',
      icon: Sun,
      items: [
        {
          source: 'NOAA SWPC Alert',
          time: '14m ago',
          headline: 'G2 Moderate Geomagnetic Storm Watch issued following Earth-directed M4.8 Halo CME arrival',
          tag: 'Solar Storm'
        },
        {
          source: 'SIDC Royal Observatory',
          time: '42m ago',
          headline: '10.7cm Solar Radio Flux surges to 184 SFU; LEO thermospheric scale height expanding across 500–600 km shells',
          tag: 'Atmospheric Drag'
        }
      ]
    },
    {
      category: '18th Space Defense Squadron // Catalog Bulletins',
      icon: Shield,
      items: [
        {
          source: '18th SDS Spacetrack',
          time: '1h ago',
          headline: 'High-Interest Conjunction Bulletin: COSMOS-2251 fragment cluster crossing 53.0° inclination shell at 02:14 UTC',
          tag: 'Critical Conjunction'
        },
        {
          source: 'LeoLabs Radar Net',
          time: '2h ago',
          headline: 'Kwajalein & Kiwi S-Band radars confirm 14 newly cataloged sub-10cm debris fragments from SL-16 R/B breakup',
          tag: 'Debris Tracking'
        },
        {
          source: 'EUSST Operations',
          time: '3h ago',
          headline: 'Automated CDM Covariance refinement reduces radial uncertainty on NORAD 34427 by 38%',
          tag: 'Covariance Refinement'
        }
      ]
    },
    {
      category: 'FCC & ESA Orbital Sustainability Directives',
      icon: FileText,
      items: [
        {
          source: 'FCC Space Bureau',
          time: '5h ago',
          headline: 'Enforcement of 5-year post-mission de-orbit disposal rule tightened for non-geostationary LEO constellations',
          tag: 'Regulation'
        },
        {
          source: 'ESA Zero Debris Charter',
          time: '1d ago',
          headline: 'Mandatory collision avoidance maneuver threshold standardized at Pc > 1.0e-4 across European ground networks',
          tag: 'SLA Policy'
        }
      ]
    }
  ];

  return (
    <div
      className="p-6 rounded-2xl transition-colors duration-300"
      style={{
        backgroundColor: tc.bgSecondary,
        border: `1px solid ${tc.borderPrimary}`
      }}
    >
      <div className="flex items-center justify-between pb-4 mb-5 border-b" style={{ borderColor: tc.borderPrimary }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[16px] font-semibold tracking-tight text-zinc-100">
              Space Weather Advisories & Orbital Bulletins
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Live intelligence feeds from NOAA SWPC, 18th SDS Space-Track, and ESA networks
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          7 New Bulletins
        </span>
      </div>

      <div className="space-y-6">
        {newsCategories.map((category, catIndex) => {
          const CategoryIcon = category.icon;
          return (
            <div key={catIndex} className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                <CategoryIcon className="w-3.5 h-3.5 text-zinc-400" />
                <span>{category.category}</span>
              </div>
              <div className="space-y-2.5">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="p-4 rounded-xl flex flex-col justify-between transition-all duration-200 hover:border-zinc-700/60"
                    style={{
                      backgroundColor: tc.bgTertiary,
                      border: `1px solid ${tc.borderPrimary}`
                    }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-indigo-400">
                          {item.source}
                        </span>
                        <span className="text-[11px] text-zinc-500">• {item.time}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/50">
                        {item.tag}
                      </span>
                    </div>
                    <a
                      href="#telemetry-bulletin"
                      onClick={(e) => e.preventDefault()}
                      className="text-xs font-medium text-zinc-200 hover:text-indigo-300 leading-relaxed transition-colors flex items-center justify-between group"
                    >
                      <span>{item.headline}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0 text-indigo-400" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
