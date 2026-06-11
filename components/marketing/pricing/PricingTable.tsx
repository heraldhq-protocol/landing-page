import { ZapIcon as Zap } from "@/components/ui/zap";
import { ArrowRightIcon as ArrowRight } from "@/components/ui/arrow-right";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PRICING_CTA, IS_EARLY_ACCESS, PARTNERS_URL, isExternal } from "@/lib/cta-config";

const TIERS = [
  {
    name: "Developer",
    price: 0,
    sends: "1,000",
    overage: null,
    inherits: null,
    description: "For building and testing your integration.",
    badge: null,
    highlighted: false,
    cta: "Start for free",
    ctaHref: "https://app.useherald.xyz/register",
  },
  {
    name: "Growth",
    price: 99,
    sends: "50,000",
    overage: "$0.002",
    inherits: "Developer",
    description: "For protocols with an active user base.",
    badge: "Most popular",
    highlighted: true,
    cta: "Get started",
    ctaHref: "https://app.useherald.xyz/register?tier=growth",
  },
  {
    name: "Scale",
    price: 299,
    sends: "250,000",
    overage: "$0.0015",
    inherits: "Growth",
    description: "For high-volume protocols and growing teams.",
    badge: null,
    highlighted: false,
    cta: "Get started",
    ctaHref: "https://app.useherald.xyz/register?tier=scale",
  },
  {
    name: "Enterprise",
    price: null,
    sends: "1M+",
    overage: "Custom",
    inherits: "Scale",
    description: "Custom volume, SLAs, and dedicated support.",
    badge: null,
    highlighted: false,
    cta: "Talk to us",
    ctaHref: "mailto:hello@herald.xyz",
  },
];

export default function PricingTable() {
  return (
    <section className="pt-10 pb-28 relative overflow-hidden border-t border-border/30">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-bg-base via-bg-surface/15 to-bg-base pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-4">
            Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-text-primary mb-4">
            Start free.{" "}
            <span className="text-teal">Pay in USDC when you scale.</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-lg mx-auto">
            No credit card required. Pay with any Solana wallet via native USDC
            streaming.
          </p>
        </div>

        {/* ── Tier cards ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col h-full rounded-2xl border transition-all duration-300 overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal/10 ${
                tier.highlighted
                  ? "bg-bg-elevated border-teal/50 shadow-[0_0_60px_rgba(20,184,166,0.15)] ring-1 ring-teal/30"
                  : "bg-bg-surface border-border hover:border-border-2"
              }`}
            >
              {/* Highlighted top bar */}
              {tier.highlighted && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-teal to-transparent" />
              )}

              {/* Card header */}
              <div className="p-7 pb-6">
                {/* Tier name + badge */}
                <div className="flex items-center justify-between mb-4 h-6">
                  <span
                    className={`text-sm font-bold font-display ${tier.highlighted ? "text-teal" : "text-text-primary"}`}
                  >
                    {tier.name}
                  </span>
                  {tier.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-teal/15 text-teal border border-teal/25">
                      {tier.badge}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mb-4 h-10 flex items-baseline gap-1">
                  {tier.price !== null ? (
                    <>
                      <span className="text-4xl font-black font-display text-text-primary">
                        ${tier.price}
                      </span>
                      <span className="text-text-muted text-sm font-mono">
                        /mo
                      </span>
                    </>
                  ) : (
                    <span className="text-4xl font-black font-display text-text-primary">
                      Custom
                    </span>
                  )}
                </div>

                <p className="text-sm text-text-muted leading-relaxed min-h-[2.5rem]">
                  {tier.description}
                </p>
              </div>

              {/* Divider */}
              <div className="mx-7 h-px bg-border/50" />

              {/* Spec block — the two numbers devs actually compare */}
              <div className="p-7 flex-1 flex flex-col">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Zap size={14} className="text-teal shrink-0" />
                      <span className="text-lg font-bold text-text-primary font-mono leading-none">
                        {tier.sends}
                      </span>
                    </div>
                    <span className="text-xs text-text-muted pl-[22px]">
                      sends / month
                    </span>
                  </div>

                  <div>
                    <div className="text-lg font-bold text-text-primary font-mono leading-none mb-1">
                      {tier.overage === null
                        ? "—"
                        : tier.overage === "Custom"
                          ? "Custom"
                          : tier.overage}
                    </div>
                    <span className="text-xs text-text-muted">
                      {tier.overage === null
                        ? "no overage on free tier"
                        : tier.overage === "Custom"
                          ? "volume-based rate"
                          : "/ send over limit"}
                    </span>
                  </div>
                </div>

                {/* Cumulative continuity — carries the deferred detail */}
                <p className="mt-6 text-xs text-text-secondary">
                  {tier.inherits ? (
                    <>
                      Everything in{" "}
                      <span className="text-teal font-semibold">
                        {tier.inherits}
                      </span>
                      , plus more channels, seats &amp; SLA.
                    </>
                  ) : (
                    <>Email delivery, sandbox &amp; ZK receipts included.</>
                  )}
                </p>
              </div>

              {/* CTA */}
              <div className="p-7 pt-0">
                <Button
                  asChild
                  className={`w-full h-11 font-bold rounded-xl text-sm transition-all duration-300 group hover:-translate-y-1 ${
                    tier.highlighted
                      ? "bg-teal text-bg-base hover:bg-teal/90 shadow-[0_0_20px_rgba(0,200,150,0.25)] hover:shadow-[0_0_32px_rgba(0,200,150,0.4)]"
                      : "bg-bg-elevated border border-border-2 text-text-primary hover:border-teal/50 hover:text-teal hover:shadow-lg hover:shadow-teal/10"
                  }`}
                >
                  <Link
                    href={IS_EARLY_ACCESS ? PARTNERS_URL : tier.ctaHref}
                    {...(IS_EARLY_ACCESS || isExternal(tier.ctaHref) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex items-center justify-center gap-2"
                  >
                    {IS_EARLY_ACCESS ? PRICING_CTA.label : tier.cta}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer note ────────────────────────────────────────────── */}
        <div className="mt-12 text-center space-y-3">
          <p className="text-sm text-text-muted">
            All tiers include ZK receipts · No hidden fees · Cancel anytime
          </p>
          <p className="text-xs text-text-muted font-mono">
            Pay with USDC via any Solana wallet —{" "}
            <Link
              href="/pricing"
              className="text-teal hover:text-teal/80 transition-colors"
            >
              view full pricing details →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
