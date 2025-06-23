"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./component/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const NavbarPaths = [
    "/dashboard",
    "/chart",
    "/refund-analysis",
    "food-quality",
    "customer-satisfaction",
    "delivery",
    "pricing-discount",
  ];

  const defaultTitle = "REVSENSE";

  React.useEffect(() => {
    const titles: Record<string, string> = {
      "/dashboard": "Dashboard | REVSENSE",
      "/chart": "Chart | REVSENSE",
    };
    const pageTitle = titles[pathname] || defaultTitle;
    document.title = pageTitle;
  }, [pathname]);

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {NavbarPaths.includes(pathname) && (
            <>
              <Navbar />
            </>
          )}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
