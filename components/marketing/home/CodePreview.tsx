"use client";

import { useState } from "react";
import { Terminal, Copy, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CODE_SAMPLES = {
  typescript: {
    label: "TypeScript SDK",
    lang: "typescript",
    code: `import { Herald } from '@herald-protocol/sdk';

const herald = new Herald({
  apiKey: process.env.HERALD_API_KEY, // hrld_live_xxx
});

// Send a DeFi alert — no email needed
const result = await herald.notify({
  wallet: '7xR4mKp2nQ...', // Recipient's Solana address
  subject: 'Liquidation Warning — Action Required',
  body: 'Your health factor on Drift is 1.05. Add collateral.',
  category: 'defi',
  receipt: true,         // Write on-chain proof
  idempotencyKey: \`liq_\${userId}_\${Date.now()}\`,
});

// { notificationId, status: 'queued', receiptTx: null }`,
  },
  rest: {
    label: "REST API",
    lang: "bash",
    code: `curl -X POST https://api.useherald.xyz/v1/notify \\
  -H "Authorization: Bearer hrld_live_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "wallet": "7xR4mKp2nQ...",
    "subject": "Liquidation Warning — Action Required",
    "body": "Health factor 1.05 on Drift. Add collateral now.",
    "category": "defi",
    "receipt": true
  }'

# Response — 202 Accepted
# {
#   "notification_id": "01HX4K9P...",
#   "status": "queued",
#   "recipient_registered": true
# }`,
  },
//   rust: {
//     label: "Rust SDK",
//     lang: "rust",
//     code: `use herald_sdk::{Herald, NotifyRequest, Category};

// let herald = Herald::new(env!("HERALD_API_KEY"));

// let result = herald.notify(NotifyRequest {
//     wallet: "7xR4mKp2nQ...".to_string(),
//     subject: "Liquidation Warning".to_string(),
//     body: "Health factor: 1.05 on Drift.".to_string(),
//     category: Category::Defi,
//     receipt: true,
//     idempotency_key: Some(format!("liq_{}", user_id)),
// }).await?;

// println!("Queued: {}", result.notification_id);`,
//   },
};

type Tab = keyof typeof CODE_SAMPLES;

// Basic syntax highlighting — colour key tokens
function highlight(code: string, lang: string): string {
  if (lang === "bash") {
    return code
      .replace(/(#.*)/g, '<span class="text-text-muted">$1</span>')
      .replace(/(".*?")/g, '<span class="text-amber">$1</span>')
      .replace(/\b(curl|POST|GET)\b/g, '<span class="text-purple">$1</span>');
  }
  return code
    .replace(/(\/\/.*)/g, '<span class="text-text-muted/60 italic">$1</span>')
    .replace(/('.*?'|`.*?`)/g, '<span class="text-amber">$1</span>')
    .replace(
      /\b(await|const|import|from|true|false|async|let|use|pub|fn|struct|enum|impl)\b/g,
      '<span class="text-purple">$1</span>',
    )
    .replace(
      /\b(herald|Herald|notify|NotifyRequest|Category)\b/g,
      '<span class="text-teal">$1</span>',
    );
}

export default function CodePreview() {
  const [tab, setTab] = useState<Tab>("typescript");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(CODE_SAMPLES[tab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const current = CODE_SAMPLES[tab];

  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden border-t border-border/30">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-bg-base via-bg-surface/20 to-bg-base pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ── Left — copy ─────────────────────────────────────────── */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-4">
              Developer experience
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary leading-tight mb-5">
              Integrate in <span className="text-teal">minutes,</span>
              <br />
              not days.
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8 max-w-md">
              Our SDK handles the complex encryption, on-chain identity
              resolution, and ZK receipt writing.{" "}
              <span className="text-text-primary font-medium">
                You just call notify().
              </span>
            </p>

            {/* Quick points */}
            <div className="space-y-3 mb-10">
              {[
                "TypeScript, Rust, and REST API — all first-class",
                "Automatic retry with exponential backoff",
                "Full TypeScript types auto-generated from OpenAPI",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-text-secondary"
                >
                  <div className="w-1 h-1 rounded-full bg-teal shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Button
                asChild
                className="bg-teal text-bg-base hover:bg-teal/90 font-bold rounded-xl px-6 h-11 shadow-[0_0_20px_rgba(0,200,150,0.2)] hover:shadow-[0_0_30px_rgba(0,200,150,0.35)] transition-shadow duration-300 group"
              >
                <Link
                  href="/docs/getting-started/quickstart"
                  className="flex items-center gap-2"
                >
                  View quickstart
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Link
                href="/docs/sdk/typescript"
                className="text-sm text-text-muted hover:text-teal transition-colors flex items-center gap-1.5 group"
              >
                SDK reference
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* ── Right — code block ──────────────────────────────────── */}
          <div className="relative group min-w-0 w-full max-w-[calc(100vw-3rem)] md:max-w-none">
            {/* Glow */}
            <div className="absolute -inset-1 bg-linear-to-r from-teal/15 to-purple/15 rounded-2xl blur-xl opacity-0 xl:group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative bg-[#020810] border border-border rounded-2xl overflow-hidden shadow-2xl">
              {/* Window chrome */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 bg-bg-surface/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red/50" />
                  <div className="w-3 h-3 rounded-full bg-amber/50" />
                  <div className="w-3 h-3 rounded-full bg-green/50" />
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide flex-nowrap shrink-0 max-w-[60%] sm:max-w-none">
                  {(Object.keys(CODE_SAMPLES) as Tab[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => setTab(key)}
                      className={`px-3 py-1 rounded-md text-xs font-mono transition-all duration-200 ${
                        tab === key
                          ? "bg-teal/15 text-teal border border-teal/25"
                          : "text-text-muted hover:text-text-secondary"
                      }`}
                    >
                      {CODE_SAMPLES[key].label}
                    </button>
                  ))}
                </div>

                {/* Copy button */}
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs text-text-muted hover:text-teal transition-colors px-2 py-1 rounded-md hover:bg-teal/10"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-teal" />
                      <span className="text-teal">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code */}
              <div className="p-4 sm:p-6 overflow-x-auto max-w-full">
                <pre className="text-[11px] sm:text-sm font-mono leading-relaxed inline-block min-w-full">
                  <code
                    dangerouslySetInnerHTML={{
                      __html: highlight(current.code, current.lang),
                    }}
                    className="text-text-secondary"
                  />
                </pre>
              </div>

              {/* Footer bar */}
              <div className="px-4 py-2.5 border-t border-border/40 bg-bg-surface/30 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-text-muted" />
                  <span className="text-xs text-text-muted font-mono">
                    @herald-protocol/sdk v1.1.0
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                  <span className="text-xs text-teal font-mono">ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
