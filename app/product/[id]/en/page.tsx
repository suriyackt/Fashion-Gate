import { getSanityProduct, getAllSanityProductSlugs } from "@/lib/sanity";
import ProductDetailClient from "@/components/ProductDetailClient";
import { notFound } from "next/navigation";

export const revalidate = 0;

export async function generateStaticParams() {
  return getAllSanityProductSlugs();
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getSanityProduct(id);
  
  if (!product) {
    notFound();
  }
  
  return <ProductDetailClient product={product} initialLang="en" />;
}
