"use client";

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const t = useTranslations();
  const locale = useLocale();

  const tools = [
    { href: `/${locale}/json`, icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", text: t('navigation.jsonTools'), color: "text-purple-500", description: "Format, validate, and beautify JSON data" },
    { href: `/${locale}/base64`, icon: "M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z", text: t('navigation.base64Encoder'), color: "text-blue-400", description: "Encode and decode Base64 strings" },
    { href: `/${locale}/timestamp`, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", text: t('navigation.timestamp'), color: "text-green-500", description: "Convert between timestamps and readable dates" },
    { href: `/${locale}/crontab`, icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", text: t('navigation.crontabTool'), color: "text-fuchsia-500", description: "Generate and validate cron expressions" },
    { href: `/${locale}/hash`, icon: "M13 10V3L4 14h7v7l9-11h-7z", text: t('navigation.hashCalculator'), color: "text-red-500", description: "Calculate various hash algorithms" },
    { href: `/${locale}/jwt`, icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", text: t('navigation.jwtDecoder'), color: "text-amber-500", description: "Decode and validate JWT tokens" },
    { href: `/${locale}/uuid`, icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4", text: t('navigation.uuidGenerator'), color: "text-teal-500", description: "Generate UUIDs in various formats" },
    { href: `/${locale}/password`, icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z", text: t('navigation.passwordGenerator'), color: "text-pink-500", description: "Generate secure passwords with custom options" },
    { href: `/${locale}/url`, icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1", text: t('navigation.urlTool'), color: "text-indigo-500", description: "Encode and decode URLs" },
    { href: `/${locale}/beautifier`, icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", text: t('navigation.codeBeautifier'), color: "text-indigo-500", description: "Beautify and format code in various languages" },
    { href: `/${locale}/color`, icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M15 7l3-3m0 0h-3m3 0v3", text: t('navigation.colorConverter'), color: "text-rose-500", description: "Convert between color formats" },
    { href: `/${locale}/base`, icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z", text: t('navigation.baseConverter'), color: "text-emerald-500", description: "Convert between number bases" },
    { href: `/${locale}/sql`, icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", text: t('navigation.sqlFormatter'), color: "text-orange-500", description: "Format and beautify SQL queries" },
    { href: `/${locale}/image2base64`, icon: "M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4 4h-4a1 1 0 01-1-1v-4h6v4a1 1 0 01-1 1z", text: t('navigation.imageToBase64'), color: "text-orange-500", description: "Convert images to Base64 strings" },
    { href: `/${locale}/convert`, icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", text: t('navigation.dataConverter'), color: "text-amber-500", description: "Convert between different data formats" },
    { href: `/${locale}/http-status`, icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", text: t('navigation.httpStatusLookup'), color: "text-cyan-500", description: "Look up HTTP status codes and meanings" },
    { href: `/${locale}/user-agent`, icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", text: t('navigation.userAgentParser'), color: "text-lime-500", description: "Parse and analyze user agent strings" },
  ];

  return (
    <main className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('home.welcome')}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4">
            {t('home.description')}
          </p>
        </header>

        <section aria-labelledby="tools-heading">
          <h2 id="tools-heading" className="sr-only">Developer Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {tools.map((tool, index) => (
              <article key={index} className="group">
                <Link
                  href={tool.href}
                  className="block p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1"
                  aria-describedby={`tool-description-${index}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <svg className={`w-8 h-8 ${tool.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tool.icon} />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.text}
                      </h3>
                      <p id={`tool-description-${index}`} className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {tool.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <footer className="text-center mt-12 md:mt-16">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            {t('common.builtWith')}
          </p>
          <a
            href="https://github.com/yzw1236/dev-forge/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>{t('common.viewOnGitHub')}</span>
          </a>
        </footer>
      </div>
    </main>
  );
}
