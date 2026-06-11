"use client";

import { Globe } from "lucide-react";
import { ShieldCheckIcon as ShieldCheck } from "@/components/ui/shield-check";
import { ZapIcon as Zap } from "@/components/ui/zap";
import { ReceiptIcon as Receipt } from "@/components/ui/receipt";
import { CpuIcon as Cpu } from "@/components/ui/cpu";
import { BellIcon as Bell } from "@/components/ui/bell";
import { CheckIcon as Check } from "@/components/ui/check";
import AnimatedIcon from "@/components/ui/animated-icon";

// ── Table-stakes: the solid baseline, shown quietly ──────────────────
const SUPPORTING = [
  {
    title: "Multi-channel delivery",
    desc: "Email, Telegram, and SMS — whichever channel your users prefer.",
    icon: Bell,
    accent: "purple",
  },
  {
    title: "One API call",
    desc: "First notification live in under 5 minutes. The SDK handles encryption and resolution.",
    icon: Cpu,
    accent: "teal",
  },
  {
    title: "Pay in USDC",
    desc: "Native USDC streaming. No credit cards, no invoices.",
    icon: Zap,
    accent: "amber",
  },
  {
    title: "Global scale",
    desc: "Multi-AZ AWS with Helius RPC. 99.9% SLA on Growth and Scale tiers.",
    icon: Globe,
    accent: "purple",
  },
];

const accentText: Record<string, string> = {
  teal: "text-teal",
  purple: "text-purple",
  amber: "text-amber",
};
const accentBg: Record<string, string> = {
  teal: "bg-teal/10",
  purple: "bg-purple/10",
  amber: "bg-amber/10",
};

// One row of a product artifact (PDA record / ZK receipt)
function Field({
  k,
  v,
  valueClass = "text-text-secondary",
  note,
}: {
  k: string;
  v: string;
  valueClass?: string;
  note?: string;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="text-text-muted w-28 shrink-0">{k}</span>
      <span className={valueClass}>{v}</span>
      {note && (
        <span className="ml-auto text-[10px] text-text-muted/70 italic">
          {note}
        </span>
      )}
    </div>
  );
}

export default function FeatureGrid() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-bg-base relative overflow-hidden">
      <div className="container mx-auto px-6">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="max-w-xl mx-auto text-center mb-16 lg:mb-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-4">
            Under the hood
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-text-primary leading-tight mb-6 text-balance">
            The infrastructure behind every alert
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            Registry, delivery, and on-chain proof — the parts that keep contact data private.
          </p>
        </div>

        {/* ── Differentiators: two weighted panels with real artifacts ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Privacy Registry */}
          <div className="group relative p-6 sm:p-8 rounded-3xl bg-bg-surface border border-border overflow-hidden hover:border-teal/40 hover:-translate-y-1 transition-all duration-500">
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-teal/10 flex items-center justify-center">
                  <ShieldCheck size={20} className="text-teal" />
                </div>
                <span className="font-mono text-[11px] tracking-wide text-text-muted">
                  On-chain · Anchor PDA
                </span>
              </div>
              <h3 className="text-2xl font-bold font-display text-text-primary mb-3">
                Privacy Registry
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6 max-w-md">
                On-chain identity via Anchor PDAs. You own the record — Herald
                can read it to route a message, but can never modify or delete it.
              </p>

              {/* Artifact: the actual PDA record */}
              <div className="rounded-xl bg-bg-base/70 border border-border p-4 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between pb-2 mb-1 border-b border-border/60">
                  <span className="text-text-muted">PrivacyRegistry · PDA</span>
                  <span className="inline-flex items-center gap-1.5 text-teal">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal" /> active
                  </span>
                </div>
                <Field k="owner" v="7xR4mKp2nQ…aF9" />
                <Field k="contact_hash" v="0x9af3…e21" valueClass="text-amber" note="encrypted" />
                <Field k="authority" v="self" note="Herald can't modify" />
              </div>
            </div>
          </div>

          {/* ZK Receipts */}
          <div className="group relative p-6 sm:p-8 rounded-3xl bg-bg-surface border border-border overflow-hidden hover:border-teal/40 hover:-translate-y-1 transition-all duration-500">
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-teal/10 flex items-center justify-center">
                  <Receipt size={20} className="text-teal" />
                </div>
                <span className="font-mono text-[11px] tracking-wide text-text-muted">
                  On-chain · ZK-compressed
                </span>
              </div>
              <h3 className="text-2xl font-bold font-display text-text-primary mb-3">
                ZK Receipts
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6 max-w-md">
                Every delivery writes an immutable ZK-compressed leaf to Solana.
                Provable, permanent, and $0.0001 each.
              </p>

              {/* Artifact: the actual receipt */}
              <div className="rounded-xl bg-bg-base/70 border border-border p-4 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between pb-2 mb-1 border-b border-border/60">
                  <span className="text-text-muted">ZK Receipt</span>
                  <span className="inline-flex items-center gap-1.5 text-teal">
                    <Check size={12} className="text-teal" /> verified
                  </span>
                </div>
                <Field k="leaf" v="0x4b1c…a9" />
                <Field k="slot" v="298,442,109" />
                <Field k="cost" v="$0.0001" valueClass="text-amber" />
                <Field k="tx" v="5Jx…q2 ↗" valueClass="text-teal" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Table-stakes: compact, hairline-separated spec strip ────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-3xl overflow-hidden bg-border/60 border border-border">
          {SUPPORTING.map((f) => {
            const Icon = f.icon;
            const isGlobe = f.title === "Global scale";
            return (
              <div
                key={f.title}
                className="group bg-bg-surface p-6 hover:bg-bg-elevated transition-colors duration-300"
              >
                <div className={`w-10 h-10 rounded-xl ${accentBg[f.accent]} flex items-center justify-center mb-4`}>
                  {isGlobe ? (
                    <AnimatedIcon icon={Icon} className={accentText[f.accent]} size={18} />
                  ) : (
                    <Icon size={18} className={accentText[f.accent]} />
                  )}
                </div>
                <h4 className="text-base font-bold text-text-primary mb-1.5 font-display">
                  {f.title}
                </h4>
                <p className="text-text-secondary text-sm leading-relaxed">
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
