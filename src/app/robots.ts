import type { MetadataRoute } from "next";

const baseUrl = "https://velorastudio.design";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin/", "/api/"] }],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
