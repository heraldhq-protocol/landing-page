"use client";

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Bell, ShieldCheck, Mail, MessageSquare } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DemoAnimation() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Step 1: Protocol Event
      tl.from(".demo-step-1", {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: "power3.out",
      });

      // Step 2: Enclave Activation
      tl.from(".demo-step-2", {
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        ease: "back.out(1.7)",
      }, "-=0.4");

      // Pulsing rings animation (continuous)
      gsap.to(".demo-pulse", {
        scale: 1.4,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: "power2.out",
        stagger: 0.5
      });

      // Step 3: Notification Pop-in
      tl.from(".demo-step-3", {
        opacity: 0,
        scale: 0.9,
        y: 30,
        duration: 1,
        ease: "elastic.out(1, 0.75)",
      }, "-=0.2");

      // Channel icons fade in
      tl.from(".demo-channels", {
        opacity: 0,
        y: 10,
        duration: 0.5,
        stagger: 0.1,
      }, "-=0.5");
    },
    { scope: container }
  );

  return (
    <section ref={container} className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg aspect-square bg-teal/5 blur-[100px] rounded-full" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          <div className="w-full relative py-12">
            {/* The "Flow" indicator */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-linear-to-r from-transparent via-border/40 to-transparent -translate-y-1/2 hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center relative">
              
              {/* Left: The Protocol Event (demo-step-1) */}
              <div className="demo-step-1 flex flex-col items-center p-6 bg-bg-surface border border-border/50 rounded-2xl shadow-xl z-20">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 border border-purple-500/20">
                   <Bell className="w-6 h-6 text-purple-400" />
                </div>
                <p className="text-xs font-mono text-purple-300 font-bold uppercase tracking-widest mb-1">Drift Protocol</p>
                <p className="text-sm text-text-muted text-center font-medium">Health factor 1.05</p>
              </div>

              {/* Center: Herald Enclave (demo-step-2) */}
              <div className="flex flex-col items-center z-20">
                <div className="demo-step-2 w-24 h-24 rounded-3xl bg-teal/20 border border-teal/40 flex items-center justify-center relative">
                   {/* Pulsing rings */}
                   <div className="demo-pulse absolute inset-0 rounded-3xl border border-teal/50" />
                   <div className="demo-pulse absolute inset-0 rounded-3xl border border-teal/50" />
                   <ShieldCheck className="w-12 h-12 text-teal shadow-[0_0_20px_rgba(0,200,150,0.5)]" />
                </div>
                <p className="mt-6 text-sm font-bold text-text-primary tracking-tight">Isolated Privacy Enclave</p>
                <p className="text-[10px] font-mono text-teal uppercase mt-1">Zero-Knowledge Routing</p>
              </div>

              {/* Right: The Final Notification (demo-step-3) */}
              <div className="flex flex-col items-center z-20 w-full max-w-[280px]">
                <div className="demo-step-3 w-full bg-slate-100 dark:bg-[#1a1b1e] rounded-[24px] p-4 shadow-2xl border border-white/10">
                   <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                         <MessageSquare className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                         <div className="flex items-center justify-between">
                            <p className="text-[11px] font-bold text-slate-900 dark:text-white">Telegram</p>
                            <span className="text-[9px] text-slate-500">now</span>
                         </div>
                         <p className="text-[10px] text-slate-400 font-medium">Drift Protocol via Herald</p>
                      </div>
                   </div>
                   <div className="bg-slate-200/50 dark:bg-white/5 rounded-xl p-3">
                      <p className="text-[11px] font-bold text-slate-800 dark:text-white mb-1">⚠️ Liquidation Warning</p>
                      <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-tight">
                        Your health factor is 1.05. Add collateral to 7xR4...
                      </p>
                   </div>
                </div>
                
                <div className="flex gap-4 mt-6">
                   <Mail className="demo-channels w-4 h-4 text-text-muted" />
                   <MessageSquare className="demo-channels w-4 h-4 text-teal drop-shadow-[0_0_8px_rgba(0,200,150,0.4)]" />
                   <Send className="demo-channels w-4 h-4 text-text-muted" />
                </div>
              </div>

            </div>
          </div>

          <div className="mt-12 text-center max-w-md">
            <h3 className="text-xl font-bold font-display text-text-primary mb-4 leading-tight">
              Seamless for users. <br className="sm:hidden" />
              <span className="text-teal">Invisible</span> for protocols.
            </h3>
            <p className="text-base text-text-secondary leading-relaxed">
              Protocols push alerts to our privacy endpoint. We resolve the identity in memory and deliver it instantly. No database of PII exists.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
