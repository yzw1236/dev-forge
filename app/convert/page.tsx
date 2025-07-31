"use client";

import { useState } from "react";

// 由于 Next.js 不能直接用 nodejs 的 yaml/xml 库，这里用简单正则和 JSON.parse/stringify 实现基础功能
// 实际生产建议用 js-yaml、fast-xml-parser 等库
function simpleYamlToJson(yaml: string): any {
  // 仅支持最基础的 key: value 格式
  const obj: any = {};
  yaml.split(/\r?\n/).forEach(line => {
    const m = line.match(/^([\w-]+):\s*(.*)$/);
    if (m) obj[m[1]] = m[2];
  });
  return obj;
}

function simpleJsonToYaml(json: any): string {
  return Object.entries(json).map(([k, v]) => `${k}: ${v}`).join("\n");
}

function simpleXmlToJson(xml: string): any {
  // 只支持 <key>value</key> 结构
  const obj: any = {};
  const re = /<([\w-]+)>(.*?)<\/[\w-]+>/g;
  let m;
  while ((m = re.exec(xml))) {
    obj[m[1]] = m[2];
  }
  return obj;
}

function simpleJsonToXml(json: any): string {
  return Object.entries(json).map(([k, v]) => `<${k}>${v}</${k}>`).join("");
}

function detectFormat(text: string): "json" | "yaml" | "xml" | "unknown" {
  if (!text.trim()) return "unknown";
  if (text.trim().startsWith("{") && text.trim().endsWith("}")) return "json";
  if (text.trim().startsWith("<") && text.trim().endsWith(">")) return "xml";
  if (/^[\w-]+:/m.test(text)) return "yaml";
  return "unknown";
}

export default function DataConvertTool() {
  const [input, setInput] = useState("");
  const [inputFormat, setInputFormat] = useState<"json" | "yaml" | "xml" | "unknown">("unknown");
  const [outputFormat, setOutputFormat] = useState<"json" | "yaml" | "xml">("json");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    const detected = detectFormat(input);
    setInputFormat(detected);
    if (detected === "unknown") {
      setError("无法识别输入格式，仅支持 JSON、YAML、XML");
      setOutput("");
      return;
    }
    try {
      let obj: any;
      if (detected === "json") {
        obj = JSON.parse(input);
      } else if (detected === "yaml") {
        obj = simpleYamlToJson(input);
      } else if (detected === "xml") {
        obj = simpleXmlToJson(input);
      }
      let out = "";
      if (outputFormat === "json") {
        out = JSON.stringify(obj, null, 2);
      } else if (outputFormat === "yaml") {
        out = simpleJsonToYaml(obj);
      } else if (outputFormat === "xml") {
        out = simpleJsonToXml(obj);
      }
      setOutput(out);
      setError("");
    } catch (e) {
      setError("转换失败，请检查输入内容格式");
      setOutput("");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
    setInputFormat("unknown");
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
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
            数据结构格式转换
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            支持 JSON、YAML、XML 三种格式互转，自动检测输入格式，格式化输出
          </p>
        </header>

        {/* 格式选择 */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          <span className="text-slate-700 dark:text-slate-300 font-medium">输出格式：</span>
          {(["json", "yaml", "xml"] as const).map(fmt => (
            <button
              key={fmt}
              onClick={() => setOutputFormat(fmt)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${outputFormat === fmt ? "bg-sky-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-sky-900"}`}
            >
              {fmt.toUpperCase()}
            </button>
          ))}
        </div>

        {/* 输入区 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center">
                <svg className="w-6 h-6 mr-2 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                输入内容
              </h2>
              <button
                onClick={handleClear}
                className="px-3 py-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm"
              >
                清空
              </button>
            </div>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="支持 JSON、YAML、XML"
              className="w-full h-48 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
            />
            {inputFormat !== "unknown" && (
              <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">检测到输入格式：{inputFormat.toUpperCase()}</div>
            )}
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
                <svg className="w-6 h-6 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                转换结果
              </h2>
              <button
                onClick={handleConvert}
                disabled={!input.trim()}
                className="px-3 py-1 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg text-sm"
              >
                转换
              </button>
              <button
                onClick={handleCopy}
                disabled={!output}
                className="px-3 py-1 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg text-sm ml-2"
              >
                复制
              </button>
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="输出结果将在此显示"
              className="w-full h-48 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* 说明区 */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-8 text-slate-800 dark:text-slate-200">数据结构转换工具特性</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-sky-600 dark:text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200">多格式互转</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">支持 JSON、YAML、XML 三种格式互转</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200">自动格式检测</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">自动识别输入内容格式，无需手动切换</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200">格式化输出</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">输出内容自动格式化，支持一键复制</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}