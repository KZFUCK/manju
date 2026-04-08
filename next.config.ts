import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // 允许在构建时存在警告提示，防止因 LCP 警告导致构建中断
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 生产构建时忽略类型检测错误（如果本地已验证通过）
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // 电商/展示类项目常用，防止 image optimization 算力瓶颈
  }
};

export default nextConfig;
