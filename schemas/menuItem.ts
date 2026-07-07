import { defineField, defineType } from "sanity";

export const menuItem = defineType({
  name: "menuItem",
  title: "Menu Item",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "anchor", title: "Section Anchor", type: "string", description: "Example: #collections" }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 })
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "label", subtitle: "anchor" }
  }
});
