import { ShieldCheck, MailWarning, Database, Unlock } from "lucide-react";
import { ArrowRightIcon as ArrowRight } from "@/components/ui/arrow-right";
import { LockIcon as Lock } from "@/components/ui/lock";

export default function PrivacyExplainer() {
  return (
    <section className="py-32 border-t border-border/30 bg-bg-base relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full max-w-3xl h-[400px] bg-teal/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold font-display leading-tight">
            The Protocol <span className="text-text-muted">never</span> learns your email.
          </h2>
          <p className="text-xl text-text-secondary mt-6">
            We've engineered Herald so that yours identities map on-chain without any central party ever knowing your contact info.
          </p>
        </div>

        {/* Technical Flow Visualization */}
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-16">
          
          {/* Legacy Flow: The Problem */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 border-y border-red/10 py-12 group">
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red/10 border border-red/20 text-red text-xs font-mono uppercase tracking-widest">
                The Legacy Path
              </div>
              <h3 className="text-3xl font-bold text-text-primary">Direct PII Exposure</h3>
              <p className="text-text-secondary text-lg max-w-md mx-auto md:mx-0">
                Protocols mapping your wallet to your email in their central database.
              </p>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-6 relative">
               <div className="flex items-center gap-8 text-text-muted">
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-4 rounded-xl bg-bg-surface border border-border-hi text-text-primary">
                      <Unlock size={24} />
                    </div>
                    <span className="text-xs font-mono tracking-wider">WALLET</span>
                  </div>
                  <ArrowRight className="text-red/30" size={24} />
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-4 rounded-xl bg-bg-surface border border-border-hi text-red">
                      <Unlock size={24} />
                    </div>
                    <span className="text-xs font-mono tracking-wider">EMAIL</span>
                  </div>
               </div>
               
               <div className="w-full border-t border-red/10 pt-6 flex items-center justify-center gap-2 text-red/60 text-sm font-mono tracking-tighter decoration-red/50 line-through">
                  CENTRAL_DATABASE_LEAK_RISK_DETECTED
               </div>
            </div>
          </div>

          {/* Herald Flow: The Solution */}
          <div className="w-full flex flex-col md:flex-row-reverse items-center justify-between gap-8 md:gap-16 border-y border-teal/10 py-12 group bg-teal/5 rounded-3xl backdrop-blur-sm px-8 md:px-16">
            <div className="flex-1 space-y-4 text-center md:text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/10 border border-teal/20 text-teal text-xs font-mono uppercase tracking-widest">
                The Herald Path
              </div>
              <h3 className="text-3xl font-bold text-text-primary">Cryptographic Isolation</h3>
              <p className="text-text-secondary text-lg max-w-md mx-auto md:ms-auto">
                Identity is resolved in-memory within a Trusted Execution Environment.
              </p>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-6 relative">
               <div className="flex items-center gap-8 text-text-primary">
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-4 rounded-xl bg-bg-surface border border-border-hi text-text-muted">
                      <Unlock size={24} />
                    </div>
                    <span className="text-xs font-mono tracking-wider">WALLET</span>
                  </div>
                  <ArrowRight className="text-teal/50" size={24} />
                  <div className="flex flex-col items-center gap-2 relative">
                    <div className="absolute inset-0 bg-teal/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="p-4 rounded-xl bg-bg-surface border border-teal/50 text-teal relative z-10">
                      <Lock size={24} />
                    </div>
                    <span className="text-xs font-mono tracking-wider text-teal">ENCRYPTED</span>
                  </div>
               </div>
               
               <div className="w-full border-t border-teal/10 pt-6 flex items-center justify-center gap-2 text-teal/80 text-sm font-mono tracking-tighter">
                  [TEE_ATTESTATION_VALIDATED_ON_CHAIN]
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
