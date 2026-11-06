import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type StreamMode = 'LIVE' | 'SIMULATED';

interface TelemetryContextType {
  streamMode: StreamMode;
  setStreamMode: (mode: StreamMode) => void;
  toggleStreamMode: () => void;
  isLive: boolean;
  altitudeM: number;
  altitudeDeltaM: number;
  altitudeFormatted: string;
  signalMarginDb: number;
  signalMarginFormatted: string;
  solarFluxSfu: number;
  solarFluxFormatted: string;
  pulseKey: number;
}

const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

export function TelemetryProvider({ children }: { children: ReactNode }) {
  const [streamMode, setStreamMode] = useState<StreamMode>('LIVE');
  const [altitudeM, setAltitudeM] = useState(548420);
  const [altitudeDeltaM, setAltitudeDeltaM] = useState(0);
  const [signalMarginDb, setSignalMarginDb] = useState(9.8);
  const [solarFluxSfu, setSolarFluxSfu] = useState(184.2);
  const [pulseKey, setPulseKey] = useState(0);

  const isLive = streamMode === 'LIVE';

  useEffect(() => {
    if (!isLive) {
      setAltitudeM(548420);
      setAltitudeDeltaM(0);
      setSignalMarginDb(9.8);
      setSolarFluxSfu(184.2);
      return;
    }

    const interval = setInterval(() => {
      // Subtle altitude jitter: ±15m from baseline 548420
      const jitterAlt = Math.round((Math.random() * 30 - 15));
      setAltitudeM(548420 + jitterAlt);
      setAltitudeDeltaM(jitterAlt);

      // Subtle downlink signal margin jitter: ±0.2 dB from baseline 9.8
      const jitterSignal = Math.round((Math.random() * 0.4 - 0.2) * 10) / 10;
      setSignalMarginDb(Math.round((9.8 + jitterSignal) * 10) / 10);

      // Subtle solar flux jitter: ±0.4 SFU from baseline 184.2
      const jitterFlux = Math.round((Math.random() * 0.8 - 0.4) * 10) / 10;
      setSolarFluxSfu(Math.round((184.2 + jitterFlux) * 10) / 10);

      setPulseKey(k => (k + 1) % 1000000);
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive]);

  const toggleStreamMode = () => {
    setStreamMode(prev => (prev === 'LIVE' ? 'SIMULATED' : 'LIVE'));
  };

  const altitudeFormatted = `${altitudeM.toLocaleString()} m`;
  const signalMarginFormatted = `+${signalMarginDb.toFixed(1)} dB`;
  const solarFluxFormatted = `${solarFluxSfu.toFixed(1)} SFU`;

  return (
    <TelemetryContext.Provider
      value={{
        streamMode,
        setStreamMode,
        toggleStreamMode,
        isLive,
        altitudeM,
        altitudeDeltaM,
        altitudeFormatted,
        signalMarginDb,
        signalMarginFormatted,
        solarFluxSfu,
        solarFluxFormatted,
        pulseKey,
      }}
    >
      {children}
    </TelemetryContext.Provider>
  );
}

export function useTelemetry() {
  const context = useContext(TelemetryContext);
  if (!context) {
    throw new Error('useTelemetry must be used within a TelemetryProvider');
  }
  return context;
}
