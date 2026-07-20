import { getHomepageData } from "@/lib/sanity";
import { fallbackSections, fallbackSettings } from "@/lib/fallbackData";
import Storefront from "@/components/Storefront";
import type { Section, SiteSettings } from "@/lib/types";
import { buildMetadataFromSeo, buildOrganizationJsonLd, buildStoreJsonLd } from "@/lib/seo";

export const revalidate = 0;

export async function generateMetadata() {
  try {
    const data = await getHomepageData();
    return buildMetadataFromSeo({
      seoData: data.page?.seo,
      fallback: {
        title: "فاشن غيت مول دمشق | أول مول فاخر عالمي في سوريا",
        description: "فاشن غيت مول دمشق هو أول مجمع تجاري فاخر بمواصفات عالمية يقع في بوليفارد دمشق، ويجمع أشهر دور الأزياء العالمية، ومستحضرات التجميل، والمطاعم الراقية تحت سقف واحد.",
        keywords: ["فاشن غيت", "مول بوابة الأزياء دمشق", "بوليفارد دمشق", "أول مول فاخر في سوريا", "إيلي صعب دمشق", "غوتشي دمشق"]
      },
      lang: "ar",
      pathname: "ar"
    });
  } catch (e) {
    return buildMetadataFromSeo({
      fallback: {
        title: "فاشن غيت مول دمشق | أول مول فاخر عالمي في سوريا",
        description: "فاشن غيت مول دمشق هو أول مجمع تجاري فاخر بمواصفات عالمية يقع في بوليفارد دمشق."
      },
      lang: "ar",
      pathname: "ar"
    });
  }
}

export default async function Home() {
  let data: { settings?: SiteSettings; page?: { sections?: Section[] }; brands?: any[] } = {};

  try {
    data = await getHomepageData();
  } catch (err) {
    console.error("Failed to load homepage data:", err);
    data = {};
  }

  const settings = { ...fallbackSettings, ...(data.settings || {}) };
  const sections = data.page?.sections?.length ? data.page.sections : (fallbackSections as Section[]);

  const orgJsonLd = buildOrganizationJsonLd();
  const storeJsonLd = buildStoreJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }}
      />
      <Storefront settings={settings} sections={sections} brands={data.brands} initialLang="ar" />
    </>
  );
}
