import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import NavigationLayout from "../components/NavigationLayout";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const baseUrl = 'https://dev-forge.vercel.app';
  const isEnglish = locale === 'en';
  
  return {
    title: {
      default: isEnglish 
        ? "Dev Forge - Ultimate Developer Tools Collection" 
        : "Dev Forge - 开发者工具集合",
      template: isEnglish ? "%s | Dev Forge" : "%s | Dev Forge"
    },
    description: isEnglish
      ? "Free online developer tools for JSON formatting, Base64 encoding, JWT decoding, password generation, and more. Boost your productivity with our comprehensive developer toolkit."
      : "免费的在线开发者工具，包括JSON格式化、Base64编码、JWT解码、密码生成等。通过我们全面的开发者工具包提升您的生产力。",
    keywords: isEnglish ? [
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
    ] : [
      "开发者工具",
      "JSON格式化",
      "Base64编码",
      "JWT解码",
      "密码生成器",
      "UUID生成器",
      "哈希计算器",
      "时间戳转换器",
      "定时任务工具",
      "SQL格式化",
      "代码美化",
      "颜色转换器",
      "URL编码",
      "HTTP状态码",
      "用户代理解析器",
      "Web开发工具",
      "编程工具"
    ],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'zh': '/zh',
      },
    },
    openGraph: {
      type: 'website',
      locale: isEnglish ? 'en_US' : 'zh_CN',
      url: `${baseUrl}/${locale}`,
      title: isEnglish 
        ? 'Dev Forge - Ultimate Developer Tools Collection' 
        : 'Dev Forge - 开发者工具集合',
      description: isEnglish
        ? 'Free online developer tools for JSON formatting, Base64 encoding, JWT decoding, password generation, and more. Boost your productivity with our comprehensive developer toolkit.'
        : '免费的在线开发者工具，包括JSON格式化、Base64编码、JWT解码、密码生成等。通过我们全面的开发者工具包提升您的生产力。',
      siteName: 'Dev Forge',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: isEnglish ? 'Dev Forge - Developer Tools' : 'Dev Forge - 开发者工具',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isEnglish 
        ? 'Dev Forge - Ultimate Developer Tools Collection' 
        : 'Dev Forge - 开发者工具集合',
      description: isEnglish
        ? 'Free online developer tools for JSON formatting, Base64 encoding, JWT decoding, password generation, and more.'
        : '免费的在线开发者工具，包括JSON格式化、Base64编码、JWT解码、密码生成等。',
      images: ['/og-image.png'],
      creator: '@bbj',
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
