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
    id: "paul-shark",
    name: "Paul & Shark",
    nameAr: "بول آند شارك",
    headline: "Luxury Yachting & Italian Sportswear Elegance",
    headlineAr: "فخامة اليخوت وأناقة الملابس الرياضية الإيطالية",
    description: "Founded in 1975, Paul & Shark is synonymous with Italian elegance and high-performance yachting-inspired clothing, crafted with technical innovation and premium materials.",
    descriptionAr: "تأسست بول آند شارك في عام ١٩٧٥، وهي مرادفة للأناقة الإيطالية والملابس المستوحاة من اليخوت عالية الأداء، والمصنوعة من الابتكارات التقنية والمواد المتميزة.",
    backdropUrl: "/brand-pages/contact_bg.png"
  },
  {
    id: "tom-ford",
    name: "Tom Ford",
    nameAr: "توم فورد",
    headline: "Modern Glamour, Sensuality & Tailoring Perfection",
    headlineAr: "الجاذبية المعاصرة، والإثارة، والكمال في الخياطة",
    description: "Renowned for its sharp tailoring, luxury eyewear, and iconic beauty collections, Tom Ford represents sophisticated modern glamour and high-fashion luxury.",
    descriptionAr: "تشتهر توم فورد بالخياطة الحادة، والنظارات الفاخرة، ومجموعات الجمال الأيقونية، وتمثل الجاذبية المعاصرة الراقية والفخامة في الموضة.",
    backdropUrl: "/brand-pages/contact_bg.png"
  },
  {
    id: "givenchy",
    name: "Givenchy",
    nameAr: "جيفنشي",
    headline: "Aristocratic Style, Couture Spirit & French Romance",
    headlineAr: "الأسلوب الأرستقراطي، وروح الهوت كوتور، والرومانسية الفرنسية",
    description: "Founded in 1952 by Hubert de Givenchy, the house blends dark romanticism, structured couture tailoring, and Parisian elegance with streetwear elements.",
    descriptionAr: "تأسست دار جيفنشي عام ١٩٥٢ على يد هوبير دي جيفنشي، وهي تمزج بين الرومانسية الداكنة، والخياطة الهيكلية للهوت كوتور، والأناقة الباريسية مع عناصر ملابس الشارع.",
    backdropUrl: "/brand-pages/contact_bg.png"
  },
  {
    id: "christian-dior",
    name: "Christian Dior",
    nameAr: "كريستيان ديور",
    headline: "The Pinnacle of Parisian Elegance & Grace",
    headlineAr: "قمة الأناقة والجمال الباريسي",
    description: "Since Christian Dior's 'New Look' revolutionized fashion in 1947, the House of Dior has stood as the global emblem of romantic femininity, exquisite craftsmanship, and grand Parisian elegance.",
    descriptionAr: "منذ أن أحدث 'المظهر الجديد' لكريستيان ديور ثورة في عالم الموضة عام ١٩٤٧، كانت دار ديور بمثابة الرمز العالمي للأنوثة الرومانسية، والحرفية الرائعة، والأناقة الباريسية الكبرى.",
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
    id: "lancome",
    name: "Lancome",
    nameAr: "لانكوم",
    headline: "Parisian Beauty, Advanced Skincare & Exquisite Scents",
    headlineAr: "الجمال الباريسي، والعناية المتقدمة بالبشرة، والعطور الرائعة",
    description: "Founded in 1935, Lancôme represents French refinement, science-backed skincare innovation, and luxurious fragrances celebrating elegant femininity worldwide.",
    descriptionAr: "تأسست لانكوم في عام ١٩٣٥، وهي تمثل الرقي الفرنسي، والابتكارات في مجال العناية بالبشرة المدعومة بالعلم، والعطور الفاخرة التي تحتفي بالأنوثة الأنيقة في جميع أنحاء العالم.",
    backdropUrl: "/brand-pages/contact_bg.png"
  }
];

export function getBrandById(id: string): Brand | undefined {
  return brands.find((brand) => brand.id === id);
}

export function getAllBrands(): Brand[] {
  return brands;
}
