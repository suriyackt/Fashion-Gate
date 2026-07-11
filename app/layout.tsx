import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { CssBaseline } from "@mui/material";
import SmoothScroll from "@/components/SmoothScroll";
import LoaderProvider from "@/components/LoaderProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fashion Gate",
  description: "Fashion Gate boutique ecommerce experience powered by Sanity CMS.",
  icons: {
    icon: "/brand/logo.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppRouterCacheProvider>
          <CssBaseline />
          <LoaderProvider>
            <SmoothScroll />
            {children}
          </LoaderProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
