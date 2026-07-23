"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import type { Section } from "@/lib/types";
import { getLocalizedValue } from "@/lib/sanity";

export default function EditorialSection({ 
  section, 
  t, 
  lang 
}: { 
  section: Section; 
  t: (s?: string) => string; 
  lang: "ar" | "en"; 
}) {
  // Resolve localized text dynamically with fallbacks using our helper
  const eyebrowText = getLocalizedValue(
    section.eyebrow,
    lang,
    ""
  );

  const headlineText = getLocalizedValue(
    section.headline,
    lang,
    ""
  );

  const descriptionText = getLocalizedValue(
    section.description,
    lang,
    ""
  );

  return (
    <Box id={section.anchor} component="section" sx={{ py: { xs: 10, md: 14 }, bgcolor: "var(--fg-stone)", color: "#111111" }}>
      <Container maxWidth="xl">
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" }, gap: { xs: 6, md: 8 }, alignItems: "center" }}>
          
          <Stack spacing={3.5} alignItems="flex-start" textAlign={lang === "ar" ? "right" : "left"} sx={{ px: { xs: 1, md: 4 } }}>
            <Typography sx={{ color: "#ffffff", textTransform: "uppercase", fontSize: 12, fontWeight: 700, letterSpacing: lang === "ar" ? 0 : "0.2em", bgcolor: "primary.main", px: 2, py: 0.5, fontFamily: '"Cairo", sans-serif' }}>
              {eyebrowText}
            </Typography>
            <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 34, md: 58 }, fontWeight: 600, lineHeight: 1.1, color: "#111111" }}>
              {headlineText}
            </Typography>
            <Typography sx={{ color: "rgba(0,0,0,0.72)", fontSize: 16, lineHeight: 1.8, maxWidth: 740, fontFamily: '"Cairo", sans-serif' }}>
              {descriptionText}
            </Typography>
          </Stack>

          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
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
