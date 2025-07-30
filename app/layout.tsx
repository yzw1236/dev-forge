import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Forge - Developer Tools",
  description: "A collection of useful developer tools for better productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800`}
      >
        <div className="flex min-h-screen">
          {/* Navigation Sidebar */}
          <nav className="w-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-r border-slate-200 dark:border-slate-700 shadow-lg">
            <div className="p-6">
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
              <div className="space-y-2">
                <a 
                  href="/" 
                  className="flex items-center px-4 py-3 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors group"
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
                >
                  <svg className="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Timestamp</span>
                </a>
                
                <a 
                  href="/json" 
                  className="flex items-center px-4 py-3 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors group"
                >
                  <svg className="w-5 h-5 mr-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <span className="font-medium">JSON Tools</span>
                </a>
              </div>
              
              {/* Footer */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
                  Built with ❤️ by bbj
                </div>
              </div>
            </div>
          </nav>
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
