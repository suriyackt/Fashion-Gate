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
  useCdn: true,
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
    "page": *[_type == "page" && slug.current == "home"][0]{
      title,
      seoTitle,
      seoDescription,
      sections[]->{
        _id,
        title,
        type,
        anchor,
        eyebrow,
        headline,
        description,
        ctaLabel,
        ctaHref,
        image,
        video,
        order,
        slides[]{title, description, image, video},
        collections[]->{
          title,
          headline,
          description,
          coverImage,
          order,
          products[]->{name, subtitle, description, price, image, badge, order}
        },
        media[]->{title, image, video, externalVideoUrl, alt, caption}
      }
    }
  }`);
}
