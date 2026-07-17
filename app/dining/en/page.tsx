import CategoryDetailClient from "@/components/CategoryDetailClient";
import { getAllSanityProducts } from "@/lib/sanity";

export const revalidate = 0;

export default async function DiningEnPage() {
  const productsList = await getAllSanityProducts();
  return <CategoryDetailClient categoryId="dining" initialLang="en" initialProducts={productsList} />;
}
