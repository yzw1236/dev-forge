"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';
import Breadcrumbs from '../../components/Breadcrumbs';

export default function PasswordGenerator() {
  const t = useTranslations();
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);

  const generatePassword = () => {
    let charset = "";
    
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    if (excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, "");
    }
    
    if (excludeAmbiguous) {
      charset = charset.replace(/[{}[\]()/\\'"`~,;:.<>]/g, "");
    }
    
    if (charset === "") {
      setPassword("");
      return;
    }
    
    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    setPassword(result);
  };

  const handleCopy = async () => {
    if (password) {
      try {
        await navigator.clipboard.writeText(password);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const handleClear = () => {
    setPassword("");
  };

  const getPasswordStrength = () => {
    if (!password) return { score: 0, label: "None", color: "text-slate-400" };
    
    let score = 0;
    if (includeUppercase && /[A-Z]/.test(password)) score++;
    if (includeLowercase && /[a-z]/.test(password)) score++;
    if (includeNumbers && /\d/.test(password)) score++;
    if (includeSymbols && /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    
    if (score <= 2) return { score, label: "Weak", color: "text-red-500" };
    if (score <= 4) return { score, label: "Fair", color: "text-yellow-500" };
    if (score <= 5) return { score, label: "Good", color: "text-blue-500" };
    return { score, label: "Strong", color: "text-green-500" };
  };

  const strength = getPasswordStrength();

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs />
        
        {/* Header */}
        <header className="text-center mb-8 mt-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            {t('tools.passwordGenerator.title')}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t('tools.passwordGenerator.description')}
          </p>
        </header>

        {/* Password Display */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center">
              <svg className="w-6 h-6 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              {t('common.generated')} {t('navigation.passwordGenerator')}
            </h2>
            <div className="flex space-x-2">
              {password && (
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
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-all duration-200 text-sm"
              >
                {t('common.clear')}
              </button>
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg p-4 mb-4">
            {password ? (
              <div className="flex items-center justify-between">
                <code className="font-mono text-lg text-slate-800 dark:text-slate-200 break-all">
                  {password}
                </code>
                <div className={`ml-4 text-sm font-medium ${strength.color}`}>
                  {strength.label}
                </div>
              </div>
            ) : (
              <div className="text-slate-500 dark:text-slate-400 text-center py-8">
                Click "{t('common.generate')} {t('navigation.passwordGenerator')}" to create a secure password
              </div>
            )}
          </div>
          
          {/* Strength Bar */}
          {password && (
            <div className="mb-4">
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
                <span>Password Strength</span>
                <span className={strength.color}>{strength.label}</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    strength.score <= 2 ? 'bg-red-500' :
                    strength.score <= 4 ? 'bg-yellow-500' :
                    strength.score <= 5 ? 'bg-blue-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${(strength.score / 6) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {t('navigation.passwordGenerator')} {t('common.settings')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Length */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Length: {length}
              </label>
              <input
                type="range"
                min="8"
                max="64"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                <span>8</span>
                <span>64</span>
              </div>
            </div>

            {/* Character Types */}
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  className="rounded border-slate-300 text-pink-500 focus:ring-pink-500"
                />
                <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">Uppercase letters (A-Z)</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                  className="rounded border-slate-300 text-pink-500 focus:ring-pink-500"
                />
                <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">Lowercase letters (a-z)</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="rounded border-slate-300 text-pink-500 focus:ring-pink-500"
                />
                <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">Numbers (0-9)</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="rounded border-slate-300 text-pink-500 focus:ring-pink-500"
                />
                <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">Symbols (!@#$%^&*)</span>
              </label>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-600">
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-3">Advanced Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={excludeSimilar}
                  onChange={(e) => setExcludeSimilar(e.target.checked)}
                  className="rounded border-slate-300 text-pink-500 focus:ring-pink-500"
                />
                <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">Exclude similar characters (i, l, 1, L, o, 0, O)</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={excludeAmbiguous}
                  onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                  className="rounded border-slate-300 text-pink-500 focus:ring-pink-500"
                />
                <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">Exclude ambiguous characters (&#123; &#125; [ ] ( ) / \ &apos; &quot; ` ~ , ; : . &lt; &gt;)</span>
              </label>
            </div>
          </div>

          {/* Generate Button */}
          <div className="mt-6">
            <button
              onClick={generatePassword}
              disabled={!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols}
              className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:from-slate-400 disabled:to-slate-500 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
            >
              {t('common.generate')} {t('navigation.passwordGenerator')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 