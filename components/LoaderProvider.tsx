"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion.create(Box);

interface LoaderContextType {
  setLoading: (loading: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function useLoader() {
  const context = useContext(LoaderContext);
  if (!context) {
    return { setLoading: () => {} };
  }
  return context;
}

export default function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [minTimeActive, setMinTimeActive] = useState(true);
  const [pendingClose, setPendingClose] = useState(false);

  // Lock the preloader on initial mount to let the ease sweep finish fully (2.6 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeActive(false);
    }, 2600);
    return () => clearTimeout(timer);
  }, []);

  // Watch for lock release and close requests
  useEffect(() => {
    if (!minTimeActive && pendingClose) {
      setLoading(false);
      setPendingClose(false);
    }
  }, [minTimeActive, pendingClose]);

  // Safe setLoading handler that enforces a minimum animation runtime
  const safeSetLoading = (val: boolean) => {
    if (val) {
      setLoading(true);
      setMinTimeActive(true);
      setPendingClose(false);
      
      // Enforce a 2.4s lock for any transition loaders to run fully
      setTimeout(() => {
        setMinTimeActive(false);
      }, 2400);
    } else {
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

  // Intercept global link clicks to trigger route change loading (runs transition loader)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleGlobalClick = (e: MouseEvent) => {
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
              // Only trigger loader if navigating to a different pathname
              if (url.pathname !== window.location.pathname) {
                // Defer loading state trigger to let Next.js register the link click instantly
                setTimeout(() => {
                  safeSetLoading(true);
                }, 0);
              }
            } catch (err) {
              setTimeout(() => {
                safeSetLoading(true);
              }, 0);
            }
            break;
          }
        }
        target = target.parentElement;
      }
    };

    window.addEventListener("click", handleGlobalClick, { capture: true });
    return () => window.removeEventListener("click", handleGlobalClick, { capture: true });
  }, []);

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
                    fontFamily: "var(--heading-font)", 
                    fontSize: { xs: "1.4rem", md: "1.8rem" }, 
                    fontWeight: 500, 
                    letterSpacing: "0.25em", 
                    color: "#ffffff",
                    textTransform: "uppercase"
                  }}
                >
                  FASHION GATE
                </Typography>
                <Typography 
                  sx={{ 
                    fontFamily: '"Cairo", sans-serif', 
                    fontSize: 10, 
                    fontWeight: 600, 
                    letterSpacing: "0.4em", 
                    color: "#CB6116", // Brand orange
                    textTransform: "uppercase",
                    mt: 1
                  }}
                >
                  BOULEVARD
                </Typography>
              </MotionBox>
              
              {/* Elegant Accent Orange Progress bar */}
              <Box sx={{ width: 140, height: 1.5, bgcolor: "rgba(255,255,255,0.08)", mt: 4, position: "relative", overflow: "hidden" }}>
                <MotionBox 
                  initial={{ left: "-100%" }}
                  animate={{ left: "0%" }}
                  transition={{ duration: 2.6, ease: "easeInOut" }}
                  sx={{ 
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    width: "100%",
                    bgcolor: "#CB6116"
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
