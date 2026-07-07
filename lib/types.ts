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
  title?: string;
  description?: string;
  image?: SanityImage;
  imageUrl?: string;
};

export type CollectionItem = {
  title?: string;
  headline?: string;
  description?: string;
  coverImage?: SanityImage;
  imageUrl?: string;
};

export type Section = {
  _id?: string;
  type?: "hero" | "manifesto" | "carousel" | "collections" | "editorial" | "lookbook" | "marquee" | "boulevard-selection" | "packaging-experience";
  anchor?: string;
  eyebrow?: string;
  headline?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: SanityImage;
  imageUrl?: string;
  slides?: Slide[];
  collections?: CollectionItem[];
  media?: MediaItem[];
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
