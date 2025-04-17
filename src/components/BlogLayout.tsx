import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


interface BlogLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  image?: string;
  date?: string;
  readingTime?: string;
}

export default function BlogLayout({
  children,
  title,
  description,
  image,
  date,
  readingTime,
}: BlogLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <article className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12">
          <div className="space-y-4">
            {date && readingTime && (
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <time dateTime={date}>{new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                <span>•</span>
                <span>{readingTime} min read</span>
              </div>
            )}
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
              {title}
            </h1>
            {description && (
              <p className="text-xl text-gray-500 leading-relaxed">
                {description}
              </p>
            )}
          </div>
          {image && (
            <div className="mt-8 aspect-video relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>
        <div className="prose prose-lg prose-blue mx-auto max-w-none space-y-10
          prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-gray-900 prose-headings:mb-8
          prose-h1:text-5xl prose-h1:mb-10 prose-h1:leading-tight
          prose-h2:text-4xl prose-h2:mb-8 prose-h2:leading-snug
          prose-h3:text-3xl prose-h3:mb-6 prose-h3:leading-snug
          prose-p:text-gray-600 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-8 prose-p:tracking-wide
          prose-a:text-blue-600 prose-a:no-underline prose-a:border-b prose-a:border-blue-200 hover:prose-a:border-blue-600 hover:prose-a:text-blue-800 transition-colors
          prose-strong:text-gray-900 prose-strong:font-bold
          prose-code:text-blue-700 prose-code:bg-blue-50 prose-code:px-3 prose-code:py-1 prose-code:rounded-md prose-code:text-sm prose-code:font-medium
          prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-8 prose-pre:rounded-xl prose-pre:my-12 prose-pre:shadow-lg
          prose-img:rounded-xl prose-img:shadow-xl prose-img:my-12 prose-img:border prose-img:border-gray-100
          prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-8 prose-blockquote:italic prose-blockquote:text-gray-700 prose-blockquote:my-12 prose-blockquote:leading-relaxed prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:rounded-r-lg
          prose-ul:ml-8 prose-ul:list-disc prose-ul:mb-8 prose-ul:space-y-4
          prose-ol:ml-8 prose-ol:list-decimal prose-ol:mb-8 prose-ol:space-y-4
          prose-li:text-gray-600 prose-li:mb-2 prose-li:leading-relaxed prose-li:marker:text-blue-500
          [&>*:first-child]:mt-0 [&>*:last-child]:mb-0
          ">
          {children}
        </div>
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <Link
              href="/blogs"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Back to all blogs</span>
            </Link>
           
          </div>
        </footer>
      </article>
    </div>
  );
}