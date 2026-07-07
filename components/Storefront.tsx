"use client";

import { useMemo, useState, useEffect } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { Box, Button, Container, Drawer, IconButton, Stack, ThemeProvider, Tooltip, Typography, createTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { imageUrl } from "@/lib/sanity";
import type { CollectionItem, MediaItem, SanityImage, Section, SiteSettings } from "@/lib/types";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { products, type Product } from "@/lib/productData";
import SiteFooter from "@/components/SiteFooter";
import HeroSection from "./storefront/HeroSection";
import ManifestoSection from "./storefront/ManifestoSection";
import CarouselSection from "./storefront/CarouselSection";
import CollectionsSection from "./storefront/CollectionsSection";
import CategoryProductSections from "./storefront/CategoryProductSections";
import LookbookSection from "./storefront/LookbookSection";
import BoulevardSelectionSection from "./storefront/BoulevardSelectionSection";
import EditorialSection from "./storefront/EditorialSection";
import AtelierShowcaseSection from "./storefront/AtelierShowcaseSection";


const MotionBox = motion.create(Box);

export const shopNavigation = [
  { label: "Women", anchor: "#women" },
  { label: "Men", anchor: "#men" },
  { label: "Beauty", anchor: "#beauty" },
  { label: "Home & Deco", anchor: "#home-deco" },
  { label: "Brand", anchor: "#brand" }
];

export const shopCategories = [
  {
    id: "women",
    label: "Women",
    eyebrow: "Designer Wardrobe",
    headline: "Edited silhouettes for her.",
    description: "Refined dresses, silk separates, trench coats, and tailored pieces arranged for an easier boutique-style shopping path.",
    productIds: ["fgb-white-lace-midi-dress", "fgb-silk-oversized-shirt", "the-silk-trench-coat", "structured-wool-blazer"]
  },
  {
    id: "men",
    label: "Men",
    eyebrow: "Menswear Edit",
    headline: "Sharp everyday luxury.",
    description: "Polos, tailoring, sportswear, and structured outerwear grouped so men can move directly from category to product.",
    productIds: ["boss-hugo-boss-polo", "adidas-originals-sportswear", "fgb-modern-tailored-blazer", "signature-tweed-jacket"]
  },
  {
    id: "beauty",
    label: "Beauty",
    eyebrow: "Beauty & Accessories",
    headline: "Scent, skin, and finishing accents.",
    description: "Perfume, jasmine oil, footwear, and leather accessories brought together as a premium beauty and accessory destination.",
    productIds: ["si-passione-giorgio-armani-perfume", "cedar-and-amber-extract", "damascene-jasmine-oil", "the-architectural-tote", "fgb-urban-active-footwear"]
  },
  {
    id: "home-deco",
    label: "Home & Deco",
    eyebrow: "Gourmet & Gifting",
    headline: "Objects of taste for home and gifting.",
    description: "Fine foods and giftable pieces staged as a lifestyle department until the home and decor catalogue is expanded.",
    productIds: ["damascene-rose-nougat", "saffron-blossom-honey", "artisanal-truffle-oil"]
  }
];

// Translation mapping from English fallbacks to Arabic
const stringMap: Record<string, string> = {
  // Navigation / UI Controls
  "Women": "النساء",
  "Men": "الرجال",
  "Beauty": "الجمال",
  "Home & Deco": "المنزل والديكور",
  "Brand": "العلامة التجارية",
  "Blogs": "المدونة",
  "Explore": "استكشف",
  "Read the manifesto": "اقرأ البيان",
  "Menu": "القائمة",
  "On Boulevard. For the world.": "على البوليفارد. للعالم.",
  
  // Hero Section
  "Fashion Gate Boulevard": "بوليفارد بوابة الأزياء",
  "Syria has never had a luxury department store of this scale. A single address where fashion, taste and culture converge.": 
    "لم تشهد سوريا من قبل متجراً للمنتجات الفاخرة بهذا الحجم. عنوان واحد حيث تلتقي الموضة والذوق والثقافة.",
  "Read manifesto": "اقرأ البيان",
  
  // Manifesto Section
  "Manifesto": "البيان",
  "Syria has never had a luxury department store of this scale. Fashion Gate Boulevard is not just a business. It is the reopening of Syria to the world through fashion.":
    "لم تشهد سوريا من قبل متجراً للمنتجات الفاخرة بهذا الحجم. بوليفارد بوابة الأزياء ليس مجرد عمل تجاري. إنه إعادة فتح سوريا للعالم من خلال الموضة.",
  
  // Carousel Section
  "Not a store. Not a mall. A destination.": "ليس مجرد متجر. ليس مركزاً تجارياً. وجهة.",
  "Explore curated seasonal edits, signature silhouettes, and international designer collections that define the Fashion Gate experience.":
    "استكشف إصدارات موسمية منسقة، وتصاميم مميزة، ومجموعات مصممين عالميين تحدد تجربة بوابة الأزياء.",
  "The Autumn Edit": "إصدار الخريف",
  "A curation of timeless silhouettes, crafted in premium silks and warm cashmeres designed for the modern woman.":
    "مجموعة مختارة من التصاميم الكلاسيكية، المصنوعة من الحرير الفاخر والكشمير الدافئ المصمم للمرأة العصرية.",
  "Modern Sophistication": "رقي عصري",
  "Effortless elegance meeting structured tailoring. Discover pieces that redefine classic design for daily luxury.":
    "أناقة عفوية تلتقي مع التفصيل المتقن. اكتشف القطع التي تعيد تعريف التصميم الكلاسيكي للفخامة اليومية.",
  "Signature Accents": "لمسات مميزة",
  "Exquisite bags and finely polished accessories that complete the definitive Fashion Gate statement.":
    "حقائب رائعة وإكسسوارات مصقولة بدقة تكمل المظهر المميز لبوابة الأزياء.",
    
  // Collections Section
  "The Departments": "الأقسام",
  "Multiple Worlds. One Architectural Vision.": "عوالم متعددة. رؤية معمارية واحدة.",
  "Fashion Gate Boulevard unites international fashion designer collections, luxury accessories, premium beauty, and gourmet foods under a single architectural vision.":
    "يوحد بوليفارد بوابة الأزياء بين مجموعات مصممي الأزياء العالميين، والإكسسوارات الفاخرة، ومستحضرات التجميل الراقية، والأطعمة الشهية تحت رؤية معمارية واحدة.",
  "Designer Collections": "مجموعات المصممين",
  "A curated presentation of international fashion houses, avant-garde silhouettes, and seasonal runway selections for women and men.":
    "عرض منسق لدور الأزياء العالمية والتصاميم المبتكرة وتشكيلات منصات العرض الموسمية للنساء والرجال.",
  "Beauty & Accessories": "الجمال والإكسسوارات",
  "Luxury Accessories & Beauty": "الإكسسوارات الفاخرة والجمال",
  "Intimate displays of rare scents, advanced skincare, and hand-finished leather accessories from the world's most refined makers.":
    "عروض مخصصة للعطور النادرة ومنتجات العناية بالبشرة المتقدمة والإكسسوارات الجلدية المصنوعة يدوياً من أرقى المصنعين في العالم.",
  "Gourmet & Fine Foods": "الأطعمة الفاخرة والحلويات",
  "Gourmet & Gifting": "المأكولات الشهية والهدايا الفاخرة",
  "An exquisite selection of curated gourmet foods, artisanal confectioneries, and luxury gift hampers sourced from the world's most prestigious makers.":
    "تشكيلة رائعة من الأطعمة الشهية المنسقة، والحلويات الحرفية، وسلال الهدايا الفاخرة المستوردة من أرقى المصنعين في العالم.",
    
  // Lookbook Section
  "Curated Pieces": "قطع مختارة",
  "Explore Piece": "استكشف القطعة",
  "Explore a singular gallery of signature items, where architectural geometry meets tactile luxury from Damascus to the world.":
    "استكشف معرضاً فريداً من القطع المتميزة، حيث تلتقي الهندسة المعمارية بالفخامة الحسية من دمشق إلى العالم.",
    
  // Brand Section
  "Brand system": "نظام العلامة التجارية",
  "Built from the Fashion Gate identity deck.": "مستوحى من دليل الهوية الخاص ببوابة الأزياء.",
  "The first theme pass uses the extracted PDF palette: burnt orange #CB6116, black, white, charcoal, and warm neutral greys. Typography uses Libre Bodoni as a close web-font match to the brand deck's high-contrast Roman serif wordmark, paired with Inter for clean interface text.":
    "تستخدم لوحة الألوان المستخرجة من دليل الهوية: البرتقالي المحروق #CB6116 والأسود والأبيض والفحمي والرمادي المحايد الدافئ. تستخدم الطباعة خط Apple Garamond كخط رئيسي للعناوين وخط Cairo للنصوص الواجهة.",
};

export function resolveImage(source?: SanityImage, fallback?: string) {
  if (source?.asset?._ref || source?.asset?._id) {
    return imageUrl(source).width(1800).quality(88).url();
  }
  return fallback || "/brand-pages/page_01.jpg";
}

export function imageLayer(url: string) {
  return `linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.68)), url(${url})`;
}

function BrandMark({ settings, light = false, lang }: { settings: SiteSettings; light?: boolean; lang: "ar" | "en" }) {
  const textColor = light ? "#111111" : "#ffffff";
  const subColor = light ? "rgba(0,0,0,.54)" : "rgba(255,255,255,.68)";

  return (
    <Stack direction="row" gap={lang === "ar" ? 3.5 : 2} alignItems="center">
      <Box 
        component="img" 
        src="/brand/logo.png" 
        alt={settings.title || "Fashion Gate"} 
        sx={{ 
          height: { xs: 34, md: 44 }, 
          width: "auto",
          objectFit: "contain",
          filter: light ? "brightness(0)" : "none"
        }} 
      />
      <Stack spacing={0.1} alignItems="flex-start" sx={{ display: { xs: "none", sm: "flex" } }}>
        <Typography 
          sx={{ 
            fontFamily: "var(--heading-font)", 
            fontWeight: 600, 
            fontSize: { xs: 14, md: 17 }, 
            lineHeight: 1, 
            textTransform: "uppercase", 
            color: textColor,
            letterSpacing: "0.08em"
          }}
        >
          Fashion Gate
        </Typography>
        <Typography 
          sx={{ 
            fontSize: 8, 
            letterSpacing: "0.1em", 
            textTransform: "uppercase", 
            color: subColor 
          }}
        >
          On Boulevard. For the world.
        </Typography>
      </Stack>
    </Stack>
  );
}

function AnnouncementBar({ lang }: { lang: "ar" | "en" }) {
  const [index, setIndex] = useState(0);

  const announcements = useMemo(() => [
    {
      en: "Syria's First Luxury Department Store — On Boulevard. For the world.",
      ar: "أول متجر أقسام فاخر في سوريا — على البوليفارد. للعالم."
    },
    {
      en: "Complimentary Worldwide Shipping on Selected Designer Collections",
      ar: "شحن مجاني لكافة أنحاء العالم على مجموعات مصممين مختارة"
    },
    {
      en: "Experience Personal Shopping & Private Viewings at Our Damascus Atelier",
      ar: "استمتع بتجربة تسوق شخصي ومعاينات خاصة في أتيلييه دمشق"
    }
  ], []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  return (
    <Box 
      sx={{ 
        bgcolor: "#050505", 
        color: "primary.main", 
        py: { xs: 1, md: 1 }, 
        px: { xs: 3, md: 4 }, 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        minHeight: { xs: 40, md: 40 },
        overflow: "hidden"
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            fontFamily: '"Cairo", sans-serif',
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textAlign: "center",
            lineHeight: 1.4
          }}
        >
          {announcements[index][lang]}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}

function FloatingMenu({ settings, lang, setLang, t }: { settings: SiteSettings; lang: "ar" | "en"; setLang: () => void; t: (s?: string) => string }) {
  const [open, setOpen] = useState(false);
  const nav = shopNavigation;

  const menuDescriptions: Record<string, { en: string; ar: string }> = {
    "Women": { en: "Seasonal silhouettes & tailoring", ar: "تصاميم موسمية وخياطة راقية" },
    "Men": { en: "Timeless cuts & modern fits", ar: "قصات خالدة ومقاسات عصرية" },
    "Beauty": { en: "Curated scents & skin care", ar: "عطور منسقة وعناية بالبشرة" },
    "Home & Deco": { en: "Artisanal objects & furniture", ar: "تحف فنية وأثاث راقٍ" },
    "Brand": { en: "Our heritage & design manifesto", ar: "تراثنا وبيان التصميم الخاص بنا" },
    "Blogs": { en: "Refined journal notes & case studies", ar: "ملاحظات الجريدة ودراسات الحالة" }
  };

  return (
    <>
      <Box 
        component="header"
        sx={{ 
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100, 
          bgcolor: "#050505",
          backgroundImage: 'url("/assets/headerbg.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderBottom: "none",
          boxShadow: "none"
        }}
      >
        <AnnouncementBar lang={lang} />
        <Stack direction="row" alignItems="center" sx={{ minHeight: { xs: 64, md: 74 }, px: { xs: 2.5, md: 4 } }}>
          {/* Left navigation */}
          <Stack 
            direction="row" 
            gap={lang === "ar" ? 4.5 : 3.5} 
            alignItems="center" 
            sx={{ 
              flex: 1, 
              display: { xs: "none", lg: "flex" },
              pr: lang === "ar" ? 0 : 8,
              pl: lang === "ar" ? 8 : 0
            }}
          >
            <Button href="#women" className="luxury-link" sx={{ color: "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
              {t("Women")}
            </Button>
            <Button href="#men" className="luxury-link" sx={{ color: "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
              {t("Men")}
            </Button>
            <Button href="#beauty" className="luxury-link" sx={{ color: "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
              {t("Beauty")}
            </Button>
          </Stack>
          
          {/* Centered Brand Name & Logo */}
          <Box sx={{ flex: { xs: 1, lg: "none" }, position: { lg: "absolute" }, left: { lg: "50%" }, transform: { lg: "translateX(-50%)" } }}>
            <BrandMark settings={settings} lang={lang} />
          </Box>

          {/* Right navigation */}
          <Stack 
            direction="row" 
            gap={lang === "ar" ? 4.5 : 3.5} 
            justifyContent="flex-end" 
            alignItems="center" 
            sx={{ 
              flex: 1, 
              display: { xs: "none", lg: "flex" },
              pl: lang === "ar" ? 0 : 8,
              pr: lang === "ar" ? 8 : 0
            }}
          >
            <Button href="#home-deco" className="luxury-link" sx={{ color: "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
              {t("Home & Deco")}
            </Button>
            <Button href="#brand" className="luxury-link" sx={{ color: "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
              {t("Brand")}
            </Button>
            <Button component={Link} href={`/${lang}/blogs`} className="luxury-link" sx={{ color: "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
              {t("Blogs")}
            </Button>
            
            {/* Language Selector */}
            <Button 
              onClick={setLang}
              sx={{ 
                color: "primary.main", 
                textTransform: "uppercase", 
                fontSize: 11, 
                fontWeight: 800, 
                letterSpacing: "0.15em",
                px: 1.5,
                py: 0.5,
                border: "1px solid",
                borderColor: "primary.main",
                borderRadius: 0,
                fontFamily: '"Cairo", sans-serif',
                "&:hover": {
                  bgcolor: "rgba(203, 97, 22, 0.08)",
                  borderColor: "primary.main"
                }
              }}
            >
              {lang === "ar" ? "EN" : "AR"}
            </Button>

            <Button 
              href="#women" 
              endIcon={<NorthEastIcon sx={{ fontSize: 12, mr: lang === "ar" ? 1 : 0, ml: lang === "ar" ? 0 : 1 }} />} 
              sx={{ 
                color: "rgba(255,255,255,.76)", 
                border: "1px solid rgba(255,255,255,.18)", 
                borderRadius: 0, 
                fontSize: 11, 
                fontWeight: 600, 
                letterSpacing: "0.15em", 
                px: 2.2, 
                py: 0.6,
                fontFamily: '"Cairo", sans-serif',
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "#fff",
                  color: "#fff"
                }
              }}
            >
              {t("Explore")}
            </Button>
          </Stack>

          {/* Mobile Header elements */}
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ display: { xs: "flex", lg: "none" }, ml: "auto" }}>
            <Button 
              onClick={setLang}
              size="small"
              sx={{ 
                color: "primary.main", 
                textTransform: "uppercase", 
                fontSize: 10, 
                fontWeight: 800, 
                letterSpacing: "0.15em",
                px: 1.2,
                py: 0.4,
                minWidth: 0,
                border: "1px solid",
                borderColor: "primary.main",
                borderRadius: 0,
                fontFamily: '"Cairo", sans-serif'
              }}
            >
              {lang === "ar" ? "EN" : "AR"}
            </Button>

            <Tooltip title={t("Menu")}>
              <IconButton onClick={() => setOpen(true)} sx={{ color: "#fff", borderLeft: "1px solid rgba(255,255,255,.1)", pl: 2, borderRadius: 0, width: 44, height: 44 }}>
                <MenuIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>

      {/* Fullscreen Mobile Menu Overlay */}
      <Drawer 
        anchor="top" 
        open={open} 
        onClose={() => setOpen(false)} 
        PaperProps={{ 
          sx: { 
            width: "100vw",
            height: "100vh",
            bgcolor: "#050505", 
            backgroundImage: "radial-gradient(circle at 80% 15%, rgba(203, 97, 22, 0.12) 0%, transparent 60%)",
            color: "#fff", 
            p: { xs: 3, md: 6 },
            border: "none",
            display: "flex",
            flexDirection: "column"
          } 
        }}
      >
        <Stack spacing={5} sx={{ height: "100%", justifyContent: "space-between" }}>
          {/* Top Bar inside Overlay */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <BrandMark settings={settings} lang={lang} />
            <IconButton onClick={() => setOpen(false)} sx={{ color: "#fff", border: "1px solid rgba(255,255,255,0.1)", p: 1, borderRadius: "50%" }}>
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Stack>
          
          {/* Centered Editorial Menu List */}
          <Stack spacing={{ xs: 2.5, sm: 3 }} sx={{ my: "auto", px: { xs: 1, sm: 4 } }}>
            {nav.map((item) => {
              const label = item.label || "";
              const desc = label ? (menuDescriptions[label]?.[lang] || "") : "";
              return (
                <Stack 
                  key={label} 
                  spacing={0.5} 
                  sx={{ 
                    borderBottom: "1px solid rgba(255,255,255,0.05)", 
                    pb: 1.5,
                    alignItems: lang === "ar" ? "flex-end" : "flex-start" 
                  }}
                >
                  <Button 
                    href={item.anchor || "#"} 
                    onClick={() => setOpen(false)} 
                    endIcon={lang === "en" && <NorthEastIcon sx={{ fontSize: 16, opacity: 0.4 }} />} 
                    startIcon={lang === "ar" && <NorthEastIcon sx={{ fontSize: 16, opacity: 0.4, transform: "scaleX(-1)" }} />}
                    sx={{ 
                      p: 0,
                      color: "rgba(255,255,255,0.9)", 
                      fontSize: { xs: 24, sm: 32 }, 
                      fontWeight: 500,
                      fontFamily: "var(--heading-font)",
                      textTransform: "none",
                      letterSpacing: "0.02em",
                      textAlign: lang === "ar" ? "right" : "left",
                      "&:hover": {
                        color: "primary.main",
                        transform: lang === "ar" ? "translateX(-6px)" : "translateX(6px)"
                      },
                      transition: "transform 0.3s ease, color 0.3s ease"
                    }}
                  >
                    {t(item.label)}
                  </Button>
                  {desc && (
                    <Typography sx={{ color: "rgba(255,255,255,0.42)", fontSize: { xs: 11, sm: 12.5 }, fontFamily: '"Cairo", sans-serif', letterSpacing: "0.05em" }}>
                      {desc}
                    </Typography>
                  )}
                </Stack>
              );
            })}
            
            {/* Blogs Link */}
            <Stack 
              spacing={0.5} 
              sx={{ 
                borderBottom: "1px solid rgba(255,255,255,0.05)", 
                pb: 1.5,
                alignItems: lang === "ar" ? "flex-end" : "flex-start" 
              }}
            >
              <Button 
                component={Link}
                href={`/${lang}/blogs`} 
                onClick={() => setOpen(false)} 
                endIcon={lang === "en" && <NorthEastIcon sx={{ fontSize: 16, opacity: 0.4 }} />} 
                startIcon={lang === "ar" && <NorthEastIcon sx={{ fontSize: 16, opacity: 0.4, transform: "scaleX(-1)" }} />}
                sx={{ 
                  p: 0,
                  color: "rgba(255,255,255,0.9)", 
                  fontSize: { xs: 24, sm: 32 }, 
                  fontWeight: 500,
                  fontFamily: "var(--heading-font)",
                  textTransform: "none",
                  letterSpacing: "0.02em",
                  textAlign: lang === "ar" ? "right" : "left",
                  "&:hover": {
                    color: "primary.main",
                    transform: lang === "ar" ? "translateX(-6px)" : "translateX(6px)"
                  },
                  transition: "transform 0.3s ease, color 0.3s ease"
                }}
              >
                {t("Blogs")}
              </Button>
              <Typography sx={{ color: "rgba(255,255,255,0.42)", fontSize: { xs: 11, sm: 12.5 }, fontFamily: '"Cairo", sans-serif', letterSpacing: "0.05em" }}>
                {menuDescriptions["Blogs"]?.[lang] || ""}
              </Typography>
            </Stack>

            {/* Contact Link */}
            <Stack 
              spacing={0.5} 
              sx={{ 
                borderBottom: "1px solid rgba(255,255,255,0.05)", 
                pb: 1.5,
                alignItems: lang === "ar" ? "flex-end" : "flex-start" 
              }}
            >
              <Button 
                component={Link}
                href={`/${lang}/contact`} 
                onClick={() => setOpen(false)} 
                endIcon={lang === "en" && <NorthEastIcon sx={{ fontSize: 16, opacity: 0.4 }} />} 
                startIcon={lang === "ar" && <NorthEastIcon sx={{ fontSize: 16, opacity: 0.4, transform: "scaleX(-1)" }} />}
                sx={{ 
                  p: 0,
                  color: "rgba(255,255,255,0.9)", 
                  fontSize: { xs: 24, sm: 32 }, 
                  fontWeight: 500,
                  fontFamily: "var(--heading-font)",
                  textTransform: "none",
                  letterSpacing: "0.02em",
                  textAlign: lang === "ar" ? "right" : "left",
                  "&:hover": {
                    color: "primary.main",
                    transform: lang === "ar" ? "translateX(-6px)" : "translateX(6px)"
                  },
                  transition: "transform 0.3s ease, color 0.3s ease"
                }}
              >
                {lang === "ar" ? "اتصل بنا" : "Contact"}
              </Button>
              <Typography sx={{ color: "rgba(255,255,255,0.42)", fontSize: { xs: 11, sm: 12.5 }, fontFamily: '"Cairo", sans-serif', letterSpacing: "0.05em" }}>
                {lang === "ar" ? "تواصل مع مستشارنا الخاص" : "Connect with our private concierge"}
              </Typography>
            </Stack>
          </Stack>
          
          {/* Bottom Overlay Info */}
          <Typography sx={{ color: "rgba(255,255,255,.36)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", textAlign: "center", fontFamily: '"Cairo", sans-serif' }}>
            {t("On Boulevard. For the world.")}
          </Typography>
        </Stack>
      </Drawer>
    </>
  );
}



















function SectionRenderer({ 
  section, 
  t, 
  lang 
}: { 
  section: Section; 
  t: (s?: string) => string; 
  lang: "ar" | "en"; 
}) {
  if (section.type === "hero") return <HeroSection section={section} t={t} lang={lang} />;
  if (section.type === "manifesto") return <ManifestoSection section={section} t={t} />;
  if (section.type === "collections") return <CollectionsSection section={section} t={t} lang={lang} />;
  if (section.type === "lookbook") return <LookbookSection section={section} t={t} lang={lang} />;
  if (section.type === "boulevard-selection") return <BoulevardSelectionSection section={section} t={t} lang={lang} />;
  if (section.type === "carousel") return <CarouselSection section={section} t={t} lang={lang} />;
  if (section.type === "editorial") return <EditorialSection section={section} t={t} lang={lang} />;
  return null;
}



export default function Storefront({ settings, sections }: { settings: SiteSettings; sections: Section[] }) {
  const params = useParams();
  const router = useRouter();
  const lang = (params?.lang === "en" ? "en" : "ar") as "ar" | "en";
  const [isLangTransitioning, setIsLangTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsLangTransitioning(false);
  }, [lang]);

  const handleLangToggle = () => {
    setIsLangTransitioning(true);
    setTimeout(() => {
      const nextLang = lang === "ar" ? "en" : "ar";
      router.push(`/${nextLang}`);
    }, 250);
  };

  // Snappy loading duration for cinematic entry
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Intercept product/blog link clicks to show loader instantly during compilation/fetching
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleGlobalClick = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      while (target && target !== document.body) {
        if (target.tagName === "A") {
          const href = target.getAttribute("href");
          if (href && (href.includes("/product/") || href.includes("/blogs"))) {
            setLoading(true);
            break;
          }
        }
        target = target.parentElement;
      }
    };
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  // Translation function using the mapping list
  const t = (str?: string) => {
    if (!str) return "";
    if (lang === "en") return str;
    return stringMap[str.trim()] || str;
  };

  // Sync browser language and direction dynamically
  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: "dark",
      primary: { main: settings.primaryColor || "#CB6116", dark: "#9D430C" },
      secondary: { main: settings.accentColor || "#D06010" }
    },
    typography: {
      fontFamily: `"Cairo", sans-serif`, // Strictly Cairo for body and UI layout as mentioned in PDF settings
      button: { fontWeight: 800 }
    },
    shape: { borderRadius: 0 }
  }), [settings.accentColor, settings.primaryColor]);

  return (
    <ThemeProvider theme={theme}>
      {/* Cinematic Elegant Loader Overlay */}
      <AnimatePresence>
        {loading && (
          <MotionBox
            initial={{ opacity: 1 }}
            exit={{ 
              y: "-100%", 
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
            }}
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: 99999, // Render above sticky navigation
              bgcolor: "#050505",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Stack spacing={3.5} alignItems="center">
              {/* Glowing Monogram script logo */}
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                src="/brand/logo.png"
                alt="Fashion Gate"
                style={{ width: "80px", maxWidth: "100px", height: "auto", objectFit: "contain" }}
              />
              
              <MotionBox
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                sx={{ textAlign: "center" }}
              >
                <Typography 
                  sx={{ 
                    fontFamily: "var(--heading-font)", 
                    fontSize: { xs: "1.4rem", md: "1.8rem" }, 
                    fontWeight: 500, 
                    letterSpacing: "0.25em", 
                    color: "#ffffff",
                    textTransform: "uppercase"
                  }}
                >
                  FASHION GATE
                </Typography>
                <Typography 
                  sx={{ 
                    fontFamily: '"Cairo", sans-serif', 
                    fontSize: 10, 
                    fontWeight: 600, 
                    letterSpacing: "0.4em", 
                    color: "#CB6116", // Brand orange
                    textTransform: "uppercase",
                    mt: 1
                  }}
                >
                  BOULEVARD
                </Typography>
              </MotionBox>
              
              {/* Elegant Accent Orange Progress bar */}
              <Box sx={{ width: 140, height: 1.5, bgcolor: "rgba(255,255,255,0.08)", mt: 4, position: "relative", overflow: "hidden" }}>
                <MotionBox 
                  initial={{ left: "-100%" }}
                  animate={{ left: "0%" }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                  sx={{ 
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    width: "100%",
                    bgcolor: "#CB6116"
                  }}
                />
              </Box>
            </Stack>
          </MotionBox>
        )}
      </AnimatePresence>


      <Box 
        dir={lang === "ar" ? "rtl" : "ltr"} 
        sx={{ 
          bgcolor: "var(--fg-white)", 
          color: "#111", 
          minHeight: "100vh"
        }}
      >
        <Box 
          sx={{ 
            opacity: isLangTransitioning ? 0 : 1, 
            transition: "opacity 0.25s ease-in-out" 
          }}
        >
          <FloatingMenu settings={settings} lang={lang} setLang={handleLangToggle} t={t} />
          {sections.map((section, index) => (
            <SectionRenderer 
              key={section._id || `${section.type}-${index}`} 
              section={section} 
              t={t} 
              lang={lang} 
            />
          ))}
          <CategoryProductSections t={t} lang={lang} />
          <AtelierShowcaseSection t={t} lang={lang} />
          <SiteFooter />
        </Box>
      </Box>
    </ThemeProvider>
  );
}


