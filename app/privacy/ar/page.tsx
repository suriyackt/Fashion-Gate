import PrivacyClient from "@/components/PrivacyClient";
import { getPrivacyPageData } from "@/lib/sanity";
import { buildMetadataFromSeo, buildBreadcrumbsJsonLd } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
  try {
    const data = await getPrivacyPageData();
    return buildMetadataFromSeo({
      seoData: data?.seo,
      fallback: {
        title: "سياسة الخصوصية | فاشن غيت مول دمشق",
        description: "اقرأ سياسة الخصوصية لفهم كيفية حماية فاشن غيت مول دمشق لمعلوماتك الشخصية وطلبات الكونسيرج وحقوق الخصوصية.",
        keywords: ["خصوصية فاشن غيت", "سياسة الخصوصية سوريا", "حماية البيانات بوليفارد دمشق"]
      },
      lang: "ar",
      pathname: "privacy/ar"
    });
  } catch (e) {
    return buildMetadataFromSeo({
      fallback: {
        title: "سياسة الخصوصية | فاشن غيت مول دمشق",
        description: "اقرأ سياسة الخصوصية في فاشن غيت مول دمشق."
      },
      lang: "ar",
      pathname: "privacy/ar"
    });
  }
}

export default async function PrivacyArPage() {
  let initialData = null;
  try {
    initialData = await Promise.race([
      getPrivacyPageData(),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 1500))
    ]);
  } catch (error) {
    console.error("Failed to load privacy data from Sanity:", error);
  }

  const breadcrumbsJsonLd = buildBreadcrumbsJsonLd([
    { name: "الرئيسية", url: "https://fashiongatemall.com/ar" },
    { name: "سياسة الخصوصية", url: "https://fashiongatemall.com/privacy/ar" }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <PrivacyClient lang="ar" initialData={initialData} />
    </>
  );
}
