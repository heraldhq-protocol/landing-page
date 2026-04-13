'use client';

interface Props {
  history: Array<{
    timestamp: string;
    responseTime: number;
  }>;
}

export default function ResponseTimeChart({ history }: Props) {
  const displayHistory = history.slice(-50);
  const maxTime = Math.max(...displayHistory.map(h => h.responseTime), 1000);
  
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end gap-1 h-12 w-full group">
        {displayHistory.map((check, i) => {
          const height = (check.responseTime / maxTime) * 100;
          const color = check.responseTime > 1000 ? 'bg-amber-400' : 'bg-blue-500';
          
          return (
            <div
              key={i}
              className={`flex-1 ${color} rounded-sm transition-all duration-300 relative group/bar`}
              style={{ height: `${Math.max(height, 8)}%` }}
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-white text-[10px] rounded opacity-0 group-hover/bar:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10 border border-white/10 shadow-xl">
                {check.responseTime}ms
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-[10px] font-medium text-gray-400 uppercase tracking-widest">
        <span>History</span>
        <span>{history[history.length - 1]?.responseTime || 0}ms Latency</span>
      </div>
    </div>
  );
}
