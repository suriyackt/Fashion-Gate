"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion, useMotionValue } from "framer-motion";
import Link from "next/link";
import { products } from "@/lib/productData";
import type { Section } from "@/lib/types";
import { getLocalizedValue } from "@/lib/sanity";

const MotionBox = motion.create(Box);

export default function LookbookSection({ 
  section, 
  t, 
  lang 
}: { 
  section: Section; 
  t: (s?: string) => string; 
  lang: "ar" | "en"; 
}) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const x = useMotionValue(0);

  useEffect(() => {
    const updateConstraints = () => {
      if (trackRef.current && constraintsRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const containerWidth = constraintsRef.current.offsetWidth;
        const maxDrag = trackWidth - containerWidth;
        setConstraints({
          left: maxDrag > 0 ? -maxDrag - 40 : 0,
          right: 40
        });
      }
    };
    
    updateConstraints();
    const timer = setTimeout(updateConstraints, 600);
    window.addEventListener("resize", updateConstraints);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateConstraints);
    };
  }, []);

  // Butter-smooth marquee style autoplay
  useEffect(() => {
    let animationFrameId: number;
    
    const tick = () => {
      if (!isDraggingRef.current && constraints.left < 0) {
        const currentX = x.get();
        const nextX = currentX - 0.7; // Autoplay velocity
        if (nextX < constraints.left) {
          x.set(0); // Wrap to beginning
        } else {
          x.set(nextX);
        }
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [constraints.left, x]);

  // Resolve section localized fields using our helper
  const eyebrowText = getLocalizedValue(
    section.eyebrow,
    lang,
    t("Curated Pieces")
  );

  const descriptionText = getLocalizedValue(
    section.description,
    lang,
    lang === "ar"
      ? "استكشف معرضاً فريداً من القطع المميزاً، حيث تلتقي الهندسة المعمارية بالفخامة الملموسة من دمشق إلى العالم."
      : "Explore a singular gallery of signature items, where architectural geometry meets tactile luxury from Damascus to the world."
  );

  const customHeadlineText = getLocalizedValue(
    section.headline,
    lang,
    ""
  );

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
              {eyebrowText}
            </Typography>
            <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 36, sm: 48, md: 62 }, fontWeight: 500, lineHeight: 1.1, color: "#ffffff" }}>
              {customHeadlineText ? customHeadlineText : (
                lang === "ar" ? (
                  <>
                    قطع <Box component="span" sx={{ fontFamily: '"Griphorium", "Griphosium", "Graphion", "Brush Script MT", cursive', color: "primary.main", fontStyle: "italic", mx: 1 }}>حصرية</Box> مصممة بعناية
                  </>
                ) : (
                  <>
                    Curated <Box component="span" sx={{ fontFamily: '"Griphorium", "Griphosium", "Graphion", "Brush Script MT", cursive', color: "primary.main", fontStyle: "italic", mx: 1 }}>Designer</Box> Masterpieces
                  </>
                )
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
              {descriptionText}
            </Typography>
          </Box>
        </Box>

        {/* Draggable Carousel Container */}
        <Box 
          ref={constraintsRef}
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
              width: { xs: 24, md: 80 },
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
            }
          }}
        >
          <MotionBox 
            ref={trackRef}
            drag="x"
            style={{ x }}
            dragConstraints={constraints}
            dragElastic={0.15}
            dragTransition={{ power: 0.2, timeConstant: 300 }}
            onDragStart={() => {
              isDraggingRef.current = true;
            }}
            onDragEnd={() => {
              setTimeout(() => {
                isDraggingRef.current = false;
              }, 250);
            }}
            onMouseEnter={() => {
              isHoveredRef.current = true;
            }}
            onMouseLeave={() => {
              isHoveredRef.current = false;
            }}
            onTouchStart={() => {
              isHoveredRef.current = true;
            }}
            onTouchEnd={() => {
              isHoveredRef.current = false;
            }}
            whileTap={{ cursor: "grabbing" }}
            sx={{ 
              display: "flex", 
              gap: { xs: 2.5, md: 4 }, 
              width: "max-content",
              px: 4,
              cursor: "grab",
              touchAction: "pan-y"
            }}
          >
            {products.map((product, idx) => {
              const title = lang === "ar" ? product.titleAr : product.title;
              const category = lang === "ar" ? product.categoryAr : product.category;

              return (
                <Link 
                  key={`${product.id}-${idx}`}
                  href={`/product/${product.id}/${lang}`}
                  style={{ textDecoration: "none" }}
                  draggable="false"
                  onClick={(e) => {
                    if (isDraggingRef.current) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                  onDragStart={(e) => e.preventDefault()}
                >
                  <Box
                    sx={{
                      width: { xs: 280, md: 440 }, 
                      aspectRatio: "4 / 5",
                      position: "relative",
                      overflow: "hidden",
                      border: "1px solid rgba(255,255,255,0.06)",
                      flex: "0 0 auto",
                      userSelect: "none",
                      pointerEvents: "auto",
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
                      whileHover={{ scale: 1.04 }}
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
                          mb: 1,
                          transform: "translateY(15px)",
                          opacity: 0,
                          transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease",
                          transitionDelay: "0.05s"
                        }}
                      >
                        {title}
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              );
            })}
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
}
