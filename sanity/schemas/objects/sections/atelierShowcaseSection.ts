import { defineType, defineField } from "sanity";

export const atelierShowcaseSection = defineType({
  name: "atelierShowcaseSection",
  title: "Atelier Showcase Section",
  type: "object",
  fields: [
    defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
    defineField({ name: "anchor", title: "Anchor ID", type: "string", initialValue: "atelier" }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "localizedString" }),
    defineField({ name: "headline", title: "Headline", type: "localizedString" }),
    defineField({ name: "description", title: "Description", type: "localizedText" }),
    defineField({
      name: "leftCard",
      title: "Left Card",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Card Eyebrow", type: "localizedString" }),
        defineField({ name: "title", title: "Card Title", type: "localizedString" }),
        defineField({ name: "description", title: "Card Description", type: "localizedText" }),
        defineField({ name: "image", title: "Card Image", type: "image", options: { hotspot: true } })
      ]
    }),
    defineField({
      name: "rightCard",
      title: "Right Card",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Card Eyebrow", type: "localizedString" }),
        defineField({ name: "title", title: "Card Title", type: "localizedString" }),
        defineField({ name: "description", title: "Card Description", type: "localizedText" }),
        defineField({ name: "image", title: "Card Image", type: "image", options: { hotspot: true } })
      ]
    })
  ]
});
