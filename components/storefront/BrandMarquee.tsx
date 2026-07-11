"use client";

import { Box, Container, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";
import { getLocalizedValue, imageUrl } from "@/lib/sanity";

const brandsList = [
  { 
    id: "chanel", 
    logo: (
      <svg width="220" height="48" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Helvetica Neue', 'Arial', sans-serif" fontSize="19" fontWeight="bold" letterSpacing="0.25em" textAnchor="middle">CHANEL</text>
      </svg>
    )
  },
  { 
    id: "prada", 
    logo: (
      <svg width="200" height="48" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Didot', Bodoni, serif" fontSize="19" fontWeight="bold" letterSpacing="0.2em" textAnchor="middle">PRADA</text>
      </svg>
    )
  },
  { 
    id: "gucci", 
    logo: (
      <svg width="200" height="48" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Times New Roman', Times, serif" fontSize="19" fontWeight="bold" letterSpacing="0.22em" textAnchor="middle">GUCCI</text>
      </svg>
    )
  },
  { 
    id: "dior", 
    logo: (
      <svg width="180" height="48" viewBox="0 0 100 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Century Gothic', sans-serif" fontSize="18" fontWeight="bold" letterSpacing="0.25em" textAnchor="middle">Dior</text>
      </svg>
    )
  },
  { 
    id: "ysl", 
    logo: (
      <svg width="240" height="48" viewBox="0 0 140 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Helvetica Neue', 'Arial', sans-serif" fontSize="15" fontWeight="bold" letterSpacing="0.28em" textAnchor="middle">SAINT LAURENT</text>
      </svg>
    )
  },
  { 
    id: "hermes", 
    logo: (
      <svg width="220" height="48" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Garamond', serif" fontSize="20" fontWeight="bold" letterSpacing="0.18em" textAnchor="middle">HERMÈS</text>
      </svg>
    )
  },
  { 
    id: "adidas", 
    logo: (
      <svg width="200" height="48" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Futura', 'Arial', sans-serif" fontSize="20" fontWeight="bold" letterSpacing="0.18em" textAnchor="middle">ADIDAS</text>
      </svg>
    )
  },
  { 
    id: "calvin-klein", 
    logo: (
      <svg width="260" height="48" viewBox="0 0 140 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Helvetica Neue', 'Arial', sans-serif" fontSize="16" fontWeight="bold" letterSpacing="0.25em" textAnchor="middle">CALVIN KLEIN</text>
      </svg>
    )
  },
  { 
    id: "skechers", 
    logo: (
      <svg width="200" height="48" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Futura', sans-serif" fontSize="18" fontWeight="900" letterSpacing="0.15em" textAnchor="middle">SKECHERS</text>
      </svg>
    )
  },
  { 
    id: "maxmara", 
    logo: (
      <svg width="240" height="48" viewBox="0 0 160 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Times New Roman', Times, serif" fontSize="20" fontWeight="bold" letterSpacing="0.2em" textAnchor="middle">MaxMara</text>
      </svg>
    )
  },
  { 
    id: "editorial", 
    logo: (
      <svg width="200" height="48" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Didot', Bodoni, serif" fontSize="18" fontWeight="bold" letterSpacing="0.22em" textAnchor="middle">EDITORIAL</text>
      </svg>
    )
  },
  { 
    id: "paul-shark", 
    logo: (
      <svg width="240" height="48" viewBox="0 0 160 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Futura', sans-serif" fontSize="15" fontWeight="900" letterSpacing="0.18em" textAnchor="middle">PAUL & SHARK</text>
      </svg>
    )
  },
  { 
    id: "sandro", 
    logo: (
      <svg width="220" height="48" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Helvetica Neue', 'Arial', sans-serif" fontSize="18" fontWeight="bold" letterSpacing="0.28em" textAnchor="middle">SANDRO</text>
      </svg>
    )
  },
  { 
    id: "moje", 
    logo: (
      <svg width="180" height="48" viewBox="0 0 100 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Didot', 'Times New Roman', serif" fontSize="21" fontStyle="italic" fontWeight="bold" letterSpacing="0.1em" textAnchor="middle">moje</text>
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
        const slugStr = b.slug?.current || b.id || "";
        const staticMatch = brandsList.find(s => s.id === slugStr);

        let brandLogoNode: React.ReactNode = null;

        if (b.image) {
          try {
            // Fetch at higher resolution to ensure sharp text rendering
            const url = imageUrl(b.image).width(600).quality(100).url();
            if (url) {
              brandLogoNode = (
                <Box 
                  component="img" 
                  src={url} 
                  alt={b.title} 
                  sx={{ 
                    height: { xs: 80, md: 120 }, 
                    width: "auto", 
                    objectFit: "contain",
                    opacity: 0.8,
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    willChange: "transform, opacity",
                    "&:hover": {
                      opacity: 1,
                      transform: "scale(1.05) translateZ(0)"
                    }
                  }} 
                />
              );
            }
          } catch (e) {
            console.error("Failed to build brand logo image url in marquee:", e);
          }
        }

        return {
          id: slugStr || `brand-${index}`,
          title: b.title,
          logo: brandLogoNode || (staticMatch ? (
            staticMatch.logo
          ) : (
            <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: 18, fontWeight: "bold", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              {b.title}
            </Typography>
          ))
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
        bgcolor: "#ffffff", 
        py: { xs: 12, md: 16 },
        borderTop: "1px solid rgba(0,0,0,0.06)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        width: "100%",
        overflow: "hidden"
      }}
    >
      <Container maxWidth="xl">
        {/* Elegant Split Editorial Header */}
        <Box 
          sx={{ 
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "5fr 7fr" },
            gap: { xs: 4, md: 8 },
            alignItems: "center",
            textAlign: lang === "ar" ? "right" : "left",
            mb: { xs: 8, md: 10 },
            pb: 5,
            borderBottom: "1px solid rgba(0,0,0,0.05)"
          }}
        >
          {/* Left Column: Eyebrow + Title */}
          <Box>
            <Box sx={{ width: 40, height: 1, bgcolor: "primary.main", mb: 2, display: "block" }} />
            <Typography sx={{ color: "primary.main", textTransform: "uppercase", fontSize: 10, fontWeight: 800, letterSpacing: "0.25em", mb: 1.5, fontFamily: '"Cairo", sans-serif' }}>
              {t.eyebrow}
            </Typography>
            <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 32, md: 44 }, fontWeight: 400, lineHeight: 1.15, color: "#111111" }}>
              {t.title}
            </Typography>
          </Box>

          {/* Right Column: Editorial Paragraph */}
          <Box 
            sx={{ 
              borderLeft: lang === "ar" ? "none" : { md: "1px solid rgba(0,0,0,0.08)" },
              borderRight: lang === "ar" ? { md: "1px solid rgba(0,0,0,0.08)" } : "none",
              pl: lang === "ar" ? 0 : { md: 6 },
              pr: lang === "ar" ? { md: 6 } : 0,
              py: 1
            }}
          >
            <Typography sx={{ color: "rgba(0,0,0,0.55)", fontSize: { xs: 15, md: 17 }, lineHeight: 1.8, fontFamily: '"Cairo", sans-serif', fontWeight: 300 }}>
              {t.desc}
            </Typography>
          </Box>
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
          bgcolor: "#ffffff",
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
            background: "linear-gradient(to right, #ffffff, transparent)"
          },
          "&::after": {
            right: 0,
            background: "linear-gradient(to left, #ffffff, transparent)"
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
          {scrollingItems.map((item: any, index: number) => (
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
                    color: "#000000",
                    opacity: 1,
                    transform: "scale(1.05)"
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
