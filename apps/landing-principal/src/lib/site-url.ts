const PRODUCTION_SITE_URL = "https://autonoma-landing-2026-doj8.vercel.app";

export function getSiteUrl(): string {
  const fromEnv = import.meta.env.PUBLIC_SITE_URL;
  if (typeof fromEnv === "string" && fromEnv.length > 0) {
    return fromEnv.replace(/\/$/, "");
  }

  return PRODUCTION_SITE_URL;
}
