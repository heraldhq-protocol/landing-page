"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon as ArrowRight } from "@/components/ui/arrow-right";
import { WalletIcon as Wallet } from "@/components/ui/wallet";
import { KeyIcon as Key } from "@/components/ui/key";
import { SendIcon as Send } from "@/components/ui/send";
import { ReceiptIcon as Receipt } from "@/components/ui/receipt";
import { CheckIcon as Check } from "@/components/ui/check";
import JsonLd from "@/components/seo/JsonLd";

const STAGE_MS = 1900;

// Herald's real notification lifecycle. The contact never appears as a
// readable value — it stays an encrypted hash from resolution onward,
// which is the whole privacy claim, made visible.
const STAGES = [
  {
    number: "01",
    title: "Protocol calls notify()",
    desc: "Your protocol sends a wallet address and a message. No email address — ever.",
    icon: Wallet,
    tag: "One API call",
    field: { k: "wallet", v: "7xR4mKp2nQ…aF9", tone: "text-text-secondary" },
  },
  {
    number: "02",
    title: "Privacy resolution",
    desc: "Herald resolves the wallet against the Privacy Registry PDA — to an encrypted contact, never a plaintext one.",
    icon: Key,
    tag: "Zero PII exposed",
    field: { k: "contact_hash", v: "0x9af3…e21", tone: "text-amber", note: "encrypted" },
  },
  {
    number: "03",
    title: "Secure delivery",
    desc: "The payload is decrypted in-memory, delivered, then discarded. Nothing is written to disk.",
    icon: Send,
    tag: "Never stored",
    field: { k: "channel", v: "✉ email · telegram", tone: "text-teal" },
  },
  {
    number: "04",
    title: "ZK receipt written",
    desc: "An immutable ZK-compressed leaf lands on Solana as provable, permanent delivery proof.",
    icon: Receipt,
    tag: "On-chain proof",
    field: { k: "leaf", v: "0x4b1c…a9 · slot 298,442,109", tone: "text-teal" },
  },
];

export default function HowItWorks() {
  const container = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Respect reduced-motion: resolve all stages, no cycling.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Only animate while the panel is on screen.
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setPlaying(entry.isIntersecting),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The state machine: advance through stages on a loop.
  useEffect(() => {
    if (reduced || !playing) return;
    const id = window.setInterval(
      () => setActive((s) => (s + 1) % STAGES.length),
      STAGE_MS,
    );
    return () => window.clearInterval(id);
  }, [reduced, playing]);

  return (
    <section ref={container} className="py-16 sm:py-24 lg:py-32 relative">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: STAGES.map((s) => ({
            "@type": "Question",
            name: s.title,
            acceptedAnswer: { "@type": "Answer", text: s.desc },
          })),
        }}
      />
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">

          {/* ── Left Column: Sticky Header ──────────────────────────── */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:h-[calc(100vh-16rem)] flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal mb-4">
              How it works
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-text-primary leading-tight mb-5 text-balance">
              Transparent by design.{" "}
              <br className="hidden lg:block" />
              <span className="text-teal">Private by default.</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed max-w-sm mb-8">
              Follow one notification through Herald. The contact stays an
              encrypted hash the entire way — provably delivered, never stored.
            </p>

            {/* Live progress dots — mirror the active stage */}
            <div
              className="hidden lg:flex items-center gap-2 mb-10"
              aria-hidden="true"
            >
              {STAGES.map((s, i) => (
                <span
                  key={s.number}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    reduced || i <= active
                      ? "bg-teal"
                      : "bg-border"
                  } ${i === active && !reduced ? "w-8" : "w-4"}`}
                />
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-6">
              <a
                href="/how-it-works"
                className="flex items-center gap-2 text-sm font-semibold text-teal hover:text-teal/80 transition-colors group"
              >
                Deep dive into the privacy model
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* ── Right Column: Live State Machine ────────────────────── */}
          <div ref={panelRef} className="lg:col-span-7 lg:pl-16 relative">
            <div className="flex flex-col">
              {STAGES.map((stage, i) => {
                const Icon = stage.icon;
                const isActive = !reduced && i === active;
                const isDone = reduced || i < active;
                const isLast = i === STAGES.length - 1;

                return (
                  <div key={stage.number} className="relative flex gap-5 sm:gap-7">

                    {/* Node + connector rail */}
                    <div className="flex flex-col items-center shrink-0">
                      <div
                        className={`relative w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
                          isActive
                            ? "bg-teal/15 border-teal scale-110 shadow-[0_0_28px_rgba(0,200,150,0.35)]"
                            : isDone
                              ? "bg-teal/10 border-teal/40"
                              : "bg-bg-surface border-border"
                        }`}
                      >
                        {isDone && !isActive ? (
                          <Check size={18} className="text-teal" />
                        ) : (
                          <Icon
                            size={18}
                            className={isActive ? "text-teal" : "text-text-muted"}
                          />
                        )}
                      </div>

                      {/* Connector — fills as the payload advances */}
                      {!isLast && (
                        <div className="relative w-px flex-1 my-2 bg-border overflow-hidden min-h-[3.5rem]">
                          <div
                            className={`absolute inset-x-0 top-0 bg-teal transition-all duration-500 ${
                              isDone ? "h-full" : "h-0"
                            }`}
                          />
                        </div>
                      )}
                    </div>

                    {/* Stage content */}
                    <div
                      className={`flex-1 pb-12 transition-opacity duration-500 ${
                        isActive || isDone ? "opacity-100" : "opacity-45"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono text-xs font-bold text-text-muted">
                          {stage.number}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold font-mono tracking-wide transition-colors duration-500 ${
                            isActive
                              ? "border-teal/40 bg-teal/10 text-teal"
                              : "border-border bg-bg-surface text-text-muted"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                              isActive ? "bg-teal animate-pulse" : isDone ? "bg-teal" : "bg-text-muted"
                            }`}
                          />
                          {stage.tag}
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-2 font-display leading-tight">
                        {stage.title}
                      </h3>
                      <p className="text-text-secondary leading-relaxed max-w-md mb-4">
                        {stage.desc}
                      </p>

                      {/* The payload's data at this stage */}
                      <div
                        className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 font-mono text-xs transition-all duration-500 ${
                          isActive
                            ? "border-teal/30 bg-bg-base/70"
                            : "border-border bg-bg-surface/60"
                        }`}
                      >
                        <span className="text-text-muted">{stage.field.k}</span>
                        <span className="text-text-muted">=</span>
                        <span className={stage.field.tone}>{stage.field.v}</span>
                        {stage.field.note && (
                          <span className="ml-1 text-[10px] italic text-text-muted/70">
                            {stage.field.note}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile CTA */}
          <div className="lg:hidden mt-2">
            <a
              href="/how-it-works"
              className="flex items-center gap-2 text-sm font-semibold text-teal group"
            >
              Deep dive into the privacy model
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
