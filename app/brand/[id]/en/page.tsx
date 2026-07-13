import { getBrandById, getAllBrands } from "@/lib/brandData";
import BrandDetailClient from "@/components/BrandDetailClient";
import { getSanityBrand } from "@/lib/sanity";
import { notFound } from "next/navigation";

export const revalidate = 0;

export async function generateStaticParams() {
  return getAllBrands().map((brand) => ({ id: brand.id }));
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
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
  
  return <BrandDetailClient brand={brand} initialLang="en" />;
}

