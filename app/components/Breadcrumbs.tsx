"use client";

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();

  // Remove locale prefix from pathname
  const pathWithoutLocale = pathname.replace(/^\/(en|zh)/, '') || '/';
  
  // Split path into segments
  const segments = pathWithoutLocale.split('/').filter(Boolean);
  
  // Build breadcrumb items
  const breadcrumbs = [
    {
      name: t('navigation.dashboard'),
      href: `/${locale}`,
      current: segments.length === 0
    }
  ];

  // Add tool-specific breadcrumbs
  if (segments.length > 0) {
    const toolKey = segments[0];
    const toolTranslations: Record<string, string> = {
      'json': t('navigation.jsonTools'),
      'base64': t('navigation.base64Encoder'),
      'timestamp': t('navigation.timestamp'),
      'crontab': t('navigation.crontabTool'),
      'hash': t('navigation.hashCalculator'),
      'jwt': t('navigation.jwtDecoder'),
      'uuid': t('navigation.uuidGenerator'),
      'password': t('navigation.passwordGenerator'),
      'url': t('navigation.urlTool'),
      'beautifier': t('navigation.codeBeautifier'),
      'color': t('navigation.colorConverter'),
      'base': t('navigation.baseConverter'),
      'sql': t('navigation.sqlFormatter'),
      'image2base64': t('navigation.imageToBase64'),
      'convert': t('navigation.dataConverter'),
      'http-status': t('navigation.httpStatusLookup'),
      'user-agent': t('navigation.userAgentParser')
    };

    const toolName = toolTranslations[toolKey] || toolKey;
    breadcrumbs.push({
      name: toolName,
      href: `/${locale}/${toolKey}`,
      current: true
    });
  }

  if (breadcrumbs.length <= 1) {
    return null; // Don't show breadcrumbs on home page
  }

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            {index > 0 && (
              <svg
                className="w-4 h-4 text-slate-400 mx-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {breadcrumb.current ? (
              <span
                className="text-sm font-medium text-slate-500 dark:text-slate-400"
                aria-current="page"
              >
                {breadcrumb.name}
              </span>
            ) : (
              <Link
                href={breadcrumb.href}
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {breadcrumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
