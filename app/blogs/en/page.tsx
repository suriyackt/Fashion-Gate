import BlogExperience from "@/components/BlogExperience";
import { getSanityBlogPosts, getBlogsPageSettings } from "@/lib/sanity";
import { buildMetadataFromSeo, buildBreadcrumbsJsonLd } from "@/lib/seo";

export const revalidate = 0;

export async function generateMetadata() {
  try {
    const settings = await getBlogsPageSettings();
    return buildMetadataFromSeo({
      seoData: settings?.seo,
      fallback: {
        title: "The Journal | Fashion Gate Mall Syria",
        description: "Fashion Gate Journal: elegant editorial stories, architectural vision, luxury design insights, and department store news from Damascus Boulevard.",
        keywords: ["Fashion Gate Blog", "Syria Luxury Journal", "Damascus Retail News", "Mouhajer International Design"]
      },
      lang: "en",
      pathname: "blogs/en"
    });
  } catch (e) {
    return buildMetadataFromSeo({
      fallback: {
        title: "The Journal | Fashion Gate Mall Syria",
        description: "Fashion Gate Journal: elegant editorial stories and luxury design insights."
      },
      lang: "en",
      pathname: "blogs/en"
    });
  }
}

export default async function BlogsPage() {
  const posts = await getSanityBlogPosts();
  const settings = await getBlogsPageSettings();

  const breadcrumbsJsonLd = buildBreadcrumbsJsonLd([
    { name: "Home", url: "https://fashiongatemall.com/en" },
    { name: "The Journal", url: "https://fashiongatemall.com/blogs/en" }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <BlogExperience initialPosts={posts} settings={settings} initialLang="en" />
    </>
  );
}
