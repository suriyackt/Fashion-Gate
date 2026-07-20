import { defineType, defineField } from "sanity";
import { FileText } from "lucide-react";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: FileText,
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "localizedString",
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
    
    // Narrative Paragraphs
    defineField({ name: "p1", title: "Paragraph 1", type: "localizedText" }),
    defineField({ name: "p2", title: "Paragraph 2", type: "localizedText" }),
    defineField({ name: "p3", title: "Paragraph 3", type: "localizedText" }),
    defineField({ name: "p4", title: "Paragraph 4", type: "localizedText" }),
    defineField({ name: "p5", title: "Paragraph 5", type: "localizedText" }),
    defineField({ name: "p6", title: "Paragraph 6", type: "localizedText" }),
    defineField({ name: "p7", title: "Paragraph 7", type: "localizedText" }),

    // Images
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "collageImage1",
      title: "Collage Image 1 (Left)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "collageImage2",
      title: "Collage Image 2 (Overlapping Right)",
      type: "image",
      options: { hotspot: true },
    }),

    // Video Section
    defineField({
      name: "videoBgImage",
      title: "Video Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "videoTitle",
      title: "Video Title",
      type: "localizedString",
    }),
    defineField({
      name: "videoSubtitle",
      title: "Video Subtitle",
      type: "localizedString",
    }),
    defineField({
      name: "videoSourceType",
      title: "Video Source Type",
      type: "string",
      options: {
        list: [
          { title: "Upload Video File (MP4/WebM/MOV)", value: "file" },
          { title: "Embed Video URL (YouTube/Vimeo)", value: "url" }
        ],
        layout: "radio"
      },
      initialValue: "url",
    }),
    defineField({
      name: "videoFile",
      title: "Upload Video File Directly (Sanity CMS)",
      type: "file",
      options: { accept: "video/*" },
      description: "Upload a video file directly to Sanity CMS (just like uploading an image).",
      hidden: ({ document }) => document?.videoSourceType === "url",
    }),
    defineField({
      name: "videoUrl",
      title: "Video Embed URL (YouTube/Vimeo)",
      type: "string",
      description: "Enter external embed URL (YouTube/Vimeo).",
      hidden: ({ document }) => document?.videoSourceType === "file",
    }),

    // Vision
    defineField({
      name: "visionTitle",
      title: "Vision Title",
      type: "localizedString",
    }),
    defineField({
      name: "visionText",
      title: "Vision Text",
      type: "localizedText",
    }),

    // Commitment
    defineField({
      name: "commitmentTitle",
      title: "Commitment Title",
      type: "localizedString",
    }),
    defineField({
      name: "commitmentText",
      title: "Commitment Text",
      type: "localizedText",
    }),
  ],
  initialValue: {
    title: { en: "About Fashion Gate", ar: "عن فاشن غيت" },
    eyebrow: { en: "Damascus Boulevard Showroom", ar: "معرض بوليفارد دمشق" },
    headline: { en: "Syria’s Premier Luxury Retail Destination", ar: "القمة المطلقة للفخامة والتسوق في سوريا" },
    p1: {
      en: "Fashion Gate is Syria’s premier luxury retail destination, bringing together the world of international fashion, beauty, and lifestyle in one distinguished environment.",
      ar: "فاشن غيت هي وجهة التجزئة الفاخرة الرائدة في سوريا، حيث تجمع بين عالم الموضة العالمية، الجمال، وأسلوب الحياة في بيئة واحدة متميزة."
    },
    p2: {
      en: "Located at Damascus Boulevard, one of Syria’s emerging premium commercial and tourism destinations, Fashion Gate introduces a new concept of luxury shopping built around elegance, discovery, and exceptional experiences.",
      ar: "تقع فاشن غيت في بوليفارد دمشق، وهو أحد الوجهات التجارية والسياحية الراقية الناشئة في سوريا، وتقدم مفهوماً جديداً للتسوق الفاخر القائم على الأناقة والاكتشاف والتجارب الاستثنائية."
    },
    p3: {
      en: "Inspired by the world’s most renowned luxury destinations, Fashion Gate offers a carefully curated selection of fashion, beauty, and lifestyle collections, bringing together exceptional brands and memorable experiences under one roof.",
      ar: "مستوحاة من أشهر وجهات الفخامة في العالم، تقدم فاشن غيت تشكيلة منسقة بعناية من أزياء وجمال وأسلوب حياة، لتجمع العلامات التجارية الاستثنائية والتجارب التي لا تُنسى تحت سقف واحد."
    },
    p4: {
      en: "From timeless fashion and accessories to beauty, lifestyle products, and exclusive in-store experiences, Fashion Gate celebrates individuality, craftsmanship, and modern luxury. Every detail has been thoughtfully designed to create an atmosphere where customers can explore, connect, and enjoy an elevated shopping experience.",
      ar: "من الأزياء والإكسسوارات الخالدة إلى منتجات الجمال وأسلوب الحياة والتجارب الحصرية داخل المتجر، تحتفل فاشن غيت بالفردية والحرفية والفخامة الحديثة. تم تصميم كل التفاصيل بعناية لخلق جو يمكن العملاء من الاكتشاف والاستمتاع بتجربة تسوق راقية."
    },
    p5: {
      en: "More than just a shopping destination, Fashion Gate is a place where fashion, culture, and hospitality come together. With its elegant interiors, curated spaces, and signature coffee shop, it offers visitors a welcoming environment to relax, discover new collections, and enjoy moments beyond traditional retail.",
      ar: "أكثر من مجرد وجهة تسوق، فاشن غيت هي مكان تلتقي فيه الموضة والثقافة والضيافة. مع تصميماتها الداخلية الأنيقة، ومساحاتها المنسقة، ومقهى التوقيع الخاص بها، فإنها توفر للزوار بيئة ترحيبية للاسترخاء واكتشاف المجموعات الجديدة والاستمتاع بلحظات تتجاوز البيع بالتجزئة التقليدي."
    },
    p6: {
      en: "As part of Damascus Boulevard’s vision to create a vibrant destination for commerce, tourism, and lifestyle, Fashion Gate represents a new chapter for luxury retail in Damascus. It aims to become a destination where fashion enthusiasts, families, and visitors can experience quality, elegance, and exceptional service.",
      ar: "كجزء من رؤية بوليفارد دمشق لخلق وجهة حيوية للتجارة والسياحة وأسلوب الحياة، تمثل فاشن غيت فصلاً جديداً لتجزئة الفخامة في دمشق. وتهدف إلى أن تصبح وجهة يمكن لعشاق الموضة والعائلات والزوار تجربة الجودة والأناقة والخدمة الاستثنائية."
    },
    p7: {
      en: "At Fashion Gate, luxury is not only about the brands we present. It is about the experience we create, the atmosphere we offer, and the memories our customers take with them.",
      ar: "في فاشن غيت، لا تقتصر الفخامة على العلامات التجارية التي نقدمها فحسب. بل تتعلق بالتجربة التي نخلقها، والأجواء التي نوفرها، والذكريات التي يأخذها عملاؤنا معهم."
    },
    videoTitle: { en: "THE ATELIER EXPERIENCE", ar: "صالون فاشن غيت بوليفارد دمشق" },
    videoSubtitle: { en: "Explore our spatial design walkthrough", ar: "شاهد عرض المساحات والخدمات الخاصة" },
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1",
    visionTitle: { en: "Our Vision", ar: "رؤيتنا" },
    visionText: {
      en: "Our vision is to establish Fashion Gate as Syria’s leading luxury lifestyle destination by bringing together international fashion, service excellence, and a unique customer experience. We aim to offer an inspiring destination to discover and celebrate modern luxury.",
      ar: "تتمثل رؤيتنا في تأسيس فاشن غيت كوجهة رائدة لأسلوب الحياة الفاخر في سوريا من خلال الجمع بين الموضة العالمية، والخدمة الاستثنائية، وتجربة العملاء الفريدة. ونهدف إلى خلق مكان تلتقي فيه الموضة والثقافة وأسلوب الحياة."
    },
    commitmentTitle: { en: "Our Commitment", ar: "التزامنا" },
    commitmentText: {
      en: "At Fashion Gate, we are committed to delivering excellence in every detail. From our carefully selected collections to our thoughtfully designed spaces and personalized service, we strive to create an experience built on quality, elegance, and trust.",
      ar: "في فاشن غيت، نحن ملتزمون بتقديم التميز في كل تفصيل. من مجموعاتنا المختارة بعناية إلى مساحاتنا المصممة بدقة والخدمة الشخصية، نسعى جاهدين لخلق تجربة مبنية على الجودة والأناقة والثقة."
    }
  },
  preview: {
    select: {
      title: "title.en",
      subtitle: "headline.en"
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "About Page",
        subtitle: subtitle || "Dynamic about page content"
      };
    }
  }
});
