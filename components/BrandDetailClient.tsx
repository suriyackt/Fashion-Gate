"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, Button, Container, Stack, Typography, ThemeProvider, createTheme, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Brand } from "@/lib/brandData";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const brandVectorLogos: Record<string, React.ReactNode> = {
  adidas: (
    <svg width="220" height="50" viewBox="0 0 120 30" fill="currentColor">
      <text x="50%" y="22" fontFamily="'Futura', 'Helvetica Neue', 'Arial', sans-serif" fontSize="20" fontWeight="bold" letterSpacing="0.1em" textAnchor="middle">adidas</text>
    </svg>
  ),
  "calvin-klein": (
    <svg width="280" height="50" viewBox="0 0 140 30" fill="currentColor">
      <text x="50%" y="22" fontFamily="'Futura', 'Helvetica Neue', 'Arial', sans-serif" fontSize="17" fontWeight="bold" letterSpacing="0.25em" textAnchor="middle">CALVIN KLEIN</text>
    </svg>
  ),
  skechers: (
    <svg width="260" height="50" viewBox="0 0 140 30" fill="currentColor">
      <text x="50%" y="22" fontFamily="'Arial Black', sans-serif" fontSize="18" fontWeight="900" letterSpacing="0.15em" textAnchor="middle">SKECHERS</text>
    </svg>
  ),
  "paul-shark": (
    <svg width="340" height="50" viewBox="0 0 160 30" fill="currentColor">
      <text x="50%" y="22" fontFamily="'Futura', 'Arial Black', sans-serif" fontSize="16" fontWeight="900" letterSpacing="0.18em" textAnchor="middle">PAUL & SHARK</text>
    </svg>
  ),
  maxmara: (
    <svg width="260" height="50" viewBox="0 0 120 30" fill="currentColor">
      <text x="50%" y="22" fontFamily="'Granjon', 'Garamond', serif" fontSize="21" fontWeight="bold" letterSpacing="0.15em" textAnchor="middle">MaxMara</text>
    </svg>
  ),
  editorial: (
    <svg width="260" height="50" viewBox="0 0 120 30" fill="currentColor">
      <text x="50%" y="22" fontFamily="'Playfair Display', 'Didot', serif" fontSize="18" fontWeight="bold" letterSpacing="0.3em" textAnchor="middle">EDITORIAL</text>
    </svg>
  ),
  "sandro-moje": (
    <svg width="300" height="50" viewBox="0 0 150 30" fill="currentColor">
      <text x="50%" y="22" fontFamily="'Futura', 'Helvetica Neue', 'Arial', sans-serif" fontSize="17" fontWeight="bold" letterSpacing="0.22em" textAnchor="middle">SANDRO moje</text>
    </svg>
  )
};

export default function BrandDetailClient({
  brand,
  initialLang,
  settings
}: { 
  brand: Brand; 
  initialLang: "ar" | "en";
  settings?: { primaryColor?: string; accentColor?: string };
}) {
  const router = useRouter();
  const [lang, setLang] = useState<"en" | "ar">(initialLang);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: "dark",
      primary: { main: settings?.primaryColor || "#CB6116", dark: "#9D430C" },
      secondary: { main: settings?.accentColor || "#D06010" }
    },
    typography: {
      fontFamily: `"Cairo", sans-serif`,
      button: { fontWeight: 800 }
    },
    shape: { borderRadius: 0 }
  }), [settings?.primaryColor, settings?.accentColor]);

  // Scroll to top on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleLangToggle = () => {
    const nextLang = lang === "ar" ? "en" : "ar";
    setLang(nextLang);
    router.replace(`/brand/${brand.id}/${nextLang}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box 
        dir={lang === "ar" ? "rtl" : "ltr"}
        sx={{ 
          bgcolor: "#050505", 
          color: "#ffffff", 
          minHeight: "100vh", 
          display: "flex", 
          flexDirection: "column" 
        }}
      >
        {/* Site Header */}
        <SiteHeader
          settings={{ title: "Fashion Gate" }}
          onLangToggleStart={handleLangToggle}
        />
        
        {/* Main coming soon block */}
        <Box 
          sx={{ 
            flexGrow: 1, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            py: { xs: 10, md: 16 },
            px: 3,
            position: "relative",
            overflow: "hidden",
            backgroundImage: "url('/assets/headerbg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Radial soft background overlay */}
          <Box 
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "radial-gradient(circle at center, rgba(203, 97, 22, 0.12) 0%, rgba(5,5,5,0.92) 80%)",
              zIndex: 1
            }}
          />

          <Container maxWidth="md" sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            {/* Back button */}
            <Button
              component={Link}
              href={`/${lang}`}
              startIcon={lang === "en" && <ArrowBackIcon />}
              endIcon={lang === "ar" && <ArrowBackIcon sx={{ transform: "scaleX(-1)" }} />}
              sx={{
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 0,
                px: 2.5,
                py: 0.8,
                fontSize: 12,
                mb: 6,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: '"Cairo", sans-serif',
                "&:hover": {
                  border: "1px solid #ffffff",
                  bgcolor: "rgba(255,255,255,0.05)"
                }
              }}
            >
              {lang === "ar" ? "رجوع" : "Back"}
            </Button>

            {/* Brand Logo representation */}
            <Box sx={{ color: "#ffffff", mb: 5, display: "flex", justifyContent: "center", transform: "scale(1.05)" }}>
              {brandVectorLogos[brand.id] || (
                <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 28, md: 36 }, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  {lang === "ar" ? brand.nameAr : brand.name}
                </Typography>
              )}
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", width: "120px", mx: "auto", mb: 5 }} />

            {/* Sub-headline */}
            <Typography sx={{ color: "primary.main", textTransform: "uppercase", fontSize: 13, fontWeight: 800, letterSpacing: "0.3em", mb: 2.5, fontFamily: '"Cairo", sans-serif' }}>
              {lang === "ar" ? "قريباً" : "Coming Soon"}
            </Typography>

            <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 30, md: 42 }, fontWeight: 500, lineHeight: 1.25, mb: 3 }}>
              {lang === "ar" ? "نحضر لكم مساحة الفخامة المخصصة" : "A Spatial Showcase in the Making"}
            </Typography>

            <Typography sx={{ color: "rgba(255,255,255,0.64)", fontSize: 15, lineHeight: 1.8, maxWidth: 640, mx: "auto", mb: 6, fontFamily: '"Cairo", sans-serif' }}>
              {lang === "ar" 
                ? "نحن نجهز لإطلاق المساحة الخاصة بالدار في فاشن جيت مول، بوليفارد دمشق. ترقبوا التشكيلات الحصرية وقطع التصميم الفاخرة التي تصل قريباً."
                : `We are preparing an exclusive spatial boutique showcase for ${brand.name} at Fashion Gate Mall, Damascus Boulevard. Sign up to stay informed on arrival dates and seasonal private viewings.`
              }
            </Typography>

            <Stack direction="row" justifyContent="center" gap={3}>
              <Button
                component={Link}
                href={`/${lang}`}
                sx={{
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.15)",
                  px: 4,
                  py: 1.4,
                  borderRadius: 0,
                  textTransform: "uppercase",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  fontFamily: '"Cairo", sans-serif',
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.05)",
                    borderColor: "#ffffff"
                  }
                }}
              >
                {lang === "ar" ? "العودة للرئيسية" : "Return Home"}
              </Button>
              <Button
                component={Link}
                href={`/contact/${lang}`}
                sx={{
                  bgcolor: "primary.main",
                  color: "#ffffff",
                  px: 4,
                  py: 1.4,
                  borderRadius: 0,
                  textTransform: "uppercase",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  fontFamily: '"Cairo", sans-serif',
                  "&:hover": {
                    bgcolor: "primary.dark"
                  }
                }}
              >
                {lang === "ar" ? "تواصل مع خدمة العملاء" : "Contact Concierge"}
              </Button>
            </Stack>
          </Container>
        </Box>

        {/* Site Footer */}
        <SiteFooter />
      </Box>
    </ThemeProvider>
  );
}
