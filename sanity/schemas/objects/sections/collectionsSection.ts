import { defineType, defineField } from "sanity";

export const collectionsSection = defineType({
  name: "collectionsSection",
  title: "Collections Section",
  type: "object",
  fields: [
    defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
    defineField({ name: "anchor", title: "Anchor ID", type: "string", initialValue: "collections" }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "localizedString" }),
    defineField({ name: "headline", title: "Headline", type: "localizedString" }),
    defineField({ name: "description", title: "Description", type: "localizedText" }),
    defineField({
      name: "collections",
      title: "Collections List",
      type: "array",
      of: [
        { type: "reference", to: [{ type: "collection" }] },
        {
          name: "inlineCollection",
          title: "Inline Department / Collection",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "localizedString" }),
            defineField({ name: "headline", title: "Headline", type: "localizedString" }),
            defineField({ name: "description", title: "Description", type: "localizedText" }),
            defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } })
          ],
          preview: {
            select: {
              title: "title.en",
              subtitle: "headline.en",
              media: "coverImage"
            }
          }
        }
      ]
    })
  ]
});
