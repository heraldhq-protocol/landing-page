import type { Metadata } from "next";
import WaitlistForm from "@/components/marketing/waitlist/WaitlistForm";

export const metadata: Metadata = {
  title: "Get Early Access — Herald Protocol",
  description:
    "Join the waitlist for Herald's privacy-preserving notification layer for Solana DeFi. Early access for protocols.",
  openGraph: {
    title: "Get Early Access — Herald Protocol",
    description:
      "Join the waitlist for Herald's privacy-preserving notification layer for Solana DeFi.",
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
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            Early Access — Limited Spots
          </div>
          <h1 className="text-[clamp(1.75rem,7cqi,4.5rem)] md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-text-primary font-display text-balance leading-[1.05]">
            Be among the first to <span className="text-teal">integrate Herald</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto leading-relaxed">
            We're onboarding design partners now. Get early access to the
            privacy-first notification layer for Solana DeFi.
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

      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted">
              Design Partner Application
            </p>
          </div>
          <WaitlistForm />
        </div>
      </section>
    </div>
  );
}
