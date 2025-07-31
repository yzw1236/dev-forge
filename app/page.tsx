import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to bbj dev-forge
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4">
            A collection of powerful developer tools designed to boost your productivity and streamline your workflow
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
          {tools.map((tool) => (
            <div
              key={tool.route}
              className="flex flex-col h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center mb-3">
                <div
                  className={`w-12 h-12 bg-${tool.color}-100 dark:bg-${tool.color}-900/30 rounded-xl flex items-center justify-center mr-4`}
                >
                  {tool.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 break-words leading-tight">{tool.name}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{tool.desc}</p>
                </div>
              </div>
              <div className="flex-grow" />
              <Link
                href={tool.route}
                className={`mt-3 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-${tool.color}-500 to-${tool.color}-600 hover:from-${tool.color}-600 hover:to-${tool.color}-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm`}
              >
                Open Tool
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-12 md:mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-slate-800 dark:text-slate-200">Why Choose bbj dev-forge?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">Fast & Efficient</h3>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">Lightning-fast tools that save you time and boost productivity</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">Reliable</h3>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">Built with precision and tested thoroughly for accuracy</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M15 7l3-3m0 0h-3m3 0v3" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">Beautiful UI</h3>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">Modern, responsive design that works on all devices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const tools = [
  {
    route: "/base",
    name: "Base Converter",
    color: "emerald",
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
    ),
    desc: "Convert between number bases.",
  },
  {
    route: "/base64",
    name: "Base64 Encoder/Decoder",
    color: "blue",
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="2" fill="none"/>
        <text x="12" y="16" textAnchor="middle" fontSize="8" fill="currentColor" fontFamily="monospace" fontWeight="bold">B64</text>
      </svg>
    ),
    desc: "Encode or decode Base64.",
  },
  {
    route: "/beautifier",
    name: "Code Beautifier",
    color: "indigo",
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    ),
    desc: "Beautify and format code.",
  },
  {
    route: "/color",
    name: "Color Converter",
    color: "rose",
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M15 7l3-3m0 0h-3m3 0v3" /></svg>
    ),
    desc: "Convert and preview colors.",
  },
  {
    route: "/convert",
    name: "Data Converter",
    color: "amber",
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    ),
    desc: "Convert between data formats.",
  },
  {
    route: "/crontab",
    name: "Crontab Tool",
    color: "fuchsia",
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6 text-fuchsia-600 dark:text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    ),
    desc: "Crontab expression helper.",
  },
  {
    route: "/hash",
    name: "Hash Calculator",
    color: "red",
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    ),
    desc: "Calculate hashes (MD5, SHA, etc).",
  },
  {
    route: "/http-status",
    name: "HTTP Status Lookup",
    color: "cyan",
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    ),
    desc: "Lookup HTTP status codes.",
  },
  {
    route: "/image2base64",
    name: "Image to Base64",
    color: "orange",
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4 4h-4a1 1 0 01-1-1v-4h6v4a1 1 0 01-1 1z" /></svg>
    ),
    desc: "Convert images to Base64.",
  },
  {
    route: "/json",
    name: "JSON Tools",
    color: "purple",
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
    ),
    desc: "Beautify and validate JSON data.",
  },
  {
    route: "/jwt",
    name: "JWT Decoder",
    color: "amber",
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    ),
    desc: "Decode and inspect JWT tokens.",
  },
  {
    route: "/password",
    name: "Password Generator",
    color: "pink",
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
    ),
    desc: "Generate secure passwords.",
  },
  {
    route: "/sql",
    name: "SQL Formatter",
    color: "orange",
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    ),
    desc: "Format SQL queries.",
  },
  {
    route: "/timestamp",
    name: "Timestamp",
    color: "green",
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    desc: "Convert Unix timestamps to dates and vice versa.",
  },
  {
    route: "/url",
    name: "URL Tool",
    color: "indigo",
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
    ),
    desc: "Encode or decode URLs.",
  },
  {
    route: "/user-agent",
    name: "User-Agent Parser",
    color: "lime",
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6 text-lime-600 dark:text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    ),
    desc: "Parse and analyze User-Agent strings.",
  },
  {
    route: "/uuid",
    name: "UUID Generator",
    color: "teal",
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" /></svg>
    ),
    desc: "Generate unique identifiers.",
  },
];
