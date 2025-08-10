"use client";
import { useState } from "react";
import { useTranslations } from 'next-intl';
import Breadcrumbs from '../../components/Breadcrumbs';

export default function JsonPage() {
  const t = useTranslations();
  
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs />
        
        <header className="text-center mb-6 md:mb-8 mt-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
            {t('tools.jsonTools.title')}
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
            {t('tools.jsonTools.description')}
          </p>
        </header>
        
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 md:p-8">
          <JsonFormatterValidator />
        </div>
      </div>
    </div>
  );
}

function JsonFormatterValidator() {
  const t = useTranslations();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleFormat() {
    setError("");
    setOutput("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (e) {
      setError(t('errors.invalidInput') + ": " + (e instanceof Error ? e.message : ""));
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          {t('common.input')}
        </label>
        <textarea
          className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 md:px-4 md:py-3 text-sm bg-white dark:bg-slate-800 font-mono min-h-[150px] md:min-h-[200px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-y"
          placeholder={t('common.input') + "..."}
          value={input}
          onChange={e => setInput(e.target.value)}
          spellCheck={false}
        />
      </div>
      
      <button
        className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-lg px-4 py-2 md:px-6 md:py-3 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm md:text-base"
        onClick={handleFormat}
      >
        {t('common.format')} & {t('common.validate')}
      </button>
      
      {output && (
        <div className="mt-4">
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('common.output')}:</div>
          <pre className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 md:p-4 text-green-700 dark:text-green-400 overflow-x-auto font-mono text-xs md:text-sm">
            {output}
          </pre>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-3 md:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        </div>
      )}
    </div>
  );
}