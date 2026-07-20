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
        title: `${post.title} | Fashion Gate Journal`,
        description: post.excerpt || `${post.title} — Fashion Gate Mall Syria Journal editorial story.`,
        imageUrl: post.image,
        keywords: post.tags
      },
      lang: "en",
      pathname: `blogs/${slug}/en`
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
    title: post.title,
    excerpt: post.excerpt,
    image: post.image,
    publishedAt: post.publishedAt,
    authorName: post.author?.name,
    url: `https://fashiongatemall.com/blogs/${slug}/en`
  });

  const breadcrumbsJsonLd = buildBreadcrumbsJsonLd([
    { name: "Home", url: "https://fashiongatemall.com/en" },
    { name: "Journal", url: "https://fashiongatemall.com/blogs/en" },
    { name: post.title, url: `https://fashiongatemall.com/blogs/${slug}/en` }
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
      <BlogDetailClient post={post} initialLang="en" />
    </>
  );
}
