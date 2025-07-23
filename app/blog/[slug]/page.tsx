import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { getPostBySlug, getAllPosts } from "@/lib/markdown"
import Prism from "prismjs"
import "prismjs/components/prism-python"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-bash"
import "prismjs/themes/prism-tomorrow.css"

// Simple markdown to HTML converter (in a real app, use a proper markdown parser like remark)
function parseMarkdown(markdown: string): string {
  return markdown
    // Handle code blocks first (before other processing)
    .replace(/```(\w+)?\r?\n([\s\S]*?)\r?\n```/g, (match, language, code) => {
      const lang = language || 'text'
      const grammar = Prism.languages[lang] || Prism.languages.text
      const highlightedCode = Prism.highlight(code, grammar, lang)
      return `<pre class="bg-gray-900 p-4 rounded-lg overflow-x-auto my-6 border border-gray-700"><code class="language-${lang} text-sm font-mono whitespace-pre">${highlightedCode}</code></pre>`
    })
    // Handle inline code
    .replace(/`([^`]+)`/g, '<code class="bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-200">$1</code>')
    // Handle headings
    .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-light mb-6 mt-8">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-light mb-4 mt-6">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-light mb-3 mt-4">$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4 class="text-xl font-medium mb-2 mt-3">$1</h4>')
    // Handle images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-6 border border-gray-700" />')
    // Handle links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">$1</a>')
    // Handle bold and italic
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    // Handle lists
    .replace(/^\* (.*$)/gim, '<li class="ml-4 mb-1">$1</li>')
    .replace(/^- (.*$)/gim, '<li class="ml-4 mb-1">$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 mb-1">$1</li>')
    // Handle paragraphs (do this last)
    .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed text-gray-300">')
    .replace(/^(?!<[h|l|p|c|a|i])/gm, '<p class="mb-4 leading-relaxed text-gray-300">')
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const htmlContent = parseMarkdown(post.content)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="relative z-50 px-6 py-4 border-b border-gray-800">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Link href="/blog" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Blog</span>
          </Link>
          <Link href="/" className="text-2xl font-bold tracking-tight">
            <span className="text-white">ATHENA</span>
            <span className="text-purple-400 italic font-light">Agent</span>
          </Link>
        </div>
      </header>

      {/* Blog Post Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <article className="space-y-8">
          {/* Post Header */}
          <header className="space-y-4 pb-8 border-b border-gray-800">
            <h1 className="text-5xl font-light leading-tight">{post.title}</h1>
            <div className="flex items-center space-x-4 text-gray-400">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.author}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </header>

          {/* Post Content */}
          <div
            className="prose prose-invert prose-lg max-w-none [&>p]:mb-4 [&>p]:leading-relaxed [&>p]:text-gray-300 [&>h1]:text-4xl [&>h1]:font-light [&>h1]:mb-6 [&>h1]:mt-8 [&>h2]:text-3xl [&>h2]:font-light [&>h2]:mb-4 [&>h2]:mt-6 [&>h3]:text-2xl [&>h3]:font-light [&>h3]:mb-3 [&>h3]:mt-4 [&>ul]:space-y-1 [&>ol]:space-y-1 [&>li]:text-gray-300"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>
      </main>
    </div>
  )
}
