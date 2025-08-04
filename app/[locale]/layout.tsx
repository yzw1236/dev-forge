import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import NavigationLayout from "../components/NavigationLayout";

export const metadata: Metadata = {
  title: "Dev Forge - Developer Tools",
  description: "A collection of useful developer tools for better productivity",
};

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
