# AGENTS.md

Instructions for agentic AI tools working in this repository.

## Commands

- Dev server: `npm run dev`
- Build: `npm run build`
- Start prod server: `npm run start`
- Lint: `npm run lint`

## Architecture & Conventions

- **Framework**: Next.js 15 (App Router, `src/app/`)
- **Language**: TypeScript (`.ts`, `.tsx`)
- **Styling**: Tailwind CSS 4 (`@import "tailwindcss";` in `src/app/globals.css`)
- **Fonts**: `Geist` & `Geist_Mono` imported via `next/font/google` in `layout.tsx`
- **Strict rules**:
  - Never edit `package-lock.json` directly.
  - Keep components modular in `src/components/` (create folder when adding components).
  - Use App Router patterns (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`).
