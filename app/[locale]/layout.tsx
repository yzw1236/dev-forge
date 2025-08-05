import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import NavigationLayout from "../components/NavigationLayout";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: {
      default: "Dev Forge - Developer Tools",
      template: "%s | Dev Forge"
    },
    description: locale === 'zh' 
      ? "全面的开发者工具集合，包括JSON格式化器、Base64编码器、JWT解码器、哈希计算器等。通过我们的免费在线开发者工具提升您的生产力。"
      : "A comprehensive collection of developer tools including JSON formatter, Base64 encoder, JWT decoder, hash calculator, and more. Boost your productivity with our free online developer utilities.",
    keywords: locale === 'zh' 
      ? [
          "开发者工具",
          "JSON格式化器",
          "Base64编码器",
          "JWT解码器",
          "哈希计算器",
          "UUID生成器",
          "密码生成器",
          "代码美化器",
          "SQL格式化器",
          "时间戳转换器",
          "定时任务工具",
          "颜色转换器",
          "URL编码器",
          "用户代理解析器",
          "HTTP状态码"
        ]
      : [
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
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'zh': '/zh',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      url: `https://dev-forge.vercel.app/${locale}`,
      title: 'Dev Forge - Developer Tools',
      description: locale === 'zh' 
        ? '全面的开发者工具集合，包括JSON格式化器、Base64编码器、JWT解码器、哈希计算器等。'
        : 'A comprehensive collection of developer tools including JSON formatter, Base64 encoder, JWT decoder, hash calculator, and more.',
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
      description: locale === 'zh' 
        ? '全面的开发者工具集合，包括JSON格式化器、Base64编码器、JWT解码器、哈希计算器等。'
        : 'A comprehensive collection of developer tools including JSON formatter, Base64 encoder, JWT decoder, hash calculator, and more.',
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
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <NavigationLayout>
        {children}
      </NavigationLayout>
    </NextIntlClientProvider>
  );
}
