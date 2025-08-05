"use client";

import { useState } from "react";

export default function Base64Tool() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

  const handleEncode = () => {
    if (!inputText.trim()) {
      setError("Please enter text to encode");
      setOutputText("");
      return;
    }
    
    try {
      const encoded = btoa(inputText);
      setOutputText(encoded);
      setError("");
    } catch (err) {
      setError("Failed to encode text. Please check your input.");
      setOutputText("");
    }
  };

  const handleDecode = () => {
    if (!inputText.trim()) {
      setError("Please enter Base64 text to decode");
      setOutputText("");
      return;
    }
    
    try {
      const decoded = atob(inputText);
      setOutputText(decoded);
      setError("");
    } catch (err) {
      setError("Invalid Base64 string. Please check your input.");
      setOutputText("");
    }
  };

  const handleConvert = () => {
    if (mode === "encode") {
      handleEncode();
    } else {
      handleDecode();
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setError("");
  };

  const handleCopy = async () => {
    if (outputText) {
      try {
        await navigator.clipboard.writeText(outputText);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const handleSwap = () => {
    setInputText(outputText);
    setOutputText("");
    setError("");
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Base64 Encoder/Decoder
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Encode text to Base64 or decode Base64 back to text
          </p>
        </header>

        {/* Mode Selector */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-1">
            <button
              onClick={() => setMode("encode")}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                mode === "encode"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => setMode("decode")}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                mode === "decode"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              Decode
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {mode === "encode" ? "Input Text" : "Base64 String"}
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={handleConvert}
                  disabled={!inputText.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-slate-400 disabled:to-slate-500 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed text-sm"
                >
                  {mode === "encode" ? "Encode" : "Decode"}
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
              placeholder={mode === "encode" 
                ? "Enter text to encode to Base64..." 
                : "Enter Base64 string to decode..."
              }
              className="w-full h-80 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Output Section */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center">
                <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {mode === "encode" ? "Base64 Output" : "Decoded Text"}
              </h2>
              <div className="flex space-x-2">
                {outputText && (
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </button>
                )}
                {outputText && (
                  <button
                    onClick={handleSwap}
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    Swap
                  </button>
                )}
              </div>
            </div>
            
            {error && (
              <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-700 dark:text-red-400 text-sm">{error}</span>
                </div>
              </div>
            )}
            
            <div className="w-full h-80 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg font-mono text-sm overflow-auto">
              {outputText ? (
                <pre className="whitespace-pre-wrap text-slate-800 dark:text-slate-200 break-all">{outputText}</pre>
              ) : (
                <div className="text-slate-500 dark:text-slate-400 h-full flex items-center justify-center">
                  {mode === "encode" ? "Encoded Base64 will appear here..." : "Decoded text will appear here..."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 