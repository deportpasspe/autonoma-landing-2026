import { getSiteUrl } from "../site-url";

interface PageMeta {
  title: string;
  description: string;
  path: string;
}

export function buildPageMeta({ title, description, path }: PageMeta) {
  const siteUrl = getSiteUrl();
  const canonical = new URL(path, siteUrl).href;

  return {
    title,
    description,
    canonical,
  };
}
