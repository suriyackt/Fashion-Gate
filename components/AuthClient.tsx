"use client";

import React, { useState, useMemo } from "react";
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Stack, 
  IconButton,
  createTheme,
  ThemeProvider,
  InputAdornment
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const MotionBox = motion.create(Box);

interface AuthClientProps {
  initialLang: "ar" | "en";
}

export default function AuthClient({ initialLang }: AuthClientProps) {
  const [lang, setLang] = useState(initialLang);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const theme = useMemo(() => createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#CB6116" },
      background: { default: "#050505", paper: "rgba(10, 10, 10, 0.72)" }
    },
    typography: {
      fontFamily: `"Cairo", sans-serif`,
      button: { fontWeight: 700, letterSpacing: "0.15em" }
    },
    shape: { borderRadius: 0 }
  }), []);

  const t = {
    en: {
      loginTitle: "Sign In",
      signupTitle: "Create Account",
      welcomeBack: "Welcome back to the Boulevard",
      welcomeNew: "Join Syria's first luxury department store",
      email: "Email Address",
      password: "Password",
      confirmPassword: "Confirm Password",
      name: "Full Name",
      loginBtn: "Sign In",
      signupBtn: "Create Account",
      haveAccount: "Already have an account? Sign In",
      noAccount: "New to Fashion Gate? Create Account",
      backHome: "Back to Boulevard",
      successMsg: "Authenticating..."
    },
    ar: {
      loginTitle: "تسجيل الدخول",
      signupTitle: "إنشاء حساب",
      welcomeBack: "مرحباً بك مجدداً في البوليفارد",
      welcomeNew: "انضم لأول متجر أزياء فاخر في سوريا",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      name: "الاسم الكامل",
      loginBtn: "دخول",
      signupBtn: "إنشاء الحساب",
      haveAccount: "لديك حساب بالفعل؟ سجل دخولك",
      noAccount: "جديد في بوابة الأزياء؟ أنشئ حساباً",
      backHome: "العودة إلى البوليفارد",
      successMsg: "جاري التحقق..."
    }
  }[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t.successMsg);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        dir={lang === "ar" ? "rtl" : "ltr"}
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          bgcolor: "#050505",
          py: 4,
          px: 2,
          overflow: "hidden"
        }}
      >
        {/* Luxury Background Image with Tint Layer */}
        <Box 
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/assets/auth_bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.55)",
            zIndex: 1
          }}
        />

        {/* Global Language Selector (Floating Top-Right / Top-Left) */}
        <Box 
          sx={{ 
            position: "absolute", 
            top: 24, 
            right: lang === "ar" ? "auto" : 24, 
            left: lang === "ar" ? 24 : "auto", 
            zIndex: 10 
          }}
        >
          <Button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            sx={{
              color: "#CB6116",
              border: "1px solid #CB6116",
              fontFamily: '"Cairo", sans-serif',
              fontSize: 12,
              px: 2,
              "&:hover": { bgcolor: "rgba(203,97,22,0.08)" }
            }}
          >
            {lang === "ar" ? "English" : "العربية"}
          </Button>
        </Box>

        {/* Auth Glassmorphism Card */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          sx={{
            width: "100%",
            maxWidth: 440,
            bgcolor: "rgba(10, 10, 10, 0.72)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            p: { xs: 4, md: 5 },
            position: "relative",
            zIndex: 5,
            boxShadow: "0 24px 50px rgba(0,0,0,0.6)"
          }}
        >
          {/* Header Monogram Logo */}
          <Stack alignItems="center" spacing={1} sx={{ mb: 4 }}>
            <Box 
              component="img" 
              src="/brand/logo.png" 
              alt="Fashion Gate Logo" 
              sx={{ height: 38, width: "auto", objectFit: "contain" }}
            />
            <Typography 
              sx={{ 
                fontFamily: "var(--heading-font)", 
                fontSize: 11, 
                fontWeight: 800, 
                letterSpacing: "0.3em", 
                color: "#CB6116",
                textTransform: "uppercase",
                mt: 1
              }}
            >
              FASHION GATE
            </Typography>
          </Stack>

          {/* Form Titles */}
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontFamily: "var(--heading-font)", 
                fontWeight: 500, 
                fontSize: 26, 
                mb: 1, 
                color: "#ffffff" 
              }}
            >
              {mode === "login" ? t.loginTitle : t.signupTitle}
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.48)", fontSize: 12 }}>
              {mode === "login" ? t.welcomeBack : t.welcomeNew}
            </Typography>
          </Box>

          {/* Form Fields */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2.5}>
              {mode === "signup" && (
                <TextField
                  fullWidth
                  label={t.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 0,
                      bgcolor: "rgba(255,255,255,0.03)"
                    }
                  }}
                />
              )}

              <TextField
                fullWidth
                label={t.email}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 0,
                    bgcolor: "rgba(255,255,255,0.03)"
                  }
                }}
              />

              <TextField
                fullWidth
                label={t.password}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 0,
                    bgcolor: "rgba(255,255,255,0.03)"
                  }
                }}
              />

              {mode === "signup" && (
                <TextField
                  fullWidth
                  label={t.confirmPassword}
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  variant="outlined"
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 0,
                      bgcolor: "rgba(255,255,255,0.03)"
                    }
                  }}
                />
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: "#CB6116",
                  color: "#ffffff",
                  py: 1.6,
                  borderRadius: 0,
                  fontSize: 12,
                  mt: 2,
                  "&:hover": { bgcolor: "#9D430C" }
                }}
              >
                {mode === "login" ? t.loginBtn : t.signupBtn}
              </Button>
            </Stack>
          </Box>

          {/* Form Switch Link */}
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Button
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
              }}
              sx={{ 
                color: "rgba(255,255,255,0.54)", 
                textTransform: "none", 
                fontSize: 12,
                "&:hover": { color: "#CB6116", bgcolor: "transparent" }
              }}
            >
              {mode === "login" ? t.noAccount : t.haveAccount}
            </Button>
          </Box>

          {/* Back Home Link */}
          <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
            <Button
              component={Link}
              href={`/${lang}`}
              startIcon={lang === "en" && <ArrowBackIcon sx={{ fontSize: 14 }} />}
              endIcon={lang === "ar" && <ArrowForwardIcon sx={{ fontSize: 14 }} />}
              sx={{
                color: "rgba(255,255,255,0.4)",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                "&:hover": { color: "#CB6116", bgcolor: "transparent" }
              }}
            >
              {t.backHome}
            </Button>
          </Stack>
        </MotionBox>
      </Box>
    </ThemeProvider>
  );
}
