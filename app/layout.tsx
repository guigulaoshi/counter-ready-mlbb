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
  title: "Counter Ready — MLBB 极速反制助手",
  description: "选择最多五名敌方英雄和自己的分路，按神话+胜率差获得 Mobile Legends 克制英雄推荐。",
  openGraph: {
    title: "Counter Ready — MLBB 极速反制助手",
    description: "选择 1–5 名敌方英雄，按神话+胜率差即时推荐。Patch 2.1.90。",
    images: [{ url: "/og.png", width: 1743, height: 910, alt: "Counter Ready MLBB 极速反制助手" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Counter Ready — MLBB 极速反制助手",
    description: "选择 1–5 名敌方英雄，按神话+胜率差即时推荐。Patch 2.1.90。",
    images: ["/og.png"],
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
