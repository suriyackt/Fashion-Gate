import TermsClient from "@/components/TermsClient";
import { getTermsPageData } from "@/lib/sanity";

export const revalidate = 60;

export default async function TermsArPage() {
  let initialData = null;
  try {
    initialData = await Promise.race([
      getTermsPageData(),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 1500))
    ]);
  } catch (error) {
    console.error("Failed to load terms data from Sanity:", error);
  }

  return <TermsClient lang="ar" initialData={initialData} />;
}
