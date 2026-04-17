"use client";

import { AlertTriangle, ExternalLink } from "lucide-react";

interface Props {
  count: number;
}

export default function IncidentBanner({ count }: Props) {
  return (
    <div className="relative overflow-hidden bg-red/[0.06] border border-red/15 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group transition-all duration-300 hover:bg-red/[0.08]">
      <div
        className="absolute -top-12 -right-12 w-32 h-32 sm:w-48 sm:h-48 bg-red rounded-full opacity-5 blur-3xl"
      />

      <div className="flex items-center gap-3 sm:gap-4 relative">
        <div className="p-2.5 sm:p-3 rounded-2xl bg-red/15 text-red shadow-lg shadow-red/10">
          <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <p className="font-bold text-red tracking-tight text-base sm:text-lg">
            {count} Active Service Incident{count > 1 ? "s" : ""}
          </p>
          <p className="text-xs sm:text-sm text-red/60 font-medium hidden sm:block mt-0.5">
            Engineering teams are actively investigating and resolving the issue.
          </p>
          <p className="text-[10px] sm:text-xs text-red/50 font-medium sm:hidden mt-1">
            Investigating...
          </p>
        </div>
      </div>

      <a
        href="https://status.useherald.xyz"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-red font-bold text-[10px] sm:text-sm uppercase tracking-widest px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-red/10 hover:bg-red/20 transition-all duration-300 relative shrink-0"
      >
        <span className="hidden sm:inline">View Updates</span>
        <span className="sm:hidden">View</span>
        <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </a>
    </div>
  );
}
