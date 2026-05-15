import type { Metadata } from "next";
import WaitlistForm from "@/components/marketing/waitlist/WaitlistForm";
import DesignPartnerOffer from "@/components/marketing/waitlist/DesignPartnerOffer";

export const metadata: Metadata = {
  title: "Design Partner Program — Herald Protocol",
  description:
    "Become a Herald Design Partner. Integrate the privacy-first notification layer for Solana DeFi for free in exchange for feedback and a case study.",
  openGraph: {
    title: "Design Partner Program — Herald Protocol",
    description:
      "Become a Herald Design Partner. Integrate the privacy-first notification layer for Solana DeFi for free.",
  },
};

export default function WaitlistPage() {
  return (
    <div className="flex flex-col">
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-20 overflow-hidden text-center">
        <div className="absolute top-[5%] left-[10%] w-[80%] h-[70%] -z-10 bg-teal/8 blur-[140px] rounded-full mix-blend-screen pointer-events-none" />
        <div className="absolute top-[25%] right-[15%] w-[50%] h-[50%] -z-10 bg-purple-500/6 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
        <div className="absolute inset-0 -z-10 bg-app-glow opacity-30" />

        <div className="container mx-auto px-6">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-teal/15 bg-teal/5 text-teal text-[11px] font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-teal motion-safe:animate-pulse" />
            Design Partner Program
          </div>
          <h1 className="text-[clamp(1.75rem,7cqi,4.5rem)] md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-text-primary font-display text-balance leading-[1.05]">
            Build with us. Become a <span className="text-teal">Herald Design Partner</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            A design partner is an early protocol who integrates Herald for free
            in exchange for feedback, a published case study, and public
            endorsement. You are our proof of value before we have revenue.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2.5 text-xs sm:text-sm text-text-muted">
            <div className="flex items-center gap-2">
              <span className="text-teal font-mono font-bold text-base">5 min</span>
              <span>integration</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-teal font-mono font-bold text-base">99.9%</span>
              <span>delivery rate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-teal font-mono font-bold text-base">ZK</span>
              <span>receipts on-chain</span>
            </div>
          </div>
        </div>
      </section>

      <DesignPartnerOffer />

      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted">
              Apply as a Design Partner
            </p>
          </div>
          <WaitlistForm />
        </div>
      </section>
    </div>
  );
}
