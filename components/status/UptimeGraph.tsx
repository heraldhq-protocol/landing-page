"use client";

interface Props {
  history: Array<{
    timestamp: string;
    status: string;
  }>;
}

export default function UptimeGraph({ history }: Props) {
  const totalSlots = 40;

  const displayHistory = history.slice(-totalSlots);
  const padding = totalSlots - displayHistory.length;

  const getBarColor = (status: string) => {
    switch (status) {
      case "up":
        return "bg-teal/80 hover:bg-teal";
      case "down":
        return "bg-red/80 hover:bg-red";
      case "degraded":
        return "bg-amber/80 hover:bg-amber";
      default:
        return "bg-bg-border hover:bg-bg-border-hi";
    }
  };

  const getBarHeight = (status: string) => {
    switch (status) {
      case "up":
        return "100%";
      case "down":
        return "100%";
      case "degraded":
        return "60%";
      default:
        return "25%";
    }
  };

  const upCount = displayHistory.filter((h) => h.status === "up").length;
  const uptimeRate = displayHistory.length > 0
    ? ((upCount / displayHistory.length) * 100).toFixed(1)
    : "100.0";

  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      <div 
        className="relative h-10 sm:h-14 w-full rounded-lg bg-bg-elevated/30 p-1.5 sm:p-2 overflow-hidden"
        style={{ display: "flex", alignItems: "flex-end", gap: "2px" }}
      >
        {Array.from({ length: padding }).map((_, i) => (
          <div
            key={`pad-${i}`}
            style={{ flex: 1, height: "100%" }}
            className="rounded-sm bg-bg-elevated/50"
          />
        ))}
        {displayHistory.map((check, i) => (
          <div
            key={i}
            title={`${new Date(check.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })} - ${check.status}`}
            style={{ 
              flex: 1, 
              height: getBarHeight(check.status),
              minHeight: "4px"
            }}
            className={`rounded-sm ${getBarColor(check.status)} transition-all duration-200`}
          />
        ))}
      </div>
      <div className="flex justify-between items-center px-1 text-[9px] sm:text-[10px]">
        <span className="font-medium text-text-muted/60 uppercase tracking-wider">
          24h ago
        </span>
        <span className="text-teal font-bold tabular-nums">{uptimeRate}%</span>
        <span className="font-medium text-text-muted/60 uppercase tracking-wider">
          Now
        </span>
      </div>
    </div>
  );
}
