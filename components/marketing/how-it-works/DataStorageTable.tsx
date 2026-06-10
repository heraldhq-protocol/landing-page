"use client";

import { ShieldCheck } from "lucide-react";
import { CheckIcon as Check } from "@/components/ui/check";
import { XIcon as X } from "@/components/ui/x";

const DATA_POINTS = [
  { item: "Wallet Public Key (Ed25519)", heraldSees: true, heraldStores: true, solanaStores: true },
  { item: "Encrypted Contact Blob (X25519)", heraldSees: true, heraldStores: false, solanaStores: true },
  { item: "Plaintext Email Address", heraldSees: false, heraldStores: false, solanaStores: false },
  { item: "Telegram Username / ID", heraldSees: false, heraldStores: false, solanaStores: false },
  { item: "Notification Subject & Body", heraldSees: true, heraldStores: false, solanaStores: false },
  { item: "Delivery Status (ZK Proof)", heraldSees: true, heraldStores: true, solanaStores: true },
];

export default function DataStorageTable() {
  return (
    <section className="py-24 bg-bg-base border-t border-border/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">What we handle. What we don't.</h2>
          <p className="text-text-secondary max-w-xl mx-auto">Herald is designed to handle minimal data. Here's a technical breakdown of our storage and visibility model.</p>
        </div>

        {/* Desktop View (Table) */}
        <div className="hidden md:block max-w-4xl mx-auto border border-border-hi overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-bg-surface">
                <th className="p-6 text-left text-[10px] font-mono uppercase tracking-widest text-text-muted border-r border-border-hi">Data Point</th>
                <th className="p-6 text-center text-[10px] font-mono uppercase tracking-widest text-text-muted border-r border-border-hi">Transmitted</th>
                <th className="p-6 text-center text-[10px] font-mono uppercase tracking-widest text-text-muted border-r border-border-hi">Persistent DB</th>
                <th className="p-6 text-center text-[10px] font-mono uppercase tracking-widest text-text-muted">On-Chain</th>
              </tr>
            </thead>
            <tbody className="bg-bg-base font-mono">
              {DATA_POINTS.map((row, idx) => (
                <tr key={idx} className="border-t border-border-hi group hover:bg-teal/2 transition-colors">
                  <td className="p-6 text-sm font-semibold text-text-secondary border-r border-border-hi group-hover:text-text-primary">
                    {row.item}
                  </td>
                  <td className="p-6 border-r border-border-hi text-center">
                    <StatusIcon active={row.heraldSees} />
                  </td>
                  <td className="p-6 border-r border-border-hi text-center">
                    <StatusIcon active={row.heraldStores} />
                  </td>
                  <td className="p-6 text-center">
                    <StatusIcon active={row.solanaStores} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View (Stacked Tiles) */}
        <div className="md:hidden space-y-4">
          {DATA_POINTS.map((row, idx) => (
            <div key={idx} className="border border-border-hi bg-bg-surface p-6 rounded-lg space-y-6">
              <h3 className="text-sm font-bold text-text-primary border-b border-border-hi pb-4">{row.item}</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[9px] font-mono text-text-muted uppercase tracking-tighter">Transmitted</span>
                  <StatusIcon active={row.heraldSees} />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[9px] font-mono text-text-muted uppercase tracking-tighter">Persistent</span>
                  <StatusIcon active={row.heraldStores} />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[9px] font-mono text-text-muted uppercase tracking-tighter">On-Chain</span>
                  <StatusIcon active={row.solanaStores} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-2xl mx-auto p-8 border border-teal/20 bg-teal/3 flex flex-col md:flex-row gap-6 rounded-xl">
            <ShieldCheck className="text-teal shrink-0" size={40} />
            <div>
                <h4 className="text-lg font-bold text-text-primary mb-2">Architecturally Compliant</h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                    By ensuring plaintext identifiers never hit our persistent storage, Herald is GDPR and CCPA compliant by design. Our "Zero Trace" delivery means you never have to worry about data breaches exposing your users.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
}

function StatusIcon({ active }: { active: boolean }) {
  return (
    <div className="flex justify-center">
      {active ? (
        <div className="w-5 h-5 rounded-md bg-teal/10 flex items-center justify-center border border-teal/20 shadow-sm">
          <Check className="text-teal" size={12} />
        </div>
      ) : (
        <div className="w-5 h-5 flex items-center justify-center">
           <X className="text-text-muted/30" size={12} />
        </div>
      )}
    </div>
  );
}

