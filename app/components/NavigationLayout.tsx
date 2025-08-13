"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

export default function NavigationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  
  const navigationItems = [
    { href: `/${locale}`, icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z", text: t('navigation.dashboard'), color: "text-green-500" },
    { href: `/${locale}/json`, icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", text: t('navigation.jsonTools'), color: "text-purple-500" },
    { href: `/${locale}/base64`, icon: "M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z", text: t('navigation.base64Encoder'), color: "text-blue-400" },
    { href: `/${locale}/timestamp`, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", text: t('navigation.timestamp'), color: "text-green-500" },
    { href: `/${locale}/crontab`, icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", text: t('navigation.crontabTool'), color: "text-fuchsia-500" },
    { href: `/${locale}/hash`, icon: "M13 10V3L4 14h7v7l9-11h-7z", text: t('navigation.hashCalculator'), color: "text-red-500" },
    { href: `/${locale}/jwt`, icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", text: t('navigation.jwtDecoder'), color: "text-amber-500" },
    { href: `/${locale}/uuid`, icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4", text: t('navigation.uuidGenerator'), color: "text-teal-500" },
    { href: `/${locale}/password`, icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z", text: t('navigation.passwordGenerator'), color: "text-pink-500" },
    { href: `/${locale}/url`, icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1", text: t('navigation.urlTool'), color: "text-indigo-500" },
    { href: `/${locale}/beautifier`, icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", text: t('navigation.codeBeautifier'), color: "text-indigo-500" },
    { href: `/${locale}/color`, icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M15 7l3-3m0 0h-3m3 0v3", text: t('navigation.colorConverter'), color: "text-rose-500" },
    { href: `/${locale}/base`, icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z", text: t('navigation.baseConverter'), color: "text-emerald-500" },
    { href: `/${locale}/sql`, icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", text: t('navigation.sqlFormatter'), color: "text-orange-500" },
    { href: `/${locale}/image2base64`, icon: "M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4 4h-4a1 1 0 01-1-1v-4h6v4a1 1 0 01-1 1z", text: t('navigation.imageToBase64'), color: "text-orange-500" },
    { href: `/${locale}/convert`, icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", text: t('navigation.dataConverter'), color: "text-amber-500" },
    { href: `/${locale}/http-status`, icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", text: t('navigation.httpStatusLookup'), color: "text-cyan-500" },
    { href: `/${locale}/dns`, icon: "M3 5h18M3 12h18M3 19h18", text: t('navigation.dnsResolver'), color: "text-sky-500" },
    { href: `/${locale}/user-agent`, icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", text: t('navigation.userAgentParser'), color: "text-lime-500" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Mobile Header - Only visible on mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('navigation.brand')}
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={t('common.toggleNavigation')}
          >
            <svg className="w-6 h-6 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Sidebar */}
      <nav className={`
        fixed md:static inset-y-0 left-0 z-40
        w-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm 
        border-r border-slate-200 dark:border-slate-700 shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${sidebarOpen ? 'block' : 'hidden md:block'}
      `}>
        <div className="p-6 h-full flex flex-col">
          {/* Brand/Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('navigation.brand')}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {t('navigation.subtitle')}
            </p>
          </div>
          
          {/* Language Switcher */}
          <div className="mb-4">
            <LanguageSwitcher />
          </div>
          
          {/* Navigation Links */}
          <div className="space-y-2 flex-1">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center px-4 py-3 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors group"
                onClick={() => setSidebarOpen(false)}
              >
                <svg className={`w-5 h-5 mr-3 ${item.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <span className="font-medium">{item.text}</span>
              </Link>
            ))}
          </div>
          
          {/* Footer */}
          <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
            {t('common.builtWith')}
          </div>
        </div>
      </nav>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto md:ml-0 pt-16 md:pt-0">
        {children}
      </main>
    </div>
  );
} 