interface PageMeta {
  title: string;
  description: string;
  path: string;
}

export function buildPageMeta({ title, description, path }: PageMeta) {
  const siteUrl = import.meta.env.PUBLIC_SITE_URL || "http://localhost:4321";
  const canonical = new URL(path, siteUrl).href;

  return {
    title,
    description,
    canonical,
  };
}
