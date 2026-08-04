import type { APIRoute } from "astro";
import { getSiteUrl } from "../lib/site-url";

export const GET: APIRoute = () => {
  const site = getSiteUrl();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${site}/</loc>
  </url>
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
