"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import type { Section } from "@/lib/types";
import { imageUrl, getLocalizedValue } from "@/lib/sanity";
import Link from "next/link";

export default function HeroSection({
  section,
  t,
  lang,
}: {
  section: Section;
  t: (s?: string) => string;
  lang: "ar" | "en";
}) {
  console.log("HERO SECTION PROP IN COMPONENT:", JSON.stringify(section, null, 2));
  // Resolve background video or image URL dynamically
  const isVideoBg = section.bgType === "video" && (section.bgVideo?.asset?.url || section.video?.asset?.url);

  let bgImageUrl = "/brand-pages/page_01.jpg";
  if (section.bgImage?.asset) {
    try {
      bgImageUrl = imageUrl(section.bgImage).url() || bgImageUrl;
    } catch (e) {
      console.error("Failed to parse section.bgImage url", e);
    }
  } else if (section.image?.asset) {
    try {
      bgImageUrl = imageUrl(section.image).url() || bgImageUrl;
    } catch (e) {
      console.error("Failed to parse section.image url", e);
    }
  } else if (section.imageUrl) {
    bgImageUrl = section.imageUrl;
  }

  // Resolve Headline dynamically
  const headlineText = getLocalizedValue(
    section.headline,
    lang,
    lang === "ar"
      ? (section.headlineAr || "بوابة الأزياء")
      : (section.headlineEn || "Fashion Gate")
  );

  // Resolve Subheadlines dynamically
  const subHeadlineLine1 = getLocalizedValue(
    section.subHeadlineLine1,
    lang,
    lang === "ar"
      ? (section.subHeadlineArLine1 || "أول متجر أقسام")
      : (section.subHeadlineEnLine1 || "Syria's first international")
  );

  const subHeadlineLine2 = getLocalizedValue(
    section.subHeadlineLine2,
    lang,
    lang === "ar"
      ? (section.subHeadlineArLine2 || "دولي فاخر في سوريا")
      : (section.subHeadlineEnLine2 || "luxury department store")
  );

  // Resolve Eyebrow dynamically
  const eyebrowText = getLocalizedValue(
    section.eyebrow,
    lang,
    lang === "ar"
      ? (section.eyebrowAr || "فاشن جيت بوليفارد")
      : (section.eyebrowEn || "Fashion Gate Boulevard")
  );

  // Resolve CTA Button dynamically
  const ctaLabel = getLocalizedValue(
    section.cta?.label,
    lang,
    lang === "ar"
      ? (section.cta?.labelAr || "من نحن")
      : (section.cta?.labelEn || section.ctaLabel || "About Us")
  );

  let ctaHref = section.ctaHref || `/about/${lang}`;
  if (section.cta) {
    if (section.cta.linkType === "internal") {
      const path = section.cta.internalLink || "/";
      ctaHref = path === "/" ? `/${lang}` : `${path}/${lang}`;
    } else {
      ctaHref = section.cta.externalLink || section.cta.href || `/about/${lang}`;
    }
  }
  const ctaType = section.cta?.type || "primary";

  return (
    <Box
      id={section.anchor || "arrival"}
      component="section"
      sx={{
        height: { xs: "calc(100svh - 105px)", md: "calc(100svh - 148px)" },
        minHeight: { xs: "calc(100svh - 105px)", md: "calc(100svh - 148px)" },
        position: "relative",
        overflow: "hidden",
        color: "#fff",
      }}
    >
      {/* Background Media Render */}
      {isVideoBg ? (
        <Box
          component="video"
          autoPlay
          loop
          muted
          playsInline
          src={section.bgVideo?.asset?.url || section.video?.asset?.url}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.86)",
            zIndex: 1,
          }}
        />
      ) : (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${bgImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "right top",
            filter: "brightness(0.86)",
            zIndex: 1,
          }}
        />
      )}

      {/* Typography Overlay Area */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: 3,
          textAlign: "center",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <Stack
          spacing={0.5}
          alignItems="flex-end"
          sx={{ maxWidth: "100%", width: "fit-content" }}
        >
          {/* Headline */}
          <Typography
            component="h1"
            className="animate-tracking"
            sx={{
              fontFamily: "var(--heading-font)",
              fontSize: {
                xs: "2.4rem",
                sm: "4.2rem",
                md: "6rem",
                lg: "7.8rem",
              },
              fontWeight: 500,
              lineHeight: 0.9,
              textTransform: "uppercase",
              color: "#ffffffb5",
              letterSpacing: lang === "ar" ? "0.02em" : "0.06em",
              textShadow: "0 4px 25px rgba(0,0,0,0.5)",
              textAlign: "center",
            }}
          >
            {headlineText}
          </Typography>

          {/* Subheadline (Double Line) */}
          <Typography
            sx={{
              fontFamily: '"Griphorium", "Griphosium", "Graphion", "Brush Script MT", cursive',
              fontSize: { xs: "1.1rem", sm: "1.7rem", md: "2.3rem" },
              color: "#ffffffb5",
              textTransform: "none",
              fontWeight: 400,
              alignSelf: lang === "ar" ? "flex-start" : "flex-end",
              mr: lang === "ar" ? 0 : { xs: 1, md: 3 },
              ml: lang === "ar" ? { xs: 1, md: 3 } : 0,
              mt: -0.5,
              lineHeight: 1.1,
              textAlign: lang === "ar" ? "left" : "right",
            }}
          >
            {lang === "ar" ? (
              <>
                <span style={{ marginLeft: "60px" }}>{subHeadlineLine1}</span>
                <br />
                <span>{subHeadlineLine2}</span>
              </>
            ) : (
              <>
                <span style={{ marginRight: "50px" }}>{subHeadlineLine1}</span>
                <br />
                <span>{subHeadlineLine2}</span>
              </>
            )}
          </Typography>
        </Stack>
      </Box>

      {/* Footer Info & CTA */}
      <Container
        maxWidth="xl"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 12,
          pb: { xs: 3, md: 5 },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 2.5, md: 3 }}
          alignItems={{ xs: "flex-start", md: "center" }}
          sx={{ width: "100%", justifyContent: "space-between" }}
        >
          {/* Eyebrow Label */}
          <Typography
            className="animate-fade-in"
            sx={{
              maxWidth: 540,
              color: "rgba(255,255,255,.6)",
              fontSize: { xs: 10, md: 11 },
              letterSpacing: "0.18em",
              lineHeight: 1.7,
              textTransform: "uppercase",
              fontFamily: '"Cairo", sans-serif',
            }}
          >
            {eyebrowText}
          </Typography>

          {/* CTA Link Button */}
          {ctaLabel && (
            <Button
              component={Link}
              href={ctaHref}
              endIcon={
                <ArrowForwardIcon
                  sx={{
                    mr: lang === "ar" ? 1 : 0,
                    ml: lang === "ar" ? 0 : 1,
                    transform: lang === "ar" ? "rotate(180deg)" : "none",
                  }}
                />
              }
              sx={{
                color: "#fff",
                border: ctaType === "link" ? "none" : "1px solid rgba(255,255,255,.28)",
                px: ctaType === "link" ? 1 : 4,
                py: ctaType === "link" ? 0.5 : 1.4,
                borderRadius: 0,
                textTransform: "none",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.15em",
                pointerEvents: "auto",
                fontFamily: '"Cairo", sans-serif',
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: ctaType === "link" ? "transparent" : "#fff",
                  color: ctaType === "link" ? "primary.main" : "#050505",
                  borderColor: ctaType === "link" ? "none" : "#fff",
                },
              }}
            >
              {ctaLabel}
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
