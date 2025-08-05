import type { Metadata } from "next";
import JsonFormatterValidator from "./JsonFormatterValidator";
import { generateToolMetadata } from "../../lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolMetadata('json', locale);
}

export default function JsonPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
            JSON Formatter & Validator
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
            Beautify, validate, and format JSON data with ease
          </p>
        </header>
        
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 md:p-8">
          <JsonFormatterValidator />
        </div>
      </div>
    </div>
  );
}