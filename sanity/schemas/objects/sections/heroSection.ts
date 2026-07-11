import { defineType, defineField } from "sanity";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  fields: [
    defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
    defineField({ name: "anchor", title: "Anchor ID", type: "string", initialValue: "arrival" }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "localizedString" }),
    defineField({ name: "headline", title: "Headline", type: "localizedString" }),
    defineField({ name: "subHeadlineLine1", title: "Subheadline Line 1", type: "localizedString" }),
    defineField({ name: "subHeadlineLine2", title: "Subheadline Line 2", type: "localizedString" }),
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
      name: "cta",
      title: "Call To Action",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "localizedString" }),
        defineField({
          name: "linkType",
          title: "Link Type",
          type: "string",
          options: {
            list: [
              { title: "Select Internal Page", value: "internal" },
              { title: "Custom URL Link (External/Anchor)", value: "external" }
            ]
          },
          initialValue: "internal"
        }),
        defineField({
          name: "internalLink",
          title: "Select Page",
          type: "string",
          options: {
            list: [
              { title: "Homepage", value: "/" },
              { title: "About Us", value: "/about" },
              { title: "Contact Us", value: "/contact" },
              { title: "Men Page", value: "/category/men" },
              { title: "Women Page", value: "/category/women" },
              { title: "Designers Page", value: "/designers" },
              { title: "Perfumes Page", value: "/category/perfumes" },
              { title: "Skincare Page", value: "/category/skincare" },
              { title: "Dining Page", value: "/dining" },
              { title: "Login Page", value: "/login" },
              { title: "Sign Up Page", value: "/signup" }
            ]
          },
          hidden: ({ parent }) => parent?.linkType !== "internal"
        }),
        defineField({
          name: "externalLink",
          title: "URL / Anchor Link",
          type: "string",
          description: "e.g., https://google.com or #manifesto",
          hidden: ({ parent }) => parent?.linkType === "internal"
        }),
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
    })
  ]
});
