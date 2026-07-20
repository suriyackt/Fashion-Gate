import BrandListClient from "@/components/BrandListClient";
import { getSanityBrands } from "@/lib/sanity";
import { buildMetadataFromSeo, buildBreadcrumbsJsonLd } from "@/lib/seo";

export const revalidate = 0;

export async function generateMetadata() {
  return buildMetadataFromSeo({
    fallback: {
      title: "Designers & Luxury Brands | Fashion Gate Mall Syria",
      description: "Explore the international luxury brands directory at Fashion Gate Mall Syria, including Elie Saab, Gucci, MaxMara, Prada, Valentino, YSL, Cartier, and Lancôme.",
      keywords: ["Luxury Brands Syria", "Elie Saab Damascus", "Gucci Syria", "Prada Damascus", "Fashion Gate Designers"]
    },
    lang: "en",
    pathname: "brand/en"
  });
}

export default async function BrandEnPage() {
  let initialBrands: any[] = [];
  try {
    initialBrands = await Promise.race([
      getSanityBrands(),
      new Promise<any[]>((resolve) => setTimeout(() => resolve([]), 1500))
    ]) || [];
  } catch (error) {
    console.error("Failed to load brands from Sanity:", error);
  }

  const breadcrumbsJsonLd = buildBreadcrumbsJsonLd([
    { name: "Home", url: "https://fashiongatemall.com/en" },
    { name: "Designers", url: "https://fashiongatemall.com/brand/en" }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <BrandListClient initialBrands={initialBrands} initialLang="en" />
    </>
  );
}
