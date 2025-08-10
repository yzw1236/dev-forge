# Internationalization (i18n) Implementation Guide

This document explains the internationalization setup for the Dev Forge application using `next-intl`.

## Overview

The application supports multiple languages with a complete i18n implementation including:
- **Supported Languages**: English (en) and Chinese (zh)
- **Default Language**: Chinese (zh)
- **URL Structure**: `/en/` and `/zh/` prefixes for all routes
- **Language Detection**: Automatic locale detection with fallback
- **Language Switching**: Seamless language switching with URL updates

## File Structure

```
├── i18n.ts                    # Main i18n configuration
├── middleware.ts              # Next.js middleware for locale routing
├── messages/
│   ├── en.json               # English translations
│   └── zh.json               # Chinese translations
├── app/
│   ├── [locale]/             # Locale-specific routes
│   │   ├── layout.tsx        # Locale-aware layout
│   │   ├── page.tsx          # Home page with translations
│   │   └── [tool]/           # Tool-specific pages
│   ├── components/
│   │   ├── LanguageSwitcher.tsx  # Language switching component
│   │   ├── Breadcrumbs.tsx       # i18n-aware breadcrumbs
│   │   └── NavigationLayout.tsx  # Navigation with translations
│   └── utils/
│       └── i18n.ts           # i18n utility functions
└── next.config.ts            # Next.js config with next-intl plugin
```

## Configuration Files

### 1. `i18n.ts` - Main Configuration

```typescript
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['zh', 'en'] as const;
export const defaultLocale = 'zh' as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Validate locale and fallback to default
  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }
  
  // Load messages for the locale
  return {
    locale: locale as string,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
```

### 2. `middleware.ts` - Route Handling

```typescript
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales: locales,
  defaultLocale: defaultLocale,
  localePrefix: 'always'  // Always show locale in URL
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
```

### 3. `next.config.ts` - Next.js Integration

```typescript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig = {
  // ... other config
};

export default withNextIntl(nextConfig);
```

## Translation Files

### Structure

Translation files are organized in a nested structure:

```json
{
  "navigation": {
    "brand": "bbj dev-forge",
    "dashboard": "Dashboard",
    "jsonTools": "JSON Tools"
  },
  "common": {
    "copy": "Copy",
    "clear": "Clear",
    "generate": "Generate"
  },
  "tools": {
    "jsonTools": {
      "description": "Format, validate, and beautify JSON data",
      "title": "JSON Tools - Format and Validate JSON"
    }
  },
  "errors": {
    "invalidInput": "Invalid input",
    "somethingWentWrong": "Something went wrong"
  },
  "success": {
    "copied": "Copied to clipboard",
    "generated": "Generated"
  }
}
```

### Adding New Translations

1. **Add to English file** (`messages/en.json`)
2. **Add to Chinese file** (`messages/zh.json`)
3. **Use in components** with `useTranslations()` hook

## Usage in Components

### 1. Using Translations

```typescript
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations();
  
  return (
    <div>
      <h1>{t('navigation.brand')}</h1>
      <p>{t('common.description')}</p>
      <button>{t('common.submit')}</button>
    </div>
  );
}
```

### 2. Using Locale Information

```typescript
import { useLocale } from 'next-intl';

export default function MyComponent() {
  const locale = useLocale();
  
  return (
    <div>
      <p>Current locale: {locale}</p>
      <Link href={`/${locale}/json`}>JSON Tool</Link>
    </div>
  );
}
```

### 3. Language Switching

```typescript
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(/^\/(en|zh)/, '') || '/';
    const newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <button onClick={() => switchLanguage('en')}>
      Switch to English
    </button>
  );
}
```

## Utility Functions

### `app/utils/i18n.ts`

Provides helper functions for locale management:

```typescript
import { locales, defaultLocale, type Locale } from '../../i18n';

// Get locale information
export const localeNames: Record<Locale, { name: string; flag: string; nativeName: string }> = {
  en: { name: 'English', flag: '🇺🇸', nativeName: 'English' },
  zh: { name: '中文', flag: '🇨🇳', nativeName: '中文' }
};

// Utility functions
export function isValidLocale(locale: string): locale is Locale
export function getLocaleName(locale: string): string
export function getLocaleFlag(locale: string): string
export function formatLocaleForDisplay(locale: string): string
export function getAlternateLocales(currentLocale: string): Array<{...}>
```

## SEO and Metadata

### Locale-aware Metadata

```typescript
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === 'en';
  
  return {
    title: isEnglish 
      ? "Dev Forge - Ultimate Developer Tools Collection" 
      : "Dev Forge - 开发者工具集合",
    description: isEnglish
      ? "Free online developer tools..."
      : "免费的在线开发者工具...",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'zh': '/zh',
      },
    },
  };
}
```

## Best Practices

### 1. Translation Keys

- Use descriptive, hierarchical keys: `navigation.dashboard`, `tools.jsonTools.description`
- Keep keys consistent across languages
- Use lowercase with dots for separation

### 2. Component Structure

- Always use `useTranslations()` hook in client components
- Use `getMessages()` in server components
- Provide fallback text for missing translations

### 3. URL Structure

- Always include locale prefix: `/en/json`, `/zh/base64`
- Handle locale switching properly
- Maintain URL structure when switching languages

### 4. Error Handling

- Provide fallback to default locale
- Handle missing translation keys gracefully
- Log translation loading errors

## Adding New Languages

1. **Add locale to configuration**:
   ```typescript
   export const locales = ['zh', 'en', 'ja'] as const;
   ```

2. **Create translation file**:
   ```bash
   cp messages/en.json messages/ja.json
   ```

3. **Update locale names**:
   ```typescript
   export const localeNames = {
     // ... existing locales
     ja: { name: '日本語', flag: '🇯🇵', nativeName: '日本語' }
   };
   ```

4. **Translate content** in `messages/ja.json`

## Testing

### Manual Testing

1. **Language Switching**: Test switching between languages
2. **URL Structure**: Verify locale prefixes work correctly
3. **Fallback**: Test with invalid locales
4. **SEO**: Check metadata for each language

### Automated Testing

```typescript
// Test translation loading
describe('i18n', () => {
  it('should load English translations', async () => {
    const messages = await import('../messages/en.json');
    expect(messages.default).toBeDefined();
  });
  
  it('should load Chinese translations', async () => {
    const messages = await import('../messages/zh.json');
    expect(messages.default).toBeDefined();
  });
});
```

## Troubleshooting

### Common Issues

1. **Missing translations**: Check translation files and keys
2. **Locale not detected**: Verify middleware configuration
3. **URL issues**: Check locale prefix configuration
4. **Build errors**: Ensure all locales have complete translations

### Debug Mode

Enable debug logging in `i18n.ts`:

```typescript
console.log('i18n config called with locale:', locale);
console.log('Using locale:', locale);
```

## Performance Considerations

- **Bundle size**: Each language adds to the bundle size
- **Loading**: Translations are loaded on-demand
- **Caching**: Next.js caches translation files
- **Tree shaking**: Unused translations are removed in production

## Future Enhancements

- [ ] Add more languages (Japanese, Korean, etc.)
- [ ] Implement RTL support for Arabic
- [ ] Add translation management system
- [ ] Implement automatic translation suggestions
- [ ] Add locale-specific formatting (dates, numbers, currencies)
