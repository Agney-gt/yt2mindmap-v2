import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://yt2mindmap.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: "https://yt2mindmap.com/blogs",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9
    },
    
  ];
}