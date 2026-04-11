import HeroSection from "@/components/marketing/home/HeroSection";
import LogoMarquee from "@/components/marketing/home/LogoMarquee";
import HowItWorks from "@/components/marketing/home/HowItWorks";
import DualValueProp from "@/components/marketing/home/DualValueProp";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* 4.1.1 Hero Section */}
      <HeroSection />

      {/* 4.1.2 Social Proof Strip */}
      <LogoMarquee />

      {/* 4.1.3 How It Works (Scroll animated) */}
      <HowItWorks />

      {/* 4.1.4 Dual Value Prop (Protocols vs Users) */}
      <DualValueProp />
      
      {/* Additional sections follow the markdown structure... */}
    </div>
  );
}