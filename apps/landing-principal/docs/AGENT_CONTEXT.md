# Agent Context — Landing Autónoma

Reference project for the `@astro-frontend-starter` skill (single-language Figma landing, sticky form rail, 1440 lock, static export).

## Kickoff decisions

| Decision | Choice |
|----------|--------|
| Language | **Un idioma** — Spanish (`lang="es"`), home at `/` (not multiidioma) |
| Layout strategy | **Fluid + artboard lock** (not fixed-desktop) |
| Sticky form rail | **Yes** — right column sticky Hero → mid sections; Campus + Footer full width |

## Stack

- Astro 7 static
- Tailwind 4
- TypeScript strict
- Node 22+
- Single language: Spanish (`lang="es"`), route `/`

## Architecture

Monorepo app under `apps/landing-principal`. Shared UI: `@autonoma/ui`.

```
pages → views → sections → @autonoma/ui | components/layout
```

## Figma source

https://www.figma.com/design/PQ0jen5WIs48SIjkFKyzFH/Autonoma-Landing?node-id=558-282

## Sections

hero → desafiar → resultados → leadForm → testimonios → propioCamino → mundo → campus

## Commands

```bash
npm run dev
npm run check
npm run build
```
