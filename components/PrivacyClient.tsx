"use client";

import React, { useState, useEffect } from "react";
import { Box, Container, Stack, Typography, Divider } from "@mui/material";
import Grid from "@mui/material/Grid"; // Use modern Grid
import { getLocalizedValue } from "@/lib/sanity";

interface PrivacyClientProps {
  lang: "ar" | "en";
  initialData?: any;
}

export default function PrivacyClient({ lang, initialData }: PrivacyClientProps) {
  const [activeSection, setActiveSection] = useState("intro");
  const isAr = lang === "ar";

  // 1. Resolve dynamic sections list from Sanity (or fallback)
  const dynamicSections = React.useMemo(() => {
    if (initialData?.sections && Array.isArray(initialData.sections)) {
      return [
        { id: "intro", title: getLocalizedValue(initialData.introTitle, lang) || (isAr ? "المقدمة" : "Introduction") },
        ...initialData.sections.map((sec: any) => ({
          id: sec.sectionId,
          title: getLocalizedValue(sec.title, lang) || sec.sectionId
        }))
      ];
    }
    // Fallback static sections list
    return [
      { id: "intro", title: isAr ? "مقدمة" : "Introduction" },
      { id: "collect", title: isAr ? "ما هي المعلومات التي نجمعها" : "What Information We Collect" },
      { id: "consent", title: isAr ? "الموافقة" : "Consent" },
      { id: "disclosure", title: isAr ? "الإفصاح" : "Disclosure" },
      { id: "third-party", title: isAr ? "خدمات الأطراف الثالثة" : "Third Party Services" },
      { id: "security", title: isAr ? "الأمان" : "Security" },
      { id: "cookies", title: isAr ? "ملفات الارتباط (الكوكيز)" : "Cookies" },
      { id: "changes", title: isAr ? "التغييرات على سياسة الخصوصية" : "Changes to This Privacy Policy" },
      { id: "contact", title: isAr ? "معلومات الاتصال" : "Contact Information" }
    ];
  }, [initialData, lang, isAr]);

  // 2. Scroll event listener for index tracking
  useEffect(() => {
    const handleScroll = () => {
      // Check if user is at the absolute bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 15;
      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      const scrollPosition = window.scrollY + 200;
      for (const section of dynamicSections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dynamicSections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -180;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  // 3. Resolve metadata text values
  const pageTitle = getLocalizedValue(initialData?.title, lang) || (isAr ? "سياسة الخصوصية" : "Privacy Policy");
  const pageSubtitle = getLocalizedValue(initialData?.subtitle, lang) || (isAr 
    ? "توضح سياسة الخصوصية هذه كيفية جمع معلوماتك الشخصية واستخدامها ومشاركتها عند زيارتك لمتجرنا أو الشراء منه." 
    : "This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our store.");
  const updatedText = isAr ? "آخر تحديث: يوليو 2026" : "Last Updated: July 2026";

  // 4. Resolve Introduction Texts
  const introTitleText = getLocalizedValue(initialData?.introTitle, lang) || (isAr ? "المقدمة" : "Introduction");
  const introPara1 = getLocalizedValue(initialData?.introText1, lang) || (isAr 
    ? "أهلاً بكم في فاشن غيت سوريا. توضح سياسة الخصوصية هذه كيفية جمع معلوماتك الشخصية واستخدامها ومشاركتها عند زيارة متجرنا أو الشراء منه." 
    : "Welcome to Fashion Gate Syria. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our store.");
  const introPara2 = getLocalizedValue(initialData?.introText2, lang) || (isAr 
    ? "نحن ملتزمون بحماية معلوماتك الشخصية وحقك في الخصوصية. إذا كان لديك أي أسئلة أو مخاوف بشأن سياستنا، أو ممارساتنا فيما يتعلق بمعلوماتك الشخصية، يرجى الاتصال بنا على البريد الإلكتروني support@fashiongatesyria.com." 
    : "We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at support@fashiongatesyria.com.");

  // 5. Fallback translation settings for loop items
  const t = React.useMemo(() => ({
    collect: isAr 
      ? "المعلومات المقدمة مباشرة: عندما تقوم بعملية شراء أو تحاول إجراء عملية شراء من خلال متجرنا، فإننا نجمع معلومات معينة منك، بما في ذلك اسمك، وعنوان الفواتير، وعنوان الشحن، ومعلومات الدفع، وعنوان البريد الإلكتروني، ورقم الهاتف.\n\nالمعلومات التي يتم جمعها تلقائياً: عندما تتصفح متجرنا، نتلقى تلقائياً عنوان بروتوكول الإنترنت (IP) الخاص بجهاز الكمبيوتر الخاص بك، ونظام التشغيل، ونوع المتصفح لمساعدتنا في تحسين تجربتك.\n\nالاتصالات التسويقية: بموافقتك الصريحة، قد نرسل لك رسائل بريد إلكتروني أو رسائل حول متجرنا ووصول المنتجات الجديدة والتحديثات الترويجية الأخرى." 
      : "Information Provided Directly: When you make a purchase or attempt to make a purchase through our store, we collect certain information from you, including your name, billing address, shipping address, payment information, email address, and phone number.\n\nInformation Collected Automatically: When you browse our store, we automatically receive your computer’s internet protocol (IP) address, operating system, and browser type to help us optimize your experience.\n\nMarketing Communication: With your explicit consent, we may send you emails or messages about our store, new product arrivals, and other promotional updates.",
    consent: isAr 
      ? "كيف نحصل على موافقتك: عندما تقدم لنا معلومات شخصية لإتمام معاملة، أو التحقق من بطاقتك الائتمانية، أو تقديم طلب، أو الترتيب للتسليم، فإنك توافق على قيامنا بجمعها واستخدامها لهذا السبب المحدد فقط.\n\nسحب الموافقة: إذا غيرت رأيك بعد الاشتراك، يجوز لك سحب موافقتك على اتصالنا بك أو الاستمرار في جمع معلوماتك في أي وقت عن طريق الاتصال بنا." 
      : "How we get your consent: When you provide us with personal information to complete a transaction, verify your credit card, place an order, or arrange for a delivery, you consent to our collecting it and using it for that specific reason only.\n\nWithdrawing consent: If you change your mind after opting in, you may withdraw your consent for us to contact you or continue collecting your information at any time by contacting us.",
    disclosure: isAr 
      ? "يجوز لنا الإفصاح عن معلوماتك الشخصية إذا طُلب منا ذلك بموجب القانون أو إذا انتهكت الشروط والأحكام الخاصة بنا." 
      : "We may disclose your personal information if we are required by law to do so or if you violate our Terms and Conditions.",
    thirdParty: isAr 
      ? "بشكل عام، فإن مقدمي الخدمات من الأطراف الثالثة الذين نستخدمهم سيقومون فقط بجمع معلوماتك واستخدامها والإفصاح عنها بالقدر اللازم للسماح لهم بأداء الخدمات التي يقدمونها لنا. ويشمل ذلك بوابات الدفع ومعالجي معاملات الدفع، والذين لديهم سياسات الخصوصية الخاصة بهم فيما يتعلق بالمعلومات التي نلتزم بتقديمها لهم لإتمام معاملات الشراء الخاصة بك." 
      : "In general, the third party providers used by us will only collect, use, and disclose your information to the extent necessary to allow them to perform the services they provide to us. This includes payment gateways and transaction processors, which have their own privacy policies regarding the information we are required to provide to them for your purchase transactions.",
    security: isAr 
      ? "لحماية معلوماتك الشخصية، نتخذ الاحتياطات المعقولة ونتبع أفضل ممارسات الصناعة للتأكد من عدم فقدانها أو إساءة استخدامها أو الوصول إليها أو الكشف عنها أو تعديلها أو تدميرها بشكل غير لائق." 
      : "To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered, or destroyed.",
    cookies: isAr 
      ? "نحن نستخدم ملفات تعريف الارتباط للحفاظ على جلسة التسوق الخاصة بك، وتذكر العناصر الموجودة في سلة التسوق الخاصة بك، وتتبع تحليلات موقع الويب لتحسين تصميم متجرنا وأدائه. يمكنك اختيار تعطيل ملفات تعريف الارتباط من خلال إعدادات متصفحك، على الرغم من أن بعض أجزاء الموقع قد لا تعمل بشكل صحيح نتيجة لذلك." 
      : "We use cookies to maintain your shopping session, remember the items in your cart, and track website analytics to improve our store design and performance. You can choose to disable cookies through your browser settings, though some parts of the site may not function properly as a result.",
    changes: isAr 
      ? "نحتفظ بالحق في تعديل سياسة الخصوصية هذه في أي وقت، لذا يرجى مراجعتها بشكل متكرر. تسري التغييرات والإيضاحات فور نشرها على الموقع الإلكتروني. إذا تم الاستحواذ على متجرنا أو دمجه مع شركة أخرى، فقد يتم نقل معلوماتك إلى المالكين الجدد حتى نتمكن من الاستمرار في بيع المنتجات لك." 
      : "We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you."
  }), [isAr]);

  // 6. Map section content items dynamically
  const sectionsContent = React.useMemo(() => {
    if (initialData?.sections && Array.isArray(initialData.sections)) {
      return initialData.sections.map((sec: any) => ({
        id: sec.sectionId,
        title: getLocalizedValue(sec.title, lang) || sec.sectionId,
        content: getLocalizedValue(sec.content, lang) || ""
      }));
    }
    // Fallback static sections content
    return [
      { id: "collect", title: isAr ? "ما هي المعلومات التي نجمعها" : "What Information We Collect", content: t.collect },
      { id: "consent", title: isAr ? "الموافقة" : "Consent", content: t.consent },
      { id: "disclosure", title: isAr ? "الإفصاح" : "Disclosure", content: t.disclosure },
      { id: "third-party", title: isAr ? "خدمات الأطراف الثالثة" : "Third Party Services", content: t.thirdParty },
      { id: "security", title: isAr ? "الأمان" : "Security", content: t.security },
      { id: "cookies", title: isAr ? "ملفات الارتباط (الكوكيز)" : "Cookies", content: t.cookies },
      { id: "changes", title: isAr ? "التغييرات على سياسة الخصوصية هذه" : "Changes to This Privacy Policy", content: t.changes },
      { id: "contact", title: isAr ? "معلومات الاتصال" : "Contact Information", content: "", isContact: true }
    ];
  }, [initialData, lang, isAr, t]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        #intro, #collect, #consent, #disclosure, #third-party, #security, #cookies, #changes, #contact {
          scroll-margin-top: 180px !important;
        }
        @media (max-width: 900px) {
          #intro, #collect, #consent, #disclosure, #third-party, #security, #cookies, #changes, #contact {
            scroll-margin-top: 110px !important;
          }
        }
      `}} />
      <Box dir={isAr ? "rtl" : "ltr"} sx={{ bgcolor: "#FAF8F5", color: "#111111", minHeight: "100vh", pt: { xs: 12, md: 16 }, pb: 10 }}>
        {/* Page Header */}
        <Container maxWidth="xl" sx={{ mb: { xs: 6, md: 8 } }}>
          <Box sx={{ borderBottom: "1px solid rgba(0,0,0,0.06)", pb: 4, display: "flex", flexDirection: "column", gap: 1.5, textAlign: isAr ? "right" : "left" }}>
            <Typography sx={{ color: "primary.main", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              {updatedText}
            </Typography>
            <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 36, md: 48 }, fontWeight: 400, color: "#111111", lineHeight: 1.1 }}>
              {pageTitle}
            </Typography>
            <Typography sx={{ color: "rgba(17, 17, 17, 0.6)", fontSize: 15, maxWidth: 600, fontFamily: '"Cairo", sans-serif' }}>
              {pageSubtitle}
            </Typography>
          </Box>
        </Container>

        {/* Main Layout Grid */}
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 4, md: 8 }}>
            {/* Left Column Sticky Sidebar Index */}
            <Grid size={{ xs: 12, md: 3 }} sx={{ display: { xs: "none", md: "block" } }}>
              <Stack spacing={1.5} sx={{ position: "sticky", top: 180, borderLeft: isAr ? "none" : "1.5px solid rgba(0,0,0,0.06)", borderRight: isAr ? "1.5px solid rgba(0,0,0,0.06)" : "none", pl: isAr ? 0 : 3, pr: isAr ? 3 : 0 }}>
                {dynamicSections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <Typography
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      sx={{
                        fontSize: 13.5,
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? "primary.main" : "rgba(17, 17, 17, 0.5)",
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                        fontFamily: '"Cairo", sans-serif',
                        "&:hover": {
                          color: "primary.main"
                        }
                      }}
                    >
                      {section.title}
                    </Typography>
                  );
                })}
              </Stack>
            </Grid>

            {/* Right Column Content Panel */}
            <Grid size={{ xs: 12, md: 9 }}>
              <Stack spacing={6} sx={{ textAlign: isAr ? "right" : "left" }}>
                
                {/* 1. Attractive Premium Introduction */}
                <Stack id="intro" spacing={3} sx={{ scrollMarginTop: { xs: "110px", md: "180px" } }}>
                  <Typography variant="h5" sx={{ fontFamily: "var(--heading-font)", fontSize: 24, fontWeight: 500, color: "#111111", letterSpacing: "0.02em" }}>
                    {introTitleText}
                  </Typography>
                  <Box
                    sx={{
                      position: "relative",
                      pl: isAr ? 0 : 3.5,
                      pr: isAr ? 3.5 : 0,
                      py: 2.5,
                      bgcolor: "rgba(203, 97, 22, 0.03)",
                      borderLeft: isAr ? "none" : "3px solid #CB6116",
                      borderRight: isAr ? "3px solid #CB6116" : "none",
                      borderRadius: 0,
                      transition: "all 0.3s ease"
                    }}
                  >
                    <Typography sx={{ fontSize: 17.5, lineHeight: 1.8, color: "#111111", fontWeight: 500, fontFamily: '"Cairo", sans-serif', mb: 2, fontStyle: "italic" }}>
                      {introPara1}
                    </Typography>
                    <Typography sx={{ fontSize: 15.5, lineHeight: 1.8, color: "rgba(17, 17, 17, 0.72)", fontFamily: '"Cairo", sans-serif' }}>
                      {introPara2}
                    </Typography>
                  </Box>
                  <Divider sx={{ mt: 1 }} />
                </Stack>

                {/* 2. Dynamic Content Loop */}
                {sectionsContent.map((sec: any) => {
                  // Custom rendering for Contact Information section with mailto: link
                  if (sec.isContact || sec.id === "contact") {
                    return (
                      <Stack key={sec.id} id={sec.id} spacing={2.5}>
                        <Typography variant="h5" sx={{ fontFamily: "var(--heading-font)", fontSize: 22, color: "#111111" }}>
                          {sec.title}
                        </Typography>
                        <Typography sx={{ fontSize: 15.5, lineHeight: 1.8, color: "rgba(17, 17, 17, 0.72)", fontFamily: '"Cairo", sans-serif' }}>
                          {isAr ? (
                            <>
                              إذا كنت ترغب في الوصول إلى أي معلومات شخصية لدينا عنك، أو تصحيحها، أو تعديلها، أو حذفها، أو تسجيل شكوى، أو كنت تريد ببساطة مزيداً من المعلومات، يرجى الاتصال بفريق الدعم لدينا على البريد الإلكتروني{" "}
                              <Box
                                component="a"
                                href="mailto:support@fashiongatesyria.com"
                                sx={{
                                  color: "primary.main",
                                  textDecoration: "underline",
                                  fontWeight: 600,
                                  transition: "color 0.2s ease",
                                  "&:hover": { color: "primary.dark" }
                                }}
                              >
                                support@fashiongatesyria.com
                              </Box>
                            </>
                          ) : (
                            <>
                              If you would like to access, correct, amend, or delete any personal information we have about you, register a complaint, or simply want more information, please contact our support team at{" "}
                              <Box
                                component="a"
                                href="mailto:support@fashiongatesyria.com"
                                sx={{
                                  color: "primary.main",
                                  textDecoration: "underline",
                                  fontWeight: 600,
                                  transition: "color 0.2s ease",
                                  "&:hover": { color: "primary.dark" }
                                }}
                              >
                                support@fashiongatesyria.com
                              </Box>
                            </>
                          )}
                        </Typography>
                      </Stack>
                    );
                  }

                  // Standard Section Rendering
                  return (
                    <Stack key={sec.id} id={sec.id} spacing={2.5}>
                      <Typography variant="h5" sx={{ fontFamily: "var(--heading-font)", fontSize: 22, color: "#111111" }}>
                        {sec.title}
                      </Typography>
                      <Typography sx={{ fontSize: 15.5, lineHeight: 1.8, color: "rgba(17, 17, 17, 0.72)", fontFamily: '"Cairo", sans-serif', whiteSpace: "pre-line" }}>
                        {sec.content}
                      </Typography>
                      <Divider sx={{ mt: 2 }} />
                    </Stack>
                  );
                })}

              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
