import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 实验室 | MangaAI - 领先的 AI 创作工具集",
  description: "剧本拆解、模型微调、分镜生成，一站式 AI 漫剧创作解决方案。",
};

export default function AILabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
