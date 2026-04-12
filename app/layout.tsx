import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import { Syne, DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800"],
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
    images: [{ url: "/og/default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@useheraldxyz",
    creator: "@useheraldxyz",
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
        className={`${syne.variable} ${dmSans.variable} ${geistMono.variable} antialiased`}
      >
        <RootProvider theme={{ defaultTheme: "dark" }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}