"use client";

import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import type { Section } from "@/lib/types";
import { resolveImage, imageLayer } from "../Storefront";

const MotionBox = motion.create(Box);

export default function CarouselSection({ 
  section, 
  t, 
  lang 
}: { 
  section: Section; 
  t: (s?: string) => string; 
  lang: "ar" | "en"; 
}) {
  const slides = section.slides?.length ? section.slides : [];
  const [active, setActive] = useState(0);
  const slide = slides[active] || slides[0];
  const image = resolveImage(slide?.image, slide?.imageUrl || section.imageUrl);

  return (
    <Box 
      id={section.anchor} 
      component="section" 
      sx={{ 
        bgcolor: "primary.main",
        color: "#111111",
        overflow: "hidden"
      }}
    >
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", md: "row" },
          minHeight: { xs: "auto", md: "680px" },
          alignItems: "stretch"
        }}
      >
        <Box 
          sx={{ 
            flex: 1, 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center", 
            py: { xs: 8, md: 12 }, 
            px: { xs: 3, sm: 6, md: 8, lg: 12 },
            textAlign: lang === "ar" ? "right" : "left"
          }}
        >
          <Typography 
            sx={{ 
              color: "rgba(0,0,0,0.54)", 
              textTransform: "uppercase", 
              fontSize: 11, 
              fontWeight: 700, 
              letterSpacing: "0.18em", 
              fontFamily: '"Cairo", sans-serif',
              mb: 1
            }}
          >
            {t(section.eyebrow)}
          </Typography>

          <Typography 
            sx={{ 
              fontFamily: "var(--heading-font)", 
              fontSize: { xs: "2rem", sm: "2.8rem", md: "3.5rem" }, 
              fontWeight: 500, 
              lineHeight: 1.15,
              color: "#111111",
              mb: 2.5
            }}
          >
            {t(slide?.title || section.headline)}
          </Typography>

          <Typography 
            sx={{ 
              color: "rgba(0,0,0,0.8)", 
              fontSize: 15, 
              lineHeight: 1.8, 
              fontFamily: '"Cairo", sans-serif',
              mb: 4,
              maxWidth: 550
            }}
          >
            {t(slide?.description || section.description)}
          </Typography>
          
          <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap sx={{ mt: "auto" }}>
            {slides.map((item, index) => (
              <Button 
                key={`${item.title}-${index}`} 
                onClick={() => setActive(index)} 
                sx={{ 
                  borderRadius: 0, 
                  color: index === active ? "#fff" : "#111111", 
                  bgcolor: index === active ? "#111111" : "transparent", 
                  border: "1px solid #111111",
                  textTransform: "none",
                  minWidth: 44,
                  height: 44,
                  fontWeight: 700,
                  fontFamily: '"Cairo", sans-serif',
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: index === active ? "#111111" : "rgba(0,0,0,0.06)"
                  }
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </Button>
            ))}
          </Stack>
        </Box>
        
        <Box 
          sx={{ 
            flex: { xs: "none", md: 1.2 }, 
            minHeight: { xs: 350, sm: 450, md: "auto" },
            position: "relative",
            overflow: "hidden"
          }}
        >
          <MotionBox 
            key={active} 
            initial={{ opacity: 0, scale: 1.02 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, ease: "easeOut" }} 
            sx={{ 
              position: "absolute",
              inset: 0,
              backgroundImage: imageLayer(image), 
              backgroundSize: "cover", 
              backgroundPosition: "center",
              width: "100%",
              height: "100%"
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
