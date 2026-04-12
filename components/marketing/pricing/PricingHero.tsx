"use client";


export default function PricingHero() {
  return (
    <section className="pt-32 pb-16 md:pt-48 md:pb-24 text-center relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-app-glow opacity-30" />
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 text-text-primary font-display">
          Simple. <span className="text-teal">Transparent.</span> <br />
          Built for scale.
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Start for free, then scale as your protocol grows. No credit cards. 
          No lock-in. Pay native USDC via any Solana wallet.
        </p>
      </div>
    </section>
  );
}
