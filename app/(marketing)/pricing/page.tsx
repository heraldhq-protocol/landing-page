import PricingHero from "@/components/marketing/pricing/PricingHero";
import PricingSpecSheet from "@/components/marketing/pricing/PricingSpecSheet";
import OverageCalculator from "@/components/marketing/pricing/OverageCalculator";
import FinalCTA from "@/components/marketing/home/FinalCTA";

export const metadata = {
  title: "Pricing | Herald",
  description: "Transparent, scalable pricing for decentralized notifications. Start free, pay in USDC as you grow.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-bg-base">
      <PricingHero />
      <PricingSpecSheet />
      <OverageCalculator />
      <div className="py-24 border-t border-border/30">
        <FinalCTA />
      </div>
    </main>
  );
}
