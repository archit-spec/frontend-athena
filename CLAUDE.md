# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `bun run dev` - Start development server (Next.js on port 3000)
- `bun run build` - Build production application
- `bun run start` - Start production server
- `bun run lint` - Run ESLint for code quality

Note: The project uses bun as the package manager (bun.lockb present). Missing dependencies like 'geist' fonts need to be installed if running into module resolution errors.

## Architecture Overview

This is a Next.js 14 application for AthenaAgent, a company providing RL post-training for AI agents. The project follows Next.js App Router structure with TypeScript.

### Key Architecture Components

**Frontend Stack:**
- Next.js 14 with App Router (app/ directory structure)
- TypeScript for type safety
- Tailwind CSS with custom design system
- Framer Motion for animations
- Radix UI + shadcn/ui component library

**Project Structure:**
- `app/` - Next.js App Router pages and layouts
  - `page.tsx` - Main landing page (server component wrapper)
  - `clientpage.tsx` - Main client component with all UI logic
  - `layout.tsx` - Root layout with Geist fonts
  - `blog/` - Blog section with dynamic routing
- `components/ui/` - Reusable UI components (shadcn/ui based)
- `lib/` - Utility functions
  - `markdown.ts` - Blog post processing with gray-matter
  - `utils.ts` - General utilities (likely cn function for Tailwind)
- `content/blog/` - Markdown blog posts
- `public/` - Static assets (images, GIFs)

**Content Management:**
The blog system uses markdown files in `content/blog/` processed by gray-matter. Posts support frontmatter for metadata (title, date, author, excerpt, readTime).

**Styling Approach:**
- Uses shadcn/ui design system with Tailwind CSS
- CSS variables for theme colors defined in globals.css
- Custom Tailwind config with extended color palette
- Dark theme with black/gray color scheme

### Development Configuration

**Next.js Config:**
- ESLint and TypeScript errors ignored during builds
- Images unoptimized (likely for static export)

**Key Dependencies:**
- UI: Radix UI components, Lucide React icons, Framer Motion
- Content: gray-matter for markdown processing
- Styling: Tailwind CSS with tailwindcss-animate
- Fonts: Geist Sans/Mono (may need installation)

## Component Patterns

The main application logic is in `clientpage.tsx` which demonstrates several patterns:
- Framer Motion animations with scroll-based transforms
- Intersection Observer for view-based animations
- Mouse position tracking for interactive effects
- Modular section components with consistent animation variants