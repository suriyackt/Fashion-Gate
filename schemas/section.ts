import { defineField, defineType } from "sanity";

export const section = defineType({
  name: "section",
  title: "Section",
  type: "document",
  fields: [
    defineField({ name: "title", title: "CMS Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "type",
      title: "Section Type",
      type: "string",
      options: {
        list: [
          { title: "Hero", value: "hero" },
          { title: "Manifesto", value: "manifesto" },
          { title: "Carousel", value: "carousel" },
          { title: "Collections", value: "collections" },
          { title: "Editorial", value: "editorial" },
          { title: "Lookbook", value: "lookbook" },
          { title: "Marquee", value: "marquee" }
        ]
      },
      initialValue: "editorial"
    }),
    defineField({ name: "anchor", title: "Anchor ID", type: "string" }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 5 }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
    defineField({ name: "ctaHref", title: "CTA Link", type: "string" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "video", title: "Video File", type: "file", options: { accept: "video/*" } }),
    defineField({
      name: "slides",
      title: "Carousel Slides",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
            defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
            defineField({ name: "video", title: "Video", type: "file", options: { accept: "video/*" } })
          ],
          preview: { select: { title: "title", media: "image" } }
        }
      ]
    }),
    defineField({
      name: "collections",
      title: "Collections",
      type: "array",
      of: [{ type: "reference", to: [{ type: "collection" }] }]
    }),
    defineField({
      name: "media",
      title: "Media Assets",
      type: "array",
      of: [{ type: "reference", to: [{ type: "mediaAsset" }] }]
    }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 })
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "type", media: "image" }
  }
});
