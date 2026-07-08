"use client";

import { useEffect, useState, useTransition } from "react";
import { Box, Button, Container, Stack, Typography, CircularProgress } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Brand } from "@/lib/brandData";
import { getProductsByBrandId, Product } from "@/lib/productData";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const MotionBox = motion.create(Box);

const brandVectorLogos: Record<string, React.ReactNode> = {
  chanel: (
    <svg width="240" height="50" viewBox="0 0 120 30" fill="currentColor">
      <text x="50%" y="22" fontFamily="'Futura', 'Helvetica Neue', 'Arial', sans-serif" fontSize="22" fontWeight="bold" letterSpacing="0.35em" textAnchor="middle">CHANEL</text>
    </svg>
  ),
  prada: (
    <svg width="240" height="50" viewBox="0 0 120 30" fill="currentColor">
      <text x="50%" y="22" fontFamily="'Engravers MT', 'Copperplate', 'Times New Roman', serif" fontSize="16" fontWeight="900" letterSpacing="0.18em" textAnchor="middle">PRADA</text>
    </svg>
  ),
  gucci: (
    <svg width="240" height="50" viewBox="0 0 120 30" fill="currentColor">
      <text x="50%" y="22" fontFamily="'Granjon', 'Garamond', serif" fontSize="22" fontWeight="bold" letterSpacing="0.25em" textAnchor="middle">GUCCI</text>
    </svg>
  ),
  dior: (
    <svg width="180" height="50" viewBox="0 0 100 30" fill="currentColor">
      <text x="50%" y="22" fontFamily="'Playfair Display', 'Didot', 'Bodoni MT', serif" fontSize="22" fontWeight="700" letterSpacing="0.2em" textAnchor="middle">Dior</text>
    </svg>
  ),
  ysl: (
    <svg width="280" height="50" viewBox="0 0 160 30" fill="currentColor">
      <text x="50%" y="21" fontFamily="'Cinzel', 'Times New Roman', serif" fontSize="12" fontWeight="600" letterSpacing="0.3em" textAnchor="middle">YVES SAINT LAURENT</text>
    </svg>
  ),
  hermes: (
    <svg width="240" height="50" viewBox="0 0 120 30" fill="currentColor">
      <text x="50%" y="21" fontFamily="'Rockwell', 'Courier New', serif" fontSize="15" fontWeight="bold" letterSpacing="0.25em" textAnchor="middle">HERMÈS</text>
    </svg>
  ),
  adidas: (
    <svg width="80" height="50" viewBox="0 0 60 40" fill="currentColor">
      <path d="M 15 32 L 20 32 L 35 8 L 30 8 Z" />
      <path d="M 25 32 L 30 32 L 45 8 L 40 8 Z" />
      <path d="M 35 32 L 40 32 L 55 8 L 50 8 Z" />
    </svg>
  )
};

export default function BrandDetailClient({ 
  brand, 
  initialLang 
}: { 
  brand: Brand; 
  initialLang: "ar" | "en"; 
}) {
  const router = useRouter();
  const [lang, setLang] = useState<"en" | "ar">(initialLang);
  const [isPending, startTransition] = useTransition();
  const [isNavigating, setIsNavigating] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const brandProducts = getProductsByBrandId(brand.id);

  // Available categories for tabs (only show tabs if brand has products in that category)
  const categoriesInBrand = ["all", ...Array.from(new Set(brandProducts.map(p => p.category.toLowerCase())))];

  const filteredProducts = activeTab === "all" 
    ? brandProducts 
    : brandProducts.filter(p => p.category.toLowerCase() === activeTab);

  const t = {
    en: {
      showcase: "Official Brand Salon",
      exploreCollection: "Explore Collection",
      back: "Back",
      all: "All Departments",
      women: "Women",
      men: "Men",
      beauty: "Beauty",
      "home & deco": "Home & Deco",
      noProducts: "No products found in this category.",
      authorizedPartner: "Authorized Fashion Gate Partner",
      loading: "Opening details..."
    },
    ar: {
      showcase: "صالون العلامة التجارية المعتمد",
      exploreCollection: "استكشف المجموعة",
      back: "رجوع",
      all: "جميع الأقسام",
      women: "النساء",
      men: "الرجال",
      beauty: "الجمال",
      "home & deco": "المنزل والديكور",
      noProducts: "لا توجد منتجات في هذا القسم حالياً.",
      authorizedPartner: "شريك بوابة الأزياء المعتمد",
      loading: "جاري فتح التفاصيل..."
    }
  }[lang];

  // Force scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLangToggle = (newLang: "en" | "ar") => {
    setLang(newLang);
    router.replace(`/${newLang}/brand/${brand.id}`);
  };

  const handleProductClick = (productId: string) => {
    setIsNavigating(true);
    router.push(`/${lang}/product/${productId}`);
  };

  const handleBackClick = () => {
    setIsNavigating(true);
    router.push(`/${lang}`);
  };

  return (
    <Box 
      dir={lang === "ar" ? "rtl" : "ltr"} 
      sx={{ 
        bgcolor: "#FAF8F5", 
        color: "#111111", 
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: lang === "ar" ? '"Cairo", sans-serif' : '"Inter", sans-serif'
      }}
    >
      {/* Global Navigation Loading Screen Overlay */}
      <AnimatePresence>
        {(isPending || isNavigating) && (
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: "rgba(10, 10, 10, 0.95)",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              gap: 3
            }}
          >
            <CircularProgress color="inherit" size={48} thickness={2} />
            <Typography sx={{ letterSpacing: "0.15em", textTransform: "uppercase", fontSize: 13, fontWeight: 500, fontFamily: 'var(--heading-font)' }}>
              {t.loading}
            </Typography>
          </Box>
        )}
      </AnimatePresence>

      {/* Shared Reusable Header */}
      <SiteHeader 
        settings={{ title: "Fashion Gate" }} 
        onLangToggleStart={() => startTransition(() => handleLangToggle(lang === "en" ? "ar" : "en"))} 
      />

      {/* Brand Hero Panel */}
      <Box
        sx={{
          position: "relative",
          bgcolor: "#111111",
          color: "#ffffff",
          py: { xs: 12, md: 18 },
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `linear-gradient(rgba(17,17,17,0.85), rgba(17,17,17,0.92)), url(${brand.backdropUrl})`,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          textAlign: "center"
        }}
      >
        <Container maxWidth="md">
          {/* Back Navigation Button */}
          <Button
            onClick={handleBackClick}
            startIcon={lang === "en" && <ArrowBackIcon />}
            endIcon={lang === "ar" && <ArrowBackIcon sx={{ transform: "scaleX(-1)" }} />}
            sx={{
              position: "absolute",
              top: { xs: 20, md: 40 },
              [lang === "ar" ? "right" : "left"]: { xs: 20, md: 40 },
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 0,
              px: 2.5,
              py: 0.8,
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: '"Cairo", sans-serif',
              "&:hover": {
                border: "1px solid #ffffff",
                bgcolor: "rgba(255,255,255,0.05)"
              }
            }}
          >
            {t.back}
          </Button>

          <Stack spacing={4} alignItems="center">
            {/* Elegant SVG Logo representation */}
            <Box 
              sx={{ 
                color: "#ffffff", 
                opacity: 0.95,
                transform: "scale(1.1)",
                mb: 1
              }}
            >
              {brandVectorLogos[brand.id] || (
                <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: 36, fontWeight: 700, letterSpacing: "0.1em" }}>
                  {lang === "ar" ? brand.nameAr : brand.name}
                </Typography>
              )}
            </Box>

            {/* Sub-Header Headline */}
            <Typography 
              sx={{ 
                fontFamily: "var(--heading-font)", 
                fontSize: { xs: 24, md: 36 }, 
                fontWeight: 400, 
                maxWidth: 720, 
                lineHeight: 1.25,
                color: "primary.main"
              }}
            >
              {lang === "ar" ? brand.headlineAr : brand.headline}
            </Typography>

            {/* Editorial Biography Text */}
            <Typography 
              sx={{ 
                fontSize: 14.5, 
                lineHeight: 1.8, 
                color: "rgba(255,255,255,0.72)", 
                maxWidth: 680,
                fontFamily: '"Cairo", sans-serif'
              }}
            >
              {lang === "ar" ? brand.descriptionAr : brand.description}
            </Typography>

            <Box 
              sx={{ 
                fontSize: 10, 
                textTransform: "uppercase", 
                letterSpacing: "0.2em", 
                color: "rgba(255,255,255,0.4)",
                border: "1px solid rgba(255,255,255,0.15)",
                px: 2,
                py: 0.5,
                fontFamily: '"Cairo", sans-serif'
              }}
            >
              {t.authorizedPartner}
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Catalog Grid Section */}
      <Box sx={{ py: { xs: 10, md: 14 }, flexGrow: 1 }}>
        <Container maxWidth="xl">
          <Stack spacing={{ xs: 6, md: 8 }}>
            
            {/* Category Filter Tabs */}
            {categoriesInBrand.length > 2 && (
              <Stack 
                direction="row" 
                spacing={{ xs: 1, sm: 2.5 }} 
                justifyContent="center" 
                flexWrap="wrap" 
                useFlexGap
                sx={{ borderBottom: "1px solid rgba(0,0,0,0.06)", pb: 2 }}
              >
                {categoriesInBrand.map((catKey) => {
                  const isSelected = activeTab === catKey;
                  const labelT = t[catKey as keyof typeof t] || catKey;
                  return (
                    <Button
                      key={catKey}
                      onClick={() => setActiveTab(catKey)}
                      sx={{
                        color: isSelected ? "primary.main" : "rgba(0,0,0,0.48)",
                        fontSize: { xs: 14, sm: 16 },
                        fontWeight: isSelected ? 700 : 500,
                        fontFamily: "var(--heading-font)",
                        px: 2.5,
                        py: 0.8,
                        borderRadius: 0,
                        borderBottom: isSelected ? "2px solid" : "none",
                        borderColor: "primary.main",
                        textTransform: "capitalize",
                        "&:hover": {
                          color: "primary.main",
                          bgcolor: "transparent"
                        }
                      }}
                    >
                      {labelT}
                    </Button>
                  );
                })}
              </Stack>
            )}

            {/* Brand Catalog List */}
            {filteredProducts.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography sx={{ color: "rgba(0,0,0,0.48)", fontSize: 15, fontFamily: '"Cairo", sans-serif' }}>
                  {t.noProducts}
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, gap: { xs: 3, md: 4 } }}>
                {filteredProducts.map((product) => (
                  <Box key={product.id} sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    <Box
                      onClick={() => handleProductClick(product.id)}
                      sx={{
                        bgcolor: "#ffffff",
                        border: "1px solid rgba(0,0,0,0.05)",
                        cursor: "pointer",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                        "&:hover": {
                          transform: "translateY(-6px)",
                          boxShadow: "0 15px 40px rgba(0,0,0,0.03)",
                          borderColor: "rgba(0,0,0,0.12)"
                        }
                      }}
                    >
                      {/* Product Card Image Container */}
                      <Box sx={{ overflow: "hidden", position: "relative", pt: "100%", bgcolor: "#FAF8F5" }}>
                        <Box
                          component="img"
                          src={product.imageUrl}
                          alt={lang === "ar" ? product.titleAr : product.title}
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
                            "&:hover": {
                              transform: "scale(1.05)"
                            }
                          }}
                        />
                      </Box>

                      {/* Product Info Block */}
                      <Stack spacing={1.5} sx={{ p: { xs: 3, md: 4 }, flexGrow: 1, justifyContent: "space-between" }}>
                        <Stack spacing={1}>
                          <Typography sx={{ color: "primary.main", textTransform: "uppercase", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", fontFamily: '"Cairo", sans-serif' }}>
                            {lang === "ar" ? product.categoryAr : product.category}
                          </Typography>
                          <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 20, md: 22 }, fontWeight: 500, color: "#111111", lineHeight: 1.25 }}>
                            {lang === "ar" ? product.titleAr : product.title}
                          </Typography>
                          <Typography sx={{ color: "rgba(0,0,0,0.54)", fontSize: 13, lineHeight: 1.5, fontFamily: '"Cairo", sans-serif' }}>
                            {lang === "ar" ? product.sloganAr : product.slogan}
                          </Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={1} sx={{ pt: 1.5, borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                          <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#111111", fontFamily: '"Cairo", sans-serif' }}>
                            {t.exploreCollection}
                          </Typography>
                          <NorthEastIcon sx={{ fontSize: 14, color: "primary.main" }} />
                        </Stack>
                      </Stack>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}

          </Stack>
        </Container>
      </Box>

      {/* Shared Reusable Footer */}
      <SiteFooter />
    </Box>
  );
}
