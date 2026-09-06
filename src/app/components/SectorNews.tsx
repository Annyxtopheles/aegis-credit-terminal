import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';

export function SectorNews() {
  const { theme } = useTheme();
  const themeColors = colors[theme];

  const newsCategories = [
    {
      category: 'REGULATORY',
      items: [
        { source: 'The Guardian', headline: 'Ultra-processed food linked to harm in every major human organ, study finds' },
        { source: 'Food Dive', headline: 'Texas approves law requiring warning labels for food additives' }
      ]
    },
    {
      category: 'SECTOR / REGION TRENDS',
      items: [
        { source: '9Fin', headline: 'Apex Brands Group lowers guidance again amid divestitures— Q3 25 earnings review' },
        { source: 'Food Dive', headline: 'Out of the box: How food and beverage giants are making their packaging shine' },
        { source: 'Debtwire', headline: 'Apex Brands Group focuses on asset sales to deliver amid operational challenges – 2Q25 Credit Report' }
      ]
    },
    {
      category: 'GEOPOLITICAL',
      items: [
        { source: 'The New York Times', headline: 'Mexico Is Now the United States\' Top Buyer' }
      ]
    },
    {
      category: 'POLICY',
      items: [
        { source: 'CNBC', headline: 'Grocery prices to remain high despite Trump tariff changes' },
        { source: 'The Guardian', headline: 'Trump touts cheap groceries ahead of Thanksgiving. The reality is a mixed plate' },
        { source: 'The Hill', headline: 'Trump\'s tariffs not linked to inflation, says Bessent' },
        { source: 'Food Dive', headline: 'US removes tariffs on Brazil coffee, beef' },
        { source: 'USA Today', headline: 'What the latest food tariff exemptions mean for your grocery bill' }
      ]
    }
  ];

  return (
    <div
      className="p-4 md:p-6 transition-colors duration-300"
      style={{
        backgroundColor: theme === 'dark' ? themeColors.bgSecondary : themeColors.bgPrimary,
        border: `1px solid ${themeColors.borderPrimary}`
      }}
    >
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: themeColors.textPrimary, marginBottom: '16px' }} className="md:text-base md:mb-6">
        SECTOR NEWS & COMMENTARY
      </h3>

      <div className="space-y-4 md:space-y-6">
        {newsCategories.map((category, catIndex) => (
          <div key={catIndex}>
            <h4
              className="uppercase mb-2 md:mb-3"
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: themeColors.accentPrimary,
                letterSpacing: '0.05em'
              }}
              >
              {category.category}
            </h4>
            <div className="space-y-1.5 md:space-y-2">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} style={{ lineHeight: '1.5' }} className="md:leading-relaxed">
                  <span style={{ fontSize: '12px', fontWeight: 600, color: themeColors.textSecondary }} className="md:text-sm">
                    {item.source}:
                  </span>{' '}
                  <a
                    href="#"
                    className="transition-colors"
                    style={{
                      fontSize: '13px',
                      color: themeColors.accentPrimary,
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme === 'dark' ? '#06B6D4' : '#0E7490';
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
