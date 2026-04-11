"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

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
      className="relative pt-24 pb-20 md:pt-36 md:pb-32 overflow-hidden flex flex-col items-center text-center"
    >
      {/* Background glow - duotone centered */}
      <div className="absolute top-[10%] left-[20%] w-[60%] h-[60%] -z-10 bg-teal/15 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute top-[20%] right-[20%] w-[50%] h-[50%] -z-10 bg-purple-500/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 -z-10 bg-app-glow opacity-60" />

      {/* Subtle grid texture */}
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.03]" />

      {/* Radial fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 -z-10 bg-linear-to-t from-bg-base to-transparent" />

      <div className="container mx-auto px-6 relative z-10 w-full max-w-4xl flex flex-col items-center">
        {/* Badge */}
        <div className="hero-badge inline-flex mb-8">
          <Badge
            variant="outline"
            className="border-teal/30 text-teal bg-teal/5 px-3 py-1 tracking-widest uppercase text-xs font-bold"
          >
            ◈ Built on Solana
          </Badge>
        </div>

        {/* Headline */}
        <h1 className="hero-title font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 text-balance">
          <span className="text-text-primary">The notification</span>{" "}
          <span className="text-text-primary">layer for DeFi.</span>{" "}
          <span className="text-teal text-glow">Privacy-first.</span>
        </h1>

        {/* Sub */}
        <p className="hero-sub text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto mb-10 text-balance">
          Protocols alert users via email, Telegram, and SMS —{" "}
          <span className="text-text-primary font-medium">
            without ever learning their contact info.
          </span>{" "}
          Users stay in control. Always.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full">
          <Button
            size="lg"
            className="hero-cta bg-teal text-navy hover:bg-teal/90 font-bold px-8 h-12 text-base rounded-xl w-full sm:w-auto group hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(20,184,166,0.3)] transition-all duration-300"
          >
            Integrate as a protocol
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="hero-cta border-border-2 text-text-primary hover:border-teal/40 hover:text-teal px-8 h-12 text-base rounded-xl bg-card/50 backdrop-blur-sm w-full sm:w-auto transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal/10"
          >
            Register your wallet
          </Button>
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