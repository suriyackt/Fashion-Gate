"use client";

import { Box, Container, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";

import { getLocalizedValue } from "@/lib/sanity";

const MotionBox = motion.create(Box);

export default function ContactInquirySection({
  lang,
  section
}: {
  lang: "en" | "ar";
  section?: any;
}) {
  const isAr = lang === "ar";

  const eyebrowText = getLocalizedValue(
    section?.eyebrow,
    lang,
    isAr ? "خدمات الكونسيرج الخاصة" : "CLIENT SERVICES & CONCIERGE"
  );

  const headlineText = getLocalizedValue(
    section?.headline,
    lang,
    isAr ? "هل لديك أي استفسار؟ تواصل مع الكونسيرج." : "Have a Question? Speak With Our Concierge."
  );

  const subtitleText = getLocalizedValue(
    section?.subtitle,
    lang,
    isAr
      ? "تواصل مع مستشاري الكونسيرج لحجز معاينات شخصية للأزياء الفاخرة، أو طلبات الخياطة الخاصة، أو الاستفسارات في بوليفارد دمشق."
      : "Reach out to our client advisors for private atelier appointments, bespoke fittings, and boutique guidance at Damascus Boulevard."
  );

  const buttonTextVal = getLocalizedValue(
    section?.buttonText,
    lang,
    isAr ? "تواصل معنا الآن" : "Contact Client Services"
  );

  const rawPath = section?.buttonPath || "/contact";
  const buttonHref = rawPath.startsWith("/") ? `${rawPath}/${lang}` : `/${rawPath}/${lang}`;
  const modelImageUrl = section?.modelImage?.asset?.url || "/brand/hero-woman.jpg";

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        py: { xs: 9, md: 13 },
        bgcolor: "#F7F6F2", // Luminous light mode pearl alabaster
        color: "#111111",
        overflow: "hidden",
        borderTop: "1px solid #EAE6DF",
        borderBottom: "1px solid #EAE6DF"
      }}
    >
      {/* Background Subtle Magazine Typography Watermark */}
      <Typography
        sx={{
          position: "absolute",
          top: "50%",
          left: isAr ? "auto" : "5%",
          right: isAr ? "5%" : "auto",
          transform: "translateY(-50%)",
          fontSize: { xs: "5rem", sm: "8rem", md: "11rem" },
          fontWeight: 900,
          color: "rgba(17, 17, 17, 0.035)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          userSelect: "none",
          pointerEvents: "none",
          fontFamily: '"Cairo", sans-serif',
          whiteSpace: "nowrap"
        }}
      >
        {isAr ? "فاشن غيت" : "CONCIERGE"}
      </Typography>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Grid container spacing={{ xs: 6, md: 9 }} alignItems="center">
          {/* Left Column: Bold Magazine Typography & Button */}
          <Grid size={{ xs: 12, md: 7 }}>
            <MotionBox
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Minimalist Solid Eyebrow Badge */}
              <Box
                sx={{
                  display: "inline-block",
                  px: 2,
                  py: 0.6,
                  bgcolor: "#111111",
                  color: "#FFFFFF",
                  borderRadius: "2px",
                  mb: 3
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 10.5, sm: 11 },
                    fontWeight: 700,
                    letterSpacing: isAr ? 0 : "0.25em",
                    textTransform: "uppercase",
                    fontFamily: '"Cairo", sans-serif'
                  }}
                >
                  {eyebrowText}
                </Typography>
              </Box>

              {/* Bold Striking Headline */}
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2.2rem", sm: "3.2rem", md: "3.8rem" },
                  fontWeight: 800, // Bold font weight as requested
                  lineHeight: 1.14,
                  color: "#111111",
                  letterSpacing: isAr ? 0 : "-0.03em",
                  fontFamily: '"Cairo", sans-serif',
                  mb: 3
                }}
              >
                {headlineText}
              </Typography>

              {/* Subtitle */}
              <Typography
                sx={{
                  color: "#555555",
                  fontSize: { xs: 15.5, sm: 17 },
                  fontWeight: 400,
                  lineHeight: 1.75,
                  maxWidth: "560px",
                  fontFamily: '"Cairo", sans-serif',
                  mb: 4.5
                }}
              >
                {subtitleText}
              </Typography>

              {/* High-Fashion Contact Button */}
              <Button
                component={Link}
                href={buttonHref}
                endIcon={isAr ? <ArrowBackIcon /> : <ArrowForwardIcon />}
                sx={{
                  bgcolor: "#111111",
                  color: "#FFFFFF",
                  border: "1px solid #111111",
                  borderBottom: "2px solid #CB6116", // Subtle gold accent line
                  px: { xs: 4, sm: 5 },
                  py: 1.8,
                  fontSize: { xs: 13.5, sm: 14.5 },
                  fontWeight: 700,
                  letterSpacing: isAr ? 0 : "0.12em",
                  textTransform: "uppercase",
                  borderRadius: "2px",
                  boxShadow: "0 10px 30px rgba(17, 17, 17, 0.14)",
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  "& .MuiButton-endIcon": {
                    transition: "transform 0.3s ease"
                  },
                  "&:hover": {
                    bgcolor: "#000000",
                    borderColor: "#000000",
                    borderBottomColor: "#E06D1A",
                    boxShadow: "0 18px 42px rgba(17, 17, 17, 0.28)",
                    transform: "translateY(-3px)",
                    "& .MuiButton-endIcon": {
                      transform: isAr ? "translateX(-6px)" : "translateX(6px)"
                    }
                  }
                }}
              >
                {buttonTextVal}
              </Button>
            </MotionBox>
          </Grid>

          {/* Right Column: Layered Fashion Model Portrait Frame */}
          <Grid size={{ xs: 12, md: 5 }}>
            <MotionBox
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: { xs: "320px", md: "100%" },
                mx: "auto"
              }}
            >
              {/* Offset Decorative Gold Wireframe Background */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  transform: isAr ? "translate(-14px, 14px)" : "translate(14px, 14px)",
                  border: "1.5px solid #D9CEBE",
                  borderRadius: "3px",
                  pointerEvents: "none",
                  zIndex: 0
                }}
              />

              {/* Main Model Portrait Card */}
              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                  borderRadius: "3px",
                  overflow: "hidden",
                  border: "1px solid #E2DDD5",
                  boxShadow: "0 25px 55px rgba(0, 0, 0, 0.09)",
                  "&:hover img": {
                    transform: "scale(1.04)"
                  }
                }}
              >
                <Box
                  component="img"
                  src={modelImageUrl}
                  alt="Fashion Gate Concierge Model"
                  sx={{
                    width: "100%",
                    height: { xs: "340px", sm: "420px", md: "460px" },
                    objectFit: "cover",
                    objectPosition: "center top",
                    display: "block",
                    transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(17, 17, 17, 0.4) 0%, rgba(17, 17, 17, 0) 50%)"
                  }}
                />
              </Box>
            </MotionBox>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
