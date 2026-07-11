import { defineType, defineField } from "sanity";

export const manifestoSection = defineType({
  name: "manifestoSection",
  title: "Manifesto Section",
  type: "object",
  fields: [
    defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
    defineField({ name: "anchor", title: "Anchor ID", type: "string", initialValue: "manifesto" }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "localizedString" }),
    defineField({ name: "headline", title: "Headline / Author", type: "localizedString" }),
    defineField({ name: "description", title: "Description", type: "localizedText" })
  ]
});
