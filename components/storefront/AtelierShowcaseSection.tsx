"use client";

import { Box, Container, Stack, Typography } from "@mui/material";

export default function AtelierShowcaseSection({ 
  t, 
  lang 
}: { 
  t: (s?: string) => string; 
  lang: "ar" | "en"; 
}) {
  return (
    <Box component="section" id="boulevard" sx={{ bgcolor: "#FAF8F5", color: "#111111", py: { xs: 10, md: 14 }, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <Container maxWidth="xl">
        <Stack spacing={{ xs: 6, md: 8 }}>
          
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

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: 4, md: 6 } }}>
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
