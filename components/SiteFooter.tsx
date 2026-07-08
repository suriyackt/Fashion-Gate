"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Button, Container, IconButton, InputBase, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useParams, useRouter, usePathname } from "next/navigation";

const footerTranslations = {
  en: {
    description: "Syria's first luxury department destination. Integrating fine apparel, curated beauty, and bespoke boutique shopping under a modern architectural vision.",
    explore: "Explore",
    updates: "Bespoke Updates",
    subscribeText: "Subscribe to receive private invitations, seasonal collection launches, and atelier journal notes.",
    emailPlaceholder: "Email address",
    copyright: "All rights reserved.",
    links: [
      { label: "Home", href: "" },
      { label: "Women", href: "#women" },
      { label: "Men", href: "#men" },
      { label: "Beauty", href: "#beauty" },
      { label: "Home & Deco", href: "#home-deco" },
      { label: "The Boulevard", href: "#boulevard" },
      { label: "Brand", href: "#brand" },
      { label: "Journal", href: "blogs" },
      { label: "Contact", href: "contact" },
      { label: "Atelier", href: "#brand" }
    ]
  },
  ar: {
    description: "أول وجهة للمتاجر الكبرى الفاخرة في سوريا. دمج الملابس الراقية، الجمال المنسق، والتسوق الحصري تحت رؤية معمارية حديثة.",
    explore: "استكشف",
    updates: "تحديثات مخصصة",
    subscribeText: "اشترك لتلقي الدعوات الخاصة، وإطلاق المجموعات الموسمية، وملاحظات مجلة الأتيلييه.",
    emailPlaceholder: "البريد الإلكتروني",
    copyright: "جميع الحقوق محفوظة.",
    links: [
      { label: "الرئيسية", href: "" },
      { label: "سيدات", href: "#women" },
      { label: "رجال", href: "#men" },
      { label: "جمال", href: "#beauty" },
      { label: "منزل وديكور", href: "#home-deco" },
      { label: "البوليفارد", href: "#boulevard" },
      { label: "العلامة", href: "#brand" },
      { label: "المدونة", href: "blogs" },
      { label: "اتصل بنا", href: "contact" },
      { label: "الأتيلييه", href: "#brand" }
    ]
  }
};

export default function SiteFooter() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const lang = (params?.lang === "en" ? "en" : "ar") as "en" | "ar";
  const t = footerTranslations[lang];

  const handleFooterClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const hash = href.replace("#", "");
      
      const categoryMap: Record<string, string> = {
        women: "women",
        men: "men",
        beauty: "beauty",
        "home-deco": "home-deco"
      };
      
      const categoryId = categoryMap[hash];
      const sectionId = categoryId ? "curated-departments" : hash;

      if (typeof window !== "undefined") {
        if (pathname !== `/${lang}`) {
          if (categoryId) {
            sessionStorage.setItem("pendingCategory", categoryId);
          } else {
            sessionStorage.setItem("pendingSection", sectionId);
          }
          router.push(`/${lang}`);
        } else {
          if (categoryId) {
            window.dispatchEvent(new CustomEvent("select-category", { detail: { category: categoryId } }));
          } else {
            const el = document.getElementById(sectionId);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
        }
      }
    }
  };

  return (
    <Box
      component="footer"
      dir={lang === "ar" ? "rtl" : "ltr"}
      sx={{
        bgcolor: "#FAF8F5",
        color: "#111111",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 10 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr 1fr" },
            gap: { xs: 5, md: 8 },
            alignItems: "start",
            pb: 6,
            borderBottom: "1px solid rgba(0,0,0,0.06)"
          }}
        >
          {/* Brand Info Column */}
          <Stack spacing={3} sx={{ textAlign: lang === "ar" ? "right" : "left" }}>
            <Box
              component={Link}
              href={`/${lang}`}
              onClick={(e) => {
                // Scroll smoothly to top if we are already on home page
                if (window.location.pathname === `/${lang}`) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1.5,
                alignItems: "center",
                textDecoration: "none",
                width: "fit-content",
                cursor: "pointer",
                "&:hover": { opacity: 0.85 }
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  display: "grid",
                  placeItems: "center",
                  bgcolor: "#111111",
                  borderRadius: 0
                }}
              >
                <Box component="img" src="/brand/logo.png" alt="Fashion Gate" sx={{ width: 28, height: "auto" }} />
              </Box>
              <Stack spacing={0.1} sx={{ textAlign: "left" }}>
                <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: 20, fontWeight: 600, color: "#111111", lineHeight: 1 }}>
                  Fashion Gate
                </Typography>
                <Typography sx={{ color: "primary.main", fontSize: 9, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  Boulevard Damascus
                </Typography>
              </Stack>
            </Box>

            <Typography sx={{ color: "rgba(0,0,0,0.6)", fontSize: 14.5, lineHeight: 1.8, maxWidth: 360 }}>
              {t.description}
            </Typography>
          </Stack>

          {/* Quick Links Column */}
          <Stack spacing={2.5} sx={{ textAlign: lang === "ar" ? "right" : "left" }}>
            <Typography sx={{ color: "#111111", fontSize: 12, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              {t.explore}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 1.5
              }}
            >
              {t.links.map((link, index) => {
                const isHash = link.href.startsWith("#");
                const destination = isHash 
                  ? `/${lang}${link.href}` 
                  : link.href === "" 
                    ? `/${lang}` 
                    : `/${lang}/${link.href}`;

                return (
                  <Typography
                    key={index}
                    component={Link}
                    href={destination}
                    onClick={(e) => {
                      if (isHash) {
                        handleFooterClick(e, link.href);
                      }
                    }}
                    sx={{
                      color: "rgba(0,0,0,0.6)",
                      fontSize: 13.5,
                      textDecoration: "none",
                      fontWeight: 500,
                      transition: "color 0.3s ease",
                      "&:hover": { color: "primary.main" }
                    }}
                  >
                    {link.label}
                  </Typography>
                );
              })}
            </Box>
          </Stack>

          {/* Newsletter Column */}
          <Stack spacing={2.5} sx={{ textAlign: lang === "ar" ? "right" : "left" }}>
            <Typography sx={{ color: "#111111", fontSize: 12, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              {t.updates}
            </Typography>
            <Typography sx={{ color: "rgba(0,0,0,0.6)", fontSize: 14, lineHeight: 1.6 }}>
              {t.subscribeText}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                borderBottom: "1.5px solid rgba(0,0,0,0.16)",
                py: 0.6
              }}
            >
              <InputBase
                placeholder={t.emailPlaceholder}
                sx={{
                  flex: 1,
                  px: 0.5,
                  fontSize: 14,
                  color: "#111111",
                  "& input::placeholder": { color: "rgba(0,0,0,0.42)", opacity: 1 }
                }}
              />
              <IconButton sx={{ color: "#111111", p: 0.5, "&:hover": { color: "primary.main" }, transform: lang === "ar" ? "rotate(180deg)" : "none" }}>
                <ArrowForwardIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Stack>
        </Box>

        {/* Bottom Bar */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
          sx={{ pt: 4 }}
        >
          <Typography sx={{ color: "rgba(0,0,0,0.48)", fontSize: 12.5 }}>
            © {new Date().getFullYear()} {lang === "ar" ? "فاشن جيت مول" : "Fashion Gate Mall"}. {t.copyright}
          </Typography>

          {/* Social Links */}
          <Stack direction="row" spacing={1.5}>
            {[InstagramIcon, FacebookIcon, WhatsAppIcon].map((Icon, idx) => (
              <IconButton
                key={idx}
                href="#"
                sx={{
                  width: 36,
                  height: 36,
                  color: "rgba(0,0,0,0.54)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  "&:hover": { color: "#ffffff", bgcolor: "primary.main", borderColor: "primary.main" }
                }}
              >
                <Icon sx={{ fontSize: 17 }} />
              </IconButton>
            ))}
          </Stack>
        </Stack>
      </Container>

      {/* Sleek Floating WhatsApp Button */}
      <IconButton
        href="#"
        aria-label="WhatsApp"
        sx={{
          position: "fixed",
          right: lang === "ar" ? "auto" : { xs: 16, md: 24 },
          left: lang === "ar" ? { xs: 16, md: 24 } : "auto",
          bottom: { xs: 16, md: 24 },
          zIndex: 90,
          bgcolor: "#111111",
          color: "#ffffff",
          width: 50,
          height: 50,
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.16)",
          transition: "all 0.3s ease",
          "&:hover": { bgcolor: "primary.main", transform: "translateY(-2px)" }
        }}
      >
        <WhatsAppIcon sx={{ fontSize: 22 }} />
      </IconButton>
    </Box>
  );
}
