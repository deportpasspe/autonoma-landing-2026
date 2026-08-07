# Design System — Universidad Autónoma del Perú (shared)

Fuente Figma: [Test Autonoa](https://www.figma.com/design/v26AJ8I1z675tG6IPJ69Oh/Test-Autonoa)

Tokens viven en `packages/ui/src/styles/global.css` (`@autonoma/ui`).

## Layout strategy

**Fluid + artboard lock** — fluid between 375–1440; lock at 1440.

## Tokens

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-brand` | `#FF6600` | Primario |
| `--color-negro` | `#121212` | Texto |
| `--color-lavender` | `#CAC7FF` | Secciones accent |
| `--color-yellow` | `#FFE256` | Stats / cards |
| `--color-mint` | `#B6F491` | Stats |
| `--color-sky` | `#92E8FF` | Contacto / stats |

Tipografía: **Bricolage Grotesque** (400/600/700).

## Apps

- `apps/landing-principal` — landing aprobada
- `apps/landing-arequipa` — Nueva sede Arequipa (ver `apps/landing-arequipa/docs/AGENT_CONTEXT.md`)
