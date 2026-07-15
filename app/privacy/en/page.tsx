import PrivacyClient from "@/components/PrivacyClient";
import { getPrivacyPageData } from "@/lib/sanity";

export const revalidate = 60;

export default async function PrivacyEnPage() {
  let initialData = null;
  try {
    initialData = await Promise.race([
      getPrivacyPageData(),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 1500))
    ]);
  } catch (error) {
    console.error("Failed to load privacy data from Sanity:", error);
  }

  return <PrivacyClient lang="en" initialData={initialData} />;
}
