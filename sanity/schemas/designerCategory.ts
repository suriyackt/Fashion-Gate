import { defineField, defineType } from "sanity";
import { Tags } from "lucide-react";

export const designerCategory = defineType({
  name: "designerCategory",
  title: "Designer Categories",
  type: "document",
  icon: Tags,
  fields: [
    defineField({
      name: "title",
      title: "Category Title (Bilingual)",
      type: "localizedString",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "brands",
      title: "Assigned Brands",
      type: "array",
      of: [{ type: "reference", to: [{ type: "brand" }] }],
      description: "Select which brands belong to this category."
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
      description: "Controls the ordering sequence of categories in the designers mega menu."
    })
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }]
    }
  ],
  preview: {
    select: {
      titleEn: "title.en",
      titleAr: "title.ar",
      order: "order"
    },
    prepare(selection) {
      const { titleEn, titleAr, order } = selection;
      return {
        title: `${titleEn || ""} / ${titleAr || ""}`,
        subtitle: `Order: ${order !== undefined ? order : 0}`
      };
    }
  }
});
