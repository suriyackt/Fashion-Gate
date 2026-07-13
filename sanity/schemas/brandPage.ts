import { defineField, defineType } from "sanity";
import { FileText } from "lucide-react";

export const brandPage = defineType({
  name: "brandPage",
  title: "Brand Page Settings",
  type: "document",
  icon: FileText,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brand",
      title: "Select Brand",
      type: "reference",
      to: [{ type: "brand" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bgImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "localizedString",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "localizedString",
    }),
    defineField({
      name: "buttonLink",
      title: "Button Redirect Link",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
      brandTitle: "brand.title",
      media: "bgImage",
    },
    prepare({ title, brandTitle, media }) {
      return {
        title: title || brandTitle || "Untitled Brand Page",
        subtitle: brandTitle ? `Brand: ${brandTitle}` : "No Brand Connected",
        media,
      };
    },
  },
});
