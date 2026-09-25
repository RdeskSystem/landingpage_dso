import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/admin/" }],
    sitemap: "https://web.duxorientis.com/sitemap.xml",
    host: "https://web.duxorientis.com",
  };
}
