import { siteSettings } from "./siteSettings";
import { product } from "./product";
import { collection } from "./collection";
import { mediaAsset } from "./mediaAsset";
import { menuItem } from "./menuItem";
import { page } from "./page";
import { section } from "./section";
import brand from "./brand";

// Localized helpers
import { localizedString } from "./objects/localizedString";
import { localizedText } from "./objects/localizedText";
import imageSeparator from "./objects/imageSeparator";

// Section objects
import { heroSection } from "./objects/sections/heroSection";
import { brandMarqueeSection } from "./objects/sections/brandMarqueeSection";
import { manifestoSection } from "./objects/sections/manifestoSection";
import { carouselSection } from "./objects/sections/carouselSection";
import { collectionsSection } from "./objects/sections/collectionsSection";
import { lookbookSection } from "./objects/sections/lookbookSection";
import { boulevardSelectionSection } from "./objects/sections/boulevardSelectionSection";
import { editorialSection } from "./objects/sections/editorialSection";
import { atelierShowcaseSection } from "./objects/sections/atelierShowcaseSection";

import post from "./post";
import testimonial from "./testimonial";
import faq from "./faq";
import { announcement } from "./announcement";
import { footerSettings } from "./footerSettings";
import { header } from "./header";
import { designerCategory } from "./designerCategory";

// New dynamic pages
import { aboutPage } from "./aboutPage";
import { contactPage } from "./contactPage";
import { blogsPage } from "./blogsPage";
import { loginPage } from "./loginPage";
import { brandPage } from "./brandPage";
import { termsPage } from "./termsPage";

export const schemaTypes = [
  // E-commerce & Base
  siteSettings,
  product,
  collection,
  mediaAsset,
  menuItem,
  header,
  designerCategory,
  page,
  section,
  brand,

  // Localized helpers
  localizedString,
  localizedText,
  imageSeparator,

  // Section Objects
  heroSection,
  brandMarqueeSection,
  manifestoSection,
  carouselSection,
  collectionsSection,
  lookbookSection,
  boulevardSelectionSection,
  editorialSection,
  atelierShowcaseSection,

  // Content
  post,
  testimonial,
  faq,
  announcement,
  footerSettings,

  // New Pages
  aboutPage,
  contactPage,
  blogsPage,
  loginPage,
  brandPage,
  termsPage,
];

