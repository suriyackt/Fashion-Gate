import AboutClient from "@/components/AboutClient";
import { getAboutPageData } from "@/lib/sanity";

export const revalidate = 0;

export default async function AboutArPage() {
  let initialData = null;
  try {
    initialData = await getAboutPageData();
  } catch (error) {
    console.error("Failed to load about page data from Sanity:", error);
  }

  return <AboutClient initialLang="ar" initialData={initialData} />;
}
