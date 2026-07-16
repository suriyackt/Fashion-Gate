import BrandListClient from "@/components/BrandListClient";
import { getSanityBrands } from "@/lib/sanity";

export const revalidate = 0;

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

  return <BrandListClient initialBrands={initialBrands} initialLang="ar" />;
}
