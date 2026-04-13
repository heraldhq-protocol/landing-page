import React from "react";
import LegalLayout from "@/components/marketing/legal/LegalLayout";
import TermsContent from "@/content/legal/terms.mdx";

export const metadata = {
  title: "Terms of Service | Herald Protocol",
  description: "The legal terms governing your use of Herald Protocol's services.",
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
