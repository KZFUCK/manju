import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // 继续保留此项以确保 public/portfolio 下的图片在部署后能直接访问
    unoptimized: true,
  }
};

export default nextConfig;
