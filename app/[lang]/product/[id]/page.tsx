import { products, getProductById } from "@/lib/productData";
import ProductDetailClient from "@/components/ProductDetailClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const paths: { lang: string; id: string }[] = [];
  for (const lang of ["en", "ar"]) {
    for (const p of products) {
      paths.push({ lang, id: p.id });
    }
  }
  return paths;
}

interface PageProps {
  params: Promise<{
    lang: string;
    id: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { lang, id } = await params;
  const product = getProductById(id);
  if (!product) {
    notFound();
  }
  return <ProductDetailClient product={product} initialLang={lang as "en" | "ar"} />;
}
