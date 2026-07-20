import AboutClient from "@/components/AboutClient";
import { getAboutPageData } from "@/lib/sanity";
import { buildMetadataFromSeo, buildBreadcrumbsJsonLd } from "@/lib/seo";

export const revalidate = 0;

export async function generateMetadata() {
  try {
    const data = await getAboutPageData();
    return buildMetadataFromSeo({
      seoData: data?.seo,
      fallback: {
        title: "من نحن | فاشن غيت مول دمشق",
        description: "تعرف على فاشن غيت مول دمشق — وجهة التجزئة الفاخرة الرائدة في بوليفارد دمشق والتي تجمع أشهر دور الأزياء العالمية، ومستحضرات التجميل، والمطاعم الراقية.",
        keywords: ["من نحن فاشن غيت", "معرض بوليفارد دمشق", "الفخامة في سوريا", "مجموعة أنليميتد"]
      },
      lang: "ar",
      pathname: "about/ar"
    });
  } catch (e) {
    return buildMetadataFromSeo({
      fallback: {
        title: "من نحن | فاشن غيت مول دمشق",
        description: "تعرف على فاشن غيت مول دمشق."
      },
      lang: "ar",
      pathname: "about/ar"
    });
  }
}

export default async function AboutArPage() {
  let initialData = null;
  try {
    initialData = await getAboutPageData();
  } catch (error) {
    console.error("Failed to load about page data from Sanity:", error);
  }

  const breadcrumbsJsonLd = buildBreadcrumbsJsonLd([
    { name: "الرئيسية", url: "https://fashiongatemall.com/ar" },
    { name: "من نحن", url: "https://fashiongatemall.com/about/ar" }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <AboutClient initialLang="ar" initialData={initialData} />
    </>
  );
}
