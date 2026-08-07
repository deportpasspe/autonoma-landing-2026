# Vercel — Arequipa (activo)

Proyecto: `autonoma-landing-2026`  
URL: https://autonoma-landing-2026-seven.vercel.app

Configuración (repo root + `vercel.json`):

- **Root Directory:** `.`
- **Build Command:** `npm run build -w apps/landing-arequipa`
- **Output Directory:** `apps/landing-arequipa/dist`
- **Install Command:** `npm install`

Para volver a la landing principal, cambia el build/output a `apps/landing-principal`.

## Deploy local → production

```bash
vercel --prod --yes
```

## Export limpio local

```bash
npm run export:arequipa
# → apps/landing-arequipa/export/autonoma-arequipa/ + .zip
```
