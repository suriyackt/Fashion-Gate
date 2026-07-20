import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO & Search Engine Settings",
  type: "object",
  options: {
    collapsible: true,
    collapsed: false
  },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      description: "Custom page title for search engines & social cards (Bilingual EN / AR)",
      type: "localizedString"
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      description: "Brief summary displayed in search engine results (Bilingual EN / AR)",
      type: "localizedText"
    }),
    defineField({
      name: "keywords",
      title: "Keywords / Tags",
      description: "Target search keywords for search engines",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags"
      }
    }),
    defineField({
      name: "ogImage",
      title: "Social Preview Image (OpenGraph / Twitter)",
      description: "Custom preview image when shared on WhatsApp, Facebook, LinkedIn, Twitter, etc.",
      type: "image",
      options: { hotspot: true }
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      description: "Optional custom canonical link (leave empty for automatic generation)",
      type: "url"
    }),
    defineField({
      name: "noIndex",
      title: "Hide from Search Engines (noindex)",
      description: "Enable this if you want search engines to skip indexing this page",
      type: "boolean",
      initialValue: false
    })
  ]
});
