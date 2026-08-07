// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://autonoma-landing-2026-doj8.vercel.app",
  output: "static",
  vite: { plugins: [tailwindcss()] },
});
