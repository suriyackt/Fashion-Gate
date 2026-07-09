import { getBrandById } from "@/lib/brandData";
import BrandDetailClient from "@/components/BrandDetailClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const paths: { lang: string; id: string }[] = [];
  const brands = ["chanel", "prada", "gucci", "dior", "ysl", "hermes", "adidas"];
  for (const lang of ["en", "ar"]) {
    for (const id of brands) {
      paths.push({ lang, id });
    }
  }
  return paths;
}

interface PageProps {
  params: Promise<{
    lang: string;
    id: string;
  }>;
}

export default async function BrandPage({ params }: PageProps) {
  const { lang, id } = await params;
  const brand = getBrandById(id);
  if (!brand) {
    notFound();
  }
  return <BrandDetailClient brand={brand} initialLang={lang as "en" | "ar"} />;
}
