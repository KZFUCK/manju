import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "消息中心 | MangaAI - 实时创作协作沟通",
  description: "与项目委托人或创作者进行实时沟通，同步项目进度，共享创作灵感。",
};

export default function InboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
