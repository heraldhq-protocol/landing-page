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
    <section className="py-12 border-y border-border/50 bg-navy/30 backdrop-blur-sm relative overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-text-muted">
          Trusted by teams building on Solana
        </p>
      </div>

      {/* Faded edges overlay */}
      <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-navy to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-navy to-transparent z-10" />

      <div className="flex overflow-hidden group">
        {/* We double the list to create the seamless infinite loop */}
        <div className="flex animate-marquee whitespace-nowrap gap-16 items-center py-4">
          {[...PARTNERS, ...PARTNERS].map((partner, index) => (
            <div 
              key={`${partner.name}-${index}`} 
              className="flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={140}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}