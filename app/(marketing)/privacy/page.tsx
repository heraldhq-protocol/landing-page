import React from "react";
import LegalLayout from "@/components/marketing/legal/LegalLayout";
import PrivacyContent from "@/content/legal/privacy.mdx";

export const metadata = {
  title: "Privacy Policy | Herald Protocol",
  description: "How Herald Protocol collects, uses, stores, and protects your information.",
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
