import { defineField, defineType } from "sanity";
import { HelpCircle } from "lucide-react";

export default defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  icon: HelpCircle,
  fields: [
    defineField({
      name: "question",
      title: "Question (Bilingual)",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer (Bilingual)",
      type: "localizedText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 100,
      description: "Lower numbers appear first",
    }),
  ],
  preview: {
    select: {
      questionEn: "question.en",
      questionAr: "question.ar",
      order: "order",
    },
    prepare(selection) {
      const { questionEn, questionAr, order } = selection;
      return {
        title: `${questionEn || ""} / ${questionAr || ""}`,
        subtitle: `Order: ${order !== undefined ? order : 100}`,
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
