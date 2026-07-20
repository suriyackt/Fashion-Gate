"use client";

import { Box, Container, Typography, Button, Stack, Link as MuiLink } from "@mui/material";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

export default function ContactInquirySection({ lang }: { lang: "en" | "ar" }) {
  const isAr = lang === "ar";

  const content = {
    eyebrow: isAr ? "خدمات العملاء والكونسيرج" : "CLIENT SERVICES & CONCIERGE",
    headline: isAr
      ? "هل لديك أي استفسار؟ نحن هنا لمساعدتك."
      : "Have A Question? Speak With Our Concierge.",
    description: isAr
      ? "سواء كنت ترغب في حجز موعد معاينة شخصية للأزياء الفاخرة، أو الاستفسار عن المعارض ودور الفخامة في بوليفارد دمشق، فإن مستشارينا المخصصين متواجدون لمساعدتك."
      : "Whether you wish to reserve a private atelier viewing, inquire about luxury fashion collections, or plan your visit to Damascus Boulevard, our client advisors are at your service.",
    btnText: isAr ? "تواصل معنا الآن" : "Contact Client Services",
    whatsappText: isAr ? "المحادثة الفورية عبر الواتساب" : "Chat on WhatsApp",
    hoursLabel: isAr ? "أوقات الخدمة" : "Concierge Hours",
    hoursVal: isAr ? "الاثنين – السبت: ١١:٠٠ ص – ٩:٠٠ م" : "Monday – Saturday: 11:00 am – 9:00 pm",
    locationLabel: isAr ? "الموقع" : "Location",
    locationVal: isAr ? "حي بوليفارد دمشق، دمشق، سوريا" : "Damascus Boulevard District, Damascus, Syria",
    emailLabel: isAr ? "البريد الإلكتروني" : "Digital Concierge",
    emailVal: "concierge@fashiongate.sy"
  };

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        py: { xs: 8, md: 12 },
        bgcolor: "#050505",
        color: "#FFF",
        overflow: "hidden",
        borderTop: "1px solid rgba(203, 97, 22, 0.2)",
        borderBottom: "1px solid rgba(203, 97, 22, 0.2)"
      }}
    >
      {/* Background Ambient Glow Effects */}
      <Box
        sx={{
          position: "absolute",
          top: "-20%",
          left: isAr ? "auto" : "-10%",
          right: isAr ? "-10%" : "auto",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(203,97,22,0.15) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(60px)",
          pointerEvents: "none"
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-20%",
          right: isAr ? "auto" : "-10%",
          left: isAr ? "-10%" : "auto",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(208,96,16,0.12) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(60px)",
          pointerEvents: "none"
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
          {/* Left / Info Column */}
          <Grid size={{ xs: 12, md: 7 }}>
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Eyebrow */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 2,
                  py: 0.6,
                  bgcolor: "rgba(203, 97, 22, 0.12)",
                  border: "1px solid rgba(203, 97, 22, 0.3)",
                  borderRadius: "2px",
                  mb: 3
                }}
              >
                <Typography
                  sx={{
                    color: "#CB6116",
                    fontSize: { xs: 11, sm: 12 },
                    fontWeight: 700,
                    letterSpacing: isAr ? "0.05em" : "0.25em",
                    textTransform: "uppercase",
                    fontFamily: '"Cairo", sans-serif'
                  }}
                >
                  {content.eyebrow}
                </Typography>
              </Box>

              {/* Headline */}
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3.1rem" },
                  fontWeight: 300,
                  lineHeight: 1.25,
                  color: "#FFF",
                  fontFamily: '"Cairo", sans-serif',
                  mb: 2.5
                }}
              >
                {content.headline}
              </Typography>

              {/* Description */}
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.72)",
                  fontSize: { xs: 15, md: 16.5 },
                  lineHeight: 1.75,
                  maxWidth: "600px",
                  fontFamily: '"Cairo", sans-serif',
                  mb: 4
                }}
              >
                {content.description}
              </Typography>

              {/* Quick Contact Details Row */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ mb: 4.5 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                  <LocationOnOutlinedIcon sx={{ color: "#CB6116", fontSize: 22, mt: 0.3 }} />
                  <Box>
                    <Typography sx={{ color: "rgba(255,255,255,0.45)", fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      {content.locationLabel}
                    </Typography>
                    <Typography sx={{ color: "#FFF", fontSize: 13.5, fontWeight: 500, mt: 0.2 }}>
                      {content.locationVal}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                  <EmailOutlinedIcon sx={{ color: "#CB6116", fontSize: 22, mt: 0.3 }} />
                  <Box>
                    <Typography sx={{ color: "rgba(255,255,255,0.45)", fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      {content.emailLabel}
                    </Typography>
                    <MuiLink
                      href={`mailto:${content.emailVal}`}
                      underline="none"
                      sx={{ underline: "none", underlineHover: "underline", color: "#FFF", fontSize: 13.5, fontWeight: 500, mt: 0.2, transition: "color 0.2s", "&:hover": { color: "#CB6116" } }}
                    >
                      {content.emailVal}
                    </MuiLink>
                  </Box>
                </Box>
              </Stack>

              {/* Action Buttons */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  component={Link}
                  href={`/contact/${lang}`}
                  endIcon={isAr ? <ArrowBackIcon /> : <ArrowForwardIcon />}
                  sx={{
                    bgcolor: "#CB6116",
                    color: "#FFF",
                    px: { xs: 3, sm: 4 },
                    py: 1.5,
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: isAr ? 0 : "0.1em",
                    borderRadius: "2px",
                    boxShadow: "0 10px 30px rgba(203, 97, 22, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "#E06D1A",
                      boxShadow: "0 15px 40px rgba(203, 97, 22, 0.5)",
                      transform: "translateY(-2px)"
                    }
                  }}
                >
                  {content.btnText}
                </Button>

                <Button
                  component="a"
                  href="https://wa.me/963930000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<WhatsAppIcon sx={{ color: "#25D366" }} />}
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                    color: "#FFF",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    px: { xs: 3, sm: 3.5 },
                    py: 1.5,
                    fontSize: 14,
                    fontWeight: 600,
                    borderRadius: "2px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.12)",
                      borderColor: "rgba(37, 211, 102, 0.6)",
                      transform: "translateY(-2px)"
                    }
                  }}
                >
                  {content.whatsappText}
                </Button>
              </Stack>
            </MotionBox>
          </Grid>

          {/* Right / Visual Showcase Image Column */}
          <Grid size={{ xs: 12, md: 5 }}>
            <MotionBox
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              sx={{
                position: "relative",
                width: "100%",
                borderRadius: "4px",
                overflow: "hidden",
                border: "1px solid rgba(203, 97, 22, 0.3)",
                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.8)",
                "&:hover img": {
                  transform: "scale(1.04)"
                }
              }}
            >
              <Box
                component="img"
                src="/brand-pages/contact_bg.png"
                alt="Fashion Gate Client Services"
                sx={{
                  width: "100%",
                  height: { xs: "280px", sm: "360px", md: "440px" },
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.8s ease"
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.1) 100%)"
                }}
              />

              {/* Overlaid Badge */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 24,
                  left: 24,
                  right: 24,
                  p: 2.5,
                  bgcolor: "rgba(10, 10, 10, 0.85)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(203, 97, 22, 0.35)",
                  borderRadius: "2px"
                }}
              >
                <Typography
                  sx={{
                    color: "#CB6116",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: isAr ? 0 : "0.2em",
                    textTransform: "uppercase",
                    fontFamily: '"Cairo", sans-serif',
                    mb: 0.5
                  }}
                >
                  FASHION GATE CONCIERGE
                </Typography>
                <Typography
                  sx={{
                    color: "#FFF",
                    fontSize: 13.5,
                    fontWeight: 500,
                    fontFamily: '"Cairo", sans-serif'
                  }}
                >
                  {content.hoursVal}
                </Typography>
              </Box>
            </MotionBox>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
