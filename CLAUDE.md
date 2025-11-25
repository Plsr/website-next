# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built with Next.js 15 (App Router), featuring a blog, library, and content management system. The site uses TypeScript, Tailwind CSS, and Content Collections for markdown-based content.

## Development Commands

### Package Manager
This project uses **pnpm** (see `pnpm.overrides` in package.json). Always use `pnpm` commands.

### Common Commands
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Auto-fix linting issues
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check formatting without changes
- `pnpm test` - Run tests with Vitest
- `pnpm test:watch` - Run tests in watch mode
- `pnpm typecheck` - Run TypeScript type checking

### Testing
This project uses **Vitest** with React Testing Library for unit and integration tests.
- Test configuration: `vitest.config.ts` with JSDOM environment
- Test setup: `test/setupTests.ts` extends `expect` with `@testing-library/jest-dom` matchers
- Test files: Place tests in `__tests__` directories or name them `*.{test,spec}.{ts,tsx}`
- CI: GitHub Actions workflow in `.github/workflows/test.yml` runs tests and typecheck on PRs and main branch

## Architecture

### Content Management (Keystatic)

The site uses Keystatic (`@keystatic/core`) for content management. Configuration is in `keystatic.config.ts`:

- **Posts**: Located in `content/posts/`, uses Markdoc format with schema (title, date, slug, tags, draft, series, metaDescription, excerpt)
- **Reading Notes**: Located in `content/library/articles/`, with fields (title, createdAt, link, tags)
- Storage: Local filesystem (`kind: 'local'`)
- Content access: Through the `cms` reader in `data/cms.ts` which wraps Keystatic's reader API

The collections use Markdoc for content formatting and Keystatic's slug field type for generating slugs from titles.

### App Structure (Next.js App Router)

- `app/` - App Router directory with route groups and dynamic routes
  - `app/posts/[slug]/page.tsx` - Dynamic post pages
  - `app/posts/feed.rss/route.ts` & `app/posts/feed.atom/route.ts` - RSS/Atom feed routes
  - `app/page.tsx` - Homepage with recent posts and work history
  - `app/layout.tsx` - Root layout with Piazzolla font, analytics, and global components

### Data Layer

Data access functions are in `data/`:
- `cms.ts` - Keystatic reader wrapper with `cms.posts.allPublished()` and `cms.readingNotes` methods
- `posts.dto.ts` - Post queries (getLastThreePosts, getPostsForTag, getPostForSlug, getAllPostsByYear, getAllSortedPosts)
- `tags.dto.ts` - Tag-related queries
- All functions work with posts retrieved from the Keystatic reader

### Components

Organized in `components/` with single-responsibility components:
- Layout components: `header.tsx`, `footer.tsx`, `layout.tsx`
- Content components: `styled-article-content.tsx` (wraps HTML from markdown), `post-list-item.tsx`
- UI components: `button.tsx`, `tag.tsx`, `dark-mode-toggle.tsx`, `context-menu.tsx`

### Styling

- **Tailwind CSS 4** with CSS-based configuration (defined in `app/tailwind.css`)
- Custom colors: `accent` (teal shades), `base` (neutral grays), `paper` (off-white)
- Typography plugin (`@tailwindcss/typography`) with customized prose styles via CSS custom properties
- Content paths specified via `@source` directives in CSS
- Dark mode: `media` query based (prefers-color-scheme)
- Prettier config: no semicolons, single quotes

### Path Aliases (tsconfig.json)

```
components/* → ./components/*
@components/* → ./components/*
lib/* → ./lib/*
```

### MDX Support

The site supports both markdown (via Keystatic) and MDX files:
- `@next/mdx` and `@mdx-js/loader` configured in `next.config.mjs`
- Page extensions: js, jsx, mdx, ts, tsx
- Example: `app/cv/page.mdx`

### Feeds

RSS/Atom feeds are generated in `lib/feeds.ts` using the `feed` package. Feed routes in `app/posts/feed.{rss,atom}/route.ts` call `generateFeed` with sorted posts.

## Code Style & Linting

### ESLint Configuration (eslint.config.mjs)

- Extends: `next/core-web-vitals`, `next/typescript`, `prettier`
- Custom rules:
  - `simple-import-sort/imports: error` - Enforces sorted imports
  - `@typescript-eslint/no-unused-vars` with `_` prefix pattern for intentionally unused vars
  - `import/no-duplicates: error`
  - `import/first: error`
  - `import/newline-after-import: warn`
  - `@typescript-eslint/ban-ts-comment: off`

### Import Sorting

Imports must be sorted alphabetically using `eslint-plugin-simple-import-sort`. Run `pnpm lint:fix` to auto-sort.

### Prettier

- No semicolons (`semi: false`)
- Single quotes (`singleQuote: true`)
- See `.prettierignore` for excluded paths

### After Making Changes

Always run `pnpm format` after making code changes to ensure consistent formatting.

## Important Implementation Details

### Static Generation
`generateStaticParams` in `app/posts/[slug]/page.tsx` returns an empty array, relying on dynamic rendering at request time.

### Metadata Pattern
Pages define `generateMetadata` async functions for SEO. Default OpenGraph image is `/og.jpg`.

### Font Loading
Uses Next.js font optimization with `next/font/google` for Piazzolla font, with CSS variable `--font-main`.

## Deployment

- Target: Vercel (analytics enabled via `@vercel/analytics`)
- Output: `standalone` (configured in `next.config.mjs`)
- Docker support: `Dockerfile` and `docker-compose.yml` present

## Key Dependencies

- Next.js 16.0.1 with React 19
- Keystatic for content management
- Markdoc for markdown processing
- Tailwind CSS 4 with Typography plugin
- date-fns for date formatting
- Framer Motion for animations
- Lucide React for icons
- Feed library for RSS/Atom generation
