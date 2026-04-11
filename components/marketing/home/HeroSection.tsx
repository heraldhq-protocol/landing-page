"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HeraldIcon from "../shared/HeraldIcon";
import bellIcon from "@/public/icons/bellicon.json"; 

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // A simple timeline for the entrance sequence
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    tl.from(".hero-badge", { opacity: 0, y: 20 })
      .from(".hero-title", { opacity: 0, y: 30 }, "-=0.7")
      .from(".hero-sub", { opacity: 0, y: 20 }, "-=0.8")
      .from(".hero-cta", { opacity: 0, y: 20, stagger: 0.1 }, "-=0.8")
      .from(".hero-icon", { opacity: 0, scale: 0.8, duration: 1.5 }, "-=0.5");
  }, { scope: container }); // Scoping prevents selecting elements outside this component

  return (
    <section ref={container} className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-app-glow opacity-50" />
      
      <div className="container mx-auto px-6 text-center">
        <div className="hero-badge">
          <Badge variant="outline" className="border-teal/30 text-teal bg-teal/5 mb-6 px-4 py-1">
            Built on Solana
          </Badge>
        </div>

        <h1 className="hero-title text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
          The notification layer <br />
          for DeFi. <span className="text-teal">Privacy-first.</span>
        </h1>

        <p className="hero-sub text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10">
          Protocols alert users via email, Telegram, and SMS — without ever learning 
          their contact info. Users stay in control. Always.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="hero-cta bg-teal text-navy hover:bg-teal/90 font-bold px-8 py-6 h-auto text-lg rounded-xl">
            Integrate as a protocol →
          </Button>
          <Button variant="outline" size="lg" className="hero-cta border-border-2 text-text-primary hover:border-teal/40 px-8 py-6 h-auto text-lg rounded-xl bg-card/50 backdrop-blur-sm">
            Register your wallet
          </Button>
        </div>

        <div className="hero-icon mt-16 relative flex justify-center">
          <div className="absolute inset-0 bg-teal/20 blur-[120px] rounded-full -z-10" />
          <HeraldIcon icon={bellIcon} size={120} trigger="loop" delay={3000} />
        </div>
      </div>
    </section>
  );
}