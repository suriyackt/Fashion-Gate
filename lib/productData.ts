export interface Product {
  id: string; // The slug prepared in proper English based on title
  title: string;
  titleAr: string;
  category: string;
  categoryAr: string;
  slogan: string;
  sloganAr: string;
  description: string;
  descriptionAr: string;
  details: string[];
  detailsAr: string[];
  imageUrl: string;
  relatedIds: string[];
  brandId: string; // The corresponding brand ID
}

export const products: Product[] = [
  // --- CHANEL ---
  {
    id: "chanel-tweed-jacket",
    title: "Chanel Bouclé Tweed Jacket",
    titleAr: "سترة شانيل من التويد",
    category: "Women",
    categoryAr: "النساء",
    slogan: "An icon of Parisian luxury craftsmanship.",
    sloganAr: "أيقونة الحرفية الباريسية الفاخرة.",
    description: "Hand-woven from silk and wool bouclé yarns, this structured silhouette features intricate braided borders and signature CC-logo brass buttons. The ultimate pinnacle of Parisian couture.",
    descriptionAr: "منسوجة يدوياً من خيوط الحرير والصوف البوكلي، ويتميز هذا التصميم الهيكلي بحواف مضفرة معقدة وأزرار نحاسية تحمل شعار CC المميز. القمة المطلقة للأزياء الباريسية الراقية.",
    details: [
      "55% Wool, 30% Silk, 15% Alpaca",
      "Brushed brass CC monogram buttons",
      "Hand-finished braided trim along openings",
      "Silk satin inner lining",
      "Made in France"
    ],
    detailsAr: [
      "٥٥٪ صوف، ٣٠٪ حرير، ١٥٪ ألبكة",
      "أزرار نحاسية مصقولة تحمل مونوغرام CC",
      "حواف مضفرة مشطبة يدوياً على طول الفتحات",
      "بطانة داخلية من حرير الساتان",
      "صنع في فرنسا"
    ],
    imageUrl: "/assets/uploaded_products/product_5.png",
    brandId: "chanel",
    relatedIds: ["prada-oversized-wool-coat", "dior-bar-jacket"]
  },
  {
    id: "chanel-no5-perfume",
    title: "Chanel No. 5 Eau de Parfum",
    titleAr: "عطر شانيل رقم ٥",
    category: "Beauty",
    categoryAr: "الجمال",
    slogan: "The world's most legendary fragrance.",
    sloganAr: "العطر الأكثر أسطورية في العالم.",
    description: "An absolute classic. Combining notes of May rose, jasmine, and aldehyde bursts, Chanel No. 5 is a mysterious, floral olfactory signature that transcends generations.",
    descriptionAr: "كلاسيكية مطلقة. يجمع بين نفحات ورد مايو والياسمين ورشات الألدهيد، شانيل رقم ٥ هو توقيع عطري زهري غامض يتجاوز الأجيال.",
    details: [
      "Eau de Parfum concentration",
      "Key notes: Aldehydes, Jasmine, May Rose, Ylang-Ylang",
      "Refined glass flacon with minimalist typography",
      "100ml spray bottle",
      "Made in France"
    ],
    detailsAr: [
      "تركيز أو دو برفان",
      "الروائح الأساسية: ألدهيدات، ياسمين، ورد مايو، يلانغ يلانغ",
      "قارورة زجاجية راقية بتصميم بسيط",
      "بخاخ حجم ١٠٠ مل",
      "صنع في فرنسا"
    ],
    imageUrl: "/assets/uploaded_products/product_6.png",
    brandId: "chanel",
    relatedIds: ["dior-sauvage-elixir", "chanel-classic-flap-bag"]
  },
  {
    id: "chanel-classic-flap-bag",
    title: "Chanel Classic Large Flap Bag",
    titleAr: "حقيبة كتف شانيل الكلاسيكية",
    category: "Beauty",
    categoryAr: "الجمال",
    slogan: "A timeless masterpiece of leather design.",
    sloganAr: "تحفة فنية خالدة في عالم المنتجات الجلدية.",
    description: "Crafted in premium quilted caviar calfskin, featuring a double-flap closure and the signature metal interlaced leather shoulder strap. A legendary accessory investment.",
    descriptionAr: "مأخوذة من جلد العجل الفاخر المبطن، وتتميز بإغلاق مزدوج وحزام كتف جلدي متداخل مع المعدن. قطعة إكسسوار أسطورية للاقتناء.",
    details: [
      "Quilted Caviar Leather",
      "Gold-tone metal hardware and CC clasp",
      "Double-flap interior compartments",
      "Adjustable metal-leather woven chain strap",
      "Dimensions: 19.5 × 30 × 10 cm"
    ],
    detailsAr: [
      "جلد كافيار مبطن فاخر",
      "إكسسوارات معدنية ذهبية وقفل CC",
      "مقصورات داخلية ذات غطاء مزدوج",
      "حزام سلسلة قابل للتعديل من الجلد والمعدن",
      "الأبعاد: ١٩.٥ × ٣٠ × ١٠ سم"
    ],
    imageUrl: "/brand/lookbook-tote.png",
    brandId: "chanel",
    relatedIds: ["hermes-birkin-30", "prada-galleria-tote"]
  },

  // --- PRADA ---
  {
    id: "prada-galleria-tote",
    title: "Prada Galleria Saffiano Bag",
    titleAr: "حقيبة برادا غاليريا الجلدية",
    category: "Beauty",
    categoryAr: "الجمال",
    slogan: "Structured elegance in signature Saffiano leather.",
    sloganAr: "أناقة هيكلية بجلد السافيانو المميز.",
    description: "Defined by its structured outline and cross-hatch Saffiano texture. Built with double zip compartments, rolled leather handles, and the iconic triangular enameled metal logo.",
    descriptionAr: "تتميز بهيكلها المنظم وملمس جلد السافيانو المتقاطع. تحتوي على مقصورتين بسحاب، ومقابض جلدية ملفوفة، وشعار برادا المثلث الكلاسيكي من المعدن المطلية بالمينا.",
    details: [
      "Signature cross-hatched Saffiano leather",
      "Double top handles and removable shoulder strap",
      "Two external zipper pockets, central open slot",
      "Enameled metal triangle logo",
      "Made in Italy"
    ],
    detailsAr: [
      "جلد السافيانو المخطط الحاصل على براءة اختراع",
      "مقابض علوية مزدوجة وحزام كتف قابل للإزالة",
      "جيبان خارجيان بسحاب، وفتحة مركزية مفتوحة",
      "شعار معدني مثلث مطلي بالمينا",
      "صنع في إيطاليا"
    ],
    imageUrl: "/brand/lookbook-tote.png",
    brandId: "prada",
    relatedIds: ["chanel-classic-flap-bag", "gucci-marmont-shoulder-bag"]
  },
  {
    id: "prada-nylon-backpack",
    title: "Prada Re-Nylon Minimalist Backpack",
    titleAr: "حقيبة ظهر برادا ري-نايلون",
    category: "Men",
    categoryAr: "الرجال",
    slogan: "Industrial utility meeting high-fashion codes.",
    sloganAr: "فائدة صناعية تلتقي برموز الموضة الراقية.",
    description: "Made from innovative regenerated ocean nylon fabrics with Saffiano leather details. Highly functional double front pockets and drawstring flap closure.",
    descriptionAr: "مصنوعة من ألياف النايلون المجددة المبتكرة من المحيطات مع تفاصيل من جلد السافيانو. تتميز بجيوب أمامية مزدوجة عملية وإغلاق برباط مع غطاء.",
    details: [
      "Eco-friendly Re-Nylon fabric",
      "Saffiano leather trims and straps",
      "Enameled metal triangle logo on flap",
      "Adjustable padded shoulder harness",
      "Two external buckle pockets"
    ],
    detailsAr: [
      "نسيج ري-نايلون صديق للبيئة",
      "حواف وأحزمة من جلد السافيانو",
      "شعار معدني مثلث مطلي بالمينا على الغطاء",
      "حمالات كتف مبطنة وقابلة للتعديل",
      "جيبان خارجيان بإبزيم"
    ],
    imageUrl: "/brand/lookbook-tote.png",
    brandId: "prada",
    relatedIds: ["adidas-y3-sneakers", "gucci-horsebit-loafers"]
  },
  {
    id: "prada-oversized-wool-coat",
    title: "Prada Oversized Cashmere Coat",
    titleAr: "معطف برادا الفاخر من الكشمير",
    category: "Women",
    categoryAr: "النساء",
    slogan: "Enveloping warmth in structured minimal silhouettes.",
    sloganAr: "دفء غامر في قصات بسيطة وهندسية.",
    description: "Tailored in a double-faced cashmere and virgin wool blend. Features drop shoulders, a broad notched lapel, and raw edge hand-stitch finishes for conceptual luxury.",
    descriptionAr: "مفصل من مزيج الكشمير ذي الوجهين والصوف البكر. يتميز بأكتاف منسدلة، وياقة عريضة مطوية، وحواف مخيطة يدوياً للفخامة الفكرية.",
    details: [
      "80% Virgin Wool, 20% Cashmere",
      "Double-breasted front closures",
      "Slightly oversized cocoon shape",
      "Deep welt side pockets",
      "Dry clean only"
    ],
    detailsAr: [
      "٨٠٪ صوف بكر، ٢٠٪ كشمير",
      "إغلاق أمامي مزدوج الصدر",
      "تصميم شرنقة فضفاض قليلاً",
      "جيوب جانبية عميقة",
      "تنظيف جاف فقط"
    ],
    imageUrl: "/assets/uploaded_products/product_7.png",
    brandId: "prada",
    relatedIds: ["chanel-tweed-jacket", "dior-bar-jacket"]
  },

  // --- GUCCI ---
  {
    id: "gucci-marmont-shoulder-bag",
    title: "Gucci GG Marmont Leather Bag",
    titleAr: "حقيبة كتف غوتشي جي جي مارمونت",
    category: "Beauty",
    categoryAr: "الجمال",
    slogan: "Vibrant matelassé leather with iconic double-G hardware.",
    sloganAr: "جلد مبطن نابض بالحياة مع إكسسوارات شعار GG الكلاسيكي.",
    description: "Features a soft, structured shape and a flap closure with Double G metal logo. The sliding chain strap can be worn as a shoulder strap or top handle.",
    descriptionAr: "تتميز بشكلها الناعم والمنظم وإغلاقها بغطاء مع شعار Double G المعدني. يمكن ارتداء حزام السلسلة المنزلق كحزام كتف أو مقبض علوي.",
    details: [
      "Chevron matelassé calfskin leather",
      "Antique gold-toned GG metal hardware",
      "Sliding chain shoulder strap with leather pad",
      "Microfiber lining with suede-like finish",
      "Made in Italy"
    ],
    detailsAr: [
      "جلد عجل مبطن بنمط متعرج",
      "إكسسوارات معدنية GG باللون الذهبي العتيق",
      "حزام كتف سلسلة منزلق مع وسادة جلدية",
      "بطانة من الألياف الدقيقة بلمسة نهائية تشبه الجلد المدبوغ",
      "صنع في إيطاليا"
    ],
    imageUrl: "/brand/lookbook-tote.png",
    brandId: "gucci",
    relatedIds: ["prada-galleria-tote", "chanel-classic-flap-bag"]
  },
  {
    id: "gucci-horsebit-loafers",
    title: "Gucci Classic Horsebit Loafers",
    titleAr: "حذاء لوفر غوتشي هورسبت الجلدي",
    category: "Men",
    categoryAr: "الرجال",
    slogan: "The definitive Florentine loafer since 1953.",
    sloganAr: "حذاء اللوفر الفلورنسي الأكثر تميزاً منذ عام ١٩٥٣.",
    description: "Crafted in premium black leather, detailed with the iconic metal Horsebit across the vamp. Soft leather back can be folded down to wear as a slipper.",
    descriptionAr: "مصنوع من الجلد الأسود الفاخر، ومزين بمعدن هورسبت الكلاسيكي عبر الجزء الأمامي. يمكن طي الجزء الخلفي الجلدي الناعم لارتدائه كخف.",
    details: [
      "100% fine Italian calfskin",
      "Gold-tone Horsebit metal detail",
      "Foldable heel counter for dual-wear",
      "Leather sole and lining",
      "Hand-stitched details"
    ],
    detailsAr: [
      "١٠٠٪ جلد عجل إيطالي فاخر",
      "تفاصيل معدنية ذهبية اللون لشعار هورسبت",
      "جزء خلفي قابل للطي للارتداء المزدوج",
      "نعل وبطانة من الجلد",
      "تفاصيل مخيطة يدوياً"
    ],
    imageUrl: "/assets/uploaded_products/product_2.png",
    brandId: "gucci",
    relatedIds: ["prada-nylon-backpack", "hermes-h-hour-watch"]
  },
  {
    id: "gucci-floral-silk-scarf",
    title: "Gucci Flora Print Silk Scarf",
    titleAr: "وشاح غوتشي الحريري بنقشة الزهور",
    category: "Women",
    categoryAr: "النساء",
    slogan: "Romantic botanical prints on hand-rolled Italian silk.",
    sloganAr: "طبعات نباتية رومانسية على حرير إيطالي ملتف يدوياً.",
    description: "A historic botanical print first created for Princess Grace of Monaco. Rendered on fluid, organic silk twill with colorful borders and hand-rolled edges.",
    descriptionAr: "طبعة نباتية تاريخية تم إنشاؤها لأول مرة لـ أميرة موناكو غريس. مقدمة على حرير مضلع عضوي انسيابي مع حواف ملونة وحواف ملتفة يدوياً.",
    details: [
      "100% Organic Silk Twill",
      "Historic multicolored Flora print",
      "Hand-rolled finished border edges",
      "Dimensions: 90 x 90 cm",
      "Made in Italy"
    ],
    detailsAr: [
      "١٠٠٪ حرير مضلع عضوي",
      "طبعة فلورا التاريخية متعددة الألوان",
      "حواف مطوية يدوياً بالكامل",
      "الأبعاد: ٩٠ × ٩٠ سم",
      "صنع في إيطاليا"
    ],
    imageUrl: "/assets/uploaded_products/product_4.png",
    brandId: "gucci",
    relatedIds: ["prada-oversized-wool-coat", "chanel-tweed-jacket"]
  },

  // --- DIOR ---
  {
    id: "dior-sauvage-elixir",
    title: "Dior Sauvage Elixir Parfum",
    titleAr: "عطر ديور سوفاج إكسير",
    category: "Beauty",
    categoryAr: "الجمال",
    slogan: "An raw, intoxicating concentration of wild spices.",
    sloganAr: "تركيز خام ومسكر من التوابل البرية.",
    description: "Sauvage Elixir is an extraordinarily concentrated fragrance steeped in the iconic freshness of Sauvage with an intoxicating heart of spices and organic lavender essence.",
    descriptionAr: "ديور سوفاج إكسير هو عطر مركز بشكل استثنائي غارق في نضارة سوفاج الكلاسيكية مع قلب مسكر من التوابل وخلاصة الخزامى العضوية.",
    details: [
      "Extraordinarily high fragrance concentration (Elixir)",
      "Key notes: Grapefruit, Cardamom, Nutmeg, Organic Lavender, Rich Woods",
      "Midnight blue lacquered glass bottle",
      "60ml spray bottle",
      "Made in France"
    ],
    detailsAr: [
      "عطر مركز بشكل استثنائي (إكسير)",
      "الروائح الأساسية: الجريب فروت، الهيل، جوزة الطيب، الخزامى العضوي، الأخشاب الغنية",
      "زجاجة مطلية باللون الأزرق الداكن",
      "بخاخ حجم ٦٠ مل",
      "صنع في فرنسا"
    ],
    imageUrl: "/assets/uploaded_products/product_6.png",
    brandId: "dior",
    relatedIds: ["chanel-no5-perfume", "hermes-birkin-30"]
  },
  {
    id: "dior-lady-dior-handbag",
    title: "Lady Dior Cannage Leather Bag",
    titleAr: "حقيبة كتف ليدي ديور الجلدية",
    category: "Beauty",
    categoryAr: "الجمال",
    slogan: "Architectural cannage quilting with metal charm accents.",
    sloganAr: "تطريز هندسي بارز مع لمسات ساحرة من الحلي المعدنية.",
    description: "The ultimate emblem of Dior elegance. Crafted in lambskin quilted with the iconic Cannage pattern, finished with swinging pale gold-finish DIOR charms.",
    descriptionAr: "شعار ديور النهائي للأناقة. مصنوعة من جلد الحمل المبطن بنقشة الكانيج الكلاسيكية، وتكتمل بحلي معدنية ذهبية متأرجحة تحمل أحرف ديور.",
    details: [
      "100% fine Cannage lambskin leather",
      "D.I.O.R. metal charms hanging on handles",
      "Removable chain shoulder strap included",
      "Internal zipper pocket and card compartments",
      "Dimensions: 17 x 20 x 8 cm"
    ],
    detailsAr: [
      "١٠٠٪ جلد حمل بنقشة كانيج الهندسية",
      "حلي معدنية معلقة تحمل حروف D.I.O.R",
      "تتضمن حزام كتف سلسلة قابل للإزالة",
      "جيب داخلي بسحاب ومقصورات للبطاقات",
      "الأبعاد: ١٧ × ٢٠ × ٨ سم"
    ],
    imageUrl: "/brand/lookbook-tote.png",
    brandId: "dior",
    relatedIds: ["hermes-birkin-30", "chanel-classic-flap-bag"]
  },
  {
    id: "dior-bar-jacket",
    title: "Dior Classic Bar Jacket",
    titleAr: "سترة ديور الكلاسيكية",
    category: "Women",
    categoryAr: "النساء",
    slogan: "The historic emblem of the New Look silhouette.",
    sloganAr: "الشعار التاريخي لمظهر النيو لوك الشهير.",
    description: "Tailored with structured padding that emphasizes a narrow waist and rounded hips. Crafted from premium double-woven wool and silk blend.",
    descriptionAr: "مفصلة بحشوة هيكلية تؤكد على الخصر النحيف والأرداف الدائرية. مصنوعة من مزيج فاخر من الصوف والحرير مزدوج النسج.",
    details: [
      "77% Wool, 23% Silk blend",
      "Structured architectural hip pads",
      "Notched lapels, fabric covered front buttons",
      "Silk crepe inner lining",
      "Dry clean only"
    ],
    detailsAr: [
      "مزيج ٧٧٪ صوف، ٢٣٪ حرير",
      "حشوة أكتاف وأرداف هيكلية",
      "ياقة مطوية، أزرار أمامية مغطاة بالقماش",
      "بطانة داخلية من حرير الكريب",
      "تنظيف جاف فقط"
    ],
    imageUrl: "/assets/uploaded_products/product_5.png",
    brandId: "dior",
    relatedIds: ["chanel-tweed-jacket", "prada-oversized-wool-coat"]
  },

  // --- SAINT LAURENT (YSL) ---
  {
    id: "ysl-tuxedo-suit",
    title: "Saint Laurent Classic Tuxedo Suit",
    titleAr: "بدلة تاكسيدو من سان لوران",
    category: "Men",
    categoryAr: "الرجال",
    slogan: "Sharp masculine tailoring reimagined for modern nights.",
    sloganAr: "خياطة رجالية حادة معاد تصورها لليالي العصرية.",
    description: "First introduced by YSL in 1966. Crafted in wool grain de poudre with satin peak lapels and flat-front trousers, projecting rebellious sophistication.",
    descriptionAr: "تم تقديمها لأول مرة بواسطة سان لوران في عام ١٩٦٦. مصنوعة من صوف غران دي بودر مع ياقة ساتان مدببة وسروال مسطح من الأمام، لتبرز الرقي المتمرد.",
    details: [
      "100% Wool Grain de Poudre fabric",
      "Satin peak lapels and side pant stripes",
      "Single-button jacket closure",
      "Silk satin inner lining",
      "Made in Italy"
    ],
    detailsAr: [
      "١٠٠٪ صوف حبيبي فاخر",
      "ياقة ساتان مدببة وخطوط جانبية للسروال",
      "إغلاق السترة بزر واحد",
      "بطانة داخلية من حرير الساتان",
      "صنع في إيطاليا"
    ],
    imageUrl: "/brand/modern-sophistication.png",
    brandId: "ysl",
    relatedIds: ["gucci-horsebit-loafers", "prada-nylon-backpack"]
  },
  {
    id: "ysl-sac-de-jour",
    title: "Saint Laurent Sac de Jour Bag",
    titleAr: "حقيبة سان لوران ساك دو جور",
    category: "Beauty",
    categoryAr: "الجمال",
    slogan: "Sleek, minimalist accordion structure in fine calfskin.",
    sloganAr: "هيكل أكورديون أنيق وبسيط من جلد العجل الفاخر.",
    description: "Defined by its rigid frame, tubular leather handles, and expandable accordion sides. A signature statement of quiet elegance.",
    descriptionAr: "تتميز بإطارها الصلب، ومقابضها الجلدية الملفوفة، وجوانبها الأكورديون القابلة للتوسيع. قطعة مميزة تدل على الأناقة الهادئة.",
    details: [
      "100% fine grained calfskin leather",
      "Tubular leather top handles and removable shoulder strap",
      "Accordion side panels with compression straps",
      "Removable padlock with leather sheath",
      "Made in Italy"
    ],
    detailsAr: [
      "١٠٠٪ جلد عجل ناعم ومحبب",
      "مقابض علوية جلدية ملفوفة وحزام كتف قابل للإزالة",
      "ألواح جانبية أكورديون مع أحزمة ضغط",
      "قفل قابل للإزالة مع غلاف جلدي",
      "صنع في إيطاليا"
    ],
    imageUrl: "/brand/lookbook-tote.png",
    brandId: "ysl",
    relatedIds: ["prada-galleria-tote", "gucci-marmont-shoulder-bag"]
  },

  // --- HERMÈS ---
  {
    id: "hermes-birkin-30",
    title: "Hermès Birkin 30 Togo Leather Bag",
    titleAr: "حقيبة هيرميس بيركين ٣٠ الجلدية",
    category: "Beauty",
    categoryAr: "الجمال",
    slogan: "The ultimate peak of equestrian leather artistry.",
    sloganAr: "الذروة النهائية لفنون الجلود المستوحاة من الفروسية.",
    description: "Crafted in Togo calfskin, featuring rolled leather handles, a flap top, and the legendary sangles straps secured by a palladium metal turn-lock.",
    descriptionAr: "مصنوعة من جلد عجل توغو الفاخر، وتتميز بمقابض جلدية ملفوفة، وغطاء علوي، وأحزمة سانغل الأسطورية المثبتة بقفل دوار من البلاديوم.",
    details: [
      "Fine Togo calfskin leather (scratch-resistant)",
      "Polished palladium-finish metal hardware",
      "Double top handles and central lock closure",
      "Hand-sewn saddle stitching",
      "Includes key clochette, padlock, and dust bag"
    ],
    detailsAr: [
      "جلد عجل توغو ناعم (مقاوم للخدش)",
      "إكسسوارات معدنية مصقولة مطلية بالبلاديوم",
      "مقابض علوية مزدوجة وقفل مركزي دوار",
      "خياطة سرج مخيطة يدوياً بالكامل",
      "تتضمن كلوشيت مفاتيح وقفل وحقيبة غبار"
    ],
    imageUrl: "/brand/lookbook-tote.png",
    brandId: "hermes",
    relatedIds: ["chanel-classic-flap-bag", "dior-lady-dior-handbag"]
  },
  {
    id: "hermes-h-hour-watch",
    title: "Hermès H-Hour Watch",
    titleAr: "ساعة هيرميس إتش-أور الجلدية",
    category: "Men",
    categoryAr: "الرجال",
    slogan: "Iconic H-shaped steel case with hand-stitched strap.",
    sloganAr: "علبة فولاذية مميزة على شكل حرف H مع حزام مخيط يدوياً.",
    description: "Designed by Philippe Mouquet in 1996. Featuring an iconic H-shaped steel bezel enclosing a white dial with sunburst stamping and a swift calfskin leather strap.",
    descriptionAr: "صممها فيليب موكيه عام ١٩٩٦. تتميز بإطار فولاذي مميز على شكل حرف H يحيط بميناء أبيض منقوش بنقشة أشعة الشمس وحزام جلدي ناعم.",
    details: [
      "Swiss-made quartz movement",
      "30.5mm steel H-shaped case bezel",
      "Scratch-resistant sapphire crystal glass",
      "Double-wrap swift calfskin leather strap",
      "Water resistant to 3 bar"
    ],
    detailsAr: [
      "حركة كوارتز سويسرية الصنع",
      "علبة فولاذية قياس ٣٠.٥ مم على شكل حرف H",
      "زجاج كريستال ياقوتي مقاوم للخدش",
      "حزام جلدي ناعم يلتف حول المعصم",
      "مقاومة للماء حتى عمق ٣٠ متراً"
    ],
    imageUrl: "/brand/signature-accents.png",
    brandId: "hermes",
    relatedIds: ["gucci-horsebit-loafers", "ysl-tuxedo-suit"]
  },
  {
    id: "hermes-porcelain-plate",
    title: "Hermès Carnets d'Equateur Plate",
    titleAr: "طبق هيرميس من البورسلان الفاخر",
    category: "Home & Deco",
    categoryAr: "المنزل والديكور",
    slogan: "Wild equatorial flora and fauna painted on fine porcelain.",
    sloganAr: "نباتات وحيوانات استوائية برية مرسومة على البورسلان الفاخر.",
    description: "Designed by naturalist artist Robert Dallet. Features detailed illustrations of jaguars and parrots on white porcelain bordered by a fine gold outline.",
    descriptionAr: "صممه الفنان الطبيعي روبرت داليت. يتميز برسومات توضيحية مفصلة للنمور والببغاوات على البورسلان الأبيض المحاط بإطار ذهبي رقيق.",
    details: [
      "Limoges fine white porcelain",
      "Hand-painted 24-carat gold border trim",
      "Scratch-resistant enamel glazing",
      "Dimensions: Diameter 21cm",
      "Made in France"
    ],
    detailsAr: [
      "بورسلان ليموج أبيض فاخر",
      "حافة ذهبية عيار ٢٤ قيراطاً مطلية يدوياً",
      "طلاء مينا مقاوم للخدش",
      "الأبعاد: القطر ٢١ سم",
      "صنع في فرنسا"
    ],
    imageUrl: "/brand/honey.png",
    brandId: "hermes",
    relatedIds: ["hermes-h-hour-watch", "chanel-tweed-jacket"]
  },

  // --- ADIDAS ---
  {
    id: "adidas-y3-sneakers",
    title: "Adidas Y-3 Qasa High Sneakers",
    titleAr: "حذاء أديداس Y-3 الرياضي",
    category: "Men",
    categoryAr: "الرجال",
    slogan: "Avant-garde tubular design with neo-futurist bands.",
    sloganAr: "تصميم أنبوبي طليعي مع أحزمة مستقبلية حديثة.",
    description: "Designed in collaboration with Yohji Yamamoto. Built on a signature tubular outsole with elastic straps wrapping around a neoprene sock upper.",
    descriptionAr: "تم تصميمه بالتعاون مع يوجي ياماموتو. يرتكز على نعل خارجي أنبوبي مميز مع أحزمة مرنة تلتف حول جزء علوي من النيوبرين.",
    details: [
      "Neoprene sock upper with elastic straps",
      "Leather toe cap and heel counter details",
      "Yohji Yamamoto brand name on strap",
      "Tubular EVA sole cushion",
      "High-top sneaker construction"
    ],
    detailsAr: [
      "جزء علوي من النيوبرين مع أحزمة مرنة",
      "تفاصيل مقدمة الحذاء وكعب جلدي",
      "اسم العلامة التجارية يوجي ياماموتو على الحزام",
      "نعل أنبوبي مبطن خفيف الوزن",
      "تصميم حذاء رياضي مرتفع الكاحل"
    ],
    imageUrl: "/assets/uploaded_products/product_2.png",
    brandId: "adidas",
    relatedIds: ["adidas-originals-track-jacket", "prada-nylon-backpack"]
  },
  {
    id: "adidas-originals-track-jacket",
    title: "Adidas Originals Firebird Track Jacket",
    titleAr: "سترة أديداس أوريجينالز الرياضية",
    category: "Men",
    categoryAr: "الرجال",
    slogan: "Classic athletic heritage re-woven in recycled fibers.",
    sloganAr: "تراث رياضي كلاسيكي معاد حياكته بألياف معاد تدويرها.",
    description: "A reissue of the definitive 1980s sportswear jacket. Made from heavy tricot fabric, finished with the iconic three stripes running down the sleeves.",
    descriptionAr: "إعادة إصدار لسترة الملابس الرياضية الكلاسيكية من فترة الثمانينيات. مصنوعة من نسيج التريكو الثقيل، ومزينة بالخطوط الثلاثة المميزة على طول الأكمام.",
    details: [
      "100% recycled polyester tricot",
      "Stand-up mock collar and full zip closure",
      "Embroidered Trefoil logo on chest",
      "Ribbed cuffs and hemline",
      "Zipper pocket enclosures"
    ],
    detailsAr: [
      "١٠٠٪ تريكو بوليستر معاد تدويره",
      "ياقة مرتفعة وإغلاق بسحاب كامل",
      "شعار تريفويل مطرز على الصدر",
      "أطراف أكمام وحاشية مضلعة",
      "جيوب جانبية بسحاب"
    ],
    imageUrl: "/assets/uploaded_products/product_3.png",
    brandId: "adidas",
    relatedIds: ["adidas-y3-sneakers", "gucci-horsebit-loafers"]
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByBrandId(brandId: string): Product[] {
  return products.filter((product) => product.brandId === brandId);
}

export function getAllProducts(): Product[] {
  return products;
}
