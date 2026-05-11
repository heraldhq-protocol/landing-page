import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Herald",
  description: "Transparent, scalable pricing for decentralized notifications. Start free, pay in USDC as you grow.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
