import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false, // Giáo trình quản lý AGENTS.md; không tự nối hướng dẫn mới khi npm run dev.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
