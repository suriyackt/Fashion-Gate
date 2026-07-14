import { defineType, defineField } from "sanity";

export const boulevardSelectionSection = defineType({
  name: "boulevardSelectionSection",
  title: "Boulevard Selection Section",
  type: "object",
  fields: [
    defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
    defineField({ name: "anchor", title: "Anchor ID", type: "string", initialValue: "boulevard" }),
    defineField({ name: "quote", title: "Quote", type: "localizedString" }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "localizedString" }),
    defineField({ name: "headline", title: "Headline", type: "localizedString" }),
    defineField({ name: "description", title: "Description", type: "localizedText" }),
    defineField({
      name: "image",
      title: "Signature Image / Logo",
      type: "image",
      description: "Upload the signature image or carrier bag logo display.",
      options: { hotspot: true }
    })
  ]
});
