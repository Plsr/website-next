# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js App Router project. Route files live in `app/` (for example `app/posts/[slug]/page.tsx`). Shared UI components live in `components/`, utility and integration logic in `lib/`, and data-access/content parsing code in `data/`.  
Content is file-based: long-form posts, notes, and library entries live in `content/`. Static assets are in `public/`. Database schema and migrations are under `drizzle/` with config in `drizzle.config.ts`. Tests are colocated in `__tests__` folders and supported by `test/setupTests.ts`.

## Build, Test, and Development Commands
- `pnpm install`: install dependencies (pnpm is required; see `packageManager` in `package.json`).
- `pnpm dev`: run local dev server on `http://localhost:3000`.
- `pnpm build`: create production build.
- `pnpm start`: run the production build locally.
- `pnpm lint` / `pnpm lint:fix`: run ESLint checks and auto-fixes.
- `pnpm format` / `pnpm format:check`: apply or verify Prettier formatting.
- `pnpm test` / `pnpm test:watch`: run Vitest once or in watch mode.
- `pnpm typecheck`: run TypeScript checks without emitting files.
- `pnpm db:generate`, `pnpm db:migrate`, `pnpm db:studio`: manage Drizzle migrations.

## Coding Style & Naming Conventions
Use TypeScript for app code and keep files formatted with Prettier (`singleQuote: true`, `semi: false`). Follow ESLint rules in `eslint.config.mjs`, including sorted imports via `simple-import-sort`. Use underscore prefixes for intentionally unused parameters (for example `_event`) to satisfy lint rules.  
Component files are typically kebab-case in `components/`; route segments follow Next.js conventions (`[slug]`, `page.tsx`, `route.ts`).

## Testing Guidelines
Vitest + Testing Library are configured in `vitest.config.ts` with `jsdom` and global APIs enabled. Name tests `*.test.ts(x)` or `*.spec.ts(x)`, and colocate near the code (`lib/__tests__/`, `components/__tests__/`). Run `pnpm test` and `pnpm typecheck` before opening a PR.

## Commit & Pull Request Guidelines
Recent history favors short, imperative commit subjects (for example `Add books to library`) with optional issue links like `(#145)`. Keep commits focused and scoped.  
PRs should include: a concise summary, linked issue (if applicable), screenshots for UI changes, migration notes for `drizzle/` updates, and confirmation that lint, tests, and typecheck passed.

## Security & Configuration Tips
Never commit secrets. Copy `.env.example` for local setup and provide values for keys like `DATABASE_URL` and API tokens. Use `docker-compose.yml` if you need a local Postgres instance.
