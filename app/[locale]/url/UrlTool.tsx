"use client";

import { useState } from "react";

export default function UrlTool() {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            URL Tool
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
            Encode and decode URLs
          </p>
        </header>
        
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 md:p-8">
          <div className="text-center text-slate-500 dark:text-slate-400">
            <p>Tool implementation coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
