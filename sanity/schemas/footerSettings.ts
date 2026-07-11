import { defineField, defineType } from "sanity";

export const footerSettings = defineType({
  name: "footerSettings",
  title: "Footer Settings",
  type: "document",
  fields: [
    defineField({ name: "description", title: "Brand Description", type: "localizedText" }),
    defineField({ name: "exploreTitle", title: "Explore Column Title", type: "localizedString", initialValue: { en: "Explore", ar: "استكشف" } }),
    defineField({
      name: "links",
      title: "Quick Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "footerLink",
          fields: [
            defineField({ name: "label", title: "Label", type: "localizedString" }),
            defineField({ name: "href", title: "URL / Anchor Path", type: "string" })
          ],
          preview: {
            select: { title: "label.en", subtitle: "href" }
          }
        }
      ]
    }),
    defineField({ name: "updatesTitle", title: "Updates Column Title", type: "localizedString", initialValue: { en: "Bespoke Updates", ar: "تحديثات مخصصة" } }),
    defineField({ name: "subscribeText", title: "Subscribe Description Text", type: "localizedText" }),
    defineField({ name: "emailPlaceholder", title: "Email Placeholder Text", type: "localizedString", initialValue: { en: "Email address", ar: "البريد الإلكتروني" } }),
    defineField({ name: "copyright", title: "Copyright Text", type: "localizedString", initialValue: { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." } }),
    defineField({ name: "facebookUrl", title: "Facebook URL", type: "string", initialValue: "#" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "string", initialValue: "#" }),
    defineField({ name: "whatsAppUrl", title: "WhatsApp URL", type: "string", initialValue: "#" }),
    defineField({ name: "floatingWhatsAppUrl", title: "Floating WhatsApp Button URL", type: "string", initialValue: "#" })
  ],
  preview: {
    prepare() {
      return { title: "Footer Settings" };
    }
  }
});
