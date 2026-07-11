"use client";

import { Box, Container, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";
import { getLocalizedValue } from "@/lib/sanity";

const brandsList = [
  { 
    id: "chanel", 
    logo: (
      <svg width="240" height="48" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Futura', 'Helvetica Neue', 'Arial', sans-serif" fontSize="22" fontWeight="bold" letterSpacing="0.32em" textAnchor="middle">CHANEL</text>
      </svg>
    )
  },
  { 
    id: "prada", 
    logo: (
      <svg width="240" height="48" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Engravers MT', 'Copperplate', 'Times New Roman', serif" fontSize="16" fontWeight="900" letterSpacing="0.16em" textAnchor="middle">PRADA</text>
      </svg>
    )
  },
  { 
    id: "gucci", 
    logo: (
      <svg width="240" height="48" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Granjon', 'Garamond', serif" fontSize="22" fontWeight="bold" letterSpacing="0.22em" textAnchor="middle">GUCCI</text>
      </svg>
    )
  },
  { 
    id: "dior", 
    logo: (
      <svg width="200" height="48" viewBox="0 0 100 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Playfair Display', 'Didot', 'Bodoni MT', serif" fontSize="22" fontWeight="700" letterSpacing="0.18em" textAnchor="middle">Dior</text>
      </svg>
    )
  },
  { 
    id: "ysl", 
    logo: (
      <svg width="280" height="48" viewBox="0 0 160 30" fill="currentColor">
        <text x="50%" y="21" fontFamily="'Cinzel', 'Times New Roman', serif" fontSize="11" fontWeight="600" letterSpacing="0.24em" textAnchor="middle">YVES SAINT LAURENT</text>
      </svg>
    )
  },
  { 
    id: "hermes", 
    logo: (
      <svg width="240" height="48" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="21" fontFamily="'Rockwell', 'Courier New', serif" fontSize="14" fontWeight="bold" letterSpacing="0.22em" textAnchor="middle">HERMÈS</text>
      </svg>
    )
  },
  { 
    id: "adidas", 
    logo: (
      <svg width="110" height="48" viewBox="0 0 60 40" fill="currentColor">
        <path d="M 15 32 L 20 32 L 35 8 L 30 8 Z" />
        <path d="M 25 32 L 30 32 L 45 8 L 40 8 Z" />
        <path d="M 35 32 L 40 32 L 55 8 L 50 8 Z" />
      </svg>
    )
  }
];

export default function BrandMarquee({
  section,
  lang: propLang
}: {
  section?: any;
  lang?: "ar" | "en";
}) {
  const pathname = usePathname();
  const lang = propLang || ((pathname?.endsWith("/ar") || pathname?.includes("/ar/") ? "ar" : "en") as "ar" | "en");

  const unifiedBrands = useMemo(() => {
    if (section?.brands?.length) {
      return section.brands.map((b: any, index: number) => {
        const slugStr = b.slug?.current || "";
        const staticMatch = brandsList.find(s => s.id === slugStr);

        return {
          id: slugStr || `brand-${index}`,
          title: b.title,
          logo: b.image?.asset?.url ? (
            <Box 
              component="img" 
              src={b.image.asset.url} 
              alt={b.title} 
              sx={{ 
                height: b.size === "small" ? 28 : b.size === "large" ? 54 : 40, 
                width: "auto", 
                objectFit: "contain",
                maxHeight: "100%",
                filter: "brightness(0.1)"
              }} 
            />
          ) : staticMatch ? (
            staticMatch.logo
          ) : (
            <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: b.size === "small" ? 14 : b.size === "large" ? 22 : 18, fontWeight: "bold", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              {b.title}
            </Typography>
          )
        };
      });
    }
    return brandsList;
  }, [section?.brands]);

  // Double/Triple the array to make the infinite loop seamless
  const scrollingItems = [...unifiedBrands, ...unifiedBrands, ...unifiedBrands];

  const fallbackT = {
    en: {
      eyebrow: "Refined Ateliers",
      title: "Joined Luxury Houses",
      desc: "Fashion Gate is proud to partner with the world's most prestigious design houses, bringing exclusive seasonal edits directly to Damascus."
    },
    ar: {
      eyebrow: "دور التصميم الراقية",
      title: "دور الفخامة المنضمة",
      desc: "تفخر بوابة الأزياء بالشراكة مع أرقى دور التصميم في العالم، حيث تقدم مجموعات حصرية مباشرة لدمشق."
    }
  }[lang];

  const t = {
    eyebrow: getLocalizedValue(section?.eyebrow, lang, fallbackT.eyebrow),
    title: getLocalizedValue(section?.headline, lang, fallbackT.title),
    desc: getLocalizedValue(section?.description, lang, fallbackT.desc)
  };

  return (
    <Box 
      component="section" 
      sx={{ 
        bgcolor: "#FAF8F5", 
        py: { xs: 10, md: 14 },
        borderTop: "1px solid rgba(0,0,0,0.06)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        width: "100%",
        textAlign: "center",
        overflow: "hidden"
      }}
    >
      <Container maxWidth="xl">
        {/* Section Header */}
        <Box sx={{ maxWidth: 640, mx: "auto", mb: { xs: 6, md: 8 } }}>
          <Typography sx={{ color: "primary.main", textTransform: "uppercase", fontSize: 11, fontWeight: 800, letterSpacing: "0.22em", mb: 1.5, fontFamily: '"Cairo", sans-serif' }}>
            {t.eyebrow}
          </Typography>
          <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 32, md: 40 }, fontWeight: 500, lineHeight: 1.2, color: "#111111", mb: 2 }}>
            {t.title}
          </Typography>
          <Typography sx={{ color: "rgba(0,0,0,0.6)", fontSize: 14, lineHeight: 1.7, fontFamily: '"Cairo", sans-serif' }}>
            {t.desc}
          </Typography>
        </Box>
      </Container>

      {/* CSS-based Hardware Accelerated Scrolling Marquee Container */}
      <Box 
        dir="ltr"
        sx={{ 
          width: "100%",
          overflow: "hidden",
          position: "relative",
          py: 3.5,
          bgcolor: "#FAF8F5",
          "&::before, &::after": {
            content: '""',
            position: "absolute",
            top: 0,
            bottom: 0,
            width: { xs: 40, md: 100 },
            zIndex: 2,
            pointerEvents: "none"
          },
          "&::before": {
            left: 0,
            background: "linear-gradient(to right, #FAF8F5, transparent)"
          },
          "&::after": {
            right: 0,
            background: "linear-gradient(to left, #FAF8F5, transparent)"
          }
        }}
      >
        {/* The scrolling track */}
        <Box 
          sx={{ 
            display: "flex",
            width: "max-content",
            alignItems: "center",
            gap: { xs: 8, md: 12 },
            animation: "scrollMarquee 24s linear infinite",
            "&:hover": {
              animationPlayState: "paused" // Pauses scroll on hover
            },
            "@keyframes scrollMarquee": {
              "0%": { transform: "translateX(0)" },
              "100%": { transform: "translateX(-33.333%)" } // Seamless jump point
            }
          }}
        >
          {scrollingItems.map((item, index) => (
            <Link
              key={`${item.id}-${index}`}
              href={`/brand/${item.id}/${lang}`}
              style={{ textDecoration: "none", display: "inline-block" }}
            >
              <Box
                sx={{
                  color: "#222222",
                  opacity: 0.75,
                  cursor: "pointer",
                  transition: "all 0.35s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": {
                    color: "#000000", // Darkens the logo
                    opacity: 1,       // Fully lights up
                    transform: "scale(1.03)"
                  }
                }}
              >
                {item.logo}
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
