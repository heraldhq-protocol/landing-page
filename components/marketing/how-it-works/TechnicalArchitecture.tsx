"use client";

import { useState, useRef } from "react";
import { Shield, Globe } from "lucide-react";
import { LockIcon as Lock } from "@/components/ui/lock";
import { CpuIcon as Cpu } from "@/components/ui/cpu";
import AnimatedIcon from "@/components/ui/animated-icon";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Step {
  title: string;
  desc: string;
  details: string[];
  icon: React.ComponentType<{ className?: string; size?: number }>;
  subLabel: string;
}

const STEPS: Step[] = [
  {
    title: "Localized Encryption",
    subLabel: "Phase 1: Registration",
    desc: "A user connects their Solana wallet and provides their email. This email is instantly encrypted in the browser via X25519 before ever leaving the device.",
    details: ["X25519 Key Derivation", "NaCl Box Encryption", "On-chain PDA Storage"],
    icon: Lock
  },
  {
    title: "Anonymous Request",
    subLabel: "Phase 2: Protocol Trigger",
    desc: "A protocol calls the Herald API with a wallet address and a message. Herald fetches the encrypted contact PDA from the Solana blockchain.",
    details: ["No PII in request", "On-chain Identity Lookup", "PDA Resolution"],
    icon: Globe
  },
  {
    title: "Nitro Enclave Isolation",
    subLabel: "Phase 3: Secure Processing",
    desc: "The encrypted data is sent to an AWS Nitro Enclave—a cryptographically isolated VM where even root users have no access to the memory.",
    details: ["Isolated RAM & CPU", "Attestation Verification", "Transient Decryption"],
    icon: Cpu
  },
  {
    title: "Zero-Trace Delivery",
    subLabel: "Phase 4: Sealed Output",
    desc: "Herald delivers the notification via SES, Telegram, or SMS within the enclave. The message is signed and a ZK-receipt is written back to Solana.",
    details: ["Multi-Channel Delivery", "On-chain ZK Receipt", "Memory Zeroed Instantly"],
    icon: Shield
  }
];

export default function TechnicalArchitecture() {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const visualStageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate the entire visual stage on tab change
      gsap.fromTo(visualStageRef.current, 
        { 
          opacity: 0, 
          x: 20, 
          filter: "blur(10px)" 
        }, 
        { 
          opacity: 1, 
          x: 0, 
          filter: "blur(0px)",
          duration: 0.5, 
          ease: "power2.out" 
        }
      );

      // Animate the icon specifically for extra "pop"
      gsap.from(".stage-icon", {
        scale: 0.8,
        rotate: -10,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(2)"
      });
      
      // Staggered details animation
      gsap.from(".stage-detail", {
        opacity: 0,
        y: 10,
        stagger: 0.08,
        duration: 0.4,
        delay: 0.2
      });
    },
    { dependencies: [activeTab], scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-24 sm:py-32 bg-bg-base border-t border-border/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* ── Left Side - Interactive Tabs ───────────────────────────── */}
            <div className="lg:col-span-5 space-y-4">
              {STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 group ${
                    activeTab === idx
                      ? "bg-bg-surface border-teal/40 shadow-[0_0_30px_rgba(0,200,150,0.05)]"
                      : "bg-transparent border-border/30 hover:border-border-hi"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-2">
                    <span className={`text-[10px] font-mono font-bold tracking-[0.2em] transition-colors ${
                      activeTab === idx ? "text-teal" : "text-text-muted"
                    }`}>
                      {step.subLabel}
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold font-display transition-colors ${
                    activeTab === idx ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary"
                  }`}>
                    {step.title}
                  </h3>
                </button>
              ))}
            </div>

            {/* ── Right Side - Visual Stage ─────────────────────────────── */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div 
                ref={visualStageRef}
                className="bg-bg-surface border border-border/50 rounded-3xl p-8 sm:p-12 relative overflow-hidden h-full min-h-[400px]"
              >
                {/* Decorative background icon */}
                <div className="absolute -top-12 -right-12 opacity-[0.02] pointer-events-none">
                  {(() => {
                    const Icon = STEPS[activeTab].icon;
                    return <Icon size={300} />;
                  })()}
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="stage-icon w-16 h-16 rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center mb-8">
                    {(() => {
                      const Icon = STEPS[activeTab].icon;
                      return <Icon size={32} className="text-teal" />;
                    })()}
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-bold font-display text-text-primary mb-6">
                    {STEPS[activeTab].title}
                  </h2>

                  <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-xl">
                    {STEPS[activeTab].desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                    {STEPS[activeTab].details.map((detail, dIdx) => (
                      <div key={dIdx} className="stage-detail flex items-center gap-3 px-4 py-3 bg-[#020810] border border-border-hi rounded-xl">
                        <div className="w-1 h-1 rounded-full bg-teal animate-pulse" />
                        <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between px-4">
                 <div className="flex gap-2">
                    {STEPS.map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-1 rounded-full transition-all duration-500 ${
                          activeTab === i ? "w-8 bg-teal" : "w-2 bg-border"
                        }`} 
                      />
                    ))}
                 </div>
                 <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
                    Technical Specifications • v1.3.1
                 </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
