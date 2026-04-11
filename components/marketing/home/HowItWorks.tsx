"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Wallet, Lock, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: "01",
    title: "Protocol calls /notify",
    desc: "Your protocol sends a wallet address and message payload. No email address required — ever.",
    icon: Wallet,
    tag: "One API call",
  },
  {
    number: "02",
    title: "Privacy Resolution",
    desc: "Herald resolves the wallet to an encrypted contact stored on-chain via the Privacy Registry PDA.",
    icon: Lock,
    tag: "Zero PII exposed",
  },
  {
    number: "03",
    title: "Secure Delivery",
    desc: "The Nitro Enclave decrypts in-memory, sends via Email, Telegram, or SMS, then writes a ZK receipt.",
    icon: Zap,
    tag: "On-chain proof",
  },
];

export default function HowItWorks() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".step-item", {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: container.current,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".connector-line", {
        scaleX: 0,
        transformOrigin: "left center",
        stagger: 0.2,
        duration: 0.6,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: container.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: container },
  );

  return (
    <section ref={container} className="py-28 relative overflow-hidden">
      {/* Section background */}
      <div className="absolute inset-0 bg-linear-to-b from-bg-base via-bg-surface/30 to-bg-base pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="max-w-xl mb-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal mb-4">
            How it works
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold font-display text-text-primary leading-tight mb-5">
            Transparent by design.{" "}
            <span className="text-teal">Private by default.</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            Three steps. No email stored anywhere. Every delivery provably
            on-chain.
          </p>
        </div>

        {/* ── Steps grid ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector lines (desktop only) */}
          <div className="hidden md:block absolute top-10 left-[33%] right-[33%] h-px">
            <div className="connector-line w-full h-px bg-linear-to-r from-border-2 via-teal/40 to-border-2" />
          </div>
          <div className="hidden md:block absolute top-10 left-[66%] right-0 h-px pr-12">
            <div className="connector-line w-full h-px bg-linear-to-r from-border-2 via-teal/40 to-transparent" />
          </div>

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="step-item">
                <div
                  className="group relative h-full p-8 rounded-2xl bg-bg-surface border border-border hover:border-teal/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal/10 transition-all duration-300"
                >
                {/* Step number — large background character */}
                <div className="absolute top-4 right-6 font-mono text-6xl font-black text-border/60 select-none leading-none">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="relative mb-8">
                  <div className="w-11 h-11 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center group-hover:bg-teal/15 group-hover:border-teal/40 transition-all duration-300">
                    <Icon className="w-5 h-5 text-teal" />
                  </div>
                  {/* Glow on hover */}
                  <div className="absolute inset-0 bg-teal/20 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-full -z-10" />
                </div>

                {/* Tag */}
                <div className="inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full border border-teal/20 bg-teal/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                  <span className="text-xs font-semibold text-teal font-mono">
                    {step.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-text-primary mb-3 font-display">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
            );
          })}
        </div>

        {/* ── CTA row ────────────────────────────────────────────────── */}
        <div className="mt-14 flex items-center gap-6">
          <a
            href="/how-it-works"
            className="flex items-center gap-2 text-sm font-semibold text-teal hover:text-teal/80 transition-colors group"
          >
            Deep dive into the privacy model
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <span className="text-border-2">·</span>
          <a
            href="/docs/privacy-model"
            className="text-sm text-text-muted hover:text-text-secondary transition-colors"
          >
            Read the encryption spec
          </a>
        </div>
      </div>
    </section>
  );
}
