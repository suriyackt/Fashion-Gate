import { defineType, defineField } from "sanity";
import { Mail } from "lucide-react";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  icon: Mail,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "localizedString",
    }),
    defineField({
      name: "title",
      title: "Page Title",
      type: "localizedString",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "localizedText",
    }),

    // Contact Details
    defineField({
      name: "addressLabel",
      title: "Address Label",
      type: "localizedString",
    }),
    defineField({
      name: "addressValue",
      title: "Address Value",
      type: "localizedString",
    }),

    defineField({
      name: "hoursLabel",
      title: "Hours Label",
      type: "localizedString",
    }),
    defineField({
      name: "hoursValue",
      title: "Hours Value",
      type: "localizedString",
    }),

    defineField({
      name: "digitalLabel",
      title: "Digital Concierge Label",
      type: "localizedString",
    }),
    defineField({
      name: "digitalValue",
      title: "Digital Concierge Value (Email)",
      type: "string",
    }),

    defineField({
      name: "whatsappLabel",
      title: "WhatsApp Label",
      type: "localizedString",
    }),
    defineField({
      name: "whatsappValue",
      title: "WhatsApp Value (Phone number)",
      type: "string",
    }),

    defineField({
      name: "chatConcierge",
      title: "WhatsApp Button Text",
      type: "localizedString",
    }),

    // Inquiry Form Labels
    defineField({
      name: "formTitle",
      title: "Form Title",
      type: "localizedString",
    }),
    defineField({
      name: "formSubtitle",
      title: "Form Subtitle",
      type: "localizedString",
    }),
    defineField({
      name: "fullNameLabel",
      title: "Full Name Label",
      type: "localizedString",
    }),
    defineField({
      name: "emailLabel",
      title: "Email Label",
      type: "localizedString",
    }),
    defineField({
      name: "phoneLabel",
      title: "Phone/WhatsApp Label",
      type: "localizedString",
    }),
    defineField({
      name: "msgLabel",
      title: "Details of Inquiry Label",
      type: "localizedString",
    }),
    defineField({
      name: "sendBtn",
      title: "Submit Button Label",
      type: "localizedString",
    }),

    // Form Success Message
    defineField({
      name: "successHeader",
      title: "Success Message Header",
      type: "localizedString",
    }),
    defineField({
      name: "successDesc",
      title: "Success Message Description",
      type: "localizedText",
    }),
    defineField({
      name: "sendAnother",
      title: "Submit Another Button Label",
      type: "localizedString",
    }),

    // Background Image
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "seo",
    }),
  ],
  initialValue: {
    eyebrow: { en: "client services", ar: "خدمات العملاء" },
    title: { en: "Contact the Atelier", ar: "اتصل بالأتيليه الخاص" },
    subtitle: {
      en: "For private viewings, bespoke fittings, and concierge assistance at our Damascus Boulevard showrooms.",
      ar: "للمعاينات الشخصية، قياسات الخياطة، وخدمات الكونسيرج الخاصة في صالات عرض بوليفارد دمشق."
    },
    addressLabel: { en: "Atelier location", ar: "موقع الأتيليه" },
    addressValue: { en: "Damascus Boulevard District, Damascus, Syria", ar: "حي البوليفارد، دمشق، سوريا" },
    hoursLabel: { en: "Salon hours", ar: "أوقات الصالون" },
    hoursValue: { en: "Monday – Saturday: 11:00 am – 9:00 pm", ar: "الاثنين – السبت: ١١:٠٠ صباحاً – ٩:٠٠ مساءً" },
    digitalLabel: { en: "Digital concierge", ar: "الكونسيرج الرقمي" },
    digitalValue: "concierge@fashiongate.sy",
    whatsappLabel: { en: "Instant chat", ar: "المحادثة الفورية" },
    whatsappValue: "+963 930 000 000",
    chatConcierge: { en: "Connect on WhatsApp", ar: "تواصل عبر الواتساب" },
    formTitle: { en: "Submit a private inquiry", ar: "تقديم طلب استفسار خاص" },
    formSubtitle: {
      en: "Please fill out your details. A dedicated client advisor will contact you within 24 hours.",
      ar: "يرجى ملء تفاصيل طلبك. سيتصل بك مستشار العملاء الخاص بنا خلال ٢٤ ساعة."
    },
    fullNameLabel: { en: "Full name", ar: "الاسم الكامل" },
    emailLabel: { en: "Email address", ar: "البريد الإلكتروني" },
    phoneLabel: { en: "Phone / WhatsApp", ar: "الهاتف / الواتساب" },
    msgLabel: { en: "Details of your inquiry", ar: "تفاصيل استفسارك" },
    sendBtn: { en: "Submit inquiry", ar: "إرسال الاستفسار" },
    successHeader: { en: "Inquiry registered", ar: "تم تسجيل استفسارك" },
    successDesc: {
      en: "Your request has been received securely. A private advisor will contact you shortly to coordinate details.",
      ar: "تم تسجيل استفسارك بأمان. سيتصل بك أحد مستشارينا لتنسيق وتلبية طلبك قريباً."
    },
    sendAnother: { en: "Submit another inquiry", ar: "إرسال استفسار آخر" }
  },
  preview: {
    select: {
      title: "title.en",
      subtitle: "subtitle.en"
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Contact Page",
        subtitle: subtitle || "Dynamic contact page content"
      };
    }
  }
});
