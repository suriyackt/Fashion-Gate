import { defineType, defineField } from "sanity";

export const editorialSection = defineType({
  name: "editorialSection",
  title: "Editorial Section",
  type: "object",
  fields: [
    defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
    defineField({ name: "anchor", title: "Anchor ID", type: "string", initialValue: "brand" }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "localizedString" }),
    defineField({ name: "headline", title: "Headline", type: "localizedString" }),
    defineField({ name: "description", title: "Description", type: "localizedText" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } })
  ]
});
