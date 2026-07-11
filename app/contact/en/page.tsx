import ContactClient from "@/components/ContactClient";
import { getContactPageData } from "@/lib/sanity";

export const revalidate = 0;

export default async function ContactEnPage() {
  let initialData = null;
  try {
    initialData = await Promise.race([
      getContactPageData(),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 1500))
    ]);
  } catch (error) {
    console.error("Failed to load contact page data from Sanity:", error);
  }

  return <ContactClient initialLang="en" initialData={initialData} />;
}
