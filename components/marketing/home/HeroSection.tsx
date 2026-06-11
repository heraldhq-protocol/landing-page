"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon as ArrowRight } from "@/components/ui/arrow-right";
import { NetworkSolana } from "@web3icons/react";
import { HERO_PROTOCOL_CTA, isExternal } from "@/lib/cta-config";
import LiquidEther from "@/components/ui/liquid-ether";

// Teal remap of the ReactBits demo palette. The demo ships
// [#5227FF vivid, #FF9FFC light highlight, #B497CF muted mid] — a
// vivid / light / muted tri-tone. Same tonal structure, teal hue:
// vivid teal, pale aquamarine highlight, muted sea-green.
const LIQUID_COLORS = ["#00C896", "#7FFFE0", "#3FA98C"];

const STATS = [
  { label: "API response", value: "< 200ms" },
  { label: "Delivery rate", value: "99.9%" },
  { label: "Per ZK receipt", value: "$0.0001" },
  { label: "Time to integrate", value: "5 min" },
];

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "back.out(1.2)", duration: 0.9 } });

      tl.from(".hero-badge", { opacity: 0, y: 16 })
        .from(".hero-title", { opacity: 0, y: 28 }, "-=0.6")
        .from(".hero-sub", { opacity: 0, y: 20 }, "-=0.75")
        .from(".hero-cta", { opacity: 0, y: 16, stagger: 0.12 }, "-=0.7")
        .from(".hero-stats", { opacity: 0, y: 12, stagger: 0.08 }, "-=0.5");
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col items-center text-center"
    >
      {/* Liquid ether fluid — full-bleed, full-strength (ReactBits demo
          settings). Listeners bind to window, so the canvas stays
          pointer-events-none and CTAs remain clickable while the fluid
          still reacts to the cursor across the whole hero. */}
      <div className="absolute inset-0 -z-20 pointer-events-none motion-reduce:hidden">
        <LiquidEther
          colors={LIQUID_COLORS}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          mouseForce={20}
          cursorSize={100}
          resolution={0.5}
          takeoverDuration={0.25}
          autoResumeDelay={1000}
          BFECC
          className="h-full w-full"
        />
      </div>

      {/* Reduced-motion fallback: a static teal glow so the hero never
          renders flat for users who opt out of animation. */}
      <div className="absolute inset-0 -z-20 hidden motion-reduce:block pointer-events-none">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[70%] h-[55%] bg-teal/15 blur-[120px] rounded-full" />
      </div>

      {/* Localized legibility vignette — darkens behind the text only, so
          the fluid stays vivid at the edges (the demo look) while the
          headline keeps contrast. */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 42%, color-mix(in srgb, var(--bg-base) 78%, transparent) 0%, color-mix(in srgb, var(--bg-base) 45%, transparent) 45%, transparent 75%)",
        }}
      />

      {/* Edge fades so the fluid dissolves into the page top and bottom. */}
      <div className="absolute inset-x-0 top-0 h-24 -z-10 bg-linear-to-b from-bg-base to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 -z-10 bg-linear-to-t from-bg-base to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 w-full max-w-4xl flex flex-col items-center">
        {/* Badge */}
        <div className="hero-badge inline-flex mb-8">
          <Badge
            variant="outline"
            className="border-teal/30 text-teal bg-teal/5 px-3 py-1 tracking-widest uppercase text-xs font-bold flex items-center gap-2"
          >
            <NetworkSolana variant="branded" size={16} /> Built on Solana
          </Badge>
        </div>

        {/* Headline */}
        <h1 className="hero-title font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-balance">
          <span className="text-text-primary">The notification</span>{" "}
          <span className="text-text-primary">layer for DeFi.</span>{" "}
          <span className="text-teal text-glow">Privacy-first.</span>
        </h1>

        {/* Sub */}
        <p className="hero-sub text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto mb-10 text-balance [text-shadow:0_1px_12px_rgba(4,12,24,0.6)]">
          Protocols alert users via email, Telegram, and SMS —{" "}
          <span className="text-text-primary font-medium">
            without ever learning their contact info.
          </span>{" "}
          Users stay in control. Always.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full">
          <div className="hero-cta w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              className="bg-teal text-navy hover:bg-teal/90 font-bold px-8 h-12 text-base rounded-xl w-full sm:w-auto group hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(20,184,166,0.3)] transition-all duration-300"
            >
              <Link
                href={HERO_PROTOCOL_CTA.href}
                {...(isExternal(HERO_PROTOCOL_CTA.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {HERO_PROTOCOL_CTA.label}
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          <div className="hero-cta w-full sm:w-auto">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border-2 text-text-primary hover:border-teal/40 hover:text-teal px-8 h-12 text-base rounded-xl bg-card/50 backdrop-blur-sm w-full sm:w-auto transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal/10"
            >
              <Link href="https://notify.useherald.xyz/register">
                Register your wallet
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-3xl border-t border-border/30 pt-10">
          {STATS.map((stat) => (
            <div key={stat.label} className="hero-stats text-center flex flex-col items-center">
              <div className="font-mono text-teal font-semibold text-xl md:text-2xl leading-tight mb-1">
                {stat.value}
              </div>
              <div className="text-text-muted text-xs md:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}