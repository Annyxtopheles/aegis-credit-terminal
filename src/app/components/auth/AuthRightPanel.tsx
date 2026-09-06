import { useEffect, useState } from 'react';
import { Shield, TrendingDown, Bell, Users, Activity } from 'lucide-react';

interface StatCard {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
  icon: React.ReactNode;
  color: string;
  change?: string;
}

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const steps = 50;
    const increment = target / steps;
    const interval = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, interval);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <>{count.toLocaleString()}</>;
}

const statCards: StatCard[] = [
  { label: 'Distressed Debt Tracked', value: '2.1', prefix: '$', suffix: 'T', icon: <TrendingDown className="w-4 h-4" />, color: '#06B6D4', change: '+12% YoY' },
  { label: 'Companies Monitored', value: '500', suffix: '+', icon: <Activity className="w-4 h-4" />, color: '#F59E0B', change: 'Across 24 sectors' },
  { label: 'Institutional Investors', value: '40', suffix: '+', icon: <Users className="w-4 h-4" />, color: '#10B981', change: 'AUM > $500B' },
  { label: 'Covenant Violations Flagged', value: '127', icon: <Bell className="w-4 h-4" />, color: '#DC2626', change: 'Last 90 days' },
];

const features = [
  'Track $2.1T in distressed debt across 500+ companies',
  'Real-time covenant monitoring and holder intelligence',
  'Trusted by 40+ institutional investors worldwide',
  'AI-powered threat detection with sub-second alerts',
];

// Mini sparkline SVG paths (fake data)
const sparklines = [
  'M0,30 L10,25 L20,28 L30,15 L40,20 L50,10 L60,18 L70,8 L80,12',
  'M0,20 L10,22 L20,18 L30,25 L40,15 L50,20 L60,12 L70,18 L80,10',
  'M0,25 L10,20 L20,22 L30,18 L40,25 L50,15 L60,20 L70,12 L80,18',
];

export function AuthRightPanel() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  return (
    <div
      className="relative flex flex-col justify-between p-10 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0F1E35 40%, #1A2332 100%)' }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.06 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#06B6D4" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating sparklines */}
      <div className="absolute top-16 right-8 opacity-10">
        {sparklines.map((path, i) => (
          <svg key={i} width="80" height="40" className="absolute" style={{ top: i * 24, right: i * 12 }}>
            <polyline points={path} fill="none" stroke="#06B6D4" strokeWidth="1.5" />
          </svg>
        ))}
      </div>

      {/* Logo */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 flex items-center justify-center rounded bg-[#06B6D4]/15 border border-[#06B6D4]/50">
            <Shield className="w-6 h-6 text-[#06B6D4]" />
          </div>
          <div>
            <div style={{ color: '#FFFFFF', fontSize: '17px', fontWeight: 700, letterSpacing: '0.06em' }}>
              AEGIS TERMINAL
            </div>
            <div style={{ color: '#06B6D4', fontSize: '10px', letterSpacing: '0.15em', fontWeight: 600 }}>
              INSTITUTIONAL CREDIT SURVEILLANCE
            </div>
          </div>
        </div>

        {/* Main headline */}
        <div style={{ color: '#FFFFFF', fontSize: '28px', fontWeight: 700, lineHeight: 1.3, marginBottom: '12px' }}>
          Terminal-Grade<br />Financial Intelligence
        </div>
        <div style={{ color: '#8B96A5', fontSize: '14px', lineHeight: 1.6, marginBottom: '32px' }}>
          The surveillance platform trusted by the world's leading institutional investors for debt market intelligence.
        </div>

        {/* Features list */}
        <div className="space-y-3 mb-10">
          {features.map((feat, i) => (
            <div
              key={i}
              className="flex items-start gap-3 transition-all duration-500"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateX(0)' : 'translateX(-16px)',
                transitionDelay: `${i * 100 + 200}ms`
              }}
            >
              <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#06B6D4' }} />
              <span style={{ color: '#A8C5DA', fontSize: '13px' }}>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="relative z-10 grid grid-cols-2 gap-3">
        {statCards.map((stat, i) => (
          <div
            key={i}
            className="rounded-lg p-4 transition-all duration-500"
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(16px)',
              transitionDelay: `${i * 120 + 600}ms`
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div style={{ color: stat.color }}>{stat.icon}</div>
              <span style={{ color: '#8B96A5', fontSize: '11px' }}>{stat.label}</span>
            </div>
            <div style={{ color: stat.color, fontSize: '22px', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>
              {stat.prefix}<AnimatedCounter target={parseFloat(stat.value)} />{stat.suffix}
            </div>
            {stat.change && (
              <div style={{ color: '#6B7280', fontSize: '11px', marginTop: '2px' }}>{stat.change}</div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom disclaimer */}
      <div className="relative z-10 mt-6">
        <div style={{ color: '#374151', fontSize: '11px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
          © 2025 Aegis Credit Terminal. Enterprise-grade security. SOC 2 Type II certified.
        </div>
      </div>
    </div>
  );
}
