"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

const MotionBox = motion.create(Box);

const brandLogos = [
  // Chanel
  {
    key: "chanel",
    logo: (
      <svg width="150" height="36" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Futura', 'Helvetica Neue', 'Arial', sans-serif" fontSize="20" fontWeight="bold" letterSpacing="0.35em" textAnchor="middle">CHANEL</text>
      </svg>
    )
  },
  // Prada
  {
    key: "prada",
    logo: (
      <svg width="150" height="36" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Engravers MT', 'Copperplate', 'Times New Roman', serif" fontSize="16" fontWeight="900" letterSpacing="0.18em" textAnchor="middle">PRADA</text>
      </svg>
    )
  },
  // Gucci
  {
    key: "gucci",
    logo: (
      <svg width="150" height="36" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Granjon', 'Garamond', serif" fontSize="20" fontWeight="bold" letterSpacing="0.25em" textAnchor="middle">GUCCI</text>
      </svg>
    )
  },
  // Dior
  {
    key: "dior",
    logo: (
      <svg width="120" height="36" viewBox="0 0 100 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Playfair Display', 'Didot', 'Bodoni MT', serif" fontSize="20" fontWeight="700" letterSpacing="0.2em" textAnchor="middle">Dior</text>
      </svg>
    )
  },
  // Yves Saint Laurent
  {
    key: "ysl",
    logo: (
      <svg width="180" height="36" viewBox="0 0 160 30" fill="currentColor">
        <text x="50%" y="21" fontFamily="'Cinzel', 'Times New Roman', serif" fontSize="12" fontWeight="600" letterSpacing="0.3em" textAnchor="middle">YVES SAINT LAURENT</text>
      </svg>
    )
  },
  // Hermès
  {
    key: "hermes",
    logo: (
      <svg width="150" height="36" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="21" fontFamily="'Rockwell', 'Courier New', serif" fontSize="14" fontWeight="bold" letterSpacing="0.25em" textAnchor="middle">HERMÈS</text>
      </svg>
    )
  },
  // Adidas
  {
    key: "adidas",
    logo: (
      <svg width="55" height="36" viewBox="0 0 60 40" fill="currentColor">
        <path d="M 15 32 L 20 32 L 35 8 L 30 8 Z" />
        <path d="M 25 32 L 30 32 L 45 8 L 40 8 Z" />
        <path d="M 35 32 L 40 32 L 55 8 L 50 8 Z" />
      </svg>
    )
  },
  // Chanel CC Logo representation
  {
    key: "chanel-cc",
    logo: (
      <svg width="55" height="36" viewBox="0 0 60 40" fill="currentColor">
        <path d="M 22,20 C 22,13.4 27.4,8 34,8 C 38,8 41.5,10 43.5,13 L 39,16.5 C 38,15 36,14 34,14 C 30.7,14 28,16.7 28,20 C 28,23.3 30.7,26 34,26 C 36,26 38,25 39,23.5 L 43.5,27 C 41.5,30 38,32 34,32 C 27.4,32 22,26.6 22,20 Z" />
        <path d="M 38,20 C 38,23.3 35.3,26 32,26 C 30,26 28,25 27,23.5 L 22.5,27 C 24.5,30 28,32 32,32 C 38.6,32 44,26.6 44,20 C 44,13.4 38.6,8 32,8 C 28,8 24.5,10 22.5,13 L 27,16.5 C 28,15 30,14 32,14 C 35.3,14 38,16.7 38,20 Z" />
      </svg>
    )
  }
];

export default function BrandMarquee() {
  const params = useParams();
  const lang = params?.lang === "en" ? "en" : "ar";

  const t = {
    en: {
      eyebrow: "Official Partnerships",
      title: "Joined Luxury Houses",
      desc: "Fashion Gate is the authorized destination for the world's most prestigious designer collections, bringing global haute couture and lifestyle masterpieces to Damascus."
    },
    ar: {
      eyebrow: "شراكات رسمية",
      title: "دور الفخامة المنضمة",
      desc: "بوابة الأزياء هي الوجهة المعتمدة لأرقى مجموعات المصممين في العالم، حيث تقدم الأزياء الراقية العالمية ولايف ستايل لدمشق."
    }
  }[lang];

  return (
    <Box 
      component="section" 
      sx={{ 
        bgcolor: "#ffffff", 
        py: { xs: 8, md: 12 },
        borderTop: "1px solid rgba(0,0,0,0.05)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        width: "100%",
        textAlign: lang === "ar" ? "right" : "left"
      }}
    >
      <Container maxWidth="xl">
        {/* Section Header */}
        <Box 
          sx={{ 
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "flex-end" },
            gap: 3,
            mb: { xs: 6, md: 8 }
          }}
        >
          <Box sx={{ maxWidth: 720 }}>
            <Typography sx={{ color: "primary.main", textTransform: "uppercase", fontSize: 11, fontWeight: 800, letterSpacing: "0.22em", mb: 1.5, fontFamily: '"Cairo", sans-serif' }}>
              {t.eyebrow}
            </Typography>
            <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 28, sm: 38, md: 48 }, fontWeight: 500, lineHeight: 1.15, color: "#111111" }}>
              {t.title}
            </Typography>
          </Box>
          <Box sx={{ maxWidth: 440 }}>
            <Typography sx={{ color: "rgba(0,0,0,0.64)", fontSize: 14, lineHeight: 1.7, fontFamily: '"Cairo", sans-serif' }}>
              {t.desc}
            </Typography>
          </Box>
        </Box>

        {/* Elegant static Grid of Partners */}
        <Box 
          sx={{ 
            display: "grid", 
            gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr 1fr" },
            width: "100%",
            bgcolor: "rgba(0,0,0,0.06)", // thin grid border lines
            gap: "1px" // collapses gap into 1px borders
          }}
        >
          {brandLogos.map((item, index) => (
            <MotionBox
              key={item.key}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              sx={{
                bgcolor: "#ffffff",
                minHeight: { xs: 110, md: 150 },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#111111",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                position: "relative",
                overflow: "hidden",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "0%",
                  height: "2px",
                  bgcolor: "primary.main",
                  transition: "width 0.4s ease"
                },
                "&:hover": {
                  bgcolor: "#FAF8F5",
                  transform: "translateY(-2px)",
                  zIndex: 2,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.02)",
                  "&::after": {
                    width: "40%"
                  }
                }
              }}
            >
              <Box 
                sx={{ 
                  opacity: 0.68, 
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": { 
                    opacity: 1,
                    transform: "scale(1.03)"
                  }
                }}
              >
                {item.logo}
              </Box>
            </MotionBox>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
