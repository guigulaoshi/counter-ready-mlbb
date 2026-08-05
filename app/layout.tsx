import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mobile Legends Counter Picker — Counter Ready",
  description: "Mobile Legends: Bang Bang 神话+英雄克制助手。选择最多五名敌方英雄和自己的分路，只按实测克制关系推荐。",
  openGraph: {
    title: "Mobile Legends Counter Picker — Counter Ready",
    description: "MLBB 神话+英雄克制助手：选择 1–5 名敌方英雄，只按实测克制关系即时推荐。",
    images: [{ url: "/og-v2.png", width: 1743, height: 910, alt: "Mobile Legends Counter Ready 英雄克制助手" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Legends Counter Picker — Counter Ready",
    description: "MLBB 神话+英雄克制助手，只按实测克制关系即时推荐。",
    images: ["/og-v2.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
