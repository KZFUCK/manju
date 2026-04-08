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
      <body className="antialiased bg-slate-100 dark:bg-slate-950 flex justify-center no-scrollbar overflow-hidden h-screen">
        <div className="w-full max-w-[430px] h-screen bg-background relative shadow-[0_0_100px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden m-auto lg:rounded-[3rem] lg:border-8 lg:border-slate-800">
          {/* Mock Status Bar for App Feel */}
          <div className="h-10 w-full flex justify-between items-center px-8 flex-shrink-0 text-on-surface/80">
            <span className="text-xs font-bold">9:41</span>
            <div className="flex gap-1.5 items-center">
              <div className="w-4 h-2.5 bg-on-surface/80 rounded-sm"></div>
              <div className="w-4 h-4 bg-on-surface/80 rounded-full"></div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto no-scrollbar pb-[var(--tab-bar-height)]">
            <ClientProviders>
              {children}
            </ClientProviders>
          </div>
        </div>
      </body>
    </html>
  );
}
