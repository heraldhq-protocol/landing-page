"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRightIcon as ArrowRight } from "@/components/ui/arrow-right";
import { WalletIcon as Wallet } from "@/components/ui/wallet";
import { LockIcon as Lock } from "@/components/ui/lock";
import { ZapIcon as Zap } from "@/components/ui/zap";
import JsonLd from "@/components/seo/JsonLd";

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
    desc: "Herald's secure decryption layer processes the encrypted payload in-memory, then delivers via Email, Telegram, or SMS before writing a ZK receipt.",
    icon: Zap,
    tag: "On-chain proof",
  },
];

export default function HowItWorks() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".scroll-step").forEach((step) => {
        gsap.from(step, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: container },
  );

  return (
    <section ref={container} className="py-16 sm:py-24 lg:py-32 relative">
      <JsonLd 
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": STEPS.map(step => ({
            "@type": "Question",
            "name": step.title,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": step.desc
            }
          }))
        }}
      />
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          
          {/* ── Left Column: Sticky Header ──────────────────────────── */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:h-[calc(100vh-16rem)] flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal mb-4">
              How it works
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary leading-tight mb-5 text-balance">
              Transparent by design.{" "}
              <br className="hidden lg:block"/>
              <span className="text-teal">Private by default.</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed max-w-sm mb-10">
              Three steps. No email stored anywhere. Every delivery provably on-chain.
            </p>
            
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

          {/* ── Right Column: Scrolling Blocks ──────────────────────── */}
          <div className="lg:col-span-7 lg:pl-16 relative">
            {/* Soft vertical connector line */}
            <div className="absolute left-[39px] lg:left-[103px] top-10 bottom-10 w-px bg-linear-to-b from-teal/30 via-teal/10 to-transparent hidden sm:block" />

            <div className="flex flex-col gap-24 md:gap-40 pb-20">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="scroll-step relative flex gap-6 md:gap-14 sm:pl-0">
                    
                    {/* Index column */}
                    <div className="hidden sm:flex flex-col items-center shrink-0 w-20">
                      <div className="w-20 h-20 rounded-full bg-bg-surface border border-border flex items-center justify-center shadow-xl shadow-teal/5 z-10 relative">
                        <span className="font-mono text-xl font-black text-text-primary">
                          {step.number}
                        </span>
                        {/* Glow */}
                        <div className="absolute inset-0 bg-teal/10 rounded-full blur-md -z-10" />
                      </div>
                    </div>

                    {/* Content Block (No Card Borders) */}
                    <div className="flex-1 pt-2">
                       <div className="inline-flex items-center gap-2 mb-6">
                         <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center">
                           <Icon size={16} className="text-teal" />
                         </div>
                         <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-teal/20 bg-teal/5">
                           <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                           <span className="text-xs font-semibold text-teal font-mono tracking-wide">
                             {step.tag}
                           </span>
                         </div>
                       </div>
                       
                       <h3 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-4 font-display leading-tight">
                         {step.title}
                       </h3>
                       <p className="text-text-secondary md:text-lg leading-relaxed max-w-lg">
                         {step.desc}
                       </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile CTA */}
          <div className="lg:hidden mt-10">
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
