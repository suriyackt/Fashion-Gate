import ContactClient from "@/components/ContactClient";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function ContactPage({ params }: PageProps) {
  const { lang } = await params;
  return <ContactClient initialLang={lang as "en" | "ar"} />;
}
