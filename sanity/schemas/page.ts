import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 3 }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        { type: "heroSection" },
        { type: "brandMarqueeSection" },
        { type: "manifestoSection" },
        { type: "carouselSection" },
        { type: "collectionsSection" },
        { type: "lookbookSection" },
        { type: "boulevardSelectionSection" },
        { type: "editorialSection" },
        { type: "atelierShowcaseSection" },
        { type: "contactInquirySection" }
      ]
    })
  ],
  initialValue: {
    sections: [
      {
        _type: "heroSection",
        enabled: true,
        anchor: "arrival",
        eyebrow: { en: "Fashion Gate Boulevard", ar: "فاشن غيت بوليفارد" },
        headline: { en: "Fashion Gate", ar: "بوابة الأزياء" },
        subHeadlineLine1: { en: "Syria's first international", ar: "أول متجر أقسام" },
        subHeadlineLine2: { en: "luxury department store", ar: "دولي فاخر في سوريا" },
        bgType: "image",
        cta: {
          label: { en: "Read the manifesto", ar: "اقرأ البيان" },
          href: "#manifesto",
          type: "primary"
        }
      },
      {
        _type: "brandMarqueeSection",
        enabled: true,
        anchor: "brand",
        title: "Brands We Present"
      },
      {
        _type: "manifestoSection",
        enabled: true,
        anchor: "manifesto",
        eyebrow: { en: "On Boulevard. For the world.", ar: "على البوليفارد. للعالم." },
        headline: { en: "On Boulevard. For the world.", ar: "على البوليفارد. للعالم." },
        description: {
          en: "Syria has never had a luxury department store of this scale. Fashion Gate Boulevard is not just a business. It is the reopening of Syria to the world through fashion.",
          ar: "لم تشهد سوريا من قبل متجراً للمنتجات الفاخرة بهذا الحجم. بوليفارد بوابة الأزياء ليس مجرد عمل تجاري. إنه إعادة فتح سوريا للعالم من خلال الموضة."
        }
      },
      {
        _type: "boulevardSelectionSection",
        enabled: true,
        anchor: "boulevard",
        eyebrow: { en: "Signature Spaces", ar: "مساحات التوقيع" },
        headline: { en: "The Boulevard Selection", ar: "مجموعة البوليفارد" },
        quote: { en: "“You do not shop Fashion Gate Boulevard. You walk it.”", ar: "«أنت لا تتسوق في بوابة الموضة بوليفارد، بل تمشي فيها.»" },
        description: {
          en: "Fashion Gate Boulevard is Syria's first luxury department store — a single address containing multiple worlds under one unified architectural vision.",
          ar: "فاشن غيت بوليفارد هو أول متجر سوري فاخر - عنوان واحد يضم عوالم متعددة تحت رؤية معمارية موحدة."
        }
      },
      {
        _type: "carouselSection",
        enabled: true,
        anchor: "editorial",
        eyebrow: { en: "On Boulevard. For the world.", ar: "على البوليفارد. للعالم." },
        headline: { en: "Not a store. Not a mall. A destination.", ar: "ليس مجرد متجر. ليس مركزاً تجارياً. وجهة." },
        description: {
          en: "Explore curated seasonal edits, signature silhouettes, and international designer collections that define the Fashion Gate experience.",
          ar: "اكتشف تعديلاتنا الموسمية المنقحة، وتصميماتنا الحصرية، ومجموعات المصممين العالميين التي تحدد تجربة فاشن غيت."
        },
        slides: [
          {
            title: { en: "The Autumn Edit", ar: "تنسيق الخريف" },
            description: {
              en: "A curation of timeless silhouettes, crafted in premium silks and warm cashmeres designed for the modern woman.",
              ar: "مجموعة من التصميمات الخالدة، المصنوعة من الحرير الفاخر والكشمير الدافئ والمصممة للمرأة العصرية."
            }
          },
          {
            title: { en: "Modern Sophistication", ar: "رقي عصري" },
            description: {
              en: "Effortless elegance meeting structured tailoring. Discover pieces that redefine classic design for daily luxury.",
              ar: "أناقة بسيطة تلتقي بالخياطة المنظمة. اكتشف القطع التي تعيد تعريف التصميم الكلاسيكي للفخامة اليومية."
            }
          },
          {
            title: { en: "Signature Accents", ar: "تفاصيل مميزة" },
            description: {
              en: "Exquisite bags and finely polished accessories that complete the definitive Fashion Gate statement.",
              ar: "حقائب رائعة وإكسسوارات مصقولة بدقة تكمل المظهر النهائي المميز لفاشن غيت."
            }
          }
        ]
      },
      {
        _type: "collectionsSection",
        enabled: true,
        anchor: "collections",
        eyebrow: { en: "The Departments", ar: "الأقسام" },
        headline: { en: "Multiple Worlds. One Architectural Vision.", ar: "عوالم متعددة. رؤية معمارية موحدة." },
        description: {
          en: "Fashion Gate Boulevard unites international fashion designer collections, luxury accessories, premium beauty, and gourmet foods under a single architectural vision.",
          ar: "يوحد فاشن غيت بوليفارد مجموعات مصممي الأزياء العالميين، والإكسسوارات الفاخرة، والجمال المتميز، والأطعمة الفاخرة تحت رؤية معمارية واحدة."
        }
      },
      {
        _type: "lookbookSection",
        enabled: true,
        anchor: "lookbook",
        eyebrow: { en: "Lookbook", ar: "كتيب الإطلالات" },
        headline: { en: "A flowing visual system for product storytelling.", ar: "نظام مرئي انسيابي لسرد قصة المنتج." },
        description: {
          en: "Parallax image bands, staggered cards, and floating navigation create movement without making the boutique feel noisy.",
          ar: "شرائط الصور المتحركة، والبطاقات المتدرجة، والتنقل العائم يخلق حركة دون جعل البوتيك يبدو صاخباً."
        }
      },
      {
        _type: "atelierShowcaseSection",
        enabled: true,
        anchor: "atelier",
        eyebrow: { en: "The Atelier Space", ar: "الفضاء المعماري" },
        headline: { en: "Outlet architectural spaces", ar: "مساحات أتيلييه البوليفارد" },
        description: {
          en: "Experience the physical concept behind Syria's first luxury shopping destination. A curated dialogue between stone craftsmanship and intimate client spaces.",
          ar: "عش التجربة المادية الكامنة وراء أول وجهة تسوق فاخرة في سوريا. حوار منسق بين المهارة الحرفية الحجرية ومساحات العملاء الخاصة."
        },
        leftCard: {
          eyebrow: { en: "Exterior concept", ar: "المنظور الخارجي" },
          title: { en: "The Boulevard facade", ar: "واجهة البوليفارد" },
          description: {
            en: "Merging heritage masonry accents with structural glass lines, framing a prominent presence on the shopping avenue.",
            ar: "دمج التفاصيل الحجرية التراثية مع خطوط التصميم العصرية، مما يخلق حضوراً لافتاً في قلب حي التسوق."
          }
        },
        rightCard: {
          eyebrow: { en: "Interior design", ar: "المساحات الداخلية" },
          title: { en: "The private shopping salons", ar: "صالونات العرض الخاصة" },
          description: {
            en: "Intimate dressing suites finished in raw natural plaster, travertine and soft textiles, designed for private luxury consultations.",
            ar: "أجنحة مخصصة ومصممة بمواد طبيعية دافئة لاستقبال العملاء في جلسات معينة هادئة واستشارات مخصصة."
          }
        }
      }
    ]
  },
  preview: {
    select: { title: "title", subtitle: "seoTitle" }
  }
});
