import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: [
        "/api/*",
        "/mindmap/*"
      ]
    },
    sitemap: ["https://www.y2map.com/sitemap.xml"]
  };
}
