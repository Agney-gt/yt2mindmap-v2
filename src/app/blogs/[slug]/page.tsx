import { getBlogData, getAllBlogIds } from "@/lib/blogs"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
// Generate static params for all blog posts
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const blogIds = await getAllBlogIds()
  return blogIds.map((id) => ({ slug: id }))
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params
  const blog = await getBlogData(slug)

  return {
    title: `${blog.title} | Y2Map Blog`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.coverImage || "/opengraph-image.png"],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [blog.coverImage || "/opengraph-image.png"],
    },
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const blog = await getBlogData(slug)

  return (
    <div className="flex justify-center items-center min-h-screen py-10 px-4">
      <div className="flex flex-col items-center max-w-screen-xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">{blog.title}</h1>

        <Image
          src={blog.coverImage || "/placeholder.svg"}
          alt={blog.title}
          width={800}
          height={450}
          className="w-full max-w-screen-xl h-auto object-contain rounded-lg mb-6"
        />

        {/* Render Markdown content */}
       
        <article className="prose prose-lg w-full max-w-none">
        <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    h1: (props) => <h1 className="text-4xl font-bold my-4" {...props} />,
    h2: (props) => <h2 className="text-3xl font-semibold my-3" {...props} />,
    h3: (props) => <h3 className="text-2xl font-semibold my-2" {...props} />,
    p: (props) => <p className="text-base leading-7 my-2" {...props} />,
    li: (props) => <li className="list-disc ml-6" {...props} />,
    table: (props) => <table className="table-auto border-collapse border border-gray-300 my-4" {...props} />,
    th: (props) => <th className="border border-gray-300 px-4 py-2 font-semibold bg-gray-100" {...props} />,
    td: (props) => <td className="border border-gray-300 px-4 py-2" {...props} />,
  }}
>
  {blog.content}
</ReactMarkdown>

        </article>
        
      </div>
    </div>
  )
}
