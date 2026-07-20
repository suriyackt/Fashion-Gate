"use client";

import { useState, useMemo } from "react";
import { Box, Button, Container, Stack, Typography, Divider, ThemeProvider, createTheme, Chip, Avatar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { PortableText } from "@portabletext/react";

interface BlogDetailClientProps {
  post: {
    slug: string;
    title: string;
    titleAr: string;
    format: string;
    month: string;
    excerpt: string;
    excerptAr: string;
    content: any[];
    contentAr?: any[];
    image: string;
    readTime: number;
    tags: string[];
    author: {
      name: string;
      role: string;
      roleAr: string;
      imageUrl: string;
    };
  };
  initialLang: "ar" | "en";
}

const formatMonth = (monthStr: string, isAr: boolean) => {
  if (!isAr) return monthStr;
  const monthMap: Record<string, string> = {
    January: "يناير",
    February: "فبراير",
    March: "مارس",
    April: "أبريل",
    May: "مايو",
    June: "يونيو",
    July: "يوليو",
    August: "أغسطس",
    September: "سبتمبر",
    October: "أكتوبر",
    November: "نوفمبر",
    December: "ديسمبر"
  };
  return monthMap[monthStr] || monthStr;
};

const formatCategoryName = (formatStr: string, isAr: boolean) => {
  if (!isAr) return formatStr;
  const formatMap: Record<string, string> = {
    "All": "الكل",
    "Blog post": "مقال",
    "Case study": "دراسة حالة",
    "Thought leadership": "رؤى قيادية"
  };
  return formatMap[formatStr] || formatStr;
};

export default function BlogDetailClient({ post, initialLang }: BlogDetailClientProps) {
  const router = useRouter();
  const [lang, setLang] = useState<"en" | "ar">(initialLang);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: "light",
      primary: { main: "#CB6116", dark: "#9D430C" },
      secondary: { main: "#D06010" }
    },
    typography: {
      fontFamily: `"Cairo", sans-serif`,
      button: { fontWeight: 800 }
    },
    shape: { borderRadius: 0 }
  }), []);

  const handleLangToggle = () => {
    const nextLang = lang === "ar" ? "en" : "ar";
    setLang(nextLang);
    router.replace(`/blogs/${post.slug}/${nextLang}`);
  };

  const isAr = lang === "ar";
  const postTitle = isAr ? (post.titleAr || post.title) : post.title;
  const postExcerpt = isAr ? (post.excerptAr || post.excerpt) : post.excerpt;
  const authorRole = isAr ? (post.author.roleAr || post.author.role) : post.author.role;
  const postContent = isAr ? (post.contentAr && post.contentAr.length > 0 ? post.contentAr : post.content) : post.content;

  // Custom Portable Text Renderers
  const portableTextComponents = {
    block: {
      normal: ({ children }: any) => (
        <Typography sx={{ color: "rgba(0,0,0,0.72)", fontSize: 16.5, lineHeight: 1.9, fontFamily: '"Cairo", sans-serif', mb: 3 }}>
          {children}
        </Typography>
      ),
      h2: ({ children }: any) => (
        <Typography variant="h4" sx={{ fontFamily: "var(--heading-font)", fontWeight: 500, color: "#111111", mt: 5, mb: 3 }}>
          {children}
        </Typography>
      ),
      h3: ({ children }: any) => (
        <Typography variant="h5" sx={{ fontFamily: "var(--heading-font)", fontWeight: 500, color: "#111111", mt: 4, mb: 2 }}>
          {children}
        </Typography>
      ),
    },
    types: {
      image: ({ value }: any) => (
        <Box sx={{ my: 5, textAlign: "center" }}>
          <Box 
            component="img" 
            src={value.asset?.url} 
            alt={value.alt || "Article Image"} 
            sx={{ maxWidth: "100%", height: "auto", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }} 
          />
          {value.caption && (
            <Typography variant="caption" sx={{ color: "rgba(0,0,0,0.48)", mt: 1.5, display: "block" }}>
              {value.caption}
            </Typography>
          )}
        </Box>
      ),
      imageSeparator: () => (
        <Divider sx={{ borderColor: "rgba(0,0,0,0.06)", my: 5, width: "100px", mx: "auto" }} />
      )
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box 
        dir={isAr ? "rtl" : "ltr"}
        sx={{ 
          bgcolor: "#FAF8F5", 
          color: "#111111", 
          minHeight: "100vh", 
          display: "flex", 
          flexDirection: "column" 
        }}
      >

        
        {/* Header Cover Info */}
        <Box component="section" sx={{ pt: { xs: 8, md: 12 }, pb: 6 }}>
          <Container maxWidth="md">
            <Stack spacing={3.5} sx={{ textAlign: isAr ? "right" : "left" }}>
              {/* Back to Blogs */}
              <Button
                component={Link}
                href={`/blogs/${lang}`}
                startIcon={!isAr && <ArrowBackIcon />}
                endIcon={isAr && <ArrowBackIcon sx={{ transform: "scaleX(-1)" }} />}
                sx={{
                  color: "rgba(0,0,0,0.64)",
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderRadius: 0,
                  px: 2.5,
                  py: 0.8,
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  alignSelf: "flex-start",
                  fontFamily: '"Cairo", sans-serif',
                  "&:hover": {
                    border: "1px solid #111111",
                    bgcolor: "rgba(0,0,0,0.03)"
                  }
                }}
              >
                {isAr ? "رجوع للمجلة" : "Journal Home"}
              </Button>

              <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap>
                <Typography sx={{ color: "primary.main", fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  {formatCategoryName(post.format, isAr)}
                </Typography>
                <Typography sx={{ color: "rgba(0,0,0,0.22)", fontSize: 11 }}>/</Typography>
                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: "rgba(0,0,0,0.48)" }}>
                  <CalendarMonthIcon sx={{ fontSize: 14 }} />
                  <Typography sx={{ fontSize: 11, fontWeight: 700 }}>{formatMonth(post.month, isAr)}</Typography>
                </Stack>
                <Typography sx={{ color: "rgba(0,0,0,0.22)", fontSize: 11 }}>/</Typography>
                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: "rgba(0,0,0,0.48)" }}>
                  <AccessTimeIcon sx={{ fontSize: 14 }} />
                  <Typography sx={{ fontSize: 11, fontWeight: 700 }}>
                    {post.readTime} {isAr ? "دقائق قراءة" : "min read"}
                  </Typography>
                </Stack>
              </Stack>

              <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 32, md: 46 }, fontWeight: 500, lineHeight: 1.15, color: "#111111" }}>
                {postTitle}
              </Typography>

              <Typography sx={{ color: "rgba(0,0,0,0.64)", fontSize: 18, lineHeight: 1.8, fontFamily: '"Cairo", sans-serif', borderLeft: !isAr ? "2.5px solid #CB6116" : "none", borderRight: isAr ? "2.5px solid #CB6116" : "none", pl: !isAr ? 2.5 : 0, pr: isAr ? 2.5 : 0 }}>
                {postExcerpt}
              </Typography>
            </Stack>
          </Container>
        </Box>

        {/* Feature Cover Image */}
        {post.image && (
          <Container maxWidth="lg" sx={{ mb: 6 }}>
            <Box 
              sx={{ 
                width: "100%", 
                maxHeight: { xs: 300, sm: 450, md: 580 }, 
                overflow: "hidden", 
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.05)"
              }}
            >
              <Box 
                component="img"
                src={post.image}
                alt={postTitle}
                sx={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover" 
                }}
              />
            </Box>
          </Container>
        )}

        {/* Portable Text Rich Content */}
        <Box component="section" sx={{ pb: 8 }}>
          <Container maxWidth="md">
            <Box sx={{ textAlign: isAr ? "right" : "left" }}>
              {Array.isArray(postContent) && postContent.length > 0 ? (
                <PortableText value={postContent} components={portableTextComponents} />
              ) : (
                <Typography sx={{ color: "rgba(0,0,0,0.64)", fontSize: 16.5, lineHeight: 1.85 }}>
                  {isAr ? "لا يوجد محتوى متوفر حالياً." : "No content available yet."}
                </Typography>
              )}
            </Box>

            <Divider sx={{ borderColor: "rgba(0,0,0,0.08)", my: 6 }} />

            {/* Author Card & Tags */}
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={4}>
              {/* Author details */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={post.author.imageUrl} alt={post.author.name} sx={{ width: 52, height: 52, border: "1px solid rgba(0,0,0,0.08)" }} />
                <Stack spacing={0.3} sx={{ textAlign: isAr ? "right" : "left" }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 14.5, color: "#111111" }}>{post.author.name}</Typography>
                  <Typography sx={{ fontSize: 12, color: "rgba(0,0,0,0.54)" }}>{authorRole}</Typography>
                </Stack>
              </Stack>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {post.tags.map((tag) => (
                    <Chip 
                      key={tag} 
                      label={tag} 
                      size="small"
                      sx={{ 
                        bgcolor: "rgba(0,0,0,0.04)", 
                        color: "rgba(0,0,0,0.64)", 
                        borderRadius: 0,
                        fontSize: 11,
                        fontWeight: 600,
                        fontFamily: '"Cairo", sans-serif'
                      }} 
                    />
                  ))}
                </Stack>
              )}
            </Stack>
          </Container>
        </Box>

      </Box>
    </ThemeProvider>
  );
}
