"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Button, Container, InputBase, Stack, ThemeProvider, Typography, createTheme, Card, MenuItem, Select, FormControl } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const MotionBox = motion.create(Box);

interface ContactClientProps {
  initialLang: "ar" | "en";
}

export default function ContactClient({ initialLang }: ContactClientProps) {
  const router = useRouter();
  const params = useParams();
  const lang = (params?.lang === "en" ? "en" : "ar") as "en" | "ar";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLangTransitioning, setIsLangTransitioning] = useState(false);

  useEffect(() => {
    setIsLangTransitioning(false);
  }, [lang]);

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
      conciergeTitle: "Private Concierge Desk",
      damascusShowroom: "Damascus Showroom & Atelier",
      bookingPrompt: "For private acquisitions, personalized sizing adjustments, or to schedule a dedicated viewing at our Damascus Atelier, please contact our concierge team.",
      addressLabel: "Atelier Address",
      addressValue: "Boulevard District, Damascus, Syria",
      hoursLabel: "Private Salon Hours",
      hoursValue: "Monday – Saturday: 11:00 AM – 9:00 PM",
      digitalLabel: "Digital Inquiries",
      digitalValue: "concierge@fashiongate.sy",
      chatConcierge: "Chat with Concierge",
      
      inquiryTitle: "Submit an Inquiry",
      inquirySubtitle: "Our team will respond within 24 hours.",
      fullName: "Full Name",
      emailAddr: "Email Address",
      phoneNum: "Phone / WhatsApp",
      deptLabel: "Preferred Department",
      deptOptions: ["Women's Haute Couture", "Men's Bespoke Tailoring", "Luxury Accessories & Beauty", "Home & Deco", "General Inquiry"],
      msgLabel: "Request Details",
      sendBtn: "Send Request",
      
      successHeader: "Request Registered",
      successDesc: "Your details have been saved securely. A private advisor will contact you shortly to coordinate your request.",
      sendAnother: "Send Another Request",
      
      charterTitle: "The Concierge Charter",
      charter1Title: "Private Viewings",
      charter1Desc: "Access closed-door presentations of new collections at our private Damascus salon.",
      charter2Title: "Bespoke Tailoring",
      charter2Desc: "Connect with master craftsmen for custom measurements, fitting reviews, and alterations.",
      charter3Title: "White-Glove Delivery",
      charter3Desc: "Secure, direct shipping and tracking to domestic and international destinations."
    },
    ar: {
      conciergeTitle: "مكتب الكونسيرج الخاص",
      damascusShowroom: "أتيليه ومعرض دمشق",
      bookingPrompt: "للاقتناء الخاص، أو تعديل المقاسات الشخصية، أو لتحديد موعد معاينة خاصة في أتيليه دمشق، يرجى التواصل مع فريق الكونسيرج لدينا.",
      addressLabel: "عنوان الأتيليه",
      addressValue: "حي البوليفارد، دمشق، سوريا",
      hoursLabel: "أوقات الصالون الخاص",
      hoursValue: "الاثنين – السبت: ١١:٠٠ صباحاً – ٩:٠٠ مساءً",
      digitalLabel: "الاستفسارات الرقمية",
      digitalValue: "concierge@fashiongate.sy",
      chatConcierge: "تحدث مع الكونسيرج",
      
      inquiryTitle: "تقديم طلب استفسار",
      inquirySubtitle: "سيرد فريقنا على استفساركم خلال ٢٤ ساعة.",
      fullName: "الاسم الكامل",
      emailAddr: "البريد الإلكتروني",
      phoneNum: "الهاتف / الواتساب",
      deptLabel: "القسم المفضل",
      deptOptions: ["أزياء النساء الراقية", "خياطة الرجال الخاصة", "الإكسسوارات الفاخرة والجمال", "المنزل والديكور", "استفسار عام"],
      msgLabel: "تفاصيل الطلب",
      sendBtn: "إرسال الطلب",
      
      successHeader: "تم تسجيل الطلب",
      successDesc: "تم حفظ تفاصيل طلبك بأمان. سيتصل بك مستشارنا الخاص قريباً لتنسيق طلبك.",
      sendAnother: "إرسال طلب آخر",
      
      charterTitle: "ميثاق الكونسيرج الخاص",
      charter1Title: "المعاينات الخاصة",
      charter1Desc: "احصل على عروض مغلقة للمجموعات الجديدة في صالون دمشق الخاص بنا.",
      charter2Title: "الخياطة الراقية",
      charter2Desc: "تواصل مع كبار الحرفيين للمقاسات المخصصة ومراجعة التفصيل والتعديل.",
      charter3Title: "التوصيل المتميز",
      charter3Desc: "شحن وتتبع آمن ومباشر إلى الوجهات المحلية والدولية المختارة."
    }
  };

  const t = translations[lang];

  return (
    <ThemeProvider theme={theme}>
      <Box 
        dir={lang === "ar" ? "rtl" : "ltr"}
        sx={{ 
          bgcolor: "#FAF8F5", 
          color: "#111111", 
          minHeight: "100vh",
          position: "relative"
        }}
      >
        {/* Outer background color stays opaque, inner box transitions to hide flashes */}
        <Box sx={{ opacity: isLangTransitioning ? 0 : 1, transition: "opacity 0.25s ease-in-out" }}>
          
          {/* SiteHeader Reused */}
          <SiteHeader onLangToggleStart={() => setIsLangTransitioning(true)} />

          {/* Contact Main Hero Section */}
          <Box 
            sx={{ 
              position: "relative",
              py: { xs: 8, md: 12 },
              bgcolor: "#FAF8F5"
            }}
          >
            <Container maxWidth="xl">
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1.1fr 0.9fr" }, gap: { xs: 5, md: 6, lg: 8 }, alignItems: "stretch" }}>
                
                {/* Left Column: Premium Showroom Details (No blur background, clean store layout) */}
                <Box 
                  sx={{ 
                    position: "relative",
                    p: { xs: 4, md: 6 }, 
                    backgroundImage: "linear-gradient(180deg, rgba(5,5,5,0.45) 0%, rgba(5,5,5,0.85) 100%), url(/brand-pages/contact_bg.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "#ffffff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: { xs: 450, md: 550, lg: 650 },
                    border: "1px solid rgba(255,255,255,0.08)"
                  }}
                >
                  <Stack spacing={4}>
                    <Box>
                      <Typography sx={{ color: "primary.main", textTransform: "uppercase", fontSize: 10, fontWeight: 800, letterSpacing: "0.22em", mb: 1.5 }}>
                        {t.conciergeTitle}
                      </Typography>
                      <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 26, sm: 34, md: 44 }, fontWeight: 500, lineHeight: 1.15 }}>
                        {t.damascusShowroom}
                      </Typography>
                      <Typography sx={{ color: "rgba(255,255,255,0.76)", fontSize: 14, lineHeight: 1.8, mt: 2.5, maxWidth: 540 }}>
                        {t.bookingPrompt}
                      </Typography>
                    </Box>

                    <Stack spacing={3.5} sx={{ borderTop: "1px solid rgba(255,255,255,0.15)", pt: 4.5 }}>
                      {/* Address */}
                      <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ textAlign: lang === "ar" ? "right" : "left" }}>
                        <LocationOnIcon sx={{ color: "primary.main", mt: 0.3 }} />
                        <Stack spacing={0.5}>
                          <Typography sx={{ color: "rgba(255,255,255,0.48)", fontSize: 10, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                            {t.addressLabel}
                          </Typography>
                          <Typography sx={{ fontSize: 14.5, color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>
                            {t.addressValue}
                          </Typography>
                        </Stack>
                      </Stack>

                      {/* Hours */}
                      <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ textAlign: lang === "ar" ? "right" : "left" }}>
                        <AccessTimeIcon sx={{ color: "primary.main", mt: 0.3 }} />
                        <Stack spacing={0.5}>
                          <Typography sx={{ color: "rgba(255,255,255,0.48)", fontSize: 10, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                            {t.hoursLabel}
                          </Typography>
                          <Typography sx={{ fontSize: 14.5, color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>
                            {t.hoursValue}
                          </Typography>
                        </Stack>
                      </Stack>

                      {/* Inquiries */}
                      <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ textAlign: lang === "ar" ? "right" : "left" }}>
                        <EmailIcon sx={{ color: "primary.main", mt: 0.3 }} />
                        <Stack spacing={0.5}>
                          <Typography sx={{ color: "rgba(255,255,255,0.48)", fontSize: 10, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                            {t.digitalLabel}
                          </Typography>
                          <Typography sx={{ fontSize: 14.5, color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>
                            {t.digitalValue}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>

                  {/* Showroom concierges & WhatsApp */}
                  <Box sx={{ mt: 5, borderTop: "1px solid rgba(255,255,255,0.15)", pt: 4 }}>
                    <Button
                      href="https://wa.me/963930000000"
                      target="_blank"
                      startIcon={<WhatsAppIcon sx={{ mr: lang === "ar" ? 0 : 1, ml: lang === "ar" ? 1 : 0 }} />}
                      sx={{
                        bgcolor: "#CB6116",
                        color: "#ffffff",
                        px: 3.5,
                        py: 1.4,
                        borderRadius: 0,
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontFamily: '"Cairo", sans-serif',
                        transition: "all 0.3s ease",
                        "&:hover": { bgcolor: "#9D430C" }
                      }}
                    >
                      {t.chatConcierge}
                    </Button>
                  </Box>
                </Box>

                {/* Right Column: Interaction Form Card (No blur, clean theme matching) */}
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Card 
                    sx={{ 
                      p: { xs: 4, md: 6 }, 
                      bgcolor: "#ffffff",
                      border: "1px solid rgba(0,0,0,0.06)",
                      borderRadius: 0,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      height: "100%"
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
                          style={{ width: "100%" }}
                        >
                          <Stack spacing={4}>
                            <Box sx={{ borderBottom: "1px solid rgba(0,0,0,0.06)", pb: 2 }}>
                              <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: 24, fontWeight: 500, color: "#111111" }}>
                                {t.inquiryTitle}
                              </Typography>
                              <Typography sx={{ color: "rgba(0,0,0,0.54)", fontSize: 13, mt: 0.5 }}>
                                {t.inquirySubtitle}
                              </Typography>
                            </Box>
                            
                            {/* Input Fields */}
                            <Stack spacing={1}>
                              <Typography sx={{ fontSize: 10, fontWeight: 800, color: "#111111", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                                {t.fullName} *
                              </Typography>
                              <Box sx={{ borderBottom: "1.5px solid rgba(0,0,0,0.12)", py: 0.5 }}>
                                <InputBase
                                  required
                                  fullWidth
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  placeholder={lang === "ar" ? "مثال: أحمد دمشقي" : "e.g. John Doe"}
                                  sx={{ fontSize: 14, color: "#111111", fontFamily: '"Cairo", sans-serif' }}
                                />
                              </Box>
                            </Stack>

                            <Stack spacing={1}>
                              <Typography sx={{ fontSize: 10, fontWeight: 800, color: "#111111", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                                {t.emailAddr} *
                              </Typography>
                              <Box sx={{ borderBottom: "1.5px solid rgba(0,0,0,0.12)", py: 0.5 }}>
                                <InputBase
                                  required
                                  type="email"
                                  fullWidth
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  placeholder="client@luxury.com"
                                  sx={{ fontSize: 14, color: "#111111", fontFamily: '"Cairo", sans-serif' }}
                                />
                              </Box>
                            </Stack>

                            <Stack spacing={1}>
                              <Typography sx={{ fontSize: 10, fontWeight: 800, color: "#111111", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                                {t.phoneNum}
                              </Typography>
                              <Box sx={{ borderBottom: "1.5px solid rgba(0,0,0,0.12)", py: 0.5 }}>
                                <InputBase
                                  fullWidth
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  placeholder="+963 930 000 000"
                                  sx={{ fontSize: 14, color: "#111111", fontFamily: '"Cairo", sans-serif' }}
                                />
                              </Box>
                            </Stack>

                            <Stack spacing={1}>
                              <Typography sx={{ fontSize: 10, fontWeight: 800, color: "#111111", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                                {t.deptLabel}
                              </Typography>
                              <FormControl fullWidth variant="standard" sx={{ py: 0.5 }}>
                                <Select
                                  value={department}
                                  onChange={(e) => setDepartment(e.target.value as string)}
                                  disableUnderline
                                  sx={{
                                    fontSize: 14,
                                    color: "#111111",
                                    fontFamily: '"Cairo", sans-serif',
                                    borderBottom: "1.5px solid rgba(0,0,0,0.12)",
                                    pb: 0.5
                                  }}
                                >
                                  {t.deptOptions.map((opt) => (
                                    <MenuItem key={opt} value={opt} sx={{ fontSize: 13.5 }}>
                                      {opt}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Stack>

                            <Stack spacing={1}>
                              <Typography sx={{ fontSize: 10, fontWeight: 800, color: "#111111", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                                {t.msgLabel} *
                              </Typography>
                              <Box sx={{ border: "1px solid rgba(0,0,0,0.12)", p: 2, minHeight: 120 }}>
                                <InputBase
                                  required
                                  multiline
                                  rows={4}
                                  fullWidth
                                  value={message}
                                  onChange={(e) => setMessage(e.target.value)}
                                  placeholder={lang === "ar" ? "اكتب تفاصيل طلبك هنا..." : "State details of your request..."}
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
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          sx={{ textAlign: "center", py: 6 }}
                        >
                          <Box component="img" src="/assets/baglight.png" alt="Inquiry Success" sx={{ width: 100, height: "auto", mb: 4 }} />
                          <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: 26, color: "primary.main", mb: 1.5 }}>
                            {t.successHeader}
                          </Typography>
                          <Typography sx={{ fontSize: 14.5, color: "rgba(0,0,0,0.64)", lineHeight: 1.6, maxWidth: 440, mx: "auto", mb: 4 }}>
                            {t.successDesc}
                          </Typography>
                          <Button
                            variant="contained"
                            onClick={() => {
                              setName("");
                              setEmail("");
                              setPhone("");
                              setDepartment("General Inquiry");
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
                            {t.sendAnother}
                          </Button>
                        </MotionBox>
                      )}
                    </AnimatePresence>
                  </Card>
                </Box>

              </Box>
            </Container>
          </Box>

          {/* Concierge Charter Section */}
          <Box 
            component="section" 
            sx={{ 
              py: { xs: 8, md: 12 }, 
              bgcolor: "#F5EFEB", 
              borderTop: "1px solid rgba(0,0,0,0.05)" 
            }}
          >
            <Container maxWidth="xl">
              <Typography sx={{ color: "primary.main", fontSize: 11, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", textAlign: "center", mb: 6 }}>
                {t.charterTitle}
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 4 }}>
                
                {/* Charter 1 */}
                <Stack spacing={2} sx={{ p: 2, textAlign: lang === "ar" ? "right" : "left" }}>
                  <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: 18, fontWeight: 500, color: "#111111" }}>
                    {t.charter1Title}
                  </Typography>
                  <Typography sx={{ color: "rgba(0,0,0,0.64)", fontSize: 13.5, lineHeight: 1.7 }}>
                    {t.charter1Desc}
                  </Typography>
                </Stack>

                {/* Charter 2 */}
                <Stack spacing={2} sx={{ p: 2, textAlign: lang === "ar" ? "right" : "left", borderLeft: { md: "1px solid rgba(0,0,0,0.08)" }, borderRight: { md: lang === "ar" ? "1px solid rgba(0,0,0,0.08)" : "none" }, px: { md: 4 } }}>
                  <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: 18, fontWeight: 500, color: "#111111" }}>
                    {t.charter2Title}
                  </Typography>
                  <Typography sx={{ color: "rgba(0,0,0,0.64)", fontSize: 13.5, lineHeight: 1.7 }}>
                    {t.charter2Desc}
                  </Typography>
                </Stack>

                {/* Charter 3 */}
                <Stack spacing={2} sx={{ p: 2, textAlign: lang === "ar" ? "right" : "left", borderLeft: { md: lang === "en" ? "1px solid rgba(0,0,0,0.08)" : "none" }, borderRight: { md: lang === "ar" ? "1px solid rgba(0,0,0,0.08)" : "none" }, px: { md: 4 } }}>
                  <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: 18, fontWeight: 500, color: "#111111" }}>
                    {t.charter3Title}
                  </Typography>
                  <Typography sx={{ color: "rgba(0,0,0,0.64)", fontSize: 13.5, lineHeight: 1.7 }}>
                    {t.charter3Desc}
                  </Typography>
                </Stack>

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
