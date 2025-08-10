"use client";

import { useState, useRef } from "react";

export default function ImageToBase64() {
  const [image, setImage] = useState<File | null>(null);
  const [base64, setBase64] = useState("");
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Only image files are supported");
      setImage(null);
      setBase64("");
      setPreviewUrl("");
      return;
    }
    setError("");
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.onload = () => {
      setBase64(reader.result as string);
    };
    reader.onerror = () => {
      setError("Failed to read image");
      setBase64("");
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (!file.type.startsWith("image/")) {
        setError("Only image files are supported");
        setImage(null);
        setBase64("");
        setPreviewUrl("");
        return;
      }
      setError("");
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onload = () => {
        setBase64(reader.result as string);
      };
      reader.onerror = () => {
        setError("Failed to read image");
        setBase64("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleClear = () => {
    setImage(null);
    setBase64("");
    setError("");
    setPreviewUrl("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleCopy = async () => {
    if (base64) {
      try {
        await navigator.clipboard.writeText(base64);
      } catch (err) {}
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">
            Image to Base64
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Supports drag-and-drop or file upload, automatically generates Base64 strings, and supports one-click copy
          </p>
        </header>

        {/* 上传区 */}
        <div
          className="mb-6 flex flex-col items-center justify-center border-2 border-dashed border-orange-400 dark:border-orange-700 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-8 cursor-pointer hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-all"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => inputRef.current?.click()}
        >
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <svg className="w-12 h-12 text-orange-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4 4h-4a1 1 0 01-1-1v-4h6v4a1 1 0 01-1 1z" />
          </svg>
          <div className="text-slate-700 dark:text-slate-300 mb-1">Click or drag image here to upload</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Supports PNG, JPG, GIF, SVG, etc. common image formats</div>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* 预览区 */}
        {previewUrl && (
          <div className="mb-6 flex flex-col items-center">
            <img src={previewUrl} alt="Preview" className="max-h-64 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 mb-2" />
            <div className="text-xs text-slate-500 dark:text-slate-400">Image Preview</div>
          </div>
        )}

        {/* Base64 区 */}
        {base64 && (
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center">
                <svg className="w-6 h-6 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Base64 Result
              </h2>
              <button
                onClick={handleCopy}
                className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-md transition-all duration-200"
              >
                Copy
              </button>
              <button
                onClick={handleClear}
                className="ml-2 px-3 py-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-md text-xs"
              >
                Clear
              </button>
            </div>
            <textarea
              value={base64}
              readOnly
              className="w-full h-48 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg font-mono text-xs resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        )}


      </div>
    </div>
  );
}