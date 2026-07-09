"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import type { Section } from "@/lib/types";

export default function HeroSection({
  section,
  t,
  lang,
}: {
  section: Section;
  t: (s?: string) => string;
  lang: "ar" | "en";
}) {
  const image = "/brand/hero-woman-wide.png";

  return (
    <Box
      id={section.anchor}
      component="section"
      sx={{
        height: { xs: "calc(100svh - 100px)", md: "calc(100svh - 112px)" },
        minHeight: { xs: "calc(100svh - 100px)", md: "calc(100svh - 112px)" },
        position: "relative",
        overflow: "hidden",
        color: "#fff",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "right top",
          transform: "none",
          filter: "brightness(0.86)",
          zIndex: 1,
        },
      }}
    >
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
            {lang === "ar"
              ? "بوابة الأزياء"
              : section.headline || "Fashion Gate"}
          </Typography>

          <Typography
            sx={{
              fontFamily:
                '"Griphorium", "Griphosium", "Graphion", "Brush Script MT", cursive',
              fontSize: { xs: "1.1rem", sm: "1.7rem", md: "2.3rem" },
              color: "#ffffff",
              textTransform: "none",
              fontWeight: 400,
              alignSelf: lang === "ar" ? "flex-start" : "flex-end",
              textShadow: "0 4px 15px rgba(0,0,0,0.5)",
              mr: lang === "ar" ? 0 : { xs: 1, md: 3 },
              ml: lang === "ar" ? { xs: 1, md: 3 } : 0,
              mt: -0.5,
              lineHeight: 1.1,
              textAlign: lang === "ar" ? "left" : "right",
            }}
          >
            {lang === "ar" ? (
              <>
                أول متجر أقسام
                <br />
                دولي فاخر في سوريا
              </>
            ) : (
              <>
                {" "}
                <span>Syria's first international </span>
                <br />
                <span>luxury department store</span>
              </>
            )}
          </Typography>
        </Stack>
      </Box>

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
            {t(section.eyebrow) ||
              t("Syria's first international luxury department store")}
          </Typography>
          {section.ctaLabel && (
            <Button
              href={section.ctaHref || "#manifesto"}
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
                border: "1px solid rgba(255,255,255,.28)",
                px: 4,
                py: 1.4,
                borderRadius: 0,
                textTransform: "uppercase",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.15em",
                pointerEvents: "auto",
                fontFamily: '"Cairo", sans-serif',
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "#fff",
                  color: "#050505",
                  borderColor: "#fff",
                },
              }}
            >
              {t(section.ctaLabel)}
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
