import { getBrandById, getAllBrands } from "@/lib/brandData";
import BrandDetailClient from "@/components/BrandDetailClient";
import { getSanityBrand } from "@/lib/sanity";
import { notFound } from "next/navigation";
import { buildMetadataFromSeo, buildBreadcrumbsJsonLd } from "@/lib/seo";

export const revalidate = 0;

export async function generateStaticParams() {
  return getAllBrands().map((brand) => ({ id: brand.id }));
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const localBrand = getBrandById(id);
  try {
    const brand = await getSanityBrand(id);
    const title = brand?.titleAr || brand?.title || localBrand?.nameAr || localBrand?.name || id.toUpperCase();
    const desc = (typeof brand?.description === "string" ? brand?.description : brand?.description?.ar || brand?.description?.en) || localBrand?.descriptionAr || localBrand?.description || `تشكيلة ${title} الفاخرة في فاشن غيت مول دمشق.`;
    return buildMetadataFromSeo({
      seoData: brand?.seo,
      fallback: {
        title: `${title} | دار الأزياء الفاخرة في فاشن غيت`,
        description: desc,
        keywords: [title, `${title} دمشق`, `${title} سوريا`, "دار أزياء فاشن غيت"]
      },
      lang: "ar",
      pathname: `brand/${id}/ar`
    });
  } catch (e) {
    return {};
  }
}

export default async function BrandPage({ params }: PageProps) {
  const { id } = await params;
  const localBrand = getBrandById(id);
  
  let brand = null;
  try {
    brand = await getSanityBrand(id);
  } catch (err) {
    console.error("Failed to fetch brand from Sanity:", err);
  }
  
  if (brand) {
    brand = {
      ...brand,
      id: localBrand?.id || id,
      backdropUrl: localBrand?.backdropUrl
    };
  } else if (localBrand) {
    brand = {
      id: localBrand.id,
      title: localBrand.name,
      slug: { current: localBrand.id },
      headline: { en: localBrand.headline, ar: localBrand.headlineAr },
      description: { en: localBrand.description, ar: localBrand.descriptionAr },
      backdropUrl: localBrand.backdropUrl
    };
  } else {
    notFound();
  }

  const brandName = brand.titleAr || brand.title || localBrand?.nameAr || localBrand?.name || id.toUpperCase();
  const breadcrumbsJsonLd = buildBreadcrumbsJsonLd([
    { name: "الرئيسية", url: "https://fashiongatemall.com/ar" },
    { name: "المصممون", url: "https://fashiongatemall.com/brand/ar" },
    { name: brandName, url: `https://fashiongatemall.com/brand/${id}/ar` }
  ]);
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <BrandDetailClient brand={brand} initialLang="ar" />
    </>
  );
}

