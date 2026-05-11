"use client";

import { Suspense } from "react";
import { useWebSocketStatus } from "../../hooks/useWebSocketStatus";
import { WifiOff, RefreshCw, ExternalLink } from "lucide-react";
import StatusHeader from "../../components/status/StatusHeader";
import StatusCard from "../../components/status/StatusCard";
import IncidentBanner from "../../components/status/IncidentBanner";
import ConnectionStatus from "../../components/status/ConnectionStatus";

function StatusContent() {
  const {
    status,
    isConnected,
    connectionCount,
    lastUpdate,
    requestRefresh,
    error,
  } = useWebSocketStatus();

  if (!status && error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] sm:min-h-[60vh] text-center px-4 space-y-6 sm:space-y-8 animate-in fade-in duration-700">
        <div className="relative">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-red/[0.08] rounded-3xl sm:rounded-4xl flex items-center justify-center border border-red/15 shadow-2xl shadow-red/10">
            <WifiOff className="text-red" size={40} />
          </div>
          <div className="absolute inset-0 bg-red/20 blur-3xl rounded-full -z-10 animate-pulse" />
        </div>
        <div className="space-y-2 sm:space-y-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-text-primary tracking-tight">
            System Offline
          </h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-sm mx-auto leading-relaxed">
            Unable to establish a secure connection to the Herald Monitoring Node.
          </p>
          <p className="text-xs sm:text-sm text-red/60 font-medium">{error}</p>
        </div>
        <button
          onClick={() => {
            window.location.reload();
          }}
          className="group px-6 sm:px-8 py-3 sm:py-3.5 bg-teal text-bg-base rounded-2xl font-bold text-sm hover:bg-teal/90 transition-all shadow-lg shadow-teal/20 active:scale-95 flex items-center gap-2"
        >
          <RefreshCw className="group-hover:rotate-180 transition-transform duration-500" size={16} />
          Retry Connection
        </button>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] sm:min-h-[60vh] space-y-5 sm:space-y-6">
        <div className="relative">
          <div className="w-16 h-16 sm:w-20 sm:h-20 border-[3px] border-teal/10 border-t-teal rounded-full animate-spin" />
          <div className="absolute inset-x-0 -bottom-4 sm:-bottom-5 h-1.5 bg-gradient-to-r from-transparent via-teal/30 to-transparent blur-sm" />
        </div>
        <div className="text-center px-4">
          <p className="text-base sm:text-lg font-bold text-text-primary tracking-tight">
            Syncing Live Infrastructure
          </p>
          <p className="text-[10px] sm:text-xs text-text-muted mt-1.5 sm:mt-2 uppercase tracking-[0.15em] sm:tracking-[0.2em]">
            Authenticating with Herald Node...
          </p>
        </div>
      </div>
    );
  }

  const operationalCount = status.monitors.filter(
    (m) => m.currentStatus === "up"
  ).length;
  const totalCount = status.monitors.length;

  return (
    <div className="space-y-6 sm:space-y-8">
      <StatusHeader
        overallStatus={status.overallStatus}
        lastUpdated={lastUpdate || new Date().toISOString()}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-1">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <h2 className="text-[10px] sm:text-xs font-bold text-text-muted uppercase tracking-[0.15em] sm:tracking-[0.2em]">
            Service Infrastructure
          </h2>
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-1.5 rounded-xl bg-bg-surface border border-bg-border/50">
            <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            <span className="text-[10px] sm:text-xs font-medium text-text-secondary">
              <span className="sm:hidden">{operationalCount}/{totalCount}</span>
              <span className="hidden sm:inline">{operationalCount} of {totalCount} Operational</span>
            </span>
          </div>
        </div>
        <div className="self-start sm:self-auto">
          <ConnectionStatus
            isConnected={isConnected}
            connectionCount={connectionCount}
            lastUpdate={lastUpdate}
            onRefresh={requestRefresh}
          />
        </div>
      </div>

      {status.activeIncidents > 0 && (
        <IncidentBanner count={status.activeIncidents} />
      )}

      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {status.monitors.map((monitor) => (
          <StatusCard key={monitor.id} monitor={monitor} isLive={isConnected} />
        ))}
      </div>

      <footer className="pt-8 sm:pt-12 pb-6 sm:pb-8 text-center">
        <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-bg-surface border border-bg-border/50">
          <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
          <span className="text-[10px] sm:text-xs font-medium text-text-muted uppercase tracking-widest">
            <span className="hidden sm:inline">90 Day Retention • Full History</span>
            <span className="sm:hidden">90 Day Retention</span>
          </span>
        </div>
        <div className="mt-4 sm:mt-5 flex items-center justify-center gap-2.5 text-[10px] sm:text-xs text-text-muted">
          <span>Powered by</span>
          <a
            href="https://useherald.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal hover:text-teal/80 transition-colors flex items-center gap-1.5 font-medium"
          >
            Herald Protocol
            <ExternalLink size={12} />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default function StatusPage() {
  return (
    <main className="min-h-screen bg-bg-base text-text-primary">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,200,150,0.04),transparent_50%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-5 lg:px-6 py-10 sm:py-12 lg:py-20 relative z-10">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center text-text-muted text-sm">Loading status...</div>
          </div>
        }>
          <StatusContent />
        </Suspense>
      </div>
    </main>
  );
}
