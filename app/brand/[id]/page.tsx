import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BrandRedirectPage({ params }: PageProps) {
  const { id } = await params;
  redirect(`/brand/${id}/ar`);
}
