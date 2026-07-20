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
        title: "Fashion Gate Mall Syria | Syria's Premier Luxury Department Store",
        description: "Fashion Gate Mall Syria is Syria's first international luxury department store located at Damascus Boulevard, bringing global fashion houses, fine apparel, beauty, and luxury dining under one roof.",
        keywords: ["Fashion Gate Mall", "Syria Luxury Mall", "Damascus Boulevard", "Luxury Retail Syria", "Elie Saab Syria", "Gucci Syria"]
      },
      lang: "en",
      pathname: "en"
    });
  } catch (e) {
    return buildMetadataFromSeo({
      fallback: {
        title: "Fashion Gate Mall Syria | Syria's Premier Luxury Department Store",
        description: "Fashion Gate Mall Syria is Syria's first international luxury department store located at Damascus Boulevard."
      },
      lang: "en",
      pathname: "en"
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
      <Storefront settings={settings} sections={sections} brands={data.brands} initialLang="en" />
    </>
  );
}
