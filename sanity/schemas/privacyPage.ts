import { defineType, defineField } from "sanity";
import { ShieldCheck } from "lucide-react";

export const privacyPage = defineType({
  name: "privacyPage",
  title: "Privacy Policy Page",
  type: "document",
  icon: ShieldCheck,
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "localizedString",
      initialValue: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
    }),
    defineField({
      name: "subtitle",
      title: "Page Subtitle",
      type: "localizedString",
    }),
    defineField({
      name: "introTitle",
      title: "Introduction Title",
      type: "localizedString",
    }),
    defineField({
      name: "introText1",
      title: "Introduction Paragraph 1",
      type: "localizedText",
    }),
    defineField({
      name: "introText2",
      title: "Introduction Paragraph 2",
      type: "localizedText",
    }),
    defineField({
      name: "sections",
      title: "Privacy Sections",
      type: "array",
      of: [
        {
          type: "object",
          name: "privacySection",
          title: "Privacy Section",
          fields: [
            { 
              name: "sectionId", 
              title: "Section ID (e.g. cookies, security)", 
              type: "string",
              description: "Anchor ID used for navigation. Do not use spaces or special characters."
            },
            { name: "title", title: "Section Title", type: "localizedString" },
            { name: "content", title: "Section Content", type: "localizedText" }
          ]
        }
      ]
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "seo",
    })
  ],
  preview: {
    prepare() {
      return {
        title: "Privacy Policy Settings"
      };
    }
  }
});
