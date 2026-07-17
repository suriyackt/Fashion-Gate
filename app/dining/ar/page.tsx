import CategoryDetailClient from "@/components/CategoryDetailClient";
import { getAllSanityProducts } from "@/lib/sanity";

export const revalidate = 0;

export default async function DiningArPage() {
  const productsList = await getAllSanityProducts();
  return <CategoryDetailClient categoryId="dining" initialLang="ar" initialProducts={productsList} />;
}
