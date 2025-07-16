import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  base: process.env.NEXT_PUBLIC_BASE_PATH || "/resume-site",
};

export default nextConfig;
