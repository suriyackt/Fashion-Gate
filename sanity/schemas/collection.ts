import { defineField, defineType } from "sanity";

export const collection = defineType({
  name: "collection",
  title: "Collection",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "titleEn", title: "Title (English)", type: "string" }),
    defineField({ name: "titleAr", title: "Title (Arabic)", type: "string" }),
    defineField({ name: "headline", title: "Legacy Headline", type: "string" }),
    defineField({ name: "headlineEn", title: "Headline (English)", type: "string" }),
    defineField({ name: "headlineAr", title: "Headline (Arabic)", type: "string" }),
    defineField({ name: "description", title: "Legacy Description", type: "text", rows: 4 }),
    defineField({ name: "descriptionEn", title: "Description (English)", type: "text", rows: 4 }),
    defineField({ name: "descriptionAr", title: "Description (Arabic)", type: "text", rows: 4 }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "media",
      title: "Media",
      type: "array",
      of: [{ type: "reference", to: [{ type: "mediaAsset" }] }]
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }]
    }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 })
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "headline", media: "coverImage" }
  }
});
