import type { Metadata } from "next";
import UserHero from "@/components/marketing/users/UserHero";
import PrivacyExplainer from "@/components/marketing/users/PrivacyExplainer";
import RegistrationGuide from "@/components/marketing/users/RegistrationGuide";
import FinalCTA from "@/components/marketing/home/FinalCTA";
// import LogoMarquee from "@/components/marketing/home/LogoMarquee";
import { ogUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "For Users | Herald",
  description:
    "Take control of your DeFi notifications. Register your Solana wallet and receive alerts without sharing your email with anyone.",
  openGraph: {
    title: "For Users",
    description:
      "Take control of your DeFi notifications. Register your Solana wallet and receive alerts without sharing your email.",
    images: [
      {
        url: ogUrl(
          "For Users",
          "Your Wallet. Your Inbox.",
          "Register your Solana wallet once. Receive DeFi alerts from any Herald-integrated protocol — without sharing your email."
        ),
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "For Users | Herald",
    description:
      "Take control of your DeFi notifications. Register your Solana wallet and receive alerts without sharing your email with anyone.",
    images: [
      ogUrl(
        "For Users",
        "Your Wallet. Your Inbox.",
        "Register your Solana wallet once. Receive DeFi alerts from any Herald-integrated protocol — without sharing your email."
      ),
    ],
  },
};

export default function ForUsersPage() {
  return (
    <div className="flex flex-col">
      <UserHero />
      <PrivacyExplainer />
      <RegistrationGuide />
      {/* <div className="py-24 text-center border-t border-border/30">
         <h2 className="text-3xl md:text-4xl font-bold font-display mb-8">Already integrated with Herald</h2>
         <LogoMarquee />
      </div> */}
      <FinalCTA />
    </div>
  );
}
