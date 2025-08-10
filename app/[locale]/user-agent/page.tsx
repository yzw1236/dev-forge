"use client";

import { useState } from "react";

interface UserAgentInfo {
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  device: string;
  engine: string;
  engineVersion: string;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isBot: boolean;
}

export default function UserAgentParser() {
  const [userAgent, setUserAgent] = useState("");
  const [parsedInfo, setParsedInfo] = useState<UserAgentInfo | null>(null);
  const [error, setError] = useState("");

  const parseUserAgent = (ua: string): UserAgentInfo => {
    const uaLower = ua.toLowerCase();
    
    // Initialize with defaults
    let info: UserAgentInfo = {
      browser: "Unknown",
      browserVersion: "Unknown",
      os: "Unknown",
      osVersion: "Unknown",
      device: "Unknown",
      engine: "Unknown",
      engineVersion: "Unknown",
      isMobile: false,
      isTablet: false,
      isDesktop: false,
      isBot: false
    };

    // Check for bots
    if (uaLower.includes('bot') || uaLower.includes('crawler') || uaLower.includes('spider')) {
      info.isBot = true;
      info.browser = "Bot/Crawler";
      return info;
    }

    // Detect mobile/tablet/desktop
    if (uaLower.includes('mobile') || uaLower.includes('android') || uaLower.includes('iphone')) {
      info.isMobile = true;
      info.device = "Mobile";
    } else if (uaLower.includes('tablet') || uaLower.includes('ipad')) {
      info.isTablet = true;
      info.device = "Tablet";
    } else {
      info.isDesktop = true;
      info.device = "Desktop";
    }

    // Detect Operating System
    if (uaLower.includes('windows')) {
      info.os = "Windows";
      const match = ua.match(/Windows NT (\d+\.\d+)/);
      if (match) {
        const version = parseFloat(match[1]);
        if (version === 10.0) info.osVersion = "10";
        else if (version === 6.3) info.osVersion = "8.1";
        else if (version === 6.2) info.osVersion = "8";
        else if (version === 6.1) info.osVersion = "7";
        else info.osVersion = match[1];
      }
    } else if (uaLower.includes('mac os x')) {
      info.os = "macOS";
      const match = ua.match(/Mac OS X (\d+[._]\d+)/);
      if (match) {
        info.osVersion = match[1].replace('_', '.');
      }
    } else if (uaLower.includes('linux')) {
      info.os = "Linux";
      if (uaLower.includes('ubuntu')) info.osVersion = "Ubuntu";
      else if (uaLower.includes('fedora')) info.osVersion = "Fedora";
      else if (uaLower.includes('centos')) info.osVersion = "CentOS";
      else if (uaLower.includes('debian')) info.osVersion = "Debian";
      else info.osVersion = "Generic";
    } else if (uaLower.includes('android')) {
      info.os = "Android";
      const match = ua.match(/Android (\d+\.\d+)/);
      if (match) {
        info.osVersion = match[1];
      }
    } else if (uaLower.includes('ios')) {
      info.os = "iOS";
      const match = ua.match(/OS (\d+[._]\d+)/);
      if (match) {
        info.osVersion = match[1].replace('_', '.');
      }
    }

    // Detect Browser and Engine
    if (uaLower.includes('chrome') && !uaLower.includes('edg')) {
      info.browser = "Chrome";
      const match = ua.match(/Chrome\/(\d+\.\d+)/);
      if (match) {
        info.browserVersion = match[1];
      }
      info.engine = "Blink";
    } else if (uaLower.includes('firefox')) {
      info.browser = "Firefox";
      const match = ua.match(/Firefox\/(\d+\.\d+)/);
      if (match) {
        info.browserVersion = match[1];
      }
      info.engine = "Gecko";
    } else if (uaLower.includes('safari') && !uaLower.includes('chrome')) {
      info.browser = "Safari";
      const match = ua.match(/Version\/(\d+\.\d+)/);
      if (match) {
        info.browserVersion = match[1];
      }
      info.engine = "WebKit";
    } else if (uaLower.includes('edge')) {
      info.browser = "Edge";
      const match = ua.match(/Edge\/(\d+\.\d+)/);
      if (match) {
        info.browserVersion = match[1];
      }
      info.engine = "Blink";
    } else if (uaLower.includes('opera')) {
      info.browser = "Opera";
      const match = ua.match(/Opera\/(\d+\.\d+)/);
      if (match) {
        info.browserVersion = match[1];
      }
      info.engine = "Blink";
    }

    // Detect Engine Version
    if (info.engine === "Blink") {
      const match = ua.match(/Chrome\/(\d+\.\d+)/);
      if (match) {
        info.engineVersion = match[1];
      }
    } else if (info.engine === "Gecko") {
      const match = ua.match(/rv:(\d+\.\d+)/);
      if (match) {
        info.engineVersion = match[1];
      }
    } else if (info.engine === "WebKit") {
      const match = ua.match(/AppleWebKit\/(\d+\.\d+)/);
      if (match) {
        info.engineVersion = match[1];
      }
    }

    return info;
  };

  const handleParse = () => {
    if (!userAgent.trim()) {
      setError("Please enter a User-Agent string");
      setParsedInfo(null);
      return;
    }

    try {
      const info = parseUserAgent(userAgent);
      setParsedInfo(info);
      setError("");
    } catch (err) {
      setError("Failed to parse User-Agent string");
      setParsedInfo(null);
    }
  };

  const handleClear = () => {
    setUserAgent("");
    setParsedInfo(null);
    setError("");
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case "mobile": return "📱";
      case "tablet": return "📱";
      case "desktop": return "💻";
      default: return "🖥️";
    }
  };

  const getOSIcon = (os: string) => {
    switch (os.toLowerCase()) {
      case "windows": return "🪟";
      case "macos": return "🍎";
      case "linux": return "🐧";
      case "android": return "🤖";
      case "ios": return "🍎";
      default: return "💻";
    }
  };

  const getBrowserIcon = (browser: string) => {
    switch (browser.toLowerCase()) {
      case "chrome": return "🌐";
      case "firefox": return "🦊";
      case "safari": return "🌐";
      case "edge": return "🌐";
      case "opera": return "🌐";
      default: return "🌐";
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
            User-Agent Parser
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Parse and analyze User-Agent strings to extract browser, OS, and device information
          </p>
        </header>

        {/* Input Section */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center">
              <svg className="w-6 h-6 mr-2 text-lime-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              User-Agent String
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={handleParse}
                disabled={!userAgent.trim()}
                className="px-4 py-2 bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600 disabled:from-slate-400 disabled:to-slate-500 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed text-sm"
              >
                Parse
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
            value={userAgent}
            onChange={(e) => setUserAgent(e.target.value)}
            placeholder="Paste your User-Agent string here...
Example: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            className="w-full h-32 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-200"
          />

          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-red-700 dark:text-red-400 text-sm">{error}</span>
              </div>
            </div>
          )}
        </div>

        {/* Parsed Results */}
        {parsedInfo && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Device Information */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-lime-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Device Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Device Type</span>
                  <span className="text-sm text-slate-800 dark:text-slate-200 flex items-center">
                    {getDeviceIcon(parsedInfo.device)} {parsedInfo.device}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Mobile</span>
                  <span className={`text-sm font-medium ${parsedInfo.isMobile ? 'text-green-600' : 'text-red-600'}`}>
                    {parsedInfo.isMobile ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Tablet</span>
                  <span className={`text-sm font-medium ${parsedInfo.isTablet ? 'text-green-600' : 'text-red-600'}`}>
                    {parsedInfo.isTablet ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Desktop</span>
                  <span className={`text-sm font-medium ${parsedInfo.isDesktop ? 'text-green-600' : 'text-red-600'}`}>
                    {parsedInfo.isDesktop ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Bot</span>
                  <span className={`text-sm font-medium ${parsedInfo.isBot ? 'text-red-600' : 'text-green-600'}`}>
                    {parsedInfo.isBot ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            {/* Browser Information */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-lime-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
                Browser & OS Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Browser</span>
                  <span className="text-sm text-slate-800 dark:text-slate-200 flex items-center">
                    {getBrowserIcon(parsedInfo.browser)} {parsedInfo.browser}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Browser Version</span>
                  <span className="text-sm text-slate-800 dark:text-slate-200">{parsedInfo.browserVersion}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Operating System</span>
                  <span className="text-sm text-slate-800 dark:text-slate-200 flex items-center">
                    {getOSIcon(parsedInfo.os)} {parsedInfo.os}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">OS Version</span>
                  <span className="text-sm text-slate-800 dark:text-slate-200">{parsedInfo.osVersion}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Engine</span>
                  <span className="text-sm text-slate-800 dark:text-slate-200">{parsedInfo.engine}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Engine Version</span>
                  <span className="text-sm text-slate-800 dark:text-slate-200">{parsedInfo.engineVersion}</span>
                </div>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  );
} 