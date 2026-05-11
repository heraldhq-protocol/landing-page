"use client";

import { useState } from "react";
import { Minus } from "lucide-react";
import { CheckIcon as Check } from "@/components/ui/check";
import { ZapIcon as Zap } from "@/components/ui/zap";

const MONTHLY_TIERS = [
  {
    id: "developer",
    name: "Developer",
    price: "Free",
    annualPrice: "Free",
    sends: "1k",
    overage: "N/A",
  },
  {
    id: "growth",
    name: "Growth",
    price: "$99",
    annualPrice: "$990",
    sends: "50k",
    overage: "$0.002",
  },
  {
    id: "scale",
    name: "Scale",
    price: "$299",
    annualPrice: "$2,990",
    sends: "250k",
    overage: "$0.0015",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    annualPrice: "Custom",
    sends: "1M+",
    overage: "Custom",
  },
];

const FEATURES = [
  {
    label: "Channels",
    developer: "Email",
    growth: "All",
    scale: "All",
    enterprise: "All",
  },
  {
    label: "ZK Receipts",
    developer: true,
    growth: true,
    scale: true,
    enterprise: true,
  },
  {
    label: "API Keys",
    developer: "1",
    growth: "5",
    scale: "∞",
    enterprise: "∞",
  },
  {
    label: "Team Space",
    developer: "1",
    growth: "3",
    scale: "10",
    enterprise: "∞",
  },
  {
    label: "Uptime SLA",
    developer: false,
    growth: "99.9%",
    scale: "99.9%",
    enterprise: "99.99%",
  },
  {
    label: "Support",
    developer: "Base",
    growth: "Standard",
    scale: "Priority",
    enterprise: "24/7 CSM",
  },
  {
    label: "Custom DKIM",
    developer: false,
    growth: false,
    scale: true,
    enterprise: true,
  },
  {
    label: "Nitro TEE",
    developer: true,
    growth: true,
    scale: true,
    enterprise: true,
  },
];

interface PricingSpecSheetProps {
  billingPeriod?: "monthly" | "annual";
}

export default function PricingSpecSheet({ billingPeriod = "monthly" }: PricingSpecSheetProps) {
  const [activeTier, setActiveTier] = useState("growth");
  const TIERS = MONTHLY_TIERS;
  const isAnnual = billingPeriod === "annual";

  return (
    <section className="py-24 bg-bg-base border-t border-border/30">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Tier Switcher (Mobile Only) */}
        <div className="md:hidden sticky top-20 z-40 mb-10 bg-bg-surface border border-border-hi p-0.5 grid grid-cols-4 rounded-xl">
          {TIERS.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setActiveTier(tier.id)}
              className={`py-2.5 text-[9px] font-bold uppercase tracking-widest transition-all rounded-lg ${
                activeTier === tier.id
                  ? "bg-teal text-bg-base shadow-lg shadow-teal/20"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {tier.name.toLowerCase() === "developer"
                ? "DEV"
                : tier.name.toLowerCase() === "growth"
                  ? "GROWTH"
                  : tier.name.toLowerCase() === "scale"
                    ? "SCALE"
                    : "ENT"}
            </button>
          ))}
        </div>

        {/* The Matrix */}
        <div className="border border-border-hi bg-bg-surface overflow-hidden rounded-xl">
          {/* Table Header */}
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] border-b border-border-hi">
            <div className="hidden md:flex p-8 bg-bg-surface/50 font-display text-xs font-bold text-text-muted items-end border-r border-border-hi">
              SPEC SHEET
            </div>

            {/* Active Tier Header (Mobile) */}
            <div className="md:hidden p-8 flex flex-col items-center gap-3 text-center bg-teal/3">
              {TIERS.filter((t) => t.id === activeTier).map((tier) => (
                <div
                  key={tier.id}
                  className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-500"
                >
                  <span className="text-[10px] font-bold font-mono tracking-[0.2em] text-teal uppercase">
                    {tier.name}
                  </span>
                  <span className="text-4xl font-black text-text-primary px-0 leading-none">
                    {isAnnual ? tier.annualPrice : tier.price}
                  </span>
                  {isAnnual && tier.price !== "Free" && tier.price !== "Custom" && (
                    <span className="text-[9px] font-bold text-teal">Save 17%</span>
                  )}
                  <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
                    {tier.sends} sends included
                  </span>
                </div>
              ))}
            </div>

            {/* Desktop Headers */}
            {TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`hidden md:flex p-8 border-r last:border-0 border-border-hi flex-col items-center gap-2 text-center transition-all duration-300 ${
                  activeTier === tier.id ? "bg-teal/2" : "opacity-40"
                }`}
              >
                <span className="text-[10px] font-bold font-mono tracking-widest text-teal uppercase">
                  {tier.name}
                </span>
                <span className="text-2xl font-black text-text-primary">
                  {isAnnual ? tier.annualPrice : tier.price}
                </span>
                {isAnnual && tier.price !== "Free" && tier.price !== "Custom" && (
                  <span className="text-[8px] font-bold text-teal bg-teal/10 px-2 py-0.5 rounded-full">
                    Save 17%
                  </span>
                )}
                <span className="text-[10px] font-mono text-text-muted uppercase">
                  {tier.sends} sends
                </span>
              </div>
            ))}
          </div>

          {/* Feature Rows */}
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] border-b last:border-0 border-border-hi group transition-colors duration-200 hover:bg-white/1"
            >
              <div className="p-5 md:p-6 border-r border-border-hi flex items-center bg-bg-surface/30">
                <span className="text-xs md:text-sm font-semibold text-text-secondary group-hover:text-text-primary">
                  {feature.label}
                </span>
              </div>

              {TIERS.map((tier) => (
                <div
                  key={tier.id}
                  className={`p-5 md:p-6 border-r last:border-0 border-border-hi flex items-center justify-center text-center transition-all duration-300 ${
                    activeTier === tier.id ? "bg-teal/3 flex" : "hidden md:flex"
                  }`}
                >
                  <FeatureValue value={(feature as any)[tier.id]} />
                </div>
              ))}
            </div>
          ))}

          {/* CTA Row */}
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] border-t border-border-hi">
            <div className="hidden md:block p-6 border-r border-border-hi"></div>
            {TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`p-6 border-r last:border-0 border-border-hi bg-bg-surface/50 transition-all duration-300 ${
                  activeTier === tier.id ? "flex" : "hidden md:flex"
                }`}
              >
                <button
                  className={`w-full py-3.5 font-bold text-[10px] uppercase tracking-widest transition-all rounded-lg border ${
                    tier.id === activeTier
                      ? "bg-teal text-bg-base border-teal shadow-lg shadow-teal/10"
                      : "border-border-hi hover:border-teal/50 hover:text-teal"
                  }`}
                >
                  {tier.id === "enterprise" ? "Talk to us" : "Get Started"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-text-muted opacity-80">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-teal" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] cursor-default">
              Scalable Protocol Infrastructure
            </span>
          </div>
          <div className="text-[10px] uppercase tracking-widest text-center md:text-right leading-relaxed font-semibold">
            ZK Receipts & Nitro Enclaves <br /> Standard on all tiers.
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <div className="w-5 h-5 rounded-full bg-teal/10 flex items-center justify-center border border-teal/30">
        <Check size={14} className="text-teal" />
      </div>
    ) : (
      <Minus size={16} className="text-text-muted/10" />
    );
  }
  return (
    <span className="text-xs font-mono text-text-secondary font-bold tracking-tight">
      {value}
    </span>
  );
}
