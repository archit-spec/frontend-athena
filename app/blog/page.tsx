import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { getAllPosts } from "@/lib/markdown"

export default function BlogIndex() {
  const blogPosts = getAllPosts()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="relative z-50 px-6 py-4 border-b border-gray-800">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <div className="text-2xl font-bold tracking-tight">
            <span className="text-white">ATHENA</span>
            <span className="text-purple-400 italic font-light">Agent</span>
          </div>
        </div>
      </header>

      {/* Blog Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-light tracking-tight">Blog</h1>
            <p className="text-gray-400 text-lg">Insights on AI alignment, RLHF, and the future of safe AI</p>
          </div>

          {blogPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg mb-4">No blog posts found.</p>
              <p className="text-gray-500 text-sm">
                Add markdown files to the <code className="bg-gray-800 px-2 py-1 rounded">content/blog/</code> directory
                to see them here.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <article
                  key={post.slug}
                  className="border border-gray-800 rounded-lg p-8 hover:border-gray-700 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="text-2xl font-light hover:text-purple-400 transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="text-gray-300 leading-relaxed">{post.excerpt}</p>

                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800 bg-transparent">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
