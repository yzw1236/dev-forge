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
      setError("仅支持图片文件");
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
      setError("图片读取失败");
      setBase64("");
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (!file.type.startsWith("image/")) {
        setError("仅支持图片文件");
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
        setError("图片读取失败");
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
            图片转 Base64
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            支持图片文件拖拽或选择上传，自动生成 Base64 字符串，支持一键复制
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
          <div className="text-slate-700 dark:text-slate-300 mb-1">点击或拖拽图片到此处上传</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">支持 PNG、JPG、GIF、SVG 等常见图片格式</div>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* 预览区 */}
        {previewUrl && (
          <div className="mb-6 flex flex-col items-center">
            <img src={previewUrl} alt="预览" className="max-h-64 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 mb-2" />
            <div className="text-xs text-slate-500 dark:text-slate-400">图片预览</div>
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
                Base64 结果
              </h2>
              <button
                onClick={handleCopy}
                className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-md transition-all duration-200"
              >
                复制
              </button>
              <button
                onClick={handleClear}
                className="ml-2 px-3 py-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-md text-xs"
              >
                清空
              </button>
            </div>
            <textarea
              value={base64}
              readOnly
              className="w-full h-48 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg font-mono text-xs resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        )}

        {/* 说明区 */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-8 text-slate-800 dark:text-slate-200">图片转 Base64 工具特性</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4 4h-4a1 1 0 01-1-1v-4h6v4a1 1 0 01-1 1z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200">图片上传</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">支持拖拽或点击上传图片文件</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200">Base64 编码</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">自动生成图片的 Base64 字符串</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200">一键复制</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Base64 结果支持一键复制</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}