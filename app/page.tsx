export default function Home() {
  return (
    <div className="font-sans min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Dev Forge</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Developer tools for better productivity</p>
        </header>

        <section className="w-full max-w-xl mx-auto bg-white dark:bg-neutral-900 rounded-xl shadow p-6 flex flex-col gap-4 border border-neutral-200 dark:border-neutral-800">
          <h2 className="text-lg font-semibold mb-2">Tools</h2>
          <ul className="flex flex-col gap-3">
            <li>
              <a href="/timestamp" className="block px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors w-fit">Timestamp Converter</a>
            </li>
            <li>
              <a href="/json" className="block px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors w-fit">JSON Formatter & Validator</a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
