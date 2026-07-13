import AuthClient from "@/components/AuthClient";
import { getLoginPageData } from "@/lib/sanity";

export const revalidate = 0;

export default async function LoginPage() {
  let sanityData = null;
  try {
    sanityData = await getLoginPageData();
  } catch (err) {
    console.error("Failed to load login page data:", err);
  }

  return <AuthClient initialLang="en" sanityData={sanityData} />;
}

