"use client";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Container, Drawer, IconButton, Stack, Typography, Tooltip, Divider, Link as MuiLink } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useLoader } from "@/components/LoaderProvider";
import type { Product } from "@/lib/productData";
import { getAnnouncements, getLocalizedValue } from "@/lib/sanity";

const MotionBox = motion.create(Box);

// Custom graphical flag SVGs (renders pixel-perfect flags on Windows / Segoe UI)
const EnglandFlag = () => (
  <svg width="24" height="16" viewBox="0 0 18 13" style={{ display: "inline-block", verticalAlign: "middle" }}>
    <rect width="18" height="13" fill="#ffffff" />
    <rect x="8.2" width="1.6" height="13" fill="#cf142b" />
    <rect y="5.7" width="18" height="1.6" fill="#cf142b" />
  </svg>
);

const SyriaFlag = () => (
  <svg width="24" height="16" viewBox="0 0 18 13" style={{ display: "inline-block", verticalAlign: "middle" }}>
    <rect width="18" height="4.3" fill="#E00613" />
    <rect y="4.3" width="18" height="4.3" fill="#ffffff" />
    <rect y="8.6" width="18" height="4.4" fill="#000000" />
    <path d="M6 6.45l.23.71h.74l-.6.44.23.71-.6-.44-.6.44.23-.71-.6-.44h.74z" fill="#009639" />
    <path d="M12 6.45l.23.71h.74l-.6.44.23.71-.6-.44-.6.44.23-.71-.6-.44h.74z" fill="#009639" />
  </svg>
);

interface SiteSettings {
  title?: string;
  primaryColor?: string;
  accentColor?: string;
}

interface SiteHeaderProps {
  settings?: SiteSettings;
  onLangToggleStart?: () => void;
}

const headerTranslations = {
  en: {
    "Home": "Home",
    "Women": "Women",
    "Men": "Men",
    "Designers": "Designers",
    "Fashion": "Fashion",
    "Perfumes": "Perfumes",
    "Skincare": "Skincare",
    "Dining": "Dining",
    "Blogs": "Blogs",
    "About Us": "About Us",
    "Contact Us": "Contact Us",
    "Sign In / Register": "Sign In / Register",
    "Wishlist": "Wishlist",
    "Cart": "Cart",
    "Search...": "Search...",
    "Search Boulevard...": "Search Boulevard..."
  },
  ar: {
    "Home": "الرئيسية",
    "Women": "النساء",
    "Men": "الرجال",
    "Designers": "المصممون",
    "Fashion": "الأزياء",
    "Perfumes": "العطور",
    "Skincare": "العناية بالبشرة",
    "Dining": "المائدة والضيافة",
    "Blogs": "المدونة",
    "About Us": "من نحن",
    "Contact Us": "اتصل بنا",
    "Sign In / Register": "تسجيل الدخول / التسجيل",
    "Wishlist": "المفضلة",
    "Cart": "السلة",
    "Search...": "ابحث...",
    "Search Boulevard...": "ابحث في البوليفارد..."
  }
};

const brandSuggestions = [
  { id: "paul-shark", label: "Paul & Shark" },
  { id: "tom-ford", label: "Tom Ford" },
  { id: "givenchy", label: "Givenchy" },
  { id: "christian-dior", label: "Christian Dior" },
  { id: "gucci", label: "Gucci" },
  { id: "chanel", label: "Chanel" },
  { id: "lancome", label: "Lancome" }
];

function AnnouncementBar({ lang }: { lang: "ar" | "en" }) {
  const [index, setIndex] = useState(0);
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    getAnnouncements().then((data) => {
      if (data && data.length > 0) {
        setAnnouncements(
          data.map((item: any) => ({
            text: getLocalizedValue(item.text, lang),
            link: item.link || ""
          }))
        );
      } else {
        setAnnouncements([
          {
            text: lang === "ar"
              ? "شحن مجاني وإرجاع سهل لكافة أنحاء العالم على مجموعات مختارة"
              : "Free Worldwide Shipping & Returns on Selected Designer Collections",
            link: ""
          },
          {
            text: lang === "ar"
              ? "أول متجر أقسام فاخر في سوريا — على البوليفارد. للعالم."
              : "Syria's First Luxury Department Store — On Boulevard. For the world.",
            link: ""
          },
          {
            text: lang === "ar"
              ? "تسوق شخصي وحجز أتيلييه مجاني في صالون دمشق الخاص"
              : "Complimentary Personal Shopping & Private Atelier Bookings",
            link: ""
          }
        ]);
      }
    });
  }, [lang]);

  useEffect(() => {
    if (announcements.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  if (announcements.length === 0) return null;

  return (
    <Box 
      component="div"
      sx={{ 
        bgcolor: "#050505", 
        color: "#CB6116", 
        py: 0.8, 
        px: { xs: 3, md: 4 }, 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        minHeight: 38,
        overflow: "hidden"
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            fontFamily: '"Cairo", sans-serif',
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textAlign: "center",
            lineHeight: 1.4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
          }}
        >
          {announcements[index].link ? (
            <Typography
              component={Link}
              href={announcements[index].link}
              sx={{
                fontSize: { xs: 11, md: 12 },
                fontWeight: 600,
                letterSpacing: "0.06em",
                textAlign: "center",
                maxWidth: "90%",
                textDecoration: "none",
                color: "inherit",
                "&:hover": { textDecoration: "underline" }
              }}
            >
              {announcements[index].text}
            </Typography>
          ) : (
            <Typography
              sx={{
                fontSize: { xs: 11, md: 12 },
                fontWeight: 600,
                letterSpacing: "0.06em",
                textAlign: "center",
                maxWidth: "90%"
              }}
            >
              {announcements[index].text}
            </Typography>
          )}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}

interface SearchOptionProps {
  lang: "ar" | "en";
  isMobile?: boolean;
  searchActive: boolean;
  setSearchActive: (active: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  products: Product[];
}

function SearchOption({ lang, isMobile = false, searchActive, setSearchActive, searchQuery, setSearchQuery, products }: SearchOptionProps) {
  const router = useRouter();

  const matchingProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return products.filter(p => {
      const query = searchQuery.toLowerCase();
      const titleMatch = p.title.toLowerCase().includes(query) || p.titleAr?.includes(searchQuery);
      const brandMatch = p.brandId.toLowerCase().includes(query);
      const catMatch = p.category.toLowerCase().includes(query) || p.categoryAr?.includes(searchQuery);
      return titleMatch || brandMatch || catMatch;
    }).slice(0, 5);
  }, [searchQuery, products]);

  const handleLinkClick = () => {
    setSearchActive(false);
    setSearchQuery("");
  };

  return (
    <Box sx={{ position: "relative" }}>
      {searchActive && (
        <Box 
          onClick={handleLinkClick}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            bgcolor: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(2px)"
          }}
        />
      )}

      <Stack direction="row" alignItems="center" sx={{ position: "relative", zIndex: 1000, overflow: "hidden" }}>
        <Box
          component="input"
          type="text"
          placeholder={lang === "ar" ? "ابحث في البوليفارد..." : "Search..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setSearchActive(true)}
          sx={{
            bgcolor: "rgba(255,255,255,0.06)",
            border: searchActive 
              ? "1px solid rgba(255,255,255,0.15)"
              : { xs: "none", sm: "1px solid rgba(255,255,255,0.15)" },
            color: "#ffffff",
            outline: "none",
            py: 0.8,
            fontSize: 12,
            fontFamily: '"Cairo", sans-serif',
            width: searchActive
              ? { xs: "90px", sm: "140px", md: "240px" } 
              : { xs: "0px", sm: "120px", md: "160px" },
            px: searchActive
              ? 1.5
              : { xs: 0, sm: 1.5 },
            transition: "width 0.4s ease, padding 0.4s ease, border-color 0.4s ease",
            borderRadius: 0,
            "&::placeholder": { color: "rgba(255,255,255,0.4)" }
          }}
        />
        <IconButton 
          onClick={() => {
            if (searchActive) {
              setSearchActive(false);
              setSearchQuery("");
            } else {
              setSearchActive(true);
            }
          }}
          sx={{ 
            color: "#CB6116", 
            p: 1.14,
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 0,
            ml: 0.5,
            bgcolor: searchActive ? "rgba(255,255,255,0.1)" : "transparent"
          }}
        >
          {searchActive ? (
            <CloseIcon sx={{ fontSize: 18 }} />
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          )}
        </IconButton>
      </Stack>

      <AnimatePresence>
        {searchActive && (
          <MotionBox
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            sx={{
              position: "absolute",
              top: "100%",
              right: lang === "ar" ? "auto" : 0,
              left: lang === "ar" ? 0 : "auto",
              width: { xs: "280px", sm: "360px", md: "420px" },
              maxHeight: "60vh",
              overflowY: "auto",
              bgcolor: "#FAF8F5", // Light background for search popover
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 20px 45px rgba(0,0,0,0.15)",
              p: 2,
              zIndex: 1000,
              color: "#111111", // Dark color text
              borderRadius: 0,
              textAlign: lang === "ar" ? "right" : "left"
            }}
          >
            {!searchQuery.trim() ? (
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <Box>
                  <Typography sx={{ fontSize: 10, fontWeight: 800, color: "#CB6116", textTransform: "uppercase", letterSpacing: "0.15em", mb: 1.5, fontFamily: '"Cairo", sans-serif' }}>
                    {lang === "ar" ? "الأقسام المقتارة" : "Departments"}
                  </Typography>
                  <Stack spacing={1} alignItems="flex-start">
                    <Button component={Link} href={`/category/women/${lang}`} onClick={handleLinkClick} sx={{ color: "#111111", fontSize: 12, p: 0, minWidth: 0, fontFamily: '"Cairo", sans-serif', textTransform: "none", "&:hover": { color: "#CB6116" } }}>{lang === "ar" ? "النساء" : "Women"}</Button>
                    <Button component={Link} href={`/category/men/${lang}`} onClick={handleLinkClick} sx={{ color: "#111111", fontSize: 12, p: 0, minWidth: 0, fontFamily: '"Cairo", sans-serif', textTransform: "none", "&:hover": { color: "#CB6116" } }}>{lang === "ar" ? "الرجال" : "Men"}</Button>
                    <Button component={Link} href={`/category/perfumes/${lang}`} onClick={handleLinkClick} sx={{ color: "#111111", fontSize: 12, p: 0, minWidth: 0, fontFamily: '"Cairo", sans-serif', textTransform: "none", "&:hover": { color: "#CB6116" } }}>{lang === "ar" ? "العطور" : "Perfumes"}</Button>
                    <Button component={Link} href={`/category/skincare/${lang}`} onClick={handleLinkClick} sx={{ color: "#111111", fontSize: 12, p: 0, minWidth: 0, fontFamily: '"Cairo", sans-serif', textTransform: "none", "&:hover": { color: "#CB6116" } }}>{lang === "ar" ? "العناية بالبشرة" : "Skincare"}</Button>
                  </Stack>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: 10, fontWeight: 800, color: "#CB6116", textTransform: "uppercase", letterSpacing: "0.15em", mb: 1.5, fontFamily: '"Cairo", sans-serif' }}>
                    {lang === "ar" ? "دور الفخامة" : "Suggested Brands"}
                  </Typography>
                  <Stack spacing={1} alignItems="flex-start">
                    {brandSuggestions.map((item) => (
                      <Button
                        key={item.id}
                        component={Link}
                        href={`/brand/${item.id}/${lang}`}
                        onClick={handleLinkClick}
                        sx={{ color: "#111111", fontSize: 12, p: 0, minWidth: 0, fontFamily: '"Cairo", sans-serif', textTransform: "none", "&:hover": { color: "#CB6116" } }}
                      >
                        {item.label}
                      </Button>
                    ))}
                  </Stack>
                </Box>
              </Box>
            ) : (
              <Box>
                <Typography sx={{ fontSize: 10, fontWeight: 800, color: "#CB6116", textTransform: "uppercase", letterSpacing: "0.15em", mb: 1.5, fontFamily: '"Cairo", sans-serif' }}>
                  {lang === "ar" ? "النتائج المطابقة" : "Matching Pieces"}
                </Typography>
                {matchingProducts.length === 0 ? (
                  <Typography sx={{ color: "rgba(0,0,0,0.48)", fontSize: 12, py: 1, fontFamily: '"Cairo", sans-serif' }}>
                    {lang === "ar" ? "لم نجد أي قطع تطابق بحثك..." : "No matching pieces found..."}
                  </Typography>
                ) : (
                  <Stack spacing={1.5}>
                    {matchingProducts.map((p) => {
                      const title = lang === "ar" ? p.titleAr : p.title;
                      const cat = lang === "ar" ? p.categoryAr : p.category;
                      return (
                        <Link
                          key={p.id}
                          href={`/product/${p.id}/${lang}`}
                          onClick={handleLinkClick}
                          style={{ textDecoration: "none", display: "block" }}
                        >
                          <Stack 
                            direction="row" 
                            spacing={2} 
                            alignItems="center"
                            sx={{ 
                              p: 0.8, 
                              "&:hover": { bgcolor: "rgba(203, 97, 22, 0.08)" }, // Premium orange light hover color
                              transition: "background 0.2s"
                            }}
                          >
                            <Box 
                              component="img" 
                              src={p.imageUrl || "/brand/logo.png"} 
                              alt={title}
                              sx={{ 
                                width: 40, 
                                height: 40, 
                                objectFit: "cover", 
                                bgcolor: "#e5e5e5" 
                              }}
                            />
                            <Box sx={{ textAlign: lang === "ar" ? "right" : "left" }}>
                              <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#111111", lineHeight: 1.2 }}>
                                {title}
                              </Typography>
                              <Typography sx={{ fontSize: 9, color: "#CB6116", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.1em", mt: 0.3 }}>
                                {p.brandId.toUpperCase()} — {cat}
                              </Typography>
                            </Box>
                          </Stack>
                        </Link>
                      );
                    })}
                  </Stack>
                )}
              </Box>
            )}
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default function SiteHeader({ settings, onLangToggleStart }: SiteHeaderProps) {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const lang = (pathname?.endsWith("/ar") || pathname?.includes("/ar/") ? "ar" : "en") as "en" | "ar";
  const [open, setOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [headerProducts, setHeaderProducts] = useState<Product[]>([]);
  const { setLoading } = useLoader();

  // Dropdown states for mega-menus
  const [activeDropdown, setActiveDropdown] = useState<"women" | "men" | "designers" | "fashion" | "perfumes" | "skincare" | null>(null);
  const [hoveredFashionCategory, setHoveredFashionCategory] = useState<"women-fashion" | "men-fashion" | null>(null);

  const isLinkActive = (pathSegment: string) => {
    if (!pathname) return false;
    if (pathSegment === "home") {
      return pathname === `/${lang}` || pathname === "/";
    }
    return pathname.includes(`/${pathSegment}/`) || pathname.endsWith(`/${pathSegment}`) || pathname.includes(`/${pathSegment}?`) || pathname.includes(`/${pathSegment}#`);
  };

  useEffect(() => {
    import("@/lib/productData").then((mod) => {
      setHeaderProducts(mod.products);
    }).catch(err => console.error("Failed to load header products", err));
  }, []);

  const t = (strKey: keyof typeof headerTranslations["en"]) => {
    return headerTranslations[lang][strKey] || strKey;
  };

  const handleLangToggle = () => {
    if (typeof window === "undefined") return;
    setLoading(true);
    if (onLangToggleStart) {
      onLangToggleStart();
    }
    setTimeout(() => {
      const nextLang = lang === "ar" ? "en" : "ar";
      let nextPath = pathname;
      if (pathname.endsWith("/en")) {
        nextPath = pathname.substring(0, pathname.length - 3) + "/ar";
      } else if (pathname.endsWith("/ar")) {
        nextPath = pathname.substring(0, pathname.length - 3) + "/en";
      } else if (pathname === "/en" || pathname === "/ar" || pathname === "/") {
        nextPath = `/${nextLang}`;
      } else {
        nextPath = pathname.replace(/\/(ar|en)$/, `/${nextLang}`);
      }
      router.push(nextPath);
    }, 180);
  };

  const handleMenuHover = (menu: "women" | "men" | "designers" | "fashion" | "perfumes" | "skincare" | null) => {
    setActiveDropdown(menu);
    if (menu === "women") {
      setHoveredFashionCategory("women-fashion");
    } else if (menu === "men") {
      setHoveredFashionCategory("men-fashion");
    }
  };

  return (
    <>
      <Box 
        component="header"
        sx={{ 
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100, 
          bgcolor: "#050505",
          backgroundImage: 'url("/assets/headerbg.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <AnnouncementBar lang={lang} />
        
        {/* ROW 1: Logo (Left), Search/Utilities (Right) */}
        <Stack 
          direction="row" 
          justifyContent="space-between" 
          alignItems="center" 
          sx={{ minHeight: 64, px: { xs: 2.5, md: 4 } }}
        >
          {/* Logo on the left */}
          <Box
            component={Link}
            href={`/${lang}`}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              textDecoration: "none",
              cursor: "pointer"
            }}
          >
            <Stack direction="row" gap={1.5} alignItems="center">
              <Box 
                component="img" 
                src="/brand/logo.png" 
                alt="Fashion Gate" 
                sx={{ 
                  height: 36, 
                  width: "auto",
                  objectFit: "contain"
                }} 
              />
              <Typography 
                sx={{ 
                  fontFamily: "var(--heading-font)", 
                  fontWeight: 600, 
                  fontSize: { xs: 14, sm: 15, md: 19 }, 
                  lineHeight: 1, 
                  textTransform: "uppercase", 
                  color: "#ffffff",
                  letterSpacing: "0.08em",
                  whiteSpace: "nowrap",
                  display: { xs: "none", sm: "block" }
                }}
              >
                FASHION GATE
              </Typography>
            </Stack>
          </Box>

          {/* Search, Language Selector, User Profile Icon on the right */}
          <Stack direction="row" spacing={{ xs: 1, sm: 1.5, md: 2 }} alignItems="center">
            {/* Search Option */}
            <SearchOption 
              lang={lang} 
              searchActive={searchActive} 
              setSearchActive={setSearchActive} 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              products={headerProducts}
            />

            <Button 
              onClick={handleLangToggle}
              startIcon={lang === "ar" ? <EnglandFlag /> : <SyriaFlag />}
              sx={{ 
                color: "#ffffff", 
                textTransform: "uppercase", 
                fontSize: 12, 
                fontWeight: 600, 
                letterSpacing: "0.1em",
                px: 1.5,
                py: 0.5,
                border: "none",
                borderRadius: 0,
                fontFamily: '"Cairo", sans-serif',
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                minWidth: 0,
                "& .MuiButton-startIcon": {
                  margin: 0,
                  display: "flex",
                  alignItems: "center"
                },
                "&:hover": {
                  color: "#CB6116",
                  bgcolor: "transparent"
                }
              }}
            >
              {lang === "ar" ? "EN" : "AR"}
            </Button>

            {/* Profile Button */}
            <Tooltip title={t("Sign In / Register")}>
              <IconButton 
                component={Link} 
                href={`/login/${lang}`} 
                sx={{ 
                  color: "#CB6116", 
                  p: 0.5,
                  display: { xs: "none", sm: "inline-flex" },
                  transition: "transform 0.2s, color 0.2s",
                  "&:hover": { color: "#ffffff", transform: "scale(1.08)" }
                }}
              >
                <PersonOutlineIcon sx={{ fontSize: 22 }} />
              </IconButton>
            </Tooltip>

            {/* Mobile menu trigger */}
            <IconButton 
              onClick={() => setOpen(true)} 
              sx={{ 
                color: "#ffffff", 
                p: 0.8,
                border: "1px solid rgba(255,255,255,0.08)",
                display: { xs: "inline-flex", lg: "none" }
              }}
            >
              <MenuIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Stack>
        </Stack>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

        {/* ROW 2: Navigation Bar (11 nav items centered) */}
        <Stack 
          direction="row" 
          justifyContent="center" 
          alignItems="center" 
          gap={{ xs: 1.5, sm: 2.5, md: 3.5 }}
          sx={{ 
            minHeight: 44, 
            px: 2, 
            display: { xs: "none", lg: "flex" },
            position: "relative"
          }}
        >
          <Button component={Link} href={`/${lang}`} className="luxury-link" sx={{ color: isLinkActive("home") ? "#CB6116" : "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
            {t("Home")}
          </Button>

          {/* Women trigger - Commented out for now */}
          {/* 
          <Box 
            onMouseEnter={() => handleMenuHover("women")}
            onMouseLeave={() => handleMenuHover(null)}
            sx={{ display: "inline-block", height: "100%", position: "relative" }}
          >
            <Button component={Link} href={`/category/women/${lang}`} className="luxury-link" sx={{ color: activeDropdown === "women" ? "#CB6116" : "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
              {t("Women")}
            </Button>
            <AnimatePresence>
              {activeDropdown === "women" && (
                <MotionBox
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.18 }}
                  onMouseEnter={() => setActiveDropdown("women")}
                  onMouseLeave={() => setActiveDropdown(null)}
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: lang === "ar" ? "auto" : 0,
                    right: lang === "ar" ? 0 : "auto",
                    width: "600px",
                    bgcolor: "#111111",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderTop: "none",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
                    p: 0,
                    zIndex: 99,
                    textAlign: lang === "ar" ? "right" : "left",
                    display: "flex",
                    flexDirection: "row"
                  }}
                >
                  <Stack sx={{ width: "40%", bgcolor: "#1a1a1a", borderRight: lang === "en" ? "1px solid rgba(255,255,255,0.04)" : "none", borderLeft: lang === "ar" ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <Box 
                      onMouseEnter={() => setHoveredFashionCategory("women-fashion")}
                      sx={{ 
                        p: 2, 
                        cursor: "pointer", 
                        bgcolor: hoveredFashionCategory === "women-fashion" ? "#222" : "transparent",
                        color: hoveredFashionCategory === "women-fashion" ? "#CB6116" : "#fff",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        fontFamily: '"Cairo", sans-serif',
                        fontSize: 12,
                        fontWeight: 700
                      }}
                    >
                      {lang === "ar" ? "أزياء النساء >" : "WOMEN FASHION ❯"}
                    </Box>
                    {["women-bags", "women-accessories", "women-jewellery"].map((sub) => (
                      <Box 
                        key={sub}
                        component={Link}
                        href={`/category/women/${lang}?sub=${sub}`}
                        onClick={() => setActiveDropdown(null)}
                        sx={{ 
                          p: 2, 
                          color: "#fff",
                          textDecoration: "none",
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                          fontFamily: '"Cairo", sans-serif',
                          fontSize: 12,
                          fontWeight: 600,
                          "&:hover": { bgcolor: "#222", color: "#CB6116" }
                        }}
                      >
                        {sub === "women-bags" ? (lang === "ar" ? "حقائب النساء" : "WOMEN BAGS") : 
                         sub === "women-accessories" ? (lang === "ar" ? "إكسسوارات النساء" : "WOMEN ACCESSORIES") : 
                         (lang === "ar" ? "مجوهرات النساء" : "WOMEN JEWELLERY")}
                      </Box>
                    ))}
                  </Stack>
                  <Box sx={{ width: "60%", p: 2.5, maxHeight: "360px", overflowY: "auto" }}>
                    {hoveredFashionCategory === "women-fashion" && (
                      <Stack spacing={1.2}>
                        {[
                          { id: "dresses", label: lang === "ar" ? "فساتين" : "DRESSES" },
                          { id: "abayas-kaftans", label: lang === "ar" ? "عبايات وقفاطين" : "ABAYAS / KAFTANS" },
                          { id: "tops-blouses", label: lang === "ar" ? "بلوزات وقمصان علوية" : "TOPS & BLOUSES" },
                          { id: "t-shirts", label: lang === "ar" ? "تي شيرت" : "WOMEN T-SHIRTS" },
                          { id: "pants-trousers", label: lang === "ar" ? "سراويل وبناطيل" : "PANTS & TROUSERS" },
                          { id: "jeans", label: lang === "ar" ? "جينز" : "WOMEN JEANS" },
                          { id: "skirts", label: lang === "ar" ? "تنانير" : "SKIRTS" },
                          { id: "coords-sets", label: lang === "ar" ? "أطقم متطابقة" : "CO-ORDS & SETS" },
                          { id: "outerwear-women", label: lang === "ar" ? "ملابس خارجية" : "OUTERWEAR WOMEN" },
                          { id: "women-activewear", label: lang === "ar" ? "ملابس رياضية" : "WOMEN ACTIVEWEAR" },
                          { id: "sleepwear-innerwear", label: lang === "ar" ? "ملابس نوم وداخلية" : "SLEEPWEAR & INNERWEAR" }
                        ].map((item) => (
                          <Typography
                            key={item.id}
                            component={Link}
                            href={`/category/women/${lang}?sub=${item.id}`}
                            onClick={() => setActiveDropdown(null)}
                            sx={{
                              color: "rgba(255,255,255,0.7)",
                              textDecoration: "none",
                              fontSize: "11.5px",
                              fontWeight: 500,
                              fontFamily: '"Cairo", sans-serif',
                              cursor: "pointer",
                              "&:hover": { color: "#CB6116" }
                            }}
                          >
                            {item.label}
                          </Typography>
                        ))}
                      </Stack>
                    )}
                  </Box>
                </MotionBox>
              )}
            </AnimatePresence>
          </Box>
          */}

          {/* Men trigger - Commented out for now */}
          {/* 
          <Box 
            onMouseEnter={() => handleMenuHover("men")}
            onMouseLeave={() => handleMenuHover(null)}
            sx={{ display: "inline-block", height: "100%", position: "relative" }}
          >
            <Button component={Link} href={`/category/men/${lang}`} className="luxury-link" sx={{ color: activeDropdown === "men" ? "#CB6116" : "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
              {t("Men")}
            </Button>
            <AnimatePresence>
              {activeDropdown === "men" && (
                <MotionBox
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.18 }}
                  onMouseEnter={() => setActiveDropdown("men")}
                  onMouseLeave={() => setActiveDropdown(null)}
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: lang === "ar" ? "auto" : 0,
                    right: lang === "ar" ? 0 : "auto",
                    width: "600px",
                    bgcolor: "#111111",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderTop: "none",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
                    p: 0,
                    zIndex: 99,
                    textAlign: lang === "ar" ? "right" : "left",
                    display: "flex",
                    flexDirection: "row"
                  }}
                >
                  <Stack sx={{ width: "40%", bgcolor: "#1a1a1a", borderRight: lang === "en" ? "1px solid rgba(255,255,255,0.04)" : "none", borderLeft: lang === "ar" ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <Box 
                      onMouseEnter={() => setHoveredFashionCategory("men-fashion")}
                      sx={{ 
                        p: 2, 
                        cursor: "pointer", 
                        bgcolor: hoveredFashionCategory === "men-fashion" ? "#222" : "transparent",
                        color: hoveredFashionCategory === "men-fashion" ? "#CB6116" : "#fff",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        fontFamily: '"Cairo", sans-serif',
                        fontSize: 12,
                        fontWeight: 700
                      }}
                    >
                      {lang === "ar" ? "أزياء الرجال >" : "MEN FASHION ❯"}
                    </Box>
                    <Box 
                      component={Link}
                      href={`/category/men/${lang}?sub=men-accessories`}
                      onClick={() => setActiveDropdown(null)}
                      sx={{ 
                        p: 2, 
                        color: "#fff",
                        textDecoration: "none",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        fontFamily: '"Cairo", sans-serif',
                        fontSize: 12,
                        fontWeight: 600,
                        "&:hover": { bgcolor: "#222", color: "#CB6116" }
                      }}
                    >
                      {lang === "ar" ? "إكسسوارات الرجال" : "MEN ACCESSORIES"}
                    </Box>
                  </Stack>
                  <Box sx={{ width: "60%", p: 2.5, maxHeight: "360px", overflowY: "auto" }}>
                    {hoveredFashionCategory === "men-fashion" && (
                      <Stack spacing={1.2}>
                        {[
                          { id: "men-formal-suits", label: lang === "ar" ? "بدل رسمية" : "MEN FORMAL SUITS" },
                          { id: "t-shirts-polos", label: lang === "ar" ? "تي شيرت وبولو" : "T-SHIRTS & POLOS" },
                          { id: "men-shirts", label: lang === "ar" ? "قمصان" : "MEN SHIRTS" },
                          { id: "men-outerwear", label: lang === "ar" ? "ملابس خارجية" : "MEN OUTERWEAR" },
                          { id: "men-shoes", label: lang === "ar" ? "أحذية" : "MEN SHOES" },
                          { id: "innerwear-sleepwear", label: lang === "ar" ? "ملابس داخلية ونوم" : "INNERWEAR & SLEEPWEAR" }
                        ].map((item) => (
                          <Typography
                            key={item.id}
                            component={Link}
                            href={`/category/men/${lang}?sub=${item.id}`}
                            onClick={() => setActiveDropdown(null)}
                            sx={{
                              color: "rgba(255,255,255,0.7)",
                              textDecoration: "none",
                              fontSize: "11.5px",
                              fontWeight: 500,
                              fontFamily: '"Cairo", sans-serif',
                              cursor: "pointer",
                              "&:hover": { color: "#CB6116" }
                            }}
                          >
                            {item.label}
                          </Typography>
                        ))}
                      </Stack>
                    )}
                  </Box>
                </MotionBox>
              )}
            </AnimatePresence>
          </Box>
          */}

          {/* Designers trigger */}
          <Box 
            onMouseEnter={() => handleMenuHover("designers")}
            onMouseLeave={() => handleMenuHover(null)}
            sx={{ display: "inline-block", height: "100%", position: "relative" }}
          >
            <Button component={Link} href={`/category/designers/${lang}`} className="luxury-link" sx={{ color: (activeDropdown === "designers" || isLinkActive("designers")) ? "#CB6116" : "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
              {t("Designers")}
            </Button>
            <AnimatePresence>
              {activeDropdown === "designers" && (
                <MotionBox
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.18 }}
                  onMouseEnter={() => setActiveDropdown("designers")}
                  onMouseLeave={() => setActiveDropdown(null)}
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: lang === "ar" ? "auto" : 0,
                    right: lang === "ar" ? 0 : "auto",
                    transform: "none",
                    width: "360px",
                    bgcolor: "#111111",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderTop: "none",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
                    p: 2,
                    zIndex: 99,
                    textAlign: lang === "ar" ? "right" : "left"
                  }}
                >
                  <Stack spacing={1.5} sx={{ width: "100%" }}>
                    {brandSuggestions.map((brand) => (
                      <Typography
                        key={brand.id}
                        component={Link}
                        href={`/brand/${brand.id}/${lang}`}
                        onClick={() => setActiveDropdown(null)}
                        sx={{
                          color: "rgba(255,255,255,0.8)",
                          textDecoration: "none",
                          fontSize: 12,
                          fontWeight: 600,
                          fontFamily: '"Cairo", sans-serif',
                          "&:hover": { color: "#CB6116" }
                        }}
                      >
                        {brand.label}
                      </Typography>
                    ))}
                  </Stack>
                </MotionBox>
              )}
            </AnimatePresence>
          </Box>

          {/* Fashion trigger */}
          <Box 
            onMouseEnter={() => handleMenuHover("fashion")}
            onMouseLeave={() => handleMenuHover(null)}
            sx={{ display: "inline-block", height: "100%", position: "relative" }}
          >
            <Button component={Link} href={`/category/fashion/${lang}`} className="luxury-link" sx={{ color: (activeDropdown === "fashion" || isLinkActive("fashion")) ? "#CB6116" : "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
              {t("Fashion")}
            </Button>
            <AnimatePresence>
              {activeDropdown === "fashion" && (
                <MotionBox
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.18 }}
                  onMouseEnter={() => setActiveDropdown("fashion")}
                  onMouseLeave={() => setActiveDropdown(null)}
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: lang === "ar" ? "auto" : 0,
                    right: lang === "ar" ? 0 : "auto",
                    width: "180px",
                    bgcolor: "#111111",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderTop: "none",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
                    p: 2,
                    zIndex: 99,
                    textAlign: lang === "ar" ? "right" : "left"
                  }}
                >
                  <Stack spacing={1.5} sx={{ width: "100%" }}>
                    {[
                      { label: lang === "ar" ? "النساء" : "WOMEN", href: `/category/fashion/${lang}?sub=women` },
                      { label: lang === "ar" ? "الرجال" : "MEN", href: `/category/fashion/${lang}?sub=men` }
                    ].map((opt) => (
                      <Typography
                        key={opt.label}
                        component={Link}
                        href={opt.href}
                        onClick={() => setActiveDropdown(null)}
                        sx={{
                          color: "rgba(255,255,255,0.8)",
                          textDecoration: "none",
                          fontSize: 12,
                          fontWeight: 600,
                          fontFamily: '"Cairo", sans-serif',
                          "&:hover": { color: "#CB6116" }
                        }}
                      >
                        {opt.label}
                      </Typography>
                    ))}
                  </Stack>
                </MotionBox>
              )}
            </AnimatePresence>
          </Box>

          {/* Perfumes trigger */}
          <Box 
            onMouseEnter={() => handleMenuHover("perfumes")}
            onMouseLeave={() => handleMenuHover(null)}
            sx={{ display: "inline-block", height: "100%", position: "relative" }}
          >
            <Button component={Link} href={`/category/perfumes/${lang}`} className="luxury-link" sx={{ color: (activeDropdown === "perfumes" || isLinkActive("perfumes")) ? "#CB6116" : "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
              {t("Perfumes")}
            </Button>
            <AnimatePresence>
              {activeDropdown === "perfumes" && (
                <MotionBox
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.18 }}
                  onMouseEnter={() => setActiveDropdown("perfumes")}
                  onMouseLeave={() => setActiveDropdown(null)}
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: lang === "ar" ? "auto" : 0,
                    right: lang === "ar" ? 0 : "auto",
                    width: "180px",
                    bgcolor: "#111111",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderTop: "none",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
                    p: 2,
                    zIndex: 99,
                    textAlign: lang === "ar" ? "right" : "left"
                  }}
                >
                  <Stack spacing={1.5} sx={{ width: "100%" }}>
                    {[
                      { label: lang === "ar" ? "النساء" : "WOMEN", href: `/category/perfumes/${lang}?sub=women` },
                      { label: lang === "ar" ? "الرجال" : "MEN", href: `/category/perfumes/${lang}?sub=men` },
                      { label: lang === "ar" ? "للجنسين" : "UNISEX", href: `/category/perfumes/${lang}?sub=unisex` }
                    ].map((opt) => (
                      <Typography
                        key={opt.label}
                        component={Link}
                        href={opt.href}
                        onClick={() => setActiveDropdown(null)}
                        sx={{
                          color: "rgba(255,255,255,0.8)",
                          textDecoration: "none",
                          fontSize: 12,
                          fontWeight: 600,
                          fontFamily: '"Cairo", sans-serif',
                          "&:hover": { color: "#CB6116" }
                        }}
                      >
                        {opt.label}
                      </Typography>
                    ))}
                  </Stack>
                </MotionBox>
              )}
            </AnimatePresence>
          </Box>

          {/* Skincare trigger */}
          <Box 
            onMouseEnter={() => handleMenuHover("skincare")}
            onMouseLeave={() => handleMenuHover(null)}
            sx={{ display: "inline-block", height: "100%", position: "relative" }}
          >
            <Button component={Link} href={`/category/skincare/${lang}`} className="luxury-link" sx={{ color: (activeDropdown === "skincare" || isLinkActive("skincare")) ? "#CB6116" : "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
              {t("Skincare")}
            </Button>
            <AnimatePresence>
              {activeDropdown === "skincare" && (
                <MotionBox
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.18 }}
                  onMouseEnter={() => setActiveDropdown("skincare")}
                  onMouseLeave={() => setActiveDropdown(null)}
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: lang === "ar" ? "auto" : 0,
                    right: lang === "ar" ? 0 : "auto",
                    width: "180px",
                    bgcolor: "#111111",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderTop: "none",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
                    p: 2,
                    zIndex: 99,
                    textAlign: lang === "ar" ? "right" : "left"
                  }}
                >
                  <Stack spacing={1.5} sx={{ width: "100%" }}>
                    {[
                      { label: lang === "ar" ? "النساء" : "WOMEN", href: `/category/skincare/${lang}?sub=women` },
                      { label: lang === "ar" ? "الرجال" : "MEN", href: `/category/skincare/${lang}?sub=men` }
                    ].map((opt) => (
                      <Typography
                        key={opt.label}
                        component={Link}
                        href={opt.href}
                        onClick={() => setActiveDropdown(null)}
                        sx={{
                          color: "rgba(255,255,255,0.8)",
                          textDecoration: "none",
                          fontSize: 12,
                          fontWeight: 600,
                          fontFamily: '"Cairo", sans-serif',
                          "&:hover": { color: "#CB6116" }
                        }}
                      >
                        {opt.label}
                      </Typography>
                    ))}
                  </Stack>
                </MotionBox>
              )}
            </AnimatePresence>
          </Box>

          <Button component={Link} href={`/category/dining/${lang}`} className="luxury-link" sx={{ color: isLinkActive("dining") ? "#CB6116" : "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
            {t("Dining")}
          </Button>

          <Button component={Link} href={`/blogs/${lang}`} className="luxury-link" sx={{ color: isLinkActive("blogs") ? "#CB6116" : "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
            {t("Blogs")}
          </Button>

          <Button component={Link} href={`/about/${lang}`} className="luxury-link" sx={{ color: isLinkActive("about") ? "#CB6116" : "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
            {t("About Us")}
          </Button>

          <Button component={Link} href={`/contact/${lang}`} className="luxury-link" sx={{ color: isLinkActive("contact") ? "#CB6116" : "rgba(255,255,255,.76)", px: 0, minWidth: 0, textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", fontFamily: '"Cairo", sans-serif' }}>
            {t("Contact Us")}
          </Button>
        </Stack>
      </Box>

      {/* Elegant Drawer Menu Overlay (Mobile) */}
      <Drawer
        anchor={lang === "ar" ? "right" : "left"}
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: 320,
            bgcolor: "#050505", // Luxury dark theme background (no grey!)
            boxShadow: "none",
            p: 4,
            display: "flex",
            flexDirection: "column",
            borderRight: lang === "en" ? "2px solid #CB6116" : "none",
            borderLeft: lang === "ar" ? "2px solid #CB6116" : "none"
          } 
        }}
      >
        <Stack spacing={4} sx={{ height: "100%", justifyContent: "space-between" }}>
          {/* Header Row */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" gap={1.2} alignItems="center">
              <Box component="img" src="/brand/logo.png" alt="Fashion Gate" sx={{ height: 26, width: "auto" }} />
              <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: 16, color: "#fff", fontWeight: 700, letterSpacing: "0.05em" }}>FASHION GATE</Typography>
            </Stack>
            <IconButton onClick={() => setOpen(false)} sx={{ color: "#fff", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 0 }}>
              <CloseIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Stack>
          
          {/* Navigation Links */}
          <Stack spacing={3.2} sx={{ overflowY: "auto", py: 4, alignItems: "center" }}>
            {[
              { label: t("Home"), href: `/${lang}` },
              { label: t("Women"), href: `/category/women/${lang}` },
              { label: t("Men"), href: `/category/men/${lang}` },
              { label: t("Designers"), href: `/category/designers/${lang}` },
              { label: t("Fashion"), href: `/category/fashion/${lang}` },
              { label: t("Perfumes"), href: `/category/perfumes/${lang}` },
              { label: t("Skincare"), href: `/category/skincare/${lang}` },
              { label: t("Dining"), href: `/category/dining/${lang}` },
              { label: t("Blogs"), href: `/blogs/${lang}` },
              { label: t("About Us"), href: `/about/${lang}` },
              { label: t("Contact Us"), href: `/contact/${lang}` }
            ].map((item) => (
              <MuiLink
                key={item.label}
                component={Link}
                href={item.href}
                onClick={() => setOpen(false)}
                sx={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: 15,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  textDecoration: "none",
                  fontFamily: '"Cairo", sans-serif',
                  transition: "all 0.25s ease",
                  textAlign: "center",
                  "&:hover": { 
                    color: "#CB6116",
                    transform: "scale(1.05)"
                  }
                }}
              >
                {item.label}
              </MuiLink>
            ))}
          </Stack>

          {/* Bottom Drawer Section (Sign In & Socials) */}
          <Stack spacing={2.5} sx={{ borderTop: "1px solid rgba(255,255,255,0.08)", pt: 3, mt: "auto" }}>
            <Button
              component={Link}
              href={`/login/${lang}`}
              onClick={() => setOpen(false)}
              fullWidth
              sx={{
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 0,
                py: 1,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.15em",
                fontFamily: '"Cairo", sans-serif',
                "&:hover": { bgcolor: "rgba(255,255,255,0.05)" }
              }}
            >
              {t("Sign In / Register")}
            </Button>
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
}
