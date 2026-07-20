import { defineType, defineField } from "sanity";
import { Scale } from "lucide-react";

export const termsPage = defineType({
  name: "termsPage",
  title: "Terms Page",
  type: "document",
  icon: Scale,
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "localizedString",
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
      title: "Terms Sections",
      type: "array",
      of: [
        {
          type: "object",
          name: "termsSection",
          title: "Terms Section",
          fields: [
            { 
              name: "sectionId", 
              title: "Section ID (e.g. general, online-store)", 
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
        title: "Terms & Conditions Settings"
      };
    }
  }
});
