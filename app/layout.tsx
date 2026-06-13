import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import { Unbounded, DM_Sans, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import JsonLd from "@/components/seo/JsonLd";
import "./globals.css";
import { AdtivityProvider } from "@/components/providers/AdtivityProvider";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://useherald.xyz"),
  title: {
    default: "Herald — Privacy-Preserving DeFi Notifications",
    template: "%s | Herald",
  },
  description:
    "The notification layer for DeFi. Send email, Telegram, and SMS alerts to " +
    "your users without ever storing their contact info. Built on Solana.",
  keywords: ["DeFi notifications", "Solana", "privacy", "Web3 email", "wallet alerts"],
  openGraph: {
    type: "website",
    siteName: "Herald",
    url: "https://useherald.xyz",
    images: [
      {
        url: "/api/og?title=Privacy-Preserving&subtitle=DeFi+Notifications&description=Send+alerts+to+your+users+without+ever+storing+their+contact+info.+Built+on+Solana.",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@useheraldmail",
    creator: "@useheraldmail",
    images: "/api/og?title=Privacy-Preserving&subtitle=DeFi+Notifications&description=Send+alerts+to+your+users+without+ever+storing+their+contact+info.+Built+on+Solana.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${unbounded.variable} ${dmSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd 
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Herald Protocol",
            "url": "https://useherald.xyz",
            "logo": "https://ucshdejvxzanuxlxrano.supabase.co/storage/v1/object/public/herald-public-asset/herald-logo.svg",
            "sameAs": [
              "https://twitter.com/useheraldmail",
              "https://github.com/heraldhq-protocol"
            ]
          }}
        />
        <JsonLd 
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Herald",
            "url": "https://useherald.xyz"
          }}
        />
        <RootProvider theme={{ forcedTheme: "dark" }}>
          <AdtivityProvider>
            {children}
          </AdtivityProvider>
        </RootProvider>
        <Analytics />
      </body>
    </html>
  );
}