'use client';

import { AlertTriangle, ChevronRight } from 'lucide-react';

interface Props {
  count: number;
}

export default function IncidentBanner({ count }: Props) {
  return (
    <div className="mt-8 bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 sm:p-5 flex items-center justify-between group cursor-help transition-all hover:bg-rose-500/15">
      <div className="flex items-center gap-4">
        <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-500 shadow-lg shadow-rose-500/10">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <p className="font-bold text-rose-900 dark:text-rose-300 tracking-tight text-lg">
            {count} Active Service Incident{count > 1 ? 's' : ''}
          </p>
          <p className="text-sm text-rose-700/70 dark:text-rose-400/70 font-medium">
            Engineering teams are actively investigating performance anomalies.
          </p>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-2 text-rose-500 font-bold text-sm uppercase tracking-widest bg-rose-500/5 px-4 py-2 rounded-xl group-hover:gap-3 transition-all">
        View Updates
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
}
