import TermsClient from "@/components/TermsClient";
import { getTermsPageData } from "@/lib/sanity";
import { buildMetadataFromSeo, buildBreadcrumbsJsonLd } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
  try {
    const data = await getTermsPageData();
    return buildMetadataFromSeo({
      seoData: data?.seo,
      fallback: {
        title: "الشروط والأحكام | فاشن غيت مول دمشق",
        description: "اطّلع على الشروط والأحكام المنظمة لزيارتكم وتسوقكم وخدماتكم في فاشن غيت مول دمشق.",
        keywords: ["شروط فاشن غيت", "أحكام بوليفارد دمشق", "الشروط والأحكام سوريا"]
      },
      lang: "ar",
      pathname: "terms/ar"
    });
  } catch (e) {
    return buildMetadataFromSeo({
      fallback: {
        title: "الشروط والأحكام | فاشن غيت مول دمشق",
        description: "اطّلع على الشروط والأحكام في فاشن غيت مول دمشق."
      },
      lang: "ar",
      pathname: "terms/ar"
    });
  }
}

export default async function TermsArPage() {
  let initialData = null;
  try {
    initialData = await Promise.race([
      getTermsPageData(),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 1500))
    ]);
  } catch (error) {
    console.error("Failed to load terms data from Sanity:", error);
  }

  const breadcrumbsJsonLd = buildBreadcrumbsJsonLd([
    { name: "الرئيسية", url: "https://fashiongatemall.com/ar" },
    { name: "الشروط والأحكام", url: "https://fashiongatemall.com/terms/ar" }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <TermsClient lang="ar" initialData={initialData} />
    </>
  );
}
