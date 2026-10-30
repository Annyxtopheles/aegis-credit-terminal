import { useEffect, useState } from 'react';
import { Radar, Radio, ShieldAlert, Satellite, Zap } from 'lucide-react';

interface StatCard {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
  icon: React.ReactNode;
  color: string;
  subtext?: string;
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
  { label: 'Tracked LEO Objects', value: '28412', suffix: '+', icon: <Radar className="w-4 h-4" />, color: '#F59E0B', subtext: 'USSPACECOM & ESA SSA Ingest' },
  { label: 'Vanguard Shell-1 Status', value: '48', suffix: '/48', icon: <Satellite className="w-4 h-4" />, color: '#10B981', subtext: '100% Nominal Telemetry' },
  { label: 'Automated CAM SLA', value: '180', prefix: '< ', suffix: 's', icon: <Zap className="w-4 h-4" />, color: '#F97316', subtext: 'Sub-second Thruster Burn Arming' },
  { label: 'Conjunction Threshold', value: '1e-4', icon: <ShieldAlert className="w-4 h-4" />, color: '#EF4444', subtext: 'B-Plane Collision Probability' },
];

const features = [
  'Real-time SGP4 & Covariance ephemeris propagation at 100 Hz',
  'Automated Xenon Hall-effect collision avoidance burns (CAM)',
  'Direct downlink feeds from Svalbard, Kwajalein, & Punta Arenas',
  'Solar geomagnetic storm (SWPC F10.7) atmospheric drag warnings',
];

export function AuthRightPanel() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  return (
    <div
      className="relative flex flex-col justify-between p-10 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 85% 15%, #1D1A12 0%, #111318 55%, #0A0B0E 100%)',
        borderLeft: '1px solid #262936'
      }}
    >
      {/* Precision Polar Radar Background Rings */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <circle cx="85%" cy="30%" r="90" fill="none" stroke="#F59E0B" strokeWidth="0.75" strokeDasharray="4 4" />
          <circle cx="85%" cy="30%" r="180" fill="none" stroke="#F59E0B" strokeWidth="0.75" />
          <circle cx="85%" cy="30%" r="270" fill="none" stroke="#262936" strokeWidth="0.75" />
          <line x1="85%" y1="0%" x2="85%" y2="60%" stroke="#262936" strokeWidth="0.75" />
          <line x1="50%" y1="30%" x2="100%" y2="30%" stroke="#262936" strokeWidth="0.75" />
        </svg>
      </div>

      {/* Top Brand Header */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-sm"
            style={{
              backgroundColor: 'rgba(245, 158, 11, 0.14)',
              border: '1px solid rgba(245, 158, 11, 0.45)'
            }}
          >
            <Radar className="w-5 h-5" style={{ color: '#F59E0B' }} />
          </div>
          <div>
            <div className="text-white text-[17px] font-bold tracking-[0.14em] font-heading">
              KESSLER SSA
            </div>
            <div className="text-[10px] tracking-[0.2em] font-semibold font-mono" style={{ color: '#F59E0B' }}>
              VANGUARD ORBITAL FLIGHT COMMAND
            </div>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-white text-3xl font-extrabold leading-snug mb-3 font-heading tracking-tight">
          Space Situational<br />Awareness Command
        </div>
        <div className="text-[#9CA3AF] text-sm leading-relaxed mb-8 max-w-lg">
          Institutional-grade orbital mechanics and debris conjunction screening terminal deployed for Low-Earth Orbit constellation flight directors.
        </div>

        {/* Tactical SSA Features */}
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
              <Radio className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#F59E0B' }} />
              <span className="text-[#D1D5DB] text-xs font-mono">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Telemetry Metric Cards */}
      <div className="relative z-10 grid grid-cols-2 gap-3">
        {statCards.map((stat, i) => (
          <div
            key={i}
            className="rounded p-3.5 transition-all duration-500"
            style={{
              backgroundColor: '#111318',
              border: '1px solid #262936',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(16px)',
              transitionDelay: `${i * 120 + 500}ms`
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div style={{ color: stat.color }}>{stat.icon}</div>
              <span className="text-[#9CA3AF] text-[11px] font-mono">{stat.label}</span>
            </div>
            <div className="text-xl font-bold font-mono" style={{ color: stat.color }}>
              {stat.value === '1e-4' ? (
                'Pc > 10⁻⁴'
              ) : (
                <>
                  {stat.prefix}
                  <AnimatedCounter target={parseFloat(stat.value)} />
                  {stat.suffix}
                </>
              )}
            </div>
            {stat.subtext && (
              <div className="text-[#6B7280] text-[10px] font-mono mt-1">{stat.subtext}</div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Compliance & Ground Link Notice */}
      <div className="relative z-10 mt-6">
        <div className="text-[#6B7280] text-[10px] font-mono border-t pt-4" style={{ borderColor: '#262936' }}>
          © 2026 KESSLER Orbital SSA // Vanguard Constellation Dynamics. CCSDS & DoD 18th SDS Ingest.
        </div>
      </div>
    </div>
  );
}
