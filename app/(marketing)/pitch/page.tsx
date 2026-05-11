"use client";

import PitchCarousel from "@/components/marketing/pitch/PitchCarousel";

const SLIDES = [
  {
    id: 1,
    image: "https://herald-storage-bucket.s3.eu-north-1.amazonaws.com/pitch/Slide+16_9+-+1.png",
    title: "Herald Protocol",
    description: "Herald is the definitive privacy-first notification infrastructure for the Web3 ecosystem. Our platform bridges the critical gap between protocols and users by enabling secure, end-to-end encrypted communications that allow protocols to 'reach every wallet' while simultaneously ensuring that they 'reveal nothing' about the user's personal identity.",
  },
  {
    id: 2,
    image: "https://herald-storage-bucket.s3.eu-north-1.amazonaws.com/pitch/Slide+16_9+-+2.png",
    title: "The Problem",
    description: "Web3 currently suffers from a massive 'dark space' in communication. Protocols have no native way to reach users, leading to billions in missed liquidation alerts and thousands of uncast governance votes. Today's users are forced into a false choice: either sacrifice their privacy by giving their email to every dApp, or risk losing funds because they weren't notified of a critical on-chain event.",
  },
  {
    id: 3,
    image: "https://herald-storage-bucket.s3.eu-north-1.amazonaws.com/pitch/Slide+16_9+-+3.png",
    title: "The Opportunity",
    description: "As the DeFi and DAO ecosystems scale, notification volume is exploding exponentially. There is a massive, untapped market for a high-fidelity, privacy-preserving communication channel that integrates seamlessly into the tools users already use daily—their email inboxes, Telegram, and Discord. Herald is positioned to capture this demand by providing the infrastructure layer that makes Web3 communications as reliable as the legacy web.",
  },
  {
    id: 4,
    image: "https://herald-storage-bucket.s3.eu-north-1.amazonaws.com/pitch/Slide+16_9+-+4.png",
    title: "Our Solution",
    description: "Herald provides the indispensable 'Twilio' for Web3. We offer a developer-first SDK that empowers protocols to send secure, encrypted notifications directly to users' preferred channels—email, Telegram, and Discord—without the protocol ever having to touch or store Personally Identifiable Information (PII). This architectural decoupling ensures total user privacy while maintaining maximum deliverability.",
  },
  {
    id: 5,
    image: "https://herald-storage-bucket.s3.eu-north-1.amazonaws.com/pitch/Slide+16_9+-+5.png",
    title: "How It Works",
    description: "Our proprietary architecture leverages Trusted Execution Environments (TEEs) and on-chain verification to solve the privacy paradox. By decoupling wallet addresses from sensitive contact information within a secure hardware enclave, Herald allows protocols to trigger notifications via our SDK while ensuring that the data remains completely blinded. This means we can prove a user should get a message without anyone—including Herald—knowing who that user is.",
  },
  {
    id: 6,
    image: "https://herald-storage-bucket.s3.eu-north-1.amazonaws.com/pitch/Slide+16_9+-+6.png",
    title: "Market Validation",
    description: "The market need for Herald is validated by staggering statistics: over $5 billion in DeFi liquidations and tens of thousands of missed governance votes annually. The economic cost of the current communication void is measured in the billions. Protocols across the spectrum—from lending markets to governance-heavy DAOs—are actively seeking a reliable notification layer to protect their users and their bottom lines.",
  },
  {
    id: 7,
    image: "https://herald-storage-bucket.s3.eu-north-1.amazonaws.com/pitch/Slide+16_9+-+7.png",
    title: "Traction",
    description: "We have already laid the foundation by building our core notification infrastructure, our TEE-backed privacy layer, and a robust TypeScript SDK. Our alpha is currently live and being battle-tested by early design partners who are using Herald for critical liquidation alerts and governance notifications. We aren't just planning; we are already delivering the future of Web3 communications.",
  },
  {
    id: 8,
    image: "https://herald-storage-bucket.s3.eu-north-1.amazonaws.com/pitch/Slide+16_9+-+8.png",
    title: "Target Audience",
    description: "Our initial go-to-market focus is the high-growth Solana DeFi ecosystem, specifically targeting lending protocols, DEXs, and DAOs. We are building for developers who require robust, production-grade notification infrastructure that doesn't compromise their commitment to user privacy. By solving for the most demanding use cases first, we establish Herald as the gold standard for all of Web3.",
  },
  {
    id: 9,
    image: "https://herald-storage-bucket.s3.eu-north-1.amazonaws.com/pitch/Slide+16_9+-+9.png",
    title: "Business Model",
    description: "Herald operates on a usage-based SaaS model that aligns our success with the growth of our protocol partners. We offer everything from a free entry-level tier for individual developers to enterprise-grade support for major protocols. With an estimated 18:1 LTV:CAC ratio at scale, our model is designed for high-margin sustainability and long-term infrastructure dominance.",
  },
  {
    id: 10,
    image: "https://herald-storage-bucket.s3.eu-north-1.amazonaws.com/pitch/Slide+16_9+-+10.png",
    title: "Competitive Landscape",
    description: "In a landscape of consumer-facing apps and incomplete solutions, Herald stands alone as the only protocol-first infrastructure that enables email reach without requiring protocols to handle PII. Our SDK is designed for extreme developer velocity, allowing for full integration in less than 5 minutes. We offer the privacy of a native Web3 solution with the reliability and reach of a global SaaS platform.",
  },
  {
    id: 11,
    image: "https://herald-storage-bucket.s3.eu-north-1.amazonaws.com/pitch/Slide+16_9+-+11.png",
    title: "Go-To-Market",
    description: "Our aggressive four-phase Go-To-Market strategy begins with deep design partnerships with top-tier DeFi protocols, followed by a self-serve beta to capture the long tail of developers. We will then transition into a community-led growth phase, eventually scaling to an enterprise motion with custom templates, dedicated support, and SLA agreements for the largest institutions in the space.",
  },
  {
    id: 12,
    image: "https://herald-storage-bucket.s3.eu-north-1.amazonaws.com/pitch/Slide+16_9+-+12.png",
    title: "The Team",
    description: "Our team is composed of seasoned engineers and operators with deep experience in building and scaling production-grade infrastructure. From architecting TEE-backed privacy layers to managing complex API ecosystems and go-to-market strategies, we possess the technical depth and operational expertise required to solve the most difficult communication challenges in Web3 today.",
  },
  {
    id: 13,
    image: "https://herald-storage-bucket.s3.eu-north-1.amazonaws.com/pitch/Slide+16_9+-+13.png",
    title: "The Ask",
    description: "We are raising a $100k Seed Round to harden our TEE infrastructure, expand our design partner network, and scale the Herald SDK ecosystem. This capital provides 18 months of runway to achieve our primary milestones: integrating with 50+ active protocols, reaching $20k+ in monthly recurring revenue, and positioning Herald as the undeniable leader in Web3 communications.",
  },
  {
    id: 14,
    image: "https://herald-storage-bucket.s3.eu-north-1.amazonaws.com/pitch/Slide+16_9+-+14.png",
    title: "Vision",
    description: "Our ultimate vision is to become the default communication system for the entire Web3 universe. Herald is building the infrastructure that will enable every wallet, on every blockchain, to receive every critical notification—without ever sacrificing the core principle of privacy. Just as Twilio revolutionized SMS and SendGrid defined email, Herald will be how Web3 talks to its users.",
  },
];

const YOUTUBE_URL = "https://youtu.be/so3XGleCiU4";

export default function PitchPage() {
  return (
    <div className="bg-bg-base">
      <PitchCarousel slides={SLIDES} videoUrl={YOUTUBE_URL} />
    </div>
  );
}
