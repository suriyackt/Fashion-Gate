import RestaurantDetailClient from "@/components/RestaurantDetailClient";
import { getRestaurantPageData } from "@/lib/sanity";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const revalidate = 0;

interface PageProps {
  params: Promise<{
    restaurantId: string;
    lang: string;
  }>;
}

export default async function RestaurantPage({ params }: PageProps) {
  const { restaurantId, lang } = await params;

  if (lang !== "en" && lang !== "ar") {
    notFound();
  }

  if (restaurantId !== "vilamore" && restaurantId !== "arto-coffee") {
    notFound();
  }

  // Fetch from Sanity
  const sanityData = await getRestaurantPageData(restaurantId);

  return (
    <Suspense fallback={null}>
      <RestaurantDetailClient 
        restaurantId={restaurantId} 
        lang={lang as "en" | "ar"} 
        initialSanityData={sanityData}
      />
    </Suspense>
  );
}
