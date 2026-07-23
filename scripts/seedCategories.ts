import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";

// 1. Simple environment parser for .env.local
function loadEnv() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf-8");
    const lines = content.split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const index = trimmed.indexOf("=");
      if (index > 0) {
        const key = trimmed.slice(0, index).trim();
        let value = trimmed.slice(index + 1).trim();
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        } else if (value.startsWith("'") && value.endsWith("'")) {
          value = value.slice(1, -1);
        }
        process.env[key] = value;
      }
    }
  }
}

loadEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "4y6hfnze";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-03";
let token = process.env.SANITY_TOKEN;

if (!token) {
  const globalConfigPath = "C:\\Users\\USER\\.config\\sanity\\config.json";
  if (fs.existsSync(globalConfigPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(globalConfigPath, "utf8"));
      token = config.authToken;
      console.log("Automatically loaded credentials from local Sanity CLI config.");
    } catch (e) {
      console.warn("Failed to load local Sanity CLI config:", e);
    }
  }
}

if (!token) {
  console.error("=================================================================");
  console.error("ERROR: SANITY_TOKEN environment variable is not defined!");
  console.error("Please run the command by providing your write-enabled token:");
  console.error("  $env:SANITY_TOKEN=\"your_write_token\"; npx ts-node scripts/seedCategories.ts");
  console.error("=================================================================");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

async function main() {
  console.log("Deleting old generic categoryPage documents if they exist...");
  try {
    await client.delete("category-page-fashion");
    await client.delete("category-page-perfumes");
    await client.delete("category-page-skincare");
    console.log("Old documents deleted successfully.");
  } catch (err) {
    console.warn("Error deleting legacy category settings:", err);
  }

  console.log("Fetching existing brands from Sanity to resolve reference links...");
  const brands = await client.fetch(`*[_type == "brand"] { _id, "slug": slug.current }`);
  console.log(`Found ${brands.length} brands in Sanity.`);

  const brandMap: Record<string, string> = {};
  for (const b of brands) {
    if (b.slug) {
      brandMap[b.slug] = b._id;
    }
  }

  // Define Category Pages dataset representing perfumesPage and skincarePage document types
  const categoryPages = [
    {
      _id: "fashion",
      _type: "fashionPage",
      title: {
        en: "Fashion / Apparel",
        ar: "الأزياء والموضة",
      },
      description: {
        en: "At Fashion Gate Mall Syria, our fashion department features a curated selection of Women and Men luxury fashion collections.",
        ar: "في فاشن غيت مول سوريا، يقدم قسم الأزياء لدينا تشكيلة منسقة بعناية من مجموعات أزياء الرجال والنساء الفاخرة.",
      },
      banners: [
        {
          _key: "banner-fashion-women",
          _type: "categoryBanner",
          title: { en: "WOMEN", ar: "النساء" },
          subtitle: { en: "WOMEN COLLECTION", ar: "تشكيلة النساء" },
          link: "/category/fashion/en?sub=women",
        },
        {
          _key: "banner-fashion-men",
          _type: "categoryBanner",
          title: { en: "MEN", ar: "الرجال" },
          subtitle: { en: "MEN COLLECTION", ar: "تشكيلة الرجال" },
          link: "/category/fashion/en?sub=men",
        },
      ],
      brandsHeading: {
        en: "Our Luxury Brands",
        ar: "علاماتنا التجارية الفاخرة",
      },
      allowedBrandsSlugs: [
        "elie-saab", "gucci", "maxmara", "prada", "valentino", "ysl",
        "calvin-klein", "hugo-boss", "giorgio-armani", "paul-shark",
        "sandro", "moje", "adidas", "skechers", "cartier", "lancome",
        "jimmy-choo", "coach"
      ],
      seo: {
        metaTitle: { en: "Fashion Page | Fashion Gate Mall", ar: "صفحة الأزياء | فاشن غيت مول" },
        metaDescription: { en: "Explore our premium selection of Men and Women apparel.", ar: "اكتشف تشكيلة أزياء الرجال والنساء الفاخرة." },
      }
    },
    {
      _id: "perfumes",
      _type: "perfumePage",
      title: {
        en: "Perfumes / Fragrances",
        ar: "العطور",
      },
      description: {
        en: "Step into our sensory boutique of artisanal fragrances and premium perfumes in Damascus Boulevard.",
        ar: "ادخل إلى متجرنا الحسي للعطور الحرفية والعطور الفاخرة في بوليفارد دمشق.",
      },
      banners: [
        {
          _key: "banner-perfumes-women",
          _type: "categoryBanner",
          title: { en: "WOMEN'S FRAGRANCES", ar: "العطور النسائية" },
          subtitle: { en: "ELEGANT & FEMININE", ar: "رقة وجمال" },
          link: "/category/perfumes/en?sub=women",
        },
        {
          _key: "banner-perfumes-men",
          _type: "categoryBanner",
          title: { en: "MEN'S FRAGRANCES", ar: "العطور الرجالية" },
          subtitle: { en: "BOLD & SOPHISTICATED", ar: "جاذبية وقوة" },
          link: "/category/perfumes/en?sub=men",
        },
        {
          _key: "banner-perfumes-unisex",
          _type: "categoryBanner",
          title: { en: "UNISEX FRAGRANCES", ar: "العطور المشتركة (للجنسين)" },
          subtitle: { en: "UNIVERSAL HARMONY", ar: "تناغم وتفرد" },
          link: "/category/perfumes/en?sub=unisex",
        },
      ],
      brandsHeading: {
        en: "Luxury Fragrance Houses",
        ar: "دور العطور العالمية الفاخرة",
      },
      allowedBrandsSlugs: [
        "elie-saab", "gucci", "prada", "valentino", "ysl", "cartier",
        "lancome", "calvin-klein", "giorgio-armani", "hugo-boss"
      ],
      seo: {
        metaTitle: { en: "Perfumes Page | Fashion Gate Mall", ar: "صفحة العطور | فاشن غيت مول" },
        metaDescription: { en: "Premium fragrance collections and luxury perfume houses.", ar: "مجموعات العطور الراقية وأشهر دور العطور الفاخرة." },
      }
    },
    {
      _id: "skincare",
      _type: "skincarePage",
      title: {
        en: "Skincare & Beauty",
        ar: "العناية بالبشرة والجمال",
      },
      description: {
        en: "Discover advanced skincare formulas and beauty solutions from international luxury brands.",
        ar: "اكتشف تركيبات العناية المتقدمة بالبشرة وحلول الجمال من أرقى العلامات التجارية العالمية.",
      },
      banners: [
        {
          _key: "banner-skincare-women",
          _type: "categoryBanner",
          title: { en: "WOMEN'S SKINCARE", ar: "العناية بالبشرة للنساء" },
          subtitle: { en: "GLOW & RADIANCE", ar: "جمال ونضارة" },
          link: "/category/skincare/en?sub=women",
        },
        {
          _key: "banner-skincare-men",
          _type: "categoryBanner",
          title: { en: "MEN'S SKINCARE", ar: "العناية بالبشرة للرجال" },
          subtitle: { en: "DAILY ESSENTIALS", ar: "عناية يومية" },
          link: "/category/skincare/en?sub=men",
        },
      ],
      brandsHeading: {
        en: "Luxury Skincare Houses",
        ar: "علامات العناية بالبشرة الفاخرة",
      },
      allowedBrandsSlugs: [
        "lancome", "moje", "maxmara", "adidas"
      ],
      seo: {
        metaTitle: { en: "Skincare Page | Fashion Gate Mall", ar: "صفحة العناية بالبشرة | فاشن غيت مول" },
        metaDescription: { en: "Premium skincare, makeup, and beauty collections.", ar: "مجموعات العناية بالبشرة الفاخرة والمكياج وأدوات الجمال." },
      }
    },
    {
      _id: "makeup",
      _type: "makeupPage",
      title: {
        en: "Makeup & Cosmetics",
        ar: "المكياج ومستحضرات التجميل",
      },
      description: {
        en: "Elevate your beauty routine with luxury lipsticks, foundations, palettes, and cosmetic essentials.",
        ar: "ارتقِ بروتين جمالك مع أحمر الشفاه الفاخر، كريم الأساس، لوحات الألوان ومستحضرات التجميل الأساسية.",
      },
      banners: [
        {
          _key: "banner-makeup-women",
          _type: "categoryBanner",
          title: { en: "COSMETICS & GLOW", ar: "مستحضرات التجميل والنضارة" },
          subtitle: { en: "WOMEN'S BEAUTY", ar: "جمال المرأة" },
          link: "/category/makeup/en?sub=women",
        },
        {
          _key: "banner-makeup-men",
          _type: "categoryBanner",
          title: { en: "MEN'S GROOMING", ar: "العناية الشخصية للرجال" },
          subtitle: { en: "DAILY FRESHNESS", ar: "الانتعاش اليومي" },
          link: "/category/makeup/en?sub=men",
        },
      ],
      brandsHeading: {
        en: "Luxury Cosmetics & Makeup",
        ar: "مستحضرات التجميل والمكياج الفاخرة",
      },
      allowedBrandsSlugs: [
        "lancome", "moje", "prada", "ysl", "gucci", "valentino", "giorgio-armani"
      ],
      seo: {
        metaTitle: { en: "Makeup Page | Fashion Gate Mall", ar: "صفحة المكياج | فاشن غيت مول" },
        metaDescription: { en: "Explore our collection of premium makeup and beauty cosmetics.", ar: "اكتشف مجموعتنا الفاخرة من المكياج ومستحضرات التجميل." },
      }
    }
  ];

  console.log("Seeding documents...");
  for (const page of categoryPages) {
    const { allowedBrandsSlugs, ...doc } = page;
    
    // Resolve references to actual brand IDs
    const allowedBrands = allowedBrandsSlugs
      .map(slug => brandMap[slug])
      .filter(Boolean)
      .map(id => ({
        _key: `ref-${id}`,
        _type: "reference",
        _ref: id
      }));

    const finalDoc = {
      ...doc,
      allowedBrands
    };

    console.log(`Creating / replacing ${doc._type} document with ID: ${doc._id}...`);
    await client.createOrReplace(finalDoc);
  }

  console.log("Seeding completed successfully!");
}

main().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
