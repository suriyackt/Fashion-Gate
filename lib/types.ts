export type SanityImage = {
  asset?: {
    _ref?: string;
    _id?: string;
    url?: string;
  };
};

export type MediaItem = {
  title?: string;
  image?: SanityImage;
  imageUrl?: string;
  alt?: string;
  caption?: string;
};

export type Slide = {
  title?: string | { en?: string; ar?: string };
  description?: string | { en?: string; ar?: string };
  image?: SanityImage;
  imageUrl?: string;
  titleEn?: string;
  titleAr?: string;
  descriptionEn?: string;
  descriptionAr?: string;
};

export type CollectionItem = {
  title?: string;
  headline?: string;
  description?: string;
  coverImage?: SanityImage;
  imageUrl?: string;
  titleEn?: string;
  titleAr?: string;
  headlineEn?: string;
  headlineAr?: string;
  descriptionEn?: string;
  descriptionAr?: string;
};

export type Section = {
  _id?: string;
  _type?: string;
  enabled?: boolean;
  type?: "hero" | "manifesto" | "carousel" | "collections" | "editorial" | "lookbook" | "marquee" | "boulevard-selection" | "packaging-experience";
  anchor?: string;
  eyebrow?: string | { en?: string; ar?: string };
  headline?: string | { en?: string; ar?: string };
  description?: string | { en?: string; ar?: string };
  ctaLabel?: string;
  ctaHref?: string;
  image?: SanityImage;
  imageUrl?: string;
  slides?: Slide[];
  collections?: CollectionItem[];
  media?: MediaItem[];
  video?: { asset?: { url?: string } };
  
  // New localized and background fields
  quote?: string | { en?: string; ar?: string };
  quoteEn?: string;
  quoteAr?: string;
  eyebrowEn?: string;
  eyebrowAr?: string;
  headlineEn?: string;
  headlineAr?: string;
  subHeadlineEnLine1?: string;
  subHeadlineEnLine2?: string;
  subHeadlineArLine1?: string;
  subHeadlineArLine2?: string;
  subHeadlineLine1?: { en?: string; ar?: string };
  subHeadlineLine2?: { en?: string; ar?: string };
  descriptionEn?: string;
  descriptionAr?: string;
  bgType?: "image" | "video";
  bgImage?: SanityImage;
  bgImageMobile?: SanityImage;
  bgVideo?: { asset?: { url?: string } };
  mobileBgPosition?: string;
  cta?: {
    label?: string | { en?: string; ar?: string };
    labelEn?: string;
    labelAr?: string;
    href?: string;
    type?: "primary" | "secondary" | "link";
    linkType?: string;
    internalLink?: string;
    externalLink?: string;
  };
  leftCard?: {
    eyebrow?: string | { en?: string; ar?: string };
    title?: string | { en?: string; ar?: string };
    description?: string | { en?: string; ar?: string };
    image?: SanityImage;
  };
  rightCard?: {
    eyebrow?: string | { en?: string; ar?: string };
    title?: string | { en?: string; ar?: string };
    description?: string | { en?: string; ar?: string };
    image?: SanityImage;
  };
};

export type SiteSettings = {
  title?: string;
  tagline?: string;
  primaryColor?: string;
  accentColor?: string;
  headingFont?: string;
  bodyFont?: string;
  logo?: SanityImage;
  socialLabel?: string;
  socialUrl?: string;
  navigation?: { label?: string; anchor?: string; order?: number }[];
};
