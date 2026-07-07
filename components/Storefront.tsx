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
import { products, type Product } from "@/lib/productData";
import SiteFooter from "@/components/SiteFooter";

const MotionBox = motion.create(Box);

const shopNavigation = [
  { label: "Women", anchor: "#women" },
  { label: "Men", anchor: "#men" },
  { label: "Beauty", anchor: "#beauty" },
  { label: "Home & Deco", anchor: "#home-deco" },
  { label: "Brand", anchor: "#brand" }
];

const shopCategories = [
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
  "Blogs": "Blogs",
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

function resolveImage(source?: SanityImage, fallback?: string) {
  if (source?.asset?._ref || source?.asset?._id) {
    return imageUrl(source).width(1800).quality(88).url();
  }
  return fallback || "/brand-pages/page_01.jpg";
}

function imageLayer(url: string) {
  return `linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.68)), url(${url})`;
}

function BrandMark({ settings, light = false }: { settings: SiteSettings; light?: boolean }) {
  const textColor = light ? "#111111" : "#ffffff";
  const subColor = light ? "rgba(0,0,0,.54)" : "rgba(255,255,255,.68)";

  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
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
            fontSize: "14px",
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

function FloatingMenu({ settings, lang, setLang, t }: { settings: SiteSettings; lang: "ar" | "en"; setLang: (l: "ar" | "en") => void; t: (s?: string) => string }) {
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
          <Stack direction="row" spacing={lang === "ar" ? 4 : 3} alignItems="center" sx={{ flex: 1, display: { xs: "none", lg: "flex" } }}>
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
            <BrandMark settings={settings} />
          </Box>

          {/* Right navigation */}
          <Stack direction="row" spacing={lang === "ar" ? 4 : 3} justifyContent="flex-end" alignItems="center" sx={{ flex: 1, display: { xs: "none", lg: "flex" } }}>
            <Button href="#home-deco" className="luxury-link" sx={{ color: "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
              {t("Home & Deco")}
            </Button>
            <Button href="#brand" className="luxury-link" sx={{ color: "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
              {t("Brand")}
            </Button>
            <Button component={Link} href="/blogs" className="luxury-link" sx={{ color: "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
              {t("Blogs")}
            </Button>
            
            {/* Language Selector */}
            <Button 
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
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
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
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
            <BrandMark settings={settings} />
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
                href="/blogs" 
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

function HeroSection({ section, t, lang }: { section: Section; t: (s?: string) => string; lang: "ar" | "en" }) {
  const image = "/brand/hero-woman-wide.png"; // Wide landscape image source

  return (
    <Box 
      id={section.anchor} 
      component="section" 
      sx={{ 
        height: { xs: "calc(100svh - 60px)", md: "calc(100svh - 72px)" },
        minHeight: { xs: "calc(100svh - 60px)", md: "calc(100svh - 72px)" },
        position: "relative", 
        overflow: "hidden", 
        color: "#fff",
        // Background image set on pseudo-element - kept static (no scale mirror) in Arabic
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "right top", // Stay identical to English
          transform: "none", // Stay identical to English (no scale flip)
          filter: "brightness(0.86)",
          zIndex: 1
        }
      }}
    >
      {/* Center text on top - Layered in Apple Garamond with reduced size */}
      <Box 
        sx={{ 
          position: "absolute", 
          inset: 0, 
          display: "flex", 
          flexDirection: "column",
          justifyContent: "center", 
          alignItems: "center", 
          px: 3, 
          textAlign: "center",
          pointerEvents: "none",
          zIndex: 10
        }}
      >
        <Typography 
          component="h1" 
          className="animate-tracking"
          sx={{ 
            fontFamily: "var(--heading-font)", 
            fontSize: { xs: "2.4rem", sm: "4.2rem", md: "6rem", lg: "7.8rem" }, // Reduced font size to look more elegant
            fontWeight: 500,
            lineHeight: 0.9, 
            textTransform: "uppercase", 
            color: "#ffffffb5",
            letterSpacing: lang === "ar" ? "0.02em" : "0.06em",
            textShadow: "0 4px 25px rgba(0,0,0,0.5)"
          }}
        >
          {lang === "ar" ? "بوابة الأزياء" : (section.headline || "Fashion Gate")}
        </Typography>
      </Box>

      {/* Eyebrow and CTA description at bottom */}
      <Container maxWidth="xl" sx={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 12, pb: { xs: 3, md: 5 } }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 2.5, md: 3 }} alignItems={{ xs: "flex-start", md: "center" }} sx={{ width: "100%", justifyContent: "space-between" }}>
          <Typography className="animate-fade-in" sx={{ maxWidth: 540, color: "rgba(255,255,255,.6)", fontSize: { xs: 10, md: 11 }, letterSpacing: "0.18em", lineHeight: 1.7, textTransform: "uppercase", fontFamily: '"Cairo", sans-serif' }}>
            {t(section.eyebrow) || t("Syria's first international luxury department store")}
          </Typography>
          {section.ctaLabel && (
            <Button 
              href={section.ctaHref || "#manifesto"} 
              endIcon={<ArrowForwardIcon sx={{ mr: lang === "ar" ? 1 : 0, ml: lang === "ar" ? 0 : 1, transform: lang === "ar" ? "rotate(180deg)" : "none" }} />} 
              sx={{ 
                color: "#fff", 
                border: "1px solid rgba(255,255,255,.28)", 
                px: 4, 
                py: 1.4, 
                borderRadius: 0, 
                textTransform: "uppercase", 
                fontSize: 10, 
                fontWeight: 700, 
                letterSpacing: "0.15em",
                pointerEvents: "auto",
                fontFamily: '"Cairo", sans-serif',
                transition: "all 0.3s ease",
                "&:hover": { 
                  bgcolor: "#fff", 
                  color: "#050505",
                  borderColor: "#fff"
                } 
              }}
            >
              {t(section.ctaLabel)}
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

function ManifestoSection({ section, t }: { section: Section; t: (s?: string) => string }) {
  return (
    <Box id={section.anchor} component="section" sx={{ minHeight: "90svh", bgcolor: "var(--fg-white)", color: "#111", display: "flex", alignItems: "center", py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <Stack spacing={{ xs: 4, md: 6 }} alignItems="center" textAlign="center" sx={{ mx: "auto", maxWidth: 1000 }}>
          <Typography sx={{ color: "primary.main", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: 12, fontWeight: 700, fontFamily: '"Cairo", sans-serif' }}>
            {t(section.eyebrow) || t("Manifesto")}
          </Typography>
          <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 22, sm: 32, md: 42 }, fontWeight: 400, lineHeight: 1.35, color: "#111" }}>
            "{t(section.description)}"
          </Typography>
          <Typography sx={{ fontFamily: "var(--heading-font)", fontStyle: "italic", fontSize: { xs: 20, md: 28 }, color: "primary.main", fontWeight: 300 }}>
            {t(section.headline)}
          </Typography>
          <Typography 
            sx={{ 
              fontFamily: '"Griphorium", "Griphosium", "Graphion", "Brush Script MT", cursive',
              fontStyle: "italic",
              fontSize: { xs: "2.4rem", sm: "3.2rem", md: "4rem" }, 
              color: "#111", 
              opacity: 0.9, 
              mt: 2,
              letterSpacing: "0.02em"
            }}
          >
            Fashion Gate
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}



function CarouselSection({ section, t, lang }: { section: Section; t: (s?: string) => string; lang: "ar" | "en" }) {
  const slides = section.slides?.length ? section.slides : [];
  const [active, setActive] = useState(0);
  const slide = slides[active] || slides[0];
  const image = resolveImage(slide?.image, slide?.imageUrl || section.imageUrl);

  return (
    <Box 
      id={section.anchor} 
      component="section" 
      sx={{ 
        bgcolor: "primary.main", // Burnt orange background
        color: "#111111", // Black text
        overflow: "hidden"
      }}
    >
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", md: "row" }, // Let document direction (LTR/RTL) handle column rendering order naturally
          minHeight: { xs: "auto", md: "680px" },
          alignItems: "stretch"
        }}
      >
        {/* Left Side: Content & Controls */}
        <Box 
          sx={{ 
            flex: 1, 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center", 
            py: { xs: 8, md: 12 }, 
            px: { xs: 3, sm: 6, md: 8, lg: 12 },
            textAlign: lang === "ar" ? "right" : "left"
          }}
        >
          <Typography 
            sx={{ 
              color: "rgba(0,0,0,0.54)", 
              textTransform: "uppercase", 
              fontSize: 11, 
              fontWeight: 700, 
              letterSpacing: "0.18em", 
              fontFamily: '"Cairo", sans-serif',
              mb: 1
            }}
          >
            {t(section.eyebrow)}
          </Typography>

          <Typography 
            sx={{ 
              fontFamily: "var(--heading-font)", 
              fontSize: { xs: "2rem", sm: "2.8rem", md: "3.5rem" }, 
              fontWeight: 500, 
              lineHeight: 1.15,
              color: "#111111",
              mb: 2.5
            }}
          >
            {t(slide?.title || section.headline)}
          </Typography>

          <Typography 
            sx={{ 
              color: "rgba(0,0,0,0.8)", 
              fontSize: 15, 
              lineHeight: 1.8, 
              fontFamily: '"Cairo", sans-serif',
              mb: 4,
              maxWidth: 550
            }}
          >
            {t(slide?.description || section.description)}
          </Typography>
          
          <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap sx={{ mt: "auto" }}>
            {slides.map((item, index) => (
              <Button 
                key={`${item.title}-${index}`} 
                onClick={() => setActive(index)} 
                sx={{ 
                  borderRadius: 0, 
                  color: index === active ? "#fff" : "#111111", 
                  bgcolor: index === active ? "#111111" : "transparent", 
                  border: "1px solid #111111",
                  textTransform: "none",
                  minWidth: 44,
                  height: 44,
                  fontWeight: 700,
                  fontFamily: '"Cairo", sans-serif',
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: index === active ? "#111111" : "rgba(0,0,0,0.06)"
                  }
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </Button>
            ))}
          </Stack>
        </Box>
        
        {/* Right Side: Flush Image */}
        <Box 
          sx={{ 
            flex: { xs: "none", md: 1.2 }, 
            minHeight: { xs: 350, sm: 450, md: "auto" },
            position: "relative",
            overflow: "hidden"
          }}
        >
          <MotionBox 
            key={active} 
            initial={{ opacity: 0, scale: 1.02 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, ease: "easeOut" }} 
            sx={{ 
              position: "absolute",
              inset: 0,
              backgroundImage: imageLayer(image), 
              backgroundSize: "cover", 
              backgroundPosition: "center",
              width: "100%",
              height: "100%"
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

function CollectionsSection({ section, t, lang }: { section: Section; t: (s?: string) => string; lang: "ar" | "en" }) {
  const collections = section.collections || [];

  return (
    <Box id={section.anchor} component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: "var(--fg-white)", color: "#111" }}>
      <Container maxWidth="xl">
        <Stack spacing={{ xs: 8, md: 12 }}>
          {/* Header block */}
          <Box sx={{ maxWidth: 840, textAlign: lang === "ar" ? "right" : "left" }}>
            <Typography sx={{ color: "primary.main", textTransform: "uppercase", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>{t(section.eyebrow)}</Typography>
            <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 36, md: 54 }, fontWeight: 500, lineHeight: 1.15, mt: 1.5 }}>{t(section.headline)}</Typography>
            <Typography sx={{ color: "rgba(0,0,0,.6)", fontSize: 16, lineHeight: 1.8, mt: 2, fontFamily: '"Cairo", sans-serif', maxWidth: 780 }}>{t(section.description)}</Typography>
          </Box>
          
          {/* Alternating split rows */}
          <Stack spacing={{ xs: 8, md: 14 }}>
            {collections.map((item: CollectionItem, index) => {
              const image = resolveImage(item.coverImage, item.imageUrl);
              // Determine alignment based on index and language direction
              const isEven = index % 2 === 0;
              const isRtl = lang === "ar";
              const showReverse = isRtl ? isEven : !isEven; // Alternating grid columns order

              return (
                <Box 
                  key={`${item.title}-${index}`}
                  sx={{ 
                    display: "flex", 
                    flexDirection: { xs: "column", md: showReverse ? "row-reverse" : "row" }, 
                    alignItems: "center",
                    gap: { xs: 4, md: 8, lg: 12 }
                  }}
                >
                  {/* Image Showcase Box */}
                  <Box 
                    sx={{ 
                      flex: 1.2, 
                      width: "100%",
                      aspectRatio: "16 / 11", 
                      overflow: "hidden",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.06)",
                      border: "1px solid rgba(0,0,0,0.04)"
                    }}
                  >
                    <motion.img
                      initial={{ opacity: 0, scale: 1.03 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      whileHover={{ scale: 1.03 }}
                      src={image}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)"
                      }}
                    />
                  </Box>

                  {/* Text details Box */}
                  <Box 
                    sx={{ 
                      flex: 1, 
                      width: "100%",
                      display: "flex", 
                      flexDirection: "column",
                      justifyContent: "center",
                      textAlign: isRtl ? "right" : "left"
                    }}
                  >
                    {/* Big Elegant Index Number */}
                    <Typography 
                      sx={{ 
                        fontFamily: "var(--heading-font)", 
                        fontSize: { xs: 54, md: 80 }, 
                        fontWeight: 300, 
                        lineHeight: 1,
                        color: "rgba(203, 97, 22, 0.08)", // Soft glow primary color
                        mb: -2,
                        userSelect: "none"
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </Typography>

                    <Typography sx={{ color: "primary.main", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", mb: 1, fontFamily: '"Cairo", sans-serif' }}>
                      {t(item.title)}
                    </Typography>
                    <Typography sx={{ color: "#111111", fontFamily: "var(--heading-font)", fontSize: { xs: 28, md: 36 }, fontWeight: 500, mb: 2, lineHeight: 1.25 }}>
                      {t(item.headline)}
                    </Typography>
                    <Typography sx={{ color: "rgba(0,0,0,0.65)", fontSize: 14, lineHeight: 1.8, fontFamily: '"Cairo", sans-serif', maxWidth: 480 }}>
                      {t(item.description)}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

function CategoryProductSections({ t, lang }: { t: (s?: string) => string; lang: "ar" | "en" }) {
  const [activeTab, setActiveTab] = useState("women");

  const curCategory = shopCategories.find((cat) => cat.id === activeTab) || shopCategories[0];
  const categoryProducts = curCategory.productIds
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);

  // Sync hash links with active tab and scroll to categories section
  useEffect(() => {
    const handleHashChange = () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash.replace("#", "");
        if (["women", "men", "beauty", "home-deco"].includes(hash)) {
          setActiveTab(hash);
          const el = document.getElementById("curated-departments");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }
    };

    handleHashChange(); // Run on mount
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <Box 
      component="section" 
      id="curated-departments" 
      sx={{ 
        bgcolor: "#ffffff", 
        color: "#111111", 
        py: { xs: 10, md: 14 }, 
        scrollMarginTop: { xs: 80, md: 100 } 
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={{ xs: 6, md: 8 }}>
          
          {/* Aligned Editorial Section Header */}
          <Stack spacing={2} sx={{ textAlign: lang === "ar" ? "right" : "left", alignItems: lang === "ar" ? "flex-end" : "flex-start", maxWidth: 820, px: 2 }}>
            <Typography sx={{ color: "primary.main", textTransform: "uppercase", fontSize: 11, fontWeight: 800, letterSpacing: "0.24em" }}>
              {lang === "ar" ? "بوليفارد بوابة الأزياء" : "Fashion Gate Curations"}
            </Typography>
            <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 34, md: 54 }, fontWeight: 500, lineHeight: 1.1 }}>
              {lang === "ar" ? "أقسام منسقة بعناية" : "Curated category paths"}
            </Typography>
            <Typography sx={{ color: "rgba(0,0,0,0.6)", fontSize: 14.5, lineHeight: 1.8 }}>
              {lang === "ar" 
                ? "تنقل بين أقسام البوتيك الفاخرة مباشرة. يتم ترتيب كل مجموعة لإبراز التفاصيل الحرفية والتصاميم المحددة."
                : "Explore curated seasonal edits directly. Each department is logically arranged to present detailed designer updates and structured silhouettes."}
            </Typography>
          </Stack>

          {/* Aligned Tab Switcher */}
          <Stack 
            direction="row" 
            spacing={{ xs: 1.5, sm: 3.5 }} 
            justifyContent={lang === "ar" ? "flex-end" : "flex-start"} 
            flexWrap="wrap" 
            useFlexGap
            sx={{ borderBottom: "1px solid rgba(0,0,0,0.06)", pb: 2 }}
          >
            {shopCategories.map((category) => {
              const isSelected = activeTab === category.id;
              return (
                <Button
                  key={category.id}
                  onClick={() => {
                    setActiveTab(category.id);
                    if (typeof window !== "undefined") {
                      window.history.pushState(null, "", `#${category.id}`);
                    }
                  }}
                  sx={{
                    color: isSelected ? "primary.main" : "rgba(0,0,0,0.48)",
                    fontSize: { xs: 15, sm: 18 },
                    fontWeight: isSelected ? 700 : 500,
                    fontFamily: "var(--heading-font)",
                    px: { xs: 1.5, sm: 2.5 },
                    py: 1,
                    borderRadius: 0,
                    textTransform: "none",
                    position: "relative",
                    transition: "color 0.3s ease",
                    "&::after": isSelected ? {
                      content: '""',
                      position: "absolute",
                      bottom: -17,
                      left: 0,
                      right: 0,
                      height: 2,
                      bgcolor: "primary.main",
                    } : {}
                  }}
                >
                  {t(category.label)}
                </Button>
              );
            })}
          </Stack>

          {/* Active Tab Lead Description */}
          <Stack 
            spacing={1} 
            sx={{ 
              textAlign: lang === "ar" ? "right" : "left", 
              alignItems: lang === "ar" ? "flex-end" : "flex-start", 
              maxWidth: 720, 
              pt: 1,
              pb: 2
            }}
          >
            <Typography sx={{ color: "primary.main", fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" }}>
              {curCategory.eyebrow}
            </Typography>
            <Typography sx={{ color: "rgba(0,0,0,0.58)", fontSize: 14, lineHeight: 1.7, fontStyle: "italic" }}>
              {curCategory.description}
            </Typography>
          </Stack>

          {/* Symmetrical 4-Column Product Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Box 
                sx={{ 
                  display: "grid", 
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" }, 
                  gap: 3.5, 
                  alignItems: "start" 
                }}
              >
                {categoryProducts.map((product) => {
                  if (!product) return null;
                  const title = lang === "ar" ? product.titleAr : product.title;
                  const productCategory = lang === "ar" ? product.categoryAr : product.category;

                  return (
                    <Link
                      key={`${activeTab}-${product.id}`}
                      href={`/product/${product.id}?lang=${lang}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                          "&:hover": {
                            transform: "translateY(-6px)"
                          },
                          "&:hover .category-product-image": {
                            transform: "scale(1.03)"
                          }
                        }}
                      >
                        {/* Clean Borderless Image Box */}
                        <Box 
                          sx={{ 
                            aspectRatio: "3 / 4", 
                            overflow: "hidden", 
                            bgcolor: "#FAF8F5",
                            position: "relative",
                            border: "1px solid rgba(0,0,0,0.03)"
                          }}
                        >
                          <Box
                            component="img"
                            className="category-product-image"
                            src={product.imageUrl}
                            alt={title}
                            sx={{ 
                              width: "100%", 
                              height: "100%", 
                              objectFit: "cover", 
                              transition: "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)" 
                            }}
                          />
                        </Box>

                        {/* Typography & Actions */}
                        <Stack spacing={0.8} sx={{ pt: 2, textAlign: lang === "ar" ? "right" : "left" }}>
                          <Typography sx={{ color: "primary.main", fontSize: 9, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                            {productCategory}
                          </Typography>
                          <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: 19, lineHeight: 1.15, fontWeight: 500 }}>
                            {title}
                          </Typography>
                          <Typography
                            sx={{
                              color: "rgba(0,0,0,0.52)",
                              fontSize: 13,
                              lineHeight: 1.5,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden"
                            }}
                          >
                            {lang === "ar" ? product.descriptionAr : product.description}
                          </Typography>
                          <Stack direction="row" spacing={0.8} alignItems="center" sx={{ color: "#111111", pt: 0.5 }}>
                            <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em" }}>
                              {lang === "ar" ? "عرض التفاصيل" : "View details"}
                            </Typography>
                            <NorthEastIcon sx={{ fontSize: 12, color: "primary.main", transform: lang === "ar" ? "scaleX(-1)" : "none" }} />
                          </Stack>
                        </Stack>
                      </Box>
                    </Link>
                  );
                })}
              </Box>
            </motion.div>
          </AnimatePresence>
        </Stack>
      </Container>
    </Box>
  );
}

function LookbookSection({ 
  section, 
  t, 
  lang 
}: { 
  section: Section; 
  t: (s?: string) => string; 
  lang: "ar" | "en"; 
}) {
  const marqueeProducts = useMemo(() => [...products, ...products], []);

  return (
    <Box id={section.anchor} component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: "#080808", overflow: "hidden", color: "#fff" }}>
      <Container maxWidth="xl">
        {/* Typographic Staggered Header */}
        <Box 
          sx={{ 
            display: "flex", 
            flexDirection: { xs: "column", md: "row" }, 
            justifyContent: "space-between", 
            alignItems: { xs: "flex-start", md: "flex-end" }, 
            gap: 4, 
            mb: 8,
            textAlign: lang === "ar" ? "right" : "left"
          }}
        >
          <Box sx={{ maxWidth: 720 }}>
            <Typography sx={{ color: "primary.main", textTransform: "uppercase", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif', mb: 2 }}>
              {t("Curated Pieces")}
            </Typography>
            <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 36, sm: 48, md: 62 }, fontWeight: 500, lineHeight: 1.1, color: "#ffffff" }}>
              {lang === "ar" ? (
                <>
                  قطع <Box component="span" sx={{ fontFamily: '"Griphorium", "Griphosium", "Graphion", "Brush Script MT", cursive', color: "primary.main", fontStyle: "italic", mx: 1 }}>حصرية</Box> مصممة بعناية
                </>
              ) : (
                <>
                  Curated <Box component="span" sx={{ fontFamily: '"Griphorium", "Griphosium", "Graphion", "Brush Script MT", cursive', color: "primary.main", fontStyle: "italic", mx: 1 }}>Designer</Box> Masterpieces
                </>
              )}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 3.5, alignItems: "center", maxWidth: 580 }}>
            <Box 
              component="img"
              src="/assets/bagdark.png"
              alt="Fashion Gate Boulevard Carrier Bag"
              sx={{ 
                width: { xs: 90, md: 110 }, 
                height: "auto", 
                objectFit: "contain",
                filter: "drop-shadow(0px 8px 24px rgba(255,255,255,0.03))",
                animation: "float-bag-dark 6s ease-in-out infinite",
                "@keyframes float-bag-dark": {
                  "0%": { transform: "translateY(0px) rotate(0deg)" },
                  "50%": { transform: "translateY(-8px) rotate(1.5deg)" },
                  "100%": { transform: "translateY(0px) rotate(0deg)" }
                }
              }}
            />
            <Typography sx={{ color: "rgba(255,255,255,.62)", fontSize: 15, lineHeight: 1.7, fontFamily: '"Cairo", sans-serif', maxWidth: 440 }}>
              {t("Explore a singular gallery of signature items, where architectural geometry meets tactile luxury from Damascus to the world.")}
            </Typography>
          </Box>
        </Box>

        {/* Continuous product marquee */}
        <Box 
          sx={{ 
            overflow: "hidden", 
            width: "100%", 
            py: 2,
            position: "relative",
            direction: "ltr",
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              top: 0,
              bottom: 0,
              width: { xs: 38, md: 110 },
              zIndex: 5,
              pointerEvents: "none"
            },
            "&::before": {
              left: 0,
              background: "linear-gradient(90deg, #080808 0%, rgba(8,8,8,0) 100%)"
            },
            "&::after": {
              right: 0,
              background: "linear-gradient(270deg, #080808 0%, rgba(8,8,8,0) 100%)"
            },
            "@keyframes lookbook-marquee-ltr": {
              "0%": { transform: "translate3d(0, 0, 0)" },
              "100%": { transform: "translate3d(-50%, 0, 0)" }
            },
            "@keyframes lookbook-marquee-rtl": {
              "0%": { transform: "translate3d(-50%, 0, 0)" },
              "100%": { transform: "translate3d(0, 0, 0)" }
            }
          }}
        >
          <Box 
            sx={{ 
              display: "flex", 
              gap: { xs: 2.5, md: 4 }, 
              width: "max-content",
              px: 4,
              willChange: "transform",
              transform: "translate3d(0,0,0)",
              animation: `${lang === "ar" ? "lookbook-marquee-rtl" : "lookbook-marquee-ltr"} 95s linear infinite`,
              "&:hover": {
                animationPlayState: "running"
              },
              "@media (prefers-reduced-motion: reduce)": {
                animation: "none",
                overflowX: "auto",
                width: "100%",
                scrollSnapType: "x mandatory",
                px: 0,
                pb: 1
              }
            }}
          >
            {marqueeProducts.map((product, idx) => {
              const title = lang === "ar" ? product.titleAr : product.title;
              const category = lang === "ar" ? product.categoryAr : product.category;

              return (
                <Link 
                  key={`${product.id}-${idx}`}
                  href={`/product/${product.id}?lang=${lang}`}
                  style={{ textDecoration: "none" }}
                  draggable="false"
                  onDragStart={(e) => e.preventDefault()}
                >
                  <Box
                    sx={{
                      width: { xs: 280, md: 460 }, 
                      aspectRatio: "4 / 5",
                      position: "relative",
                      overflow: "hidden",
                      border: "1px solid rgba(255,255,255,0.06)",
                      cursor: "pointer",
                      flex: "0 0 auto",
                      scrollSnapAlign: "start",
                      // Shiny diagonal swipe animation covering entire card
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "250%",
                        height: "100%",
                        background: "linear-gradient(135deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0) 70%)",
                        transform: "translateX(-110%) translateY(110%) skewX(-15deg)",
                        transition: "transform 1.1s cubic-bezier(0.25, 1, 0.5, 1)",
                        pointerEvents: "none",
                        zIndex: 3
                      },
                      "&:hover::after": {
                        transform: "translateX(110%) translateY(-110%) skewX(-15deg)"
                      },
                      "&:hover .hover-overlay": {
                        opacity: 1
                      },
                      "&:hover .product-title": {
                        transform: "translateY(0)",
                        opacity: 1
                      },
                      "&:hover .product-btn": {
                        transform: "translateY(0)",
                        opacity: 1
                      }
                    }}
                  >
                    {/* Product Image with Zoom-in Ease */}
                    <motion.img 
                      src={product.imageUrl} 
                      alt={title} 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        pointerEvents: "none"
                      }}
                      draggable="false"
                    />

                    {/* Hover Details Overlay */}
                    <Box 
                      className="hover-overlay"
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.15) 100%)",
                        opacity: 0,
                        transition: "opacity 0.4s ease",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        p: 3,
                        zIndex: 2,
                        textAlign: lang === "ar" ? "right" : "left"
                      }}
                    >
                      <Typography sx={{ color: "primary.main", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", mb: 0.5, fontFamily: '"Cairo", sans-serif' }}>
                        {category}
                      </Typography>
                      
                      <Typography 
                        className="product-title"
                        sx={{ 
                          color: "#ffffff", 
                          fontFamily: "var(--heading-font)", 
                          fontSize: 20, 
                          fontWeight: 500, 
                          mb: 3,
                          transform: "translateY(15px)",
                          opacity: 0,
                          transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease",
                          transitionDelay: "0.05s"
                        }}
                      >
                        {title}
                      </Typography>

                      <Button
                        className="product-btn"
                        variant="outlined"
                        sx={{
                          borderColor: "primary.main",
                          color: "#ffffff",
                          borderRadius: 0,
                          py: 1,
                          fontSize: 12,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          fontFamily: '"Cairo", sans-serif',
                          transform: "translateY(20px)",
                          opacity: 0,
                          transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease",
                          transitionDelay: "0.1s",
                          "&:hover": {
                            bgcolor: "primary.main",
                            borderColor: "primary.main",
                            color: "#ffffff"
                          }
                        }}
                      >
                        {t("Explore Piece")}
                      </Button>
                    </Box>
                  </Box>
                </Link>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function BoulevardSelectionSection({ section, t, lang }: { section: Section; t: (s?: string) => string; lang: "ar" | "en" }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const boulevardIds = [
    "boss-hugo-boss-polo",
    "fgb-urban-active-footwear",
    "adidas-originals-sportswear",
    "fgb-white-lace-midi-dress",
    "fgb-modern-tailored-blazer",
    "si-passione-giorgio-armani-perfume",
    "fgb-silk-oversized-shirt"
  ];
  
  const boulevardProducts = useMemo(() => {
    return boulevardIds
      .map(id => products.find(p => p.id === id))
      .filter(Boolean) as any[];
  }, [lang]);

  // Dynamic grids settings for the 12-column asymmetric magazine layout
  const layoutSettings = [
    { gridCol: { xs: 12, sm: 6, md: 7 }, mt: { xs: 0, md: 0 } },
    { gridCol: { xs: 12, sm: 6, md: 5 }, mt: { xs: 0, md: 12 } },
    { gridCol: { xs: 12, sm: 6, md: 4 }, mt: { xs: 0, md: 0 } },
    { gridCol: { xs: 12, sm: 6, md: 4 }, mt: { xs: 0, md: 6 } },
    { gridCol: { xs: 12, sm: 6, md: 4 }, mt: { xs: 0, md: 12 } },
    { gridCol: { xs: 12, sm: 6, md: 5 }, mt: { xs: 0, md: 0 } },
    { gridCol: { xs: 12, sm: 6, md: 7 }, mt: { xs: 0, md: 8 } }
  ];

  return (
    <Box id={section.anchor} component="section" sx={{ py: { xs: 12, md: 18 }, bgcolor: "#ffffff", color: "#111111", position: "relative", overflow: "hidden" }}>
      <Container maxWidth="xl">
        {/* Typographic Split Manifesto Header */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "5fr 1fr 6fr" }, gap: { xs: 4, md: 0 }, alignItems: "stretch", mb: { xs: 10, md: 16 } }}>
          
          {/* Left Column (Statement & Slogan) */}
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", pr: { md: 4 } }}>
            <Box>
              <Typography sx={{ color: "primary.main", textTransform: "uppercase", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", fontFamily: '"Cairo", sans-serif', mb: 2 }}>
                {t("WHAT IS FASHION GATE?")}
              </Typography>
              <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 34, md: 46 }, fontWeight: 500, color: "#111111", lineHeight: 1.15, mb: 4 }}>
                {lang === "ar" ? "بوابة الموضة بوليفارد — العتبة إلى عالم الاستثناء" : "Fashion Gate Boulevard — The Threshold to the Exceptional"}
              </Typography>
            </Box>
            
            <Box sx={{ mt: { xs: 4, md: 0 }, display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", gap: 3.5 }}>
              <Box 
                component="img"
                src="/assets/baglight.png"
                alt="Fashion Gate Boulevard Carrier Bag"
                sx={{ 
                  width: { xs: 100, md: 120 }, 
                  height: "auto", 
                  objectFit: "contain",
                  filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.06))",
                  animation: "float-bag-light 5s ease-in-out infinite",
                  "@keyframes float-bag-light": {
                    "0%": { transform: "translateY(0px) rotate(0deg)" },
                    "50%": { transform: "translateY(-8px) rotate(-1.5deg)" },
                    "100%": { transform: "translateY(0px) rotate(0deg)" }
                  }
                }}
              />
              <Typography sx={{ 
                fontFamily: '"Griphorium", "Griphosium", "Graphion", "Brush Script MT", cursive', 
                fontSize: { xs: 26, md: 34 }, 
                color: "primary.main", 
                fontStyle: "italic",
                lineHeight: 1.3
              }}>
                {lang === "ar" ? (
                  "«أنت لا تتسوق في بوابة الموضة بوليفارد، بل تمشي فيها.»"
                ) : (
                  "\"You do not shop Fashion Gate Boulevard. You walk it.\""
                )}
              </Typography>
            </Box>
          </Box>

          {/* Architectural Line Divider */}
          <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center", py: 2 }}>
            <Box sx={{ width: "1px", height: "100%", bgcolor: "rgba(0,0,0,0.08)" }} />
          </Box>

          {/* Right Column (Narrative Body) */}
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", pl: { md: 4 }, gap: 3.5 }}>
            <Typography sx={{ color: "rgba(0,0,0,0.72)", fontSize: 16, lineHeight: 1.9, fontFamily: '"Cairo", sans-serif', textAlign: "justify" }}>
              {lang === "ar" ? (
                "بوابة الموضة بوليفارد هي أول متجر أقسام فاخر في سوريا — تم بناؤه على نموذج أعظم مؤسسات الموضة في العالم: هارودز في لندن، لو بون مارشيه في باريس، غاليري لافاييت، سيلفريدجز. عنوان واحد يحتوي على عوالم متعددة تحت رؤية معمارية موحدة."
              ) : (
                "Fashion Gate Boulevard is Syria's first luxury department store — built on the model of the world's great fashion institutions: Harrods in London, Le Bon Marché in Paris, Galeries Lafayette, Selfridges. A single address containing multiple worlds under one unified architectural vision."
              )}
            </Typography>
            <Typography sx={{ color: "rgba(0,0,0,0.72)", fontSize: 16, lineHeight: 1.9, fontFamily: '"Cairo", sans-serif', textAlign: "justify" }}>
              {lang === "ar" ? (
                "تقوم بوابة الموضة بوليفارد برعاية أرقى مجموعات المصممين العالميين للرجال والنساء، إلى جانب الإكسسوارات الفاخرة، ومنتجات التجميل، والأطعمة الفاخرة. إنها ليست مجرد متجر أو مركز تجاري، بل هي وجهة أسلوب حياة راقية حيث تلتقي الموضة والذوق والثقافة تحت سقف واحد."
              ) : (
                "Fashion Gate Boulevard curates the finest international designer collections for men and women, alongside premium fashion accessories, beauty products, and gourmet luxury foods. It is not just a store, it is not a mall, it is a sophisticated lifestyle destination where fashion, taste, and culture converge under one roof."
              )}
            </Typography>
          </Box>
        </Box>

        {/* Compact Grid of Curated Cards */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" }, gap: { xs: 4, md: 5 } }}>
          {boulevardProducts.map((product, index) => {
            const title = lang === "ar" ? product.titleAr : product.title;
            const category = lang === "ar" ? product.categoryAr : product.category;
            const description = lang === "ar" ? product.descriptionAr : product.description;
            const seqNumber = String(index + 1).padStart(2, "0");

            return (
              <Box
                key={product.id}
                sx={{
                  transition: "transform 0.4s ease",
                  "&:hover": {
                    transform: "translateY(-6px)"
                  }
                }}
              >
                <Link 
                  href={`/product/${product.id}?lang=${lang}`}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                      "&:hover": {
                        "& .product-img": {
                          transform: "scale(1.04)"
                        }
                      }
                    }}
                  >
                    {/* Header Sequence & Category (Watermarked) */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 1 }}>
                      <Typography sx={{ 
                        fontFamily: '"Cairo", sans-serif', 
                        fontSize: 12, 
                        fontWeight: 700, 
                        color: "rgba(0,0,0,0.3)", 
                        letterSpacing: "0.1em"
                      }}>
                        {seqNumber}
                      </Typography>
                    </Box>

                    {/* Card Frame (Airy borderless design) */}
                    <Box
                      sx={{
                        position: "relative",
                        aspectRatio: "4 / 5",
                        overflow: "hidden",
                        mb: 2,
                        // Shiny diagonal ease towards top right from left bottom on hover
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "250%",
                          height: "100%",
                          background: "linear-gradient(135deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 70%)",
                          transform: "translateX(-110%) translateY(110%) skewX(-15deg)",
                          transition: "transform 1.1s cubic-bezier(0.25, 1, 0.5, 1)",
                          pointerEvents: "none",
                          zIndex: 3
                        },
                        "&:hover::after": {
                          transform: "translateX(110%) translateY(-110%) skewX(-15deg)"
                        }
                      }}
                    >
                      {/* Product Image */}
                      <img 
                        className="product-img"
                        src={product.imageUrl} 
                        alt={title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)"
                        }}
                      />

                      {/* Semi-transparent bottom-gradient overlay for readability */}
                      <Box sx={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0) 35%)",
                        opacity: hoveredIndex === index ? 1 : 0,
                        transition: "opacity 0.4s ease",
                        zIndex: 2,
                        pointerEvents: "none"
                      }} />

                      {/* Capitalized Explore ↗ typography link */}
                      <Stack 
                        direction="row" 
                        alignItems="center" 
                        spacing={0.5}
                        sx={{
                          position: "absolute",
                          bottom: 16,
                          right: 16,
                          zIndex: 3,
                          color: "primary.main",
                          opacity: hoveredIndex === index ? 1 : 0,
                          transform: hoveredIndex === index ? "translateY(0)" : "translateY(8px)",
                          transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                          pointerEvents: "none"
                        }}
                      >
                        <Typography sx={{ 
                          fontFamily: '"Cairo", sans-serif', 
                          fontSize: 12, 
                          fontWeight: 700,
                          letterSpacing: "0.08em"
                        }}>
                          {lang === "ar" ? "اكتشف" : "Explore"}
                        </Typography>
                        <NorthEastIcon sx={{ fontSize: 13 }} />
                      </Stack>
                    </Box>

                    {/* Category Title (Primary Heading) */}
                    <Typography sx={{ 
                      color: "#111111", 
                      fontFamily: "var(--heading-font)", 
                      fontSize: 21, 
                      fontWeight: 500, 
                      lineHeight: 1.2,
                      mt: 1.5
                    }}>
                      {category}
                    </Typography>

                    {/* Product Name (Secondary Subtitle) */}
                    <Typography sx={{ 
                      color: "primary.main", 
                      fontSize: 10.5, 
                      fontWeight: 700, 
                      textTransform: "uppercase", 
                      letterSpacing: "0.15em", 
                      fontFamily: '"Cairo", sans-serif',
                      mt: 0.5
                    }}>
                      {title}
                    </Typography>

                    {/* Expanding micro-interaction line above metadata */}
                    <Box sx={{ 
                      width: hoveredIndex === index ? "100%" : "30px", 
                      height: "1px", 
                      bgcolor: hoveredIndex === index ? "primary.main" : "rgba(0,0,0,0.08)", 
                      transition: "width 0.5s cubic-bezier(0.25, 1, 0.5, 1), bgcolor 0.5s ease",
                      my: 1.5 
                    }} />

                    {/* Description */}
                    <Typography sx={{ 
                      color: "rgba(0,0,0,0.6)", 
                      fontFamily: '"Cairo", sans-serif', 
                      fontSize: 13, 
                      lineHeight: 1.6,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}>
                      {description}
                    </Typography>
                  </Box>
                </Link>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}

function EditorialSection({ section, t, lang }: { section: Section; t: (s?: string) => string; lang: "ar" | "en" }) {
  return (
    <Box id={section.anchor} component="section" sx={{ py: { xs: 10, md: 14 }, bgcolor: "var(--fg-stone)", color: "#111111" }}>
      <Container maxWidth="xl">
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" }, gap: { xs: 6, md: 8 }, alignItems: "center" }}>
          
          {/* Left Column: Brand Story */}
          <Stack spacing={3.5} alignItems="flex-start" textAlign={lang === "ar" ? "right" : "left"} sx={{ px: { xs: 1, md: 4 } }}>
            <Typography sx={{ color: "#ffffff", textTransform: "uppercase", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", bgcolor: "primary.main", px: 2, py: 0.5, fontFamily: '"Cairo", sans-serif' }}>
              {t(section.eyebrow)}
            </Typography>
            <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 34, md: 58 }, fontWeight: 600, lineHeight: 1.1, color: "#111111" }}>
              {t(section.headline)}
            </Typography>
            <Typography sx={{ color: "rgba(0,0,0,0.72)", fontSize: 16, lineHeight: 1.8, maxWidth: 740, fontFamily: '"Cairo", sans-serif' }}>
              {t(section.description)}
            </Typography>
          </Stack>

          {/* Right Column: Dark Signature Carrier Showcase */}
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
            {/* Subtle shadow mask */}
            <Box sx={{
              position: "absolute",
              bottom: -10,
              width: "70%",
              height: "15px",
              background: "radial-gradient(ellipse at center, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 70%)",
              zIndex: 1,
              animation: "editorial-shadow-pulse 7s ease-in-out infinite",
              "@keyframes editorial-shadow-pulse": {
                "0%": { transform: "scale(1)", opacity: 0.8 },
                "50%": { transform: "scale(0.88)", opacity: 0.4 },
                "100%": { transform: "scale(1)", opacity: 0.8 }
              }
            }} />
            
            <Box 
              component="img"
              src="/assets/bagdark.png"
              alt="Fashion Gate Signature Dark Carrier"
              sx={{ 
                width: { xs: 180, sm: 220, md: 250 }, 
                height: "auto", 
                objectFit: "contain",
                filter: "drop-shadow(0px 12px 24px rgba(0,0,0,0.15))",
                zIndex: 2,
                animation: "editorial-bag-float 7s ease-in-out infinite",
                "@keyframes editorial-bag-float": {
                  "0%": { transform: "translateY(0px) rotate(0deg)" },
                  "50%": { transform: "translateY(-8px) rotate(-1.5deg)" },
                  "100%": { transform: "translateY(0px) rotate(0deg)" }
                }
              }}
            />
          </Box>

        </Box>
      </Container>
    </Box>
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

function AtelierShowcaseSection({ t, lang }: { t: (s?: string) => string; lang: "ar" | "en" }) {
  return (
    <Box component="section" id="boulevard" sx={{ bgcolor: "#FAF8F5", color: "#111111", py: { xs: 10, md: 14 }, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <Container maxWidth="xl">
        <Stack spacing={{ xs: 6, md: 8 }}>
          
          {/* Header */}
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "0.9fr 1.1fr" }, gap: { xs: 3, md: 8 }, alignItems: "end" }}>
            <Box sx={{ textAlign: lang === "ar" ? "right" : "left" }}>
              <Typography sx={{ color: "primary.main", textTransform: "uppercase", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", mb: 1.5 }}>
                {lang === "ar" ? "الفضاء المعماري" : "The Atelier Space"}
              </Typography>
              <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 36, md: 58 }, lineHeight: 1.05, fontWeight: 500 }}>
                {lang === "ar" ? "مساحات أتيلييه البوليفارد" : "Outlet architectural spaces"}
              </Typography>
            </Box>
            <Typography sx={{ color: "rgba(0,0,0,0.62)", fontSize: 15, lineHeight: 1.8, maxWidth: 680, textAlign: lang === "ar" ? "right" : "left" }}>
              Experience the physical concept behind Syria's first luxury shopping destination. A curated dialogue between stone craftsmanship and intimate client spaces.
            </Typography>
          </Box>

          {/* Side-by-Side Masonry Showcase */}
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: 4, md: 6 } }}>
            {/* Card 1: Exterior */}
            <Box 
              sx={{ 
                display: "flex", 
                flexDirection: "column", 
                border: "1px solid rgba(0,0,0,0.05)",
                bgcolor: "#ffffff",
                overflow: "hidden"
              }}
            >
              <Box sx={{ aspectRatio: "16 / 11", overflow: "hidden" }}>
                <Box 
                  component="img"
                  src="/brand-pages/page_08.jpg"
                  alt="Fashion Gate Outlet Exterior Concept"
                  sx={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover",
                    transition: "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
                    "&:hover": { transform: "scale(1.03)" }
                  }}
                />
              </Box>
              <Stack spacing={1.5} sx={{ p: { xs: 3, md: 4 }, textAlign: lang === "ar" ? "right" : "left" }}>
                <Typography sx={{ color: "primary.main", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "none" }}>
                  {lang === "ar" ? "المنظور الخارجي" : "Exterior concept"}
                </Typography>
                <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: 24, fontWeight: 500 }}>
                  {lang === "ar" ? "واجهة البوليفارد" : "The Boulevard facade"}
                </Typography>
                <Typography sx={{ color: "rgba(0,0,0,0.58)", fontSize: 13.5, lineHeight: 1.6 }}>
                  {lang === "ar" 
                    ? "دمج التفاصيل الحجرية التراثية مع خطوط التصميم العصرية، مما يخلق حضوراً لافتاً في قلب حي التسوق."
                    : "Merging heritage masonry accents with structural glass lines, framing a prominent presence on the shopping avenue."}
                </Typography>
              </Stack>
            </Box>

            {/* Card 2: Interior */}
            <Box 
              sx={{ 
                display: "flex", 
                flexDirection: "column", 
                border: "1px solid rgba(0,0,0,0.05)",
                bgcolor: "#ffffff",
                overflow: "hidden"
              }}
            >
              <Box sx={{ aspectRatio: "16 / 11", overflow: "hidden" }}>
                <Box 
                  component="img"
                  src="/brand-pages/page_18.jpg"
                  alt="Fashion Gate Outlet Interior Concept"
                  sx={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover",
                    transition: "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
                    "&:hover": { transform: "scale(1.03)" }
                  }}
                />
              </Box>
              <Stack spacing={1.5} sx={{ p: { xs: 3, md: 4 }, textAlign: lang === "ar" ? "right" : "left" }}>
                <Typography sx={{ color: "primary.main", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "none" }}>
                  {lang === "ar" ? "المساحات الداخلية" : "Interior design"}
                </Typography>
                <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: 24, fontWeight: 500 }}>
                  {lang === "ar" ? "صالونات العرض الخاصة" : "The private shopping salons"}
                </Typography>
                <Typography sx={{ color: "rgba(0,0,0,0.58)", fontSize: 13.5, lineHeight: 1.6 }}>
                  {lang === "ar" 
                    ? "أجنحة مخصصة ومصممة بمواد طبيعية دافئة لاستقبال العملاء في جلسات معينة هادئة واستشارات مخصصة."
                    : "Intimate dressing suites finished in raw natural plaster, travertine and soft textiles, designed for private luxury consultations."}
                </Typography>
              </Stack>
            </Box>
          </Box>

        </Stack>
      </Container>
    </Box>
  );
}

export default function Storefront({ settings, sections }: { settings: SiteSettings; sections: Section[] }) {
  // Default language set to Arabic ('ar') to show Arabic words first
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [loading, setLoading] = useState(true);


console.log(sections,'sections')
  // Sync state with URL parameter on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get("lang");
      if (urlLang === "en" || urlLang === "ar") {
        setLang(urlLang);
      }
    }
  }, []);

  const handleLangToggle = () => {
    const nextLang = lang === "ar" ? "en" : "ar";
    setLang(nextLang);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", nextLang);
      window.history.replaceState({}, "", url.toString());
    }
  };

  // Snappy loading duration for cinematic entry (skipped on subsequent hits in same session)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasLoadedBefore = sessionStorage.getItem("fg_loaded");
      if (hasLoadedBefore) {
        setLoading(false);
      } else {
        const timer = setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem("fg_loaded", "true");
        }, 800);
        return () => clearTimeout(timer);
      }
    }
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


      <Box dir={lang === "ar" ? "rtl" : "ltr"} sx={{ bgcolor: "var(--fg-white)", color: "#111", minHeight: "100vh" }}>
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
    </ThemeProvider>
  );
}


