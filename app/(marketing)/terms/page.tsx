import React from "react";
import LegalLayout from "@/components/marketing/legal/LegalLayout";
import TermsContent from "@/content/legal/terms.mdx";
import { ogUrl } from "@/lib/og";

export const metadata = {
  title: "Terms of Service | Herald Protocol",
  description: "The legal terms governing your use of Herald Protocol's services.",
  openGraph: {
    title: "Terms of Service",
    description: "The legal terms governing your use of Herald Protocol's services.",
    images: [
      {
        url: ogUrl(
          "Terms of Service",
          "Herald Protocol",
          "The legal terms governing your use of Herald Protocol's services."
        ),
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Herald Protocol",
    description: "The legal terms governing your use of Herald Protocol's services.",
    images: [
      ogUrl(
        "Terms of Service",
        "Herald Protocol",
        "The legal terms governing your use of Herald Protocol's services."
      ),
    ],
  },
};

export default function TermsPage() {
  return (
    <LegalLayout 
      title="Terms of Service" 
      updatedAt="1 April 2026" 
      version="1.0"
    >
      <TermsContent />
    </LegalLayout>
  );
}
