import Link from "next/link";
import { FRAMEWORKS } from "@/lib/framework-data";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Bell,
  Terminal,
  Globe,
  Monitor,
  Server,
  Layers,
  FileCode,
  Bot,
  Puzzle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import JsonLd from "@/components/seo/JsonLd";
import { Metadata } from "next";
import { EmptyState } from "@/components/ui/empty-state";
import { SyntaxHighlight } from "@/components/ui/syntax-highlight";

const ICON_MAP: Record<string, React.ElementType> = {
  Globe, Monitor, Server, Layers, FileCode, Terminal, Zap, Bot,
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return FRAMEWORKS.map((fw) => ({
    slug: fw.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const fw = FRAMEWORKS.find((f) => f.slug === slug);
  if (!fw) return {};

  return {
    title: `Integrate Herald with ${fw.name} — ${fw.category}`,
    description: `Add zero-PII notifications to your ${fw.name} project. Install @herald-protocol/sdk, initialize the client, and start sending privacy-preserving alerts.`,
    keywords: [`${fw.name} notifications`, `${fw.name} Herald`, "Solana notifications", "Web3 privacy", fw.category],
  };
}

function CodeBlock({ code, title }: { code: string; title?: string }) {
  const lines = code.trimEnd().split("\n");
  const lineDigits = String(lines.length).length;

  return (
    <div className="bg-[#011627] border border-[#1D3B53] rounded-xl overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-[#1D3B53] bg-[#01111D]">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E] border border-[#DE9F2D]" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
        </div>
        {title && (
          <span className="text-[9px] sm:text-[11px] font-mono text-[#5F7E97] tracking-wide truncate ml-2">{title}</span>
        )}
        <div className="w-10 sm:w-14 shrink-0" />
      </div>
      <div className="flex bg-[#011627]">
        <div className="select-none text-right px-2 sm:px-3 py-3 sm:py-4 text-xs sm:text-[13px] leading-relaxed font-mono text-[#5F7E97] border-r border-[#1D3B53] bg-[#011627]">
          {lines.map((_, i) => (
            <div key={i}>{String(i + 1).padStart(lineDigits, "\u00A0")}</div>
          ))}
        </div>
        <div className="flex-1 p-3 sm:p-4 overflow-x-auto">
          <SyntaxHighlight code={code} />
        </div>
      </div>
    </div>
  );
}

export default async function IntegrationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const fw = FRAMEWORKS.find((f) => f.slug === slug);

  if (!fw) {
    return (
      <main className="min-h-screen pt-32 pb-20">
        <EmptyState
          icon={Puzzle}
          title="Integration Not Found"
          message="The framework or library you're looking for doesn't have an integration guide yet."
          actionLabel="Back to Integrations"
          actionHref="/integrations"
        />
      </main>
    );
  }

  const Icon = ICON_MAP[fw.icon] || Terminal;

  return (
    <main className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/5 blur-[120px] -z-10 rounded-full" />
      
      <JsonLd 
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": `Herald Integration for ${fw.name}`,
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Web",
          "description": fw.description,
          "provider": {
            "@type": "Organization",
            "name": "Herald Protocol",
            "url": "https://useherald.xyz"
          }
        }}
      />

      <div className="container mx-auto px-6 max-w-6xl">
        {/* ── Back Link ───────────────────────────────────── */}
        <Link href="/integrations" className="inline-flex items-center gap-2 text-teal text-sm font-bold uppercase tracking-widest mb-10 hover:gap-3 transition-all">
          <ArrowRight className="rotate-180" size={16} />
          Back to Integrations
        </Link>

        {/* ── Hero ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 sm:gap-6 mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-[1.25rem] sm:rounded-[1.5rem] bg-card/40 border border-border/50 flex items-center justify-center backdrop-blur-sm">
                <Icon className="text-teal" size={24} />
              </div>
              <div>
                <Badge className="bg-teal/10 text-teal border-teal/20 mb-2 uppercase tracking-tighter text-[10px]">{fw.category}</Badge>
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-black font-display tracking-tight text-text-primary">
                  Herald + {fw.name}
                </h1>
              </div>
            </div>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              {fw.longDescription}
            </p>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 lg:row-start-1">
            <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-[2.5rem] p-8 space-y-6 shadow-2xl sticky top-32">
              <div className="space-y-2">
                <h3 className="text-xl font-black font-display">Ready to ship?</h3>
                <p className="text-text-secondary text-sm">Start sending zero-PII notifications in minutes.</p>
              </div>
              <Link 
                href="https://notify.useherald.xyz"
                className="w-full py-4 bg-teal text-navy font-black rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-teal/20 text-sm"
              >
                REGISTER YOUR WALLET
                <ArrowRight size={18} />
              </Link>
              <div className="flex items-center justify-center gap-4 text-text-muted text-[10px] font-bold uppercase tracking-[0.2em]">
                <span className="flex items-center gap-1"><ShieldCheck size={12} /> ZK-SECURE</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span className="flex items-center gap-1"><Zap size={12} /> SOLANA NATIVE</span>
              </div>
              <div className="pt-4 border-t border-border/50 space-y-3 text-xs">
                <p className="font-bold text-text-primary">
                  Package: <span className="text-teal font-mono">{fw.packageName || "N/A"}</span>
                </p>
                <p className="font-bold text-text-primary">
                  Install: <span className="text-text-muted font-mono">{fw.installCommand || "See docs above"}</span>
                </p>
                {fw.repoUrl && (
                  <Link href={fw.repoUrl} className="block text-sm font-bold text-teal hover:underline">
                    View full example on GitHub →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Snippets ────────────────────────────────────── */}
        <div className="max-w-4xl space-y-16">
          {fw.snippets.map((snippet, i) => (
            <section key={i} className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-4">
                <div>
                  <h2 className="text-2xl font-bold font-display text-text-primary">{snippet.title}</h2>
                  <p className="text-text-secondary text-sm mt-1">{snippet.description}</p>
                </div>
                {snippet.githubUrl && (
                  <Link
                    href={snippet.githubUrl}
                    className="shrink-0 text-[10px] font-bold text-teal hover:underline uppercase tracking-widest mt-1"
                  >
                    Source →
                  </Link>
                )}
              </div>
              <CodeBlock code={snippet.code} title={fw.slug === "ai-mcp" ? undefined : `${fw.name} / ${snippet.title}`} />
            </section>
          ))}

          {/* ── Use Cases ──────────────────────────────────── */}
          {fw.useCases.length > 0 && (
            <section className="space-y-6 pt-8 border-t border-border/30">
              <h2 className="text-2xl font-bold font-display text-text-primary">Common Patterns</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fw.useCases.map((uc, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                    <div className="p-2 bg-teal/10 rounded-lg">
                      <Bell className="text-teal" size={16} />
                    </div>
                    <span className="text-sm font-bold text-text-primary leading-tight">{uc}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── CTA ────────────────────────────────────────── */}
          <section className="p-1 bg-linear-to-r from-teal/20 via-transparent to-purple-500/20 rounded-[2.5rem]">
            <div className="bg-bg-base rounded-[2.4rem] p-8 sm:p-10 md:p-14 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
              <div className="flex-1 space-y-3">
                <h2 className="text-2xl md:text-3xl font-extrabold font-display leading-tight">
                  Start building with <span className="text-teal">Herald</span>
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Clone the examples repo, copy the code that fits your stack, and deploy.
                </p>
              </div>
              <div className="flex gap-4 shrink-0">
                <Link
                  href="https://github.com/heraldhq-protocol/herald-example"
                  className="px-6 py-3 bg-teal text-navy font-black rounded-2xl hover:scale-105 transition-transform text-sm"
                >
                  VIEW ON GITHUB
                </Link>
                <Link
                  href="/docs/quickstart"
                  className="px-6 py-3 border border-teal/30 text-teal font-black rounded-2xl hover:bg-teal/10 transition-all text-sm"
                >
                  READ DOCS
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
