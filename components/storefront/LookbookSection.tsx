"use client";

import { useMemo } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { products } from "@/lib/productData";
import type { Section } from "@/lib/types";

export default function LookbookSection({ 
  section, 
  t, 
  lang 
}: { 
  section: Section; 
  t: (s?: string) => string; 
  lang: "ar" | "en"; 
}) {
  const marqueeProducts = useMemo(() => [...products, ...products], []);

  return (
    <Box id={section.anchor} component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: "#080808", overflow: "hidden", color: "#fff" }}>
      <Container maxWidth="xl">
        <Box 
          sx={{ 
            display: "flex", 
            flexDirection: { xs: "column", md: "row" }, 
            justifyContent: "space-between", 
            alignItems: { xs: "flex-start", md: "flex-end" }, 
            gap: 4, 
            mb: 8,
            textAlign: lang === "ar" ? "right" : "left"
          }}
        >
          <Box sx={{ maxWidth: 720 }}>
            <Typography sx={{ color: "primary.main", textTransform: "uppercase", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif', mb: 2 }}>
              {t("Curated Pieces")}
            </Typography>
            <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 36, sm: 48, md: 62 }, fontWeight: 500, lineHeight: 1.1, color: "#ffffff" }}>
              {lang === "ar" ? (
                <>
                  قطع <Box component="span" sx={{ fontFamily: '"Griphorium", "Griphosium", "Graphion", "Brush Script MT", cursive', color: "primary.main", fontStyle: "italic", mx: 1 }}>حصرية</Box> مصممة بعناية
                </>
              ) : (
                <>
                  Curated <Box component="span" sx={{ fontFamily: '"Griphorium", "Griphosium", "Graphion", "Brush Script MT", cursive', color: "primary.main", fontStyle: "italic", mx: 1 }}>Designer</Box> Masterpieces
                </>
              )}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 3.5, alignItems: "center", maxWidth: 580 }}>
            <Box 
              component="img"
              src="/assets/bagdark.png"
              alt="Fashion Gate Boulevard Carrier Bag"
              sx={{ 
                width: { xs: 90, md: 110 }, 
                height: "auto", 
                objectFit: "contain",
                filter: "drop-shadow(0px 8px 24px rgba(255,255,255,0.03))",
                animation: "float-bag-dark 6s ease-in-out infinite",
                "@keyframes float-bag-dark": {
                  "0%": { transform: "translateY(0px) rotate(0deg)" },
                  "50%": { transform: "translateY(-8px) rotate(1.5deg)" },
                  "100%": { transform: "translateY(0px) rotate(0deg)" }
                }
              }}
            />
            <Typography sx={{ color: "rgba(255,255,255,.62)", fontSize: 15, lineHeight: 1.7, fontFamily: '"Cairo", sans-serif', maxWidth: 440 }}>
              {t("Explore a singular gallery of signature items, where architectural geometry meets tactile luxury from Damascus to the world.")}
            </Typography>
          </Box>
        </Box>

        <Box 
          sx={{ 
            overflow: "hidden", 
            width: "100%", 
            py: 2,
            position: "relative",
            direction: "ltr",
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              top: 0,
              bottom: 0,
              width: { xs: 38, md: 110 },
              zIndex: 5,
              pointerEvents: "none"
            },
            "&::before": {
              left: 0,
              background: "linear-gradient(90deg, #080808 0%, rgba(8,8,8,0) 100%)"
            },
            "&::after": {
              right: 0,
              background: "linear-gradient(270deg, #080808 0%, rgba(8,8,8,0) 100%)"
            },
            "@keyframes lookbook-marquee-ltr": {
              "0%": { transform: "translate3d(0, 0, 0)" },
              "100%": { transform: "translate3d(-50%, 0, 0)" }
            },
            "@keyframes lookbook-marquee-rtl": {
              "0%": { transform: "translate3d(-50%, 0, 0)" },
              "100%": { transform: "translate3d(0, 0, 0)" }
            }
          }}
        >
          <Box 
            sx={{ 
              display: "flex", 
              gap: { xs: 2.5, md: 4 }, 
              width: "max-content",
              px: 4,
              willChange: "transform",
              transform: "translate3d(0,0,0)",
              animation: `${lang === "ar" ? "lookbook-marquee-rtl" : "lookbook-marquee-ltr"} 95s linear infinite`,
              "&:hover": {
                animationPlayState: "running"
              },
              "@media (prefers-reduced-motion: reduce)": {
                animation: "none",
                overflowX: "auto",
                width: "100%",
                scrollSnapType: "x mandatory",
                px: 0,
                pb: 1
              }
            }}
          >
            {marqueeProducts.map((product, idx) => {
              const title = lang === "ar" ? product.titleAr : product.title;
              const category = lang === "ar" ? product.categoryAr : product.category;

              return (
                <Link 
                  key={`${product.id}-${idx}`}
                  href={`/product/${product.id}?lang=${lang}`}
                  style={{ textDecoration: "none" }}
                  draggable="false"
                  onDragStart={(e) => e.preventDefault()}
                >
                  <Box
                    sx={{
                      width: { xs: 280, md: 460 }, 
                      aspectRatio: "4 / 5",
                      position: "relative",
                      overflow: "hidden",
                      border: "1px solid rgba(255,255,255,0.06)",
                      cursor: "pointer",
                      flex: "0 0 auto",
                      scrollSnapAlign: "start",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "250%",
                        height: "100%",
                        background: "linear-gradient(135deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0) 70%)",
                        transform: "translateX(-110%) translateY(110%) skewX(-15deg)",
                        transition: "transform 1.1s cubic-bezier(0.25, 1, 0.5, 1)",
                        pointerEvents: "none",
                        zIndex: 3
                      },
                      "&:hover::after": {
                        transform: "translateX(110%) translateY(-110%) skewX(-15deg)"
                      },
                      "&:hover .hover-overlay": {
                        opacity: 1
                      },
                      "&:hover .product-title": {
                        transform: "translateY(0)",
                        opacity: 1
                      },
                      "&:hover .product-btn": {
                        transform: "translateY(0)",
                        opacity: 1
                      }
                    }}
                  >
                    <motion.img 
                      src={product.imageUrl} 
                      alt={title} 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        pointerEvents: "none"
                      }}
                      draggable="false"
                    />

                    <Box 
                      className="hover-overlay"
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.15) 100%)",
                        opacity: 0,
                        transition: "opacity 0.4s ease",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        p: 3,
                        zIndex: 2,
                        textAlign: lang === "ar" ? "right" : "left"
                      }}
                    >
                      <Typography sx={{ color: "primary.main", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", mb: 0.5, fontFamily: '"Cairo", sans-serif' }}>
                        {category}
                      </Typography>
                      
                      <Typography 
                        className="product-title"
                        sx={{ 
                          color: "#ffffff", 
                          fontFamily: "var(--heading-font)", 
                          fontSize: 20, 
                          fontWeight: 500, 
                          mb: 3,
                          transform: "translateY(15px)",
                          opacity: 0,
                          transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease",
                          transitionDelay: "0.05s"
                        }}
                      >
                        {title}
                      </Typography>

                      <Button
                        className="product-btn"
                        variant="outlined"
                        sx={{
                          borderColor: "primary.main",
                          color: "#ffffff",
                          borderRadius: 0,
                          py: 1,
                          fontSize: 12,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          fontFamily: '"Cairo", sans-serif',
                          transform: "translateY(20px)",
                          opacity: 0,
                          transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease",
                          transitionDelay: "0.1s",
                          "&:hover": {
                            bgcolor: "primary.main",
                            borderColor: "primary.main",
                            color: "#ffffff"
                          }
                        }}
                      >
                        {t("Explore Piece")}
                      </Button>
                    </Box>
                  </Box>
                </Link>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
