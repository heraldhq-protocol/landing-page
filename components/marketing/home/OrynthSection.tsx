"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon as ArrowRight } from "@/components/ui/arrow-right";
import { Copy, Check } from "lucide-react";

const ORYNTH_URL = "https://orynth.dev/projects/herald-protocol";
const CONTRACT_ADDRESS = "3ifTB4CtomDdMtMPNVaVZ6ViT8oUXenk9qZbrY4KMory";
const EXPLORER_URL = `https://solscan.io/token/${CONTRACT_ADDRESS}`;

const BELIEVER_BENEFITS = [
  {
    tier: "Any holder",
    benefit: "Early access to the Herald user portal",
  },
  {
    tier: "Top 50 holders",
    benefit: "Priority notification slot + Early Believer badge on the portal",
  },
  {
    tier: "Active traders",
    benefit: "Private channel with direct access to the founders",
  },
];

function CopyCAButton() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(CONTRACT_ADDRESS).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex items-center gap-2 p-3 rounded-xl bg-bg-elevated border border-border group hover:border-teal/30 transition-all duration-300">
      <a
        href={EXPLORER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 min-w-0"
        title="View on Solscan"
      >
        <span className="font-mono text-xs text-text-secondary truncate block hover:text-teal transition-colors duration-200">
          {CONTRACT_ADDRESS}
        </span>
      </a>
      <button
        onClick={handleCopy}
        aria-label="Copy contract address"
        className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-teal/10 text-text-muted hover:text-teal transition-all duration-200"
      >
        {copied ? <Check size={14} className="text-teal" /> : <Copy size={14} />}
      </button>
    </div>
  );
}

export default function OrynthSection() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden border-t border-border/30">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-linear-to-br from-bg-base via-bg-surface/20 to-bg-base pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-teal/4 blur-3xl rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        {/* Section label + headline */}
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-4">
            Community · Early Believers
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-text-primary text-balance mb-5">
            Herald is live on{" "}
            <span className="text-teal">Orynth</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg leading-relaxed">
            Orynth is where Solana builders and early believers signal conviction
            in products they believe in. Herald is listed — join the community
            shaping what gets built.
          </p>

          {/* Contract address — center stage, under headline */}
          <div className="mt-8 inline-flex flex-col items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted">
              Official Contract Address
            </span>
            <div className="w-full max-w-sm">
              <CopyCAButton />
            </div>
            <a
              href={EXPLORER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-text-muted hover:text-teal transition-colors duration-200"
            >
              Verify on Solscan ↗
            </a>
          </div>
        </div>

        {/* Badge + benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          {/* Badge card */}
          <div className="group relative p-8 rounded-3xl bg-bg-surface border border-border overflow-hidden hover:border-teal/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal/10 transition-all duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 blur-3xl rounded-full pointer-events-none group-hover:opacity-150 transition-opacity duration-700" />

            <div className="relative flex flex-col items-center gap-5">
              {/* Primary (upvotes) badge */}
              <a
                href={ORYNTH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-105 transition-transform duration-300"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://orynth.dev/api/badge/herald-protocol?theme=dark&style=default"
                  alt="Featured on Orynth"
                  width={260}
                  height={80}
                  className="rounded-xl"
                />
              </a>

              {/* Minimal badge */}
              <a
                href={ORYNTH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-60 hover:opacity-100 hover:scale-105 transition-all duration-300"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://orynth.dev/api/badge/herald-protocol?theme=dark&style=minimal"
                  alt="Listed on Orynth"
                  width={152}
                  height={48}
                  className="rounded-lg"
                />
              </a>

              <p className="text-xs text-text-muted text-center max-w-[200px]">
                Live upvote count · Updates automatically
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted mb-1">
              Early believer benefits
            </p>

            {BELIEVER_BENEFITS.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-xl bg-bg-elevated border border-border hover:border-teal/25 transition-all duration-300"
              >
                <div className="mt-0.5 w-6 h-6 rounded-full bg-teal/10 border border-teal/25 flex items-center justify-center shrink-0">
                  <span className="text-teal text-[10px] font-bold">{i + 1}</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-teal uppercase tracking-wide mb-0.5">
                    {item.tier}
                  </div>
                  <div className="text-sm text-text-secondary leading-relaxed">
                    {item.benefit}
                  </div>
                </div>
              </div>
            ))}

            <Button
              asChild
              className="mt-3 bg-teal text-navy hover:bg-teal/90 font-bold rounded-xl px-7 h-11 shadow-[0_0_24px_rgba(0,200,150,0.2)] hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgba(0,200,150,0.3)] transition-all duration-300 group/btn self-start"
            >
              <Link
                href={ORYNTH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Become an early believer
                <ArrowRight
                  size={16}
                  className="group-hover/btn:translate-x-1 transition-transform"
                />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
