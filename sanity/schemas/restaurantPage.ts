import { defineType, defineField } from "sanity";
import { Utensils } from "lucide-react";

export const restaurantPage = defineType({
  name: "restaurantPage",
  title: "Restaurant & Cafe Page",
  type: "document",
  icon: Utensils,
  fields: [
    defineField({
      name: "restaurantId",
      title: "Restaurant ID",
      type: "string",
      description: 'Must match the route name exactly (e.g. "vilamore" or "arto-coffee")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Document Title",
      type: "string",
      description: "For internal admin organization (e.g. 'Vilamore Damascus')",
    }),

    // --- 0. HEADER SECTION ---
    defineField({
      name: "headerLogo",
      title: "Header Logo",
      type: "image",
      description: "Upload the custom logo PNG for this restaurant.",
      options: { hotspot: true },
    }),
    defineField({
      name: "headerLinks",
      title: "Header Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "navLink",
          fields: [
            { name: "title", title: "Link Title", type: "localizedString" },
            { 
              name: "linkType", 
              title: "Link Type", 
              type: "string", 
              options: {
                list: [
                  { title: "Scroll to Section ID", value: "anchor" },
                  { title: "URL Path (e.g. /en)", value: "url" }
                ],
                layout: "radio"
              },
              initialValue: "anchor"
            },
            { name: "anchorSection", title: "Anchor Section (e.g. hero, about, menu, gallery, location)", type: "string" },
            { name: "urlPath", title: "URL Path (if link type is URL)", type: "string" }
          ]
        }
      ]
    }),

    // --- 1. HERO SECTION ---
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "localizedString",
    }),
    defineField({
      name: "heroSub",
      title: "Hero Subtitle",
      type: "localizedString",
    }),
    defineField({
      name: "heroQuote",
      title: "Hero Quote",
      type: "localizedString",
    }),
    defineField({
      name: "heroBgType",
      title: "Hero Background Type",
      type: "string",
      options: {
        list: [
          { title: "Static Image", value: "image" },
          { title: "Video Background", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "image",
    }),
    defineField({
      name: "heroBgImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroBgVideoUrl",
      title: "Hero Background Video URL",
      type: "string",
      description: "Direct URL to video file (.mp4/etc.) or a streaming link (YouTube/Vimeo).",
    }),

    // --- 2. ABOUT / PHILOSOPHY SECTION ---
    defineField({
      name: "aboutTitle",
      title: "About Title",
      type: "localizedString",
    }),
    defineField({
      name: "aboutSubtitle",
      title: "About Subtitle",
      type: "localizedString",
    }),
    defineField({
      name: "aboutQuote",
      title: "About Quote",
      type: "localizedString",
    }),
    defineField({
      name: "aboutDesc",
      title: "About Description",
      type: "localizedText",
    }),
    defineField({
      name: "aboutImages",
      title: "About Collage Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Upload up to 3 images to show in the floating photo collage",
    }),

    // --- 3. ALTERNATING FEATURES / PANELS ---
    defineField({
      name: "panels",
      title: "Highlight Panels",
      type: "array",
      of: [
        {
          type: "object",
          name: "panel",
          fields: [
            { name: "label", title: "Label / Category", type: "localizedString" },
            { name: "title", title: "Panel Title", type: "localizedString" },
            { name: "desc", title: "Panel Description", type: "localizedText" },
            { name: "btnText", title: "Button Text", type: "localizedString" },
            { name: "image", title: "Panel Image", type: "image", options: { hotspot: true } },
          ],
        },
      ],
    }),

    // --- 4. TASTING MENU SECTION ---
    defineField({
      name: "menuHeader",
      title: "Menu Section Header",
      type: "localizedString",
    }),
    defineField({
      name: "menuTabs",
      title: "Menu Category Tabs",
      type: "array",
      of: [{ type: "localizedString" }],
    }),
    defineField({
      name: "menus",
      title: "Menu Dishes / Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "menuItem",
          fields: [
            {
              name: "categoryIndex",
              title: "Category Index",
              type: "number",
              description: "0-indexed mapping to the tabs defined above (e.g. 0 = Breakfast, 1 = Cold Mezza, etc.)",
            },
            { name: "name", title: "Dish / Drink Name", type: "localizedString" },
            { name: "desc", title: "Description", type: "localizedText" },
            { name: "price", title: "Price", type: "localizedString" },
            { name: "tag", title: "Tag (e.g. SIGNATURE, VEGAN)", type: "localizedString" },
            { name: "note", title: "Chef's Secret / Levant Story / Coffee origin", type: "localizedString" },
            { name: "image", title: "Dish Image", type: "image", options: { hotspot: true } },
          ],
        },
      ],
    }),

    // --- 5. AMBIANCE / GALLERY SECTION ---
    defineField({
      name: "galleryTitle",
      title: "Gallery Title",
      type: "localizedString",
    }),
    defineField({
      name: "gallerySubtitle",
      title: "Gallery Subtitle",
      type: "localizedString",
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [
        {
          type: "object",
          name: "galleryItem",
          fields: [
            { name: "image", title: "Image", type: "image", options: { hotspot: true } },
            { name: "title", title: "Image Title", type: "localizedString" },
            { name: "subtitle", title: "Image Subtitle", type: "localizedString" },
          ],
        },
      ],
    }),

    // --- 6. LOCATION & CONTACT SECTION ---
    defineField({
      name: "locationHeader",
      title: "Location Header",
      type: "localizedString",
    }),
    defineField({
      name: "hoursTitle",
      title: "Hours Section Title",
      type: "localizedString",
    }),
    defineField({
      name: "hoursVal",
      title: "Hours Value",
      type: "localizedString",
    }),
    defineField({
      name: "contactTitle",
      title: "Contact Section Title",
      type: "localizedString",
    }),
    defineField({
      name: "contactVal",
      title: "Contact Value",
      type: "localizedString",
    }),
    defineField({
      name: "addressVal",
      title: "Address Value",
      type: "localizedString",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "restaurantId",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Unnamed Page",
        subtitle: `Restaurant ID: ${subtitle}`,
      };
    },
  },
});
