import { defineField, defineType } from "sanity";
import { BookOpen } from "lucide-react";

export const blogsPage = defineType({
  name: "blogsPage",
  title: "Blogs Page Settings",
  type: "document",
  icon: BookOpen,
  fields: [
    defineField({ name: "title", title: "Title", type: "string", initialValue: "Blogs Page Settings" }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "localizedString" }),
    defineField({ name: "headline", title: "Headline", type: "localizedString" }),
    defineField({ name: "description", title: "Description", type: "localizedText" }),
    defineField({ name: "stat1", title: "Stat 1", type: "localizedString" }),
    defineField({ name: "stat2", title: "Stat 2", type: "localizedString" }),
    defineField({ name: "stat3", title: "Stat 3", type: "localizedString" })
  ]
});
