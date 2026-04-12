import TechnicalHero from "@/components/marketing/how-it-works/TechnicalHero";
import TechnicalArchitecture from "@/components/marketing/how-it-works/TechnicalArchitecture";
import DataStorageTable from "@/components/marketing/how-it-works/DataStorageTable";
import FinalCTA from "@/components/marketing/home/FinalCTA";

export const metadata = {
  title: "How It Works | Herald",
  description: "Explore Herald's privacy-first architecture using AWS Nitro Enclaves and on-chain encryption.",
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-bg-base">
      <TechnicalHero />
      <TechnicalArchitecture />
      <DataStorageTable />
      <div className="py-24 border-t border-border/30">
        <FinalCTA />
      </div>
    </main>
  );
}
