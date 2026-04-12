"use client";

import { useRef } from "react";
import {
  Activity,
  ScrollText,
  PieChart,
  ShieldAlert,
  LineChart,
  Image,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const USE_CASES = [
  {
    icon: Activity,
    title: "Liquidation Warnings",
    desc: "Alert users when their health factor drops below a critical threshold to prevent unwinding.",
    tag: "DEFI",
  },
  {
    icon: ScrollText,
    title: "Governance Reminders",
    desc: "Notify token holders about active DAO proposals requiring their attention and vote.",
    tag: "DAO",
  },
  {
    icon: PieChart,
    title: "Position Updates",
    desc: "Send daily wrap-ups, claimable rewards, and significant lending position changes.",
    tag: "YIELD",
  },
  {
    icon: ShieldAlert,
    title: "Security Alerts",
    desc: "Instantly broadcast emergency protocol pauses or action-required security updates.",
    tag: "SECURITY",
  },
  {
    icon: LineChart,
    title: "Yield Changes",
    desc: "Notify liquidity providers when vault APYs spike or drop significantly.",
    tag: "VAULTS",
  },
  {
    icon: Image,
    title: "NFT Infrastructure",
    desc: "Send whitelist claim reminders, mint phase transitions, and drop announcements out-of-band.",
    tag: "NFT",
  },
];

export default function UseCasesGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const mobileCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileHeaderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // ── DESKTOP — pin section, header stays fixed, cards scroll ──────
    mm.add("(min-width: 768px)", () => {
      if (!sectionRef.current || !cardsRef.current) return;

      // Pin the entire section for the duration of the cards scrolling
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        // end when the bottom of the cards column hits the bottom of the viewport
        end: () => `+=${cardsRef.current!.scrollHeight - window.innerHeight}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      // Scroll the cards column upward while section is pinned
      gsap.to(cardsRef.current, {
        y: () => -(cardsRef.current!.scrollHeight - window.innerHeight),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${cardsRef.current!.scrollHeight - window.innerHeight}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Stagger-reveal each card as it scrolls into view
      mobileCardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    });

    // ── MOBILE — header scrolls out, then cards parallax cycle ───────
    mm.add("(max-width: 767px)", () => {
      if (!sectionRef.current || !mobileHeaderRef.current) return;

      const totalCards = USE_CASES.length;

      // Pin the mobile section for the full card cycling duration
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${totalCards * 120}%`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 1,
        invalidateOnRefresh: true,
      });

      // Step 1 — slide header out upward first
      gsap.to(mobileHeaderRef.current, {
        y: -100,
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=80%",
          scrub: 1,
        },
      });

      // Step 2 — cycle cards after header leaves
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalCards * 120}%`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Set initial states — only first card visible
      mobileCardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.set(card, {
          opacity: i === 0 ? 1 : 0,
          scale: i === 0 ? 1 : 0.92,
          y: i === 0 ? 0 : 50,
        });
      });

      // Build the timeline — each card fades out then next fades in
      mobileCardsRef.current.forEach((card, i) => {
        if (!card) return;

        // Hold current card
        tl.to({}, { duration: 1.5 });

        if (i < totalCards - 1) {
          const nextCard = mobileCardsRef.current[i + 1];
          if (!nextCard) return;
          // Outgoing
          tl.to(card, { opacity: 0, scale: 0.92, y: -50, duration: 1 });
          // Incoming (overlap with outgoing)
          tl.to(nextCard, { opacity: 1, scale: 1, y: 0, duration: 1 }, "<0.2");
        } else {
          // Last card — fade out and unpin
          tl.to(card, { opacity: 0, scale: 0.92, y: -50, duration: 1 });
        }
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="bg-bg-base relative overflow-hidden z-10"
    >
      {/* ── DESKTOP layout ──────────────────────────────────────────── */}
      <div className="hidden md:grid grid-cols-[1fr_2fr] gap-16 h-screen items-start container mx-auto px-6">

        {/* Left — sticky header */}
        <div
          ref={headerRef}
          className="sticky top-0 h-screen flex flex-col justify-center py-24"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-5">
            Use cases
          </p>
          <h2 className="text-4xl xl:text-5xl font-extrabold font-display leading-tight mb-6">
            Versatile APIs
            <br />
            <span className="text-text-muted">for any protocol.</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed max-w-xs">
            Reach your users across email, Telegram, and SMS instantly — no matter what you're building on Solana.
          </p>
        </div>

        {/* Right — scrolling cards column */}
        <div ref={cardsRef} className="py-24 will-change-transform">
          <div className="border-t border-border/40 flex flex-col">
            {USE_CASES.map((useCase, idx) => {
              const Icon = useCase.icon;
              return (
                <div
                  key={idx}
                  ref={(el) => { mobileCardsRef.current[idx] = el; }}
                  className="group flex items-center gap-10 py-12 border-b border-border/40 hover:border-teal/40 transition-colors duration-300"
                >
                  {/* Icon */}
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-bg-surface border border-border group-hover:bg-teal/10 group-hover:border-teal/30 flex items-center justify-center transition-all duration-300">
                    <Icon className="w-7 h-7 text-text-muted group-hover:text-teal transition-colors duration-300" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-0.5 rounded-md bg-bg-surface border border-border text-[10px] font-mono font-bold tracking-wider text-text-muted uppercase">
                        {useCase.tag}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary mb-2 font-display group-hover:text-teal transition-colors duration-300">
                      {useCase.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {useCase.desc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="shrink-0 opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight className="w-5 h-5 text-teal" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MOBILE layout ───────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col min-h-screen container mx-auto px-6 py-16">

        {/* Mobile header — scrolls out */}
        <div ref={mobileHeaderRef} className="mb-12 shrink-0">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-4">
            Use cases
          </p>
          <h2 className="text-3xl font-extrabold font-display leading-tight mb-4">
            Versatile APIs
            <br />
            <span className="text-text-muted">for any protocol.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Email, Telegram, and SMS — no matter what you're building.
          </p>
        </div>

        {/* Mobile cards — stacked, cycling */}
        <div className="relative flex-1 flex items-center justify-center">
          {USE_CASES.map((useCase, idx) => {
            const Icon = useCase.icon;
            return (
              <div
                key={idx}
                ref={(el) => { mobileCardsRef.current[idx] = el; }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center gap-6 px-4"
                style={{ zIndex: USE_CASES.length - idx }}
              >
                {/* Icon */}
                <div className="w-20 h-20 rounded-3xl bg-teal/10 border border-teal/20 flex items-center justify-center shadow-xl shadow-teal/5">
                  <Icon className="w-10 h-10 text-teal" />
                </div>

                {/* Tag */}
                <span className="px-3 py-1 rounded-full bg-bg-surface border border-border text-[10px] font-mono font-bold tracking-wider text-text-muted uppercase">
                  {useCase.tag}
                </span>

                {/* Text */}
                <div>
                  <h3 className="text-2xl font-bold text-text-primary mb-3 font-display">
                    {useCase.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed max-w-xs mx-auto">
                    {useCase.desc}
                  </p>
                </div>

                {/* Progress dots */}
                <div className="flex items-center gap-2 mt-4">
                  {USE_CASES.map((_, dotIdx) => (
                    <div
                      key={dotIdx}
                      className={`rounded-full transition-all duration-300 ${
                        dotIdx === idx
                          ? "w-6 h-1.5 bg-teal"
                          : "w-1.5 h-1.5 bg-border-2"
                      }`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}