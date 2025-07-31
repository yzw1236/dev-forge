"use client";

import { useState } from "react";

export default function NavigationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Mobile Header - Only visible on mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            bbj dev-forge
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation"
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
              bbj dev-forge
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Developer Tools
            </p>
          </div>
          
          {/* Navigation Links */}
          <div className="space-y-2 flex-1">
            <a 
              href="/" 
              className="flex items-center px-4 py-3 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors group"
              onClick={() => setSidebarOpen(false)}
            >
              <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
              </svg>
              <span className="font-medium">Dashboard</span>
            </a>
            
            <a 
              href="/timestamp" 
              className="flex items-center px-4 py-3 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors group"
              onClick={() => setSidebarOpen(false)}
            >
              <svg className="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Timestamp</span>
            </a>
            
            <a 
              href="/json" 
              className="flex items-center px-4 py-3 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors group"
              onClick={() => setSidebarOpen(false)}
            >
              <svg className="w-5 h-5 mr-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span className="font-medium">JSON Tools</span>
            </a>
          </div>
          
          {/* Footer */}
          <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
            Built with ❤️ by bbj
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