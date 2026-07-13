import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "4y6hfnze";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-03";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published"
});

const builder = imageUrlBuilder(sanityClient);

export function imageUrl(source: SanityImageSource) {
  return builder.image(source);
}

export async function getHomepageData() {
  return sanityClient.fetch(`{
    "settings": *[_type == "siteSettings"][0]{
      title,
      tagline,
      primaryColor,
      accentColor,
      headingFont,
      bodyFont,
      logo,
      socialLabel,
      socialUrl,
      navigation[]->{label, anchor, order}
    },
    "page": *[_type == "page" && (slug.current == "homepage" || slug.current == "home" || _id == "home")][0]{
      title,
      seoTitle,
      seoDescription,
      sections[]{
        _key,
        _type,
        enabled,
        type,
        anchor,
        title,
        eyebrow { en, ar },
        headline { en, ar },
        description { en, ar },
        subHeadlineLine1 { en, ar },
        subHeadlineLine2 { en, ar },
        bgType,
        bgImage,
        bgVideo { asset->{ url } },
        image,
        video { asset->{ url } },
        cta { 
          label { en, ar },
          href,
          type,
          linkType,
          internalLink,
          externalLink
        },
        brands[@->isActive != false]->{
          title,
          slug,
          image,
          isActive
        },
        slides[]{
          title { en, ar },
          description { en, ar },
          image
        },
        collections[]{
          title { en, ar },
          headline { en, ar },
          description { en, ar },
          coverImage
        },
        media[]->{
          title,
          image,
          video { asset->{ url } },
          externalVideoUrl,
          alt,
          caption
        },
        leftCard {
          eyebrow { en, ar },
          title { en, ar },
          description { en, ar },
          image
        },
        rightCard {
          eyebrow { en, ar },
          title { en, ar },
          description { en, ar },
          image
        }
      }
    },
    "brands": *[_type == "brand" && isActive == true] | order(title asc) {
      _id,
      title,
      slug,
      image { asset->{ url } },
      "headline": coalesce(*[_type == "brandPage" && brand._ref == ^._id][0].headline, headline) { en, ar },
      "description": coalesce(*[_type == "brandPage" && brand._ref == ^._id][0].description, description) { en, ar },
      "bgImage": coalesce(*[_type == "brandPage" && brand._ref == ^._id][0].bgImage, bgImage) { asset->{ url } },
      "buttonText": *[_type == "brandPage" && brand._ref == ^._id][0].buttonText { en, ar },
      "buttonLink": *[_type == "brandPage" && brand._ref == ^._id][0].buttonLink
    }
  }`);
}

export async function getAboutPageData() {
  return sanityClient.fetch(`*[_type == "aboutPage"][0] {
    eyebrow,
    title,
    subtitle,
    visionTitle,
    visionText,
    commitmentTitle,
    commitmentText,
    heroImage { asset->{ url } }
  }`);
}

export async function getLoginPageData() {
  try {
    return await sanityClient.fetch(`*[_type == "loginPage"][0] {
      loginTitle { en, ar },
      signupTitle { en, ar },
      welcomeBack { en, ar },
      welcomeNew { en, ar },
      emailLabel { en, ar },
      passwordLabel { en, ar },
      confirmPasswordLabel { en, ar },
      nameLabel { en, ar },
      loginBtn { en, ar },
      signupBtn { en, ar },
      haveAccount { en, ar },
      noAccount { en, ar },
      backHome { en, ar },
      successMsg { en, ar },
      bgImage { asset->{ url } }
    }`);
  } catch (err) {
    console.error("Error fetching login page data:", err);
    return null;
  }
}

export async function getContactPageData() {
  return sanityClient.fetch(`*[_type == "contactPage"][0] {
    eyebrow,
    title,
    subtitle,
    addressLabel,
    addressValue,
    hoursLabel,
    hoursValue,
    digitalLabel,
    digitalValue,
    whatsappLabel,
    whatsappValue,
    chatConcierge,
    formTitle,
    formSubtitle,
    fullNameLabel,
    emailLabel,
    phoneLabel,
    msgLabel,
    sendBtn,
    successHeader,
    successDesc,
    sendAnother,
    heroImage { asset->{ url } }
  }`);
}

export async function getAnnouncements() {
  try {
    return await sanityClient.fetch(`*[_type == "announcement"] | order(order asc) {
      text { en, ar },
      link
    }`);
  } catch (err) {
    console.error("Error fetching announcements:", err);
    return [];
  }
}

export async function getSanityBrands() {
  try {
    return await sanityClient.fetch(`*[_type == "brand" && isActive == true] | order(title asc) {
      _id,
      title,
      slug,
      image { asset->{ url } },
      "headline": coalesce(*[_type == "brandPage" && brand._ref == ^._id][0].headline, headline) { en, ar },
      "description": coalesce(*[_type == "brandPage" && brand._ref == ^._id][0].description, description) { en, ar },
      "bgImage": coalesce(*[_type == "brandPage" && brand._ref == ^._id][0].bgImage, bgImage) { asset->{ url } },
      "buttonText": *[_type == "brandPage" && brand._ref == ^._id][0].buttonText { en, ar },
      "buttonLink": *[_type == "brandPage" && brand._ref == ^._id][0].buttonLink
    }`);
  } catch (err) {
    console.error("Error fetching sanity brands:", err);
    return [];
  }
}

export async function getSanityBrand(slug: string) {
  try {
    return await sanityClient.fetch(`*[_type == "brand" && slug.current == $slug && isActive == true][0] {
      _id,
      title,
      slug,
      image { asset->{ url } },
      "headline": coalesce(*[_type == "brandPage" && brand._ref == ^._id][0].headline, headline) { en, ar },
      "description": coalesce(*[_type == "brandPage" && brand._ref == ^._id][0].description, description) { en, ar },
      "bgImage": coalesce(*[_type == "brandPage" && brand._ref == ^._id][0].bgImage, bgImage) { asset->{ url } },
      "buttonText": *[_type == "brandPage" && brand._ref == ^._id][0].buttonText { en, ar },
      "buttonLink": *[_type == "brandPage" && brand._ref == ^._id][0].buttonLink
    }`, { slug });
  } catch (err) {
    console.error("Error fetching single sanity brand:", err);
    return null;
  }
}

export async function getFooterSettings() {
  try {
    return await sanityClient.fetch(`*[_type == "footerSettings"][0] {
      description { en, ar },
      exploreTitle { en, ar },
      links[]{
        label { en, ar },
        href
      },
      updatesTitle { en, ar },
      subscribeText { en, ar },
      emailPlaceholder { en, ar },
      copyright { en, ar },
      facebookUrl,
      instagramUrl,
      whatsAppUrl,
      floatingWhatsAppUrl,
      tiktokUrl,
      youtubeUrl,
      pinterestUrl,
      snapchatUrl,
      xUrl
    }`);
  } catch (err) {
    console.error("Error fetching footer settings:", err);
    return null;
  }
}

export async function getAllSanityProductSlugs(): Promise<{ id: string }[]> {
  try {
    const slugs = await sanityClient.fetch<string[]>(`*[_type == "product" && defined(slug.current)].slug.current`);
    return slugs.map(slug => ({ id: slug }));
  } catch (err) {
    console.error("Error fetching slugs:", err);
    return [];
  }
}

export async function getSanityProduct(slug: string): Promise<any> {
  try {
    const raw = await sanityClient.fetch(`*[_type == "product" && slug.current == $slug][0] {
      _id,
      name { en, ar },
      slug,
      subtitle { en, ar },
      description { en, ar },
      price,
      image { asset->{ url } },
      badge { en, ar },
      brand->{ slug, title },
      category->{ slug, titleEn, titleAr },
      detailsList[]{ en, ar }
    }`, { slug });

    if (!raw) return null;

    return {
      id: raw.slug?.current || "",
      title: raw.name?.en || "",
      titleAr: raw.name?.ar || raw.name?.en || "",
      category: raw.category?.slug?.current || "",
      categoryAr: raw.category?.slug?.current || "",
      slogan: raw.subtitle?.en || "",
      sloganAr: raw.subtitle?.ar || raw.subtitle?.en || "",
      description: raw.description?.en || "",
      descriptionAr: raw.description?.ar || raw.description?.en || "",
      details: (raw.detailsList || []).map((d: any) => d.en),
      detailsAr: (raw.detailsList || []).map((d: any) => d.ar || d.en),
      imageUrl: raw.image?.asset?.url || "/brand/logo.png",
      brandId: raw.brand?.slug?.current || "",
      relatedIds: []
    };
  } catch (err) {
    console.error("Error fetching sanity product:", err);
    return null;
  }
}

export async function getAllSanityProducts(): Promise<any[]> {
  try {
    const rawList = await sanityClient.fetch(`*[_type == "product"] {
      _id,
      name { en, ar },
      slug,
      subtitle { en, ar },
      description { en, ar },
      price,
      image { asset->{ url } },
      badge { en, ar },
      brand->{ slug, title },
      category->{ slug, titleEn, titleAr },
      detailsList[]{ en, ar }
    }`);

    return rawList.map((raw: any) => ({
      id: raw.slug?.current || "",
      title: raw.name?.en || "",
      titleAr: raw.name?.ar || raw.name?.en || "",
      category: raw.category?.slug?.current || "",
      categoryAr: raw.category?.slug?.current || "",
      slogan: raw.subtitle?.en || "",
      sloganAr: raw.subtitle?.ar || raw.subtitle?.en || "",
      description: raw.description?.en || "",
      descriptionAr: raw.description?.ar || raw.description?.en || "",
      details: (raw.detailsList || []).map((d: any) => d.en),
      detailsAr: (raw.detailsList || []).map((d: any) => d.ar || d.en),
      imageUrl: raw.image?.asset?.url || "/brand/logo.png",
      brandId: raw.brand?.slug?.current || "",
      relatedIds: []
    }));
  } catch (err) {
    console.error("Error fetching all products:", err);
    return [];
  }
}

export async function getSanityBlogPosts(): Promise<any[]> {
  try {
    const rawList = await sanityClient.fetch(`*[_type == "post"] | order(publishedAt desc) {
      _id,
      title { en, ar },
      slug,
      excerpt { en, ar },
      format,
      category,
      mainImage { asset->{ url } },
      content,
      publishedAt
    }`);

    return rawList.map((raw: any) => {
      const contentArray = Array.isArray(raw.content)
        ? raw.content
            .filter((block: any) => block._type === "block" && block.children)
            .map((block: any) => block.children.map((child: any) => child.text).join(""))
        : [];

      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const pubDate = raw.publishedAt ? new Date(raw.publishedAt) : new Date();
      const month = monthNames[pubDate.getMonth()];

      return {
        slug: raw.slug?.current || "",
        title: raw.title?.en || "",
        titleAr: raw.title?.ar || raw.title?.en || "",
        format: raw.format || "Blog post",
        month: month,
        priority: "Medium",
        audience: "",
        keywordFocus: "",
        goal: "",
        excerpt: raw.excerpt?.en || "",
        excerptAr: raw.excerpt?.ar || raw.excerpt?.en || "",
        content: contentArray,
        image: raw.mainImage?.asset?.url || "/brand-pages/page_01.jpg"
      };
    });
  } catch (err) {
    console.error("Error fetching sanity blog posts:", err);
    return [];
  }
}

export async function getBlogsPageSettings(): Promise<any> {
  try {
    const raw = await sanityClient.fetch(`*[_type == "blogsPage" && _id == "blogsPage"][0] {
      eyebrow { en, ar },
      headline { en, ar },
      description { en, ar },
      stat1 { en, ar },
      stat2 { en, ar },
      stat3 { en, ar }
    }`);
    return raw || null;
  } catch (err) {
    console.error("Error fetching blogs page settings:", err);
    return null;
  }
}


export async function getAllSanityBlogPostSlugs(): Promise<{ slug: string }[]> {
  try {
    const slugs = await sanityClient.fetch<string[]>(`*[_type == "post" && defined(slug.current)].slug.current`);
    return slugs.map(slug => ({ slug }));
  } catch (err) {
    console.error("Error fetching blog slugs:", err);
    return [];
  }
}

export async function getSanityBlogPost(slug: string): Promise<any> {
  try {
    const raw = await sanityClient.fetch(`*[_type == "post" && slug.current == $slug][0] {
      _id,
      title { en, ar },
      slug,
      excerpt { en, ar },
      format,
      category,
      mainImage { asset->{ url } },
      content,
      readTime,
      tags,
      publishedAt,
      author {
        name,
        role { en, ar },
        image { asset->{ url } }
      }
    }`, { slug });

    if (!raw) return null;

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const pubDate = raw.publishedAt ? new Date(raw.publishedAt) : new Date();
    const month = monthNames[pubDate.getMonth()];

    return {
      slug: raw.slug?.current || "",
      title: raw.title?.en || "",
      titleAr: raw.title?.ar || raw.title?.en || "",
      format: raw.format || "Blog post",
      month: month,
      priority: "Medium",
      excerpt: raw.excerpt?.en || "",
      excerptAr: raw.excerpt?.ar || raw.excerpt?.en || "",
      content: raw.content || [],
      image: raw.mainImage?.asset?.url || "/brand-pages/page_01.jpg",
      readTime: raw.readTime || 5,
      tags: raw.tags || [],
      author: {
        name: raw.author?.name || "Editor",
        role: raw.author?.role?.en || "Editorial Director",
        roleAr: raw.author?.role?.ar || raw.author?.role?.en || "مدير التحرير",
        imageUrl: raw.author?.image?.asset?.url || "/brand/logo.png"
      }
    };
  } catch (err) {
    console.error("Error fetching single blog post:", err);
    return null;
  }
}

export function getLocalizedValue(value: any, lang: "en" | "ar", fallback?: any): any {
  if (!value) return fallback;
  if (typeof value === "object") {
    return value[lang] !== undefined ? value[lang] : (fallback !== undefined ? fallback : value.en);
  }
  return value;
}

export async function getHeaderSettings() {
  return sanityClient.fetch(`*[_type == "header"][0] {
    _id,
    title,
    menuItems[] {
      label { en, ar },
      href,
      dropdownType
    }
  }`);
}
