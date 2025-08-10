import { locales, defaultLocale, type Locale } from '../../i18n';

export { locales, defaultLocale, type Locale };

export const localeNames: Record<Locale, { name: string; flag: string; nativeName: string }> = {
  en: {
    name: 'English',
    flag: '🇺🇸',
    nativeName: 'English'
  },
  zh: {
    name: '中文',
    flag: '🇨🇳',
    nativeName: '中文'
  }
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getLocaleName(locale: string): string {
  return localeNames[locale as Locale]?.name || locale;
}

export function getLocaleFlag(locale: string): string {
  return localeNames[locale as Locale]?.flag || '🌐';
}

export function getLocaleNativeName(locale: string): string {
  return localeNames[locale as Locale]?.nativeName || locale;
}

export function formatLocaleForDisplay(locale: string): string {
  const localeInfo = localeNames[locale as Locale];
  if (!localeInfo) return locale;
  
  return `${localeInfo.flag} ${localeInfo.name}`;
}

export function getAlternateLocales(currentLocale: string): Array<{ code: Locale; name: string; flag: string; url: string }> {
  return locales
    .filter(locale => locale !== currentLocale)
    .map(locale => ({
      code: locale,
      name: localeNames[locale].name,
      flag: localeNames[locale].flag,
      url: `/${locale}`
    }));
}
