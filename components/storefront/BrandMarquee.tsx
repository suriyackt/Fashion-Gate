"use client";

import { Box, Container, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import Link from "next/link";

const brandsList = [
  { 
    id: "chanel", 
    logo: (
      <svg width="190" height="38" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Futura', 'Helvetica Neue', 'Arial', sans-serif" fontSize="22" fontWeight="bold" letterSpacing="0.32em" textAnchor="middle">CHANEL</text>
      </svg>
    )
  },
  { 
    id: "prada", 
    logo: (
      <svg width="190" height="38" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Engravers MT', 'Copperplate', 'Times New Roman', serif" fontSize="16" fontWeight="900" letterSpacing="0.16em" textAnchor="middle">PRADA</text>
      </svg>
    )
  },
  { 
    id: "gucci", 
    logo: (
      <svg width="190" height="38" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Granjon', 'Garamond', serif" fontSize="22" fontWeight="bold" letterSpacing="0.22em" textAnchor="middle">GUCCI</text>
      </svg>
    )
  },
  { 
    id: "dior", 
    logo: (
      <svg width="160" height="38" viewBox="0 0 100 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Playfair Display', 'Didot', 'Bodoni MT', serif" fontSize="22" fontWeight="700" letterSpacing="0.18em" textAnchor="middle">Dior</text>
      </svg>
    )
  },
  { 
    id: "ysl", 
    logo: (
      <svg width="230" height="38" viewBox="0 0 160 30" fill="currentColor">
        <text x="50%" y="21" fontFamily="'Cinzel', 'Times New Roman', serif" fontSize="11" fontWeight="600" letterSpacing="0.24em" textAnchor="middle">YVES SAINT LAURENT</text>
      </svg>
    )
  },
  { 
    id: "hermes", 
    logo: (
      <svg width="190" height="38" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="21" fontFamily="'Rockwell', 'Courier New', serif" fontSize="14" fontWeight="bold" letterSpacing="0.22em" textAnchor="middle">HERMÈS</text>
      </svg>
    )
  },
  { 
    id: "adidas", 
    logo: (
      <svg width="85" height="38" viewBox="0 0 60 40" fill="currentColor">
        <path d="M 15 32 L 20 32 L 35 8 L 30 8 Z" />
        <path d="M 25 32 L 30 32 L 45 8 L 40 8 Z" />
        <path d="M 35 32 L 40 32 L 55 8 L 50 8 Z" />
      </svg>
    )
  }
];

// Double/Triple the array to make the infinite loop seamless
const scrollingItems = [...brandsList, ...brandsList, ...brandsList];

export default function BrandMarquee() {
  const params = useParams();
  const lang = params?.lang === "en" ? "en" : "ar";

  const t = {
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

  return (
    <Box 
      component="section" 
      sx={{ 
        bgcolor: "#ffffff", 
        py: { xs: 8, md: 10 },
        borderTop: "1px solid rgba(0,0,0,0.05)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        width: "100%",
        textAlign: "center",
        overflow: "hidden"
      }}
    >
      <Container maxWidth="xl">
        {/* Section Header */}
        <Box sx={{ maxWidth: 640, mx: "auto", mb: { xs: 5, md: 7 } }}>
          <Typography sx={{ color: "primary.main", textTransform: "uppercase", fontSize: 11, fontWeight: 800, letterSpacing: "0.22em", mb: 1.5, fontFamily: '"Cairo", sans-serif' }}>
            {t.eyebrow}
          </Typography>
          <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 32, md: 40 }, fontWeight: 500, lineHeight: 1.2, color: "#111111", mb: 2 }}>
            {t.title}
          </Typography>
          <Typography sx={{ color: "rgba(0,0,0,0.5)", fontSize: 14, lineHeight: 1.7, fontFamily: '"Cairo", sans-serif' }}>
            {t.desc}
          </Typography>
        </Box>
      </Container>

      {/* CSS-based Hardware Accelerated Scrolling Marquee Container */}
      <Box 
        sx={{ 
          width: "100%",
          overflow: "hidden",
          position: "relative",
          py: 1,
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
          {scrollingItems.map((item, index) => (
            <Link
              key={`${item.id}-${index}`}
              href={`/${lang}/brand/${item.id}`}
              style={{ textDecoration: "none", display: "inline-block" }}
            >
              <Box
                sx={{
                  color: "#666666",
                  opacity: 0.5,
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
