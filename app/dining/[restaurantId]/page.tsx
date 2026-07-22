import { redirect } from "next/navigation";
import { headers } from "next/headers";

interface PageProps {
  params: Promise<{
    restaurantId: string;
  }>;
}

export default async function RestaurantRedirectPage({ params }: PageProps) {
  const { restaurantId } = await params;
  
  const headersList = await headers();
  const referer = headersList.get("referer") || "";
  const isEnReferer = referer.includes("/en") || referer.endsWith("/en");
  
  const targetLang = isEnReferer ? "en" : "ar";
  
  redirect(`/dining/${restaurantId}/${targetLang}`);
}
