import { defineField, defineType } from "sanity";

export const mediaAsset = defineType({
  name: "mediaAsset",
  title: "Media Asset",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "video",
      title: "Video File",
      type: "file",
      options: { accept: "video/*" }
    }),
    defineField({ name: "externalVideoUrl", title: "External Video URL", type: "url" }),
    defineField({ name: "alt", title: "Alt Text", type: "string" }),
    defineField({ name: "caption", title: "Caption", type: "string" })
  ],
  preview: {
    select: { title: "title", subtitle: "caption", media: "image" }
  }
});
