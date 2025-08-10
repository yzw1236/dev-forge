"use client";

import { useTranslations } from 'next-intl';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useState } from "react";

interface JWTPayload {
  [key: string]: any;
}

interface JWTHeader {
  alg: string;
  typ: string;
  [key: string]: any;
}

interface DecodedJWT {
  header: JWTHeader;
  payload: JWTPayload;
  signature: string;
}

export default function JWTDecoder() {
  const t = useTranslations();
  const [jwtToken, setJwtToken] = useState("");
  const [decodedJWT, setDecodedJWT] = useState<DecodedJWT | null>(null);
  const [error, setError] = useState("");

  const decodeJWT = (token: string) => {
    if (!token.trim()) {
      setError(t('errors.invalidInput'));
      setDecodedJWT(null);
      return;
    }

    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error("Invalid JWT format. JWT should have 3 parts separated by dots.");
      }

      const [headerB64, payloadB64, signature] = parts;

      // Decode header
      const header = JSON.parse(atob(headerB64.replace(/-/g, '+').replace(/_/g, '/')));
      
      // Decode payload
      const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')));

      const decoded: DecodedJWT = {
        header,
        payload,
        signature
      };

      setDecodedJWT(decoded);
      setError("");
    } catch (err) {
      setError(t('errors.somethingWentWrong'));
      setDecodedJWT(null);
    }
  };

  const handleDecode = () => {
    decodeJWT(jwtToken);
  };

  const handleClear = () => {
    setJwtToken("");
    setDecodedJWT(null);
    setError("");
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatJSON = (obj: any) => {
    return JSON.stringify(obj, null, 2);
  };

  const getTokenInfo = (payload: JWTPayload) => {
    const now = Math.floor(Date.now() / 1000);
    const info = [];

    if (payload.iat) {
      const issuedAt = new Date(payload.iat * 1000);
      info.push(`Issued At: ${issuedAt.toLocaleString()}`);
    }

    if (payload.exp) {
      const expiresAt = new Date(payload.exp * 1000);
      const isExpired = payload.exp < now;
      info.push(`Expires At: ${expiresAt.toLocaleString()} ${isExpired ? '(EXPIRED)' : ''}`);
    }

    if (payload.nbf) {
      const notBefore = new Date(payload.nbf * 1000);
      const isNotYetValid = payload.nbf > now;
      info.push(`Not Before: ${notBefore.toLocaleString()} ${isNotYetValid ? '(NOT YET VALID)' : ''}`);
    }

    return info;
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs />
        
        {/* Header */}
        <header className="text-center mb-8 mt-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            {t('tools.jwtDecoder.title')}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t('tools.jwtDecoder.description')}
          </p>
        </header>

        {/* Input Section */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center">
              <svg className="w-6 h-6 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              JWT Token
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={handleDecode}
                disabled={!jwtToken.trim()}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-slate-400 disabled:to-slate-500 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed text-sm"
              >
                {t('common.decode')} JWT
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
            value={jwtToken}
            onChange={(e) => setJwtToken(e.target.value)}
            placeholder="Paste your JWT token here..."
            className="w-full h-32 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-700 dark:text-red-400 text-sm">{error}</span>
            </div>
          </div>
        )}

        {/* Decoded JWT Display */}
        {decodedJWT && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Header */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Header
                </h3>
                <button
                  onClick={() => handleCopy(formatJSON(decodedJWT.header))}
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-md transition-all duration-200"
                >
                  {t('common.copy')}
                </button>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg p-3 max-h-64 overflow-auto">
                <pre className="text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                  {formatJSON(decodedJWT.header)}
                </pre>
              </div>
            </div>

            {/* Payload */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Payload
                </h3>
                <button
                  onClick={() => handleCopy(formatJSON(decodedJWT.payload))}
                  className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded-md transition-all duration-200"
                >
                  {t('common.copy')}
                </button>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg p-3 max-h-64 overflow-auto">
                <pre className="text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                  {formatJSON(decodedJWT.payload)}
                </pre>
              </div>
            </div>

            {/* Signature */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  Signature
                </h3>
                <button
                  onClick={() => handleCopy(decodedJWT.signature)}
                  className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white text-xs rounded-md transition-all duration-200"
                >
                  {t('common.copy')}
                </button>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg p-3 max-h-64 overflow-auto">
                <code className="text-xs text-slate-800 dark:text-slate-200 break-all">
                  {decodedJWT.signature}
                </code>
              </div>
            </div>
          </div>
        )}

        {/* Token Info */}
        {decodedJWT && (
          <div className="mt-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Token Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getTokenInfo(decodedJWT.payload).map((info, index) => (
                <div key={index} className="flex items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <svg className="w-4 h-4 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-slate-700 dark:text-slate-300">{info}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 