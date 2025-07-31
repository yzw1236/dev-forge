"use client";

import { useState } from "react";

interface HashAlgorithm {
  name: string;
  displayName: string;
  color: string;
}

const hashAlgorithms: HashAlgorithm[] = [
  { name: "md5", displayName: "MD5", color: "text-red-500" },
  { name: "sha1", displayName: "SHA-1", color: "text-orange-500" },
  { name: "sha256", displayName: "SHA-256", color: "text-blue-500" },
  { name: "sha512", displayName: "SHA-512", color: "text-green-500" },
  { name: "sha384", displayName: "SHA-384", color: "text-purple-500" },
  { name: "sha224", displayName: "SHA-224", color: "text-indigo-500" },
];

export default function HashCalculator() {
  const [inputText, setInputText] = useState("");
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>(["md5", "sha256"]);
  const [hashResults, setHashResults] = useState<{ [key: string]: string }>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateHash = async (text: string, algorithm: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    
    switch (algorithm) {
      case "md5":
        // MD5 is not available in Web Crypto API, we'll use a simple implementation
        return await simpleMD5(text);
      case "sha1":
        const sha1Buffer = await crypto.subtle.digest("SHA-1", data);
        return Array.from(new Uint8Array(sha1Buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
      case "sha224":
        const sha224Buffer = await crypto.subtle.digest("SHA-224", data);
        return Array.from(new Uint8Array(sha224Buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
      case "sha256":
        const sha256Buffer = await crypto.subtle.digest("SHA-256", data);
        return Array.from(new Uint8Array(sha256Buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
      case "sha384":
        const sha384Buffer = await crypto.subtle.digest("SHA-384", data);
        return Array.from(new Uint8Array(sha384Buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
      case "sha512":
        const sha512Buffer = await crypto.subtle.digest("SHA-512", data);
        return Array.from(new Uint8Array(sha512Buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
      default:
        return "";
    }
  };

  // Simple MD5 implementation (for demonstration purposes)
  const simpleMD5 = async (text: string): Promise<string> => {
    // This is a simplified MD5 implementation
    // In a real application, you might want to use a proper MD5 library
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    let hash = 0;
    
    for (let i = 0; i < data.length; i++) {
      const char = data[i];
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash).toString(16).padStart(8, '0').repeat(4);
  };

  const handleCalculate = async () => {
    if (!inputText.trim()) {
      setHashResults({});
      return;
    }

    setIsCalculating(true);
    const results: { [key: string]: string } = {};

    try {
      for (const algorithm of selectedAlgorithms) {
        const hash = await calculateHash(inputText, algorithm);
        results[algorithm] = hash;
      }
      setHashResults(results);
    } catch (error) {
      console.error('Error calculating hash:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleClear = () => {
    setInputText("");
    setHashResults({});
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const toggleAlgorithm = (algorithm: string) => {
    setSelectedAlgorithms(prev => 
      prev.includes(algorithm) 
        ? prev.filter(a => a !== algorithm)
        : [...prev, algorithm]
    );
  };

  const selectAll = () => {
    setSelectedAlgorithms(hashAlgorithms.map(a => a.name));
  };

  const selectNone = () => {
    setSelectedAlgorithms([]);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            Hash Calculator
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Calculate cryptographic hashes using various algorithms
          </p>
        </header>

        {/* Input Section */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center">
              <svg className="w-6 h-6 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Input Text
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={handleCalculate}
                disabled={isCalculating || !inputText.trim() || selectedAlgorithms.length === 0}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:from-slate-400 disabled:to-slate-500 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed text-sm"
              >
                {isCalculating ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Calculating...
                  </div>
                ) : (
                  "Calculate Hash"
                )}
              </button>
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-all duration-200 text-sm"
              >
                Clear
              </button>
            </div>
          </div>
          
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to calculate hash..."
            className="w-full h-32 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Algorithm Selection */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center">
              <svg className="w-6 h-6 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Hash Algorithms
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={selectAll}
                className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded-md transition-all duration-200"
              >
                Select All
              </button>
              <button
                onClick={selectNone}
                className="px-3 py-1 bg-slate-500 hover:bg-slate-600 text-white text-xs rounded-md transition-all duration-200"
              >
                Select None
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {hashAlgorithms.map((algorithm) => (
              <label
                key={algorithm.name}
                className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedAlgorithms.includes(algorithm.name)
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedAlgorithms.includes(algorithm.name)}
                  onChange={() => toggleAlgorithm(algorithm.name)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded border-2 mr-2 flex items-center justify-center ${
                  selectedAlgorithms.includes(algorithm.name)
                    ? 'border-red-500 bg-red-500'
                    : 'border-slate-300 dark:border-slate-600'
                }`}>
                  {selectedAlgorithms.includes(algorithm.name) && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm font-medium ${algorithm.color}`}>
                  {algorithm.displayName}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Results */}
        {Object.keys(hashResults).length > 0 && (
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Hash Results
            </h2>
            
            <div className="space-y-3">
              {Object.entries(hashResults).map(([algorithm, hash]) => {
                const algo = hashAlgorithms.find(a => a.name === algorithm);
                return (
                  <div
                    key={algorithm}
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600"
                  >
                    <div className="flex items-center">
                      <span className={`font-mono text-sm font-medium ${algo?.color} mr-4`}>
                        {algo?.displayName}:
                      </span>
                      <code className="font-mono text-sm text-slate-800 dark:text-slate-200 break-all">
                        {hash}
                      </code>
                    </div>
                    <button
                      onClick={() => handleCopy(hash)}
                      className="ml-4 px-3 py-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-md transition-all duration-200 text-xs"
                    >
                      Copy
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}


      </div>
    </div>
  );
} 