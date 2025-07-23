import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/blog")

export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  content: string
  readTime: string
}

export function getAllPosts(): BlogPost[] {
  try {
    // Ensure the posts directory exists
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true })
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, "")
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const matterResult = matter(fileContents)

        return {
          slug,
          title: matterResult.data.title || "Untitled",
          date: matterResult.data.date || new Date().toISOString().split("T")[0],
          author: matterResult.data.author || "AthenaAgent Team",
          excerpt: matterResult.data.excerpt || "No excerpt available",
          readTime: matterResult.data.readTime || "5 min read",
          content: matterResult.content,
        } as BlogPost
      })

    // Sort posts by date (newest first)
    return allPostsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error("Error reading blog posts:", error)
    return []
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const matterResult = matter(fileContents)

    return {
      slug,
      title: matterResult.data.title || "Untitled",
      date: matterResult.data.date || new Date().toISOString().split("T")[0],
      author: matterResult.data.author || "AthenaAgent Team",
      excerpt: matterResult.data.excerpt || "No excerpt available",
      readTime: matterResult.data.readTime || "5 min read",
      content: matterResult.content,
    } as BlogPost
  } catch (error) {
    console.error("Error reading blog post:", error)
    return null
  }
}
