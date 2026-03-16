import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import("next").NextConfig} */
const nextConfig = {
  // Use velora-studio as root when workspace has multiple lockfiles (e.g. run from parent folder)
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;

