"use client";
import { useState } from "react";

export default function TimestampPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <section className="w-full max-w-xl bg-white dark:bg-neutral-900 rounded-xl shadow p-6 flex flex-col gap-4 border border-neutral-200 dark:border-neutral-800">
        <h1 className="text-2xl font-bold mb-2">Timestamp Converter</h1>
        <TimestampConverter />
      </section>
    </main>
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
    <div className="flex flex-col gap-2">
      <input
        className="border rounded px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        placeholder="Enter date (YYYY-MM-DD) or timestamp"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') handleConvert(); }}
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded px-4 py-2 transition-colors"
        onClick={handleConvert}
      >
        Convert
      </button>
      {result && (
        <div className="mt-2 text-green-700 dark:text-green-400 break-all">
          <span className="font-mono">{result}</span>
        </div>
      )}
      {error && (
        <div className="mt-2 text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
    </div>
  );
}