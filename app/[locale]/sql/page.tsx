"use client";

import { useTranslations } from 'next-intl';
import Breadcrumbs from '../../components/Breadcrumbs';

import { useState } from "react";

export default function SQLFormatter() {
  const t = useTranslations();
  const [inputSQL, setInputSQL] = useState("");
  const [formattedSQL, setFormattedSQL] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // SQL 格式化函数
  const formatSQL = (sql: string) => {
    if (!sql.trim()) {
      setError("Please enter SQL code to format");
      setFormattedSQL("");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // 基本的 SQL 格式化逻辑
      let formatted = sql
        // 标准化换行符
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        
        // 在关键字前添加换行
        .replace(/\b(SELECT|FROM|WHERE|AND|OR|ORDER BY|GROUP BY|HAVING|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|OUTER JOIN|INSERT INTO|UPDATE|DELETE FROM|CREATE TABLE|ALTER TABLE|DROP TABLE|CREATE INDEX|DROP INDEX)\b/gi, '\n$1')
        
        // 在逗号后添加空格
        .replace(/,/g, ', ')
        
        // 在操作符前后添加空格
        .replace(/\s*([=<>!+\-*/])\s*/g, ' $1 ')
        
        // 在括号前后添加空格
        .replace(/\s*([()])\s*/g, ' $1 ')
        
        // 清理多余的空格
        .replace(/\s+/g, ' ')
        .replace(/\s*,\s*/g, ', ')
        .replace(/\s*\(\s*/g, ' (')
        .replace(/\s*\)\s*/g, ') ')
        
        // 处理缩进
        .split('\n')
        .map((line, index) => {
          if (index === 0) return line.trim();
          
          const trimmed = line.trim();
          if (!trimmed) return '';
          
          // 计算缩进级别
          let indentLevel = 0;
          if (trimmed.match(/^(WHERE|AND|OR|ORDER BY|GROUP BY|HAVING)/i)) {
            indentLevel = 1;
          } else if (trimmed.match(/^(JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|OUTER JOIN)/i)) {
            indentLevel = 1;
          } else if (trimmed.match(/^(INSERT INTO|UPDATE|DELETE FROM)/i)) {
            indentLevel = 0;
          } else if (trimmed.match(/^(CREATE TABLE|ALTER TABLE|DROP TABLE)/i)) {
            indentLevel = 0;
          } else if (trimmed.includes('(')) {
            indentLevel = 1;
          }
          
          return '  '.repeat(indentLevel) + trimmed;
        })
        .filter(line => line !== '')
        .join('\n')
        .trim();

      setFormattedSQL(formatted);
    } catch (err) {
      setError("Failed to format SQL. Please check your input.");
      setFormattedSQL("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormat = () => {
    formatSQL(inputSQL);
  };

  const handleClear = () => {
    setInputSQL("");
    setFormattedSQL("");
    setError("");
  };

  const handleCopy = async () => {
    if (formattedSQL) {
      try {
        await navigator.clipboard.writeText(formattedSQL);
        // 可以添加一个临时的成功提示
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs />
        {/* Header */}
        <header className="text-center mb-8 mt-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('tools.sql.title')}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t('tools.sql.description')}
          </p>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* {t('common.input')} Section */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center">
                <svg className="w-6 h-6 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t('common.input')} SQL
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={handleFormat}
                  disabled={isLoading || !inputSQL.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-slate-400 disabled:to-slate-500 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed text-sm"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Formatting...
                    </div>
                  ) : (
                    "Format SQL"
                  )}
                </button>
                <button
                  onClick={handleClear}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-all duration-200 text-sm"
                >
                  {t('common.clear')}
                </button>
              </div>
            </div>
            
            <textarea
              value={inputSQL}
              onChange={(e) => setInputSQL(e.target.value)}
              placeholder="Paste your SQL query here...
Example:
SELECT id, name, email FROM users WHERE status = 'active' AND created_at > '2024-01-01' ORDER BY name ASC"
              className="w-full h-80 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* {t('common.output')} Section */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center">
                <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Formatted SQL
              </h2>
              {formattedSQL && (
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {t('common.copy')}
                </button>
              )}
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
              {formattedSQL ? (
                <pre className="whitespace-pre-wrap text-slate-800 dark:text-slate-200">{formattedSQL}</pre>
              ) : (
                <div className="text-slate-500 dark:text-slate-400 h-full flex items-center justify-center">
                  Formatted SQL will appear here...
                </div>
              )}
            </div>
          </div>
        </div>


      </div>
    </div>
  );
} 