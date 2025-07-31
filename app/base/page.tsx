"use client";

import { useState, useEffect } from "react";

interface BaseConverter {
  binary: string;
  octal: string;
  decimal: string;
  hexadecimal: string;
}

export default function BaseConverter() {
  const [inputValue, setInputValue] = useState("");
  const [inputBase, setInputBase] = useState<number>(10);
  const [convertedValues, setConvertedValues] = useState<BaseConverter>({
    binary: "",
    octal: "",
    decimal: "",
    hexadecimal: ""
  });
  const [error, setError] = useState("");

  // Convert number from one base to another
  const convertBase = (num: string, fromBase: number, toBase: number): string => {
    try {
      const decimal = parseInt(num, fromBase);
      if (isNaN(decimal)) {
        throw new Error("Invalid number");
      }
      return decimal.toString(toBase);
    } catch (err) {
      return "";
    }
  };

  // Convert decimal to all bases
  const convertAllBases = (value: string, base: number) => {
    if (!value.trim()) {
      setConvertedValues({
        binary: "",
        octal: "",
        decimal: "",
        hexadecimal: ""
      });
      setError("");
      return;
    }

    try {
      const decimal = parseInt(value, base);
      if (isNaN(decimal)) {
        throw new Error("Invalid number for the selected base");
      }

      setConvertedValues({
        binary: decimal.toString(2),
        octal: decimal.toString(8),
        decimal: decimal.toString(10),
        hexadecimal: decimal.toString(16).toUpperCase()
      });
      setError("");
    } catch (err) {
      setError("Invalid number for the selected base");
      setConvertedValues({
        binary: "",
        octal: "",
        decimal: "",
        hexadecimal: ""
      });
    }
  };

  useEffect(() => {
    convertAllBases(inputValue, inputBase);
  }, [inputValue, inputBase]);

  const handleClear = () => {
    setInputValue("");
    setError("");
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const baseOptions = [
    { value: 2, label: "Binary (2)", color: "text-red-500" },
    { value: 8, label: "Octal (8)", color: "text-orange-500" },
    { value: 10, label: "Decimal (10)", color: "text-blue-500" },
    { value: 16, label: "Hexadecimal (16)", color: "text-green-500" }
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Base Converter
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Convert numbers between binary, octal, decimal, and hexadecimal bases
          </p>
        </header>

        {/* Input Section */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center">
              <svg className="w-6 h-6 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Input Number
            </h2>
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-all duration-200 text-sm"
            >
              Clear
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Input Base
              </label>
              <select
                value={inputBase}
                onChange={(e) => setInputBase(Number(e.target.value))}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
              >
                {baseOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Number
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Enter ${baseOptions.find(b => b.value === inputBase)?.label.split(' ')[0].toLowerCase()} number...`}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg font-mono text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-red-700 dark:text-red-400 text-sm">{error}</span>
              </div>
            </div>
          )}
        </div>

        {/* Conversion Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Binary */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                Binary
              </h3>
              <button
                onClick={() => handleCopy(convertedValues.binary)}
                disabled={!convertedValues.binary}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs rounded-md transition-all duration-200"
              >
                Copy
              </button>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg p-3">
              <code className="font-mono text-sm text-slate-800 dark:text-slate-200 break-all">
                {convertedValues.binary || "—"}
              </code>
            </div>
          </div>

          {/* Octal */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center">
                <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
                Octal
              </h3>
              <button
                onClick={() => handleCopy(convertedValues.octal)}
                disabled={!convertedValues.octal}
                className="px-3 py-1 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs rounded-md transition-all duration-200"
              >
                Copy
              </button>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg p-3">
              <code className="font-mono text-sm text-slate-800 dark:text-slate-200 break-all">
                {convertedValues.octal || "—"}
              </code>
            </div>
          </div>

          {/* Decimal */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                Decimal
              </h3>
              <button
                onClick={() => handleCopy(convertedValues.decimal)}
                disabled={!convertedValues.decimal}
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs rounded-md transition-all duration-200"
              >
                Copy
              </button>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg p-3">
              <code className="font-mono text-sm text-slate-800 dark:text-slate-200 break-all">
                {convertedValues.decimal || "—"}
              </code>
            </div>
          </div>

          {/* Hexadecimal */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                Hexadecimal
              </h3>
              <button
                onClick={() => handleCopy(convertedValues.hexadecimal)}
                disabled={!convertedValues.hexadecimal}
                className="px-3 py-1 bg-green-500 hover:bg-green-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs rounded-md transition-all duration-200"
              >
                Copy
              </button>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg p-3">
              <code className="font-mono text-sm text-slate-800 dark:text-slate-200 break-all">
                {convertedValues.hexadecimal || "—"}
              </code>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
} 