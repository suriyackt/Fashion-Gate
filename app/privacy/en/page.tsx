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
        title: "Privacy Policy | Fashion Gate Mall Syria",
        description: "Read our Privacy Policy to understand how Fashion Gate Mall protects your personal information, concierge requests, and privacy rights.",
        keywords: ["Fashion Gate Privacy", "Damascus Boulevard Privacy", "Data Protection Syria"]
      },
      lang: "en",
      pathname: "privacy/en"
    });
  } catch (e) {
    return buildMetadataFromSeo({
      fallback: {
        title: "Privacy Policy | Fashion Gate Mall Syria",
        description: "Read the Privacy Policy at Fashion Gate Mall Syria."
      },
      lang: "en",
      pathname: "privacy/en"
    });
  }
}

export default async function PrivacyEnPage() {
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
    { name: "Home", url: "https://fashiongatemall.com/en" },
    { name: "Privacy Policy", url: "https://fashiongatemall.com/privacy/en" }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <PrivacyClient lang="en" initialData={initialData} />
    </>
  );
}
