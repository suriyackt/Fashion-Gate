"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import NorthEastIcon from "@mui/icons-material/NorthEast";

const MotionBox = motion.create(Box);

const brandsList = [
  { 
    id: "chanel", 
    name: "Chanel", 
    nameAr: "شانيل",
    city: "Paris", 
    cityAr: "باريس", 
    image: "/assets/uploaded_products/product_5.png" 
  },
  { 
    id: "prada", 
    name: "Prada", 
    nameAr: "برادا",
    city: "Milano", 
    cityAr: "ميلانو", 
    image: "/assets/uploaded_products/product_7.png" 
  },
  { 
    id: "gucci", 
    name: "Gucci", 
    nameAr: "غوتشي",
    city: "Firenze", 
    cityAr: "فلورنسا", 
    image: "/assets/uploaded_products/product_4.png" 
  },
  { 
    id: "dior", 
    name: "Dior", 
    nameAr: "ديور",
    city: "Paris", 
    cityAr: "باريس", 
    image: "/brand/fgb_white_lace_midi_dress_1783335335253.png" 
  },
  { 
    id: "ysl", 
    name: "Saint Laurent", 
    nameAr: "سان لوران",
    city: "Paris", 
    cityAr: "باريس", 
    image: "/brand/modern-sophistication.png" 
  },
  { 
    id: "hermes", 
    name: "Hermès", 
    nameAr: "هيرميس",
    city: "Paris", 
    cityAr: "باريس", 
    image: "/brand/lookbook-tote.png" 
  },
  { 
    id: "adidas", 
    name: "Adidas Y-3", 
    nameAr: "أديداس Y-3",
    city: "Tokyo & Paris", 
    cityAr: "طوكيو وباريس", 
    image: "/assets/uploaded_products/product_3.png" 
  }
];

export default function BrandMarquee() {
  const params = useParams();
  const lang = params?.lang === "en" ? "en" : "ar";
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);

  const t = {
    en: {
      eyebrow: "Refined Ateliers",
      title: "Joined Luxury Houses",
      desc: "Fashion Gate is proud to partner with the world's most prestigious design houses. Explore our curated showrooms to discover seasonal runway edits and bespoke styling.",
      defaultLabel: "Select a house to explore",
      viewShowroom: "Enter Atelier"
    },
    ar: {
      eyebrow: "دور التصميم الراقية",
      title: "دور الفخامة المنضمة",
      desc: "تفخر بوابة الأزياء بالشراكة مع أرقى دور التصميم في العالم. استكشف صالونات العرض الخاصة بنا لتكتشف تصاميم المدرج الحصرية والتنسيقات الفاخرة.",
      defaultLabel: "اختر داراً للاستكشاف",
      viewShowroom: "دخول الأتيلييه"
    }
  }[lang];

  // Default fallback image when no brand is hovered
  const activeImage = hoveredBrand 
    ? (brandsList.find(b => b.id === hoveredBrand)?.image || "/brand-pages/page_01.jpg")
    : "/brand-pages/page_01.jpg";

  return (
    <Box 
      component="section" 
      sx={{ 
        bgcolor: "#ffffff", 
        py: { xs: 10, md: 14 },
        borderTop: "1px solid rgba(0,0,0,0.05)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        width: "100%",
        textAlign: lang === "ar" ? "right" : "left"
      }}
    >
      <Container maxWidth="xl">
        <Box 
          sx={{ 
            display: "grid", 
            gridTemplateColumns: { xs: "1fr", md: "0.8fr 1.2fr" }, 
            gap: { xs: 6, md: 10 },
            alignItems: "stretch"
          }}
        >
          {/* Left Column: Descriptions & Dynamic Visual Preview */}
          <Stack spacing={4} sx={{ justifyContent: "space-between" }}>
            <Box sx={{ maxWidth: 480 }}>
              <Typography sx={{ color: "primary.main", textTransform: "uppercase", fontSize: 11, fontWeight: 800, letterSpacing: "0.22em", mb: 1.5, fontFamily: '"Cairo", sans-serif' }}>
                {t.eyebrow}
              </Typography>
              <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 34, md: 48 }, fontWeight: 500, lineHeight: 1.15, color: "#111111", mb: 2 }}>
                {t.title}
              </Typography>
              <Typography sx={{ color: "rgba(0,0,0,0.6)", fontSize: 14.5, lineHeight: 1.8, fontFamily: '"Cairo", sans-serif' }}>
                {t.desc}
              </Typography>
            </Box>

            {/* Interactive Image Frame (Purely Orange/Black/White/Grey theme) */}
            <Box 
              sx={{ 
                width: "100%", 
                height: { xs: 260, md: 380 }, 
                bgcolor: "#FAF8F5", 
                border: "1px solid rgba(0,0,0,0.06)",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt="Brand Preview"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </AnimatePresence>

              {/* Dynamic Bottom Label Overlay */}
              <Box 
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  bgcolor: "rgba(17,17,17,0.72)",
                  color: "#ffffff",
                  px: 3,
                  py: 1.5,
                  backdropFilter: "blur(4px)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Typography sx={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: '"Cairo", sans-serif' }}>
                  {hoveredBrand 
                    ? (lang === "ar" ? brandsList.find(b => b.id === hoveredBrand)?.nameAr : brandsList.find(b => b.id === hoveredBrand)?.name)
                    : t.defaultLabel
                  }
                </Typography>
                {hoveredBrand && (
                  <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: "primary.main" }}>
                    <Typography sx={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", fontFamily: '"Cairo", sans-serif' }}>
                      {t.viewShowroom}
                    </Typography>
                    <NorthEastIcon sx={{ fontSize: 12 }} />
                  </Stack>
                )}
              </Box>
            </Box>
          </Stack>

          {/* Right Column: Premium Typography Directory List */}
          <Stack 
            spacing={0} 
            sx={{ 
              justifyContent: "center",
              borderTop: "1px solid rgba(0,0,0,0.06)"
            }}
          >
            {brandsList.map((brand) => (
              <Link 
                key={brand.id}
                href={`/${lang}/brand/${brand.id}`}
                style={{ textDecoration: "none" }}
              >
                <Box
                  onMouseEnter={() => setHoveredBrand(brand.id)}
                  onMouseLeave={() => setHoveredBrand(null)}
                  sx={{
                    py: { xs: 2.5, md: 3.5 },
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    px: { xs: 1, md: 3 },
                    "&:hover": {
                      bgcolor: "rgba(0,0,0,0.01)",
                      pl: lang === "ar" ? { xs: 1, md: 3 } : { xs: 2.5, md: 5 },
                      pr: lang === "ar" ? { xs: 2.5, md: 5 } : { xs: 1, md: 3 }
                    }
                  }}
                >
                  <Stack 
                    direction="row" 
                    spacing={3} 
                    alignItems="baseline"
                    sx={{ flexDirection: lang === "ar" ? "row-reverse" : "row" }}
                  >
                    {/* Bold Serif brand name */}
                    <Typography 
                      sx={{ 
                        fontFamily: "var(--heading-font)", 
                        fontSize: { xs: 26, sm: 36, md: 44 }, 
                        fontWeight: 400,
                        color: hoveredBrand === brand.id ? "primary.main" : "#111111",
                        transition: "color 0.3s ease"
                      }}
                    >
                      {lang === "ar" ? brand.nameAr : brand.name}
                    </Typography>
                    {/* Soft heritage city tag */}
                    <Typography 
                      sx={{ 
                        fontSize: 11, 
                        color: "rgba(0,0,0,0.4)", 
                        textTransform: "uppercase", 
                        letterSpacing: "0.15em",
                        fontFamily: '"Cairo", sans-serif'
                      }}
                    >
                      {lang === "ar" ? brand.cityAr : brand.city}
                    </Typography>
                  </Stack>

                  {/* Dynamic Arrow Indicator */}
                  <Box 
                    sx={{ 
                      color: hoveredBrand === brand.id ? "primary.main" : "rgba(0,0,0,0.25)",
                      transform: hoveredBrand === brand.id ? "scale(1.1)" : "scale(1)",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <NorthEastIcon 
                      sx={{ 
                        fontSize: 20,
                        transform: lang === "ar" ? "scaleX(-1)" : "none" 
                      }} 
                    />
                  </Box>
                </Box>
              </Link>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
