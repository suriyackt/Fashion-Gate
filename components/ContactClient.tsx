"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Box, 
  Button, 
  Container, 
  InputBase, 
  Stack, 
  ThemeProvider, 
  Typography, 
  createTheme, 
  Divider, 
  IconButton,
  Card
} from "@mui/material";
import Grid from "@mui/material/Grid"; // MUI v6 Grid
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";


import { getLocalizedValue } from "@/lib/sanity";

const MotionBox = motion.create(Box);

interface ContactClientProps {
  initialLang: "ar" | "en";
  initialData?: any;
}

export default function ContactClient({ initialLang, initialData }: ContactClientProps) {
  const router = useRouter();
  const [lang, setLang] = useState<"en" | "ar">(initialLang);
  const [isLangTransitioning, setIsLangTransitioning] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setLang(initialLang);
    setIsLangTransitioning(false);
  }, [initialLang]);

  const handleLangToggle = () => {
    const nextLang = lang === "ar" ? "en" : "ar";
    setLang(nextLang);
    router.replace(`/contact/${nextLang}`);
  };

  // Luxury Warm Alabaster & Bronze Accented Theme
  const theme = useMemo(() => createTheme({
    palette: {
      mode: "light",
      primary: { main: "#CB6116", dark: "#9D430C" },
      background: { default: "#FAF8F5", paper: "#ffffff" },
      text: { primary: "#111111", secondary: "rgba(17, 17, 17, 0.65)" }
    },
    typography: {
      fontFamily: `"Cairo", sans-serif`,
      button: { fontWeight: 600 }
    },
    shape: { borderRadius: 0 }
  }), []);

  const heroImage = initialData?.heroImage?.asset?.url || "/brand/luxury_contact_bg.jpg";

  const fallbackTranslations = {
    en: {
      eyebrow: "client services",
      title: "Contact the Atelier",
      subtitle: "For private viewings, bespoke fittings, and concierge assistance at our Damascus Boulevard showrooms.",
      
      addressLabel: "Atelier location",
      addressValue: "Damascus Boulevard District, Damascus, Syria",
      hoursLabel: "Salon hours",
      hoursValue: "Monday – Saturday: 11:00 am – 9:00 pm",
      digitalLabel: "Digital concierge",
      digitalValue: "concierge@fashiongate.sy",
      whatsappLabel: "Instant chat",
      whatsappValue: "+963 930 000 000",
      chatConcierge: "Connect on WhatsApp",

      formTitle: "Submit a private inquiry",
      formSubtitle: "Please fill out your details. A dedicated client advisor will contact you within 24 hours.",
      fullName: "Full name",
      emailAddr: "Email address",
      phoneNum: "Phone / WhatsApp",
      msgLabel: "Details of your inquiry",
      sendBtn: "Submit inquiry",

      successHeader: "Inquiry registered",
      successDesc: "Your request has been received securely. A private advisor will contact you shortly to coordinate details.",
      sendAnother: "Submit another inquiry",

      mapTitle: "Our Damascus Boulevard Location"
    },
    ar: {
      eyebrow: "خدمات العملاء",
      title: "اتصل بالأتيليه الخاص",
      subtitle: "للمعاينات الشخصية، قياسات الخياطة، وخدمات الكونسيرج الخاصة في صالات عرض بوليفارد دمشق.",
      
      addressLabel: "موقع الأتيليه",
      addressValue: "حي البوليفارد، دمشق، سوريا",
      hoursLabel: "أوقات الصالون",
      hoursValue: "الاثنين – السبت: ١١:٠٠ صباحاً – ٩:٠٠ مساءً",
      digitalLabel: "الكونسيرج الرقمي",
      digitalValue: "concierge@fashiongate.sy",
      whatsappLabel: "المحادثة الفورية",
      whatsappValue: "+٩٦٣ ٩٣٠ ٠٠٠ ٠٠٠",
      chatConcierge: "تواصل عبر الواتساب",

      formTitle: "تقديم طلب استفسار خاص",
      formSubtitle: "يرجى ملء تفاصيل طلبك. سيتصل بك مستشار العملاء الخاص بنا خلال ٢٤ ساعة.",
      fullName: "الاسم الكامل",
      emailAddr: "البريد الإلكتروني",
      phoneNum: "الهاتف / الواتساب",
      msgLabel: "تفاصيل استفسارك",
      sendBtn: "إرسال الاستفسار",

      successHeader: "تم تسجيل استفسارك",
      successDesc: "تم تسجيل استفسارك بأمان. سيتصل بك أحد مستشارينا لتنسيق وتلبية طلبك قريباً.",
      sendAnother: "إرسال استفسار آخر",

      mapTitle: "موقعنا في بوليفارد دمشق"
    }
  }[lang];

  const t = {
    eyebrow: getLocalizedValue(initialData?.eyebrow, lang, fallbackTranslations.eyebrow),
    title: getLocalizedValue(initialData?.title, lang, fallbackTranslations.title),
    subtitle: getLocalizedValue(initialData?.subtitle, lang, fallbackTranslations.subtitle),
    addressLabel: getLocalizedValue(initialData?.addressLabel, lang, fallbackTranslations.addressLabel),
    addressValue: getLocalizedValue(initialData?.addressValue, lang, fallbackTranslations.addressValue),
    hoursLabel: getLocalizedValue(initialData?.hoursLabel, lang, fallbackTranslations.hoursLabel),
    hoursValue: getLocalizedValue(initialData?.hoursValue, lang, fallbackTranslations.hoursValue),
    digitalLabel: getLocalizedValue(initialData?.digitalLabel, lang, fallbackTranslations.digitalLabel),
    digitalValue: initialData?.digitalValue || fallbackTranslations.digitalValue,
    whatsappLabel: getLocalizedValue(initialData?.whatsappLabel, lang, fallbackTranslations.whatsappLabel),
    whatsappValue: initialData?.whatsappValue || fallbackTranslations.whatsappValue,
    chatConcierge: getLocalizedValue(initialData?.chatConcierge, lang, fallbackTranslations.chatConcierge),
    formTitle: getLocalizedValue(initialData?.formTitle, lang, fallbackTranslations.formTitle),
    formSubtitle: getLocalizedValue(initialData?.formSubtitle, lang, fallbackTranslations.formSubtitle),
    fullName: getLocalizedValue(initialData?.fullName, lang, fallbackTranslations.fullName),
    emailAddr: getLocalizedValue(initialData?.emailAddr, lang, fallbackTranslations.emailAddr),
    phoneNum: getLocalizedValue(initialData?.phoneNum, lang, fallbackTranslations.phoneNum),
    msgLabel: getLocalizedValue(initialData?.msgLabel, lang, fallbackTranslations.msgLabel),
    sendBtn: getLocalizedValue(initialData?.sendBtn, lang, fallbackTranslations.sendBtn),
    successHeader: getLocalizedValue(initialData?.successHeader, lang, fallbackTranslations.successHeader),
    successDesc: getLocalizedValue(initialData?.successDesc, lang, fallbackTranslations.successDesc),
    sendAnother: getLocalizedValue(initialData?.sendAnother, lang, fallbackTranslations.sendAnother),
    mapTitle: fallbackTranslations.mapTitle
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box 
        dir={lang === "ar" ? "rtl" : "ltr"}
        sx={{ 
          bgcolor: "#FAF8F5", 
          color: "#111111", 
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column"
        }}
      >


        {/* SECTION 1: Futuristic Parallax Banner */}
        <Box 
          sx={{
            position: "relative",
            backgroundImage: `url('${heroImage}')`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
            py: { xs: 12, md: 20 },
            textAlign: "center",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: "rgba(250, 248, 245, 0.88)", // Premium off-white overlay
              zIndex: 1
            }
          }}
        >
          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
            <Stack spacing={2} alignItems="center">
              <Typography 
                sx={{ 
                  color: "primary.main", 
                  textTransform: "uppercase", 
                  fontSize: 11, 
                  fontWeight: 800, 
                  letterSpacing: "0.3em",
                  fontFamily: '"Cairo", sans-serif'
                }}
              >
                {t.eyebrow}
              </Typography>
              <Typography 
                sx={{ 
                  fontFamily: "var(--heading-font)", 
                  fontSize: { xs: 36, sm: 48, md: 62 }, 
                  fontWeight: 500, 
                  lineHeight: 1.1, 
                  color: "#111111"
                }}
              >
                {t.title}
              </Typography>
              <Divider sx={{ borderColor: "rgba(203, 97, 22, 0.2)", width: "80px", my: 2 }} />
              <Typography 
                sx={{ 
                  color: "rgba(17, 17, 17, 0.72)", 
                  fontSize: { xs: 15, md: 17.5 }, 
                  maxWidth: 680, 
                  fontFamily: '"Cairo", sans-serif', 
                  lineHeight: 1.6 
                }}
              >
                {t.subtitle}
              </Typography>
            </Stack>
          </Container>
        </Box>

        {/* SECTION 2: Layered Grid Content */}
        <Container maxWidth="xl" sx={{ py: { xs: 10, md: 16 } }}>
          <Grid container spacing={{ xs: 8, md: 10 }} alignItems="stretch">
            
            {/* Left Column: Communication Hubs Cards */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Stack spacing={4} sx={{ height: "100%", justifyContent: "center" }}>
                
                {/* Atelier Card */}
                <Card 
                  sx={{ 
                    p: 4, 
                    bgcolor: "#ffffff", 
                    boxShadow: "0 10px 30px rgba(0,0,0,0.02)", 
                    borderTop: "3px solid #CB6116", 
                    borderRadius: 0,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 15px 40px rgba(203,97,22,0.08)"
                    },
                    textAlign: lang === "ar" ? "right" : "left"
                  }}
                >
                  <Stack direction="row" spacing={3} alignItems="flex-start">
                    <LocationOnIcon sx={{ color: "primary.main", fontSize: 24, mt: 0.5 }} />
                    <Stack spacing={0.8}>
                      <Typography sx={{ fontSize: 11, color: "rgba(17, 17, 17, 0.4)", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        {t.addressLabel}
                      </Typography>
                      <Typography sx={{ fontSize: 15.5, color: "#111111", fontWeight: 600, lineHeight: 1.5 }}>
                        {t.addressValue}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>

                {/* Hours Card */}
                <Card 
                  sx={{ 
                    p: 4, 
                    bgcolor: "#ffffff", 
                    boxShadow: "0 10px 30px rgba(0,0,0,0.02)", 
                    borderTop: "3px solid #CB6116", 
                    borderRadius: 0,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 15px 40px rgba(203,97,22,0.08)"
                    },
                    textAlign: lang === "ar" ? "right" : "left"
                  }}
                >
                  <Stack direction="row" spacing={3} alignItems="flex-start">
                    <AccessTimeIcon sx={{ color: "primary.main", fontSize: 24, mt: 0.5 }} />
                    <Stack spacing={0.8}>
                      <Typography sx={{ fontSize: 11, color: "rgba(17, 17, 17, 0.4)", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        {t.hoursLabel}
                      </Typography>
                      <Typography sx={{ fontSize: 15.5, color: "#111111", fontWeight: 600, lineHeight: 1.5 }}>
                        {t.hoursValue}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>

                {/* Digital Desk Card */}
                <Card 
                  sx={{ 
                    p: 4, 
                    bgcolor: "#ffffff", 
                    boxShadow: "0 10px 30px rgba(0,0,0,0.02)", 
                    borderTop: "3px solid #CB6116", 
                    borderRadius: 0,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 15px 40px rgba(203,97,22,0.08)"
                    },
                    textAlign: lang === "ar" ? "right" : "left"
                  }}
                >
                  <Stack direction="row" spacing={3} alignItems="flex-start">
                    <EmailIcon sx={{ color: "primary.main", fontSize: 24, mt: 0.5 }} />
                    <Stack spacing={0.8}>
                      <Typography sx={{ fontSize: 11, color: "rgba(17, 17, 17, 0.4)", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        {t.digitalLabel}
                      </Typography>
                      <Typography sx={{ fontSize: 15.5, color: "#111111", fontWeight: 600 }}>
                        {t.digitalValue}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>

                {/* WhatsApp Chat Card */}
                <Card 
                  sx={{ 
                    p: 4, 
                    bgcolor: "#ffffff", 
                    boxShadow: "0 10px 30px rgba(0,0,0,0.02)", 
                    borderTop: "3px solid #CB6116", 
                    borderRadius: 0,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 15px 40px rgba(203,97,22,0.08)"
                    },
                    textAlign: lang === "ar" ? "right" : "left"
                  }}
                >
                  <Stack direction="row" spacing={3} alignItems="flex-start">
                    <WhatsAppIcon sx={{ color: "primary.main", fontSize: 24, mt: 0.5 }} />
                    <Stack spacing={1.5} sx={{ width: "100%" }}>
                      <Box>
                        <Typography sx={{ fontSize: 11, color: "rgba(17, 17, 17, 0.4)", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", mb: 0.5 }}>
                          {t.whatsappLabel}
                        </Typography>
                        <Typography sx={{ fontSize: 15.5, color: "#111111", fontWeight: 600 }}>
                          {t.whatsappValue}
                        </Typography>
                      </Box>
                      <Box>
                        <Button
                          href="https://wa.me/963930000000"
                          target="_blank"
                          variant="contained"
                          sx={{
                            bgcolor: "#CB6116",
                            color: "#ffffff",
                            px: 3,
                            py: 1,
                            borderRadius: 0,
                            fontSize: 12,
                            fontWeight: 700,
                            textTransform: "none",
                            fontFamily: '"Cairo", sans-serif',
                            "&:hover": { bgcolor: "#9D430C" }
                          }}
                        >
                          {t.chatConcierge}
                        </Button>
                      </Box>
                    </Stack>
                  </Stack>
                </Card>

              </Stack>
            </Grid>

            {/* Right Column: Premium Off-Center Form Card */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Box 
                sx={{ 
                  bgcolor: "#ffffff", 
                  p: { xs: 5, md: 8 }, 
                  boxShadow: "0 25px 60px rgba(0,0,0,0.04)",
                  border: "1px solid rgba(0,0,0,0.04)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="contact-form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                    >
                      <Stack spacing={5}>
                        
                        <Box sx={{ mb: 1, textAlign: lang === "ar" ? "right" : "left" }}>
                          <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: 26, fontWeight: 500, color: "#111111", mb: 1 }}>
                            {t.formTitle}
                          </Typography>
                          <Typography sx={{ color: "rgba(17, 17, 17, 0.6)", fontSize: 14.5, fontFamily: '"Cairo", sans-serif' }}>
                            {t.formSubtitle}
                          </Typography>
                        </Box>

                        {/* Full Name field */}
                        <Stack spacing={1} sx={{ textAlign: lang === "ar" ? "right" : "left" }}>
                          <Typography sx={{ fontSize: 13, fontWeight: 700, color: "rgba(17, 17, 17, 0.45)" }}>
                            {t.fullName} *
                          </Typography>
                          <InputBase
                            required
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. John Doe"
                            sx={{ 
                              fontSize: 16, 
                              color: "#111111", 
                              fontFamily: '"Cairo", sans-serif',
                              borderBottom: "1.5px solid rgba(0,0,0,0.12)",
                              pb: 1,
                              transition: "border-color 0.25s ease",
                              "&.Mui-focused": {
                                borderBottom: "2px solid #CB6116"
                              }
                            }}
                          />
                        </Stack>

                        {/* Email Address field */}
                        <Stack spacing={1} sx={{ textAlign: lang === "ar" ? "right" : "left" }}>
                          <Typography sx={{ fontSize: 13, fontWeight: 700, color: "rgba(17, 17, 17, 0.45)" }}>
                            {t.emailAddr} *
                          </Typography>
                          <InputBase
                            required
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="client@luxury.com"
                            sx={{ 
                              fontSize: 16, 
                              color: "#111111", 
                              fontFamily: '"Cairo", sans-serif',
                              borderBottom: "1.5px solid rgba(0,0,0,0.12)",
                              pb: 1,
                              transition: "border-color 0.25s ease",
                              "&.Mui-focused": {
                                borderBottom: "2px solid #CB6116"
                              }
                            }}
                          />
                        </Stack>

                        {/* Phone field */}
                        <Stack spacing={1} sx={{ textAlign: lang === "ar" ? "right" : "left" }}>
                          <Typography sx={{ fontSize: 13, fontWeight: 700, color: "rgba(17, 17, 17, 0.45)" }}>
                            {t.phoneNum}
                          </Typography>
                          <InputBase
                            fullWidth
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+963 930 000 000"
                            sx={{ 
                              fontSize: 16, 
                              color: "#111111", 
                              fontFamily: '"Cairo", sans-serif',
                              borderBottom: "1.5px solid rgba(0,0,0,0.12)",
                              pb: 1,
                              transition: "border-color 0.25s ease",
                              "&.Mui-focused": {
                                borderBottom: "2px solid #CB6116"
                              }
                            }}
                          />
                        </Stack>

                        {/* Message field */}
                        <Stack spacing={1.5} sx={{ textAlign: lang === "ar" ? "right" : "left" }}>
                          <Typography sx={{ fontSize: 13, fontWeight: 700, color: "rgba(17, 17, 17, 0.45)" }}>
                            {t.msgLabel} *
                          </Typography>
                          <InputBase
                            required
                            multiline
                            rows={4}
                            fullWidth
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={lang === "ar" ? "اكتب تفاصيل طلبك هنا..." : "State details of your request..."}
                            sx={{ 
                              fontSize: 16, 
                              color: "#111111", 
                              fontFamily: '"Cairo", sans-serif',
                              border: "1px solid rgba(0,0,0,0.12)",
                              p: 2,
                              transition: "border-color 0.25s ease",
                              "&.Mui-focused": {
                                borderColor: "#CB6116"
                              }
                            }}
                          />
                        </Stack>

                        {/* Submit button */}
                        <Button
                          type="submit"
                          variant="contained"
                          endIcon={<ArrowForwardIcon sx={{ mr: lang === "ar" ? 1 : 0, ml: lang === "ar" ? 0 : 1, transform: lang === "ar" ? "rotate(180deg)" : "none" }} />}
                          sx={{
                            bgcolor: "#111111",
                            color: "#ffffff",
                            px: 5,
                            py: 1.6,
                            borderRadius: 0,
                            fontSize: 13,
                            textTransform: "none",
                            fontFamily: '"Cairo", sans-serif',
                            alignSelf: "flex-start",
                            "&:hover": { bgcolor: "primary.main" },
                            transition: "all 0.3s ease"
                          }}
                        >
                          {t.sendBtn}
                        </Button>

                      </Stack>
                    </motion.form>
                  ) : (
                    <MotionBox
                      key="success-box"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      sx={{ textAlign: "center", py: 4 }}
                    >
                      <Box component="img" src="/assets/baglight.png" alt="Success" sx={{ width: 80, height: "auto", mb: 3 }} />
                      <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: 24, color: "primary.main", mb: 1.5 }}>
                        {t.successHeader}
                      </Typography>
                      <Typography sx={{ fontSize: 15, color: "rgba(17, 17, 17, 0.64)", lineHeight: 1.7, maxWidth: 440, mx: "auto", mb: 4 }}>
                        {t.successDesc}
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setName("");
                          setEmail("");
                          setPhone("");
                          setMessage("");
                          setSubmitted(false);
                        }}
                        sx={{
                          bgcolor: "#111111",
                          color: "#ffffff",
                          borderRadius: 0,
                          px: 4,
                          py: 1.2,
                          fontSize: 13,
                          textTransform: "none",
                          fontFamily: '"Cairo", sans-serif',
                          "&:hover": { bgcolor: "#333333" }
                        }}
                      >
                        {t.sendAnother}
                      </Button>
                    </MotionBox>
                  )}
                </AnimatePresence>
              </Box>
            </Grid>

          </Grid>
        </Container>

        {/* Full-bleed Map Section */}
        <Box sx={{ borderTop: "1px solid rgba(0,0,0,0.06)", bgcolor: "#ffffff", py: 0 }}>
          <Box sx={{ py: 3.5, textAlign: "center" }}>
            <Typography sx={{ fontSize: 13, color: "primary.main", fontWeight: 700, letterSpacing: "0.15em", textTransform: "none" }}>
              {t.mapTitle}
            </Typography>
          </Box>
          <Box 
            component="iframe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26615.11111111111!2d36.2750!3d33.5130!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518e6dc413cc6a7%3A0x6b9745e5d31518f!2sDamascus%2C%20Syria!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s"
            sx={{
              width: "100%",
              height: { xs: 350, md: 500 },
              border: "none",
              display: "block",
              filter: "grayscale(0.65) contrast(1.1) brightness(0.95)"
            }}
            allowFullScreen
            loading="lazy"
          />
        </Box>

      </Box>
    </ThemeProvider>
  );
}
