import { defineType, defineField } from "sanity";
import { Star } from "lucide-react";

export const brandMarqueeSection = defineType({
  name: "brandMarqueeSection",
  title: "Brand Marquee Section",
  type: "object",
  icon: Star,
  fields: [
    defineField({
      name: "enabled",
      title: "Enabled",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "anchor",
      title: "Anchor ID",
      type: "string",
      initialValue: "brand",
    }),
    defineField({
      name: "title",
      title: "CMS Section Title (internal)",
      type: "string",
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "localizedString",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "localizedString",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
    }),
    defineField({
      name: "brands",
      title: "Brands to Display",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "brand" }],
        },
      ],
    }),
  ],
  initialValue: {
    enabled: true,
    anchor: "brand",
    title: "Brands Marquee",
    eyebrow: { en: "Refined Ateliers", ar: "دور التصميم الراقية" },
    headline: { en: "Joined Luxury Houses", ar: "دور الفخامة المنضمة" },
    description: {
      en: "Fashion Gate is proud to partner with the world's most prestigious design houses, bringing exclusive seasonal edits directly to Damascus.",
      ar: "تفخر بوابة الأزياء بالشراكة مع أرقى دور التصميم في العالم، حيث تقدم مجموعات حصرية مباشرة لدمشق."
    }
  },
  preview: {
    select: {
      enabled: "enabled",
      title: "title",
    },
    prepare({ enabled, title }) {
      return {
        title: "Brand Marquee Section",
        subtitle: enabled ? title || "Enabled" : "Disabled",
      };
    },
  },
});
