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
    { label: "Brand", anchor: "#brand", order: 4 }
  ]
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
      { title: "Beauty & Accessories", headline: "Luxury Accessories & Beauty", description: "Intimate displays of rare scents, advanced skincare, and hand-finished leather accessories from the world's most refined makers.", imageUrl: "/brand/luxury-beauty.png" },
      { title: "Gourmet & Fine Foods", headline: "Gourmet & Gifting", description: "An exquisite selection of curated gourmet foods, artisanal confectioneries, and luxury gift hampers sourced from the world's most prestigious makers.", imageUrl: "/brand/luxury-gourmet-epicerie.png" }
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
  }, 
  {
    _id: "brand",
    type: "editorial",
    anchor: "brand",
    eyebrow: "Heritage & Craftsmanship",
    headline: "The Pinnacle of Syrian Luxury Shopping",
    description: "Fashion Gate brings together the world's most renowned haute couture houses, bespoke local ateliers, and curations of fine design. Housed in the prestigious Boulevard district, we offer an immersive luxury journey that connects the heritage of Silk Road craftsmanship with contemporary global style."
  }
];
