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
        title: "مجلة فاشن غيت | كتالوج المقالات والأخبار",
        description: "مجلة فاشن غيت دمشق: مقالات تحريرية فاخرة، رؤى معمارية، وأحدث أخبار قطاع التجزئة والافتتاح الكبير في بوليفارد دمشق.",
        keywords: ["مجلة فاشن غيت", "أخبار الفخامة سوريا", "مهاجر الدولية للتصميم", "مول دمشق"]
      },
      lang: "ar",
      pathname: "blogs/ar"
    });
  } catch (e) {
    return buildMetadataFromSeo({
      fallback: {
        title: "مجلة فاشن غيت | كتالوج المقالات والأخبار",
        description: "مجلة فاشن غيت دمشق: مقالات تحريرية فاخرة ورؤى معمارية."
      },
      lang: "ar",
      pathname: "blogs/ar"
    });
  }
}

export default async function BlogsPage() {
  const posts = await getSanityBlogPosts();
  const settings = await getBlogsPageSettings();

  const breadcrumbsJsonLd = buildBreadcrumbsJsonLd([
    { name: "الرئيسية", url: "https://fashiongatemall.com/ar" },
    { name: "المجلة", url: "https://fashiongatemall.com/blogs/ar" }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <BlogExperience initialPosts={posts} settings={settings} initialLang="ar" />
    </>
  );
}
