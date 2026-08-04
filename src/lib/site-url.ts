export function getSiteUrl(): string {
  const fromEnv = import.meta.env.PUBLIC_SITE_URL;
  if (typeof fromEnv === "string" && fromEnv.length > 0) {
    return fromEnv.replace(/\/$/, "");
  }

  const vercelUrl = import.meta.env.VERCEL_URL;
  if (typeof vercelUrl === "string" && vercelUrl.length > 0) {
    return `https://${vercelUrl.replace(/\/$/, "")}`;
  }

  return "http://localhost:4321";
}
