export interface Integration {
  slug: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  logoUrl: string;
  useCases: string[];
}

export const INTEGRATIONS: Integration[] = [
  {
    slug: "jupiter",
    name: "Jupiter",
    category: "DEX Aggregator",
    description:
      "Experience privacy-preserving swap notifications and limit order alerts for Jupiter.",
    longDescription:
      "Herald enables Jupiter users to receive real-time alerts for limit order fills, price targets, and cost-averaging execution without ever revealing their email or Telegram ID to the Jupiter protocol. Perfect for traders who demand privacy and performance.",
    logoUrl: "https://cryptologos.cc/logos/jupiter-ag-jup-logo.png",
    useCases: [
      "Limit order execution alerts",
      "DCA position updates",
      "Price threshold notifications",
    ],
  },
  {
    slug: "kamino",
    name: "Kamino",
    category: "Lending & Liquidity",
    description:
      "Automated liquidation warnings and yield updates for Kamino Finance.",
    longDescription:
      "Protect your Kamino positions with Herald's zero-PII notification layer. Get notified before liquidation thresholds are hit, track your lend/borrow rates, and receive automated vault performance reports directly to your private inbox.",
    logoUrl: "https://s2.coinmarketcap.com/static/img/coins/200x200/30986.png",
    useCases: [
      "Liquidation risk alerts",
      "Loan-to-value (LTV) warnings",
      "Vault yield performance reports",
    ],
  },
  {
    slug: "drift",
    name: "Drift",
    category: "Perpetuals DEX",
    description:
      "Perp position monitoring and PnL alerts for Drift Protocol users.",
    longDescription:
      "Drift traders can now monitor their perpetual positions with absolute privacy. Receive funding rate alerts, margin requirements, and trade execution confirmations without compromising your on-chain identity.",
    logoUrl:
      "https://coin-images.coingecko.com/coins/images/31613/large/drift.png?1696530540",
    useCases: [
      "Funding rate change alerts",
      "Margin call notifications",
      "Fill and cancellation confirmations",
    ],
  },
  {
    slug: "tensor",
    name: "Tensor",
    category: "NFT Marketplace",
    description:
      "NFT bid alerts and sweep notifications for Tensor power users.",
    longDescription:
      "Stay ahead of the NFT market on Tensor. Get instant alerts when your bids are accepted or when your listed items are sold, all through Herald's privacy-preserving relay. Never miss a sweep while keeping your contact info off-chain.",
    logoUrl:
      "https://coin-images.coingecko.com/coins/images/35972/large/tnsr.png?1712687367",
    useCases: [
      "NFT bid acceptance alerts",
      "Listing sell notifications",
      "Market sweep activity updates",
    ],
  },
  {
    slug: "metaplex",
    name: "Metaplex",
    category: "NFT Standard",
    description:
      "Creator alerts and mint status updates for Metaplex-powered collections.",
    longDescription:
      "Creators and collectors using Metaplex standard assets can now receive automated notifications for minting events, metadata updates, and auction activity. Built for the next generation of digital assets on Solana.",
    logoUrl:
      "https://coin-images.coingecko.com/coins/images/27344/large/mplx.png?1696526391",
    useCases: [
      "Minting completion alerts",
      "Auction bid notifications",
      "Creator revenue updates",
    ],
  },
];
