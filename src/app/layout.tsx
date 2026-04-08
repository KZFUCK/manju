import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/providers/ClientProviders";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MangaAI | AI 漫剧与商业片撮合交易平台",
  description: "连接顶级 AI 创作者与全球剧本/商业化需求的垂直服务市场",
  keywords: ["AI漫剧", "AIGC", "短剧制作", "AI画师", "剧本拆解", "MangaAI"],
  authors: [{ name: "MangaAI Team" }],
  openGraph: {
    title: "MangaAI | 领先的 AI 漫剧创作加速平台",
    description: "连接顶级 AI 创作者与全球剧本/商业化需求的垂直服务市场",
    url: "https://manju-ai.vercel.app",
    siteName: "MangaAI",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MangaAI | 领先的 AI 漫剧创作加速平台",
    description: "连接顶级 AI 创作者与全球剧本/商业化需求的垂直服务市场",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${manrope.variable}`}>
       <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="antialiased pb-[var(--tab-bar-height)]">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
