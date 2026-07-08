"use client";

import { useMemo, useState } from "react";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { Box, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { products } from "@/lib/productData";
import type { Section } from "@/lib/types";

export default function BoulevardSelectionSection({ 
  section, 
  t, 
  lang 
}: { 
  section: Section; 
  t: (s?: string) => string; 
  lang: "ar" | "en"; 
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const boulevardIds = [
    "boss-hugo-boss-polo",
    "fgb-urban-active-footwear",
    "adidas-originals-sportswear",
    "fgb-white-lace-midi-dress",
    "fgb-modern-tailored-blazer",
    "si-passione-giorgio-armani-perfume",
    "fgb-silk-oversized-shirt"
  ];
  
  const boulevardProducts = useMemo(() => {
    return boulevardIds
      .map(id => products.find(p => p.id === id))
      .filter(Boolean) as any[];
  }, [lang]);

  return (
    <Box id={section.anchor} component="section" sx={{ py: { xs: 12, md: 18 }, bgcolor: "#ffffff", color: "#111111", position: "relative", overflow: "hidden" }}>
      <Container maxWidth="xl">
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "5fr 1fr 6fr" }, gap: { xs: 4, md: 0 }, alignItems: "stretch", mb: { xs: 10, md: 16 } }}>
          
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", pr: { md: 4 } }}>
            <Box>
              <Typography sx={{ color: "primary.main", textTransform: "uppercase", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", fontFamily: '"Cairo", sans-serif', mb: 2 }}>
                {t("WHAT IS FASHION GATE?")}
              </Typography>
              <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 34, md: 46 }, fontWeight: 500, color: "#111111", lineHeight: 1.15, mb: 4 }}>
                {lang === "ar" ? "بوابة الموضة بوليفارد — العتبة إلى عالم الاستثناء" : "Fashion Gate Boulevard — The Threshold to the Exceptional"}
              </Typography>
            </Box>
            
            <Box sx={{ mt: { xs: 4, md: 0 }, display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", gap: 3.5 }}>
              <Box 
                component="img"
                src="/assets/baglight.png"
                alt="Fashion Gate Boulevard Carrier Bag"
                sx={{ 
                  width: { xs: 100, md: 120 }, 
                  height: "auto", 
                  objectFit: "contain",
                  filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.06))",
                  animation: "float-bag-light 5s ease-in-out infinite",
                  "@keyframes float-bag-light": {
                    "0%": { transform: "translateY(0px) rotate(0deg)" },
                    "50%": { transform: "translateY(-8px) rotate(-1.5deg)" },
                    "100%": { transform: "translateY(0px) rotate(0deg)" }
                  }
                }}
              />
              <Typography sx={{ 
                fontFamily: '"Griphorium", "Griphosium", "Graphion", "Brush Script MT", cursive', 
                fontSize: { xs: 26, md: 34 }, 
                color: "primary.main", 
                fontStyle: "italic",
                lineHeight: 1.3
              }}>
                {lang === "ar" ? (
                  "«أنت لا تتسوق في بوابة الموضة بوليفارد، بل تمشي فيها.»"
                ) : (
                  "\"You do not shop Fashion Gate Boulevard. You walk it.\""
                )}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center", py: 2 }}>
            <Box sx={{ width: "1px", height: "100%", bgcolor: "rgba(0,0,0,0.08)" }} />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", pl: { md: 4 }, gap: 3.5 }}>
            <Typography sx={{ color: "rgba(0,0,0,0.72)", fontSize: 16, lineHeight: 1.9, fontFamily: '"Cairo", sans-serif', textAlign: "justify" }}>
              {lang === "ar" ? (
                "بوابة الموضة بوليفارد هي أول متجر أقسام فاخر في سوريا — تم بناؤه على نموذج أعظم مؤسسات الموضة في العالم: هارودز في لندن، لو بون مارشيه في باريس، غاليري لافاييت، سيلفريدجز. عنوان واحد يحتوي على عوالم متعددة تحت رؤية معمارية موحدة."
              ) : (
                "Fashion Gate Boulevard is Syria's first luxury department store — built on the model of the world's great fashion institutions: Harrods in London, Le Bon Marché in Paris, Galeries Lafayette, Selfridges. A single address containing multiple worlds under one unified architectural vision."
              )}
            </Typography>
            <Typography sx={{ color: "rgba(0,0,0,0.72)", fontSize: 16, lineHeight: 1.9, fontFamily: '"Cairo", sans-serif', textAlign: "justify" }}>
              {lang === "ar" ? (
                "تقوم بوابة الموضة بوليفارد برعاية أرقى مجموعات المصممين العالميين للرجال والنساء، إلى جانب الإكسسوارات الفاخرة، ومنتجات التجميل، والأطعمة الفاخرة. إنها ليست مجرد متجر أو مركز تجاري، بل هي وجهة أسلوب حياة راقية حيث تلتقي الموضة والذوق والثقافة تحت سقف واحد."
              ) : (
                "Fashion Gate Boulevard curates the finest international designer collections for men and women, alongside premium fashion accessories, beauty products, and gourmet luxury foods. It is not just a store, it is not a mall, it is a sophisticated lifestyle destination where fashion, taste, and culture converge under one roof."
              )}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" }, gap: { xs: 4, md: 5 } }}>
          {boulevardProducts.map((product, index) => {
            const title = lang === "ar" ? product.titleAr : product.title;
            const category = lang === "ar" ? product.categoryAr : product.category;
            const description = lang === "ar" ? product.descriptionAr : product.description;
            const seqNumber = String(index + 1).padStart(2, "0");

            return (
              <Box
                key={product.id}
                sx={{
                  transition: "transform 0.4s ease",
                  "&:hover": {
                    transform: "translateY(-6px)"
                  }
                }}
              >
                <Link 
                  href={`/${lang}/product/${product.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                      "&:hover": {
                        "& .product-img": {
                          transform: "scale(1.04)"
                        }
                      }
                    }}
                  >
                    {/* <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 1 }}>
                      <Typography sx={{ 
                        fontFamily: '"Cairo", sans-serif', 
                        fontSize: 12, 
                        fontWeight: 700, 
                        color: "rgba(0,0,0,0.3)", 
                        letterSpacing: "0.1em"
                      }}>
                        {seqNumber}
                      </Typography>
                    </Box> */}

                    <Box
                      sx={{
                        position: "relative",
                        aspectRatio: "4 / 5",
                        overflow: "hidden",
                        mb: 2,
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "250%",
                          height: "100%",
                          background: "linear-gradient(135deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 70%)",
                          transform: "translateX(-110%) translateY(110%) skewX(-15deg)",
                          transition: "transform 1.1s cubic-bezier(0.25, 1, 0.5, 1)",
                          pointerEvents: "none",
                          zIndex: 3
                        },
                        "&:hover::after": {
                          transform: "translateX(110%) translateY(-110%) skewX(-15deg)"
                        }
                      }}
                    >
                      <img 
                        className="product-img"
                        src={product.imageUrl} 
                        alt={title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)"
                        }}
                      />

                      <Box sx={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0) 35%)",
                        opacity: hoveredIndex === index ? 1 : 0,
                        transition: "opacity 0.4s ease",
                        zIndex: 2,
                        pointerEvents: "none"
                      }} />

                      <Stack 
                        direction="row" 
                        alignItems="center" 
                        spacing={0.5}
                        sx={{
                          position: "absolute",
                          bottom: 16,
                          right: 16,
                          zIndex: 3,
                          color: "primary.main",
                          opacity: hoveredIndex === index ? 1 : 0,
                          transform: hoveredIndex === index ? "translateY(0)" : "translateY(8px)",
                          transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                          pointerEvents: "none"
                        }}
                      >
                        <Typography sx={{ 
                          fontFamily: '"Cairo", sans-serif', 
                          fontSize: 12, 
                          fontWeight: 700,
                          letterSpacing: "0.08em"
                        }}>
                          {lang === "ar" ? "اكتشف" : "Explore"}
                        </Typography>
                        <NorthEastIcon sx={{ fontSize: 13 }} />
                      </Stack>
                    </Box>

                    <Typography sx={{ 
                      color: "#111111", 
                      fontFamily: "var(--heading-font)", 
                      fontSize: 21, 
                      fontWeight: 500, 
                      lineHeight: 1.2,
                      mt: 1.5
                    }}>
                      {category}
                    </Typography>

                    <Typography sx={{ 
                      color: "primary.main", 
                      fontSize: 10.5, 
                      fontWeight: 700, 
                      textTransform: "uppercase", 
                      letterSpacing: "0.15em", 
                      fontFamily: '"Cairo", sans-serif',
                      mt: 0.5
                    }}>
                      {title}
                    </Typography>

                    <Box sx={{ 
                      width: hoveredIndex === index ? "100%" : "30px", 
                      height: "1px", 
                      bgcolor: hoveredIndex === index ? "primary.main" : "rgba(0,0,0,0.08)", 
                      transition: "width 0.5s cubic-bezier(0.25, 1, 0.5, 1), bgcolor 0.5s ease",
                      my: 1.5 
                    }} />

                    <Typography sx={{ 
                      color: "rgba(0,0,0,0.6)", 
                      fontFamily: '"Cairo", sans-serif', 
                      fontSize: 13, 
                      lineHeight: 1.6,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}>
                      {description}
                    </Typography>
                  </Box>
                </Link>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
