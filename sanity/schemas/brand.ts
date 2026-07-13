import { defineType, defineField } from "sanity";
import { Award } from "lucide-react";

export default defineType({
  name: "brand",
  title: "Brand",
  type: "document",
  icon: Award,
  fields: [
    defineField({
      name: "isActive",
      title: "Is Active / Show in UI",
      type: "boolean",
      description: "If enabled, this brand will be shown in the UI. If disabled, it will be hidden.",
      initialValue: true,
    }),
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
      name: "bgImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});
