"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, Button, Typography, ThemeProvider, createTheme } from "@mui/material";
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
  sandro: (
    <svg width="240" height="50" viewBox="0 0 120 30" fill="currentColor">
      <text x="50%" y="22" fontFamily="'Futura', 'Helvetica Neue', 'Arial', sans-serif" fontSize="20" fontWeight="bold" letterSpacing="0.15em" textAnchor="middle">SANDRO</text>
    </svg>
  ),
  moje: (
    <svg width="180" height="50" viewBox="0 0 100 30" fill="currentColor">
      <text x="50%" y="22" fontFamily="'Didot', 'Times New Roman', serif" fontSize="21" fontStyle="italic" fontWeight="bold" letterSpacing="0.1em" textAnchor="middle">moje</text>
    </svg>
  )
};

export default function BrandDetailClient({
  brand,
  initialLang,
  settings
}: { 
  brand: any; 
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

  const bgUrl = brand.bgImage?.asset?.url || brand.backdropUrl || "/assets/headerbg.png";
  const headlineText = brand.headline?.[lang] || brand.headline || "";
  const descriptionText = brand.description?.[lang] || brand.description || "";
  const logoUrl = brand.image?.asset?.url;

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
        
        {/* Immersive Brand Hero Container */}
        <Box 
          sx={{ 
            flexGrow: 1, 
            display: "flex", 
            alignItems: "flex-end", 
            justifyContent: "flex-end", 
            minHeight: "calc(100vh - 80px)",
            position: "relative",
            overflow: "hidden",
            backgroundImage: `url('${bgUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            py: { xs: 8, md: 12 },
            px: { xs: 4, md: 10 }
          }}
        >
          {/* Radial & linear dark wash overlay for premium legibility */}
          <Box 
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(to top, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0.2) 50%, rgba(5,5,5,0.05) 100%)",
              zIndex: 1
            }}
          />

          {/* Absolute positioned Back Button in the Top Left Corner */}
          <Box 
            sx={{ 
              position: "absolute", 
              top: 32, 
              left: 32, 
              zIndex: 10 
            }}
          >
            <Button
              component={Link}
              href={`/${lang}`}
              startIcon={lang === "en" && <ArrowBackIcon sx={{ fontSize: 14 }} />}
              endIcon={lang === "ar" && <ArrowBackIcon sx={{ transform: "scaleX(-1)", fontSize: 14 }} />}
              sx={{
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 0,
                px: 2.5,
                py: 0.8,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: '"Cairo", sans-serif',
                backdropFilter: "blur(8px)",
                bgcolor: "rgba(5,5,5,0.45)",
                transition: "all 0.3s ease",
                "&:hover": {
                  border: "1px solid #ffffff",
                  bgcolor: "rgba(255,255,255,0.2)",
                  transform: "translateY(-2px)"
                }
              }}
            >
              {lang === "ar" ? "رجوع" : "Back"}
            </Button>
          </Box>

          {/* Bottom Right Brand Details Box */}
          <Box 
            sx={{ 
              position: "relative",
              zIndex: 2, 
              maxWidth: 620,
              textAlign: "right",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              bgcolor: "rgba(5, 5, 5, 0.6)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              p: { xs: 4, md: 5.5 },
              boxShadow: "0 20px 40px rgba(0,0,0,0.55)"
            }}
          >
            {/* Brand Logo (Right-based) */}
            <Box 
              sx={{ 
                color: "#ffffff", 
                mb: 3, 
                display: "flex", 
                justifyContent: "flex-end",
                transform: "scale(1.05)",
                width: "max-content"
              }}
            >
              {logoUrl ? (
                <Box 
                  component="img" 
                  src={logoUrl} 
                  alt={brand.title} 
                  sx={{ height: 48, width: "auto", objectFit: "contain" }} 
                />
              ) : (
                brandVectorLogos[brand.id] || (
                  <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 28, md: 36 }, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                    {lang === "ar" ? brand.nameAr || brand.title : brand.name || brand.title}
                  </Typography>
                )
              )}
            </Box>

            {/* Headline */}
            <Typography 
              sx={{ 
                fontFamily: "var(--heading-font)", 
                fontSize: { xs: 26, sm: 32, md: 44 }, 
                fontWeight: 500, 
                lineHeight: 1.25, 
                mb: 2,
                color: "#ffffff",
                letterSpacing: "0.02em"
              }}
            >
              {headlineText}
            </Typography>

            {/* Divider */}
            <Box sx={{ width: 80, height: 2, bgcolor: "primary.main", mb: 3.5 }} />

            {/* Description */}
            <Typography 
              sx={{ 
                color: "rgba(255,255,255,0.72)", 
                fontSize: { xs: 14, md: 15.5 }, 
                lineHeight: 1.8, 
                fontFamily: '"Cairo", sans-serif',
                fontWeight: 300
              }}
            >
              {descriptionText}
            </Typography>
          </Box>
        </Box>

        {/* Site Footer */}
        <SiteFooter />
      </Box>
    </ThemeProvider>
  );
}
