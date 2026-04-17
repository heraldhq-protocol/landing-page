"use client";

import { useState } from "react";
import { ChevronDown, Globe, Zap, Clock, Server, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { MonitorStatus } from "../../app/status/types";
import UptimeGraph from "./UptimeGraph";
import ResponseTimeChart from "./ResponseTimeChart";

interface Props {
  monitor: MonitorStatus;
  isLive?: boolean;
}

const statusConfig = {
  up: {
    color: "bg-teal",
    textColor: "text-teal",
    bgColor: "bg-teal/10",
    borderColor: "border-teal/20",
    label: "Operational",
    icon: TrendingUp,
  },
  degraded: {
    color: "bg-amber",
    textColor: "text-amber",
    bgColor: "bg-amber/10",
    borderColor: "border-amber/20",
    label: "Degraded",
    icon: Minus,
  },
  down: {
    color: "bg-red",
    textColor: "text-red",
    bgColor: "bg-red/10",
    borderColor: "border-red/20",
    label: "Down",
    icon: TrendingDown,
  },
};

export default function StatusCard({ monitor, isLive = false }: Props) {
  const [expanded, setExpanded] = useState(false);

  const config = statusConfig[monitor.currentStatus];
  const StatusIcon = config.icon;

  const uptimeColor = monitor.uptimePercentage >= 99.9
    ? "text-teal"
    : monitor.uptimePercentage >= 99
    ? "text-amber"
    : "text-red";

  const latencyColor = monitor.averageResponseTime < 200
    ? "text-teal"
    : monitor.averageResponseTime < 500
    ? "text-amber"
    : "text-red";

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  return (
    <div
      className={`
        group relative overflow-hidden
        bg-bg-surface rounded-2xl sm:rounded-3xl 
        border border-bg-border/50
        transition-all duration-300 ease-out
        hover:border-bg-border hover:shadow-xl hover:shadow-black/5
        ${monitor.currentStatus === "down" ? "ring-1 ring-red/20" : ""}
      `}
    >
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${config.color} opacity-60 group-hover:opacity-80 transition-opacity`}
      />

      <button
        className="w-full p-4 sm:p-5 lg:p-6 flex items-center justify-between gap-4 text-left hover:bg-bg-elevated/30 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          <div className="relative shrink-0">
            <div
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full ${config.color} shadow-lg`}
            />
            {isLive && monitor.currentStatus === "up" && (
              <>
                <div className="absolute inset-0 bg-teal rounded-full animate-ping opacity-50" />
              </>
            )}
            {monitor.currentStatus === "down" && (
              <div className="absolute inset-0 bg-red rounded-full animate-pulse opacity-50" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <h3 className="font-bold text-text-primary text-sm sm:text-base lg:text-lg tracking-tight truncate">
                {monitor.name}
              </h3>
              <span
                className={`
                  inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider border
                  ${config.bgColor} ${config.textColor} ${config.borderColor}
                `}
              >
                <StatusIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                {config.label}
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-text-muted flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
              <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span className="truncate">{getDomain(monitor.url)}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 shrink-0">
          <div className="hidden sm:flex items-center gap-6 lg:gap-8">
            <div className="text-right min-w-[65px] lg:min-w-[75px]">
              <p className={`text-base lg:text-lg font-black tabular-nums ${uptimeColor}`}>
                {monitor.uptimePercentage.toFixed(2)}%
              </p>
              <p className="text-[9px] lg:text-[10px] font-bold text-text-muted uppercase tracking-widest">
                Uptime
              </p>
            </div>

            <div className="w-px h-8 lg:h-10 bg-bg-border/50" />

            <div className="text-right min-w-[65px] lg:min-w-[75px]">
              <p className={`text-base lg:text-lg font-black tabular-nums ${latencyColor}`}>
                {monitor.averageResponseTime}
                <span className="text-[10px] lg:text-xs font-medium text-text-muted ml-0.5">ms</span>
              </p>
              <p className="text-[9px] lg:text-[10px] font-bold text-text-muted uppercase tracking-widest">
                Latency
              </p>
            </div>
          </div>

          <div className="sm:hidden flex items-center gap-2 text-[10px] text-text-muted">
            <span className={`font-semibold ${uptimeColor}`}>{monitor.uptimePercentage.toFixed(1)}%</span>
            <span className="text-bg-border/50">/</span>
            <span className={`font-semibold ${latencyColor}`}>{monitor.averageResponseTime}ms</span>
          </div>

          {isLive && (
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal/10 border border-teal/20">
              <Zap className="w-3 h-3 text-teal" />
              <span className="text-[10px] font-bold text-teal uppercase tracking-wider">
                Live
              </span>
            </div>
          )}

          <div
            className={`
              p-2 rounded-xl bg-bg-elevated transition-all duration-300
              ${expanded ? "rotate-180 bg-teal/10" : ""}
            `}
          >
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-text-muted" />
          </div>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-bg-border/50 px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6 pt-4 sm:pt-5 animate-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] sm:text-xs font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                  Availability History
                </h4>
                <span className="text-[9px] sm:text-[10px] font-semibold text-teal/70 bg-teal/5 px-2 sm:px-2.5 py-0.5 rounded-full">
                  Last 24h
                </span>
              </div>
              <UptimeGraph history={monitor.history} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] sm:text-xs font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple" />
                  Performance Pattern
                </h4>
                <span className="text-[9px] sm:text-[10px] font-semibold text-purple/70 bg-purple/5 px-2 sm:px-2.5 py-0.5 rounded-full">
                  Latency Trend
                </span>
              </div>
              <ResponseTimeChart history={monitor.history} />
            </div>
          </div>

          <div className="mt-4 sm:mt-5 lg:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 pt-4 sm:pt-5 border-t border-bg-border/30">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-text-muted">
              <Server className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Reliability check via</span>
              <span className="font-semibold text-text-secondary hidden sm:inline">AWS EU-NORTH-1</span>
              <span className="font-semibold text-text-secondary sm:hidden">AWS</span>
            </div>
            <div className="flex items-center gap-2 text-[9px] sm:text-[10px] text-text-muted/40 uppercase font-bold tracking-tight">
              <Clock className="w-3 h-3" />
              Herald Monitor v1.0
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
