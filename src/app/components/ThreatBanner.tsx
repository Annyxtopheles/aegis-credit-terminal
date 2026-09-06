export function ThreatBanner() {
  return (
    <div
      className="h-8 flex items-center justify-between px-3 md:px-4 border rounded-sm transition-colors overflow-hidden"
      style={{
        backgroundColor: '#161113',
        borderColor: 'rgba(229, 72, 77, 0.35)'
      }}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="w-2 h-2 rounded-full bg-[#E5484D] animate-pulse flex-shrink-0" />
        <span
          className="uppercase tracking-[0.08em] font-mono text-[10px] md:text-[11px] font-bold truncate"
          style={{ color: '#E5484D' }}
        >
          DIRECTIVE: <span className="hidden sm:inline font-normal text-[#EDEDED]">CRITICAL TO MAINTAIN STAKEHOLDER SUPPORT AMID DIVESTITURE PLAN</span>
          <span className="sm:hidden font-normal text-[#EDEDED]">MAINTAIN STAKEHOLDER SUPPORT</span>
        </span>
      </div>
      <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
        <span className="font-mono text-[9px] text-[#8E939D] uppercase tracking-wider">
          STATUS: ACTIVE COVENANT BREACH (2)
        </span>
      </div>
    </div>
  );
}
