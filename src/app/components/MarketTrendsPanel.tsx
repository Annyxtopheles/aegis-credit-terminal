import { Wind, Crosshair, Network } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { colors, statusTones } from '../theme/colors';

export function MarketTrendsPanel() {
  const { theme } = useTheme();
  const tc = colors[theme];
  const tones = statusTones[theme];

  const protocols = [
    {
      icon: Wind,
      title: 'Automated Differential Drag Control',
      badge: 'Zero Propellant',
      tone: tones.emerald,
      description: 'Pitching solar arrays to +42° high-drag profile during perigee transits enables passive in-track phasing adjustments without depleting critical Xenon reserves.'
    },
    {
      icon: Crosshair,
      title: 'Multi-Sensor Covariance Fusion',
      badge: '3σ Shrinkage',
      tone: tones.indigo,
      description: 'Combining 18th SDS UHF radar tracks with commercial S-band phased-array observations shrinks 3σ in-track position ellipsoids from ±950m to ±180m at T-12 hours.'
    },
    {
      icon: Network,
      title: 'Optical Inter-Satellite Link (OISL) Relay',
      badge: '<180ms Latency',
      tone: tones.cyan,
      description: 'Autonomous cross-link handoffs route Emergency Conjunction Data Messages (CDMs) across Plane A and Plane B instantaneously without waiting for ground station AOS.'
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
        <div>
          <h3 className="text-[16px] font-semibold tracking-tight" style={{ color: tc.textPrimary }}>
            Autonomous CAM & Covariance Protocols
          </h3>
          <p className="text-xs mt-0.5" style={{ color: tc.textSecondary }}>
            Three-stage automated conjunction mitigation policies governing the Vanguard 550 km LEO shell
          </p>
        </div>
        <span
          className="px-3 py-1 rounded-full text-xs font-medium border shrink-0"
          style={{
            backgroundColor: tones.emerald.bg,
            color: tones.emerald.text,
            borderColor: tones.emerald.border
          }}
        >
          Autopilot Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {protocols.map((protocol, index) => {
          const Icon = protocol.icon;
          return (
            <div
              key={index}
              className="p-5 rounded-xl flex flex-col justify-between transition-all duration-200"
              style={{
                backgroundColor: tc.bgTertiary,
                border: `1px solid ${tc.borderPrimary}`
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: tc.bgSecondary,
                      color: tc.accentPrimary,
                      border: `1px solid ${tc.borderPrimary}`
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium border"
                    style={{
                      backgroundColor: protocol.tone.bg,
                      color: protocol.tone.text,
                      borderColor: protocol.tone.border
                    }}
                  >
                    {protocol.badge}
                  </span>
                </div>
                <h4 className="text-sm font-semibold tracking-tight mb-2" style={{ color: tc.textPrimary }}>
                  {protocol.title}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: tc.textSecondary }}>
                  {protocol.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
