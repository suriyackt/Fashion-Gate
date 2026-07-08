"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { getProductById, products, type Product } from "@/lib/productData";
import { Box, Button, Container, Typography, Stack, Modal, ThemeProvider, createTheme } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareIcon from "@mui/icons-material/Share";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

const MotionBox = motion.create(Box);



interface ProductDetailClientProps {
  product: Product;
  initialLang: "ar" | "en";
}

export default function ProductDetailClient({ product, initialLang }: ProductDetailClientProps) {
  const router = useRouter();
  
  const lang = initialLang;
  const [isLangTransitioning, setIsLangTransitioning] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    setIsLangTransitioning(false);
  }, [initialLang]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [product.id]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => {
        setShareCopied(false);
      }, 2000);
    }
  };



  // Unified theme mapping - strictly Orange, Black, White, and Grey (no blue!)
  const theme = useMemo(() => createTheme({
    palette: {
      mode: "light",
      primary: { main: "#CB6116", dark: "#9D430C" },
      secondary: { main: "#000000" }
    },
    typography: {
      fontFamily: `"Cairo", sans-serif`,
      button: { fontWeight: 700 }
    },
    shape: { borderRadius: 0 }
  }), []);

  // Simple translations for detail page UI
  const uiTranslations = {
    en: {
      back: "Back",
      share: "Share Masterpiece",
      shareCopied: "Link Copied to Clipboard",
      related: "Related Masterpieces",
      details: "Specification & Details",
      origin: "Origin & Craftsmanship",
      explore: "Explore Piece"
    },
    ar: {
      back: "رجوع",
      share: "مشاركة التحفة الفنية",
      shareCopied: "تم نسخ الرابط إلى الحافظة",
      related: "روائع ذات صلة",
      details: "المواصفات والتفاصيل",
      origin: "المنشأ والحرفية",
      explore: "استكشف القطعة"
    }
  };

  const t = uiTranslations[lang];

  if (!product) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#ffffff", color: "#000000", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography>Product not found</Typography>
      </Box>
    );
  }

  const title = lang === "ar" ? product.titleAr : product.title;
  const category = lang === "ar" ? product.categoryAr : product.category;
  const description = lang === "ar" ? product.descriptionAr : product.description;
  const slogan = lang === "ar" ? product.sloganAr : product.slogan;
  const detailsList = lang === "ar" ? product.detailsAr : product.details;

  // Filter category-specific related products (same category/department)
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box 
        dir={lang === "ar" ? "rtl" : "ltr"} 
        sx={{ 
          bgcolor: "#ffffff", // Clean White background
          color: "#000000", // Solid Black text
          minHeight: "100vh",
          pb: 6, 
          position: "relative"
        }}
      >


        <Box 
          sx={{ 
            opacity: isLangTransitioning ? 0 : 1, 
            transition: "opacity 0.25s ease-in-out" 
          }}
        >

          <SiteHeader onLangToggleStart={() => setIsLangTransitioning(true)} />
 
        {/* Main product columns */}
        <Container maxWidth="xl" sx={{ mt: { xs: 4, md: 6 } }}>
          {/* Back Link (Persists correct language choice and scrolls to lookbook) */}
          <Button
            onClick={() => {
              if (typeof window !== "undefined" && window.history.length > 1) {
                router.back();
              } else {
                router.push(`/${lang}`);
              }
            }}
            sx={{ 
              textDecoration: "none", 
              color: "#D1D1D1", 
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              fontSize: 13,
              fontWeight: 600,
              fontFamily: '"Cairo", sans-serif',
              marginBottom: 3,
              textTransform: "none",
              p: 0,
              minWidth: 0,
              transition: "color 0.3s ease",
              "&:hover": { color: "primary.main" }
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 16, mr: lang === "ar" ? 0 : 1, ml: lang === "ar" ? 1 : 0, transform: lang === "ar" ? "rotate(180deg)" : "none" }} />
            {t.back}
          </Button>

          {/* Dynamic Two-Column Layout */}
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" }, gap: { xs: 4, md: 8, lg: 10 } }}>
            {/* Left Column: Borderless floating image with soft shadow */}
            <Box>
              <Box 
                sx={{ 
                  position: "relative", 
                  width: "100%", 
                  aspectRatio: "3 / 4", 
                  overflow: "hidden",
                  bgcolor: "#ffffff",
                  boxShadow: "0 15px 45px rgba(0,0,0,0.06)",
                  border: "1px solid rgba(0,0,0,0.04)"
                }}
              >
                <Box 
                  component="img"
                  src={product.imageUrl}
                  alt={title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </Box>
            </Box>

            {/* Right Column: Premium Details Panel */}
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Stack spacing={3.5}>
                <Box>
                  {/* Category eyebrow in Griphorium script font stack */}
                  <Typography 
                    sx={{ 
                      fontFamily: '"Griphorium", "Griphosium", "Graphion", "Brush Script MT", cursive', 
                      fontSize: { xs: "1.8rem", md: "2.4rem" }, 
                      color: "primary.main",
                      mb: 1
                    }}
                  >
                    {category}
                  </Typography>
                  
                  <Box sx={{ width: 40, height: 1.5, bgcolor: "#D1D1D1", mb: 2 }} />

                  <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 34, md: 48 }, fontWeight: 500, lineHeight: 1.15, color: "#000000" }}>
                    {title}
                  </Typography>
                </Box>

                <Typography sx={{ color: "rgba(0,0,0,0.72)", fontSize: 15, lineHeight: 1.8, fontFamily: '"Cairo", sans-serif' }}>
                  {description}
                </Typography>

                {/* Specifications block (Bullet points colored in signature orange) */}
                <Box sx={{ borderTop: "1px solid rgba(0,0,0,0.08)", pt: 3 }}>
                  <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: 18, fontWeight: 500, mb: 2, color: "#000000" }}>
                    {t.details}
                  </Typography>
                  <Stack spacing={1.5}>
                    {detailsList.map((detail, index) => (
                      <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1.5, borderBottom: "1px solid rgba(0,0,0,0.04)", pb: 1 }}>
                        <Box sx={{ width: 6, height: 6, bgcolor: "#CB6116", borderRadius: 0 }} /> {/* Custom orange square bullet */}
                        <Typography sx={{ color: "rgba(0,0,0,0.72)", fontSize: 13.5, fontFamily: '"Cairo", sans-serif' }}>
                          {detail}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>

                {/* Signature Packaging Presentation Card */}
                <Box 
                  sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 3, 
                    bgcolor: "#F7F2EC", // Warm brand cream background
                    border: "1px solid rgba(203, 97, 22, 0.08)", 
                    p: 2.5,
                    mt: 3,
                    mb: 1
                  }}
                >
                  <Box 
                    component="img"
                    src="/assets/baglight.png"
                    alt="Fashion Gate Signature Light Carrier Bag"
                    sx={{ 
                      width: 80, 
                      height: "auto", 
                      objectFit: "contain",
                      filter: "drop-shadow(0px 8px 16px rgba(0,0,0,0.06))",
                      animation: "detail-bag-float 6s ease-in-out infinite",
                      "@keyframes detail-bag-float": {
                        "0%": { transform: "translateY(0px) rotate(0deg)" },
                        "50%": { transform: "translateY(-6px) rotate(1.5deg)" },
                        "100%": { transform: "translateY(0px) rotate(0deg)" }
                      }
                    }}
                  />
                  <Stack spacing={0.5}>
                    <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: 15, fontWeight: 600, color: "#111111" }}>
                      {lang === "ar" ? "حقيبة التقديم المميزة" : "The Signature Presentation"}
                    </Typography>
                    <Typography sx={{ color: "rgba(0,0,0,0.64)", fontSize: 12.5, fontFamily: '"Cairo", sans-serif', lineHeight: 1.5 }}>
                      {lang === "ar" ? (
                        "تُقدّم هذه القطعة في حقيبتنا الفاخرة المنسوجة يدوياً."
                      ) : (
                        "Your selection is presented in our signature hand-finished textured carrier bag, preserving the threshold of luxury."
                      )}
                    </Typography>
                  </Stack>
                </Box>

                {/* Share Masterpiece Button */}
                <Button
                  variant="contained"
                  onClick={handleShare}
                  startIcon={<ShareIcon sx={{ mr: lang === "ar" ? 0 : 1, ml: lang === "ar" ? 1 : 0 }} />}
                  sx={{
                    bgcolor: shareCopied ? "primary.main" : "#000000", // FGB Signature Orange on success, black otherwise
                    color: "#ffffff",
                    borderRadius: 0,
                    py: 1.8,
                    px: 6,
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    fontFamily: '"Cairo", sans-serif',
                    alignSelf: "flex-start", // Fit to contents instead of full-width
                    boxShadow: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "primary.main", // FGB Signature Orange on hover
                      boxShadow: "none"
                    }
                  }}
                >
                  {shareCopied ? t.shareCopied : t.share}
                </Button>
              </Stack>
            </Box>
          </Box>

          {/* Down Slogan Quote */}
          <Box 
            sx={{ 
              my: { xs: 6, md: 8 }, 
              textAlign: "center", 
              bgcolor: "#F7F7F7", 
              borderTop: "1px solid rgba(0,0,0,0.05)",
              borderBottom: "1px solid rgba(0,0,0,0.05)",
              py: 5,
              px: 3
            }}
          >
            <Typography 
              sx={{ 
                fontFamily: '"Griphorium", "Griphosium", "Graphion", "Brush Script MT", cursive', 
                fontSize: { xs: "2rem", md: "3rem" }, 
                lineHeight: 1.4,
                color: "primary.main",
                maxWidth: 900,
                mx: "auto"
              }}
            >
              “{slogan}”
            </Typography>
          </Box>

          {/* Related Products Grid (Light Theme Cards - Category Specific) */}
          {relatedProducts.length > 0 && (
            <Box>
              <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 26, md: 32 }, fontWeight: 500, mb: 4, textAlign: lang === "ar" ? "right" : "left", color: "#000000" }}>
                {t.related}
              </Typography>

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 4 }}>
                {relatedProducts.map((p) => {
                  const rTitle = lang === "ar" ? p.titleAr : p.title;
                  const rCategory = lang === "ar" ? p.categoryAr : p.category;

                  return (
                    <Link 
                      key={p.id}
                      href={`/${lang}/product/${p.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Box
                        sx={{
                          bgcolor: "#ffffff",
                          border: "1px solid rgba(0,0,0,0.04)",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                          position: "relative",
                          overflow: "hidden",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(135deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 70%)",
                            transform: "translateX(-110%) translateY(110%) skewX(-15deg)",
                            transition: "transform 1s cubic-bezier(0.25, 1, 0.5, 1)",
                            pointerEvents: "none",
                            zIndex: 3
                          },
                          "&:hover::after": {
                            transform: "translateX(110%) translateY(-110%) skewX(-15deg)"
                          },
                          "&:hover": {
                            transform: "translateY(-4px)"
                          }
                        }}
                      >
                        {/* Related Image frame */}
                        <Box sx={{ position: "relative", width: "100%", aspectRatio: "3 / 4", overflow: "hidden" }}>
                          <Box 
                            component="img"
                            src={p.imageUrl}
                            alt={rTitle}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              transition: "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
                              "&:hover": {
                                transform: "scale(1.04)"
                              }
                            }}
                          />
                        </Box>

                        {/* Related Card Info - Below Image */}
                        <Box sx={{ p: 2, textAlign: lang === "ar" ? "right" : "left" }}>
                          <Typography 
                            sx={{ 
                              fontFamily: '"Griphorium", "Griphosium", "Graphion", "Brush Script MT", cursive',
                              fontSize: "1.2rem", 
                              color: "primary.main",
                              mb: 0.5
                            }}
                          >
                            {rCategory}
                          </Typography>
                          <Typography sx={{ color: "#000000", fontFamily: "var(--heading-font)", fontSize: 16, fontWeight: 500 }}>
                            {rTitle}
                          </Typography>
                        </Box>
                      </Box>
                    </Link>
                  );
                })}
              </Box>
            </Box>
          )}
        </Container>
        </Box>
      </Box>
    </ThemeProvider>
    {/* Shared Footer is placed OUTSIDE the product theme provider to keep styles original */}
    <SiteFooter />
    </>
  );
}
