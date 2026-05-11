import HeroSection from "@/components/marketing/home/HeroSection";
import DemoAnimation from "@/components/marketing/home/DemoAnimation";
// import LogoMarquee from "@/components/marketing/home/LogoMarquee";
import HowItWorks from "@/components/marketing/home/HowItWorks";
import DualValueProp from "@/components/marketing/home/DualValueProp";
import FeatureGrid from "@/components/marketing/home/FeatureGrid";
import CodePreview from "@/components/marketing/home/CodePreview";
import PricingTable from "@/components/marketing/pricing/PricingTable";
// import BlogStrip from "@/components/marketing/home/BlogStrip";
import FinalCTA from "@/components/marketing/home/FinalCTA";
import NavBar from "@/components/marketing/shared/NavBar";
import Footer from "@/components/marketing/shared/Footer";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden px-4">
      <NavBar />
      <section id="hero">
        <HeroSection />
      </section>

      {/* 4.1.2 Social Proof Strip */}
      {/* <LogoMarquee /> */}

      <section id="how-it-works">
        <HowItWorks />
      </section>

      <section id="features">
        <DualValueProp />
      
      </section>
      <section id="features-grid">
        <FeatureGrid />
      </section>
      <section id="code-preview">
        <CodePreview />
      </section>
      <section id="pricing">
        <PricingTable />
      </section>
      {/* <BlogStrip /> */}
      <FinalCTA />
      <Footer />
    </div>
  );
}