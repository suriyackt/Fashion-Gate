import { defineType, defineField } from "sanity";
import { Award } from "lucide-react";

export default defineType({
  name: "brand",
  title: "Brand",
  type: "document",
  icon: Award,
  fields: [
    defineField({
      name: "title",
      title: "Brand Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    }),
    defineField({
      name: "image",
      title: "Brand Logo Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "size",
      title: "Logo Display Size",
      type: "string",
      options: {
        list: [
          { title: "Small", value: "small" },
          { title: "Medium", value: "medium" },
          { title: "Large", value: "large" },
        ],
      },
      initialValue: "medium",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});
