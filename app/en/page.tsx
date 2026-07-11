import { getHomepageData } from "@/lib/sanity";
import { fallbackSections, fallbackSettings } from "@/lib/fallbackData";
import Storefront from "@/components/Storefront";
import type { Section, SiteSettings } from "@/lib/types";

export const revalidate = 0;

export default async function Home() {
  let data: { settings?: SiteSettings; page?: { sections?: Section[] } } = {};

  try {
    data = await getHomepageData();
  } catch (err) {
    console.error("Failed to load homepage data:", err);
    data = {};
  }

  console.log(data, fallbackSections, "fallbacksections");
  const settings = { ...fallbackSettings, ...(data.settings || {}) };
  const sections = data.page?.sections?.length ? data.page.sections : (fallbackSections as Section[]);



  return <Storefront settings={settings} sections={sections} initialLang="en" />;
}
