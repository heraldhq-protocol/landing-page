"use client";

import { Wifi, WifiOff, RefreshCw } from "lucide-react";

interface Props {
  isConnected: boolean;
  connectionCount: number;
  lastUpdate: string | null;
  onRefresh: () => void;
}

export default function ConnectionStatus({
  isConnected,
  connectionCount,
  lastUpdate,
  onRefresh,
}: Props) {
  const formatTime = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "—";
    }
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
      <div className="flex items-center gap-1.5 sm:gap-2">
        {isConnected ? (
          <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-teal/10 border border-teal/15">
            <div className="relative flex items-center justify-center">
              <Wifi className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal" />
              <div className="absolute inset-0 text-teal animate-ping opacity-40">
                <Wifi className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <span className="text-teal font-semibold hidden sm:inline">Live</span>
            <span className="text-teal font-semibold sm:hidden">L</span>
            {connectionCount > 0 && (
              <span className="text-teal/60 hidden lg:inline ml-1">
                • {connectionCount} watching
              </span>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-red/10 border border-red/15">
            <WifiOff className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red" />
            <span className="text-red font-semibold hidden sm:inline">Disconnected</span>
            <span className="text-red font-semibold sm:hidden">Disc</span>
          </div>
        )}
      </div>

      {lastUpdate && (
        <div className="hidden md:flex items-center gap-1.5 text-text-muted/60">
          <span className="text-[9px] uppercase tracking-wider">Sync</span>
          <span className="font-medium text-text-muted tabular-nums">
            {formatTime(lastUpdate)}
          </span>
        </div>
      )}

      <button
        onClick={onRefresh}
        className="p-1.5 sm:p-2 hover:bg-bg-surface rounded-xl transition-all group disabled:opacity-40 disabled:cursor-not-allowed"
        title="Force refresh"
        disabled={!isConnected}
      >
        <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-muted/50 group-hover:text-teal transition-colors" />
      </button>
    </div>
  );
}
