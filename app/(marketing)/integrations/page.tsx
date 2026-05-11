import Link from "next/link";
import { FRAMEWORKS } from "@/lib/framework-data";
import {
  ArrowRight,
  Globe,
  Monitor,
  Server,
  Layers,
  FileCode,
  Terminal,
  Zap,
  Bot,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

const ICON_MAP: Record<string, React.ElementType> = {
  Globe,
  Monitor,
  Server,
  Layers,
  FileCode,
  Terminal,
  Zap,
  Bot,
};

export const metadata: Metadata = {
  title: "Framework Integrations | Herald",
  description: "Integrate Herald privacy-preserving notifications into your stack — Next.js, React, Express, NestJS, Hono, CLI, and more.",
};

export default function IntegrationsPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-app-glow opacity-30" />
      
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <Badge variant="outline" className="border-teal/30 text-teal bg-teal/5 px-3 py-1 mb-6 text-xs font-bold uppercase tracking-widest">
            SDK Integrations
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold font-display tracking-tight text-text-primary mb-6">
            Integrate Herald into <span className="text-teal">Any Stack</span>
          </h1>
          <p className="text-base sm:text-xl text-text-secondary leading-relaxed">
            Copy-paste code examples for every major framework. Install the SDK,
            initialize the client, and start sending zero-PII notifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {FRAMEWORKS.map((fw) => {
            const Icon = ICON_MAP[fw.icon] || Terminal;
            return (
              <Link 
                key={fw.slug} 
                href={`/integrations/${fw.slug}`}
                className="group relative bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:border-teal/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal/10 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="text-teal" size={20} />
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Icon className="text-teal" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">{fw.name}</h3>
                    <span className="text-xs font-semibold text-teal font-mono uppercase tracking-widest">{fw.category}</span>
                  </div>
                </div>

                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  {fw.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {fw.useCases.slice(0, 2).map((uc, i) => (
                    <span key={i} className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-2 py-1 rounded-md bg-white/5 border border-white/5">
                      {uc}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
          
          <div className="border border-dashed border-border/50 rounded-3xl p-8 flex flex-col items-center justify-center text-center opacity-60">
            <Terminal className="text-text-muted mb-4" size={32} />
            <h3 className="text-lg font-bold text-text-secondary mb-2">Your Framework Here?</h3>
            <Link 
              href="/docs/quickstart" 
              className="text-xs font-bold text-teal hover:underline uppercase tracking-widest"
            >
              View Integration docs →
            </Link>
          </div>
        </div>

        <div className="mt-32 p-1 bg-linear-to-r from-teal/20 via-transparent to-purple-500/20 rounded-[2.5rem]">
          <div className="bg-bg-base rounded-[2.4rem] p-8 sm:p-12 md:p-16 flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold font-display leading-tight">
                All examples on <br /> 
                <span className="text-teal">GitHub</span>
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Every code snippet on this page comes from real, tested examples 
                in the Herald examples repository. Clone the repo, copy the code, 
                and ship.
              </p>
              <div className="pt-4">
                <Link
                  href="https://github.com/heraldhq-protocol/herald-example"
                  className="inline-flex items-center gap-3 px-6 py-4 bg-teal text-navy font-black rounded-2xl hover:scale-105 transition-transform text-sm"
                >
                  VIEW ON GITHUB →
                </Link>
              </div>
            </div>
            <div className="lg:w-1/3 w-full">
              <Link href="/docs/quickstart" className="block w-full text-center py-4 bg-teal text-navy font-black rounded-2xl hover:scale-105 transition-transform">
                READ THE DOCS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
