"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { Box, Button, Container, Drawer, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const MotionBox = motion.create(Box);

interface SiteSettings {
  title?: string;
  primaryColor?: string;
  accentColor?: string;
}

interface SiteHeaderProps {
  settings?: SiteSettings;
  onLangToggleStart?: () => void;
}

const headerTranslations = {
  en: {
    "Women": "Women",
    "Men": "Men",
    "Beauty": "Beauty",
    "Home & Deco": "Home & Deco",
    "Brand": "Brand",
    "Blogs": "Blogs",
    "Contact": "Contact",
    "Explore": "Explore",
    "On Boulevard. For the world.": "On Boulevard. For the world."
  },
  ar: {
    "Women": "النساء",
    "Men": "الرجال",
    "Beauty": "الجمال",
    "Home & Deco": "المنزل والديكور",
    "Brand": "العلامة التجارية",
    "Blogs": "المدونة",
    "Contact": "اتصل بنا",
    "Explore": "استكشف",
    "On Boulevard. For the world.": "على البوليفارد. للعالم."
  }
};

const menuDescriptions = {
  en: {
    "Women": "Seasonal silhouettes & tailoring",
    "Men": "Timeless cuts & modern fits",
    "Beauty": "Curated scents & skin care",
    "Home & Deco": "Artisanal objects & furniture",
    "Brand": "Our heritage & design manifesto",
    "Blogs": "Refined journal notes & case studies",
    "Contact": "Connect with our private concierge"
  },
  ar: {
    "Women": "تصاميم موسمية وخياطة راقية",
    "Men": "قصات خالدة ومقاسات عصرية",
    "Beauty": "عطور منسقة وعناية بالبشرة",
    "Home & Deco": "تحف فنية وأثاث راقٍ",
    "Brand": "تراثنا وبيان التصميم الخاص بنا",
    "Blogs": "ملاحظات الجريدة ودراسات الحالة",
    "Contact": "تواصل مع مستشارنا الخاص"
  }
};

export const shopNavigation = [
  { label: "Women", anchor: "#women" },
  { label: "Men", anchor: "#men" },
  { label: "Beauty", anchor: "#beauty" },
  { label: "Home & Deco", anchor: "#home-deco" },
  { label: "Brand", anchor: "#brand" }
];

function BrandMark({ settings, light = false, lang }: { settings?: SiteSettings; light?: boolean; lang: "ar" | "en" }) {
  const textColor = light ? "#111111" : "#ffffff";
  const subColor = light ? "rgba(0,0,0,.54)" : "rgba(255,255,255,.68)";
  const title = settings?.title || "Fashion Gate";

  return (
    <Box
      component={Link}
      href={`/${lang}#arrival`}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        textDecoration: "none",
        cursor: "pointer"
      }}
    >
      <Stack direction="row" gap={lang === "ar" ? 3.5 : 2} alignItems="center">
        <Box 
          component="img" 
          src="/brand/logo.png" 
          alt={title} 
          sx={{ 
            height: { xs: 26, md: 32 }, 
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
            {lang === "ar" ? "بوابة الأزياء" : "Fashion Gate"}
          </Typography>
          <Typography 
            sx={{ 
              fontSize: 8, 
              letterSpacing: "0.1em", 
              textTransform: "uppercase", 
              color: subColor 
            }}
          >
            {lang === "ar" ? "على البوليفارد. للعالم." : "On Boulevard. For the world."}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

function AnnouncementBar({ lang }: { lang: "ar" | "en" }) {
  const [index, setIndex] = useState(0);

  const announcements = useMemo(() => [
    {
      en: "Free Worldwide Shipping & Returns on Selected Designer Collections",
      ar: "شحن مجاني وإرجاع سهل لكافة أنحاء العالم على مجموعات مختارة"
    },
    {
      en: "Syria's First Luxury Department Store — On Boulevard. For the world.",
      ar: "أول متجر أقسام فاخر في سوريا — على البوليفارد. للعالم."
    },
    {
      en: "Complimentary Personal Shopping & Private Atelier Bookings",
      ar: "تسوق شخصي وحجز أتيلييه مجاني في صالون دمشق الخاص"
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
        color: "#CB6116", 
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

export default function SiteHeader({ settings, onLangToggleStart }: SiteHeaderProps) {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const lang = (params?.lang === "en" ? "en" : "ar") as "en" | "ar";
  const [open, setOpen] = useState(false);

  const t = (strKey: keyof typeof headerTranslations["en"]) => {
    return headerTranslations[lang][strKey] || strKey;
  };

  const descT = (menuKey: keyof typeof menuDescriptions["en"]) => {
    return menuDescriptions[lang][menuKey] || "";
  };

  const handleLangToggle = () => {
    if (typeof window === "undefined") return;
    if (onLangToggleStart) {
      onLangToggleStart();
    }
    setTimeout(() => {
      const nextLang = lang === "ar" ? "en" : "ar";
      const nextPath = pathname.replace(/^\/(ar|en)/, `/${nextLang}`);
      router.push(nextPath);
    }, 250);
  };

  const isHome = pathname === `/${lang}` || pathname === `/${lang}/` || pathname === "/" || pathname === `/ar` || pathname === `/en`;

  const getHref = (anchor: string) => {
    return isHome ? anchor : `/${lang}${anchor}`;
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
            <Button href={getHref("#women")} className="luxury-link" sx={{ color: "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
              {t("Women")}
            </Button>
            <Button href={getHref("#men")} className="luxury-link" sx={{ color: "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
              {t("Men")}
            </Button>
            <Button href={getHref("#beauty")} className="luxury-link" sx={{ color: "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
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
            <Button href={getHref("#home-deco")} className="luxury-link" sx={{ color: "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
              {t("Home & Deco")}
            </Button>
            <Button href={getHref("#brand")} className="luxury-link" sx={{ color: "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
              {t("Brand")}
            </Button>
            <Button component={Link} href={`/${lang}/blogs`} className="luxury-link" sx={{ color: "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
              {t("Blogs")}
            </Button>
            <Button component={Link} href={`/${lang}/contact`} className="luxury-link" sx={{ color: "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
              {t("Contact")}
            </Button>
            
            {/* Language Selector */}
            <Button 
              onClick={handleLangToggle}
              sx={{ 
                color: "#CB6116", 
                textTransform: "uppercase", 
                fontSize: 11, 
                fontWeight: 800, 
                letterSpacing: "0.15em",
                px: 1.5,
                py: 0.5,
                border: "1px solid",
                borderColor: "#CB6116",
                borderRadius: 0,
                fontFamily: '"Cairo", sans-serif',
                "&:hover": {
                  bgcolor: "rgba(203, 97, 22, 0.08)",
                  borderColor: "#CB6116"
                }
              }}
            >
              {lang === "ar" ? "EN" : "AR"}
            </Button>
          </Stack>

          {/* Mobile Header elements */}
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ display: { xs: "flex", lg: "none" }, ml: "auto" }}>
            <Button 
              onClick={handleLangToggle}
              size="small"
              sx={{ 
                color: "#CB6116", 
                textTransform: "uppercase", 
                fontSize: 10, 
                fontWeight: 800, 
                letterSpacing: "0.15em",
                px: 1.2,
                py: 0.4,
                minWidth: 0,
                border: "1px solid",
                borderColor: "#CB6116",
                borderRadius: 0,
                fontFamily: '"Cairo", sans-serif'
              }}
            >
              {lang === "ar" ? "EN" : "AR"}
            </Button>

            <IconButton 
              onClick={() => setOpen(true)} 
              sx={{ 
                color: "#ffffff", 
                p: 0.8,
                border: "1px solid rgba(255,255,255,0.08)"
              }}
            >
              <MenuIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      {/* Dynamic Drawer Menu Overlay */}
      <Drawer
        anchor={lang === "ar" ? "right" : "left"}
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: { xs: "100%", sm: 480 },
            bgcolor: "#FAF8F5",
            boxShadow: "none",
            borderLeft: lang === "ar" ? "none" : "1px solid rgba(0,0,0,0.06)",
            borderRight: lang === "ar" ? "1px solid rgba(0,0,0,0.06)" : "none",
            p: { xs: 3, sm: 5 },
            display: "flex",
            flexDirection: "column"
          } 
        }}
      >
        <Stack spacing={5} sx={{ height: "100%", justifyContent: "space-between" }}>
          {/* Top Bar inside Overlay */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <BrandMark settings={settings} lang={lang} light={true} />
            <IconButton onClick={() => setOpen(false)} sx={{ color: "#111111", border: "1px solid rgba(0,0,0,0.08)", p: 1, borderRadius: "50%", "&:hover": { bgcolor: "rgba(0,0,0,0.04)" } }}>
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Stack>
          
          {/* Centered Menu List */}
          <Stack spacing={{ xs: 2.5, sm: 3 }} sx={{ my: "auto", px: { xs: 1, sm: 4 } }}>
            {shopNavigation.map((item) => {
              const label = item.label as keyof typeof menuDescriptions["en"];
              const desc = descT(label);
              return (
                <Stack 
                  key={label} 
                  spacing={0.5} 
                  sx={{ 
                    borderBottom: "1px solid rgba(0,0,0,0.06)", 
                    pb: 1.5,
                    alignItems: lang === "ar" ? "flex-end" : "flex-start" 
                  }}
                >
                  <Button 
                    href={getHref(item.anchor || "#")} 
                    onClick={() => setOpen(false)} 
                    endIcon={lang === "en" && <NorthEastIcon sx={{ fontSize: 16, opacity: 0.4 }} />} 
                    startIcon={lang === "ar" && <NorthEastIcon sx={{ fontSize: 16, opacity: 0.4, transform: "scaleX(-1)" }} />}
                    sx={{ 
                      p: 0,
                      color: "rgba(0,0,0,0.85)", 
                      fontSize: { xs: 22, sm: 28 }, 
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
                    {t(label)}
                  </Button>
                  {desc && (
                    <Typography sx={{ color: "rgba(0,0,0,0.48)", fontSize: { xs: 11, sm: 12.5 }, fontFamily: '"Cairo", sans-serif', letterSpacing: "0.05em" }}>
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
                borderBottom: "1px solid rgba(0,0,0,0.06)", 
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
                  color: "rgba(0,0,0,0.85)", 
                  fontSize: { xs: 22, sm: 28 }, 
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
              <Typography sx={{ color: "rgba(0,0,0,0.48)", fontSize: { xs: 11, sm: 12.5 }, fontFamily: '"Cairo", sans-serif', letterSpacing: "0.05em" }}>
                {descT("Blogs")}
              </Typography>
            </Stack>

            {/* Contact Link */}
            <Stack 
              spacing={0.5} 
              sx={{ 
                borderBottom: "1px solid rgba(0,0,0,0.06)", 
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
                  color: "rgba(0,0,0,0.85)", 
                  fontSize: { xs: 22, sm: 28 }, 
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
                {t("Contact")}
              </Button>
              <Typography sx={{ color: "rgba(0,0,0,0.48)", fontSize: { xs: 11, sm: 12.5 }, fontFamily: '"Cairo", sans-serif', letterSpacing: "0.05em" }}>
                {descT("Contact")}
              </Typography>
            </Stack>
          </Stack>
          
          {/* Bottom Overlay Info */}
          <Typography sx={{ color: "rgba(0,0,0,0.36)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", textAlign: "center", fontFamily: '"Cairo", sans-serif' }}>
            {t("On Boulevard. For the world.")}
          </Typography>
        </Stack>
      </Drawer>
    </>
  );
}
