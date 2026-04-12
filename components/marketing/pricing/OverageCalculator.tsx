"use client";

import { useState } from "react";
import { Calculator, ArrowRight } from "lucide-react";

const OVERAGE_RATES = {
  growth: 0.002,
  scale: 0.0015,
};

export default function OverageCalculator() {
  const [sends, setSends] = useState(100000);
  const [tier, setTier] = useState<"growth" | "scale">("growth");

  const cost = sends * OVERAGE_RATES[tier];

  return (
    <section className="py-24 border-t border-border/30 bg-navy/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10 blur-3xl bg-teal pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto border border-border-hi bg-bg-surface overflow-hidden rounded-2xl shadow-2xl shadow-teal/5">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Input Side */}
            <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border-hi">
              <div className="flex items-center gap-2 mb-8">
                <Calculator className="w-5 h-5 text-teal" />
                <h3 className="text-[10px] font-bold font-mono tracking-[0.2em] text-text-primary uppercase">Scalability Tool</h3>
              </div>
              
              <div className="space-y-10">
                <div>
                  <label className="block text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4">
                    Base Tier
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setTier("growth")}
                      className={`py-3 border font-bold text-[10px] tracking-widest transition-all rounded-lg ${tier === "growth" ? "bg-teal text-bg-base border-teal shadow-lg shadow-teal/20" : "border-border-hi text-text-muted hover:border-text-muted"}`}
                    >
                      GROWTH
                    </button>
                    <button 
                      onClick={() => setTier("scale")}
                      className={`py-3 border font-bold text-[10px] tracking-widest transition-all rounded-lg ${tier === "scale" ? "bg-teal text-bg-base border-teal shadow-lg shadow-teal/20" : "border-border-hi text-text-muted hover:border-text-muted"}`}
                    >
                      SCALE
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4">
                    Email Volume
                  </label>
                  <input 
                    type="range" 
                    min="10000" 
                    max="1000000" 
                    step="10000" 
                    value={sends}
                    onChange={(e) => setSends(parseInt(e.target.value))}
                    className="w-full accent-teal bg-bg-elevated h-1 rounded-full appearance-none cursor-pointer mb-6"
                  />
                  <div className="flex justify-between items-center bg-bg-elevated/50 border border-border-hi p-5 rounded-xl font-mono">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Volume</span>
                    <span className="text-xl font-black text-text-primary">+{sends.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Output Side */}
            <div className="p-8 md:p-12 bg-teal/1.5 flex flex-col justify-between">
              <div className="space-y-6">
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Estimated Overage</p>
                <div className="flex items-baseline gap-3">
                    <span className="text-3xl md:text-4xl font-black font-display text-text-primary tracking-tighter">${cost.toFixed(2)}</span>
                    <span className="text-xs font-mono text-text-muted uppercase tracking-widest font-bold">USDC</span>
                </div>
                <div className="p-5 border-l-2 border-teal bg-teal/3 text-sm text-text-secondary leading-relaxed italic rounded-r-lg">
                    "Scaling shouldn't be a pricing ambush. Our overage rates are transparent and decrease as you move up tiers."
                </div>
              </div>

              <div className="mt-12">
                <button className="flex items-center gap-3 text-teal font-bold text-[10px] uppercase tracking-[0.2em] hover:gap-5 transition-all group">
                    Full Tier Breakdown <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

