"use client";

import Image from "next/image";

const PARTNERS = [
  { name: "Jupiter", logo: "/logos/jupiter.svg" },
  { name: "Drift", logo: "/logos/drift.svg" },
  { name: "Marinade", logo: "/logos/marinade.svg" },
  { name: "Squads", logo: "/logos/squads.svg" },
  { name: "Marginfi", logo: "/logos/marginfi.svg" },
  { name: "Orca", logo: "/logos/orca.svg" },
];

export default function LogoMarquee() {
  return (
    <section className="relative py-14 border-y border-border/40 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-bg-surface/40" />

      {/* Label */}
      <div className="relative container mx-auto px-6 mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
          Trusted by teams building on Solana
        </p>
      </div>

      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-bg-base to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-bg-base to-transparent z-10 pointer-events-none" />

      {/* Marquee track */}
      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee items-center gap-20 whitespace-nowrap">
          {[...PARTNERS, ...PARTNERS].map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex items-center justify-center grayscale opacity-30 hover:grayscale-0 hover:opacity-80 transition-all duration-500 shrink-0"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={36}
                className="h-7 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}