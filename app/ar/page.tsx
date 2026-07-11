import { getHomepageData } from "@/lib/sanity";
import { fallbackSections, fallbackSettings } from "@/lib/fallbackData";
import Storefront from "@/components/Storefront";
import type { Section, SiteSettings } from "@/lib/types";

export const revalidate = 0;

export default async function Home() {
  let data: { settings?: SiteSettings; page?: { sections?: Section[] } } = {};

  try {
    data = await Promise.race([
      getHomepageData(),
      new Promise<{}>((resolve) => setTimeout(() => resolve({}), 2500))
    ]);
  } catch {
    data = {};
  }

  const settings = { ...fallbackSettings, ...(data.settings || {}) };
  const sections = data.page?.sections?.length ? data.page.sections : (fallbackSections as Section[]);

  return <Storefront settings={settings} sections={sections} initialLang="ar" />;
}
