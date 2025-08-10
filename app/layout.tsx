import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dev Forge - Ultimate Developer Tools Collection",
    template: "%s | Dev Forge"
  },
  description: "Free online developer tools for JSON formatting, Base64 encoding, JWT decoding, password generation, and more. Boost your productivity with our comprehensive developer toolkit.",
  keywords: [
    "developer tools",
    "JSON formatter",
    "Base64 encoder",
    "JWT decoder",
    "password generator",
    "UUID generator",
    "hash calculator",
    "timestamp converter",
    "crontab tool",
    "SQL formatter",
    "code beautifier",
    "color converter",
    "URL encoder",
    "HTTP status codes",
    "user agent parser",
    "web development tools",
    "programming utilities"
  ],
  authors: [{ name: "bbj", url: "https://github.com/yzw1236" }],
  creator: "bbj",
  publisher: "Dev Forge",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://dev-forge.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'zh': '/zh',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dev-forge.vercel.app',
    title: 'Dev Forge - Ultimate Developer Tools Collection',
    description: 'Free online developer tools for JSON formatting, Base64 encoding, JWT decoding, password generation, and more. Boost your productivity with our comprehensive developer toolkit.',
    siteName: 'Dev Forge',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Dev Forge - Developer Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dev Forge - Ultimate Developer Tools Collection',
    description: 'Free online developer tools for JSON formatting, Base64 encoding, JWT decoding, password generation, and more.',
    images: ['/og-image.png'],
    creator: '@bbj',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Dev Forge",
              "description": "A comprehensive collection of developer tools for better productivity",
              "url": "https://dev-forge.vercel.app",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Person",
                "name": "bbj",
                "url": "https://github.com/yzw1236"
              },
              "creator": {
                "@type": "Person",
                "name": "bbj"
              },
              "featureList": [
                "JSON Tools",
                "Base64 Encoder/Decoder",
                "JWT Decoder",
                "Password Generator",
                "UUID Generator",
                "Hash Calculator",
                "Timestamp Converter",
                "Crontab Tool",
                "SQL Formatter",
                "Code Beautifier",
                "Color Converter",
                "URL Tool",
                "HTTP Status Lookup",
                "User-Agent Parser"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800`}
      >
        {children}
      </body>
    </html>
  );
} 