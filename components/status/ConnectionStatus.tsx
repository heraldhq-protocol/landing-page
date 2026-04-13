'use client';

import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

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
  onRefresh 
}: Props) {
  return (
    <div className="flex items-center gap-4 text-xs sm:text-sm">
      <div className="flex items-center gap-2">
        {isConnected ? (
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <Wifi className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              Live • {connectionCount} watching
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
            <WifiOff className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-rose-600 dark:text-rose-400 font-medium">
              Disconnected
            </span>
          </div>
        )}
      </div>

      {lastUpdate && (
        <span className="hidden sm:inline text-gray-400 dark:text-gray-500">
          Sync: {new Date(lastUpdate).toLocaleTimeString()}
        </span>
      )}

      <button
        onClick={onRefresh}
        className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors group"
        title="Force refresh"
      >
        <RefreshCw className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
      </button>
    </div>
  );
}
