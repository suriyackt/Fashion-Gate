"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import type { Section } from "@/lib/types";

export default function ManifestoSection({ 
  section, 
  t 
}: { 
  section: Section; 
  t: (s?: string) => string; 
}) {
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
