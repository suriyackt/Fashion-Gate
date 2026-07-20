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
        title: "Terms & Conditions | Fashion Gate Mall Syria",
        description: "Review the Terms and Conditions governing your visit, purchases, and services at Fashion Gate Mall Syria.",
        keywords: ["Fashion Gate Terms", "Damascus Boulevard Terms", "Fashion Gate Legal"]
      },
      lang: "en",
      pathname: "terms/en"
    });
  } catch (e) {
    return buildMetadataFromSeo({
      fallback: {
        title: "Terms & Conditions | Fashion Gate Mall Syria",
        description: "Review the Terms and Conditions at Fashion Gate Mall Syria."
      },
      lang: "en",
      pathname: "terms/en"
    });
  }
}

export default async function TermsEnPage() {
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
    { name: "Home", url: "https://fashiongatemall.com/en" },
    { name: "Terms & Conditions", url: "https://fashiongatemall.com/terms/en" }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <TermsClient lang="en" initialData={initialData} />
    </>
  );
}
