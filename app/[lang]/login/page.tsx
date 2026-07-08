import AuthClient from "@/components/AuthClient";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function LoginPage({ params }: PageProps) {
  const { lang } = await params;
  return <AuthClient initialLang={lang as "en" | "ar"} />;
}
