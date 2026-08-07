// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://autonoma-landing-2026-seven.vercel.app",
  output: "static",
  // Inline the Tailwind chunk (named Button.*.css) to remove the render-blocking
  // stylesheet on the critical path (~13 KB gzipped).
  build: { inlineStylesheets: "always" },
  vite: { plugins: [tailwindcss()] },
});
