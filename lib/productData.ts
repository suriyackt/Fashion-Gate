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
}

export const products: Product[] = [
  // Designer Collections (Designer Collections)
  {
    id: "the-silk-trench-coat",
    title: "The Silk Trench Coat",
    titleAr: "معطف الخندق الحريري",
    category: "Designer Collections",
    categoryAr: "الملابس الجاهزة",
    slogan: "Timeless elegance for the modern observer.",
    sloganAr: "أناقة خالدة للمراقب العصري.",
    description: "Crafted from double-woven Damascus silk blend, featuring hand-finished horn buttons and a relaxed, draped silhouette. A luxury piece that transitions effortlessly across seasons.",
    descriptionAr: "مصنوع من مزيج الحرير الدمشقي مزدوج النسج، ويتميز بأزرار قرنية مشطبة يدوياً وتصميم مريح منسدل. قطعة فاخرة تتنقل بجهد يسير عبر الفصول.",
    details: [
      "70% Damascus Silk, 30% Egyptian Cotton",
      "Hand-finished horn buttons",
      "Storm flap and belted cuffs",
      "Made in our boutique Damascus atelier",
      "Dry clean only"
    ],
    detailsAr: [
      "٧٠٪ حرير دمشقي، ٣٠٪ قطن مصري",
      "أزرار قرنية مشطبة يدوياً",
      "غطاء حماية من الرياح وحلقات حزام للمعصم",
      "صنع في ورشة عمل بوتيك دمشق الخاصة بنا",
      "تنظيف جاف فقط"
    ],
    imageUrl: "/brand/lookbook-trench.png",
    relatedIds: ["structured-wool-blazer", "signature-tweed-jacket"]
  },
  {
    id: "structured-wool-blazer",
    title: "Structured Wool Blazer",
    titleAr: "سترة الصوف الهندسية",
    category: "Designer Collections",
    categoryAr: "الملابس الجاهزة",
    slogan: "Sharp lines defining modern architectural form.",
    sloganAr: "خطوط حادة تحدد الشكل المعماري الحديث.",
    description: "Tailored from premium Syrian raw wool with structured shoulders and a cinched waist. A piece combining classical rigor with contemporary style.",
    descriptionAr: "مفصل من الصوف السوري الخام الفاخر مع أكتاف محددة وخصر مزموم. قطعة تجمع بين الدقة الكلاسيكية والأسلوب المعاصر.",
    details: [
      "100% Syrian Raw Wool",
      "Silk satin inner lining",
      "Double-breasted front closure",
      "Structured shoulder pads",
      "Hand-stitched lapels"
    ],
    detailsAr: [
      "١٠٠٪ صوف سوري خام",
      "بطانة داخلية من حرير الساتان",
      "إغلاق أمامي مزدوج الصدر",
      "وسادات كتف مبطنة",
      "ياقة مخيطة يدوياً"
    ],
    imageUrl: "/brand/blazer.png",
    relatedIds: ["the-silk-trench-coat", "signature-tweed-jacket"]
  },
  {
    id: "signature-tweed-jacket",
    title: "Signature Tweed Jacket",
    titleAr: "سترة التويد الكلاسيكية",
    category: "Designer Collections",
    categoryAr: "الملابس الجاهزة",
    slogan: "Tactile relief and rich heritage weaves.",
    sloganAr: "ملمس بارز ونسيج غني بالتراث.",
    description: "An open-front boxy jacket woven in a custom black and orange grid weave, detailed with frayed edges and brushed brass buttons.",
    descriptionAr: "سترة مربعة مفتوحة من الأمام منسوجة بنسيج شبكي مخصص باللونين الأسود والبرتقالي، ومزينة بحواف منسلة وأزرار نحاسية مصقولة.",
    details: [
      "Hand-woven wool and silk tweed",
      "Brushed brass crest buttons",
      "Fringed cuffs and hemline",
      "Cropped boxy fit",
      "Dry clean only"
    ],
    detailsAr: [
      "تويد من الصوف والحرير المنسوج يدوياً",
      "أزرار نحاسية مصقولة تحمل شعاراً",
      "أطراف أكمام وحاشية شراشيب",
      "قصة مربعة قصيرة",
      "تنظيف جاف فقط"
    ],
    imageUrl: "/brand/lookbook-trench.png",
    relatedIds: ["the-silk-trench-coat", "structured-wool-blazer"]
  },

  // Beauty & Accessories (Luxury Accessories & Beauty)
  {
    id: "cedar-and-amber-extract",
    title: "Cedar & Amber Extract",
    titleAr: "خلاصة الأرز والعنبر",
    category: "Beauty & Accessories",
    categoryAr: "موسم الجمال",
    slogan: "An olfactory tribute to the ancient Damascus night.",
    sloganAr: "تحية عطرية لليل دمشق القديمة.",
    description: "An intense, premium parfum built on native Lebanese cedarwood, warm Syrian amber, and hand-harvested Damascus jasmine absolute. Rich, deep, and deeply personal.",
    descriptionAr: "عطر مركز وفاخر يعتمد على خشب الأرز اللبناني الأصيل، والعنبر السوري الدافئ، وخلاصة ياسمين دمشق المقطوف يدوياً. غني وعميق وشخصي للغاية.",
    details: [
      "High concentration Extrait de Parfum",
      "Top Notes: Syrian Jasmine, Bergamot",
      "Heart Notes: Lebanese Cedarwood, Patchouli",
      "Base Notes: Warm Amber, Madagascar Vanilla",
      "Presented in a hand-blown glass vial"
    ],
    detailsAr: [
      "تركيز عالٍ من خلاصة العطر (Extrait de Parfum)",
      "المكونات العليا: الياسمين السوري، البرغموت",
      "المكونات الوسطى: خشب الأرز اللبناني، الباتشولي",
      "المكونات الأساسية: العنبر الدافئ، فانيليا مدغشقر",
      "مقدم في زجاجة منفوخة يدوياً"
    ],
    imageUrl: "/brand/lookbook-scent.png",
    relatedIds: ["damascene-jasmine-oil", "the-architectural-tote"]
  },
  {
    id: "damascene-jasmine-oil",
    title: "Damascene Jasmine Oil",
    titleAr: "زيت الياسمين الدمشقي",
    category: "Beauty & Accessories",
    categoryAr: "موسم الجمال",
    slogan: "The sensory soul of the jasmine city.",
    sloganAr: "الروح الحسية لمدينة الياسمين.",
    description: "An exquisite pure oil extract distilled from wild white jasmine blossoms picked at sunrise along the Damascus city walls. Pure, sweet, and capturing timeless heritage.",
    descriptionAr: "مستخلص زيت نقي رائع ومقطر من زهور الياسمين الأبيض البري المقطوفة عند شروق الشمس على طول أسوار مدينة دمشق. نقي وحلو ويجسد التراث الخالد.",
    details: [
      "100% Pure jasmine absolute distillation",
      "Cold-pressed base carrier oils",
      "Soothing skin and aromatherapy benefits",
      "Alcohol-free and natural formulation",
      "Housed in a signature brass dropper bottle"
    ],
    detailsAr: [
      "تقطير ياسمين نقي ١٠٠٪",
      "زيوت ناقلة أساسية معصورة على البارد",
      "فوائد مهدئة للبشرة والعلاج بالعطور",
      "تركيبة طبيعية خالية من الكحول",
      "معبأ في زجاجة قطارة نحاسية مميزة"
    ],
    imageUrl: "/brand/jasmine-oil.png",
    relatedIds: ["cedar-and-amber-extract", "the-architectural-tote"]
  },
  {
    id: "the-architectural-tote",
    title: "The Architectural Tote",
    titleAr: "حقيبة اليد الهندسية",
    category: "Beauty & Accessories",
    categoryAr: "موسم الجمال",
    slogan: "Structured form meets sensory texture.",
    sloganAr: "الشكل الهندسي يلتقي بالملمس الحسي.",
    description: "Full-grain calfskin leather, hand-stitched by master leather artisans, featuring brushed brass hardware inspired by ancient Damascene arches and gateway columns.",
    descriptionAr: "جلد عجل طبيعي بالكامل، مخيط يدوياً بواسطة كبار حرفيي الجلود، يتميز بإكسسوارات نحاسية مصقولة مستوحاة من الأقواس الدمشقية القديمة وأعمدة البوابات التاريخية.",
    details: [
      "100% Full-grain calfskin leather",
      "Solid brushed brass buckles",
      "Internal suede lining with zip compartment",
      "Reinforced top handles and detachable shoulder strap",
      "Dimensions: 36cm x 28cm x 14cm"
    ],
    detailsAr: [
      "١٠٠٪ جلد عجل طبيعي بالكامل",
      "إبزيم نحاسي صلب مصقول",
      "بطانة داخلية من الجلد السويدي مع جيب بسحاب",
      "مقابض علوية معززة وحزام كتف قابل للفصل",
      "الأبعاد: ٣٦ سم × ٢٨ سم × ١٤ سم"
    ],
    imageUrl: "/brand/lookbook-tote.png",
    relatedIds: ["cedar-and-amber-extract", "damascene-jasmine-oil"]
  },

  // Gourmet & Fine Foods (Gourmet & Gifting)
  {
    id: "damascene-rose-nougat",
    title: "Damascene Rose Nougat",
    titleAr: "نوجا الورد الدمشقي",
    category: "Gourmet & Fine Foods",
    categoryAr: "متجر الأطعمة الراقية والهدايا",
    slogan: "A sweet legacy of heritage and refinement.",
    sloganAr: "إرث حلو من العراقة والرقي.",
    description: "Artisanal mountain honey nougat infused with organic Damascene rosewater, wild Syrian saffron threads, and roasted green pistachios. Wrapped in premium textured gold foil.",
    descriptionAr: "نوجا عسل الجبل الحرفية الممزوجة بماء الورد الدمشقي العضوي، وخيوط الزعفران السوري البري، والفستق الحلبي الأخضر المحمص. مغلفة بورق ذهبي فاخر محكم.",
    details: [
      "100% Natural mountain honey base",
      "Infused with organic Damascene rose petals",
      "Premium wild saffron threads",
      "No artificial preservatives or additives",
      "Presented in a lacquer gifting box"
    ],
    detailsAr: [
      "١٠٠٪ قاعدة عسل جبلي طبيعي",
      "ممزوج ببتلات الورد الدمشقي العضوي",
      "خيوط الزعفران البري الفاخر",
      "خالٍ من المواد الحافظة أو المضافات الصناعية",
      "مقدم في علبة هدايا مطلية فاخرة"
    ],
    imageUrl: "/brand/lookbook-nougat.png",
    relatedIds: ["saffron-blossom-honey", "artisanal-truffle-oil"]
  },
  {
    id: "saffron-blossom-honey",
    title: "Saffron Blossom Honey",
    titleAr: "عسل زهر الزعفران",
    category: "Gourmet & Fine Foods",
    categoryAr: "متجر الأطعمة الراقية والهدايا",
    slogan: "Liquid gold from high Syrian valleys.",
    sloganAr: "ذهب سائل من الوديان السورية المرتفعة.",
    description: "Rare single-origin wildflower honey harvested from hives in high-altitude Syrian valleys during the autumn saffron crocus blossom. Infused with whole saffron threads.",
    descriptionAr: "عسل نادر أحادي المنشأ من الزهور البرية، يتم جنيها من خلايا النحل في الوديان السورية المرتفعة خلال موسم تفتح زهور الزعفران في الخريف. ممزوج بخيوط الزعفران الكاملة.",
    details: [
      "Raw, unpasteurized high-mountain honey",
      "Infused with premium saffron threads",
      "Rich floral and spicy flavor notes",
      "Rich in natural antioxidants",
      "Housed in a custom octagonal jar"
    ],
    detailsAr: [
      "عسل جبلي خام غير مبستر",
      "ممزوج بخيوط الزعفران الفاخرة",
      "نكهة غنية بالزهور والتوابل",
      "غني بمضادات الأكسدة الطبيعية",
      "معبأ في مرطبان مثمن مخصص"
    ],
    imageUrl: "/brand/honey.png",
    relatedIds: ["damascene-rose-nougat", "artisanal-truffle-oil"]
  },
  {
    id: "artisanal-truffle-oil",
    title: "Artisanal Truffle Oil",
    titleAr: "زيت الكمأة الحرفي",
    category: "Gourmet & Fine Foods",
    categoryAr: "متجر الأطعمة الراقية والهدايا",
    slogan: "The rare scent of Syrian desert soil.",
    sloganAr: "الرائحة النادرة للتربة السورية الصحراوية.",
    description: "Cold-pressed extra virgin olive oil from ancient groves, infused with rare desert truffles (Kama'a) harvested by hand in the Syrian steppe.",
    descriptionAr: "زيت زيتون بكر ممتاز معصور على البارد من بساتين عتيقة، ممزوج بالكمأة الصحراوية النادرة (الكمأ) التي يتم جنيها يدوياً في البادية السورية.",
    details: [
      "First cold-pressed olive oil base",
      "Infused with black desert truffle extract",
      "Intense earthy aroma and flavor",
      "Perfect for finishing luxury dishes",
      "Presented in a dark glass bottle"
    ],
    detailsAr: [
      "قاعدة زيت زيتون بكر ممتاز معصور على البارد",
      "ممزوج بمستخلص الكمأة الصحراوية السوداء",
      "نكهة ورائحة ترابية مكثفة",
      "مثالي للمسات الأخيرة للأطباق الفاخرة",
      "مقدم في زجاجة داكنة تحمي النكهة"
    ],
    imageUrl: "/brand/lookbook-nougat.png",
    relatedIds: ["damascene-rose-nougat", "saffron-blossom-honey"]
  },
  {
    id: "boss-hugo-boss-polo",
    title: "BOSS Hugo Boss Polo",
    titleAr: "قميص بولو هوجو بوس المميز",
    category: "Designer Collections",
    categoryAr: "الملابس الجاهزة",
    slogan: "An understated statement of contemporary elegance.",
    sloganAr: "تعبير بسيط عن الأناقة المعاصرة.",
    description: "Premium cotton pique knit polo shirt featuring a subtle tipped collar and cuffs, embroidered logo, and regular fit. Crafted for style observers.",
    descriptionAr: "قميص بولو من نسيج بيكيه القطني المميز يتميز بياقة وأكمام مقلمة بدقة، وشعار مطرز، وقصة مريحة. مصمم لمراقبي الموضة.",
    details: [
      "100% Premium mercerized pique cotton",
      "Signature tipped collar design",
      "Embroidered BOSS crest on chest",
      "Two-button front placket",
      "Imported and hand-steamed"
    ],
    detailsAr: [
      "١٠٠٪ قطن بيكيه ناعم مميز",
      "تصميم ياقة مقلم مميز",
      "شعار بوس مطرز على الصدر",
      "مجموعة أزرار ثنائية",
      "مستورد ومكوي بالبخار يدوياً"
    ],
    imageUrl: "/assets/uploaded_products/product_1.png",
    relatedIds: ["adidas-originals-sportswear", "fgb-modern-tailored-blazer", "fgb-silk-oversized-shirt"]
  },
  {
    id: "fgb-urban-active-footwear",
    title: "FGB Urban Active Footwear",
    titleAr: "حذاء إف جي بي الرياضي الحضري",
    category: "Beauty & Accessories",
    categoryAr: "موسم الجمال",
    slogan: "Where street culture meets high-end craftsmanship.",
    sloganAr: "حيث تلتقي ثقافة الشارع مع الحرفية العالية.",
    description: "Luxurious activewear footwear constructed with soft grain overlays, premium lining, and high-traction rubber outsoles. Tailored for urban promenades.",
    descriptionAr: "حذاء رياضي فاخر مصمم بطبقات ناعمة محببة وبطانة ممتازة ونعل مطاطي عالي الثبات. مصمم للتنزه في المدينة.",
    details: [
      "Premium full-grain leather and suede overlays",
      "High-traction gum rubber cupsole",
      "Cushioned memory foam insole",
      "Hand-painted edge details",
      "Made in limited quantities"
    ],
    detailsAr: [
      "طبقات جلدية سويدية طبيعية فاخرة",
      "نعل مطاطي متين عالي الثبات",
      "نعل داخلي مبطن بأسفنج الذاكرة",
      "تفاصيل حواف مصبوغة يدوياً",
      "صنع بكميات محدودة جداً"
    ],
    imageUrl: "/assets/uploaded_products/product_2.png",
    relatedIds: ["the-architectural-tote", "damascene-jasmine-oil"]
  },
  {
    id: "adidas-originals-sportswear",
    title: "Adidas Originals Sportswear",
    titleAr: "ملابس رياضية أديداس أوريجينالز",
    category: "Designer Collections",
    categoryAr: "الملابس الجاهزة",
    slogan: "Heritage athletic details reimagined in bold color.",
    sloganAr: "تفاصيل رياضية تراثية أُعيد صياغتها بألوان جريئة.",
    description: "Classic Adidas track sportswear set in brilliant red and green, styled with the iconic triple stripe accents and ribbed cuffs.",
    descriptionAr: "طقم رياضي كلاسيكي من أديداس باللونين الأحمر والأخضر الجريئين، مزين بالخطوط الثلاثة الأيقونية وأطراف أكمام مضلعة.",
    details: [
      "100% Recycled polyester satin weave",
      "Iconic triple stripes down sleeves and legs",
      "Embroidered Trefoil logo on chest",
      "Ribbed crewneck and waistband",
      "Athletic relaxed silhouette"
    ],
    detailsAr: [
      "١٠٠٪ بوليستر معاد تدويره من نسج الساتان",
      "الخطوط الثلاثة الأيقونية على الأكمام والأرجل",
      "شعار أديداس مطرز على الصدر",
      "ياقة وحزام خصر مضلعين",
      "قصة رياضية مريحة"
    ],
    imageUrl: "/assets/uploaded_products/product_3.png",
    relatedIds: ["boss-hugo-boss-polo", "fgb-modern-tailored-blazer", "fgb-silk-oversized-shirt"]
  },
  {
    id: "fgb-white-lace-midi-dress",
    title: "FGB White Lace Midi Dress",
    titleAr: "فستان الدانتيل الأبيض من إف جي بي",
    category: "Designer Collections",
    categoryAr: "الملابس الجاهزة",
    slogan: "Delicate architectural lines in pure ivory lace.",
    sloganAr: "خطوط معمارية دقيقة من الدانتيل العاجي النقي.",
    description: "An exquisite midi dress featuring intricate white floral lace patterns, structured puff sleeves, and a tiered skirt silhouette.",
    descriptionAr: "فستان ميدي رائع يتميز بنقوش دانتيل زهرية بيضاء معقدة، وأكمام منفوخة، وتصميم تنورة متدرجة الطبقات.",
    details: [
      "100% Organic floral lace pattern",
      "Puff sleeves with elasticized cuffs",
      "Full inner lining in silk crepe",
      "Hidden zipper at center back",
      "Hand-finished edge details"
    ],
    detailsAr: [
      "١٠٠٪ دانتيل زهري عضوي نقي",
      "أكمام منفوخة بأطراف مرنة",
      "بطانة كاملة من كريب الحرير الناعم",
      "سحاب خلفي مخفي في المنتصف",
      "تفاصيل حواف مشطبة يدوياً"
    ],
    imageUrl: "/assets/uploaded_products/product_4.png",
    relatedIds: ["fgb-silk-oversized-shirt", "the-silk-trench-coat"]
  },
  {
    id: "fgb-modern-tailored-blazer",
    title: "FGB Modern Tailored Blazer",
    titleAr: "سترة بليزر إف جي بي العصرية",
    category: "Designer Collections",
    categoryAr: "الملابس الجاهزة",
    slogan: "Structural elegance in deep midnight black.",
    sloganAr: "أناقة هيكلية باللون الأسود الداكن.",
    description: "Double-breasted unstructured blazer tailored from linen-cotton blend, with notched lapels and flap pockets for a relaxed, modern drape.",
    descriptionAr: "سترة بليزر مزدوجة الصدر غير مبطنة مفصلة من مزيج الكتان والقطن، مع ياقة مدببة وجيوب ذات غطاء لانسدال مريح وعصري.",
    details: [
      "Linen and cotton breathable blend",
      "Notched lapels with double-breasted closure",
      "Two front flap pockets, one chest pocket",
      "Unlined interior for a light summer drape",
      "Hand-finished inner seams"
    ],
    detailsAr: [
      "مزيج كتان وقطن خفيف ومسامي",
      "ياقة مدببة مع إغلاق مزدوج الصدر",
      "جيبان أماميان بفتحات وجيب صدر واحد",
      "غير مبطن من الداخل لانسدال خفيف ومناسب للصيف",
      "طبقات داخلية مشطبة يدوياً"
    ],
    imageUrl: "/assets/uploaded_products/product_5.png",
    relatedIds: ["boss-hugo-boss-polo", "adidas-originals-sportswear", "structured-wool-blazer"]
  },
  {
    id: "si-passione-giorgio-armani-perfume",
    title: "Sì Passione Giorgio Armani Perfume",
    titleAr: "عطر سي باسيون من جورجيو أرماني",
    category: "Beauty & Accessories",
    categoryAr: "موسم الجمال",
    slogan: "An intense, uncompromising scent for the passionate woman.",
    sloganAr: "عطر مركز لا يقبل المساومة للمرأة الشغوفة.",
    description: "Sì Passione by Giorgio Armani is an olfactory masterpiece highlighting red currant, spicy pink pepper, rose petals, and jasmine absolute.",
    descriptionAr: "عطر سي باسيون من جيورجيو أرماني هو تحفة عطرية تبرز الكشمش الأحمر، والفلفل الوردي الحار، وبتلات الورد، وخلاصة الياسمين.",
    details: [
      "100ml Eau de Parfum Intense",
      "Top Notes: Pear, Blackcurrant, Pink Pepper",
      "Heart Notes: Rose Absolute, Heliotrope, Jasmine",
      "Base Notes: Cedarwood, Vanilla Extract",
      "Signature lacquered red bottle design"
    ],
    detailsAr: [
      "زجاجة ١٠٠ مل ماء عطر مركز (Eau de Parfum)",
      "المكونات العليا: الإجاص، الكشمش الأسود، الفلفل الوردي",
      "المكونات الوسطى: بتلات الورد، الهليوتروب، الياسمين",
      "المكونات الأساسية: خشب الأرز، خلاصة الفانيليا الدافئة",
      "زجاجة حمراء مطلية مميزة للغاية"
    ],
    imageUrl: "/assets/uploaded_products/product_6.png",
    relatedIds: ["cedar-and-amber-extract", "damascene-jasmine-oil"]
  },
  {
    id: "fgb-silk-oversized-shirt",
    title: "FGB Silk Oversized Shirt",
    titleAr: "قميص حريري واسع من إف جي بي",
    category: "Designer Collections",
    categoryAr: "الملابس الجاهزة",
    slogan: "Effortless luxury in flowing damask silk.",
    sloganAr: "فخامة سهلة في حرير دمشقي منساب.",
    description: "Designed for a loose, oversized fit with dropped shoulders, patch pockets, and a classic pointed collar. Hand-dyed for depth of tone.",
    descriptionAr: "مصمم بقصة واسعة فضفاضة مع أكتاف منسدلة وجيوب رقعة وياقة مدببة كلاسيكية. مصبوغ يدوياً لعمق في اللون.",
    details: [
      "100% Pure Damask Silk",
      "Oversized silhouette with dropped shoulders",
      "Two front buttoned patch pockets",
      "Mother-of-pearl buttons",
      "Delicate hand-rolled hems"
    ],
    detailsAr: [
      "١٠٠٪ حرير دمشقي نقي",
      "قصة فضفاضة بأكتاف منسدلة",
      "جيبان أماميان بأزرار",
      "أزرار من عرق اللؤلؤ الطبيعي",
      "حواشٍ ملفوعة يدوياً بعناية"
    ],
    imageUrl: "/assets/uploaded_products/product_7.png",
    relatedIds: ["fgb-white-lace-midi-dress", "the-silk-trench-coat", "signature-tweed-jacket"]
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}
