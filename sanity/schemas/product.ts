import { defineField, defineType } from "sanity";
import { ShoppingBag } from "lucide-react";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: ShoppingBag,
  fields: [
    defineField({ name: "name", title: "Name", type: "localizedString", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name.en" } }),
    defineField({ name: "subtitle", title: "Subtitle", type: "localizedString" }),
    defineField({ name: "description", title: "Description", type: "localizedText" }),
    defineField({ name: "price", title: "Price", type: "string" }),
    defineField({ name: "image", title: "Product Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }]
    }),
    defineField({ name: "badge", title: "Badge", type: "localizedString" }),
    defineField({
      name: "detailsList",
      title: "Details List",
      type: "array",
      of: [{ type: "localizedString" }]
    }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),

    // Connections
    defineField({
      name: "brand",
      title: "Brand",
      type: "reference",
      to: [{ type: "brand" }]
    }),
    defineField({
      name: "category",
      title: "Category / Collection",
      type: "reference",
      to: [{ type: "collection" }]
    }),
    defineField({
      name: "blogPosts",
      title: "Related Blog Posts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "post" }] }]
    }),
    defineField({
      name: "testimonials",
      title: "Related Testimonials",
      type: "array",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }]
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "seo"
    })
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name.en", subtitle: "subtitle.en", media: "image" }
  }
});
