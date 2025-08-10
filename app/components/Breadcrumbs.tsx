'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

interface BreadcrumbsProps {
  toolName?: string;
  toolTitle?: string;
}

export default function Breadcrumbs({ toolName, toolTitle }: BreadcrumbsProps) {
  const t = useTranslations();
  const locale = useLocale();

  const breadcrumbData = [
    {
      label: t('navigation.brand'),
      href: `/${locale}`,
      current: !toolName
    }
  ];

  if (toolName && toolTitle) {
    breadcrumbData.push({
      label: toolTitle,
      href: `/${locale}/${toolName}`,
      current: true
    });
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
        {breadcrumbData.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <svg
                className="w-4 h-4 mx-2 text-slate-400"
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
            {item.current ? (
              <span
                className="font-medium text-slate-900 dark:text-slate-100"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
