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
    name: "Adidas",
    nameAr: "أديداس",
    headline: "Where High-Performance Sportswear Meets Contemporary Street Culture",
    headlineAr: "حيث تلتقي الملابس الرياضية عالية الأداء مع ثقافة الشارع المعاصرة",
    description: "Representing the pinnacle of global athletic lifestyle innovation, Adidas is integrated into the portfolio to bridge the gap between high-performance sportswear and contemporary street culture. The inclusion of this iconic brand underscores a commitment to providing energetic, trend-forward, and sustainable options for modern, active lifestyles.",
    descriptionAr: "تمثل أديداس ذروة ابتكار أسلوب الحياة الرياضي العالمي، وقد تم دمجها في محفظتنا لسد الفجوة بين الملابس الرياضية عالية الأداء وثقافة الشارع المعاصرة. ويؤكد إدراج هذه العلامة التجارية الأيقونية على الالتزام بتقديم خيارات حيوية ومواكبة للموضة ومستدامة لأساليب الحياة الحديثة والنشطة.",
    backdropUrl: "/assets/adidas_bg.jpg"
  },
  {
    id: "calvin-klein",
    name: "CALVIN KLEIN",
    nameAr: "كالفين كلاين",
    headline: "Modern American Minimalism & Sophisticated Clean Aesthetic",
    headlineAr: "البساطة الأمريكية الحديثة والجماليات النظيفة والأنيقة",
    description: "Bringing an essential element of modern American minimalism, CALVIN KLEIN anchors the fashion offering with its sophisticated, clean aesthetic. The brand is selected to deliver elevated daily essentials, premium denim, and iconic tailored pieces that appeal to the design-conscious individual seeking effortless luxury.",
    descriptionAr: "تقدم كالفين كلاين عنصراً أساسياً من البساطة الأمريكية الحديثة، وترسخ عروض الموضة بجماليتها المتطورة والنظيفة. تم اختيار العلامة التجارية لتقديم أساسيات يومية راقية، ودنيم ممتاز، وقطع مفصلة أيقونية تجذب الأفراد المهتمين بالتصميم والباحثين عن الفخامة العفوية.",
    backdropUrl: "/assets/ck_bg.jpg"
  },
  {
    id: "skechers",
    name: "SKECHERS",
    nameAr: "سكيتشرز",
    headline: "Premium Daily Comfort Built on Internationally Acclaimed Technology",
    headlineAr: "راحة يومية ممتازة مبنية على تقنيات معترف بها عالمياً",
    description: "Chosen to fulfill the vital demand for premium daily comfort, SKECHERS complements the footwear selection with its internationally acclaimed comfort technologies. By balancing current lifestyle trends with innovative cushioning, the brand ensures a diverse, functional, and accessible footwear offering for all demographics.",
    descriptionAr: "تم اختيار سكيتشرز لتلبية الطلب الحيوي على الراحة اليومية الممتازة، وهي تكمل تشكيلة الأحذية بتقنيات الراحة المعترف بها دولياً. ومن خلال تحقيق التوازن بين اتجاهات أسلوب الحياة الحالية والتوسيد المبتكر، تضمن العلامة التجارية تقديم أحذية متنوعة وعملية ومتاحة لجميع الفئات.",
    backdropUrl: "/brand-pages/page_10.jpg"
  },
  {
    id: "maxmara",
    name: "MaxMara",
    nameAr: "ماكس مارا",
    headline: "Unparalleled Italian Craftsmanship & Timeless Sartorial Precision",
    headlineAr: "حرفية إيطالية لا مثيل لها ودقة خياطة خالدة تناسب تطلعاتك",
    description: "As a cornerstone of the luxury portfolio, MaxMara introduces unparalleled Italian craftsmanship and timeless sartorial precision. The inclusion of this legendary fashion house elevates the destination's high-end style credentials, offering sophisticated outerwear and sharp tailoring for the discerning professional.",
    descriptionAr: "بصفتها حجر الزاوية في محفظة المنتجات الفاخرة، تقدم ماكس مارا حرفية إيطالية لا مثيل لها ودقة خياطة خالدة. إن إدراج دار الأزياء الأسطورية هذه يرفع من مكانة الوجهة في الأسلوب الراقي، حيث تقدم معاطف خارجية متطورة وتفاصيل خياطة حادة للمحترفين المتميزين.",
    backdropUrl: "/brand-pages/page_04.jpg"
  },
  {
    id: "editorial",
    name: "EDITORIAL",
    nameAr: "إيديتوريال",
    headline: "Distinctly Curated, Avant-Garde Perspectives for Unique Self-Expression",
    headlineAr: "منظور طليعي ومنسق للتعبير الفريد عن الذات",
    description: "Serving as the creative heart of the retail mix, EDITORIAL brings a distinctly curated, avant-garde perspective to the collective. This brand is featured to provide a fluid space for unique self-expression, blending seasonal statement pieces with refined basics that keep the retail environment dynamic.",
    descriptionAr: "باعتبارها القلب الإبداعي للمزيج التجاري، تقدم إيديتوريال منظوراً طليعياً ومنسقاً بشكل متميز للمجموعة. تم إبراز هذه العلامة التجارية لتوفير مساحة مرنة للتعبير الفريد عن الذات، ومزج القطع الموسمية المميزة مع الأساسيات الراقية التي تحافظ على ديناميكية بيئة البيع بالتجزئة.",
    backdropUrl: "/brand-pages/page_06.jpg"
  },
  {
    id: "paul-shark",
    name: "PAUL & SHARK",
    nameAr: "بول آند شارك",
    headline: "Sophisticated Maritime Heritage & Technical European Sportswear",
    headlineAr: "تراث بحري متطور وملابس رياضية أوروبية ذات أداء تقني",
    description: "Reflecting a dedication to premium technical performance and classic European style, PAUL & SHARK brings a sophisticated maritime heritage to the sportswear lineup. The brand enhances the collection with its weather-resistant fabrics and elegant smart-casual attire, catering to those who value both utility and luxury.",
    descriptionAr: "يعكس بول آند شارك تفانياً في الأداء التقني المتميز والأسلوب الأوروبي الكلاسيكي، ويضفي تراثاً بحرياً متطوراً على تشكيلة الملابس الرياضية. تعزز العلامة التجارية المجموعة بأقمشتها المقاومة للعوامل الجوية وملابسها الأنيقة غير الرسمية، لتلبي احتياجات أولئك الذين يقدرون الفائدة والفخامة معاً.",
    backdropUrl: "/brand-pages/page_08.jpg"
  },
  {
    id: "sandro",
    name: "SANDRO",
    nameAr: "ساندرو",
    headline: "Effortless Parisian Refinement & Contemporary Elegance",
    headlineAr: "الرقي الباريسي العفوي والأناقة المعاصرة ذات الطابع المتفرد",
    description: "Embodying the definitive spirit of effortless Parisian refinement, SANDRO adds a layer of contemporary elegance with a sharp, non-conformist edge. The label introduces a perfect balance of fluid femininity and structured tailoring, presenting versatile wardrobe staples for a highly fashion-literate audience.",
    descriptionAr: "تجسد ساندرو الروح المحددة للأناقة الباريسية العفوية، وتضيف طبقة من الأناقة المعاصرة ذات طابع متفرد. تقدم العلامة توازناً مثالياً بين الأنوثة الانسيابية والخياطة المنظمة، وتقدم قطع خزانة ملابس متعددة الاستخدامات لجمهور ذواق للموضة.",
    backdropUrl: "/brand-pages/page_12.jpg"
  },
  {
    id: "moje",
    name: "moje",
    nameAr: "موهي",
    headline: "Understated Creativity, Unique Textures & Independent Design",
    headlineAr: "إبداع متفرد، قوام نسيجي فريد، وتصاميم مستقلة تعكس شخصيتك",
    description: "Completing the curation with an artistic, individualistic touch, moje represents the commitment to independent design and understated creativity. The brand introduces unique textures, fluid forms, and thoughtful color palettes that offer visitors a highly personalized and versatile alternative to mainstream fashion.",
    descriptionAr: "استكمالاً للمجموعة بلمسة فنية وفردية، تمثل موهي الالتزام بالتصميم المستقل والإبداع البسيط. تقدم العلامة التجارية قواماً فريداً، وأشكالاً انسيابية، ولوحات ألوان مدروسة توفر للزوار بديلاً شخصياً للغاية ومتعدد الاستخدامات للموضة السائدة.",
    backdropUrl: "/brand-pages/page_11.jpg"
  }
];

export function getBrandById(id: string): Brand | undefined {
  return brands.find((brand) => brand.id === id);
}

export function getAllBrands(): Brand[] {
  return brands;
}
