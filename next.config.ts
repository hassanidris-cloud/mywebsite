import type { NextConfig } from "next";
import path from "path";
import os from "os";

/** Set by `scripts/launch-next-dev.cjs` — reliable on Windows (see docs/DEV-WINDOWS.md). */
const useTempDevDist =
  process.platform === "win32" &&
  process.env.NEXT_USE_TEMP_DIST === "1" &&
  process.env.NEXT_DEV_USE_PROJECT_DIST !== "1";

const nextConfig: NextConfig = {
  /**
   * Windows + `npm run dev`: build output goes to `%TEMP%\velora-studio-next-dev`
   * so a locked `.\.next\trace` on Desktop/OneDrive cannot break the dev server.
   * `next build` / Vercel still use `.next` in the project.
   */
  ...(useTempDevDist
    ? { distDir: path.join(os.tmpdir(), "velora-studio-next-dev") }
    : {}),
  outputFileTracingRoot: path.join(process.cwd()),
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/icon.svg" }];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "pageshot.site", pathname: "/**" },
    ],
  },
};

export default nextConfig;
