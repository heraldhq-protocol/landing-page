"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeraldIcon from "../shared/HeraldIcon";
import { Wallet, Plane, Lock } from "lucide-react";
import FeatureIcon from "../shared/FeaturedIcons";



gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    title: "1. Protocol calls /notify",
    desc: "Protocol sends a wallet address and message. No email required.",
    icon: Wallet,
  },
  {
    title: "2. Privacy Resolution",
    desc: "Herald resolves the wallet to an encrypted contact stored on-chain.",
    icon: Lock,
  },
  {
    title: "3. Secure Delivery",
    desc: "The TEE decrypts in-memory and sends to Email, TG, or SMS.",
    icon: Plane,
  },
];

export default function HowItWorks() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".step-card", {
      opacity: 0,
      y: 50,
      stagger: 0.3,
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-24 bg-navy/20 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-sans">
          How Herald <span className="text-teal">Preserves Privacy</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {STEPS.map((step, i) => (
            <div key={i} className="step-card flex flex-col items-center text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-teal/30 transition-colors">
              <div className="mb-6 bg-teal/10 p-4 rounded-full">
                <FeatureIcon Icon={step.icon} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-text-primary">{step.title}</h3>
              <p className="text-text-secondary leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}