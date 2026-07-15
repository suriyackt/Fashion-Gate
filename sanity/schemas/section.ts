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
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
    
    // Localized and custom fields for Hero & modern sections
    defineField({ name: "eyebrowEn", title: "Eyebrow (English)", type: "string" }),
    defineField({ name: "eyebrowAr", title: "Eyebrow (Arabic)", type: "string" }),
    
    defineField({ name: "headlineEn", title: "Headline (English)", type: "string" }),
    defineField({ name: "headlineAr", title: "Headline (Arabic)", type: "string" }),
    
    defineField({ name: "descriptionEn", title: "Description (English)", type: "text", rows: 5 }),
    defineField({ name: "descriptionAr", title: "Description (Arabic)", type: "text", rows: 5 }),
    
    defineField({ name: "subHeadlineEnLine1", title: "Subheadline Line 1 (English)", type: "string" }),
    defineField({ name: "subHeadlineEnLine2", title: "Subheadline Line 2 (English)", type: "string" }),
    defineField({ name: "subHeadlineArLine1", title: "Subheadline Line 1 (Arabic)", type: "string" }),
    defineField({ name: "subHeadlineArLine2", title: "Subheadline Line 2 (Arabic)", type: "string" }),

    defineField({
      name: "bgType",
      title: "Background Type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" }
        ]
      },
      initialValue: "image"
    }),
    defineField({ name: "bgImage", title: "Background Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "bgVideo", title: "Background Video File", type: "file", options: { accept: "video/*" } }),
    defineField({
      name: "mobileBgPosition",
      title: "Mobile Background Position",
      description: "Custom alignment of background image in mobile viewport (e.g. '85% top', 'right center', 'center center')",
      type: "string",
      initialValue: "right top"
    }),

    defineField({
      name: "cta",
      title: "Call To Action",
      type: "object",
      fields: [
        defineField({ name: "labelEn", title: "Label (English)", type: "string" }),
        defineField({ name: "labelAr", title: "Label (Arabic)", type: "string" }),
        defineField({ name: "href", title: "Link Redirection Path", type: "string" }),
        defineField({
          name: "type",
          title: "Button Type",
          type: "string",
          options: {
            list: [
              { title: "Primary", value: "primary" },
              { title: "Secondary", value: "secondary" },
              { title: "Link", value: "link" }
            ]
          },
          initialValue: "primary"
        })
      ]
    }),

    // Legacy standard fields for backward compatibility
    defineField({ name: "eyebrow", title: "Legacy Eyebrow", type: "string" }),
    defineField({ name: "headline", title: "Legacy Headline", type: "string" }),
    defineField({ name: "description", title: "Legacy Description", type: "text", rows: 5 }),
    defineField({ name: "ctaLabel", title: "Legacy CTA Label", type: "string" }),
    defineField({ name: "ctaHref", title: "Legacy Legacy CTA Link", type: "string" }),
    defineField({ name: "image", title: "Legacy Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "video", title: "Legacy Video File", type: "file", options: { accept: "video/*" } }),
    
    defineField({
      name: "slides",
      title: "Carousel Slides",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "titleEn", title: "Title (English)", type: "string" }),
            defineField({ name: "titleAr", title: "Title (Arabic)", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
            defineField({ name: "descriptionEn", title: "Description (English)", type: "text", rows: 3 }),
            defineField({ name: "descriptionAr", title: "Description (Arabic)", type: "text", rows: 3 }),
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
    })
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "type", media: "image" }
  }
});
