import { getFixturePage, getFixtureSettings } from "./adapters/fixtures";
import type { Page, SiteSettings } from "./types";

export async function getPage(slug: string): Promise<Page | undefined> {
  return getFixturePage(slug);
}

export async function getSettings(): Promise<SiteSettings> {
  return getFixtureSettings();
}
