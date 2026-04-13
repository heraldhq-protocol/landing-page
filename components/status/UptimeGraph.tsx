'use client';

interface Props {
  history: Array<{
    timestamp: string;
    status: string;
  }>;
}

export default function UptimeGraph({ history }: Props) {
  // Ensure we have at least 50 slots for visual consistency
  const totalSlots = 50;
  
  // Flatten or expand history to fit slots
  // If we have fewer than 50, we show what we have
  const displayHistory = history.slice(-totalSlots);
  const padding = totalSlots - displayHistory.length;

  const getBarColor = (status: string) => {
    switch (status) {
      case 'up': return 'bg-emerald-500 hover:bg-emerald-400';
      case 'down': return 'bg-rose-500 hover:bg-rose-400';
      case 'degraded': return 'bg-amber-500 hover:bg-amber-400';
      default: return 'bg-gray-200 dark:bg-gray-800';
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end gap-[2px] h-8 w-full group">
        {Array.from({ length: padding }).map((_, i) => (
          <div
            key={`pad-${i}`}
            className="flex-1 h-full rounded-[1px] bg-gray-100 dark:bg-white/5 opacity-50"
          />
        ))}
        {displayHistory.map((check, i) => (
          <div
            key={i}
            className={`flex-1 h-full rounded-[1px] ${getBarColor(check.status)} transition-all duration-200 relative group/bar`}
          >
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-white text-[10px] rounded opacity-0 group-hover/bar:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10 border border-white/10 shadow-xl">
              {new Date(check.timestamp).toLocaleTimeString()} • {check.status.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] font-medium text-gray-400 uppercase tracking-widest">
        <span>24H Ago</span>
        <span>Current Status</span>
      </div>
    </div>
  );
}
