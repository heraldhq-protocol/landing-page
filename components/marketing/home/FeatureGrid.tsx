"use client";

import { Globe } from "lucide-react";
import { ShieldCheckIcon as ShieldCheck } from "@/components/ui/shield-check";
import { ZapIcon as Zap } from "@/components/ui/zap";
import { ReceiptIcon as Receipt } from "@/components/ui/receipt";
import { CpuIcon as Cpu } from "@/components/ui/cpu";
import { BellIcon as Bell } from "@/components/ui/bell";
import AnimatedIcon from "@/components/ui/animated-icon";

const FEATURES = [
  {
    title: "Privacy Registry",
    desc: "On-chain identity management via Anchor PDAs. You own your data — Herald cannot modify or delete your record.",
    icon: ShieldCheck,
    accent: "teal",
  },
  {
    title: "Multi-channel Delivery",
    desc: "Email, Telegram, and SMS — whichever channel your users prefer.",
    icon: Bell,
    accent: "purple",
  },
  {
    title: "ZK Receipts",
    desc: "Every delivery writes an immutable ZK-compressed leaf to Solana. Provable at $0.0001 per receipt.",
    icon: Receipt,
    accent: "teal",
  },
  {
    title: "Pay in USDC",
    desc: "Native USDC streaming. No credit cards, no invoices.",
    icon: Zap,
    accent: "amber",
  },
  {
    title: "One API Call",
    desc: "Send your first notification in under 5 minutes. Our SDK handles encryption and on-chain resolution.",
    icon: Cpu,
    accent: "teal",
  },
  {
    title: "Global Scale",
    desc: "Multi-AZ AWS infrastructure with Helius RPC. 99.9% SLA on Growth and Scale tiers.",
    icon: Globe,
    accent: "purple",
  },
];

const accentMap: Record<string, {
  icon: string;
  iconBg: string;
  glow: string;
}> = {
  teal: {
    icon: "text-teal",
    iconBg: "bg-teal/10",
    glow: "bg-teal/20",
  },
  purple: {
    icon: "text-purple",
    iconBg: "bg-purple/10",
    glow: "bg-purple/20",
  },
  amber: {
    icon: "text-amber",
    iconBg: "bg-amber/10",
    glow: "bg-amber/20",
  },
};

export default function FeatureGrid() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-bg-base relative overflow-hidden">
      <div className="container mx-auto px-6">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="max-w-xl mx-auto text-center mb-24">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-4">
            Infrastructure
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-text-primary leading-tight mb-6 text-balance">
            Everything you need to <span className="text-teal">scale trust</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            Robust, privacy-preserving notification infrastructure built for the next billion DeFi users.
          </p>
        </div>

        {/* ── Borderless Floating Grid ───────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            const a = accentMap[f.accent];
            const isGlobe = f.title === "Global Scale";
            return (
              <div
                key={i}
                className="group relative flex flex-col items-center text-center px-4"
              >
                {/* Generous hover aura replacing solid backgrounds */}
                <div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 ${a.glow} blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full`}
                />

                {/* Minimalist Icon */}
                <div
                  className={`relative w-14 h-14 rounded-2xl ${a.iconBg} flex items-center justify-center mb-8 border border-white/5 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110`}
                >
                  {isGlobe ? (
                    <AnimatedIcon icon={Icon} className={a.icon} size={24} />
                  ) : (
                    <Icon size={24} className={a.icon} />
                  )}
                </div>

                {/* Unconstrained Text */}
                <h3 className="text-xl font-bold text-text-primary mb-4 font-display transition-colors duration-300">
                  {f.title}
                </h3>
                <p className="text-text-secondary leading-relaxed md:text-sm lg:text-base">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}