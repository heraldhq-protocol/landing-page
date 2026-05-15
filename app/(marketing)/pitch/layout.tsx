import type { Metadata } from "next";
import { ogUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Pitch Deck | Herald",
  description: "Herald is the definitive privacy-first notification infrastructure for the Web3 ecosystem.",
  openGraph: {
    title: "Herald Pitch Deck",
    description: "Privacy-first notification infrastructure bridging protocols and users with end-to-end encrypted communications.",
    images: [
      {
        url: ogUrl(
          "Herald Protocol",
          "Pitch Deck",
          "Privacy-first notification infrastructure for the Web3 ecosystem. Reach every wallet. Reveal nothing."
        ),
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pitch Deck | Herald",
    description: "Privacy-first notification infrastructure for the Web3 ecosystem.",
    images: [
      ogUrl(
        "Herald Protocol",
        "Pitch Deck",
        "Privacy-first notification infrastructure for the Web3 ecosystem. Reach every wallet. Reveal nothing."
      ),
    ],
  },
};

export default function PitchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
