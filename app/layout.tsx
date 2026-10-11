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
  description: "Mobile Legends: Bang Bang 选人助手：按分路展示神话整体胜率排名，左右滑动查看，点击英雄查看对位依据。",
  openGraph: {
    title: "Mobile Legends Counter Picker — Counter Ready",
    description: "MLBB 选人助手：完整阵容头像、一排胜率排名和实测对位依据。",
    images: [{ url: "/og-v2.png", width: 1743, height: 910, alt: "Mobile Legends Counter Ready 英雄克制助手" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Legends Counter Picker — Counter Ready",
    description: "MLBB draft assistant: a compact win-rate ranking with measured matchup details.",
    images: ["/og-v2.png"],
  },
  icons: {
    icon: { url: "/favicon-bp-large.png", type: "image/png", sizes: "128x128" },
    shortcut: "/favicon-bp-large.png",
    apple: { url: "/apple-touch-icon-bp-large.png", sizes: "180x180" },
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
