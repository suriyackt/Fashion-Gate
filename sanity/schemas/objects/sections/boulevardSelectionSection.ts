import { defineType, defineField } from "sanity";

export const boulevardSelectionSection = defineType({
  name: "boulevardSelectionSection",
  title: "Boulevard Selection Section",
  type: "object",
  fields: [
    defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
    defineField({ name: "anchor", title: "Anchor ID", type: "string", initialValue: "boulevard" }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "localizedString" }),
    defineField({ name: "headline", title: "Headline", type: "localizedString" }),
    defineField({ name: "description", title: "Description", type: "localizedText" })
  ]
});
