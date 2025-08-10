"use client";

import { useTranslations } from 'next-intl';
import Breadcrumbs from '../../components/Breadcrumbs';

import { useState } from "react";

const crontabTemplates = [
  { label: "Every Minute", value: "* * * * *", desc: "Runs every minute" },
  { label: "Every Hour", value: "0 * * * *", desc: "Runs at minute 0 of every hour" },
  { label: "Every Day", value: "0 0 * * *", desc: "Runs at 00:00 every day" },
  { label: "Every Week", value: "0 0 * * 0", desc: "Runs at 00:00 every Sunday" },
  { label: "Every Month", value: "0 0 1 * *", desc: "Runs at 00:00 on the 1st of every month" },
  { label: "Every Year", value: "0 0 1 1 *", desc: "Runs at 00:00 on January 1st every year" },
];

function parseCrontab(expr: string) {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return { valid: false, error: "Expression must have 5 parts (min hour day month week)" };
  return { valid: true, error: "" };
}

function explainCrontab(expr: string) {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return "";
  const [min, hour, day, month, week] = parts;
  return `Minute: ${min}, Hour: ${hour}, Day: ${day}, Month: ${month}, Week: ${week}`;
}

export default function CrontabTool() {
  const t = useTranslations();
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [desc, setDesc] = useState("");

  const handleValidate = () => {
    const { valid, error } = parseCrontab(input);
    if (!valid) {
      setError(error);
      setResult("");
      setDesc("");
      return;
    }
    setError("");
    setResult(input);
    setDesc(explainCrontab(input));
  };

  const handleTemplate = (tpl: string, tplDesc: string) => {
    setInput(tpl);
    setDesc(tplDesc);
    setError("");
    setResult(tpl);
  };

  const handleClear = () => {
    setInput("");
    setResult("");
    setError("");
    setDesc("");
  };

  const handleCopy = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result);
      } catch (err) {
        // ignore
      }
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs />
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('tools.crontab.title')}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t('tools.crontab.description')}
          </p>
        </header>

        {/* 模板选择 */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {crontabTemplates.map(tpl => (
              <button
                key={tpl.value}
                onClick={() => handleTemplate(tpl.value, tpl.desc)}
                className="px-3 py-1 bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300 rounded-lg text-sm hover:bg-fuchsia-200 dark:hover:bg-fuchsia-800 transition-all"
              >
                {tpl.label}
              </button>
            ))}
          </div>
        </div>

        {/* 输入区 */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center">
              <svg className="w-6 h-6 mr-2 text-fuchsia-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Crontab Expression
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={handleValidate}
                disabled={!input.trim()}
                className="px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600 disabled:from-slate-400 disabled:to-slate-500 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed text-sm"
              >
                Validate / Explain
              </button>
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-all duration-200 text-sm"
              >
                {t('common.clear')}
              </button>
            </div>
          </div>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="e.g. 0 0 * * *"
            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg font-mono text-base focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all duration-200"
          />
          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <span className="text-red-700 dark:text-red-400 text-sm">{error}</span>
            </div>
          )}
        </div>

        {/* 结果区 */}
        {result && (
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Validation Result
              </h3>
              <button
                onClick={handleCopy}
                className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded-md transition-all duration-200"
              >
                {t('common.copy')}
              </button>
            </div>
            <div className="mb-2 font-mono text-base text-slate-800 dark:text-slate-200">{result}</div>
            {desc && <div className="text-sm text-slate-600 dark:text-slate-400">{desc}</div>}
          </div>
        )}


      </div>
    </div>
  );
}