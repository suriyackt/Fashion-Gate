export interface Brand {
  id: string;
  name: string;
  nameAr: string;
  headline: string;
  headlineAr: string;
  description: string;
  descriptionAr: string;
  backdropUrl: string;
}

export const brands: Brand[] = [
  {
    id: "adidas",
    name: "adidas",
    nameAr: "أديداس",
    headline: "Global Icon of Athletic Heritage & Streetwear Style",
    headlineAr: "أيقونة عالمية للتراث الرياضي وأسلوب ملابس الشارع",
    description: "A global leader in sportswear and athletic culture, adidas fuses performance technology with iconic street style, inspiring athletes and fashion pioneers alike.",
    descriptionAr: "رائدة عالمية في الموضة الرياضية والثقافة الحركية، تمزج أديداس بين تكنولوجيا الأداء وأسلوب الشارع الأيقوني، مما يلهم الرياضيين ورواد الموضة على حد سواء.",
    backdropUrl: "/brand-pages/contact_bg.png"
  },
  {
    id: "calvin-klein",
    name: "CALVIN KLEIN",
    nameAr: "كالفين كلاين",
    headline: "Minimalist American Luxury & Sensual Modernism",
    headlineAr: "الفخامة الأمريكية البسيطة والحداثة الحسية",
    description: "Founded in 1968, Calvin Klein is a global lifestyle brand that exemplifies bold, progressive ideals and a seductive, often minimal aesthetic through clean lines and classic comfort.",
    descriptionAr: "تأسست كالفين كلاين في عام ١٩٦٨، وهي علامة تجارية عالمية لأسلوب الحياة تجسد المثل العليا الجريئة والتقدمية والجماليات الجذابة والبسيطة من خلال خطوط نظيفة وراحة كلاسيكية.",
    backdropUrl: "/brand-pages/contact_bg.png"
  },
  {
    id: "skechers",
    name: "SKECHERS",
    nameAr: "سكيتشرز",
    headline: "Comfort-First Footwear Innovation & Active Lifestyle",
    headlineAr: "ابتكار الأحذية المريحة وأسلوب الحياة النشط",
    description: "As a global leader in the footwear industry, Skechers is renowned for designing innovative, comfort-driven shoes and athletic apparel for active people everywhere.",
    descriptionAr: "بصفتها رائدة عالمية في صناعة الأحذية، تشتهر سكيتشرز بتصميم أحذية مبتكرة تركز على الراحة والملابس الرياضية للأشخاص النشطين في كل مكان.",
    backdropUrl: "/brand-pages/contact_bg.png"
  },
  {
    id: "maxmara",
    name: "MaxMara",
    nameAr: "ماكس مارا",
    headline: "Italian Tailoring Heritage & Iconic Outerwear Elegance",
    headlineAr: "تراث الخياطة الإيطالية وأناقة معاطف الخارجية الأيقونية",
    description: "An emblem of Italian ready-to-wear excellence, Max Mara is world-famous for its luxury fabrics, structured silhouettes, and timeless neutral-toned wool coats.",
    descriptionAr: "رمز للتميز الإيطالي في الملابس الجاهزة، تشتهر ماكس مارا عالميًا بأقمشتها الفاخرة، وقصاتها المنظمة، ومعاطفها الصوفية الخالدة ذات الألوان المحايدة.",
    backdropUrl: "/brand-pages/contact_bg.png"
  },
  {
    id: "editorial",
    name: "EDITORIAL",
    nameAr: "إيديتوريال",
    headline: "Curated Seasonal Edits & Avant-Garde Designer Selections",
    headlineAr: "مجموعات موسمية منسقة وخيارات مصممين رياديين",
    description: "A space for progressive design and high-fashion curation, Editorial brings together avant-garde fashion statements and bold, boundary-pushing seasonal apparel.",
    descriptionAr: "مساحة للتصميم المتقدم وتنسيق الموضة الراقية، تجمع إيديتوريال بين لمسات الموضة الطليعية والملابس الموسمية الجريئة التي تتجاوز الحدود.",
    backdropUrl: "/brand-pages/contact_bg.png"
  },
  {
    id: "paul-shark",
    name: "PAUL & SHARK",
    nameAr: "بول آند شارك",
    headline: "Luxury Yachting & Italian Sportswear Elegance",
    headlineAr: "فخامة اليخوت وأناقة الملابس الرياضية الإيطالية",
    description: "Synonymous with Italian elegance and high-performance yachting-inspired clothing, crafted with technical innovation and premium materials.",
    descriptionAr: "مرادفة للأناقة الإيطالية والملابس المستوحاة من اليخوت عالية الأداء، والمصنوعة من الابتكارات التقنية والمواد المتميزة.",
    backdropUrl: "/brand-pages/contact_bg.png"
  },
  {
    id: "sandro-moje",
    name: "SANDRO moje",
    nameAr: "ساندرو موهي",
    headline: "Parisian Chic, Modern Tailoring & Effortless Luxury",
    headlineAr: "الأناقة الباريسية، الخياطة الحديثة والفخامة التلقائية",
    description: "A leading Parisian luxury brand, Sandro expresses an effortless Parisian elegance through sleek tailoring, refined textures, and romantic modern separates.",
    descriptionAr: "علامة تجارية باريسية رائدة للفخامة، تعبر ساندرو عن أناقة باريسية سهلة من خلال خياطة أنيقة، وقوام ناعم، وقطع منفصلة رومانسية حديثة.",
    backdropUrl: "/brand-pages/contact_bg.png"
  }
];

export function getBrandById(id: string): Brand | undefined {
  return brands.find((brand) => brand.id === id);
}

export function getAllBrands(): Brand[] {
  return brands;
}
