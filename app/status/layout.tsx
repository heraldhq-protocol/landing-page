import type { Metadata } from "next";
import { ogUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "System Status | Herald",
  description: "Real-time status and incident history for Herald's notification infrastructure.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "System Status | Herald",
    description: "Real-time status and incident history for Herald's notification infrastructure.",
    images: [
      {
        url: ogUrl(
          "System Status",
          "Herald Protocol",
          "Real-time status and incident history for Herald's notification infrastructure."
        ),
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "System Status | Herald",
    description: "Real-time status and incident history for Herald's notification infrastructure.",
    images: [
      ogUrl(
        "System Status",
        "Herald Protocol",
        "Real-time status and incident history for Herald's notification infrastructure."
      ),
    ],
  },
};

export default function StatusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
