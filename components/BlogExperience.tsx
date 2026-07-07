"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { Box, Button, Container, Stack, ThemeProvider, Typography, createTheme } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import SiteFooter from "@/components/SiteFooter";
import { blogPosts, featuredBlogPost } from "@/lib/blogData";

const MotionBox = motion.create(Box);

function JournalHeader() {
  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        bgcolor: "#FAF8F5", // Sand cream matching page background
        borderBottom: "1px solid rgba(0,0,0,0.06)"
      }}
    >
      <Stack direction="row" alignItems="center" sx={{ minHeight: { xs: 64, md: 74 }, px: { xs: 2, md: 4 } }}>
        <Button component={Link} href="/" sx={{ color: "#111111", px: 0, minWidth: 0, textTransform: "none" }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box component="img" src="/brand/logo.png" alt="Fashion Gate" sx={{ height: { xs: 32, md: 38 }, width: "auto", filter: "invert(1)" }} />
            <Stack spacing={0.1} sx={{ display: { xs: "none", sm: "flex" } }}>
              <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: 16, fontWeight: 600, color: "#111111", lineHeight: 1, letterSpacing: "0.08em" }}>
                Fashion Gate
              </Typography>
              <Typography sx={{ fontSize: 8, color: "rgba(0,0,0,0.48)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                On Boulevard. For the world.
              </Typography>
            </Stack>
          </Stack>
        </Button>

        <Stack direction="row" spacing={{ xs: 2.5, md: 4 }} alignItems="center" sx={{ ml: "auto" }}>
          <Button component={Link} href="/" sx={{ color: "rgba(0,0,0,0.64)", px: 0, minWidth: 0, fontSize: 11, letterSpacing: "0.16em", fontWeight: 700, fontFamily: '"Cairo", sans-serif', "&:hover": { color: "primary.main" } }}>
            Home
          </Button>
          <Button component={Link} href="/blogs" sx={{ color: "primary.main", px: 0, minWidth: 0, fontSize: 11, letterSpacing: "0.16em", fontWeight: 700, fontFamily: '"Cairo", sans-serif' }}>
            Blogs
          </Button>
          <Button href="#journal" endIcon={<NorthEastIcon sx={{ fontSize: 13 }} />} sx={{ display: { xs: "none", sm: "inline-flex" }, color: "#111111", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 0, px: 2.2, py: 0.6, fontSize: 11, letterSpacing: "0.14em", fontWeight: 700, fontFamily: '"Cairo", sans-serif', "&:hover": { bgcolor: "rgba(0,0,0,0.03)" } }}>
            Read
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default function BlogExperience() {
  const [activeFormat, setActiveFormat] = useState("All");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = createTheme({
    palette: {
      mode: "light",
      primary: { main: "#CB6116", dark: "#9D430C" },
      secondary: { main: "#D06010" }
    },
    typography: {
      fontFamily: `"Cairo", sans-serif`,
      button: { fontWeight: 700, textTransform: "uppercase" }
    },
    shape: { borderRadius: 0 }
  });

  const formats = ["All", "Blog post", "Case study", "Thought leadership"];

  // Filter posts based on format filter
  const filteredPosts = activeFormat === "All" 
    ? blogPosts.slice(1) 
    : blogPosts.slice(1).filter(post => post.format === activeFormat);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "#FAF8F5", color: "#111111", minHeight: "100vh" }}>
        <JournalHeader />

        {/* Clean Typographic Cover Hero */}
        <Box component="section" sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 6, md: 8 } }}>
          <Container maxWidth="xl">
            <Stack spacing={4} alignItems="center" textAlign="center">
              <Typography sx={{ color: "primary.main", fontSize: 11, fontWeight: 800, letterSpacing: "0.26em", textTransform: "none", fontFamily: '"Cairo", sans-serif' }}>
                Fashion Gate Journal
              </Typography>
              <Typography component="h1" sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: "2.8rem", sm: "4.8rem", md: "6.5rem" }, fontWeight: 500, lineHeight: 1.1, color: "#111111", maxWidth: 960 }}>
                The Architecture of Luxury
              </Typography>
              <Typography sx={{ maxWidth: 620, color: "rgba(0,0,0,0.64)", fontSize: 15, lineHeight: 1.8, fontFamily: '"Cairo", sans-serif' }}>
                Refined design thinking, hospitality project insights, and architectural developments shaped into an elegant editorial destination.
              </Typography>
              
              {/* Minimalist Stats Row */}
              <Stack direction="row" spacing={3} sx={{ color: "rgba(0,0,0,0.4)", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "none", pt: 1 }}>
                <Typography sx={{ fontSize: "inherit", fontWeight: "inherit" }}>Luxury Focus</Typography>
                <Typography sx={{ fontSize: "inherit", fontWeight: "inherit" }}>•</Typography>
                <Typography sx={{ fontSize: "inherit", fontWeight: "inherit" }}>Editorial Edits</Typography>
                <Typography sx={{ fontSize: "inherit", fontWeight: "inherit" }}>•</Typography>
                <Typography sx={{ fontSize: "inherit", fontWeight: "inherit" }}>12 Journal Notes</Typography>
              </Stack>
            </Stack>
          </Container>
        </Box>

        {/* Featured Editorial Article */}
        <Box id="journal" component="section" sx={{ pb: { xs: 8, md: 14 } }}>
          <Container maxWidth="xl">
            <Stack spacing={4}>
              {/* Giant Full-Width Cover Image */}
              <Box 
                sx={{ 
                  width: "100%", 
                  height: { xs: 300, sm: 450, md: 560 }, 
                  overflow: "hidden", 
                  position: "relative",
                  border: "1px solid rgba(0,0,0,0.06)"
                }}
              >
                <Box 
                  component="img"
                  src={featuredBlogPost.image}
                  alt={featuredBlogPost.title}
                  sx={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover",
                    transition: "transform 0.8s ease",
                    "&:hover": { transform: "scale(1.015)" }
                  }}
                />
              </Box>

              {/* Centered Editorial Copy Column */}
              <Stack spacing={3} sx={{ maxWidth: 840, mx: "auto", px: { xs: 1, sm: 3 } }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Typography sx={{ color: "primary.main", fontSize: 10.5, fontWeight: 800, letterSpacing: "0.2em", textTransform: "none" }}>
                    Featured Article
                  </Typography>
                  <Typography sx={{ color: "rgba(0,0,0,0.3)", fontSize: 11.5 }}>/</Typography>
                  <Typography sx={{ color: "rgba(0,0,0,0.54)", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "none" }}>
                    {featuredBlogPost.month}
                  </Typography>
                </Stack>

                <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: "2.2rem", sm: "3rem", md: "4.2rem" }, lineHeight: 1.1, color: "#111111", fontWeight: 500 }}>
                  {featuredBlogPost.title}
                </Typography>

                <Typography sx={{ color: "rgba(0,0,0,0.8)", fontSize: 16.5, lineHeight: 1.85, fontFamily: '"Cairo", sans-serif' }}>
                  {featuredBlogPost.excerpt}
                </Typography>

                <Stack spacing={2} sx={{ borderTop: "1px solid rgba(0,0,0,0.06)", pt: 3 }}>
                  {featuredBlogPost.content?.slice(0, 2).map((paragraph) => (
                    <Typography key={paragraph} sx={{ color: "rgba(0,0,0,0.62)", fontSize: 14.5, lineHeight: 1.85, fontFamily: '"Cairo", sans-serif' }}>
                      {paragraph}
                    </Typography>
                  ))}
                </Stack>

                <Button 
                  endIcon={<ArrowForwardIcon sx={{ fontSize: 15 }} />} 
                  sx={{ 
                    alignSelf: "flex-start", 
                    color: "primary.main", 
                    p: 0,
                    fontSize: 11.5, 
                    fontWeight: 800,
                    letterSpacing: "0.15em",
                    borderBottom: "1.5px solid",
                    borderColor: "primary.main",
                    borderRadius: 0,
                    pb: 0.5,
                    mt: 1.5,
                    "&:hover": { bgcolor: "transparent", color: "#111111", borderColor: "#111111" }
                  }}
                >
                  Read Article
                </Button>
              </Stack>
            </Stack>
          </Container>
        </Box>

        {/* Filters and Grid List */}
        <Box component="section" sx={{ pb: { xs: 8, md: 14 }, borderTop: "1px solid rgba(0,0,0,0.06)", pt: { xs: 8, md: 10 } }}>
          <Container maxWidth="xl">
            <Stack spacing={6}>
              {/* Header & Filter Controls */}
              <Stack 
                direction={{ xs: "column", md: "row" }} 
                justifyContent="space-between" 
                spacing={3} 
                alignItems={{ xs: "flex-start", md: "flex-end" }}
              >
                <Stack spacing={1}>
                  <Typography sx={{ color: "primary.main", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "none" }}>
                    The Journal Catalog
                  </Typography>
                  <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: "2.4rem", md: "3.8rem" }, lineHeight: 1.1, color: "#111111" }}>
                    Refining Design & Engineering
                  </Typography>
                </Stack>

                {/* Filter Tags */}
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {formats.map((format) => {
                    const isSelected = activeFormat === format;
                    return (
                      <Button
                        key={format}
                        onClick={() => setActiveFormat(format)}
                        sx={{
                          px: 2,
                          py: 0.8,
                          border: "1px solid",
                          borderColor: isSelected ? "primary.main" : "rgba(0,0,0,0.08)",
                          color: isSelected ? "#ffffff" : "rgba(0,0,0,0.62)",
                          bgcolor: isSelected ? "primary.main" : "transparent",
                          fontSize: 10.5,
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          borderRadius: 0,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: isSelected ? "primary.main" : "rgba(0,0,0,0.03)",
                            borderColor: isSelected ? "primary.main" : "rgba(0,0,0,0.2)"
                          }
                        }}
                      >
                        {format}
                      </Button>
                    );
                  })}
                </Stack>
              </Stack>

              {/* Clean, Readable Editorial Cards Grid */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                  gap: { xs: 4, md: 5 }
                }}
              >
                {filteredPosts.map((post, index) => (
                  <MotionBox
                    key={post.slug}
                    initial={mounted ? { opacity: 0, y: 20 } : false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.2), ease: "easeOut" }}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      bgcolor: "#ffffff",
                      border: "1px solid rgba(0,0,0,0.05)",
                      overflow: "hidden",
                      transition: "transform 0.4s ease, box-shadow 0.4s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 18px 40px rgba(0,0,0,0.04)"
                      }
                    }}
                  >
                    {/* Card Image */}
                    <Box sx={{ aspectRatio: "16/10", overflow: "hidden", position: "relative" }}>
                      <Box
                        component="img"
                        src={post.image}
                        alt={post.title}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.6s ease",
                          "&:hover": { transform: "scale(1.025)" }
                        }}
                      />
                    </Box>

                    {/* Card Content (Wholly underneath the image) */}
                    <Stack spacing={2} sx={{ p: 3, flexGrow: 1 }}>
                      <Stack direction="row" spacing={1.2} alignItems="center">
                        <Typography sx={{ color: "primary.main", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "none" }}>
                          {post.format}
                        </Typography>
                        <Typography sx={{ color: "rgba(0,0,0,0.22)", fontSize: 10 }}>•</Typography>
                        <Typography sx={{ color: "rgba(0,0,0,0.48)", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "none" }}>
                          {post.month}
                        </Typography>
                      </Stack>

                      <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: 20, lineHeight: 1.25, fontWeight: 500, color: "#111111" }}>
                        {post.title}
                      </Typography>

                      <Typography sx={{ color: "rgba(0,0,0,0.6)", fontSize: 13.5, lineHeight: 1.6, fontFamily: '"Cairo", sans-serif' }}>
                        {post.excerpt}
                      </Typography>

                      <Typography sx={{ color: "rgba(0,0,0,0.36)", fontSize: 10, letterSpacing: "0.08em", textTransform: "none", mt: "auto", pt: 1.5, borderTop: "1px solid rgba(0,0,0,0.04)" }}>
                        {post.audience}
                      </Typography>
                    </Stack>
                  </MotionBox>
                ))}
              </Box>
            </Stack>
          </Container>
        </Box>

        {/* Minimal Editorial Vision Callout */}
        <Box component="section" sx={{ bgcolor: "#F5EFEB", color: "#111111", py: { xs: 8, md: 10 }, borderTop: "1px solid rgba(0,0,0,0.05)" }}>
          <Container maxWidth="xl">
            <Stack spacing={2.5} alignItems="center" textAlign="center">
              <Typography sx={{ color: "primary.main", fontSize: 11, fontWeight: 800, letterSpacing: "0.22em", textTransform: "none" }}>
                Editorial Vision
              </Typography>
              <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: "2rem", md: "3.2rem" }, lineHeight: 1.15, fontWeight: 500, maxWidth: 820 }}>
                "Real projects translated into search relevance, client trust, and brand authority."
              </Typography>
              <Typography sx={{ color: "rgba(0,0,0,0.48)", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "none" }}>
                Fashion Gate Damascus
              </Typography>
            </Stack>
          </Container>
        </Box>

        <SiteFooter />
      </Box>
    </ThemeProvider>
  );
}
