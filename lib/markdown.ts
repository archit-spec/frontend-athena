import path from "path"

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
  // In a real implementation, you'd read from the file system
  // const fileNames = fs.readdirSync(postsDirectory)
  // const allPostsData = fileNames.map((fileName) => {
  //   const slug = fileName.replace(/\.md$/, '')
  //   const fullPath = path.join(postsDirectory, fileName)
  //   const fileContents = fs.readFileSync(fullPath, 'utf8')
  //   const matterResult = matter(fileContents)
  //
  //   return {
  //     slug,
  //     ...matterResult.data,
  //     content: matterResult.content
  //   } as BlogPost
  // })

  // For now, return sample data
  return [
    {
      slug: "introducing-constitutional-ai",
      title: "Introducing Constitutional AI for Better Alignment",
      excerpt:
        "How we're using constitutional AI principles to create more aligned and helpful AI systems through human feedback.",
      date: "2024-01-15",
      author: "Sarah Chen",
      readTime: "5 min read",
      content: "",
    },
  ]
}

export function getPostBySlug(slug: string): BlogPost | null {
  // In a real implementation, you'd read the specific file
  // const fullPath = path.join(postsDirectory, `${slug}.md`)
  // if (!fs.existsSync(fullPath)) return null
  //
  // const fileContents = fs.readFileSync(fullPath, 'utf8')
  // const matterResult = matter(fileContents)
  //
  // return {
  //   slug,
  //   ...matterResult.data,
  //   content: matterResult.content
  // } as BlogPost

  return null // Placeholder
}
