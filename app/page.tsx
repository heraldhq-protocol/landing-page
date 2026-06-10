import type { Metadata } from "next";
import HeroSection from "@/components/marketing/home/HeroSection";
import DemoAnimation from "@/components/marketing/home/DemoAnimation";
// import LogoMarquee from "@/components/marketing/home/LogoMarquee";
import HowItWorks from "@/components/marketing/home/HowItWorks";
import DualValueProp from "@/components/marketing/home/DualValueProp";
import FeatureGrid from "@/components/marketing/home/FeatureGrid";
import CodePreview from "@/components/marketing/home/CodePreview";
import PricingTable from "@/components/marketing/pricing/PricingTable";
// import BlogStrip from "@/components/marketing/home/BlogStrip";
import OrynthSection from "@/components/marketing/home/OrynthSection";
import FinalCTA from "@/components/marketing/home/FinalCTA";
import NavBar from "@/components/marketing/shared/NavBar";
import Footer from "@/components/marketing/shared/Footer";
import { ogUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Herald — Privacy-Preserving DeFi Notifications",
  description:
    "The notification layer for DeFi. Send email, Telegram, and SMS alerts to your users without ever storing their contact info. Built on Solana.",
  openGraph: {
    title: "Herald Protocol",
    description:
      "Privacy-preserving notifications for Solana DeFi. Send alerts without ever storing user contact info.",
    images: [
      {
        url: ogUrl(
          "Privacy-Preserving",
          "DeFi Notifications",
          "Send alerts to your users without ever storing their contact info. Built on Solana."
        ),
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Herald — Privacy-Preserving DeFi Notifications",
    description:
      "Privacy-preserving notifications for Solana DeFi. Send alerts without ever storing user contact info.",
    images: [
      ogUrl(
        "Privacy-Preserving",
        "DeFi Notifications",
        "Send alerts to your users without ever storing their contact info. Built on Solana."
      ),
    ],
  },
};

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
      <section id="community">
        <OrynthSection />
      </section>
      <FinalCTA />
      <Footer />
    </div>
  );
}