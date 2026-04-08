import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "需求广场 | MangaAI - 发现全球高价值 AI 创作项目",
  description: "连接顶级 AI 创作者与需求方，发现赛博朋克、仙侠、都市等多种风格的漫剧制作项目。",
};

export default function MarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
