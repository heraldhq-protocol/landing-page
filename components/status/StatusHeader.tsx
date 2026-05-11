"use client";

import { Shield, AlertTriangle, XCircle, Clock } from "lucide-react";

interface Props {
  overallStatus: "operational" | "degraded" | "major_outage";
  lastUpdated: string;
}

const statusConfig = {
  operational: {
    label: "All Systems Operational",
    sublabel: "All systems are functioning normally",
    color: "bg-teal",
    textColor: "text-teal",
    bgColor: "bg-teal/8",
    borderColor: "border-teal/15",
    icon: Shield,
    glowColor: "bg-teal",
    pulseColor: "rgba(0, 200, 150, 0.4)",
  },
  degraded: {
    label: "Degraded Performance",
    sublabel: "Some services are experiencing reduced performance",
    color: "bg-amber",
    textColor: "text-amber",
    bgColor: "bg-amber/8",
    borderColor: "border-amber/15",
    icon: AlertTriangle,
    glowColor: "bg-amber",
    pulseColor: "rgba(251, 191, 36, 0.4)",
  },
  major_outage: {
    label: "Major System Outage",
    sublabel: "Critical services are currently unavailable",
    color: "bg-red",
    textColor: "text-red",
    bgColor: "bg-red/8",
    borderColor: "border-red/15",
    icon: XCircle,
    glowColor: "bg-red",
    pulseColor: "rgba(239, 68, 68, 0.4)",
  },
};

export default function StatusHeader({ overallStatus, lastUpdated }: Props) {
  const config = statusConfig[overallStatus];
  const Icon = config.icon;

  const formatTime = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch {
      return "—";
    }
  };

  return (
    <div
      className={`
        relative overflow-hidden
        rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8
        border ${config.borderColor} ${config.bgColor}
        backdrop-blur-sm
      `}
    >
      <div
        className={`absolute -top-24 -right-24 w-48 h-48 sm:w-64 sm:h-64 ${config.glowColor} rounded-full opacity-10 blur-3xl`}
      />
      <div
        className={`absolute -bottom-12 -left-12 w-32 h-32 sm:w-48 sm:h-48 ${config.glowColor} rounded-full opacity-5 blur-2xl`}
      />

      <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 lg:gap-6">
        <div className="flex items-center gap-4 sm:gap-5">
          <div
            className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-2xl sm:rounded-3xl ${config.bgColor} border ${config.borderColor} flex items-center justify-center shadow-lg`}
          >
            <Icon className={config.textColor} size={28} />
            <div
              className={`absolute inset-0 ${config.pulseColor} rounded-2xl sm:rounded-3xl animate-pulse opacity-30`}
            />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight ${config.textColor}`}>
              {config.label}
            </h1>
            <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-text-muted">
              {config.sublabel}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 sm:ml-auto sm:mr-2">
          <div className="flex items-center gap-2 text-text-muted">
            <Clock size={14} />
            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider hidden xs:inline">Last check</span>
          </div>
          <p className="text-sm sm:text-base lg:text-lg font-semibold text-text-primary tabular-nums font-mono min-w-[70px] sm:min-w-[85px] text-right">
            {formatTime(lastUpdated)}
          </p>
        </div>
      </div>
    </div>
  );
}
