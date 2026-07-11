import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Site Title", type: "string", initialValue: "Fashion Gate" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "primaryColor", title: "Primary Color", type: "string", initialValue: "#CB6116" }),
    defineField({ name: "accentColor", title: "Accent Color", type: "string", initialValue: "#D06010" }),
    defineField({ name: "headingFont", title: "Heading Font", type: "string", initialValue: "Apple Garamond" }),
    defineField({ name: "bodyFont", title: "Body Font", type: "string", initialValue: "Cairo" }),
    defineField({
      name: "navigation",
      title: "Floating Menu",
      type: "array",
      of: [{ type: "reference", to: [{ type: "menuItem" }] }]
    }),
    defineField({ name: "socialLabel", title: "Social Label", type: "string" }),
    defineField({ name: "socialUrl", title: "Social URL", type: "url" })
  ],
  preview: {
    select: { title: "title", media: "logo" }
  }
});
