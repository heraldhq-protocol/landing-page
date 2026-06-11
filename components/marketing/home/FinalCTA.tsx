"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CopyIcon as Copy } from "@/components/ui/copy";
import { CheckIcon as Check } from "@/components/ui/check";
import { ArrowRightIcon as ArrowRight } from "@/components/ui/arrow-right";
import { FINAL_PROTOCOL_CTA, isExternal } from "@/lib/cta-config";

const INSTALL_CMD = "npm i @herald-protocol/sdk";

export default function FinalCTA() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="py-24 border-t border-border/30 relative overflow-hidden bg-navy">
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-text-primary font-display text-balance">
          Your first notification is one install away
        </h2>

        <p className="text-lg text-text-secondary max-w-xl mx-auto mb-10">
          Install the SDK, call <span className="font-mono text-text-primary">notify()</span>, and Herald handles
          encryption, on-chain resolution, and delivery.
        </p>

        {/* Real, copyable first command — the actual first action */}
        <div className="max-w-md mx-auto mb-10">
          <div className="flex items-center gap-3 p-1.5 pl-4 rounded-xl bg-bg-elevated border border-border font-mono text-sm group hover:border-teal/30 transition-colors duration-300">
            <span className="text-teal select-none">$</span>
            <code className="flex-1 text-left text-text-secondary truncate">
              {INSTALL_CMD}
            </code>
            <button
              onClick={handleCopy}
              aria-label="Copy install command"
              className="shrink-0 inline-flex items-center gap-1.5 px-3 h-9 rounded-lg bg-bg-surface hover:bg-teal/10 text-text-muted hover:text-teal transition-all duration-200"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-teal" />
                  <span className="text-teal hidden sm:inline">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild className="bg-teal text-navy hover:bg-teal/90 font-bold px-8 py-5 h-auto text-lg rounded-xl transition-all hover:scale-105 duration-300">
            <Link
              href={FINAL_PROTOCOL_CTA.href}
              {...(isExternal(FINAL_PROTOCOL_CTA.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {FINAL_PROTOCOL_CTA.label}
            </Link>
          </Button>
          <Link
            href="/docs/quickstart"
            className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-teal transition-colors group"
          >
            Read the quickstart
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
