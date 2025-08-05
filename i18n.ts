import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['zh', 'en'] as const;
export const defaultLocale = 'zh' as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  console.log('i18n config called with locale:', locale);
  
  // If locale is undefined or invalid, use default locale
  if (!locale || !locales.includes(locale as any)) {
    console.log('Invalid or undefined locale:', locale, 'using default:', defaultLocale);
    locale = defaultLocale;
  }

  console.log('Using locale:', locale);
  
  try {
    return {
      locale: locale as string,
      messages: (await import(`./messages/${locale}.json`)).default
    };
  } catch (error) {
    console.error('Error loading messages for locale:', locale, error);
    // Fallback to default locale
    return {
      locale: defaultLocale,
      messages: (await import(`./messages/${defaultLocale}.json`)).default
    };
  }
}); 