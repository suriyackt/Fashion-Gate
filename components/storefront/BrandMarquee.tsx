"use client";

import { Box } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

const brandLogos = [
  // Chanel
  (
    <Box key="chanel" sx={{ mx: { xs: 4, md: 6 }, display: "flex", alignItems: "center", color: "#111111", opacity: 0.65, "&:hover": { opacity: 1 }, transition: "opacity 0.3s ease" }}>
      <svg width="110" height="30" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Futura', 'Helvetica Neue', 'Arial', sans-serif" fontSize="18" fontWeight="bold" letterSpacing="0.35em" textAnchor="middle">CHANEL</text>
      </svg>
    </Box>
  ),
  // Chanel interlocking CC logo
  (
    <Box key="chanel-cc" sx={{ mx: { xs: 4, md: 6 }, display: "flex", alignItems: "center", color: "#111111", opacity: 0.65, "&:hover": { opacity: 1 }, transition: "opacity 0.3s ease" }}>
      <svg width="45" height="30" viewBox="0 0 60 40" fill="currentColor">
        <path d="M 22,20 C 22,13.4 27.4,8 34,8 C 38,8 41.5,10 43.5,13 L 39,16.5 C 38,15 36,14 34,14 C 30.7,14 28,16.7 28,20 C 28,23.3 30.7,26 34,26 C 36,26 38,25 39,23.5 L 43.5,27 C 41.5,30 38,32 34,32 C 27.4,32 22,26.6 22,20 Z" />
        <path d="M 38,20 C 38,23.3 35.3,26 32,26 C 30,26 28,25 27,23.5 L 22.5,27 C 24.5,30 28,32 32,32 C 38.6,32 44,26.6 44,20 C 44,13.4 38.6,8 32,8 C 28,8 24.5,10 22.5,13 L 27,16.5 C 28,15 30,14 32,14 C 35.3,14 38,16.7 38,20 Z" />
      </svg>
    </Box>
  ),
  // Prada
  (
    <Box key="prada" sx={{ mx: { xs: 4, md: 6 }, display: "flex", alignItems: "center", color: "#111111", opacity: 0.65, "&:hover": { opacity: 1 }, transition: "opacity 0.3s ease" }}>
      <svg width="110" height="30" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Engravers MT', 'Copperplate', 'Times New Roman', serif" fontSize="15" fontWeight="900" letterSpacing="0.18em" textAnchor="middle">PRADA</text>
      </svg>
    </Box>
  ),
  // Adidas Three Stripes
  (
    <Box key="adidas" sx={{ mx: { xs: 4, md: 6 }, display: "flex", alignItems: "center", color: "#111111", opacity: 0.65, "&:hover": { opacity: 1 }, transition: "opacity 0.3s ease" }}>
      <svg width="45" height="30" viewBox="0 0 60 40" fill="currentColor">
        <path d="M 15 32 L 20 32 L 35 8 L 30 8 Z" />
        <path d="M 25 32 L 30 32 L 45 8 L 40 8 Z" />
        <path d="M 35 32 L 40 32 L 55 8 L 50 8 Z" />
      </svg>
    </Box>
  ),
  // Gucci
  (
    <Box key="gucci" sx={{ mx: { xs: 4, md: 6 }, display: "flex", alignItems: "center", color: "#111111", opacity: 0.65, "&:hover": { opacity: 1 }, transition: "opacity 0.3s ease" }}>
      <svg width="110" height="30" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Granjon', 'Garamond', serif" fontSize="18" fontWeight="bold" letterSpacing="0.25em" textAnchor="middle">GUCCI</text>
      </svg>
    </Box>
  ),
  // Dior
  (
    <Box key="dior" sx={{ mx: { xs: 4, md: 6 }, display: "flex", alignItems: "center", color: "#111111", opacity: 0.65, "&:hover": { opacity: 1 }, transition: "opacity 0.3s ease" }}>
      <svg width="90" height="30" viewBox="0 0 100 30" fill="currentColor">
        <text x="50%" y="22" fontFamily="'Playfair Display', 'Didot', 'Bodoni MT', serif" fontSize="18" fontWeight="700" letterSpacing="0.2em" textAnchor="middle">Dior</text>
      </svg>
    </Box>
  ),
  // Yves Saint Laurent
  (
    <Box key="ysl" sx={{ mx: { xs: 4, md: 6 }, display: "flex", alignItems: "center", color: "#111111", opacity: 0.65, "&:hover": { opacity: 1 }, transition: "opacity 0.3s ease" }}>
      <svg width="140" height="30" viewBox="0 0 160 30" fill="currentColor">
        <text x="50%" y="21" fontFamily="'Cinzel', 'Times New Roman', serif" fontSize="11" fontWeight="600" letterSpacing="0.3em" textAnchor="middle">YVES SAINT LAURENT</text>
      </svg>
    </Box>
  ),
  // Hermès
  (
    <Box key="hermes" sx={{ mx: { xs: 4, md: 6 }, display: "flex", alignItems: "center", color: "#111111", opacity: 0.65, "&:hover": { opacity: 1 }, transition: "opacity 0.3s ease" }}>
      <svg width="110" height="30" viewBox="0 0 120 30" fill="currentColor">
        <text x="50%" y="21" fontFamily="'Rockwell', 'Courier New', serif" fontSize="13" fontWeight="bold" letterSpacing="0.25em" textAnchor="middle">HERMÈS</text>
      </svg>
    </Box>
  )
];

export default function BrandMarquee() {
  return (
    <Box 
      sx={{ 
        bgcolor: "#ffffff", 
        py: { xs: 4, md: 5 }, 
        borderTop: "1px solid rgba(0,0,0,0.06)", 
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        overflow: "hidden",
        width: "100%",
        display: "flex",
        alignItems: "center"
      }}
    >
      <MotionBox
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          repeat: Infinity, 
          duration: 35, 
          ease: "linear" 
        }}
        sx={{
          display: "flex",
          width: "max-content",
          alignItems: "center"
        }}
      >
        {/* Render twice for a seamless infinite loop */}
        {brandLogos}
        {brandLogos}
      </MotionBox>
    </Box>
  );
}
