"use client";

import { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Button, Container, IconButton, InputBase, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { getFooterSettings, getLocalizedValue } from "@/lib/sanity";

export default function SiteFooter() {
  const pathname = usePathname();
  const lang = (pathname?.endsWith("/ar") || pathname?.includes("/ar/") ? "ar" : "en") as "en" | "ar";
  
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    getFooterSettings().then((data) => {
      if (data) {
        setSettings(data);
      }
    });
  }, []);

  const description = getLocalizedValue(
    settings?.description,
    lang,
    lang === "ar"
      ? "أول وجهة للمتاجر الكبرى الفاخرة في سوريا. دمج الملابس الراقية، الجمال المنسق، والتسوق الحصري تحت رؤية معمارية حديثة."
      : "Syria's first luxury department destination. Integrating fine apparel, curated beauty, and bespoke boutique shopping under a modern architectural vision."
  );

  const exploreTitle = getLocalizedValue(
    settings?.exploreTitle,
    lang,
    lang === "ar" ? "استكشف" : "Explore"
  );

  const updatesTitle = getLocalizedValue(
    settings?.updatesTitle,
    lang,
    lang === "ar" ? "تحديثات مخصصة" : "Bespoke Updates"
  );

  const subscribeText = getLocalizedValue(
    settings?.subscribeText,
    lang,
    lang === "ar"
      ? "اشترك لتلقي الدعوات الخاصة، وإطلاق المجموعات الموسمية، وملاحظات مجلة الأتيلييه."
      : "Subscribe to receive private invitations, seasonal collection launches, and atelier journal notes."
  );

  const emailPlaceholder = getLocalizedValue(
    settings?.emailPlaceholder,
    lang,
    lang === "ar" ? "البريد الإلكتروني" : "Email address"
  );

  const copyrightText = getLocalizedValue(
    settings?.copyright,
    lang,
    lang === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."
  );

  const facebookUrl = settings?.facebookUrl || "#";
  const instagramUrl = settings?.instagramUrl || "#";
  const whatsAppUrl = settings?.whatsAppUrl || "#";
  const floatingWhatsAppUrl = settings?.floatingWhatsAppUrl || "#";

  // Resolve Quick Links
  const rawLinks = settings?.links || [
    { label: { en: "Home", ar: "الرئيسية" }, href: "" },
    { label: { en: "Women", ar: "سيدات" }, href: "#women" },
    { label: { en: "Men", ar: "رجال" }, href: "#men" },
    { label: { en: "Beauty", ar: "جمال" }, href: "#beauty" },
    { label: { en: "Home & Deco", ar: "منزل وديكور" }, href: "#home-deco" },
    { label: { en: "The Boulevard", ar: "البوليفارد" }, href: "#boulevard" },
    { label: { en: "Brand", ar: "العلامة" }, href: "about" },
    { label: { en: "Journal", ar: "المدونة" }, href: "blogs" },
    { label: { en: "Contact", ar: "اتصل بنا" }, href: "contact" },
    { label: { en: "Atelier", ar: "الأتيلييه" }, href: "about" }
  ];

  const links = rawLinks.map((link: any) => ({
    label: getLocalizedValue(link.label, lang),
    href: link.href || ""
  }));

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
      <Container maxWidth="xl" sx={{ pt: { xs: 8, md: 10 }, pb: 2 }}>
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
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ justifyContent: "flex-start" }}>
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
            </Stack>

            <Typography sx={{ color: "rgba(0,0,0,0.6)", fontSize: 14.5, lineHeight: 1.8, maxWidth: 360, fontFamily: '"Cairo", sans-serif' }}>
              {description}
            </Typography>
          </Stack>

          {/* Quick Links Column */}
          <Stack spacing={2.5} sx={{ textAlign: lang === "ar" ? "right" : "left" }}>
            <Typography sx={{ color: "#111111", fontSize: 12, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: '"Cairo", sans-serif' }}>
              {exploreTitle}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 1.5
              }}
            >
              {links.map((link: any, index: number) => {
                const destination = link.href.startsWith("#") 
                  ? `/${lang}${link.href}` 
                  : link.href === "" 
                    ? `/${lang}` 
                    : `/${link.href}/${lang}`;

                return (
                  <Typography
                    key={index}
                    component={Link}
                    href={destination}
                    sx={{
                      color: "rgba(0,0,0,0.6)",
                      fontSize: 13.5,
                      textDecoration: "none",
                      fontWeight: 500,
                      transition: "color 0.3s ease",
                      fontFamily: '"Cairo", sans-serif',
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
            <Typography sx={{ color: "#111111", fontSize: 12, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: '"Cairo", sans-serif' }}>
              {updatesTitle}
            </Typography>
            <Typography sx={{ color: "rgba(0,0,0,0.6)", fontSize: 14, lineHeight: 1.6, fontFamily: '"Cairo", sans-serif' }}>
              {subscribeText}
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
                placeholder={emailPlaceholder}
                sx={{
                  flex: 1,
                  px: 0.5,
                  fontSize: 14,
                  color: "#111111",
                  fontFamily: '"Cairo", sans-serif',
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
          direction={{ xs: "column", sm: lang === "ar" ? "row-reverse" : "row" }}
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
          sx={{ pt: 4, pb: 2 }}
        >
          <Typography sx={{ color: "rgba(0,0,0,0.48)", fontSize: 12.5, fontFamily: '"Cairo", sans-serif' }}>
            © {new Date().getFullYear()} {lang === "ar" ? "فاشن جيت مول" : "Fashion Gate Mall"}. {copyrightText}
          </Typography>

          {/* Social Links */}
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <IconButton
              href={instagramUrl}
              sx={{
                width: 36,
                height: 36,
                color: "rgba(0,0,0,0.54)",
                border: "1px solid rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                "&:hover": { color: "#ffffff", bgcolor: "primary.main", borderColor: "primary.main" }
              }}
            >
              <InstagramIcon sx={{ fontSize: 17 }} />
            </IconButton>
            <IconButton
              href={facebookUrl}
              sx={{
                width: 36,
                height: 36,
                color: "rgba(0,0,0,0.54)",
                border: "1px solid rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                "&:hover": { color: "#ffffff", bgcolor: "primary.main", borderColor: "primary.main" }
              }}
            >
              <FacebookIcon sx={{ fontSize: 17 }} />
            </IconButton>
            <IconButton
              href={whatsAppUrl}
              sx={{
                width: 36,
                height: 36,
                color: "rgba(0,0,0,0.54)",
                border: "1px solid rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                "&:hover": { color: "#ffffff", bgcolor: "primary.main", borderColor: "primary.main" }
              }}
            >
              <WhatsAppIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Box>
        </Stack>
      </Container>

      {/* Sleek Floating WhatsApp Button */}
      <IconButton
        href={floatingWhatsAppUrl}
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
