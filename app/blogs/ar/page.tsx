import type { Metadata } from "next";
import BlogExperience from "@/components/BlogExperience";
import { getSanityBlogPosts, getBlogsPageSettings } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Blogs | Fashion Gate",
  description: "Fashion Gate Journal: elegant editorial stories, project notes, and luxury design insights."
};

export const revalidate = 0;

export default async function BlogsPage() {
  const posts = await getSanityBlogPosts();
  const settings = await getBlogsPageSettings();
  return <BlogExperience initialPosts={posts} settings={settings} initialLang="ar" />;
}
