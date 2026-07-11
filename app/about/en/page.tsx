import AboutClient from "@/components/AboutClient";
import { getAboutPageData } from "@/lib/sanity";

export const revalidate = 0;

export default async function AboutEnPage() {
  let initialData = null;
  try {
    initialData = await Promise.race([
      getAboutPageData(),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 1500))
    ]);
  } catch (error) {
    console.error("Failed to load about page data from Sanity:", error);
  }

  return <AboutClient initialLang="en" initialData={initialData} />;
}
