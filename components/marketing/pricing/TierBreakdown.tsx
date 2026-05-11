"use client";

import { Minus, ArrowLeft } from "lucide-react";
import { XIcon as X } from "@/components/ui/x";
import { CheckIcon as Check } from "@/components/ui/check";
import { ZapIcon as Zap } from "@/components/ui/zap";

const TIERS = [
  { id: "developer", name: "Developer", price: 0, sends: 1000, rate: null },
  { id: "growth", name: "Growth", price: 99, sends: 50000, rate: 0.002 },
  { id: "scale", name: "Scale", price: 299, sends: 250000, rate: 0.0015 },
  { id: "enterprise", name: "Enterprise", price: 999, sends: 1000000, rate: 0.001 },
];

const VOLUME_MILESTONES = [10000, 50000, 100000, 250000, 500000, 1000000];

const CHANNELS = [
  { label: "Email", developer: true, growth: true, scale: true, enterprise: true },
  { label: "Telegram", developer: false, growth: true, scale: true, enterprise: true },
  { label: "SMS", developer: false, growth: true, scale: true, enterprise: true },
  { label: "Webhooks", developer: false, growth: true, scale: true, enterprise: true },
];

function calculateCost(volume: number, tier: (typeof TIERS)[0]): string {
  if (tier.id === "developer") {
    return volume <= tier.sends ? "Free" : "—";
  }

  if (tier.id === "enterprise") {
    return volume >= tier.sends ? `$${tier.price.toLocaleString()}` : "—";
  }

  if (volume <= tier.sends) {
    return `$${tier.price}`;
  }

  const overage = (volume - tier.sends) * (tier.rate as number);
  return `$${(tier.price + overage).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

interface TierBreakdownProps {
  activeTier: "growth" | "scale";
  sends: number;
  onClose: () => void;
}

export default function TierBreakdown({ activeTier, sends, onClose }: TierBreakdownProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end md:justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full md:w-auto md:max-w-3xl md:ml-auto bg-bg-surface border-t md:border-t-0 md:border-l border-border-hi overflow-y-auto max-h-[90vh] md:max-h-screen animate-slide-in-right md:rounded-l-2xl">
        <style>{`
          @keyframes slideInRight {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
          @media (min-width: 768px) {
            @keyframes slideInRight {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
          }
          .animate-slide-in-right {
            animation: slideInRight 0.3s ease-out;
          }
        `}</style>

        <div className="sticky top-0 z-10 bg-bg-surface/95 backdrop-blur border-b border-border-hi px-4 py-3 md:px-6 md:py-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 md:gap-2 text-text-muted hover:text-teal transition-colors text-xs font-bold uppercase tracking-widest"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back</span>
          </button>
          <h3 className="text-[9px] md:text-[10px] font-bold font-mono tracking-[0.2em] text-teal uppercase text-center">
            Tier Breakdown
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 md:p-2 rounded-lg hover:bg-bg-elevated transition-colors text-text-muted hover:text-text-primary"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 md:p-10 space-y-8 md:space-y-12">
          <div>
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <Zap className="text-teal" size={14} />
              <h4 className="text-[9px] md:text-[10px] font-bold text-text-muted uppercase tracking-widest">
                Cost at Volume
              </h4>
            </div>

            <div className="overflow-x-auto border border-border-hi rounded-lg md:rounded-xl -mx-4 md:mx-0 px-4 md:px-0">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-border-hi bg-bg-elevated/50">
                    <th className="text-left p-3 md:p-4 text-[9px] md:text-[10px] font-bold font-mono tracking-[0.2em] text-text-muted uppercase whitespace-nowrap">
                      Monthly Sends
                    </th>
                    {TIERS.map((tier) => (
                      <th
                        key={tier.id}
                        className={`p-3 md:p-4 text-center text-[9px] md:text-[10px] font-bold tracking-widest uppercase whitespace-nowrap ${
                          tier.id === activeTier
                            ? "text-teal bg-teal/10"
                            : "text-text-muted"
                        }`}
                      >
                        {tier.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {VOLUME_MILESTONES.map((volume) => {
                    const isCurrentSends = volume === sends;
                    const isMilionTier = volume === 1000000;

                    return (
                      <tr
                        key={volume}
                        className={`border-b last:border-0 border-border-hi transition-colors ${
                          isCurrentSends
                            ? "bg-teal/5"
                            : isMilionTier
                            ? "bg-bg-elevated/30"
                            : "hover:bg-white/[0.02]"
                        }`}
                      >
                        <td className="p-3 md:p-4 font-mono text-xs md:text-sm text-text-primary font-bold whitespace-nowrap">
                          {volume.toLocaleString()}
                          {isCurrentSends && (
                            <span className="ml-2 text-[8px] md:text-[9px] font-bold text-teal uppercase tracking-wider hidden sm:inline">
                              Your volume
                            </span>
                          )}
                          {isMilionTier && !isCurrentSends && (
                            <span className="ml-2 text-[8px] md:text-[9px] font-bold text-amber uppercase tracking-wider hidden sm:inline">
                              Enterprise
                            </span>
                          )}
                        </td>
                        {TIERS.map((tier) => {
                          const cost = calculateCost(volume, tier);
                          const isEnterpriseAtMilion =
                            tier.id === "enterprise" && volume === 1000000;

                          return (
                            <td
                              key={tier.id}
                              className={`p-3 md:p-4 text-center font-mono text-xs md:text-sm whitespace-nowrap ${
                                tier.id === activeTier
                                  ? "bg-teal/5 font-bold text-text-primary"
                                  : "text-text-secondary"
                              } ${isEnterpriseAtMilion ? "bg-teal/15 font-bold text-teal" : ""}`}
                            >
                              {cost}
                              {isEnterpriseAtMilion && (
                                <div className="mt-0.5 md:mt-1 text-[7px] md:text-[8px] font-bold uppercase tracking-wider text-teal-dim">
                                  Best value
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <Check className="text-teal" size={14} />
              <h4 className="text-[9px] md:text-[10px] font-bold text-text-muted uppercase tracking-widest">
                Channel Access
              </h4>
            </div>

            <div className="overflow-x-auto border border-border-hi rounded-lg md:rounded-xl -mx-4 md:mx-0 px-4 md:px-0">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-border-hi bg-bg-elevated/50">
                    <th className="text-left p-3 md:p-4 text-[9px] md:text-[10px] font-bold font-mono tracking-[0.2em] text-text-muted uppercase">
                      Channel
                    </th>
                    {TIERS.map((tier) => (
                      <th
                        key={tier.id}
                        className={`p-3 md:p-4 text-center text-[9px] md:text-[10px] font-bold tracking-widest uppercase whitespace-nowrap ${
                          tier.id === activeTier ? "text-teal" : "text-text-muted"
                        }`}
                      >
                        {tier.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CHANNELS.map((channel) => (
                    <tr
                      key={channel.label}
                      className="border-b last:border-0 border-border-hi hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-3 md:p-4 text-xs md:text-sm font-semibold text-text-primary">
                        {channel.label}
                      </td>
                      {[
                        channel.developer,
                        channel.growth,
                        channel.scale,
                        channel.enterprise,
                      ].map((hasAccess, idx) => (
                        <td key={idx} className="p-3 md:p-4 text-center">
                          {hasAccess ? (
                            <div className="w-4 h-4 md:w-5 md:h-5 mx-auto rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center">
                              <Check className="text-teal" size={10} />
                            </div>
                          ) : (
                            <Minus className="mx-auto text-text-muted/20" size={14} />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <Zap className="text-teal" size={14} />
              <h4 className="text-[9px] md:text-[10px] font-bold text-text-muted uppercase tracking-widest">
                Overage Rates
              </h4>
            </div>

            <div className="space-y-2 md:space-y-3">
              {TIERS.filter((t) => t.id !== "developer").map((tier) => (
                <div
                  key={tier.id}
                  className={`flex justify-between items-center p-3 md:p-4 border rounded-lg md:rounded-xl transition-colors ${
                    tier.id === activeTier
                      ? "border-teal/50 bg-teal/5"
                      : "border-border-hi bg-bg-elevated/30"
                  }`}
                >
                  <span className="text-xs md:text-sm font-bold text-text-primary">
                    {tier.name}
                  </span>
                  <div className="text-right">
                    <span className="font-mono text-teal font-bold text-xs md:text-sm">
                      ${tier.rate?.toFixed(4).replace(/0+$/, "").replace(/\.$/, "")}/send
                    </span>
                    <span className="block text-[8px] md:text-[10px] text-text-muted uppercase tracking-wider mt-0.5 md:mt-1">
                      After {tier.sends.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 md:p-5 border border-border-hi rounded-lg md:rounded-xl bg-teal/5">
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              All channels included at the same per-send rate. SMS infrastructure
              costs are absorbed by Herald — no hidden fees.
            </p>
          </div>

          <div className="p-4 md:p-5 border-l-2 border-teal bg-teal/3 rounded-r-lg md:rounded-r-xl">
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed italic">
              "Scaling shouldn't be a pricing ambush. Our overage rates are
              transparent and decrease as you move up tiers."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
