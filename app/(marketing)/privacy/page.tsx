import React from "react";
import LegalLayout from "@/components/marketing/legal/LegalLayout";
import PrivacyContent from "@/content/legal/privacy.mdx";
import { ogUrl } from "@/lib/og";

export const metadata = {
  title: "Privacy Policy | Herald Protocol",
  description: "How Herald Protocol collects, uses, stores, and protects your information.",
  openGraph: {
    title: "Privacy Policy",
    description: "How Herald Protocol collects, uses, stores, and protects your information.",
    images: [
      {
        url: ogUrl(
          "Privacy Policy",
          "Herald Protocol",
          "How Herald Protocol collects, uses, stores, and protects your information."
        ),
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Herald Protocol",
    description: "How Herald Protocol collects, uses, stores, and protects your information.",
    images: [
      ogUrl(
        "Privacy Policy",
        "Herald Protocol",
        "How Herald Protocol collects, uses, stores, and protects your information."
      ),
    ],
  },
};

export default function PrivacyPage() {
  return (
    <LegalLayout 
      title="Privacy Policy" 
      updatedAt="1 April 2026" 
      version="1.0"
    >
      <PrivacyContent />
    </LegalLayout>
  );
}
