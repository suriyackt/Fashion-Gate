import { getBrandById, getAllBrands } from "@/lib/brandData";
import BrandDetailClient from "@/components/BrandDetailClient";
import { notFound } from "next/navigation";

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
  const brand = getBrandById(id);
  
  if (!brand) {
    notFound();
  }
  
  return <BrandDetailClient brand={brand} initialLang="en" />;
}
