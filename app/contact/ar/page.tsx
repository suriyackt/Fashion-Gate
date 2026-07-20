import ContactClient from "@/components/ContactClient";
import { getContactPageData } from "@/lib/sanity";
import { buildMetadataFromSeo, buildBreadcrumbsJsonLd } from "@/lib/seo";

export const revalidate = 0;

export async function generateMetadata() {
  try {
    const data = await getContactPageData();
    return buildMetadataFromSeo({
      seoData: data?.seo,
      fallback: {
        title: "اتصل بخدمات العملاء | فاشن غيت مول دمشق",
        description: "تواصل مع خدمات الكونسيرج الخاصة وخدمات العملاء في فاشن غيت مول دمشق لحجز المعاينات الخاصة واستفسارات بوليفارد دمشق.",
        keywords: ["اتصل فاشن غيت", "كونسيرج فاشن غيت", "موقع بوليفارد دمشق", "استفسارات الفخامة"]
      },
      lang: "ar",
      pathname: "contact/ar"
    });
  } catch (e) {
    return buildMetadataFromSeo({
      fallback: {
        title: "اتصل بخدمات العملاء | فاشن غيت مول دمشق",
        description: "تواصل مع خدمات العملاء في فاشن غيت مول دمشق."
      },
      lang: "ar",
      pathname: "contact/ar"
    });
  }
}

export default async function ContactArPage() {
  let initialData = null;
  try {
    initialData = await Promise.race([
      getContactPageData(),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 1500))
    ]);
  } catch (error) {
    console.error("Failed to load contact page data from Sanity:", error);
  }

  const breadcrumbsJsonLd = buildBreadcrumbsJsonLd([
    { name: "الرئيسية", url: "https://fashiongatemall.com/ar" },
    { name: "اتصل بنا", url: "https://fashiongatemall.com/contact/ar" }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <ContactClient initialLang="ar" initialData={initialData} />
    </>
  );
}
