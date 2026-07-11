"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, Button, Container, Stack, Typography, ThemeProvider, createTheme, Divider, IconButton, Link as MuiLink } from "@mui/material";
import Grid from "@mui/material/Grid"; // Unified MUI v6 Grid
import { useRouter } from "next/navigation";
import Link from "next/link";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getLocalizedValue } from "@/lib/sanity";

export default function AboutClient({ initialLang, initialData }: { initialLang: "en" | "ar"; initialData?: any }) {
  const router = useRouter();
  const [lang, setLang] = useState<"en" | "ar">(initialLang);
  const [videoOpen, setVideoOpen] = useState(false);

  // Scroll to top on load
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleLangToggle = () => {
    const nextLang = lang === "ar" ? "en" : "ar";
    setLang(nextLang);
    router.replace(`/about/${nextLang}`);
  };

  const theme = useMemo(() => createTheme({
    palette: {
      mode: "light",
      primary: { main: "#CB6116", dark: "#9D430C" },
      secondary: { main: "#D06010" },
      background: { default: "#FAF8F5", paper: "#ffffff" }
    },
    typography: {
      fontFamily: `"Cairo", sans-serif`,
      button: { fontWeight: 800 }
    },
    shape: { borderRadius: 0 }
  }), []);

  const fallbackData = {
    en: {
      title: "About Fashion Gate",
      eyebrow: "Damascus Boulevard Showroom",
      headline: "Syria’s Premier Luxury Retail Destination",
      p1: "Fashion Gate is Syria’s premier luxury retail destination, bringing together the world of international fashion, beauty, and lifestyle in one distinguished environment.",
      p2: "Located at Damascus Boulevard, one of Syria’s emerging premium commercial and tourism destinations, Fashion Gate introduces a new concept of luxury shopping built around elegance, discovery, and exceptional experiences.",
      p3: "Inspired by the world’s most renowned luxury destinations, Fashion Gate offers a carefully curated selection of fashion, beauty, and lifestyle collections, bringing together exceptional brands and memorable experiences under one roof.",
      p4: "From timeless fashion and accessories to beauty, lifestyle products, and exclusive in-store experiences, Fashion Gate celebrates individuality, craftsmanship, and modern luxury. Every detail has been thoughtfully designed to create an atmosphere where customers can explore, connect, and enjoy an elevated shopping experience.",
      p5: "More than just a shopping destination, Fashion Gate is a place where fashion, culture, and hospitality come together. With its elegant interiors, curated spaces, and signature coffee shop, it offers visitors a welcoming environment to relax, discover new collections, and enjoy moments beyond traditional retail.",
      p6: "As part of Damascus Boulevard’s vision to create a vibrant destination for commerce, tourism, and lifestyle, Fashion Gate represents a new chapter for luxury retail in Damascus. It aims to become a destination where fashion enthusiasts, families, and visitors can experience quality, elegance, and exceptional service.",
      p7: "At Fashion Gate, luxury is not only about the brands we present. It is about the experience we create, the atmosphere we offer, and the memories our customers take with them.",
      
      visionTitle: "Our Vision",
      visionText: "Our vision is to establish Fashion Gate as Syria’s leading luxury lifestyle destination by bringing together international fashion, exceptional service, and a unique customer experience. We aim to create a place where fashion, culture, and lifestyle meet, offering customers an inspiring destination to discover, experience, and celebrate modern luxury.",
      
      commitmentTitle: "Our Commitment",
      commitmentText: "At Fashion Gate, we are committed to delivering excellence in every detail. From our carefully selected collections to our thoughtfully designed spaces and personalized service, we strive to create an experience built on quality, elegance, and trust. Every visit to Fashion Gate is designed to be more than a shopping experience. It is an opportunity to discover a world of style, inspiration, and luxury.",

      videoTitle: "THE ATELIER EXPERIENCE",
      videoSubtitle: "Explore our spatial design walkthrough"
    },
    ar: {
      title: "عن فاشن جيت",
      eyebrow: "معرض بوليفارد دمشق",
      headline: "القمة المطلقة للفخامة والتسوق في سوريا",
      p1: "فاشن جيت هي وجهة التجزئة الفاخرة الرائدة في سوريا، حيث تجمع بين عالم الموضة العالمية، الجمال، وأسلوب الحياة في بيئة واحدة متميزة.",
      p2: "تقع فاشن جيت في بوليفارد دمشق، وهو أحد الوجهات التجارية والسياحية الراقية الناشئة في سوريا، وتقدم مفهوماً جديداً للتسوق الفاخر القائم على الأناقة والاكتشاف والتجارب الاستثنائية.",
      p3: "مستوحاة من أشهر وجهات الفخامة في العالم، تقدم فاشن جيت تشكيلة منسقة بعناية من أزياء وجمال وأسلوب حياة، لتجمع العلامات التجارية الاستثنائية والتجارب التي لا تُنسى تحت سقف واحد.",
      p4: "من الأزياء والإكسسوارات الخالدة إلى منتجات الجمال وأسلوب الحياة والتجارب الحصرية داخل المتجر، تحتفل فاشن جيت بالفردية والحرفية والفخامة الحديثة. تم تصميم كل التفاصيل بعناية لخلق جو يمكن العملاء من الاكتشاف والاستمتاع بتجربة تسوق راقية.",
      p5: "أكثر من مجرد وجهة تسوق، فاشن جيت هي مكان تلتقي فيه الموضة والثقافة والضيافة. مع تصميماتها الداخلية الأنيقة، ومساحاتها المنسقة، ومقهى التوقيع الخاص بها، فإنها توفر للزوار بيئة ترحيبية للاسترخاء واكتشاف المجموعات الجديدة والاستمتاع بلحظات تتجاوز البيع بالتجزئة التقليدي.",
      p6: "كجزء من رؤية بوليفارد دمشق لخلق وجهة حيوية للتجارة والسياحة وأسلوب الحياة، تمثل فاشن جيت فصلاً جديداً لتجزئة الفخامة في دمشق. وتهدف إلى أن تصبح وجهة يمكن لعشاق الموضة والعائلات والزوار تجربة الجودة والأناقة والخدمة الاستثنائية.",
      p7: "في فاشن جيت، لا تقتصر الفخامة على العلامات التجارية التي نقدمها فحسب. بل تتعلق بالتجربة التي نخلقها، والأجواء التي نوفرها، والذكريات التي يأخذها عملاؤنا معهم.",
      
      visionTitle: "رؤيتنا",
      visionText: "تتمثل رؤيتنا في تأسيس فاشن جيت كوجهة رائدة لأسلوب الحياة الفاخر في سوريا من خلال الجمع بين الموضة العالمية، والخدمة الاستثنائية، وتجربة العملاء الفريدة. ونهدف إلى خلق مكان تلتقي فيه الموضة والثقافة وأسلوب الحياة، لنقدم للعملاء وجهة ملهمة لاكتشاف وتجربة والاحتفاء بالفخامة الحديثة.",
      
      commitmentTitle: "التزامنا",
      commitmentText: "في فاشن جيت، نحن ملتزمون بتقديم التميز في كل تفصيل. من مجموعاتنا المختارة بعناية إلى مساحاتنا المصممة بدقة والخدمة الشخصية، نسعى جاهدين لخلق تجربة مبنية على الجودة والأناقة والثقة. تم تصميم كل زيارة إلى فاشن جيت لتكون أكثر من مجرد تجربة تسوق؛ إنها فرصة لاكتشاف عالم من الأناقة والإلهام والفخامة.",

      videoTitle: "صالون فاشن جيت بوليفارد دمشق",
      videoSubtitle: "شاهد عرض المساحات والخدمات الخاصة"
    }
  }[lang];

  // Resolve values dynamically
  const title = getLocalizedValue(initialData?.title, lang, fallbackData.title);
  const eyebrow = getLocalizedValue(initialData?.eyebrow, lang, fallbackData.eyebrow);
  const headline = getLocalizedValue(initialData?.headline, lang, fallbackData.headline);
  const p1 = getLocalizedValue(initialData?.p1, lang, fallbackData.p1);
  const p2 = getLocalizedValue(initialData?.p2, lang, fallbackData.p2);
  const p3 = getLocalizedValue(initialData?.p3, lang, fallbackData.p3);
  const p4 = getLocalizedValue(initialData?.p4, lang, fallbackData.p4);
  const p5 = getLocalizedValue(initialData?.p5, lang, fallbackData.p5);
  const p6 = getLocalizedValue(initialData?.p6, lang, fallbackData.p6);
  const p7 = getLocalizedValue(initialData?.p7, lang, fallbackData.p7);
  const visionTitle = getLocalizedValue(initialData?.visionTitle, lang, fallbackData.visionTitle);
  const visionText = getLocalizedValue(initialData?.visionText, lang, fallbackData.visionText);
  const commitmentTitle = getLocalizedValue(initialData?.commitmentTitle, lang, fallbackData.commitmentTitle);
  const commitmentText = getLocalizedValue(initialData?.commitmentText, lang, fallbackData.commitmentText);
  const videoTitle = getLocalizedValue(initialData?.videoTitle, lang, fallbackData.videoTitle);
  const videoSubtitle = getLocalizedValue(initialData?.videoSubtitle, lang, fallbackData.videoSubtitle);

  const heroImage = initialData?.heroImage?.asset?.url || "/brand/luxury_about_bg.jpg";
  const collageImage1 = initialData?.collageImage1?.asset?.url || "/brand-pages/page_08.jpg";
  const collageImage2 = initialData?.collageImage2?.asset?.url || "/brand-pages/page_32.jpg";
  const videoBgImage = initialData?.videoBgImage?.asset?.url || "/brand-pages/page_18.jpg";
  const videoUrl = initialData?.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1";

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
        {/* Site Header */}
        <SiteHeader
          settings={{ title: "Fashion Gate" }}
          onLangToggleStart={handleLangToggle}
        />

        {/* SECTION 1: Pretty Light Mode Parallax Banner */}
        <Box 
          sx={{
            position: "relative",
            backgroundImage: `url('${heroImage}')`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
            py: { xs: 12, md: 22 },
            textAlign: "center",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: "rgba(250, 248, 245, 0.88)", // Premium light stone/champagne overlay
              zIndex: 1
            }
          }}
        >
          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
            <Stack spacing={3} alignItems="center">
              <Typography sx={{ color: "primary.main", textTransform: "uppercase", fontSize: 13, fontWeight: 800, letterSpacing: "0.3em", fontFamily: '"Cairo", sans-serif' }}>
                {eyebrow}
              </Typography>
              <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 34, sm: 48, md: 64 }, fontWeight: 500, lineHeight: 1.15, color: "#111111", maxWidth: 900 }}>
                {title}
              </Typography>
              <Divider sx={{ borderColor: "rgba(203, 97, 22, 0.2)", width: "80px", my: 2 }} />
              <Typography sx={{ color: "rgba(17, 17, 17, 0.8)", fontSize: 16, maxWidth: 680, fontFamily: '"Cairo", sans-serif', lineHeight: 1.6, fontWeight: 600 }}>
                {headline}
              </Typography>
            </Stack>
          </Container>
        </Box>

        {/* SECTION 2: Detailed Text & Collage Grid */}
        <Container maxWidth="xl" sx={{ py: { xs: 10, md: 16 } }}>
          <Grid container spacing={{ xs: 6, md: 10 }} alignItems="flex-start">
            
            {/* Narrative Content */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={4} textAlign={lang === "ar" ? "right" : "left"}>
                
                <Box sx={{ borderLeft: lang === "en" ? "3px solid #CB6116" : "none", borderRight: lang === "ar" ? "3px solid #CB6116" : "none", px: 3 }}>
                  <Typography sx={{ fontSize: { xs: 18, md: 22 }, lineHeight: 1.7, fontWeight: 500, color: "#111111", fontFamily: '"Cairo", sans-serif' }}>
                    {p1}
                  </Typography>
                </Box>

                <Typography sx={{ fontSize: 15.5, lineHeight: 1.9, color: "rgba(17, 17, 17, 0.72)", fontFamily: '"Cairo", sans-serif' }}>
                  {p2}
                </Typography>

                <Typography sx={{ fontSize: 15.5, lineHeight: 1.9, color: "rgba(17, 17, 17, 0.72)", fontFamily: '"Cairo", sans-serif' }}>
                  {p3}
                </Typography>

                <Typography sx={{ fontSize: 15.5, lineHeight: 1.9, color: "rgba(17, 17, 17, 0.72)", fontFamily: '"Cairo", sans-serif' }}>
                  {p4}
                </Typography>

                <Typography sx={{ fontSize: 15.5, lineHeight: 1.9, color: "rgba(17, 17, 17, 0.72)", fontFamily: '"Cairo", sans-serif' }}>
                  {p5}
                </Typography>

                <Typography sx={{ fontSize: 15.5, lineHeight: 1.9, color: "rgba(17, 17, 17, 0.72)", fontFamily: '"Cairo", sans-serif' }}>
                  {p6}
                </Typography>

                <Typography sx={{ fontSize: 16, lineHeight: 1.8, fontWeight: 700, color: "primary.main", fontFamily: '"Cairo", sans-serif', fontStyle: "italic" }}>
                  {p7}
                </Typography>

              </Stack>
            </Grid>

            {/* Collage Column */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ position: "relative", width: "100%", height: { xs: "360px", sm: "480px", md: "600px" } }}>
                {/* Main Vertical Image */}
                <Box 
                  component="img"
                  src={collageImage1}
                  alt="Luxury showroom display"
                  sx={{
                    position: "absolute",
                    top: 0,
                    [lang === "ar" ? "right" : "left"]: 0,
                    width: "75%",
                    height: "85%",
                    objectFit: "cover",
                    boxShadow: "0 20px 45px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(0,0,0,0.04)"
                  }}
                />
                
                {/* Overlapping Floating Image */}
                <Box 
                  component="img"
                  src={collageImage2}
                  alt="Atelier detail display"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    [lang === "ar" ? "left" : "right"]: 0,
                    width: "55%",
                    height: "55%",
                    objectFit: "cover",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
                    border: "3px solid #FAF8F5",
                    zIndex: 2
                  }}
                />
              </Box>
            </Grid>

          </Grid>
        </Container>

        {/* SECTION 3: Video Atelier Section */}
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#F5F2EB" }}>
          <Container maxWidth="xl">
            <Box 
              sx={{
                position: "relative",
                height: { xs: "300px", sm: "400px", md: "520px" },
                backgroundImage: `url('${videoBgImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgcolor: "rgba(250, 248, 245, 0.45)", // Light wash overlay
                  zIndex: 1
                }
              }}
            >
              <Stack spacing={2.5} alignItems="center" sx={{ position: "relative", zIndex: 2, textAlign: "center", px: 3 }}>
                {/* Play Button Icon */}
                <IconButton 
                  onClick={() => setVideoOpen(true)}
                  sx={{ 
                    bgcolor: "primary.main", 
                    color: "#ffffff", 
                    width: 76, 
                    height: 76,
                    "&:hover": { bgcolor: "primary.dark", transform: "scale(1.08)" },
                    transition: "all 0.3s ease",
                    boxShadow: "0 10px 25px rgba(203, 97, 22, 0.3)"
                  }}
                >
                  <PlayArrowIcon sx={{ fontSize: 40 }} />
                </IconButton>
                
                <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 20, md: 28 }, fontWeight: 500, letterSpacing: "0.05em", color: "#111111" }}>
                  {videoTitle}
                </Typography>
                <Typography sx={{ color: "rgba(17, 17, 17, 0.72)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: '"Cairo", sans-serif' }}>
                  {videoSubtitle}
                </Typography>
              </Stack>
            </Box>
          </Container>
        </Box>

        {/* SECTION 4: Vision & Commitment Split Block */}
        <Container maxWidth="xl" sx={{ pb: { xs: 12, md: 18 }, pt: 10 }}>
          <Grid container spacing={4}>
            
            {/* Vision Card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box 
                sx={{ 
                  bgcolor: "#ffffff", 
                  borderTop: "3px solid #CB6116", 
                  p: { xs: 5, md: 7 }, 
                  height: "100%",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.04)",
                  textAlign: lang === "ar" ? "right" : "left"
                }}
              >
                <Stack spacing={3}>
                  <Typography sx={{ color: "primary.main", fontSize: 11, fontWeight: 800, letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: '"Cairo", sans-serif' }}>
                    I. {lang === "ar" ? "الاتجاه الاستراتيجي" : "STRATEGIC DIRECTION"}
                  </Typography>
                  <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 24, md: 32 }, fontWeight: 500, color: "#111111" }}>
                    {visionTitle}
                  </Typography>
                  <Typography sx={{ color: "rgba(17, 17, 17, 0.72)", fontSize: 15, lineHeight: 1.8, fontFamily: '"Cairo", sans-serif' }}>
                    {visionText}
                  </Typography>
                </Stack>
              </Box>
            </Grid>

            {/* Commitment Card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box 
                sx={{ 
                  bgcolor: "#ffffff", 
                  borderTop: "3px solid #CB6116", 
                  p: { xs: 5, md: 7 }, 
                  height: "100%",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.04)",
                  textAlign: lang === "ar" ? "right" : "left"
                }}
              >
                <Stack spacing={3}>
                  <Typography sx={{ color: "primary.main", fontSize: 11, fontWeight: 800, letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: '"Cairo", sans-serif' }}>
                    II. {lang === "ar" ? "ميثاق التميز" : "CHARTER OF EXCELLENCE"}
                  </Typography>
                  <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 24, md: 32 }, fontWeight: 500, color: "#111111" }}>
                    {commitmentTitle}
                  </Typography>
                  <Typography sx={{ color: "rgba(17, 17, 17, 0.72)", fontSize: 15, lineHeight: 1.8, fontFamily: '"Cairo", sans-serif' }}>
                    {commitmentText}
                  </Typography>
                </Stack>
              </Box>
            </Grid>

          </Grid>
        </Container>

        {/* Video Overlay Modal Popup */}
        {videoOpen && (
          <Box 
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: "rgba(250, 248, 245, 0.95)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {/* Close button */}
            <IconButton 
              onClick={() => setVideoOpen(false)}
              sx={{ position: "absolute", top: 25, right: 25, color: "#111111", border: "1px solid rgba(0,0,0,0.15)", borderRadius: 0 }}
            >
              <CloseIcon />
            </IconButton>
            
            <Box sx={{ width: "90%", maxWidth: "900px", position: "relative", pt: "56.25%", bgcolor: "#000" }}>
              <iframe 
                src={videoUrl} 
                title="Atelier Video View" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none"
                }}
              />
            </Box>
          </Box>
        )}

        {/* Site Footer */}
        <SiteFooter />
      </Box>
    </ThemeProvider>
  );
}
