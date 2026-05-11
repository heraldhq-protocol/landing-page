"use client";

interface PricingHeroProps {
  billingPeriod: "monthly" | "annual";
  onChange: (period: "monthly" | "annual") => void;
}

export default function PricingHero({ billingPeriod, onChange }: PricingHeroProps) {
  return (
    <section className="pt-32 pb-8 md:pt-48 md:pb-12 text-center relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-app-glow opacity-30" />
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 text-text-primary font-display">
          Simple. <span className="text-teal">Transparent.</span> <br />
          Built for scale.
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-10">
          Start for free, then scale as your protocol grows. No credit cards. 
          No lock-in. Pay native USDC via any Solana wallet.
        </p>

        <div className="inline-flex items-center gap-3 p-1 bg-bg-surface border border-border-hi rounded-full">
          <button
            onClick={() => onChange("monthly")}
            className={`px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-full transition-all ${
              billingPeriod === "monthly"
                ? "bg-teal text-navy shadow-lg shadow-teal/20"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => onChange("annual")}
            className={`px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-full transition-all ${
              billingPeriod === "annual"
                ? "bg-teal text-navy shadow-lg shadow-teal/20"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            Annual <span className="text-[9px] opacity-80">(Save 17%)</span>
          </button>
        </div>
      </div>
    </section>
  );
}
