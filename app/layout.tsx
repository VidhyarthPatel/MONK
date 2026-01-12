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
  metadataBase: new URL("https://monk-agency.vercel.app/"),
  title: {
    default: "MONK | Creative Agency & Digital Solutions",
    template: "%s | MONK Creative Agency",
  },
  description:
    "MONK is a premier creative agency specializing in branding, web design, and digital marketing. We sharpen your brand with quality work and innovative digital experiences.",
  keywords: [
    "creative agency",
    "web design",
    "digital marketing",
    "branding",
    "SEO",
    "app development",
    "UI/UX design",
    "digital products",
    "software development",
  ],
  authors: [{ name: "MONK Agency" }],
  creator: "MONK Agency",
  publisher: "MONK Agency",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "MONK | Creative Agency & Digital Solutions",
    description:
      "We are a premier creative agency specializing in branding, web design, and digital marketing. Transform your business with our innovative solutions.",
    url: "https://monk-agency.vercel.app/",
    siteName: "MONK Creative Agency",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "MONK Creative Agency Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MONK | Creative Agency & Digital Solutions",
    description:
      "We are a premier creative agency specializing in branding, web design, and digital marketing. Transform your business with our innovative solutions.",
    creator: "@monkagency", // Placeholder, can be updated if they have a handle
    images: ["/twitter-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
