"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Button, Container, IconButton, InputBase, Stack, Typography } from "@mui/material";
import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Women", href: "/#women" },
  { label: "Men", href: "/#men" },
  { label: "Beauty", href: "/#beauty" },
  { label: "Home & Deco", href: "/#home-deco" },
  { label: "The Boulevard", href: "/#boulevard" },
  { label: "Brand", href: "/#brand" },
  { label: "Journal", href: "/blogs" }
];

export default function SiteFooter() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#FAF8F5",
        color: "#111111",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 10 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr 1fr" },
            gap: { xs: 5, md: 8 },
            alignItems: "start",
            pb: 6,
            borderBottom: "1px solid rgba(0,0,0,0.06)"
          }}
        >
          {/* Brand Info Column */}
          <Stack spacing={3}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  display: "grid",
                  placeItems: "center",
                  bgcolor: "#111111",
                  borderRadius: 0
                }}
              >
                <Box component="img" src="/brand/logo.png" alt="Fashion Gate" sx={{ width: 28, height: "auto" }} />
              </Box>
              <Stack spacing={0.1}>
                <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: 20, fontWeight: 600, color: "#111111", lineHeight: 1 }}>
                  Fashion Gate
                </Typography>
                <Typography sx={{ color: "primary.main", fontSize: 9, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  Boulevard Damascus
                </Typography>
              </Stack>
            </Stack>

            <Typography sx={{ color: "rgba(0,0,0,0.6)", fontSize: 14.5, lineHeight: 1.8, maxWidth: 360 }}>
              Syria's first luxury department destination. Integrating fine apparel, curated beauty, and bespoke boutique shopping under a modern architectural vision.
            </Typography>
          </Stack>

          {/* Quick Links Column */}
          <Stack spacing={2.5}>
            <Typography sx={{ color: "#111111", fontSize: 12, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Explore
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 1.5
              }}
            >
              {footerLinks.map((link) => (
                <Typography
                  key={link.label}
                  component={Link}
                  href={link.href}
                  sx={{
                    color: "rgba(0,0,0,0.6)",
                    fontSize: 13.5,
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "color 0.3s ease",
                    "&:hover": { color: "primary.main" }
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Box>
          </Stack>

          {/* Newsletter Column */}
          <Stack spacing={2.5}>
            <Typography sx={{ color: "#111111", fontSize: 12, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Bespoke Updates
            </Typography>
            <Typography sx={{ color: "rgba(0,0,0,0.6)", fontSize: 14, lineHeight: 1.6 }}>
              Subscribe to receive private invitations, seasonal collection launches, and atelier journal notes.
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                borderBottom: "1.5px solid rgba(0,0,0,0.16)",
                py: 0.6
              }}
            >
              <InputBase
                placeholder="Email address"
                sx={{
                  flex: 1,
                  px: 0.5,
                  fontSize: 14,
                  color: "#111111",
                  "& input::placeholder": { color: "rgba(0,0,0,0.42)", opacity: 1 }
                }}
              />
              <IconButton sx={{ color: "#111111", p: 0.5, "&:hover": { color: "primary.main" } }}>
                <ArrowForwardIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Stack>
        </Box>

        {/* Bottom Bar */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
          sx={{ pt: 4 }}
        >
          <Typography sx={{ color: "rgba(0,0,0,0.48)", fontSize: 12.5 }}>
            © {new Date().getFullYear()} Fashion Gate. All rights reserved.
          </Typography>

          {/* Social Links */}
          <Stack direction="row" spacing={1.5}>
            {[InstagramIcon, FacebookIcon, WhatsAppIcon].map((Icon, idx) => (
              <IconButton
                key={idx}
                href="#"
                sx={{
                  width: 36,
                  height: 36,
                  color: "rgba(0,0,0,0.54)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  "&:hover": { color: "#ffffff", bgcolor: "primary.main", borderColor: "primary.main" }
                }}
              >
                <Icon sx={{ fontSize: 17 }} />
              </IconButton>
            ))}
          </Stack>
        </Stack>
      </Container>

      {/* Sleek Floating WhatsApp Button */}
      <IconButton
        href="#"
        aria-label="WhatsApp"
        sx={{
          position: "fixed",
          right: { xs: 16, md: 24 },
          bottom: { xs: 16, md: 24 },
          zIndex: 90,
          bgcolor: "#111111",
          color: "#ffffff",
          width: 50,
          height: 50,
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.16)",
          transition: "all 0.3s ease",
          "&:hover": { bgcolor: "primary.main", transform: "translateY(-2px)" }
        }}
      >
        <WhatsAppIcon sx={{ fontSize: 22 }} />
      </IconButton>
    </Box>
  );
}
