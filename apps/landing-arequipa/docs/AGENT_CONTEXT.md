# Agent Context — Landing Nueva Sede Arequipa

## Kickoff decisions

| Decision | Choice |
|----------|--------|
| Language | **Un idioma** — Spanish (`lang="es"`), home at `/` |
| Layout strategy | **Fluid + artboard lock** (1440) |
| Sticky form rail | **No** — el formulario vive dentro del hero (columna derecha), sin sticky |
| CMS | **None** — TypeScript fixtures in `src/content/` |

## Stack

- Astro 7 static
- Tailwind 4 via `@autonoma/ui`
- TypeScript strict
- Node 22+
- Monorepo app: `apps/landing-arequipa`

## Architecture

```
pages → views → sections → @autonoma/ui | components/layout | components/modals
```

## Figma source

- Dev desktop: https://www.figma.com/design/v26AJ8I1z675tG6IPJ69Oh/Test-Autonoa?node-id=33-358
- Frame page: `Nueva sede Arequipa` (`33:5270`, 1440×8048)
- **Mobile frame:** https://www.figma.com/design/v26AJ8I1z675tG6IPJ69Oh/Test-Autonoa?node-id=33-9852 (`33:9852`, 414×9219)
- Prototype: https://www.figma.com/proto/zq0FTV8YnO4CdqCdhaRBke/Landings-Ministe-Aut%C3%B3noma?node-id=72-93
## Responsive (mobile)

- **Mobile frame node-id:** `33:9852`
- Layout notes from Figma:
  - Hero: foto a sangre + copy; form mint a ancho completo debajo (no card flotante)
  - Form: campos en 1 columna; checkbox de comunicaciones
  - Oferta stats: carrusel horizontal
  - Virtual: título/QS → accordion → foto (sin bocadillo naranja en mobile)
  - Contacto: contenido centrado
- También: Header hamburger + drawer; Oficina tabs; FAQ/Virtual accordions; modals `calc(100%-2rem)`

When refining mobile, prefer layout from `33:9852` but keep Arequipa desktop copy when the mobile frame still has leftover text from otra landing.

## Sections (order)

header → hero (con formulario) → oferta → oficina → virtual → espacios → aliados → contacto → testimonios → faq → blog → footer

## Commands

```bash
npm run dev:arequipa
npm run build:arequipa
npm run export:arequipa
```

## Vercel

Keep Root Directory on `apps/landing-principal` until Arequipa is approved.
Then switch Root Directory to `apps/landing-arequipa` and redeploy (same project URL).

## Assets

Drop section exports in:

```
public/assets/figma/arequipa/{hero,oferta,oficina,virtual,espacios,aliados,contacto,blog,icons,logo}/
```
