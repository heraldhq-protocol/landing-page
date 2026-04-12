"use client";

export default function TechnicalHero() {
  return (
    <section className="pt-32 pb-16 md:pt-48 md:pb-24 text-center relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-app-glow opacity-30" />
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 text-text-primary font-display">
          Transparent by <span className="text-teal">design.</span> <br />
          Private by default.
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Herald uses TEEs and on-chain encryption to bridge the gap between 
          web3 identities and web2 communication channels. Here's how it works.
        </p>
      </div>
    </section>
  );
}
