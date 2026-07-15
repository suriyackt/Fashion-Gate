"use client";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Container, Drawer, IconButton, Stack, Typography, Divider, Link as MuiLink } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useLoader } from "@/components/LoaderProvider";
import type { Product } from "@/lib/productData";
import { getBrandById } from "@/lib/brandData";
import { getAnnouncements, getLocalizedValue } from "@/lib/sanity";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Tooltip from "./Tooltip";

export function resolvePath(href: string, lang: "ar" | "en") {
  if (!href) return `/${lang}`;
  if (href.startsWith("#")) return `/${lang}${href}`;
  if (href.startsWith("http://") || href.startsWith("https://")) return href;

  let cleanHref = href.replace(/^\/+|\/+$/g, "");
  const categories = ["women", "men", "perfumes", "skincare", "dining", "fashion", "designers"];
  const parts = cleanHref.split("/");
  const firstPart = parts[0];
  
  if (categories.includes(firstPart)) {
    cleanHref = `category/${cleanHref}`;
  }

  const partsList = cleanHref.split("/");
  const lastPart = partsList[partsList.length - 1];
  if (lastPart !== "ar" && lastPart !== "en") {
    return `/${cleanHref}/${lang}`;
  }
  return `/${cleanHref}`;
}

const MotionBox = motion.create(Box);

// Custom graphical flag SVGs (renders pixel-perfect flags on Windows / Segoe UI)


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
  { id: "elie-saab", label: "Elie Saab" },
  { id: "gucci", label: "Gucci" },
  { id: "maxmara", label: "MaxMara" },
  { id: "prada", label: "Prada" },
  { id: "valentino", label: "Valentino" },
  { id: "ysl", label: "Saint Laurent" },
  { id: "calvin-klein", label: "CALVIN KLEIN" },
  { id: "hugo-boss", label: "Hugo Boss" },
  { id: "giorgio-armani", label: "Giorgio Armani" },
  { id: "paul-shark", label: "PAUL & SHARK" },
  { id: "sandro", label: "SANDRO" },
  { id: "editorial", label: "EDITORIAL" },
  { id: "moje", label: "moje" },
  { id: "adidas", label: "adidas" },
  { id: "skechers", label: "SKECHERS" },
  { id: "cartier", label: "Cartier" },
  { id: "lancome", label: "Lancôme" },
  { id: "jimmy-choo", label: "Jimmy Choo" },
  { id: "coach", label: "Coach" }
];

const brandLabels: Record<string, { en: string; ar: string }> = {
  "elie-saab": { en: "Elie Saab", ar: "إيلي صعب" },
  "gucci": { en: "Gucci", ar: "غوتشي" },
  "maxmara": { en: "MaxMara", ar: "ماكس مارا" },
  "prada": { en: "Prada", ar: "برادا" },
  "valentino": { en: "Valentino", ar: "فالنتينو" },
  "ysl": { en: "Saint Laurent", ar: "سان لوران" },
  "calvin-klein": { en: "CALVIN KLEIN", ar: "كالفين كلاين" },
  "hugo-boss": { en: "Hugo Boss", ar: "هوغو بوس" },
  "giorgio-armani": { en: "Giorgio Armani", ar: "جورجيو أرماني" },
  "paul-shark": { en: "PAUL & SHARK", ar: "بول آند شارك" },
  "sandro": { en: "SANDRO", ar: "ساندرو" },
  "editorial": { en: "EDITORIAL", ar: "إيديتوريال" },
  "moje": { en: "moje", ar: "موهي" },
  "adidas": { en: "Adidas", ar: "أديداس" },
  "skechers": { en: "SKECHERS", ar: "سكيتشرز" },
  "cartier": { en: "Cartier", ar: "كارتييه" },
  "lancome": { en: "Lancôme", ar: "لانكوم" },
  "jimmy-choo": { en: "Jimmy Choo", ar: "جيمي تشو" },
  "coach": { en: "Coach", ar: "كوتش" }
};

const categoriesConfig = [
  {
    title: { en: "Luxury Fashion & Haute Couture", ar: "الأزياء الفاخرة والراقية" },
    brandIds: ["elie-saab", "gucci", "maxmara", "prada", "valentino", "ysl"]
  },
  {
    title: { en: "Contemporary & Premium Apparel", ar: "الملابس المعاصرة والمميزة" },
    brandIds: ["calvin-klein", "hugo-boss", "giorgio-armani", "paul-shark", "sandro", "editorial"]
  },
  {
    title: { en: "Independent & Creative Design", ar: "التصميم المستقل والإبداعي" },
    brandIds: ["moje"]
  },
  {
    title: { en: "Footwear & Athletic Lifestyle", ar: "الأحذية والأنشطة الرياضية" },
    brandIds: ["adidas", "skechers"]
  },
  {
    title: { en: "Fine Jewelry & Luxury Timepieces", ar: "المجوهرات الراقية والساعات الفاخرة" },
    brandIds: ["cartier"]
  },
  {
    title: { en: "Premium Beauty & Skincare", ar: "العناية بالبشرة والجمال الفاخر" },
    brandIds: ["lancome"]
  },
  {
    title: { en: "Luxury Accessories & Leather Goods", ar: "الإكسسوارات الفاخرة والمنتجات الجلدية" },
    brandIds: ["jimmy-choo", "coach"]
  }
];

function AnnouncementBar({ lang }: { lang: "ar" | "en" }) {
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

  if (announcements.length === 0) return null;

  // Duplicate items sufficiently to cover screen width and ensure seamless loops
  const marqueeItems = [...announcements, ...announcements, ...announcements, ...announcements];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-header-scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .marquee-header-container {
          display: flex;
          align-items: center;
          white-space: nowrap;
          width: max-content;
          animation: marquee-header-scroll 35s linear infinite;
        }
        .marquee-header-container:hover {
          animation-play-state: paused;
        }
      `}} />
      <Box 
        component="div"
        dir="ltr"
        sx={{ 
          bgcolor: "#050505", 
          color: "#CB6116", 
          py: 0.9, 
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          position: "relative",
          minHeight: 38,
          overflow: "hidden",
          display: "flex",
          alignItems: "center"
        }}
      >
        <Box className="marquee-header-container" dir="ltr">
          {marqueeItems.map((item, idx) => (
            <Box 
              key={idx} 
              sx={{ 
                display: "inline-flex", 
                alignItems: "center",
                mx: 3
              }}
            >
              {item.link ? (
                <Typography
                  component={Link}
                  href={item.link}
                  sx={{
                    fontFamily: '"Cairo", sans-serif',
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textDecoration: "none",
                    color: "#ffffff",
                    "&:hover": { textDecoration: "underline" }
                  }}
                >
                  {item.text}
                </Typography>
              ) : (
                <Typography
                  sx={{
                    fontFamily: '"Cairo", sans-serif',
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    color: "#ffffff"
                  }}
                >
                  {item.text}
                </Typography>
              )}
              {/* Luxury Diamond Spacer */}
              <Box component="span" sx={{ color: "rgba(255, 255, 255, 0.28)", ml: 6, fontSize: 10 }}>
                ✦
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
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
  placeholderText?: string;
  departmentsHeading?: string;
  suggestedBrandsHeading?: string;
  matchingHeading?: string;
  departmentsList?: any[] | null;
  suggestedBrandsList?: any[] | null;
}

function SearchOption({
  lang,
  isMobile = false,
  searchActive,
  setSearchActive,
  searchQuery,
  setSearchQuery,
  products,
  placeholderText,
  departmentsHeading,
  suggestedBrandsHeading,
  matchingHeading,
  departmentsList,
  suggestedBrandsList
}: SearchOptionProps) {
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

  const resolvedPlaceholder = placeholderText || (lang === "ar" ? "ابحث في البوليفارد..." : "Search...");
  const resolvedDepsHeading = departmentsHeading || (lang === "ar" ? "الأقسام المقتارة" : "Departments");
  const resolvedSuggestedHeading = suggestedBrandsHeading || (lang === "ar" ? "دور الفخامة" : "Suggested Brands");
  const resolvedMatchingHeading = matchingHeading || (lang === "ar" ? "النتائج المطابقة" : "Matching Pieces");

  const resolvedDeps = useMemo(() => {
    if (departmentsList && departmentsList.length > 0) {
      return departmentsList.map(item => {
        const lbl = lang === "ar" ? item.label?.ar || item.label?.en : item.label?.en || item.label?.ar;
        let hr = item.href || "/";
        if (hr !== "/" && !hr.startsWith("#")) {
          const parts = hr.split("/").filter(Boolean);
          if (parts[parts.length - 1] !== "ar" && parts[parts.length - 1] !== "en") {
            hr = `/${parts.join("/")}/${lang}`;
          }
        } else if (hr === "/") {
          hr = `/${lang}`;
        }
        return { label: lbl || "", href: hr };
      });
    }
    return [
      { label: lang === "ar" ? "العطور" : "Perfumes", href: `/category/perfumes/${lang}` },
      { label: lang === "ar" ? "العناية بالبشرة" : "Skincare", href: `/category/skincare/${lang}` }
    ];
  }, [departmentsList, lang]);

  const resolvedBrands = useMemo(() => {
    if (suggestedBrandsList && suggestedBrandsList.length > 0) {
      return suggestedBrandsList.map(item => {
        const brandId = item.slug?.current || item._id || "";
        let label = item.title;
        if (lang === "ar") {
          if (item.titleAr) {
            label = item.titleAr;
          } else {
            const local = getBrandById(brandId);
            if (local?.nameAr) {
              label = local.nameAr;
            }
          }
        }
        return {
          id: brandId,
          label: label
        };
      });
    }
    return brandSuggestions.map(item => {
      if (lang === "ar") {
        const local = getBrandById(item.id);
        if (local?.nameAr) {
          return { id: item.id, label: local.nameAr };
        }
      }
      return item;
    });
  }, [suggestedBrandsList, lang]);

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
          placeholder={resolvedPlaceholder}
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
                    {resolvedDepsHeading}
                  </Typography>
                  <Stack spacing={1} alignItems="flex-start">
                    {resolvedDeps.map((item, idx) => (
                      <Button
                        key={idx}
                        component={Link}
                        href={item.href}
                        onClick={handleLinkClick}
                        sx={{ color: "#111111", fontSize: 12, p: 0, minWidth: 0, fontFamily: '"Cairo", sans-serif', textTransform: "none", "&:hover": { color: "#CB6116" } }}
                      >
                        {item.label}
                      </Button>
                    ))}
                  </Stack>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: 10, fontWeight: 800, color: "#CB6116", textTransform: "uppercase", letterSpacing: "0.15em", mb: 1.5, fontFamily: '"Cairo", sans-serif' }}>
                    {resolvedSuggestedHeading}
                  </Typography>
                  <Stack spacing={1} alignItems="flex-start">
                    {resolvedBrands.map((item) => (
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
                  {resolvedMatchingHeading}
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
                      const brandObj = getBrandById(p.brandId);
                      const brandName = brandObj ? (lang === "ar" ? brandObj.nameAr : brandObj.name) : p.brandId.toUpperCase();
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
                                {brandName} — {cat}
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
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [hoveredFashionCategory, setHoveredFashionCategory] = useState<"women-fashion" | "men-fashion" | null>(null);
  const [sanityBrands, setSanityBrands] = useState<any[]>([]);
  const [headerMenuItems, setHeaderMenuItems] = useState<any[]>([]);
  const [expandedMobileItem, setExpandedMobileItem] = useState<number | null>(null);

  // Sanity header settings states
  const [logoTitle, setLogoTitle] = useState<{ en?: string; ar?: string } | null>(null);
  const [logoImageUrl, setLogoImageUrl] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState<boolean>(true);
  const [searchPlaceholder, setSearchPlaceholder] = useState<{ en?: string; ar?: string } | null>(null);
  const [showLanguageSwitcher, setShowLanguageSwitcher] = useState<boolean>(true);
  const [showUserProfile, setShowUserProfile] = useState<boolean>(true);
  const [searchDepartmentsHeading, setSearchDepartmentsHeading] = useState<{ en?: string; ar?: string } | null>(null);
  const [searchSuggestedBrandsHeading, setSearchSuggestedBrandsHeading] = useState<{ en?: string; ar?: string } | null>(null);
  const [searchMatchingHeading, setSearchMatchingHeading] = useState<{ en?: string; ar?: string } | null>(null);
  const [searchDepartments, setSearchDepartments] = useState<any[] | null>(null);
  const [searchSuggestedBrands, setSearchSuggestedBrands] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const { sanityClient } = await import("@/lib/sanity");
        
        // Fetch brands
        const brandsData = await sanityClient.fetch(`*[_type == "brand" && isActive == true] {
          _id,
          slug
        }`);
        if (brandsData) {
          setSanityBrands(brandsData);
        }

        // Fetch header settings
        const headerData = await sanityClient.fetch(`*[_type == "header"][0] {
          logoTitle { en, ar },
          logoImage {
            asset-> {
              _id,
              url
            }
          },
          showSearch,
          searchPlaceholder { en, ar },
          showLanguageSwitcher,
          showUserProfile,
          searchDepartmentsHeading { en, ar },
          searchSuggestedBrandsHeading { en, ar },
          searchMatchingHeading { en, ar },
          searchDepartments[] {
            label { en, ar },
            href
          },
          searchSuggestedBrands[]-> {
            _id,
            title,
            titleAr,
            slug
          },
          menuItems[] {
            label { en, ar },
            href,
            designerCategories[]-> {
              _id,
              title { en, ar },
              brands[]-> {
                _id,
                title,
                titleAr,
                slug,
                isActive
              }
            }
          }
        }`);
        if (headerData) {
          if (headerData.logoTitle) setLogoTitle(headerData.logoTitle);
          if (headerData.logoImage?.asset?.url) setLogoImageUrl(headerData.logoImage.asset.url);
          if (headerData.showSearch !== undefined) setShowSearch(headerData.showSearch);
          if (headerData.searchPlaceholder) setSearchPlaceholder(headerData.searchPlaceholder);
          if (headerData.showLanguageSwitcher !== undefined) setShowLanguageSwitcher(headerData.showLanguageSwitcher);
          if (headerData.showUserProfile !== undefined) setShowUserProfile(headerData.showUserProfile);
          if (headerData.searchDepartmentsHeading) setSearchDepartmentsHeading(headerData.searchDepartmentsHeading);
          if (headerData.searchSuggestedBrandsHeading) setSearchSuggestedBrandsHeading(headerData.searchSuggestedBrandsHeading);
          if (headerData.searchMatchingHeading) setSearchMatchingHeading(headerData.searchMatchingHeading);
          if (headerData.searchDepartments) setSearchDepartments(headerData.searchDepartments);
          if (headerData.searchSuggestedBrands) setSearchSuggestedBrands(headerData.searchSuggestedBrands);
          if (headerData.menuItems) setHeaderMenuItems(headerData.menuItems);
        }
      } catch (e) {
        console.error("Failed to fetch header data for navigation:", e);
      }
    };
    fetchHeaderData();
  }, []);

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



  const handleMenuHover = (idx: number | null) => {
    setActiveDropdown(idx);
  };

  const getColumnCategories = (designerCats: any[]) => {
    const cols: any[][] = [[], [], []];
    if (!designerCats) return cols;

    const activeCats = designerCats.map(cat => ({
      title: {
        en: cat.title?.en || "",
        ar: cat.title?.ar || cat.title?.en || ""
      },
      brands: (cat.brands || [])
        .filter((b: any) => b.isActive !== false)
        .map((b: any) => {
          const brandId = b.slug?.current || b._id || "";
          let label = b.title;
          if (lang === "ar") {
            if (b.titleAr) {
              label = b.titleAr;
            } else {
              const local = getBrandById(brandId);
              if (local?.nameAr) {
                label = local.nameAr;
              }
            }
          }
          return {
            id: brandId,
            label: label
          };
        })
    })).filter(cat => cat.brands.length > 0);

    activeCats.forEach(cat => {
      let minColIdx = 0;
      let minWeight = cols[0].reduce((sum, c) => sum + c.brands.length + 3, 0);
      
      for (let i = 1; i < 3; i++) {
        const weight = cols[i].reduce((sum, c) => sum + c.brands.length + 3, 0);
        if (weight < minWeight) {
          minWeight = weight;
          minColIdx = i;
        }
      }
      cols[minColIdx].push(cat);
    });

    return cols;
  };

  const renderColumnCategories = (cats: any[]) => {
    if (!cats) return [];
    const activeBlocks: React.ReactNode[] = [];
    cats.forEach(cat => {
      const activeBrands = cat.brands;
      if (activeBrands.length > 0) {
        const catTitle = lang === "ar" ? cat.title.ar : cat.title.en;
        activeBlocks.push(
          <Box key={catTitle}>
            <Typography sx={{ fontSize: 10, fontWeight: 800, color: "#CB6116", textTransform: "uppercase", letterSpacing: "0.15em", mb: 2, fontFamily: '"Cairo", sans-serif' }}>
              {catTitle}
            </Typography>
            <Stack spacing={1.2} alignItems="flex-start">
              {activeBrands.map((b: any) => (
                <Typography
                  key={b.id}
                  component={Link}
                  href={`/brand/${b.id}/${lang}`}
                  onClick={() => setActiveDropdown(null)}
                  sx={{
                    color: "#333333",
                    textDecoration: "none",
                    fontSize: 12.5,
                    fontWeight: 500,
                    fontFamily: '"Cairo", sans-serif',
                    "&:hover": { color: "#CB6116", transform: lang === "ar" ? "translateX(-4px)" : "translateX(4px)" },
                    transition: "all 0.2s ease"
                  }}
                >
                  {b.label}
                </Typography>
              ))}
            </Stack>
          </Box>
        );
      }
    });

    return activeBlocks.reduce((acc: React.ReactNode[], block, i) => {
      if (i > 0) {
        acc.push(<Divider key={`div-${i}`} sx={{ borderColor: "rgba(0,0,0,0.06)" }} />);
      }
      acc.push(block);
      return acc;
    }, []);
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
                src={logoImageUrl || "/brand/logo.png"} 
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
                {lang === "ar" ? logoTitle?.ar || "بوابة الأزياء" : logoTitle?.en || "FASHION GATE"}
              </Typography>
            </Stack>
          </Box>

          {/* Search, Language Selector, User Profile Icon on the right */}
          <Stack direction="row" spacing={{ xs: 1, sm: 1.5, md: 2 }} alignItems="center">
            {/* Search Option */}
            {showSearch && (
              <SearchOption 
                lang={lang} 
                searchActive={searchActive} 
                setSearchActive={setSearchActive} 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
                products={headerProducts}
                placeholderText={lang === "ar" ? searchPlaceholder?.ar : searchPlaceholder?.en}
                departmentsHeading={lang === "ar" ? searchDepartmentsHeading?.ar : searchDepartmentsHeading?.en}
                suggestedBrandsHeading={lang === "ar" ? searchSuggestedBrandsHeading?.ar : searchSuggestedBrandsHeading?.en}
                matchingHeading={lang === "ar" ? searchMatchingHeading?.ar : searchMatchingHeading?.en}
                departmentsList={searchDepartments}
                suggestedBrandsList={searchSuggestedBrands}
              />
            )}

            {showLanguageSwitcher && (
              <LanguageSwitcher 
                currentLang={lang} 
                onToggleStart={onLangToggleStart} 
              />
            )}

            {/* Profile Button */}
            {showUserProfile && (
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
            )}

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
          {(() => {
            const fallbackMenuItems = [
              { label: { en: "Home", ar: "الرئيسية" }, href: "/" },
              { 
                label: { en: "Designers", ar: "المصممون" }, 
                href: "/brand/elie-saab",
                designerCategories: [
                  {
                    title: { en: "Luxury Fashion & Haute Couture", ar: "الأزياء الفاخرة والراقية" },
                    brands: [
                      { slug: { current: "elie-saab" }, title: "Elie Saab" },
                      { slug: { current: "gucci" }, title: "Gucci" },
                      { slug: { current: "maxmara" }, title: "MaxMara" },
                      { slug: { current: "prada" }, title: "Prada" },
                      { slug: { current: "valentino" }, title: "Valentino" },
                      { slug: { current: "ysl" }, title: "YSL" }
                    ]
                  },
                  {
                    title: { en: "Contemporary & Premium Apparel", ar: "الملابس المعاصرة والمميزة" },
                    brands: [
                      { slug: { current: "calvin-klein" }, title: "CALVIN KLEIN" },
                      { slug: { current: "hugo-boss" }, title: "Hugo Boss" },
                      { slug: { current: "giorgio-armani" }, title: "Giorgio Armani" },
                      { slug: { current: "paul-shark" }, title: "PAUL & SHARK" },
                      { slug: { current: "sandro" }, title: "SANDRO" },
                      { slug: { current: "editorial" }, title: "EDITORIAL" }
                    ]
                  },
                  {
                    title: { en: "Independent & Creative Design", ar: "التصميم المستقل والإبداعي" },
                    brands: [{ slug: { current: "moje" }, title: "moje" }]
                  },
                  {
                    title: { en: "Footwear & Athletic Lifestyle", ar: "الأحذية والأنشطة الرياضية" },
                    brands: [
                      { slug: { current: "adidas" }, title: "Adidas" },
                      { slug: { current: "skechers" }, title: "SKECHERS" }
                    ]
                  },
                  {
                    title: { en: "Fine Jewelry & Luxury Timepieces", ar: "المجوهرات الراقية والساعات الفاخرة" },
                    brands: [{ slug: { current: "cartier" }, title: "Cartier" }]
                  },
                  {
                    title: { en: "Premium Beauty & Skincare", ar: "العناية بالبشرة والجمال الفاخر" },
                    brands: [{ slug: { current: "lancome" }, title: "Lancôme" }]
                  },
                  {
                    title: { en: "Luxury Accessories & Leather Goods", ar: "الإكسسوارات الفاخرة والمنتجات الجلدية" },
                    brands: [
                      { slug: { current: "jimmy-choo" }, title: "Jimmy Choo" },
                      { slug: { current: "coach" }, title: "Coach" }
                    ]
                  }
                ]
              },
              { 
                label: { en: "Fashion", ar: "الأزياء" }, 
                href: "/category/fashion",
                designerCategories: [
                  {
                    title: { en: "Contemporary & Premium Apparel", ar: "الملابس المعاصرة والمميزة" },
                    brands: [
                      { slug: { current: "calvin-klein" }, title: "CALVIN KLEIN" },
                      { slug: { current: "hugo-boss" }, title: "Hugo Boss" },
                      { slug: { current: "giorgio-armani" }, title: "Giorgio Armani" },
                      { slug: { current: "paul-shark" }, title: "PAUL & SHARK" },
                      { slug: { current: "sandro" }, title: "SANDRO" },
                      { slug: { current: "editorial" }, title: "EDITORIAL" }
                    ]
                  }
                ]
              },
              { 
                label: { en: "Perfumes", ar: "العطور" }, 
                href: "/category/perfumes",
                designerCategories: [
                  {
                    title: { en: "Premium Beauty & Skincare", ar: "العناية بالبشرة والجمال الفاخر" },
                    brands: [{ slug: { current: "lancome" }, title: "Lancôme" }]
                  }
                ]
              },
              { 
                label: { en: "Skincare", ar: "العناية بالبشرة" }, 
                href: "/category/skincare",
                designerCategories: [
                  {
                    title: { en: "Premium Beauty & Skincare", ar: "العناية بالبشرة والجمال الفاخر" },
                    brands: [{ slug: { current: "lancome" }, title: "Lancôme" }]
                  }
                ]
              },
              { label: { en: "Dining", ar: "المطاعم" }, href: "/category/dining" },
              { label: { en: "About Us", ar: "من نحن" }, href: "/about" },
              { label: { en: "Contact Us", ar: "اتصل بنا" }, href: "/contact" }
            ];

            const activeMenuItems = headerMenuItems && headerMenuItems.length > 0 ? headerMenuItems : fallbackMenuItems;

            return activeMenuItems.map((item, idx) => {
              const isFashion = item.href?.includes("/category/fashion");
              const isPerfumes = item.href?.includes("/category/perfumes");
              const isSkincare = item.href?.includes("/category/skincare");
              const isCategoryDropdown = isFashion || isPerfumes || isSkincare;
              const hasDropdown = isCategoryDropdown || (item.designerCategories && item.designerCategories.length > 0);
              const labelStr = lang === "ar" ? item.label?.ar || item.label?.en : item.label?.en || item.label?.ar;
              
              const finalHref = resolvePath(item.href, lang);

              const isCurrentActive = (() => {
                if (!pathname) return false;
                const cleanPath = pathname.replace(/\/(en|ar)(\/|$)/, "") || "/";
                const cleanHref = item.href ? item.href.replace(/\/(en|ar)(\/|$)/, "") || "/" : "/";
                if (cleanHref === "/") return cleanPath === "/";
                if (cleanHref.startsWith("/category/")) return cleanPath.startsWith(cleanHref);
                if (cleanHref.startsWith("/brand/")) return cleanPath.startsWith("/brand/");
                return cleanPath === cleanHref || cleanPath.startsWith(cleanHref);
              })();

              return (
                <Box
                  key={idx}
                  onMouseEnter={() => hasDropdown && handleMenuHover(idx)}
                  onMouseLeave={() => hasDropdown && handleMenuHover(null)}
                  sx={{ display: "inline-block", height: "100%", position: "relative" }}
                >
                  <Button
                    component={Link}
                    href={finalHref}
                    className="luxury-link"
                    onClick={(e) => {
                      if (hasDropdown && !isCategoryDropdown) {
                        e.preventDefault();
                      }
                    }}
                    sx={{
                      color: (activeDropdown === idx || isCurrentActive) ? "#CB6116" : "rgba(255,255,255,.76)",
                      px: 0,
                      minWidth: 0,
                      textTransform: "uppercase",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                      fontFamily: '"Cairo", sans-serif'
                    }}
                  >
                    {labelStr}
                  </Button>

                  {hasDropdown && (
                    <AnimatePresence>
                      {activeDropdown === idx && (
                        <MotionBox
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.18 }}
                          onMouseEnter={() => setActiveDropdown(idx)}
                          onMouseLeave={() => setActiveDropdown(null)}
                          sx={
                            (!isCategoryDropdown && item.designerCategories.length > 2)
                              ? {
                                  position: "absolute",
                                  top: "100%",
                                  left: lang === "ar" ? "auto" : { xs: "-100px", md: "-320px" },
                                  right: lang === "ar" ? { xs: "-100px", md: "-320px" } : "auto",
                                  width: { xs: "90vw", sm: "650px", md: "860px" },
                                  bgcolor: "#ffffff",
                                  border: "1px solid rgba(0,0,0,0.08)",
                                  borderTop: "3px solid #CB6116",
                                  boxShadow: "0 25px 50px rgba(0,0,0,0.12)",
                                  p: 4,
                                  zIndex: 99,
                                  textAlign: lang === "ar" ? "right" : "left",
                                  color: "#111111"
                                }
                              : {
                                  position: "absolute",
                                  top: "100%",
                                  left: lang === "ar" ? "auto" : 0,
                                  right: lang === "ar" ? 0 : "auto",
                                  width: "220px",
                                  bgcolor: "#ffffff",
                                  border: "1px solid rgba(0,0,0,0.08)",
                                  borderTop: "3px solid #CB6116",
                                  boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
                                  p: 2.5,
                                  zIndex: 99,
                                  textAlign: lang === "ar" ? "right" : "left"
                                }
                          }
                        >
                          {isCategoryDropdown ? (
                            <Stack spacing={2} sx={{ width: "100%" }}>
                              {(isFashion || isSkincare) ? (
                                [
                                  { label: lang === "ar" ? "النساء" : "WOMEN", href: `/category/${isFashion ? "fashion" : "skincare"}/${lang}?sub=women` },
                                  { label: lang === "ar" ? "الرجال" : "MEN", href: `/category/${isFashion ? "fashion" : "skincare"}/${lang}?sub=men` }
                                ].map((opt) => (
                                  <Typography
                                    key={opt.label}
                                    component={Link}
                                    href={opt.href}
                                    onClick={() => setActiveDropdown(null)}
                                    sx={{
                                      color: "#333333",
                                      textDecoration: "none",
                                      fontSize: 12.5,
                                      fontWeight: 600,
                                      fontFamily: '"Cairo", sans-serif',
                                      "&:hover": { color: "#CB6116", transform: lang === "ar" ? "translateX(-4px)" : "translateX(4px)" },
                                      transition: "all 0.2s ease"
                                    }}
                                  >
                                    {opt.label}
                                  </Typography>
                                ))
                              ) : (
                                [
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
                                      color: "#333333",
                                      textDecoration: "none",
                                      fontSize: 12.5,
                                      fontWeight: 600,
                                      fontFamily: '"Cairo", sans-serif',
                                      "&:hover": { color: "#CB6116", transform: lang === "ar" ? "translateX(-4px)" : "translateX(4px)" },
                                      transition: "all 0.2s ease"
                                    }}
                                  >
                                    {opt.label}
                                  </Typography>
                                ))
                              )}
                            </Stack>
                          ) : item.designerCategories.length > 2 ? (
                            (() => {
                              const cols = getColumnCategories(item.designerCategories);
                              return (
                                <Box
                                  sx={{
                                    display: "grid",
                                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
                                    gap: 4
                                  }}
                                >
                                  <Stack spacing={3}>
                                    {renderColumnCategories(cols[0])}
                                  </Stack>
                                  <Stack spacing={3}>
                                    {renderColumnCategories(cols[1])}
                                  </Stack>
                                  <Stack spacing={3}>
                                    {renderColumnCategories(cols[2])}
                                  </Stack>
                                </Box>
                              );
                            })()
                          ) : (
                            <Stack spacing={2.5} sx={{ width: "100%" }}>
                              {renderColumnCategories(
                                item.designerCategories.map((cat: any) => ({
                                  title: {
                                    en: cat.title?.en || "",
                                    ar: cat.title?.ar || cat.title?.en || ""
                                  },
                                  brands: (cat.brands || [])
                                    .filter((b: any) => b.isActive !== false)
                                    .map((b: any) => {
                                      const brandId = b.slug?.current || b._id || "";
                                      let label = b.title;
                                      if (lang === "ar") {
                                        if (b.titleAr) {
                                          label = b.titleAr;
                                        } else {
                                          const local = getBrandById(brandId);
                                          if (local?.nameAr) {
                                            label = local.nameAr;
                                          }
                                        }
                                      }
                                      return {
                                        id: brandId,
                                        label: label
                                      };
                                    })
                                }))
                              )}
                            </Stack>
                          )}
                        </MotionBox>
                      )}
                    </AnimatePresence>
                  )}
                </Box>
              );
            });
          })()}
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
              <Box component="img" src={logoImageUrl || "/brand/logo.png"} alt="Fashion Gate" sx={{ height: 26, width: "auto" }} />
              <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: 16, color: "#fff", fontWeight: 700, letterSpacing: "0.05em" }}>
                {lang === "ar" ? logoTitle?.ar || "بوابة الأزياء" : logoTitle?.en || "FASHION GATE"}
              </Typography>
            </Stack>
            <IconButton onClick={() => setOpen(false)} sx={{ color: "#fff", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 0 }}>
              <CloseIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Stack>
          
          {/* Navigation Links */}
          <Stack spacing={3.2} sx={{ overflowY: "auto", py: 4, alignItems: "center" }}>
            {(() => {
              const fallbackMenuItems = [
                { label: { en: "Home", ar: "الرئيسية" }, href: "/" },
                { 
                  label: { en: "Designers", ar: "المصممون" }, 
                  href: "/brand/elie-saab",
                  designerCategories: [
                    {
                      title: { en: "Luxury Fashion & Haute Couture", ar: "الأزياء الفاخرة والراقية" },
                      brands: [
                        { slug: { current: "elie-saab" }, title: "Elie Saab" },
                        { slug: { current: "gucci" }, title: "Gucci" },
                        { slug: { current: "maxmara" }, title: "MaxMara" },
                        { slug: { current: "prada" }, title: "Prada" },
                        { slug: { current: "valentino" }, title: "Valentino" },
                        { slug: { current: "ysl" }, title: "YSL" }
                      ]
                    },
                    {
                      title: { en: "Contemporary & Premium Apparel", ar: "الملابس المعاصرة والمميزة" },
                      brands: [
                        { slug: { current: "calvin-klein" }, title: "CALVIN KLEIN" },
                        { slug: { current: "hugo-boss" }, title: "Hugo Boss" },
                        { slug: { current: "giorgio-armani" }, title: "Giorgio Armani" },
                        { slug: { current: "paul-shark" }, title: "PAUL & SHARK" },
                        { slug: { current: "sandro" }, title: "SANDRO" },
                        { slug: { current: "editorial" }, title: "EDITORIAL" }
                      ]
                    },
                    {
                      title: { en: "Independent & Creative Design", ar: "التصميم المستقل والإبداعي" },
                      brands: [{ slug: { current: "moje" }, title: "moje" }]
                    },
                    {
                      title: { en: "Footwear & Athletic Lifestyle", ar: "الأحذية والأنشطة الرياضية" },
                      brands: [
                        { slug: { current: "adidas" }, title: "Adidas" },
                        { slug: { current: "skechers" }, title: "SKECHERS" }
                      ]
                    },
                    {
                      title: { en: "Fine Jewelry & Luxury Timepieces", ar: "المجوهرات الراقية والساعات الفاخرة" },
                      brands: [{ slug: { current: "cartier" }, title: "Cartier" }]
                    },
                    {
                      title: { en: "Premium Beauty & Skincare", ar: "العناية بالبشرة والجمال الفاخر" },
                      brands: [{ slug: { current: "lancome" }, title: "Lancôme" }]
                    },
                    {
                      title: { en: "Luxury Accessories & Leather Goods", ar: "الإكسسوارات الفاخرة والمنتجات الجلدية" },
                      brands: [
                        { slug: { current: "jimmy-choo" }, title: "Jimmy Choo" },
                        { slug: { current: "coach" }, title: "Coach" }
                      ]
                    }
                  ]
                },
                { 
                  label: { en: "Fashion", ar: "الأزياء" }, 
                  href: "/category/fashion",
                  designerCategories: [
                    {
                      title: { en: "Contemporary & Premium Apparel", ar: "الملابس المعاصرة والمميزة" },
                      brands: [
                        { slug: { current: "calvin-klein" }, title: "CALVIN KLEIN" },
                        { slug: { current: "hugo-boss" }, title: "Hugo Boss" },
                        { slug: { current: "giorgio-armani" }, title: "Giorgio Armani" },
                        { slug: { current: "paul-shark" }, title: "PAUL & SHARK" },
                        { slug: { current: "sandro" }, title: "SANDRO" },
                        { slug: { current: "editorial" }, title: "EDITORIAL" }
                      ]
                    }
                  ]
                },
                { 
                  label: { en: "Perfumes", ar: "العطور" }, 
                  href: "/category/perfumes",
                  designerCategories: [
                    {
                      title: { en: "Premium Beauty & Skincare", ar: "العناية بالبشرة والجمال الفاخر" },
                      brands: [{ slug: { current: "lancome" }, title: "Lancôme" }]
                    }
                  ]
                },
                { 
                  label: { en: "Skincare", ar: "العناية بالبشرة" }, 
                  href: "/category/skincare",
                  designerCategories: [
                    {
                      title: { en: "Premium Beauty & Skincare", ar: "العناية بالبشرة والجمال الفاخر" },
                      brands: [{ slug: { current: "lancome" }, title: "Lancôme" }]
                    }
                  ]
                },
                { label: { en: "Dining", ar: "المطاعم" }, href: "/category/dining" },
                { label: { en: "About Us", ar: "من نحن" }, href: "/about" },
                { label: { en: "Contact Us", ar: "اتصل بنا" }, href: "/contact" }
              ];
              const activeMenuItems = headerMenuItems && headerMenuItems.length > 0 ? headerMenuItems : fallbackMenuItems;

              return activeMenuItems.map((item, idx) => {
                const hasDropdown = item.designerCategories && item.designerCategories.length > 0;
                const labelStr = lang === "ar" ? item.label?.ar || item.label?.en : item.label?.en || item.label?.ar;
                
                const finalHref = resolvePath(item.href, lang);

                const isExpanded = expandedMobileItem === idx;

                return (
                  <Stack key={idx} spacing={1.5} sx={{ width: "100%", alignItems: "center" }}>
                    <MuiLink
                      component={hasDropdown ? "span" : Link}
                      href={hasDropdown ? undefined : finalHref}
                      onClick={(e: React.MouseEvent) => {
                        if (hasDropdown) {
                          e.preventDefault();
                          setExpandedMobileItem(isExpanded ? null : idx);
                        } else {
                          setOpen(false);
                        }
                      }}
                      sx={{
                        color: (isExpanded || activeDropdown === idx) ? "#CB6116" : "rgba(255,255,255,0.85)",
                        fontSize: 15,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        textDecoration: "none",
                        fontFamily: '"Cairo", sans-serif',
                        transition: "all 0.25s ease",
                        textAlign: "center",
                        cursor: "pointer",
                        "&:hover": { 
                          color: "#CB6116"
                        }
                      }}
                    >
                      {labelStr}
                    </MuiLink>
                    
                    {hasDropdown && (
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            style={{ overflow: "hidden", width: "100%" }}
                          >
                            <Stack spacing={2.5} sx={{ py: 2, px: 3, bgcolor: "rgba(255,255,255,0.03)", borderLeft: lang === "ar" ? "none" : "2px solid #CB6116", borderRight: lang === "ar" ? "2px solid #CB6116" : "none", width: "100%" }}>
                              {item.designerCategories.map((cat: any, catIdx: number) => {
                                const catTitle = lang === "ar" ? cat.title?.ar || cat.title?.en : cat.title?.en || cat.title?.ar;
                                if (!cat.brands || cat.brands.length === 0) return null;
                                
                                return (
                                  <Stack key={catIdx} spacing={1.2} sx={{ textAlign: lang === "ar" ? "right" : "left" }}>
                                    <Typography sx={{ color: "#CB6116", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: '"Cairo", sans-serif' }}>
                                      {catTitle}
                                    </Typography>
                                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
                                      {cat.brands.map((brand: any, brandIdx: number) => {
                                        const brandTitle = lang === "ar" ? brand.titleAr || brand.title : brand.title || brand.titleAr;
                                        const brandHref = `/brand/${brand.slug?.current || brand.slug}/${lang}`;
                                        
                                        return (
                                          <MuiLink
                                            key={brandIdx}
                                            component={Link}
                                            href={brandHref}
                                            onClick={() => setOpen(false)}
                                            sx={{
                                              color: "rgba(255,255,255,0.65)",
                                              fontSize: 13,
                                              textDecoration: "none",
                                              fontFamily: '"Cairo", sans-serif',
                                              "&:hover": { color: "#ffffff" }
                                            }}
                                          >
                                            {brandTitle}
                                          </MuiLink>
                                        );
                                      })}
                                    </Box>
                                  </Stack>
                                );
                              })}
                            </Stack>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </Stack>
                );
              });
            })()}
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
