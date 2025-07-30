"use client";
import { useState } from "react";

export default function TimestampPage() {
  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
            Timestamp Converter
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Convert between Unix timestamps and human-readable dates
          </p>
        </header>
        
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
          <TimestampConverter />
        </div>
      </div>
    </div>
  );
}

function TimestampConverter() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    setResult("");
    if (!input.trim()) {
      setError("Please enter a date or timestamp.");
      return;
    }
    let num = Number(input.trim());
    if (!isNaN(num)) {
      if (input.trim().length === 10) num = num * 1000;
      try {
        const date = new Date(num);
        if (isNaN(date.getTime())) throw new Error();
        setResult(date.toISOString());
        return;
      } catch {}
    }
    try {
      const date = new Date(input.trim());
      if (isNaN(date.getTime())) throw new Error();
      setResult(date.getTime().toString());
    } catch {
      setError("Invalid date or timestamp.");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Input Date or Timestamp
        </label>
        <input
          className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-sm bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          type="text"
          placeholder="Enter date (YYYY-MM-DD) or timestamp"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleConvert(); }}
        />
      </div>
      
      <button
        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg px-6 py-3 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        onClick={handleConvert}
      >
        Convert
      </button>
      
      {result && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">Result:</div>
          <div className="text-green-700 dark:text-green-400 break-all font-mono text-sm">
            {result}
          </div>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        </div>
      )}
    </div>
  );
}