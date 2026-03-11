import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(process.cwd()),
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/icon" }];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "pageshot.site", pathname: "/**" },
    ],
  },
};

export default nextConfig;
