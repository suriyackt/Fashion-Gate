"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

const MotionBox = motion.create(Box);

interface LoaderContextType {
  setLoading: (loading: boolean, bypassMinTime?: boolean, targetLang?: "en" | "ar") => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function useLoader() {
  const context = useContext(LoaderContext);
  if (!context) {
    return { setLoading: (loading: boolean, bypassMinTime?: boolean, targetLang?: "en" | "ar") => {} };
  }
  return context;
}

export default function LoaderProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [minTimeActive, setMinTimeActive] = useState(true);
  const [pendingClose, setPendingClose] = useState(true);
  const [pageMounted, setPageMounted] = useState(true);
  const [forcedLang, setForcedLang] = useState<"en" | "ar" | null>(null);

  const activeLang = forcedLang || (pathname?.endsWith("/ar") || pathname?.includes("/ar/") ? "ar" : "en");
  const isAr = activeLang === "ar";

  // Lock the preloader on initial mount to let the ease sweep finish fully (2.6 seconds)
  useEffect(() => {
    if (window.location.pathname.includes("/studio")) {
      setLoading(false);
      setMinTimeActive(false);
      setPendingClose(false);
      return;
    }
    const timer = setTimeout(() => {
      setMinTimeActive(false);
    }, 2600);
    return () => clearTimeout(timer);
  }, []);

  // Set pageMounted = true when pathname changes (meaning navigation completed)
  useEffect(() => {
    setPageMounted(true);
    setForcedLang(null);
  }, [pathname]);

  // Watch for lock release, page mount, and close requests
  useEffect(() => {
    if (!minTimeActive && pendingClose && pageMounted) {
      setLoading(false);
      setPendingClose(false);
    }
  }, [minTimeActive, pendingClose, pageMounted]);

  // Safe setLoading handler that enforces a minimum animation runtime
  const safeSetLoading = (val: boolean, bypassMinTime = false, targetLang?: "en" | "ar") => {
    if (val) {
      if (targetLang) {
        setForcedLang(targetLang);
      }
      setLoading(true);
      setMinTimeActive(!bypassMinTime);
      setPendingClose(true);
      setPageMounted(false); // Reset page mount status when starting route navigation
      
      if (!bypassMinTime) {
        // Enforce a 2.6s lock for standard transition loaders to run fully (matching progress line)
        setTimeout(() => {
          setMinTimeActive(false);
        }, 2600);
      }
    } else {
      setForcedLang(null);
      setPageMounted(true); // Destination page has mounted and triggered the load exit
      setMinTimeActive((currentMin) => {
        if (currentMin) {
          setPendingClose(true);
        } else {
          setLoading(false);
        }
        return currentMin;
      });
    }
  };

  // Listen for browser back/forward buttons (popstate)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePopState = () => {
      if (window.location.pathname !== pathname && !loading) {
        safeSetLoading(true);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [pathname, loading]);

  // Intercept global link clicks to trigger route change loading (runs transition loader)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleGlobalClick = (e: MouseEvent) => {
      if (loading) {
        e.preventDefault();
        return;
      }

      let target = e.target as HTMLElement | null;
      while (target && target !== document.body) {
        const anchor = target.tagName === "A" ? (target as HTMLAnchorElement) : target.closest("a");
        if (anchor) {
          const href = anchor.getAttribute("href");
          if (
            href && 
            !href.startsWith("#") && 
            !href.startsWith("tel:") && 
            !href.startsWith("mailto:") && 
            !href.includes("wa.me")
          ) {
            try {
              const url = new URL(href, window.location.origin);
              // Bypass completely if current page or destination page is studio
              if (url.pathname.includes("/studio") || window.location.pathname.includes("/studio")) {
                break;
              }
              const targetLang = (href.endsWith("/ar") || href.includes("/ar/") || href.includes("?lang=ar")) ? "ar" :
                                 (href.endsWith("/en") || href.includes("/en/") || href.includes("?lang=en")) ? "en" : undefined;

              // Only trigger loader if navigating to a different pathname
              if (url.pathname !== window.location.pathname) {
                e.preventDefault(); // Stay on current page while loader turns on
                const isLogin = url.pathname.includes("/login");
                safeSetLoading(true, isLogin, targetLang);

                setTimeout(() => {
                  router.push(href);
                }, 50);
              }
            } catch (err) {
              // Bypass completely if destination page is studio
              if (href.includes("/studio")) {
                break;
              }
              const targetLang = (href.endsWith("/ar") || href.includes("/ar/") || href.includes("?lang=ar")) ? "ar" :
                                 (href.endsWith("/en") || href.includes("/en/") || href.includes("?lang=en")) ? "en" : undefined;
              const isLogin = href.includes("/login");
              if (href !== window.location.pathname) {
                e.preventDefault();
                safeSetLoading(true, isLogin, targetLang);
                setTimeout(() => {
                  router.push(href);
                }, 50);
              }
            }
            break;
          }
        }
        target = target.parentElement;
      }
    };

    window.addEventListener("click", handleGlobalClick, { capture: true });
    return () => window.removeEventListener("click", handleGlobalClick, { capture: true });
  }, [router, loading]);

  return (
    <LoaderContext.Provider value={{ setLoading: safeSetLoading }}>
      {/* Render children natively with zero fade opacity transitions to prevent white flash screen locks */}
      {children}

      <AnimatePresence>
        {loading && (
          <MotionBox
            initial={{ opacity: 1 }}
            exit={{ 
              y: "-100%", 
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
            }}
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: 99999, // Render above everything
              bgcolor: "#050505",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#ffffff"
            }}
          >
            <Stack spacing={3.5} alignItems="center">
              {/* Glowing Monogram script logo */}
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                src="/brand/logo.png"
                alt="Fashion Gate"
                style={{ width: "80px", maxWidth: "100px", height: "auto", objectFit: "contain" }}
              />
              
              <MotionBox
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                sx={{ textAlign: "center" }}
              >
                <Typography 
                  sx={{ 
                    fontFamily: isAr ? '"Cairo", sans-serif' : "var(--heading-font)", 
                    fontSize: isAr ? { xs: "1.8rem", md: "2.4rem" } : { xs: "1.4rem", md: "1.8rem" }, 
                    fontWeight: isAr ? 700 : 500, 
                    letterSpacing: isAr ? "0.02em" : "0.25em", 
                    color: "#ffffff",
                    textTransform: "uppercase"
                  }}
                >
                  {isAr ? "فاشن غيت" : "FASHION GATE"}
                </Typography>
                <Typography 
                  sx={{ 
                    fontFamily: '"Cairo", sans-serif', 
                    fontSize: isAr ? 12 : 10, 
                    fontWeight: 600, 
                    letterSpacing: isAr ? "0.05em" : "0.4em", 
                    color: "#CB6116", // Brand orange
                    textTransform: "uppercase",
                    mt: 1
                  }}
                >
                  {isAr ? "بوليفارد دمشق" : "BOULEVARD"}
                </Typography>
              </MotionBox>
              
              {/* Elegant Accent Orange Progress bar */}
              <Box sx={{ width: 140, height: 1.5, bgcolor: "rgba(255,255,255,0.08)", mt: 4, position: "relative", overflow: "hidden" }} dir={isAr ? "rtl" : "ltr"}>
                <MotionBox 
                  initial={isAr ? { right: "-100%" } : { left: "-100%" }}
                  animate={isAr ? { right: "0%" } : { left: "0%" }}
                  transition={{ duration: 2.6, ease: "easeInOut" }}
                  sx={{ 
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    width: "100%",
                    bgcolor: "#CB6116",
                    ...(isAr ? { right: 0, left: "auto" } : { left: 0, right: "auto" })
                  }}
                />
              </Box>
            </Stack>
          </MotionBox>
        )}
      </AnimatePresence>
    </LoaderContext.Provider>
  );
}
