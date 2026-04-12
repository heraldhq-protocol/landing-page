import { Wallet, Fingerprint, BellRing, ArrowDown } from "lucide-react";

const STEPS = [
  { 
    icon: Wallet, 
    title: "Connect Wallet", 
    desc: "Link your Phantom, Solflare, or Backpack wallet to establish your on-chain identity.",
    tag: "AUTH"
  },
  { 
    icon: Fingerprint, 
    title: "Verify Identity", 
    desc: "Enter your contact details. Our SDK encrypts them locally using your wallet's public key.",
    tag: "ENCRYPT"
  },
  { 
    icon: BellRing, 
    title: "Enable Alerts", 
    desc: "Sign a one-time transaction to register your encrypted endpoint on the Solana network.",
    tag: "LIVE"
  },
];

export default function RegistrationGuide() {
  return (
    <section className="py-32 border-t border-border/30 bg-navy/20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-5xl font-extrabold font-display text-center mb-24">
            Setup in <span className="text-teal">three</span> steps.
          </h2>
          
          <div className="relative space-y-24">
            {/* Connecting Line */}
            <div className="absolute left-[27px] top-2 bottom-2 w-px bg-linear-to-b from-teal/50 via-border to-transparent hidden md:block" />

            {STEPS.map((step, i) => (
              <div key={i} className="relative flex flex-col md:flex-row items-start gap-8 md:gap-16 group">
                {/* Icon Circle */}
                <div className="relative z-10 shrink-0">
                  <div className="w-14 h-14 rounded-full bg-bg-base border border-border-hi flex items-center justify-center group-hover:border-teal transition-colors duration-500 shadow-2xl">
                    <step.icon className="w-6 h-6 text-text-muted group-hover:text-teal transition-colors duration-500" />
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 md:hidden">
                      <ArrowDown className="w-4 h-4 text-border" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="text-xs font-mono font-bold tracking-widest text-teal/60">0{i + 1}</span>
                    <span className="px-2 py-0.5 rounded-md bg-bg-surface border border-border-hi text-[10px] font-mono font-bold tracking-tighter text-text-muted uppercase">
                      {step.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-teal transition-colors duration-500">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-lg leading-relaxed max-w-xl">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
