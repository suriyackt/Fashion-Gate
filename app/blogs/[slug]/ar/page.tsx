import { getSanityBlogPost, getAllSanityBlogPostSlugs } from "@/lib/sanity";
import BlogDetailClient from "@/components/BlogDetailClient";
import { notFound } from "next/navigation";
import { buildMetadataFromSeo, buildBlogPostJsonLd, buildBreadcrumbsJsonLd } from "@/lib/seo";

export const revalidate = 0;

export async function generateStaticParams() {
  return getAllSanityBlogPostSlugs();
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const post = await getSanityBlogPost(slug);
    if (!post) return {};
    return buildMetadataFromSeo({
      seoData: post.seo,
      fallback: {
        title: `${post.titleAr || post.title} | مجلة فاشن غيت`,
        description: post.excerptAr || post.excerpt || `${post.titleAr || post.title} — مقال تحريري من مجلة فاشن غيت دمشق.`,
        imageUrl: post.image,
        keywords: post.tags
      },
      lang: "ar",
      pathname: `blogs/${slug}/ar`
    });
  } catch (e) {
    return {};
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getSanityBlogPost(slug);
  
  if (!post) {
    notFound();
  }

  const blogPostJsonLd = buildBlogPostJsonLd({
    title: post.titleAr || post.title,
    excerpt: post.excerptAr || post.excerpt,
    image: post.image,
    publishedAt: post.publishedAt,
    authorName: post.author?.name,
    url: `https://fashiongatemall.com/blogs/${slug}/ar`
  });

  const breadcrumbsJsonLd = buildBreadcrumbsJsonLd([
    { name: "الرئيسية", url: "https://fashiongatemall.com/ar" },
    { name: "المجلة", url: "https://fashiongatemall.com/blogs/ar" },
    { name: post.titleAr || post.title, url: `https://fashiongatemall.com/blogs/${slug}/ar` }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <BlogDetailClient post={post} initialLang="ar" />
    </>
  );
}
