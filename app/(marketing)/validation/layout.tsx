import type { Metadata } from "next";
import { ogUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Validation | Herald",
  description: "Market validation data and research for Herald's privacy-preserving notification layer on Solana.",
  openGraph: {
    title: "Validation | Herald",
    description: "Market validation data and research for Herald's privacy-preserving notification layer on Solana.",
    images: [
      {
        url: ogUrl(
          "Market Validation",
          "Herald Protocol",
          "Market sizing, competitive analysis, and user research validating the need for privacy-preserving DeFi notifications."
        ),
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Validation | Herald",
    description: "Market validation data and research for Herald's privacy-preserving notification layer on Solana.",
    images: [
      ogUrl(
        "Market Validation",
        "Herald Protocol",
        "Market sizing, competitive analysis, and user research validating the need for privacy-preserving DeFi notifications."
      ),
    ],
  },
};

export default function ValidationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
