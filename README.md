# Landing Autónoma — Monorepo

Landings de Universidad Autónoma del Perú (Astro 7 + Tailwind 4).

## Apps

| App | Path | Description |
|-----|------|-------------|
| Principal | `apps/landing-principal` | Landing aprobada (congelada) |
| Arequipa | `apps/landing-arequipa` | Nueva sede Arequipa |

## Shared

- `@autonoma/ui` — tokens + UI primitives (`packages/ui`)

## Commands

```bash
npm install
npm run dev:principal
npm run dev:arequipa
npm run build:principal
npm run build:arequipa
npm run export:principal
npm run export:arequipa
```

## Vercel

1. Mientras Arequipa esté en desarrollo: **Root Directory** = `apps/landing-principal`
2. Cuando Arequipa esté aprobada: cambiar Root Directory a `apps/landing-arequipa` y redeploy (misma URL del proyecto)

## Assets Arequipa

Sube exports por sección en:

```
apps/landing-arequipa/public/assets/figma/arequipa/{hero,oferta,oficina,virtual,espacios,aliados,contacto,blog,icons,logo}/
```
