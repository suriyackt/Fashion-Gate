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
    id: "chanel",
    name: "Chanel",
    nameAr: "شانيل",
    headline: "The Definition of Haute Couture & Timeless Allure",
    headlineAr: "تعريف الهوت كوتور والجاذبية الخالدة",
    description: "Founded by Gabrielle Chanel in 1910, Chanel redefined women's style with revolutionary simplicity. Today, it remains the ultimate symbol of French luxury and modern elegance.",
    descriptionAr: "تأسست دار شانيل على يد غابرييل شانيل في عام ١٩١٠، وأعادت تحديد أسلوب المرأة ببساطة ثورية. واليوم، تظل الرمز النهائي للفخامة الفرنسية والأناقة العصرية.",
    backdropUrl: "/brand-pages/contact_bg.png"
  },
  {
    id: "prada",
    name: "Prada",
    nameAr: "برادا",
    headline: "Intellectual Luxury & Avant-Garde Expression",
    headlineAr: "الفخامة الفكرية والتعبير الطليعي",
    description: "Prada combines conceptual design, innovative materials, and unmatched Italian craftsmanship to challenge traditional luxury codes, crafting pieces that are both modern and classic.",
    descriptionAr: "تجمع برادا بين التصميم المفاهيمي، والمواد المبتكرة، والحرفية الإيطالية التي لا تضاهى لتحدي رموز الفخامة التقليدية، وصنع قطع حديثة وكلاسيكية في آن واحد.",
    backdropUrl: "/brand-pages/contact_bg.png"
  },
  {
    id: "gucci",
    name: "Gucci",
    nameAr: "غوتشي",
    headline: "Contemporary Maximalism & Florentine Heritage",
    headlineAr: "الجماليات المعاصرة والتراث الفلورنسي",
    description: "Under a vision of bold eclecticism, Gucci redefines 21st-century luxury. Woven with Italian heritage and vibrant design, each piece is an invitation to self-expression.",
    descriptionAr: "تحت رؤية انتقائية جريئة، تعيد غوتشي تعريف فخامة القرن الحادي والعشرين. منسوجة بالتراث الإيطالي والتصميم النابض بالحياة، كل قطعة هي دعوة للتعبير عن الذات.",
    backdropUrl: "/brand-pages/contact_bg.png"
  },
  {
    id: "dior",
    name: "Dior",
    nameAr: "ديور",
    headline: "The Pinnacle of Parisian Elegance & Grace",
    headlineAr: "قمة الأناقة والجمال الباريسي",
    description: "Since Christian Dior's 'New Look' revolutionized fashion in 1947, the House of Dior has stood as the global emblem of romantic femininity, exquisite craftsmanship, and grand Parisian elegance.",
    descriptionAr: "منذ أن أحدث 'المظهر الجديد' لكريستيان ديور ثورة في عالم الموضة عام ١٩٤٧، كانت دار ديور بمثابة الرمز العالمي للأنوثة الرومانسية، والحرفية الرائعة، والأناقة الباريسية الكبرى.",
    backdropUrl: "/brand-pages/contact_bg.png"
  },
  {
    id: "ysl",
    name: "Saint Laurent",
    nameAr: "سان لوران",
    headline: "Rebellious Sophistication & Parisian Tailoring",
    headlineAr: "الرقي المتمرد والخياطة الباريسية",
    description: "Yves Saint Laurent introduced couture tailoring to modern streetwear. Blurring boundaries with sharp cuts and leather accents, the House represents bold, dark elegance.",
    descriptionAr: "قدم إيف سان لوران خياطة الهوت كوتور لملابس الشارع العصرية. مع طمس الحدود بفضل القصات الحادة واللمسات الجلدية، تمثل الدار الأناقة الجريئة والداكنة.",
    backdropUrl: "/brand-pages/contact_bg.png"
  },
  {
    id: "hermes",
    name: "Hermès",
    nameAr: "هيرميس",
    headline: "Uncompromised Leather Craft & Equestrian Heritage",
    headlineAr: "صناعة جلدية لا تضاهى وتراث الفروسية",
    description: "Established in 1837 as a harness workshop, Hermès represents the ultimate zenith of manual craftsmanship, creating legendary leather masterpieces that endure for generations.",
    descriptionAr: "تأسست هيرميس عام ١٨٣٧ كورشة عمل للفروسية، وتمثل الذروة النهائية للحرف اليدوية، حيث تصنع روائع جلدية أسطورية تدوم لأجيال.",
    backdropUrl: "/brand-pages/contact_bg.png"
  },
  {
    id: "adidas",
    name: "Adidas Y-3",
    nameAr: "أديداس Y-3",
    headline: "Athletic Sophistication & Streetwear Innovation",
    headlineAr: "الرقي الرياضي والابتكار في ملابس الشارع",
    description: "Fusing athletic heritage with high-fashion tailoring, Adidas Y-3 challenges the boundaries of performance and design, creating structured modern streetwear.",
    descriptionAr: "دمجًا للتراث الرياضي مع خياطة الموضة الراقية، تتحدى أديداس Y-3 حدود الأداء والتصميم، مما يخلق ملابس شارع عصرية مهيكلة.",
    backdropUrl: "/brand-pages/contact_bg.png"
  }
];

export function getBrandById(id: string): Brand | undefined {
  return brands.find((brand) => brand.id === id);
}

export function getAllBrands(): Brand[] {
  return brands;
}
