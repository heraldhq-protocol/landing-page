'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Globe, Activity, Zap, Clock } from 'lucide-react';
import { MonitorStatus } from '../../app/status/types';
import UptimeGraph from './UptimeGraph';
import ResponseTimeChart from './ResponseTimeChart';

interface Props {
  monitor: MonitorStatus;
  isLive?: boolean;
}

const statusColors = {
  up: 'bg-teal',
  down: 'bg-red',
  degraded: 'bg-amber',
};

export default function StatusCard({ monitor, isLive = false }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [pulse, setPulse] = useState(false);

  // Simple pulse effect when monitor updates
  useEffect(() => {
    if (isLive) {
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 800);
      return () => clearTimeout(timer);
    }
  }, [monitor.lastChecked, isLive]);

  return (
    <div 
      className={`
        bg-bg-surface rounded-3xl border
        ${pulse ? 'border-teal shadow-xl shadow-teal/10' : 'border-bg-border'}
        transition-all duration-500 overflow-hidden group/card backdrop-blur-sm
      `}
    >
      <div 
        className="p-6 sm:p-8 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative">
            <div className={`w-3.5 h-3.5 rounded-full ${statusColors[monitor.currentStatus]} shadow-lg`} />
            {isLive && monitor.currentStatus === 'up' && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-teal rounded-full animate-ping" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg sm:text-xl tracking-tight">
                {monitor.name}
              </h3>
              {isLive && (
                <span className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal/10 text-teal text-[10px] font-bold uppercase tracking-wider border border-teal/20">
                  <Zap className="w-2.5 h-2.5" />
                  Live
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400 dark:text-gray-500 flex items-center gap-1.5 mt-0.5">
              <Globe className="w-3.5 h-3.5" />
              {new URL(monitor.url).hostname}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 sm:gap-10">
          <div className="hidden sm:block text-right">
            <p className="text-xl font-black text-gray-900 dark:text-white tabular-nums">
              {monitor.uptimePercentage.toFixed(2)}%
            </p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Uptime</p>
          </div>
          
          <div className="hidden sm:block text-right">
            <p className="text-xl font-black text-gray-900 dark:text-white tabular-nums">
              {monitor.averageResponseTime}ms
            </p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Latency</p>
          </div>

          <div className={`p-2 rounded-xl bg-gray-50 dark:bg-white/5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-6 sm:px-8 pb-8 border-t border-gray-50 dark:border-white/5 animate-in slide-in-from-top-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mt-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5" />
                  Availability History
                </h4>
                <span className="text-[10px] font-bold text-teal bg-teal/10 px-2 py-0.5 rounded-full">
                  Last 24h
                </span>
              </div>
              <UptimeGraph history={monitor.history} />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  Performance Pattern
                </h4>
                <span className="text-[10px] font-bold text-teal bg-teal/10 px-2 py-0.5 rounded-full">
                  Latency Trend
                </span>
              </div>
              <ResponseTimeChart history={monitor.history} />
            </div>
          </div>
          
          <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-50 dark:border-white/5">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Reliability check performed via <span className="font-bold text-gray-300">AWS-EU-NORTH-1</span>
            </div>
            <div className="text-[10px] text-gray-400 uppercase font-black tracking-tighter opacity-30">
              Herald Monitor v1.0
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
