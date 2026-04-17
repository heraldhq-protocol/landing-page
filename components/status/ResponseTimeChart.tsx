"use client";

interface Props {
  history: Array<{
    timestamp: string;
    responseTime: number;
  }>;
}

export default function ResponseTimeChart({ history }: Props) {
  const displayHistory = history.slice(-40);
  const maxTime = Math.max(...displayHistory.map((h) => h.responseTime), 100);

  const avgLatency =
    displayHistory.length > 0
      ? Math.round(
          displayHistory.reduce((sum, h) => sum + h.responseTime, 0) /
            displayHistory.length
        )
      : 0;

  const getBarColor = (responseTime: number) => {
    if (responseTime < 200) return "bg-purple/80 hover:bg-purple";
    if (responseTime < 500) return "bg-amber/80 hover:bg-amber";
    if (responseTime < 1000) return "bg-orange-500/80 hover:bg-orange-500";
    return "bg-red/80 hover:bg-red";
  };

  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      <div 
        className="relative h-10 sm:h-14 w-full rounded-lg bg-bg-elevated/30 p-1.5 sm:p-2 overflow-hidden"
        style={{ display: "flex", alignItems: "flex-end", gap: "2px" }}
      >
        {displayHistory.map((check, i) => {
          const height = (check.responseTime / maxTime) * 100;
          return (
            <div
              key={i}
              title={`${check.responseTime}ms - ${new Date(check.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`}
              style={{ 
                flex: 1, 
                height: `${Math.max(height, 10)}%`,
                minHeight: "4px"
              }}
              className={`rounded-sm ${getBarColor(check.responseTime)} transition-all duration-300`}
            />
          );
        })}
      </div>
      <div className="flex justify-between items-center px-1 text-[9px] sm:text-[10px]">
        <span className="font-medium text-text-muted/60 uppercase tracking-wider">
          Trend
        </span>
        <span className="text-purple font-bold tabular-nums hidden sm:inline">
          {avgLatency}ms avg
        </span>
        <span className="font-medium text-text-muted/60 tabular-nums">
          {displayHistory[displayHistory.length - 1]?.responseTime || 0}ms
        </span>
      </div>
    </div>
  );
}
