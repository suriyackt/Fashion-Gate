import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { CssBaseline } from "@mui/material";
import SmoothScroll from "@/components/SmoothScroll";
import LoaderProvider from "@/components/LoaderProvider";
import "./globals.css";

import { getHomepageData, imageUrl } from "@/lib/sanity";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  let faviconUrl = "/brand/logo.png";
  let title = "Fashion Gate";
  let description = "Fashion Gate boutique ecommerce experience powered by Sanity CMS.";

  try {
    const data = await getHomepageData();
    if (data?.settings) {
      title = data.settings.title || title;
      description = data.settings.tagline || description;
      
      if (data.settings.logo) {
        try {
          const resolved = imageUrl(data.settings.logo).url();
          if (resolved) {
            faviconUrl = resolved;
          }
        } catch (e) {
          console.error("Failed to resolve logo image URL for metadata favicon", e);
        }
      }
    }
  } catch (error) {
    console.error("Failed to load metadata from Sanity:", error);
  }

  return {
    title,
    description,
    icons: {
      icon: faviconUrl
    }
  };
}

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
