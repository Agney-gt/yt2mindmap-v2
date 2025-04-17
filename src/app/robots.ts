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
    sitemap: ["https://yt2mindmap.com/sitemap.xml"]
  };
}