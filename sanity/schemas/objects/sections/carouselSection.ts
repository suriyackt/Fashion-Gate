import { defineType, defineField } from "sanity";

export const carouselSection = defineType({
  name: "carouselSection",
  title: "Carousel Section",
  type: "object",
  fields: [
    defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
    defineField({ name: "anchor", title: "Anchor ID", type: "string", initialValue: "editorial" }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "localizedString" }),
    defineField({ name: "headline", title: "Headline", type: "localizedString" }),
    defineField({ name: "description", title: "Description", type: "localizedText" }),
    defineField({
      name: "slides",
      title: "Carousel Slides",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "localizedString" }),
            defineField({ name: "description", title: "Description", type: "localizedText" }),
            defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
            defineField({ name: "video", title: "Video", type: "file", options: { accept: "video/*" } })
          ],
          preview: { select: { title: "title.en", media: "image" } }
        }
      ]
    })
  ]
});
