"use client";

import { useEffect, useState } from "react";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { products } from "@/lib/productData";
import { shopCategories } from "../Storefront";

export default function CategoryProductSections({ 
  t, 
  lang 
}: { 
  t: (s?: string) => string; 
  lang: "ar" | "en"; 
}) {
  const [activeTab, setActiveTab] = useState("women");

  const curCategory = shopCategories.find((cat) => cat.id === activeTab) || shopCategories[0];
  const categoryProducts = curCategory.productIds
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);

  // Sync programmatic events with active tab and scroll to categories section
  useEffect(() => {
    const handleCategorySelect = (e: Event) => {
      const customEvent = e as CustomEvent<{ category: string }>;
      const cat = customEvent.detail?.category;
      if (["women", "men", "beauty", "home-deco"].includes(cat)) {
        setActiveTab(cat);
        const el = document.getElementById("curated-departments");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    // Check sessionStorage on mount (for redirects from other pages)
    if (typeof window !== "undefined") {
      const pendingCat = sessionStorage.getItem("pendingCategory");
      if (pendingCat) {
        sessionStorage.removeItem("pendingCategory");
        setActiveTab(pendingCat);
        setTimeout(() => {
          const el = document.getElementById("curated-departments");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 150);
      }
      
      const pendingSection = sessionStorage.getItem("pendingSection");
      if (pendingSection) {
        sessionStorage.removeItem("pendingSection");
        setTimeout(() => {
          const el = document.getElementById(pendingSection);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 150);
      }
    }

    window.addEventListener("select-category", handleCategorySelect);
    return () => window.removeEventListener("select-category", handleCategorySelect);
  }, []);

  return (
    <Box 
      component="section" 
      id="curated-departments" 
      sx={{ 
        bgcolor: "#ffffff", 
        color: "#111111", 
        py: { xs: 10, md: 14 }, 
        scrollMarginTop: { xs: 80, md: 100 } 
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={{ xs: 6, md: 8 }}>
          
          {/* Aligned Editorial Section Header */}
          <Stack spacing={2} sx={{ textAlign: lang === "ar" ? "right" : "left", alignItems: lang === "ar" ? "flex-end" : "flex-start", maxWidth: 820, px: 2 }}>
            <Typography sx={{ color: "primary.main", textTransform: "uppercase", fontSize: 11, fontWeight: 800, letterSpacing: "0.24em" }}>
              {lang === "ar" ? "بوليفارد بوابة الأزياء" : "Fashion Gate Curations"}
            </Typography>
            <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 34, md: 54 }, fontWeight: 500, lineHeight: 1.1 }}>
              {lang === "ar" ? "أقسام منسقة بعناية" : "Curated category paths"}
            </Typography>
            <Typography sx={{ color: "rgba(0,0,0,0.6)", fontSize: 14.5, lineHeight: 1.8 }}>
              {lang === "ar" 
                ? "تنقل بين أقسام البوتيك الفاخرة مباشرة. يتم ترتيب كل مجموعة لإبراز التفاصيل الحرفية والتصاميم المحددة."
                : "Explore curated seasonal edits directly. Each department is logically arranged to present detailed designer updates and structured silhouettes."}
            </Typography>
          </Stack>

          {/* Aligned Tab Switcher */}
          <Stack 
            direction="row" 
            spacing={{ xs: 1.5, sm: 3.5 }} 
            justifyContent={lang === "ar" ? "flex-end" : "flex-start"} 
            flexWrap="wrap" 
            useFlexGap
            sx={{ borderBottom: "1px solid rgba(0,0,0,0.06)", pb: 2 }}
          >
            {shopCategories.map((category) => {
              const isSelected = activeTab === category.id;
              return (
                <Button
                  key={category.id}
                  onClick={() => {
                    setActiveTab(category.id);
                    if (typeof window !== "undefined") {
                      window.history.pushState(null, "", `#${category.id}`);
                    }
                  }}
                  sx={{
                    color: isSelected ? "primary.main" : "rgba(0,0,0,0.48)",
                    fontSize: { xs: 15, sm: 18 },
                    fontWeight: isSelected ? 700 : 500,
                    fontFamily: "var(--heading-font)",
                    px: { xs: 1.5, sm: 2.5 },
                    py: 1,
                    borderRadius: 0,
                    textTransform: "none",
                    position: "relative",
                    transition: "color 0.3s ease",
                    "&::after": isSelected ? {
                      content: '""',
                      position: "absolute",
                      bottom: -17,
                      left: 0,
                      right: 0,
                      height: 2,
                      bgcolor: "primary.main",
                    } : {}
                  }}
                >
                  {t(category.label)}
                </Button>
              );
            })}
          </Stack>

          {/* Active Tab Lead Description */}
          <Stack 
            spacing={1} 
            sx={{ 
              textAlign: lang === "ar" ? "right" : "left", 
              alignItems: lang === "ar" ? "flex-end" : "flex-start", 
              maxWidth: 720, 
              pt: 1,
              pb: 2
            }}
          >
            <Typography sx={{ color: "primary.main", fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" }}>
              {curCategory.eyebrow}
            </Typography>
            <Typography sx={{ color: "rgba(0,0,0,0.58)", fontSize: 14, lineHeight: 1.7, fontStyle: "italic" }}>
              {curCategory.description}
            </Typography>
          </Stack>

          {/* Symmetrical 4-Column Product Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Box 
                sx={{ 
                  display: "grid", 
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" }, 
                  gap: 3.5, 
                  alignItems: "start" 
                }}
              >
                {categoryProducts.map((product) => {
                  if (!product) return null;
                  const title = lang === "ar" ? product.titleAr : product.title;
                  const productCategory = lang === "ar" ? product.categoryAr : product.category;

                  return (
                    <Link
                      key={`${activeTab}-${product.id}`}
                      href={`/product/${product.id}/${lang}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                          "&:hover": {
                            transform: "translateY(-6px)"
                          },
                          "&:hover .category-product-image": {
                            transform: "scale(1.03)"
                          }
                        }}
                      >
                        {/* Clean Borderless Image Box */}
                        <Box 
                          sx={{ 
                            aspectRatio: "3 / 4", 
                            overflow: "hidden", 
                            bgcolor: "#FAF8F5",
                            position: "relative",
                            border: "1px solid rgba(0,0,0,0.03)"
                          }}
                        >
                          <Box
                            component="img"
                            className="category-product-image"
                            src={product.imageUrl}
                            alt={title}
                            sx={{ 
                              width: "100%", 
                              height: "100%", 
                              objectFit: "cover", 
                              transition: "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)" 
                            }}
                          />
                        </Box>

                        {/* Typography & Actions */}
                        <Stack spacing={0.8} sx={{ pt: 2, textAlign: lang === "ar" ? "right" : "left" }}>
                          <Typography sx={{ color: "primary.main", fontSize: 9, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                            {productCategory}
                          </Typography>
                          <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: 19, lineHeight: 1.15, fontWeight: 500 }}>
                            {title}
                          </Typography>
                          <Typography
                            sx={{
                              color: "rgba(0,0,0,0.52)",
                              fontSize: 13,
                              lineHeight: 1.5,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden"
                            }}
                          >
                            {lang === "ar" ? product.descriptionAr : product.description}
                          </Typography>
                          <Stack direction="row" spacing={0.8} alignItems="center" sx={{ color: "#111111", pt: 0.5 }}>
                            <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em" }}>
                              {lang === "ar" ? "عرض التفاصيل" : "View details"}
                            </Typography>
                            <NorthEastIcon sx={{ fontSize: 12, color: "primary.main", transform: lang === "ar" ? "scaleX(-1)" : "none" }} />
                          </Stack>
                        </Stack>
                      </Box>
                    </Link>
                  );
                })}
              </Box>
            </motion.div>
          </AnimatePresence>
        </Stack>
      </Container>
    </Box>
  );
}
