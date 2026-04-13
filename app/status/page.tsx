'use client';

import { Suspense } from 'react';
import { useWebSocketStatus } from '../../hooks/useWebSocketStatus';
import { WifiOff } from 'lucide-react';
import StatusHeader from '../../components/status/StatusHeader';
import StatusCard from '../../components/status/StatusCard';
import IncidentBanner from '../../components/status/IncidentBanner';
import ConnectionStatus from '../../components/status/ConnectionStatus';

function StatusContent() {
  const { 
    status, 
    isConnected, 
    connectionCount, 
    lastUpdate,
    requestRefresh,
    error 
  } = useWebSocketStatus();

  if (!status && error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in fade-in duration-700">
        <div className="relative">
          <div className="w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center border border-rose-500/20 shadow-2xl shadow-rose-500/10">
            <WifiOff className="w-10 h-10 text-rose-500" />
          </div>
          <div className="absolute inset-0 bg-rose-500/20 blur-2xl rounded-full -z-10 animate-pulse" />
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">System Offline</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed font-medium">
            We are currently unable to establish a secure connection to the Herald Monitoring Node. 
            <span className="block mt-1 opacity-60 text-sm">{error}</span>
          </p>
        </div>
        <button 
          onClick={() => {
            window.location.reload();
          }}
          className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-xl shadow-black/10 active:scale-95 uppercase tracking-widest"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin" />
          <div className="absolute inset-x-0 -bottom-4 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent blur-sm" />
        </div>
        <div className="text-center">
          <p className="text-base font-bold text-gray-900 dark:text-white tracking-tight">Syncing Live Infrastructure</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-[0.2em] font-medium">Authenticating with Herald Node...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <StatusHeader 
          overallStatus={status.overallStatus} 
          lastUpdated={lastUpdate || status.lastUpdated}
        />
      </div>

      <div className="flex items-center justify-between px-2">
        <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Service Infrastructure</h2>
        <ConnectionStatus 
          isConnected={isConnected}
          connectionCount={connectionCount}
          lastUpdate={lastUpdate}
          onRefresh={requestRefresh}
        />
      </div>
      
      {status.activeIncidents > 0 && (
        <IncidentBanner count={status.activeIncidents} />
      )}

      <div className="grid grid-cols-1 gap-4">
        {status.monitors.map((monitor) => (
          <StatusCard 
            key={monitor.id} 
            monitor={monitor}
            isLive={isConnected}
          />
        ))}
      </div>

      <footer className="pt-12 pb-6 text-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
            Full History Retained • 90 Day Retention
          </span>
        </div>
      </footer>
    </div>
  );
}

export default function StatusPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-gray-100">
      {/* Background radial gradient for premium look */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 py-12 sm:py-24 relative z-10">
        <Suspense fallback={<div>Loading status...</div>}>
          <StatusContent />
        </Suspense>
      </div>
    </main>
  );
}
