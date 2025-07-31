"use client";

import { useState } from "react";

const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "json", label: "JSON" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "c", label: "C/C++" },
  { value: "go", label: "Go" },
  { value: "shell", label: "Shell" },
];

function simpleFormat(code: string, lang: string): string {
  try {
    if (lang === "json") {
      return JSON.stringify(JSON.parse(code), null, 2);
    }
    if (lang === "javascript" || lang === "typescript") {
      // 简单缩进和分号处理
      return code.replace(/;/g, ";\n").replace(/\{/g, "{\n").replace(/\}/g, "\n}\n").replace(/\n{2,}/g, "\n").replace(/\n\s*\n/g, "\n");
    }
    if (lang === "html") {
      return code.replace(/></g, ">\n<");
    }
    if (lang === "css") {
      return code.replace(/;/g, ";\n").replace(/\{/g, "{\n").replace(/\}/g, "\n}\n");
    }
    if (lang === "python") {
      return code.replace(/:/g, ":\n").replace(/\n{2,}/g, "\n");
    }
    if (lang === "java" || lang === "c" || lang === "go") {
      return code.replace(/;/g, ";\n").replace(/\{/g, "{\n").replace(/\}/g, "\n}\n");
    }
    if (lang === "shell") {
      return code.replace(/;/g, ";\n");
    }
    return code;
  } catch {
    return code;
  }
}

export default function CodeBeautifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [lang, setLang] = useState("javascript");
  const [error, setError] = useState("");

  const handleFormat = () => {
    if (!input.trim()) {
      setError("Please enter code");
      setOutput("");
      return;
    }
    try {
      const formatted = simpleFormat(input, lang);
      setOutput(formatted);
      setError("");
    } catch (e) {
      setError("Formatting failed, please check code format");
      setOutput("");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const handleCopy = async () => {
    if (output) {
      try {
        await navigator.clipboard.writeText(output);
      } catch (err) {}
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Code Beautifier
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Supports code formatting and beautification for multiple popular programming languages, improving code readability
          </p>
        </header>

        {/* 语言选择 */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          <span className="text-slate-700 dark:text-slate-300 font-medium">Language:</span>
          {languages.map(l => (
            <button
              key={l.value}
              onClick={() => setLang(l.value)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${lang === l.value ? "bg-indigo-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-indigo-900"}`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* 输入输出区 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* 输入区 */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center">
                <svg className="w-6 h-6 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Input Code
              </h2>
              <button
                onClick={handleClear}
                className="px-3 py-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm"
              >
                Clear
              </button>
            </div>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Paste or enter code to beautify"
              className="w-full h-64 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <span className="text-red-700 dark:text-red-400 text-sm">{error}</span>
              </div>
            )}
          </div>

          {/* 输出区 */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Beautified Result
              </h2>
              <button
                onClick={handleFormat}
                disabled={!input.trim()}
                className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg text-sm"
              >
                Format
              </button>
              <button
                onClick={handleCopy}
                disabled={!output}
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg text-sm ml-2"
              >
                Copy
              </button>
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Beautified code will be displayed here"
              className="w-full h-64 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* 说明区 */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-8 text-slate-800 dark:text-slate-200">Code Beautifier Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200">Multi-language Support</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Supports JS, TS, JSON, HTML, CSS, Python, Java, C/C++, Go, Shell, etc.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200">One-click Formatting</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">One-click beautify code, improve readability</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200">One-click Copy</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Beautified result supports one-click copy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}