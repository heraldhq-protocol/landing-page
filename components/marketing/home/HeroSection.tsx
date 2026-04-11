"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, CheckCircle2, ArrowRight } from "lucide-react";

// ─── Mock notification data for the demo card ───────────────────────────────
const NOTIFICATIONS = [
  {
    id: 1,
    protocol: "Drift Protocol",
    type: "DEFI",
    typeColor: "text-red-400 bg-red-400/10 border-red-400/20",
    title: "Liquidation Warning",
    body: "Health factor 1.05 — add collateral now",
    time: "just now",
    dot: "bg-red-400",
  },
  {
    id: 2,
    protocol: "Realms",
    type: "GOV",
    typeColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    title: "Proposal #47 — Vote closes in 24h",
    body: "SPL token emission rate change",
    time: "3m ago",
    dot: "bg-purple-400",
  },
  {
    id: 3,
    protocol: "Marginfi",
    type: "DEFI",
    typeColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    title: "Health Factor Recovered",
    body: "Position is now at 1.82 — safe",
    time: "12m ago",
    dot: "bg-amber-400",
  },
];

const STATS = [
  { label: "API response", value: "< 200ms" },
  { label: "Delivery rate", value: "99.9%" },
  { label: "Per ZK receipt", value: "$0.0001" },
  { label: "Time to integrate", value: "5 min" },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });

      tl.from(".hero-badge", { opacity: 0, y: 16 })
        .from(".hero-title", { opacity: 0, y: 28 }, "-=0.6")
        .from(".hero-sub", { opacity: 0, y: 20 }, "-=0.75")
        .from(".hero-cta", { opacity: 0, y: 16, stagger: 0.12 }, "-=0.7")
        .from(".hero-stats", { opacity: 0, y: 12, stagger: 0.08 }, "-=0.5")
        .from(".hero-demo", { opacity: 0, x: 40, duration: 1.1 }, "-=1.2")
        .from(".demo-card", { opacity: 0, y: 20, stagger: 0.15, duration: 0.7 }, "-=0.8");
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative pt-20 pb-20 md:pt-25 md:pb-30 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-app-glow opacity-60" />

      {/* Subtle grid texture */}
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.03]" />

      {/* Radial fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 -z-10 bg-linear-to-t from-bg-base to-transparent" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12">

          {/* ── LEFT COLUMN ─────────────────────────────────────────────── */}
          <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">

            {/* Badge */}
            <div className="hero-badge inline-flex mb-4">
              <Badge
                variant="outline"
                className="border-teal/30 text-teal bg-teal/5 px-2 py-0.5 tracking-widest uppercase"
              >
                ◈ Built on Solana
              </Badge>
            </div>

            {/* Headline */}
            <h1 className="hero-title font-display text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
              <span className="text-text-primary">The notification</span>
              <br />
              <span className="text-text-primary">layer for DeFi.</span>
              <br />
              <span className="text-teal text-glow">Privacy-first.</span>
            </h1>

            {/* Sub */}
            <p className="hero-sub text-lg md:text-xl text-text-secondary leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10">
              Protocols alert users via email, Telegram, and SMS —{" "}
              <span className="text-text-primary font-medium">
                without ever learning their contact info.
              </span>{" "}
              Users stay in control. Always.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <Button
                size="lg"
                className="hero-cta bg-teal text-navy hover:bg-teal/90 font-bold px-8 h-12 text-base rounded-xl w-full sm:w-auto group"
              >
                Integrate as a protocol
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="hero-cta border-border-2 text-text-primary hover:border-teal/40 hover:text-teal px-8 h-12 text-base rounded-xl bg-card/50 backdrop-blur-sm w-full sm:w-auto transition-colors"
              >
                Register your wallet
              </Button>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="hero-stats text-center lg:text-left">
                  <div className="font-mono text-teal font-semibold text-lg leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-text-muted text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN — Demo card ─────────────────────────────────── */}
          <div className="hero-demo flex-1 w-full max-w-md mx-auto lg:mx-0 lg:max-w-sm xl:max-w-md">
            <div className="relative">

              {/* Glow behind the card stack */}
              <div className="absolute inset-0 bg-teal/10 blur-[80px] rounded-3xl -z-10" />

              {/* Demo window chrome */}
              <div className="rounded-2xl border border-border-2 bg-bg-elevated overflow-hidden shadow-2xl">

                {/* Window title bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-bg-surface">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red/60" />
                    <span className="w-3 h-3 rounded-full bg-amber/60" />
                    <span className="w-3 h-3 rounded-full bg-green/60" />
                  </div>
                  <div className="flex-1 mx-3">
                    <div className="bg-bg-base border border-border rounded-md px-3 py-1 text-xs text-text-muted font-mono text-center truncate">
                      inbox · alice@email.com
                    </div>
                  </div>
                  {/* Live indicator */}
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
                    </span>
                    <span className="text-xs text-teal font-mono">live</span>
                  </div>
                </div>

                {/* Notification cards */}
                <div className="p-3 space-y-2">
                  {NOTIFICATIONS.map((n, i) => (
                    <div
                      key={n.id}
                      className="demo-card group rounded-xl border border-border bg-bg-surface hover:border-border-2 transition-all duration-300 p-3.5 cursor-default"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    >
                      <div className="flex items-start gap-3">
                        {/* Status dot */}
                        <div className="mt-1.5 shrink-0">
                          <span className={`block w-2 h-2 rounded-full ${n.dot}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          {/* Protocol + type badge */}
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-text-muted font-mono truncate">
                              {n.protocol}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.5 rounded border font-mono ${n.typeColor}`}
                            >
                              {n.type}
                            </span>
                          </div>

                          {/* Title */}
                          <p className="text-sm font-semibold text-text-primary leading-tight mb-0.5 truncate">
                            {n.title}
                          </p>

                          {/* Body */}
                          <p className="text-xs text-text-muted leading-relaxed truncate">
                            {n.body}
                          </p>
                        </div>

                        {/* Time */}
                        <span className="text-[10px] text-text-muted font-mono shrink-0 mt-0.5">
                          {n.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Privacy footer */}
                <div className="px-4 py-3 border-t border-border bg-bg-surface flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <Shield className="h-3.5 w-3.5 text-teal shrink-0" />
                    <span>Herald never stored your email</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-teal font-mono">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>on-chain proof</span>
                  </div>
                </div>
              </div>

              {/* Floating tag — wallet address */}
              <div className="absolute -bottom-4 -left-4 bg-bg-elevated border border-border-2 rounded-xl px-3 py-2 shadow-xl">
                <div className="text-[10px] text-text-muted mb-0.5">recipient</div>
                <div className="font-mono text-xs text-teal">7xR4...nQ</div>
              </div>

              {/* Floating tag — ZK receipt */}
              <div className="absolute -top-4 -right-4 bg-bg-elevated border border-border-2 rounded-xl px-3 py-2 shadow-xl flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-teal" />
                <div>
                  <div className="text-[10px] text-text-muted">ZK receipt</div>
                  <div className="font-mono text-xs text-green">confirmed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}