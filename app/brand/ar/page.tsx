import BrandListClient from "@/components/BrandListClient";
import { getSanityBrands } from "@/lib/sanity";
import { buildMetadataFromSeo, buildBreadcrumbsJsonLd } from "@/lib/seo";

export const revalidate = 0;

export async function generateMetadata() {
  return buildMetadataFromSeo({
    fallback: {
      title: "دليل دور الفخامة والمصممين | فاشن غيت مول دمشق",
      description: "استكشف دليل العلامات التجارية العالمية الفاخرة في فاشن غيت مول دمشق، وتصفح مجموعات إيلي صعب، غوتشي، ماكس مارا، برادا، فالنتينو، وسان لوران.",
      keywords: ["المصممون فاشن غيت", "إيلي صعب دمشق", "غوتشي سوريا", "برادا دمشق", "ماركات فاخرة سوريا"]
    },
    lang: "ar",
    pathname: "brand/ar"
  });
}

export default async function BrandArPage() {
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
    { name: "الرئيسية", url: "https://fashiongatemall.com/ar" },
    { name: "المصممون", url: "https://fashiongatemall.com/brand/ar" }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <BrandListClient initialBrands={initialBrands} initialLang="ar" />
    </>
  );
}
