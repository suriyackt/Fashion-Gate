"use client";

import { useEffect, useState } from "react";
import { Box, Button, Container, Stack, Typography, ThemeProvider, createTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Brand } from "@/lib/brandData";
import { getProductsByBrandId } from "@/lib/productData";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const theme = createTheme({
  palette: {
    primary: { main: "#CB6116" },
    secondary: { main: "#111111" }
  }
});

const brandVectorLogos: Record<string, React.ReactNode> = {
  chanel: (
    <svg width="340" height="70" viewBox="0 0 120 30" fill="currentColor">
      <text x="50%" y="22" fontFamily="'Futura', 'Helvetica Neue', 'Arial', sans-serif" fontSize="22" fontWeight="bold" letterSpacing="0.35em" textAnchor="middle">CHANEL</text>
    </svg>
  ),
  prada: (
    <svg width="340" height="70" viewBox="0 0 120 30" fill="currentColor">
      <text x="50%" y="22" fontFamily="'Engravers MT', 'Copperplate', 'Times New Roman', serif" fontSize="16" fontWeight="900" letterSpacing="0.18em" textAnchor="middle">PRADA</text>
    </svg>
  ),
  gucci: (
    <svg width="340" height="70" viewBox="0 0 120 30" fill="currentColor">
      <text x="50%" y="22" fontFamily="'Granjon', 'Garamond', serif" fontSize="22" fontWeight="bold" letterSpacing="0.25em" textAnchor="middle">GUCCI</text>
    </svg>
  ),
  dior: (
    <svg width="260" height="70" viewBox="0 0 100 30" fill="currentColor">
      <text x="50%" y="22" fontFamily="'Playfair Display', 'Didot', 'Bodoni MT', serif" fontSize="22" fontWeight="700" letterSpacing="0.2em" textAnchor="middle">Dior</text>
    </svg>
  ),
  ysl: (
    <svg width="390" height="70" viewBox="0 0 160 30" fill="currentColor">
      <text x="50%" y="21" fontFamily="'Cinzel', 'Times New Roman', serif" fontSize="12" fontWeight="600" letterSpacing="0.3em" textAnchor="middle">YVES SAINT LAURENT</text>
    </svg>
  ),
  hermes: (
    <svg width="340" height="70" viewBox="0 0 120 30" fill="currentColor">
      <text x="50%" y="21" fontFamily="'Rockwell', 'Courier New', serif" fontSize="15" fontWeight="bold" letterSpacing="0.25em" textAnchor="middle">HERMÈS</text>
    </svg>
  ),
  adidas: (
    <svg width="120" height="75" viewBox="0 0 60 40" fill="currentColor">
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
  const [activeTab, setActiveTab] = useState("all");

  const brandProducts = getProductsByBrandId(brand.id);

  // Available categories in the brand's catalog
  const rawCategories = Array.from(new Set(brandProducts.map(p => p.category.toLowerCase())));
  const categoriesInBrand = ["all", ...rawCategories];

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
      authorizedPartner: "Authorized Partner"
    },
    ar: {
      showcase: "صالون العلامة المعتمد",
      exploreCollection: "استكشف المجموعة",
      back: "رجوع",
      all: "جميع الأقسام",
      women: "النساء",
      men: "الرجال",
      beauty: "الجمال",
      "home & deco": "المنزل والديكور",
      noProducts: "لا توجد منتجات في هذا القسم حالياً.",
      authorizedPartner: "شريك معتمد"
    }
  }[lang];

  // Scroll to top on mount (deferred to let Lenis update cleanly)
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleLangToggle = (newLang: "en" | "ar") => {
    setLang(newLang);
    router.replace(`/${newLang}/brand/${brand.id}`);
  };

  return (
    <ThemeProvider theme={theme}>
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
      {/* Reusable Header (handles global transition loaders automatically) */}
      <SiteHeader 
        settings={{ title: "Fashion Gate" }} 
        onLangToggleStart={() => handleLangToggle(lang === "en" ? "ar" : "en")} 
      />

      {/* Brand Hero Panel (Strictly Orange, Black, White, and Grey palette) */}
      <Box
        sx={{
          position: "relative",
          bgcolor: "#000000",
          color: "#ffffff",
          py: { xs: 10, md: 15 },
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.95)), url(${brand.backdropUrl})`,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          textAlign: "center"
        }}
      >
        <Container maxWidth="md">
          {/* Back Navigation Button */}
          <Button
            component={Link}
            href={`/${lang}`}
            startIcon={lang === "en" && <ArrowBackIcon />}
            endIcon={lang === "ar" && <ArrowBackIcon sx={{ transform: "scaleX(-1)" }} />}
            sx={{
              position: "absolute",
              top: { xs: 20, md: 35 },
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

          <Stack spacing={3.5} alignItems="center">
            {/* Centered official SVG logo representation */}
            <Box sx={{ color: "#ffffff", transform: "scale(1.05)", mb: 1 }}>
              {brandVectorLogos[brand.id] || (
                <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: 32, fontWeight: 700, letterSpacing: "0.1em" }}>
                  {lang === "ar" ? brand.nameAr : brand.name}
                </Typography>
              )}
            </Box>

            {/* Localized Brand Headline */}
            <Typography 
              sx={{ 
                fontFamily: "var(--heading-font)", 
                fontSize: { xs: 22, md: 32 }, 
                fontWeight: 400, 
                maxWidth: 720, 
                lineHeight: 1.25,
                color: "#CB6116" // brand orange
              }}
            >
              {lang === "ar" ? brand.headlineAr : brand.headline}
            </Typography>

            {/* Localized Narrative Biography */}
            <Typography 
              sx={{ 
                fontSize: 14, 
                lineHeight: 1.8, 
                color: "rgba(255,255,255,0.72)", 
                maxWidth: 680,
                fontFamily: '"Cairo", sans-serif'
              }}
            >
              {lang === "ar" ? brand.descriptionAr : brand.description}
            </Typography>

            {/* Verification Badge */}
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

      {/* Split Left-Side Tab Catalog Grid Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, flexGrow: 1 }}>
        <Container maxWidth="xl">
          <Box 
            sx={{ 
              display: "flex", 
              flexDirection: { xs: "column", md: lang === "ar" ? "row-reverse" : "row" }, 
              gap: { xs: 6, md: 8 },
              alignItems: "flex-start" 
            }}
          >
            {/* Left-Side Vertical Navigation Tab List */}
            {categoriesInBrand.length > 2 && (
              <Box 
                sx={{ 
                  width: { xs: "100%", md: 240 }, 
                  flexShrink: 0,
                  textAlign: lang === "ar" ? "right" : "left"
                }}
              >
                <Stack 
                  direction={{ xs: "row", md: "column" }} 
                  spacing={{ xs: 1, md: 1.5 }} 
                  flexWrap="wrap" 
                  useFlexGap
                  sx={{ 
                    borderBottom: { xs: "1px solid rgba(0,0,0,0.06)", md: "none" },
                    [lang === "ar" ? "borderLeft" : "borderRight"]: { xs: "none", md: "1px solid rgba(0,0,0,0.06)" },
                    pb: { xs: 2, md: 0 },
                    pr: { xs: 0, md: lang === "ar" ? 0 : 3.5 },
                    pl: { xs: 0, md: lang === "ar" ? 3.5 : 0 }
                  }}
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
                          justifyContent: { xs: "center", md: lang === "ar" ? "flex-end" : "flex-start" },
                          textAlign: { xs: "center", md: lang === "ar" ? "right" : "left" },
                          px: 2,
                          py: 1,
                          borderRadius: 0,
                          borderBottom: { xs: isSelected ? "2px solid" : "none", md: "none" },
                          borderLeft: { xs: "none", md: (lang === "ar" && isSelected) ? "2px solid" : "none" },
                          borderRight: { xs: "none", md: (lang === "en" && isSelected) ? "2px solid" : "none" },
                          borderColor: "primary.main",
                          textTransform: "capitalize",
                          width: "100%",
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
              </Box>
            )}

            {/* Right-Side Product Catalog Grid */}
            <Box sx={{ flexGrow: 1, width: "100%" }}>
              {filteredProducts.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 8 }}>
                  <Typography sx={{ color: "rgba(0,0,0,0.48)", fontSize: 15, fontFamily: '"Cairo", sans-serif' }}>
                    {t.noProducts}
                  </Typography>
                </Box>
              ) : (
                <Box 
                  sx={{ 
                    display: "grid", 
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, 
                    gap: { xs: 3, md: 4 } 
                  }}
                >
                  {filteredProducts.map((product) => (
                    <Box key={product.id} sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                      <Link
                        href={`/${lang}/product/${product.id}`}
                        style={{ textDecoration: "none", display: "flex", flexDirection: "column", height: "100%" }}
                      >
                        <Box
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
                              boxShadow: "0 15px 40px rgba(0,0,0,0.02)",
                              borderColor: "rgba(0,0,0,0.1)"
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
                                  transform: "scale(1.04)"
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
                              <NorthEastIcon sx={{ fontSize: 13, color: "primary.main" }} />
                            </Stack>
                          </Stack>
                        </Box>
                      </Link>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Shared Footer */}
      <SiteFooter />
    </Box>
    </ThemeProvider>
  );
}
