import AboutClient from "@/components/AboutClient";
import { getAboutPageData } from "@/lib/sanity";
import { buildMetadataFromSeo, buildOrganizationJsonLd, buildBreadcrumbsJsonLd } from "@/lib/seo";

export const revalidate = 0;

export async function generateMetadata() {
  try {
    const data = await getAboutPageData();
    return buildMetadataFromSeo({
      seoData: data?.seo,
      fallback: {
        title: "About Us | Fashion Gate Mall Syria",
        description: "Learn about Fashion Gate Mall Syria — Damascus Boulevard's premier luxury destination bringing global haute couture, curated beauty, and fine dining together.",
        keywords: ["About Fashion Gate", "Damascus Boulevard Showroom", "Luxury Syria", "Unlimited Group"]
      },
      lang: "en",
      pathname: "about/en"
    });
  } catch (e) {
    return buildMetadataFromSeo({
      fallback: {
        title: "About Us | Fashion Gate Mall Syria",
        description: "Learn about Fashion Gate Mall Syria."
      },
      lang: "en",
      pathname: "about/en"
    });
  }
}

export default async function AboutEnPage() {
  let initialData = null;
  try {
    initialData = await getAboutPageData();
  } catch (error) {
    console.error("Failed to load about page data from Sanity:", error);
  }

  const breadcrumbsJsonLd = buildBreadcrumbsJsonLd([
    { name: "Home", url: "https://fashiongatemall.com/en" },
    { name: "About Us", url: "https://fashiongatemall.com/about/en" }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <AboutClient initialLang="en" initialData={initialData} />
    </>
  );
}
