import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CategoryRedirectPage({ params }: PageProps) {
  const { id } = await params;
  redirect(`/category/${id}/ar`);
}
