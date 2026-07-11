import { defineField, defineType } from "sanity";

export const announcement = defineType({
  name: "announcement",
  title: "Announcements",
  type: "document",
  fields: [
    defineField({ name: "text", title: "Text", type: "localizedString", validation: (Rule) => Rule.required() }),
    defineField({ name: "link", title: "Link Path (Optional)", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 })
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "text.en", subtitle: "link" }
  }
});
