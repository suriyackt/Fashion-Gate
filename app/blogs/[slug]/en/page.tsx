import { getSanityBlogPost, getAllSanityBlogPostSlugs } from "@/lib/sanity";
import BlogDetailClient from "@/components/BlogDetailClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getAllSanityBlogPostSlugs();
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getSanityBlogPost(slug);
  
  if (!post) {
    notFound();
  }
  
  return <BlogDetailClient post={post} initialLang="en" />;
}
