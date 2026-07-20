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
    const title = brand?.title || localBrand?.name || id.toUpperCase();
    const desc = (typeof brand?.description === "string" ? brand?.description : brand?.description?.en) || localBrand?.description || `${title} luxury collection at Fashion Gate Mall Syria.`;
    return buildMetadataFromSeo({
      seoData: brand?.seo,
      fallback: {
        title: `${title} | Luxury Brand at Fashion Gate Mall`,
        description: desc,
        keywords: [title, `${title} Syria`, `${title} Damascus`, "Fashion Gate Brand"]
      },
      lang: "en",
      pathname: `brand/${id}/en`
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

  const brandName = brand.title || localBrand?.name || id.toUpperCase();
  const breadcrumbsJsonLd = buildBreadcrumbsJsonLd([
    { name: "Home", url: "https://fashiongatemall.com/en" },
    { name: "Designers", url: "https://fashiongatemall.com/brand/en" },
    { name: brandName, url: `https://fashiongatemall.com/brand/${id}/en` }
  ]);
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <BrandDetailClient brand={brand} initialLang="en" />
    </>
  );
}
