"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { products, type Product } from "@/lib/productData";
import { getBrandById } from "@/lib/brandData";
import { Box, Container, Stack, Typography, Grid, Button, Divider, Link as MuiLink, ThemeProvider, createTheme } from "@mui/material";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";

import NorthEastIcon from "@mui/icons-material/NorthEast";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion.create(Box);

interface CategoryDetailClientProps {
  categoryId: string;
  initialLang: "en" | "ar";
  initialProducts?: Product[];
}

// Translations for category names and UI
const categoryTranslations = {
  en: {
    women: "Women",
    men: "Men",
    perfumes: "Perfumes",
    skincare: "Skincare",
    dining: "Dining",
    fashion: "Fashion",
    designers: "Designers & Brands",
    all: "All Products",
    filterTitle: "Filter by Department",
    noProducts: "No products found matching the criteria.",
    viewDetails: "View Details",
    subcategories: {
      "dresses": "Dresses",
      "abayas-kaftans": "Abayas / Kaftans",
      "tops-blouses": "Tops & Blouses",
      "t-shirts": "Women T-Shirts",
      "pants-trousers": "Pants & Trousers",
      "jeans": "Women Jeans",
      "skirts": "Skirts",
      "coords-sets": "Co-ords & Sets",
      "outerwear-women": "Outerwear Women",
      "women-activewear": "Women Activewear",
      "sleepwear-innerwear": "Sleepwear & Innerwear",
      "women-bags": "Women Bags",
      "women-accessories": "Women Accessories",
      "women-jewellery": "Women Jewellery",
      "men-formal-suits": "Men Formal Suits",
      "t-shirts-polos": "T-Shirts & Polos",
      "men-shirts": "Men Shirts",
      "men-outerwear": "Men Outerwear",
      "men-shoes": "Men Shoes",
      "innerwear-sleepwear": "Innerwear & Sleepwear",
      "men-accessories": "Men Accessories"
    }
  },
  ar: {
    women: "النساء",
    men: "الرجال",
    perfumes: "العطور",
    skincare: "العناية بالبشرة",
    dining: "المائدة والضيافة",
    fashion: "الأزياء والموضة",
    designers: "المصممين والعلامات التجارية",
    all: "جميع المنتجات",
    filterTitle: "تصفية حسب القسم",
    noProducts: "لم يتم العثور على منتجات تطابق المعايير.",
    viewDetails: "عرض التفاصيل",
    subcategories: {
      "dresses": "فساتين",
      "abayas-kaftans": "عبايات وقفاطين",
      "tops-blouses": "بلوزات وقمصان علوية",
      "t-shirts": "تي شيرت نسائي",
      "pants-trousers": "سراويل وبناطيل",
      "jeans": "جينز نسائي",
      "skirts": "تنانير",
      "coords-sets": "أطقم متطابقة",
      "outerwear-women": "ملابس خارجية نسائية",
      "women-activewear": "ملابس رياضية نسائية",
      "sleepwear-innerwear": "ملابس نوم وداخلية نسائية",
      "women-bags": "حقائب نسائية",
      "women-accessories": "إكسسوارات نسائية",
      "women-jewellery": "مجوهرات نسائية",
      "men-formal-suits": "بدل رسمية رجالية",
      "t-shirts-polos": "تي شيرت وبولو رجالي",
      "men-shirts": "قمصان رجالية",
      "men-outerwear": "ملابس خارجية رجالية",
      "men-shoes": "أحذية رجالية",
      "innerwear-sleepwear": "ملابس داخلية ونوم رجالية",
      "men-accessories": "إكسسوارات رجالية"
    }
  }
};

export default function CategoryDetailClient({ categoryId, initialLang, initialProducts }: CategoryDetailClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = initialLang;
  const activeSub = searchParams.get("sub") || "all";
  const activeBrand = searchParams.get("brand") || "all";
  const [isLangTransitioning, setIsLangTransitioning] = useState(false);

  useEffect(() => {
    setIsLangTransitioning(false);
  }, [initialLang]);

  const t = categoryTranslations[lang];

  // 1. Determine layout subcategories list
  const subcategoryList = useMemo(() => {
    if (categoryId === "women") {
      return [
        { id: "all", label: lang === "ar" ? "الكل" : "All Women" },
        { id: "dresses", label: t.subcategories["dresses"] },
        { id: "abayas-kaftans", label: t.subcategories["abayas-kaftans"] },
        { id: "tops-blouses", label: t.subcategories["tops-blouses"] },
        { id: "t-shirts", label: t.subcategories["t-shirts"] },
        { id: "pants-trousers", label: t.subcategories["pants-trousers"] },
        { id: "jeans", label: t.subcategories["jeans"] },
        { id: "skirts", label: t.subcategories["skirts"] },
        { id: "coords-sets", label: t.subcategories["coords-sets"] },
        { id: "outerwear-women", label: t.subcategories["outerwear-women"] },
        { id: "women-activewear", label: t.subcategories["women-activewear"] },
        { id: "sleepwear-innerwear", label: t.subcategories["sleepwear-innerwear"] },
        { id: "women-bags", label: t.subcategories["women-bags"] },
        { id: "women-accessories", label: t.subcategories["women-accessories"] },
        { id: "women-jewellery", label: t.subcategories["women-jewellery"] }
      ];
    } else if (categoryId === "men") {
      return [
        { id: "all", label: lang === "ar" ? "الكل" : "All Men" },
        { id: "men-formal-suits", label: t.subcategories["men-formal-suits"] },
        { id: "t-shirts-polos", label: t.subcategories["t-shirts-polos"] },
        { id: "men-shirts", label: t.subcategories["men-shirts"] },
        { id: "men-outerwear", label: t.subcategories["men-outerwear"] },
        { id: "men-shoes", label: t.subcategories["men-shoes"] },
        { id: "innerwear-sleepwear", label: t.subcategories["innerwear-sleepwear"] },
        { id: "men-accessories", label: t.subcategories["men-accessories"] }
      ];
    } else if (categoryId === "perfumes" || categoryId === "skincare" || categoryId === "designers") {
      const getBrandName = (id: string, defaultName: string) => {
        if (lang === "ar") {
          const b = getBrandById(id);
          if (b?.nameAr) return b.nameAr;
        }
        return defaultName;
      };
      return [
        { id: "all", label: lang === "ar" ? "الكل" : "All Brands" },
        { id: "adidas", label: getBrandName("adidas", "adidas") },
        { id: "calvin-klein", label: getBrandName("calvin-klein", "CALVIN KLEIN") },
        { id: "skechers", label: getBrandName("skechers", "SKECHERS") },
        { id: "maxmara", label: getBrandName("maxmara", "MaxMara") },
        { id: "editorial", label: getBrandName("editorial", "EDITORIAL") },
        { id: "paul-shark", label: getBrandName("paul-shark", "PAUL & SHARK") },
        { id: "sandro-moje", label: getBrandName("sandro-moje", "SANDRO moje") }
      ];
    } else if (categoryId === "fashion") {
      return [
        { id: "all", label: lang === "ar" ? "الكل" : "All Fashion" },
        { id: "dresses", label: t.subcategories["dresses"] },
        { id: "abayas-kaftans", label: t.subcategories["abayas-kaftans"] },
        { id: "men-formal-suits", label: t.subcategories["men-formal-suits"] },
        { id: "outerwear-women", label: t.subcategories["outerwear-women"] },
        { id: "men-outerwear", label: t.subcategories["men-outerwear"] },
        { id: "t-shirts-polos", label: t.subcategories["t-shirts-polos"] },
        { id: "men-shoes", label: t.subcategories["men-shoes"] },
        { id: "women-bags", label: t.subcategories["women-bags"] },
        { id: "women-accessories", label: t.subcategories["women-accessories"] },
        { id: "men-accessories", label: t.subcategories["men-accessories"] }
      ];
    }
    return [];
  }, [categoryId, lang, t]);

  // 2. Filter products based on active filters
  const filteredProducts = useMemo(() => {
    let list = initialProducts || products;

    if (categoryId === "women") {
      list = list.filter((p) => p.category.toLowerCase() === "women");
      if (activeSub !== "all") {
        list = list.filter((p) => p.subcategory?.toLowerCase() === activeSub.toLowerCase());
      }
    } else if (categoryId === "men") {
      list = list.filter((p) => p.category.toLowerCase() === "men");
      if (activeSub !== "all") {
        list = list.filter((p) => p.subcategory?.toLowerCase() === activeSub.toLowerCase());
      }
    } else if (categoryId === "perfumes") {
      list = list.filter((p) => p.category.toLowerCase() === "perfumes");
      if (activeBrand !== "all") {
        list = list.filter((p) => p.brandId.toLowerCase() === activeBrand.toLowerCase());
      }
    } else if (categoryId === "skincare") {
      list = list.filter((p) => p.category.toLowerCase() === "skincare");
      if (activeBrand !== "all") {
        list = list.filter((p) => p.brandId.toLowerCase() === activeBrand.toLowerCase());
      }
    } else if (categoryId === "dining") {
      list = list.filter((p) => p.category.toLowerCase() === "dining");
    } else if (categoryId === "fashion") {
      list = list.filter((p) => p.category.toLowerCase() === "women" || p.category.toLowerCase() === "men");
      if (activeSub !== "all") {
        list = list.filter((p) => p.subcategory?.toLowerCase() === activeSub.toLowerCase());
      }
    } else if (categoryId === "designers") {
      if (activeBrand !== "all") {
        list = list.filter((p) => p.brandId.toLowerCase() === activeBrand.toLowerCase());
      }
    }

    return list;
  }, [categoryId, activeSub, activeBrand]);

  const selectFilter = (filterId: string) => {
    const isBrand = ["perfumes", "skincare", "designers"].includes(categoryId);
    const paramName = isBrand ? "brand" : "sub";
    
    if (filterId === "all") {
      router.push(`/category/${categoryId}/${lang}`);
    } else {
      router.push(`/category/${categoryId}/${lang}?${paramName}=${filterId}`);
    }
  };

  const pageTitle = (typeof t[categoryId as keyof typeof t] === "string" ? t[categoryId as keyof typeof t] : categoryId) as string;

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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "#fbfaf8", color: "#111111", minHeight: "100vh", display: "flex", flexDirection: "column" }} dir={lang === "ar" ? "rtl" : "ltr"}>

      
      <Box sx={{ flexGrow: 1, py: { xs: 6, md: 10 }, opacity: isLangTransitioning ? 0 : 1, transition: "opacity 0.25s ease" }}>
        <Container maxWidth="xl">
          {/* Header Title Section */}
          <Stack spacing={2} sx={{ mb: 6, textAlign: lang === "ar" ? "right" : "left" }}>
            <Typography sx={{ color: "#CB6116", textTransform: "uppercase", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", fontFamily: '"Cairo", sans-serif' }}>
              {lang === "ar" ? "فاشن جيت مول" : "Fashion Gate Mall"}
            </Typography>
            <Typography variant="h3" sx={{ fontFamily: "var(--heading-font)", fontWeight: 500, color: "#111111" }}>
              {pageTitle}
            </Typography>
            <Divider sx={{ borderColor: "rgba(0,0,0,0.06)", mt: 2 }} />
          </Stack>

          <Grid container spacing={4}>
            {/* Sidebar Filter Panel */}
            {subcategoryList.length > 0 && (
              <Grid size={{ xs: 12, md: 3 }} sx={{ borderRight: lang === "en" ? "1px solid rgba(0,0,0,0.06)" : "none", borderLeft: lang === "ar" ? "1px solid rgba(0,0,0,0.06)" : "none", px: 2 }}>
                <Typography sx={{ color: "#111111", fontSize: 12, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", mb: 3, textAlign: lang === "ar" ? "right" : "left", fontFamily: '"Cairo", sans-serif' }}>
                  {t.filterTitle}
                </Typography>
                
                <Stack spacing={1} alignItems="flex-start" sx={{ textAlign: lang === "ar" ? "right" : "left", width: "100%" }}>
                  {subcategoryList.map((item) => {
                    const isBrandFilter = ["perfumes", "skincare", "designers"].includes(categoryId);
                    const currentFilterVal = isBrandFilter ? activeBrand : activeSub;
                    const isSelected = currentFilterVal === item.id;
                    
                    return (
                      <Button
                        key={item.id}
                        onClick={() => selectFilter(item.id)}
                        sx={{
                          color: isSelected ? "#CB6116" : "rgba(0,0,0,0.6)",
                          fontWeight: isSelected ? 700 : 500,
                          fontSize: 13.5,
                          py: 0.8,
                          px: 1.5,
                          width: "100%",
                          justifyContent: lang === "ar" ? "flex-start" : "flex-start",
                          textAlign: lang === "ar" ? "right" : "left",
                          borderRadius: 0,
                          fontFamily: '"Cairo", sans-serif',
                          bgcolor: isSelected ? "rgba(203, 97, 22, 0.05)" : "transparent",
                          "&:hover": {
                            bgcolor: "rgba(0,0,0,0.03)",
                            color: "#CB6116"
                          }
                        }}
                      >
                        {item.label}
                      </Button>
                    );
                  })}
                </Stack>
              </Grid>
            )}

            {/* Products Grid Panel */}
            <Grid size={{ xs: 12, md: subcategoryList.length > 0 ? 9 : 12 }}>
              <AnimatePresence mode="wait">
                <MotionBox
                  key={`${activeSub}-${activeBrand}-${categoryId}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <Box sx={{ py: 12, textAlign: "center", border: "1px dashed rgba(0,0,0,0.06)", bgcolor: "rgba(0,0,0,0.01)" }}>
                    <Typography sx={{ color: "rgba(0,0,0,0.48)", fontSize: 15, fontWeight: 500, fontFamily: '"Cairo", sans-serif' }}>
                      {lang === "ar" ? "لا يوجد المزيد من المنتجات" : "No more products"}
                    </Typography>
                  </Box>
                </MotionBox>
              </AnimatePresence>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      </Box>
    </ThemeProvider>
  );
}
