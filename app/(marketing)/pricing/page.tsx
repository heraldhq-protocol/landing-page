"use client";

import { useState } from "react";
import PricingHero from "@/components/marketing/pricing/PricingHero";
import PricingSpecSheet from "@/components/marketing/pricing/PricingSpecSheet";
import OverageCalculator from "@/components/marketing/pricing/OverageCalculator";
import FinalCTA from "@/components/marketing/home/FinalCTA";

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  return (
    <main className="min-h-screen bg-bg-base">
      <PricingHero billingPeriod={billingPeriod} onChange={setBillingPeriod} />
      <PricingSpecSheet billingPeriod={billingPeriod} />
      <OverageCalculator />
      <div className="py-24 border-t border-border/30">
        <FinalCTA />
      </div>
    </main>
  );
}
