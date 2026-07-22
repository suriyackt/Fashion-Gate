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
        title: "Contact Client Services | Fashion Gate Mall Syria",
        description: "Get in touch with Fashion Gate client services for private viewings, concierge assistance, and inquiries at Damascus Boulevard.",
        keywords: ["Contact Fashion Gate", "Fashion Gate Concierge", "Damascus Boulevard Contact", "Private Fitting Syria"]
      },
      lang: "en",
      pathname: "contact/en"
    });
  } catch (e) {
    return buildMetadataFromSeo({
      fallback: {
        title: "Contact Client Services | Fashion Gate Mall Syria",
        description: "Get in touch with Fashion Gate client services."
      },
      lang: "en",
      pathname: "contact/en"
    });
  }
}

export default async function ContactEnPage() {
  let initialData = null;
  try {
    initialData = await getContactPageData();
  } catch (error) {
    console.error("Failed to load contact page data from Sanity:", error);
  }

  const breadcrumbsJsonLd = buildBreadcrumbsJsonLd([
    { name: "Home", url: "https://fashiongatemall.com/en" },
    { name: "Contact Us", url: "https://fashiongatemall.com/contact/en" }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <ContactClient initialLang="en" initialData={initialData} />
    </>
  );
}
