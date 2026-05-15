import { Metadata } from "next";
import { ogUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Pricing | Herald",
  description: "Transparent, scalable pricing for decentralized notifications. Start free, pay in USDC as you grow.",
  openGraph: {
    title: "Pricing | Herald",
    description: "Transparent, scalable pricing for decentralized notifications. Start free, pay in USDC as you grow.",
    images: [
      {
        url: ogUrl(
          "Simple Pricing",
          "Pay in USDC",
          "Transparent, scalable pricing for decentralized notifications. Start free, pay in USDC as you grow."
        ),
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | Herald",
    description: "Transparent, scalable pricing for decentralized notifications. Start free, pay in USDC as you grow.",
    images: [
      ogUrl(
        "Simple Pricing",
        "Pay in USDC",
        "Transparent, scalable pricing for decentralized notifications. Start free, pay in USDC as you grow."
      ),
    ],
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
