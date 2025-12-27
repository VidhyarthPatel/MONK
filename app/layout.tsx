import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://monk-agency.vercel.app/"), // Replace with actual URL when deployed
  title: "Creative Agency | Innovative Digital Solutions",
  description:
    "We are a premier creative agency specializing in branding, web design, and digital marketing. Transform your business with our innovative solutions.",
  keywords: [
    "creative agency",
    "web design",
    "digital marketing",
    "branding",
    "SEO",
    "app development",
    "UI/UX design",
  ],
  openGraph: {
    title: "Creative Agency | Innovative Digital Solutions",
    description:
      "We are a premier creative agency specializing in branding, web design, and digital marketing.",
    url: "https://monk-agency.vercel.app/", // Replace with actual URL when deployed
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Agency | Innovative Digital Solutions",
    description:
      "We are a premier creative agency specializing in branding, web design, and digital marketing.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", // Optional: Add if you have one
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
