export const fallbackSettings = {
  title: "Fashion Gate",
  tagline: "On Boulevard. For the world.",
  primaryColor: "#CB6116",
  accentColor: "#D06010",
  headingFont: "Apple Garamond",
  bodyFont: "Cairo",
  socialLabel: "Instagram",
  socialUrl: "#",
  navigation: [
    { label: "Women", anchor: "#women", order: 0 },
    { label: "Men", anchor: "#men", order: 1 },
    { label: "Beauty", anchor: "#beauty", order: 2 },
    { label: "Home & Deco", anchor: "#home-deco", order: 3 },
    { label: "Dining", anchor: "dining", order: 4 }
  ],
  cookieConsent: {
    enabled: true,
    message: {
      en: "We use cookies on this site to enhance your user experience. By your continued use of this site you accept our terms and condition.",
      ar: "نستخدم ملفات تعريف الارتباط على هذا الموقع لتحسين تجربة المستخدم الخاصة بك. بمواصلة استخدامك لهذا الموقع، فإنك تقبل الشروط والأحكام الخاصة بنا."
    },
    acceptAllText: { en: "Accept All", ar: "قبول الكل" },
    rejectAllText: { en: "Reject All", ar: "رفض الكل" },
    customizeText: { en: "Customize", ar: "تخصيص الخيارات" },
    hidePreferencesText: { en: "Hide Preferences", ar: "إخفاء التفضيلات" },
    savePreferencesText: { en: "Save Preferences", ar: "حفظ التفضيلات" },
    necessaryLabel: { en: "Necessary (Always Required)", ar: "ضرورية (مطلوبة دائماً)" },
    necessaryDesc: {
      en: "Required for core security, language preferences, and essential navigation features.",
      ar: "تُستخدم لتأمين الموقع وحفظ تفضيلات اللغة والخدمات الأساسية للكونسيرج."
    },
    analyticsLabel: { en: "Analytics & Performance", ar: "التحليلات والأداء" },
    analyticsDesc: {
      en: "Allows us to track traffic sources and understand which luxury boutique pages are visited most frequently.",
      ar: "تساعدنا في تتبع عدد زيارات المتجر، وتحليل تفاعل الزوار مع العلامات التجارية الفاخرة."
    },
    marketingLabel: { en: "Marketing & Personalization", ar: "التسويق والتخصيص" },
    marketingDesc: {
      en: "Used to offer personalized notices regarding private trunk shows, store openings, and client events.",
      ar: "تُستخدم لعرض اقتراحات مخصصة حول الفعاليات، وافتتاح العلامات الجديدة، والعروض الحصرية."
    }
  }
};

export const fallbackSections = [
  {
    _id: "hero",
    type: "hero",
    anchor: "arrival",
    eyebrow: "Fashion Gate Boulevard",
    headline: "Fashion Gate",
    description: "Syria has never had a luxury department store of this scale. A single address where fashion, taste and culture converge.",
    ctaLabel: "Read the manifesto",
    ctaHref: "#manifesto",
    imageUrl: "/brand-pages/page_01.jpg"
  },
  {
    _id: "brandMarquee",
    type: "brandMarquee",
    anchor: "brands"
  },
  {
    _id: "manifesto",
    type: "manifesto",
    anchor: "manifesto",
    eyebrow: "On Boulevard. For the world.",
    headline: "On Boulevard. For the world.",
    description: "Syria has never had a luxury department store of this scale. Fashion Gate Boulevard is not just a business. It is the reopening of Syria to the world through fashion."
  },
    {
    _id: "boulevard",
    type: "boulevard-selection",
    anchor: "boulevard",
    eyebrow: "Signature Spaces",
    headline: "The Boulevard Selection",
    quote: "“You do not shop Fashion Gate Boulevard. You walk it.”",
    description: "Fashion Gate Boulevard is Syria's first luxury department store — a single address containing multiple worlds under one unified architectural vision."
  },
  

    {
      _id: "carousel",
      type: "carousel",
      anchor: "editorial",
      eyebrow: "On Boulevard. For the world.",
      headline: "Not a store. Not a mall. A destination.",
      description: "Explore curated seasonal edits, signature silhouettes, and international designer collections that define the Fashion Gate experience.",
      slides: [
        { title: "The Autumn Edit", description: "A curation of timeless silhouettes, crafted in premium silks and warm cashmeres designed for the modern woman.", imageUrl: "/brand/autumn-edit.png" },
        { title: "Modern Sophistication", description: "Effortless elegance meeting structured tailoring. Discover pieces that redefine classic design for daily luxury.", imageUrl: "/brand/modern-sophistication.png" },
        { title: "Signature Accents", description: "Exquisite bags and finely polished accessories that complete the definitive Fashion Gate statement.", imageUrl: "/brand/signature-accents.png" }
      ]
    },
  {
    _id: "collections",
    type: "collections",
    anchor: "collections",
    eyebrow: "The Departments",
    headline: "Multiple Worlds. One Architectural Vision.",
    description: "Fashion Gate Boulevard unites international fashion designer collections, luxury accessories, premium beauty, and gourmet foods under a single architectural vision.",
    collections: [
      { title: "Designer Collections", headline: "Designer Collections", description: "A curated presentation of international fashion houses, avant-garde silhouettes, and seasonal runway selections for women and men.", imageUrl: "/brand/designer-collections.png" },
      { title: "Luxury Accessories & Leather Goods", headline: "Refined Details, Timeless Elegance", description: "Intimate displays of hand-finished leather accessories, fine timepieces, and bespoke pieces from the world's most distinguished creators.", imageUrl: "/brand/luxury-beauty.png" },
      { title: "MAKE UP", headline: "World-Renowned Beauty, Skincare & Perfume Houses", description: "An immersive destination at Fashion Gate Mall dedicated to the world's most prestigious cosmetic brands, advanced dermatological formulas, and rare signature scents. Experience tailored beauty consultations and discover exclusive seasonal collections curated for an elevated daily ritual.", imageUrl: "/brand/luxury-beauty.png" }
    ]
  },
  {
    _id: "lookbook",
    type: "lookbook",
    anchor: "lookbook",
    eyebrow: "Lookbook",
    headline: "A flowing visual system for product storytelling.",
    description: "Parallax image bands, staggered cards, and floating navigation create movement without making the boutique feel noisy.",
    media: [
      { title: "Brand guide plate", imageUrl: "/brand-pages/page_09.jpg" },
      { title: "Brand guide plate", imageUrl: "/brand-pages/page_18.jpg" },
      { title: "Brand guide plate", imageUrl: "/brand-pages/page_32.jpg" }
    ]
  }
];
