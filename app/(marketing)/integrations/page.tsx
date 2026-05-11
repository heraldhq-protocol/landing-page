import Link from "next/link";
import Image from "next/image";
import { INTEGRATIONS } from "@/lib/integrations-data";
import { ArrowRight, Terminal, ShieldCheck, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Protocol Integrations | Herald",
  description: "Explore how Herald provides privacy-preserving notifications for the leading Solana protocols like Jupiter, Kamino, and Drift.",
};

export default function IntegrationsPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-app-glow opacity-30" />
      
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <Badge variant="outline" className="border-teal/30 text-teal bg-teal/5 px-3 py-1 mb-6 text-xs font-bold uppercase tracking-widest">
            Infrastructure Layer
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold font-display tracking-tight text-text-primary mb-6">
            Supported <span className="text-teal">Integrations</span>
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed">
            Herald powers zero-PII notifications across the Solana ecosystem. 
            Connect your favorite protocols to your private notification relay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INTEGRATIONS.map((app) => (
            <Link 
              key={app.slug} 
              href={`/integrations/${app.slug}`}
              className="group relative bg-card/40 backdrop-blur-sm border border-border/50 rounded-3xl p-8 hover:border-teal/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal/10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="text-teal" size={20} />
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                  {/* Fallback for icon if logoUrl is not reachable during dev */}
                  <span className="text-xl font-black text-teal">{app.name[0]}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">{app.name}</h3>
                  <span className="text-xs font-semibold text-teal font-mono uppercase tracking-widest">{app.category}</span>
                </div>
              </div>

              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                {app.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {app.useCases.slice(0, 2).map((uc, i) => (
                  <span key={i} className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-2 py-1 rounded-md bg-white/5 border border-white/5">
                    {uc}
                  </span>
                ))}
              </div>
            </Link>
          ))}
          
          {/* Incoming Integration Placeholder */}
          <div className="border border-dashed border-border/50 rounded-3xl p-8 flex flex-col items-center justify-center text-center opacity-60">
            <Terminal className="text-text-muted mb-4" size={32} />
            <h3 className="text-lg font-bold text-text-secondary mb-2">Your Protocol Here?</h3>
            <Link 
              href="/docs/quickstart" 
              className="text-xs font-bold text-teal hover:underline uppercase tracking-widest"
            >
              View Integration docs →
            </Link>
          </div>
        </div>

        {/* Global Value Prop Section */}
        <div className="mt-32 p-1 bg-linear-to-r from-teal/20 via-transparent to-purple-500/20 rounded-[2.5rem]">
          <div className="bg-bg-base rounded-[2.4rem] p-12 md:p-16 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold font-display leading-tight">
                Privacy is non-negotiable <br /> in the 
                <span className="text-teal"> notification layer.</span>
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Most protocols force users to choose between alerts and anonymity. 
                Herald removes that trade-off by using ZK-proofs and Nitro Enclaves 
                to deliver notifications without ever seeing your data.
              </p>
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-teal" size={24} />
                  <span className="text-sm font-bold uppercase tracking-widest">Client-side Encryption</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="text-teal" size={24} />
                  <span className="text-sm font-bold uppercase tracking-widest">Instant Delivery</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 w-full">
               <Link href="/how-it-works" className="block w-full text-center py-4 bg-teal text-navy font-black rounded-2xl hover:scale-105 transition-transform">
                 LEARN HOW IT WORKS
               </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
