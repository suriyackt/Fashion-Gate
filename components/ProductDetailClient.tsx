"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, Button, Container, Stack, Typography, ThemeProvider, createTheme, Divider, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Product } from "@/lib/productData";
import { getBrandById } from "@/lib/brandData";


interface ProductDetailClientProps {
  product: Product;
  initialLang: "ar" | "en";
}

export default function ProductDetailClient({ product, initialLang }: ProductDetailClientProps) {
  const router = useRouter();
  const [lang, setLang] = useState<"en" | "ar">(initialLang);

  useEffect(() => {
    setLang(initialLang);
  }, [initialLang]);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);
    return () => clearTimeout(timer);
  }, [product.id]);

  const resolvedBrandName = useMemo(() => {
    const brandObj = getBrandById(product.brandId);
    return brandObj ? (lang === "ar" ? brandObj.nameAr : brandObj.name) : product.brandId.toUpperCase();
  }, [product.brandId, lang]);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#CB6116", dark: "#9D430C" },
      secondary: { main: "#D06010" }
    },
    typography: {
      fontFamily: `"Cairo", sans-serif`,
      button: { fontWeight: 800 }
    },
    shape: { borderRadius: 0 }
  }), []);

  const handleLangToggle = () => {
    const nextLang = lang === "ar" ? "en" : "ar";
    setLang(nextLang);
    router.replace(`/product/${product.id}/${nextLang}`);
  };

  const productTitle = lang === "ar" ? (product.titleAr || product.title) : product.title;
  const productCat = lang === "ar" ? (product.categoryAr || product.category) : product.category;

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

        
        {/* Main Content Area */}
        <Box 
          sx={{ 
            flexGrow: 1, 
            display: "flex", 
            alignItems: "center", 
            py: { xs: 8, md: 14 },
            px: 3,
            position: "relative",
            overflow: "hidden",
            backgroundImage: "url('/assets/headerbg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Soft background dark overlay */}
          <Box 
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "radial-gradient(circle at center, rgba(203, 97, 22, 0.08) 0%, rgba(5,5,5,0.95) 80%)",
              zIndex: 1
            }}
          />

          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
            <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
              
              {/* Left Column: Product Showcase Photo */}
              <Grid size={{ xs: 12, md: 5 }}>
                <Box 
                  sx={{ 
                    position: "relative",
                    width: "100%", 
                    aspectRatio: "3/4",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    bgcolor: "#111111",
                    overflow: "hidden"
                  }}
                >
                  <Box 
                    component="img"
                    src={product.imageUrl || "/brand/logo.png"}
                    alt={productTitle}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                  
                  {/* Subtle coming soon label on image corner */}
                  <Box 
                    sx={{
                      position: "absolute",
                      top: 16,
                      [lang === "ar" ? "left" : "right"]: 16,
                      bgcolor: "primary.main",
                      color: "#ffffff",
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      px: 2,
                      py: 0.6
                    }}
                  >
                    {lang === "ar" ? "قريباً" : "Arriving Soon"}
                  </Box>
                </Box>
              </Grid>

              {/* Right Column: Narrative Splash Details */}
              <Grid size={{ xs: 12, md: 7 }} sx={{ textAlign: lang === "ar" ? "right" : "left" }}>
                <Stack spacing={4}>
                  <Box>
                    {/* Back navigation link */}
                    <Button
                      component={Link}
                      href={`/${lang}`}
                      startIcon={lang === "en" && <ArrowBackIcon />}
                      endIcon={lang === "ar" && <ArrowBackIcon sx={{ transform: "scaleX(-1)" }} />}
                      sx={{
                        color: "rgba(255,255,255,0.64)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: 0,
                        px: 2.5,
                        py: 0.8,
                        fontSize: 11,
                        mb: 4,
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

                    <Typography sx={{ color: "primary.main", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", mb: 1 }}>
                      {resolvedBrandName} — {productCat}
                    </Typography>
                    
                    <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 28, md: 40 }, fontWeight: 500, lineHeight: 1.25, mb: 2 }}>
                      {productTitle}
                    </Typography>
                    
                    <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", width: "100px", my: 2.5 }} />
                    
                    <Typography sx={{ color: "rgba(255,255,255,0.64)", fontSize: 15, lineHeight: 1.8, fontFamily: '"Cairo", sans-serif' }}>
                      {lang === "ar" 
                        ? "هذه القطعة الحصرية مصممة كتحفة فريدة وتصل قريباً كجزء من المجموعات الخاصة القادمة إلى فاشن جيت مول، بوليفارد دمشق. ترقبوا الإطلاق الرسمي."
                        : `This exclusive design piece is currently arriving as a featured collection entry at Fashion Gate Mall, Damascus Boulevard. Register below to check availability or secure a private atelier pre-order.`
                      }
                    </Typography>
                  </Box>

                  {/* Feature lists */}
                  <Stack direction="row" spacing={3} sx={{ borderTop: "1px solid rgba(255,255,255,0.08)", pt: 4.5 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", mb: 0.8 }}>
                        {lang === "ar" ? "الحالة" : "AVAILABILITY"}
                      </Typography>
                      <Typography sx={{ fontSize: 13, fontWeight: 600, color: "primary.main", fontFamily: '"Cairo", sans-serif' }}>
                        {lang === "ar" ? "قريباً في المعرض" : "Exhibition Preview Coming Soon"}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", mb: 0.8 }}>
                        {lang === "ar" ? "الموقع" : "ATELIER SALON"}
                      </Typography>
                      <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#ffffff", fontFamily: '"Cairo", sans-serif' }}>
                        {lang === "ar" ? "حي البوليفارد، دمشق" : "Boulevard Damascus"}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Actions */}
                  <Stack direction="row" gap={3} sx={{ pt: 2 }}>
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
                      {lang === "ar" ? "حجز موعد خاص" : "Private Inquiry"}
                    </Button>
                  </Stack>
                </Stack>
              </Grid>

            </Grid>
          </Container>
        </Box>

      </Box>
    </ThemeProvider>
  );
}
