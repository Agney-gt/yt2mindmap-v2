import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "./globals.css";
import Script from "next/script"
import JsonLd from "@/components/json-ld";
const interSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata: Metadata = { 
  metadataBase: new URL("https://www.y2map.com"),
  title: "YouTube to Mind Map | Transform Videos into Interactive Mind Maps",
  description: "Transform YouTube videos into interactive mind maps. Our AI-powered platform helps you learn smarter by converting video content into visual knowledge maps.",
  openGraph: {
    siteName: "YouTube to Mind Map",
    type: "website",
    locale: "en_US",
    title: "YouTube to Mind Map - Visual Learning Revolution",
    description: "Convert YouTube videos into interactive mind maps. Learn faster, understand better, and retain more with AI-powered visual learning.",
    images: ["/opengraph-image.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Y2Map - Convert YouTube Videos to Mind Maps",
    description: "Transform YouTube videos into structured mind maps for better learning and retention",
    images: ["https://www.y2map.com/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow"
  },
  alternates: {
    types: {
      "application/rss+xml": "https://y2map.com/rss.xml"
    }
  },
  applicationName: "YouTube to Mind Map",
  appleWebApp: {
    title: "YouTube to Mind Map",
    statusBarStyle: "default",
    capable: true
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_ID",
    yandex: ["YOUR_YANDEX_VERIFICATION_ID"],
    other: {
      "msvalidate.01": ["YOUR_BING_VERIFICATION_ID"],
      "facebook-domain-verification": ["YOUR_FACEBOOK_DOMAIN_VERIFICATION_ID"]
    }
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon"
      },
      {
        url: "/favicon.ico",
        sizes: "16x16",
        type: "image/x-icon"
      },
      {
        url: "/favicon.ico",
        sizes: "32x32",
        type: "image/x-icon"
      },
      {
        url: "/favicon.ico",
        sizes: "96x96",
        type: "image/x-icon"
      },
      {
        url: "/favicon.ico",
        sizes: "192x192",
        type: "image/x-icon"
      }
    ],
    shortcut: [
      {
        url: "/favicon.ico",
        type: "image/x-icon"
      }
    ],
    apple: [
      {
        url: "/apple-icon-57x57.png",
        sizes: "57x57",
        type: "image/png"
      },
      {
        url: "/apple-icon-60x60.png",
        sizes: "60x60",
        type: "image/png"
      },
      {
        url: "/apple-icon-72x72.png",
        sizes: "72x72",
        type: "image/png"
      },
      {
        url: "/apple-icon-76x76.png",
        sizes: "76x76",
        type: "image/png"
      },
      {
        url: "/apple-icon-114x114.png",
        sizes: "114x114",
        type: "image/png"
      },
      {
        url: "/apple-icon-120x120.png",
        sizes: "120x120",
        type: "image/png"
      },
      {
        url: "/apple-icon-144x144.png",
        sizes: "144x144",
        type: "image/png"
      },
      {
        url: "/apple-icon-152x152.png",
        sizes: "152x152",
        type: "image/png"
      },
      {
        url: "/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <Script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
          strategy="lazyOnload"
        />
        <JsonLd />

      </head>
      <body
        className={`${interSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
