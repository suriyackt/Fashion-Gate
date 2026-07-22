import CategoryDetailClient from "@/components/CategoryDetailClient";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { getAllSanityProducts } from "@/lib/sanity";

export const revalidate = 0;

export async function generateStaticParams() {
  const categories = ["women", "men", "perfumes", "skincare", "beauty", "makeup", "dining", "fashion", "designers"];
  return categories.map((id) => ({ id }));
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { id } = await params;
  if (id === "designers") {
    redirect("/brand/ar");
  }
  const categories = ["women", "men", "perfumes", "skincare", "beauty", "makeup", "dining", "fashion", "designers"];
  
  if (!categories.includes(id)) {
    notFound();
  }

  const productsList = await getAllSanityProducts();
  
  return (
    <Suspense fallback={null}>
      <CategoryDetailClient categoryId={id} initialLang="ar" initialProducts={productsList} />
    </Suspense>
  );
}
