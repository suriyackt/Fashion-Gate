import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    restaurantId: string;
  }>;
}

export default async function RestaurantRedirectPage({ params }: PageProps) {
  const { restaurantId } = await params;
  redirect(`/dining/${restaurantId}/ar`);
}
