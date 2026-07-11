import ContactClient from "@/components/ContactClient";
import { getContactPageData } from "@/lib/sanity";

export const revalidate = 60;

export default async function ContactArPage() {
  let initialData = null;
  try {
    initialData = await Promise.race([
      getContactPageData(),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 1500))
    ]);
  } catch (error) {
    console.error("Failed to load contact page data from Sanity:", error);
  }

  return <ContactClient initialLang="ar" initialData={initialData} />;
}
