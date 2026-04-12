import ProtocolHero from "@/components/marketing/protocol/ProtocolHero";
import TheProblem from "@/components/marketing/protocol/TheProblem";
import CodePreview from "@/components/marketing/home/CodePreview";
import UseCasesGrid from "@/components/marketing/protocol/UseCasesGrid";
import PricingTable from "@/components/marketing/pricing/PricingTable";
import FinalCTA from "@/components/marketing/home/FinalCTA";

export default function ForProtocolsPage() {
  return (
    <div className="flex flex-col">
      <ProtocolHero />
      <TheProblem />
      <div className="py-24">
        <div className="text-center mb-12 container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold font-display">Integration Simplicity</h2>
          <p className="text-text-secondary mt-4">One API call. Five minutes to ship.</p>
        </div>
        <CodePreview />
      </div>
      <UseCasesGrid />
      <PricingTable />
      <FinalCTA />
    </div>
  );
}
