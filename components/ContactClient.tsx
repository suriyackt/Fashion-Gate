"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Button, Container, InputBase, Stack, ThemeProvider, Typography, createTheme, Card } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SiteFooter from "@/components/SiteFooter";

const MotionBox = motion.create(Box);

interface ContactClientProps {
  initialLang: "ar" | "en";
}

export default function ContactClient({ initialLang }: ContactClientProps) {
  const router = useRouter();
  const lang = initialLang;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLangTransitioning, setIsLangTransitioning] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setIsLangTransitioning(false);
  }, [initialLang]);

  // Intercept nav clicks to play loaders
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleGlobalClick = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      while (target && target !== document.body) {
        if (target.tagName === "A") {
          const href = target.getAttribute("href");
          if (href && (href.includes("/product/") || href.endsWith("/blogs"))) {
            setPageLoading(true);
            break;
          }
        }
        target = target.parentElement;
      }
    };
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  const handleLangToggle = () => {
    setIsLangTransitioning(true);
    setTimeout(() => {
      router.push(`/${lang === "en" ? "ar" : "en"}/contact`);
    }, 250);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  const theme = createTheme({
    palette: {
      mode: "light",
      primary: { main: "#CB6116", dark: "#9D430C" },
      secondary: { main: "#000000" }
    },
    typography: {
      fontFamily: `"Cairo", sans-serif`,
      button: { fontWeight: 700 }
    },
    shape: { borderRadius: 0 }
  });

  const translations = {
    en: {
      title: "Contact Concierge",
      subtitle: "Connect with the Damascus Atelier",
      desc: "Our private concierge coordinates viewings, custom sizing requests, and international acquisitions.",
      name: "Your Name",
      email: "Email Address",
      subject: "Subject",
      message: "Message Details",
      send: "Send Inquiry",
      successTitle: "Inquiry Received",
      successDesc: "Your details have been registered. A private advisor will contact you within 24 hours.",
      addressTitle: "The Damascus Atelier",
      addressBody: "Fashion Gate Avenue, Boulevard District, Damascus, Syria",
      hoursTitle: "Private Salon Hours",
      hoursBody: "Monday – Saturday: 11:00 AM – 9:00 PM",
      phone: "Concierge Phone",
      emailTitle: "Digital Inquiries",
      home: "Home",
      blogs: "Blogs",
      contact: "Contact"
    },
    ar: {
      title: "اتصل بالمستشار الخاص",
      subtitle: "تواصل مع أتيلييه دمشق",
      desc: "ينسق مستشارنا الخاص المعاينات الفردية، وطلبات المقاسات الخاصة، والاقتناء الدولي.",
      name: "الاسم الكريم",
      email: "البريد الإلكتروني",
      subject: "الموضوع",
      message: "تفاصيل الرسالة",
      send: "إرسال الطلب",
      successTitle: "تم استلام طلبك",
      successDesc: "تم تسجيل تفاصيلك بنجاح. سيتصل بك مستشارنا الخاص في غضون ٢٤ ساعة.",
      addressTitle: "أتيلييه دمشق",
      addressBody: "شارع بوابة الأزياء، حي البوليفارد، دمشق، سوريا",
      hoursTitle: "أوقات الصالون الخاص",
      hoursBody: "الاثنين – السبت: ١١:٠٠ صباحاً – ٩:٠٠ مساءً",
      phone: "هاتف المستشار",
      emailTitle: "الاستفسارات الرقمية",
      home: "الرئيسية",
      blogs: "المدونة",
      contact: "اتصل بنا"
    }
  };

  const t = translations[lang];

  return (
    <ThemeProvider theme={theme}>
      <Box 
        dir={lang === "ar" ? "rtl" : "ltr"}
        sx={{ 
          bgcolor: "#FAF8F5", // Sand cream matching page background
          color: "#111111", 
          minHeight: "100vh",
          position: "relative"
        }}
      >
        {/* Unified Cinematic Dark Preloader */}
        <AnimatePresence>
          {pageLoading && (
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              sx={{
                position: "fixed",
                inset: 0,
                zIndex: 99999,
                bgcolor: "#050505",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Stack spacing={3.5} alignItems="center">
                <motion.img
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src="/brand/logo.png"
                  alt="Fashion Gate"
                  style={{ width: "80px", maxWidth: "100px", height: "auto", objectFit: "contain" }}
                />
                
                <MotionBox
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  sx={{ textAlign: "center" }}
                >
                  <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: "1.4rem", fontWeight: 500, letterSpacing: "0.25em", color: "#ffffff", textTransform: "uppercase" }}>
                    FASHION GATE
                  </Typography>
                  <Typography sx={{ fontFamily: '"Cairo", sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: "0.4em", color: "#CB6116", textTransform: "uppercase", mt: 0.5 }}>
                    BOULEVARD
                  </Typography>
                </MotionBox>
                
                <Box sx={{ width: 120, height: 1.5, bgcolor: "rgba(255,255,255,0.15)", mt: 3, position: "relative", overflow: "hidden" }}>
                  <MotionBox 
                    initial={{ left: "-100%" }}
                    animate={{ left: "0%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    sx={{ position: "absolute", top: 0, bottom: 0, width: "100%", bgcolor: "#CB6116" }}
                  />
                </Box>
              </Stack>
            </MotionBox>
          )}
        </AnimatePresence>

        {/* Outer background color stays opaque, inner box transitions to hide flashes */}
        <Box sx={{ opacity: isLangTransitioning ? 0 : 1, transition: "opacity 0.25s ease-in-out" }}>
          
          {/* Header Bar */}
          <Box 
            component="header"
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 100,
              bgcolor: "#FAF8F5",
              borderBottom: "1px solid rgba(0,0,0,0.06)"
            }}
          >
            <Stack direction="row" alignItems="center" sx={{ minHeight: { xs: 64, md: 74 }, px: { xs: 2.5, md: 4 } }}>
              <Button component={Link} href={`/${lang}`} sx={{ color: "#111111", px: 0, minWidth: 0, textTransform: "none" }}>
                <Stack direction="row" gap={lang === "ar" ? 3.5 : 2} alignItems="center">
                  <Box component="img" src="/brand/logo.png" alt="Fashion Gate" sx={{ height: { xs: 32, md: 38 }, width: "auto", filter: "invert(1)" }} />
                  <Stack spacing={0.1} sx={{ display: { xs: "none", sm: "flex" }, textAlign: "left" }}>
                    <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: 16, fontWeight: 600, color: "#111111", lineHeight: 1, letterSpacing: "0.08em" }}>
                      Fashion Gate
                    </Typography>
                    <Typography sx={{ fontSize: 8, color: "rgba(0,0,0,0.48)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      On Boulevard. For the world.
                    </Typography>
                  </Stack>
                </Stack>
              </Button>

              <Stack direction="row" gap={{ xs: 2.5, md: 4 }} alignItems="center" sx={{ ml: "auto" }}>
                <Button component={Link} href={`/${lang}`} sx={{ color: "rgba(0,0,0,0.64)", px: 0, minWidth: 0, fontSize: 11, letterSpacing: "0.16em", fontWeight: 700, fontFamily: '"Cairo", sans-serif', "&:hover": { color: "primary.main" } }}>
                  {t.home}
                </Button>
                <Button component={Link} href={`/${lang}/blogs`} sx={{ color: "rgba(0,0,0,0.64)", px: 0, minWidth: 0, fontSize: 11, letterSpacing: "0.16em", fontWeight: 700, fontFamily: '"Cairo", sans-serif', "&:hover": { color: "primary.main" } }}>
                  {t.blogs}
                </Button>
                <Button component={Link} href={`/${lang}/contact`} sx={{ color: "primary.main", px: 0, minWidth: 0, fontSize: 11, letterSpacing: "0.16em", fontWeight: 700, fontFamily: '"Cairo", sans-serif' }}>
                  {t.contact}
                </Button>
                
                {/* Language Switch */}
                <Button 
                  onClick={handleLangToggle}
                  sx={{ 
                    color: "primary.main", 
                    textTransform: "uppercase", 
                    fontSize: 10, 
                    fontWeight: 800, 
                    letterSpacing: "0.15em",
                    px: 1.2,
                    py: 0.4,
                    border: "1px solid",
                    borderColor: "primary.main",
                    borderRadius: 0,
                    fontFamily: '"Cairo", sans-serif',
                    "&:hover": { bgcolor: "rgba(203, 97, 22, 0.08)" }
                  }}
                >
                  {lang === "ar" ? "EN" : "AR"}
                </Button>
              </Stack>
            </Stack>
          </Box>

          {/* Contact Main Hero Section */}
          <Box 
            sx={{ 
              position: "relative",
              minHeight: { xs: "auto", md: 680 },
              display: "flex",
              alignItems: "center",
              py: { xs: 8, md: 12 },
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                backgroundImage: "url(/brand-pages/contact_bg.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "brightness(0.24)",
                zIndex: 1
              }
            }}
          >
            <Container maxWidth="xl" sx={{ position: "relative", zIndex: 10 }}>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" }, gap: { xs: 6, md: 8, lg: 10 }, alignItems: "stretch" }}>
                
                {/* Left Column: Contact Details (Glassmorphic details card) */}
                <Box sx={{ display: "flex" }}>
                  <Card 
                    sx={{ 
                      p: { xs: 4, md: 6 }, 
                      bgcolor: "rgba(255,255,255,0.04)", 
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 0,
                      color: "#ffffff",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between"
                    }}
                  >
                    <Stack spacing={4.5}>
                      <Box>
                        <Typography sx={{ color: "primary.main", textTransform: "uppercase", fontSize: 10, fontWeight: 800, letterSpacing: "0.22em", mb: 1 }}>
                          {t.title}
                        </Typography>
                        <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 28, md: 36 }, fontWeight: 500, lineHeight: 1.15 }}>
                          {t.subtitle}
                        </Typography>
                        <Typography sx={{ color: "rgba(255,255,255,0.64)", fontSize: 13.5, lineHeight: 1.7, mt: 2 }}>
                          {t.desc}
                        </Typography>
                      </Box>

                      <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.08)", pt: 4 }}>
                        <Stack spacing={3}>
                          {/* Address */}
                          <Stack spacing={0.5}>
                            <Typography sx={{ color: "primary.main", fontSize: 10, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                              {t.addressTitle}
                            </Typography>
                            <Typography sx={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>
                              {t.addressBody}
                            </Typography>
                          </Stack>

                          {/* Hours */}
                          <Stack spacing={0.5}>
                            <Typography sx={{ color: "primary.main", fontSize: 10, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                              {t.hoursTitle}
                            </Typography>
                            <Typography sx={{ fontSize: 14, color: "rgba(255,255,255,0.85)" }}>
                              {t.hoursBody}
                            </Typography>
                          </Stack>

                          {/* Inquiries */}
                          <Stack spacing={0.5}>
                            <Typography sx={{ color: "primary.main", fontSize: 10, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                              {t.emailTitle}
                            </Typography>
                            <Typography sx={{ fontSize: 14, color: "rgba(255,255,255,0.85)" }}>
                              concierge@fashiongate.sy
                            </Typography>
                          </Stack>
                        </Stack>
                      </Box>
                    </Stack>

                    {/* Showroom concierges & WhatsApp */}
                    <Box sx={{ mt: 5, borderTop: "1px solid rgba(255,255,255,0.08)", pt: 4 }}>
                      <Button
                        href="#"
                        startIcon={<WhatsAppIcon sx={{ mr: lang === "ar" ? 0 : 1, ml: lang === "ar" ? 1 : 0 }} />}
                        sx={{
                          bgcolor: "#CB6116",
                          color: "#ffffff",
                          px: 3,
                          py: 1.2,
                          borderRadius: 0,
                          fontSize: 12,
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          fontFamily: '"Cairo", sans-serif',
                          "&:hover": { bgcolor: "#9D430C" }
                        }}
                      >
                        {t.phone}
                      </Button>
                    </Box>
                  </Card>
                </Box>

                {/* Right Column: Interaction Form */}
                <Box>
                  <Card 
                    sx={{ 
                      p: { xs: 4, md: 6 }, 
                      bgcolor: "#ffffff",
                      border: "1px solid rgba(0,0,0,0.04)",
                      borderRadius: 0,
                      boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {!submitted ? (
                        <motion.form
                          key="contact-form"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          onSubmit={handleSubmit}
                        >
                          <Stack spacing={3.5}>
                            
                            {/* Input Fields */}
                            <Stack spacing={1}>
                              <Typography sx={{ fontSize: 11, fontWeight: 800, color: "#111111", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                                {t.name} *
                              </Typography>
                              <Box sx={{ borderBottom: "1.5px solid rgba(0,0,0,0.12)", py: 0.5 }}>
                                <InputBase
                                  required
                                  fullWidth
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  placeholder="e.g. Damascus guest"
                                  sx={{ fontSize: 14, color: "#111111", fontFamily: '"Cairo", sans-serif' }}
                                />
                              </Box>
                            </Stack>

                            <Stack spacing={1}>
                              <Typography sx={{ fontSize: 11, fontWeight: 800, color: "#111111", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                                {t.email} *
                              </Typography>
                              <Box sx={{ borderBottom: "1.5px solid rgba(0,0,0,0.12)", py: 0.5 }}>
                                <InputBase
                                  required
                                  type="email"
                                  fullWidth
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  placeholder="concierge@luxury.com"
                                  sx={{ fontSize: 14, color: "#111111", fontFamily: '"Cairo", sans-serif' }}
                                />
                              </Box>
                            </Stack>

                            <Stack spacing={1}>
                              <Typography sx={{ fontSize: 11, fontWeight: 800, color: "#111111", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                                {t.subject}
                              </Typography>
                              <Box sx={{ borderBottom: "1.5px solid rgba(0,0,0,0.12)", py: 0.5 }}>
                                <InputBase
                                  fullWidth
                                  value={subject}
                                  onChange={(e) => setSubject(e.target.value)}
                                  placeholder="Private Atelier acquisition"
                                  sx={{ fontSize: 14, color: "#111111", fontFamily: '"Cairo", sans-serif' }}
                                />
                              </Box>
                            </Stack>

                            <Stack spacing={1}>
                              <Typography sx={{ fontSize: 11, fontWeight: 800, color: "#111111", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                                {t.message} *
                              </Typography>
                              <Box sx={{ border: "1px solid rgba(0,0,0,0.12)", p: 2, minHeight: 120 }}>
                                <InputBase
                                  required
                                  multiline
                                  rows={4}
                                  fullWidth
                                  value={message}
                                  onChange={(e) => setMessage(e.target.value)}
                                  placeholder="State details of your request..."
                                  sx={{ fontSize: 14, color: "#111111", fontFamily: '"Cairo", sans-serif' }}
                                />
                              </Box>
                            </Stack>

                            {/* Submit Button */}
                            <Button
                              type="submit"
                              variant="contained"
                              endIcon={<ArrowForwardIcon sx={{ mr: lang === "ar" ? 1 : 0, ml: lang === "ar" ? 0 : 1, transform: lang === "ar" ? "rotate(180deg)" : "none" }} />}
                              sx={{
                                bgcolor: "#000000",
                                color: "#ffffff",
                                px: 5,
                                py: 1.6,
                                borderRadius: 0,
                                fontSize: 12,
                                fontWeight: 700,
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                fontFamily: '"Cairo", sans-serif',
                                alignSelf: "flex-start",
                                "&:hover": { bgcolor: "primary.main" }
                              }}
                            >
                              {t.send}
                            </Button>
                          </Stack>
                        </motion.form>
                      ) : (
                        <MotionBox
                          key="success-box"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          sx={{ textAlign: "center", py: 6 }}
                        >
                          <Box component="img" src="/assets/baglight.png" alt="Inquiry Success" sx={{ width: 120, height: "auto", mb: 4 }} />
                          <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: 26, color: "primary.main", mb: 1.5 }}>
                            {t.successTitle}
                          </Typography>
                          <Typography sx={{ fontSize: 14.5, color: "rgba(0,0,0,0.64)", lineHeight: 1.6, maxWidth: 440, mx: "auto", mb: 4 }}>
                            {t.successDesc}
                          </Typography>
                          <Button
                            variant="contained"
                            onClick={() => {
                              setName("");
                              setEmail("");
                              setSubject("");
                              setMessage("");
                              setSubmitted(false);
                            }}
                            sx={{
                              bgcolor: "#000000",
                              color: "#ffffff",
                              borderRadius: 0,
                              px: 4,
                              py: 1.2,
                              fontSize: 11,
                              fontWeight: 700,
                              fontFamily: '"Cairo", sans-serif',
                              textTransform: "uppercase",
                              "&:hover": { bgcolor: "#222222" }
                            }}
                          >
                            {lang === "ar" ? "إرسال رسالة أخرى" : "Send Another Message"}
                          </Button>
                        </MotionBox>
                      )}
                    </AnimatePresence>
                  </Card>
                </Box>

              </Box>
            </Container>
          </Box>

          {/* Site Footer */}
          <SiteFooter />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
