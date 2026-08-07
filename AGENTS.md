## Development

When starting the dev server, prefer root workspace scripts:

```
npm run dev:principal
npm run dev:arequipa
```

Or from an app folder: `astro dev --background`.

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Build / deploy gate

Before push to `main` or any Vercel deploy, run the workspace build and ensure it exits 0:

```
npm run build -w apps/landing-arequipa
```

(or `landing-principal` when that app changed). Fix `astro check` / `tsc` errors before shipping.

## Documentation

Full documentation: https://docs.astro.build

Monorepo layout:

- `packages/ui` — shared design system
- `apps/landing-principal` — approved landing
- `apps/landing-arequipa` — Nueva sede Arequipa

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
