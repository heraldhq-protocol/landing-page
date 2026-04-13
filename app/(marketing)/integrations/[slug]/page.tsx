import { notFound } from "next/navigation";
import Link from "next/link";
import { INTEGRATIONS } from "@/lib/integrations-data";
import { ArrowRight, ShieldCheck, Zap, Bell, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import JsonLd from "@/components/seo/JsonLd";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INTEGRATIONS.map((app) => ({
    slug: app.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = INTEGRATIONS.find((a) => a.slug === slug);
  if (!app) return {};

  return {
    title: `${app.name} Notifications — Privacy-Preserving alerts for ${app.name}`,
    description: `Get real-time ${app.name} notifications without sharing your email or Telegram with the protocol. Powered by Herald's zero-PII infrastructure.`,
    keywords: [`${app.name} alerts`, `${app.name} notifications`, "Solana notifications", "Web3 privacy"],
  };
}

export default async function IntegrationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const app = INTEGRATIONS.find((a) => a.slug === slug);

  if (!app) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/5 blur-[120px] -z-10 rounded-full" />
      
      {/* Schema Markup for Product/Service */}
      <JsonLd 
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": `Herald Integration for ${app.name}`,
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "description": app.description,
          "provider": {
            "@type": "Organization",
            "name": "Herald Protocol",
            "url": "https://useherald.xyz"
          }
        }}
      />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* ⚡ Left Content: Header & Info ────────────────────────── */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <Link href="/integrations" className="inline-flex items-center gap-2 text-teal text-sm font-bold uppercase tracking-widest mb-10 hover:gap-3 transition-all">
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to Integrations
              </Link>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-[2rem] bg-card/40 border border-border/50 flex items-center justify-center p-4 backdrop-blur-sm">
                   <span className="text-4xl font-black text-teal">{app.name[0]}</span>
                </div>
                <div>
                  <Badge className="bg-teal/10 text-teal border-teal/20 mb-2 uppercase tracking-tighter text-[10px]">{app.category}</Badge>
                  <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-text-primary">
                    Herald + {app.name}
                  </h1>
                </div>
              </div>

              <p className="text-xl text-text-secondary leading-relaxed font-medium">
                {app.longDescription}
              </p>
            </div>

            {/* Key Capabilities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {app.useCases.map((useCase, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                  <div className="p-2 bg-teal/10 rounded-lg">
                    <Bell className="w-4 h-4 text-teal" />
                  </div>
                  <span className="text-sm font-bold text-text-primary leading-tight">{useCase}</span>
                </div>
              ))}
            </div>

            {/* Step by Step */}
            <div className="space-y-6 pt-8">
               <h2 className="text-2xl font-black font-display">How to setup private {app.name} alerts</h2>
               <div className="space-y-4">
                 {[
                   { t: "Register", d: "Connect your wallet to Herald and register your encrypted contact info." },
                   { t: "Opt-in", d: `Select ${app.name} from the protocol list and choose your desired notification categories.` },
                   { t: "Receive", d: "Get alerts directly via your chosen channel. Herald handles the decryption in a secure enclave." }
                 ].map((step, i) => (
                   <div key={i} className="flex gap-6 pb-6 border-b border-border/30 last:border-0 group">
                     <span className="text-3xl font-black text-white/10 group-hover:text-teal/40 transition-colors">{i+1}</span>
                     <div>
                       <h4 className="font-bold text-text-primary">{step.t}</h4>
                       <p className="text-text-secondary text-sm">{step.d}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* ⚡ Right Content: CTA & Side ──────────────────────────── */}
          <div className="lg:col-span-5 sticky top-32">
            <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-[2.5rem] p-10 space-y-8 shadow-2xl">
              <div className="space-y-2">
                <h3 className="text-2xl font-black font-display">Ready for privacy?</h3>
                <p className="text-text-secondary text-sm">Join thousands of users securing their notification layer.</p>
              </div>

              <div className="space-y-4">
                <Link 
                  href="https://notify.useherald.xyz" 
                  className="w-full py-5 bg-teal text-navy font-black rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-teal/20"
                >
                  REGISTER YOUR WALLET
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <div className="flex items-center justify-center gap-4 text-text-muted text-[10px] font-bold uppercase tracking-[0.2em]">
                  <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> ZK-SECURE</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> SOLANA NATIVE</span>
                </div>
              </div>

              <div className="pt-6 border-t border-border/50">
                <div className="flex items-center gap-4 text-xs font-bold text-text-primary group cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-teal/10 transition-colors">
                     <Terminal className="w-4 h-4 text-text-muted group-hover:text-teal" />
                  </div>
                  <div>
                    <p>Are you the {app.name} team?</p>
                    <Link href="/docs/api" className="text-teal hover:underline tracking-tight font-bold">Integrate the Herald SDK →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
