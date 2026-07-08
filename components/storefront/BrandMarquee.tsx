"use client";

import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";

const MotionBox = motion.create(Box);

const brandsList = [
  { 
    id: "chanel", 
    logo: (
      <svg width="200" height="42" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Futura', 'Helvetica Neue', 'Arial', sans-serif" fontSize="22" fontWeight="bold" letterSpacing="0.32em" textAnchor="middle">CHANEL</text>
      </svg>
    )
  },
  { 
    id: "prada", 
    logo: (
      <svg width="200" height="42" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Engravers MT', 'Copperplate', 'Times New Roman', serif" fontSize="16" fontWeight="900" letterSpacing="0.16em" textAnchor="middle">PRADA</text>
      </svg>
    )
  },
  { 
    id: "gucci", 
    logo: (
      <svg width="200" height="42" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Granjon', 'Garamond', serif" fontSize="22" fontWeight="bold" letterSpacing="0.22em" textAnchor="middle">GUCCI</text>
      </svg>
    )
  },
  { 
    id: "dior", 
    logo: (
      <svg width="170" height="42" viewBox="0 0 100 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Playfair Display', 'Didot', 'Bodoni MT', serif" fontSize="22" fontWeight="700" letterSpacing="0.18em" textAnchor="middle">Dior</text>
      </svg>
    )
  },
  { 
    id: "ysl", 
    logo: (
      <svg width="240" height="42" viewBox="0 0 160 30" fill="currentColor">
        <text x="50%" y="21" fontFamily="'Cinzel', 'Times New Roman', serif" fontSize="11" fontWeight="600" letterSpacing="0.24em" textAnchor="middle">YVES SAINT LAURENT</text>
      </svg>
    )
  },
  { 
    id: "hermes", 
    logo: (
      <svg width="200" height="42" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="21" fontFamily="'Rockwell', 'Courier New', serif" fontSize="14" fontWeight="bold" letterSpacing="0.22em" textAnchor="middle">HERMÈS</text>
      </svg>
    )
  },
  { 
    id: "adidas", 
    logo: (
      <svg width="90" height="42" viewBox="0 0 60 40" fill="currentColor">
        <path d="M 15 32 L 20 32 L 35 8 L 30 8 Z" />
        <path d="M 25 32 L 30 32 L 45 8 L 40 8 Z" />
        <path d="M 35 32 L 40 32 L 55 8 L 50 8 Z" />
      </svg>
    )
  }
];

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
        py: { xs: 8, md: 11 },
        borderTop: "1px solid rgba(0,0,0,0.05)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        width: "100%",
        textAlign: "center"
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
          <Typography sx={{ color: "rgba(0,0,0,0.5)", fontSize: 14, lineHeight: 1.7, fontFamily: '"Cairo", sans-serif' }}>
            {t.desc}
          </Typography>
        </Box>

        {/* Elegant Grid of SVG Brand Logos */}
        <Box 
          sx={{ 
            display: "grid", 
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(7, 1fr)" }, 
            gap: { xs: 5, md: 3 },
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {brandsList.map((item) => (
            <Link
              key={item.id}
              href={`/${lang}/brand/${item.id}`}
              style={{ textDecoration: "none", display: "block" }}
            >
              <MotionBox
                initial={{ opacity: 0.35, scale: 1 }}
                whileInView={{ opacity: 0.55 }}
                viewport={{ once: true }}
                whileHover={{ opacity: 1, scale: 1.04, color: "#000000" }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#555555", // Default medium-grey
                  cursor: "pointer",
                  py: 2
                }}
              >
                {item.logo}
              </MotionBox>
            </Link>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
