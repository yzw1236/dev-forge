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
  title: {
    default: "Dev Forge - Developer Tools",
    template: "%s | Dev Forge"
  },
  description: "A comprehensive collection of developer tools including JSON formatter, Base64 encoder, JWT decoder, hash calculator, and more. Boost your productivity with our free online developer utilities.",
  keywords: [
    "developer tools",
    "JSON formatter",
    "Base64 encoder",
    "JWT decoder",
    "hash calculator",
    "UUID generator",
    "password generator",
    "code beautifier",
    "SQL formatter",
    "timestamp converter",
    "crontab tool",
    "color converter",
    "URL encoder",
    "user agent parser",
    "HTTP status codes"
  ],
  authors: [{ name: "bbj" }],
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
    title: 'Dev Forge - Developer Tools',
    description: 'A comprehensive collection of developer tools including JSON formatter, Base64 encoder, JWT decoder, hash calculator, and more.',
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
    title: 'Dev Forge - Developer Tools',
    description: 'A comprehensive collection of developer tools including JSON formatter, Base64 encoder, JWT decoder, hash calculator, and more.',
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
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
                "name": "bbj"
              },
              "creator": {
                "@type": "Person",
                "name": "bbj"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Dev Forge"
              }
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