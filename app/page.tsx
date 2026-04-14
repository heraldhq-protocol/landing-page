import HeroSection from "@/components/marketing/home/HeroSection";
import DemoAnimation from "@/components/marketing/home/DemoAnimation";
import LogoMarquee from "@/components/marketing/home/LogoMarquee";
import HowItWorks from "@/components/marketing/home/HowItWorks";
import DualValueProp from "@/components/marketing/home/DualValueProp";
import FeatureGrid from "@/components/marketing/home/FeatureGrid";
import CodePreview from "@/components/marketing/home/CodePreview";
import PricingTable from "@/components/marketing/pricing/PricingTable";
import BlogStrip from "@/components/marketing/home/BlogStrip";
import FinalCTA from "@/components/marketing/home/FinalCTA";
import NavBar from "@/components/marketing/shared/NavBar";
import Footer from "@/components/marketing/shared/Footer";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden px-4">
      <NavBar />
      {/* 4.1.1 Hero Section */}
      <HeroSection />

      {/* 4.1.2 Social Proof Strip */}
      <LogoMarquee />

      {/* 4.1.3 How It Works (Scroll animated) */}
      <HowItWorks />

      {/* 4.1.4 Dual Value Prop (Protocols vs Users) */}
      <DualValueProp />
      
      <FeatureGrid />
      <CodePreview />
      <PricingTable />
      <BlogStrip />
      <FinalCTA />
      <Footer />
    </div>
  );
}