import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "price", title: "Price", type: "string" }),
    defineField({ name: "image", title: "Product Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }]
    }),
    defineField({ name: "badge", title: "Badge", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 })
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "subtitle", media: "image" }
  }
});
