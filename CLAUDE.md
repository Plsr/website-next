# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website built with Astro 6, Tailwind CSS 4, and TypeScript. Currently in early "restart" stage with minimal scaffolding.

## Commands

- `pnpm dev` — start dev server at localhost:4321
- `pnpm build` — production build to `./dist/`
- `pnpm preview` — preview production build locally

## Tech Stack

- **Astro 6** — static site generator, file-based routing in `src/pages/`
- **Tailwind CSS 4** — integrated via `@tailwindcss/vite` plugin (configured in `astro.config.mjs`), imported in `src/styles/global.css`
- **TypeScript** — strict mode via `astro/tsconfigs/strict`
- **pnpm** — package manager (requires Node >= 22.12.0)

## Architecture

- `src/pages/` — file-based routing (`.astro` or `.md` files become routes)
- `src/styles/global.css` — global Tailwind entry point (`@import "tailwindcss"`)
- `public/` — static assets served at root (favicons)
- `astro.config.mjs` — Astro + Vite/Tailwind configuration

## Documentation

- `docs/images.md` — how to use captioned images and image pairs in posts
