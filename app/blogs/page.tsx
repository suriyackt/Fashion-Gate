import type { Metadata } from "next";
import BlogExperience from "@/components/BlogExperience";

export const metadata: Metadata = {
  title: "Blogs | Fashion Gate",
  description: "Fashion Gate Journal: elegant editorial stories, project notes, and luxury design insights."
};

export default function BlogsPage() {
  return <BlogExperience />;
}
