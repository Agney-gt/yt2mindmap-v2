import { getAllBlogs } from "@/lib/blogs"
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getAllBlogs()

  const blogEntries = blogs.map((blog) => ({
    url: `https://www.y2map.com/blogs/${blog.id}`,
    lastModified: new Date(blog.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: "https://www.y2map.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.y2map.com/blogs",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogEntries,
  ]
}
